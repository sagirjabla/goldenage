import { Link } from '@tanstack/react-router'
import { LANDING_PAGES } from '../content/pages'
import { lp, t, type Locale } from '../lib/i18n'

export function Header({ locale, path }: { locale: Locale; path: string }) {
  const d = t(locale)
  const other: Locale = locale === 'en' ? 'ar' : 'en'
  return (
    <header className="bg-ink text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link to={lp(locale)} className="font-display text-xl font-bold text-gold">
          {d.siteName}
        </Link>
        <nav className="flex flex-wrap items-center gap-4 text-sm">
          <Link to={lp(locale)}>{d.nav.home}</Link>
          <Link to={lp(locale, '/gold-calculator')}>{d.nav.calc}</Link>
          <Link to={lp(locale, '/gold-rate/dubai')}>Dubai</Link>
          <a
            href={lp(other, path)}
            hrefLang={other}
            lang={other}
            className="rounded-full border border-gold px-3 py-1 text-gold"
          >
            {d.lang}
          </a>
        </nav>
      </div>
    </header>
  )
}

export function Footer({ locale }: { locale: Locale }) {
  const d = t(locale)
  return (
    <footer className="mt-12 bg-ink text-sm text-white/80">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <p className="font-display text-lg text-gold">{d.siteName}</p>
        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
          {LANDING_PAGES.map((p) => (
            <li key={p.slug}>
              <Link to={lp(locale, `/gold-rate/${p.slug}`)}>
                {locale === 'ar' ? p.ar : p.en}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-white/60">{d.footer}</p>
      </div>
    </footer>
  )
}

export function Shell({ locale, path, children }: { locale: Locale; path: string; children: React.ReactNode }) {
  return (
    <>
      <Header locale={locale} path={path} />
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
      <Footer locale={locale} />
    </>
  )
}
