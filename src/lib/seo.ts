import { SITE } from '../content/pages'
import { FAQ } from '../content/pages'
import type { Locale } from './i18n'
import { lp } from './i18n'

const abs = (p: string) => `${SITE.url}${p === '/' ? '' : p}` || SITE.url

export function pageHead(o: {
  locale: Locale
  path: string // locale-less path, e.g. '/gold-calculator'
  title: string
  description: string
  faq?: boolean
  crumbs?: { name: string; path: string }[]
}) {
  const url = abs(lp(o.locale, o.path))
  const en = abs(lp('en', o.path))
  const ar = abs(lp('ar', o.path))
  const ld: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: o.title,
      description: o.description,
      url,
      inLanguage: o.locale,
    },
  ]
  if (o.faq)
    ld.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ[o.locale].map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    })
  if (o.crumbs)
    ld.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: o.crumbs.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: c.name,
        item: abs(lp(o.locale, c.path)),
      })),
    })
  return {
    meta: [
      { title: o.title },
      { name: 'description', content: o.description },
      { property: 'og:title', content: o.title },
      { property: 'og:description', content: o.description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: url },
      { property: 'og:locale', content: o.locale === 'ar' ? 'ar_AE' : 'en_AE' },
      { name: 'twitter:card', content: 'summary' },
    ],
    scripts: ld.map((j) => ({ type: 'application/ld+json', children: JSON.stringify(j) })),
    links: [
      { rel: 'canonical', href: url },
      { rel: 'alternate', hrefLang: 'en', href: en },
      { rel: 'alternate', hrefLang: 'ar', href: ar },
      { rel: 'alternate', hrefLang: 'x-default', href: en },
    ],
  }
}
