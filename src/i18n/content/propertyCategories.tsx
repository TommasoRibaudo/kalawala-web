import type { Locale } from '../locales';
import type { RouteKey } from '../../routes.config';

/*
 * "Casa vacacional en Puerto Viejo" cluster — hub + 5 category spokes.
 *
 * SEO gap (see GSC/Trends review, 2026-08-17): GSC shows zero impressions for
 * any "vacacional"-rooted query — nothing on the site targets this cluster at
 * all, unlike the weather gap which was a ranking problem. Trends shows
 * booking intent consolidates under the "Puerto Viejo" umbrella ("puerto
 * viejo airbnb" dominant worldwide vs near-zero for neighborhood+airbnb
 * combos), while bare neighborhood names carry real destination-research
 * volume (Punta Uva > Cocles >> Playa Chiquita, the last also colliding with
 * a Puerto Rico beach of the same name). The 10-property portfolio only
 * spans two real locations, so the location split below is Centro vs.
 * Punta Uva/Playa Chiquita, not a wider neighborhood list.
 *
 * Structure: one hub (targets the umbrella term, links everything) + 2
 * location spokes + 3 traveler-type spokes, each spoke a real single-topic
 * page with its own title rather than sections on one broad guide — each
 * needs to be able to rank and be clicked on its own.
 *
 * Property groupings come straight from PROPERTY_MARKETING_CONFIG's existing
 * descriptiveTitle copy (constants.ts) — the "twin" pairs already describe
 * themselves as family/pet-friendly, central-for-couples, villa-for-couples,
 * or Punta-Uva-retreat-for-couples:
 *   Centro (5): Geco, Rana, Tucano, Pappagallo, Delfin
 *   Punta Uva / Playa Chiquita (5): Areka, Plumeria, Giulia, VillaMar, VillaCoral
 *   Families (4): Rana, Geco, Giulia, Delfin
 *   Couples (6): Tucano, Pappagallo, VillaMar, VillaCoral, Areka, Plumeria
 *   Pet-friendly (2): Rana, Geco
 *
 * The Punta Uva spoke leads with "Punta Uva" in title/SEO copy (the
 * higher-recognition search term per Trends) but the body copy is explicit
 * that the houses are in Playa Chiquita, a short drive away — not literally
 * in Punta Uva. Business owner's explicit instruction: rank for Punta Uva
 * searches without misleading on actual location.
 *
 * Locale coverage matches the weather hub precedent: en/es/de/fr/it/pt.
 * he/hi/nl fall back to `.en` via the same `?? content.en!` pattern used
 * throughout blog.tsx.
 */

export interface CategoryCardLink {
  routeKey: RouteKey;
  title: string;
  description: string;
}

export interface PropertyCategoryContent {
  seoTitle: string;
  seoDescription: string;
  heading: string;
  introParagraphs: [string, string];
  gridHeading: string;
  backToHubLabel: string;
  ctaHeading: string;
  ctaText: string;
}

export interface VacationRentalHubContent {
  seoTitle: string;
  seoDescription: string;
  heading: string;
  introParagraphs: [string, string];
  neighborhoodHeading: string;
  neighborhoodIntro: string;
  neighborhoodLinks: [CategoryCardLink, CategoryCardLink];
  tripTypeHeading: string;
  tripTypeIntro: string;
  tripTypeLinks: [CategoryCardLink, CategoryCardLink, CategoryCardLink];
  allHomesHeading: string;
  ctaHeading: string;
  ctaText: string;
  /** Homepage teaser linking to this hub — kept here rather than in the
   * typed message catalog so this content addition doesn't require touching
   * all 9 locale message files for 3 short strings. */
  homeTeaserTitle: string;
  homeTeaserText: string;
  homeTeaserCta: string;
}

/** Base `houseLangCode`s (no locale suffix) shown on each category page. */
export const CATEGORY_PROPERTIES: Record<
  'blogHousesCentro' | 'blogHousesPuntaUva' | 'blogFamilyHouses' | 'blogCouplesHouses' | 'blogPetFriendlyHouses',
  string[]
> = {
  blogHousesCentro: ['Geco', 'Rana', 'Tucano', 'Pappagallo', 'Delfin'],
  blogHousesPuntaUva: ['Areka', 'Plumeria', 'Giulia', 'VillaMar', 'VillaCoral'],
  blogFamilyHouses: ['Rana', 'Geco', 'Giulia', 'Delfin'],
  blogCouplesHouses: ['Tucano', 'Pappagallo', 'VillaMar', 'VillaCoral', 'Areka', 'Plumeria'],
  blogPetFriendlyHouses: ['Rana', 'Geco'],
};

/** All 10 properties, Centro first then Punta Uva/Playa Chiquita — the hub's full grid. */
export const ALL_PROPERTIES: string[] = [
  'Geco', 'Rana', 'Tucano', 'Pappagallo', 'Delfin',
  'Areka', 'Plumeria', 'Giulia', 'VillaMar', 'VillaCoral',
];

