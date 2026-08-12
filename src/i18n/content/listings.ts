import type { Locale } from '../locales';
import { DEFAULT_LOCALE } from '../locales';

/**
 * Long-form copy for the ten property pages.
 *
 * Generated from the pre-merge page components rather than copied by hand:
 * Phase 3a's one content bug was a transcription slip while moving prose
 * between files, and this moves forty times as much of it.
 *
 * Per the convention Discover established, catalogs hold UI strings and this
 * holds prose. Paragraphs are plain strings — no property description carries
 * inline markup, so a translator never sees an element.
 *
 * **English and Spanish are not parallel.** Casa Delfin has eight Spanish
 * paragraphs against six English ones (Spanish documents the cleaning service
 * and the cot; English documents pickup-truck parking), and Giulia and Plumeria
 * differ the other way. These are independently written descriptions, not
 * translations of one source, so each locale keeps its own array and nothing
 * tries to pair them up.
 *
 * Unreleased locales fall back to English as a whole entry — a description half
 * in German and half in English would read worse than one entirely in English.
 */

/**
 * A body paragraph. A bare string is the common case and renders with a
 * trailing <br/>; the object form drops it.
 *
 * That break is inconsistent in the original pages — 7 of 144 paragraphs lack
 * it, at no regular position — so it is carried as data rather than normalised.
 * Normalising would have changed vertical spacing on five pages for no reason
 * anyone asked for.
 */
export type ListingParagraph = string | { text: string; trailingBreak: false };

export interface ListingContent {
  /** <title>, and the meta description beneath it. */
  seoTitle: string;
  seoDescription: string;
  /** The <h1>. */
  heading: string;
  /** FeatureHighlights' propertyName: "House Geco" / "Casa Geco". */
  featureName: string;
  /** Times vary by property, and the parenthetical is localised. */
  checkIn: string;
  checkOut: string;
  /** Body copy, rendered one <p> per entry. */
  paragraphs: ListingParagraph[];
}

export type ListingKey =
  | 'Areka'
  | 'Delfin'
  | 'Geco'
  | 'Giulia'
  | 'Pappagallo'
  | 'Plumeria'
  | 'Rana'
  | 'Tucano'
  | 'VillaCoral'
  | 'VillaMar';

