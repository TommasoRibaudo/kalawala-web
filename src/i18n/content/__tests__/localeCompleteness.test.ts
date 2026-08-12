/**
 * Phase 11 P1: regression coverage for the exact bug class that shipped
 * twice already (two blog articles in Phase 8, PROPERTY_MARKETING_CONFIG
 * itself before the 2026-08-10 fix) — a content module missing a released
 * locale's block. `tsc` cannot catch this: these modules are typed
 * `Partial<Record<Locale, T>>` on purpose (an unreleased locale is allowed
 * to be absent), so a *released* locale silently missing its block is a
 * runtime-only gap, invisible to the compiler and to a reader skimming the
 * source, that quietly renders English instead.
 *
 * Strategy: every accessor below falls back to English via
 * `map[locale] ?? map[DEFAULT_LOCALE]!` (see listings.ts/blog.tsx/
 * discover.tsx) or `value[locale] ?? value.en` (pickLocalized). When a
 * locale's entry is present, the accessor returns a distinct object built
 * from that entry — never the literal English object. When it's absent, the
 * fallback hands back the *exact same reference* as calling with 'en'. So
 * reference inequality against the 'en' call is a precise, zero-false-positive
 * signal for "this locale's block exists" — it doesn't depend on the
 * translated text actually differing from English (which can legitimately
 * happen for short proper nouns, e.g. "Casa Areka").
 */
import { RELEASED_LOCALES, type Locale } from '../../locales';
import { listingContent, type ListingKey } from '../listings';
import { discoverContent } from '../discover';
import {
  tenHoursInPuertoContent,
  puertoViejoByPlaneContent,
  twoDaysInPVContent,
  gettingToGandocaContent,
  travellingToPuertoContent,
  cahuitaParkContent,
  bestTimeToVisitContent,
  indigenousTravelContent,
  puertoHiddenGemsContent,
  busHoursContent,
  weatherHubContent,
  weatherJanuaryContent,
  weatherFebruaryContent,
  weatherMarchContent,
  weatherAprilContent,
  weatherMayContent,
  weatherJuneContent,
  weatherJulyContent,
  weatherAugustContent,
  weatherSeptemberContent,
  weatherOctoberContent,
  weatherNovemberContent,
  weatherDecemberContent,
  sanJoseOptionsContent,
} from '../blog';
import { PROPERTY_MARKETING_CONFIG, RECOMMENDATION_REASONS } from '../../../utils/constants';

const NON_ENGLISH_LOCALES = RELEASED_LOCALES.filter((locale) => locale !== 'en');

const LISTING_KEYS: ListingKey[] = [
  'Areka', 'Delfin', 'Geco', 'Giulia', 'Pappagallo',
  'Plumeria', 'Rana', 'Tucano', 'VillaCoral', 'VillaMar',
];

const BLOG_ACCESSORS: Record<string, (locale: Locale) => unknown> = {
  tenHoursInPuerto: tenHoursInPuertoContent,
  puertoViejoByPlane: puertoViejoByPlaneContent,
  twoDaysInPV: twoDaysInPVContent,
  gettingToGandoca: gettingToGandocaContent,
  travellingToPuerto: travellingToPuertoContent,
  cahuitaPark: cahuitaParkContent,
  bestTimeToVisit: bestTimeToVisitContent,
  indigenousTravel: indigenousTravelContent,
  puertoHiddenGems: puertoHiddenGemsContent,
  busHours: busHoursContent,
  weatherHub: weatherHubContent,
  weatherJanuary: weatherJanuaryContent,
  weatherFebruary: weatherFebruaryContent,
  weatherMarch: weatherMarchContent,
  weatherApril: weatherAprilContent,
  weatherMay: weatherMayContent,
  weatherJune: weatherJuneContent,
  weatherJuly: weatherJulyContent,
  weatherAugust: weatherAugustContent,
  weatherSeptember: weatherSeptemberContent,
  weatherOctober: weatherOctoberContent,
  weatherNovember: weatherNovemberContent,
  weatherDecember: weatherDecemberContent,
  sanJoseOptions: sanJoseOptionsContent,
};

describe('Locale completeness — content modules never silently fall back to English', () => {
  describe.each(LISTING_KEYS)('content/listings.ts: %s', (key) => {
    const english = listingContent(key, 'en');
    test.each(NON_ENGLISH_LOCALES)('has its own %s block', (locale) => {
      expect(listingContent(key, locale)).not.toBe(english);
    });
  });

  describe.each(Object.entries(BLOG_ACCESSORS))('content/blog.tsx: %s', (_name, accessor) => {
    const english = accessor('en');
    test.each(NON_ENGLISH_LOCALES)('has its own %s block', (locale) => {
      expect(accessor(locale)).not.toBe(english);
    });
  });

  describe('content/discover.tsx', () => {
    const english = discoverContent('en');
    test.each(NON_ENGLISH_LOCALES)('has its own %s block', (locale) => {
      expect(discoverContent(locale)).not.toBe(english);
    });
  });

  describe.each(Object.keys(PROPERTY_MARKETING_CONFIG))(
    'constants.ts PROPERTY_MARKETING_CONFIG: %s',
    (propertyKey) => {
      const config = PROPERTY_MARKETING_CONFIG[propertyKey];
      test.each(NON_ENGLISH_LOCALES)('has %s for descriptiveTitle, socialStatement, featureHighlights', (locale) => {
        expect(config.descriptiveTitle).toHaveProperty(locale);
        expect(config.socialStatement).toHaveProperty(locale);
        expect(config.featureHighlights).toHaveProperty(locale);
      });
    },
  );

  describe.each(Object.keys(RECOMMENDATION_REASONS))(
    'constants.ts RECOMMENDATION_REASONS: %s',
    (reasonKey) => {
      const localized = RECOMMENDATION_REASONS[reasonKey];
      test.each(NON_ENGLISH_LOCALES)('has %s', (locale) => {
        expect(localized).toHaveProperty(locale);
      });
    },
  );
});