const vacationRentalHub: Partial<Record<Locale, VacationRentalHubContent>> = {
  en: {
    seoTitle: 'Vacation Rentals in Puerto Viejo, Costa Rica | Kalawala',
    seoDescription: '10 fully equipped vacation homes in Puerto Viejo de Talamanca, Costa Rica — walk to the beach from our downtown houses or unwind near Punta Uva. Compare by neighborhood or trip type.',
    heading: 'Vacation Rentals in Puerto Viejo, Costa Rica',
    introParagraphs: [
      "Kalawala runs 10 fully equipped vacation homes on Costa Rica's South Caribbean coast, split between two spots: five houses in the heart of Puerto Viejo de Talamanca, and five near Punta Uva in Playa Chiquita.",
      'Every home comes with fast WiFi, a full kitchen and direct support from us before and during your stay — no faceless property-management app in between.',
    ],
    neighborhoodHeading: 'Browse by neighborhood',
    neighborhoodIntro: 'Prefer walking everywhere, or a quieter spot a short drive from the beach? Pick the area that matches your trip.',
    neighborhoodLinks: [
      { routeKey: 'blogHousesCentro', title: 'Puerto Viejo Centro', description: 'Walk to restaurants, the beach and nightlife from any of our 5 downtown houses.' },
      { routeKey: 'blogHousesPuntaUva', title: 'Punta Uva & Playa Chiquita', description: 'Quieter homes a 2-minute drive from Punta Uva, walking distance to Playa Chiquita beach.' },
    ],
    tripTypeHeading: 'Browse by trip type',
    tripTypeIntro: "Not sure where to start? These are the homes our guests pick most for each kind of trip.",
    tripTypeLinks: [
      { routeKey: 'blogFamilyHouses', title: 'Family Houses', description: 'Spacious homes with room to spread out, including our largest house for big families.' },
      { routeKey: 'blogCouplesHouses', title: 'Couples Retreats', description: 'Private villas with a pool and cozy houses built for two.' },
      { routeKey: 'blogPetFriendlyHouses', title: 'Pet-Friendly Houses', description: 'Bring your dog — these 2 houses have outdoor space and no pet fee.' },
    ],
    allHomesHeading: 'All 10 homes',
    ctaHeading: 'Ready to book?',
    ctaText: 'Check availability and prices for your dates.',
    homeTeaserTitle: 'Not sure which home to pick?',
    homeTeaserText: 'Compare all 10 homes by neighborhood or trip type in one place.',
    homeTeaserCta: 'Browse all vacation rentals →',
  },
  es: {
    seoTitle: 'Casas Vacacionales en Puerto Viejo, Costa Rica | Kalawala',
    seoDescription: '10 casas vacacionales totalmente equipadas en Puerto Viejo de Talamanca, Costa Rica. Camina a la playa desde nuestras casas del centro o relájate cerca de Punta Uva. Compara por zona o tipo de viaje.',
    heading: 'Casas Vacacionales en Puerto Viejo, Costa Rica',
    introParagraphs: [
      'En Kalawala administramos 10 casas vacacionales totalmente equipadas en el Caribe Sur de Costa Rica, repartidas en dos zonas: cinco casas en el centro de Puerto Viejo de Talamanca y cinco cerca de Punta Uva, en Playa Chiquita.',
      'Cada casa incluye WiFi rápido, cocina completa y atención directa nuestra antes y durante tu estadía, sin una app de administración impersonal de por medio.',
    ],
    neighborhoodHeading: 'Explora por zona',
    neighborhoodIntro: '¿Prefieres caminar a todos lados o un lugar más tranquilo a pocos minutos de la playa? Elige la zona que se ajuste a tu viaje.',
    neighborhoodLinks: [
      { routeKey: 'blogHousesCentro', title: 'Puerto Viejo Centro', description: 'Camina a restaurantes, la playa y la vida nocturna desde cualquiera de nuestras 5 casas del centro.' },
      { routeKey: 'blogHousesPuntaUva', title: 'Punta Uva y Playa Chiquita', description: 'Casas más tranquilas a 2 minutos en carro de Punta Uva, a poca distancia caminando de la playa de Playa Chiquita.' },
    ],
    tripTypeHeading: 'Explora por tipo de viaje',
    tripTypeIntro: '¿No sabes por dónde empezar? Estas son las casas que nuestros huéspedes eligen más según el tipo de viaje.',
    tripTypeLinks: [
      { routeKey: 'blogFamilyHouses', title: 'Casas para Familias', description: 'Casas amplias con espacio de sobra, incluyendo nuestra casa más grande para familias numerosas.' },
      { routeKey: 'blogCouplesHouses', title: 'Casas para Parejas', description: 'Villas privadas con piscina y casas acogedoras pensadas para dos.' },
      { routeKey: 'blogPetFriendlyHouses', title: 'Casas Pet Friendly', description: 'Trae a tu perro — estas 2 casas tienen espacio exterior y no cobran cargo por mascota.' },
    ],
    allHomesHeading: 'Las 10 casas',
    ctaHeading: '¿Listo para reservar?',
    ctaText: 'Consulta disponibilidad y precios para tus fechas.',
    homeTeaserTitle: '¿No sabes cuál casa elegir?',
    homeTeaserText: 'Compara las 10 casas por zona o tipo de viaje en un solo lugar.',
    homeTeaserCta: 'Ver todas las casas vacacionales →',
  },
  de: {
    seoTitle: 'Ferienhäuser in Puerto Viejo, Costa Rica | Kalawala',
    seoDescription: '10 voll ausgestattete Ferienhäuser in Puerto Viejo de Talamanca, Costa Rica — vom Zentrum zu Fuß zum Strand oder entspannt nahe Punta Uva. Vergleiche nach Lage oder Reisetyp.',
    heading: 'Ferienhäuser in Puerto Viejo, Costa Rica',
    introParagraphs: [
      'Kalawala vermietet 10 voll ausgestattete Ferienhäuser an der karibischen Südküste Costa Ricas, verteilt auf zwei Standorte: fünf Häuser im Zentrum von Puerto Viejo de Talamanca und fünf nahe Punta Uva in Playa Chiquita.',
      'Jedes Haus verfügt über schnelles WLAN, eine komplette Küche und direkten Support von uns vor und während deines Aufenthalts — ohne anonyme Verwaltungs-App dazwischen.',
    ],
    neighborhoodHeading: 'Nach Lage durchsuchen',
    neighborhoodIntro: 'Lieber alles zu Fuß erreichen oder einen ruhigeren Ort wenige Minuten vom Strand? Wähle die Lage, die zu deiner Reise passt.',
    neighborhoodLinks: [
      { routeKey: 'blogHousesCentro', title: 'Puerto Viejo Zentrum', description: 'Zu Fuß zu Restaurants, Strand und Nachtleben von jedem unserer 5 Häuser im Zentrum.' },
      { routeKey: 'blogHousesPuntaUva', title: 'Punta Uva & Playa Chiquita', description: 'Ruhigere Häuser, 2 Autominuten von Punta Uva, fußläufig zum Strand von Playa Chiquita.' },
    ],
    tripTypeHeading: 'Nach Reisetyp durchsuchen',
    tripTypeIntro: 'Nicht sicher, wo du anfangen sollst? Das sind die Häuser, die unsere Gäste für jede Art von Reise am häufigsten wählen.',
    tripTypeLinks: [
      { routeKey: 'blogFamilyHouses', title: 'Familienhäuser', description: 'Geräumige Häuser mit viel Platz, darunter unser größtes Haus für große Familien.' },
      { routeKey: 'blogCouplesHouses', title: 'Rückzugsorte für Paare', description: 'Private Villen mit Pool und gemütliche Häuser für zwei.' },
      { routeKey: 'blogPetFriendlyHouses', title: 'Haustierfreundliche Häuser', description: 'Bring deinen Hund mit — diese 2 Häuser haben Außenbereich und keine Haustiergebühr.' },
    ],
    allHomesHeading: 'Alle 10 Häuser',
    ctaHeading: 'Bereit zu buchen?',
    ctaText: 'Prüfe Verfügbarkeit und Preise für deine Daten.',
    homeTeaserTitle: 'Nicht sicher, welches Haus passt?',
    homeTeaserText: 'Vergleiche alle 10 Häuser nach Lage oder Reisetyp an einem Ort.',
    homeTeaserCta: 'Alle Ferienhäuser ansehen →',
  },
  fr: {
    seoTitle: 'Locations de Vacances à Puerto Viejo, Costa Rica | Kalawala',
    seoDescription: '10 maisons de vacances entièrement équipées à Puerto Viejo de Talamanca, Costa Rica — à pied de la plage depuis nos maisons du centre, ou au calme près de Punta Uva. Comparez par quartier ou type de séjour.',
    heading: 'Locations de Vacances à Puerto Viejo, Costa Rica',
    introParagraphs: [
      'Kalawala gère 10 maisons de vacances entièrement équipées sur la côte Caraïbe Sud du Costa Rica, réparties en deux zones : cinq maisons au cœur de Puerto Viejo de Talamanca, et cinq près de Punta Uva, à Playa Chiquita.',
      'Chaque maison dispose d’un WiFi rapide, d’une cuisine complète et d’un accompagnement direct de notre part avant et pendant votre séjour — sans application de gestion anonyme entre nous.',
    ],
    neighborhoodHeading: 'Parcourir par quartier',
    neighborhoodIntro: 'Vous préférez tout faire à pied, ou un endroit plus calme à quelques minutes de la plage ? Choisissez la zone qui correspond à votre séjour.',
    neighborhoodLinks: [
      { routeKey: 'blogHousesCentro', title: 'Puerto Viejo Centro', description: 'Accédez à pied aux restaurants, à la plage et à la vie nocturne depuis chacune de nos 5 maisons du centre.' },
      { routeKey: 'blogHousesPuntaUva', title: 'Punta Uva et Playa Chiquita', description: 'Maisons plus calmes à 2 minutes en voiture de Punta Uva, à distance de marche de la plage de Playa Chiquita.' },
    ],
    tripTypeHeading: 'Parcourir par type de séjour',
    tripTypeIntro: 'Vous ne savez pas par où commencer ? Voici les maisons que nos voyageurs choisissent le plus selon le type de séjour.',
    tripTypeLinks: [
      { routeKey: 'blogFamilyHouses', title: 'Maisons Familiales', description: 'Des maisons spacieuses avec de la place, dont notre plus grande maison pour les familles nombreuses.' },
      { routeKey: 'blogCouplesHouses', title: 'Refuges pour Couples', description: 'Villas privées avec piscine et maisons chaleureuses pensées pour deux.' },
      { routeKey: 'blogPetFriendlyHouses', title: 'Maisons Acceptant les Animaux', description: 'Amenez votre chien — ces 2 maisons ont un espace extérieur et aucun supplément animal.' },
    ],
    allHomesHeading: 'Les 10 maisons',
    ctaHeading: 'Prêt à réserver ?',
    ctaText: 'Vérifiez les disponibilités et les tarifs pour vos dates.',
    homeTeaserTitle: 'Vous ne savez pas quelle maison choisir ?',
    homeTeaserText: 'Comparez les 10 maisons par quartier ou type de séjour en un seul endroit.',
    homeTeaserCta: 'Voir toutes les locations de vacances →',
  },
  it: {
    seoTitle: 'Case Vacanza a Puerto Viejo, Costa Rica | Kalawala',
    seoDescription: '10 case vacanza completamente attrezzate a Puerto Viejo de Talamanca, Costa Rica — a piedi dalla spiaggia dalle case del centro, o relax vicino a Punta Uva. Confronta per zona o tipo di viaggio.',
    heading: 'Case Vacanza a Puerto Viejo, Costa Rica',
    introParagraphs: [
      'Kalawala gestisce 10 case vacanza completamente attrezzate sulla costa caraibica meridionale del Costa Rica, divise in due zone: cinque case nel cuore di Puerto Viejo de Talamanca e cinque vicino a Punta Uva, a Playa Chiquita.',
      'Ogni casa ha WiFi veloce, cucina completa e assistenza diretta da parte nostra prima e durante il soggiorno — senza un’app di gestione anonima di mezzo.',
    ],
    neighborhoodHeading: 'Esplora per zona',
    neighborhoodIntro: 'Preferisci raggiungere tutto a piedi, o un posto più tranquillo a pochi minuti dalla spiaggia? Scegli la zona adatta al tuo viaggio.',
    neighborhoodLinks: [
      { routeKey: 'blogHousesCentro', title: 'Puerto Viejo Centro', description: 'Raggiungi a piedi ristoranti, spiaggia e vita notturna da una delle nostre 5 case in centro.' },
      { routeKey: 'blogHousesPuntaUva', title: 'Punta Uva e Playa Chiquita', description: 'Case più tranquille a 2 minuti in auto da Punta Uva, a pochi passi dalla spiaggia di Playa Chiquita.' },
    ],
    tripTypeHeading: 'Esplora per tipo di viaggio',
    tripTypeIntro: 'Non sai da dove iniziare? Ecco le case che i nostri ospiti scelgono di più per ogni tipo di viaggio.',
    tripTypeLinks: [
      { routeKey: 'blogFamilyHouses', title: 'Case per Famiglie', description: 'Case spaziose con posto extra, inclusa la nostra casa più grande per famiglie numerose.' },
      { routeKey: 'blogCouplesHouses', title: 'Rifugi per Coppie', description: 'Ville private con piscina e case accoglienti pensate per due.' },
      { routeKey: 'blogPetFriendlyHouses', title: 'Case Pet Friendly', description: 'Porta il tuo cane — queste 2 case hanno spazio esterno e nessun costo extra per l’animale.' },
    ],
    allHomesHeading: 'Tutte le 10 case',
    ctaHeading: 'Pronto a prenotare?',
    ctaText: 'Controlla disponibilità e prezzi per le tue date.',
    homeTeaserTitle: 'Non sai quale casa scegliere?',
    homeTeaserText: 'Confronta tutte le 10 case per zona o tipo di viaggio in un unico posto.',
    homeTeaserCta: 'Vedi tutte le case vacanza →',
  },
  pt: {
    seoTitle: 'Casas de Férias em Puerto Viejo, Costa Rica | Kalawala',
    seoDescription: '10 casas de férias totalmente equipadas em Puerto Viejo de Talamanca, Costa Rica — a pé até a praia a partir das casas do centro, ou tranquilidade perto de Punta Uva. Compare por bairro ou tipo de viagem.',
    heading: 'Casas de Férias em Puerto Viejo, Costa Rica',
    introParagraphs: [
      'A Kalawala administra 10 casas de férias totalmente equipadas no Caribe Sul da Costa Rica, divididas em duas áreas: cinco casas no coração de Puerto Viejo de Talamanca e cinco perto de Punta Uva, em Playa Chiquita.',
      'Cada casa tem WiFi rápido, cozinha completa e suporte direto nosso antes e durante a sua estadia — sem um aplicativo de gestão impessoal no meio do caminho.',
    ],
    neighborhoodHeading: 'Explore por bairro',
    neighborhoodIntro: 'Prefere caminhar para tudo, ou um lugar mais tranquilo a poucos minutos da praia? Escolha a área que combina com a sua viagem.',
    neighborhoodLinks: [
      { routeKey: 'blogHousesCentro', title: 'Puerto Viejo Centro', description: 'Vá a pé a restaurantes, à praia e à vida noturna a partir de qualquer uma das nossas 5 casas do centro.' },
      { routeKey: 'blogHousesPuntaUva', title: 'Punta Uva e Playa Chiquita', description: 'Casas mais tranquilas a 2 minutos de carro de Punta Uva, a poucos passos da praia de Playa Chiquita.' },
    ],
    tripTypeHeading: 'Explore por tipo de viagem',
    tripTypeIntro: 'Não sabe por onde começar? Estas são as casas mais escolhidas pelos nossos hóspedes para cada tipo de viagem.',
    tripTypeLinks: [
      { routeKey: 'blogFamilyHouses', title: 'Casas para Famílias', description: 'Casas espaçosas com bastante espaço, incluindo a nossa maior casa para famílias grandes.' },
      { routeKey: 'blogCouplesHouses', title: 'Refúgios para Casais', description: 'Vilas privativas com piscina e casas aconchegantes pensadas para dois.' },
      { routeKey: 'blogPetFriendlyHouses', title: 'Casas Pet Friendly', description: 'Traga o seu cão — estas 2 casas têm área externa e nenhuma taxa extra por animal.' },
    ],
    allHomesHeading: 'As 10 casas',
    ctaHeading: 'Pronto para reservar?',
    ctaText: 'Consulte disponibilidade e preços para as suas datas.',
    homeTeaserTitle: 'Não sabe qual casa escolher?',
    homeTeaserText: 'Compare as 10 casas por bairro ou tipo de viagem num só lugar.',
    homeTeaserCta: 'Ver todas as casas de férias →',
  },
};

