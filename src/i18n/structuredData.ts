import type { Locale } from './locales';
import type { RouteKey } from '../routes.config';
import type { ListingKey } from './content/listings';
import { listingContent } from './content/listings';
import { canonicalUrl } from './seo';
import { localeSuffix } from './paths';
import {
  PROPERTY_CAPACITY,
  PROPERTY_MARKETING_CONFIG,
  houseDataByLangCode,
  gecoImageDescriptions,
  pappagalloImageDescriptions,
  ranaImageDescriptions,
  tucanoImageDescriptions,
  delfinImageDescriptions,
  delfinImageDescriptionsES,
  VillaCoralImageDescriptions,
  VillaMarImageDescriptions,
  ArekaImageDescriptions,
  ArekaImageDescriptionsES,
  GiuliaImageDescriptions,
  GiuliaImageDescriptionsES,
  PlumeriaImageDescriptions,
  PlumeriaImageDescriptionsES,
} from '../utils/constants';
import type { IImageDescription } from '../utils/constants';
import { GUEST_REVIEWS } from '../components/GuestReviews/reviewsData';

interface BedDetail {
  numberOfBeds: number;
  typeOfBed: 'King' | 'Queen' | 'Double' | 'Single';
}

interface PropertyStructuredDataMeta {
  routeKey: RouteKey;
  name: string;
  additionalType: 'House' | 'Villa';
  addressLocality: string;
  streetAddress: string;
  bed: BedDetail[];
  petsAllowed?: boolean;
}

const POSTAL_CODE = '70403';

/**
 * Facts that aren't already derivable from PROPERTY_CAPACITY / PROPERTY_MARKETING_CONFIG
 * / listingContent. addressLocality/streetAddress mirror the real town-vs-Playa-Chiquita
 * grouping already in constants.ts's `location` field — Costa Rican addresses are
 * descriptive, not numbered, so there's no street-number data to have. bed is
 * property-owner-supplied ground truth, not derivable from anywhere else in the
 * codebase; "matrimonial" beds map to schema.org's Double (nearest enum value), and
 * each property's sofa bed is kept as its own Single entry rather than folded into
 * the regular bed count.
 */
const PROPERTY_META: Record<ListingKey, PropertyStructuredDataMeta> = {
  Geco: {
    routeKey: 'geco',
    name: 'Casa Geco',
    additionalType: 'House',
    addressLocality: 'Puerto Viejo de Talamanca',
    streetAddress: 'Street behind Bakery Degustibus',
    bed: [
      { numberOfBeds: 1, typeOfBed: 'Queen' },
      { numberOfBeds: 1, typeOfBed: 'Double' },
      { numberOfBeds: 1, typeOfBed: 'Single' },
    ],
    petsAllowed: true,
  },
  Rana: {
    routeKey: 'rana',
    name: 'Casa Rana',
    additionalType: 'House',
    addressLocality: 'Puerto Viejo de Talamanca',
    streetAddress: 'Street behind Bakery Degustibus',
    bed: [
      { numberOfBeds: 1, typeOfBed: 'Queen' },
      { numberOfBeds: 1, typeOfBed: 'Double' },
      { numberOfBeds: 1, typeOfBed: 'Single' },
    ],
    petsAllowed: true,
  },
  Tucano: {
    routeKey: 'tucano',
    name: 'Casa Tucano',
    additionalType: 'House',
    addressLocality: 'Puerto Viejo de Talamanca',
    streetAddress: 'Street behind Bakery Degustibus',
    bed: [
      { numberOfBeds: 1, typeOfBed: 'King' },
      { numberOfBeds: 2, typeOfBed: 'Single' },
      { numberOfBeds: 1, typeOfBed: 'Single' },
    ],
    petsAllowed: true,
  },
  Pappagallo: {
    routeKey: 'pappagallo',
    name: 'Casa Pappagallo',
    additionalType: 'House',
    addressLocality: 'Puerto Viejo de Talamanca',
    streetAddress: 'Street behind Bakery Degustibus',
    bed: [
      { numberOfBeds: 1, typeOfBed: 'King' },
      { numberOfBeds: 2, typeOfBed: 'Single' },
      { numberOfBeds: 1, typeOfBed: 'Single' },
    ],
    petsAllowed: true,
  },
  Delfin: {
    routeKey: 'delfin',
    name: 'Casa Delfines',
    additionalType: 'House',
    addressLocality: 'Puerto Viejo de Talamanca',
    streetAddress: 'Street behind Bakery Degustibus',
    bed: [{ numberOfBeds: 3, typeOfBed: 'Double' }],
    petsAllowed: false,
  },
  Areka: {
    routeKey: 'areka',
    name: 'Casa Areka',
    additionalType: 'House',
    addressLocality: 'Playa Chiquita, Puerto Viejo de Talamanca',
    streetAddress: 'Musa Villas, behind Arena Blanca',
    bed: [{ numberOfBeds: 1, typeOfBed: 'Queen' }],
  },
  Giulia: {
    routeKey: 'giulia',
    name: 'Casa Giulia',
    additionalType: 'House',
    addressLocality: 'Playa Chiquita, Puerto Viejo de Talamanca',
    streetAddress: 'Musa Villas, behind Arena Blanca',
    bed: [{ numberOfBeds: 2, typeOfBed: 'Queen' }],
  },
  Plumeria: {
    routeKey: 'plumeria',
    name: 'Casa Plumeria',
    additionalType: 'House',
    addressLocality: 'Playa Chiquita, Puerto Viejo de Talamanca',
    streetAddress: 'Musa Villas, behind Arena Blanca',
    bed: [{ numberOfBeds: 1, typeOfBed: 'Queen' }],
  },
  VillaMar: {
    routeKey: 'villamar',
    name: 'Villa Mar',
    additionalType: 'Villa',
    addressLocality: 'Playa Chiquita, Puerto Viejo de Talamanca',
    streetAddress: 'Musa Villas, behind Arena Blanca',
    bed: [{ numberOfBeds: 1, typeOfBed: 'King' }],
  },
  VillaCoral: {
    routeKey: 'villacoral',
    name: 'Villa Coral',
    additionalType: 'Villa',
    addressLocality: 'Playa Chiquita, Puerto Viejo de Talamanca',
    streetAddress: 'Musa Villas, behind Arena Blanca',
    bed: [{ numberOfBeds: 1, typeOfBed: 'King' }],
  },
};

