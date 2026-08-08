import type { Messages } from './en';

/**
 * German UI strings.
 *
 * Formal register ("Sie"), matching the tone a German-speaking guest expects
 * from a hospitality booking site. `bedrooms`/`bathrooms` deliberately do not
 * mirror English's singular/plural ternary — "Schlafzimmer" and "Badezimmer"
 * are invariant compound nouns in German (same form for one or many), so
 * branching on `count` there would be wrong, not just redundant.
 */
export const de: Messages = {
  common: {
    checkAvailability: 'Verfügbarkeit prüfen',
    readyToBook: 'Bereit zu buchen?',
    instantConfirmation: 'Sofortige Bestätigung',
  },

  nav: {
    home: 'Startseite',
    blog: 'Blog',
    myBooking: 'Meine Buchung',
    bookNow: 'Jetzt buchen',
  },

  footer: {
    ourHomes: 'Unsere Häuser',
    travelGuides: 'Reiseführer',
    contact: 'Kontakt',
    chatOnWhatsApp: 'Auf WhatsApp chatten',
  },

  callToAction: {
    exploreAvailability:
      'Entdecken Sie Verfügbarkeit und Preise für alle unsere Unterkünfte in Puerto Viejo und Playa Chiquita.',
    nonRefundableLead: 'Wählen Sie den',
    nonRefundableBold: 'nicht erstattungsfähigen Tarif',
    nonRefundableTail: 'im Buchungstool, um 10 % Rabatt zu erhalten.',
    availabilityDisclaimer:
      '*Zeigt die Verfügbarkeit aller verfügbaren Unterkünfte im Gebiet von Puerto Viejo an, einschließlich Unterkünften, die auf anderen Seiten beworben werden. Bitte überprüfen Sie vor der Buchung unbedingt den Namen des Hauses und das dazugehörige Foto!',
    bankTransferLead: 'Möchten Sie lieber per Banküberweisung oder SINPE bezahlen? Buchen Sie sicher bei uns und senden Sie Ihre Anzahlungsbestätigung an',
    bankTransferMid: 'oder per WhatsApp an',
    bankTransferTail: 'innerhalb von 6 Stunden nach Ihrer Reservierung.',
  },

  hero: {
    tagline: 'Voll ausgestattete Ferienhäuser im Herzen von Puerto Viejo und Playa Chiquita.',
    trust: '✓ Sofortige Bestätigung · ✓ Sichere Buchung · ✓ Keine Plattformgebühren',
    rating: '⭐⭐⭐⭐⭐ 4,9/5 aus Tausenden von Aufenthalten seit 2015',
  },

  sections: {
    ourLead: 'Unsere',
    homesHighlight: 'Häuser',
    homeHighlight: 'Haus',
    villasHighlight: 'Villen',
    exploreOtherStays: 'Entdecken Sie weitere einzigartige Unterkünfte in Puerto Viejo & Playa Chiquita.',
    villasWithPool: 'Luxusvillen mit privatem Pool in Playa Chiquita, Puerto Viejo.',
    privateRetreat: 'Privater Rückzugsort in Playa Chiquita, Puerto Viejo',
    otherBlogsHeading: 'Entdecken Sie unsere weiteren Blogbeiträge!',
    otherListingsHeading: 'Entdecken Sie unsere weiteren Unterkünfte!',
    readBlog: (title: string) => `Blogbeitrag lesen: ${title}`,
    weOfferEquipped: 'Wir bieten voll ausgestattete Häuser:',
  },

  contact: {
    headingMain: 'Nehmen Sie',
    headingHighlight: 'Kontakt auf',
    askUsAnything: 'Fragen Sie uns alles',
    replyTime: 'Wir antworten in der Regel innerhalb einer Stunde auf WhatsApp.',
    phoneLabel: 'Telefon, WhatsApp:',
    chatOnWhatsApp: 'auf WhatsApp chatten',
    emailLabel: 'E-Mail:',
  },

  reviews: {
    headingMain: 'Was unsere Gäste',
    headingHighlight: 'sagen',
    heading: 'Was unsere Gäste sagen',
    closeReview: 'Bewertung schließen',
    closeReviews: 'Bewertungen schließen',
  },

  price: {
    tooltip: 'Niedrigster verfügbarer Preis in diesem Monat. Die Preise variieren je nach Saison und den gewählten Daten.',
  },

  tips: {
    instantConfirmation: (propertyName: string) =>
      `✔ Sofortige Bestätigung garantiert für ${propertyName}. Jetzt buchen und Ihren Aufenthalt sichern!`,
    nonRefundableDiscount:
      'Wählen Sie im Buchungstool den nicht erstattungsfähigen Tarif, um 10 % Rabatt zu erhalten.',
    mobileScroll:
      'Scrollen Sie nach Auswahl der Daten und Klick auf Suchen nach unten, um den Preis zu sehen und zu buchen.',
  },

  blog: {
    bookYourStay: 'Buchen Sie Ihren Aufenthalt',
    indexTitle: 'Reiseführer für Puerto Viejo | Reservas Kalawala',
    indexDescription:
      'Zehn lokale Reiseführer für Puerto Viejo de Talamanca: Anreise, Fortbewegung vor Ort und was man hier unternehmen kann.',
    indexHeading: 'Reiseführer für Puerto Viejo',
  },

  home: {
    pageTitle: 'Reservas Kalawala | Ferienhausvermietung in Puerto Viejo',
    pageDescription:
      'Entdecken Sie unsere Häuser, günstiger als auf jeder anderen Plattform! Willkommen bei Kalawala – wir bieten voll ausgestattete Ferienhäuser im Herzen von Puerto Viejo de Talamanca, Costa Rica. Unsere Häuser bieten Platz für bis zu 5 Personen, 2 Klimaanlagen, ein voll ausgestattetes eigenes Bad und eine eigene Küche sowie kostenloses WLAN.',
    helpMeChooseTitle: 'Finden Sie Ihren',
    helpMeChooseTitleHighlight: 'idealen Aufenthalt',
    optionCouples: 'Ideal für Paare',
    optionFamilies: 'Perfekt für Familien',
    optionPetFriendly: 'Haustierfreundlich',
    optionBestValue: 'Bestes Preis-Leistungs-Verhältnis',
  },

  property: {
    capacityAriaLabel: 'Kapazität der Unterkunft',
    viewListing: (name: string) => `Anzeige ansehen: ${name}`,
    checkInLabel: 'Check-in:',
    checkOutLabel: 'Check-out:',
    stickyCta: 'Verfügbarkeit prüfen',
    whyGuestsChoose: (propertyName: string) => `Warum Gäste sich für ${propertyName} entscheiden`,
    bedrooms: (count: number) => `${count} Schlafzimmer`,
    bathrooms: (count: number) => `${count} Badezimmer`,
    upToGuests: (count: number) => `Bis zu ${count} ${count === 1 ? 'Gast' : 'Gästen'}`,
  },
};
