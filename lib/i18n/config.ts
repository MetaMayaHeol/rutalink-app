export const locales = ['es', 'fr', 'en'] as const
export const defaultLocale = 'es' as const

export type Locale = (typeof locales)[number]

// URL path translations for each locale
export const pathTranslations: Record<Locale, Record<string, string>> = {
  es: {
    ciudad: 'ciudad',
    actividad: 'actividad',
    explorar: 'explorar',
    soporte: 'soporte',
    faq: 'faq',
  },
  fr: {
    ciudad: 'ville',
    actividad: 'activite',
    explorar: 'explorer',
    soporte: 'support',
    faq: 'faq',
  },
  en: {
    ciudad: 'city',
    actividad: 'activity',
    explorar: 'explore',
    soporte: 'support',
    faq: 'faq',
  },
}

// Get translated path for a given locale
export function getLocalizedPath(path: string, locale: Locale): string {
  const translations = pathTranslations[locale]
  let localizedPath = path
  
  for (const [key, _value] of Object.entries(pathTranslations.es)) {
    if (path.includes(`/${key}`)) {
      localizedPath = localizedPath.replace(`/${key}`, `/${translations[key]}`)
    }
  }
  
  return localizedPath
}
