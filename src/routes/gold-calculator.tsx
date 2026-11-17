import { createFileRoute } from '@tanstack/react-router'
import { CalcView, calcHead } from '../components/pages'
import { fetchLiveRates } from '../lib/prices.functions'

export const Route = createFileRoute('/gold-calculator')({
  loader: () => fetchLiveRates(),
  head: () => calcHead('en'),
  component: function Page() { return <CalcView locale="en" rates={Route.useLoaderData()} /> },
})
