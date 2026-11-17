export type Locale = 'en' | 'ar'
export const LOCALES: Locale[] = ['en', 'ar']

/** Locale-prefixed path. English is the default (no prefix), Arabic lives under /ar. */
export function lp(locale: Locale, path = '/'): string {
  if (locale === 'en') return path
  return path === '/' ? '/ar' : `/ar${path}`
}

export const dict = {
  en: {
    siteName: 'UAE Gold Price',
    tagline: 'Live gold rate in Dubai & UAE',
    nav: { home: 'Gold Rate', calc: 'Gold Calculator', city: 'Cities', karat: 'Karats' },
    lang: 'العربية',
    perGram: 'per gram',
    karat: 'Karat',
    updated: 'Updated',
    live: 'Live gold rate in AED',
    spot: 'International spot',
    spotUnit: 'USD per troy ounce',
    stale: 'Showing last known price while the live feed reconnects.',
    byKarat: 'Gold price by karat (AED per gram)',
    byWeight: 'Gold price by weight (AED)',
    weight: 'Weight',
    history: 'Recent daily closing prices (24K, AED/gram)',
    date: 'Date',
    close: 'Close',
    calc: {
      title: 'Gold Calculator UAE',
      weight: 'Weight',
      unit: 'Unit',
      karat: 'Karat',
      making: 'Making charges (%)',
      vat: 'VAT 5% on making charges',
      metal: 'Gold value',
      makingAmt: 'Making charges',
      vatAmt: 'VAT',
      total: 'Estimated total (AED)',
      note: 'Indicative estimate based on spot price × purity. Jeweller board rates differ.',
    },
    units: { gram: 'Gram', tola: 'Tola (11.66 g)', sovereign: 'Sovereign (8 g)', ounce: 'Troy ounce', kg: 'Kilogram' },
    faqTitle: 'Frequently asked questions',
    more: 'Explore more gold rates',
    disclaimer:
      'Rates are indicative (international spot × purity), not jeweller board rates. Making charges and VAT are extra when buying jewellery.',
    footer: 'Indicative gold rates for the UAE. Not financial advice.',
  },
  ar: {
    siteName: 'سعر الذهب في الإمارات',
    tagline: 'سعر الذهب المباشر في دبي والإمارات',
    nav: { home: 'سعر الذهب', calc: 'حاسبة الذهب', city: 'المدن', karat: 'العيارات' },
    lang: 'English',
    perGram: 'للجرام',
    karat: 'العيار',
    updated: 'آخر تحديث',
    live: 'سعر الذهب المباشر بالدرهم',
    spot: 'السعر العالمي',
    spotUnit: 'دولار للأونصة',
    stale: 'نعرض آخر سعر معروف حتى يعود الاتصال بالسعر المباشر.',
    byKarat: 'سعر الذهب حسب العيار (درهم للجرام)',
    byWeight: 'سعر الذهب حسب الوزن (درهم)',
    weight: 'الوزن',
    history: 'أسعار الإغلاق اليومية الأخيرة (عيار 24، درهم/جرام)',
    date: 'التاريخ',
    close: 'الإغلاق',
    calc: {
      title: 'حاسبة الذهب في الإمارات',
      weight: 'الوزن',
      unit: 'الوحدة',
      karat: 'العيار',
      making: 'المصنعية (%)',
      vat: 'ضريبة القيمة المضافة 5% على المصنعية',
      metal: 'قيمة الذهب',
      makingAmt: 'المصنعية',
      vatAmt: 'الضريبة',
      total: 'الإجمالي التقديري (درهم)',
      note: 'تقدير استرشادي حسب السعر العالمي × النقاء. أسعار محلات الذهب قد تختلف.',
    },
    units: { gram: 'جرام', tola: 'تولة (11.66 جم)', sovereign: 'جنيه (8 جم)', ounce: 'أونصة', kg: 'كيلوجرام' },
    faqTitle: 'الأسئلة الشائعة',
    more: 'المزيد من أسعار الذهب',
    disclaimer:
      'الأسعار استرشادية (السعر العالمي × النقاء) وليست أسعار محلات الذهب. المصنعية والضريبة تُضاف عند شراء المشغولات.',
    footer: 'أسعار ذهب استرشادية للإمارات. ليست نصيحة مالية.',
  },
} as const

export type Dict = (typeof dict)['en']
export const t = (l: Locale): Dict => dict[l] as unknown as Dict

export function fmt(n: number, l: Locale, digits = 2): string {
  return new Intl.NumberFormat(l === 'ar' ? 'ar-AE-u-nu-latn' : 'en-AE', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(n)
}

export function fmtDateTime(iso: string, l: Locale): string {
  return new Intl.DateTimeFormat(l === 'ar' ? 'ar-AE-u-nu-latn' : 'en-GB', {
    timeZone: 'Asia/Dubai',
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(iso))
}
