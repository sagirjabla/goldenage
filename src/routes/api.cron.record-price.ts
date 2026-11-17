import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/cron/record-price')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const secret = process.env.CRON_SECRET
        if (!secret || request.headers.get('authorization') !== `Bearer ${secret}`) {
          return new Response('Unauthorized', { status: 401 })
        }
        const { recordPrice } = await import('../lib/prices.server')
        return Response.json(await recordPrice())
      },
    },
  },
})
