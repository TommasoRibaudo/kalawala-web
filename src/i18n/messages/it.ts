import type { Messages } from './en';

/**
 * Italian UI strings.
 *
 * Formal register ("Lei"-adjacent, i.e. impersonal/plural "voi"-free phrasing
 * typical of Italian hospitality copy), matching a booking site's tone.
 */
export const it: Messages = {
  common: {
    checkAvailability: 'Verifica disponibilità',
    readyToBook: 'Pronti a prenotare?',
    instantConfirmation: 'Conferma immediata',
  },

  nav: {
    home: 'Home',
    blog: 'Blog',
    myBooking: 'La mia prenotazione',
    bookNow: 'Prenota ora',
  },

  footer: {
    ourHomes: 'Le nostre case',
    travelGuides: 'Guide di viaggio',
    contact: 'Contatti',
    chatOnWhatsApp: 'Scrivici su WhatsApp',
  },

  callToAction: {
    exploreAvailability:
      'Scopri disponibilità e prezzi di tutte le nostre proprietà a Puerto Viejo e Playa Chiquita.',
    nonRefundableLead: 'Seleziona la',
    nonRefundableBold: 'tariffa non rimborsabile',
    nonRefundableTail: 'nel motore di prenotazione per ottenere il 10% di sconto.',
    availabilityDisclaimer:
      '*Mostra la disponibilità di tutte le proprietà disponibili nella zona di Puerto Viejo, incluse quelle pubblicizzate su altre pagine: controlla sempre il nome della casa e la sua foto prima di prenotare!',
    bankTransferLead: 'Preferisci pagare con bonifico bancario o SINPE? Prenota in sicurezza con noi e invia la conferma del tuo acconto a',
    bankTransferMid: 'oppure via WhatsApp al',
    bankTransferTail: 'entro 6 ore dalla tua prenotazione.',
  },

  hero: {
    tagline: 'Case vacanza completamente attrezzate nel cuore di Puerto Viejo e Playa Chiquita.',
    trust: '✓ Conferma immediata · ✓ Prenotazione sicura · ✓ Nessuna commissione di piattaforma',
    rating: '⭐⭐⭐⭐⭐ 4,9/5 su migliaia di soggiorni dal 2015',
  },

  sections: {
    ourLead: 'Le nostre',
    homesHighlight: 'Case',
    homeHighlight: 'Casa',
    villasHighlight: 'Ville',
    exploreOtherStays: 'Scopri altri soggiorni unici a Puerto Viejo e Playa Chiquita.',
    villasWithPool: 'Ville di lusso con piscina privata a Playa Chiquita, Puerto Viejo.',
    privateRetreat: 'Rifugio privato a Playa Chiquita, Puerto Viejo',
    otherBlogsHeading: 'Dai un’occhiata ai nostri altri articoli!',
    otherListingsHeading: 'Scopri le nostre altre proposte!',
    readBlog: (title: string) => `Leggi l’articolo: ${title}`,
    weOfferEquipped: 'Offriamo case completamente attrezzate:',
  },

  contact: {
    headingMain: 'Mettiti in',
    headingHighlight: 'Contatto',
    askUsAnything: 'Chiedici pure quello che vuoi',
    replyTime: 'Di solito rispondiamo entro un’ora su WhatsApp.',
    phoneLabel: 'Telefono, WhatsApp:',
    chatOnWhatsApp: 'scrivici su WhatsApp',
    emailLabel: 'Email:',
  },

  reviews: {
    headingMain: 'Cosa dicono',
    headingHighlight: 'i nostri ospiti',
    heading: 'Cosa dicono i nostri ospiti',
    closeReview: 'Chiudi recensione',
    closeReviews: 'Chiudi recensioni',
  },

  price: {
    tooltip: 'Tariffa più bassa disponibile questo mese. I prezzi variano in base alla stagione e alle date scelte.',
  },

  tips: {
    instantConfirmation: (propertyName: string) =>
      `✔ Conferma immediata garantita per ${propertyName}. Prenota ora e assicurati il soggiorno!`,
    nonRefundableDiscount:
      'Seleziona la tariffa non rimborsabile nel motore di prenotazione per ottenere il 10% di sconto.',
    mobileScroll:
      'Dopo aver selezionato le date e avviato la ricerca, scorri verso il basso per vedere il prezzo e prenotare.',
  },

  blog: {
    bookYourStay: 'Prenota il tuo soggiorno',
    indexTitle: 'Guide di viaggio a Puerto Viejo | Reservas Kalawala',
    indexDescription:
      'Dieci guide locali su Puerto Viejo de Talamanca: come arrivare, come muoversi e cosa fare una volta lì.',
    indexHeading: 'Guide di viaggio a Puerto Viejo',
  },

  home: {
    pageTitle: 'Reservas Kalawala | Affitto case vacanza a Puerto Viejo',
    pageDescription:
      'Scopri le nostre case, più economiche di qualsiasi altra piattaforma! Benvenuti a Kalawala: offriamo case vacanza completamente attrezzate nel cuore di Puerto Viejo de Talamanca, Costa Rica. Le nostre case ospitano fino a 5 persone, con 2 unità di aria condizionata, bagno e cucina privati completamente attrezzati e connessione Wi-Fi gratuita.',
    helpMeChooseTitle: 'Trova il tuo',
    helpMeChooseTitleHighlight: 'soggiorno ideale',
    optionCouples: 'Ideale per coppie',
    optionFamilies: 'Perfetto per famiglie',
    optionPetFriendly: 'Pet-friendly',
    optionBestValue: 'Miglior rapporto qualità-prezzo',
  },

  property: {
    capacityAriaLabel: 'Capacità della struttura',
    viewListing: (name: string) => `Vedi l’annuncio: ${name}`,
    checkInLabel: 'Check-in:',
    checkOutLabel: 'Check-out:',
    stickyCta: 'Verifica disponibilità',
    whyGuestsChoose: (propertyName: string) => `Perché gli ospiti scelgono ${propertyName}`,
    bedrooms: (count: number) => `${count} ${count === 1 ? 'camera da letto' : 'camere da letto'}`,
    bathrooms: (count: number) => `${count} ${count === 1 ? 'bagno' : 'bagni'}`,
    upToGuests: (count: number) => `Fino a ${count} ${count === 1 ? 'ospite' : 'ospiti'}`,
  },
};
