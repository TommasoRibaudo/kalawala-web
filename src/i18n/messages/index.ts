import type { Locale } from '../locales';
import { en, type Messages } from './en';
import { es } from './es';
import { de } from './de';
import { fr } from './fr';
import { it } from './it';
import { pt } from './pt';

export type { Messages } from './en';

const CATALOGS: Record<Locale, Partial<Messages>> = { en, es, de, fr, it, pt };

/**
 * The complete message catalog for a locale, with English filling any gap.
 *
 * The fallback is what lets DE/FR/IT/PT exist as empty files today: a page in
 * an unreleased language renders entirely in English rather than showing blank
 * labels or `undefined`. Phase 8 fills the catalogs in and the fallback stops
 * being reached.
 *
 * Merged one level deep, which matches the catalog's shape (group -> key). A
 * deep merge would be wrong here anyway: the leaf values include functions, and
 * merging *into* a function is meaningless.
 */
export function getMessages(locale: Locale): Messages {
  const catalog = CATALOGS[locale] ?? {};
  // The per-group spread is correct but not expressible to the compiler: inside
  // the loop `group` is a union, so `en[group]` and `catalog[group]` widen to a
  // union of every group's shape and TypeScript cannot correlate the two sides.
  // The record is built structurally, hence the single assertion on the result.
  const merged: Record<string, unknown> = {};

  for (const group of Object.keys(en) as (keyof Messages)[]) {
    merged[group] = { ...en[group], ...(catalog[group] ?? {}) };
  }

  return merged as Messages;
}
