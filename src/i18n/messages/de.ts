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
    ourPhotosHeading: 'Fotos',
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
    fromPerNight: (price: string) => `Ab ${price} pro Nacht`,
    discountLead: 'Wählen Sie die',
    discountBold: 'nicht erstattungsfähige Rate',
    discountTail: 'für 10% zusätzlichen Rabatt',
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
    weatherVariabilityNote: 'Das Wetter in Puerto Viejo ist bekanntlich wechselhaft — dies sind grobe langjährige Durchschnittswerte, und die Bedingungen können sich mehrmals an einem Tag ändern. Sieh sie als Orientierung, nicht als Garantie.',
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
    viewHomeCta: 'Haus ansehen →',
  },
  cookieBanner: {
    title: '🍪 Cookies',
    description: 'Wir verwenden Cookies, um Ihr Erlebnis zu verbessern und den Traffic zu analysieren.',
    acceptAll: 'Akzeptieren',
    rejectAll: 'Ablehnen',
    customize: 'Optionen',
    essential: 'Notwendig',
    analytics: 'Analyse',
    marketing: 'Marketing',
    required: '(Erf.)',
    essentialDesc: 'Notwendig, damit die Website funktioniert.',
    analyticsDesc: 'Hilft uns, die Nutzung der Website zu verstehen.',
    marketingDesc: 'Um relevante Werbung zu zeigen.',
    savePreferences: 'Speichern',
    cancel: 'Abbrechen',
  },

  notFound: {
    title: 'Seite nicht gefunden | Reservas Kalawala',
    heading: 'Wir konnten diese Seite nicht finden',
    body: 'Der Link ist möglicherweise fehlerhaft, oder die Seite wurde verschoben.',
    cta: 'Zurück zur Startseite',
  },

  whyStayWithUs: {
    title: 'Warum bei uns buchen?',
    benefits: [
      'Strategische Lagen',
      'Voll ausgestattete Häuser',
      'Direkte Buchung und lokaler Support',
      'Keine Plattformgebühren',
    ],
    ctaText: 'Alle unsere Unterkünfte ansehen',
  },

  imagesModal: {
    close: 'Schließen',
    photos: 'Fotos',
    previous: 'Zurück',
    next: 'Weiter',
    empty: 'Keine Bilder verfügbar',
  },

  reviewTags: {
    'Stayed a few nights': 'Aufenthalt von ein paar Nächten',
    'Stayed one night': 'Aufenthalt von einer Nacht',
    'Stayed with kids': 'Aufenthalt mit Kindern',
    'Stayed with a pet': 'Aufenthalt mit Haustier',
    'Stayed about a week': 'Aufenthalt von etwa einer Woche',
  },

};
