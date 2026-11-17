import type { Locale } from '../lib/i18n'

export const SITE = {
  // Update when you add a custom domain (also public/robots.txt).
  url: (import.meta.env.VITE_SITE_URL as string | undefined) ?? 'https://uae-gold-price.vercel.app',
}

export type Kind = 'city' | 'karat' | 'unit' | 'currency'
export type LandingPage = {
  slug: string
  kind: Kind
  en: string
  ar: string
  karat?: number
  currency?: string
}

export const LANDING_PAGES: LandingPage[] = [
  { slug: 'dubai', kind: 'city', en: 'Dubai', ar: 'دبي' },
  { slug: 'abu-dhabi', kind: 'city', en: 'Abu Dhabi', ar: 'أبوظبي' },
  { slug: 'sharjah', kind: 'city', en: 'Sharjah', ar: 'الشارقة' },
  { slug: 'ajman', kind: 'city', en: 'Ajman', ar: 'عجمان' },
  { slug: 'al-ain', kind: 'city', en: 'Al Ain', ar: 'العين' },
  { slug: 'ras-al-khaimah', kind: 'city', en: 'Ras Al Khaimah', ar: 'رأس الخيمة' },
  { slug: '24k-gold-price', kind: 'karat', en: '24K', ar: '24', karat: 24 },
  { slug: '22k-gold-price', kind: 'karat', en: '22K', ar: '22', karat: 22 },
  { slug: '21k-gold-price', kind: 'karat', en: '21K', ar: '21', karat: 21 },
  { slug: '18k-gold-price', kind: 'karat', en: '18K', ar: '18', karat: 18 },
  { slug: 'tola', kind: 'unit', en: 'Tola', ar: 'التولة', karat: 24 },
  { slug: 'ounce', kind: 'unit', en: 'Ounce', ar: 'الأونصة', karat: 24 },
  { slug: 'gold-bar', kind: 'unit', en: 'Gold Bar (1 kg)', ar: 'سبيكة الذهب (كيلو)', karat: 24 },
  { slug: 'inr', kind: 'currency', en: 'Indian Rupees (INR)', ar: 'الروبية الهندية', currency: 'INR' },
  { slug: 'pkr', kind: 'currency', en: 'Pakistani Rupees (PKR)', ar: 'الروبية الباكستانية', currency: 'PKR' },
  { slug: 'usd', kind: 'currency', en: 'US Dollars (USD)', ar: 'الدولار الأمريكي', currency: 'USD' },
]

export const findPage = (slug: string) => LANDING_PAGES.find((p) => p.slug === slug)

export function pageTitle(p: LandingPage, l: Locale): string {
  if (l === 'en') {
    if (p.kind === 'city') return `Gold Rate in ${p.en} Today – 24K, 22K, 21K, 18K Price per Gram`
    if (p.kind === 'karat') return `${p.en} Gold Price in UAE Today – per Gram in AED`
    if (p.kind === 'unit') return `Gold Price per ${p.en} in UAE Today (AED)`
    return `Dubai Gold Rate in ${p.en} Today`
  }
  if (p.kind === 'city') return `سعر الذهب في ${p.ar} اليوم – عيار 24 و22 و21 و18 للجرام`
  if (p.kind === 'karat') return `سعر الذهب عيار ${p.ar} في الإمارات اليوم بالدرهم`
  if (p.kind === 'unit') return `سعر الذهب ${p.ar} في الإمارات اليوم بالدرهم`
  return `سعر الذهب في دبي اليوم بـ${p.ar}`
}

export function pageIntro(p: LandingPage, l: Locale): string {
  if (l === 'en') {
    if (p.kind === 'city')
      return `Check today's live gold rate in ${p.en}, UAE for 24K, 22K, 21K and 18K gold, with prices per gram and by weight in dirhams.`
    if (p.kind === 'karat')
      return `Today's ${p.en} gold price in the UAE per gram, tola and ounce, calculated from the live international gold price and the AED peg.`
    if (p.kind === 'unit')
      return `Live gold price per ${p.en.toLowerCase()} in UAE dirhams, updated from the international spot market.`
    return `Live Dubai gold rate converted to ${p.en}, using the international gold price and current exchange rates.`
  }
  if (p.kind === 'city')
    return `تعرف على سعر الذهب اليوم في ${p.ar} بالإمارات لعيار 24 و22 و21 و18، مع الأسعار بالجرام وحسب الوزن بالدرهم.`
  if (p.kind === 'karat')
    return `سعر الذهب عيار ${p.ar} اليوم في الإمارات للجرام والتولة والأونصة، محسوب من السعر العالمي المباشر وسعر صرف الدرهم.`
  if (p.kind === 'unit')
    return `سعر الذهب ${p.ar} اليوم بالدرهم الإماراتي، يتم تحديثه من سوق الذهب العالمي.`
  return `سعر الذهب في دبي اليوم محوّلاً إلى ${p.ar} حسب السعر العالمي وأسعار الصرف الحالية.`
}

export const FAQ: Record<Locale, { q: string; a: string }[]> = {
  en: [
    {
      q: 'What is the gold rate in Dubai today?',
      a: 'The live 24K gold rate in Dubai is shown at the top of this page in AED per gram. It is derived from the international spot price and the fixed AED/USD peg of 3.6725.',
    },
    {
      q: 'What is the difference between 24K, 22K, 21K and 18K gold?',
      a: '24K is 99.9% pure gold. 22K is 91.6%, 21K is 87.5% and 18K is 75% pure. Lower karat gold is mixed with other metals and is more durable for jewellery.',
    },
    {
      q: 'Why is the jeweller price different from this rate?',
      a: 'Jewellers add making charges, their margin and 5% VAT on making charges. Use our gold calculator to estimate the final price.',
    },
    {
      q: 'How much is one tola of gold in UAE?',
      a: 'One tola is 11.6638 grams. Multiply the price per gram by 11.6638 to get the price of one tola.',
    },
  ],
  ar: [
    {
      q: 'كم سعر الذهب في دبي اليوم؟',
      a: 'يظهر سعر الذهب عيار 24 المباشر في دبي أعلى الصفحة بالدرهم للجرام. يُحسب من السعر العالمي وسعر صرف الدرهم الثابت 3.6725 مقابل الدولار.',
    },
    {
      q: 'ما الفرق بين عيار 24 و22 و21 و18؟',
      a: 'عيار 24 ذهب خالص بنسبة 99.9%. عيار 22 بنسبة 91.6% وعيار 21 بنسبة 87.5% وعيار 18 بنسبة 75%. الذهب الأقل عياراً يُخلط بمعادن أخرى فيكون أكثر متانة للمشغولات.',
    },
    {
      q: 'لماذا يختلف سعر محل الذهب عن هذا السعر؟',
      a: 'تضيف المحلات المصنعية وهامش الربح وضريبة 5% على المصنعية. استخدم حاسبة الذهب لتقدير السعر النهائي.',
    },
    {
      q: 'كم سعر تولة الذهب في الإمارات؟',
      a: 'التولة تساوي 11.6638 جرام. اضرب سعر الجرام في 11.6638 لتحصل على سعر التولة.',
    },
  ],
}
