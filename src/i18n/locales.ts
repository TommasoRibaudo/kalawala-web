/**
 * The set of languages the site is being built for.
 *
 * See docs/i18n-rollout-plan.md. All eight are declared here so the type work
 * happens once — code written against `Locale` keeps compiling as each
 * language's content arrives. Until then an unreleased locale resolves to
 * English at every lookup site, which is the intended interim behaviour.
 *
 * `RELEASED_LOCALES` is the separate, narrower question of what a visitor is
 * allowed to pick. Do not offer a language in the switcher until its content
 * exists, or the switcher navigates to pages that do not.
 */

export const LOCALES = ['en', 'es', 'de', 'fr', 'it', 'pt', 'he', 'hi', 'nl'] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

/** Locales with real content, i.e. what the language switcher may offer. */
export const RELEASED_LOCALES: readonly Locale[] = ['en', 'es', 'de', 'fr', 'it', 'pt', 'he', 'hi', 'nl'];

export type Direction = 'ltr' | 'rtl';

/**
 * Native names, deliberately — a German speaker scanning for their language
 * looks for "Deutsch", not "German". `flag` is an ISO 3166-1 alpha-2 code for
 * the `country-flag-icons` components the switcher uses.
 *
 * `dir` drives the `dir` attribute on <html> and the `rtl` prop on the
 * react-slick carousels. Hebrew is the only right-to-left language here; it is
 * declared per-locale rather than as a lone `isHebrew` check for the same
 * reason `isSpanish` had to go — a boolean cannot describe the next RTL
 * language (Arabic, Farsi) if one is ever added.
 */
export const LOCALE_META: Record<Locale, { nativeName: string; flag: string; dir: Direction }> = {
  en: { nativeName: 'English', flag: 'US', dir: 'ltr' },
  es: { nativeName: 'Español', flag: 'ES', dir: 'ltr' },
  de: { nativeName: 'Deutsch', flag: 'DE', dir: 'ltr' },
  fr: { nativeName: 'Français', flag: 'FR', dir: 'ltr' },
  it: { nativeName: 'Italiano', flag: 'IT', dir: 'ltr' },
  pt: { nativeName: 'Português', flag: 'PT', dir: 'ltr' },
  he: { nativeName: 'עברית', flag: 'IL', dir: 'rtl' },
  hi: { nativeName: 'हिन्दी', flag: 'IN', dir: 'ltr' },
  nl: { nativeName: 'Nederlands', flag: 'NL', dir: 'ltr' },
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function directionOf(locale: Locale): Direction {
  return LOCALE_META[locale].dir;
}

/**
 * BCP-47 tag for `Intl.NumberFormat`/`Intl.DateTimeFormat` calls in the
 * booking flow — `${locale}-${flag}` for every locale except Spanish, which
 * intentionally resolves to Costa Rica (`es-CR`) rather than Spain (`es-ES`):
 * see `formatBookingMoney` in `src/utils/money.ts` for why.
 */
export function intlLocaleTag(locale: Locale): string {
  if (locale === 'es') return 'es-CR';
  return `${locale}-${LOCALE_META[locale].flag}`;
}
