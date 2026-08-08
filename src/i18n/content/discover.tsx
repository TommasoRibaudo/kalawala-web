import React from 'react';
import type { Locale } from '../locales';
import { DEFAULT_LOCALE } from '../locales';
import {
  PORTFOLIO_PROPERTY_COUNT,
  PORTFOLIO_BEDROOM_RANGE,
  PORTFOLIO_GUEST_RANGE,
} from '../../utils/constants';

/**
 * Long-form marketing copy for the homepage "Discover" section.
 *
 * This is the first module under `src/i18n/content/`, and it exists because the
 * message catalogs deliberately hold no React. These paragraphs carry inline
 * <b> emphasis and interpolate portfolio counts, so squeezing them into
 * `messages/*.ts` would mean either splitting every sentence into lead/bold/tail
 * fragments — the pattern used for the two short call-to-action lines, which
 * does not scale to five paragraphs — or putting JSX in a file translators are
 * meant to edit.
 *
 * The split to hold onto: **catalogs are strings, content is prose.** Phase 3b
 * and 3c move the listing and blog bodies here on the same principle.
 *
 * Unreleased locales fall back to English per key-set rather than per key, since
 * a half-Spanish half-English paragraph would read worse than English. That
 * differs from `getMessages`, which merges per key — the unit here is bigger.
 */

export interface DiscoverFeature {
  heading: string;
  text: string;
}

export interface DiscoverContent {
  heading: string;
  /** The body paragraphs, rendered in order. */
  paragraphs: React.ReactNode[];
  /** Keyed rather than positional so the component's icon pairing is explicit. */
  features: {
    selfCheckIn: DiscoverFeature;
    cheapestPrices: DiscoverFeature;
    nonRefundable: DiscoverFeature;
    flexibleCancellation: DiscoverFeature;
  };
}

const en: DiscoverContent = {
  heading: 'Discover Puerto Viejo from the comfort of our homes.',
  paragraphs: [
    <>Reservas Kalawala offers {PORTFOLIO_PROPERTY_COUNT} remodeled homes and villas, <b>each with a fully equipped private kitchen and bathroom</b>. Houses sleep {PORTFOLIO_GUEST_RANGE.min} to {PORTFOLIO_GUEST_RANGE.max} guests, with {PORTFOLIO_BEDROOM_RANGE.min} to {PORTFOLIO_BEDROOM_RANGE.max} bedrooms and <b>air conditioning throughout</b>.</>,
    <>Our homes in the center of Puerto Viejo put you right in the heart of town, with <b>bars, restaurants and shops within walking distance</b>. Cocles beach is a 2-minute drive, and nearby bike and motorbike rentals bring Punta Uva, Cahuita and Manzanillo within reach, even without a car!</>,
    <>Our homes in <b>Playa Chiquita</b> sit a short ride southeast of town, in a quieter, greener setting wrapped in jungle and just minutes from some of the coast's most beautiful beaches, like Punta Uva. It's an ideal base if you're after nature and calm, with the buzz of Puerto Viejo close by whenever you want it.</>,
    <><b>Working from home?</b> We offer <b>free WIFI</b>, with a maximum speed of <b>100Mbps</b>. We stipulated two different contracts with our internet provider, so your internet connection will be shared between fewer devices, achieving less latency during meetings.</>,
    <><b>Pet friendly:</b> Casa Rana, Casa Geco, Casa Tucano and Casa Pappagallo welcome pets. Rana and Geco are the best fit, as they have their own garden.</>,
  ],
  features: {
    selfCheckIn: {
      heading: 'Self Check-in',
      text: 'Easy to follow, contactless check-in process.',
    },
    cheapestPrices: {
      heading: 'Cheapest Prices',
      text: 'And extra discounts when booking directly on the website.',
    },
    nonRefundable: {
      heading: 'Non Refundable Discount',
      text: "Choose the non-refundable rate when you book to get an extra 10% discount, but you won't be eligible for a cancellation refund.",
    },
    flexibleCancellation: {
      heading: 'Flexible Cancellation Policy',
      text: 'Full refund up to one day before check-in on any reservation booked at the standard rate.',
    },
  },
};