const CONTENT: Record<ListingKey, Partial<Record<Locale, ListingContent>>> = {
  Areka: {
    en: {
      seoTitle: "Casa Areka - Couples Retreat with A/C",
      seoDescription:
        "New fully equipped Bungalows with A/C located 200mts from the beautiful Playa Chiquita beach, in one of the safest and calm neighborhoods in the Caribbean. A few minutes from Puerto Viejo and Manzanillo, we are perfectly located to visit Punta Uva beach and Arrecife.",
      heading: "Casa Areka",
      featureName: "House Areka",
      checkIn: "3:00 PM",
      checkOut: "12:00 PM (noon)",
      paragraphs: [
        "New fully equipped Bungalows with A/C located 200mts from the beautiful Playa Chiquita beach, in one of the safest and calm neighborhoods in the Caribbean. A few minutes from Puerto Viejo and Manzanillo, we are perfectly located to visit Punta Uva beach and Arrecife.",
        "The space, completely private, has A/C, fully equipped kitchen and a private bathroom with hot water. The parking space is private, spacious and outside of the property. Every house has a small porch for our guests.",
        "All of the spaces described here are private, including the fully equipped kitchen and bathroom. You'll have everything you need to make yourself at home.",
        "Close by you may find restaurants, supermarkets, and bike rentals. We trust our guests to follow common sense when leaving our house, that's why we have 0 check-out rules and no check-out list.",
        "Do you have a special request? We would be more than happy to accommodate you if we can. Please don't hesitate to let us know.",
        "Puerto Viejo is a popular destination for tourists from all over the world, thanks to its stunning surroundings. The town boasts immense beaches that are surrounded by tropical rainforest, as well as two National Parks (Manzanillo and Cahuita). At night, the town comes alive with a lively and active nightlife scene. When you stay here, you'll be able to fully immerse yourself in everything that makes Puerto Viejo unique.",
      ],
    },
    es: {
      seoTitle: "Casa Areka - Retiro para Parejas con A/C",
      seoDescription:
        "Nuevos bungalows totalmente equipados con A/C ubicados a 200mts de la hermosa playa Playa Chiquita, en uno de los barrios más seguros y tranquilos del Caribe. A pocos minutos de Puerto Viejo y Manzanillo, estamos perfectamente ubicados para visitar la playa Punta Uva y Arrecife.",
      heading: "Casa Areka",
      featureName: "Casa Areka",
      checkIn: "3:00 PM",
      checkOut: "12:00 PM (mediodía)",
      paragraphs: [
        "Nuevos bungalows totalmente equipados con A/C ubicados a 200mts de la hermosa playa Playa Chiquita, en uno de los barrios más seguros y tranquilos del Caribe. A pocos minutos de Puerto Viejo y Manzanillo, estamos perfectamente ubicados para visitar la playa Punta Uva y Arrecife.",
        "El espacio, completamente privado, tiene A/C, cocina totalmente equipada y un baño privado con agua caliente. El espacio de estacionamiento es privado, espacioso y fuera de la propiedad. Cada casa tiene un pequeño porche para nuestros huéspedes.",
        "Todos los espacios descritos aquí son privados, incluida la cocina y el baño totalmente equipados. Tendrás todo lo que necesitas para sentirte como en casa.",
        "Cerca puedes encontrar restaurantes, supermercados y alquiler de bicicletas. Confiamos en nuestros huéspedes para seguir el sentido común al salir de nuestra casa, por eso tenemos 0 reglas de salida y ninguna lista de salida.",
        "¿Tienes alguna petición especial? Estaríamos más que felices de acomodarte si podemos. Por favor, no dudes en hacérnoslo saber.",
        "Puerto Viejo es un destino popular para turistas de todo el mundo, gracias a sus impresionantes alrededores. El pueblo cuenta con inmensas playas que están rodeadas de selva tropical, así como dos Parques Nacionales (Manzanillo y Cahuita). Por la noche, el pueblo cobra vida con una escena nocturna animada y activa. Cuando te hospedas aquí, podrás sumergirte completamente en todo lo que hace único a Puerto Viejo.",
      ],
    },
    fr: {
      seoTitle: "Casa Areka - Retraite pour couples avec climatisation",
      seoDescription:
        "Nouveaux bungalows entièrement équipés avec climatisation, situés à 200 m de la magnifique plage de Playa Chiquita, dans l'un des quartiers les plus sûrs et paisibles des Caraïbes. À quelques minutes de Puerto Viejo et Manzanillo, nous sommes parfaitement situés pour visiter la plage de Punta Uva et Arrecife.",
      heading: "Casa Areka",
      featureName: "Maison Areka",
      checkIn: "15h00",
      checkOut: "12h00 (midi)",
      paragraphs: [
        "Nouveaux bungalows entièrement équipés avec climatisation, situés à 200 m de la magnifique plage de Playa Chiquita, dans l'un des quartiers les plus sûrs et paisibles des Caraïbes. À quelques minutes de Puerto Viejo et Manzanillo, nous sommes parfaitement situés pour visiter la plage de Punta Uva et Arrecife.",
        "L'espace, entièrement privé, dispose de la climatisation, d'une cuisine entièrement équipée et d'une salle de bain privée avec eau chaude. Le parking est privé, spacieux et situé à l'extérieur de la propriété. Chaque maison dispose d'un petit porche pour nos hôtes.",
        "Tous les espaces décrits ici sont privés, y compris la cuisine et la salle de bain entièrement équipées. Vous aurez tout ce qu'il faut pour vous sentir chez vous.",
        "À proximité, vous trouverez des restaurants, des supermarchés et des loueurs de vélos. Nous faisons confiance à nos hôtes pour faire preuve de bon sens en quittant notre maison, c'est pourquoi nous n'avons aucune règle de départ ni liste de sortie.",
        "Avez-vous une demande particulière ? Nous serions plus que ravis de vous satisfaire si cela nous est possible. N'hésitez pas à nous le faire savoir.",
        "Puerto Viejo est une destination prisée des touristes du monde entier, grâce à ses environs à couper le souffle. La ville possède d'immenses plages entourées de forêt tropicale, ainsi que deux parcs nationaux (Manzanillo et Cahuita). La nuit, la ville s'anime avec une vie nocturne dynamique et animée. En séjournant ici, vous pourrez pleinement vous immerger dans tout ce qui rend Puerto Viejo unique.",
      ],
    },
    it: {
      seoTitle: "Casa Areka - Rifugio per Coppie con Aria Condizionata",
      seoDescription:
        "Nuovi bungalow completamente attrezzati con aria condizionata, situati a 200 metri dalla splendida spiaggia di Playa Chiquita, in uno dei quartieri più sicuri e tranquilli dei Caraibi. A pochi minuti da Puerto Viejo e Manzanillo, siamo nella posizione perfetta per visitare la spiaggia di Punta Uva e Arrecife.",
      heading: "Casa Areka",
      featureName: "Casa Areka",
      checkIn: "15:00",
      checkOut: "12:00 (mezzogiorno)",
      paragraphs: [
        "Nuovi bungalow completamente attrezzati con aria condizionata, situati a 200 metri dalla splendida spiaggia di Playa Chiquita, in uno dei quartieri più sicuri e tranquilli dei Caraibi. A pochi minuti da Puerto Viejo e Manzanillo, siamo nella posizione perfetta per visitare la spiaggia di Punta Uva e Arrecife.",
        "Lo spazio, completamente privato, dispone di aria condizionata, cucina completamente attrezzata e bagno privato con acqua calda. Il parcheggio è privato, ampio e situato all'esterno della proprietà. Ogni casa dispone di un piccolo portico per i nostri ospiti.",
        "Tutti gli spazi qui descritti sono privati, inclusi la cucina completamente attrezzata e il bagno. Avrai tutto il necessario per sentirti come a casa tua.",
        "Nelle vicinanze troverai ristoranti, supermercati e noleggio biciclette. Ci fidiamo che i nostri ospiti usino il buon senso quando lasciano la nostra casa, per questo non abbiamo regole di check-out né una lista di controllo al check-out.",
        "Hai una richiesta speciale? Saremo più che felici di accontentarti, se possibile. Non esitare a farcelo sapere.",
        "Puerto Viejo è una destinazione molto amata dai turisti di tutto il mondo, grazie ai suoi paesaggi mozzafiato. Il paese vanta spiagge immense circondate dalla foresta pluviale tropicale, oltre a due Parchi Nazionali (Manzanillo e Cahuita). Di notte, il paese si anima con una vivace e movimentata vita notturna. Soggiornando qui, potrai immergerti completamente in tutto ciò che rende Puerto Viejo unico.",
      ],
    },
    de: {
      seoTitle: "Casa Areka – Rückzugsort für Paare mit Klimaanlage",
      seoDescription:
        "Neue, voll ausgestattete Bungalows mit Klimaanlage, nur 200 m vom wunderschönen Strand Playa Chiquita entfernt, in einem der sichersten und ruhigsten Viertel der Karibik. Nur wenige Minuten von Puerto Viejo und Manzanillo entfernt, sind wir perfekt gelegen, um den Strand Punta Uva und Arrecife zu besuchen.",
      heading: "Casa Areka",
      featureName: "Haus Areka",
      checkIn: "15:00 Uhr",
      checkOut: "12:00 Uhr (Mittag)",
      paragraphs: [
        "Neue, voll ausgestattete Bungalows mit Klimaanlage, nur 200 m vom wunderschönen Strand Playa Chiquita entfernt, in einem der sichersten und ruhigsten Viertel der Karibik. Nur wenige Minuten von Puerto Viejo und Manzanillo entfernt, sind wir perfekt gelegen, um den Strand Punta Uva und Arrecife zu besuchen.",
        "Der komplett private Bereich verfügt über eine Klimaanlage, eine voll ausgestattete Küche und ein privates Badezimmer mit Warmwasser. Der Parkplatz ist privat, geräumig und befindet sich außerhalb des Grundstücks. Jedes Haus verfügt über eine kleine Veranda für unsere Gäste.",
        "Alle hier beschriebenen Räume sind privat, einschließlich der voll ausgestatteten Küche und des Badezimmers. Sie haben alles, was Sie brauchen, um sich wie zu Hause zu fühlen.",
        "In der Nähe finden Sie Restaurants, Supermärkte und Fahrradverleihe. Wir vertrauen darauf, dass unsere Gäste beim Verlassen unseres Hauses gesunden Menschenverstand walten lassen, weshalb wir keine Check-out-Regeln und keine Check-out-Liste haben.",
        "Haben Sie einen besonderen Wunsch? Wir erfüllen ihn Ihnen gerne, wenn es uns möglich ist. Zögern Sie nicht, es uns mitzuteilen.",
        "Puerto Viejo ist dank seiner atemberaubenden Umgebung ein beliebtes Reiseziel für Touristen aus aller Welt. Der Ort verfügt über weitläufige Strände, die von tropischem Regenwald umgeben sind, sowie über zwei Nationalparks (Manzanillo und Cahuita). Nachts erwacht der Ort mit einem lebendigen und aktiven Nachtleben zum Leben. Während Ihres Aufenthalts hier können Sie vollständig in alles eintauchen, was Puerto Viejo einzigartig macht.",
      ],
    },
    he: {
      seoTitle: "Casa Areka - מקלט רומנטי לזוגות עם מיזוג אוויר",
      seoDescription:
        "בונגלו חדש ומאובזר במלואו עם מיזוג אוויר, הממוקם 200 מטר מחוף פלאיה צ'יקיטה היפהפה, באחת השכונות הבטוחות והשקטות ביותר בקריביים. במרחק דקות ספורות מפוארטו ויחו ומנסניו, אנחנו ממוקמים במקום מושלם לביקור בחוף פונטה אובה ובאררסיפה.",
      heading: "Casa Areka",
      featureName: "בית Areka",
      checkIn: "15:00",
      checkOut: "12:00 בצהריים",
      paragraphs: [
        "בונגלו חדש ומאובזר במלואו עם מיזוג אוויר, הממוקם 200 מטר מחוף פלאיה צ'יקיטה היפהפה, באחת השכונות הבטוחות והשקטות ביותר בקריביים. במרחק דקות ספורות מפוארטו ויחו ומנסניו, אנחנו ממוקמים במקום מושלם לביקור בחוף פונטה אובה ובאררסיפה.",
        "המרחב, פרטי לחלוטין, כולל מיזוג אוויר, מטבח מאובזר במלואו וחדר רחצה פרטי עם מים חמים. חניית הרכב פרטית, מרווחת וממוקמת מחוץ לנכס. לכל בית יש מרפסת קטנה עבור האורחים שלנו.",
        "כל המרחבים המתוארים כאן הם פרטיים, כולל המטבח המאובזר במלואו וחדר הרחצה. יהיה לכם כל מה שאתם צריכים כדי להרגיש כמו בבית.",
        "בקרבת מקום תוכלו למצוא מסעדות, סופרמרקטים והשכרת אופניים. אנחנו סומכים על האורחים שלנו שינהגו בשכל ישר בעת עזיבת הבית, ולכן אין לנו כללי צ'ק-אאוט ואין רשימת בדיקה ביציאה.",
        "יש לכם בקשה מיוחדת? נשמח מאוד להיענות לה אם נוכל. אל תהססו לספר לנו.",
        "פוארטו ויחו הוא יעד מבוקש לתיירים מכל רחבי העולם, בזכות הנוף המרהיב שלו. לעיירה חופים עצומים המוקפים ביער גשם טרופי, וכן שני פארקים לאומיים (מנסניו וקאוויטה). בלילה, העיירה קמה לתחייה עם חיי לילה תוססים ופעילים. כשתתארחו כאן, תוכלו לחוות באופן מלא כל מה שהופך את פוארטו ויחו למקום כה מיוחד.",
      ],
    },
    pt: {
      seoTitle: "Casa Areka - Retiro para Casais com A/C",
      seoDescription:
        "Novos bungalows totalmente equipados com A/C, situados a 200 metros da encantadora praia de Playa Chiquita, num dos bairros mais seguros e tranquilos das Caraíbas. A poucos minutos de Puerto Viejo e Manzanillo, estamos perfeitamente localizados para visitar a praia de Punta Uva e o Arrecife.",
      heading: "Casa Areka",
      featureName: "Casa Areka",
      checkIn: "15h00",
      checkOut: "12h00 (meio-dia)",
      paragraphs: [
        "Novos bungalows totalmente equipados com A/C, situados a 200 metros da encantadora praia de Playa Chiquita, num dos bairros mais seguros e tranquilos das Caraíbas. A poucos minutos de Puerto Viejo e Manzanillo, estamos perfeitamente localizados para visitar a praia de Punta Uva e o Arrecife.",
        "O espaço, totalmente privado, tem A/C, cozinha totalmente equipada e casa de banho privativa com água quente. O lugar de estacionamento é privado, amplo e situado fora da propriedade. Cada casa tem um pequeno alpendre para os nossos hóspedes.",
        "Todos os espaços aqui descritos são privados, incluindo a cozinha e a casa de banho totalmente equipadas. Terá tudo o que precisa para se sentir em casa.",
        "Perto daqui poderá encontrar restaurantes, supermercados e aluguer de bicicletas. Confiamos que os nossos hóspedes seguirão o bom senso ao sair da nossa casa; por isso, não temos regras de saída nem lista de check-out.",
        "Tem algum pedido especial? Teremos todo o gosto em atendê-lo(a), se pudermos. Não hesite em informar-nos.",
        "Puerto Viejo é um destino popular para turistas de todo o mundo, graças à sua paisagem deslumbrante. A vila tem praias imensas rodeadas de floresta tropical, além de dois Parques Nacionais (Manzanillo e Cahuita). À noite, a vila ganha vida com uma animada e vibrante vida noturna. Ao ficar aqui, poderá mergulhar por completo em tudo o que torna Puerto Viejo único.",
      ],
    },
    hi: {
      seoTitle: "Casa Areka - एयर कंडीशनर के साथ कपल्स रिट्रीट",
      seoDescription:
        "खूबसूरत प्लाया चिकिता समुद्र तट से मात्र 200 मीटर की दूरी पर स्थित, कैरिबियन के सबसे सुरक्षित और शांत इलाकों में से एक में, ए/सी वाले नए और पूरी तरह सुसज्जित बंगले। प्वेर्तो वियेहो और मानसानियो से कुछ ही मिनटों की दूरी पर स्थित, हम पुंटा उवा समुद्र तट और अरेसिफे घूमने के लिए बिल्कुल सही जगह पर स्थित हैं।",
      heading: "Casa Areka",
      featureName: "घर Areka",
      checkIn: "दोपहर 3:00 बजे",
      checkOut: "दोपहर 12:00 बजे (मध्याह्न)",
      paragraphs: [
        "खूबसूरत प्लाया चिकिता समुद्र तट से मात्र 200 मीटर की दूरी पर स्थित, कैरिबियन के सबसे सुरक्षित और शांत इलाकों में से एक में, ए/सी वाले नए और पूरी तरह सुसज्जित बंगले। प्वेर्तो वियेहो और मानसानियो से कुछ ही मिनटों की दूरी पर स्थित, हम पुंटा उवा समुद्र तट और अरेसिफे घूमने के लिए बिल्कुल सही जगह पर स्थित हैं।",
        "यह पूरी तरह निजी स्थान है, जिसमें ए/सी, पूरी तरह सुसज्जित रसोई और गर्म पानी वाला निजी बाथरूम है। पार्किंग की जगह निजी, विशाल और संपत्ति के बाहर स्थित है। हर घर में हमारे मेहमानों के लिए एक छोटा बरामदा (पोर्च) भी है।",
        "यहां बताई गई सभी जगहें निजी हैं, जिनमें पूरी तरह सुसज्जित रसोई और बाथरूम शामिल हैं। घर जैसा महसूस करने के लिए आपको जो कुछ भी चाहिए, वह सब यहां मौजूद होगा।",
        "आस-पास आपको रेस्तरां, सुपरमार्केट और बाइक किराए पर लेने की सुविधाएं मिल जाएंगी। हमें अपने मेहमानों पर भरोसा है कि वे घर छोड़ते समय सामान्य समझ का पालन करेंगे, इसीलिए हमारे यहां चेक-आउट के लिए कोई नियम नहीं हैं और कोई चेक-आउट सूची भी नहीं है।",
        "क्या आपका कोई विशेष अनुरोध है? यदि हम कर सकें, तो हमें आपकी मदद करके बेहद खुशी होगी। कृपया हमें बताने में संकोच न करें।",
        "प्वेर्तो वियेहो अपने शानदार प्राकृतिक परिवेश की बदौलत दुनियाभर के पर्यटकों के बीच एक लोकप्रिय गंतव्य है। इस कस्बे में विशाल समुद्र तट हैं जो उष्णकटिबंधीय वर्षावन से घिरे हुए हैं, साथ ही यहां दो राष्ट्रीय उद्यान भी हैं (मानसानियो और काहुइटा)। रात होते ही यह कस्बा जीवंत और सक्रिय नाइटलाइफ़ के साथ जाग उठता है। यहां ठहरने के दौरान आप उस हर चीज़ में पूरी तरह डूब सकेंगे, जो प्वेर्तो वियेहो को अनूठा बनाती है।",
      ],
    },
    nl: {
      seoTitle: "Casa Areka - Retraite voor Stellen met Airco",
      seoDescription:
        "Nieuwe, volledig uitgeruste bungalows met airconditioning op 200 meter van het prachtige strand Playa Chiquita, in een van de veiligste en rustigste buurten van de Caraïben. Op een paar minuten van Puerto Viejo en Manzanillo liggen we ideaal gelegen om het strand van Punta Uva en Arrecife te bezoeken.",
      heading: "Casa Areka",
      featureName: "Huis Areka",
      checkIn: "15:00",
      checkOut: "12:00 (middag)",
      paragraphs: [
        "Nieuwe, volledig uitgeruste bungalows met airconditioning op 200 meter van het prachtige strand Playa Chiquita, in een van de veiligste en rustigste buurten van de Caraïben. Op een paar minuten van Puerto Viejo en Manzanillo liggen we ideaal gelegen om het strand van Punta Uva en Arrecife te bezoeken.",
        "De volledig private ruimte beschikt over airconditioning, een volledig uitgeruste keuken en een eigen badkamer met warm water. De parkeerplaats is privé, ruim en bevindt zich buiten het perceel. Elk huis heeft een kleine veranda voor onze gasten.",
        "Alle hier beschreven ruimtes zijn privé, inclusief de volledig uitgeruste keuken en badkamer. Je hebt alles wat je nodig hebt om je meteen thuis te voelen.",
        "Restaurants, supermarkten en fietsverhuur vind je op loopafstand. We vertrouwen erop dat onze gasten gezond verstand gebruiken bij het verlaten van het huis, daarom hanteren we geen uitcheckregels en geen uitchecklijst.",
        "Heb je een speciaal verzoek? We helpen je graag verder als het mogelijk is. Aarzel niet om het ons te laten weten.",
        "Puerto Viejo is dankzij zijn adembenemende omgeving een geliefde bestemming voor toeristen van over de hele wereld. Het dorp heeft uitgestrekte stranden omzoomd door tropisch regenwoud, en telt twee nationale parken (Manzanillo en Cahuita). 's Avonds komt het dorp tot leven met een levendig en actief nachtleven. Tijdens je verblijf hier ga je volledig op in alles wat Puerto Viejo uniek maakt.",
      ],
    },
  },
  Delfin: {
    en: {
      seoTitle: "Casa Delfines - Puerto Viejo Vacation Home Rental",
      seoDescription:
        "Welcome to Reservas Kalawala. Located in the heart of town, this house accommodates up to 6 guests with fully equipped kitchen, 2 bathrooms, 2 A/C units, and private parking for 2 cars.",
      heading: "Casa Delfines",
      featureName: "House Delfin",
      checkIn: "3:00 PM",
      checkOut: "12:00 PM (noon)",
      paragraphs: [
        "Welcome to Reservas Kalawala. Located in the heart of town, this house accommodates up to 6 guests with fully equipped kitchen, 2 bathrooms, 2 A/C units (not in kitchen or living room), and private parking. Our prime location offers easy access to both the town center and the most beautiful beaches that Puerto Viejo has to offer.",
        "All of the spaces described here are private, including the fully equipped kitchen and bathrooms. You'll have everything you need to make yourself at home.",
        "Do you have a special request? We would be more than happy to accommodate you if we can. Please don't hesitate to let us know.",
        "Puerto Viejo is a popular destination for tourists from all over the world, thanks to its stunning surroundings. The town boasts immense beaches that are surrounded by tropical rainforest, as well as two National Parks (Manzanillo and Cahuita). At night, the town comes alive with a lively and active nightlife scene. When you stay here, you'll be able to fully immerse yourself in everything that makes Puerto Viejo unique.",
        "The house is located close to beach access that eventually leads to Cocles. Along the way, you'll have the opportunity to spot a variety of animals and admire natural pools in the coral. There's even a hidden sightseeing spot waiting to be discovered!",
        "Getting around in Puerto Viejo and its surroundings is easiest by renting a bike or a scooter. However, there is also a reliable public bus service available that can take you to Cahuita, Manzanillo, and Sixaola. If you prefer to drive, we can accommodate cars as well. We offer private parking but please let us know if you have a larger pickup truck that requires additional space.",
      ],
    },
    es: {
      seoTitle: "Casa Delfín - Alquiler de Casa de Vacaciones en Puerto Viejo",
      seoDescription:
        "Bienvenido a Reservas Kalawala. Ubicada en el corazón del pueblo, esta casa acomoda hasta 6 huéspedes con cocina totalmente equipada, 2 baños, 2 unidades de aire acondicionado y estacionamiento privado para hasta 2 carros.",
      heading: "Casa Delfines",
      featureName: "Casa Delfín",
      checkIn: "3:00 PM",
      checkOut: "12:00 PM (mediodía)",
      paragraphs: [
        "Bienvenido a Reservas Kalawala. Ubicada en el corazón del pueblo, esta casa acomoda hasta 6 huéspedes con cocina totalmente equipada, 2 baños, 2 unidades de aire acondicionado (no en cocina o sala de estar), y estacionamiento privado. Nuestra ubicación privilegiada ofrece fácil acceso tanto al centro del pueblo como a las playas más hermosas que Puerto Viejo tiene para ofrecer.",
        "Todos los espacios descritos aquí son privados, incluyendo la cocina totalmente equipada y los baños. Tendrás todo lo que necesitas para sentirte como en casa.",
        "¿Tienes alguna solicitud especial? Estaremos más que felices de complacerte si podemos. Por favor no dudes en hacérnoslo saber.",
        "Ofrecemos servicios de limpieza para reservas de 5 noches o más. Nuestro equipo se comunicará con usted durante su estadía para coordinar un horario conveniente para la limpieza.",
        "Si requieres de una cuna durante tu estadía, háznoslo saber en tu reservación. Nos encargaremos de prepararla en la habitación antes de tu llegada.",
        "Puerto Viejo es un destino popular para turistas de todo el mundo, gracias a sus impresionantes alrededores. El pueblo cuenta con playas inmensas rodeadas de selva tropical, así como dos Parques Nacionales (Manzanillo y Cahuita). Por la noche, el pueblo cobra vida con una escena nocturna animada y activa. Cuando te hospedes aquí, podrás sumergirte completamente en todo lo que hace único a Puerto Viejo.",
        "La casa está ubicada cerca del acceso a la playa que eventualmente lleva a Cocles. En el camino, tendrás la oportunidad de observar una variedad de animales y admirar piscinas naturales en el coral. ¡Incluso hay un lugar de observación oculto esperando ser descubierto!",
        "Moverse por Puerto Viejo y sus alrededores es más fácil alquilando una bicicleta o un scooter. Sin embargo, también hay un servicio de autobús público confiable disponible que puede llevarte a Cahuita, Manzanillo y Sixaola. Si prefieres conducir, también podemos acomodar autos.",
      ],
    },
    fr: {
      seoTitle: "Casa Delfines - Location de maison de vacances à Puerto Viejo",
      seoDescription:
        "Bienvenue à Reservas Kalawala. Située au cœur de la ville, cette maison accueille jusqu'à 6 personnes avec une cuisine entièrement équipée, 2 salles de bain, 2 unités de climatisation et un parking privé pour 2 voitures.",
      heading: "Casa Delfines",
      featureName: "Maison Delfin",
      checkIn: "15h00",
      checkOut: "12h00 (midi)",
      paragraphs: [
        "Bienvenue à Reservas Kalawala. Située au cœur de la ville, cette maison accueille jusqu'à 6 personnes avec une cuisine entièrement équipée, 2 salles de bain, 2 unités de climatisation (absentes de la cuisine et du salon) et un parking privé. Notre emplacement privilégié offre un accès facile au centre-ville comme aux plus belles plages que Puerto Viejo a à offrir.",
        "Tous les espaces décrits ici sont privés, y compris la cuisine et les salles de bain entièrement équipées. Vous aurez tout ce qu'il faut pour vous sentir chez vous.",
        "Avez-vous une demande particulière ? Nous serions plus que ravis de vous satisfaire si cela nous est possible. N'hésitez pas à nous le faire savoir.",
        "Nous proposons un service de ménage pour les réservations de 5 nuits ou plus. Notre équipe vous contactera pendant votre séjour pour convenir d'un horaire pratique pour le ménage.",
        "Si vous avez besoin d'un lit parapluie pendant votre séjour, merci de nous en informer lors de votre réservation. Nous nous chargerons de l'installer dans votre chambre avant votre arrivée.",
        "Puerto Viejo est une destination prisée des touristes du monde entier, grâce à ses environs à couper le souffle. La ville possède d'immenses plages entourées de forêt tropicale, ainsi que deux parcs nationaux (Manzanillo et Cahuita). La nuit, la ville s'anime avec une vie nocturne dynamique et animée. En séjournant ici, vous pourrez pleinement vous immerger dans tout ce qui rend Puerto Viejo unique.",
        "La maison est proche d'un accès à la plage qui mène finalement à Cocles. En chemin, vous aurez l'occasion d'observer diverses espèces animales et d'admirer des piscines naturelles dans le corail. Il y a même un point de vue caché qui attend d'être découvert !",
        "Pour se déplacer à Puerto Viejo et ses environs, le plus simple est de louer un vélo ou un scooter. Il existe également un service de bus public fiable qui peut vous emmener à Cahuita, Manzanillo et Sixaola. Si vous préférez conduire, nous pouvons aussi accueillir des voitures. Nous proposons un parking privé, mais merci de nous prévenir si vous avez un grand pick-up nécessitant un espace supplémentaire.",
      ],
    },
    it: {
      seoTitle: "Casa Delfines - Casa Vacanze in Affitto a Puerto Viejo",
      seoDescription:
        "Benvenuti a Reservas Kalawala. Situata nel cuore del paese, questa casa ospita fino a 6 persone e dispone di cucina completamente attrezzata, 2 bagni, 2 unità di aria condizionata e parcheggio privato per 2 auto.",
      heading: "Casa Delfines",
      featureName: "Casa Delfin",
      checkIn: "15:00",
      checkOut: "12:00 (mezzogiorno)",
      paragraphs: [
        "Benvenuti a Reservas Kalawala. Situata nel cuore del paese, questa casa ospita fino a 6 persone e dispone di cucina completamente attrezzata, 2 bagni, 2 unità di aria condizionata (non in cucina né in soggiorno) e parcheggio privato. La nostra posizione privilegiata offre un facile accesso sia al centro del paese sia alle spiagge più belle che Puerto Viejo ha da offrire.",
        "Tutti gli spazi qui descritti sono privati, inclusi la cucina completamente attrezzata e i bagni. Avrai tutto il necessario per sentirti come a casa tua.",
        "Hai una richiesta speciale? Saremo più che felici di accontentarti, se possibile. Non esitare a farcelo sapere.",
        "Puerto Viejo è una destinazione molto amata dai turisti di tutto il mondo, grazie ai suoi paesaggi mozzafiato. Il paese vanta spiagge immense circondate dalla foresta pluviale tropicale, oltre a due Parchi Nazionali (Manzanillo e Cahuita). Di notte, il paese si anima con una vivace e movimentata vita notturna. Soggiornando qui, potrai immergerti completamente in tutto ciò che rende Puerto Viejo unico.",
        "La casa si trova vicino a un accesso alla spiaggia che porta infine a Cocles. Lungo il percorso avrai l'opportunità di avvistare diversi animali e ammirare le piscine naturali nella barriera corallina. C'è persino un punto panoramico nascosto tutto da scoprire!",
        "Il modo più semplice per spostarsi a Puerto Viejo e nei dintorni è noleggiare una bicicletta o uno scooter. È comunque disponibile anche un affidabile servizio di autobus pubblici che può portarti a Cahuita, Manzanillo e Sixaola. Se preferisci guidare, possiamo accogliere anche le auto. Offriamo parcheggio privato, ma facci sapere se hai un pick-up di grandi dimensioni che richiede spazio aggiuntivo.",
      ],
    },
    de: {
      seoTitle: "Casa Delfines – Ferienhausvermietung in Puerto Viejo",
      seoDescription:
        "Willkommen bei Reservas Kalawala. Dieses Haus liegt im Herzen der Stadt und bietet Platz für bis zu 6 Gäste mit voll ausgestatteter Küche, 2 Badezimmern, 2 Klimaanlagen und privatem Parkplatz für 2 Autos.",
      heading: "Casa Delfines",
      featureName: "Haus Delfin",
      checkIn: "15:00 Uhr",
      checkOut: "12:00 Uhr (Mittag)",
      paragraphs: [
        "Willkommen bei Reservas Kalawala. Dieses Haus liegt im Herzen der Stadt und bietet Platz für bis zu 6 Gäste mit voll ausgestatteter Küche, 2 Badezimmern, 2 Klimaanlagen (nicht in der Küche oder im Wohnzimmer) und privatem Parkplatz. Unsere erstklassige Lage bietet einfachen Zugang sowohl zum Stadtzentrum als auch zu den schönsten Stränden, die Puerto Viejo zu bieten hat.",
        "Alle hier beschriebenen Räume sind privat, einschließlich der voll ausgestatteten Küche und der Badezimmer. Sie haben alles, was Sie brauchen, um sich wie zu Hause zu fühlen.",
        "Haben Sie einen besonderen Wunsch? Wir erfüllen ihn Ihnen gerne, wenn es uns möglich ist. Zögern Sie nicht, es uns mitzuteilen.",
        "Puerto Viejo ist dank seiner atemberaubenden Umgebung ein beliebtes Reiseziel für Touristen aus aller Welt. Der Ort verfügt über weitläufige Strände, die von tropischem Regenwald umgeben sind, sowie über zwei Nationalparks (Manzanillo und Cahuita). Nachts erwacht der Ort mit einem lebendigen und aktiven Nachtleben zum Leben. Während Ihres Aufenthalts hier können Sie vollständig in alles eintauchen, was Puerto Viejo einzigartig macht.",
        "Das Haus liegt in der Nähe eines Strandzugangs, der schließlich nach Cocles führt. Unterwegs haben Sie die Möglichkeit, verschiedene Tiere zu entdecken und die natürlichen Pools im Korallenriff zu bewundern. Es gibt sogar einen versteckten Aussichtspunkt, der nur darauf wartet, entdeckt zu werden!",
        "Am einfachsten bewegen Sie sich in Puerto Viejo und Umgebung mit einem gemieteten Fahrrad oder Roller fort. Es gibt aber auch einen zuverlässigen öffentlichen Busservice, der Sie nach Cahuita, Manzanillo und Sixaola bringt. Wenn Sie lieber mit dem Auto fahren möchten, können wir das ebenfalls ermöglichen. Wir bieten privates Parken an, bitte teilen Sie uns jedoch mit, wenn Sie einen größeren Pickup-Truck haben, der zusätzlichen Platz benötigt.",
      ],
    },
    he: {
      seoTitle: "Casa Delfines - השכרת בית נופש בפוארטו ויחו",
      seoDescription:
        "ברוכים הבאים ל-Reservas Kalawala. הבית ממוקם בלב העיירה ומתאים עד 6 אורחים, עם מטבח מאובזר במלואו, 2 חדרי רחצה, 2 יחידות מיזוג אוויר וחניה פרטית לשני רכבים.",
      heading: "Casa Delfines",
      featureName: "בית Delfin",
      checkIn: "15:00",
      checkOut: "12:00 בצהריים",
      paragraphs: [
        "ברוכים הבאים ל-Reservas Kalawala. הבית ממוקם בלב העיירה ומתאים עד 6 אורחים, עם מטבח מאובזר במלואו, 2 חדרי רחצה, 2 יחידות מיזוג אוויר (לא במטבח או בסלון) וחניה פרטית. המיקום המצוין שלנו מציע גישה נוחה הן למרכז העיירה והן לחופים היפים ביותר שיש לפוארטו ויחו להציע.",
        "כל המרחבים המתוארים כאן הם פרטיים, כולל המטבח המאובזר במלואו וחדרי הרחצה. יהיה לכם כל מה שאתם צריכים כדי להרגיש כמו בבית.",
        "יש לכם בקשה מיוחדת? נשמח מאוד להיענות לה אם נוכל. אל תהססו לספר לנו.",
        "פוארטו ויחו הוא יעד מבוקש לתיירים מכל רחבי העולם, בזכות הנוף המרהיב שלו. לעיירה חופים עצומים המוקפים ביער גשם טרופי, וכן שני פארקים לאומיים (מנסניו וקאוויטה). בלילה, העיירה קמה לתחייה עם חיי לילה תוססים ופעילים. כשתתארחו כאן, תוכלו לחוות באופן מלא כל מה שהופך את פוארטו ויחו למקום כה מיוחד.",
        "הבית ממוקם בקרבת גישה לחוף המובילה בסופו של דבר לקוקלס. בדרך, תהיה לכם הזדמנות להבחין במגוון בעלי חיים ולהתפעל מבריכות טבעיות באלמוגים. יש אפילו נקודת תצפית נסתרת המחכה להתגלות!",
        "הדרך הקלה ביותר להתנייד בפוארטו ויחו ובסביבתה היא באמצעות השכרת אופניים או קטנוע. עם זאת, קיים גם שירות אוטובוסים ציבורי אמין שיכול לקחת אתכם לקאוויטה, מנסניו וסיקסאולה. אם אתם מעדיפים לנסוע ברכב, נוכל להתאים גם לכך. אנחנו מציעים חניה פרטית, אך אנא הודיעו לנו אם ברשותכם טנדר גדול שדורש שטח חניה נוסף.",
      ],
    },
    pt: {
      seoTitle: "Casa Delfines - Aluguer de Casa de Férias em Puerto Viejo",
      seoDescription:
        "Bem-vindo à Reservas Kalawala. Situada no coração da vila, esta casa acomoda até 6 hóspedes, com cozinha totalmente equipada, 2 casas de banho, 2 unidades de A/C e estacionamento privado para 2 carros.",
      heading: "Casa Delfines",
      featureName: "Casa Delfin",
      checkIn: "15h00",
      checkOut: "12h00 (meio-dia)",
      paragraphs: [
        "Bem-vindo à Reservas Kalawala. Situada no coração da vila, esta casa acomoda até 6 hóspedes, com cozinha totalmente equipada, 2 casas de banho, 2 unidades de A/C (exceto na cozinha e na sala de estar) e estacionamento privado. A nossa localização privilegiada oferece fácil acesso tanto ao centro da vila como às praias mais bonitas que Puerto Viejo tem para oferecer.",
        "Todos os espaços aqui descritos são privados, incluindo a cozinha e as casas de banho totalmente equipadas. Terá tudo o que precisa para se sentir em casa.",
        "Tem algum pedido especial? Teremos todo o gosto em atendê-lo(a), se pudermos. Não hesite em informar-nos.",
        "Puerto Viejo é um destino popular para turistas de todo o mundo, graças à sua paisagem deslumbrante. A vila tem praias imensas rodeadas de floresta tropical, além de dois Parques Nacionais (Manzanillo e Cahuita). À noite, a vila ganha vida com uma animada e vibrante vida noturna. Ao ficar aqui, poderá mergulhar por completo em tudo o que torna Puerto Viejo único.",
        "A casa está localizada perto de um acesso à praia que leva, eventualmente, até Cocles. Pelo caminho, terá a oportunidade de avistar uma variedade de animais e admirar piscinas naturais no coral. Há mesmo um miradouro escondido à espera de ser descoberto!",
        "A forma mais fácil de se deslocar em Puerto Viejo e arredores é alugando uma bicicleta ou uma scooter. No entanto, também existe um serviço de autocarro público fiável que o pode levar a Cahuita, Manzanillo e Sixaola. Se preferir conduzir, também podemos acomodar automóveis. Oferecemos estacionamento privado, mas avise-nos se tiver uma carrinha pick-up maior que precise de espaço adicional.",
      ],
    },
    hi: {
      seoTitle: "Casa Delfines - प्वेर्तो वियेहो में अवकाश गृह किराया",
      seoDescription:
        "Reservas Kalawala में आपका स्वागत है। कस्बे के बीचोंबीच स्थित यह घर पूरी तरह सुसज्जित रसोई, 2 बाथरूम, 2 ए/सी यूनिट और 2 गाड़ियों के लिए निजी पार्किंग के साथ 6 मेहमानों तक की मेज़बानी कर सकता है।",
      heading: "Casa Delfines",
      featureName: "घर Delfin",
      checkIn: "दोपहर 3:00 बजे",
      checkOut: "दोपहर 12:00 बजे (मध्याह्न)",
      paragraphs: [
        "Reservas Kalawala में आपका स्वागत है। कस्बे के बीचोंबीच स्थित यह घर पूरी तरह सुसज्जित रसोई, 2 बाथरूम, 2 ए/सी यूनिट (रसोई या बैठक कक्ष में नहीं) और निजी पार्किंग के साथ 6 मेहमानों तक को ठहरा सकता है। हमारा शानदार स्थान कस्बे के केंद्र और प्वेर्तो वियेहो के सबसे खूबसूरत समुद्र तटों, दोनों तक आसान पहुंच प्रदान करता है।",
        "यहां बताई गई सभी जगहें निजी हैं, जिनमें पूरी तरह सुसज्जित रसोई और दोनों बाथरूम शामिल हैं। घर जैसा महसूस करने के लिए आपको जो कुछ भी चाहिए, वह सब यहां मौजूद होगा।",
        "क्या आपका कोई विशेष अनुरोध है? यदि हम कर सकें, तो हमें आपकी मदद करके बेहद खुशी होगी। कृपया हमें बताने में संकोच न करें।",
        "प्वेर्तो वियेहो अपने शानदार प्राकृतिक परिवेश की बदौलत दुनियाभर के पर्यटकों के बीच एक लोकप्रिय गंतव्य है। इस कस्बे में विशाल समुद्र तट हैं जो उष्णकटिबंधीय वर्षावन से घिरे हुए हैं, साथ ही यहां दो राष्ट्रीय उद्यान भी हैं (मानसानियो और काहुइटा)। रात होते ही यह कस्बा जीवंत और सक्रिय नाइटलाइफ़ के साथ जाग उठता है। यहां ठहरने के दौरान आप उस हर चीज़ में पूरी तरह डूब सकेंगे, जो प्वेर्तो वियेहो को अनूठा बनाती है।",
        "यह घर समुद्र तट के उस रास्ते के पास स्थित है जो अंततः कॉक्लेस तक ले जाता है। रास्ते में आपको विभिन्न प्रकार के जानवर देखने और प्रवाल में बने प्राकृतिक जलकुंडों को निहारने का मौका मिलेगा। यहां तक कि एक छिपा हुआ दर्शनीय स्थल भी है, जो खोजे जाने का इंतज़ार कर रहा है!",
        "प्वेर्तो वियेहो और इसके आसपास घूमने-फिरने का सबसे आसान तरीका है बाइक या स्कूटर किराए पर लेना। हालांकि, एक भरोसेमंद सार्वजनिक बस सेवा भी उपलब्ध है, जो आपको काहुइटा, मानसानियो और सिक्सोला तक ले जा सकती है। यदि आप गाड़ी चलाना पसंद करते हैं, तो हम कारों की भी व्यवस्था कर सकते हैं। हम निजी पार्किंग की सुविधा देते हैं, लेकिन कृपया हमें बताएं यदि आपके पास एक बड़ा पिकअप ट्रक है जिसे अतिरिक्त जगह चाहिए।",
      ],
    },
    nl: {
      seoTitle: "Casa Delfines - Vakantiehuis te Huur in Puerto Viejo",
      seoDescription:
        "Welkom bij Reservas Kalawala. Dit huis, gelegen in het hart van het dorp, biedt plaats aan maximaal 6 gasten, met een volledig uitgeruste keuken, 2 badkamers, 2 airco-units en privéparkeren voor 2 auto's.",
      heading: "Casa Delfines",
      featureName: "Huis Delfin",
      checkIn: "15:00",
      checkOut: "12:00 (middag)",
      paragraphs: [
        "Welkom bij Reservas Kalawala. Dit huis, gelegen in het hart van het dorp, biedt plaats aan maximaal 6 gasten en beschikt over een volledig uitgeruste keuken, 2 badkamers, 2 airco-units (niet in de keuken of woonkamer) en privéparkeren. Onze uitstekende ligging zorgt voor gemakkelijke toegang tot zowel het centrum als de mooiste stranden die Puerto Viejo te bieden heeft.",
        "Alle hier beschreven ruimtes zijn privé, inclusief de volledig uitgeruste keuken en de badkamers. Je hebt alles wat je nodig hebt om je meteen thuis te voelen.",
        "Heb je een speciaal verzoek? We helpen je graag verder als het mogelijk is. Aarzel niet om het ons te laten weten.",
        "Puerto Viejo is wereldwijd een geliefde bestemming dankzij de betoverende omgeving. Het dorp heeft immense stranden omringd door tropisch regenwoud, en telt twee nationale parken (Manzanillo en Cahuita). 's Avonds ontwaakt het dorp met een levendig en actief nachtleven. Tijdens je verblijf hier ga je volledig op in alles wat Puerto Viejo uniek maakt.",
        "Het huis ligt vlak bij een strandtoegang die uiteindelijk naar Cocles leidt. Onderweg kun je allerlei dieren spotten en genieten van natuurlijke zwembaden in het koraal. Er wacht zelfs een verborgen uitkijkpunt om ontdekt te worden!",
        "De makkelijkste manier om je in Puerto Viejo en omgeving te verplaatsen is met een gehuurde fiets of scooter. Er is ook een betrouwbare openbare busdienst die je naar Cahuita, Manzanillo en Sixaola brengt. Rijd je liever zelf, dan is dat ook mogelijk. We bieden privéparkeren aan, maar laat het ons weten als je een grotere pick-uptruck hebt die extra ruimte nodig heeft.",
      ],
    },
  },
  Geco: {
    en: {
      seoTitle: "Casa Geco - Pet Friendly Home in Puerto Viejo",
      seoDescription:
        "Located in the heart of town, this house has space for up to 5 people and features a fully equipped kitchen, a bathroom, 2 A/C units, and a private parking lot.",
      heading: "Casa Geco",
      featureName: "House Geco",
      checkIn: "2:00 PM",
      checkOut: "11:00 AM",
      paragraphs: [
        "Located in the heart of town, this house has space for up to 5 people and features a fully equipped kitchen, a bathroom, 2 A/C units, and a private parking lot. Our prime location offers easy access to both the town center and the most beautiful beaches that Puerto Viejo has to offer.",
        "Most shops and restaurants are just a short walk away, and there is a nearby jungle path that runs along the ocean and leads to natural pools in the coral and to Cocles.",
        "All of the spaces described here are private, including the fully equipped kitchen and bathroom. You'll have everything you need to make yourself at home.",
        "We offer cleaning services for reservations of 5 nights or longer. Our team will contact you during your stay to coordinate a convenient time for the cleaning.",
        "Do you have a special request? We would be more than happy to accommodate you if we can. Please don't hesitate to let us know.",
        "If you require a pack- and - play crib during your stay, please inform us ahead of time. We'll make sure to set it up in your room during our cleaning process.",
        "Puerto Viejo is a popular destination for tourists from all over the world, thanks to its stunning surroundings. The town boasts immense beaches that are surrounded by tropical rainforest, as well as two National Parks (Manzanillo and Cahuita). At night, the town comes alive with a lively and active nightlife scene. When you stay here, you'll be able to fully immerse yourself in everything that makes Puerto Viejo unique.",
        "The house is located close to beach access that eventually leads to Cocles. Along the way, you'll have the opportunity to spot a variety of animals and admire natural pools in the coral. There's even a hidden sightseeing spot waiting to be discovered!",
        "Getting around in Puerto Viejo and its surroundings is easiest by renting a bike or a scooter. However, there is also a reliable public bus service available that can take you to Cahuita, Manzanillo, and Sixaola. If you prefer to drive, we can accommodate cars as well. We offer private parking but please let us know if you have a larger pickup truck that requires additional space.",
      ],
    },
    es: {
      seoTitle: "Casa Geco - Casa Amigable con Mascotas en Puerto Viejo",
      seoDescription:
        "Ubicada en el corazón del pueblo, esta casa tiene espacio para hasta 5 personas y cuenta con una cocina totalmente equipada, un baño, 2 unidades de aire acondicionado y un estacionamiento privado.",
      heading: "Casa Geco",
      featureName: "Casa Geco",
      checkIn: "2:00 PM",
      checkOut: "11:00 AM",
      paragraphs: [
        "Ubicada en el corazón del pueblo, esta casa tiene espacio para hasta 5 personas y cuenta con cocina totalmente equipada, baño, 2 unidades de aire acondicionado y estacionamiento privado. Nuestra ubicación privilegiada ofrece fácil acceso tanto al centro de la ciudad como a las playas más hermosas que Puerto Viejo tiene para ofrecer.",
        "La mayoría de las tiendas y restaurantes están a pocos pasos de distancia, y hay un sendero selvático cercano que corre a lo largo del océano y conduce a piscinas naturales en el coral y a Cocles.",
        "Todos los espacios descritos aquí son privados, incluida la cocina y el baño totalmente equipados. Tendrás todo lo que necesitas para sentirte como en casa.",
        "Ofrecemos servicios de limpieza para reservas de 5 noches o más. Nuestro equipo se comunicará con usted durante su estadía para coordinar un horario conveniente para la limpieza.",
        "¿Tienes alguna petición específica? Nos encantaría complacerla lo mejor que podamos. Por favor, no dudes en hacérnoslo saber.",
        "Si requieres de una cuna durante tu estadía, háznoslo saber en tu reservación. Nos encargaremos de prepararla en la habitación antes de tu llegada.",
        "Puerto Viejo es un popular destino para los turistas de todo el mundo, gracias a sus espectaculares alrededores. El pueblo cuenta con inmensas playas rodeadas por el bosque tropical lluvioso, además de dos Parques Nacionales (Manzanillo y Cahuita). De noche, el pueblo cobra vida con una vibrante y activa escena nocturna. Cuando te hospedas aquí, serás capaz de adentrarte en todo lo que hace a Puerto Viejo único.",
        "La casa está localizada cerca del acceso a la playa que eventualmente lleva a la playa Cocles. A lo largo del camino tendrás la oportunidad de avistar una variedad de animales y admirar las piscinas naturales que se forman en el coral. ¡Incluso hay un mirador oculto esperando a que lo descubras!",
        "Moverse por Puerto Viejo y sus alrededores es más fácil si rentas una bicicleta o un scooter. Aunque, si no te interesa esta opción, también hay un servicio de bus público muy confiable que te puede llevar a Cahuita, Manzanillo y Sixaola. Si prefieres conducir, podemos proporcionar el servicio de alquiler de autos también. Ofrecemos parqueo privado, solo haznos saber si tienes una camioneta grande que requiera de algo de espacio adicional para parquear.",
      ],
    },
    fr: {
      seoTitle: "Casa Geco - Maison acceptant les animaux à Puerto Viejo",
      seoDescription:
        "Située au cœur de la ville, cette maison offre de l'espace pour jusqu'à 5 personnes et dispose d'une cuisine entièrement équipée, d'une salle de bain, de 2 unités de climatisation et d'un parking privé.",
      heading: "Casa Geco",
      featureName: "Maison Geco",
      checkIn: "14h00",
      checkOut: "11h00",
      paragraphs: [
        "Située au cœur de la ville, cette maison offre de l'espace pour jusqu'à 5 personnes et dispose d'une cuisine entièrement équipée, d'une salle de bain, de 2 unités de climatisation et d'un parking privé. Notre emplacement privilégié offre un accès facile au centre-ville comme aux plus belles plages que Puerto Viejo a à offrir.",
        "La plupart des commerces et restaurants sont à quelques pas, et un sentier de jungle à proximité longe l'océan et mène à des piscines naturelles dans le corail et jusqu'à Cocles.",
        "Tous les espaces décrits ici sont privés, y compris la cuisine et la salle de bain entièrement équipées. Vous aurez tout ce qu'il faut pour vous sentir chez vous.",
        "Nous proposons un service de ménage pour les réservations de 5 nuits ou plus. Notre équipe vous contactera pendant votre séjour pour convenir d'un horaire pratique pour le ménage.",
        "Avez-vous une demande particulière ? Nous serions plus que ravis de vous satisfaire si cela nous est possible. N'hésitez pas à nous le faire savoir.",
        "Si vous avez besoin d'un lit parapluie pendant votre séjour, merci de nous en informer à l'avance. Nous nous chargerons de l'installer dans votre chambre lors de notre passage de ménage.",
        "Puerto Viejo est une destination prisée des touristes du monde entier, grâce à ses environs à couper le souffle. La ville possède d'immenses plages entourées de forêt tropicale, ainsi que deux parcs nationaux (Manzanillo et Cahuita). La nuit, la ville s'anime avec une vie nocturne dynamique et animée. En séjournant ici, vous pourrez pleinement vous immerger dans tout ce qui rend Puerto Viejo unique.",
        "La maison est proche d'un accès à la plage qui mène finalement à Cocles. En chemin, vous aurez l'occasion d'observer diverses espèces animales et d'admirer des piscines naturelles dans le corail. Il y a même un point de vue caché qui attend d'être découvert !",
        "Pour se déplacer à Puerto Viejo et ses environs, le plus simple est de louer un vélo ou un scooter. Il existe également un service de bus public fiable qui peut vous emmener à Cahuita, Manzanillo et Sixaola. Si vous préférez conduire, nous pouvons aussi accueillir des voitures. Nous proposons un parking privé, mais merci de nous prévenir si vous avez un grand pick-up nécessitant un espace supplémentaire.",
      ],
    },
    it: {
      seoTitle: "Casa Geco - Casa Pet Friendly a Puerto Viejo",
      seoDescription:
        "Situata nel cuore del paese, questa casa ha spazio per un massimo di 5 persone e dispone di una cucina completamente attrezzata, un bagno, 2 unità di aria condizionata e un parcheggio privato.",
      heading: "Casa Geco",
      featureName: "Casa Geco",
      checkIn: "14:00",
      checkOut: "11:00",
      paragraphs: [
        "Situata nel cuore del paese, questa casa ha spazio per un massimo di 5 persone e dispone di una cucina completamente attrezzata, un bagno, 2 unità di aria condizionata e un parcheggio privato. La nostra posizione privilegiata offre un facile accesso sia al centro del paese sia alle spiagge più belle che Puerto Viejo ha da offrire.",
        "La maggior parte dei negozi e ristoranti si trova a pochi passi, e nelle vicinanze c'è un sentiero nella giungla che costeggia l'oceano e conduce alle piscine naturali nella barriera corallina e a Cocles.",
        "Tutti gli spazi qui descritti sono privati, inclusi la cucina completamente attrezzata e il bagno. Avrai tutto il necessario per sentirti come a casa tua.",
        "Offriamo un servizio di pulizia per prenotazioni di 5 notti o più. Il nostro team ti contatterà durante il soggiorno per concordare un orario conveniente per le pulizie.",
        "Hai una richiesta speciale? Saremo più che felici di accontentarti, se possibile. Non esitare a farcelo sapere.",
        "Se hai bisogno di un lettino da campeggio (pack-and-play) durante il tuo soggiorno, faccelo sapere in anticipo. Ci assicureremo di sistemarlo nella tua camera durante il processo di pulizia.",
        "Puerto Viejo è una destinazione molto amata dai turisti di tutto il mondo, grazie ai suoi paesaggi mozzafiato. Il paese vanta spiagge immense circondate dalla foresta pluviale tropicale, oltre a due Parchi Nazionali (Manzanillo e Cahuita). Di notte, il paese si anima con una vivace e movimentata vita notturna. Soggiornando qui, potrai immergerti completamente in tutto ciò che rende Puerto Viejo unico.",
        "La casa si trova vicino a un accesso alla spiaggia che porta infine a Cocles. Lungo il percorso avrai l'opportunità di avvistare diversi animali e ammirare le piscine naturali nella barriera corallina. C'è persino un punto panoramico nascosto tutto da scoprire!",
        "Il modo più semplice per spostarsi a Puerto Viejo e nei dintorni è noleggiare una bicicletta o uno scooter. È comunque disponibile anche un affidabile servizio di autobus pubblici che può portarti a Cahuita, Manzanillo e Sixaola. Se preferisci guidare, possiamo accogliere anche le auto. Offriamo parcheggio privato, ma facci sapere se hai un pick-up di grandi dimensioni che richiede spazio aggiuntivo.",
      ],
    },
    de: {
      seoTitle: "Casa Geco – Haustierfreundliches Haus in Puerto Viejo",
      seoDescription:
        "Dieses Haus liegt im Herzen der Stadt und bietet Platz für bis zu 5 Personen. Es verfügt über eine voll ausgestattete Küche, ein Badezimmer, 2 Klimaanlagen und einen privaten Parkplatz.",
      heading: "Casa Geco",
      featureName: "Haus Geco",
      checkIn: "14:00 Uhr",
      checkOut: "11:00 Uhr",
      paragraphs: [
        "Dieses Haus liegt im Herzen der Stadt und bietet Platz für bis zu 5 Personen. Es verfügt über eine voll ausgestattete Küche, ein Badezimmer, 2 Klimaanlagen und einen privaten Parkplatz. Unsere erstklassige Lage bietet einfachen Zugang sowohl zum Stadtzentrum als auch zu den schönsten Stränden, die Puerto Viejo zu bieten hat.",
        "Die meisten Geschäfte und Restaurants sind nur einen kurzen Spaziergang entfernt, und es gibt einen nahegelegenen Dschungelpfad, der entlang des Meeres verläuft und zu natürlichen Pools im Korallenriff sowie nach Cocles führt.",
        "Alle hier beschriebenen Räume sind privat, einschließlich der voll ausgestatteten Küche und des Badezimmers. Sie haben alles, was Sie brauchen, um sich wie zu Hause zu fühlen.",
        "Wir bieten Reinigungsservice für Aufenthalte ab 5 Nächten an. Unser Team wird sich während Ihres Aufenthalts mit Ihnen in Verbindung setzen, um einen passenden Termin für die Reinigung zu vereinbaren.",
        "Haben Sie einen besonderen Wunsch? Wir erfüllen ihn Ihnen gerne, wenn es uns möglich ist. Zögern Sie nicht, es uns mitzuteilen.",
        "Falls Sie während Ihres Aufenthalts ein Reisebett (Pack-and-Play) benötigen, teilen Sie uns dies bitte im Voraus mit. Wir sorgen dafür, dass es während unseres Reinigungsprozesses in Ihrem Zimmer aufgestellt wird.",
        "Puerto Viejo ist dank seiner atemberaubenden Umgebung ein beliebtes Reiseziel für Touristen aus aller Welt. Der Ort verfügt über weitläufige Strände, die von tropischem Regenwald umgeben sind, sowie über zwei Nationalparks (Manzanillo und Cahuita). Nachts erwacht der Ort mit einem lebendigen und aktiven Nachtleben zum Leben. Während Ihres Aufenthalts hier können Sie vollständig in alles eintauchen, was Puerto Viejo einzigartig macht.",
        "Das Haus liegt in der Nähe eines Strandzugangs, der schließlich nach Cocles führt. Unterwegs haben Sie die Möglichkeit, verschiedene Tiere zu entdecken und die natürlichen Pools im Korallenriff zu bewundern. Es gibt sogar einen versteckten Aussichtspunkt, der nur darauf wartet, entdeckt zu werden!",
        "Am einfachsten bewegen Sie sich in Puerto Viejo und Umgebung mit einem gemieteten Fahrrad oder Roller fort. Es gibt aber auch einen zuverlässigen öffentlichen Busservice, der Sie nach Cahuita, Manzanillo und Sixaola bringt. Wenn Sie lieber mit dem Auto fahren möchten, können wir das ebenfalls ermöglichen. Wir bieten privates Parken an, bitte teilen Sie uns jedoch mit, wenn Sie einen größeren Pickup-Truck haben, der zusätzlichen Platz benötigt.",
      ],
    },
    he: {
      seoTitle: "Casa Geco - בית ידידותי לחיות מחמד בפוארטו ויחו",
      seoDescription:
        "הבית ממוקם בלב העיירה, בעל מקום עד 5 אנשים, וכולל מטבח מאובזר במלואו, חדר רחצה, 2 יחידות מיזוג אוויר וחניה פרטית.",
      heading: "Casa Geco",
      featureName: "בית Geco",
      checkIn: "14:00",
      checkOut: "11:00",
      paragraphs: [
        "הבית ממוקם בלב העיירה, בעל מקום עד 5 אנשים, וכולל מטבח מאובזר במלואו, חדר רחצה, 2 יחידות מיזוג אוויר וחניה פרטית. המיקום המצוין שלנו מציע גישה נוחה הן למרכז העיירה והן לחופים היפים ביותר שיש לפוארטו ויחו להציע.",
        "רוב החנויות והמסעדות נמצאות במרחק הליכה קצר, וקיים שביל ג'ונגל סמוך המשתרע לאורך האוקיינוס ומוביל לבריכות טבעיות באלמוגים ולקוקלס.",
        "כל המרחבים המתוארים כאן הם פרטיים, כולל המטבח המאובזר במלואו וחדר הרחצה. יהיה לכם כל מה שאתם צריכים כדי להרגיש כמו בבית.",
        "אנחנו מציעים שירותי ניקיון להזמנות של 5 לילות או יותר. הצוות שלנו ייצור איתכם קשר במהלך השהות כדי לתאם זמן נוח לניקיון.",
        "יש לכם בקשה מיוחדת? נשמח מאוד להיענות לה אם נוכל. אל תהססו לספר לנו.",
        "אם אתם זקוקים למיטת תינוק ניידת (pack-and-play) במהלך השהות, אנא עדכנו אותנו מראש. נדאג להציב אותה בחדרכם במהלך תהליך הניקיון.",
        "פוארטו ויחו הוא יעד מבוקש לתיירים מכל רחבי העולם, בזכות הנוף המרהיב שלו. לעיירה חופים עצומים המוקפים ביער גשם טרופי, וכן שני פארקים לאומיים (מנסניו וקאוויטה). בלילה, העיירה קמה לתחייה עם חיי לילה תוססים ופעילים. כשתתארחו כאן, תוכלו לחוות באופן מלא כל מה שהופך את פוארטו ויחו למקום כה מיוחד.",
        "הבית ממוקם בקרבת גישה לחוף המובילה בסופו של דבר לקוקלס. בדרך, תהיה לכם הזדמנות להבחין במגוון בעלי חיים ולהתפעל מבריכות טבעיות באלמוגים. יש אפילו נקודת תצפית נסתרת המחכה להתגלות!",
        "הדרך הקלה ביותר להתנייד בפוארטו ויחו ובסביבתה היא באמצעות השכרת אופניים או קטנוע. עם זאת, קיים גם שירות אוטובוסים ציבורי אמין שיכול לקחת אתכם לקאוויטה, מנסניו וסיקסאולה. אם אתם מעדיפים לנסוע ברכב, נוכל להתאים גם לכך. אנחנו מציעים חניה פרטית, אך אנא הודיעו לנו אם ברשותכם טנדר גדול שדורש שטח חניה נוסף.",
      ],
    },
    pt: {
      seoTitle: "Casa Geco - Casa Pet-Friendly em Puerto Viejo",
      seoDescription:
        "Situada no coração da vila, esta casa tem espaço para até 5 pessoas e conta com cozinha totalmente equipada, casa de banho, 2 unidades de A/C e um parque de estacionamento privado.",
      heading: "Casa Geco",
      featureName: "Casa Geco",
      checkIn: "14h00",
      checkOut: "11h00",
      paragraphs: [
        "Situada no coração da vila, esta casa tem espaço para até 5 pessoas e conta com cozinha totalmente equipada, casa de banho, 2 unidades de A/C e um parque de estacionamento privado. A nossa localização privilegiada oferece fácil acesso tanto ao centro da vila como às praias mais bonitas que Puerto Viejo tem para oferecer.",
        "A maioria das lojas e restaurantes fica a uma curta caminhada, e existe um trilho na selva ali perto que acompanha o oceano e leva a piscinas naturais no coral e até Cocles.",
        "Todos os espaços aqui descritos são privados, incluindo a cozinha e a casa de banho totalmente equipadas. Terá tudo o que precisa para se sentir em casa.",
        "Oferecemos serviço de limpeza para reservas de 5 noites ou mais. A nossa equipa entrará em contacto consigo durante a sua estadia para combinar um horário conveniente para a limpeza.",
        "Tem algum pedido especial? Teremos todo o gosto em atendê-lo(a), se pudermos. Não hesite em informar-nos.",
        "Se precisar de um berço de viagem durante a sua estadia, por favor informe-nos com antecedência. Iremos garantir que fica montado no seu quarto durante o processo de limpeza.",
        "Puerto Viejo é um destino popular para turistas de todo o mundo, graças à sua paisagem deslumbrante. A vila tem praias imensas rodeadas de floresta tropical, além de dois Parques Nacionais (Manzanillo e Cahuita). À noite, a vila ganha vida com uma animada e vibrante vida noturna. Ao ficar aqui, poderá mergulhar por completo em tudo o que torna Puerto Viejo único.",
        "A casa está localizada perto de um acesso à praia que leva, eventualmente, até Cocles. Pelo caminho, terá a oportunidade de avistar uma variedade de animais e admirar piscinas naturais no coral. Há mesmo um miradouro escondido à espera de ser descoberto!",
        "A forma mais fácil de se deslocar em Puerto Viejo e arredores é alugando uma bicicleta ou uma scooter. No entanto, também existe um serviço de autocarro público fiável que o pode levar a Cahuita, Manzanillo e Sixaola. Se preferir conduzir, também podemos acomodar automóveis. Oferecemos estacionamento privado, mas avise-nos se tiver uma carrinha pick-up maior que precise de espaço adicional.",
      ],
    },
    hi: {
      seoTitle: "Casa Geco - प्वेर्तो वियेहो में पेट फ्रेंडली (पालतू-अनुकूल) घर",
      seoDescription:
        "कस्बे के बीचोंबीच स्थित यह घर 5 लोगों तक के लिए जगह रखता है और इसमें पूरी तरह सुसज्जित रसोई, एक बाथरूम, 2 ए/सी यूनिट और निजी पार्किंग स्थल है।",
      heading: "Casa Geco",
      featureName: "घर Geco",
      checkIn: "दोपहर 2:00 बजे",
      checkOut: "सुबह 11:00 बजे",
      paragraphs: [
        "कस्बे के बीचोंबीच स्थित यह घर 5 लोगों तक के लिए जगह रखता है और इसमें पूरी तरह सुसज्जित रसोई, एक बाथरूम, 2 ए/सी यूनिट और निजी पार्किंग स्थल है। हमारा शानदार स्थान कस्बे के केंद्र और प्वेर्तो वियेहो के सबसे खूबसूरत समुद्र तटों, दोनों तक आसान पहुंच प्रदान करता है।",
        "अधिकांश दुकानें और रेस्तरां यहां से बस कुछ ही कदम की दूरी पर हैं, और पास ही एक जंगल का रास्ता है जो समुद्र किनारे-किनारे चलता हुआ प्रवाल में बने प्राकृतिक जलकुंडों और कॉक्लेस तक जाता है।",
        "यहां बताई गई सभी जगहें निजी हैं, जिनमें पूरी तरह सुसज्जित रसोई और बाथरूम शामिल हैं। घर जैसा महसूस करने के लिए आपको जो कुछ भी चाहिए, वह सब यहां मौजूद होगा।",
        "5 रातों या उससे अधिक की बुकिंग के लिए हम सफाई सेवा प्रदान करते हैं। सफाई के लिए सुविधाजनक समय तय करने हेतु हमारी टीम आपके ठहरने के दौरान आपसे संपर्क करेगी।",
        "क्या आपका कोई विशेष अनुरोध है? यदि हम कर सकें, तो हमें आपकी मदद करके बेहद खुशी होगी। कृपया हमें बताने में संकोच न करें।",
        "यदि आपको अपने ठहरने के दौरान पैक-एंड-प्ले क्रिब (बच्चों के लिए पालना) चाहिए, तो कृपया हमें पहले से सूचित करें। हम सफाई के दौरान इसे आपके कमरे में लगाना सुनिश्चित करेंगे।",
        "प्वेर्तो वियेहो अपने शानदार प्राकृतिक परिवेश की बदौलत दुनियाभर के पर्यटकों के बीच एक लोकप्रिय गंतव्य है। इस कस्बे में विशाल समुद्र तट हैं जो उष्णकटिबंधीय वर्षावन से घिरे हुए हैं, साथ ही यहां दो राष्ट्रीय उद्यान भी हैं (मानसानियो और काहुइटा)। रात होते ही यह कस्बा जीवंत और सक्रिय नाइटलाइफ़ के साथ जाग उठता है। यहां ठहरने के दौरान आप उस हर चीज़ में पूरी तरह डूब सकेंगे, जो प्वेर्तो वियेहो को अनूठा बनाती है।",
        "यह घर समुद्र तट के उस रास्ते के पास स्थित है जो अंततः कॉक्लेस तक ले जाता है। रास्ते में आपको विभिन्न प्रकार के जानवर देखने और प्रवाल में बने प्राकृतिक जलकुंडों को निहारने का मौका मिलेगा। यहां तक कि एक छिपा हुआ दर्शनीय स्थल भी है, जो खोजे जाने का इंतज़ार कर रहा है!",
        "प्वेर्तो वियेहो और इसके आसपास घूमने-फिरने का सबसे आसान तरीका है बाइक या स्कूटर किराए पर लेना। हालांकि, एक भरोसेमंद सार्वजनिक बस सेवा भी उपलब्ध है, जो आपको काहुइटा, मानसानियो और सिक्सोला तक ले जा सकती है। यदि आप गाड़ी चलाना पसंद करते हैं, तो हम कारों की भी व्यवस्था कर सकते हैं। हम निजी पार्किंग की सुविधा देते हैं, लेकिन कृपया हमें बताएं यदि आपके पास एक बड़ा पिकअप ट्रक है जिसे अतिरिक्त जगह चाहिए।",
      ],
    },
    nl: {
      seoTitle: "Casa Geco - Huisdiervriendelijk Huis in Puerto Viejo",
      seoDescription:
        "In het hart van het dorp gelegen, biedt dit huis ruimte voor maximaal 5 personen en beschikt het over een volledig uitgeruste keuken, een badkamer, 2 airco-units en een privéparkeerplaats.",
      heading: "Casa Geco",
      featureName: "Huis Geco",
      checkIn: "14:00",
      checkOut: "11:00",
      paragraphs: [
        "In het hart van het dorp gelegen, biedt dit huis ruimte voor maximaal 5 personen en beschikt het over een volledig uitgeruste keuken, een badkamer, 2 airco-units en een privéparkeerplaats. Onze uitstekende ligging biedt gemakkelijke toegang tot zowel het centrum van het dorp als de mooiste stranden die Puerto Viejo te bieden heeft.",
        "De meeste winkels en restaurants zijn op loopafstand, en er loopt vlakbij een junglepad langs de oceaan dat leidt naar natuurlijke zwembaden in het koraal en naar Cocles.",
        "Alle hier beschreven ruimtes zijn privé, inclusief de volledig uitgeruste keuken en badkamer. Je hebt alles wat je nodig hebt om je meteen thuis te voelen.",
        "Voor boekingen van 5 nachten of langer bieden we schoonmaakdiensten aan. Ons team neemt tijdens je verblijf contact met je op om een geschikt moment voor de schoonmaak af te spreken.",
        "Heb je een specifiek verzoek? We voldoen er graag zo goed mogelijk aan. Aarzel niet om het ons te laten weten.",
        "Heb je tijdens je verblijf een reisbedje nodig? Laat het ons van tevoren weten, dan zorgen we dat het tijdens de schoonmaak in je kamer klaarstaat.",
        "Puerto Viejo is dankzij zijn adembenemende omgeving een geliefde bestemming voor toeristen van over de hele wereld. Het dorp heeft uitgestrekte stranden omzoomd door tropisch regenwoud, en telt twee nationale parken (Manzanillo en Cahuita). 's Avonds komt het dorp tot leven met een levendig en actief nachtleven. Tijdens je verblijf hier ga je volledig op in alles wat Puerto Viejo uniek maakt.",
        "Het huis ligt vlak bij een strandtoegang die uiteindelijk naar Cocles leidt. Onderweg kun je allerlei dieren spotten en genieten van natuurlijke zwembaden in het koraal. Er wacht zelfs een verborgen uitkijkpunt om ontdekt te worden!",
        "De makkelijkste manier om je in Puerto Viejo en omgeving te verplaatsen is met een gehuurde fiets of scooter. Er is ook een betrouwbare openbare busdienst die je naar Cahuita, Manzanillo en Sixaola brengt. Rijd je liever zelf, dan is dat ook mogelijk. We bieden privéparkeren aan, maar laat het ons weten als je een grotere pick-uptruck hebt die extra ruimte nodig heeft.",
      ],
    },
  },
  Giulia: {
    en: {
      seoTitle: "Casa Giulia - Family Retreat",
      seoDescription:
        "New fully equipped Bungalows with A/C located 200mts from the beautiful Playa Chiquita beach, in one of the safest and calm neighborhoods in the Caribbean. Perfect for families up to 4 people.",
      heading: "Casa Giulia",
      featureName: "House Giulia",
      checkIn: "3:00 PM",
      checkOut: "12:00 PM (noon)",
      paragraphs: [
        "Escape to Puerto Viejo in our home with A/C, gas kitchen, and a spacious closet. Relax on your private covered patio. Our home is located just 200 meters from the stunning Playa Chiquita beach, in one of the safest and calmest neighborhoods in the Caribbean. Explore nearby attractions like Puerto Viejo, Manzanillo, Punta Uva beach, and Arrecife from our perfect location.",
        "The space, completely private, has 2 A/C units, fully equipped kitchen and 2 private bathrooms with hot water. The parking space is private, for one car, and outside of the property. The house has a porch for our guests. ✓ A/C ✓ kitchen ✓ wifi ✓ private porch ✓ private parking.",
        "All of the spaces described here are private, including the fully equipped kitchen and bathrooms. You'll have everything you need to make yourself at home.",
        "Close by you may find restaurants, supermarkets, and bike rentals. We trust our guests to follow common sense when leaving our house, that's why we have 0 check-out rules and no check-out list.",
        "Do you have a special request? We would be more than happy to accommodate you if we can. Please don't hesitate to let us know.",
        "Puerto Viejo is a popular destination for tourists from all over the world, thanks to its stunning surroundings. The town boasts immense beaches that are surrounded by tropical rainforest, as well as two National Parks (Manzanillo and Cahuita). At night, the town comes alive with a lively and active nightlife scene. When you stay here, you'll be able to fully immerse yourself in everything that makes Puerto Viejo unique.",
      ],
    },
    es: {
      seoTitle: "Casa Giulia - Retiro Familiar",
      seoDescription:
        "Nuevos bungalows totalmente equipados con A/C ubicados a 200mts de la hermosa playa Playa Chiquita, en uno de los barrios más seguros y tranquilos del Caribe. Perfecto para familias hasta 4 personas.",
      heading: "Casa Giulia",
      featureName: "Casa Giulia",
      checkIn: "3:00 PM",
      checkOut: "12:00 PM (mediodía)",
      paragraphs: [
        "Escápate a Puerto Viejo en nuestra casa con aire acondicionado, cocina de gas y un amplio clóset. Relájate en tu terraza privada techada. Nuestra casa está ubicada a solo 200 metros de la impresionante playa Chiquita, en uno de los vecindarios más seguros y tranquilos del Caribe. Explora atracciones cercanas como Puerto Viejo, Manzanillo, la playa de Punta Uva y Arrecife desde nuestra ubicación perfecta.",
        { text: "El espacio, completamente privado, cuenta con 2 aires acondicionados, cocina totalmente equipada y 2 baños privados con agua caliente. El espacio de parqueo es privado, para un carro, y se encuentra fuera de la propiedad. La casa tiene un porche para nuestros huéspedes. ✓ A/C ✓ cocina ✓ wifi ✓ porche privado ✓ parqueo privado.", trailingBreak: false },
        "Cerca puedes encontrar restaurantes, supermercados y alquiler de bicicletas. Confiamos en nuestros huéspedes para seguir el sentido común al salir de nuestra casa, por eso tenemos 0 reglas de salida y ninguna lista de salida.",
        "¿Tienes alguna petición especial? Estaríamos más que felices de acomodarte si podemos. Por favor, no dudes en hacérnoslo saber.",
        "Puerto Viejo es un destino popular para turistas de todo el mundo, gracias a sus impresionantes alrededores. El pueblo cuenta con inmensas playas que están rodeadas de selva tropical, así como dos Parques Nacionales (Manzanillo y Cahuita). Por la noche, el pueblo cobra vida con una escena nocturna animada y activa. Cuando te hospedas aquí, podrás sumergirte completamente en todo lo que hace único a Puerto Viejo.",
      ],
    },
    fr: {
      seoTitle: "Casa Giulia - Retraite familiale",
      seoDescription:
        "Nouveaux bungalows entièrement équipés avec climatisation, situés à 200 mètres de la magnifique plage de Playa Chiquita, dans l'un des quartiers les plus sûrs et les plus paisibles des Caraïbes. Parfait pour les familles jusqu'à 4 personnes.",
      heading: "Casa Giulia",
      featureName: "Maison Giulia",
      checkIn: "15h00",
      checkOut: "12h00 (midi)",
      paragraphs: [
        "Évadez-vous à Puerto Viejo dans notre maison avec climatisation, cuisine au gaz et un grand placard. Détendez-vous sur votre terrasse privée couverte. Notre maison est située à seulement 200 mètres de la superbe plage de Playa Chiquita, dans l'un des quartiers les plus sûrs et les plus paisibles des Caraïbes. Explorez les attractions voisines telles que Puerto Viejo, Manzanillo, la plage de Punta Uva et Arrecife depuis notre emplacement idéal.",
        "L'espace, entièrement privé, dispose de 2 unités de climatisation, d'une cuisine entièrement équipée et de 2 salles de bain privées avec eau chaude. Le stationnement est privé, pour une voiture, et situé à l'extérieur de la propriété. La maison dispose d'un porche pour nos hôtes. ✓ climatisation ✓ cuisine ✓ wifi ✓ porche privé ✓ parking privé.",
        "Tous les espaces décrits ici sont privés, y compris la cuisine entièrement équipée et les salles de bain. Vous aurez tout ce qu'il vous faut pour vous sentir chez vous.",
        "À proximité, vous trouverez des restaurants, des supermarchés et des locations de vélos. Nous faisons confiance à nos hôtes pour faire preuve de bon sens en quittant notre maison, c'est pourquoi nous n'avons aucune règle de départ ni liste de sortie.",
        "Avez-vous une demande particulière ? Nous serions plus que ravis de vous satisfaire si cela nous est possible. N'hésitez pas à nous le faire savoir.",
        "Puerto Viejo est une destination très prisée des touristes du monde entier, grâce à son cadre naturel exceptionnel. La ville s'enorgueillit de vastes plages bordées par la forêt tropicale, ainsi que de deux parcs nationaux (Manzanillo et Cahuita). La nuit, la ville s'anime grâce à une vie nocturne dynamique et animée. En séjournant ici, vous pourrez pleinement vous immerger dans tout ce qui fait l'unicité de Puerto Viejo.",
      ],
    },
    de: {
      seoTitle: "Casa Giulia – Familienrückzugsort",
      seoDescription:
        "Neue, voll ausgestattete Bungalows mit Klimaanlage, nur 200 m vom wunderschönen Strand Playa Chiquita entfernt, in einem der sichersten und ruhigsten Viertel der Karibik. Perfekt für Familien mit bis zu 4 Personen.",
      heading: "Casa Giulia",
      featureName: "Haus Giulia",
      checkIn: "15:00 Uhr",
      checkOut: "12:00 Uhr (Mittag)",
      paragraphs: [
        "Entfliehen Sie nach Puerto Viejo in unser Haus mit Klimaanlage, Gasküche und einem geräumigen Kleiderschrank. Entspannen Sie auf Ihrer privaten überdachten Terrasse. Unser Haus liegt nur 200 Meter vom atemberaubenden Strand Playa Chiquita entfernt, in einem der sichersten und ruhigsten Viertel der Karibik. Erkunden Sie von unserer perfekten Lage aus nahegelegene Attraktionen wie Puerto Viejo, Manzanillo, den Strand Punta Uva und Arrecife.",
        "Der komplett private Bereich verfügt über 2 Klimaanlagen, eine voll ausgestattete Küche und 2 private Badezimmer mit Warmwasser. Der Parkplatz ist privat, für ein Auto, und befindet sich außerhalb des Grundstücks. Das Haus verfügt über eine Veranda für unsere Gäste. ✓ Klimaanlage ✓ Küche ✓ WLAN ✓ private Veranda ✓ privater Parkplatz.",
        "Alle hier beschriebenen Räume sind privat, einschließlich der voll ausgestatteten Küche und der Badezimmer. Sie haben alles, was Sie brauchen, um sich wie zu Hause zu fühlen.",
        "In der Nähe finden Sie Restaurants, Supermärkte und Fahrradverleihe. Wir vertrauen darauf, dass unsere Gäste beim Verlassen unseres Hauses gesunden Menschenverstand walten lassen, weshalb wir keine Check-out-Regeln und keine Check-out-Liste haben.",
        "Haben Sie einen besonderen Wunsch? Wir erfüllen ihn Ihnen gerne, wenn es uns möglich ist. Zögern Sie nicht, es uns mitzuteilen.",
        "Puerto Viejo ist dank seiner atemberaubenden Umgebung ein beliebtes Reiseziel für Touristen aus aller Welt. Der Ort verfügt über weitläufige Strände, die von tropischem Regenwald umgeben sind, sowie über zwei Nationalparks (Manzanillo und Cahuita). Nachts erwacht der Ort mit einem lebendigen und aktiven Nachtleben zum Leben. Während Ihres Aufenthalts hier können Sie vollständig in alles eintauchen, was Puerto Viejo einzigartig macht.",
      ],
    },
    he: {
      seoTitle: "Casa Giulia - מקלט משפחתי",
      seoDescription:
        "בונגלו חדש ומאובזר במלואו עם מיזוג אוויר, הממוקם 200 מטר מחוף פלאיה צ'יקיטה היפהפה, באחת השכונות הבטוחות והשקטות ביותר בקריביים. מושלם למשפחות עד 4 אנשים.",
      heading: "Casa Giulia",
      featureName: "בית Giulia",
      checkIn: "15:00",
      checkOut: "12:00 בצהריים",
      paragraphs: [
        "ברחו לפוארטו ויחו בביתנו עם מיזוג אוויר, מטבח גז וארון בגדים מרווח. תוכלו להירגע במרפסת המקורה הפרטית שלכם. הבית שלנו ממוקם רק 200 מטר מהחוף המהמם פלאיה צ'יקיטה, באחת השכונות הבטוחות והשקטות ביותר בקריביים. גלו אטרקציות סמוכות כמו פוארטו ויחו, מנסניו, חוף פונטה אובה ואררסיפה, ממש מהמיקום המושלם שלנו.",
        "המרחב, פרטי לחלוטין, כולל 2 יחידות מיזוג אוויר, מטבח מאובזר במלואו ו-2 חדרי רחצה פרטיים עם מים חמים. חניית הרכב פרטית, לרכב אחד, וממוקמת מחוץ לנכס. לבית יש מרפסת עבור האורחים שלנו. ✓ מיזוג אוויר ✓ מטבח ✓ וויי-פיי ✓ מרפסת פרטית ✓ חניה פרטית.",
        "כל המרחבים המתוארים כאן הם פרטיים, כולל המטבח וחדרי הרחצה המאובזרים במלואו. יהיה לכם כל מה שאתם צריכים כדי להרגיש כמו בבית.",
        "בקרבת מקום תוכלו למצוא מסעדות, סופרמרקטים והשכרת אופניים. אנחנו סומכים על האורחים שלנו שינהגו בשכל ישר בעת עזיבת הבית, ולכן אין לנו כללי צ'ק-אאוט ואין רשימת בדיקה ביציאה.",
        "יש לכם בקשה מיוחדת? נשמח מאוד להיענות לה אם נוכל. אל תהססו לספר לנו.",
        "פוארטו ויחו הוא יעד מבוקש לתיירים מכל רחבי העולם, בזכות הנוף המרהיב שלו. לעיירה חופים עצומים המוקפים ביער גשם טרופי, וכן שני פארקים לאומיים (מנסניו וקאוויטה). בלילה, העיירה קמה לתחייה עם חיי לילה תוססים ופעילים. כשתתארחו כאן, תוכלו לחוות באופן מלא כל מה שהופך את פוארטו ויחו למקום כה מיוחד.",
      ],
    },
    it: {
      seoTitle: "Casa Giulia - Rifugio per Famiglie",
      seoDescription:
        "Nuovi bungalow completamente attrezzati con aria condizionata, situati a 200 metri dalla splendida spiaggia di Playa Chiquita, in uno dei quartieri più sicuri e tranquilli dei Caraibi. Perfetto per famiglie fino a 4 persone.",
      heading: "Casa Giulia",
      featureName: "Casa Giulia",
      checkIn: "15:00",
      checkOut: "12:00 (mezzogiorno)",
      paragraphs: [
        "Concediti una fuga a Puerto Viejo nella nostra casa con aria condizionata, cucina a gas e un ampio armadio. Rilassati sul tuo patio coperto privato. La nostra casa si trova a soli 200 metri dalla splendida spiaggia di Playa Chiquita, in uno dei quartieri più sicuri e tranquilli dei Caraibi. Esplora le attrazioni vicine come Puerto Viejo, Manzanillo, la spiaggia di Punta Uva e Arrecife dalla nostra posizione perfetta.",
        "Lo spazio, completamente privato, dispone di 2 unità di aria condizionata, cucina completamente attrezzata e 2 bagni privati con acqua calda. Il parcheggio è privato, per un'auto, e situato all'esterno della proprietà. La casa dispone di un portico per i nostri ospiti. ✓ A/C ✓ cucina ✓ wifi ✓ portico privato ✓ parcheggio privato.",
        "Tutti gli spazi qui descritti sono privati, inclusi la cucina completamente attrezzata e i bagni. Avrai tutto il necessario per sentirti come a casa tua.",
        "Nelle vicinanze troverai ristoranti, supermercati e noleggio biciclette. Ci fidiamo che i nostri ospiti usino il buon senso quando lasciano la nostra casa, per questo non abbiamo regole di check-out né una lista di controllo al check-out.",
        "Hai una richiesta speciale? Saremo più che felici di accontentarti, se possibile. Non esitare a farcelo sapere.",
        "Puerto Viejo è una destinazione molto amata dai turisti di tutto il mondo, grazie ai suoi paesaggi mozzafiato. Il paese vanta spiagge immense circondate dalla foresta pluviale tropicale, oltre a due Parchi Nazionali (Manzanillo e Cahuita). Di notte, il paese si anima con una vivace e movimentata vita notturna. Soggiornando qui, potrai immergerti completamente in tutto ciò che rende Puerto Viejo unico.",
      ],
    },
    pt: {
      seoTitle: "Casa Giulia - Retiro em Família",
      seoDescription:
        "Novos bungalows totalmente equipados com A/C, situados a 200 metros da encantadora praia de Playa Chiquita, num dos bairros mais seguros e tranquilos das Caraíbas. Perfeito para famílias até 4 pessoas.",
      heading: "Casa Giulia",
      featureName: "Casa Giulia",
      checkIn: "15h00",
      checkOut: "12h00 (meio-dia)",
      paragraphs: [
        "Escape para Puerto Viejo na nossa casa com A/C, cozinha a gás e um amplo roupeiro. Relaxe na sua varanda coberta privativa. A nossa casa está situada a apenas 200 metros da deslumbrante praia de Playa Chiquita, num dos bairros mais seguros e tranquilos das Caraíbas. Explore atrações próximas como Puerto Viejo, Manzanillo, a praia de Punta Uva e o Arrecife a partir da nossa localização perfeita.",
        "O espaço, totalmente privado, tem 2 unidades de A/C, cozinha totalmente equipada e 2 casas de banho privativas com água quente. O lugar de estacionamento é privado, para um carro, e situa-se fora da propriedade. A casa tem um alpendre para os nossos hóspedes. ✓ A/C ✓ cozinha ✓ wifi ✓ alpendre privado ✓ estacionamento privado.",
        "Todos os espaços aqui descritos são privados, incluindo a cozinha e as casas de banho totalmente equipadas. Terá tudo o que precisa para se sentir em casa.",
        "Perto daqui poderá encontrar restaurantes, supermercados e aluguer de bicicletas. Confiamos que os nossos hóspedes seguirão o bom senso ao sair da nossa casa; por isso, não temos regras de saída nem lista de check-out.",
        "Tem algum pedido especial? Teremos todo o gosto em atendê-lo(a), se pudermos. Não hesite em informar-nos.",
        "Puerto Viejo é um destino popular para turistas de todo o mundo, graças à sua paisagem deslumbrante. A vila tem praias imensas rodeadas de floresta tropical, além de dois Parques Nacionais (Manzanillo e Cahuita). À noite, a vila ganha vida com uma animada e vibrante vida noturna. Ao ficar aqui, poderá mergulhar por completo em tudo o que torna Puerto Viejo único.",
      ],
    },
    hi: {
      seoTitle: "Casa Giulia - पारिवारिक रिट्रीट",
      seoDescription:
        "खूबसूरत प्लाया चिकिता समुद्र तट से मात्र 200 मीटर की दूरी पर स्थित, कैरिबियन के सबसे सुरक्षित और शांत इलाकों में से एक में, ए/सी वाले नए पूरी तरह सुसज्जित बंगले। 4 लोगों तक के परिवारों के लिए बिल्कुल उपयुक्त।",
      heading: "Casa Giulia",
      featureName: "घर Giulia",
      checkIn: "दोपहर 3:00 बजे",
      checkOut: "दोपहर 12:00 बजे (मध्याह्न)",
      paragraphs: [
        "ए/सी, गैस रसोई और एक विशाल अलमारी वाले हमारे घर में प्वेर्तो वियेहो की भागदौड़ से दूर छुट्टियां बिताएं। अपने निजी ढके हुए आंगन (पैटियो) में आराम करें। हमारा घर शानदार प्लाया चिकिता समुद्र तट से मात्र 200 मीटर की दूरी पर, कैरिबियन के सबसे सुरक्षित और शांत इलाकों में से एक में स्थित है। हमारे बेहतरीन स्थान से प्वेर्तो वियेहो, मानसानियो, पुंटा उवा समुद्र तट और अरेसिफे जैसे आस-पास के आकर्षणों को घूमें।",
        "यह पूरी तरह निजी स्थान है, जिसमें 2 ए/सी यूनिट, पूरी तरह सुसज्जित रसोई और गर्म पानी वाले 2 निजी बाथरूम हैं। पार्किंग की जगह निजी है, एक गाड़ी के लिए, और संपत्ति के बाहर स्थित है। घर में हमारे मेहमानों के लिए एक बरामदा (पोर्च) भी है। ✓ ए/सी ✓ रसोई ✓ वाईफाई ✓ निजी बरामदा ✓ निजी पार्किंग।",
        "यहां बताई गई सभी जगहें निजी हैं, जिनमें पूरी तरह सुसज्जित रसोई और दोनों बाथरूम शामिल हैं। घर जैसा महसूस करने के लिए आपको जो कुछ भी चाहिए, वह सब यहां मौजूद होगा।",
        "आस-पास आपको रेस्तरां, सुपरमार्केट और बाइक किराए पर लेने की सुविधाएं मिल जाएंगी। हमें अपने मेहमानों पर भरोसा है कि वे घर छोड़ते समय सामान्य समझ का पालन करेंगे, इसीलिए हमारे यहां चेक-आउट के लिए कोई नियम नहीं हैं और कोई चेक-आउट सूची भी नहीं है।",
        "क्या आपका कोई विशेष अनुरोध है? यदि हम कर सकें, तो हमें आपकी मदद करके बेहद खुशी होगी। कृपया हमें बताने में संकोच न करें।",
        "प्वेर्तो वियेहो अपने शानदार प्राकृतिक परिवेश की बदौलत दुनियाभर के पर्यटकों के बीच एक लोकप्रिय गंतव्य है। इस कस्बे में विशाल समुद्र तट हैं जो उष्णकटिबंधीय वर्षावन से घिरे हुए हैं, साथ ही यहां दो राष्ट्रीय उद्यान भी हैं (मानसानियो और काहुइटा)। रात होते ही यह कस्बा जीवंत और सक्रिय नाइटलाइफ़ के साथ जाग उठता है। यहां ठहरने के दौरान आप उस हर चीज़ में पूरी तरह डूब सकेंगे, जो प्वेर्तो वियेहो को अनूठा बनाती है।",
      ],
    },
    nl: {
      seoTitle: "Casa Giulia - Familieretraite",
      seoDescription:
        "Nieuwe, volledig uitgeruste bungalows met airconditioning op 200 meter van het prachtige strand Playa Chiquita, in een van de veiligste en rustigste buurten van de Caraïben. Perfect voor gezinnen tot 4 personen.",
      heading: "Casa Giulia",
      featureName: "Huis Giulia",
      checkIn: "15:00",
      checkOut: "12:00 (middag)",
      paragraphs: [
        "Ontsnap naar Puerto Viejo in ons huis met airconditioning, een gaskeuken en een ruime kledingkast. Ontspan op je eigen overdekte privéterras. Ons huis ligt op slechts 200 meter van het prachtige strand Playa Chiquita, in een van de veiligste en rustigste buurten van de Caraïben. Verken vanaf onze perfecte locatie de omgeving, met onder meer Puerto Viejo, Manzanillo, het strand van Punta Uva en Arrecife.",
        "De volledig private ruimte beschikt over 2 airco-units, een volledig uitgeruste keuken en 2 eigen badkamers met warm water. De parkeerplaats is privé, voor één auto, en bevindt zich buiten het perceel. Het huis heeft een veranda voor onze gasten. ✓ airco ✓ keuken ✓ wifi ✓ privéveranda ✓ privéparkeren.",
        "Alle hier beschreven ruimtes zijn privé, inclusief de volledig uitgeruste keuken en badkamers. Je hebt alles wat je nodig hebt om je meteen thuis te voelen.",
        "Restaurants, supermarkten en fietsverhuur vind je op loopafstand. We vertrouwen erop dat onze gasten gezond verstand gebruiken bij het verlaten van het huis, daarom hanteren we geen uitcheckregels en geen uitchecklijst.",
        "Heb je een speciaal verzoek? We helpen je graag verder als het mogelijk is. Aarzel niet om het ons te laten weten.",
        "Puerto Viejo is dankzij zijn adembenemende omgeving een geliefde bestemming voor toeristen van over de hele wereld. Het dorp heeft uitgestrekte stranden omzoomd door tropisch regenwoud, en telt twee nationale parken (Manzanillo en Cahuita). 's Avonds komt het dorp tot leven met een levendig en actief nachtleven. Tijdens je verblijf hier ga je volledig op in alles wat Puerto Viejo uniek maakt.",
      ],
    },
  },
  Pappagallo: {
    en: {
      seoTitle: "Casa Pappagallo - Fully equipped Home in Puerto Viejo",
      seoDescription:
        "Welcome to Kalawala, a charming complex of two apartments located in the heart of Puerto Viejo. Each apartment is built entirely of wood and is situated above a delightful Italian bakery and are equipped with everything you need for a comfortable stay.",
      heading: "Casa Pappagallo",
      featureName: "House Pappagallo",
      checkIn: "2:00 PM",
      checkOut: "11:00 AM",
      paragraphs: [
        "Welcome to Kalawala, a charming complex of two apartments located in the heart of Puerto Viejo. Each apartment is built entirely of wood and is situated above a delightful Italian bakery. The apartments are equipped with everything you need for a comfortable stay, including a fully equipped kitchen, two cozy bedrooms, a lovely terrace, two A/C units, and one well equipped bathroom.",
        "All of the spaces described here are private, including the fully equipped kitchen and bathroom. You'll have everything you need to make yourself at home.",
        "We offer cleaning services for reservations of 5 nights or longer. Our team will contact you during your stay to coordinate a convenient time for the cleaning.",
        "Do you have a special request? We would be more than happy to accommodate you if we can. Please don't hesitate to let us know.",
        "If you require a pack - and - play crib during your stay, please inform us ahead of time. We'll make sure to set it up in your room during our cleaning process.",
        "Puerto Viejo is a popular destination for tourists from all over the world, thanks to its stunning surroundings. The town boasts immense beaches that are surrounded by tropical rainforest, as well as two National Parks (Manzanillo and Cahuita). At night, the town comes alive with a lively and active nightlife scene. When you stay here, you'll be able to fully immerse yourself in everything that makes Puerto Viejo unique.",
        "The house is located close to beach access that eventually leads to Cocles. Along the way, you'll have the opportunity to spot a variety of animals and admire natural pools in the coral. There's even a hidden sightseeing spot waiting to be discovered!",
        "Getting around in Puerto Viejo and its surroundings is easiest by renting a bike or a scooter. However, there is also a reliable public bus service available that can take you to Cahuita, Manzanillo, and Sixaola. If you prefer to drive, we can accommodate cars as well. We offer private parking but please let us know if you have a larger pickup truck that requires additional space.",
      ],
    },
    es: {
      seoTitle: "Casa Pappagallo - Casa Totalmente Equipada en Puerto Viejo",
      seoDescription:
        "Bienvenido a Kalawala, un complejo encantador de dos apartamentos ubicado en el corazón de Puerto Viejo. Cada apartamento está construido completamente de madera y está situado encima de una deliciosa panadería italiana y están equipados con todo lo que necesitas para una estancia cómoda.",
      heading: "Casa Pappagallo",
      featureName: "Casa Pappagallo",
      checkIn: "2:00 PM",
      checkOut: "11:00 AM",
      paragraphs: [
        "Bienvenido a Kalawala. Esta casa ofrece una experiencia encantadora en el corazón de Puerto Viejo con un encantador apartamento de madera ubicado encima de una panadería italiana. El apartamento cuenta con dos cómodas habitaciones, un baño bien equipado, una cocina totalmente equipada, una hermosa terraza y dos unidades de aire acondicionado, lo que garantiza una estancia acogedora.",
        "Todos los espacios aquí descritos son privados, incluyendo la cocina y el baño totalmente equipados. Tendrás todo lo que necesitas para sentirte como en casa.",
        "Ofrecemos el servicio de limpieza para reservas de 5 noches o más. Nuestro equipo se contactará contigo durante tu estadía para coordinar una hora conveniente para la limpieza.",
        "¿Tienes alguna petición específica? Nos encantaría complacerla lo mejor que podamos. Por favor, no dudes en hacérnoslo saber.",
        "Si requieres de una cuna durante tu estadía, háznoslo saber en tu reservación. Nos encargaremos de prepararla en la habitación antes de tu llegada.",
        "Puerto Viejo es un popular destino para los turistas de todo el mundo, gracias a sus espectaculares alrededores. El pueblo cuenta con inmensas playas rodeadas por el bosque tropical lluvioso, además de dos Parques Nacionales (Manzanillo y Cahuita). De noche, el pueblo cobra vida con una vibrante y activa escena nocturna. Cuando te hospedas aquí, serás capaz de adentrarte en todo lo que hace a Puerto Viejo único.",
        "La casa está localizada cerca del acceso a la playa que eventualmente lleva a la playa Cocles. A lo largo del camino tendrás la oportunidad de avistar una variedad de animales y admirar las piscinas naturales que se forman en el coral. ¡Incluso hay un mirador oculto esperando a que lo descubras!",
        "Moverse por Puerto Viejo y sus alrededores es más fácil si rentas una bicicleta o un scooter. Aunque, si no te interesa esta opción, también hay un servicio de bus público muy confiable que te puede llevar a Cahuita, Manzanillo y Sixaola. Si prefieres conducir, podemos proporcionar el servicio de alquiler de autos también. Ofrecemos parqueo privado, solo haznos saber si tienes una camioneta grande que requiera de algo de espacio adicional para parquear.",
      ],
    },
    fr: {
      seoTitle: "Casa Pappagallo - Maison entièrement équipée à Puerto Viejo",
      seoDescription:
        "Bienvenue à Kalawala, un charmant complexe de deux appartements situé au cœur de Puerto Viejo. Chaque appartement est entièrement construit en bois et se trouve au-dessus d'une délicieuse boulangerie italienne, et ils sont équipés de tout ce dont vous avez besoin pour un séjour confortable.",
      heading: "Casa Pappagallo",
      featureName: "Maison Pappagallo",
      checkIn: "14h00",
      checkOut: "11h00",
      paragraphs: [
        "Bienvenue à Kalawala, un charmant complexe de deux appartements situé au cœur de Puerto Viejo. Chaque appartement est entièrement construit en bois et se trouve au-dessus d'une délicieuse boulangerie italienne. Les appartements sont équipés de tout ce dont vous avez besoin pour un séjour confortable, y compris une cuisine entièrement équipée, deux chambres douillettes, une charmante terrasse, deux unités de climatisation et une salle de bain bien équipée.",
        "Tous les espaces décrits ici sont privés, y compris la cuisine entièrement équipée et la salle de bain. Vous aurez tout ce qu'il vous faut pour vous sentir chez vous.",
        "Nous proposons un service de ménage pour les réservations de 5 nuits ou plus. Notre équipe vous contactera pendant votre séjour afin de convenir d'un horaire de ménage qui vous convient.",
        "Avez-vous une demande particulière ? Nous serions plus que ravis de vous satisfaire si cela nous est possible. N'hésitez pas à nous le faire savoir.",
        "Si vous avez besoin d'un lit parapluie pendant votre séjour, merci de nous en informer à l'avance. Nous nous chargerons de l'installer dans votre chambre lors de notre passage de ménage.",
        "Puerto Viejo est une destination très prisée des touristes du monde entier, grâce à son cadre naturel exceptionnel. La ville s'enorgueillit de vastes plages bordées par la forêt tropicale, ainsi que de deux parcs nationaux (Manzanillo et Cahuita). La nuit, la ville s'anime grâce à une vie nocturne dynamique et animée. En séjournant ici, vous pourrez pleinement vous immerger dans tout ce qui fait l'unicité de Puerto Viejo.",
        "La maison est située à proximité d'un accès à la plage qui mène finalement à Cocles. En chemin, vous aurez l'occasion d'observer une variété d'animaux et d'admirer les piscines naturelles dans le corail. Il existe même un point de vue caché qui n'attend que d'être découvert !",
        "Pour se déplacer à Puerto Viejo et dans ses environs, le plus simple est de louer un vélo ou un scooter. Il existe également un service de bus public fiable qui peut vous emmener à Cahuita, Manzanillo et Sixaola. Si vous préférez conduire, nous pouvons également accueillir des voitures. Nous proposons un stationnement privé, mais merci de nous prévenir si vous avez un pick-up de grande taille nécessitant un espace supplémentaire.",
      ],
    },
    de: {
      seoTitle: "Casa Pappagallo – Voll ausgestattetes Haus in Puerto Viejo",
      seoDescription:
        "Willkommen bei Kalawala, einem charmanten Komplex aus zwei Apartments im Herzen von Puerto Viejo. Jedes Apartment ist vollständig aus Holz gebaut und befindet sich über einer entzückenden italienischen Bäckerei. Sie sind mit allem ausgestattet, was Sie für einen komfortablen Aufenthalt benötigen.",
      heading: "Casa Pappagallo",
      featureName: "Haus Pappagallo",
      checkIn: "14:00 Uhr",
      checkOut: "11:00 Uhr",
      paragraphs: [
        "Willkommen bei Kalawala, einem charmanten Komplex aus zwei Apartments im Herzen von Puerto Viejo. Jedes Apartment ist vollständig aus Holz gebaut und befindet sich über einer entzückenden italienischen Bäckerei. Die Apartments sind mit allem ausgestattet, was Sie für einen komfortablen Aufenthalt benötigen, darunter eine voll ausgestattete Küche, zwei gemütliche Schlafzimmer, eine schöne Terrasse, zwei Klimaanlagen und ein gut ausgestattetes Badezimmer.",
        "Alle hier beschriebenen Räume sind privat, einschließlich der voll ausgestatteten Küche und des Badezimmers. Sie haben alles, was Sie brauchen, um sich wie zu Hause zu fühlen.",
        "Wir bieten Reinigungsservice für Aufenthalte ab 5 Nächten an. Unser Team wird sich während Ihres Aufenthalts mit Ihnen in Verbindung setzen, um einen passenden Termin für die Reinigung zu vereinbaren.",
        "Haben Sie einen besonderen Wunsch? Wir erfüllen ihn Ihnen gerne, wenn es uns möglich ist. Zögern Sie nicht, es uns mitzuteilen.",
        "Falls Sie während Ihres Aufenthalts ein Reisebett (Pack-and-Play) benötigen, teilen Sie uns dies bitte im Voraus mit. Wir sorgen dafür, dass es während unseres Reinigungsprozesses in Ihrem Zimmer aufgestellt wird.",
        "Puerto Viejo ist dank seiner atemberaubenden Umgebung ein beliebtes Reiseziel für Touristen aus aller Welt. Der Ort verfügt über weitläufige Strände, die von tropischem Regenwald umgeben sind, sowie über zwei Nationalparks (Manzanillo und Cahuita). Nachts erwacht der Ort mit einem lebendigen und aktiven Nachtleben zum Leben. Während Ihres Aufenthalts hier können Sie vollständig in alles eintauchen, was Puerto Viejo einzigartig macht.",
        "Das Haus liegt in der Nähe eines Strandzugangs, der schließlich nach Cocles führt. Unterwegs haben Sie die Möglichkeit, verschiedene Tiere zu entdecken und die natürlichen Pools im Korallenriff zu bewundern. Es gibt sogar einen versteckten Aussichtspunkt, der nur darauf wartet, entdeckt zu werden!",
        "Am einfachsten bewegen Sie sich in Puerto Viejo und Umgebung mit einem gemieteten Fahrrad oder Roller fort. Es gibt aber auch einen zuverlässigen öffentlichen Busservice, der Sie nach Cahuita, Manzanillo und Sixaola bringt. Wenn Sie lieber mit dem Auto fahren möchten, können wir das ebenfalls ermöglichen. Wir bieten privates Parken an, bitte teilen Sie uns jedoch mit, wenn Sie einen größeren Pickup-Truck haben, der zusätzlichen Platz benötigt.",
      ],
    },
    he: {
      seoTitle: "Casa Pappagallo - בית מאובזר במלואו בפוארטו ויחו",
      seoDescription:
        "ברוכים הבאים ל-Kalawala, קומפלקס מקסים של שתי דירות הממוקם בלב פוארטו ויחו. כל דירה בנויה כולה מעץ וממוקמת מעל מאפייה איטלקית מענגת, ומצוידת בכל מה שאתם צריכים לשהות נוחה.",
      heading: "Casa Pappagallo",
      featureName: "בית Pappagallo",
      checkIn: "14:00",
      checkOut: "11:00",
      paragraphs: [
        "ברוכים הבאים ל-Kalawala, קומפלקס מקסים של שתי דירות הממוקם בלב פוארטו ויחו. כל דירה בנויה כולה מעץ וממוקמת מעל מאפייה איטלקית מענגת. הדירות מצוידות בכל מה שאתם צריכים לשהות נוחה, כולל מטבח מאובזר במלואו, שני חדרי שינה נעימים, מרפסת יפהפייה, שתי יחידות מיזוג אוויר וחדר רחצה אחד מאובזר היטב.",
        "כל המרחבים המתוארים כאן הם פרטיים, כולל המטבח המאובזר במלואו וחדר הרחצה. יהיה לכם כל מה שאתם צריכים כדי להרגיש כמו בבית.",
        "אנחנו מציעים שירותי ניקיון להזמנות של 5 לילות או יותר. הצוות שלנו ייצור איתכם קשר במהלך השהות כדי לתאם זמן נוח לניקיון.",
        "יש לכם בקשה מיוחדת? נשמח מאוד להיענות לה אם נוכל. אל תהססו לספר לנו.",
        "אם אתם זקוקים למיטת תינוק ניידת (pack-and-play) במהלך השהות, אנא עדכנו אותנו מראש. נדאג להציב אותה בחדרכם במהלך תהליך הניקיון.",
        "פוארטו ויחו הוא יעד מבוקש לתיירים מכל רחבי העולם, בזכות הנוף המרהיב שלו. לעיירה חופים עצומים המוקפים ביער גשם טרופי, וכן שני פארקים לאומיים (מנסניו וקאוויטה). בלילה, העיירה קמה לתחייה עם חיי לילה תוססים ופעילים. כשתתארחו כאן, תוכלו לחוות באופן מלא כל מה שהופך את פוארטו ויחו למקום כה מיוחד.",
        "הבית ממוקם בקרבת גישה לחוף המובילה בסופו של דבר לקוקלס. בדרך, תהיה לכם הזדמנות להבחין במגוון בעלי חיים ולהתפעל מבריכות טבעיות באלמוגים. יש אפילו נקודת תצפית נסתרת המחכה להתגלות!",
        "הדרך הקלה ביותר להתנייד בפוארטו ויחו ובסביבתה היא באמצעות השכרת אופניים או קטנוע. עם זאת, קיים גם שירות אוטובוסים ציבורי אמין שיכול לקחת אתכם לקאוויטה, מנסניו וסיקסאולה. אם אתם מעדיפים לנסוע ברכב, נוכל להתאים גם לכך. אנחנו מציעים חניה פרטית, אך אנא הודיעו לנו אם ברשותכם טנדר גדול שדורש שטח חניה נוסף.",
      ],
    },
    it: {
      seoTitle: "Casa Pappagallo - Casa Completamente Attrezzata a Puerto Viejo",
      seoDescription:
        "Benvenuti a Kalawala, un affascinante complesso di due appartamenti situato nel cuore di Puerto Viejo. Ogni appartamento è costruito interamente in legno e si trova sopra una deliziosa panetteria italiana, ed è attrezzato con tutto il necessario per un soggiorno confortevole.",
      heading: "Casa Pappagallo",
      featureName: "Casa Pappagallo",
      checkIn: "14:00",
      checkOut: "11:00",
      paragraphs: [
        "Benvenuti a Kalawala, un affascinante complesso di due appartamenti situato nel cuore di Puerto Viejo. Ogni appartamento è costruito interamente in legno e si trova sopra una deliziosa panetteria italiana. Gli appartamenti sono attrezzati con tutto il necessario per un soggiorno confortevole, tra cui una cucina completamente attrezzata, due accoglienti camere da letto, una splendida terrazza, due unità di aria condizionata e un bagno ben attrezzato.",
        "Tutti gli spazi qui descritti sono privati, inclusi la cucina completamente attrezzata e il bagno. Avrai tutto il necessario per sentirti come a casa tua.",
        "Offriamo un servizio di pulizia per prenotazioni di 5 notti o più. Il nostro team ti contatterà durante il soggiorno per concordare un orario conveniente per le pulizie.",
        "Hai una richiesta speciale? Saremo più che felici di accontentarti, se possibile. Non esitare a farcelo sapere.",
        "Se hai bisogno di un lettino da campeggio (pack-and-play) durante il tuo soggiorno, faccelo sapere in anticipo. Ci assicureremo di sistemarlo nella tua camera durante il processo di pulizia.",
        "Puerto Viejo è una destinazione molto amata dai turisti di tutto il mondo, grazie ai suoi paesaggi mozzafiato. Il paese vanta spiagge immense circondate dalla foresta pluviale tropicale, oltre a due Parchi Nazionali (Manzanillo e Cahuita). Di notte, il paese si anima con una vivace e movimentata vita notturna. Soggiornando qui, potrai immergerti completamente in tutto ciò che rende Puerto Viejo unico.",
        "La casa si trova vicino a un accesso alla spiaggia che porta infine a Cocles. Lungo il percorso avrai l'opportunità di avvistare diversi animali e ammirare le piscine naturali nella barriera corallina. C'è persino un punto panoramico nascosto tutto da scoprire!",
        "Il modo più semplice per spostarsi a Puerto Viejo e nei dintorni è noleggiare una bicicletta o uno scooter. È comunque disponibile anche un affidabile servizio di autobus pubblici che può portarti a Cahuita, Manzanillo e Sixaola. Se preferisci guidare, possiamo accogliere anche le auto. Offriamo parcheggio privato, ma facci sapere se hai un pick-up di grandi dimensioni che richiede spazio aggiuntivo.",
      ],
    },
    pt: {
      seoTitle: "Casa Pappagallo - Casa Totalmente Equipada em Puerto Viejo",
      seoDescription:
        "Bem-vindo à Kalawala, um encantador complexo de dois apartamentos situado no coração de Puerto Viejo. Cada apartamento é construído inteiramente em madeira e está situado por cima de uma deliciosa padaria italiana, estando equipados com tudo o que precisa para uma estadia confortável.",
      heading: "Casa Pappagallo",
      featureName: "Casa Pappagallo",
      checkIn: "14h00",
      checkOut: "11h00",
      paragraphs: [
        "Bem-vindo à Kalawala, um encantador complexo de dois apartamentos situado no coração de Puerto Viejo. Cada apartamento é construído inteiramente em madeira e está situado por cima de uma deliciosa padaria italiana. Os apartamentos estão equipados com tudo o que precisa para uma estadia confortável, incluindo uma cozinha totalmente equipada, dois quartos acolhedores, um terraço encantador, 2 unidades de A/C e uma casa de banho bem equipada.",
        "Todos os espaços aqui descritos são privados, incluindo a cozinha e a casa de banho totalmente equipadas. Terá tudo o que precisa para se sentir em casa.",
        "Oferecemos serviço de limpeza para reservas de 5 noites ou mais. A nossa equipa entrará em contacto consigo durante a sua estadia para combinar um horário conveniente para a limpeza.",
        "Tem algum pedido especial? Teremos todo o gosto em atendê-lo(a), se pudermos. Não hesite em informar-nos.",
        "Se precisar de um berço de viagem durante a sua estadia, por favor informe-nos com antecedência. Iremos garantir que fica montado no seu quarto durante o processo de limpeza.",
        "Puerto Viejo é um destino popular para turistas de todo o mundo, graças à sua paisagem deslumbrante. A vila tem praias imensas rodeadas de floresta tropical, além de dois Parques Nacionais (Manzanillo e Cahuita). À noite, a vila ganha vida com uma animada e vibrante vida noturna. Ao ficar aqui, poderá mergulhar por completo em tudo o que torna Puerto Viejo único.",
        "A casa está localizada perto de um acesso à praia que leva, eventualmente, até Cocles. Pelo caminho, terá a oportunidade de avistar uma variedade de animais e admirar piscinas naturais no coral. Há mesmo um miradouro escondido à espera de ser descoberto!",
        "A forma mais fácil de se deslocar em Puerto Viejo e arredores é alugando uma bicicleta ou uma scooter. No entanto, também existe um serviço de autocarro público fiável que o pode levar a Cahuita, Manzanillo e Sixaola. Se preferir conduzir, também podemos acomodar automóveis. Oferecemos estacionamento privado, mas avise-nos se tiver uma carrinha pick-up maior que precise de espaço adicional.",
      ],
    },
    hi: {
      seoTitle: "Casa Pappagallo - प्वेर्तो वियेहो में पूरी तरह सुसज्जित घर",
      seoDescription:
        "Kalawala में आपका स्वागत है, प्वेर्तो वियेहो के बीचोंबीच स्थित दो अपार्टमेंट्स का एक आकर्षक परिसर। हर अपार्टमेंट पूरी तरह लकड़ी से बना है और एक बेहतरीन इतालवी बेकरी के ऊपर स्थित है, और आरामदायक ठहरने के लिए ज़रूरी हर चीज़ से सुसज्जित है।",
      heading: "Casa Pappagallo",
      featureName: "घर Pappagallo",
      checkIn: "दोपहर 2:00 बजे",
      checkOut: "सुबह 11:00 बजे",
      paragraphs: [
        "Kalawala में आपका स्वागत है, प्वेर्तो वियेहो के बीचोंबीच स्थित दो अपार्टमेंट्स का एक आकर्षक परिसर। हर अपार्टमेंट पूरी तरह लकड़ी से बना है और एक बेहतरीन इतालवी बेकरी के ऊपर स्थित है। अपार्टमेंट्स आरामदायक ठहरने के लिए ज़रूरी हर चीज़ से सुसज्जित हैं, जिनमें पूरी तरह सुसज्जित रसोई, दो आरामदायक शयनकक्ष, एक खूबसूरत छत (टैरेस), दो ए/सी यूनिट और एक सुव्यवस्थित बाथरूम शामिल है।",
        "यहां बताई गई सभी जगहें निजी हैं, जिनमें पूरी तरह सुसज्जित रसोई और बाथरूम शामिल हैं। घर जैसा महसूस करने के लिए आपको जो कुछ भी चाहिए, वह सब यहां मौजूद होगा।",
        "5 रातों या उससे अधिक की बुकिंग के लिए हम सफाई सेवा प्रदान करते हैं। सफाई के लिए सुविधाजनक समय तय करने हेतु हमारी टीम आपके ठहरने के दौरान आपसे संपर्क करेगी।",
        "क्या आपका कोई विशेष अनुरोध है? यदि हम कर सकें, तो हमें आपकी मदद करके बेहद खुशी होगी। कृपया हमें बताने में संकोच न करें।",
        "यदि आपको अपने ठहरने के दौरान पैक-एंड-प्ले क्रिब (बच्चों के लिए पालना) चाहिए, तो कृपया हमें पहले से सूचित करें। हम सफाई के दौरान इसे आपके कमरे में लगाना सुनिश्चित करेंगे।",
        "प्वेर्तो वियेहो अपने शानदार प्राकृतिक परिवेश की बदौलत दुनियाभर के पर्यटकों के बीच एक लोकप्रिय गंतव्य है। इस कस्बे में विशाल समुद्र तट हैं जो उष्णकटिबंधीय वर्षावन से घिरे हुए हैं, साथ ही यहां दो राष्ट्रीय उद्यान भी हैं (मानसानियो और काहुइटा)। रात होते ही यह कस्बा जीवंत और सक्रिय नाइटलाइफ़ के साथ जाग उठता है। यहां ठहरने के दौरान आप उस हर चीज़ में पूरी तरह डूब सकेंगे, जो प्वेर्तो वियेहो को अनूठा बनाती है।",
        "यह घर समुद्र तट के उस रास्ते के पास स्थित है जो अंततः कॉक्लेस तक ले जाता है। रास्ते में आपको विभिन्न प्रकार के जानवर देखने और प्रवाल में बने प्राकृतिक जलकुंडों को निहारने का मौका मिलेगा। यहां तक कि एक छिपा हुआ दर्शनीय स्थल भी है, जो खोजे जाने का इंतज़ार कर रहा है!",
        "प्वेर्तो वियेहो और इसके आसपास घूमने-फिरने का सबसे आसान तरीका है बाइक या स्कूटर किराए पर लेना। हालांकि, एक भरोसेमंद सार्वजनिक बस सेवा भी उपलब्ध है, जो आपको काहुइटा, मानसानियो और सिक्सोला तक ले जा सकती है। यदि आप गाड़ी चलाना पसंद करते हैं, तो हम कारों की भी व्यवस्था कर सकते हैं। हम निजी पार्किंग की सुविधा देते हैं, लेकिन कृपया हमें बताएं यदि आपके पास एक बड़ा पिकअप ट्रक है जिसे अतिरिक्त जगह चाहिए।",
      ],
    },
    nl: {
      seoTitle: "Casa Pappagallo - Volledig Uitgerust Huis in Puerto Viejo",
      seoDescription:
        "Welkom bij Kalawala, een charmant complex van twee appartementen in het hart van Puerto Viejo. Elk appartement is volledig van hout gebouwd en bevindt zich boven een heerlijke Italiaanse bakkerij, en is voorzien van alles wat je nodig hebt voor een comfortabel verblijf.",
      heading: "Casa Pappagallo",
      featureName: "Huis Pappagallo",
      checkIn: "14:00",
      checkOut: "11:00",
      paragraphs: [
        "Welkom bij Kalawala, een charmant complex van twee appartementen in het hart van Puerto Viejo. Elk appartement is volledig van hout gebouwd en bevindt zich boven een heerlijke Italiaanse bakkerij. De appartementen zijn voorzien van alles wat je nodig hebt voor een comfortabel verblijf, waaronder een volledig uitgeruste keuken, twee gezellige slaapkamers, een lief terras, twee airco-units en een goed uitgeruste badkamer.",
        "Alle hier beschreven ruimtes zijn privé, inclusief de volledig uitgeruste keuken en badkamer. Je hebt alles wat je nodig hebt om je meteen thuis te voelen.",
        "Voor boekingen van 5 nachten of langer bieden we schoonmaakdiensten aan. Ons team neemt tijdens je verblijf contact met je op om een geschikt moment voor de schoonmaak af te spreken.",
        "Heb je een speciaal verzoek? We helpen je graag verder als het mogelijk is. Aarzel niet om het ons te laten weten.",
        "Heb je tijdens je verblijf een reisbedje nodig? Laat het ons van tevoren weten, dan zorgen we dat het tijdens de schoonmaak in je kamer klaarstaat.",
        "Puerto Viejo is dankzij zijn adembenemende omgeving een geliefde bestemming voor toeristen van over de hele wereld. Het dorp heeft uitgestrekte stranden omzoomd door tropisch regenwoud, en telt twee nationale parken (Manzanillo en Cahuita). 's Avonds komt het dorp tot leven met een levendig en actief nachtleven. Tijdens je verblijf hier ga je volledig op in alles wat Puerto Viejo uniek maakt.",
        "Het huis ligt vlak bij een strandtoegang die uiteindelijk naar Cocles leidt. Onderweg kun je allerlei dieren spotten en genieten van natuurlijke zwembaden in het koraal. Er wacht zelfs een verborgen uitkijkpunt om ontdekt te worden!",
        "De makkelijkste manier om je in Puerto Viejo en omgeving te verplaatsen is met een gehuurde fiets of scooter. Er is ook een betrouwbare openbare busdienst die je naar Cahuita, Manzanillo en Sixaola brengt. Rijd je liever zelf, dan is dat ook mogelijk. We bieden privéparkeren aan, maar laat het ons weten als je een grotere pick-uptruck hebt die extra ruimte nodig heeft.",
      ],
    },
  },
  Plumeria: {
    en: {
      seoTitle: "Casa Plumeria - Couples Retreat",
      seoDescription:
        "New fully equipped Bungalows with A/C located 200mts from the beautiful Playa Chiquita beach, in one of the safest and calm neighborhoods in the Caribbean. A few minutes from Puerto Viejo and Manzanillo, we are perfectly located to visit Punta Uva beach and Arrecife.",
      heading: "Casa Plumeria",
      featureName: "House Plumeria",
      checkIn: "3:00 PM",
      checkOut: "12:00 PM (noon)",
      paragraphs: [
        "New fully equipped Bungalows with A/C located 200mts from the beautiful Playa Chiquita beach, in one of the safest and calm neighborhoods in the Caribbean. A few minutes from Puerto Viejo and Manzanillo, we are perfectly located to visit Punta Uva beach and Arrecife.",
        "The space, completely private, has A/C, fully equipped kitchen, a private bathroom with hot water. The parking space is private, spacious and outside of the property. Every house has a small porch for our guests.",
        "Close by you may find restaurants, supermarkets, and bike rentals. We trust our guests to follow common sense when leaving our house, that's why we have 0 check-out rules and no check-out list.",
        "Do you have a special request? We would be more than happy to accommodate you if we can. Please don't hesitate to let us know.",
        "Puerto Viejo is a popular destination for tourists from all over the world, thanks to its stunning surroundings. The town boasts immense beaches that are surrounded by tropical rainforest, as well as two National Parks (Manzanillo and Cahuita). At night, the town comes alive with a lively and active nightlife scene. When you stay here, you'll be able to fully immerse yourself in everything that makes Puerto Viejo unique.",
      ],
    },
    es: {
      seoTitle: "Casa Plumeria - Retiro para Parejas",
      seoDescription:
        "Nuevos bungalows totalmente equipados con A/C ubicados a 200mts de la hermosa playa Playa Chiquita, en uno de los barrios más seguros y tranquilos del Caribe. A pocos minutos de Puerto Viejo y Manzanillo, estamos perfectamente ubicados para visitar la playa Punta Uva y Arrecife.",
      heading: "Casa Plumeria",
      featureName: "Casa Plumeria",
      checkIn: "3:00 PM",
      checkOut: "12:00 PM (mediodía)",
      paragraphs: [
        "Nuevos bungalows totalmente equipados con A/C ubicados a 200mts de la hermosa playa Playa Chiquita, en uno de los barrios más seguros y tranquilos del Caribe. A pocos minutos de Puerto Viejo y Manzanillo, estamos perfectamente ubicados para visitar la playa Punta Uva y Arrecife.",
        "El espacio, completamente privado, tiene A/C, cocina totalmente equipada, un baño privado con agua caliente. El espacio de estacionamiento es privado, espacioso y fuera de la propiedad. Cada casa tiene un pequeño porche para nuestros huéspedes.",
        "Todos los espacios descritos aquí son privados, incluida la cocina y el baño totalmente equipado. Tendrás todo lo que necesitas para sentirte como en casa.",
        "Cerca puedes encontrar restaurantes, supermercados y alquiler de bicicletas. Confiamos en nuestros huéspedes para seguir el sentido común al salir de nuestra casa, por eso tenemos 0 reglas de salida y ninguna lista de salida.",
        "¿Tienes alguna petición especial? Estaríamos más que felices de acomodarte si podemos. Por favor, no dudes en hacérnoslo saber.",
        "Puerto Viejo es un destino popular para turistas de todo el mundo, gracias a sus impresionantes alrededores. El pueblo cuenta con inmensas playas que están rodeadas de selva tropical, así como dos Parques Nacionales (Manzanillo y Cahuita). Por la noche, el pueblo cobra vida con una escena nocturna animada y activa. Cuando te hospedas aquí, podrás sumergirte completamente en todo lo que hace único a Puerto Viejo.",
      ],
    },
    fr: {
      seoTitle: "Casa Plumeria - Retraite pour couples",
      seoDescription:
        "Nouveaux bungalows entièrement équipés avec climatisation, situés à 200 mètres de la magnifique plage de Playa Chiquita, dans l'un des quartiers les plus sûrs et les plus paisibles des Caraïbes. À quelques minutes de Puerto Viejo et de Manzanillo, nous sommes idéalement situés pour visiter la plage de Punta Uva et Arrecife.",
      heading: "Casa Plumeria",
      featureName: "Maison Plumeria",
      checkIn: "15h00",
      checkOut: "12h00 (midi)",
      paragraphs: [
        "Nouveaux bungalows entièrement équipés avec climatisation, situés à 200 mètres de la magnifique plage de Playa Chiquita, dans l'un des quartiers les plus sûrs et les plus paisibles des Caraïbes. À quelques minutes de Puerto Viejo et de Manzanillo, nous sommes idéalement situés pour visiter la plage de Punta Uva et Arrecife.",
        "L'espace, entièrement privé, dispose de la climatisation, d'une cuisine entièrement équipée, d'une salle de bain privée avec eau chaude. Le stationnement est privé, spacieux et situé à l'extérieur de la propriété. Chaque maison dispose d'un petit porche pour nos hôtes.",
        "À proximité, vous trouverez des restaurants, des supermarchés et des locations de vélos. Nous faisons confiance à nos hôtes pour faire preuve de bon sens en quittant notre maison, c'est pourquoi nous n'avons aucune règle de départ ni liste de sortie.",
        "Avez-vous une demande particulière ? Nous serions plus que ravis de vous satisfaire si cela nous est possible. N'hésitez pas à nous le faire savoir.",
        "Puerto Viejo est une destination très prisée des touristes du monde entier, grâce à son cadre naturel exceptionnel. La ville s'enorgueillit de vastes plages bordées par la forêt tropicale, ainsi que de deux parcs nationaux (Manzanillo et Cahuita). La nuit, la ville s'anime grâce à une vie nocturne dynamique et animée. En séjournant ici, vous pourrez pleinement vous immerger dans tout ce qui fait l'unicité de Puerto Viejo.",
      ],
    },
    de: {
      seoTitle: "Casa Plumeria – Rückzugsort für Paare",
      seoDescription:
        "Neue, voll ausgestattete Bungalows mit Klimaanlage, nur 200 m vom wunderschönen Strand Playa Chiquita entfernt, in einem der sichersten und ruhigsten Viertel der Karibik. Nur wenige Minuten von Puerto Viejo und Manzanillo entfernt, sind wir perfekt gelegen, um den Strand Punta Uva und Arrecife zu besuchen.",
      heading: "Casa Plumeria",
      featureName: "Haus Plumeria",
      checkIn: "15:00 Uhr",
      checkOut: "12:00 Uhr (Mittag)",
      paragraphs: [
        "Neue, voll ausgestattete Bungalows mit Klimaanlage, nur 200 m vom wunderschönen Strand Playa Chiquita entfernt, in einem der sichersten und ruhigsten Viertel der Karibik. Nur wenige Minuten von Puerto Viejo und Manzanillo entfernt, sind wir perfekt gelegen, um den Strand Punta Uva und Arrecife zu besuchen.",
        "Der komplett private Bereich verfügt über eine Klimaanlage, eine voll ausgestattete Küche und ein privates Badezimmer mit Warmwasser. Der Parkplatz ist privat, geräumig und befindet sich außerhalb des Grundstücks. Jedes Haus verfügt über eine kleine Veranda für unsere Gäste.",
        "In der Nähe finden Sie Restaurants, Supermärkte und Fahrradverleihe. Wir vertrauen darauf, dass unsere Gäste beim Verlassen unseres Hauses gesunden Menschenverstand walten lassen, weshalb wir keine Check-out-Regeln und keine Check-out-Liste haben.",
        "Haben Sie einen besonderen Wunsch? Wir erfüllen ihn Ihnen gerne, wenn es uns möglich ist. Zögern Sie nicht, es uns mitzuteilen.",
        "Puerto Viejo ist dank seiner atemberaubenden Umgebung ein beliebtes Reiseziel für Touristen aus aller Welt. Der Ort verfügt über weitläufige Strände, die von tropischem Regenwald umgeben sind, sowie über zwei Nationalparks (Manzanillo und Cahuita). Nachts erwacht der Ort mit einem lebendigen und aktiven Nachtleben zum Leben. Während Ihres Aufenthalts hier können Sie vollständig in alles eintauchen, was Puerto Viejo einzigartig macht.",
      ],
    },
    he: {
      seoTitle: "Casa Plumeria - מקלט רומנטי לזוגות",
      seoDescription:
        "בונגלו חדש ומאובזר במלואו עם מיזוג אוויר, הממוקם 200 מטר מחוף פלאיה צ'יקיטה היפהפה, באחת השכונות הבטוחות והשקטות ביותר בקריביים. במרחק דקות ספורות מפוארטו ויחו ומנסניו, אנחנו ממוקמים במקום מושלם לביקור בחוף פונטה אובה ובאררסיפה.",
      heading: "Casa Plumeria",
      featureName: "בית Plumeria",
      checkIn: "15:00",
      checkOut: "12:00 בצהריים",
      paragraphs: [
        "בונגלו חדש ומאובזר במלואו עם מיזוג אוויר, הממוקם 200 מטר מחוף פלאיה צ'יקיטה היפהפה, באחת השכונות הבטוחות והשקטות ביותר בקריביים. במרחק דקות ספורות מפוארטו ויחו ומנסניו, אנחנו ממוקמים במקום מושלם לביקור בחוף פונטה אובה ובאררסיפה.",
        "המרחב, פרטי לחלוטין, כולל מיזוג אוויר, מטבח מאובזר במלואו וחדר רחצה פרטי עם מים חמים. חניית הרכב פרטית, מרווחת וממוקמת מחוץ לנכס. לכל בית יש מרפסת קטנה עבור האורחים שלנו.",
        "בקרבת מקום תוכלו למצוא מסעדות, סופרמרקטים והשכרת אופניים. אנחנו סומכים על האורחים שלנו שינהגו בשכל ישר בעת עזיבת הבית, ולכן אין לנו כללי צ'ק-אאוט ואין רשימת בדיקה ביציאה.",
        "יש לכם בקשה מיוחדת? נשמח מאוד להיענות לה אם נוכל. אל תהססו לספר לנו.",
        "פוארטו ויחו הוא יעד מבוקש לתיירים מכל רחבי העולם, בזכות הנוף המרהיב שלו. לעיירה חופים עצומים המוקפים ביער גשם טרופי, וכן שני פארקים לאומיים (מנסניו וקאוויטה). בלילה, העיירה קמה לתחייה עם חיי לילה תוססים ופעילים. כשתתארחו כאן, תוכלו לחוות באופן מלא כל מה שהופך את פוארטו ויחו למקום כה מיוחד.",
      ],
    },
    it: {
      seoTitle: "Casa Plumeria - Rifugio per Coppie",
      seoDescription:
        "Nuovi bungalow completamente attrezzati con aria condizionata, situati a 200 metri dalla splendida spiaggia di Playa Chiquita, in uno dei quartieri più sicuri e tranquilli dei Caraibi. A pochi minuti da Puerto Viejo e Manzanillo, siamo nella posizione perfetta per visitare la spiaggia di Punta Uva e Arrecife.",
      heading: "Casa Plumeria",
      featureName: "Casa Plumeria",
      checkIn: "15:00",
      checkOut: "12:00 (mezzogiorno)",
      paragraphs: [
        "Nuovi bungalow completamente attrezzati con aria condizionata, situati a 200 metri dalla splendida spiaggia di Playa Chiquita, in uno dei quartieri più sicuri e tranquilli dei Caraibi. A pochi minuti da Puerto Viejo e Manzanillo, siamo nella posizione perfetta per visitare la spiaggia di Punta Uva e Arrecife.",
        "Lo spazio, completamente privato, dispone di aria condizionata, cucina completamente attrezzata e bagno privato con acqua calda. Il parcheggio è privato, ampio e situato all'esterno della proprietà. Ogni casa dispone di un piccolo portico per i nostri ospiti.",
        "Nelle vicinanze troverai ristoranti, supermercati e noleggio biciclette. Ci fidiamo che i nostri ospiti usino il buon senso quando lasciano la nostra casa, per questo non abbiamo regole di check-out né una lista di controllo al check-out.",
        "Hai una richiesta speciale? Saremo più che felici di accontentarti, se possibile. Non esitare a farcelo sapere.",
        "Puerto Viejo è una destinazione molto amata dai turisti di tutto il mondo, grazie ai suoi paesaggi mozzafiato. Il paese vanta spiagge immense circondate dalla foresta pluviale tropicale, oltre a due Parchi Nazionali (Manzanillo e Cahuita). Di notte, il paese si anima con una vivace e movimentata vita notturna. Soggiornando qui, potrai immergerti completamente in tutto ciò che rende Puerto Viejo unico.",
      ],
    },
    pt: {
      seoTitle: "Casa Plumeria - Retiro para Casais",
      seoDescription:
        "Novos bungalows totalmente equipados com A/C, situados a 200 metros da encantadora praia de Playa Chiquita, num dos bairros mais seguros e tranquilos das Caraíbas. A poucos minutos de Puerto Viejo e Manzanillo, estamos perfeitamente localizados para visitar a praia de Punta Uva e o Arrecife.",
      heading: "Casa Plumeria",
      featureName: "Casa Plumeria",
      checkIn: "15h00",
      checkOut: "12h00 (meio-dia)",
      paragraphs: [
        "Novos bungalows totalmente equipados com A/C, situados a 200 metros da encantadora praia de Playa Chiquita, num dos bairros mais seguros e tranquilos das Caraíbas. A poucos minutos de Puerto Viejo e Manzanillo, estamos perfeitamente localizados para visitar a praia de Punta Uva e o Arrecife.",
        "O espaço, totalmente privado, tem A/C, cozinha totalmente equipada, casa de banho privativa com água quente. O lugar de estacionamento é privado, amplo e situado fora da propriedade. Cada casa tem um pequeno alpendre para os nossos hóspedes.",
        "Perto daqui poderá encontrar restaurantes, supermercados e aluguer de bicicletas. Confiamos que os nossos hóspedes seguirão o bom senso ao sair da nossa casa; por isso, não temos regras de saída nem lista de check-out.",
        "Tem algum pedido especial? Teremos todo o gosto em atendê-lo(a), se pudermos. Não hesite em informar-nos.",
        "Puerto Viejo é um destino popular para turistas de todo o mundo, graças à sua paisagem deslumbrante. A vila tem praias imensas rodeadas de floresta tropical, além de dois Parques Nacionais (Manzanillo e Cahuita). À noite, a vila ganha vida com uma animada e vibrante vida noturna. Ao ficar aqui, poderá mergulhar por completo em tudo o que torna Puerto Viejo único.",
      ],
    },
    hi: {
      seoTitle: "Casa Plumeria - कपल्स रिट्रीट",
      seoDescription:
        "खूबसूरत प्लाया चिकिता समुद्र तट से मात्र 200 मीटर की दूरी पर स्थित, कैरिबियन के सबसे सुरक्षित और शांत इलाकों में से एक में, ए/सी वाले नए और पूरी तरह सुसज्जित बंगले। प्वेर्तो वियेहो और मानसानियो से कुछ ही मिनटों की दूरी पर स्थित, हम पुंटा उवा समुद्र तट और अरेसिफे घूमने के लिए बिल्कुल सही जगह पर स्थित हैं।",
      heading: "Casa Plumeria",
      featureName: "घर Plumeria",
      checkIn: "दोपहर 3:00 बजे",
      checkOut: "दोपहर 12:00 बजे (मध्याह्न)",
      paragraphs: [
        "खूबसूरत प्लाया चिकिता समुद्र तट से मात्र 200 मीटर की दूरी पर स्थित, कैरिबियन के सबसे सुरक्षित और शांत इलाकों में से एक में, ए/सी वाले नए और पूरी तरह सुसज्जित बंगले। प्वेर्तो वियेहो और मानसानियो से कुछ ही मिनटों की दूरी पर स्थित, हम पुंटा उवा समुद्र तट और अरेसिफे घूमने के लिए बिल्कुल सही जगह पर स्थित हैं।",
        "यह पूरी तरह निजी स्थान है, जिसमें ए/सी, पूरी तरह सुसज्जित रसोई और गर्म पानी वाला निजी बाथरूम है। पार्किंग की जगह निजी, विशाल और संपत्ति के बाहर स्थित है। हर घर में हमारे मेहमानों के लिए एक छोटा बरामदा (पोर्च) भी है।",
        "आस-पास आपको रेस्तरां, सुपरमार्केट और बाइक किराए पर लेने की सुविधाएं मिल जाएंगी। हमें अपने मेहमानों पर भरोसा है कि वे घर छोड़ते समय सामान्य समझ का पालन करेंगे, इसीलिए हमारे यहां चेक-आउट के लिए कोई नियम नहीं हैं और कोई चेक-आउट सूची भी नहीं है।",
        "क्या आपका कोई विशेष अनुरोध है? यदि हम कर सकें, तो हमें आपकी मदद करके बेहद खुशी होगी। कृपया हमें बताने में संकोच न करें।",
        "प्वेर्तो वियेहो अपने शानदार प्राकृतिक परिवेश की बदौलत दुनियाभर के पर्यटकों के बीच एक लोकप्रिय गंतव्य है। इस कस्बे में विशाल समुद्र तट हैं जो उष्णकटिबंधीय वर्षावन से घिरे हुए हैं, साथ ही यहां दो राष्ट्रीय उद्यान भी हैं (मानसानियो और काहुइटा)। रात होते ही यह कस्बा जीवंत और सक्रिय नाइटलाइफ़ के साथ जाग उठता है। यहां ठहरने के दौरान आप उस हर चीज़ में पूरी तरह डूब सकेंगे, जो प्वेर्तो वियेहो को अनूठा बनाती है।",
      ],
    },
    nl: {
      seoTitle: "Casa Plumeria - Retraite voor Stellen",
      seoDescription:
        "Nieuwe, volledig uitgeruste bungalows met airconditioning op 200 meter van het prachtige strand Playa Chiquita, in een van de veiligste en rustigste buurten van de Caraïben. Op een paar minuten van Puerto Viejo en Manzanillo liggen we ideaal gelegen om het strand van Punta Uva en Arrecife te bezoeken.",
      heading: "Casa Plumeria",
      featureName: "Huis Plumeria",
      checkIn: "15:00",
      checkOut: "12:00 (middag)",
      paragraphs: [
        "Nieuwe, volledig uitgeruste bungalows met airconditioning op 200 meter van het prachtige strand Playa Chiquita, in een van de veiligste en rustigste buurten van de Caraïben. Op een paar minuten van Puerto Viejo en Manzanillo liggen we ideaal gelegen om het strand van Punta Uva en Arrecife te bezoeken.",
        "De volledig private ruimte beschikt over airconditioning, een volledig uitgeruste keuken en een eigen badkamer met warm water. De parkeerplaats is privé, ruim en bevindt zich buiten het perceel. Elk huis heeft een kleine veranda voor onze gasten.",
        "Restaurants, supermarkten en fietsverhuur vind je op loopafstand. We vertrouwen erop dat onze gasten gezond verstand gebruiken bij het verlaten van het huis, daarom hanteren we geen uitcheckregels en geen uitchecklijst.",
        "Heb je een speciaal verzoek? We helpen je graag verder als het mogelijk is. Aarzel niet om het ons te laten weten.",
        "Puerto Viejo is dankzij zijn adembenemende omgeving een geliefde bestemming voor toeristen van over de hele wereld. Het dorp heeft uitgestrekte stranden omzoomd door tropisch regenwoud, en telt twee nationale parken (Manzanillo en Cahuita). 's Avonds komt het dorp tot leven met een levendig en actief nachtleven. Tijdens je verblijf hier ga je volledig op in alles wat Puerto Viejo uniek maakt.",
      ],
    },
  },
  Rana: {
    en: {
      seoTitle: "Casa Rana - Puerto Viejo Vacation Home Rental",
      seoDescription:
        "Nestled in the heart of town, this charming house comfortably accommodates up to 5 guests. It boasts a fully equipped kitchen, a bathroom, two A/C units, and a private parking space.",
      heading: "Casa Rana",
      featureName: "House Rana",
      checkIn: "2:00 PM",
      checkOut: "11:00 AM",
      paragraphs: [
        "Nestled in the heart of town, this charming house comfortably accommodates up to 5 guests. It boasts a fully equipped kitchen, a bathroom, two A/C units, and a private parking space. Our prime location ensures easy access to both the town center and the beaches of Puerto Viejo.",
        "The house offers complete privacy, with all described spaces, including the kitchen and bathroom, exclusively for your use. You'll have all the amenities needed to feel at home.",
        "You'll find most shops and restaurants within a short walking distance. Additionally, a nearby jungle path along the ocean leads to natural coral pools and Cocles.",
        "Have a special request? We are happy to accommodate if possible. Please don't hesitate to let us know.",
        "Puerto Viejo is a well known destination for tourists from around the globe. The town features beautiful beaches bordered by lush tropical rainforest and is home to two National Parks, Manzanillo and Cahuita. At night, Puerto Viejo transforms with a vibrant nightlife scene. Staying here allows you to fully experience everything that makes Puerto Viejo special.",
        "The house is conveniently situated near a beach path that eventually leads to Cocles. Along the path, you'll have the chance to observe diverse wildlife and enjoy natural coral pools. There's even a hidden sightseeing spot to discover!",
        "Getting around Puerto Viejo and its vicinity is best done by renting a bike or an electric bike. Additionally, the public bus service is available, connecting you to Cahuita, Manzanillo, and Sixaola. If you prefer driving, we can accommodate cars and provide private parking. Please inform us if you have a larger pickup truck that requires extra space.",
        "The house is located close to beach access that eventually leads to Cocles. Along the way, you'll have the opportunity to spot a variety of animals and admire natural pools in the coral. There's even a hidden sightseeing spot waiting to be discovered!",
        "Getting around in Puerto Viejo and its surroundings is easiest by renting a bike or a scooter. However, there is also a reliable public bus service available that can take you to Cahuita, Manzanillo, and Sixaola. If you prefer to drive, we can accommodate cars as well. We offer private parking but please let us know if you have a larger pickup truck that requires additional space.",
      ],
    },
    es: {
      seoTitle: "Casa Rana - Alquiler de Casa de Vacaciones en Puerto Viejo",
      seoDescription:
        "Ubicada en el corazón del pueblo, esta encantadora casa acomoda cómodamente hasta 5 huéspedes. Cuenta con una cocina totalmente equipada, un baño, dos unidades de aire acondicionado y un espacio de estacionamiento privado.",
      heading: "Casa Rana",
      featureName: "Casa Rana",
      checkIn: "2:00 PM",
      checkOut: "11:00 AM",
      paragraphs: [
        "Ubicada en el corazón del pueblo, esta casa tiene espacio para hasta 5 personas y cuenta con cocina totalmente equipada, baño, 2 unidades de aire acondicionado y estacionamiento privado. Nuestra ubicación privilegiada ofrece fácil acceso tanto al centro de la ciudad como a las playas más hermosas que Puerto Viejo tiene para ofrecer.",
        "La mayoría de las tiendas y restaurantes están a pocos pasos de distancia, y hay un sendero selvático cercano que corre a lo largo del océano y conduce a piscinas naturales en el coral y a Cocles.",
        "Todos los espacios descritos aquí son privados, incluida la cocina y el baño totalmente equipados. Tendrás todo lo que necesitas para sentirte como en casa.",
        "Ofrecemos servicios de limpieza para reservas de 5 noches o más. Nuestro equipo se comunicará con usted durante su estadía para coordinar un horario conveniente para la limpieza.",
        "¿Tienes alguna petición específica? Nos encantaría complacerla lo mejor que podamos. Por favor, no dudes en hacérnoslo saber.",
        "Si requieres de una cuna durante tu estadía, háznoslo saber en tu reservación. Nos encargaremos de prepararla en la habitación antes de tu llegada.",
        "Puerto Viejo es un popular destino para los turistas de todo el mundo, gracias a sus espectaculares alrededores. El pueblo cuenta con inmensas playas rodeadas por el bosque tropical lluvioso, además de dos Parques Nacionales (Manzanillo y Cahuita). De noche, el pueblo cobra vida con una vibrante y activa escena nocturna. Cuando te hospedas aquí, serás capaz de adentrarte en todo lo que hace a Puerto Viejo único.",
        "La casa está localizada cerca del acceso a la playa que eventualmente lleva a la playa Cocles. A lo largo del camino tendrás la oportunidad de avistar una variedad de animales y admirar las piscinas naturales que se forman en el coral. ¡Incluso hay un mirador oculto esperando a que lo descubras!",
        "Moverse por Puerto Viejo y sus alrededores es más fácil si rentas una bicicleta o un scooter. Aunque, si no te interesa esta opción, también hay un servicio de bus público muy confiable que te puede llevar a Cahuita, Manzanillo y Sixaola. Si prefieres conducir, podemos proporcionar el servicio de alquiler de autos también. Ofrecemos parqueo privado, solo haznos saber si tienes una camioneta grande que requiera de algo de espacio adicional para parquear.",
      ],
    },
    fr: {
      seoTitle: "Casa Rana - Location de maison de vacances à Puerto Viejo",
      seoDescription:
        "Nichée au cœur de la ville, cette charmante maison accueille confortablement jusqu'à 5 personnes. Elle dispose d'une cuisine entièrement équipée, d'une salle de bain, de deux unités de climatisation et d'une place de stationnement privée.",
      heading: "Casa Rana",
      featureName: "Maison Rana",
      checkIn: "14h00",
      checkOut: "11h00",
      paragraphs: [
        "Nichée au cœur de la ville, cette charmante maison accueille confortablement jusqu'à 5 personnes. Elle dispose d'une cuisine entièrement équipée, d'une salle de bain, de deux unités de climatisation et d'une place de stationnement privée. Notre emplacement privilégié garantit un accès facile aussi bien au centre-ville qu'aux plages de Puerto Viejo.",
        "La maison offre une intimité totale : tous les espaces décrits, y compris la cuisine et la salle de bain, sont exclusivement réservés à votre usage. Vous disposerez de toutes les commodités nécessaires pour vous sentir chez vous.",
        "Vous trouverez la plupart des commerces et restaurants à une courte distance à pied. De plus, un sentier forestier tout proche longeant l'océan mène à des piscines naturelles de corail et à Cocles.",
        "Une demande particulière ? Nous sommes heureux d'y répondre favorablement si possible. N'hésitez pas à nous le faire savoir.",
        "Puerto Viejo est une destination bien connue des touristes du monde entier. La ville présente de magnifiques plages bordées d'une forêt tropicale luxuriante et abrite deux parcs nationaux, Manzanillo et Cahuita. La nuit, Puerto Viejo se transforme grâce à une scène nocturne dynamique. En séjournant ici, vous pourrez pleinement découvrir tout ce qui rend Puerto Viejo si spécial.",
        "La maison est idéalement située près d'un sentier de plage qui mène finalement à Cocles. Le long du chemin, vous aurez la chance d'observer une faune variée et de profiter de piscines naturelles de corail. Il existe même un point de vue caché à découvrir !",
        "Pour se déplacer à Puerto Viejo et dans ses environs, le mieux est de louer un vélo ou un vélo électrique. Le service de bus public est également disponible et vous relie à Cahuita, Manzanillo et Sixaola. Si vous préférez conduire, nous pouvons accueillir des voitures et fournir un stationnement privé. Merci de nous informer si vous avez un pick-up de grande taille nécessitant un espace supplémentaire.",
        "La maison est située à proximité d'un accès à la plage qui mène finalement à Cocles. En chemin, vous aurez l'occasion d'observer une variété d'animaux et d'admirer les piscines naturelles dans le corail. Il existe même un point de vue caché qui n'attend que d'être découvert !",
        "Pour se déplacer à Puerto Viejo et dans ses environs, le plus simple est de louer un vélo ou un scooter. Il existe également un service de bus public fiable qui peut vous emmener à Cahuita, Manzanillo et Sixaola. Si vous préférez conduire, nous pouvons également accueillir des voitures. Nous proposons un stationnement privé, mais merci de nous prévenir si vous avez un pick-up de grande taille nécessitant un espace supplémentaire.",
      ],
    },
    de: {
      seoTitle: "Casa Rana – Ferienhausvermietung in Puerto Viejo",
      seoDescription:
        "Mitten im Herzen der Stadt gelegen, bietet dieses charmante Haus komfortabel Platz für bis zu 5 Gäste. Es verfügt über eine voll ausgestattete Küche, ein Badezimmer, zwei Klimaanlagen und einen privaten Parkplatz.",
      heading: "Casa Rana",
      featureName: "Haus Rana",
      checkIn: "14:00 Uhr",
      checkOut: "11:00 Uhr",
      paragraphs: [
        "Mitten im Herzen der Stadt gelegen, bietet dieses charmante Haus komfortabel Platz für bis zu 5 Gäste. Es verfügt über eine voll ausgestattete Küche, ein Badezimmer, zwei Klimaanlagen und einen privaten Parkplatz. Unsere erstklassige Lage sorgt für einen einfachen Zugang sowohl zum Stadtzentrum als auch zu den Stränden von Puerto Viejo.",
        "Das Haus bietet vollständige Privatsphäre – alle beschriebenen Räume, einschließlich Küche und Badezimmer, stehen ausschließlich Ihnen zur Verfügung. Sie haben alle Annehmlichkeiten, die Sie brauchen, um sich wie zu Hause zu fühlen.",
        "Die meisten Geschäfte und Restaurants finden Sie in kurzer Gehentfernung. Zudem führt ein nahegelegener Dschungelpfad entlang des Meeres zu natürlichen Korallenpools und nach Cocles.",
        "Haben Sie einen besonderen Wunsch? Wir erfüllen ihn Ihnen gerne, wenn es möglich ist. Zögern Sie nicht, es uns mitzuteilen.",
        "Puerto Viejo ist ein bekanntes Reiseziel für Touristen aus aller Welt. Der Ort verfügt über wunderschöne Strände, gesäumt von üppigem tropischem Regenwald, und beherbergt zwei Nationalparks, Manzanillo und Cahuita. Nachts verwandelt sich Puerto Viejo mit einem lebendigen Nachtleben. Wenn Sie hier wohnen, können Sie alles erleben, was Puerto Viejo besonders macht.",
        "Das Haus liegt günstig in der Nähe eines Strandpfads, der schließlich nach Cocles führt. Entlang des Weges haben Sie die Gelegenheit, vielfältige Tierwelt zu beobachten und natürliche Korallenpools zu genießen. Es gibt sogar einen versteckten Aussichtspunkt zu entdecken!",
        "Am besten bewegen Sie sich in Puerto Viejo und Umgebung mit einem gemieteten Fahrrad oder E-Bike fort. Zudem steht der öffentliche Busservice zur Verfügung, der Sie nach Cahuita, Manzanillo und Sixaola bringt. Wenn Sie lieber mit dem Auto fahren möchten, können wir das ebenfalls ermöglichen und bieten privates Parken an. Bitte teilen Sie uns mit, wenn Sie einen größeren Pickup-Truck haben, der zusätzlichen Platz benötigt.",
        "Das Haus liegt in der Nähe eines Strandzugangs, der schließlich nach Cocles führt. Unterwegs haben Sie die Möglichkeit, verschiedene Tiere zu entdecken und die natürlichen Pools im Korallenriff zu bewundern. Es gibt sogar einen versteckten Aussichtspunkt, der nur darauf wartet, entdeckt zu werden!",
        "Am einfachsten bewegen Sie sich in Puerto Viejo und Umgebung mit einem gemieteten Fahrrad oder Roller fort. Es gibt aber auch einen zuverlässigen öffentlichen Busservice, der Sie nach Cahuita, Manzanillo und Sixaola bringt. Wenn Sie lieber mit dem Auto fahren möchten, können wir das ebenfalls ermöglichen. Wir bieten privates Parken an, bitte teilen Sie uns jedoch mit, wenn Sie einen größeren Pickup-Truck haben, der zusätzlichen Platz benötigt.",
      ],
    },
    he: {
      seoTitle: "Casa Rana - השכרת בית נופש בפוארטו ויחו",
      seoDescription:
        "הבית, השוכן בלב העיירה, הוא בית מקסים המארח בנוחות עד 5 אורחים. הוא כולל מטבח מאובזר במלואו, חדר רחצה, שתי יחידות מיזוג אוויר וחניה פרטית.",
      heading: "Casa Rana",
      featureName: "בית Rana",
      checkIn: "14:00",
      checkOut: "11:00",
      paragraphs: [
        "הבית, השוכן בלב העיירה, הוא בית מקסים המארח בנוחות עד 5 אורחים. הוא כולל מטבח מאובזר במלואו, חדר רחצה, שתי יחידות מיזוג אוויר וחניה פרטית. המיקום המצוין שלנו מבטיח גישה נוחה הן למרכז העיירה והן לחופי פוארטו ויחו.",
        "הבית מציע פרטיות מלאה, כאשר כל המרחבים המתוארים, כולל המטבח וחדר הרחצה, מיועדים לשימושכם הבלעדי. יהיו לכם כל האמצעים הדרושים כדי להרגיש כמו בבית.",
        "תמצאו את רוב החנויות והמסעדות במרחק הליכה קצר. בנוסף, שביל ג'ונגל סמוך לאורך האוקיינוס מוביל לבריכות אלמוגים טבעיות ולקוקלס.",
        "יש לכם בקשה מיוחדת? נשמח להיענות לה במידת האפשר. אל תהססו לספר לנו.",
        "פוארטו ויחו הוא יעד מוכר היטב לתיירים מכל רחבי העולם. לעיירה חופים יפהפיים המוקפים ביער גשם טרופי עבה, והיא ביתם של שני פארקים לאומיים, מנסניו וקאוויטה. בלילה, פוארטו ויחו הופכת עם חיי לילה תוססים. שהות כאן מאפשרת לכם לחוות באופן מלא את כל מה שהופך את פוארטו ויחו למיוחדת.",
        "הבית ממוקם באופן נוח ליד שביל חוף המוביל בסופו של דבר לקוקלס. לאורך השביל, תהיה לכם ההזדמנות לצפות בחיות בר מגוונות וליהנות מבריכות אלמוגים טבעיות. יש אפילו נקודת תצפית נסתרת לגלות!",
        "הדרך הטובה ביותר להתנייד בפוארטו ויחו ובסביבתה היא באמצעות השכרת אופניים או אופניים חשמליים. בנוסף, קיים שירות אוטובוסים ציבורי המחבר אתכם לקאוויטה, מנסניו וסיקסאולה. אם אתם מעדיפים לנהוג, נוכל להתאים רכבים ולספק חניה פרטית. אנא הודיעו לנו אם ברשותכם טנדר גדול שדורש שטח נוסף.",
        "הבית ממוקם בקרבת גישה לחוף המובילה בסופו של דבר לקוקלס. בדרך, תהיה לכם הזדמנות להבחין במגוון בעלי חיים ולהתפעל מבריכות טבעיות באלמוגים. יש אפילו נקודת תצפית נסתרת המחכה להתגלות!",
        "הדרך הקלה ביותר להתנייד בפוארטו ויחו ובסביבתה היא באמצעות השכרת אופניים או קטנוע. עם זאת, קיים גם שירות אוטובוסים ציבורי אמין שיכול לקחת אתכם לקאוויטה, מנסניו וסיקסאולה. אם אתם מעדיפים לנסוע ברכב, נוכל להתאים גם לכך. אנחנו מציעים חניה פרטית, אך אנא הודיעו לנו אם ברשותכם טנדר גדול שדורש שטח חניה נוסף.",
      ],
    },
    it: {
      seoTitle: "Casa Rana - Casa Vacanze in Affitto a Puerto Viejo",
      seoDescription:
        "Situata nel cuore del paese, questa affascinante casa ospita comodamente fino a 5 persone. Dispone di una cucina completamente attrezzata, un bagno, due unità di aria condizionata e un posto auto privato.",
      heading: "Casa Rana",
      featureName: "Casa Rana",
      checkIn: "14:00",
      checkOut: "11:00",
      paragraphs: [
        "Situata nel cuore del paese, questa affascinante casa ospita comodamente fino a 5 persone. Dispone di una cucina completamente attrezzata, un bagno, due unità di aria condizionata e un posto auto privato. La nostra posizione privilegiata garantisce un facile accesso sia al centro del paese sia alle spiagge di Puerto Viejo.",
        "La casa offre completa privacy, con tutti gli spazi descritti, inclusi cucina e bagno, a uso esclusivo degli ospiti. Avrai tutti i comfort necessari per sentirti come a casa tua.",
        "Troverai la maggior parte dei negozi e ristoranti a pochi passi di distanza. Inoltre, un sentiero nella giungla nelle vicinanze, che costeggia l'oceano, conduce alle piscine naturali di corallo e a Cocles.",
        "Hai una richiesta speciale? Saremo felici di accontentarti, se possibile. Non esitare a farcelo sapere.",
        "Puerto Viejo è una destinazione ben conosciuta dai turisti di tutto il mondo. Il paese offre bellissime spiagge circondate da una rigogliosa foresta pluviale tropicale ed è sede di due Parchi Nazionali, Manzanillo e Cahuita. Di notte, Puerto Viejo si trasforma con una vivace vita notturna. Soggiornando qui potrai vivere appieno tutto ciò che rende Puerto Viejo speciale.",
        "La casa è comodamente situata vicino a un sentiero per la spiaggia che conduce infine a Cocles. Lungo il percorso avrai la possibilità di osservare una fauna variegata e godere delle piscine naturali di corallo. C'è persino un punto panoramico nascosto da scoprire!",
        "Il modo migliore per spostarsi a Puerto Viejo e nei dintorni è noleggiare una bicicletta o una bici elettrica. È inoltre disponibile il servizio di autobus pubblici, che ti collega a Cahuita, Manzanillo e Sixaola. Se preferisci guidare, possiamo accogliere le auto e offrire parcheggio privato. Ti preghiamo di avvisarci se hai un pick-up di grandi dimensioni che richiede spazio aggiuntivo.",
        "La casa si trova vicino a un accesso alla spiaggia che porta infine a Cocles. Lungo il percorso avrai l'opportunità di avvistare diversi animali e ammirare le piscine naturali nella barriera corallina. C'è persino un punto panoramico nascosto tutto da scoprire!",
        "Il modo più semplice per spostarsi a Puerto Viejo e nei dintorni è noleggiare una bicicletta o uno scooter. È comunque disponibile anche un affidabile servizio di autobus pubblici che può portarti a Cahuita, Manzanillo e Sixaola. Se preferisci guidare, possiamo accogliere anche le auto. Offriamo parcheggio privato, ma facci sapere se hai un pick-up di grandi dimensioni che richiede spazio aggiuntivo.",
      ],
    },
    pt: {
      seoTitle: "Casa Rana - Aluguer de Casa de Férias em Puerto Viejo",
      seoDescription:
        "Instalada no coração da vila, esta encantadora casa acomoda confortavelmente até 5 hóspedes. Conta com cozinha totalmente equipada, casa de banho, duas unidades de A/C e um lugar de estacionamento privado.",
      heading: "Casa Rana",
      featureName: "Casa Rana",
      checkIn: "14h00",
      checkOut: "11h00",
      paragraphs: [
        "Instalada no coração da vila, esta encantadora casa acomoda confortavelmente até 5 hóspedes. Conta com cozinha totalmente equipada, casa de banho, duas unidades de A/C e um lugar de estacionamento privado. A nossa localização privilegiada garante fácil acesso tanto ao centro da vila como às praias de Puerto Viejo.",
        "A casa oferece privacidade total, com todos os espaços descritos, incluindo a cozinha e a casa de banho, exclusivamente para seu uso. Terá todas as comodidades necessárias para se sentir em casa.",
        "Encontrará a maioria das lojas e restaurantes a uma curta distância a pé. Além disso, um trilho na selva ali perto, junto ao oceano, leva a piscinas naturais de coral e a Cocles.",
        "Tem algum pedido especial? Teremos todo o gosto em atendê-lo(a), se for possível. Não hesite em informar-nos.",
        "Puerto Viejo é um destino bem conhecido para turistas de todo o mundo. A vila apresenta belas praias ladeadas por exuberante floresta tropical e é o lar de dois Parques Nacionais, Manzanillo e Cahuita. À noite, Puerto Viejo transforma-se com uma vibrante vida noturna. Ficar aqui permite-lhe viver plenamente tudo o que torna Puerto Viejo especial.",
        "A casa está convenientemente situada perto de um trilho de praia que leva, eventualmente, até Cocles. Ao longo do caminho, terá a oportunidade de observar diversos animais selvagens e desfrutar de piscinas naturais de coral. Há mesmo um miradouro escondido para descobrir!",
        "A melhor forma de se deslocar em Puerto Viejo e arredores é alugando uma bicicleta ou uma bicicleta elétrica. Além disso, está disponível o serviço de autocarro público, que o liga a Cahuita, Manzanillo e Sixaola. Se preferir conduzir, podemos acomodar automóveis e fornecer estacionamento privado. Por favor, informe-nos se tiver uma carrinha pick-up maior que precise de espaço extra.",
        "A casa está localizada perto de um acesso à praia que leva, eventualmente, até Cocles. Pelo caminho, terá a oportunidade de avistar uma variedade de animais e admirar piscinas naturais no coral. Há mesmo um miradouro escondido à espera de ser descoberto!",
        "A forma mais fácil de se deslocar em Puerto Viejo e arredores é alugando uma bicicleta ou uma scooter. No entanto, também existe um serviço de autocarro público fiável que o pode levar a Cahuita, Manzanillo e Sixaola. Se preferir conduzir, também podemos acomodar automóveis. Oferecemos estacionamento privado, mas avise-nos se tiver uma carrinha pick-up maior que precise de espaço adicional.",
      ],
    },
    hi: {
      seoTitle: "Casa Rana - प्वेर्तो वियेहो में अवकाश गृह किराया",
      seoDescription:
        "कस्बे के बीचोंबीच बसा यह आकर्षक घर आराम से 5 मेहमानों तक को ठहरा सकता है। इसमें पूरी तरह सुसज्जित रसोई, एक बाथरूम, दो ए/सी यूनिट और एक निजी पार्किंग स्थान है।",
      heading: "Casa Rana",
      featureName: "घर Rana",
      checkIn: "दोपहर 2:00 बजे",
      checkOut: "सुबह 11:00 बजे",
      paragraphs: [
        "कस्बे के बीचोंबीच बसा यह आकर्षक घर आराम से 5 मेहमानों तक को ठहरा सकता है। इसमें पूरी तरह सुसज्जित रसोई, एक बाथरूम, दो ए/सी यूनिट और एक निजी पार्किंग स्थान है। हमारा शानदार स्थान कस्बे के केंद्र और प्वेर्तो वियेहो के समुद्र तटों, दोनों तक आसान पहुंच सुनिश्चित करता है।",
        "यह घर पूरी तरह निजता प्रदान करता है, जिसमें रसोई और बाथरूम सहित बताई गई सभी जगहें केवल आपके उपयोग के लिए हैं। घर जैसा महसूस करने के लिए ज़रूरी सभी सुविधाएं आपको यहां मिलेंगी।",
        "आपको अधिकांश दुकानें और रेस्तरां थोड़ी ही पैदल दूरी पर मिल जाएंगे। इसके अलावा, समुद्र किनारे स्थित एक पास का जंगल रास्ता प्राकृतिक प्रवाल जलकुंडों और कॉक्लेस तक ले जाता है।",
        "कोई विशेष अनुरोध है? यदि संभव हो सके तो हमें आपकी मदद करके खुशी होगी। कृपया हमें बताने में संकोच न करें।",
        "प्वेर्तो वियेहो दुनियाभर के पर्यटकों के बीच एक जाना-माना गंतव्य है। इस कस्बे में हरे-भरे उष्णकटिबंधीय वर्षावन से घिरे खूबसूरत समुद्र तट हैं और यहां दो राष्ट्रीय उद्यान भी हैं, मानसानियो और काहुइटा। रात होते ही प्वेर्तो वियेहो एक जीवंत नाइटलाइफ़ के साथ बदल जाता है। यहां ठहरने से आप उस हर चीज़ का पूरी तरह अनुभव कर पाएंगे, जो प्वेर्तो वियेहो को खास बनाती है।",
        "यह घर एक ऐसे समुद्र तट के रास्ते के पास सुविधाजनक ढंग से स्थित है जो अंततः कॉक्लेस तक ले जाता है। रास्ते में आपको विविध वन्यजीव देखने और प्राकृतिक प्रवाल जलकुंडों का आनंद लेने का मौका मिलेगा। यहां तक कि एक छिपा हुआ दर्शनीय स्थल भी खोजे जाने का इंतज़ार कर रहा है!",
        "प्वेर्तो वियेहो और इसके आसपास घूमने-फिरने का सबसे अच्छा तरीका है बाइक या इलेक्ट्रिक बाइक किराए पर लेना। इसके अलावा, सार्वजनिक बस सेवा भी उपलब्ध है, जो आपको काहुइटा, मानसानियो और सिक्सोला से जोड़ती है। यदि आप गाड़ी चलाना पसंद करते हैं, तो हम कारों की व्यवस्था और निजी पार्किंग की सुविधा दे सकते हैं। कृपया हमें बताएं यदि आपके पास एक बड़ा पिकअप ट्रक है जिसे अतिरिक्त जगह चाहिए।",
        "यह घर समुद्र तट के उस रास्ते के पास स्थित है जो अंततः कॉक्लेस तक ले जाता है। रास्ते में आपको विभिन्न प्रकार के जानवर देखने और प्रवाल में बने प्राकृतिक जलकुंडों को निहारने का मौका मिलेगा। यहां तक कि एक छिपा हुआ दर्शनीय स्थल भी है, जो खोजे जाने का इंतज़ार कर रहा है!",
        "प्वेर्तो वियेहो और इसके आसपास घूमने-फिरने का सबसे आसान तरीका है बाइक या स्कूटर किराए पर लेना। हालांकि, एक भरोसेमंद सार्वजनिक बस सेवा भी उपलब्ध है, जो आपको काहुइटा, मानसानियो और सिक्सोला तक ले जा सकती है। यदि आप गाड़ी चलाना पसंद करते हैं, तो हम कारों की भी व्यवस्था कर सकते हैं। हम निजी पार्किंग की सुविधा देते हैं, लेकिन कृपया हमें बताएं यदि आपके पास एक बड़ा पिकअप ट्रक है जिसे अतिरिक्त जगह चाहिए।",
      ],
    },
    nl: {
      seoTitle: "Casa Rana - Vakantiehuis te Huur in Puerto Viejo",
      seoDescription:
        "In het hart van het dorp gelegen biedt dit karakteristieke huis comfortabel onderdak aan maximaal 5 gasten. Het beschikt over een volledig uitgeruste keuken, een badkamer, twee airco-units en een privéparkeerplaats.",
      heading: "Casa Rana",
      featureName: "Huis Rana",
      checkIn: "14:00",
      checkOut: "11:00",
      paragraphs: [
        "In het hart van het dorp gelegen biedt dit karakteristieke huis comfortabel onderdak aan maximaal 5 gasten. Het beschikt over een volledig uitgeruste keuken, een badkamer, twee airco-units en een privéparkeerplaats. Onze uitstekende ligging zorgt voor gemakkelijke toegang tot zowel het centrum als de stranden van Puerto Viejo.",
        "Het huis biedt volledige privacy: alle genoemde ruimtes, inclusief de keuken en badkamer, zijn uitsluitend voor jouw gebruik. Je vindt er alle voorzieningen die je nodig hebt om je thuis te voelen.",
        "De meeste winkels en restaurants zijn op loopafstand. Daarnaast leidt een nabijgelegen junglepad langs de oceaan naar natuurlijke koraalzwembaden en naar Cocles.",
        "Heb je een speciaal verzoek? We voldoen er graag aan, als het kan. Aarzel niet om het ons te laten weten.",
        "Puerto Viejo is een bekende bestemming voor toeristen van over de hele wereld. Het dorp heeft prachtige stranden omzoomd door weelderig tropisch regenwoud en telt twee nationale parken, Manzanillo en Cahuita. 's Avonds verandert Puerto Viejo in een levendig uitgaansgebied. Tijdens je verblijf hier kun je alles ervaren wat Puerto Viejo bijzonder maakt.",
        "Het huis ligt gunstig dicht bij een strandpad dat uiteindelijk naar Cocles leidt. Onderweg kun je uiteenlopende dieren spotten en genieten van natuurlijke koraalzwembaden. Er is zelfs een verborgen uitkijkpunt te ontdekken!",
        "Je verplaatst je het best door de omgeving van Puerto Viejo met een gehuurde fiets of elektrische fiets. Daarnaast is er een openbare busdienst die je verbindt met Cahuita, Manzanillo en Sixaola. Rijd je liever zelf, dan bieden we ook privéparkeren aan. Laat het ons weten als je een grotere pick-uptruck hebt die extra ruimte nodig heeft.",
        "Het huis ligt vlak bij een strandtoegang die uiteindelijk naar Cocles leidt. Onderweg kun je allerlei dieren spotten en genieten van natuurlijke zwembaden in het koraal. Er wacht zelfs een verborgen uitkijkpunt om ontdekt te worden!",
        "De makkelijkste manier om je in Puerto Viejo en omgeving te verplaatsen is met een gehuurde fiets of scooter. Er is ook een betrouwbare openbare busdienst die je naar Cahuita, Manzanillo en Sixaola brengt. Rijd je liever zelf, dan is dat ook mogelijk. We bieden privéparkeren aan, maar laat het ons weten als je een grotere pick-uptruck hebt die extra ruimte nodig heeft.",
      ],
    },
  },
  Tucano: {
    en: {
      seoTitle: "Casa Tucano - Like Nothing Else in Puerto Viejo",
      seoDescription:
        "This house offers a delightful experience in the heart of Puerto Viejo with a charming wooden apartment located above an Italian bakery. The apartment features two comfortable bedrooms, a well-equipped bathroom, a fully equipped kitchen, a lovely terrace, and two A/C units.",
      heading: "Casa Tucano",
      featureName: "House Tucano",
      checkIn: "2:00 PM",
      checkOut: "11:00 AM",
      paragraphs: [
        "This house offers a delightful experience in the heart of Puerto Viejo with a charming wooden apartment located above an Italian bakery. The apartment features two comfortable bedrooms, a well-equipped bathroom, a fully equipped kitchen, a lovely terrace, and two A/C units, ensuring a cozy stay.",
        "These apartments provide private spaces, including the kitchen and bathroom, offering everything you need to feel at home. For stays of 5 nights or more, we provide complimentary cleaning services, and our team will coordinate a suitable time with you during your visit.",
        "If you have any special requests, we're happy to accommodate them whenever possible, so don't hesitate to let us know. Should you need a pack-and-play crib for your stay, please inform us in advance, and we'll ensure it's set up in your room during the cleaning process.",
        "Puerto Viejo attracts visitors from all over the globe with its breathtaking landscapes. The town is renowned for its expansive beaches bordered by tropical rainforests and features two National Parks, Manzanillo and Cahuita. The nightlife here is vibrant and lively, offering a unique experience after dark. Staying in Puerto Viejo allows you to fully immerse yourself in its unique charm.",
        "Our house is conveniently located near a beach path that leads eventually to Cocles. On your way, you can observe a variety of wildlife and enjoy the natural coral pools. A hidden sightseeing spot is also waiting to be explored!.",
        "Exploring Puerto Viejo and its surroundings is most convenient by renting a bike or a scooter. Additionally, there is a good public bus service available that connects you to Cahuita, Manzanillo, and Sixaola. If you prefer driving, we provide private parking. Please inform us if you have a larger pickup truck that needs extra space.",
      ],
    },
    es: {
      seoTitle: "Casa Tucano - Como Ninguna Otra en Puerto Viejo",
      seoDescription:
        "Esta casa ofrece una experiencia encantadora en el corazón de Puerto Viejo con un encantador apartamento de madera ubicado encima de una panadería italiana. El apartamento cuenta con dos cómodas habitaciones, un baño bien equipado, una cocina totalmente equipada, una hermosa terraza y dos unidades de aire acondicionado.",
      heading: "Casa Tucano",
      featureName: "Casa Tucano",
      checkIn: "2:00 PM",
      checkOut: "11:00 AM",
      paragraphs: [
        "Bienvenido a Kalawala. Esta casa ofrece una experiencia encantadora en el corazón de Puerto Viejo con un encantador apartamento de madera ubicado encima de una panadería italiana. El apartamento cuenta con dos cómodas habitaciones, un baño bien equipado, una cocina totalmente equipada, una hermosa terraza y dos unidades de aire acondicionado, lo que garantiza una estancia acogedora.",
        "Estos apartamentos brindan espacios privados, incluida la cocina y el baño, ofreciendo todo lo que necesitas para sentirte como en casa. Para estancias de 5 noches o más, brindamos servicios de limpieza de cortesía y nuestro equipo coordinará un horario adecuado con usted durante su visita.",
        "Si tiene alguna solicitud especial, estaremos encantados de atenderla siempre que sea posible, así que no dude en hacérnoslo saber. Si necesita una cuna plegable para su estadía, infórmenos con anticipación y nos aseguraremos de que esté instalada en su habitación durante el proceso de limpieza.",
        "Puerto Viejo atrae a visitantes de todo el mundo con sus impresionantes paisajes. La ciudad es famosa por sus extensas playas rodeadas de bosques tropicales y cuenta con dos parques nacionales, Manzanillo y Cahuita. La vida nocturna aquí es vibrante y animada, y ofrece una experiencia única al anochecer. Alojarse en Puerto Viejo te permite sumergirte de lleno en su encanto único.",
        "Nuestra casa está convenientemente ubicada cerca de un sendero de playa que eventualmente conduce a Cocles. En el camino podrás observar una variedad de vida silvestre y disfrutar de las piscinas naturales de coral. ¡Un lugar turístico escondido también está esperando ser explorado!",
        "Explorar Puerto Viejo y sus alrededores es más conveniente alquilando una bicicleta o un scooter. Además, hay un buen servicio de autobús público disponible que te conecta con Cahuita, Manzanillo y Sixaola. Si prefiere conducir, disponemos de aparcamiento privado. Infórmenos si tiene una camioneta más grande que necesita espacio adicional.",
      ],
    },
    fr: {
      seoTitle: "Casa Tucano - Comme nulle part ailleurs à Puerto Viejo",
      seoDescription:
        "Cette maison offre une expérience charmante au cœur de Puerto Viejo, avec un appartement en bois plein de caractère situé au-dessus d'une boulangerie italienne. L'appartement dispose de deux chambres confortables, d'une salle de bain bien équipée, d'une cuisine entièrement équipée, d'une jolie terrasse et de deux unités de climatisation.",
      heading: "Casa Tucano",
      featureName: "Maison Tucano",
      checkIn: "14h00",
      checkOut: "11h00",
      paragraphs: [
        "Cette maison offre une expérience charmante au cœur de Puerto Viejo, avec un appartement en bois plein de caractère situé au-dessus d'une boulangerie italienne. L'appartement dispose de deux chambres confortables, d'une salle de bain bien équipée, d'une cuisine entièrement équipée, d'une jolie terrasse et de deux unités de climatisation, garantissant un séjour douillet.",
        "Ces appartements offrent des espaces privés, y compris la cuisine et la salle de bain, avec tout ce qu'il vous faut pour vous sentir chez vous. Pour les séjours de 5 nuits ou plus, nous offrons un service de ménage gratuit, et notre équipe conviendra d'un horaire adapté avec vous pendant votre visite.",
        "Si vous avez une demande particulière, nous serons heureux d'y répondre dans la mesure du possible, alors n'hésitez pas à nous le faire savoir. Si vous avez besoin d'un lit parapluie pour votre séjour, merci de nous en informer à l'avance ; nous veillerons à ce qu'il soit installé dans votre chambre lors du ménage.",
        "Puerto Viejo attire des visiteurs du monde entier grâce à ses paysages à couper le souffle. La ville est réputée pour ses vastes plages bordées de forêts tropicales et abrite deux parcs nationaux, Manzanillo et Cahuita. La vie nocturne y est vibrante et animée, offrant une expérience unique à la tombée de la nuit. Séjourner à Puerto Viejo vous permet de vous immerger pleinement dans son charme unique.",
        "Notre maison est idéalement située près d'un sentier de plage qui mène finalement à Cocles. En chemin, vous pourrez observer une faune variée et profiter des piscines naturelles de corail. Un site caché n'attend également que d'être exploré !",
        "Explorer Puerto Viejo et ses environs est plus pratique en louant un vélo ou un scooter. De plus, il existe un bon service de bus public qui vous relie à Cahuita, Manzanillo et Sixaola. Si vous préférez conduire, nous proposons un stationnement privé. Merci de nous informer si vous avez un pick-up de grande taille nécessitant un espace supplémentaire.",
      ],
    },
    de: {
      seoTitle: "Casa Tucano – Einzigartig in Puerto Viejo",
      seoDescription:
        "Dieses Haus bietet ein wunderbares Erlebnis im Herzen von Puerto Viejo mit einem charmanten Holzapartment über einer italienischen Bäckerei. Das Apartment verfügt über zwei komfortable Schlafzimmer, ein gut ausgestattetes Badezimmer, eine voll ausgestattete Küche, eine schöne Terrasse und zwei Klimaanlagen.",
      heading: "Casa Tucano",
      featureName: "Haus Tucano",
      checkIn: "14:00 Uhr",
      checkOut: "11:00 Uhr",
      paragraphs: [
        "Dieses Haus bietet ein wunderbares Erlebnis im Herzen von Puerto Viejo mit einem charmanten Holzapartment über einer italienischen Bäckerei. Das Apartment verfügt über zwei komfortable Schlafzimmer, ein gut ausgestattetes Badezimmer, eine voll ausgestattete Küche, eine schöne Terrasse und zwei Klimaanlagen, die für einen gemütlichen Aufenthalt sorgen.",
        "Diese Apartments bieten private Räume, einschließlich Küche und Badezimmer, und stellen alles bereit, was Sie brauchen, um sich wie zu Hause zu fühlen. Für Aufenthalte ab 5 Nächten bieten wir einen kostenlosen Reinigungsservice an, und unser Team wird während Ihres Besuchs einen passenden Termin mit Ihnen abstimmen.",
        "Wenn Sie besondere Wünsche haben, erfüllen wir sie Ihnen gerne, wann immer es möglich ist – zögern Sie also nicht, uns davon zu berichten. Sollten Sie für Ihren Aufenthalt ein Reisebett (Pack-and-Play) benötigen, teilen Sie uns dies bitte im Voraus mit, damit wir es während des Reinigungsprozesses in Ihrem Zimmer aufstellen können.",
        "Puerto Viejo zieht mit seinen atemberaubenden Landschaften Besucher aus der ganzen Welt an. Der Ort ist bekannt für seine weitläufigen Strände, gesäumt von tropischem Regenwald, und beherbergt zwei Nationalparks, Manzanillo und Cahuita. Das Nachtleben hier ist lebendig und pulsierend und bietet nach Einbruch der Dunkelheit ein einzigartiges Erlebnis. Ein Aufenthalt in Puerto Viejo lässt Sie vollständig in seinen einzigartigen Charme eintauchen.",
        "Unser Haus liegt günstig in der Nähe eines Strandpfads, der schließlich nach Cocles führt. Unterwegs können Sie vielfältige Tierwelt beobachten und die natürlichen Korallenpools genießen. Auch ein versteckter Aussichtspunkt wartet darauf, erkundet zu werden!",
        "Am bequemsten erkunden Sie Puerto Viejo und Umgebung mit einem gemieteten Fahrrad oder Roller. Außerdem gibt es einen guten öffentlichen Busservice, der Sie nach Cahuita, Manzanillo und Sixaola bringt. Wenn Sie lieber mit dem Auto fahren möchten, bieten wir privates Parken an. Bitte teilen Sie uns mit, wenn Sie einen größeren Pickup-Truck haben, der zusätzlichen Platz benötigt.",
      ],
    },
    he: {
      seoTitle: "Casa Tucano - לא כמו שום דבר אחר בפוארטו ויחו",
      seoDescription:
        "בית זה מציע חוויה מקסימה בלב פוארטו ויחו, עם דירת עץ מקסימה הממוקמת מעל מאפייה איטלקית. הדירה כוללת שני חדרי שינה נוחים, חדר רחצה מאובזר היטב, מטבח מאובזר במלואו, מרפסת יפהפייה ושתי יחידות מיזוג אוויר.",
      heading: "Casa Tucano",
      featureName: "בית Tucano",
      checkIn: "14:00",
      checkOut: "11:00",
      paragraphs: [
        "בית זה מציע חוויה מקסימה בלב פוארטו ויחו, עם דירת עץ מקסימה הממוקמת מעל מאפייה איטלקית. הדירה כוללת שני חדרי שינה נוחים, חדר רחצה מאובזר היטב, מטבח מאובזר במלואו, מרפסת יפהפייה ושתי יחידות מיזוג אוויר, המבטיחים שהות נעימה.",
        "דירות אלו מציעות מרחבים פרטיים, כולל המטבח וחדר הרחצה, ומעניקות לכם כל מה שאתם צריכים כדי להרגיש כמו בבית. בשהות של 5 לילות ומעלה, אנחנו מציעים שירותי ניקיון חינם, והצוות שלנו יתאם איתכם זמן מתאים במהלך הביקור.",
        "אם יש לכם בקשות מיוחדות, נשמח להיענות להן במידת האפשר, אז אל תהססו לספר לנו. אם אתם זקוקים למיטת תינוק ניידת (pack-and-play) לשהותכם, אנא הודיעו לנו מראש, ונוודא שהיא תוצב בחדרכם במהלך תהליך הניקיון.",
        "פוארטו ויחו מושכת מבקרים מכל רחבי העולם בזכות נופיה עוצרי הנשימה. העיירה ידועה בחופיה הנרחבים המוקפים ביערות גשם טרופיים, ובה שני פארקים לאומיים, מנסניו וקאוויטה. חיי הלילה כאן תוססים ועליזים, ומציעים חוויה ייחודית לאחר רדת החשכה. שהות בפוארטו ויחו מאפשרת לכם להשתקע לחלוטין בקסם הייחודי שלה.",
        "הבית שלנו ממוקם באופן נוח ליד שביל חוף המוביל בסופו של דבר לקוקלס. בדרככם, תוכלו לצפות במגוון חיות בר וליהנות מבריכות האלמוגים הטבעיות. גם נקודת תצפית נסתרת מחכה להתגלות!",
        "הדרך הנוחה ביותר לחקור את פוארטו ויחו וסביבתה היא באמצעות השכרת אופניים או קטנוע. בנוסף, קיים שירות אוטובוסים ציבורי טוב המחבר אתכם לקאוויטה, מנסניו וסיקסאולה. אם אתם מעדיפים לנהוג, אנחנו מספקים חניה פרטית. אנא הודיעו לנו אם ברשותכם טנדר גדול שדורש שטח נוסף.",
      ],
    },
    it: {
      seoTitle: "Casa Tucano - Diversa da Tutto il Resto a Puerto Viejo",
      seoDescription:
        "Questa casa offre un'esperienza deliziosa nel cuore di Puerto Viejo, con un affascinante appartamento in legno situato sopra una panetteria italiana. L'appartamento dispone di due comode camere da letto, un bagno ben attrezzato, una cucina completamente attrezzata, una splendida terrazza e due unità di aria condizionata.",
      heading: "Casa Tucano",
      featureName: "Casa Tucano",
      checkIn: "14:00",
      checkOut: "11:00",
      paragraphs: [
        "Questa casa offre un'esperienza deliziosa nel cuore di Puerto Viejo, con un affascinante appartamento in legno situato sopra una panetteria italiana. L'appartamento dispone di due comode camere da letto, un bagno ben attrezzato, una cucina completamente attrezzata, una splendida terrazza e due unità di aria condizionata, per garantire un soggiorno accogliente.",
        "Questi appartamenti offrono spazi privati, inclusi cucina e bagno, con tutto il necessario per sentirti come a casa tua. Per soggiorni di 5 notti o più, offriamo un servizio di pulizia gratuito, e il nostro team concorderà con te un orario adeguato durante la tua visita.",
        "Se hai richieste speciali, saremo felici di soddisfarle quando possibile, quindi non esitare a farcelo sapere. Se hai bisogno di un lettino da campeggio (pack-and-play) per il tuo soggiorno, faccelo sapere in anticipo e ci assicureremo che venga sistemato nella tua camera durante il processo di pulizia.",
        "Puerto Viejo attira visitatori da tutto il mondo con i suoi paesaggi mozzafiato. Il paese è rinomato per le sue ampie spiagge circondate da foreste pluviali tropicali e ospita due Parchi Nazionali, Manzanillo e Cahuita. La vita notturna qui è vivace e animata, offrendo un'esperienza unica dopo il tramonto. Soggiornare a Puerto Viejo ti permette di immergerti completamente nel suo fascino unico.",
        "La nostra casa è comodamente situata vicino a un sentiero per la spiaggia che conduce infine a Cocles. Lungo il percorso potrai osservare una grande varietà di fauna selvatica e goderti le piscine naturali di corallo. Anche un punto panoramico nascosto ti aspetta per essere scoperto!",
        "Il modo più comodo per esplorare Puerto Viejo e i suoi dintorni è noleggiare una bicicletta o uno scooter. È inoltre disponibile un buon servizio di autobus pubblici che ti collega a Cahuita, Manzanillo e Sixaola. Se preferisci guidare, offriamo parcheggio privato. Ti preghiamo di avvisarci se hai un pick-up di grandi dimensioni che necessita di spazio aggiuntivo.",
      ],
    },
    pt: {
      seoTitle: "Casa Tucano - Como Nenhuma Outra em Puerto Viejo",
      seoDescription:
        "Esta casa oferece uma experiência encantadora no coração de Puerto Viejo, com um charmoso apartamento em madeira situado por cima de uma padaria italiana. O apartamento conta com dois quartos confortáveis, uma casa de banho bem equipada, uma cozinha totalmente equipada, um terraço encantador e duas unidades de A/C.",
      heading: "Casa Tucano",
      featureName: "Casa Tucano",
      checkIn: "14h00",
      checkOut: "11h00",
      paragraphs: [
        "Esta casa oferece uma experiência encantadora no coração de Puerto Viejo, com um charmoso apartamento em madeira situado por cima de uma padaria italiana. O apartamento conta com dois quartos confortáveis, uma casa de banho bem equipada, uma cozinha totalmente equipada, um terraço encantador e duas unidades de A/C, garantindo uma estadia acolhedora.",
        "Estes apartamentos oferecem espaços privados, incluindo a cozinha e a casa de banho, disponibilizando tudo o que precisa para se sentir em casa. Para estadias de 5 noites ou mais, oferecemos serviços de limpeza de cortesia, e a nossa equipa combinará consigo um horário adequado durante a sua visita.",
        "Se tiver algum pedido especial, teremos todo o gosto em atendê-lo sempre que possível, por isso não hesite em informar-nos. Caso precise de um berço de viagem durante a sua estadia, informe-nos com antecedência e garantiremos que fica montado no seu quarto durante o processo de limpeza.",
        "Puerto Viejo atrai visitantes de todo o mundo com as suas paisagens de tirar o fôlego. A vila é conhecida pelas suas extensas praias ladeadas de floresta tropical e alberga dois Parques Nacionais, Manzanillo e Cahuita. A vida noturna aqui é vibrante e animada, oferecendo uma experiência única depois de escurecer. Ficar em Puerto Viejo permite-lhe mergulhar totalmente no seu charme único.",
        "A nossa casa está convenientemente situada perto de um trilho de praia que leva, eventualmente, até Cocles. No caminho, poderá observar diversa fauna selvagem e desfrutar das piscinas naturais de coral. Há mesmo um miradouro escondido à espera de ser explorado!",
        "Explorar Puerto Viejo e os seus arredores é mais conveniente alugando uma bicicleta ou uma scooter. Além disso, existe um bom serviço de autocarro público disponível que o liga a Cahuita, Manzanillo e Sixaola. Se preferir conduzir, oferecemos estacionamento privado. Informe-nos se tiver uma carrinha pick-up maior que precise de espaço extra.",
      ],
    },
    hi: {
      seoTitle: "Casa Tucano - प्वेर्तो वियेहो में और कहीं नहीं जैसा",
      seoDescription:
        "यह घर प्वेर्तो वियेहो के बीचोंबीच एक इतालवी बेकरी के ऊपर स्थित आकर्षक लकड़ी के अपार्टमेंट के साथ एक शानदार अनुभव प्रदान करता है। अपार्टमेंट में दो आरामदायक शयनकक्ष, एक सुव्यवस्थित बाथरूम, पूरी तरह सुसज्जित रसोई, एक खूबसूरत छत (टैरेस) और दो ए/सी यूनिट हैं।",
      heading: "Casa Tucano",
      featureName: "घर Tucano",
      checkIn: "दोपहर 2:00 बजे",
      checkOut: "सुबह 11:00 बजे",
      paragraphs: [
        "यह घर प्वेर्तो वियेहो के बीचोंबीच एक इतालवी बेकरी के ऊपर स्थित आकर्षक लकड़ी के अपार्टमेंट के साथ एक शानदार अनुभव प्रदान करता है। अपार्टमेंट में दो आरामदायक शयनकक्ष, एक सुव्यवस्थित बाथरूम, पूरी तरह सुसज्जित रसोई, एक खूबसूरत छत (टैरेस) और दो ए/सी यूनिट हैं, जो एक आरामदायक ठहराव सुनिश्चित करते हैं।",
        "ये अपार्टमेंट्स निजी स्थान प्रदान करते हैं, जिनमें रसोई और बाथरूम भी शामिल हैं, और घर जैसा महसूस करने के लिए ज़रूरी हर चीज़ देते हैं। 5 रातों या उससे अधिक की बुकिंग के लिए हम मुफ्त सफाई सेवा प्रदान करते हैं, और हमारी टीम आपकी यात्रा के दौरान आपके साथ उपयुक्त समय तय करेगी।",
        "यदि आपका कोई विशेष अनुरोध है, तो जब भी संभव हो हमें उसे पूरा करके खुशी होगी, इसलिए हमें बताने में संकोच न करें। यदि आपको अपने ठहरने के लिए पैक-एंड-प्ले क्रिब (बच्चों के लिए पालना) चाहिए, तो कृपया हमें पहले से सूचित करें, और हम सफाई के दौरान इसे आपके कमरे में लगाना सुनिश्चित करेंगे।",
        "प्वेर्तो वियेहो अपने अद्भुत परिदृश्यों से दुनियाभर के पर्यटकों को आकर्षित करता है। यह कस्बा उष्णकटिबंधीय वर्षावनों से घिरे अपने विस्तृत समुद्र तटों के लिए जाना जाता है और यहां दो राष्ट्रीय उद्यान भी हैं, मानसानियो और काहुइटा। यहां की नाइटलाइफ़ जीवंत और सजीव है, जो रात ढलने के बाद एक अनोखा अनुभव प्रदान करती है। प्वेर्तो वियेहो में ठहरने से आप इसके अनूठे आकर्षण में पूरी तरह डूब सकते हैं।",
        "हमारा घर एक ऐसे समुद्र तट के रास्ते के पास सुविधाजनक ढंग से स्थित है जो अंततः कॉक्लेस तक ले जाता है। रास्ते में आप विभिन्न प्रकार के वन्यजीव देख सकते हैं और प्राकृतिक प्रवाल जलकुंडों का आनंद ले सकते हैं। एक छिपा हुआ दर्शनीय स्थल भी खोजे जाने का इंतज़ार कर रहा है!",
        "प्वेर्तो वियेहो और इसके आसपास घूमना-फिरना बाइक या स्कूटर किराए पर लेकर सबसे सुविधाजनक होता है। इसके अलावा, एक अच्छी सार्वजनिक बस सेवा भी उपलब्ध है, जो आपको काहुइटा, मानसानियो और सिक्सोला से जोड़ती है। यदि आप गाड़ी चलाना पसंद करते हैं, तो हम निजी पार्किंग की सुविधा देते हैं। कृपया हमें बताएं यदि आपके पास एक बड़ा पिकअप ट्रक है जिसे अतिरिक्त जगह चाहिए।",
      ],
    },
    nl: {
      seoTitle: "Casa Tucano - Anders dan al het Andere in Puerto Viejo",
      seoDescription:
        "Dit huis biedt een heerlijke ervaring in het hart van Puerto Viejo, met een charmant houten appartement boven een Italiaanse bakkerij. Het appartement heeft twee comfortabele slaapkamers, een goed uitgeruste badkamer, een volledig uitgeruste keuken, een lief terras en twee airco-units.",
      heading: "Casa Tucano",
      featureName: "Huis Tucano",
      checkIn: "14:00",
      checkOut: "11:00",
      paragraphs: [
        "Dit huis biedt een heerlijke ervaring in het hart van Puerto Viejo, met een charmant houten appartement boven een Italiaanse bakkerij. Het appartement heeft twee comfortabele slaapkamers, een goed uitgeruste badkamer, een volledig uitgeruste keuken, een lief terras en twee airco-units, voor een knus verblijf.",
        "Deze appartementen bieden privéruimtes, waaronder de keuken en badkamer, met alles wat je nodig hebt om je thuis te voelen. Bij verblijven van 5 nachten of langer bieden we gratis schoonmaakdiensten aan; ons team stemt tijdens je bezoek een geschikt moment met je af.",
        "Heb je speciale wensen? We voldoen er graag aan waar mogelijk, dus aarzel niet om het ons te laten weten. Heb je tijdens je verblijf een reisbedje nodig, laat het ons dan van tevoren weten, dan zorgen we dat het tijdens de schoonmaak in je kamer klaarstaat.",
        "Puerto Viejo trekt bezoekers van over de hele wereld aan met zijn adembenemende landschappen. Het dorp staat bekend om zijn uitgestrekte stranden omzoomd door tropisch regenwoud en telt twee nationale parken, Manzanillo en Cahuita. Het nachtleven hier is levendig en bruisend en biedt een unieke ervaring na zonsondergang. Een verblijf in Puerto Viejo laat je volledig opgaan in de unieke sfeer van het dorp.",
        "Ons huis ligt gunstig dicht bij een strandpad dat uiteindelijk naar Cocles leidt. Onderweg kun je diverse dieren spotten en genieten van de natuurlijke koraalzwembaden. Ook wacht er een verborgen uitkijkpunt om te ontdekken!",
        "Puerto Viejo en omgeving verken je het handigst met een gehuurde fiets of scooter. Daarnaast is er een goede openbare busdienst die je verbindt met Cahuita, Manzanillo en Sixaola. Rijd je liever zelf, dan bieden we privéparkeren aan. Laat het ons weten als je een grotere pick-uptruck hebt die extra ruimte nodig heeft.",
      ],
    },
  },
  VillaCoral: {
    en: {
      seoTitle: "Villa Coral - Home with private pool in Playa Chiquita",
      seoDescription:
        "Discover the perfect retreat in Playa Chiquita, Puerto Viejo. Our newly built luxury villa offers an ideal vacation experience, combining comfort and convenience in a serene tropical setting.",
      heading: "Villa Coral",
      featureName: "Villa Coral",
      checkIn: "3:00 PM",
      checkOut: "12:00 PM (noon)",
      paragraphs: [
        "Discover the perfect retreat in Playa Chiquita, Puerto Viejo. Our newly built luxury villa offers an ideal vacation experience, combining comfort and convenience in a serene tropical setting.",
        "Stay connected with high-speed internet up to 100Mbps and take advantage of the dedicated workspace if you need to attend to tasks during your visit.",
        "The villa, boasting a private pool, kitchen and bathroom, has been decorated by Puerto Rican Interior designer Lourdes Menéndez",
        { text: "Relax and unwind in your own private paradise with a pristine pool just for you. The villa features a spacious main bedroom and living room, both equipped with air conditioning to escape the heat.", trailingBreak: false },
        "Do you have a special request? We would be more than happy to accommodate you if we can. Please don't hesitate to let us know.",
        "If you require a pack- and - play crib during your stay, please inform us ahead of time. We'll make sure to set it up in your room during our cleaning process.",
        "Explore the beauty of Playa Chiquita, Punta Uva and the vibrant culture of Puerto Viejo, all while having a comfortable home base to return to. Make the most of your Costa Rican getaway with this inviting villa as your accommodation.",
        "Getting around in Puerto Viejo and its surroundings is easiest by renting a bike or a scooter. However, there is also a reliable public bus service available that can take you to Cahuita, Manzanillo, and Sixaola. If you prefer to drive, we can accommodate cars as well. We offer private parking but please let us know if you have a larger pickup truck that requires additional space.",
      ],
    },
    es: {
      seoTitle: "Villa Coral - Casa con piscina privada en Playa Chiquita",
      seoDescription:
        "Descubre el retiro perfecto en Playa Chiquita, Puerto Viejo. Nuestra villa de lujo construida recientemente ofrece una experiencia vacacional ideal, combinando comodidad y conveniencia en un entorno tropical sereno.",
      heading: "Villa Coral",
      featureName: "Villa Coral",
      checkIn: "3:00 PM",
      checkOut: "12:00 PM (mediodía)",
      paragraphs: [
        "Descubre el retiro perfecto en Playa Chiquita, Puerto Viejo. Nuestra villa de lujo construida recientemente ofrece una experiencia vacacional ideal, combinando comodidad y conveniencia en un entorno tropical sereno.",
        "Mantente conectado con internet de alta velocidad de hasta 100 Mbps y aprovecha el espacio de trabajo dedicado si necesitas atender tareas durante tu visita.",
        "La villa, que cuenta con piscina privada, cocina y baño, ha sido decorada por la diseñadora de interiores puertorriqueña Lourdes Menéndez",
        { text: "Relájate y descansa en tu propio paraíso privado con una hermosa piscina de agua salada solo para ti. La villa cuenta con un amplio dormitorio principal y una sala de estar, ambos equipados con aire acondicionado para escapar del calor.", trailingBreak: false },
        "¿Tienes alguna solicitud especial? Estaremos más que encantados de atenderla si podemos. No dudes en hacérnoslo saber.",
        "Si necesitas que preparemos una cuna de viaje para tu estadía, por favor infórmanos con anticipación. Nos aseguraremos de colocarla en tu habitación durante nuestro proceso de limpieza.",
        "Explora la belleza de Playa Chiquita, Punta Uva y la vibrante cultura de Puerto Viejo, todo mientras cuentas con un hogar comodo al cual regresar. Aprovecha al máximo tu escapada a Puerto Viejo con esta acogedora villa como tu alojamiento.",
        "Moverse por Puerto Viejo y sus alrededores es más fácil alquilando una bicicleta o una scooter. Sin embargo, también hay un servicio de autobús público confiable que puede llevarte a Cahuita, Manzanillo y Sixaola. Si prefieres conducir, también podemos coordinar la entrega de vehículos. Ofrecemos estacionamiento privado, pero avísanos si tienes una camioneta grande que requiera espacio adicional.",
      ],
    },
    de: {
      seoTitle: "Villa Coral – Haus mit privatem Pool in Playa Chiquita",
      seoDescription:
        "Entdecken Sie den perfekten Rückzugsort in Playa Chiquita, Puerto Viejo. Unsere neu erbaute Luxusvilla bietet ein ideales Urlaubserlebnis und verbindet Komfort und Bequemlichkeit in einer ruhigen tropischen Umgebung.",
      heading: "Villa Coral",
      featureName: "Villa Coral",
      checkIn: "15:00 Uhr",
      checkOut: "12:00 Uhr (Mittag)",
      paragraphs: [
        "Entdecken Sie den perfekten Rückzugsort in Playa Chiquita, Puerto Viejo. Unsere neu erbaute Luxusvilla bietet ein ideales Urlaubserlebnis und verbindet Komfort und Bequemlichkeit in einer ruhigen tropischen Umgebung.",
        "Bleiben Sie mit Hochgeschwindigkeitsinternet mit bis zu 100 Mbit/s verbunden und nutzen Sie den eigenen Arbeitsbereich, falls Sie während Ihres Aufenthalts Aufgaben erledigen müssen.",
        "Die Villa mit privatem Pool, Küche und Badezimmer wurde von der puerto-ricanischen Innenarchitektin Lourdes Menéndez eingerichtet",
        { text: "Entspannen Sie und lassen Sie die Seele in Ihrem eigenen privaten Paradies mit einem makellosen Pool nur für Sie baumeln. Die Villa verfügt über ein geräumiges Hauptschlafzimmer und ein Wohnzimmer, beide mit Klimaanlage ausgestattet, um der Hitze zu entkommen.", trailingBreak: false },
        "Haben Sie einen besonderen Wunsch? Wir erfüllen ihn Ihnen gerne, wenn es uns möglich ist. Zögern Sie nicht, es uns mitzuteilen.",
        "Falls Sie während Ihres Aufenthalts ein Reisebett (Pack-and-Play) benötigen, teilen Sie uns dies bitte im Voraus mit. Wir sorgen dafür, dass es während unseres Reinigungsprozesses in Ihrem Zimmer aufgestellt wird.",
        "Erkunden Sie die Schönheit von Playa Chiquita, Punta Uva und die lebendige Kultur von Puerto Viejo, während Sie stets zu einem komfortablen Zuhause zurückkehren können. Holen Sie das Beste aus Ihrer Costa-Rica-Reise heraus mit dieser einladenden Villa als Unterkunft.",
        "Am einfachsten bewegen Sie sich in Puerto Viejo und Umgebung mit einem gemieteten Fahrrad oder Roller fort. Es gibt aber auch einen zuverlässigen öffentlichen Busservice, der Sie nach Cahuita, Manzanillo und Sixaola bringt. Wenn Sie lieber mit dem Auto fahren möchten, können wir das ebenfalls ermöglichen. Wir bieten privates Parken an, bitte teilen Sie uns jedoch mit, wenn Sie einen größeren Pickup-Truck haben, der zusätzlichen Platz benötigt.",
      ],
    },
    fr: {
      seoTitle: "Villa Coral - Maison avec piscine privée à Playa Chiquita",
      seoDescription:
        "Découvrez la retraite parfaite à Playa Chiquita, Puerto Viejo. Notre villa de luxe, construite récemment, offre une expérience de vacances idéale, alliant confort et commodité dans un cadre tropical serein.",
      heading: "Villa Coral",
      featureName: "Villa Coral",
      checkIn: "15h00",
      checkOut: "12h00 (midi)",
      paragraphs: [
        "Découvrez la retraite parfaite à Playa Chiquita, Puerto Viejo. Notre villa de luxe, construite récemment, offre une expérience de vacances idéale, alliant confort et commodité dans un cadre tropical serein.",
        "Restez connecté grâce à une connexion internet haut débit allant jusqu'à 100 Mbps et profitez de l'espace de travail dédié si vous devez vous occuper de certaines tâches pendant votre séjour.",
        "La villa, dotée d'une piscine privée, d'une cuisine et d'une salle de bain, a été décorée par la designer d'intérieur portoricaine Lourdes Menéndez",
        { text: "Détendez-vous et profitez de votre propre paradis privé avec une piscine impeccable rien que pour vous. La villa dispose d'une chambre principale spacieuse et d'un salon, tous deux climatisés pour échapper à la chaleur.", trailingBreak: false },
        "Avez-vous une demande particulière ? Nous serions plus que ravis de vous satisfaire si cela nous est possible. N'hésitez pas à nous le faire savoir.",
        "Si vous avez besoin d'un lit parapluie pendant votre séjour, merci de nous en informer à l'avance. Nous nous chargerons de l'installer dans votre chambre lors de notre passage de ménage.",
        "Explorez la beauté de Playa Chiquita, Punta Uva et la culture vibrante de Puerto Viejo, tout en ayant un point de chute confortable où revenir. Profitez au maximum de votre escapade au Costa Rica avec cette villa accueillante comme lieu d'hébergement.",
        "Pour se déplacer à Puerto Viejo et dans ses environs, le plus simple est de louer un vélo ou un scooter. Il existe également un service de bus public fiable qui peut vous emmener à Cahuita, Manzanillo et Sixaola. Si vous préférez conduire, nous pouvons également accueillir des voitures. Nous proposons un stationnement privé, mais merci de nous prévenir si vous avez un pick-up de grande taille nécessitant un espace supplémentaire.",
      ],
    },
    he: {
      seoTitle: "Villa Coral - בית עם בריכה פרטית בפלאיה צ'יקיטה",
      seoDescription:
        "גלו את המקלט המושלם בפלאיה צ'יקיטה, פוארטו ויחו. הווילה המפוארת שנבנתה לאחרונה מציעה חוויית חופשה אידיאלית, המשלבת נוחות ונוחיות בסביבה טרופית שלווה.",
      heading: "Villa Coral",
      featureName: "Villa Coral",
      checkIn: "15:00",
      checkOut: "12:00 בצהריים",
      paragraphs: [
        "גלו את המקלט המושלם בפלאיה צ'יקיטה, פוארטו ויחו. הווילה המפוארת שנבנתה לאחרונה מציעה חוויית חופשה אידיאלית, המשלבת נוחות ונוחיות בסביבה טרופית שלווה.",
        "הישארו מחוברים עם אינטרנט מהיר במהירות של עד 100Mbps, ונצלו את חלל העבודה הייעודי אם אתם צריכים לטפל במשימות במהלך הביקור.",
        "הווילה, הכוללת בריכה פרטית, מטבח וחדר רחצה, עוצבה על ידי מעצבת הפנים הפורטוריקנית לורדס מננדס",
        { text: "תוכלו להירגע ולנוח בגן העדן הפרטי שלכם, עם בריכה זוהרת המיועדת רק לכם. בווילה חדר שינה ראשי מרווח וסלון, שניהם מצוידים במיזוג אוויר כדי לברוח מהחום.", trailingBreak: false },
        "יש לכם בקשה מיוחדת? נשמח מאוד להיענות לה אם נוכל. אל תהססו לספר לנו.",
        "אם אתם זקוקים למיטת תינוק ניידת (pack-and-play) במהלך השהות, אנא עדכנו אותנו מראש. נדאג להציב אותה בחדרכם במהלך תהליך הניקיון.",
        "גלו את היופי של פלאיה צ'יקיטה, פונטה אובה והתרבות התוססת של פוארטו ויחו, כשיש לכם בסיס בית נוח לחזור אליו. נצלו את החופשה הקוסטריקנית שלכם עד תום עם הווילה המזמינה הזו כמקום האירוח שלכם.",
        "הדרך הקלה ביותר להתנייד בפוארטו ויחו ובסביבתה היא באמצעות השכרת אופניים או קטנוע. עם זאת, קיים גם שירות אוטובוסים ציבורי אמין שיכול לקחת אתכם לקאוויטה, מנסניו וסיקסאולה. אם אתם מעדיפים לנסוע ברכב, נוכל להתאים גם לכך. אנחנו מציעים חניה פרטית, אך אנא הודיעו לנו אם ברשותכם טנדר גדול שדורש שטח חניה נוסף.",
      ],
    },
    it: {
      seoTitle: "Villa Coral - Casa con piscina privata a Playa Chiquita",
      seoDescription:
        "Scopri il rifugio perfetto a Playa Chiquita, Puerto Viejo. La nostra villa di lusso di nuova costruzione offre un'esperienza di vacanza ideale, unendo comfort e convenienza in una serena atmosfera tropicale.",
      heading: "Villa Coral",
      featureName: "Villa Coral",
      checkIn: "15:00",
      checkOut: "12:00 (mezzogiorno)",
      paragraphs: [
        "Scopri il rifugio perfetto a Playa Chiquita, Puerto Viejo. La nostra villa di lusso di nuova costruzione offre un'esperienza di vacanza ideale, unendo comfort e convenienza in una serena atmosfera tropicale.",
        "Resta connesso con internet ad alta velocità fino a 100Mbps e approfitta dello spazio di lavoro dedicato se hai bisogno di sbrigare alcune attività durante il tuo soggiorno.",
        "La villa, che vanta una piscina privata, cucina e bagno, è stata arredata dall'interior designer portoricana Lourdes Menéndez",
        { text: "Rilassati e distenditi nel tuo paradiso privato, con una piscina incontaminata tutta per te. La villa dispone di un'ampia camera da letto principale e di un soggiorno, entrambi dotati di aria condizionata per sfuggire al caldo.", trailingBreak: false },
        "Hai una richiesta speciale? Saremo più che felici di accontentarti, se possibile. Non esitare a farcelo sapere.",
        "Se hai bisogno di un lettino da campeggio (pack-and-play) durante il tuo soggiorno, faccelo sapere in anticipo. Ci assicureremo di sistemarlo nella tua camera durante il processo di pulizia.",
        "Esplora la bellezza di Playa Chiquita, Punta Uva e la vivace cultura di Puerto Viejo, avendo sempre una comoda base a cui tornare. Sfrutta al massimo la tua vacanza in Costa Rica scegliendo questa accogliente villa come tuo alloggio.",
        "Il modo più semplice per spostarsi a Puerto Viejo e nei dintorni è noleggiare una bicicletta o uno scooter. È comunque disponibile anche un affidabile servizio di autobus pubblici che può portarti a Cahuita, Manzanillo e Sixaola. Se preferisci guidare, possiamo accogliere anche le auto. Offriamo parcheggio privato, ma facci sapere se hai un pick-up di grandi dimensioni che richiede spazio aggiuntivo.",
      ],
    },
    pt: {
      seoTitle: "Villa Coral - Casa com piscina privada em Playa Chiquita",
      seoDescription:
        "Descubra o retiro perfeito em Playa Chiquita, Puerto Viejo. A nossa vila de luxo, recém-construída, oferece uma experiência de férias ideal, combinando conforto e comodidade num ambiente tropical sereno.",
      heading: "Villa Coral",
      featureName: "Villa Coral",
      checkIn: "15h00",
      checkOut: "12h00 (meio-dia)",
      paragraphs: [
        "Descubra o retiro perfeito em Playa Chiquita, Puerto Viejo. A nossa vila de luxo, recém-construída, oferece uma experiência de férias ideal, combinando conforto e comodidade num ambiente tropical sereno.",
        "Mantenha-se ligado com internet de alta velocidade até 100 Mbps e aproveite o espaço de trabalho dedicado, caso precise de tratar de tarefas durante a sua visita.",
        "A vila, com piscina privada, cozinha e casa de banho, foi decorada pela designer de interiores porto-riquenha Lourdes Menéndez",
        { text: "Relaxe e descontraia no seu próprio paraíso privado, com uma piscina impecável só para si. A vila conta com um amplo quarto principal e sala de estar, ambos equipados com ar condicionado para escapar ao calor.", trailingBreak: false },
        "Tem algum pedido especial? Teremos todo o gosto em atendê-lo(a), se pudermos. Não hesite em informar-nos.",
        "Se precisar de um berço de viagem durante a sua estadia, por favor informe-nos com antecedência. Iremos garantir que fica montado no seu quarto durante o processo de limpeza.",
        "Explore a beleza de Playa Chiquita, Punta Uva e a vibrante cultura de Puerto Viejo, tendo sempre uma casa confortável para onde regressar. Aproveite ao máximo a sua escapada à Costa Rica com esta acolhedora vila como alojamento.",
        "A forma mais fácil de se deslocar em Puerto Viejo e arredores é alugando uma bicicleta ou uma scooter. No entanto, também existe um serviço de autocarro público fiável que o pode levar a Cahuita, Manzanillo e Sixaola. Se preferir conduzir, também podemos acomodar automóveis. Oferecemos estacionamento privado, mas avise-nos se tiver uma carrinha pick-up maior que precise de espaço adicional.",
      ],
    },
    hi: {
      seoTitle: "Villa Coral - प्लाया चिकिता में निजी स्विमिंग पूल वाला घर",
      seoDescription:
        "प्लाया चिकिता, प्वेर्तो वियेहो में एक बेहतरीन रिट्रीट खोजें। हमारा नवनिर्मित लक्ज़री विला एक शांत उष्णकटिबंधीय परिवेश में आराम और सुविधा को जोड़ते हुए एक आदर्श छुट्टियों का अनुभव प्रदान करता है।",
      heading: "Villa Coral",
      featureName: "Villa Coral",
      checkIn: "दोपहर 3:00 बजे",
      checkOut: "दोपहर 12:00 बजे (मध्याह्न)",
      paragraphs: [
        "प्लाया चिकिता, प्वेर्तो वियेहो में एक बेहतरीन रिट्रीट खोजें। हमारा नवनिर्मित लक्ज़री विला एक शांत उष्णकटिबंधीय परिवेश में आराम और सुविधा को जोड़ते हुए एक आदर्श छुट्टियों का अनुभव प्रदान करता है।",
        "100Mbps तक की हाई-स्पीड इंटरनेट के साथ जुड़े रहें, और अगर आपको अपनी यात्रा के दौरान काम निपटाना हो तो समर्पित कार्यक्षेत्र (वर्कस्पेस) का लाभ उठाएं।",
        "निजी स्विमिंग पूल, रसोई और बाथरूम वाले इस विला को प्वेर्तो रिको की इंटीरियर डिज़ाइनर लॉर्डेस मेनेंडेज़ ने सजाया है",
        { text: "अपने खुद के निजी स्वर्ग में आराम करें और तरोताज़ा हों, जहां सिर्फ आपके लिए एक बेदाग स्विमिंग पूल है। इस विला में एक विशाल मुख्य शयनकक्ष और बैठक कक्ष है, दोनों में गर्मी से राहत पाने के लिए एयर कंडीशनर लगा है।", trailingBreak: false },
        "क्या आपका कोई विशेष अनुरोध है? यदि हम कर सकें, तो हमें आपकी मदद करके बेहद खुशी होगी। कृपया हमें बताने में संकोच न करें।",
        "यदि आपको अपने ठहरने के दौरान पैक-एंड-प्ले क्रिब (बच्चों के लिए पालना) चाहिए, तो कृपया हमें पहले से सूचित करें। हम सफाई के दौरान इसे आपके कमरे में लगाना सुनिश्चित करेंगे।",
        "प्लाया चिकिता, पुंटा उवा की खूबसूरती और प्वेर्तो वियेहो की जीवंत संस्कृति का आनंद लें, और साथ ही लौटने के लिए एक आरामदायक ठिकाना भी पाएं। इस आकर्षक विला में ठहरकर अपनी कोस्टा रिका यात्रा का पूरा लुत्फ़ उठाएं।",
        "प्वेर्तो वियेहो और इसके आसपास घूमने-फिरने का सबसे आसान तरीका है बाइक या स्कूटर किराए पर लेना। हालांकि, एक भरोसेमंद सार्वजनिक बस सेवा भी उपलब्ध है, जो आपको काहुइटा, मानसानियो और सिक्सोला तक ले जा सकती है। यदि आप गाड़ी चलाना पसंद करते हैं, तो हम कारों की भी व्यवस्था कर सकते हैं। हम निजी पार्किंग की सुविधा देते हैं, लेकिन कृपया हमें बताएं यदि आपके पास एक बड़ा पिकअप ट्रक है जिसे अतिरिक्त जगह चाहिए।",
      ],
    },
    nl: {
      seoTitle: "Villa Coral - Huis met Privézwembad in Playa Chiquita",
      seoDescription:
        "Ontdek de perfecte retraite in Playa Chiquita, Puerto Viejo. Onze nieuw gebouwde luxevilla biedt een ideale vakantie-ervaring, met een combinatie van comfort en gemak in een rustige tropische omgeving.",
      heading: "Villa Coral",
      featureName: "Villa Coral",
      checkIn: "15:00",
      checkOut: "12:00 (middag)",
      paragraphs: [
        "Ontdek de perfecte retraite in Playa Chiquita, Puerto Viejo. Onze nieuw gebouwde luxevilla biedt een ideale vakantie-ervaring, met een combinatie van comfort en gemak in een rustige tropische omgeving.",
        "Blijf verbonden met snel internet tot 100Mbps en maak gebruik van de aparte werkplek als je tijdens je verblijf nog wat taken moet afhandelen.",
        "De villa, met een privézwembad, keuken en badkamer, is ingericht door de Puerto Ricaanse interieurontwerper Lourdes Menéndez",
        { text: "Ontspan en kom tot rust in je eigen privéparadijs, met een kraakhelder zwembad enkel voor jou. De villa beschikt over een ruime hoofdslaapkamer en woonkamer, beide voorzien van airconditioning om de hitte te ontvluchten.", trailingBreak: false },
        "Heb je een speciaal verzoek? We helpen je graag verder als het mogelijk is. Aarzel niet om het ons te laten weten.",
        "Heb je tijdens je verblijf een reisbedje nodig? Laat het ons van tevoren weten, dan zorgen we dat het tijdens de schoonmaak in je kamer klaarstaat.",
        "Ontdek de schoonheid van Playa Chiquita, Punta Uva en de levendige cultuur van Puerto Viejo, terwijl je steeds kunt terugkeren naar een comfortabele thuisbasis. Haal het maximale uit je Costa Ricaanse uitstapje met deze uitnodigende villa als onderkomen.",
        "De makkelijkste manier om je in Puerto Viejo en omgeving te verplaatsen is met een gehuurde fiets of scooter. Er is ook een betrouwbare openbare busdienst die je naar Cahuita, Manzanillo en Sixaola brengt. Rijd je liever zelf, dan is dat ook mogelijk. We bieden privéparkeren aan, maar laat het ons weten als je een grotere pick-uptruck hebt die extra ruimte nodig heeft.",
      ],
    },
  },
  VillaMar: {
    en: {
      seoTitle: "Villa Mar - Home with private pool in Playa Chiquita",
      seoDescription:
        "Discover the perfect retreat in Playa Chiquita, Puerto Viejo. Our newly built luxury villa offers an ideal vacation experience, combining comfort and convenience in a serene tropical setting.",
      heading: "Villa Mar",
      featureName: "Villa Mar",
      checkIn: "3:00 PM",
      checkOut: "12:00 PM (noon)",
      paragraphs: [
        "Discover the perfect retreat in Playa Chiquita, Puerto Viejo. Our newly built luxury villa offers an ideal vacation experience, combining comfort and convenience in a serene tropical setting.",
        "Stay connected with high-speed internet up to 100Mbps and take advantage of the dedicated workspace if you need to attend to tasks during your visit.",
        "The villa, boasting a private pool, kitchen and bathroom, has been decorated by Puerto Rican Interior designer Lourdes Menéndez",
        { text: "Relax and unwind in your own private paradise with a pristine pool just for you. The villa features a spacious main bedroom and living room, both equipped with air conditioning to escape the heat.", trailingBreak: false },
        "Do you have a special request? We would be more than happy to accommodate you if we can. Please don't hesitate to let us know.",
        "If you require a pack- and - play crib during your stay, please inform us ahead of time. We'll make sure to set it up in your room during our cleaning process.",
        "Explore the beauty of Playa Chiquita, Punta Uva and the vibrant culture of Puerto Viejo, all while having a comfortable home base to return to. Make the most of your Costa Rican getaway with this inviting villa as your accommodation.",
        { text: "Getting around in Puerto Viejo and its surroundings is easiest by renting a bike or a scooter. However, there is also a reliable public bus service available that can take you to Cahuita, Manzanillo, and Sixaola. If you prefer to drive, we can accommodate cars as well. We offer private parking but please let us know if you have a larger pickup truck that requires additional space.", trailingBreak: false },
      ],
    },
    es: {
      seoTitle: "Villa Mar - Casa con piscina privada en Playa Chiquita",
      seoDescription:
        "Descubre el retiro perfecto en Playa Chiquita, Puerto Viejo. Nuestra villa de lujo construida recientemente ofrece una experiencia vacacional ideal, combinando comodidad y conveniencia en un entorno tropical sereno.",
      heading: "Villa Mar",
      featureName: "Villa Mar",
      checkIn: "3:00 PM",
      checkOut: "12:00 PM (mediodía)",
      paragraphs: [
        "Descubre el retiro perfecto en Playa Chiquita, Puerto Viejo. Nuestra villa de lujo construida recientemente ofrece una experiencia vacacional ideal, combinando comodidad y conveniencia en un entorno tropical sereno.",
        "Mantente conectado con internet de alta velocidad de hasta 100 Mbps y aprovecha el espacio de trabajo dedicado si necesitas atender tareas durante tu visita.",
        "La villa, que cuenta con piscina privada, cocina y baño, ha sido decorada por la diseñadora de interiores puertorriqueña Lourdes Menéndez",
        { text: "Relájate y descansa en tu propio paraíso privado con una hermosa piscina de agua salada solo para ti. La villa cuenta con un amplio dormitorio principal y una sala de estar, ambos equipados con aire acondicionado para escapar del calor.", trailingBreak: false },
        "¿Tienes alguna solicitud especial? Estaremos más que encantados de atenderla si podemos. No dudes en hacérnoslo saber.",
        "Si necesitas que preparemos una cuna de viaje para tu estadía, por favor infórmanos con anticipación. Nos aseguraremos de colocarla en tu habitación durante nuestro proceso de limpieza.",
        "Explora la belleza de Playa Chiquita, Punta Uva y la vibrante cultura de Puerto Viejo, todo mientras cuentas con un hogar comodo al cual regresar. Aprovecha al máximo tu escapada a Puerto Viejo con esta acogedora villa como tu alojamiento.",
        { text: "Moverse por Puerto Viejo y sus alrededores es más fácil alquilando una bicicleta o una scooter. Sin embargo, también hay un servicio de autobús público confiable que puede llevarte a Cahuita, Manzanillo y Sixaola. Si prefieres conducir, también podemos coordinar la entrega de vehículos. Ofrecemos estacionamiento privado, pero avísanos si tienes una camioneta grande que requiera espacio adicional.", trailingBreak: false },
      ],
    },
    de: {
      seoTitle: "Villa Mar – Haus mit privatem Pool in Playa Chiquita",
      seoDescription:
        "Entdecken Sie den perfekten Rückzugsort in Playa Chiquita, Puerto Viejo. Unsere neu erbaute Luxusvilla bietet ein ideales Urlaubserlebnis und verbindet Komfort und Bequemlichkeit in einer ruhigen tropischen Umgebung.",
      heading: "Villa Mar",
      featureName: "Villa Mar",
      checkIn: "15:00 Uhr",
      checkOut: "12:00 Uhr (Mittag)",
      paragraphs: [
        "Entdecken Sie den perfekten Rückzugsort in Playa Chiquita, Puerto Viejo. Unsere neu erbaute Luxusvilla bietet ein ideales Urlaubserlebnis und verbindet Komfort und Bequemlichkeit in einer ruhigen tropischen Umgebung.",
        "Bleiben Sie mit Hochgeschwindigkeitsinternet mit bis zu 100 Mbit/s verbunden und nutzen Sie den eigenen Arbeitsbereich, falls Sie während Ihres Aufenthalts Aufgaben erledigen müssen.",
        "Die Villa mit privatem Pool, Küche und Badezimmer wurde von der puerto-ricanischen Innenarchitektin Lourdes Menéndez eingerichtet",
        { text: "Entspannen Sie und lassen Sie die Seele in Ihrem eigenen privaten Paradies mit einem makellosen Pool nur für Sie baumeln. Die Villa verfügt über ein geräumiges Hauptschlafzimmer und ein Wohnzimmer, beide mit Klimaanlage ausgestattet, um der Hitze zu entkommen.", trailingBreak: false },
        "Haben Sie einen besonderen Wunsch? Wir erfüllen ihn Ihnen gerne, wenn es uns möglich ist. Zögern Sie nicht, es uns mitzuteilen.",
        "Falls Sie während Ihres Aufenthalts ein Reisebett (Pack-and-Play) benötigen, teilen Sie uns dies bitte im Voraus mit. Wir sorgen dafür, dass es während unseres Reinigungsprozesses in Ihrem Zimmer aufgestellt wird.",
        "Erkunden Sie die Schönheit von Playa Chiquita, Punta Uva und die lebendige Kultur von Puerto Viejo, während Sie stets zu einem komfortablen Zuhause zurückkehren können. Holen Sie das Beste aus Ihrer Costa-Rica-Reise heraus mit dieser einladenden Villa als Unterkunft.",
        { text: "Am einfachsten bewegen Sie sich in Puerto Viejo und Umgebung mit einem gemieteten Fahrrad oder Roller fort. Es gibt aber auch einen zuverlässigen öffentlichen Busservice, der Sie nach Cahuita, Manzanillo und Sixaola bringt. Wenn Sie lieber mit dem Auto fahren möchten, können wir das ebenfalls ermöglichen. Wir bieten privates Parken an, bitte teilen Sie uns jedoch mit, wenn Sie einen größeren Pickup-Truck haben, der zusätzlichen Platz benötigt.", trailingBreak: false },
      ],
    },
    fr: {
      seoTitle: "Villa Mar - Maison avec piscine privée à Playa Chiquita",
      seoDescription:
        "Découvrez la retraite parfaite à Playa Chiquita, Puerto Viejo. Notre villa de luxe, construite récemment, offre une expérience de vacances idéale, alliant confort et commodité dans un cadre tropical serein.",
      heading: "Villa Mar",
      featureName: "Villa Mar",
      checkIn: "15h00",
      checkOut: "12h00 (midi)",
      paragraphs: [
        "Découvrez la retraite parfaite à Playa Chiquita, Puerto Viejo. Notre villa de luxe, construite récemment, offre une expérience de vacances idéale, alliant confort et commodité dans un cadre tropical serein.",
        "Restez connecté grâce à une connexion internet haut débit allant jusqu'à 100 Mbps et profitez de l'espace de travail dédié si vous devez vous occuper de certaines tâches pendant votre séjour.",
        "La villa, dotée d'une piscine privée, d'une cuisine et d'une salle de bain, a été décorée par la designer d'intérieur portoricaine Lourdes Menéndez",
        { text: "Détendez-vous et profitez de votre propre paradis privé avec une piscine impeccable rien que pour vous. La villa dispose d'une chambre principale spacieuse et d'un salon, tous deux climatisés pour échapper à la chaleur.", trailingBreak: false },
        "Avez-vous une demande particulière ? Nous serions plus que ravis de vous satisfaire si cela nous est possible. N'hésitez pas à nous le faire savoir.",
        "Si vous avez besoin d'un lit parapluie pendant votre séjour, merci de nous en informer à l'avance. Nous nous chargerons de l'installer dans votre chambre lors de notre passage de ménage.",
        "Explorez la beauté de Playa Chiquita, Punta Uva et la culture vibrante de Puerto Viejo, tout en ayant un point de chute confortable où revenir. Profitez au maximum de votre escapade au Costa Rica avec cette villa accueillante comme lieu d'hébergement.",
        { text: "Pour se déplacer à Puerto Viejo et dans ses environs, le plus simple est de louer un vélo ou un scooter. Il existe également un service de bus public fiable qui peut vous emmener à Cahuita, Manzanillo et Sixaola. Si vous préférez conduire, nous pouvons également accueillir des voitures. Nous proposons un stationnement privé, mais merci de nous prévenir si vous avez un pick-up de grande taille nécessitant un espace supplémentaire.", trailingBreak: false },
      ],
    },
    he: {
      seoTitle: "Villa Mar - בית עם בריכה פרטית בפלאיה צ'יקיטה",
      seoDescription:
        "גלו את המקלט המושלם בפלאיה צ'יקיטה, פוארטו ויחו. הווילה המפוארת שנבנתה לאחרונה מציעה חוויית חופשה אידיאלית, המשלבת נוחות ונוחיות בסביבה טרופית שלווה.",
      heading: "Villa Mar",
      featureName: "Villa Mar",
      checkIn: "15:00",
      checkOut: "12:00 בצהריים",
      paragraphs: [
        "גלו את המקלט המושלם בפלאיה צ'יקיטה, פוארטו ויחו. הווילה המפוארת שנבנתה לאחרונה מציעה חוויית חופשה אידיאלית, המשלבת נוחות ונוחיות בסביבה טרופית שלווה.",
        "הישארו מחוברים עם אינטרנט מהיר במהירות של עד 100Mbps, ונצלו את חלל העבודה הייעודי אם אתם צריכים לטפל במשימות במהלך הביקור.",
        "הווילה, הכוללת בריכה פרטית, מטבח וחדר רחצה, עוצבה על ידי מעצבת הפנים הפורטוריקנית לורדס מננדס",
        { text: "תוכלו להירגע ולנוח בגן העדן הפרטי שלכם, עם בריכה זוהרת המיועדת רק לכם. בווילה חדר שינה ראשי מרווח וסלון, שניהם מצוידים במיזוג אוויר כדי לברוח מהחום.", trailingBreak: false },
        "יש לכם בקשה מיוחדת? נשמח מאוד להיענות לה אם נוכל. אל תהססו לספר לנו.",
        "אם אתם זקוקים למיטת תינוק ניידת (pack-and-play) במהלך השהות, אנא עדכנו אותנו מראש. נדאג להציב אותה בחדרכם במהלך תהליך הניקיון.",
        "גלו את היופי של פלאיה צ'יקיטה, פונטה אובה והתרבות התוססת של פוארטו ויחו, כשיש לכם בסיס בית נוח לחזור אליו. נצלו את החופשה הקוסטריקנית שלכם עד תום עם הווילה המזמינה הזו כמקום האירוח שלכם.",
        { text: "הדרך הקלה ביותר להתנייד בפוארטו ויחו ובסביבתה היא באמצעות השכרת אופניים או קטנוע. עם זאת, קיים גם שירות אוטובוסים ציבורי אמין שיכול לקחת אתכם לקאוויטה, מנסניו וסיקסאולה. אם אתם מעדיפים לנסוע ברכב, נוכל להתאים גם לכך. אנחנו מציעים חניה פרטית, אך אנא הודיעו לנו אם ברשותכם טנדר גדול שדורש שטח חניה נוסף.", trailingBreak: false },
      ],
    },
    it: {
      seoTitle: "Villa Mar - Casa con piscina privata a Playa Chiquita",
      seoDescription:
        "Scopri il rifugio perfetto a Playa Chiquita, Puerto Viejo. La nostra villa di lusso di nuova costruzione offre un'esperienza di vacanza ideale, unendo comfort e convenienza in una serena atmosfera tropicale.",
      heading: "Villa Mar",
      featureName: "Villa Mar",
      checkIn: "15:00",
      checkOut: "12:00 (mezzogiorno)",
      paragraphs: [
        "Scopri il rifugio perfetto a Playa Chiquita, Puerto Viejo. La nostra villa di lusso di nuova costruzione offre un'esperienza di vacanza ideale, unendo comfort e convenienza in una serena atmosfera tropicale.",
        "Resta connesso con internet ad alta velocità fino a 100Mbps e approfitta dello spazio di lavoro dedicato se hai bisogno di sbrigare alcune attività durante il tuo soggiorno.",
        "La villa, che vanta una piscina privata, cucina e bagno, è stata arredata dall'interior designer portoricana Lourdes Menéndez",
        { text: "Rilassati e distenditi nel tuo paradiso privato, con una piscina incontaminata tutta per te. La villa dispone di un'ampia camera da letto principale e di un soggiorno, entrambi dotati di aria condizionata per sfuggire al caldo.", trailingBreak: false },
        "Hai una richiesta speciale? Saremo più che felici di accontentarti, se possibile. Non esitare a farcelo sapere.",
        "Se hai bisogno di un lettino da campeggio (pack-and-play) durante il tuo soggiorno, faccelo sapere in anticipo. Ci assicureremo di sistemarlo nella tua camera durante il processo di pulizia.",
        "Esplora la bellezza di Playa Chiquita, Punta Uva e la vivace cultura di Puerto Viejo, avendo sempre una comoda base a cui tornare. Sfrutta al massimo la tua vacanza in Costa Rica scegliendo questa accogliente villa come tuo alloggio.",
        { text: "Il modo più semplice per spostarsi a Puerto Viejo e nei dintorni è noleggiare una bicicletta o uno scooter. È comunque disponibile anche un affidabile servizio di autobus pubblici che può portarti a Cahuita, Manzanillo e Sixaola. Se preferisci guidare, possiamo accogliere anche le auto. Offriamo parcheggio privato, ma facci sapere se hai un pick-up di grandi dimensioni che richiede spazio aggiuntivo.", trailingBreak: false },
      ],
    },
    pt: {
      seoTitle: "Villa Mar - Casa com piscina privada em Playa Chiquita",
      seoDescription:
        "Descubra o retiro perfeito em Playa Chiquita, Puerto Viejo. A nossa vila de luxo, recém-construída, oferece uma experiência de férias ideal, combinando conforto e comodidade num ambiente tropical sereno.",
      heading: "Villa Mar",
      featureName: "Villa Mar",
      checkIn: "15h00",
      checkOut: "12h00 (meio-dia)",
      paragraphs: [
        "Descubra o retiro perfeito em Playa Chiquita, Puerto Viejo. A nossa vila de luxo, recém-construída, oferece uma experiência de férias ideal, combinando conforto e comodidade num ambiente tropical sereno.",
        "Mantenha-se ligado com internet de alta velocidade até 100 Mbps e aproveite o espaço de trabalho dedicado, caso precise de tratar de tarefas durante a sua visita.",
        "A vila, com piscina privada, cozinha e casa de banho, foi decorada pela designer de interiores porto-riquenha Lourdes Menéndez",
        { text: "Relaxe e descontraia no seu próprio paraíso privado, com uma piscina impecável só para si. A vila conta com um amplo quarto principal e sala de estar, ambos equipados com ar condicionado para escapar ao calor.", trailingBreak: false },
        "Tem algum pedido especial? Teremos todo o gosto em atendê-lo(a), se pudermos. Não hesite em informar-nos.",
        "Se precisar de um berço de viagem durante a sua estadia, por favor informe-nos com antecedência. Iremos garantir que fica montado no seu quarto durante o processo de limpeza.",
        "Explore a beleza de Playa Chiquita, Punta Uva e a vibrante cultura de Puerto Viejo, tendo sempre uma casa confortável para onde regressar. Aproveite ao máximo a sua escapada à Costa Rica com esta acolhedora vila como alojamento.",
        { text: "A forma mais fácil de se deslocar em Puerto Viejo e arredores é alugando uma bicicleta ou uma scooter. No entanto, também existe um serviço de autocarro público fiável que o pode levar a Cahuita, Manzanillo e Sixaola. Se preferir conduzir, também podemos acomodar automóveis. Oferecemos estacionamento privado, mas avise-nos se tiver uma carrinha pick-up maior que precise de espaço adicional.", trailingBreak: false },
      ],
    },
    hi: {
      seoTitle: "Villa Mar - प्लाया चिकिता में निजी स्विमिंग पूल वाला घर",
      seoDescription:
        "प्लाया चिकिता, प्वेर्तो वियेहो में एक बेहतरीन रिट्रीट खोजें। हमारा नवनिर्मित लक्ज़री विला एक शांत उष्णकटिबंधीय परिवेश में आराम और सुविधा को जोड़ते हुए एक आदर्श छुट्टियों का अनुभव प्रदान करता है।",
      heading: "Villa Mar",
      featureName: "Villa Mar",
      checkIn: "दोपहर 3:00 बजे",
      checkOut: "दोपहर 12:00 बजे (मध्याह्न)",
      paragraphs: [
        "प्लाया चिकिता, प्वेर्तो वियेहो में एक बेहतरीन रिट्रीट खोजें। हमारा नवनिर्मित लक्ज़री विला एक शांत उष्णकटिबंधीय परिवेश में आराम और सुविधा को जोड़ते हुए एक आदर्श छुट्टियों का अनुभव प्रदान करता है।",
        "100Mbps तक की हाई-स्पीड इंटरनेट के साथ जुड़े रहें, और अगर आपको अपनी यात्रा के दौरान काम निपटाना हो तो समर्पित कार्यक्षेत्र (वर्कस्पेस) का लाभ उठाएं।",
        "निजी स्विमिंग पूल, रसोई और बाथरूम वाले इस विला को प्वेर्तो रिको की इंटीरियर डिज़ाइनर लॉर्डेस मेनेंडेज़ ने सजाया है",
        { text: "अपने खुद के निजी स्वर्ग में आराम करें और तरोताज़ा हों, जहां सिर्फ आपके लिए एक बेदाग स्विमिंग पूल है। इस विला में एक विशाल मुख्य शयनकक्ष और बैठक कक्ष है, दोनों में गर्मी से राहत पाने के लिए एयर कंडीशनर लगा है।", trailingBreak: false },
        "क्या आपका कोई विशेष अनुरोध है? यदि हम कर सकें, तो हमें आपकी मदद करके बेहद खुशी होगी। कृपया हमें बताने में संकोच न करें।",
        "यदि आपको अपने ठहरने के दौरान पैक-एंड-प्ले क्रिब (बच्चों के लिए पालना) चाहिए, तो कृपया हमें पहले से सूचित करें। हम सफाई के दौरान इसे आपके कमरे में लगाना सुनिश्चित करेंगे।",
        "प्लाया चिकिता, पुंटा उवा की खूबसूरती और प्वेर्तो वियेहो की जीवंत संस्कृति का आनंद लें, और साथ ही लौटने के लिए एक आरामदायक ठिकाना भी पाएं। इस आकर्षक विला में ठहरकर अपनी कोस्टा रिका यात्रा का पूरा लुत्फ़ उठाएं।",
        { text: "प्वेर्तो वियेहो और इसके आसपास घूमने-फिरने का सबसे आसान तरीका है बाइक या स्कूटर किराए पर लेना। हालांकि, एक भरोसेमंद सार्वजनिक बस सेवा भी उपलब्ध है, जो आपको काहुइटा, मानसानियो और सिक्सोला तक ले जा सकती है। यदि आप गाड़ी चलाना पसंद करते हैं, तो हम कारों की भी व्यवस्था कर सकते हैं। हम निजी पार्किंग की सुविधा देते हैं, लेकिन कृपया हमें बताएं यदि आपके पास एक बड़ा पिकअप ट्रक है जिसे अतिरिक्त जगह चाहिए।", trailingBreak: false },
      ],
    },
    nl: {
      seoTitle: "Villa Mar - Huis met Privézwembad in Playa Chiquita",
      seoDescription:
        "Ontdek de perfecte retraite in Playa Chiquita, Puerto Viejo. Onze nieuw gebouwde luxevilla biedt een ideale vakantie-ervaring, met een combinatie van comfort en gemak in een rustige tropische omgeving.",
      heading: "Villa Mar",
      featureName: "Villa Mar",
      checkIn: "15:00",
      checkOut: "12:00 (middag)",
      paragraphs: [
        "Ontdek de perfecte retraite in Playa Chiquita, Puerto Viejo. Onze nieuw gebouwde luxevilla biedt een ideale vakantie-ervaring, met een combinatie van comfort en gemak in een rustige tropische omgeving.",
        "Blijf verbonden met snel internet tot 100Mbps en maak gebruik van de aparte werkplek als je tijdens je verblijf nog wat taken moet afhandelen.",
        "De villa, met een privézwembad, keuken en badkamer, is ingericht door de Puerto Ricaanse interieurontwerper Lourdes Menéndez",
        { text: "Ontspan en kom tot rust in je eigen privéparadijs, met een kraakhelder zwembad enkel voor jou. De villa beschikt over een ruime hoofdslaapkamer en woonkamer, beide voorzien van airconditioning om de hitte te ontvluchten.", trailingBreak: false },
        "Heb je een speciaal verzoek? We helpen je graag verder als het mogelijk is. Aarzel niet om het ons te laten weten.",
        "Heb je tijdens je verblijf een reisbedje nodig? Laat het ons van tevoren weten, dan zorgen we dat het tijdens de schoonmaak in je kamer klaarstaat.",
        "Ontdek de schoonheid van Playa Chiquita, Punta Uva en de levendige cultuur van Puerto Viejo, terwijl je steeds kunt terugkeren naar een comfortabele thuisbasis. Haal het maximale uit je Costa Ricaanse uitstapje met deze uitnodigende villa als onderkomen.",
        { text: "De makkelijkste manier om je in Puerto Viejo en omgeving te verplaatsen is met een gehuurde fiets of scooter. Er is ook een betrouwbare openbare busdienst die je naar Cahuita, Manzanillo en Sixaola brengt. Rijd je liever zelf, dan is dat ook mogelijk. We bieden privéparkeren aan, maar laat het ons weten als je een grotere pick-uptruck hebt die extra ruimte nodig heeft.", trailingBreak: false },
      ],
    },
  },
};

export function listingContent(key: ListingKey, locale: Locale): ListingContent {
  const byLocale = CONTENT[key];
  return byLocale[locale] ?? byLocale[DEFAULT_LOCALE]!;
}
