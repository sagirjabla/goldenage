import { createFileRoute } from '@tanstack/react-router'
import { CalcView, calcHead } from '../components/pages'
import { fetchLiveRates } from '../lib/prices.functions'

export const Route = createFileRoute('/ar/gold-calculator')({
  loader: () => fetchLiveRates(),
  head: () => calcHead('ar'),
  component: function Page() { return <CalcView locale="ar" rates={Route.useLoaderData()} /> },
})