const es: DiscoverContent = {
  heading: 'Descubre Puerto Viejo desde el confort de nuestras casas.',
  paragraphs: [
    <>Reservas Kalawala ofrece {PORTFOLIO_PROPERTY_COUNT} casas y villas remodeladas, <b>cada una con cocina y baño privados totalmente equipados</b>. Las casas alojan de {PORTFOLIO_GUEST_RANGE.min} a {PORTFOLIO_GUEST_RANGE.max} huéspedes, con {PORTFOLIO_BEDROOM_RANGE.min} a {PORTFOLIO_BEDROOM_RANGE.max} habitaciones y <b>aire acondicionado en todas</b>.</>,
    <>Nuestras casas en el centro de Puerto Viejo te ubican en el corazón del pueblo, con <b>bares, restaurantes y tiendas a poca distancia caminando</b>. Playa Cocles está a 2 minutos en auto, y hay lugares de renta de bicicletas y motocicletas cerca para que Punta Uva, Cahuita y Manzanillo estén a tu alcance, ¡incluso sin un auto!</>,
    <>Nuestras casas en <b>Playa Chiquita</b> están a pocos minutos al sureste del pueblo, en un entorno más tranquilo y verde, rodeadas de selva y a solo minutos de algunas de las playas más hermosas de la costa, como Punta Uva. Es el lugar ideal si buscas naturaleza y calma, con el ambiente de Puerto Viejo cerca cuando lo quieras.</>,
    <><b>¿Trabajas desde casa?</b> Ofrecemos <b>WIFI gratis</b>, con una velocidad de hasta <b>100Mbps</b>. Estipulamos dos contratos diferentes con nuestro proveedor de internet, por lo que tu conexión a internet será compartida entre menos dispositivos, logrando una menor latencia durante tus reuniones.</>,
    <><b>Pet Friendly:</b> Casa Rana, Casa Geco, Casa Tucano y Casa Pappagallo reciben mascotas. Rana y Geco son las mejores opciones, ya que cuentan con jardín propio.</>,
  ],
  features: {
    selfCheckIn: {
      heading: 'Check-in Automático',
      // The "¡" opens the second clause, not the sentence. That is how the
      // original reads; do not "correct" it to sentence-initial.
      text: 'Fácil de seguir, ¡check-in sin necesidad de contactar!',
    },
    cheapestPrices: {
      heading: 'Precios Más Económicos',
      text: 'Y descuentos adicionales al reservar directamente en el sitio web.',
    },
    nonRefundable: {
      heading: 'Descuento No Reembolsable',
      text: 'Elija la tarifa no reembolsable al reservar para obtener un 10% de descuento adicional, pero no será elegible para un reembolso por cancelación.',
    },
    flexibleCancellation: {
      heading: 'Política de Cancelación Flexible',
      text: 'Reembolso completo hasta un día antes del check-in en cualquier reserva con tarifa estándar.',
    },
  },
};

