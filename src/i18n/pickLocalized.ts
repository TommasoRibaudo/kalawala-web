import { DEFAULT_LOCALE, type Locale } from './locales';

/**
 * A value that exists in several languages, stored alongside the data it
 * belongs to rather than in a message catalog.
 *
 * This is the second half of i18n in this codebase, and it is a genuinely
 * different problem from UI chrome. Per-property marketing copy, review bodies
 * and blog titles are *content*: they live with their record in constants.ts,
 * they are edited by whoever edits the listing, and there is one of them per
 * property rather than one per screen. Forcing them into the message catalog
 * would mean a catalog with hundreds of property-specific keys.
 *
 * English is required; every other language is optional and falls back to it,
 * for the same reason the message catalogs do — an untranslated property should
 * render in English, not blank.
 */
export type LocalizedValue<T> = { en: T } & Partial<Record<Locale, T>>;

export function pickLocalized<T>(value: LocalizedValue<T>, locale: Locale): T {
  // `value.en` rather than `value[DEFAULT_LOCALE]`: DEFAULT_LOCALE is typed as
  // the wide `Locale`, so indexing with it yields `T | undefined` and loses the
  // guarantee the `{ en: T }` half of the type is there to provide.
  return value[locale] ?? value.en;
}
