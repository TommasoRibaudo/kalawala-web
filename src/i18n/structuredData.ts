import type { Locale } from './locales';
import type { RouteKey } from '../routes.config';
import type { ListingKey } from './content/listings';
import { listingContent } from './content/listings';
import { canonicalUrl } from './seo';
import { PROPERTY_CAPACITY, PROPERTY_MARKETING_CONFIG } from '../utils/constants';

interface PropertyStructuredDataMeta {
  routeKey: RouteKey;
  name: string;
  petsAllowed?: boolean;
  amenityFeature?: { name: string }[];
}

/**
 * Facts that aren't already derivable from PROPERTY_CAPACITY / PROPERTY_MARKETING_CONFIG
 * / listingContent, carried over verbatim from the old public/index.html containsPlace
 * entries (petsAllowed and amenityFeature were inconsistent per property there too).
 */
const PROPERTY_META: Record<ListingKey, PropertyStructuredDataMeta> = {
  Geco: { routeKey: 'geco', name: 'Casa Geco', petsAllowed: true },
  Rana: { routeKey: 'rana', name: 'Casa Rana', petsAllowed: true },
  Tucano: { routeKey: 'tucano', name: 'Casa Tucano', petsAllowed: true },
  Pappagallo: { routeKey: 'pappagallo', name: 'Casa Pappagallo', petsAllowed: true },
  Delfin: { routeKey: 'delfin', name: 'Casa Delfines', petsAllowed: false },
  Areka: { routeKey: 'areka', name: 'Casa Areka' },
  Giulia: { routeKey: 'giulia', name: 'Casa Giulia' },
  Plumeria: { routeKey: 'plumeria', name: 'Casa Plumeria' },
  VillaMar: {
    routeKey: 'villamar',
    name: 'Villa Mar',
    amenityFeature: [{ name: 'Private Pool' }, { name: 'Dedicated Workspace' }],
  },
  VillaCoral: {
    routeKey: 'villacoral',
    name: 'Villa Coral',
    amenityFeature: [{ name: 'Private Pool' }, { name: 'Dedicated Workspace' }],
  },
};

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
export function vacationRentalJsonLd(key: ListingKey, locale: Locale, image?: string) {
  const meta = PROPERTY_META[key];
  const capacity = PROPERTY_CAPACITY[key];
  const marketing = PROPERTY_MARKETING_CONFIG[key];
  const content = listingContent(key, locale);
  const url = canonicalUrl(meta.routeKey, locale);

  const containsPlace: Record<string, unknown> = {
    '@type': 'Accommodation',
    identifier: meta.routeKey,
    additionalType: 'EntirePlace',
    occupancy: { '@type': 'QuantitativeValue', value: capacity.maxGuests },
    numberOfBedrooms: capacity.bedrooms,
    numberOfBathroomsTotal: capacity.bathrooms,
  };
  if (meta.petsAllowed !== undefined) containsPlace.petsAllowed = meta.petsAllowed;
  if (meta.amenityFeature) {
    containsPlace.amenityFeature = meta.amenityFeature.map((a) => ({
      '@type': 'LocationFeatureSpecification',
      name: a.name,
      value: true,
    }));
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'VacationRental',
    name: meta.name,
    identifier: meta.routeKey,
    url,
    description: content.seoDescription,
    ...(image ? { image } : {}),
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Puerto Viejo de Talamanca',
      addressRegion: 'Limón',
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
  };
}