const de: DiscoverContent = {
  heading: 'Entdecken Sie Puerto Viejo vom Komfort unserer Häuser aus.',
  paragraphs: [
    <>Reservas Kalawala bietet {PORTFOLIO_PROPERTY_COUNT} renovierte Häuser und Villen, <b>jedes mit voll ausgestatteter eigener Küche und eigenem Bad</b>. Die Häuser bieten Platz für {PORTFOLIO_GUEST_RANGE.min} bis {PORTFOLIO_GUEST_RANGE.max} Gäste, mit {PORTFOLIO_BEDROOM_RANGE.min} bis {PORTFOLIO_BEDROOM_RANGE.max} Schlafzimmern und <b>durchgehender Klimaanlage</b>.</>,
    <>Unsere Häuser im Zentrum von Puerto Viejo liegen mitten im Ort, mit <b>Bars, Restaurants und Geschäften in Gehweite</b>. Der Strand Cocles ist 2 Autominuten entfernt, und nahegelegene Fahrrad- und Motorradverleihe bringen Sie auch ohne Auto nach Punta Uva, Cahuita und Manzanillo!</>,
    <>Unsere Häuser in <b>Playa Chiquita</b> liegen eine kurze Fahrt südöstlich des Ortes, in ruhigerer, grünerer Umgebung inmitten des Dschungels und nur Minuten von einigen der schönsten Strände der Küste entfernt, wie Punta Uva. Ein idealer Ausgangspunkt, wenn Sie Natur und Ruhe suchen, mit dem Trubel von Puerto Viejo in bequemer Nähe.</>,
    <><b>Arbeiten von zu Hause?</b> Wir bieten <b>kostenloses WLAN</b> mit einer Höchstgeschwindigkeit von <b>100 Mbit/s</b>. Wir haben zwei separate Verträge mit unserem Internetanbieter, sodass sich Ihre Internetverbindung auf weniger Geräte verteilt und Meetings mit geringerer Latenz möglich sind.</>,
    <><b>Haustierfreundlich:</b> Casa Rana, Casa Geco, Casa Tucano und Casa Pappagallo heißen Haustiere willkommen. Rana und Geco eignen sich am besten, da sie einen eigenen Garten haben.</>,
  ],
  features: {
    selfCheckIn: {
      heading: 'Selbständiger Check-in',
      text: 'Einfach zu befolgender, kontaktloser Check-in-Prozess.',
    },
    cheapestPrices: {
      heading: 'Günstigste Preise',
      text: 'Und zusätzliche Rabatte bei direkter Buchung über die Website.',
    },
    nonRefundable: {
      heading: 'Rabatt für nicht erstattungsfähige Tarife',
      text: 'Wählen Sie bei der Buchung den nicht erstattungsfähigen Tarif, um 10 % zusätzlichen Rabatt zu erhalten — im Gegenzug entfällt der Anspruch auf Rückerstattung bei Stornierung.',
    },
    flexibleCancellation: {
      heading: 'Flexible Stornierungsbedingungen',
      text: 'Volle Rückerstattung bis einen Tag vor dem Check-in bei jeder zum Standardtarif gebuchten Reservierung.',
    },
  },
};

const fr: DiscoverContent = {
  heading: 'Découvrez Puerto Viejo depuis le confort de nos maisons.',
  paragraphs: [
    <>Reservas Kalawala propose {PORTFOLIO_PROPERTY_COUNT} maisons et villas rénovées, <b>chacune avec une cuisine et une salle de bain privées entièrement équipées</b>. Les maisons accueillent de {PORTFOLIO_GUEST_RANGE.min} à {PORTFOLIO_GUEST_RANGE.max} personnes, avec {PORTFOLIO_BEDROOM_RANGE.min} à {PORTFOLIO_BEDROOM_RANGE.max} chambres et <b>climatisation partout</b>.</>,
    <>Nos maisons au centre de Puerto Viejo vous placent au cœur du village, avec <b>bars, restaurants et commerces à distance de marche</b>. La plage de Cocles est à 2 minutes en voiture, et des loueurs de vélos et de motos à proximité vous permettent de rejoindre Punta Uva, Cahuita et Manzanillo, même sans voiture !</>,
    <>Nos maisons à <b>Playa Chiquita</b> se trouvent à quelques minutes au sud-est du village, dans un cadre plus calme et plus vert, enveloppé de jungle et à quelques minutes de certaines des plus belles plages de la côte, comme Punta Uva. C’est une base idéale si vous recherchez nature et tranquillité, tout en gardant l’animation de Puerto Viejo à proximité.</>,
    <><b>Télétravail ?</b> Nous proposons le <b>Wi-Fi gratuit</b>, avec une vitesse maximale de <b>100 Mbps</b>. Nous avons souscrit deux contrats distincts auprès de notre fournisseur internet, afin que votre connexion soit partagée entre moins d’appareils, avec moins de latence pendant vos réunions.</>,
    <><b>Animaux acceptés :</b> Casa Rana, Casa Geco, Casa Tucano et Casa Pappagallo accueillent les animaux de compagnie. Rana et Geco sont les mieux adaptées, car elles disposent de leur propre jardin.</>,
  ],
  features: {
    selfCheckIn: {
      heading: 'Arrivée autonome',
      text: 'Processus d’arrivée sans contact, simple à suivre.',
    },
    cheapestPrices: {
      heading: 'Les prix les plus bas',
      text: 'Avec des réductions supplémentaires en réservant directement sur le site.',
    },
    nonRefundable: {
      heading: 'Réduction tarif non remboursable',
      text: 'Choisissez le tarif non remboursable lors de la réservation pour obtenir 10 % de réduction supplémentaire, sans possibilité de remboursement en cas d’annulation.',
    },
    flexibleCancellation: {
      heading: 'Politique d’annulation flexible',
      text: 'Remboursement intégral jusqu’à un jour avant l’arrivée pour toute réservation au tarif standard.',
    },
  },
};

