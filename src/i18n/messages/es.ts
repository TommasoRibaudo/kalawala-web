import type { Messages } from './en';

/**
 * Spanish UI strings. Typed as `Messages`, so the compiler rejects a missing,
 * extra or misspelled key against en.ts.
 */
export const es: Messages = {
  common: {
    checkAvailability: 'Ver disponibilidad',
    readyToBook: '¿Listo para reservar?',
    instantConfirmation: 'Confirmación inmediata',
  },

  footer: {
    ourHomes: 'Nuestras Casas',
    travelGuides: 'Guías de Viaje',
    contact: 'Contacto',
    chatOnWhatsApp: 'Chatear por WhatsApp',
  },

  callToAction: {
    exploreAvailability:
      'Explora la disponibilidad y los precios de todas nuestras propiedades en Puerto Viejo y Playa Chiquita.',
    nonRefundableLead: 'Elige la',
    nonRefundableBold: 'tarifa no reembolsable',
    nonRefundableTail: 'en el motor de reservas para disfrutar de un 10% de descuento.',
    availabilityDisclaimer:
      '*Mostrando disponibilidad para todas las propiedades disponibles en la zona de Puerto Viejo, incluidas propiedades anunciadas en otras páginas. ¡Asegúrate de verificar el nombre de la casa y su foto antes de reservar!',
    bankTransferLead: '¿Prefieres pagar mediante transferencia bancaria o SINPE? Reserva de forma segura con nosotros y envía tu confirmación de depósito a',
    bankTransferMid: 'o por WhatsApp al',
    bankTransferTail: 'dentro de las 6 horas posteriores a realizar tu reserva.',
  },

  hero: {
    namTitle: 'Casitas Namaitami',
    tagline:
      'Casas de vacaciones completamente equipadas ubicadas en el corazón de Puerto Viejo y Playa Chiquita.',
    trust: '✓ Confirmación instantánea · ✓ Reserva segura · ✓ Sin comisiones',
    rating: '⭐⭐⭐⭐⭐ 4.9/5 de miles de estadías desde 2015',
  },

  sections: {
    ourLead: 'Nuestras',
    homesHighlight: 'Casas',
    // The Nam variant reads "Our Home" (singular) in English but the Spanish
    // copy said "Nuestras Casas" in both. Kept as it was rather than "correcting"
    // it — the singular/plural mismatch is a copy decision, not a bug.
    homeHighlight: 'Casas',
    villasHighlight: 'Villas',
    // The three Spanish copies of this line disagreed on capitalisation
    // ("Explore otras…" vs "Explore Otras…"). Unified on sentence case.
    exploreOtherStays: 'Explore otras estadías únicas en Puerto Viejo y Playa Chiquita.',
    otherBlogsHeading: '¡Mira nuestros otros blogs!',
    readBlog: (title: string) => `Leer blog: ${title}`,
    weOfferEquipped: 'Ofrecemos casas completamente equipadas:',
  },

  contact: {
    headingMain: 'Nuestros',
    headingHighlight: 'Contactos',
    askUsAnything: 'Escríbenos',
    replyTime: 'Normalmente respondemos en menos de una hora por WhatsApp.',
    phoneLabel: 'Teléfono, Whatsapp:',
    chatOnWhatsApp: 'chatear por WhatsApp',
    emailLabel: 'Correo:',
  },

  reviews: {
    headingMain: 'Lo que dicen nuestros',
    headingHighlight: 'huéspedes',
    heading: 'Lo que dicen nuestros huéspedes',
    closeReview: 'Cerrar reseña',
    closeReviews: 'Cerrar reseñas',
  },

  price: {
    tooltip:
      'Precio más bajo disponible este mes. Las tarifas varían según la temporada y las fechas elegidas.',
  },

  tips: {
    instantConfirmation: (propertyName: string) =>
      `✔ Confirmación inmediata garantizada para ${propertyName}. ¡Reserva ahora y asegura tu estadía!`,
    nonRefundableDiscount:
      'Elige la tarifa no reembolsable en el motor de reservas para disfrutar de un 10% de descuento.',
    mobileScroll:
      'Después de seleccionar fechas y presionar buscar, desplázate hacia abajo para ver el precio y reservar.',
  },

  property: {
    capacityAriaLabel: 'Capacidad de la casa',
    whyGuestsChoose: (propertyName: string) => `¿Por qué los huéspedes eligen ${propertyName}?`,
    bedrooms: (count: number) => `${count} ${count === 1 ? 'habitación' : 'habitaciones'}`,
    bathrooms: (count: number) => `${count} ${count === 1 ? 'baño' : 'baños'}`,
    upToGuests: (count: number) => `Hasta ${count} ${count === 1 ? 'huésped' : 'huéspedes'}`,
  },
};