export function vacationRentalHubContent(locale: Locale): VacationRentalHubContent {
  return vacationRentalHub[locale] ?? vacationRentalHub.en!;
}

const housesCentro: Partial<Record<Locale, PropertyCategoryContent>> = {
  en: {
    seoTitle: '5 Vacation Houses in Puerto Viejo Centro, Costa Rica',
    seoDescription: 'Walk to the beach, restaurants and bars from our 5 fully equipped vacation houses in downtown Puerto Viejo de Talamanca. Compare capacity, amenities and prices.',
    heading: 'Vacation Houses in Puerto Viejo Centro',
    introParagraphs: [
      'These 5 houses sit within walking distance of downtown Puerto Viejo de Talamanca — restaurants, bars, the bus stop and the beach are all a few minutes on foot, no car needed.',
      'Each one is fully equipped with a kitchen, fast WiFi and air conditioning, and two of them, Casa Rana and Casa Geco, welcome pets.',
    ],
    gridHeading: 'Our 5 houses in Puerto Viejo centro',
    backToHubLabel: 'See all vacation homes in Puerto Viejo →',
    ctaHeading: 'Ready to book?',
    ctaText: 'Check availability and prices for your dates.',
  },
  es: {
    seoTitle: '5 Casas Vacacionales en el Centro de Puerto Viejo',
    seoDescription: 'Camina a la playa, restaurantes y bares desde nuestras 5 casas vacacionales totalmente equipadas en el centro de Puerto Viejo de Talamanca. Compara capacidad, comodidades y precios.',
    heading: 'Casas Vacacionales en Puerto Viejo Centro',
    introParagraphs: [
      'Estas 5 casas están a poca distancia caminando del centro de Puerto Viejo de Talamanca: restaurantes, bares, la parada de bus y la playa quedan a pocos minutos a pie, sin necesidad de carro.',
      'Cada una está totalmente equipada con cocina, WiFi rápido y aire acondicionado, y dos de ellas, Casa Rana y Casa Geco, reciben mascotas.',
    ],
    gridHeading: 'Nuestras 5 casas en el centro de Puerto Viejo',
    backToHubLabel: 'Ver todas las casas vacacionales en Puerto Viejo →',
    ctaHeading: '¿Listo para reservar?',
    ctaText: 'Consulta disponibilidad y precios para tus fechas.',
  },
  de: {
    seoTitle: '5 Ferienhäuser im Zentrum von Puerto Viejo, Costa Rica',
    seoDescription: 'Zu Fuß zum Strand, zu Restaurants und Bars — von unseren 5 voll ausgestatteten Ferienhäusern im Zentrum von Puerto Viejo de Talamanca. Vergleiche Kapazität, Ausstattung und Preise.',
    heading: 'Ferienhäuser im Zentrum von Puerto Viejo',
    introParagraphs: [
      'Diese 5 Häuser liegen fußläufig zum Zentrum von Puerto Viejo de Talamanca — Restaurants, Bars, die Bushaltestelle und der Strand sind wenige Gehminuten entfernt, kein Auto nötig.',
      'Jedes ist voll ausgestattet mit Küche, schnellem WLAN und Klimaanlage, und zwei davon, Casa Rana und Casa Geco, heißen Haustiere willkommen.',
    ],
    gridHeading: 'Unsere 5 Häuser im Zentrum von Puerto Viejo',
    backToHubLabel: 'Alle Ferienhäuser in Puerto Viejo ansehen →',
    ctaHeading: 'Bereit zu buchen?',
    ctaText: 'Prüfe Verfügbarkeit und Preise für deine Daten.',
  },
  fr: {
    seoTitle: '5 Maisons de Vacances au Centre de Puerto Viejo, Costa Rica',
    seoDescription: 'À pied de la plage, des restaurants et des bars depuis nos 5 maisons de vacances entièrement équipées au centre de Puerto Viejo de Talamanca. Comparez capacité, équipements et tarifs.',
    heading: 'Maisons de Vacances au Centre de Puerto Viejo',
    introParagraphs: [
      'Ces 5 maisons se trouvent à distance de marche du centre de Puerto Viejo de Talamanca — restaurants, bars, l’arrêt de bus et la plage sont à quelques minutes à pied, sans voiture.',
      'Chacune est entièrement équipée avec cuisine, WiFi rapide et climatisation, et deux d’entre elles, Casa Rana et Casa Geco, acceptent les animaux.',
    ],
    gridHeading: 'Nos 5 maisons au centre de Puerto Viejo',
    backToHubLabel: 'Voir toutes les maisons de vacances à Puerto Viejo →',
    ctaHeading: 'Prêt à réserver ?',
    ctaText: 'Vérifiez les disponibilités et les tarifs pour vos dates.',
  },
  it: {
    seoTitle: '5 Case Vacanza nel Centro di Puerto Viejo, Costa Rica',
    seoDescription: 'A piedi dalla spiaggia, ristoranti e bar dalle nostre 5 case vacanza completamente attrezzate nel centro di Puerto Viejo de Talamanca. Confronta capienza, comfort e prezzi.',
    heading: 'Case Vacanza nel Centro di Puerto Viejo',
    introParagraphs: [
      'Queste 5 case si trovano a pochi passi dal centro di Puerto Viejo de Talamanca — ristoranti, bar, la fermata del bus e la spiaggia sono a pochi minuti a piedi, senza bisogno di auto.',
      'Ognuna è completamente attrezzata con cucina, WiFi veloce e aria condizionata, e due di esse, Casa Rana e Casa Geco, accolgono animali.',
    ],
    gridHeading: 'Le nostre 5 case nel centro di Puerto Viejo',
    backToHubLabel: 'Vedi tutte le case vacanza a Puerto Viejo →',
    ctaHeading: 'Pronto a prenotare?',
    ctaText: 'Controlla disponibilità e prezzi per le tue date.',
  },
  pt: {
    seoTitle: '5 Casas de Férias no Centro de Puerto Viejo, Costa Rica',
    seoDescription: 'A pé até a praia, restaurantes e bares a partir das nossas 5 casas de férias totalmente equipadas no centro de Puerto Viejo de Talamanca. Compare capacidade, comodidades e preços.',
    heading: 'Casas de Férias no Centro de Puerto Viejo',
    introParagraphs: [
      'Estas 5 casas ficam a poucos passos do centro de Puerto Viejo de Talamanca — restaurantes, bares, o ponto de ônibus e a praia ficam a poucos minutos a pé, sem precisar de carro.',
      'Cada uma é totalmente equipada com cozinha, WiFi rápido e ar-condicionado, e duas delas, Casa Rana e Casa Geco, aceitam animais de estimação.',
    ],
    gridHeading: 'As nossas 5 casas no centro de Puerto Viejo',
    backToHubLabel: 'Ver todas as casas de férias em Puerto Viejo →',
    ctaHeading: 'Pronto para reservar?',
    ctaText: 'Consulte disponibilidade e preços para as suas datas.',
  },
};

