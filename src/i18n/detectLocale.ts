import { DEFAULT_LOCALE, Locale } from './locales';

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
 * PHASE 1 (now): derives the locale from the legacy `…ES` route suffix.
 * PHASE 4: routes become `/es/plumeria` and this reads the `:locale` segment
 *          instead. That is a change to this file alone — every caller keeps
 *          working, which is the whole point of centralising it now.
 */
export function detectLocaleFromPath(pathname: string): Locale {
  // Case-sensitive on purpose. Every Spanish route ends in a literal uppercase
  // "ES" (/HomeES, /PlumeriaES, /bookES). One of the old copies lowercased the
  // path first, which would also match a route ending in "es" — none exist
  // today, but /puertoHiddenGems and /bushours sit one rename away from it.
  //
  // The `ES/` clause catches nested Spanish routes whose suffix is not at the
  // end: /bookES/return, /bookES/confirmed, /portalES/:reservationPublicId.
  const spanish = pathname.endsWith('ES') || pathname.includes('ES/');
  return spanish ? 'es' : DEFAULT_LOCALE;
}
