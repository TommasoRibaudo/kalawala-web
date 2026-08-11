import type { Messages } from './en';

/**
 * Dutch UI strings.
 *
 * Standard Netherlands Dutch (not Belgian/Flemish), informal register
 * ("je"/"jij", not "u") — matching how Dutch hospitality and travel sites
 * (Booking.com NL, Airbnb NL) address guests, and the warm, casual tone of
 * the English original. `bedrooms`/`bathrooms`/`upToGuests` pluralise
 * normally on `count === 1` — unlike German's invariant "Schlafzimmer" /
 * "Badezimmer", Dutch "slaapkamer(s)" / "badkamer(s)" / "gast(en)" behave
 * just like their English counterparts.
 */
export const nl: Messages = {
  common: {
    checkAvailability: 'Beschikbaarheid controleren',
    readyToBook: 'Klaar om te boeken?',
    instantConfirmation: 'Directe bevestiging',
  },

  nav: {
    home: 'Home',
    blog: 'Blog',
    myBooking: 'Mijn boeking',
    bookNow: 'Nu boeken',
  },

  footer: {
    ourHomes: 'Onze huizen',
    travelGuides: 'Reisgidsen',
    contact: 'Contact',
    chatOnWhatsApp: 'Chat via WhatsApp',
  },

  callToAction: {
    exploreAvailability:
      'Ontdek de beschikbaarheid en prijzen van al onze woningen in Puerto Viejo en Playa Chiquita.',
    nonRefundableLead: 'Selecteer het',
    nonRefundableBold: 'niet-restitueerbare tarief',
    nonRefundableTail: 'in de boekingstool om 10% korting te krijgen.',
    availabilityDisclaimer:
      "*Toont de beschikbaarheid van alle beschikbare woningen in de omgeving van Puerto Viejo, inclusief woningen die op andere pagina's worden geadverteerd. Controleer voor het boeken altijd de naam van het huis en de bijbehorende foto!",
    bankTransferLead: 'Liever betalen via bankoverschrijving of SINPE? Boek veilig bij ons en stuur je aanbetalingsbevestiging naar',
    bankTransferMid: 'of via WhatsApp naar',
    bankTransferTail: 'binnen 6 uur na het maken van je reservering.',
  },

  hero: {
    tagline: 'Volledig uitgeruste vakantiehuizen in het hart van Puerto Viejo en Playa Chiquita.',
    trust: '✓ Directe bevestiging · ✓ Veilig boeken · ✓ Geen platformkosten',
    rating: '⭐⭐⭐⭐⭐ 4,9/5 op basis van duizenden verblijven sinds 2015',
  },

  sections: {
    ourLead: 'Onze',
    homesHighlight: 'Huizen',
    homeHighlight: 'Huis',
    villasHighlight: "Villa's",
    exploreOtherStays: 'Ontdek andere unieke verblijven in Puerto Viejo & Playa Chiquita.',
    villasWithPool: "Luxe villa's met privézwembad in Playa Chiquita, Puerto Viejo.",
    privateRetreat: 'Privéretreat in Playa Chiquita, Puerto Viejo',
    otherBlogsHeading: 'Bekijk onze andere blogs!',
    otherListingsHeading: 'Bekijk onze andere opties!',
    readBlog: (title: string) => `Blog lezen: ${title}`,
    weOfferEquipped: 'Wij bieden volledig uitgeruste huizen:',
    ourPhotosHeading: "Foto's",
  },

  contact: {
    headingMain: 'Neem',
    headingHighlight: 'Contact op',
    askUsAnything: 'Vraag ons gerust alles',
    replyTime: 'We reageren meestal binnen een uur via WhatsApp.',
    phoneLabel: 'Telefoon, WhatsApp:',
    chatOnWhatsApp: 'chat via WhatsApp',
    emailLabel: 'E-mail:',
  },

  reviews: {
    headingMain: 'Wat onze gasten',
    headingHighlight: 'zeggen',
    heading: 'Wat onze gasten zeggen',
    closeReview: 'Beoordeling sluiten',
    closeReviews: 'Beoordelingen sluiten',
  },

  price: {
    tooltip: 'Laagste beschikbare tarief deze maand. Tarieven variëren per seizoen en per gekozen data.',
    fromPerNight: (price: string) => `Vanaf ${price} per nacht`,
    discountLead: 'Kies het',
    discountBold: 'niet-restitueerbare tarief',
    discountTail: 'voor 10% extra korting',
  },

  tips: {
    instantConfirmation: (propertyName: string) =>
      `✔ Directe bevestiging gegarandeerd voor ${propertyName}. Boek nu en verzeker je van je verblijf!`,
    nonRefundableDiscount:
      'Selecteer het niet-restitueerbare tarief in de boekingstool om 10% korting te krijgen.',
    mobileScroll:
      'Scroll na het selecteren van je data en het klikken op zoeken naar beneden om de prijs te zien en te boeken.',
  },

  blog: {
    bookYourStay: 'Boek je verblijf',
    indexTitle: 'Reisgidsen Puerto Viejo | Reservas Kalawala',
    indexDescription:
      'Tien lokale gidsen over Puerto Viejo de Talamanca: hoe je er komt, hoe je je verplaatst en wat je hier kunt doen.',
    indexHeading: 'Reisgidsen Puerto Viejo',
  },

  home: {
    pageTitle: 'Reservas Kalawala | Huisverhuur in Puerto Viejo',
    pageDescription:
      "Ontdek onze huizen, goedkoper dan op elk ander platform! Welkom bij Kalawala, wij bieden volledig uitgeruste vakantiehuizen in het hart van Puerto Viejo de Talamanca, Costa Rica. Onze huizen bieden ruimte voor maximaal 5 personen, 2 airco's, een volledig uitgeruste eigen badkamer en keuken, en gratis wifi-internetverbinding.",
    helpMeChooseTitle: 'Vind je',
    helpMeChooseTitleHighlight: 'ideale verblijf',
    optionCouples: 'Ideaal voor stellen',
    optionFamilies: 'Perfect voor gezinnen',
    optionPetFriendly: 'Huisdiervriendelijk',
    optionBestValue: 'Beste prijs-kwaliteitverhouding',
  },

  property: {
    capacityAriaLabel: 'Capaciteit van de woning',
    viewListing: (name: string) => `Advertentie bekijken: ${name}`,
    checkInLabel: 'Check-in:',
    checkOutLabel: 'Check-out:',
    stickyCta: 'Beschikbaarheid controleren',
    whyGuestsChoose: (propertyName: string) => `Waarom gasten kiezen voor ${propertyName}`,
    bedrooms: (count: number) => `${count} ${count === 1 ? 'slaapkamer' : 'slaapkamers'}`,
    bathrooms: (count: number) => `${count} ${count === 1 ? 'badkamer' : 'badkamers'}`,
    upToGuests: (count: number) => `Tot ${count} ${count === 1 ? 'gast' : 'gasten'}`,
    viewHomeCta: 'Huis bekijken →',
  },

  cookieBanner: {
    title: '🍪 Cookies',
    description: 'We gebruiken cookies om je ervaring te verbeteren en het verkeer te analyseren.',
    acceptAll: 'Accepteren',
    rejectAll: 'Weigeren',
    customize: 'Opties',
    essential: 'Essentieel',
    analytics: 'Analytisch',
    marketing: 'Marketing',
    required: '(Verpl.)',
    essentialDesc: 'Noodzakelijk voor de werking van de site.',
    analyticsDesc: 'Helpt ons het gebruik van de site te begrijpen.',
    marketingDesc: 'Om relevante advertenties te tonen.',
    savePreferences: 'Opslaan',
    cancel: 'Annuleren',
  },

  notFound: {
    title: 'Pagina niet gevonden | Reservas Kalawala',
    heading: 'We konden deze pagina niet vinden',
    body: 'De link werkt mogelijk niet meer, of de pagina is verplaatst.',
    cta: 'Terug naar home',
  },

  whyStayWithUs: {
    title: 'Waarom bij ons boeken?',
    benefits: [
      'Strategische locaties',
      'Volledig uitgeruste huizen',
      'Direct boeken en lokale ondersteuning',
      'Geen platformcommissies',
    ],
    ctaText: 'Bekijk al onze woningen',
  },

  imagesModal: {
    close: 'Sluiten',
    photos: "foto's",
    previous: 'Vorige',
    next: 'Volgende',
    empty: 'Geen afbeeldingen beschikbaar',
  },

  reviewTags: {
    'Stayed a few nights': 'Verbleef een paar nachten',
    'Stayed one night': 'Verbleef één nacht',
    'Stayed with kids': 'Verbleef met kinderen',
    'Stayed with a pet': 'Verbleef met een huisdier',
    'Stayed about a week': 'Verbleef ongeveer een week',
  },
};
