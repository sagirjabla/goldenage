import { sql, desc } from 'drizzle-orm'
import { getDb, schema } from '../../db'
import type { HistoryRow, Rates } from './price-types'
import { TROY_OZ_G, AED_PEG } from './gold-math'

let spotCache: { v: number; t: number } | null = null
let fxCache: { v: Record<string, number>; t: number } | null = null
const FALLBACK_SPOT = 4000

async function getJson<T>(url: string): Promise<T> {
  const r = await fetch(url, { signal: AbortSignal.timeout(5000) })
  if (!r.ok) throw new Error(`${url} ${r.status}`)
  return r.json() as Promise<T>
}

export async function getSpot(): Promise<{ v: number; live: boolean; t: number }> {
  if (spotCache && Date.now() - spotCache.t < 60_000) return { ...spotCache, live: true }
  try {
    const j = await getJson<{ price: number }>('https://api.gold-api.com/price/XAU')
    spotCache = { v: Number(j.price), t: Date.now() }
    return { ...spotCache, live: true }
  } catch {
    if (spotCache) return { ...spotCache, live: false }
    return { v: FALLBACK_SPOT, t: Date.now(), live: false }
  }
}

async function getFx(): Promise<Record<string, number>> {
  if (fxCache && Date.now() - fxCache.t < 6 * 3600_000) return fxCache.v
  try {
    const j = await getJson<{ rates: Record<string, number> }>('https://open.er-api.com/v6/latest/USD')
    fxCache = { v: j.rates, t: Date.now() }
  } catch {
    fxCache ??= { v: { AED: AED_PEG, INR: 88, PKR: 281, SAR: 3.75, USD: 1 }, t: Date.now() }
  }
  return fxCache.v
}

export async function getRates(): Promise<Rates> {
  const [s, fx] = await Promise.all([getSpot(), getFx()])
  return { spotUsdOz: s.v, fx, updatedAt: new Date(s.t).toISOString(), live: s.live }
}

const dubaiDate = () =>
  new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Dubai' }).format(new Date())

async function safeDb<T>(fn: (db: ReturnType<typeof getDb>) => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn(getDb())
  } catch (e) {
    console.error('db error', e)
    return fallback
  }
}

export async function recordPrice() {
  const { v, live } = await getSpot()
  if (!live) return { ok: false as const, reason: 'spot unavailable' }
  const d = dubaiDate()
  const ok = await safeDb(async (db) => {
    await db
      .insert(schema.dailyPrices)
      .values({ date: d, open: v, high: v, low: v, close: v })
      .onConflictDoUpdate({
        target: schema.dailyPrices.date,
        set: {
          high: sql`greatest(${schema.dailyPrices.high}, ${v})`,
          low: sql`least(${schema.dailyPrices.low}, ${v})`,
          close: v,
          updatedAt: sql`now()`,
        },
      })
    return true
  }, false)
  return { ok, date: d, spot: v }
}

export async function getHistory(days = 30): Promise<HistoryRow[]> {
  return safeDb(async (db) => {
    const rows = await db
      .select({ date: schema.dailyPrices.date, close: schema.dailyPrices.close })
      .from(schema.dailyPrices)
      .orderBy(desc(schema.dailyPrices.date))
      .limit(days)
    return rows.map((r) => ({ date: r.date, close: (r.close / TROY_OZ_G) * AED_PEG }))
  }, [])
}