const housesPuntaUva: Partial<Record<Locale, PropertyCategoryContent>> = {
  en: {
    seoTitle: '5 Vacation Homes Near Punta Uva, Puerto Viejo',
    seoDescription: '5 fully equipped vacation homes in Playa Chiquita, a 2-minute drive from Punta Uva beach and walking distance to Playa Chiquita. Villas with pool and cozy retreats for couples and families.',
    heading: 'Vacation Homes Near Punta Uva',
    introParagraphs: [
      "These 5 homes are in Playa Chiquita, a short 2-minute drive from Punta Uva — one of the South Caribbean's calmest, most swimmable beaches — and an easy walk to Playa Chiquita's own beach.",
      'The area is quieter than downtown Puerto Viejo: jungle sounds and a slower pace, with a rental car or bike recommended to get around.',
    ],
    gridHeading: 'Our 5 homes near Punta Uva',
    backToHubLabel: 'See all vacation homes in Puerto Viejo →',
    ctaHeading: 'Ready to book?',
    ctaText: 'Check availability and prices for your dates.',
  },
  es: {
    seoTitle: '5 Casas Vacacionales cerca de Punta Uva, Puerto Viejo',
    seoDescription: '5 casas vacacionales totalmente equipadas en Playa Chiquita, a 2 minutos en carro de la playa de Punta Uva y a poca distancia caminando de Playa Chiquita. Villas con piscina y refugios acogedores.',
    heading: 'Casas Vacacionales cerca de Punta Uva',
    introParagraphs: [
      'Estas 5 casas están en Playa Chiquita, a solo 2 minutos en carro de Punta Uva — una de las playas más tranquilas y aptas para nadar del Caribe Sur — y a poca distancia caminando de la propia playa de Playa Chiquita.',
      'La zona es más tranquila que el centro de Puerto Viejo: sonidos de selva y un ritmo más lento, así que recomendamos carro o bicicleta para moverte.',
    ],
    gridHeading: 'Nuestras 5 casas cerca de Punta Uva',
    backToHubLabel: 'Ver todas las casas vacacionales en Puerto Viejo →',
    ctaHeading: '¿Listo para reservar?',
    ctaText: 'Consulta disponibilidad y precios para tus fechas.',
  },
  de: {
    seoTitle: '5 Ferienhäuser nahe Punta Uva, Puerto Viejo',
    seoDescription: '5 voll ausgestattete Ferienhäuser in Playa Chiquita, 2 Autominuten vom Strand Punta Uva und fußläufig zu Playa Chiquita. Villen mit Pool und gemütliche Rückzugsorte für Paare und Familien.',
    heading: 'Ferienhäuser nahe Punta Uva',
    introParagraphs: [
      'Diese 5 Häuser liegen in Playa Chiquita, nur 2 Autominuten von Punta Uva entfernt — einem der ruhigsten, am besten zum Schwimmen geeigneten Strände der Südkaribik — und einen kurzen Spaziergang vom Strand von Playa Chiquita selbst.',
      'Die Gegend ist ruhiger als das Zentrum von Puerto Viejo: Dschungelgeräusche und ein langsameres Tempo, ein Mietwagen oder Fahrrad wird zur Fortbewegung empfohlen.',
    ],
    gridHeading: 'Unsere 5 Häuser nahe Punta Uva',
    backToHubLabel: 'Alle Ferienhäuser in Puerto Viejo ansehen →',
    ctaHeading: 'Bereit zu buchen?',
    ctaText: 'Prüfe Verfügbarkeit und Preise für deine Daten.',
  },
  fr: {
    seoTitle: '5 Maisons de Vacances près de Punta Uva, Puerto Viejo',
    seoDescription: '5 maisons de vacances entièrement équipées à Playa Chiquita, à 2 minutes en voiture de la plage de Punta Uva et à distance de marche de Playa Chiquita. Villas avec piscine et refuges chaleureux.',
    heading: 'Maisons de Vacances près de Punta Uva',
    introParagraphs: [
      'Ces 5 maisons se trouvent à Playa Chiquita, à seulement 2 minutes en voiture de Punta Uva — l’une des plages les plus calmes et les plus propices à la baignade de la côte Caraïbe Sud — et à distance de marche de la plage de Playa Chiquita elle-même.',
      'Le quartier est plus calme que le centre de Puerto Viejo : sons de la jungle et rythme plus lent, une voiture de location ou un vélo est recommandé pour se déplacer.',
    ],
    gridHeading: 'Nos 5 maisons près de Punta Uva',
    backToHubLabel: 'Voir toutes les maisons de vacances à Puerto Viejo →',
    ctaHeading: 'Prêt à réserver ?',
    ctaText: 'Vérifiez les disponibilités et les tarifs pour vos dates.',
  },
  it: {
    seoTitle: '5 Case Vacanza vicino a Punta Uva, Puerto Viejo',
    seoDescription: '5 case vacanza completamente attrezzate a Playa Chiquita, a 2 minuti in auto dalla spiaggia di Punta Uva e a pochi passi da Playa Chiquita. Ville con piscina e rifugi accoglienti.',
    heading: 'Case Vacanza vicino a Punta Uva',
    introParagraphs: [
      'Queste 5 case si trovano a Playa Chiquita, a soli 2 minuti in auto da Punta Uva — una delle spiagge più tranquille e balneabili del Caribe Sud — e a pochi passi dalla spiaggia di Playa Chiquita stessa.',
      'La zona è più tranquilla del centro di Puerto Viejo: suoni della giungla e un ritmo più lento, consigliata un’auto a noleggio o una bici per muoversi.',
    ],
    gridHeading: 'Le nostre 5 case vicino a Punta Uva',
    backToHubLabel: 'Vedi tutte le case vacanza a Puerto Viejo →',
    ctaHeading: 'Pronto a prenotare?',
    ctaText: 'Controlla disponibilità e prezzi per le tue date.',
  },
  pt: {
    seoTitle: '5 Casas de Férias perto de Punta Uva, Puerto Viejo',
    seoDescription: '5 casas de férias totalmente equipadas em Playa Chiquita, a 2 minutos de carro da praia de Punta Uva e a poucos passos de Playa Chiquita. Vilas com piscina e refúgios aconchegantes.',
    heading: 'Casas de Férias perto de Punta Uva',
    introParagraphs: [
      'Estas 5 casas ficam em Playa Chiquita, a apenas 2 minutos de carro de Punta Uva — uma das praias mais tranquilas e próprias para nadar do Caribe Sul — e a poucos passos da própria praia de Playa Chiquita.',
      'A área é mais tranquila que o centro de Puerto Viejo: sons da selva e um ritmo mais lento, recomenda-se um carro alugado ou bicicleta para se locomover.',
    ],
    gridHeading: 'As nossas 5 casas perto de Punta Uva',
    backToHubLabel: 'Ver todas as casas de férias em Puerto Viejo →',
    ctaHeading: 'Pronto para reservar?',
    ctaText: 'Consulte disponibilidade e preços para as suas datas.',
  },
};

