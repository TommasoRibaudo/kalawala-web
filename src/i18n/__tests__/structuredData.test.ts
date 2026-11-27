import { vacationRentalJsonLd } from '../structuredData';
import type { ListingKey } from '../content/listings';

const TOWN_LOCALITY = 'Puerto Viejo de Talamanca';
const PLAYA_CHIQUITA_LOCALITY = 'Playa Chiquita, Puerto Viejo de Talamanca';
const TOWN_STREET = 'Street behind Bakery Degustibus';
const PLAYA_CHIQUITA_STREET = 'Musa Villas, behind Arena Blanca';

// Properties with fewer than 8 real photos genuinely can't clear Google's
// "image must be defined at least 8 times" warning without inventing fake
// images — this table asserts the honest count rather than hiding the gap.
const EXPECTED: Record<
  ListingKey,
  {
    additionalType: 'House' | 'Villa';
    addressLocality: string;
    streetAddress: string;
    imageCount: number;
    bedCount: number;
    /** Guest reviews in reviewsData.ts. 3 everywhere except a brand-new listing. */
    reviewCount?: number;
    /** False when the property has no static fallback price (no Offer emitted). */
    hasOffer?: boolean;
  }
> = {
  Geco: { additionalType: 'House', addressLocality: TOWN_LOCALITY, streetAddress: TOWN_STREET, imageCount: 8, bedCount: 3 },
  Rana: { additionalType: 'House', addressLocality: TOWN_LOCALITY, streetAddress: TOWN_STREET, imageCount: 9, bedCount: 3 },
  Tucano: { additionalType: 'House', addressLocality: TOWN_LOCALITY, streetAddress: TOWN_STREET, imageCount: 9, bedCount: 3 },
  Pappagallo: { additionalType: 'House', addressLocality: TOWN_LOCALITY, streetAddress: TOWN_STREET, imageCount: 8, bedCount: 3 },
  Delfin: { additionalType: 'House', addressLocality: TOWN_LOCALITY, streetAddress: TOWN_STREET, imageCount: 9, bedCount: 1 },
  Areka: { additionalType: 'House', addressLocality: PLAYA_CHIQUITA_LOCALITY, streetAddress: PLAYA_CHIQUITA_STREET, imageCount: 9, bedCount: 1 },
  Giulia: { additionalType: 'House', addressLocality: PLAYA_CHIQUITA_LOCALITY, streetAddress: PLAYA_CHIQUITA_STREET, imageCount: 9, bedCount: 1 },
  Plumeria: { additionalType: 'House', addressLocality: PLAYA_CHIQUITA_LOCALITY, streetAddress: PLAYA_CHIQUITA_STREET, imageCount: 6, bedCount: 1 },
  Lirio: { additionalType: 'House', addressLocality: PLAYA_CHIQUITA_LOCALITY, streetAddress: PLAYA_CHIQUITA_STREET, imageCount: 7, bedCount: 1, reviewCount: 0, hasOffer: false },
  VillaMar: { additionalType: 'Villa', addressLocality: PLAYA_CHIQUITA_LOCALITY, streetAddress: PLAYA_CHIQUITA_STREET, imageCount: 7, bedCount: 1 },
  VillaCoral: { additionalType: 'Villa', addressLocality: PLAYA_CHIQUITA_LOCALITY, streetAddress: PLAYA_CHIQUITA_STREET, imageCount: 7, bedCount: 1 },
};

const LISTING_KEYS = Object.keys(EXPECTED) as ListingKey[];

describe('vacationRentalJsonLd', () => {
  describe.each(LISTING_KEYS)('%s', (key) => {
    const expected = EXPECTED[key];

    test.each(['en', 'es'] as const)('emits the expected fields for locale %s', (locale) => {
      const jsonLd = vacationRentalJsonLd(key, locale) as any;

      expect(jsonLd.additionalType).toBe(expected.additionalType);
      expect(jsonLd.address.addressLocality).toBe(expected.addressLocality);
      expect(jsonLd.address.streetAddress).toBe(expected.streetAddress);
      expect(jsonLd.address.postalCode).toBe('70403');

      // Regression guard: this enum value already matches Google's documented
      // format — GSC's "invalid enum" warning on it is stale crawl data, not
      // a live bug, and must not get "fixed" into something non-standard.
      expect(jsonLd.containsPlace.additionalType).toBe('EntirePlace');

      expect(Array.isArray(jsonLd.containsPlace.bed)).toBe(true);
      expect(jsonLd.containsPlace.bed).toHaveLength(expected.bedCount);
      jsonLd.containsPlace.bed.forEach((b: any) => {
        expect(b.numberOfBeds).toBeGreaterThan(0);
        expect(['King', 'Queen', 'Double', 'Single']).toContain(b.typeOfBed);
      });

      expect(Array.isArray(jsonLd.image)).toBe(true);
      expect(jsonLd.image).toHaveLength(expected.imageCount);

      // A brand-new listing (Lirio) has no reviews yet: neither field may be
      // emitted, since an empty review list or a zero-count AggregateRating
      // is invalid structured data.
      const reviewCount = expected.reviewCount ?? 3;
      expect(jsonLd.review ?? []).toHaveLength(reviewCount);
      (jsonLd.review ?? []).forEach((r: any) => {
        expect(r.datePublished).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(r.reviewRating.ratingValue).toBe(5);
      });
      expect(jsonLd.aggregateRating).toEqual(
        reviewCount === 0
          ? undefined
          : { '@type': 'AggregateRating', ratingValue: 5, reviewCount, bestRating: 5 },
      );

      // No Offer for a property without a static fallback price (Lirio).
      expect(jsonLd.offers).toEqual(
        expected.hasOffer === false
          ? undefined
          : expect.objectContaining({ '@type': 'Offer', priceCurrency: 'USD' }),
      );

      expect(jsonLd.containsPlace.amenityFeature.length).toBeGreaterThan(0);
    });
  });
});
