import { createFileRoute } from '@tanstack/react-router'
import { HomeView, homeHead } from '../components/pages'
import { fetchHistory, fetchLiveRates } from '../lib/prices.functions'

export const Route = createFileRoute('/ar/')({
  loader: async () => ({ rates: await fetchLiveRates(), history: await fetchHistory() }),
  head: ({ loaderData }) => homeHead('ar', loaderData?.rates),
  component: function Page() { const d = Route.useLoaderData(); return <HomeView locale="ar" {...d} /> },
})