const it: DiscoverContent = {
  heading: 'Scopri Puerto Viejo dal comfort delle nostre case.',
  paragraphs: [
    <>Reservas Kalawala offre {PORTFOLIO_PROPERTY_COUNT} case e ville ristrutturate, <b>ciascuna con cucina e bagno privati completamente attrezzati</b>. Le case ospitano da {PORTFOLIO_GUEST_RANGE.min} a {PORTFOLIO_GUEST_RANGE.max} ospiti, con {PORTFOLIO_BEDROOM_RANGE.min}-{PORTFOLIO_BEDROOM_RANGE.max} camere da letto e <b>aria condizionata in tutti gli ambienti</b>.</>,
    <>Le nostre case nel centro di Puerto Viejo vi mettono nel cuore del paese, con <b>bar, ristoranti e negozi a pochi passi</b>. La spiaggia di Cocles è a 2 minuti d’auto, e i noleggi di biciclette e moto nelle vicinanze rendono raggiungibili Punta Uva, Cahuita e Manzanillo anche senza auto!</>,
    <>Le nostre case a <b>Playa Chiquita</b> si trovano a breve distanza a sud-est del paese, in un ambiente più tranquillo e verde, immerso nella giungla e a pochi minuti da alcune delle spiagge più belle della costa, come Punta Uva. È la base ideale se cercate natura e tranquillità, con la vivacità di Puerto Viejo comunque a portata di mano.</>,
    <><b>Lavori da casa?</b> Offriamo <b>Wi-Fi gratuito</b>, con una velocità massima di <b>100 Mbps</b>. Abbiamo stipulato due contratti distinti con il nostro fornitore internet, così la vostra connessione sarà condivisa tra meno dispositivi, con minore latenza durante le riunioni.</>,
    <><b>Pet friendly:</b> Casa Rana, Casa Geco, Casa Tucano e Casa Pappagallo accolgono animali domestici. Rana e Geco sono le più adatte, poiché dispongono di un giardino proprio.</>,
  ],
  features: {
    selfCheckIn: {
      heading: 'Check-in autonomo',
      text: 'Procedura di check-in senza contatto, facile da seguire.',
    },
    cheapestPrices: {
      heading: 'Prezzi più bassi',
      text: 'E sconti extra prenotando direttamente sul sito.',
    },
    nonRefundable: {
      heading: 'Sconto tariffa non rimborsabile',
      text: 'Scegli la tariffa non rimborsabile al momento della prenotazione per ottenere un ulteriore 10% di sconto, senza diritto al rimborso in caso di cancellazione.',
    },
    flexibleCancellation: {
      heading: 'Politica di cancellazione flessibile',
      text: 'Rimborso completo fino a un giorno prima del check-in per qualsiasi prenotazione con tariffa standard.',
    },
  },
};

const pt: DiscoverContent = {
  heading: 'Descubra Puerto Viejo a partir do conforto das nossas casas.',
  paragraphs: [
    <>A Reservas Kalawala oferece {PORTFOLIO_PROPERTY_COUNT} casas e vivendas remodeladas, <b>cada uma com cozinha e casa de banho privativas totalmente equipadas</b>. As casas acomodam entre {PORTFOLIO_GUEST_RANGE.min} e {PORTFOLIO_GUEST_RANGE.max} hóspedes, com {PORTFOLIO_BEDROOM_RANGE.min} a {PORTFOLIO_BEDROOM_RANGE.max} quartos e <b>ar condicionado em toda a casa</b>.</>,
    <>As nossas casas no centro de Puerto Viejo colocam-no mesmo no coração da vila, com <b>bares, restaurantes e lojas a uma curta distância a pé</b>. A praia de Cocles fica a 2 minutos de carro, e há locais de aluguer de bicicletas e motas nas proximidades que colocam Punta Uva, Cahuita e Manzanillo ao seu alcance, mesmo sem carro!</>,
    <>As nossas casas em <b>Playa Chiquita</b> ficam a uma curta distância a sudeste da vila, num ambiente mais tranquilo e verde, envolto pela selva e a poucos minutos de algumas das praias mais bonitas da costa, como Punta Uva. É uma base ideal se procura natureza e sossego, com a agitação de Puerto Viejo sempre por perto quando quiser.</>,
    <><b>A trabalhar a partir de casa?</b> Oferecemos <b>Wi-Fi gratuito</b>, com uma velocidade máxima de <b>100 Mbps</b>. Estabelecemos dois contratos distintos com o nosso fornecedor de internet, para que a sua ligação seja partilhada por menos dispositivos, com menos latência durante as reuniões.</>,
    <><b>Aceitamos animais de estimação:</b> a Casa Rana, a Casa Geco, a Casa Tucano e a Casa Pappagallo recebem animais de estimação. Rana e Geco são as mais indicadas, pois têm jardim próprio.</>,
  ],
  features: {
    selfCheckIn: {
      heading: 'Check-in autónomo',
      text: 'Processo de check-in sem contacto, fácil de seguir.',
    },
    cheapestPrices: {
      heading: 'Os preços mais baixos',
      text: 'E descontos adicionais ao reservar diretamente no site.',
    },
    nonRefundable: {
      heading: 'Desconto na tarifa não reembolsável',
      text: 'Selecione a tarifa não reembolsável ao reservar para obter 10% de desconto adicional, sem direito a reembolso em caso de cancelamento.',
    },
    flexibleCancellation: {
      heading: 'Política de cancelamento flexível',
      text: 'Reembolso total até um dia antes do check-in em qualquer reserva feita à tarifa padrão.',
    },
  },
};

