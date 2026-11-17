export const AED_PEG = 3.6725
export const TROY_OZ_G = 31.1035
export const KARATS = [
  { k: 24, purity: 0.999 },
  { k: 22, purity: 0.916 },
  { k: 21, purity: 0.875 },
  { k: 18, purity: 0.75 },
] as const
export const UNITS = {
  gram: 1,
  tola: 11.6638,
  sovereign: 8,
  ounce: TROY_OZ_G,
  kg: 1000,
} as const
export type UnitKey = keyof typeof UNITS

export const purityOf = (k: number) => KARATS.find((x) => x.k === k)?.purity ?? k / 24

/** AED per gram for a karat, from USD/oz spot. */
export function aedPerGram(spotUsdOz: number, karat: number): number {
  return (spotUsdOz / TROY_OZ_G) * AED_PEG * purityOf(karat)
}

export function calcJewellery(o: {
  spotUsdOz: number
  weight: number
  unit: UnitKey
  karat: number
  makingPct: number
  vat: boolean
}) {
  const grams = o.weight * UNITS[o.unit]
  const metal = grams * aedPerGram(o.spotUsdOz, o.karat)
  const making = metal * (o.makingPct / 100)
  const vat = o.vat ? making * 0.05 : 0
  return { grams, metal, making, vat, total: metal + making + vat }
}
