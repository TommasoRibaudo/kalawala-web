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

  nav: {
    home: 'Home',
    blog: 'Blog',
    myBooking: 'My Booking',
    bookNow: 'Book now',
  },

  footer: {
    ourHomes: 'Our Homes',
    travelGuides: 'Travel Guides',
    contact: 'Contact',
    chatOnWhatsApp: 'Chat on WhatsApp',
  },

  callToAction: {
    exploreAvailability:
      'Explore Availability and Prices Across All Our Properties in Puerto Viejo and Playa Chiquita.',
    nonRefundableLead: 'Select the',
    nonRefundableBold: 'non-refundable rate',
    nonRefundableTail: 'in the booking tool to enjoy a 10% discount.',
    availabilityDisclaimer:
      '*Showing availability for all available properties in the puerto viejo area, including properties advertised on other pages, make sure you check the name of the house and its photo before booking!',
    bankTransferLead: 'Prefer to pay via bank transfer or SINPE? Book securely with us and send your deposit confirmation to',
    bankTransferMid: 'or via WhatsApp at',
    bankTransferTail: 'within 6 hours of making your reservation.',
  },

  hero: {
    // `namTitle` lived here until PR #43 retired the Namaitami page. Removed
    // rather than left dormant: Phase 8 translates every key in this file into
    // six more languages, and a dead one is six wasted translations.
    tagline: 'Fully equipped vacation homes in the heart of Puerto Viejo and Playa Chiquita.',
    trust: '✓ Instant confirmation · ✓ Secure booking · ✓ No platform fees',
    rating: '⭐⭐⭐⭐⭐ 4.9/5 from thousands of stays since 2015',
  },

  sections: {
    // "Our Homes" / "Our Villas" — split so the second word carries the accent.
    ourLead: 'Our',
    homesHighlight: 'Homes',
    homeHighlight: 'Home',
    villasHighlight: 'Villas',
    exploreOtherStays: 'Explore Other Unique Stays in Puerto Viejo & Playa Chiquita.',
    // The two column headings under "Explore Other Unique Stays". The Spanish
    // second heading is not a translation of the English — EN says "Private
    // Retreat", ES says "Casitas Privadas A Solo Unos Pasos" ("private cottages
    // just steps away"). Each locale keeps its own copy; that is what a catalog
    // is for, and picking one to be "correct" would be a marketing decision.
    villasWithPool: 'Private Pool Luxury Villas in Playa Chiquita, Puerto Viejo.',
    privateRetreat: 'Private Retreat in Playa Chiquita, Puerto Viejo',
    otherBlogsHeading: 'Check out our other blogs!',
    otherListingsHeading: 'Check out our other options!',
    readBlog: (title: string) => `Read blog: ${title}`,
    weOfferEquipped: 'We offer fully equipped homes:',
  },

  contact: {
    // Split so the second word can carry the colour accent.
    headingMain: 'Get In',
    headingHighlight: 'Touch',
    askUsAnything: 'Ask us anything',
    replyTime: 'We usually reply within an hour on WhatsApp.',
    phoneLabel: 'Phone, Whatsapp:',
    chatOnWhatsApp: 'chat on WhatsApp',
    emailLabel: 'Email:',
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

  blog: {
    bookYourStay: 'Book Your Stay',
  },

  property: {
    capacityAriaLabel: 'Property capacity',
    viewListing: (name: string) => `View listing: ${name}`,
    checkInLabel: 'Check-in:',
    checkOutLabel: 'Check-out:',
    // The mobile sticky CTA on a property page. Deliberately not
    // `common.checkAvailability` — that reads "Check availability" in sentence
    // case, and this button has always been title case in English and full caps
    // in Spanish. Sharing the key would have quietly restyled both.
    stickyCta: 'Check Availability',
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
