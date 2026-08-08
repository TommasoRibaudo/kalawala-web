import type { Locale } from './locales';
import { pathForKey } from '../routes.config';

/**
 * Locale-aware route helpers.
 *
 * `/bookES` vs `/book` was computed inline in three separate components, which
 * is the same duplication that produced nine copies of the Spanish-route check.
 * One copy here instead.
 *
 * PHASE 4: `homePath`/`bookingPath`/`blogPath`/`portalPath` now delegate to
 * `routes.config.ts`'s `pathForKey` instead of computing an `…ES` suffix
 * themselves — routes.config.ts is the actual route table now. Kept as
 * named wrappers rather than inlining `pathForKey` at every call site: every
 * existing caller (FixedNavigation, Footer, ~20 blog/listing pages'
 * WhyStayWithUs `ctaLink`) picks up the new `/en/…` / `/es/…` paths with no
 * change of their own. `localeSuffix` stays for the canonical/hreflang
 * `<link>` blocks Phase 6 rewrites from routes.config.ts directly — those
 * are out of scope here, so the string-suffix path they use is unchanged for
 * now.
 */

/** The legacy route suffix: "ES" for Spanish, "" for everything else. Still
 * used by canonical/hreflang tags until Phase 6 rewrites those from
 * routes.config.ts; internal navigation should use the functions below
 * instead. */
export function localeSuffix(locale: Locale): string {
  return locale === 'es' ? 'ES' : '';
}

export function bookingPath(locale: Locale): string {
  return pathForKey('book', locale);
}

export function homePath(locale: Locale): string {
  return pathForKey('home', locale);
}

export function blogPath(locale: Locale): string {
  return pathForKey('blog', locale);
}

export function portalPath(locale: Locale): string {
  return pathForKey('portal', locale);
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
