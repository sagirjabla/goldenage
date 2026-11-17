export type Rates = {
  spotUsdOz: number
  fx: Record<string, number>
  updatedAt: string
  live: boolean
}
export type HistoryRow = { date: string; close: number }
