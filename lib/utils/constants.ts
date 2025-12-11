export const WEEKDAYS = [
  { id: 0, name: 'Lunes', short: 'LUN' },
  { id: 1, name: 'Martes', short: 'MAR' },
  { id: 2, name: 'Miércoles', short: 'MIE' },
  { id: 3, name: 'Jueves', short: 'JUE' },
  { id: 4, name: 'Viernes', short: 'VIE' },
  { id: 5, name: 'Sábado', short: 'SAB' },
  { id: 6, name: 'Domingo', short: 'DOM' },
] as const

export const DEFAULT_TIME_SLOTS = ['8:00', '10:00', '13:00', '16:00'] as const

export const MAX_SERVICE_PHOTOS = 5
export const MAX_GUIDE_PHOTOS = 3

export const MAX_BIO_LENGTH = 300
export const MAX_DESCRIPTION_LENGTH = 300

export const SUPPORTED_LANGUAGES = ['es', 'en', 'fr', 'pt', 'de', 'it', 'zh', 'ja'] as const
export type Language = typeof SUPPORTED_LANGUAGES[number]

export const LANGUAGE_NAMES: Record<Language, string> = {
  es: 'Español',
  en: 'English',
  fr: 'Français',
  pt: 'Português',
  de: 'Deutsch',
  it: 'Italiano',
  zh: '中文',
  ja: '日本語'
}

export const DEFAULT_LANGUAGE: Language = 'es'
