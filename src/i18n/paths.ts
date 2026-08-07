import type { Locale } from './locales';

/**
 * Locale-aware route helpers.
 *
 * `/bookES` vs `/book` was computed inline in three separate components, which
 * is the same duplication that produced nine copies of the Spanish-route check.
 * One copy here instead.
 *
 * PHASE 4 deletes this file: routes.config.ts becomes the single route table and
 * these become lookups in it. Until then this keeps the suffix arithmetic in one
 * place so there is exactly one thing to replace.
 */

/** The legacy route suffix: "ES" for Spanish, "" for everything else. */
export function localeSuffix(locale: Locale): string {
  return locale === 'es' ? 'ES' : '';
}

export function bookingPath(locale: Locale): string {
  return `/book${localeSuffix(locale)}`;
}

/**
 * The home route. English is the one locale whose home is the bare root rather
 * than a suffixed page, which is why this cannot be `/Home${localeSuffix()}`.
 *
 * PHASE 4 keeps `/` as the canonical English home and 301s `/en/` to it, so the
 * asymmetry outlives this file — it just moves into routes.config.ts.
 */
export function homePath(locale: Locale): string {
  return locale === 'es' ? '/HomeES' : '/';
}

export function blogPath(locale: Locale): string {
  return `/blog${localeSuffix(locale)}`;
}

export function portalPath(locale: Locale): string {
  return `/portal${localeSuffix(locale)}`;
}

/**
 * Language for the booking flow, which is translated only into English and
 * Spanish — its strings live in `bookingStrings`, not in the message catalogs,
 * because the booking widget and the portal share them.
 *
 * Deliberately narrower than `Locale`: a German visitor gets the English
 * booking UI rather than a missing one. When the booking flow is translated,
 * widen the return type and the call sites will tell you what needs updating.
 */
export function bookingLanguage(locale: Locale): 'en' | 'es' {
  return locale === 'es' ? 'es' : 'en';
}