const familyHouses: Partial<Record<Locale, PropertyCategoryContent>> = {
  en: {
    seoTitle: 'Family-Friendly Vacation Houses in Puerto Viejo',
    seoDescription: '4 spacious vacation houses in Puerto Viejo, Costa Rica built for families — including Casa Delfines, our largest house, and 2 pet-friendly options.',
    heading: 'Family-Friendly Houses in Puerto Viejo',
    introParagraphs: [
      "These 4 houses have the extra space families ask for most: separate bedrooms and room to spread out, plus — for Casa Rana and Casa Geco — a fenced garden and no pet fee if you're bringing the dog.",
      'Casa Delfines is our largest house and the usual pick for bigger families or two families traveling together.',
    ],
    gridHeading: 'Houses that fit families',
    backToHubLabel: 'See all vacation homes in Puerto Viejo →',
    ctaHeading: 'Ready to book?',
    ctaText: 'Check availability and prices for your dates.',
  },
  es: {
    seoTitle: 'Casas Vacacionales para Familias en Puerto Viejo',
    seoDescription: '4 casas vacacionales amplias en Puerto Viejo, Costa Rica, pensadas para familias — incluyendo Casa Delfines, nuestra casa más grande, y 2 opciones pet friendly.',
    heading: 'Casas para Familias en Puerto Viejo',
    introParagraphs: [
      'Estas 4 casas tienen el espacio extra que más piden las familias: habitaciones separadas y lugar de sobra, además de que Casa Rana y Casa Geco tienen jardín cercado y no cobran cargo por mascota si viajas con tu perro.',
      'Casa Delfines es nuestra casa más grande, la opción habitual para familias numerosas o dos familias viajando juntas.',
    ],
    gridHeading: 'Casas ideales para familias',
    backToHubLabel: 'Ver todas las casas vacacionales en Puerto Viejo →',
    ctaHeading: '¿Listo para reservar?',
    ctaText: 'Consulta disponibilidad y precios para tus fechas.',
  },
  de: {
    seoTitle: 'Familienfreundliche Ferienhäuser in Puerto Viejo',
    seoDescription: '4 geräumige Ferienhäuser in Puerto Viejo, Costa Rica für Familien — darunter Casa Delfines, unser größtes Haus, und 2 haustierfreundliche Optionen.',
    heading: 'Familienfreundliche Häuser in Puerto Viejo',
    introParagraphs: [
      'Diese 4 Häuser bieten den zusätzlichen Platz, den Familien am häufigsten wünschen: getrennte Schlafzimmer und viel Raum, plus bei Casa Rana und Casa Geco einen umzäunten Garten und keine Haustiergebühr, wenn der Hund mitkommt.',
      'Casa Delfines ist unser größtes Haus und die übliche Wahl für größere Familien oder zwei gemeinsam reisende Familien.',
    ],
    gridHeading: 'Häuser, die zu Familien passen',
    backToHubLabel: 'Alle Ferienhäuser in Puerto Viejo ansehen →',
    ctaHeading: 'Bereit zu buchen?',
    ctaText: 'Prüfe Verfügbarkeit und Preise für deine Daten.',
  },
  fr: {
    seoTitle: 'Maisons de Vacances Familiales à Puerto Viejo',
    seoDescription: '4 maisons de vacances spacieuses à Puerto Viejo, Costa Rica conçues pour les familles — dont Casa Delfines, notre plus grande maison, et 2 options acceptant les animaux.',
    heading: 'Maisons Familiales à Puerto Viejo',
    introParagraphs: [
      'Ces 4 maisons offrent l’espace supplémentaire que les familles demandent le plus : chambres séparées et de la place, ainsi que, pour Casa Rana et Casa Geco, un jardin clôturé et aucun supplément animal si vous amenez votre chien.',
      'Casa Delfines est notre plus grande maison, le choix habituel pour les familles nombreuses ou deux familles voyageant ensemble.',
    ],
    gridHeading: 'Des maisons adaptées aux familles',
    backToHubLabel: 'Voir toutes les maisons de vacances à Puerto Viejo →',
    ctaHeading: 'Prêt à réserver ?',
    ctaText: 'Vérifiez les disponibilités et les tarifs pour vos dates.',
  },
  it: {
    seoTitle: 'Case Vacanza per Famiglie a Puerto Viejo',
    seoDescription: '4 case vacanza spaziose a Puerto Viejo, Costa Rica pensate per le famiglie — inclusa Casa Delfines, la nostra casa più grande, e 2 opzioni pet friendly.',
    heading: 'Case per Famiglie a Puerto Viejo',
    introParagraphs: [
      'Queste 4 case offrono lo spazio extra che le famiglie chiedono di più: camere separate e posto in abbondanza, e per Casa Rana e Casa Geco un giardino recintato senza costo extra per l’animale.',
      'Casa Delfines è la nostra casa più grande, la scelta abituale per famiglie numerose o due famiglie che viaggiano insieme.',
    ],
    gridHeading: 'Case ideali per famiglie',
    backToHubLabel: 'Vedi tutte le case vacanza a Puerto Viejo →',
    ctaHeading: 'Pronto a prenotare?',
    ctaText: 'Controlla disponibilità e prezzi per le tue date.',
  },
  pt: {
    seoTitle: 'Casas de Férias para Famílias em Puerto Viejo',
    seoDescription: '4 casas de férias espaçosas em Puerto Viejo, Costa Rica pensadas para famílias — incluindo Casa Delfines, a nossa maior casa, e 2 opções pet friendly.',
    heading: 'Casas para Famílias em Puerto Viejo',
    introParagraphs: [
      'Estas 4 casas têm o espaço extra que as famílias mais pedem: quartos separados e bastante espaço, além de, na Casa Rana e na Casa Geco, jardim cercado e nenhuma taxa extra se você trouxer o cachorro.',
      'Casa Delfines é a nossa maior casa, a escolha habitual para famílias grandes ou duas famílias viajando juntas.',
    ],
    gridHeading: 'Casas ideais para famílias',
    backToHubLabel: 'Ver todas as casas de férias em Puerto Viejo →',
    ctaHeading: 'Pronto para reservar?',
    ctaText: 'Consulte disponibilidade e preços para as suas datas.',
  },
};

