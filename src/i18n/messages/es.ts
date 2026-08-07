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
