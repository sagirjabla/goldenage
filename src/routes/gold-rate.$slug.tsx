import { createFileRoute, notFound } from '@tanstack/react-router'
import { LandingView, landingHead } from '../components/pages'
import { findPage } from '../content/pages'
import { fetchLiveRates } from '../lib/prices.functions'

export const Route = createFileRoute('/gold-rate/$slug')({
  loader: async ({ params }) => {
    if (!findPage(params.slug)) throw notFound()
    return fetchLiveRates()
  },
  head: ({ params, loaderData }) => landingHead('en', params.slug, loaderData),
  component: function Page() {
    const { slug } = Route.useParams()
    return <LandingView locale="en" slug={slug} rates={Route.useLoaderData()} />
  },
})
