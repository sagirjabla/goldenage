import { Link } from '@tanstack/react-router'
import { FAQ, LANDING_PAGES } from '../content/pages'
import { KARATS, UNITS, aedPerGram } from '../lib/gold-math'
import { fmt, fmtDateTime, lp, t, type Locale } from '../lib/i18n'
import type { HistoryRow, Rates } from '../lib/price-types'

export function Hero({ locale, rates, h1, intro, karat = 24 }: { locale: Locale; rates: Rates; h1: string; intro: string; karat?: number }) {
  const d = t(locale)
  return (
    <section className="rounded-2xl bg-ink p-6 text-white md:p-10">
      <h1 className="text-3xl font-bold md:text-4xl">{h1}</h1>
      <p className="mt-2 max-w-3xl text-white/75">{intro}</p>
      <div className="mt-6 flex flex-wrap items-end gap-x-10 gap-y-4">
        <div>
          <p className="text-sm text-gold">{d.karat} {karat} · {d.perGram}</p>
          <p className="tabular text-5xl font-bold text-gold">
            {fmt(aedPerGram(rates.spotUsdOz, karat), locale)} <span className="text-lg">AED</span>
          </p>
        </div>
        <div className="text-sm text-white/70">
          <p>{d.spot}: <span className="tabular">{fmt(rates.spotUsdOz, locale)}</span> {d.spotUnit}</p>
          <p>{d.updated}: {fmtDateTime(rates.updatedAt, locale)} (GST)</p>
          {!rates.live && <p className="text-gold">{d.stale}</p>}
        </div>
      </div>
    </section>
  )
}

export function KaratTable({ locale, rates }: { locale: Locale; rates: Rates }) {
  const d = t(locale)
  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold">{d.byKarat}</h2>
      <div className="card mt-3 overflow-x-auto">
        <table className="w-full text-start text-sm">
          <thead className="bg-gold/10">
            <tr>
              <th className="p-3 text-start">{d.karat}</th>
              <th className="p-3 text-start">{d.perGram}</th>
              <th className="p-3 text-start">{d.units.tola}</th>
              <th className="p-3 text-start">{d.units.ounce}</th>
            </tr>
          </thead>
          <tbody>
            {KARATS.map(({ k }) => {
              const g = aedPerGram(rates.spotUsdOz, k)
              return (
                <tr key={k} className="border-t border-[#efe7d2]">
                  <td className="p-3 font-semibold">{k}K</td>
                  <td className="tabular p-3">{fmt(g, locale)}</td>
                  <td className="tabular p-3">{fmt(g * UNITS.tola, locale)}</td>
                  <td className="tabular p-3">{fmt(g * UNITS.ounce, locale)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}

const WEIGHTS = [1, 5, 10, 50, 100]
export function WeightTable({ locale, rates }: { locale: Locale; rates: Rates }) {
  const d = t(locale)
  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold">{d.byWeight}</h2>
      <div className="card mt-3 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gold/10">
            <tr>
              <th className="p-3 text-start">{d.weight}</th>
              {KARATS.map(({ k }) => <th key={k} className="p-3 text-start">{k}K</th>)}
            </tr>
          </thead>
          <tbody>
            {WEIGHTS.map((w) => (
              <tr key={w} className="border-t border-[#efe7d2]">
                <td className="p-3 font-semibold">{w} {locale === 'ar' ? 'جم' : 'g'}</td>
                {KARATS.map(({ k }) => (
                  <td key={k} className="tabular p-3">{fmt(w * aedPerGram(rates.spotUsdOz, k), locale, 0)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export function CurrencyBox({ locale, rates, code }: { locale: Locale; rates: Rates; code: string }) {
  const fx = rates.fx[code]
  if (!fx) return null
  return (
    <section className="card mt-8 p-5">
      <h2 className="text-2xl font-bold">{code}</h2>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {KARATS.map(({ k }) => (
          <li key={k} className="tabular flex justify-between border-b border-[#efe7d2] pb-1">
            <span>{k}K</span>
            <span>{fmt((aedPerGram(rates.spotUsdOz, k) / rates.fx.AED) * fx, locale)} {code}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function History({ locale, rows }: { locale: Locale; rows: HistoryRow[] }) {
  if (!rows.length) return null
  const d = t(locale)
  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold">{d.history}</h2>
      <div className="card mt-3 max-h-96 overflow-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-gold/10">
            <tr><th className="p-3 text-start">{d.date}</th><th className="p-3 text-start">{d.close}</th></tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.date} className="border-t border-[#efe7d2]">
                <td className="p-3">{r.date}</td>
                <td className="tabular p-3">{fmt(r.close, locale)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export function Faq({ locale }: { locale: Locale }) {
  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold">{t(locale).faqTitle}</h2>
      <div className="mt-3 space-y-3">
        {FAQ[locale].map((f) => (
          <details key={f.q} className="card p-4">
            <summary className="cursor-pointer font-semibold">{f.q}</summary>
            <p className="mt-2 text-ink/80">{f.a}</p>
          </details>
        ))}
      </div>
      <p className="mt-4 text-xs text-ink/60">{t(locale).disclaimer}</p>
    </section>
  )
}

export function LinkGrid({ locale, exclude }: { locale: Locale; exclude?: string }) {
  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold">{t(locale).more}</h2>
      <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
        {LANDING_PAGES.filter((p) => p.slug !== exclude).map((p) => (
          <Link key={p.slug} to={lp(locale, `/gold-rate/${p.slug}`)} className="card p-3 text-sm hover:border-gold">
            {locale === 'ar' ? p.ar : p.en}
          </Link>
        ))}
      </div>
    </section>
  )
}