const couplesHouses: Partial<Record<Locale, PropertyCategoryContent>> = {
  en: {
    seoTitle: 'Romantic Vacation Rentals for Couples in Puerto Viejo',
    seoDescription: '6 vacation rentals in Puerto Viejo, Costa Rica built for two — private villas with a pool near Punta Uva, plus central apartments above an Italian bakery.',
    heading: 'Couples Retreats in Puerto Viejo',
    introParagraphs: [
      'Six of our ten homes are sized and set up for two: Villa Mar and Villa Coral are private villas with their own pool near Punta Uva; Casa Areka and Casa Plumeria are cozy retreats in the same area; and Casa Tucano and Casa Pappagallo are central apartments above an Italian bakery in downtown Puerto Viejo.',
      "Pick a villa if you want privacy and a pool, or a central apartment if you'd rather walk to dinner.",
    ],
    gridHeading: 'Homes built for two',
    backToHubLabel: 'See all vacation homes in Puerto Viejo →',
    ctaHeading: 'Ready to book?',
    ctaText: 'Check availability and prices for your dates.',
  },
  es: {
    seoTitle: 'Casas Vacacionales Románticas para Parejas en Puerto Viejo',
    seoDescription: '6 casas vacacionales en Puerto Viejo, Costa Rica pensadas para dos — villas privadas con piscina cerca de Punta Uva y apartamentos céntricos sobre una panadería italiana.',
    heading: 'Casas para Parejas en Puerto Viejo',
    introParagraphs: [
      'Seis de nuestras diez casas están pensadas para dos personas: Villa Mar y Villa Coral son villas privadas con piscina propia cerca de Punta Uva; Casa Areka y Casa Plumeria son refugios acogedores en la misma zona; y Casa Tucano y Casa Pappagallo son apartamentos céntricos sobre una panadería italiana en el centro de Puerto Viejo.',
      'Elige una villa si buscas privacidad y piscina, o un apartamento céntrico si prefieres caminar a cenar.',
    ],
    gridHeading: 'Casas pensadas para dos',
    backToHubLabel: 'Ver todas las casas vacacionales en Puerto Viejo →',
    ctaHeading: '¿Listo para reservar?',
    ctaText: 'Consulta disponibilidad y precios para tus fechas.',
  },
  de: {
    seoTitle: 'Romantische Ferienunterkünfte für Paare in Puerto Viejo',
    seoDescription: '6 Ferienunterkünfte in Puerto Viejo, Costa Rica für zwei — private Villen mit Pool nahe Punta Uva sowie zentrale Apartments über einer italienischen Bäckerei.',
    heading: 'Rückzugsorte für Paare in Puerto Viejo',
    introParagraphs: [
      'Sechs unserer zehn Häuser sind für zwei Personen ausgelegt: Villa Mar und Villa Coral sind private Villen mit eigenem Pool nahe Punta Uva; Casa Areka und Casa Plumeria sind gemütliche Rückzugsorte in derselben Gegend; und Casa Tucano und Casa Pappagallo sind zentrale Apartments über einer italienischen Bäckerei im Zentrum von Puerto Viejo.',
      'Wähle eine Villa für Privatsphäre und Pool, oder ein zentrales Apartment, wenn du lieber zum Abendessen läufst.',
    ],
    gridHeading: 'Häuser für zwei',
    backToHubLabel: 'Alle Ferienhäuser in Puerto Viejo ansehen →',
    ctaHeading: 'Bereit zu buchen?',
    ctaText: 'Prüfe Verfügbarkeit und Preise für deine Daten.',
  },
  fr: {
    seoTitle: 'Locations de Vacances Romantiques pour Couples à Puerto Viejo',
    seoDescription: '6 locations de vacances à Puerto Viejo, Costa Rica conçues pour deux — villas privées avec piscine près de Punta Uva et appartements centraux au-dessus d’une boulangerie italienne.',
    heading: 'Refuges pour Couples à Puerto Viejo',
    introParagraphs: [
      'Six de nos dix maisons sont conçues pour deux personnes : Villa Mar et Villa Coral sont des villas privées avec piscine propre près de Punta Uva ; Casa Areka et Casa Plumeria sont des refuges chaleureux dans le même secteur ; et Casa Tucano et Casa Pappagallo sont des appartements centraux au-dessus d’une boulangerie italienne au centre de Puerto Viejo.',
      'Choisissez une villa pour l’intimité et la piscine, ou un appartement central si vous préférez marcher jusqu’au restaurant.',
    ],
    gridHeading: 'Des maisons pensées pour deux',
    backToHubLabel: 'Voir toutes les maisons de vacances à Puerto Viejo →',
    ctaHeading: 'Prêt à réserver ?',
    ctaText: 'Vérifiez les disponibilités et les tarifs pour vos dates.',
  },
  it: {
    seoTitle: 'Case Vacanza Romantiche per Coppie a Puerto Viejo',
    seoDescription: '6 case vacanza a Puerto Viejo, Costa Rica pensate per due — ville private con piscina vicino a Punta Uva e appartamenti centrali sopra una panetteria italiana.',
    heading: 'Rifugi per Coppie a Puerto Viejo',
    introParagraphs: [
      'Sei delle nostre dieci case sono pensate per due persone: Villa Mar e Villa Coral sono ville private con piscina propria vicino a Punta Uva; Casa Areka e Casa Plumeria sono rifugi accoglienti nella stessa zona; Casa Tucano e Casa Pappagallo sono appartamenti centrali sopra una panetteria italiana nel centro di Puerto Viejo.',
      'Scegli una villa se cerchi privacy e piscina, o un appartamento centrale se preferisci raggiungere a piedi i ristoranti.',
    ],
    gridHeading: 'Case pensate per due',
    backToHubLabel: 'Vedi tutte le case vacanza a Puerto Viejo →',
    ctaHeading: 'Pronto a prenotare?',
    ctaText: 'Controlla disponibilità e prezzi per le tue date.',
  },
  pt: {
    seoTitle: 'Casas de Férias Românticas para Casais em Puerto Viejo',
    seoDescription: '6 casas de férias em Puerto Viejo, Costa Rica pensadas para dois — vilas privativas com piscina perto de Punta Uva e apartamentos centrais sobre uma padaria italiana.',
    heading: 'Refúgios para Casais em Puerto Viejo',
    introParagraphs: [
      'Seis das nossas dez casas são pensadas para duas pessoas: Villa Mar e Villa Coral são vilas privativas com piscina própria perto de Punta Uva; Casa Areka e Casa Plumeria são refúgios aconchegantes na mesma área; e Casa Tucano e Casa Pappagallo são apartamentos centrais sobre uma padaria italiana no centro de Puerto Viejo.',
      'Escolha uma vila se busca privacidade e piscina, ou um apartamento central se prefere caminhar até o jantar.',
    ],
    gridHeading: 'Casas pensadas para dois',
    backToHubLabel: 'Ver todas as casas de férias em Puerto Viejo →',
    ctaHeading: 'Pronto para reservar?',
    ctaText: 'Consulte disponibilidade e preços para as suas datas.',
  },
};