const he: DiscoverContent = {
  heading: 'גלו את פוארטו וייחו מנוחות הבתים שלנו.',
  paragraphs: [
    <>Reservas Kalawala מציעה {PORTFOLIO_PROPERTY_COUNT} בתים ווילות משופצים, <b>כל אחד עם מטבח וחדר רחצה פרטיים מאובזרים במלואם</b>. הבתים מארחים בין {PORTFOLIO_GUEST_RANGE.min} ל-{PORTFOLIO_GUEST_RANGE.max} אורחים, עם {PORTFOLIO_BEDROOM_RANGE.min} עד {PORTFOLIO_BEDROOM_RANGE.max} חדרי שינה <b>ומיזוג אוויר בכל הבית</b>.</>,
    <>הבתים שלנו במרכז פוארטו וייחו ממקמים אתכם בלב העיירה, עם <b>ברים, מסעדות וחנויות במרחק הליכה</b>. חוף קוקלס נמצא במרחק 2 דקות נסיעה, וחברות השכרת אופניים ואופנועים בקרבת מקום מביאות אתכם לפונטה אובה, קאווויטה ומנסניו — גם בלי רכב!</>,
    <>הבתים שלנו ב<b>פלאיה צ׳יקיטה</b> נמצאים נסיעה קצרה מדרום-מזרח לעיירה, בסביבה שקטה וירוקה יותר העטופה בג׳ונגל, ובמרחק דקות ספורות מחלק מהחופים היפים ביותר לאורך החוף, כמו פונטה אובה. זהו בסיס אידיאלי אם אתם מחפשים טבע ושקט, כשההמולה של פוארטו וייחו עדיין קרובה כשתרצו בה.</>,
    <><b>עובדים מהבית?</b> אנו מציעים <b>Wi-Fi חינם</b>, במהירות מרבית של <b>100 מגהביט לשנייה</b>. יש לנו שני חוזים נפרדים מול ספק האינטרנט שלנו, כך שהחיבור שלכם משותף בין פחות מכשירים, עם פחות עיכובים בזמן פגישות.</>,
    <><b>ידידותי לחיות מחמד:</b> Casa Rana, Casa Geco, Casa Tucano ו-Casa Pappagallo מקבלים חיות מחמד. Rana ו-Geco הן האפשרויות הטובות ביותר, מכיוון שיש להן גינה משלהן.</>,
  ],
  features: {
    selfCheckIn: {
      heading: 'צ׳ק-אין עצמאי',
      text: 'תהליך צ׳ק-אין ללא מגע, קל למעקב.',
    },
    cheapestPrices: {
      heading: 'המחירים הזולים ביותר',
      text: 'עם הנחות נוספות בהזמנה ישירה דרך האתר.',
    },
    nonRefundable: {
      heading: 'הנחת תעריף שאינו ניתן להחזר',
      text: 'בחרו בתעריף שאינו ניתן להחזר בעת ההזמנה כדי לקבל 10% הנחה נוספים — ללא זכאות להחזר כספי במקרה של ביטול.',
    },
    flexibleCancellation: {
      heading: 'מדיניות ביטול גמישה',
      text: 'החזר מלא עד יום אחד לפני הצ׳ק-אין בכל הזמנה שבוצעה בתעריף הרגיל.',
    },
  },
};

