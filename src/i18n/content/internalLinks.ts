import type { Locale } from '../locales';
import type { RouteKey } from '../../routes.config';

/**
 * Canonical anchor text for in-body contextual links from one blog/listing
 * page to another (e.g. a listing's "two National Parks" paragraph linking
 * to the Cahuita National Park guide). One label per target route, reused
 * everywhere that target is linked to, rather than a bespoke translated
 * field per source page — mirrors the reuse already present in blog.tsx
 * (busLinkText/diyLinkText carry the same English/translated text in two
 * unrelated articles).
 *
 * Only targets actually linked to from elsewhere need an entry here.
 */
const LABELS: Partial<Record<RouteKey, Record<Locale, string>>> = {
  blogBushours: {
    en: 'See the full MEPE bus schedule and stops →',
    es: 'Ver el horario completo y las paradas del bus MEPE →',
    de: 'Den kompletten MEPE-Busfahrplan und die Haltestellen ansehen →',
    fr: 'Voir l’horaire complet et les arrêts du bus MEPE →',
    it: 'Vedi l’orario completo e le fermate del bus MEPE →',
    pt: 'Ver o horário completo e as paradas do ônibus MEPE →',
    he: 'צפו בלוח הזמנים המלא ובתחנות של אוטובוס MEPE ←',
    hi: 'MEPE बस का पूरा शेड्यूल और स्टॉप देखें →',
    nl: 'Bekijk het volledige MEPE-busschema en de haltes →',
  },
  blogByplane: {
    en: 'Read our guide to reaching Puerto Viejo by plane →',
    es: 'Lee nuestra guía para llegar a Puerto Viejo en avión →',
    de: 'Lies unseren Leitfaden, wie du Puerto Viejo mit dem Flugzeug erreichst →',
    fr: 'Lisez notre guide pour rejoindre Puerto Viejo en avion →',
    it: 'Leggi la nostra guida per raggiungere Puerto Viejo in aereo →',
    pt: 'Leia o nosso guia para chegar a Puerto Viejo de avião →',
    he: 'קראו את המדריך שלנו להגעה ל-Puerto Viejo במטוס ←',
    hi: 'हवाई जहाज़ से Puerto Viejo पहुँचने की हमारी गाइड पढ़ें →',
    nl: 'Lees onze gids om Puerto Viejo met het vliegtuig te bereiken →',
  },
  blogGandoca: {
    en: 'See our full guide to getting to Gandoca-Manzanillo →',
    es: 'Ver nuestra guía completa para llegar a Gandoca-Manzanillo →',
    de: 'Zu unserem ausführlichen Führer, wie man nach Gandoca-Manzanillo kommt →',
    fr: 'Voir notre guide complet pour se rendre à Gandoca-Manzanillo →',
    it: 'Vedi la nostra guida completa per arrivare a Gandoca-Manzanillo →',
    pt: 'Veja nosso guia completo para chegar a Gandoca-Manzanillo →',
    he: 'למדריך המלא שלנו להגעה לגנדוקה-מנזנייו ←',
    hi: 'गंदोका-मंज़ानियो तक पहुँचने की हमारी पूरी गाइड देखें →',
    nl: 'Bekijk onze volledige gids om in Gandoca-Manzanillo te komen →',
  },
  blogGandocaRefuge: {
    en: 'Explore our guide to the Gandoca-Manzanillo Wildlife Refuge →',
    es: 'Explora nuestra guía del Refugio de Vida Silvestre Gandoca-Manzanillo →',
    de: 'Entdecke unseren Guide zum Wildschutzgebiet Gandoca-Manzanillo →',
    fr: 'Découvrez notre guide de la réserve faunique de Gandoca-Manzanillo →',
    it: 'Scopri la nostra guida alla Riserva Naturale di Gandoca-Manzanillo →',
    pt: 'Conheça nosso guia do Refúgio de Vida Silvestre Gandoca-Manzanillo →',
    he: 'גלו את המדריך שלנו לשמורת הטבע גנדוקה-מנזנייו ←',
    hi: 'गंदोका-मंज़ानियो वन्यजीव शरणस्थल की हमारी गाइड देखें →',
    nl: 'Bekijk onze gids voor het Gandoca-Manzanillo Wildreservaat →',
  },
  blogCahuitapark: {
    en: 'Read our full guide to Cahuita National Park →',
    es: 'Lee nuestra guía completa del Parque Nacional Cahuita →',
    de: 'Lies unseren vollständigen Guide zum Cahuita-Nationalpark →',
    fr: 'Lisez notre guide complet du parc national de Cahuita →',
    it: 'Leggi la nostra guida completa al Parco Nazionale di Cahuita →',
    pt: 'Leia nosso guia completo do Parque Nacional Cahuita →',
    he: 'קראו את המדריך המלא שלנו לפארק הלאומי קאהויטה ←',
    hi: 'काहूइता नेशनल पार्क की हमारी पूरी गाइड पढ़ें →',
    nl: 'Lees onze volledige gids voor het Cahuita National Park →',
  },
  blogBeaches: {
    en: 'See our guide to Puerto Viejo’s best beaches →',
    es: 'Ver nuestra guía de las mejores playas de Puerto Viejo →',
    de: 'Sieh dir unseren Guide zu den besten Stränden von Puerto Viejo an →',
    fr: 'Découvrez notre guide des plus belles plages de Puerto Viejo →',
    it: 'Guarda la nostra guida alle spiagge più belle di Puerto Viejo →',
    pt: 'Veja nosso guia das melhores praias de Puerto Viejo →',
    he: 'צפו במדריך שלנו לחופים הטובים ביותר בפוארטו-בייחו ←',
    hi: 'पुएर्तो वियेजो के सबसे अच्छे समुद्र तटों की हमारी गाइड देखें →',
    nl: 'Bekijk onze gids voor de mooiste stranden van Puerto Viejo →',
  },
  blogBocas: {
    en: 'Planning to cross into Panama? See our Bocas del Toro guide →',
    es: '¿Planeas cruzar a Panamá? Consulta nuestra guía de Bocas del Toro →',
    de: 'Planst du eine Reise nach Panama? Sieh dir unseren Bocas del Toro Guide an →',
    fr: 'Vous prévoyez de passer au Panama ? Consultez notre guide de Bocas del Toro →',
    it: 'Stai pensando di andare a Panama? Guarda la nostra guida a Bocas del Toro →',
    pt: 'Planejando cruzar para o Panamá? Veja nosso guia de Bocas del Toro →',
    he: 'מתכננים לחצות לפנמה? עיינו במדריך שלנו לבוקאס דל טורו ←',
    hi: 'पनामा जाने की योजना बना रहे हैं? हमारी बोकास डेल टोरो गाइड देखें →',
    nl: 'Ben je van plan naar Panama te reizen? Bekijk onze gids voor Bocas del Toro →',
  },
  blogIndigenous: {
    en: 'Discover Bribri Indigenous culture near Puerto Viejo →',
    es: 'Descubre la cultura indígena Bribri cerca de Puerto Viejo →',
    de: 'Entdecke die indigene Bribri-Kultur in der Nähe von Puerto Viejo →',
    fr: 'Découvrez la culture indigène Bribri près de Puerto Viejo →',
    it: 'Scopri la cultura indigena Bribri vicino a Puerto Viejo →',
    pt: 'Descubra a cultura indígena Bribri perto de Puerto Viejo →',
    he: 'גלו את התרבות הילידית ברי-ברי ליד פוארטו-בייחו ←',
    hi: 'पुएर्तो वियेजो के पास ब्रिब्री स्वदेशी संस्कृति की खोज करें →',
    nl: 'Ontdek de inheemse Bribri-cultuur bij Puerto Viejo →',
  },
  blogHiddengems: {
    en: 'Discover more hidden gems in Puerto Viejo →',
    es: 'Descubre más lugares escondidos en Puerto Viejo →',
    de: 'Entdecke weitere Geheimtipps in Puerto Viejo →',
    fr: 'Découvrez d’autres trésors cachés à Puerto Viejo →',
    it: 'Scopri altre gemme nascoste di Puerto Viejo →',
    pt: 'Descubra mais tesouros escondidos em Puerto Viejo →',
    he: 'גלו עוד פינות חמד נסתרות בפוארטו-בייחו ←',
    hi: 'पुएर्तो वियेजो के और छिपे हुए रत्न खोजें →',
    nl: 'Ontdek meer verborgen parels in Puerto Viejo →',
  },
  blogTenhours: {
    en: 'See our ten-hour Cahuita day-trip itinerary →',
    es: 'Ver nuestro itinerario de diez horas para un día en Cahuita →',
    de: 'Sieh dir unseren Zehn-Stunden-Tagesausflug nach Cahuita an →',
    fr: 'Découvrez notre itinéraire de dix heures pour une excursion à Cahuita →',
    it: 'Guarda il nostro itinerario di dieci ore per una gita a Cahuita →',
    pt: 'Veja nosso roteiro de dez horas para um bate-volta a Cahuita →',
    he: 'צפו במסלול בן עשר השעות שלנו לטיול יום לקאהויטה ←',
    hi: 'काहूइता की हमारी दस घंटे की दिन-यात्रा योजना देखें →',
    nl: 'Bekijk onze tien uur durende dagtrip naar Cahuita →',
  },
  blogSanjoseOptions: {
    en: 'Compare all the ways to get from San José to Puerto Viejo →',
    es: 'Compara todas las formas de llegar de San José a Puerto Viejo →',
    de: 'Vergleiche alle Möglichkeiten, von San José nach Puerto Viejo zu kommen →',
    fr: 'Comparez tous les moyens de se rendre de San José à Puerto Viejo →',
    it: 'Confronta tutti i modi per arrivare da San José a Puerto Viejo →',
    pt: 'Compare todas as formas de ir de San José a Puerto Viejo →',
    he: 'השוו בין כל הדרכים להגיע מסן חוזה לפוארטו-בייחו ←',
    hi: 'सैन होज़े से पुएर्तो वियेजो पहुँचने के सभी तरीकों की तुलना करें →',
    nl: 'Vergelijk alle manieren om van San José naar Puerto Viejo te reizen →',
  },
  blogWeather: {
    en: 'Check the month-by-month weather guide →',
    es: 'Consulta la guía del clima mes a mes →',
    de: 'Sieh dir den Wetter-Guide Monat für Monat an →',
    fr: 'Consultez le guide météo mois par mois →',
    it: 'Consulta la guida meteo mese per mese →',
    pt: 'Confira o guia do clima mês a mês →',
    he: 'בדקו את מדריך מזג האוויר חודש אחר חודש ←',
    hi: 'महीने-दर-महीने मौसम गाइड देखें →',
    nl: 'Bekijk de maandelijkse weergids →',
  },
  blogVacationRentals: {
    en: 'Browse all our vacation rentals in Puerto Viejo →',
    es: 'Explora todas nuestras casas vacacionales en Puerto Viejo →',
    de: 'Alle unsere Ferienhäuser in Puerto Viejo ansehen →',
    fr: 'Découvrez toutes nos locations de vacances à Puerto Viejo →',
    it: 'Scopri tutte le nostre case vacanza a Puerto Viejo →',
    pt: 'Veja todas as nossas casas de férias em Puerto Viejo →',
    he: 'עיינו בכל בתי הנופש שלנו בפוארטו-בייחו ←',
    hi: 'पुएर्तो वियेजो में हमारे सभी वेकेशन रेंटल देखें →',
    nl: 'Bekijk al onze vakantiehuizen in Puerto Viejo →',
  },
};

/** Anchor text for an in-body link to `target`, in `locale` (falls back to English). */
export function internalLinkLabel(target: RouteKey, locale: Locale): string {
  const entry = LABELS[target];
  if (!entry) {
    throw new Error(`internalLinkLabel: no label registered for route "${target}"`);
  }
  return entry[locale] ?? entry.en;
}

/**
 * Which in-depth guide each monthly weather post's "rainy day" activity list
 * points readers to next — the activity that dominates that month's list
 * (see rainyDayItems in blog.tsx's monthlyWeather data).
 */
export const RAINY_DAY_LINK_TARGET: Record<
  'january' | 'february' | 'march' | 'april' | 'may' | 'june' | 'july' | 'august' | 'september' | 'october' | 'november' | 'december',
  RouteKey
> = {
  january: 'blogBeaches',
  february: 'blogIndigenous',
  march: 'blogCahuitapark',
  april: 'blogCahuitapark',
  may: 'blogIndigenous',
  june: 'blogGandocaRefuge',
  july: 'blogBeaches',
  august: 'blogIndigenous',
  september: 'blogCahuitapark',
  october: 'blogGandocaRefuge',
  november: 'blogIndigenous',
  december: 'blogBeaches',
};
