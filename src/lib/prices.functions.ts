import { createServerFn } from '@tanstack/react-start'
import type { HistoryRow, Rates } from './price-types'

// Dynamic imports keep *.server code out of the client bundle.
export const fetchLiveRates = createServerFn({ method: 'GET' }).handler(async (): Promise<Rates> => {
  const m = await import('./prices.server')
  return m.getRates()
})

export const fetchHistory = createServerFn({ method: 'GET' }).handler(async (): Promise<HistoryRow[]> => {
  const m = await import('./prices.server')
  return m.getHistory(30)
})
