import { DEFAULT_LOCALE, isLocale, Locale } from './locales';

/**
 * Single source of truth for "what language is this URL?".
 *
 * Before Phase 1 this logic existed in nine hand-rolled copies — `isSpanishPath`
 * in the flag switcher, `useLanguageDetection`, and seven inline
 * `pathname.endsWith('ES')` checks scattered through components. They had
 * already drifted: some checked `endsWith('ES')`, some also `includes('ES/')`,
 * one special-cased `/HomeES`, one lowercased first. Six languages would have
 * multiplied that drift, so they all now call here.
 *
 * PHASE 1: derived the locale from the legacy `…ES` route suffix.
 * PHASE 4 (now): routes are `/es/plumeria`, so this reads the `:locale`
 * segment instead — a change to this file alone. Every caller (all ~40 of
 * them, via `useLocale()`) keeps working unmodified, which was the whole
 * point of centralising this in Phase 1 before Phase 4 needed to change it.
 */
export function detectLocaleFromPath(pathname: string): Locale {
  // pathname always starts with '/' from react-router, so segment 1 is the
  // first path component: '/es/plumeria' -> 'es', '/plumeria' -> 'plumeria'
  // (not a locale, falls through to DEFAULT_LOCALE), '/' -> '' (ditto).
  const firstSegment = pathname.split('/')[1];
  return isLocale(firstSegment) ? firstSegment : DEFAULT_LOCALE;
}
