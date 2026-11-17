import { createFileRoute } from '@tanstack/react-router'
import { HomeView, homeHead } from '../components/pages'
import { fetchHistory, fetchLiveRates } from '../lib/prices.functions'

export const Route = createFileRoute('/')({
  loader: async () => ({ rates: await fetchLiveRates(), history: await fetchHistory() }),
  head: ({ loaderData }) => homeHead('en', loaderData?.rates),
  component: function Page() { const d = Route.useLoaderData(); return <HomeView locale="en" {...d} /> },
})