const petFriendlyHouses: Partial<Record<Locale, PropertyCategoryContent>> = {
  en: {
    seoTitle: 'Pet-Friendly Vacation Houses in Puerto Viejo, Costa Rica',
    seoDescription: 'Casa Rana and Casa Geco are our 2 pet-friendly vacation houses in downtown Puerto Viejo — fenced outdoor space, no pet fee, and a short walk to the beach.',
    heading: 'Pet-Friendly Houses in Puerto Viejo',
    introParagraphs: [
      'Casa Rana and Casa Geco are the two houses in our portfolio set up for guests traveling with a dog: both have a small fenced garden, and we don’t charge a pet fee.',
      'Both sit in downtown Puerto Viejo, walking distance to the beach — handy for a pre-breakfast walk before it gets hot.',
    ],
    gridHeading: 'Our 2 pet-friendly houses',
    backToHubLabel: 'See all vacation homes in Puerto Viejo →',
    ctaHeading: 'Ready to book?',
    ctaText: 'Check availability and prices for your dates.',
  },
  es: {
    seoTitle: 'Casas Vacacionales Pet Friendly en Puerto Viejo, Costa Rica',
    seoDescription: 'Casa Rana y Casa Geco son nuestras 2 casas vacacionales pet friendly en el centro de Puerto Viejo: jardín cercado, sin cargo por mascota y a pocos minutos caminando de la playa.',
    heading: 'Casas Pet Friendly en Puerto Viejo',
    introParagraphs: [
      'Casa Rana y Casa Geco son las dos casas de nuestro portafolio preparadas para huéspedes que viajan con perro: ambas tienen un pequeño jardín cercado y no cobramos cargo por mascota.',
      'Las dos están en el centro de Puerto Viejo, a pocos minutos caminando de la playa — ideal para un paseo antes del desayuno, antes de que empiece el calor.',
    ],
    gridHeading: 'Nuestras 2 casas pet friendly',
    backToHubLabel: 'Ver todas las casas vacacionales en Puerto Viejo →',
    ctaHeading: '¿Listo para reservar?',
    ctaText: 'Consulta disponibilidad y precios para tus fechas.',
  },
  de: {
    seoTitle: 'Haustierfreundliche Ferienhäuser in Puerto Viejo, Costa Rica',
    seoDescription: 'Casa Rana und Casa Geco sind unsere 2 haustierfreundlichen Ferienhäuser im Zentrum von Puerto Viejo — umzäunter Außenbereich, keine Haustiergebühr und wenige Gehminuten zum Strand.',
    heading: 'Haustierfreundliche Häuser in Puerto Viejo',
    introParagraphs: [
      'Casa Rana und Casa Geco sind die zwei Häuser in unserem Portfolio für Gäste, die mit Hund reisen: beide haben einen kleinen umzäunten Garten, und wir berechnen keine Haustiergebühr.',
      'Beide liegen im Zentrum von Puerto Viejo, fußläufig zum Strand — praktisch für einen Spaziergang vor dem Frühstück, bevor es heiß wird.',
    ],
    gridHeading: 'Unsere 2 haustierfreundlichen Häuser',
    backToHubLabel: 'Alle Ferienhäuser in Puerto Viejo ansehen →',
    ctaHeading: 'Bereit zu buchen?',
    ctaText: 'Prüfe Verfügbarkeit und Preise für deine Daten.',
  },
  fr: {
    seoTitle: 'Maisons de Vacances Acceptant les Animaux à Puerto Viejo, Costa Rica',
    seoDescription: 'Casa Rana et Casa Geco sont nos 2 maisons de vacances acceptant les animaux au centre de Puerto Viejo — espace extérieur clôturé, aucun supplément animal, et une courte marche jusqu’à la plage.',
    heading: 'Maisons Acceptant les Animaux à Puerto Viejo',
    introParagraphs: [
      'Casa Rana et Casa Geco sont les deux maisons de notre portefeuille prévues pour les voyageurs accompagnés d’un chien : toutes deux ont un petit jardin clôturé, et nous ne facturons aucun supplément animal.',
      'Les deux se trouvent au centre de Puerto Viejo, à distance de marche de la plage — pratique pour une promenade avant le petit-déjeuner, avant que la chaleur ne s’installe.',
    ],
    gridHeading: 'Nos 2 maisons acceptant les animaux',
    backToHubLabel: 'Voir toutes les maisons de vacances à Puerto Viejo →',
    ctaHeading: 'Prêt à réserver ?',
    ctaText: 'Vérifiez les disponibilités et les tarifs pour vos dates.',
  },
  it: {
    seoTitle: 'Case Vacanza Pet Friendly a Puerto Viejo, Costa Rica',
    seoDescription: 'Casa Rana e Casa Geco sono le nostre 2 case vacanza pet friendly nel centro di Puerto Viejo — spazio esterno recintato, nessun costo extra per l’animale e pochi minuti a piedi dalla spiaggia.',
    heading: 'Case Pet Friendly a Puerto Viejo',
    introParagraphs: [
      'Casa Rana e Casa Geco sono le due case del nostro portafoglio pensate per ospiti che viaggiano con il cane: entrambe hanno un piccolo giardino recintato e non applichiamo costi extra per l’animale.',
      'Entrambe si trovano nel centro di Puerto Viejo, a pochi minuti a piedi dalla spiaggia — comode per una passeggiata prima di colazione, prima che arrivi il caldo.',
    ],
    gridHeading: 'Le nostre 2 case pet friendly',
    backToHubLabel: 'Vedi tutte le case vacanza a Puerto Viejo →',
    ctaHeading: 'Pronto a prenotare?',
    ctaText: 'Controlla disponibilità e prezzi per le tue date.',
  },
  pt: {
    seoTitle: 'Casas de Férias Pet Friendly em Puerto Viejo, Costa Rica',
    seoDescription: 'Casa Rana e Casa Geco são as nossas 2 casas de férias pet friendly no centro de Puerto Viejo — área externa cercada, sem taxa extra por animal e a poucos minutos a pé da praia.',
    heading: 'Casas Pet Friendly em Puerto Viejo',
    introParagraphs: [
      'Casa Rana e Casa Geco são as duas casas do nosso portfólio preparadas para hóspedes que viajam com cachorro: ambas têm um pequeno jardim cercado e não cobramos taxa extra por animal.',
      'As duas ficam no centro de Puerto Viejo, a poucos minutos a pé da praia — ótimo para um passeio antes do café da manhã, antes de esquentar.',
    ],
    gridHeading: 'As nossas 2 casas pet friendly',
    backToHubLabel: 'Ver todas as casas de férias em Puerto Viejo →',
    ctaHeading: 'Pronto para reservar?',
    ctaText: 'Consulte disponibilidade e preços para as suas datas.',
  },
};

const CATEGORY_CONTENT: Record<
  'blogHousesCentro' | 'blogHousesPuntaUva' | 'blogFamilyHouses' | 'blogCouplesHouses' | 'blogPetFriendlyHouses',
  Partial<Record<Locale, PropertyCategoryContent>>
> = {
  blogHousesCentro: housesCentro,
  blogHousesPuntaUva: housesPuntaUva,
  blogFamilyHouses: familyHouses,
  blogCouplesHouses: couplesHouses,
  blogPetFriendlyHouses: petFriendlyHouses,
};

export function propertyCategoryContent(
  key: 'blogHousesCentro' | 'blogHousesPuntaUva' | 'blogFamilyHouses' | 'blogCouplesHouses' | 'blogPetFriendlyHouses',
  locale: Locale,
): PropertyCategoryContent {
  const entry = CATEGORY_CONTENT[key];
  return entry[locale] ?? entry.en!;
}