const hi: DiscoverContent = {
  heading: 'हमारे घरों के आराम से पुएर्तो वियेहो को जानें।',
  paragraphs: [
    <>Reservas Kalawala {PORTFOLIO_PROPERTY_COUNT} नवीनीकृत घर और विला प्रदान करता है, <b>हर एक में पूरी तरह सुसज्जित निजी रसोई और बाथरूम</b>। घरों में {PORTFOLIO_GUEST_RANGE.min} से {PORTFOLIO_GUEST_RANGE.max} मेहमान ठहर सकते हैं, {PORTFOLIO_BEDROOM_RANGE.min} से {PORTFOLIO_BEDROOM_RANGE.max} बेडरूम और <b>हर जगह एयर कंडीशनिंग</b> के साथ।</>,
    <>पुएर्तो वियेहो के केंद्र में हमारे घर आपको शहर के दिल में बसाते हैं, जहां <b>बार, रेस्तरां और दुकानें पैदल दूरी पर</b> हैं। कोकलेस समुद्र तट सिर्फ़ 2 मिनट की ड्राइव पर है, और पास की साइकिल व मोटरबाइक रेंटल्स से आप बिना कार के भी पुंता उवा, काहूइता और मनज़ानिलो तक पहुंच सकते हैं!</>,
    <>हमारे <b>प्लाया चिकिटा</b> स्थित घर शहर से दक्षिण-पूर्व की ओर थोड़ी दूरी पर हैं, जो एक शांत, हरे-भरे माहौल में जंगल से घिरे हुए हैं और तट के सबसे खूबसूरत समुद्र तटों, जैसे पुंता उवा, से बस मिनटों की दूरी पर हैं। अगर आप प्रकृति और शांति चाहते हैं, तो यह एक आदर्श ठिकाना है, और चाहें तो पुएर्तो वियेहो की चहल-पहल भी पास ही मौजूद है।</>,
    <><b>घर से काम कर रहे हैं?</b> हम <b>मुफ़्त वाई-फाई</b> प्रदान करते हैं, अधिकतम <b>100 एमबीपीएस</b> की गति के साथ। हमने अपने इंटरनेट प्रदाता के साथ दो अलग-अलग अनुबंध किए हैं, ताकि आपका इंटरनेट कनेक्शन कम डिवाइस के बीच साझा हो और मीटिंग के दौरान कम विलंबता मिले।</>,
    <><b>पेट-फ्रेंडली:</b> Casa Rana, Casa Geco, Casa Tucano और Casa Pappagallo में पालतू जानवरों का स्वागत है। Rana और Geco सबसे उपयुक्त हैं, क्योंकि इनका अपना बगीचा है।</>,
  ],
  features: {
    selfCheckIn: {
      heading: 'सेल्फ़ चेक-इन',
      text: 'आसानी से समझ आने वाली, संपर्करहित चेक-इन प्रक्रिया।',
    },
    cheapestPrices: {
      heading: 'सबसे सस्ती कीमतें',
      text: 'और वेबसाइट पर सीधे बुक करने पर अतिरिक्त छूट।',
    },
    nonRefundable: {
      heading: 'नॉन-रिफंडेबल छूट',
      text: 'बुकिंग के समय नॉन-रिफंडेबल दर चुनें और 10% की अतिरिक्त छूट पाएं — ध्यान रहे, रद्द करने पर रिफंड नहीं मिलेगा।',
    },
    flexibleCancellation: {
      heading: 'लचीली रद्दीकरण नीति',
      text: 'स्टैंडर्ड दर पर बुक की गई किसी भी बुकिंग पर चेक-इन से एक दिन पहले तक पूरा रिफंड।',
    },
  },
};

const CONTENT: Partial<Record<Locale, DiscoverContent>> = { en, es, de, fr, it, pt, he, hi };

export function discoverContent(locale: Locale): DiscoverContent {
  return CONTENT[locale] ?? CONTENT[DEFAULT_LOCALE]!;
}
