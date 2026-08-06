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
