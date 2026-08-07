import React from 'react';
import type { Locale } from '../locales';
import { DEFAULT_LOCALE } from '../locales';
import {
  PORTFOLIO_PROPERTY_COUNT,
  PORTFOLIO_BEDROOM_RANGE,
  PORTFOLIO_GUEST_RANGE,
} from '../../utils/constants';

/**
 * Long-form marketing copy for the homepage "Discover" section.
 *
 * This is the first module under `src/i18n/content/`, and it exists because the
 * message catalogs deliberately hold no React. These paragraphs carry inline
 * <b> emphasis and interpolate portfolio counts, so squeezing them into
 * `messages/*.ts` would mean either splitting every sentence into lead/bold/tail
 * fragments — the pattern used for the two short call-to-action lines, which
 * does not scale to five paragraphs — or putting JSX in a file translators are
 * meant to edit.
 *
 * The split to hold onto: **catalogs are strings, content is prose.** Phase 3b
 * and 3c move the listing and blog bodies here on the same principle.
 *
 * Unreleased locales fall back to English per key-set rather than per key, since
 * a half-Spanish half-English paragraph would read worse than English. That
 * differs from `getMessages`, which merges per key — the unit here is bigger.
 */

export interface DiscoverFeature {
  heading: string;
  text: string;
}

export interface DiscoverContent {
  heading: string;
  /** The body paragraphs, rendered in order. */
  paragraphs: React.ReactNode[];
  /** Keyed rather than positional so the component's icon pairing is explicit. */
  features: {
    selfCheckIn: DiscoverFeature;
    cheapestPrices: DiscoverFeature;
    nonRefundable: DiscoverFeature;
    flexibleCancellation: DiscoverFeature;
  };
}

const en: DiscoverContent = {
  heading: 'Discover Puerto Viejo from the comfort of our homes.',
  paragraphs: [
    <>Reservas Kalawala offers {PORTFOLIO_PROPERTY_COUNT} remodeled homes and villas, <b>each with a fully equipped private kitchen and bathroom</b>. Houses sleep {PORTFOLIO_GUEST_RANGE.min} to {PORTFOLIO_GUEST_RANGE.max} guests, with {PORTFOLIO_BEDROOM_RANGE.min} to {PORTFOLIO_BEDROOM_RANGE.max} bedrooms and <b>air conditioning throughout</b>.</>,
    <>Our homes in the center of Puerto Viejo put you right in the heart of town, with <b>bars, restaurants and shops within walking distance</b>. Cocles beach is a 2-minute drive, and nearby bike and motorbike rentals bring Punta Uva, Cahuita and Manzanillo within reach, even without a car!</>,
    <>Our homes in <b>Playa Chiquita</b> sit a short ride southeast of town, in a quieter, greener setting wrapped in jungle and just minutes from some of the coast's most beautiful beaches, like Punta Uva. It's an ideal base if you're after nature and calm, with the buzz of Puerto Viejo close by whenever you want it.</>,
    <><b>Working from home?</b> We offer <b>free WIFI</b>, with a maximum speed of <b>100Mbps</b>. We stipulated two different contracts with our internet provider, so your internet connection will be shared between fewer devices, achieving less latency during meetings.</>,
    <><b>Pet friendly:</b> Casa Rana, Casa Geco, Casa Tucano and Casa Pappagallo welcome pets. Rana and Geco are the best fit, as they have their own garden.</>,
  ],
  features: {
    selfCheckIn: {
      heading: 'Self Check-in',
      text: 'Easy to follow, contactless check-in process.',
    },
    cheapestPrices: {
      heading: 'Cheapest Prices',
      text: 'And extra discounts when booking directly on the website.',
    },
    nonRefundable: {
      heading: 'Non Refundable Discount',
      text: "Choose the non-refundable rate when you book to get an extra 10% discount, but you won't be eligible for a cancellation refund.",
    },
    flexibleCancellation: {
      heading: 'Flexible Cancellation Policy',
      text: 'Full refund up to one day before check-in on any reservation booked at the standard rate.',
    },
  },
};

const es: DiscoverContent = {
  heading: 'Descubre Puerto Viejo desde el confort de nuestras casas.',
  paragraphs: [
    <>Reservas Kalawala ofrece {PORTFOLIO_PROPERTY_COUNT} casas y villas remodeladas, <b>cada una con cocina y baño privados totalmente equipados</b>. Las casas alojan de {PORTFOLIO_GUEST_RANGE.min} a {PORTFOLIO_GUEST_RANGE.max} huéspedes, con {PORTFOLIO_BEDROOM_RANGE.min} a {PORTFOLIO_BEDROOM_RANGE.max} habitaciones y <b>aire acondicionado en todas</b>.</>,
    <>Nuestras casas en el centro de Puerto Viejo te ubican en el corazón del pueblo, con <b>bares, restaurantes y tiendas a poca distancia caminando</b>. Playa Cocles está a 2 minutos en auto, y hay lugares de renta de bicicletas y motocicletas cerca para que Punta Uva, Cahuita y Manzanillo estén a tu alcance, ¡incluso sin un auto!</>,
    <>Nuestras casas en <b>Playa Chiquita</b> están a pocos minutos al sureste del pueblo, en un entorno más tranquilo y verde, rodeadas de selva y a solo minutos de algunas de las playas más hermosas de la costa, como Punta Uva. Es el lugar ideal si buscas naturaleza y calma, con el ambiente de Puerto Viejo cerca cuando lo quieras.</>,
    <><b>¿Trabajas desde casa?</b> Ofrecemos <b>WIFI gratis</b>, con una velocidad de hasta <b>100Mbps</b>. Estipulamos dos contratos diferentes con nuestro proveedor de internet, por lo que tu conexión a internet será compartida entre menos dispositivos, logrando una menor latencia durante tus reuniones.</>,
    <><b>Pet Friendly:</b> Casa Rana, Casa Geco, Casa Tucano y Casa Pappagallo reciben mascotas. Rana y Geco son las mejores opciones, ya que cuentan con jardín propio.</>,
  ],
  features: {
    selfCheckIn: {
      heading: 'Check-in Automático',
      // The "¡" opens the second clause, not the sentence. That is how the
      // original reads; do not "correct" it to sentence-initial.
      text: 'Fácil de seguir, ¡check-in sin necesidad de contactar!',
    },
    cheapestPrices: {
      heading: 'Precios Más Económicos',
      text: 'Y descuentos adicionales al reservar directamente en el sitio web.',
    },
    nonRefundable: {
      heading: 'Descuento No Reembolsable',
      text: 'Elija la tarifa no reembolsable al reservar para obtener un 10% de descuento adicional, pero no será elegible para un reembolso por cancelación.',
    },
    flexibleCancellation: {
      heading: 'Política de Cancelación Flexible',
      text: 'Reembolso completo hasta un día antes del check-in en cualquier reserva con tarifa estándar.',
    },
  },
};

const CONTENT: Partial<Record<Locale, DiscoverContent>> = { en, es };

export function discoverContent(locale: Locale): DiscoverContent {
  return CONTENT[locale] ?? CONTENT[DEFAULT_LOCALE]!;
}
