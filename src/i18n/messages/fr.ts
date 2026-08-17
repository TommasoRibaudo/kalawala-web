import type { Messages } from './en';

/**
 * French UI strings.
 *
 * Formal register ("vous"), matching a hospitality booking site's tone.
 * French treats zero as singular (`0 chambre`, not `0 chambres`), unlike
 * English's `count === 1` threshold — the pluralising functions below use
 * `count > 1`, not `count === 1`, for exactly that reason.
 */
export const fr: Messages = {
  common: {
    checkAvailability: 'Vérifier la disponibilité',
    readyToBook: 'Prêt à réserver ?',
    instantConfirmation: 'Confirmation instantanée',
  },

  nav: {
    home: 'Accueil',
    blog: 'Blog',
    myBooking: 'Ma réservation',
    bookNow: 'Réserver maintenant',
  },

  footer: {
    ourHomes: 'Nos maisons',
    travelGuides: 'Guides de voyage',
    contact: 'Contact',
    chatOnWhatsApp: 'Discuter sur WhatsApp',
    copyrightNotice: 'Tous droits réservés. Les textes et photos ne peuvent être copiés ni réutilisés sans autorisation écrite.',
  },

  callToAction: {
    exploreAvailability:
      'Découvrez la disponibilité et les tarifs de toutes nos propriétés à Puerto Viejo et Playa Chiquita.',
    nonRefundableLead: 'Sélectionnez le',
    nonRefundableBold: 'tarif non remboursable',
    nonRefundableTail: 'dans l’outil de réservation pour profiter de 10 % de réduction.',
    availabilityDisclaimer:
      '*Affiche la disponibilité de toutes les propriétés disponibles dans la région de Puerto Viejo, y compris celles annoncées sur d’autres pages. Vérifiez bien le nom de la maison et sa photo avant de réserver !',
    bankTransferLead: 'Vous préférez payer par virement bancaire ou SINPE ? Réservez en toute sécurité avec nous et envoyez la confirmation de votre acompte à',
    bankTransferMid: 'ou par WhatsApp au',
    bankTransferTail: 'dans les 6 heures suivant votre réservation.',
  },

  hero: {
    tagline: 'Maisons de vacances entièrement équipées au cœur de Puerto Viejo et Playa Chiquita.',
    trust: '✓ Confirmation instantanée · ✓ Réservation sécurisée · ✓ Aucun frais de plateforme',
    rating: '⭐⭐⭐⭐⭐ 4,9/5 pour des milliers de séjours depuis 2015',
  },

  sections: {
    ourLead: 'Nos',
    homesHighlight: 'Maisons',
    homeHighlight: 'Maison',
    villasHighlight: 'Villas',
    exploreOtherStays: 'Découvrez d’autres séjours uniques à Puerto Viejo et Playa Chiquita.',
    villasWithPool: 'Villas de luxe avec piscine privée à Playa Chiquita, Puerto Viejo.',
    privateRetreat: 'Havre de paix privé à Playa Chiquita, Puerto Viejo',
    otherBlogsHeading: 'Découvrez nos autres articles de blog !',
    otherListingsHeading: 'Découvrez nos autres options !',
    readBlog: (title: string) => `Lire l’article : ${title}`,
    weOfferEquipped: 'Nous proposons des maisons entièrement équipées :',
    ourPhotosHeading: 'Photos',
  },

  contact: {
    headingMain: 'Entrez en',
    headingHighlight: 'Contact',
    askUsAnything: 'Posez-nous toutes vos questions',
    replyTime: 'Nous répondons généralement en moins d’une heure sur WhatsApp.',
    phoneLabel: 'Téléphone, WhatsApp :',
    chatOnWhatsApp: 'discuter sur WhatsApp',
    emailLabel: 'E-mail :',
  },

  reviews: {
    headingMain: 'Ce que disent',
    headingHighlight: 'nos voyageurs',
    heading: 'Ce que disent nos voyageurs',
    closeReview: 'Fermer l’avis',
    closeReviews: 'Fermer les avis',
  },

  price: {
    tooltip: 'Tarif le plus bas disponible dans les 30 prochains jours. Les tarifs varient selon la saison et les dates choisies.',
    fromPerNight: (price: string) => `À partir de ${price} par nuit`,
    discountLead: 'Choisissez le',
    discountBold: 'tarif non remboursable',
    discountTail: 'pour une réduction supplémentaire de 10 %',
  },

  tips: {
    instantConfirmation: (propertyName: string) =>
      `✔ Confirmation instantanée garantie pour ${propertyName}. Réservez maintenant et assurez votre séjour !`,
    nonRefundableDiscount:
      'Sélectionnez le tarif non remboursable dans l’outil de réservation pour profiter de 10 % de réduction.',
    mobileScroll:
      'Après avoir sélectionné vos dates et lancé la recherche, faites défiler vers le bas pour voir le prix et réserver.',
  },

  blog: {
    weatherVariabilityNote: 'La météo à Puerto Viejo est réputée changeante — ce sont des moyennes approximatives sur le long terme, et les conditions peuvent varier plusieurs fois dans une même journée. À prendre comme un repère, pas une garantie.',
    bookYourStay: 'Réservez votre séjour',
    indexTitle: 'Guides de voyage à Puerto Viejo | Reservas Kalawala',
    indexDescription:
      'Dix guides locaux sur Puerto Viejo de Talamanca : comment y aller, s’y déplacer et que faire une fois sur place.',
    indexHeading: 'Guides de voyage à Puerto Viejo',
  },

  home: {
    pageTitle: 'Reservas Kalawala | Location de maisons à Puerto Viejo',
    pageDescription:
      'Découvrez nos maisons, moins chères que sur toute autre plateforme ! Bienvenue chez Kalawala, nous proposons des maisons de vacances entièrement équipées nichées au cœur de Puerto Viejo de Talamanca, au Costa Rica. Nos maisons offrent de l’espace pour jusqu’à 5 personnes, 2 climatiseurs, une salle de bain et une cuisine privées entièrement équipées, ainsi qu’une connexion Wi-Fi gratuite.',
    helpMeChooseTitle: 'Trouvez votre',
    helpMeChooseTitleHighlight: 'séjour idéal',
    optionCouples: 'Idéal pour les couples',
    optionFamilies: 'Parfait pour les familles',
    optionPetFriendly: 'Animaux acceptés',
    optionBestValue: 'Meilleur rapport qualité-prix',
  },

  property: {
    capacityAriaLabel: 'Capacité de la propriété',
    viewListing: (name: string) => `Voir l’annonce : ${name}`,
    checkInLabel: 'Arrivée :',
    checkOutLabel: 'Départ :',
    stickyCta: 'Vérifier la disponibilité',
    whyGuestsChoose: (propertyName: string) => `Pourquoi les voyageurs choisissent ${propertyName}`,
    bedrooms: (count: number) => `${count} ${count > 1 ? 'chambres' : 'chambre'}`,
    bathrooms: (count: number) => `${count} ${count > 1 ? 'salles de bain' : 'salle de bain'}`,
    upToGuests: (count: number) => `Jusqu’à ${count} ${count > 1 ? 'personnes' : 'personne'}`,
    viewHomeCta: 'Voir la maison →',
  },
  cookieBanner: {
    title: '🍪 Cookies',
    description: 'Nous utilisons des cookies pour améliorer votre expérience et analyser le trafic.',
    acceptAll: 'Accepter',
    rejectAll: 'Refuser',
    customize: 'Options',
    essential: 'Essentiels',
    analytics: 'Analyse',
    marketing: 'Marketing',
    required: '(Req.)',
    essentialDesc: 'Nécessaires au fonctionnement du site.',
    analyticsDesc: 'Nous aident à comprendre l\'utilisation du site.',
    marketingDesc: 'Pour afficher des publicités pertinentes.',
    savePreferences: 'Enregistrer',
    cancel: 'Annuler',
  },

  notFound: {
    title: 'Page introuvable | Reservas Kalawala',
    heading: 'Nous n\'avons pas trouvé cette page',
    body: 'Il est possible que le lien soit rompu ou que la page ait été déplacée.',
    cta: 'Retour à l\'accueil',
  },

  whyStayWithUs: {
    title: 'Pourquoi réserver avec nous ?',
    benefits: [
      'Emplacements stratégiques',
      'Maisons entièrement équipées',
      'Réservation directe et assistance locale',
      'Aucune commission de plateforme',
    ],
    ctaText: 'Voir toutes nos propriétés',
  },

  imagesModal: {
    close: 'Fermer',
    photos: 'photos',
    previous: 'Précédent',
    next: 'Suivant',
    empty: 'Aucune photo disponible',
  },

  reviewTags: {
    'Stayed a few nights': 'Séjour de quelques nuits',
    'Stayed one night': 'Séjour d\'une nuit',
    'Stayed with kids': 'Séjour avec des enfants',
    'Stayed with a pet': 'Séjour avec un animal de compagnie',
    'Stayed about a week': 'Séjour d\'environ une semaine',
  },

};
