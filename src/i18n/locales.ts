/**
 * The set of languages the site is being built for.
 *
 * See docs/i18n-rollout-plan.md. All six are declared here from Phase 1 so the
 * type work happens once — code written against `Locale` today keeps compiling
 * when DE/FR/IT/PT content arrives in Phase 8. Until then those four resolve to
 * English at every lookup site, which is the intended interim behaviour.
 *
 * `RELEASED_LOCALES` is the separate, narrower question of what a visitor is
 * allowed to pick. Do not offer a language in the switcher until its content
 * exists, or the switcher navigates to pages that do not.
 */

export const LOCALES = ['en', 'es', 'de', 'fr', 'it', 'pt'] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

/** Locales with real content, i.e. what the language switcher may offer. */
export const RELEASED_LOCALES: readonly Locale[] = ['en', 'es'];

/**
 * Native names, deliberately — a German speaker scanning for their language
 * looks for "Deutsch", not "German". `flag` is an ISO 3166-1 alpha-2 code for
 * the `country-flag-icons` components the switcher uses.
 */
export const LOCALE_META: Record<Locale, { nativeName: string; flag: string }> = {
  en: { nativeName: 'English', flag: 'US' },
  es: { nativeName: 'Español', flag: 'ES' },
  de: { nativeName: 'Deutsch', flag: 'DE' },
  fr: { nativeName: 'Français', flag: 'FR' },
  it: { nativeName: 'Italiano', flag: 'IT' },
  pt: { nativeName: 'Português', flag: 'PT' },
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}