// Mirrors ImagesContainer.component.tsx's actual gallery selection: most
// properties don't have a real, UI-wired Spanish gallery and fall back to
// the English one (its "XxxES" switch cases just reuse the English array),
// so structured data must match what the page actually renders rather than
// assume a distinct ES gallery exists for every property.
const PROPERTY_IMAGES: Record<ListingKey, { en: IImageDescription[]; es?: IImageDescription[] }> = {
  Geco: { en: gecoImageDescriptions },
  Rana: { en: ranaImageDescriptions },
  Tucano: { en: tucanoImageDescriptions },
  Pappagallo: { en: pappagalloImageDescriptions },
  Delfin: { en: delfinImageDescriptions, es: delfinImageDescriptionsES },
  Areka: { en: ArekaImageDescriptions, es: ArekaImageDescriptionsES },
  Giulia: { en: GiuliaImageDescriptions, es: GiuliaImageDescriptionsES },
  Plumeria: { en: PlumeriaImageDescriptions, es: PlumeriaImageDescriptionsES },
  VillaMar: { en: VillaMarImageDescriptions },
  VillaCoral: { en: VillaCoralImageDescriptions },
};

function imagesFor(key: ListingKey, locale: Locale): string[] {
  const gallery = PROPERTY_IMAGES[key];
  const set = locale === 'es' ? (gallery.es ?? gallery.en) : gallery.en;
  return set.map((img) => img.imageLink).filter((link): link is string => Boolean(link));
}

function amenityFeatureFor(key: ListingKey, locale: Locale) {
  const houseData = houseDataByLangCode(`${key}${localeSuffix(locale)}`);
  return (houseData?.amenities ?? []).map((a) => ({
    '@type': 'LocationFeatureSpecification',
    name: a.name,
    value: true,
  }));
}

// GUEST_REVIEWS keys don't match ListingKey 1:1 — they follow the display
// name shown on the page (e.g. "Villa Mar", "Delfines") rather than the
// internal ListingKey.
const GUEST_REVIEWS_KEY: Record<ListingKey, string> = {
  Geco: 'GECO',
  Rana: 'RANA',
  Tucano: 'TUCANO',
  Pappagallo: 'PAPPAGALLO',
  Delfin: 'DELFINES',
  Areka: 'AREKA',
  Giulia: 'GIULIA',
  Plumeria: 'PLUMERIA',
  VillaMar: 'VILLA MAR',
  VillaCoral: 'VILLA CORAL',
};

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

