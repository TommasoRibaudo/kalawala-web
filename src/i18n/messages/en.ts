/**
 * English UI strings. This file is the source of truth for the message shape:
 * `Messages` is derived from it, so every other locale is checked against it by
 * the compiler rather than by a CI script.
 *
 * Only *UI chrome* belongs here — labels, headings, button text. Two things
 * deliberately do not:
 *
 *  - Content that is already keyed by locale in the data itself (review bodies,
 *    per-property marketing copy, blog titles). Read those with `pickLocalized`.
 *  - Rich JSX with embedded markup. Keeping React out of the catalogs means a
 *    translator edits strings, not elements.
 *
 * Values that interpolate or pluralise are functions. That keeps them type-safe
 * and lets each language handle its own plural rules, which a format string
 * cannot.
 */

export const en = {
  common: {
    checkAvailability: 'Check availability',
    readyToBook: 'Ready to book?',
    instantConfirmation: 'Instant confirmation',
  },

  footer: {
    ourHomes: 'Our Homes',
    travelGuides: 'Travel Guides',
    contact: 'Contact',
    chatOnWhatsApp: 'Chat on WhatsApp',
  },

  reviews: {
    // HomeReviews splits its heading so the second half can be colour-accented.
    headingMain: 'What our guests are',
    headingHighlight: 'saying',
    // GuestReviews renders the same sentence unsplit.
    heading: 'What our guests are saying',
    closeReview: 'Close review',
    closeReviews: 'Close reviews',
  },

  price: {
    tooltip: 'Lowest available rate this month. Rates vary by season and by the dates you choose.',
  },

  tips: {
    instantConfirmation: (propertyName: string) =>
      `✔ Instant confirmation guaranteed for ${propertyName}. Book now and secure your stay!`,
    nonRefundableDiscount:
      'Select the non-refundable rate in the booking tool to enjoy a 10% discount.',
    mobileScroll:
      'After selecting dates and pressing search, scroll down to see the price and book.',
  },

  property: {
    capacityAriaLabel: 'Property capacity',
    whyGuestsChoose: (propertyName: string) => `Why guests choose ${propertyName}`,
    bedrooms: (count: number) => `${count} ${count === 1 ? 'bedroom' : 'bedrooms'}`,
    bathrooms: (count: number) => `${count} ${count === 1 ? 'bathroom' : 'bathrooms'}`,
    upToGuests: (count: number) => `Up to ${count} ${count === 1 ? 'guest' : 'guests'}`,
  },
};

/**
 * The shape every locale must satisfy. `es.ts` is typed as this, so a missing or
 * misspelled key is a compile error — no runtime key-parity check needed for a
 * fully translated locale.
 *
 * Note the absence of `as const` on `en` above: it would make every value a
 * string *literal* type, and Spanish would then fail to satisfy `Messages`
 * because "Ver disponibilidad" is not the literal "Check availability". The
 * widened types are what make this a shape contract rather than a value one.
 */
export type Messages = typeof en;
