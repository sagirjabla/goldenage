import { CurrencyBox, Faq, Hero, History, KaratTable, LinkGrid, WeightTable } from './rates'
import { Calculator } from './calculator'
import { Shell } from './layout'
import { findPage, pageIntro, pageTitle, SITE } from '../content/pages'
import { pageHead } from '../lib/seo'
import { fmt, t, type Locale } from '../lib/i18n'
import { aedPerGram } from '../lib/gold-math'
import type { HistoryRow, Rates } from '../lib/price-types'

export function homeHead(locale: Locale, rates?: Rates) {
  const g = rates ? fmt(aedPerGram(rates.spotUsdOz, 24), locale) : ''
  return pageHead({
    locale,
    path: '/',
    faq: true,
    title:
      locale === 'en'
        ? 'Gold Rate in Dubai Today – Live 24K, 22K, 21K Gold Price UAE'
        : 'سعر الذهب في دبي اليوم – سعر جرام الذهب عيار 24 و22 و21 في الإمارات',
    description:
      locale === 'en'
        ? `Live gold rate in Dubai & UAE today: 24K at ${g} AED per gram. Prices for 22K, 21K, 18K, tola and ounce, plus a free gold calculator.`
        : `سعر الذهب اليوم في دبي والإمارات: عيار 24 بسعر ${g} درهم للجرام. أسعار عيار 22 و21 و18 والتولة والأونصة مع حاسبة ذهب مجانية.`,
  })
}

export function HomeView({ locale, rates, history }: { locale: Locale; rates: Rates; history: HistoryRow[] }) {
  const d = t(locale)
  return (
    <Shell locale={locale} path="/">
      <Hero
        locale={locale}
        rates={rates}
        h1={locale === 'en' ? 'Gold Rate in Dubai & UAE Today' : 'سعر الذهب في دبي والإمارات اليوم'}
        intro={d.tagline}
      />
      <KaratTable locale={locale} rates={rates} />
      <WeightTable locale={locale} rates={rates} />
      <section className="mt-8">
        <h2 className="text-2xl font-bold">{d.calc.title}</h2>
        <div className="mt-3"><Calculator locale={locale} spotUsdOz={rates.spotUsdOz} /></div>
      </section>
      <History locale={locale} rows={history} />
      <Faq locale={locale} />
      <LinkGrid locale={locale} />
    </Shell>
  )
}

export function calcHead(locale: Locale) {
  return pageHead({
    locale,
    path: '/gold-calculator',
    title:
      locale === 'en'
        ? 'Gold Calculator UAE – Jewellery Price with Making Charges & VAT'
        : 'حاسبة الذهب في الإمارات – سعر المشغولات مع المصنعية والضريبة',
    description:
      locale === 'en'
        ? 'Free gold calculator for the UAE. Enter weight, karat, making charges and VAT to estimate the price of gold jewellery in AED.'
        : 'حاسبة ذهب مجانية للإمارات. أدخل الوزن والعيار والمصنعية والضريبة لتقدير سعر المشغولات الذهبية بالدرهم.',
    crumbs: [{ name: t(locale).siteName, path: '/' }, { name: t(locale).calc.title, path: '/gold-calculator' }],
  })
}

export function CalcView({ locale, rates }: { locale: Locale; rates: Rates }) {
  const d = t(locale)
  return (
    <Shell locale={locale} path="/gold-calculator">
      <h1 className="text-3xl font-bold">{d.calc.title}</h1>
      <p className="mb-4 mt-2 text-ink/70">{d.disclaimer}</p>
      <Calculator locale={locale} spotUsdOz={rates.spotUsdOz} />
      <KaratTable locale={locale} rates={rates} />
      <Faq locale={locale} />
      <LinkGrid locale={locale} />
    </Shell>
  )
}

export function landingHead(locale: Locale, slug: string, rates?: Rates) {
  const p = findPage(slug)
  if (!p) return {}
  const g = rates ? ` ${fmt(aedPerGram(rates.spotUsdOz, p.karat ?? 24), locale)} AED/${locale === 'ar' ? 'جم' : 'g'}.` : ''
  return pageHead({
    locale,
    path: `/gold-rate/${slug}`,
    faq: true,
    title: pageTitle(p, locale),
    description: `${pageIntro(p, locale)}${g}`.slice(0, 300),
    crumbs: [
      { name: t(locale).siteName, path: '/' },
      { name: locale === 'ar' ? p.ar : p.en, path: `/gold-rate/${slug}` },
    ],
  })
}

export function LandingView({ locale, slug, rates }: { locale: Locale; slug: string; rates: Rates }) {
  const p = findPage(slug)!
  return (
    <Shell locale={locale} path={`/gold-rate/${slug}`}>
      <Hero locale={locale} rates={rates} h1={pageTitle(p, locale)} intro={pageIntro(p, locale)} karat={p.karat ?? 24} />
      {p.currency && <CurrencyBox locale={locale} rates={rates} code={p.currency} />}
      <KaratTable locale={locale} rates={rates} />
      <WeightTable locale={locale} rates={rates} />
      <Faq locale={locale} />
      <LinkGrid locale={locale} exclude={slug} />
    </Shell>
  )
}

export { SITE }
