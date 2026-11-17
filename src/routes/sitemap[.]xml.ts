import { createFileRoute } from '@tanstack/react-router'
import { LANDING_PAGES, SITE } from '../content/pages'
import { lp } from '../lib/i18n'

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: () => {
        const paths = ['/', '/gold-calculator', ...LANDING_PAGES.map((p) => `/gold-rate/${p.slug}`)]
        const u = (p: string, l: 'en' | 'ar') => `${SITE.url}${lp(l, p) === '/' ? '' : lp(l, p)}`
        const urls = paths
          .flatMap((p) =>
            (['en', 'ar'] as const).map(
              (l) =>
                `<url><loc>${u(p, l)}</loc><xhtml:link rel="alternate" hreflang="en" href="${u(p, 'en')}"/><xhtml:link rel="alternate" hreflang="ar" href="${u(p, 'ar')}"/><xhtml:link rel="alternate" hreflang="x-default" href="${u(p, 'en')}"/><changefreq>hourly</changefreq></url>`,
            ),
          )
          .join('')
        return new Response(
          `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`,
          { headers: { 'Content-Type': 'application/xml', 'Cache-Control': 'public, max-age=3600' } },
        )
      },
    },
  },
})
