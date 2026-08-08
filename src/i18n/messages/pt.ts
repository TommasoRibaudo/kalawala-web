import type { Messages } from './en';

/**
 * Portuguese UI strings.
 *
 * European Portuguese (see the plan's locked decision: bare `pt`, not split
 * into `pt-BR`/`pt-PT`) — vocabulary and phrasing lean European where the two
 * diverge (e.g. "reserva", not "booking"-anglicised Brazilian usage).
 */
export const pt: Messages = {
  common: {
    checkAvailability: 'Verificar disponibilidade',
    readyToBook: 'Pronto para reservar?',
    instantConfirmation: 'Confirmação instantânea',
  },

  nav: {
    home: 'Início',
    blog: 'Blog',
    myBooking: 'A minha reserva',
    bookNow: 'Reservar agora',
  },

  footer: {
    ourHomes: 'As nossas casas',
    travelGuides: 'Guias de viagem',
    contact: 'Contacto',
    chatOnWhatsApp: 'Conversar no WhatsApp',
  },

  callToAction: {
    exploreAvailability:
      'Explore a disponibilidade e os preços de todas as nossas propriedades em Puerto Viejo e Playa Chiquita.',
    nonRefundableLead: 'Selecione a',
    nonRefundableBold: 'tarifa não reembolsável',
    nonRefundableTail: 'no motor de reservas para usufruir de 10% de desconto.',
    availabilityDisclaimer:
      '*Mostra a disponibilidade de todas as propriedades disponíveis na zona de Puerto Viejo, incluindo propriedades anunciadas noutras páginas — confirme sempre o nome da casa e a respetiva fotografia antes de reservar!',
    bankTransferLead: 'Prefere pagar por transferência bancária ou SINPE? Reserve com segurança connosco e envie a confirmação do seu depósito para',
    bankTransferMid: 'ou via WhatsApp para',
    bankTransferTail: 'no prazo de 6 horas após a sua reserva.',
  },

  hero: {
    tagline: 'Casas de férias totalmente equipadas no coração de Puerto Viejo e Playa Chiquita.',
    trust: '✓ Confirmação instantânea · ✓ Reserva segura · ✓ Sem taxas de plataforma',
    rating: '⭐⭐⭐⭐⭐ 4,9/5 em milhares de estadias desde 2015',
  },

  sections: {
    ourLead: 'As nossas',
    homesHighlight: 'Casas',
    homeHighlight: 'Casa',
    villasHighlight: 'Vivendas',
    exploreOtherStays: 'Explore outras estadias únicas em Puerto Viejo e Playa Chiquita.',
    villasWithPool: 'Vivendas de luxo com piscina privada em Playa Chiquita, Puerto Viejo.',
    privateRetreat: 'Retiro privado em Playa Chiquita, Puerto Viejo',
    otherBlogsHeading: 'Veja os nossos outros artigos do blog!',
    otherListingsHeading: 'Veja as nossas outras opções!',
    readBlog: (title: string) => `Ler artigo: ${title}`,
    weOfferEquipped: 'Oferecemos casas totalmente equipadas:',
  },

  contact: {
    headingMain: 'Entre em',
    headingHighlight: 'Contacto',
    askUsAnything: 'Pergunte-nos o que quiser',
    replyTime: 'Normalmente respondemos em menos de uma hora no WhatsApp.',
    phoneLabel: 'Telefone, WhatsApp:',
    chatOnWhatsApp: 'conversar no WhatsApp',
    emailLabel: 'E-mail:',
  },

  reviews: {
    headingMain: 'O que dizem',
    headingHighlight: 'os nossos hóspedes',
    heading: 'O que dizem os nossos hóspedes',
    closeReview: 'Fechar avaliação',
    closeReviews: 'Fechar avaliações',
  },

  price: {
    tooltip: 'Tarifa mais baixa disponível este mês. Os preços variam consoante a época e as datas escolhidas.',
  },

  tips: {
    instantConfirmation: (propertyName: string) =>
      `✔ Confirmação instantânea garantida para ${propertyName}. Reserve agora e garanta a sua estadia!`,
    nonRefundableDiscount:
      'Selecione a tarifa não reembolsável no motor de reservas para usufruir de 10% de desconto.',
    mobileScroll:
      'Depois de selecionar as datas e pesquisar, deslize para baixo para ver o preço e reservar.',
  },

  blog: {
    bookYourStay: 'Reserve a sua estadia',
    indexTitle: 'Guias de viagem de Puerto Viejo | Reservas Kalawala',
    indexDescription:
      'Dez guias locais sobre Puerto Viejo de Talamanca: como chegar, como circular e o que fazer depois de lá estar.',
    indexHeading: 'Guias de viagem de Puerto Viejo',
  },

  home: {
    pageTitle: 'Reservas Kalawala | Aluguer de casas em Puerto Viejo',
    pageDescription:
      'Descubra as nossas casas, mais económicas do que em qualquer outra plataforma! Bem-vindo à Kalawala — oferecemos casas de férias totalmente equipadas no coração de Puerto Viejo de Talamanca, Costa Rica. As nossas casas têm capacidade para até 5 pessoas, 2 unidades de ar condicionado, casa de banho e cozinha privativas totalmente equipadas e ligação Wi-Fi gratuita.',
    helpMeChooseTitle: 'Encontre a sua',
    helpMeChooseTitleHighlight: 'estadia ideal',
    optionCouples: 'Ideal para casais',
    optionFamilies: 'Perfeito para famílias',
    optionPetFriendly: 'Aceita animais de estimação',
    optionBestValue: 'Melhor relação qualidade-preço',
  },

  property: {
    capacityAriaLabel: 'Capacidade da propriedade',
    viewListing: (name: string) => `Ver anúncio: ${name}`,
    checkInLabel: 'Check-in:',
    checkOutLabel: 'Check-out:',
    stickyCta: 'Verificar disponibilidade',
    whyGuestsChoose: (propertyName: string) => `Porque é que os hóspedes escolhem ${propertyName}`,
    bedrooms: (count: number) => `${count} ${count === 1 ? 'quarto' : 'quartos'}`,
    bathrooms: (count: number) => `${count} ${count === 1 ? 'casa de banho' : 'casas de banho'}`,
    upToGuests: (count: number) => `Até ${count} ${count === 1 ? 'hóspede' : 'hóspedes'}`,
  },
};