// Reviews only carry month/year precision ("June 2025"); day is fixed at
// 01 purely because schema.org's datePublished needs a full date — not an
// asserted fact about which day the review was posted.
function isoDateFromMonthYear(monthYear: string): string | undefined {
  const [month, year] = monthYear.split(' ');
  const monthIndex = MONTHS.indexOf(month);
  if (monthIndex === -1 || !year) return undefined;
  return `${year}-${String(monthIndex + 1).padStart(2, '0')}-01`;
}

function reviewsFor(key: ListingKey, locale: Locale) {
  const reviews = GUEST_REVIEWS[GUEST_REVIEWS_KEY[key]] ?? [];
  return reviews.map((r) => ({
    '@type': 'Review',
    author: { '@type': 'Person', name: r.reviewer },
    datePublished: isoDateFromMonthYear(r.date),
    reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5 },
    reviewBody: r.text[locale === 'es' ? 'es' : 'en'],
  }));
}

function aggregateRatingFor(key: ListingKey) {
  const reviews = GUEST_REVIEWS[GUEST_REVIEWS_KEY[key]] ?? [];
  if (!reviews.length) return undefined;
  const ratingValue = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  return { '@type': 'AggregateRating', ratingValue, reviewCount: reviews.length, bestRating: 5 };
}

/**
 * Per-listing VacationRental JSON-LD, one containsPlace Accommodation per page.
 *
 * Previously this lived as a single company-wide block in public/index.html with
 * all 10 properties under one VacationRental's containsPlace array. Google Search
 * Console flagged that as "duplicate field containsPlace" — the schema expects
 * containsPlace to hold exactly one Accommodation, not a list, since a VacationRental
 * models one bookable listing. Splitting it per page (one VacationRental + one
 * containsPlace per property) matches that model.
 */
export function vacationRentalJsonLd(key: ListingKey, locale: Locale) {
  const meta = PROPERTY_META[key];
  const capacity = PROPERTY_CAPACITY[key];
  const marketing = PROPERTY_MARKETING_CONFIG[key];
  const content = listingContent(key, locale);
  const url = canonicalUrl(meta.routeKey, locale);
  const images = imagesFor(key, locale);
  const amenityFeature = amenityFeatureFor(key, locale);
  const review = reviewsFor(key, locale);
  const aggregateRating = aggregateRatingFor(key);

  const containsPlace: Record<string, unknown> = {
    '@type': 'Accommodation',
    identifier: meta.routeKey,
    // Google's own vacation-rental docs use this exact bare-string enum
    // value; GSC's "invalid enum value" warning on this field is stale
    // crawl data from before commit 89bf0ac (verified: same 21 URLs, same
    // last-crawl date as the already-fixed "duplicate containsPlace"
    // error), not a live bug — no change needed here.
    additionalType: 'EntirePlace',
    occupancy: { '@type': 'QuantitativeValue', value: capacity.maxGuests },
    numberOfBedrooms: capacity.bedrooms,
    numberOfBathroomsTotal: capacity.bathrooms,
    bed: meta.bed.map((b) => ({ '@type': 'BedDetails', ...b })),
  };
  if (meta.petsAllowed !== undefined) containsPlace.petsAllowed = meta.petsAllowed;
  if (amenityFeature.length) containsPlace.amenityFeature = amenityFeature;

  return {
    '@context': 'https://schema.org',
    '@type': 'VacationRental',
    additionalType: meta.additionalType,
    name: meta.name,
    identifier: meta.routeKey,
    url,
    description: content.seoDescription,
    ...(images.length ? { image: images } : {}),
    address: {
      '@type': 'PostalAddress',
      streetAddress: meta.streetAddress,
      addressLocality: meta.addressLocality,
      addressRegion: 'Limón',
      postalCode: POSTAL_CODE,
      addressCountry: 'CR',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 9.6561, longitude: -82.7539 },
    checkinTime: '15:00',
    checkoutTime: '11:00',
    containsPlace,
    tourBookingPage: url,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: marketing.price.usd,
      availability: 'https://schema.org/InStock',
    },
    ...(review.length ? { review } : {}),
    ...(aggregateRating ? { aggregateRating } : {}),
  };
}
