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

  nav: {
    home: 'Inicio',
    blog: 'Blog',
    myBooking: 'Mi Reserva',
    bookNow: 'Reservar',
  },

  footer: {
    ourHomes: 'Nuestras Casas',
    travelGuides: 'Guías de Viaje',
    contact: 'Contacto',
    chatOnWhatsApp: 'Chatear por WhatsApp',
    copyrightNotice: 'Todos los derechos reservados. El texto y las fotos no pueden copiarse ni reutilizarse sin permiso escrito.',
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
    // The live homepage wording, not the longer one Phase 2 lifted from the
    // Namaitami variant — that page is retired and its tagline was never what
    // Spanish visitors saw. The only deliberate change is the accent on
    // "corazón"; the homepage had "corazon".
    tagline: 'Casas completamente equipadas en el corazón de Puerto Viejo y Playa Chiquita.',
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
    villasWithPool: 'Villas de Lujo Con Piscina Privada En Playa Chiquita, Puerto Viejo.',
    privateRetreat: 'Casitas Privadas A Solo Unos Pasos Playa Chiquita, Puerto Viejo',
    otherBlogsHeading: '¡Mira nuestros otros blogs!',
    otherListingsHeading: '¡Revisa nuestras otras opciones!',
    readBlog: (title: string) => `Leer blog: ${title}`,
    weOfferEquipped: 'Ofrecemos casas completamente equipadas:',
    ourPhotosHeading: 'Fotos',
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
      'Precio más bajo disponible en los próximos 30 días. Las tarifas varían según la temporada y las fechas elegidas.',
    fromPerNight: (price: string) => `Desde ${price} por noche`,
    discountLead: 'Elige la',
    discountBold: 'tarifa no reembolsable',
    discountTail: 'para un 10% de descuento adicional',
  },

  tips: {
    instantConfirmation: (propertyName: string) =>
      `✔ Confirmación inmediata garantizada para ${propertyName}. ¡Reserva ahora y asegura tu estadía!`,
    nonRefundableDiscount:
      'Elige la tarifa no reembolsable en el motor de reservas para disfrutar de un 10% de descuento.',
    mobileScroll:
      'Después de seleccionar fechas y presionar buscar, desplázate hacia abajo para ver el precio y reservar.',
  },

  blog: {
    weatherVariabilityNote: 'El clima de Puerto Viejo es muy cambiante — estos son promedios aproximados de largo plazo, y las condiciones pueden cambiar varias veces en un mismo día. Tómalos como una guía, no como una garantía.',
    // Two Spanish pages capitalised the second and third words
    // ("Reserva Tu Estadía"); the other eight didn't. Unified on the majority
    // form.
    bookYourStay: 'Reserva tu Estadía',
    indexTitle: 'Guías de Viaje de Puerto Viejo | Reservas Kalawala',
    indexDescription:
      'Diez guías locales de Puerto Viejo de Talamanca: cómo llegar, cómo moverte y qué hacer una vez que estés aquí.',
    indexHeading: 'Guías de Viaje de Puerto Viejo',
  },

  home: {
    pageTitle: 'Reservas Kalawala | Alquiler de Casas en Puerto Viejo',
    pageDescription:
      '¡Descubre nuestras casas, más baratas que cualquier otra plataforma! Bienvenido a Kalawala, ofrecemos casas de vacaciones completamente equipadas ubicadas en el corazón de Puerto Viejo de Talamanca, Costa Rica. Nuestras casas ofrecen espacio para hasta 5 personas, 2 unidades de A/C, baño privado completamente equipado y cocina y conexión gratuita a internet Wi-Fi.',
    helpMeChooseTitle: 'Elige tu',
    helpMeChooseTitleHighlight: 'Estadía Ideal',
    optionCouples: 'Ideal para parejas',
    optionFamilies: 'Perfecto para familias',
    optionPetFriendly: 'Pet-friendly',
    // Not a translation of "Best value" — the pre-merge Spanish copy's own
    // wording ("Recommended option"). Kept as authored, per the Phase 3b
    // precedent for independently-authored per-locale copy.
    optionBestValue: 'Opción Recomendada',
  },

  property: {
    capacityAriaLabel: 'Capacidad de la casa',
    viewListing: (name: string) => `Ver alojamiento: ${name}`,
    checkInLabel: 'Entrada:',
    checkOutLabel: 'Salida:',
    stickyCta: 'VER DISPONIBILIDAD',
    whyGuestsChoose: (propertyName: string) => `¿Por qué los huéspedes eligen ${propertyName}?`,
    bedrooms: (count: number) => `${count} ${count === 1 ? 'habitación' : 'habitaciones'}`,
    bathrooms: (count: number) => `${count} ${count === 1 ? 'baño' : 'baños'}`,
    upToGuests: (count: number) => `Hasta ${count} ${count === 1 ? 'huésped' : 'huéspedes'}`,
    viewHomeCta: 'Ver casa →',
  },

  cookieBanner: {
    title: '🍪 Cookies',
    description: 'Usamos cookies para mejorar tu experiencia y analizar el tráfico.',
    acceptAll: 'Aceptar',
    rejectAll: 'Rechazar',
    customize: 'Opciones',
    essential: 'Esenciales',
    analytics: 'Análisis',
    marketing: 'Marketing',
    required: '(Req.)',
    essentialDesc: 'Necesarias para el funcionamiento del sitio.',
    analyticsDesc: 'Nos ayudan a entender el uso del sitio.',
    marketingDesc: 'Para mostrar anuncios relevantes.',
    savePreferences: 'Guardar',
    cancel: 'Cancelar',
  },

  notFound: {
    title: 'Página no encontrada | Reservas Kalawala',
    heading: 'No encontramos esta página',
    body: 'Es posible que el enlace esté roto o que la página se haya movido.',
    cta: 'Volver al inicio',
  },

  whyStayWithUs: {
    title: '¿Por qué reservar con nosotros?',
    benefits: [
      'Ubicaciones estratégicas',
      'Casas totalmente equipadas',
      'Reserva directa y soporte local',
      'Sin comisiones de plataformas',
    ],
    ctaText: 'Ver todas nuestras propiedades',
  },

  imagesModal: {
    close: 'Cerrar',
    photos: 'fotos',
    previous: 'Anterior',
    next: 'Siguiente',
    empty: 'No hay fotos disponibles',
  },

  reviewTags: {
    'Stayed a few nights': 'Estadía de algunas noches',
    'Stayed one night': 'Estadía de una noche',
    'Stayed with kids': 'Estadía con niños',
    'Stayed with a pet': 'Estadía con mascota',
    'Stayed about a week': 'Estadía de aproximadamente una semana',
  },
};
