import { useState } from 'react'
import { KARATS, calcJewellery, type UnitKey } from '../lib/gold-math'
import { fmt, t, type Locale } from '../lib/i18n'

export function Calculator({ locale, spotUsdOz }: { locale: Locale; spotUsdOz: number }) {
  const d = t(locale)
  const [weight, setWeight] = useState(10)
  const [unit, setUnit] = useState<UnitKey>('gram')
  const [karat, setKarat] = useState(22)
  const [making, setMaking] = useState(8)
  const [vat, setVat] = useState(true)
  const r = calcJewellery({ spotUsdOz, weight, unit, karat, makingPct: making, vat })
  const field = 'mt-1 w-full rounded-lg border border-[#d9cda9] bg-white p-2'
  return (
    <div className="card grid gap-6 p-5 md:grid-cols-2">
      <div className="grid gap-4">
        <label className="text-sm font-semibold">
          {d.calc.weight}
          <input type="number" min={0} step="any" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className={field} />
        </label>
        <label className="text-sm font-semibold">
          {d.calc.unit}
          <select value={unit} onChange={(e) => setUnit(e.target.value as UnitKey)} className={field}>
            {(Object.keys(d.units) as UnitKey[]).map((u) => <option key={u} value={u}>{d.units[u]}</option>)}
          </select>
        </label>
        <label className="text-sm font-semibold">
          {d.calc.karat}
          <select value={karat} onChange={(e) => setKarat(Number(e.target.value))} className={field}>
            {KARATS.map(({ k }) => <option key={k} value={k}>{k}K</option>)}
          </select>
        </label>
        <label className="text-sm font-semibold">
          {d.calc.making}
          <input type="number" min={0} step="any" value={making} onChange={(e) => setMaking(Number(e.target.value))} className={field} />
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={vat} onChange={(e) => setVat(e.target.checked)} /> {d.calc.vat}
        </label>
      </div>
      <div className="rounded-xl bg-ink p-5 text-white">
        <dl className="tabular space-y-2 text-sm">
          <div className="flex justify-between"><dt>{d.calc.metal}</dt><dd>{fmt(r.metal, locale)} AED</dd></div>
          <div className="flex justify-between"><dt>{d.calc.makingAmt}</dt><dd>{fmt(r.making, locale)} AED</dd></div>
          <div className="flex justify-between"><dt>{d.calc.vatAmt}</dt><dd>{fmt(r.vat, locale)} AED</dd></div>
        </dl>
        <p className="mt-4 text-sm text-gold">{d.calc.total}</p>
        <p className="tabular text-4xl font-bold text-gold">{fmt(r.total, locale)}</p>
        <p className="mt-4 text-xs text-white/60">{d.calc.note}</p>
      </div>
    </div>
  )
}
