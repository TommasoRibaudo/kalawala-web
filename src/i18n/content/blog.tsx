import React from 'react';
import type { Locale } from '../locales';

/**
 * Long-form copy for the ten blog articles, Phase 3c.
 *
 * Unlike listings.ts, there is no single shared shape here: the survey behind
 * this phase found the ten EN/ES pairs 32-80% identical, meaning the articles
 * are not one kind of content with different words, the way the listing
 * descriptions were. Each export below is purpose-built for its one article's
 * structure — headings, lists and embedded components land wherever that
 * article actually puts them — following the precedent `discover.tsx` set for
 * prose that is not a plain paragraph array.
 *
 * Per the strings-vs-prose rule established in 3a, this file holds only the
 * paragraph text and headings that differ per locale. The React components
 * threaded between paragraphs (StayRecommendation, WhyStayWithUs, Smoobu2)
 * stay in the page component, with locale-appropriate props passed in from
 * there — they are not text to translate.
 */

export interface TenHoursInPuertoContent {
  seoTitle: string;
  seoDescription: string;
  heading: string;
  /** Rendered before the embedded StayRecommendation block. */
  paragraphsBeforeStay: React.ReactNode[];
  stayRecommendationTitle: string;
  /** Rendered after it, including the bold/italic guide-hike paragraph. */
  paragraphsAfterStay: React.ReactNode[];
}

const tenHoursInPuerto: Partial<Record<Locale, TenHoursInPuertoContent>> = {
  en: {
    seoTitle: 'Ten hours to explore Cahuita',
    seoDescription:
      "If you only have ten hours to explore Cahuita, let's make the most of our time! We start our adventure early, waking up at 7 am. The first thing is to have a coffee and enjoy a delicious ham and cheese croissant fresh out of the oven at Degustibus Bakery.",
    heading: 'Ten hours to explore Cahuita',
    paragraphsBeforeStay: [
      "If you only have ten hours to explore Cahuita, let's make the most of our time! We start our adventure early, waking up at 7 am. The first thing is to have a coffee and enjoy a delicious ham and cheese croissant fresh out of the oven at Degustibus Bakery.",
      "After the delicious breakfast, we walked to the bus stop located near the town's basketball court, in front of the Deelite ice cream shop. It's important to know that there are two bus stops in the area: the larger one is for the MEPE buses going to San José, and the smaller one is for the buses going to Limón. We'll take the latter. You can buy the ticket on the same day or pay directly when boarding the bus. The ticket office is a small booth next to the shuttle.",
      "We take the bus that passes by our stop at 8:20 am. The journey takes approximately 30 minutes, and we get off at the main terminal in Cahuita, which is very close to our first destination: Cahuita National Park. With the help of Google Maps and the locals, we head in the direction, observing the hustle of the town as they prepare to welcome tourists.",
      "Cahuita National Park is open from 8 am to 4 pm in both sectors: Playa Blanca and Puerto Vargas. Today we will visit Playa Blanca, where the entrance is free, although a voluntary contribution is accepted. Remember that, being a national park, the entry of domestic animals and alcoholic beverages is not allowed.",
    ],
    stayRecommendationTitle: 'Where to stay when exploring Cahuita?',
    paragraphsAfterStay: [
      <b key="hike"><i>We arrive at the park at 9:15 am, just when the sun starts to warm up. We hire a guide for our hike since we want to learn about the park's biodiversity and observe species that are sometimes hard to see on our own. We manage to see different animals like bird species, as well as hear and see howler monkeys, sloths, and many species of flora. The hike took approximately two hours.</i></b>,
      "After the hike, we went straight to have lunch at a typical soda called Kawe, where we enjoyed a delicious rice and beans that gave us the energy to continue exploring this calm and beautiful town. Then, we took a stroll through the town's shops, where we bought some souvenirs.",
      'Our next stop was some beautiful natural pools we had heard about and were eager to see. We were amazed by this place! Natural pools in a less crowded area, perfect for relaxing.',
      "We still have a few hours left, and at 4 pm we head back to the center of Cahuita to enjoy a delicious Pati at Delrita, whose reputation is well-deserved—it's delicious! Thus, we are wrapping up our day. We head to the bus terminal to catch the 5:15 pm bus to Puerto Viejo, leaving with a desire to return to this beautiful Caribbean town.",
    ],
  },
  es: {
    seoTitle: 'Diez Horas Para Explorar Cahuita',
    seoDescription:
      'Si tienes solo diez horas para explorar Cahuita, ¡aprovechemos al máximo el tiempo! Empezamos nuestra aventura temprano, despertándonos a las 7 am. Lo primero es tomar un café y disfrutar de un delicioso croissant de jamón y queso recién salido del horno en Degustibus Bakery.',
    heading: 'Diez horas para explorar Cahuita',
    paragraphsBeforeStay: [
      'Si tienes solo diez horas para explorar Cahuita, ¡aprovechemos al máximo el tiempo! Empezamos nuestra aventura temprano, despertándonos a las 7 am. Lo primero es tomar un café y disfrutar de un delicioso croissant de jamón y queso recién salido del horno en Degustibus Bakery.',
      'Después del delicioso desayuno, caminamos hasta la parada de buses que se ubica cerca de la cancha de baloncesto del pueblo, frente a la heladería Deelite. Es importante saber que hay dos paradas de buses en la zona: la más grande es para los autobuses de MEPE que van a San José, y la más pequeña es para los autobuses que van a Limón. Tomaremos esta última. Puedes comprar el boleto el mismo día o pagar directamente al subir al bus. La boletería es una pequeña caseta al lado del shuttle.',
      'Tomamos el bus que pasa por nuestra parada a las 8:20 am. El trayecto dura aproximadamente 30 minutos y nos bajamos en la terminal principal de Cahuita, que nos deja muy cerca de nuestro primer destino: el Parque Nacional Cahuita. Con de google maps y los habitantes de la zona , nos dirigimos en dirección, observando el movimiento del pueblo  que nos indican que se preparan para recibir a los turistas.',
      'El Parque Nacional Cahuita abre de 8 am a 4 pm en ambos sectores: Playa Blanca y Puerto Vargas. Hoy visitaremos Playa Blanca, donde la entrada es gratuita, aunque se acepta una colaboración voluntaria. Recuerda que, al ser un parque nacional, no se permite el ingreso de animales domésticos ni bebidas alcohólicas.',
    ],
    stayRecommendationTitle: '¿Dónde hospedarte cuando explores Cahuita?',
    paragraphsAfterStay: [
      <b key="hike"><i>Llegamos al parque a las 9:15 am, justo cuando el sol empieza a calentar. Contratamos un guía para nuestra caminata, ya que queremos aprender sobre la biodiversidad del parque y observar especies que a veces es difícil ver por nuestra cuenta. Logramos ver distintos animales como especies de pájaros, además de escuchar y ver a los monos congos, osos perezosos y muchas especies de flora. El recorrido tomó aproximadamente dos horas.</i></b>,
      'Después de la caminata, fuimos directamente a almorzar a una soda típica llamada Kawe, donde disfrutamos de un delicioso rice and beans que nos dio la energía para seguir explorando este calmo y hermoso pueblo. Luego, nos dimos una vuelta por las tiendas del pueblo, donde compramos algunos souvenirs.',
      'Nuestra próxima parada eran unas hermosas piscinas naturales de las que habíamos oído hablar y que estábamos ansiosos por conocer. ¡Quedamos sorprendidos de este lugar! Piscinas naturales en un lugar poco concurrido, perfecto para relajarse.',
      'Aún nos quedan unas horas más, y a las 4 pm nos dirigimos nuevamente al centro del pueblo de Cahuita a comernos un delicioso Pati en Delrita, cuya fama es bien merecida, ¡es delicioso! Así vamos terminando nuestro día. Nos dirigimos a la terminal de buses para tomar el bus de las 5:15 pm hacia Puerto Viejo, y nos vamos con ganas de volver a este hermoso pueblo caribeño.',
    ],
  },
  fr: {
    seoTitle: 'Dix heures pour explorer Cahuita',
    seoDescription:
      "Si vous n'avez que dix heures pour explorer Cahuita, profitons-en au maximum ! Nous commençons notre aventure tôt, en nous levant à 7h. La première étape est de prendre un café et de déguster un délicieux croissant au jambon et au fromage, tout juste sorti du four à la boulangerie Degustibus.",
    heading: 'Dix heures pour explorer Cahuita',
    paragraphsBeforeStay: [
      "Si vous n'avez que dix heures pour explorer Cahuita, profitons-en au maximum ! Nous commençons notre aventure tôt, en nous levant à 7h. La première étape est de prendre un café et de déguster un délicieux croissant au jambon et au fromage, tout juste sorti du four à la boulangerie Degustibus.",
      "Après ce délicieux petit-déjeuner, nous avons marché jusqu'à l'arrêt de bus situé près du terrain de basketball du village, en face de la boutique de glaces Deelite. Il est important de savoir qu'il y a deux arrêts de bus dans le secteur : le plus grand est réservé aux bus MEPE en direction de San José, et le plus petit est pour les bus allant à Limón. Nous prendrons ce dernier. Vous pouvez acheter le billet le jour même ou payer directement en montant dans le bus. Le guichet est une petite cabine juste à côté de la navette.",
      "Nous prenons le bus qui passe à notre arrêt à 8h20. Le trajet dure environ 30 minutes, et nous descendons au terminal principal de Cahuita, tout près de notre première destination : le parc national de Cahuita. À l'aide de Google Maps et des habitants, nous nous dirigeons vers l'entrée, observant l'effervescence du village qui se prépare à accueillir les touristes.",
      "Le parc national de Cahuita est ouvert de 8h à 16h dans ses deux secteurs : Playa Blanca et Puerto Vargas. Aujourd'hui, nous visiterons Playa Blanca, où l'entrée est gratuite, bien qu'une contribution volontaire soit acceptée. N'oubliez pas que, s'agissant d'un parc national, l'entrée des animaux domestiques et des boissons alcoolisées n'est pas autorisée.",
    ],
    stayRecommendationTitle: 'Où loger pour explorer Cahuita ?',
    paragraphsAfterStay: [
      <b key="hike"><i>Nous arrivons au parc à 9h15, juste au moment où le soleil commence à chauffer. Nous engageons un guide pour notre randonnée, car nous voulons en apprendre davantage sur la biodiversité du parc et observer des espèces parfois difficiles à voir seul. Nous parvenons à voir différents animaux, comme des espèces d'oiseaux, ainsi qu'à entendre et voir des singes hurleurs, des paresseux et de nombreuses espèces de flore. La randonnée a duré environ deux heures.</i></b>,
      "Après la randonnée, nous sommes allés déjeuner directement dans une soda typique appelée Kawe, où nous avons savouré un délicieux rice and beans qui nous a donné l'énergie de continuer à explorer ce village calme et magnifique. Ensuite, nous avons flâné dans les boutiques du village, où nous avons acheté quelques souvenirs.",
      "Notre prochaine étape était de magnifiques piscines naturelles dont nous avions entendu parler et que nous avions hâte de découvrir. Nous avons été émerveillés par cet endroit ! Des piscines naturelles dans un lieu peu fréquenté, parfait pour se détendre.",
      "Il nous restait encore quelques heures, et à 16h nous sommes retournés vers le centre de Cahuita pour déguster un délicieux Pati chez Delrita, dont la réputation est amplement méritée : c'est délicieux ! Ainsi s'achève notre journée. Nous nous dirigeons vers le terminal de bus pour prendre celui de 17h15 vers Puerto Viejo, repartant avec l'envie de revenir dans ce magnifique village caribéen.",
    ],
  },
  de: {
    seoTitle: 'Zehn Stunden, um Cahuita zu erkunden',
    seoDescription:
      "Wenn Sie nur zehn Stunden haben, um Cahuita zu erkunden, lassen Sie uns die Zeit optimal nutzen! Wir beginnen unser Abenteuer früh und stehen um 7 Uhr auf. Als Erstes gibt es einen Kaffee und ein köstliches Schinken-Käse-Croissant frisch aus dem Ofen der Degustibus Bakery.",
    heading: 'Zehn Stunden, um Cahuita zu erkunden',
    paragraphsBeforeStay: [
      "Wenn Sie nur zehn Stunden haben, um Cahuita zu erkunden, lassen Sie uns die Zeit optimal nutzen! Wir beginnen unser Abenteuer früh und stehen um 7 Uhr auf. Als Erstes gibt es einen Kaffee und ein köstliches Schinken-Käse-Croissant frisch aus dem Ofen der Degustibus Bakery.",
      "Nach dem köstlichen Frühstück liefen wir zur Bushaltestelle in der Nähe des Basketballplatzes der Stadt, gegenüber der Eisdiele Deelite. Wichtig zu wissen ist, dass es in der Gegend zwei Bushaltestellen gibt: die größere für die MEPE-Busse nach San José und die kleinere für die Busse nach Limón. Wir nehmen Letztere. Das Ticket kann man am selben Tag kaufen oder direkt beim Einsteigen bezahlen. Der Fahrkartenschalter ist ein kleiner Stand neben dem Shuttle.",
      "Wir nehmen den Bus, der um 8:20 Uhr an unserer Haltestelle vorbeikommt. Die Fahrt dauert etwa 30 Minuten, und wir steigen am Hauptterminal in Cahuita aus, das sich ganz in der Nähe unseres ersten Ziels befindet: dem Nationalpark Cahuita. Mit Hilfe von Google Maps und der Einheimischen machen wir uns auf den Weg und beobachten dabei das geschäftige Treiben der Stadt, die sich darauf vorbereitet, Touristen zu empfangen.",
      "Der Nationalpark Cahuita ist in beiden Bereichen, Playa Blanca und Puerto Vargas, von 8 bis 16 Uhr geöffnet. Heute besuchen wir Playa Blanca, wo der Eintritt frei ist, eine freiwillige Spende jedoch gerne angenommen wird. Denken Sie daran, dass es sich um einen Nationalpark handelt und das Mitbringen von Haustieren sowie alkoholischen Getränken nicht gestattet ist.",
    ],
    stayRecommendationTitle: 'Wo übernachten, wenn Sie Cahuita erkunden?',
    paragraphsAfterStay: [
      <b key="hike"><i>Wir kommen um 9:15 Uhr im Park an, gerade als die Sonne zu wärmen beginnt. Wir engagieren einen Guide für unsere Wanderung, da wir mehr über die Artenvielfalt des Parks erfahren und Tiere beobachten möchten, die man alleine manchmal nur schwer zu Gesicht bekommt. Es gelingt uns, verschiedene Tiere zu sehen, darunter mehrere Vogelarten, sowie Brüllaffen und Faultiere zu hören und zu sehen, dazu viele Pflanzenarten. Die Wanderung dauerte etwa zwei Stunden.</i></b>,
      "Nach der Wanderung gingen wir direkt zum Mittagessen in eine typische Soda namens Kawe, wo wir ein köstliches Rice and Beans genossen, das uns die Energie gab, dieses ruhige und schöne Städtchen weiter zu erkunden. Anschließend bummelten wir durch die Geschäfte der Stadt, wo wir ein paar Souvenirs kauften.",
      'Unser nächster Halt waren wunderschöne natürliche Pools, von denen wir gehört hatten und die wir unbedingt sehen wollten. Wir waren begeistert von diesem Ort! Natürliche Pools in einer weniger belebten Gegend, perfekt zum Entspannen.',
      "Uns bleiben noch ein paar Stunden, und um 16 Uhr machen wir uns auf den Weg zurück ins Zentrum von Cahuita, um bei Delrita ein köstliches Pati zu genießen, dessen Ruf wohlverdient ist – es ist einfach lecker! Damit lassen wir unseren Tag ausklingen. Wir gehen zum Busterminal, um den Bus um 17:15 Uhr nach Puerto Viejo zu nehmen, und verlassen den Ort mit dem Wunsch, in dieses wunderschöne karibische Städtchen zurückzukehren.",
    ],
  },
  he: {
    seoTitle: 'עשר שעות לחקור את קאוויטה',
    seoDescription:
      "אם יש לכם רק עשר שעות לחקור את קאוויטה, בואו ננצל את הזמן שלנו במלואו! אנחנו מתחילים את ההרפתקה שלנו מוקדם, מתעוררים בשעה 7 בבוקר. הדבר הראשון הוא לשתות קפה וליהנות מקרואסון גבינה וחזיר טעים, טרי מהתנור, במאפיית Degustibus.",
    heading: 'עשר שעות לחקור את קאוויטה',
    paragraphsBeforeStay: [
      "אם יש לכם רק עשר שעות לחקור את קאוויטה, בואו ננצל את הזמן שלנו במלואו! אנחנו מתחילים את ההרפתקה שלנו מוקדם, מתעוררים בשעה 7 בבוקר. הדבר הראשון הוא לשתות קפה וליהנות מקרואסון גבינה וחזיר טעים, טרי מהתנור, במאפיית Degustibus.",
      "אחרי ארוחת הבוקר הטעימה, הלכנו ברגל לתחנת האוטובוס הממוקמת ליד מגרש הכדורסל של העיירה, מול חנות הגלידה Deelite. חשוב לדעת שיש שתי תחנות אוטובוס באזור: הגדולה מיועדת לאוטובוסי MEPE הנוסעים לסן חוזה, והקטנה מיועדת לאוטובוסים הנוסעים ללימון. ניקח את האחרונה. אפשר לקנות את הכרטיס באותו היום או לשלם ישירות בעת העלייה לאוטובוס. משרד הכרטיסים הוא ביתן קטן ליד השאטל.",
      "עלינו לאוטובוס שעובר בתחנה שלנו בשעה 8:20 בבוקר. הנסיעה אורכת כ-30 דקות, ואנחנו יורדים בטרמינל הראשי בקאוויטה, הקרוב מאוד ליעד הראשון שלנו: הפארק הלאומי קאוויטה. בעזרת Google Maps והתושבים המקומיים, אנחנו פונים לכיוון הנכון, תוך שאנו צופים בעיירה השוקקת בעודה מתכוננת לקבל את פני התיירים.",
      "הפארק הלאומי קאוויטה פתוח משעה 8 בבוקר ועד 4 אחר הצהריים בשני המגזרים: פלאיה בלנקה ופוארטו וארגס. היום נבקר בפלאיה בלנקה, שם הכניסה חינם, אם כי מתקבלת תרומה מרצון. זכרו שמדובר בפארק לאומי, ולכן אסורה כניסת חיות מחמד ומשקאות אלכוהוליים.",
    ],
    stayRecommendationTitle: 'היכן להתארח כשחוקרים את קאוויטה?',
    paragraphsAfterStay: [
      <b key="hike"><i>אנחנו מגיעים לפארק בשעה 9:15 בבוקר, בדיוק כשהשמש מתחילה להתחמם. אנחנו שוכרים מדריך לטיול שלנו כי אנחנו רוצים ללמוד על המגוון הביולוגי של הפארק ולצפות במינים שלעיתים קשה לראות לבד. אנחנו מצליחים לראות חיות שונות כמו מיני ציפורים, וכן לשמוע ולראות קופי שאגן, עצלנים ומיני צמחייה רבים. הטיול נמשך כשעתיים.</i></b>,
      "אחרי הטיול, הלכנו ישר לארוחת צהריים בסודה טיפוסית בשם Kawe, שם נהנינו מרייס אנד בינס טעים שנתן לנו את האנרגיה להמשיך לחקור את העיירה השלווה והיפה הזו. אחר כך, עשינו סיבוב בחנויות העיירה, שם קנינו כמה מזכרות.",
      'התחנה הבאה שלנו הייתה כמה בריכות טבעיות יפהפיות ששמענו עליהן והיינו להוטים לראות. נדהמנו מהמקום הזה! בריכות טבעיות באזור פחות עמוס, מושלמות להירגעות.',
      "עדיין נותרו לנו כמה שעות, ובשעה 4 אחר הצהריים אנחנו חוזרים למרכז קאוויטה כדי ליהנות מפאטי טעים ב-Delrita, ששמו הטוב מוצדק לחלוטין - הוא טעים! כך אנחנו מסיימים את היום שלנו. אנחנו פונים לטרמינל האוטובוסים כדי לתפוס את האוטובוס בשעה 5:15 אחר הצהריים לפוארטו ויחו, ועוזבים עם רצון לחזור לעיירה הקריבית היפה הזו.",
    ],
  },
  it: {
    seoTitle: 'Dieci ore per esplorare Cahuita',
    seoDescription:
      "Se hai solo dieci ore per esplorare Cahuita, sfruttiamo al meglio il nostro tempo! Iniziamo la nostra avventura presto, svegliandoci alle 7 del mattino. La prima cosa da fare è prendere un caffè e gustare un delizioso croissant al prosciutto e formaggio appena sfornato alla Degustibus Bakery.",
    heading: 'Dieci ore per esplorare Cahuita',
    paragraphsBeforeStay: [
      "Se hai solo dieci ore per esplorare Cahuita, sfruttiamo al meglio il nostro tempo! Iniziamo la nostra avventura presto, svegliandoci alle 7 del mattino. La prima cosa da fare è prendere un caffè e gustare un delizioso croissant al prosciutto e formaggio appena sfornato alla Degustibus Bakery.",
      "Dopo la deliziosa colazione, abbiamo camminato fino alla fermata dell'autobus situata vicino al campo da basket del paese, di fronte alla gelateria Deelite. È importante sapere che in zona ci sono due fermate: quella più grande è per gli autobus MEPE diretti a San José, mentre quella più piccola è per gli autobus diretti a Limón. Prenderemo quest'ultima. Puoi acquistare il biglietto lo stesso giorno oppure pagare direttamente salendo sull'autobus. La biglietteria è una piccola cabina accanto alla navetta.",
      "Prendiamo l'autobus che passa dalla nostra fermata alle 8:20. Il tragitto dura circa 30 minuti e scendiamo al terminal principale di Cahuita, molto vicino alla nostra prima destinazione: il Parco Nazionale di Cahuita. Con l'aiuto di Google Maps e degli abitanti del posto, ci dirigiamo verso il parco, osservando il fermento del paese mentre si prepara ad accogliere i turisti.",
      "Il Parco Nazionale di Cahuita è aperto dalle 8:00 alle 16:00 in entrambi i settori: Playa Blanca e Puerto Vargas. Oggi visiteremo Playa Blanca, dove l'ingresso è gratuito, anche se viene accettato un contributo volontario. Ricorda che, trattandosi di un parco nazionale, non è consentito l'ingresso di animali domestici né di bevande alcoliche.",
    ],
    stayRecommendationTitle: 'Dove alloggiare per esplorare Cahuita?',
    paragraphsAfterStay: [
      <b key="hike"><i>Arriviamo al parco alle 9:15, proprio mentre il sole comincia a scaldare. Assumiamo una guida per la nostra escursione, perché vogliamo conoscere la biodiversità del parco e osservare specie che a volte sono difficili da vedere da soli. Riusciamo a vedere diversi animali, tra cui varie specie di uccelli, oltre a sentire e vedere scimmie urlatrici, bradipi e numerose specie di flora. L'escursione è durata circa due ore.</i></b>,
      "Dopo l'escursione, siamo andati direttamente a pranzo in una tipica soda chiamata Kawe, dove abbiamo gustato un delizioso rice and beans che ci ha dato l'energia per continuare a esplorare questo paese tranquillo e bellissimo. Poi abbiamo fatto una passeggiata tra i negozi del paese, dove abbiamo comprato alcuni souvenir.",
      "La nostra tappa successiva erano delle bellissime piscine naturali di cui avevamo sentito parlare e che non vedevamo l'ora di visitare. Siamo rimasti incantati da questo posto! Piscine naturali in una zona meno affollata, perfette per rilassarsi.",
      "Ci restano ancora alcune ore, e alle 16:00 torniamo verso il centro di Cahuita per gustarci un delizioso Pati da Delrita, la cui fama è più che meritata: è delizioso! Così concludiamo la nostra giornata. Ci dirigiamo verso il terminal degli autobus per prendere quello delle 17:15 per Puerto Viejo, partendo con il desiderio di tornare in questo splendido paese caraibico.",
    ],
  },
  pt: {
    seoTitle: 'Dez Horas para Explorar Cahuita',
    seoDescription:
      "Se só tiver dez horas para explorar Cahuita, vamos aproveitar bem o nosso tempo! Começamos a nossa aventura cedo, acordando às 7h. A primeira coisa é tomar um café e desfrutar de um delicioso croissant de fiambre e queijo, acabado de sair do forno, na Degustibus Bakery.",
    heading: 'Dez horas para explorar Cahuita',
    paragraphsBeforeStay: [
      "Se só tiver dez horas para explorar Cahuita, vamos aproveitar bem o nosso tempo! Começamos a nossa aventura cedo, acordando às 7h. A primeira coisa é tomar um café e desfrutar de um delicioso croissant de fiambre e queijo, acabado de sair do forno, na Degustibus Bakery.",
      "Depois do delicioso pequeno-almoço, caminhámos até à paragem de autocarro situada perto do campo de basquetebol da vila, em frente à gelataria Deelite. É importante saber que há duas paragens de autocarro na zona: a maior é para os autocarros da MEPE que vão para São José, e a mais pequena é para os autocarros que vão para Limón. Vamos apanhar esta última. Pode comprar o bilhete no próprio dia ou pagar diretamente ao entrar no autocarro. A bilheteira é uma pequena cabina junto ao shuttle.",
      "Apanhamos o autocarro que passa na nossa paragem às 8h20. A viagem demora cerca de 30 minutos, e saímos no terminal principal de Cahuita, muito perto do nosso primeiro destino: o Parque Nacional de Cahuita. Com a ajuda do Google Maps e dos habitantes locais, seguimos em direção ao parque, observando a azáfama da vila enquanto se prepara para receber os turistas.",
      "O Parque Nacional de Cahuita está aberto das 8h às 16h em ambos os setores: Playa Blanca e Puerto Vargas. Hoje vamos visitar Playa Blanca, onde a entrada é gratuita, embora se aceite um contributo voluntário. Lembre-se de que, por se tratar de um parque nacional, não é permitida a entrada de animais domésticos nem de bebidas alcoólicas.",
    ],
    stayRecommendationTitle: 'Onde ficar hospedado ao explorar Cahuita?',
    paragraphsAfterStay: [
      <b key="hike"><i>Chegamos ao parque às 9h15, precisamente quando o sol começa a aquecer. Contratamos um guia para a nossa caminhada, pois queremos aprender sobre a biodiversidade do parque e observar espécies que, por vezes, são difíceis de ver sozinhos. Conseguimos ver diferentes animais, como várias espécies de aves, além de ouvir e ver bugios, preguiças e muitas espécies de flora. A caminhada durou cerca de duas horas.</i></b>,
      "Depois da caminhada, fomos diretamente almoçar a uma soda típica chamada Kawe, onde desfrutámos de um delicioso rice and beans que nos deu energia para continuar a explorar esta vila calma e bonita. Depois, demos uma volta pelas lojas da vila, onde comprámos algumas lembranças.",
      "A nossa próxima paragem foram umas belas piscinas naturais de que tínhamos ouvido falar e que estávamos ansiosos por conhecer. Ficámos maravilhados com este lugar! Piscinas naturais numa zona pouco concorrida, perfeitas para relaxar.",
      "Ainda nos restam algumas horas, e às 16h regressamos ao centro de Cahuita para saborear um delicioso Pati na Delrita, cuja fama é bem merecida — é delicioso! Assim vamos terminando o nosso dia. Dirigimo-nos ao terminal de autocarros para apanhar o autocarro das 17h15 para Puerto Viejo, partindo com vontade de voltar a esta bela vila caribenha.",
    ],
  },
  hi: {
    seoTitle: 'काहुइटा घूमने के लिए दस घंटे',
    seoDescription:
      "अगर आपके पास काहुइटा घूमने के लिए सिर्फ दस घंटे हैं, तो आइए अपने समय का पूरा फायदा उठाएं! हम अपना सफर जल्दी शुरू करते हैं, सुबह 7 बजे उठकर। सबसे पहला काम है एक कॉफी लेना और Degustibus Bakery में ओवन से ताज़ा निकले स्वादिष्ट हैम और चीज़ क्रोइसां का आनंद लेना।",
    heading: 'काहुइटा घूमने के लिए दस घंटे',
    paragraphsBeforeStay: [
      "अगर आपके पास काहुइटा घूमने के लिए सिर्फ दस घंटे हैं, तो आइए अपने समय का पूरा फायदा उठाएं! हम अपना सफर जल्दी शुरू करते हैं, सुबह 7 बजे उठकर। सबसे पहला काम है एक कॉफी लेना और Degustibus Bakery में ओवन से ताज़ा निकले स्वादिष्ट हैम और चीज़ क्रोइसां का आनंद लेना।",
      "स्वादिष्ट नाश्ते के बाद, हम कस्बे के बास्केटबॉल कोर्ट के पास, Deelite आइसक्रीम शॉप के सामने स्थित बस स्टॉप तक पैदल गए। यह जानना ज़रूरी है कि इस इलाके में दो बस स्टॉप हैं: बड़ा वाला सान होज़े जाने वाली MEPE बसों के लिए है, और छोटा वाला लिमोन जाने वाली बसों के लिए। हम वही वाली बस लेंगे। आप उसी दिन टिकट खरीद सकते हैं या बस में चढ़ते समय सीधे भुगतान कर सकते हैं। टिकट काउंटर शटल के बगल में एक छोटा-सा बूथ है।",
      "हम सुबह 8:20 बजे अपने स्टॉप से गुज़रने वाली बस लेते हैं। सफर में लगभग 30 मिनट लगते हैं, और हम काहुइटा के मुख्य टर्मिनल पर उतरते हैं, जो हमारी पहली मंज़िल - काहुइटा राष्ट्रीय उद्यान - के बेहद करीब है। Google Maps और स्थानीय लोगों की मदद से, हम उसी दिशा में आगे बढ़ते हैं, कस्बे की उस चहल-पहल को देखते हुए जो पर्यटकों का स्वागत करने की तैयारी में है।",
      "काहुइटा राष्ट्रीय उद्यान दोनों क्षेत्रों में सुबह 8 बजे से शाम 4 बजे तक खुला रहता है: प्लाया ब्लांका और प्वेर्तो वर्गास। आज हम प्लाया ब्लांका जाएंगे, जहां प्रवेश निःशुल्क है, हालांकि स्वैच्छिक योगदान स्वीकार किया जाता है। याद रखें, यह एक राष्ट्रीय उद्यान होने के कारण, यहां पालतू जानवरों और मादक पेय पदार्थों को ले जाने की अनुमति नहीं है।",
    ],
    stayRecommendationTitle: 'काहुइटा घूमते समय कहां ठहरें?',
    paragraphsAfterStay: [
      <b key="hike"><i>हम सुबह 9:15 बजे पार्क पहुंचते हैं, ठीक तब जब सूरज तपना शुरू करता है। हम अपनी हाइक के लिए एक गाइड को रखते हैं क्योंकि हम पार्क की जैव विविधता के बारे में जानना चाहते हैं और उन प्रजातियों को देखना चाहते हैं जिन्हें अकेले देख पाना कभी-कभी मुश्किल होता है। हम पक्षियों की विभिन्न प्रजातियों जैसे कई जानवर देख पाते हैं, साथ ही हाउलर बंदरों, स्लॉथ और पौधों की कई प्रजातियों को सुनते और देखते हैं। हाइक में लगभग दो घंटे लगे।</i></b>,
      "हाइक के बाद, हम सीधे Kawe नाम की एक विशिष्ट सोडा (स्थानीय भोजनालय) में दोपहर का भोजन करने गए, जहां हमने स्वादिष्ट राइस एंड बीन्स का आनंद लिया, जिसने हमें इस शांत और खूबसूरत कस्बे को और घूमने की ऊर्जा दी। फिर, हमने कस्बे की दुकानों में टहलते हुए कुछ स्मृति-चिन्ह खरीदे।",
      'हमारा अगला पड़ाव कुछ खूबसूरत प्राकृतिक जलकुंड थे, जिनके बारे में हमने सुना था और जिन्हें देखने के लिए हम बेताब थे। हम इस जगह को देखकर दंग रह गए! कम भीड़भाड़ वाले इलाके में प्राकृतिक जलकुंड, आराम करने के लिए बिल्कुल सही।',
      "हमारे पास अभी भी कुछ घंटे बचे हैं, और शाम 4 बजे हम काहुइटा के केंद्र की ओर वापस जाते हैं ताकि Delrita में स्वादिष्ट पाती (Pati) का आनंद ले सकें, जिसकी प्रसिद्धि बिल्कुल जायज़ है - यह वाकई स्वादिष्ट है! इस तरह, हम अपना दिन समाप्त करते हैं। हम बस टर्मिनल की ओर जाते हैं ताकि प्वेर्तो वियेहो के लिए शाम 5:15 बजे की बस पकड़ सकें, और इस खूबसूरत कैरिबियन कस्बे में फिर लौटने की चाहत के साथ विदा लेते हैं।",
    ],
  },
};

export function tenHoursInPuertoContent(locale: Locale): TenHoursInPuertoContent {
  return tenHoursInPuerto[locale] ?? tenHoursInPuerto.en!;
}

export interface PuertoViejoByPlaneContent {
  seoTitle: string;
  seoDescription: string;
  heading: string;
  heroAlt: string;
  intro: React.ReactNode;
  stayRecommendationTitle: string;
  /** Booking the flight, the SJO layover, the Cessna leg, the Limón transfer. */
  bodyParagraphs: React.ReactNode[];
  /** The wrap-up, after WhyStayWithUs. */
  closingParagraphs: React.ReactNode[];
}

const puertoViejoByPlane: Partial<Record<Locale, PuertoViejoByPlaneContent>> = {
  en: {
    seoTitle: 'Getting to Puerto Viejo By Plane',
    seoDescription:
      "Getting to Puerto Viejo by plane is easier than you might think. In this article, we'll show you how to travel from any destination to Puerto Viejo by taking a domestic flight from San Jose to Limón.",
    heading: 'Getting to Puerto Viejo By Plane',
    heroAlt: 'Flying to Puerto Viejo Costa Rica',
    intro:
      "Getting to Puerto Viejo by plane is easier than you might think. In this article, we'll show you how to travel from any destination to Puerto Viejo by taking a domestic flight from San Jose to Limón.",
    stayRecommendationTitle: 'Where to stay when flying to Puerto Viejo?',
    bodyParagraphs: [
      <>To book your flight, simply visit <a href="https://www.flysansa.com" target="_blank" rel="noopener noreferrer">flysansa.com</a> and select your travel dates and times. You will then be prompted to enter your personal and payment details to complete your booking. It's important to note that Sansa Airlines offers several flight options throughout the day, making it easy to find a flight that fits your schedule.</>,
      <>The first leg of the journey is to fly to San Jose International Airport, also known as <a href="https://maps.app.goo.gl/4wEYh3ZHCWNWSrQo6" target="_blank" rel="noopener noreferrer">Juan Santamaría</a> (SJO), the largest airport in Costa Rica. SJO is well-connected to many international destinations, making it a convenient starting point for your journey to Puerto Viejo. Once you land in SJO, you will have to pass customs and head to the Domestic Gate: there is a big old airplane outside, so it's easy to spot.</>,
      <>The flight takes approximately 40 minutes on a small but safe Cessna, giving you a bird's eye view of <a href="https://maps.app.goo.gl/ZZoEh3xB5jQGG4Mf9" target="_blank" rel="noopener noreferrer">Braulio Carrillo National Park</a>.</>,
      "Once you arrive in Limón, a private transfer will drive you to Puerto Viejo for approximately $75 USD. A chauffeur will be waiting for you at the airport and will drive you directly to your accommodation, ensuring a stress-free and comfortable journey. Alternatively, you can take a bus or taxi from Limón to Puerto Viejo, but we recommend arranging a private transfer beforehand to save time and avoid any potential scam.",
    ],
    closingParagraphs: [
      "At this point, all that's left is for you to kick back and enjoy the laid-back vibes of Puerto Viejo. Whether you're looking to relax on the beach, explore the jungle, or indulge in some delicious Caribbean cuisine, Puerto Viejo has something for everyone.",
      "In conclusion, traveling to Puerto Viejo from any destination is easy and convenient thanks to the domestic flight from San Jose to Limón. With a quick and comfortable flight and the option of arranging a private transfer, you'll be sipping on a tropical cocktail in no time. So what are you waiting for? Book your trip to Puerto Viejo today and experience the magic of this charming beach town for yourself! And don't hesitate to contact us for help organizing your trip or scheduling a private transfer from Limón.",
    ],
  },
  es: {
    seoTitle: 'Llegar a Puerto Viejo en Avión',
    seoDescription:
      'Llegar a Puerto Viejo en avión es más fácil de lo que piensas. En este artículo, te mostraremos cómo viajar desde cualquier destino a Puerto Viejo tomando un vuelo doméstico desde San José a Limón.',
    heading: 'Llegar a Puerto Viejo en Avión',
    // The pre-merge ES page's alt text ("Kayaking in Punta Uva") described a
    // different photo entirely; EN's alt was correct for this image.
    heroAlt: 'Flying to Puerto Viejo Costa Rica',
    intro:
      'Llegar a Puerto Viejo en avión es más fácil de lo que piensas. En este artículo, te mostraremos cómo viajar desde cualquier destino a Puerto Viejo tomando un vuelo doméstico desde San José a Limón.',
    stayRecommendationTitle: '¿Dónde hospedarte cuando vueles a Puerto Viejo?',
    bodyParagraphs: [
      <>Para reservar tu vuelo, simplemente visita <a href="https://www.flysansa.com" target="_blank" rel="noopener noreferrer">flysansa.com</a> y selecciona tus fechas y horarios de viaje. Luego se te pedirá que ingreses tus datos personales y de pago para completar tu reserva. Es importante tener en cuenta que Sansa Airlines ofrece varias opciones de vuelo durante el día, lo que facilita encontrar un vuelo que se ajuste a tu horario.</>,
      <>La primera parte del viaje consiste en volar al Aeropuerto Internacional de San José, también conocido como <a href="https://maps.app.goo.gl/4wEYh3ZHCWNWSrQo6" target="_blank" rel="noopener noreferrer">Juan Santamaría</a> (SJO), el aeropuerto más grande de Costa Rica. SJO está bien conectado con muchos destinos internacionales, lo que lo convierte en un punto de partida conveniente para tu viaje a Puerto Viejo. Una vez que aterrices en SJO, tendrás que pasar por la aduana y dirigirte al Gate Doméstico: hay un avión antiguo grande afuera, así que es fácil de reconocer.</>,
      <>El vuelo dura aproximadamente 40 minutos en un pequeño pero seguro Cessna, que te ofrece una vista panorámica del <a href="https://maps.app.goo.gl/ZZoEh3xB5jQGG4Mf9" target="_blank" rel="noopener noreferrer">Parque Nacional Braulio Carrillo</a>.</>,
      'Una vez que llegues a Limón, un traslado privado te llevará a Puerto Viejo por aproximadamente $75 USD. Un chófer te estará esperando en el aeropuerto y te llevará directamente a tu alojamiento, garantizando un viaje cómodo y sin estrés. Alternativamente, puedes tomar un autobús o un taxi desde Limón a Puerto Viejo, pero te recomendamos organizar un traslado privado con antelación para ahorrar tiempo y evitar posibles estafas.',
    ],
    closingParagraphs: [
      'En este punto, lo único que te queda por hacer es relajarte y disfrutar del ambiente tranquilo de Puerto Viejo. Ya sea que busques relajarte en la playa, explorar la jungla o disfrutar de una deliciosa comida caribeña, Puerto Viejo tiene algo para todos.',
      'En conclusión, viajar a Puerto Viejo desde cualquier destino es fácil y conveniente gracias al vuelo doméstico desde San José a Limón. Con un vuelo rápido y cómodo y la opción de organizar un traslado privado, estarás disfrutando de un cóctel tropical en poco tiempo. ¿Qué estás esperando? ¡Reserva tu viaje a Puerto Viejo hoy y experimenta la magia de este encantador pueblo de playa por ti mismo! Y no dudes en contactarnos para ayudarte a organizar tu viaje o programar un traslado privado desde Limón.',
    ],
  },
  de: {
    seoTitle: 'Mit dem Flugzeug nach Puerto Viejo',
    seoDescription:
      "Mit dem Flugzeug nach Puerto Viejo zu gelangen ist einfacher, als Sie vielleicht denken. In diesem Artikel zeigen wir Ihnen, wie Sie von jedem beliebigen Ausgangspunkt aus mit einem Inlandsflug von San José nach Limón nach Puerto Viejo reisen können.",
    heading: 'Mit dem Flugzeug nach Puerto Viejo',
    heroAlt: 'Flug nach Puerto Viejo, Costa Rica',
    intro:
      "Mit dem Flugzeug nach Puerto Viejo zu gelangen ist einfacher, als Sie vielleicht denken. In diesem Artikel zeigen wir Ihnen, wie Sie von jedem beliebigen Ausgangspunkt aus mit einem Inlandsflug von San José nach Limón nach Puerto Viejo reisen können.",
    stayRecommendationTitle: 'Wo übernachten, wenn Sie nach Puerto Viejo fliegen?',
    bodyParagraphs: [
      <>Um Ihren Flug zu buchen, besuchen Sie einfach <a href="https://www.flysansa.com" target="_blank" rel="noopener noreferrer">flysansa.com</a> und wählen Sie Ihre Reisedaten und -zeiten aus. Anschließend werden Sie aufgefordert, Ihre persönlichen Daten und Zahlungsinformationen einzugeben, um die Buchung abzuschließen. Wichtig zu wissen ist, dass Sansa Airlines mehrere Flugoptionen über den Tag verteilt anbietet, sodass es leicht ist, einen zu Ihrem Zeitplan passenden Flug zu finden.</>,
      <>Der erste Abschnitt der Reise ist der Flug zum Internationalen Flughafen von San José, auch bekannt als <a href="https://maps.app.goo.gl/4wEYh3ZHCWNWSrQo6" target="_blank" rel="noopener noreferrer">Juan Santamaría</a> (SJO), dem größten Flughafen Costa Ricas. SJO ist gut mit vielen internationalen Zielen verbunden und somit ein bequemer Ausgangspunkt für Ihre Reise nach Puerto Viejo. Nach der Landung in SJO müssen Sie durch den Zoll und sich zum Inlandsterminal begeben: Draußen steht ein großes altes Flugzeug, das leicht zu erkennen ist.</>,
      <>Der Flug dauert etwa 40 Minuten in einer kleinen, aber sicheren Cessna und bietet Ihnen einen Blick aus der Vogelperspektive auf den <a href="https://maps.app.goo.gl/ZZoEh3xB5jQGG4Mf9" target="_blank" rel="noopener noreferrer">Nationalpark Braulio Carrillo</a>.</>,
      "Sobald Sie in Limón ankommen, bringt Sie ein privater Transfer für etwa 75 USD nach Puerto Viejo. Ein Fahrer wird am Flughafen auf Sie warten und Sie direkt zu Ihrer Unterkunft bringen, sodass Sie eine stressfreie und komfortable Reise genießen. Alternativ können Sie einen Bus oder ein Taxi von Limón nach Puerto Viejo nehmen, wir empfehlen jedoch, einen privaten Transfer im Voraus zu organisieren, um Zeit zu sparen und mögliche Betrugsversuche zu vermeiden.",
    ],
    closingParagraphs: [
      "An diesem Punkt bleibt Ihnen nur noch, sich zurückzulehnen und die entspannte Atmosphäre von Puerto Viejo zu genießen. Ob Sie sich am Strand entspannen, den Dschungel erkunden oder sich an köstlicher karibischer Küche erfreuen möchten – Puerto Viejo hat für jeden etwas zu bieten.",
      "Zusammenfassend lässt sich sagen, dass die Reise nach Puerto Viejo von jedem Ausgangspunkt aus dank des Inlandsflugs von San José nach Limón einfach und bequem ist. Mit einem schnellen, komfortablen Flug und der Möglichkeit, einen privaten Transfer zu organisieren, genießen Sie im Handumdrehen einen tropischen Cocktail. Worauf warten Sie also noch? Buchen Sie noch heute Ihre Reise nach Puerto Viejo und erleben Sie selbst die Magie dieses charmanten Küstenstädtchens! Und zögern Sie nicht, uns zu kontaktieren, wenn Sie Hilfe bei der Organisation Ihrer Reise oder der Planung eines privaten Transfers von Limón benötigen.",
    ],
  },
  fr: {
    seoTitle: 'Se rendre à Puerto Viejo en avion',
    seoDescription:
      "Se rendre à Puerto Viejo en avion est plus simple qu'on ne le pense. Dans cet article, nous vous montrons comment voyager depuis n'importe quelle destination jusqu'à Puerto Viejo en prenant un vol intérieur de San José à Limón.",
    heading: 'Se rendre à Puerto Viejo en avion',
    heroAlt: 'Vol vers Puerto Viejo, Costa Rica',
    intro:
      "Se rendre à Puerto Viejo en avion est plus simple qu'on ne le pense. Dans cet article, nous vous montrons comment voyager depuis n'importe quelle destination jusqu'à Puerto Viejo en prenant un vol intérieur de San José à Limón.",
    stayRecommendationTitle: "Où loger quand on prend l'avion pour Puerto Viejo ?",
    bodyParagraphs: [
      <>Pour réserver votre vol, il vous suffit de vous rendre sur <a href="https://www.flysansa.com" target="_blank" rel="noopener noreferrer">flysansa.com</a> et de sélectionner vos dates et horaires de voyage. Il vous sera ensuite demandé de saisir vos informations personnelles et de paiement pour finaliser votre réservation. Il est important de noter que Sansa Airlines propose plusieurs options de vol tout au long de la journée, ce qui facilite la recherche d'un vol adapté à votre emploi du temps.</>,
      <>La première étape du voyage consiste à prendre l'avion jusqu'à l'aéroport international de San José, également connu sous le nom de <a href="https://maps.app.goo.gl/4wEYh3ZHCWNWSrQo6" target="_blank" rel="noopener noreferrer">Juan Santamaría</a> (SJO), le plus grand aéroport du Costa Rica. SJO est bien relié à de nombreuses destinations internationales, ce qui en fait un point de départ pratique pour votre voyage vers Puerto Viejo. Une fois arrivé à SJO, vous devrez passer la douane et vous diriger vers la porte des vols intérieurs : il y a un grand vieil avion à l'extérieur, donc c'est facile à repérer.</>,
      <>Le vol dure environ 40 minutes à bord d'un petit Cessna, aussi sûr que confortable, qui vous offre une vue à vol d'oiseau sur le <a href="https://maps.app.goo.gl/ZZoEh3xB5jQGG4Mf9" target="_blank" rel="noopener noreferrer">parc national Braulio Carrillo</a>.</>,
      "Une fois arrivé à Limón, un transfert privé vous conduira à Puerto Viejo pour environ 75 USD. Un chauffeur vous attendra à l'aéroport et vous conduira directement à votre hébergement, garantissant un trajet confortable et sans stress. Vous pouvez également prendre un bus ou un taxi de Limón à Puerto Viejo, mais nous vous recommandons d'organiser un transfert privé à l'avance pour gagner du temps et éviter toute arnaque potentielle.",
    ],
    closingParagraphs: [
      "À ce stade, il ne vous reste plus qu'à vous détendre et à profiter de l'ambiance décontractée de Puerto Viejo. Que vous cherchiez à vous relaxer sur la plage, à explorer la jungle ou à savourer une délicieuse cuisine caribéenne, Puerto Viejo a de quoi satisfaire tout le monde.",
      "En conclusion, voyager vers Puerto Viejo depuis n'importe quelle destination est simple et pratique grâce au vol intérieur de San José à Limón. Avec un vol rapide et confortable et la possibilité d'organiser un transfert privé, vous siroterez un cocktail tropical en un rien de temps. Alors, qu'attendez-vous ? Réservez votre voyage à Puerto Viejo dès aujourd'hui et découvrez par vous-même la magie de cette charmante ville balnéaire ! Et n'hésitez pas à nous contacter pour vous aider à organiser votre voyage ou à planifier un transfert privé depuis Limón.",
    ],
  },
  he: {
    seoTitle: 'הגעה לפוארטו ויחו במטוס',
    seoDescription:
      'ההגעה לפוארטו ויחו במטוס קלה יותר משנדמה לכם. במאמר זה נראה לכם כיצד לנסוע מכל יעד לפוארטו ויחו באמצעות טיסה פנימית מסן חוזה ללימון.',
    heading: 'הגעה לפוארטו ויחו במטוס',
    heroAlt: 'טיסה לפוארטו ויחו, קוסטה ריקה',
    intro:
      'ההגעה לפוארטו ויחו במטוס קלה יותר משנדמה לכם. במאמר זה נראה לכם כיצד לנסוע מכל יעד לפוארטו ויחו באמצעות טיסה פנימית מסן חוזה ללימון.',
    stayRecommendationTitle: 'היכן להתארח כשטסים לפוארטו ויחו?',
    bodyParagraphs: [
      <>כדי להזמין את הטיסה שלכם, פשוט בקרו באתר <a href="https://www.flysansa.com" target="_blank" rel="noopener noreferrer">flysansa.com</a> ובחרו את תאריכי ושעות הנסיעה שלכם. לאחר מכן תתבקשו להזין את הפרטים האישיים ופרטי התשלום שלכם כדי להשלים את ההזמנה. חשוב לציין ש-Sansa Airlines מציעה מספר אפשרויות טיסה במהלך היום, כך שקל למצוא טיסה שמתאימה ללוח הזמנים שלכם.</>,
      <>הקטע הראשון של המסע הוא טיסה לנמל התעופה הבינלאומי של סן חוזה, המוכר גם בשם <a href="https://maps.app.goo.gl/4wEYh3ZHCWNWSrQo6" target="_blank" rel="noopener noreferrer">חואן סנטמריה</a> (SJO), שדה התעופה הגדול ביותר בקוסטה ריקה. SJO מחובר היטב ליעדים בינלאומיים רבים, מה שהופך אותו לנקודת פתיחה נוחה למסע שלכם לפוארטו ויחו. ברגע שתנחתו ב-SJO, יהיה עליכם לעבור את המכס ולפנות לשער הטיסות הפנימיות: יש מטוס ישן וגדול בחוץ, כך שקל לזהות אותו.</>,
      <>הטיסה נמשכת כ-40 דקות במטוס Cessna קטן אך בטוח, המעניק לכם נוף ציפור על <a href="https://maps.app.goo.gl/ZZoEh3xB5jQGG4Mf9" target="_blank" rel="noopener noreferrer">הפארק הלאומי בראוליו קריו</a>.</>,
      "ברגע שתגיעו ללימון, הסעה פרטית תיקח אתכם לפוארטו ויחו תמורת כ-75 דולר אמריקאי. נהג יחכה לכם בשדה התעופה וייקח אתכם ישירות למקום האירוח שלכם, ויבטיח מסע נוח וללא לחץ. לחלופין, תוכלו לקחת אוטובוס או מונית מלימון לפוארטו ויחו, אך אנו ממליצים לתאם הסעה פרטית מראש כדי לחסוך זמן ולהימנע מהונאות אפשריות.",
    ],
    closingParagraphs: [
      "בשלב זה, כל מה שנותר לכם לעשות הוא להירגע וליהנות מהאווירה הרגועה של פוארטו ויחו. בין אם אתם מחפשים להירגע על החוף, לחקור את הג'ונגל, או להתפנק במטבח קריבי טעים, בפוארטו ויחו יש משהו לכולם.",
      "לסיכום, הנסיעה לפוארטו ויחו מכל יעד היא קלה ונוחה הודות לטיסה הפנימית מסן חוזה ללימון. עם טיסה מהירה ונוחה ואפשרות לתאם הסעה פרטית, תוכלו ללגום קוקטייל טרופי בזמן קצר. אז למה אתם מחכים? הזמינו את הטיול שלכם לפוארטו ויחו כבר היום וחוו בעצמכם את הקסם של העיירה החופית המקסימה הזו! ואל תהססו ליצור איתנו קשר לעזרה בארגון הטיול שלכם או לתיאום הסעה פרטית מלימון.",
    ],
  },
  it: {
    seoTitle: 'Come Arrivare a Puerto Viejo in Aereo',
    seoDescription:
      "Arrivare a Puerto Viejo in aereo è più facile di quanto si possa pensare. In questo articolo ti mostreremo come raggiungere Puerto Viejo da qualsiasi destinazione prendendo un volo nazionale da San José a Limón.",
    heading: 'Come Arrivare a Puerto Viejo in Aereo',
    heroAlt: 'Volo verso Puerto Viejo, Costa Rica',
    intro:
      "Arrivare a Puerto Viejo in aereo è più facile di quanto si possa pensare. In questo articolo ti mostreremo come raggiungere Puerto Viejo da qualsiasi destinazione prendendo un volo nazionale da San José a Limón.",
    stayRecommendationTitle: 'Dove alloggiare quando si vola verso Puerto Viejo?',
    bodyParagraphs: [
      <>Per prenotare il tuo volo, visita semplicemente <a href="https://www.flysansa.com" target="_blank" rel="noopener noreferrer">flysansa.com</a> e seleziona le date e gli orari del tuo viaggio. Ti verrà quindi chiesto di inserire i tuoi dati personali e di pagamento per completare la prenotazione. È importante sapere che Sansa Airlines offre diverse opzioni di volo durante la giornata, rendendo facile trovare un volo adatto ai tuoi orari.</>,
      <>La prima tappa del viaggio è volare fino all'Aeroporto Internazionale di San José, conosciuto anche come <a href="https://maps.app.goo.gl/4wEYh3ZHCWNWSrQo6" target="_blank" rel="noopener noreferrer">Juan Santamaría</a> (SJO), il più grande aeroporto della Costa Rica. SJO è ben collegato con molte destinazioni internazionali, il che lo rende un comodo punto di partenza per il tuo viaggio verso Puerto Viejo. Una volta atterrato a SJO, dovrai passare la dogana e dirigerti verso il Gate Nazionale: c'è un vecchio grande aereo all'esterno, quindi è facile da individuare.</>,
      <>Il volo dura circa 40 minuti su un piccolo ma sicuro Cessna, che ti regala una vista dall'alto sul <a href="https://maps.app.goo.gl/ZZoEh3xB5jQGG4Mf9" target="_blank" rel="noopener noreferrer">Parco Nazionale Braulio Carrillo</a>.</>,
      "Una volta arrivato a Limón, un trasferimento privato ti porterà a Puerto Viejo per circa 75 USD. Un autista ti aspetterà in aeroporto e ti accompagnerà direttamente al tuo alloggio, garantendo un viaggio comodo e senza stress. In alternativa, puoi prendere un autobus o un taxi da Limón a Puerto Viejo, ma ti consigliamo di organizzare un trasferimento privato in anticipo per risparmiare tempo ed evitare possibili truffe.",
    ],
    closingParagraphs: [
      "A questo punto, non ti resta che rilassarti e goderti l'atmosfera rilassata di Puerto Viejo. Che tu voglia rilassarti in spiaggia, esplorare la giungla o gustare la deliziosa cucina caraibica, Puerto Viejo ha qualcosa da offrire a tutti.",
      "In conclusione, viaggiare verso Puerto Viejo da qualsiasi destinazione è facile e comodo grazie al volo nazionale da San José a Limón. Con un volo rapido e confortevole e la possibilità di organizzare un trasferimento privato, ti ritroverai a sorseggiare un cocktail tropicale in men che non si dica. Allora cosa aspetti? Prenota oggi stesso il tuo viaggio a Puerto Viejo e scopri di persona la magia di questo affascinante paese di mare! E non esitare a contattarci per aiutarti a organizzare il tuo viaggio o programmare un trasferimento privato da Limón.",
    ],
  },
  pt: {
    seoTitle: 'Chegar a Puerto Viejo de Avião',
    seoDescription:
      "Chegar a Puerto Viejo de avião é mais fácil do que possa pensar. Neste artigo, mostramos-lhe como viajar de qualquer destino até Puerto Viejo apanhando um voo doméstico de San José para Limón.",
    heading: 'Chegar a Puerto Viejo de Avião',
    heroAlt: 'Voo para Puerto Viejo, Costa Rica',
    intro:
      "Chegar a Puerto Viejo de avião é mais fácil do que possa pensar. Neste artigo, mostramos-lhe como viajar de qualquer destino até Puerto Viejo apanhando um voo doméstico de San José para Limón.",
    stayRecommendationTitle: 'Onde ficar hospedado ao voar para Puerto Viejo?',
    bodyParagraphs: [
      <>Para reservar o seu voo, basta visitar <a href="https://www.flysansa.com" target="_blank" rel="noopener noreferrer">flysansa.com</a> e selecionar as suas datas e horários de viagem. De seguida, ser-lhe-á pedido que introduza os seus dados pessoais e de pagamento para concluir a reserva. É importante notar que a Sansa Airlines oferece várias opções de voo ao longo do dia, o que facilita encontrar um voo que se ajuste ao seu horário.</>,
      <>A primeira etapa da viagem é voar até ao Aeroporto Internacional de San José, também conhecido como <a href="https://maps.app.goo.gl/4wEYh3ZHCWNWSrQo6" target="_blank" rel="noopener noreferrer">Juan Santamaría</a> (SJO), o maior aeroporto da Costa Rica. O SJO está bem ligado a muitos destinos internacionais, o que o torna um ponto de partida conveniente para a sua viagem até Puerto Viejo. Assim que aterrar no SJO, terá de passar pela alfândega e dirigir-se ao Portão Doméstico: há um grande avião antigo lá fora, por isso é fácil de encontrar.</>,
      <>O voo demora aproximadamente 40 minutos num pequeno mas seguro Cessna, oferecendo-lhe uma vista aérea do <a href="https://maps.app.goo.gl/ZZoEh3xB5jQGG4Mf9" target="_blank" rel="noopener noreferrer">Parque Nacional Braulio Carrillo</a>.</>,
      "Assim que chegar a Limón, um transfer privado levá-lo-á até Puerto Viejo por aproximadamente 75 USD. Um motorista estará à sua espera no aeroporto e levá-lo-á diretamente ao seu alojamento, garantindo uma viagem confortável e sem stress. Em alternativa, pode apanhar um autocarro ou táxi de Limón até Puerto Viejo, mas recomendamos que organize um transfer privado com antecedência para poupar tempo e evitar possíveis burlas.",
    ],
    closingParagraphs: [
      "Chegados a este ponto, tudo o que resta é relaxar e desfrutar do ambiente descontraído de Puerto Viejo. Quer procure relaxar na praia, explorar a selva ou saborear uma deliciosa gastronomia caribenha, Puerto Viejo tem algo para todos.",
      "Em conclusão, viajar até Puerto Viejo a partir de qualquer destino é fácil e conveniente graças ao voo doméstico de San José para Limón. Com um voo rápido e confortável, e a opção de organizar um transfer privado, estará a saborear um cocktail tropical num instante. Então, o que está à espera? Reserve já a sua viagem a Puerto Viejo e viva por si mesmo a magia desta encantadora vila de praia! E não hesite em contactar-nos para ajudar a organizar a sua viagem ou agendar um transfer privado a partir de Limón.",
    ],
  },
  hi: {
    seoTitle: 'हवाई जहाज़ से प्वेर्तो वियेहो कैसे पहुंचें',
    seoDescription:
      "हवाई जहाज़ से प्वेर्तो वियेहो पहुंचना उतना मुश्किल नहीं जितना आप सोच सकते हैं। इस लेख में, हम आपको दिखाएंगे कि सान होज़े से लिमोन तक की घरेलू उड़ान लेकर किसी भी गंतव्य से प्वेर्तो वियेहो तक कैसे यात्रा करें।",
    heading: 'हवाई जहाज़ से प्वेर्तो वियेहो कैसे पहुंचें',
    heroAlt: 'कोस्टा रिका के प्वेर्तो वियेहो के लिए उड़ान',
    intro:
      "हवाई जहाज़ से प्वेर्तो वियेहो पहुंचना उतना मुश्किल नहीं जितना आप सोच सकते हैं। इस लेख में, हम आपको दिखाएंगे कि सान होज़े से लिमोन तक की घरेलू उड़ान लेकर किसी भी गंतव्य से प्वेर्तो वियेहो तक कैसे यात्रा करें।",
    stayRecommendationTitle: 'प्वेर्तो वियेहो के लिए उड़ान भरते समय कहां ठहरें?',
    bodyParagraphs: [
      <>अपनी फ्लाइट बुक करने के लिए, बस <a href="https://www.flysansa.com" target="_blank" rel="noopener noreferrer">flysansa.com</a> पर जाएं और अपनी यात्रा की तारीखें और समय चुनें। इसके बाद आपको अपनी बुकिंग पूरी करने के लिए अपनी व्यक्तिगत और भुगतान जानकारी दर्ज करने के लिए कहा जाएगा। यह ध्यान रखना ज़रूरी है कि Sansa Airlines दिनभर में कई फ्लाइट विकल्प देती है, जिससे अपने कार्यक्रम के अनुसार फ्लाइट ढूंढना आसान हो जाता है।</>,
      <>यात्रा का पहला चरण सान होज़े अंतरराष्ट्रीय हवाई अड्डे के लिए उड़ान भरना है, जिसे <a href="https://maps.app.goo.gl/4wEYh3ZHCWNWSrQo6" target="_blank" rel="noopener noreferrer">Juan Santamaría</a> (SJO) के नाम से भी जाना जाता है, जो कोस्टा रिका का सबसे बड़ा हवाई अड्डा है। SJO कई अंतरराष्ट्रीय गंतव्यों से अच्छी तरह जुड़ा हुआ है, जिससे यह प्वेर्तो वियेहो की आपकी यात्रा के लिए एक सुविधाजनक शुरुआती बिंदु बन जाता है। SJO में उतरने के बाद, आपको सीमा शुल्क (कस्टम्स) पार करके घरेलू गेट की ओर जाना होगा: बाहर एक बड़ा पुराना हवाई जहाज़ रखा है, इसलिए इसे पहचानना आसान है।</>,
      <>फ्लाइट एक छोटे लेकिन सुरक्षित सेस्ना (Cessna) विमान में लगभग 40 मिनट की होती है, जो आपको <a href="https://maps.app.goo.gl/ZZoEh3xB5jQGG4Mf9" target="_blank" rel="noopener noreferrer">Braulio Carrillo National Park</a> का विहंगम दृश्य दिखाती है।</>,
      "लिमोन पहुंचने के बाद, एक निजी ट्रांसफर सेवा आपको लगभग $75 USD में प्वेर्तो वियेहो तक पहुंचाएगी। एक ड्राइवर हवाई अड्डे पर आपका इंतज़ार करेगा और आपको सीधे आपके ठहरने की जगह तक ले जाएगा, जिससे यात्रा तनावमुक्त और आरामदायक बनेगी। वैकल्पिक रूप से, आप लिमोन से प्वेर्तो वियेहो तक बस या टैक्सी भी ले सकते हैं, लेकिन हम समय बचाने और किसी भी संभावित धोखाधड़ी से बचने के लिए पहले से निजी ट्रांसफर की व्यवस्था करने की सलाह देते हैं।",
    ],
    closingParagraphs: [
      "इस बिंदु पर, अब बस आपको आराम से बैठकर प्वेर्तो वियेहो के सुकूनभरे माहौल का आनंद लेना है। चाहे आप समुद्र तट पर आराम करना चाहें, जंगल की सैर करना चाहें, या स्वादिष्ट कैरिबियन व्यंजनों का लुत्फ़ उठाना चाहें, प्वेर्तो वियेहो में हर किसी के लिए कुछ न कुछ है।",
      "संक्षेप में कहें तो, सान होज़े से लिमोन तक की घरेलू उड़ान की बदौलत, किसी भी गंतव्य से प्वेर्तो वियेहो की यात्रा करना आसान और सुविधाजनक है। एक त्वरित और आरामदायक फ्लाइट और निजी ट्रांसफर की व्यवस्था करने के विकल्प के साथ, आप जल्द ही एक ट्रॉपिकल कॉकटेल का आनंद ले रहे होंगे। तो फिर आप किस बात का इंतज़ार कर रहे हैं? आज ही प्वेर्तो वियेहो की अपनी यात्रा बुक करें और इस आकर्षक समुद्र तटीय कस्बे के जादू का खुद अनुभव करें! और अपनी यात्रा की योजना बनाने या लिमोन से निजी ट्रांसफर तय करने में मदद के लिए हमसे संपर्क करने में संकोच न करें।",
    ],
  },
};

export function puertoViejoByPlaneContent(locale: Locale): PuertoViejoByPlaneContent {
  return puertoViejoByPlane[locale] ?? puertoViejoByPlane.en!;
}

export interface TwoDaysInPVContent {
  seoTitle: string;
  seoDescription: string;
  heading: string;
  intro: React.ReactNode;
  stayRecommendationTitle: string;
  /** Day 1: Punta Uva/kayaking, then dinner/Salsa Brava. */
  day1Paragraphs: React.ReactNode[];
  /** Day 2: Cocles hike, then the drive back — rendered after WhyStayWithUs. */
  day2Paragraphs: React.ReactNode[];
  closing: React.ReactNode;
}

const twoDaysInPV: Partial<Record<Locale, TwoDaysInPVContent>> = {
  en: {
    seoTitle: '2 Days One Night in Puerto Viejo',
    seoDescription:
      'Do you only have a couple of days to visit Puerto Viejo? So did we! We only had 1 night coming from Tortuguero and wanted to make the best out of the time we had in this charming beach town located on the southern Caribbean coast of Costa Rica.',
    heading: '2 Days One Night in Puerto Viejo',
    intro:
      "Do you only have a couple of days to visit Puerto Viejo? So did we! We only had 1 night coming from Tortuguero and wanted to make the best out of the time we had in this charming beach town located on the southern Caribbean coast of Costa Rica. With its laid-back atmosphere, pristine beaches, and lush tropical jungle, Puerto Viejo is the perfect destination for a quick weekend escape. In this article, we'll share our experience of spending two days in Puerto Viejo, and give you tips on how to make the most out of your trip.",
    stayRecommendationTitle: 'Where to stay if you only have 2 days in Puerto Viejo?',
    day1Paragraphs: [
      <>We arrived in Puerto Viejo early on a Saturday morning, excited to start our adventure. Our <a href="https://www.reservaskalawala.com/en/tucano/" target="_blank" rel="noopener noreferrer">Airbnb</a> wasn't ready yet, so we decided to rent a quad nearby and head to Punta Uva to soak up some sun. The beach was stunning, with turquoise and calm waters. We rented Kayaks and explored the coast. For lunch, we stopped by <a href="https://maps.app.goo.gl/TnyD131GeLKYeARSA" target="_blank" rel="noopener noreferrer">Selvin's</a>, a local Caribbean restaurant, and tried some delicious Caribbean chicken with Rice and Beans.</>,
      <>Afterward, we checked into our Airbnb, took a refreshing shower, and rested for a while. For dinner, we decided to try <a href="https://maps.app.goo.gl/2vNghKagTvPVHnip6" target="_blank" rel="noopener noreferrer">Cafe Viejo</a>, an Italian restaurant located in the center of town. The food was fantastic, we tried the "Fritto Misto", a mix of fried fish and seafood. Later that night, we headed to <a href="https://maps.app.goo.gl/fXnSossA1PqAfkbh9" target="_blank" rel="noopener noreferrer">Salsa Brava</a>, a beachside bar that's known for its reggae nights and chill vibe.</>,
    ],
    day2Paragraphs: [
      <>The next day, we got up later than we would've liked to, we got coffee and croissants at the <a href="https://maps.app.goo.gl/UW6EWzA4h9WQTsbX6" target="_blank" rel="noopener noreferrer">Degustibus Bakery</a> and headed off to Cocles. There is a nice and well kept path closeby the bakery that leads to Cocles, where we discovered a nice viewpoint before getting to the beach.</>,
      "After our hike, we headed back to the house to pack up and check out. We were lucky to leave on a Sunday as we were told that no big trucks on the road are allowed, making our journey back to San José smoother than expected.",
    ],
    closing:
      "Puerto Viejo is an excellent destination for a quick weekend getaway. With its stunning beaches, vibrant nightlife, and natural beauty, you'll never run out of things to do. Whether you're looking for adventure or relaxation, Puerto Viejo has something to offer everyone. So what are you waiting for? Book your trip today and experience the magic of Puerto Viejo for yourself!",
  },
  es: {
    seoTitle: '2 Días y Una Noche en Puerto Viejo',
    seoDescription:
      '¿Solo tienes un par de días para visitar Puerto Viejo? ¡Nosotros también! Solo tuvimos una noche viniendo desde Tortuguero y queríamos aprovechar al máximo el tiempo que teníamos en este encantador pueblo de playa ubicado en la costa caribeña sur de Costa Rica.',
    heading: '2 Días y Una Noche en Puerto Viejo',
    intro:
      '¿Solo tienes un par de días para visitar Puerto Viejo? ¡Nosotros también! Solo tuvimos una noche viniendo desde Tortuguero y queríamos aprovechar al máximo el tiempo que teníamos en este encantador pueblo de playa ubicado en la costa caribeña sur de Costa Rica. Con su ambiente relajado, playas vírgenes y exuberante jungla tropical, Puerto Viejo es el destino perfecto para una rápida escapada de fin de semana. En este artículo, compartiremos nuestra experiencia de pasar dos días en Puerto Viejo y te daremos consejos sobre cómo aprovechar al máximo tu viaje.',
    stayRecommendationTitle: '¿Dónde hospedarte si solo tienes 2 días en Puerto Viejo?',
    day1Paragraphs: [
      <>Llegamos a Puerto Viejo temprano un sábado por la mañana, emocionados por comenzar nuestra aventura. Nuestro <a href="https://www.reservaskalawala.com/en/tucano/" target="_blank" rel="noopener noreferrer">Airbnb</a> no estaba listo aún, así que decidimos alquilar un ATV cerca y dirigirnos a Punta Uva para disfrutar del sol. La playa era impresionante, con aguas turquesas y tranquilas. Alquilamos kayaks y exploramos la costa. Para el almuerzo, nos detuvimos en <a href="https://maps.app.goo.gl/TnyD131GeLKYeARSA" target="_blank" rel="noopener noreferrer">Selvin's</a>, un restaurante caribeño local, y probamos un delicioso pollo caribeño con rice and beans.</>,
      <>Después, nos registramos en nuestro Airbnb, tomamos una ducha refrescante y descansamos por un rato. Para la cena, decidimos probar <a href="https://maps.app.goo.gl/2vNghKagTvPVHnip6" target="_blank" rel="noopener noreferrer">Cafe Viejo</a>, un restaurante italiano ubicado en el centro del pueblo. La comida fue fantástica; probamos el "Fritto Misto", una mezcla de pescado y mariscos fritos. Más tarde esa noche, nos dirigimos a <a href="https://maps.app.goo.gl/fXnSossA1PqAfkbh9" target="_blank" rel="noopener noreferrer">Salsa Brava</a>, un bar en la playa conocido por sus noches de reggae y ambiente relajado.</>,
    ],
    day2Paragraphs: [
      <>Al día siguiente, nos levantamos más tarde de lo que hubiéramos querido, tomamos café y croissants en la <a href="https://maps.app.goo.gl/UW6EWzA4h9WQTsbX6" target="_blank" rel="noopener noreferrer">Panadería Degustibus</a> y nos dirigimos a Cocles. Hay un camino agradable y bien cuidado cerca de la panadería que conduce a Cocles, donde descubrimos un bonito mirador antes de llegar a la playa.</>,
      'Después de nuestra caminata, regresamos a la casa para empacar y hacer el check-out. Tuvimos suerte de irnos un domingo, ya que nos dijeron que no se permiten camiones grandes en la carretera, lo que hizo nuestro viaje de regreso a San José más suave de lo esperado.',
    ],
    closing:
      '¡Puerto Viejo es un excelente destino para una escapada rápida de fin de semana. Con sus impresionantes playas, vibrante vida nocturna y belleza natural, nunca te quedarás sin cosas que hacer. Ya sea que busques aventura o descansar, Puerto Viejo tiene algo que ofrecer para todos. ¿Qué estás esperando? ¡Reserva tu viaje hoy y experimenta la magia de Puerto Viejo por ti mismo!',
  },
  de: {
    seoTitle: '2 Tage, 1 Nacht in Puerto Viejo',
    seoDescription:
      'Haben Sie nur ein paar Tage, um Puerto Viejo zu besuchen? Uns ging es genauso! Wir hatten, von Tortuguero kommend, nur eine Nacht und wollten das Beste aus der Zeit machen, die wir in diesem charmanten Küstenstädtchen an der südlichen Karibikküste Costa Ricas hatten.',
    heading: '2 Tage, 1 Nacht in Puerto Viejo',
    intro:
      "Haben Sie nur ein paar Tage, um Puerto Viejo zu besuchen? Uns ging es genauso! Wir hatten, von Tortuguero kommend, nur eine Nacht und wollten das Beste aus der Zeit machen, die wir in diesem charmanten Küstenstädtchen an der südlichen Karibikküste Costa Ricas hatten. Mit seiner entspannten Atmosphäre, unberührten Stränden und dem üppigen tropischen Dschungel ist Puerto Viejo das perfekte Ziel für eine kurze Wochenendflucht. In diesem Artikel teilen wir unsere Erfahrungen aus zwei Tagen in Puerto Viejo und geben Ihnen Tipps, wie Sie das Beste aus Ihrer Reise herausholen können.",
    stayRecommendationTitle: 'Wo übernachten, wenn Sie nur 2 Tage in Puerto Viejo haben?',
    day1Paragraphs: [
      <>Wir kamen früh an einem Samstagmorgen in Puerto Viejo an, voller Vorfreude auf unser Abenteuer. Unser <a href="https://www.reservaskalawala.com/en/tucano/" target="_blank" rel="noopener noreferrer">Airbnb</a> war noch nicht bereit, also mieteten wir in der Nähe ein Quad und fuhren nach Punta Uva, um etwas Sonne zu tanken. Der Strand war atemberaubend, mit türkisfarbenem, ruhigem Wasser. Wir liehen uns Kajaks aus und erkundeten die Küste. Zum Mittagessen hielten wir bei <a href="https://maps.app.goo.gl/TnyD131GeLKYeARSA" target="_blank" rel="noopener noreferrer">Selvin's</a>, einem lokalen karibischen Restaurant, an und probierten köstliches karibisches Hähnchen mit Rice and Beans.</>,
      <>Danach checkten wir in unserem Airbnb ein, nahmen eine erfrischende Dusche und ruhten uns eine Weile aus. Zum Abendessen entschieden wir uns für <a href="https://maps.app.goo.gl/2vNghKagTvPVHnip6" target="_blank" rel="noopener noreferrer">Cafe Viejo</a>, ein italienisches Restaurant im Zentrum der Stadt. Das Essen war fantastisch, wir probierten das „Fritto Misto", eine Mischung aus frittiertem Fisch und Meeresfrüchten. Später am Abend gingen wir zur <a href="https://maps.app.goo.gl/fXnSossA1PqAfkbh9" target="_blank" rel="noopener noreferrer">Salsa Brava</a>, einer Strandbar, die für ihre Reggae-Nächte und entspannte Atmosphäre bekannt ist.</>,
    ],
    day2Paragraphs: [
      <>Am nächsten Tag standen wir später auf, als uns lieb war, holten uns Kaffee und Croissants bei der <a href="https://maps.app.goo.gl/UW6EWzA4h9WQTsbX6" target="_blank" rel="noopener noreferrer">Degustibus Bakery</a> und machten uns auf den Weg nach Cocles. In der Nähe der Bäckerei gibt es einen schönen, gut gepflegten Weg, der nach Cocles führt, wo wir vor dem Strand einen tollen Aussichtspunkt entdeckten.</>,
      "Nach unserer Wanderung kehrten wir zum Haus zurück, um zu packen und auszuchecken. Wir hatten Glück, an einem Sonntag abzureisen, denn man hatte uns gesagt, dass an diesem Tag keine großen Lastwagen auf der Straße erlaubt sind, was unsere Rückfahrt nach San José reibungsloser machte als erwartet.",
    ],
    closing:
      "Puerto Viejo ist ein hervorragendes Ziel für einen kurzen Wochenendausflug. Mit seinen atemberaubenden Stränden, dem pulsierenden Nachtleben und seiner natürlichen Schönheit werden Ihnen die Aktivitäten nie ausgehen. Ob Sie Abenteuer oder Entspannung suchen, Puerto Viejo hat für jeden etwas zu bieten. Worauf warten Sie also noch? Buchen Sie noch heute Ihre Reise und erleben Sie die Magie von Puerto Viejo selbst!",
  },
  fr: {
    seoTitle: '2 jours et une nuit à Puerto Viejo',
    seoDescription:
      "Vous n'avez que quelques jours pour visiter Puerto Viejo ? C'était aussi notre cas ! Nous n'avions qu'une nuit en arrivant de Tortuguero et voulions profiter au maximum du temps dont nous disposions dans cette charmante ville balnéaire située sur la côte caribéenne sud du Costa Rica.",
    heading: '2 jours et une nuit à Puerto Viejo',
    intro:
      "Vous n'avez que quelques jours pour visiter Puerto Viejo ? C'était aussi notre cas ! Nous n'avions qu'une nuit en arrivant de Tortuguero et voulions profiter au maximum du temps dont nous disposions dans cette charmante ville balnéaire située sur la côte caribéenne sud du Costa Rica. Avec son ambiance décontractée, ses plages immaculées et sa jungle tropicale luxuriante, Puerto Viejo est la destination idéale pour une escapade rapide le temps d'un week-end. Dans cet article, nous partageons notre expérience de deux jours à Puerto Viejo et vous donnons des conseils pour profiter au maximum de votre séjour.",
    stayRecommendationTitle: "Où loger si vous n'avez que 2 jours à Puerto Viejo ?",
    day1Paragraphs: [
      <>Nous sommes arrivés à Puerto Viejo tôt un samedi matin, impatients de commencer notre aventure. Notre <a href="https://www.reservaskalawala.com/en/tucano/" target="_blank" rel="noopener noreferrer">Airbnb</a> n'était pas encore prêt, nous avons donc décidé de louer un quad à proximité et de nous rendre à Punta Uva pour profiter du soleil. La plage était magnifique, avec des eaux turquoise et calmes. Nous avons loué des kayaks et exploré la côte. Pour le déjeuner, nous nous sommes arrêtés chez <a href="https://maps.app.goo.gl/TnyD131GeLKYeARSA" target="_blank" rel="noopener noreferrer">Selvin's</a>, un restaurant caribéen local, et avons goûté un délicieux poulet caribéen accompagné de rice and beans.</>,
      <>Ensuite, nous avons pris possession de notre Airbnb, pris une douche rafraîchissante et nous sommes reposés un moment. Pour le dîner, nous avons décidé d'essayer <a href="https://maps.app.goo.gl/2vNghKagTvPVHnip6" target="_blank" rel="noopener noreferrer">Cafe Viejo</a>, un restaurant italien situé au centre-ville. La nourriture était fantastique ; nous avons goûté le « Fritto Misto », un mélange de poisson et de fruits de mer frits. Plus tard dans la soirée, nous nous sommes rendus au <a href="https://maps.app.goo.gl/fXnSossA1PqAfkbh9" target="_blank" rel="noopener noreferrer">Salsa Brava</a>, un bar en bord de plage réputé pour ses soirées reggae et son ambiance décontractée.</>,
    ],
    day2Paragraphs: [
      <>Le lendemain, nous nous sommes levés plus tard que nous l'aurions voulu, avons pris un café et des croissants à la <a href="https://maps.app.goo.gl/UW6EWzA4h9WQTsbX6" target="_blank" rel="noopener noreferrer">boulangerie Degustibus</a> et sommes partis pour Cocles. Il y a un joli sentier bien entretenu tout près de la boulangerie qui mène à Cocles, où nous avons découvert un beau point de vue avant d'arriver à la plage.</>,
      "Après notre randonnée, nous sommes retournés à la maison pour faire nos bagages et procéder au check-out. Nous avons eu de la chance de partir un dimanche, car on nous a dit que les gros camions n'étaient pas autorisés sur la route, ce qui a rendu notre trajet retour vers San José plus fluide que prévu.",
    ],
    closing:
      "Puerto Viejo est une excellente destination pour une escapade rapide le temps d'un week-end. Avec ses plages magnifiques, sa vie nocturne animée et sa beauté naturelle, vous ne manquerez jamais d'activités. Que vous soyez en quête d'aventure ou de détente, Puerto Viejo a quelque chose à offrir à chacun. Alors, qu'attendez-vous ? Réservez votre voyage dès aujourd'hui et découvrez par vous-même la magie de Puerto Viejo !",
  },
  he: {
    seoTitle: '2 ימים ולילה אחד בפוארטו ויחו',
    seoDescription:
      'יש לכם רק כמה ימים לבקר בפוארטו ויחו? גם לנו! היה לנו רק לילה אחד בהגיענו מטורטוגרו, ורצינו לנצל את הזמן שהיה לנו בעיירת החוף המקסימה הזו, הממוקמת בחוף הקריבי הדרומי של קוסטה ריקה, עד תום.',
    heading: '2 ימים ולילה אחד בפוארטו ויחו',
    intro:
      "יש לכם רק כמה ימים לבקר בפוארטו ויחו? גם לנו! היה לנו רק לילה אחד בהגיענו מטורטוגרו, ורצינו לנצל את הזמן שהיה לנו בעיירת החוף המקסימה הזו, הממוקמת בחוף הקריבי הדרומי של קוסטה ריקה, עד תום. עם האווירה הרגועה, החופים הבתוליים והג'ונגל הטרופי העבות שלה, פוארטו ויחו היא היעד המושלם לבריחה מהירה בסוף שבוע. במאמר זה נשתף אתכם בחוויה שלנו מבילוי יומיים בפוארטו ויחו, וניתן לכם טיפים כיצד לנצל את הטיול שלכם עד תום.",
    stayRecommendationTitle: 'היכן להתארח אם יש לכם רק יומיים בפוארטו ויחו?',
    day1Paragraphs: [
      <>הגענו לפוארטו ויחו מוקדם בבוקר יום שבת, נרגשים להתחיל את ההרפתקה שלנו. ה-<a href="https://www.reservaskalawala.com/en/tucano/" target="_blank" rel="noopener noreferrer">Airbnb</a> שלנו עדיין לא היה מוכן, אז החלטנו לשכור קוואד בקרבת מקום ולנסוע לפונטה אובה כדי ליהנות מהשמש. החוף היה מדהים, עם מים טורקיזים ורגועים. שכרנו קיאקים וחקרנו את החוף. לארוחת הצהריים, עצרנו ב-<a href="https://maps.app.goo.gl/TnyD131GeLKYeARSA" target="_blank" rel="noopener noreferrer">Selvin's</a>, מסעדה קריבית מקומית, וטעמנו עוף קריבי טעים עם רייס אנד בינס.</>,
      <>אחר כך, נכנסנו ל-Airbnb שלנו, התרעננו במקלחת ונחנו קצת. לארוחת הערב, החלטנו לנסות את <a href="https://maps.app.goo.gl/2vNghKagTvPVHnip6" target="_blank" rel="noopener noreferrer">Cafe Viejo</a>, מסעדה איטלקית הממוקמת במרכז העיירה. האוכל היה נהדר, טעמנו את ה"Fritto Misto", תערובת של דגים ופירות ים מטוגנים. מאוחר יותר באותו לילה, פנינו ל-<a href="https://maps.app.goo.gl/fXnSossA1PqAfkbh9" target="_blank" rel="noopener noreferrer">Salsa Brava</a>, בר על החוף הידוע בלילות הרגאיי שלו ובאווירה הנינוחה.</>,
    ],
    day2Paragraphs: [
      <>למחרת, קמנו מאוחר יותר משהיינו רוצים, שתינו קפה ואכלנו קרואסונים ב-<a href="https://maps.app.goo.gl/UW6EWzA4h9WQTsbX6" target="_blank" rel="noopener noreferrer">מאפיית Degustibus</a> ויצאנו לכיוון קוקלס. יש שביל נחמד ומטופח היטב בקרבת המאפייה שמוביל לקוקלס, שם גילינו נקודת תצפית יפה לפני שהגענו לחוף.</>,
      "אחרי הטיול שלנו, חזרנו הביתה לארוז ולבצע צ'ק-אאוט. היה לנו מזל לצאת ביום ראשון, כי נאמר לנו שמשאיות גדולות אסורות בכביש בימי ראשון, מה שהפך את המסע שלנו חזרה לסן חוזה חלק יותר מהצפוי.",
    ],
    closing:
      "פוארטו ויחו הוא יעד מצוין לבריחה מהירה בסוף שבוע. עם החופים המדהימים, חיי הלילה התוססים והיופי הטבעי שלו, לעולם לא ייגמרו לכם הדברים לעשות. בין אם אתם מחפשים הרפתקה או הרגעה, לפוארטו ויחו יש משהו להציע לכולם. אז למה אתם מחכים? הזמינו את הטיול שלכם היום וחוו בעצמכם את הקסם של פוארטו ויחו!",
  },
  it: {
    seoTitle: '2 Giorni e Una Notte a Puerto Viejo',
    seoDescription:
      "Hai solo un paio di giorni per visitare Puerto Viejo? Anche noi! Avevamo solo una notte a disposizione arrivando da Tortuguero e volevamo sfruttare al meglio il tempo che avevamo in questo affascinante paese di mare situato sulla costa caraibica meridionale della Costa Rica.",
    heading: '2 Giorni e Una Notte a Puerto Viejo',
    intro:
      "Hai solo un paio di giorni per visitare Puerto Viejo? Anche noi! Avevamo solo una notte a disposizione arrivando da Tortuguero e volevamo sfruttare al meglio il tempo che avevamo in questo affascinante paese di mare situato sulla costa caraibica meridionale della Costa Rica. Con la sua atmosfera rilassata, le spiagge incontaminate e la rigogliosa giungla tropicale, Puerto Viejo è la destinazione perfetta per una rapida fuga nel weekend. In questo articolo condivideremo la nostra esperienza di due giorni a Puerto Viejo e ti daremo consigli su come sfruttare al meglio il tuo viaggio.",
    stayRecommendationTitle: 'Dove alloggiare se hai solo 2 giorni a Puerto Viejo?',
    day1Paragraphs: [
      <>Siamo arrivati a Puerto Viejo la mattina presto di un sabato, entusiasti di iniziare la nostra avventura. Il nostro <a href="https://www.reservaskalawala.com/en/tucano/" target="_blank" rel="noopener noreferrer">Airbnb</a> non era ancora pronto, quindi abbiamo deciso di noleggiare un quad lì vicino e dirigerci verso Punta Uva per goderci un po' di sole. La spiaggia era splendida, con acque turchesi e calme. Abbiamo noleggiato dei kayak ed esplorato la costa. Per pranzo ci siamo fermati da <a href="https://maps.app.goo.gl/TnyD131GeLKYeARSA" target="_blank" rel="noopener noreferrer">Selvin's</a>, un ristorante caraibico locale, dove abbiamo assaggiato un delizioso pollo caraibico con Rice and Beans.</>,
      <>Dopo, abbiamo fatto il check-in nel nostro Airbnb, fatto una doccia rinfrescante e riposato un po'. Per cena abbiamo deciso di provare <a href="https://maps.app.goo.gl/2vNghKagTvPVHnip6" target="_blank" rel="noopener noreferrer">Cafe Viejo</a>, un ristorante italiano situato nel centro del paese. Il cibo era fantastico, abbiamo provato il "Fritto Misto", un misto di pesce e frutti di mare fritti. Più tardi quella sera, ci siamo diretti verso <a href="https://maps.app.goo.gl/fXnSossA1PqAfkbh9" target="_blank" rel="noopener noreferrer">Salsa Brava</a>, un bar sulla spiaggia noto per le sue serate reggae e l'atmosfera rilassata.</>,
    ],
    day2Paragraphs: [
      <>Il giorno dopo, ci siamo svegliati più tardi di quanto avremmo voluto, abbiamo preso un caffè e dei croissant alla <a href="https://maps.app.goo.gl/UW6EWzA4h9WQTsbX6" target="_blank" rel="noopener noreferrer">Degustibus Bakery</a> e ci siamo diretti verso Cocles. Vicino alla panetteria c'è un sentiero piacevole e ben curato che conduce a Cocles, dove abbiamo scoperto un bel punto panoramico prima di arrivare in spiaggia.</>,
      "Dopo la nostra escursione, siamo tornati a casa per fare i bagagli e il check-out. Siamo stati fortunati a partire di domenica, perché ci hanno detto che in quel giorno non è consentito il transito dei grandi camion, rendendo il nostro viaggio di ritorno a San José più agevole del previsto.",
    ],
    closing:
      "Puerto Viejo è una destinazione eccellente per una rapida fuga nel weekend. Con le sue splendide spiagge, la vivace vita notturna e la bellezza naturale, non ti mancheranno mai le cose da fare. Che tu sia in cerca di avventura o relax, Puerto Viejo ha qualcosa da offrire a tutti. Allora cosa aspetti? Prenota il tuo viaggio oggi stesso e scopri di persona la magia di Puerto Viejo!",
  },
  pt: {
    seoTitle: '2 Dias e Uma Noite em Puerto Viejo',
    seoDescription:
      "Só tem alguns dias para visitar Puerto Viejo? Nós também tínhamos! Só tivemos 1 noite, vindos de Tortuguero, e queríamos aproveitar ao máximo o tempo que tínhamos nesta encantadora vila de praia situada na costa caribenha sul da Costa Rica.",
    heading: '2 Dias e Uma Noite em Puerto Viejo',
    intro:
      "Só tem alguns dias para visitar Puerto Viejo? Nós também tínhamos! Só tivemos 1 noite, vindos de Tortuguero, e queríamos aproveitar ao máximo o tempo que tínhamos nesta encantadora vila de praia situada na costa caribenha sul da Costa Rica. Com o seu ambiente descontraído, praias intocadas e exuberante selva tropical, Puerto Viejo é o destino perfeito para uma rápida escapadela de fim de semana. Neste artigo, partilhamos a nossa experiência de dois dias em Puerto Viejo e damos-lhe dicas para aproveitar ao máximo a sua viagem.",
    stayRecommendationTitle: 'Onde ficar hospedado se só tiver 2 dias em Puerto Viejo?',
    day1Paragraphs: [
      <>Chegámos a Puerto Viejo cedo, num sábado de manhã, entusiasmados por começar a nossa aventura. O nosso <a href="https://www.reservaskalawala.com/en/tucano/" target="_blank" rel="noopener noreferrer">Airbnb</a> ainda não estava pronto, por isso decidimos alugar um quad ali perto e seguir para Punta Uva para apanhar sol. A praia estava deslumbrante, com águas turquesa e calmas. Alugámos caiaques e explorámos a costa. Para almoçar, parámos no <a href="https://maps.app.goo.gl/TnyD131GeLKYeARSA" target="_blank" rel="noopener noreferrer">Selvin's</a>, um restaurante caribenho local, e experimentámos um delicioso frango caribenho com rice and beans.</>,
      <>Depois, fizemos o check-in no nosso Airbnb, tomámos um duche revigorante e descansámos um pouco. Para jantar, decidimos experimentar o <a href="https://maps.app.goo.gl/2vNghKagTvPVHnip6" target="_blank" rel="noopener noreferrer">Cafe Viejo</a>, um restaurante italiano situado no centro da vila. A comida estava fantástica; experimentámos o "Fritto Misto", uma mistura de peixe e marisco frito. Mais tarde, essa noite, fomos até ao <a href="https://maps.app.goo.gl/fXnSossA1PqAfkbh9" target="_blank" rel="noopener noreferrer">Salsa Brava</a>, um bar à beira-mar conhecido pelas suas noites de reggae e ambiente descontraído.</>,
    ],
    day2Paragraphs: [
      <>No dia seguinte, levantámo-nos mais tarde do que gostaríamos, tomámos café e croissants na <a href="https://maps.app.goo.gl/UW6EWzA4h9WQTsbX6" target="_blank" rel="noopener noreferrer">Degustibus Bakery</a> e seguimos para Cocles. Há um trilho agradável e bem cuidado perto da padaria que leva até Cocles, onde descobrimos um belo miradouro antes de chegar à praia.</>,
      "Depois da nossa caminhada, regressámos à casa para fazer as malas e o check-out. Tivemos sorte de partir num domingo, pois disseram-nos que não são permitidos camiões grandes na estrada, o que tornou a nossa viagem de regresso a San José mais tranquila do que esperávamos.",
    ],
    closing:
      "Puerto Viejo é um excelente destino para uma rápida escapadela de fim de semana. Com as suas praias deslumbrantes, vida noturna vibrante e beleza natural, nunca lhe faltará o que fazer. Quer procure aventura ou relaxamento, Puerto Viejo tem algo para oferecer a todos. Então, o que está à espera? Reserve já a sua viagem e viva a magia de Puerto Viejo por si mesmo!",
  },
  hi: {
    seoTitle: '2 दिन 1 रात प्वेर्तो वियेहो में',
    seoDescription:
      'क्या आपके पास प्वेर्तो वियेहो घूमने के लिए बस कुछ दिन ही हैं? हमारे पास भी थे! टोर्तुगेरो से आते हुए हमारे पास केवल 1 रात थी और हम कोस्टा रिका के दक्षिणी कैरिबियन तट पर बसे इस आकर्षक समुद्र तटीय कस्बे में मिले समय का पूरा फायदा उठाना चाहते थे।',
    heading: 'प्वेर्तो वियेहो में 2 दिन 1 रात',
    intro:
      "क्या आपके पास प्वेर्तो वियेहो घूमने के लिए बस कुछ दिन ही हैं? हमारे पास भी थे! टोर्तुगेरो से आते हुए हमारे पास केवल 1 रात थी और हम कोस्टा रिका के दक्षिणी कैरिबियन तट पर बसे इस आकर्षक समुद्र तटीय कस्बे में मिले समय का पूरा फायदा उठाना चाहते थे। अपने सुकूनभरे माहौल, बेदाग समुद्र तटों और हरे-भरे उष्णकटिबंधीय जंगल के साथ, प्वेर्तो वियेहो एक झटपट वीकेंड एस्केप के लिए एकदम सही गंतव्य है। इस लेख में, हम प्वेर्तो वियेहो में दो दिन बिताने का अपना अनुभव साझा करेंगे, और आपको अपनी यात्रा का अधिकतम लाभ उठाने के टिप्स देंगे।",
    stayRecommendationTitle: 'अगर आपके पास प्वेर्तो वियेहो में सिर्फ 2 दिन हैं तो कहां ठहरें?',
    day1Paragraphs: [
      <>हम शनिवार की सुबह जल्दी प्वेर्तो वियेहो पहुंचे, अपने सफर की शुरुआत को लेकर उत्साहित। हमारा <a href="https://www.reservaskalawala.com/en/tucano/" target="_blank" rel="noopener noreferrer">Airbnb</a> अभी तैयार नहीं था, इसलिए हमने पास में एक क्वाड किराए पर लेने और धूप सेंकने के लिए पुंटा उवा जाने का फैसला किया। समुद्र तट शानदार था, फ़िरोज़ी और शांत पानी के साथ। हमने कयाक किराए पर लिए और तट का पता लगाया। दोपहर के भोजन के लिए, हम <a href="https://maps.app.goo.gl/TnyD131GeLKYeARSA" target="_blank" rel="noopener noreferrer">Selvin's</a> पर रुके, जो एक स्थानीय कैरिबियन रेस्तरां है, और वहां स्वादिष्ट कैरिबियन चिकन के साथ राइस एंड बीन्स चखा।</>,
      <>इसके बाद, हमने अपने Airbnb में चेक-इन किया, एक ताज़गी भरा शॉवर लिया, और कुछ देर आराम किया। रात के खाने के लिए, हमने <a href="https://maps.app.goo.gl/2vNghKagTvPVHnip6" target="_blank" rel="noopener noreferrer">Cafe Viejo</a> आज़माने का फैसला किया, जो कस्बे के केंद्र में स्थित एक इतालवी रेस्तरां है। खाना शानदार था, हमने "Fritto Misto" चखा, जो तली हुई मछली और सीफूड का मिश्रण है। उस रात बाद में, हम <a href="https://maps.app.goo.gl/fXnSossA1PqAfkbh9" target="_blank" rel="noopener noreferrer">Salsa Brava</a> गए, जो एक समुद्र तट किनारे का बार है और अपनी रेगे नाइट्स और रिलैक्स्ड माहौल के लिए जाना जाता है।</>,
    ],
    day2Paragraphs: [
      <>अगले दिन, हम जितना चाहते थे उससे थोड़ी देर से उठे, <a href="https://maps.app.goo.gl/UW6EWzA4h9WQTsbX6" target="_blank" rel="noopener noreferrer">Degustibus Bakery</a> में कॉफी और क्रोइसां लिए और कॉक्लेस की ओर निकल पड़े। बेकरी के पास ही एक अच्छा और सुव्यवस्थित रास्ता है जो कॉक्लेस तक जाता है, जहां समुद्र तट पर पहुंचने से पहले हमें एक खूबसूरत दृश्य स्थल मिला।</>,
      "अपनी हाइक के बाद, हम सामान बांधने और चेक-आउट करने के लिए घर वापस गए। रविवार को निकलने की वजह से हम भाग्यशाली थे, क्योंकि हमें बताया गया था कि उस दिन सड़क पर बड़े ट्रकों की अनुमति नहीं होती, जिससे सान होज़े की हमारी वापसी की यात्रा उम्मीद से ज़्यादा आसान रही।",
    ],
    closing:
      "प्वेर्तो वियेहो एक झटपट वीकेंड गेटअवे के लिए एक बेहतरीन गंतव्य है। अपने शानदार समुद्र तटों, जीवंत नाइटलाइफ़ और प्राकृतिक सुंदरता के साथ, यहां करने के लिए चीज़ों की कभी कमी नहीं होगी। चाहे आप रोमांच ढूंढ रहे हों या आराम, प्वेर्तो वियेहो में हर किसी के लिए कुछ न कुछ है। तो फिर आप किस बात का इंतज़ार कर रहे हैं? आज ही अपनी यात्रा बुक करें और खुद प्वेर्तो वियेहो के जादू का अनुभव करें!",
  },
};

export function twoDaysInPVContent(locale: Locale): TwoDaysInPVContent {
  return twoDaysInPV[locale] ?? twoDaysInPV.en!;
}

export interface GettingToGandocaContent {
  seoTitle: string;
  seoDescription: string;
  heading: string;
  heroAlt: string;
  intro: React.ReactNode;
  transportOptionsHeading: string;
  stayRecommendationTitle: string;
  busHeading: string;
  busIntro: React.ReactNode;
  busSchedulesLabel: string;
  tableRouteHeader: string;
  tableDepartureHeader: string;
  scooterHeading: string;
  scooterParagraph1: React.ReactNode;
  scooterParagraph2: string;
  carHeading: string;
  carParagraph: string;
  conclusionHeading: string;
  conclusionParagraph1: string;
  conclusionParagraph2: string;
}

const gettingToGandoca: Partial<Record<Locale, GettingToGandocaContent>> = {
  en: {
    seoTitle: 'How to Get to Gandoca-Manzanillo National Wildlife Refuge from Puerto Viejo, Costa Rica',
    seoDescription:
      "The Gandoca-Manzanillo National Wildlife Refuge, located in the province of Limón, is one of the best-kept secrets of Costa Rica's Southern Caribbean. This impressive wildlife refuge offers a rich variety of ecosystems, from mangroves and coral reefs to pristine beaches.",
    heading: 'How to Get to Gandoca-Manzanillo National Wildlife Refuge from Puerto Viejo, Costa Rica',
    heroAlt: 'Gandoca-Manzanillo National Wildlife Refuge',
    intro:
      <>The <a href="https://maps.app.goo.gl/orUHFbrZvpJH1fnb9" target="_blank" rel="noopener noreferrer">Gandoca-Manzanillo National Wildlife Refuge</a>, located in the province of Limón, is one of the best-kept secrets of Costa Rica's Southern Caribbean. This impressive wildlife refuge offers a rich variety of ecosystems, from mangroves and coral reefs to pristine beaches. If you're in Puerto Viejo de Talamanca and looking for a nature getaway, this is an excellent option. In this guide, we show you how to easily get there from Puerto Viejo so you can fully explore this natural paradise.</>,
    transportOptionsHeading: 'Transportation Options',
    stayRecommendationTitle: 'Where to stay when visiting Gandoca-Manzanillo?',
    busHeading: '1. Bus from Puerto Viejo to Manzanillo',
    busIntro:
      <>The simplest and most economical way to reach <a href="https://maps.app.goo.gl/orUHFbrZvpJH1fnb9" target="_blank" rel="noopener noreferrer">Gandoca-Manzanillo National Wildlife Refuge</a> is by taking a bus from downtown Puerto Viejo to Manzanillo. The <a href="https://maps.app.goo.gl/orUHFbrZvpJH1fnb9" target="_blank" rel="noopener noreferrer">bus stop</a> is located where you buy the tickets, near the basketball court or by the Deleite Ice Cream Shop.</>,
    busSchedulesLabel: 'Bus schedules:',
    tableRouteHeader: 'Route',
    tableDepartureHeader: 'Departure Times',
    scooterHeading: '2. Rent a Scooter or a 4x4',
    scooterParagraph1:
      <>If you prefer to explore at your own pace, renting a scooter or a 4x4 is an excellent option. If you're staying in our houses in downtown Puerto Viejo, you can rent vehicles at <a href="https://maps.app.goo.gl/uao7BMUuwFLyRL6dA" target="_blank" rel="noopener noreferrer">Mistery Jungle</a>, right in front, with prices starting at $30. If you're staying in our villas in Playa Chiquita, you can request to have the vehicle delivered directly to your villa.</>,
    scooterParagraph2:
      'This option is ideal for those seeking a personalized adventure, as it allows you to make stops wherever you like and explore the charming town of Manzanillo without worrying about bus schedules. Enjoy the freedom to explore your way and discover all the corners this beautiful destination has to offer.',
    carHeading: '3. Travel by Car from Puerto Viejo',
    carParagraph:
      "If you decide to travel by car from Puerto Viejo, simply head towards Manzanillo and cover the 14 km distance. Upon arrival, you'll find parking available outside the reserve, where some locals offer to watch your vehicle for a small fee. We recommend not leaving valuables inside the car as a safety measure.",
    conclusionHeading: 'Conclusion',
    conclusionParagraph1:
      'Gandoca-Manzanillo National Wildlife Refuge is a must-visit destination for nature and adventure lovers. Whether you choose to travel by bus, rent a vehicle, or drive, getting to this natural paradise is easy and accessible.',
    conclusionParagraph2:
      'We invite you to plan your visit to this beautiful refuge and take the opportunity to stay in our cozy houses in Puerto Viejo de Talamanca. We offer a comfortable and relaxing environment, perfect for enjoying nature and exploring all that the region has to offer. Discover the charm of Gandoca-Manzanillo National Wildlife Refuge and the warmth of our villas!',
  },
  es: {
    seoTitle: 'Cómo Llegar al Refugio Nacional Gandoca-Manzanillo desde Puerto Viejo, Costa Rica',
    seoDescription:
      'El Refugio Nacional Gandoca-Manzanillo, ubicado en la provincia de Limón, es uno de los secretos mejor guardados del Caribe Sur de Costa Rica. Este impresionante refugio de vida silvestre ofrece una rica variedad de ecosistemas, desde manglares y arrecifes de coral hasta playas vírgenes.',
    heading: 'Cómo Llegar al Refugio Nacional Gandoca-Manzanillo desde Puerto Viejo, Costa Rica',
    heroAlt: 'Playa del Refugio Nacional Gandoca-Manzanillo',
    intro:
      <>El <a href="https://maps.app.goo.gl/orUHFbrZvpJH1fnb9" target="_blank" rel="noopener noreferrer">Refugio Nacional Gandoca-Manzanillo</a>, ubicado en la provincia de Limón, es uno de los secretos mejor guardados del Caribe Sur de Costa Rica. Este impresionante refugio de vida silvestre ofrece una rica variedad de ecosistemas, desde manglares y arrecifes de coral hasta playas vírgenes. Si estás en Puerto Viejo de Talamanca y buscas una escapada a la naturaleza, esta es una excelente opción. En esta guía, te mostramos cómo llegar fácilmente desde Puerto Viejo para que puedas explorar al máximo este paraíso natural.</>,
    transportOptionsHeading: 'Opciones de Transporte',
    stayRecommendationTitle: '¿Dónde hospedarte cuando visites Gandoca-Manzanillo?',
    busHeading: '1. Autobús desde Puerto Viejo a Manzanillo',
    busIntro:
      <>La forma más sencilla y económica de llegar al <a href="https://maps.app.goo.gl/orUHFbrZvpJH1fnb9" target="_blank" rel="noopener noreferrer">Refugio Nacional Gandoca-Manzanillo</a> es tomando un autobús desde el centro de Puerto Viejo con destino a Manzanillo. La <a href="https://maps.app.goo.gl/orUHFbrZvpJH1fnb9" target="_blank" rel="noopener noreferrer">parada</a> se encuentra donde se compran los tiquetes, cerca de la cancha de baloncesto o por la Heladería Deleite.</>,
    busSchedulesLabel: 'Horarios de los buses:',
    tableRouteHeader: 'Ruta',
    tableDepartureHeader: 'Horarios de Salida',
    scooterHeading: '2. Rentar un Scooter o un 4x4',
    scooterParagraph1:
      <>Si prefieres explorar a tu propio ritmo, rentar un scooter o un 4x4 es una excelente opción. Si te hospedas en nuestras casas en el centro de Puerto Viejo, puedes rentar vehículos en <a href="https://maps.app.goo.gl/uao7BMUuwFLyRL6dA" target="_blank" rel="noopener noreferrer">Mistery Jungle</a>, justo al frente, con precios que comienzan en $30. Si estás alojado en nuestras villas en Playa Chiquita, puedes solicitar que te entreguen el vehículo directamente en tu villa.</>,
    scooterParagraph2:
      'Esta opción es ideal para quienes buscan una aventura personalizada, ya que te permite hacer paradas donde desees y recorrer el encantador pueblo de Manzanillo sin preocuparte por los horarios del autobús. Disfruta de la libertad de explorar a tu manera y descubre todos los rincones que este hermoso destino tiene para ofrecer.',
    carHeading: '3. Viajar en Carro desde Puerto Viejo',
    carParagraph:
      'Si decides viajar en carro desde Puerto Viejo, simplemente toma dirección a Manzanillo y recorre los 14 km de distancia. Al llegar, encontrarás estacionamiento disponible fuera de la reserva, donde algunas personas de la zona ofrecen cuidar tu vehículo a cambio de una pequeña tarifa. Te recomendamos no dejar objetos de valor dentro del carro por seguridad.',
    conclusionHeading: 'Conclusión',
    conclusionParagraph1:
      'El Refugio Nacional Gandoca-Manzanillo es un destino imperdible para los amantes de la naturaleza y la aventura. Ya sea que decidas viajar en autobús, rentar un vehículo o ir en carro, llegar a este paraíso natural es fácil y accesible.',
    conclusionParagraph2:
      'Te invitamos a planificar tu visita a este hermoso refugio y a aprovechar la oportunidad de hospedarte en nuestras acogedoras casas en Puerto Viejo de Talamanca. Ofrecemos un ambiente cómodo y relajante, perfecto para disfrutar de la naturaleza y explorar todo lo que la región tiene para ofrecer. ¡No esperes más y ven a descubrir el encanto del Refugio Nacional Gandoca-Manzanillo y la calidez de nuestras villas!',
  },
  fr: {
    seoTitle: 'Comment se rendre au Refuge national de vie sauvage de Gandoca-Manzanillo depuis Puerto Viejo, Costa Rica',
    seoDescription:
      "Le Refuge national de vie sauvage de Gandoca-Manzanillo, situé dans la province de Limón, est l'un des secrets les mieux gardés des Caraïbes sud du Costa Rica. Cette impressionnante réserve offre une riche variété d'écosystèmes, des mangroves et récifs coralliens aux plages immaculées.",
    heading: 'Comment se rendre au Refuge national de vie sauvage de Gandoca-Manzanillo depuis Puerto Viejo, Costa Rica',
    heroAlt: 'Refuge national de vie sauvage de Gandoca-Manzanillo',
    intro:
      <>Le <a href="https://maps.app.goo.gl/orUHFbrZvpJH1fnb9" target="_blank" rel="noopener noreferrer">Refuge national de vie sauvage de Gandoca-Manzanillo</a>, situé dans la province de Limón, est l'un des secrets les mieux gardés des Caraïbes sud du Costa Rica. Cette impressionnante réserve offre une riche variété d'écosystèmes, des mangroves et récifs coralliens aux plages immaculées. Si vous êtes à Puerto Viejo de Talamanca et recherchez une escapade nature, c'est une excellente option. Dans ce guide, nous vous montrons comment vous y rendre facilement depuis Puerto Viejo afin de pleinement explorer ce paradis naturel.</>,
    transportOptionsHeading: 'Options de transport',
    stayRecommendationTitle: 'Où loger pour visiter Gandoca-Manzanillo ?',
    busHeading: "1. Bus depuis Puerto Viejo jusqu'à Manzanillo",
    busIntro:
      <>Le moyen le plus simple et le plus économique de rejoindre le <a href="https://maps.app.goo.gl/orUHFbrZvpJH1fnb9" target="_blank" rel="noopener noreferrer">Refuge national de vie sauvage de Gandoca-Manzanillo</a> est de prendre un bus depuis le centre de Puerto Viejo jusqu'à Manzanillo. L'<a href="https://maps.app.goo.gl/orUHFbrZvpJH1fnb9" target="_blank" rel="noopener noreferrer">arrêt de bus</a> se trouve à l'endroit où l'on achète les billets, près du terrain de basketball ou de la boutique de glaces Deleite.</>,
    busSchedulesLabel: 'Horaires des bus :',
    tableRouteHeader: 'Trajet',
    tableDepartureHeader: 'Horaires de départ',
    scooterHeading: '2. Louer un scooter ou un 4x4',
    scooterParagraph1:
      <>Si vous préférez explorer à votre propre rythme, louer un scooter ou un 4x4 est une excellente option. Si vous logez dans nos maisons au centre de Puerto Viejo, vous pouvez louer des véhicules chez <a href="https://maps.app.goo.gl/uao7BMUuwFLyRL6dA" target="_blank" rel="noopener noreferrer">Mistery Jungle</a>, juste en face, à partir de 30 $. Si vous logez dans nos villas à Playa Chiquita, vous pouvez demander à ce que le véhicule vous soit livré directement à votre villa.</>,
    scooterParagraph2:
      "Cette option est idéale pour ceux qui recherchent une aventure personnalisée, car elle vous permet de vous arrêter où vous le souhaitez et d'explorer le charmant village de Manzanillo sans vous soucier des horaires de bus. Profitez de la liberté d'explorer à votre façon et découvrez tous les recoins que cette magnifique destination a à offrir.",
    carHeading: '3. Voyager en voiture depuis Puerto Viejo',
    carParagraph:
      "Si vous décidez de voyager en voiture depuis Puerto Viejo, il vous suffit de vous diriger vers Manzanillo et de parcourir les 14 km de distance. À votre arrivée, vous trouverez un stationnement disponible à l'extérieur de la réserve, où certains habitants proposent de surveiller votre véhicule moyennant un petit tarif. Nous vous recommandons de ne pas laisser d'objets de valeur dans la voiture par mesure de sécurité.",
    conclusionHeading: 'Conclusion',
    conclusionParagraph1:
      "Le Refuge national de vie sauvage de Gandoca-Manzanillo est une destination incontournable pour les amoureux de la nature et de l'aventure. Que vous choisissiez de voyager en bus, de louer un véhicule ou de conduire, se rendre à ce paradis naturel est facile et accessible.",
    conclusionParagraph2:
      "Nous vous invitons à planifier votre visite dans cette magnifique réserve et à profiter de l'occasion pour séjourner dans nos maisons chaleureuses à Puerto Viejo de Talamanca. Nous offrons un cadre confortable et relaxant, parfait pour profiter de la nature et explorer tout ce que la région a à offrir. Découvrez le charme du Refuge national de vie sauvage de Gandoca-Manzanillo et la chaleur de nos villas !",
  },
  he: {
    seoTitle: 'כיצד להגיע לרפוגיו הלאומי לחיות בר גנדוקה-מנסניו מפוארטו ויחו, קוסטה ריקה',
    seoDescription:
      "הרפוגיו הלאומי לחיות בר גנדוקה-מנסניו, הממוקם במחוז לימון, הוא אחד הסודות השמורים ביותר של הקריביים הדרומי של קוסטה ריקה. רפוגיו מרשים זה מציע מגוון עשיר של מערכות אקולוגיות, ממנגרובים ושוניות אלמוגים ועד חופים בתוליים.",
    heading: 'כיצד להגיע לרפוגיו הלאומי לחיות בר גנדוקה-מנסניו מפוארטו ויחו, קוסטה ריקה',
    heroAlt: 'רפוגיו לחיות בר גנדוקה-מנסניו',
    intro:
      <>ה<a href="https://maps.app.goo.gl/orUHFbrZvpJH1fnb9" target="_blank" rel="noopener noreferrer">רפוגיו הלאומי לחיות בר גנדוקה-מנסניו</a>, הממוקם במחוז לימון, הוא אחד הסודות השמורים ביותר של הקריביים הדרומי של קוסטה ריקה. רפוגיו מרשים זה מציע מגוון עשיר של מערכות אקולוגיות, ממנגרובים ושוניות אלמוגים ועד חופים בתוליים. אם אתם בפוארטו ויחו דה טלמנקה ומחפשים בריחה אל הטבע, זוהי אפשרות מצוינת. במדריך זה נראה לכם כיצד להגיע לשם בקלות מפוארטו ויחו כדי שתוכלו לחקור במלואו את גן העדן הטבעי הזה.</>,
    transportOptionsHeading: 'אפשרויות תחבורה',
    stayRecommendationTitle: 'היכן להתארח בביקור בגנדוקה-מנסניו?',
    busHeading: '1. אוטובוס מפוארטו ויחו למנסניו',
    busIntro:
      <>הדרך הפשוטה והחסכונית ביותר להגיע ל<a href="https://maps.app.goo.gl/orUHFbrZvpJH1fnb9" target="_blank" rel="noopener noreferrer">רפוגיו הלאומי לחיות בר גנדוקה-מנסניו</a> היא באמצעות אוטובוס ממרכז פוארטו ויחו למנסניו. <a href="https://maps.app.goo.gl/orUHFbrZvpJH1fnb9" target="_blank" rel="noopener noreferrer">תחנת האוטובוס</a> ממוקמת במקום שבו קונים את הכרטיסים, ליד מגרש הכדורסל או ליד חנות הגלידה Deleite.</>,
    busSchedulesLabel: 'לוחות זמנים של האוטובוסים:',
    tableRouteHeader: 'מסלול',
    tableDepartureHeader: 'שעות יציאה',
    scooterHeading: '2. שכירת קטנוע או רכב 4x4',
    scooterParagraph1:
      <>אם אתם מעדיפים לחקור בקצב שלכם, שכירת קטנוע או רכב 4x4 היא אפשרות מצוינת. אם אתם מתארחים באחד הבתים שלנו במרכז פוארטו ויחו, תוכלו לשכור כלי רכב ב-<a href="https://maps.app.goo.gl/uao7BMUuwFLyRL6dA" target="_blank" rel="noopener noreferrer">Mistery Jungle</a>, ממש מול הבית, במחירים החל מ-30 דולר. אם אתם מתארחים באחת הווילות שלנו בפלאיה צ'יקיטה, תוכלו לבקש שהרכב יסופק ישירות לווילה שלכם.</>,
    scooterParagraph2:
      'אפשרות זו אידיאלית למי שמחפש הרפתקה אישית, שכן היא מאפשרת לכם לעצור בכל מקום שתרצו ולחקור את העיירה הקסומה מנסניו מבלי לדאוג ללוחות הזמנים של האוטובוס. תיהנו מהחופש לחקור בדרככם שלכם ולגלות את כל הפינות שליעד היפהפה הזה יש להציע.',
    carHeading: '3. נסיעה ברכב מפוארטו ויחו',
    carParagraph:
      'אם תחליטו לנסוע ברכב מפוארטו ויחו, פשוט פנו לכיוון מנסניו וכסו את המרחק של 14 ק"מ. עם ההגעה, תמצאו חניה זמינה מחוץ לשמורה, שם חלק מהתושבים המקומיים מציעים לשמור על הרכב שלכם תמורת תשלום קטן. אנו ממליצים לא להשאיר חפצי ערך בתוך הרכב כאמצעי בטיחות.',
    conclusionHeading: 'סיכום',
    conclusionParagraph1:
      'הרפוגיו הלאומי לחיות בר גנדוקה-מנסניו הוא יעד חובה לאוהבי טבע והרפתקאות. בין אם תבחרו לנסוע באוטובוס, לשכור רכב או לנהוג בעצמכם, ההגעה לגן העדן הטבעי הזה קלה ונגישה.',
    conclusionParagraph2:
      'אנו מזמינים אתכם לתכנן את הביקור שלכם ברפוגיו היפהפה הזה ולנצל את ההזדמנות להתארח בבתים הנעימים שלנו בפוארטו ויחו דה טלמנקה. אנו מציעים סביבה נוחה ומרגיעה, המושלמת ליהנות מהטבע ולחקור את כל מה שלאזור יש להציע. גלו את הקסם של הרפוגיו הלאומי לחיות בר גנדוקה-מנסניו ואת החום של הווילות שלנו!',
  },
  it: {
    seoTitle: 'Come Arrivare al Rifugio Nazionale di Fauna Selvatica Gandoca-Manzanillo da Puerto Viejo, Costa Rica',
    seoDescription:
      "Il Rifugio Nazionale di Fauna Selvatica Gandoca-Manzanillo, situato nella provincia di Limón, è uno dei segreti meglio custoditi del Caribe Sud della Costa Rica. Questo straordinario rifugio offre una ricca varietà di ecosistemi, dalle mangrovie alle barriere coralline fino alle spiagge incontaminate.",
    heading: 'Come Arrivare al Rifugio Nazionale di Fauna Selvatica Gandoca-Manzanillo da Puerto Viejo, Costa Rica',
    heroAlt: 'Rifugio Nazionale di Fauna Selvatica Gandoca-Manzanillo',
    intro:
      <>Il <a href="https://maps.app.goo.gl/orUHFbrZvpJH1fnb9" target="_blank" rel="noopener noreferrer">Rifugio Nazionale di Fauna Selvatica Gandoca-Manzanillo</a>, situato nella provincia di Limón, è uno dei segreti meglio custoditi del Caribe Sud della Costa Rica. Questo straordinario rifugio offre una ricca varietà di ecosistemi, dalle mangrovie alle barriere coralline fino alle spiagge incontaminate. Se ti trovi a Puerto Viejo de Talamanca e sei alla ricerca di una fuga nella natura, questa è un'ottima opzione. In questa guida ti mostriamo come arrivarci facilmente da Puerto Viejo, così potrai esplorare appieno questo paradiso naturale.</>,
    transportOptionsHeading: 'Opzioni di Trasporto',
    stayRecommendationTitle: 'Dove alloggiare per visitare Gandoca-Manzanillo?',
    busHeading: '1. Autobus da Puerto Viejo a Manzanillo',
    busIntro:
      <>Il modo più semplice ed economico per raggiungere il <a href="https://maps.app.goo.gl/orUHFbrZvpJH1fnb9" target="_blank" rel="noopener noreferrer">Rifugio Nazionale di Fauna Selvatica Gandoca-Manzanillo</a> è prendere un autobus dal centro di Puerto Viejo diretto a Manzanillo. La <a href="https://maps.app.goo.gl/orUHFbrZvpJH1fnb9" target="_blank" rel="noopener noreferrer">fermata dell'autobus</a> si trova dove si acquistano i biglietti, vicino al campo da basket o accanto alla gelateria Deleite.</>,
    busSchedulesLabel: 'Orari degli autobus:',
    tableRouteHeader: 'Tratta',
    tableDepartureHeader: 'Orari di Partenza',
    scooterHeading: '2. Noleggiare uno Scooter o un 4x4',
    scooterParagraph1:
      <>Se preferisci esplorare al tuo ritmo, noleggiare uno scooter o un 4x4 è un'ottima opzione. Se alloggi nelle nostre case nel centro di Puerto Viejo, puoi noleggiare i veicoli da <a href="https://maps.app.goo.gl/uao7BMUuwFLyRL6dA" target="_blank" rel="noopener noreferrer">Mistery Jungle</a>, proprio di fronte, con prezzi a partire da 30 dollari. Se alloggi nelle nostre ville a Playa Chiquita, puoi richiedere che il veicolo ti venga consegnato direttamente in villa.</>,
    scooterParagraph2:
      "Questa opzione è ideale per chi cerca un'avventura personalizzata, perché permette di fare soste ovunque si desideri e di esplorare l'affascinante paese di Manzanillo senza doversi preoccupare degli orari degli autobus. Goditi la libertà di esplorare a modo tuo e scopri tutti gli angoli che questa bellissima destinazione ha da offrire.",
    carHeading: '3. Viaggiare in Auto da Puerto Viejo',
    carParagraph:
      "Se decidi di viaggiare in auto da Puerto Viejo, ti basterà dirigerti verso Manzanillo e percorrere i 14 km di distanza. All'arrivo troverai un parcheggio disponibile fuori dalla riserva, dove alcuni abitanti del posto si offrono di sorvegliare il tuo veicolo per una piccola tariffa. Ti consigliamo di non lasciare oggetti di valore all'interno dell'auto come misura di sicurezza.",
    conclusionHeading: 'Conclusione',
    conclusionParagraph1:
      "Il Rifugio Nazionale di Fauna Selvatica Gandoca-Manzanillo è una destinazione imperdibile per gli amanti della natura e dell'avventura. Che tu scelga di viaggiare in autobus, noleggiare un veicolo o guidare, arrivare a questo paradiso naturale è facile e accessibile.",
    conclusionParagraph2:
      "Ti invitiamo a pianificare la tua visita a questo splendido rifugio e a cogliere l'occasione per soggiornare nelle nostre accoglienti case a Puerto Viejo de Talamanca. Offriamo un ambiente comodo e rilassante, perfetto per goderti la natura ed esplorare tutto ciò che la regione ha da offrire. Scopri il fascino del Rifugio Nazionale di Fauna Selvatica Gandoca-Manzanillo e il calore delle nostre ville!",
  },
  pt: {
    seoTitle: 'Como Chegar ao Refúgio Nacional de Vida Silvestre Gandoca-Manzanillo a partir de Puerto Viejo, Costa Rica',
    seoDescription:
      "O Refúgio Nacional de Vida Silvestre Gandoca-Manzanillo, situado na província de Limón, é um dos segredos mais bem guardados do Caribe Sul da Costa Rica. Este impressionante refúgio de vida selvagem oferece uma rica variedade de ecossistemas, desde mangais e recifes de coral até praias intocadas.",
    heading: 'Como Chegar ao Refúgio Nacional de Vida Silvestre Gandoca-Manzanillo a partir de Puerto Viejo, Costa Rica',
    heroAlt: 'Refúgio Nacional de Vida Silvestre Gandoca-Manzanillo',
    intro:
      <>O <a href="https://maps.app.goo.gl/orUHFbrZvpJH1fnb9" target="_blank" rel="noopener noreferrer">Refúgio Nacional de Vida Silvestre Gandoca-Manzanillo</a>, situado na província de Limón, é um dos segredos mais bem guardados do Caribe Sul da Costa Rica. Este impressionante refúgio de vida selvagem oferece uma rica variedade de ecossistemas, desde mangais e recifes de coral até praias intocadas. Se estiver em Puerto Viejo de Talamanca e à procura de uma escapadela à natureza, esta é uma excelente opção. Neste guia, mostramos-lhe como chegar facilmente a partir de Puerto Viejo para que possa explorar ao máximo este paraíso natural.</>,
    transportOptionsHeading: 'Opções de Transporte',
    stayRecommendationTitle: 'Onde ficar hospedado ao visitar Gandoca-Manzanillo?',
    busHeading: '1. Autocarro de Puerto Viejo a Manzanillo',
    busIntro:
      <>A forma mais simples e económica de chegar ao <a href="https://maps.app.goo.gl/orUHFbrZvpJH1fnb9" target="_blank" rel="noopener noreferrer">Refúgio Nacional de Vida Silvestre Gandoca-Manzanillo</a> é apanhando um autocarro do centro de Puerto Viejo até Manzanillo. A <a href="https://maps.app.goo.gl/orUHFbrZvpJH1fnb9" target="_blank" rel="noopener noreferrer">paragem de autocarro</a> fica situada onde se compram os bilhetes, perto do campo de basquetebol ou junto à gelataria Deleite.</>,
    busSchedulesLabel: 'Horários dos autocarros:',
    tableRouteHeader: 'Rota',
    tableDepartureHeader: 'Horários de Partida',
    scooterHeading: '2. Alugue uma Scooter ou um 4x4',
    scooterParagraph1:
      <>Se preferir explorar ao seu próprio ritmo, alugar uma scooter ou um 4x4 é uma excelente opção. Se estiver hospedado nas nossas casas no centro de Puerto Viejo, pode alugar veículos na <a href="https://maps.app.goo.gl/uao7BMUuwFLyRL6dA" target="_blank" rel="noopener noreferrer">Mistery Jungle</a>, mesmo em frente, com preços a partir de 30 USD. Se estiver hospedado nas nossas vilas em Playa Chiquita, pode pedir que o veículo lhe seja entregue diretamente na vila.</>,
    scooterParagraph2:
      'Esta opção é ideal para quem procura uma aventura personalizada, pois permite-lhe fazer paragens onde quiser e explorar a encantadora vila de Manzanillo sem se preocupar com os horários dos autocarros. Desfrute da liberdade de explorar ao seu modo e descubra todos os cantos que este belo destino tem para oferecer.',
    carHeading: '3. Viajar de Carro a partir de Puerto Viejo',
    carParagraph:
      "Se decidir viajar de carro a partir de Puerto Viejo, basta seguir em direção a Manzanillo e percorrer os 14 km de distância. À chegada, encontrará estacionamento disponível fora da reserva, onde alguns habitantes locais se oferecem para vigiar o seu veículo mediante uma pequena taxa. Recomendamos que não deixe objetos de valor dentro do carro, por questões de segurança.",
    conclusionHeading: 'Conclusão',
    conclusionParagraph1:
      'O Refúgio Nacional de Vida Silvestre Gandoca-Manzanillo é um destino imperdível para os amantes da natureza e da aventura. Quer opte por viajar de autocarro, alugar um veículo ou conduzir, chegar a este paraíso natural é fácil e acessível.',
    conclusionParagraph2:
      'Convidamo-lo a planear a sua visita a este belo refúgio e a aproveitar a oportunidade de ficar hospedado nas nossas acolhedoras casas em Puerto Viejo de Talamanca. Oferecemos um ambiente confortável e relaxante, perfeito para desfrutar da natureza e explorar tudo o que a região tem para oferecer. Descubra o encanto do Refúgio Nacional de Vida Silvestre Gandoca-Manzanillo e a calidez das nossas vilas!',
  },
  hi: {
    seoTitle: 'प्वेर्तो वियेहो, कोस्टा रिका से गंडोका-मानसानियो राष्ट्रीय वन्यजीव शरण्यस्थल कैसे पहुंचें',
    seoDescription:
      "लिमोन प्रांत में स्थित गंडोका-मानसानियो राष्ट्रीय वन्यजीव शरण्यस्थल, कोस्टा रिका के दक्षिणी कैरिबियन के सबसे छुपे हुए रहस्यों में से एक है। यह प्रभावशाली वन्यजीव शरण्यस्थल मैंग्रोव और प्रवाल भित्तियों से लेकर बेदाग समुद्र तटों तक, पारिस्थितिकी तंत्रों की एक समृद्ध विविधता प्रदान करता है।",
    heading: 'प्वेर्तो वियेहो, कोस्टा रिका से गंडोका-मानसानियो राष्ट्रीय वन्यजीव शरण्यस्थल कैसे पहुंचें',
    heroAlt: 'गंडोका-मानसानियो राष्ट्रीय वन्यजीव शरण्यस्थल',
    intro:
      <><a href="https://maps.app.goo.gl/orUHFbrZvpJH1fnb9" target="_blank" rel="noopener noreferrer">गंडोका-मानसानियो राष्ट्रीय वन्यजीव शरण्यस्थल</a>, जो लिमोन प्रांत में स्थित है, कोस्टा रिका के दक्षिणी कैरिबियन के सबसे छुपे हुए रहस्यों में से एक है। यह प्रभावशाली वन्यजीव शरण्यस्थल मैंग्रोव और प्रवाल भित्तियों से लेकर बेदाग समुद्र तटों तक, पारिस्थितिकी तंत्रों की एक समृद्ध विविधता प्रदान करता है। यदि आप प्वेर्तो वियेहो दे तालामांका में हैं और प्रकृति के बीच एक छुट्टी की तलाश में हैं, तो यह एक बेहतरीन विकल्प है। इस गाइड में, हम आपको दिखाते हैं कि प्वेर्तो वियेहो से वहां आसानी से कैसे पहुंचा जाए, ताकि आप इस प्राकृतिक स्वर्ग को पूरी तरह से घूम सकें।</>,
    transportOptionsHeading: 'परिवहन विकल्प',
    stayRecommendationTitle: 'गंडोका-मानसानियो घूमते समय कहां ठहरें?',
    busHeading: '1. प्वेर्तो वियेहो से मानसानियो तक बस',
    busIntro:
      <><a href="https://maps.app.goo.gl/orUHFbrZvpJH1fnb9" target="_blank" rel="noopener noreferrer">गंडोका-मानसानियो राष्ट्रीय वन्यजीव शरण्यस्थल</a> तक पहुंचने का सबसे आसान और किफ़ायती तरीका है प्वेर्तो वियेहो के डाउनटाउन से मानसानियो तक बस लेना। <a href="https://maps.app.goo.gl/orUHFbrZvpJH1fnb9" target="_blank" rel="noopener noreferrer">बस स्टॉप</a> वहीं स्थित है जहां आप टिकट खरीदते हैं, बास्केटबॉल कोर्ट के पास या Deleite आइसक्रीम शॉप के पास।</>,
    busSchedulesLabel: 'बस समय-सारणी:',
    tableRouteHeader: 'मार्ग',
    tableDepartureHeader: 'प्रस्थान समय',
    scooterHeading: '2. स्कूटर या 4x4 किराए पर लें',
    scooterParagraph1:
      <>यदि आप अपनी गति से घूमना पसंद करते हैं, तो स्कूटर या 4x4 किराए पर लेना एक बेहतरीन विकल्प है। यदि आप डाउनटाउन प्वेर्तो वियेहो में हमारे घरों में ठहरे हैं, तो आप ठीक सामने स्थित <a href="https://maps.app.goo.gl/uao7BMUuwFLyRL6dA" target="_blank" rel="noopener noreferrer">Mistery Jungle</a> से वाहन किराए पर ले सकते हैं, जहां कीमतें $30 से शुरू होती हैं। यदि आप प्लाया चिकिता में हमारे विलाओं में ठहरे हैं, तो आप वाहन को सीधे अपने विला तक पहुंचाने का अनुरोध कर सकते हैं।</>,
    scooterParagraph2:
      'यह विकल्प उन लोगों के लिए आदर्श है जो एक निजीकृत रोमांच की तलाश में हैं, क्योंकि यह आपको जहां चाहें वहां रुकने और बस के समय की चिंता किए बिना मानसानियो के आकर्षक कस्बे को घूमने की आज़ादी देता है। अपने तरीके से घूमने की आज़ादी का आनंद लें और इस खूबसूरत गंतव्य के हर कोने की खोज करें।',
    carHeading: '3. प्वेर्तो वियेहो से कार द्वारा यात्रा',
    carParagraph:
      "यदि आप प्वेर्तो वियेहो से कार द्वारा यात्रा करने का फैसला करते हैं, तो बस मानसानियो की ओर बढ़ें और 14 किलोमीटर की दूरी तय करें। पहुंचने पर, आपको रिज़र्व के बाहर पार्किंग उपलब्ध मिलेगी, जहां कुछ स्थानीय लोग एक छोटी सी फीस के बदले आपके वाहन की निगरानी करने की पेशकश करते हैं। सुरक्षा उपाय के तौर पर हम कार के अंदर कीमती सामान न छोड़ने की सलाह देते हैं।",
    conclusionHeading: 'निष्कर्ष',
    conclusionParagraph1:
      'गंडोका-मानसानियो राष्ट्रीय वन्यजीव शरण्यस्थल प्रकृति और रोमांच प्रेमियों के लिए एक ज़रूर देखने लायक गंतव्य है। चाहे आप बस से यात्रा करना चुनें, वाहन किराए पर लें, या खुद गाड़ी चलाएं, इस प्राकृतिक स्वर्ग तक पहुंचना आसान और सुलभ है।',
    conclusionParagraph2:
      'हम आपको इस खूबसूरत शरण्यस्थल की अपनी यात्रा की योजना बनाने और प्वेर्तो वियेहो दे तालामांका में हमारे आरामदायक घरों में ठहरने का मौका लेने के लिए आमंत्रित करते हैं। हम एक आरामदायक और सुकूनभरा माहौल प्रदान करते हैं, जो प्रकृति का आनंद लेने और इस क्षेत्र में जो कुछ भी उपलब्ध है उसे घूमने के लिए एकदम सही है। गंडोका-मानसानियो राष्ट्रीय वन्यजीव शरण्यस्थल के आकर्षण और हमारे विलाओं की गर्मजोशी की खोज करें!',
  },
};

export function gettingToGandocaContent(locale: Locale): GettingToGandocaContent {
  return gettingToGandoca[locale] ?? gettingToGandoca.en!;
}

export interface TravellingToPuertoContent {
  seoTitle: string;
  seoDescription: string;
  heading: string;
  /** Rendered before StayRecommendation. */
  paragraphsBeforeStay: React.ReactNode[];
  stayRecommendationTitle: string;
  /** Rendered after StayRecommendation; WhyStayWithUs follows all of it. */
  paragraphsBetween: React.ReactNode[];
}

const travellingToPuerto: Partial<Record<Locale, TravellingToPuertoContent>> = {
  en: {
    seoTitle: 'How to get to Puerto Viejo from San Jose',
    seoDescription:
      "If you're planning a trip to Puerto Viejo, Costa Rica, you may be wondering how to get there using public transportation. Fortunately, there are several options available that can take you to this beautiful Caribbean town in Talamanca.",
    heading: 'How to get to Puerto Viejo from San Jose',
    paragraphsBeforeStay: [
      "If you're planning a trip to Puerto Viejo, Costa Rica, you may be wondering how to get there using public transportation. Fortunately, there are several options available that can take you to this beautiful Caribbean town in Talamanca.",
      <>One of the most popular ways to get to Puerto Viejo is by bus. The primary bus company that services the route from San José to Puerto Viejo is <a href="https://www.mepecr.com/HorarioS_S.html" target="_blank" rel="noopener noreferrer">MEPE</a>. The bus station is located in the center of San José, exactly on 9th avenue and 12th street, making it easy to find.</>,
      <b><i>The <a href="https://www.mepecr.com/HorarioS_S.html" target="_blank" rel="noopener noreferrer">bus schedule</a> to Puerto Viejo is as follows: 6am, 8am, 10am, 2pm, and the last one at 4pm.</i></b>,
      'While you cannot reserve tickets in advance, it\'s always a good idea to arrive at the bus station early to secure your spot on the bus. Keep in mind that during peak travel seasons, such as holidays and weekends, the buses can get crowded quickly, so plan accordingly.',
    ],
    stayRecommendationTitle: 'Where to stay when traveling to Puerto Viejo?',
    paragraphsBetween: [
      'The bus has many stops, and will also stop at the bus station in limón, Cahuita and finally, Puerto Viejo.',
      "If you're looking to save some money on transportation costs, the cheapest option is to take the public bus. These buses are clean, reliable, and offer an affordable way to get to Puerto Viejo. While they may not be as luxurious as some of the private shuttle services, they will get you to your destination safely and on time.",
      "With regular bus schedules from San José and other nearby towns, it's easy to plan your trip and enjoy all that Puerto Viejo has to offer.",
      <b><i>Another option to get to Puerto Viejo from San Jose is to take the bus from <a href="https://maps.app.goo.gl/a5kV7YvzybHjVae28" target="_blank" rel="noopener noreferrer">Caribeños</a>, which goes directly to Limón. From there, you can transfer to a bus that goes to Puerto Viejo.</i></b>,
      <>The bus schedule from San Jose to Limón leaves from the <a href="https://maps.app.goo.gl/a5kV7YvzybHjVae28" target="_blank" rel="noopener noreferrer">Caribeños stop</a> located in Calle Central, Cinco Esquinas. Buses leave every hour from 6am until 7pm, so it's easy to plan your trip accordingly. Once you arrive in Limón, you can walk to the <a href="https://maps.app.goo.gl/WV4CmLqzco2Eft7y9" target="_blank" rel="noopener noreferrer">Mepe</a> Bus stop, which is located near the central market, and take a bus that leaves every hour to Puerto Viejo.</>,
      "However, it's important to note that the journey from San Jose to Limón can take around 3 to 4 hours, depending on traffic and road conditions. So, it's crucial to plan ahead to avoid being stuck in Limón overnight. Also, the last bus from Limón to Puerto Viejo leaves at 8pm, so make sure to arrive in Limón with enough time to make the transfer.",
      <>Another way to get to Puerto Viejo is by using <a href="mailto:reservas.kalawala@gmail.com?subject=Organise private transportation&body= " target="_blank" rel="noopener noreferrer">private transportation</a>. This option can be shared with other travelers or private for you and your companions, making it a convenient and comfortable way to travel to your destination.</>,
      'With private transportation, you can be picked up from wherever you prefer and be dropped off directly at your accommodation in Puerto Viejo. This option can be especially helpful for those who have heavy luggage, prefer more privacy, or have specific travel needs.',
      'Depending on the number of travelers, private transportation can be a more cost-effective option compared to taking a shared shuttle.',
      'Additionally, it offers the flexibility to set your own schedule and stop along the way to enjoy some of the beautiful sights along the route.',
      "If you're interested in booking private transportation to Puerto Viejo, there are several reputable companies that offer this service. It's always a good idea to research your options and compare prices to find the best deal.",
      'We also offer this service and can provide you with the routes and prices to help you make the most informed decision for your travels.',
      "Overall, whether you prefer the convenience of public transportation or the comfort of private transportation, there are several ways to get to Puerto Viejo. Regardless of your choice, you're sure to enjoy the stunning scenery and vibrant culture of this beautiful Caribbean town in Talamanca, Costa Rica.",
    ],
  },
  es: {
    seoTitle: 'Como llegar a Puerto Viejo desde San Jose',
    seoDescription:
      'Si estás planeando un viaje a Puerto Viejo, Costa Rica, es posible que te preguntes cómo llegar allí usando transporte público. Afortunadamente, hay varias opciones disponibles que pueden llevarte a este hermoso pueblo caribeño en Talamanca.',
    heading: 'Cómo llegar a Puerto Viejo desde San José',
    paragraphsBeforeStay: [
      'Si estás planeando un viaje a Puerto Viejo, Costa Rica, es posible que te preguntes cómo llegar allí usando transporte público. Afortunadamente, hay varias opciones disponibles que pueden llevarte a este hermoso pueblo caribeño en Talamanca.',
      <>Una de las formas más populares de llegar a Puerto Viejo es en bús público. La principal compañía de autobuses que ofrece la ruta desde San José a Puerto Viejo es <a href="https://www.mepecr.com/HorarioS_S.html" target="_blank" rel="noopener noreferrer">MEPE</a>. La estación de autobuses está ubicada en el centro de San José, exactamente en la avenida 9 y calle 12, por lo que es fácil de encontrar.</>,
      <b><i>El <a href="https://www.mepecr.com/HorarioS_S.html" target="_blank" rel="noopener noreferrer">horario de autobuses</a> a Puerto Viejo es el siguiente: 6am, 8am, 10am, 2pm y el último a las 4pm.</i></b>,
      'Si bien no es posible reservar boletos con anticipación, siempre es una buena idea llegar temprano a la estación de autobuses para asegurar tu lugar en el autobús. Ten en cuenta que durante los periodos de temporada alta, como vacaciones y fines de semana, los autobuses pueden llenarse rápidamente, así que planifica con anticipación.',
    ],
    stayRecommendationTitle: '¿Dónde hospedarte cuando viajes a Puerto Viejo?',
    paragraphsBetween: [
      'El autobús tiene muchas paradas y también se detendrá en la estación de autobuses de Limón, Cahuita y finalmente, Puerto Viejo.',
      'Si estás buscando ahorrar algo de dinero en costos de transporte, la opción más económica es tomar el autobús público. Estos autobuses son limpios, confiables y ofrecen una forma asequible de llegar a Puerto Viejo. Aunque no sean tan lujosos como algunos de los servicios de transporte privado, te llevarán a tu destino de manera segura y a tiempo.',
      'Con horarios de autobuses regulares desde San José y otras ciudades cercanas, es fácil planificar tu viaje y disfrutar de todo lo que Puerto Viejo tiene para ofrecer.',
      // The pre-merge Spanish page merged this paragraph and the next into one
      // ungrammatical sentence ("Una otra opción ... desde San José ubicada en
      // Calle Central..." — missing its verb entirely). Retranslated as two
      // paragraphs to match the English structure.
      <b><i>Otra opción para llegar a Puerto Viejo desde San José es tomar el autobús desde <a href="https://maps.app.goo.gl/a5kV7YvzybHjVae28" target="_blank" rel="noopener noreferrer">Caribeños</a>, que va directamente a Limón. Desde allí, puedes hacer transbordo a un autobús que va a Puerto Viejo.</i></b>,
      <>El horario de autobuses desde San José a Limón sale desde la <a href="https://maps.app.goo.gl/a5kV7YvzybHjVae28" target="_blank" rel="noopener noreferrer">parada de Caribeños</a> ubicada en Calle Central, Cinco Esquinas. Los autobuses salen cada hora desde las 6am hasta las 7pm, por lo que es fácil planificar tu viaje con antelación. Una vez que llegues a Limón, puedes caminar hasta la parada de autobús de <a href="https://maps.app.goo.gl/WV4CmLqzco2Eft7y9" target="_blank" rel="noopener noreferrer">Mepe</a>, que está cerca del mercado central, y tomar un autobús que sale cada hora hacia Puerto Viejo.</>,
      'Sin embargo, es importante tener en cuenta que el viaje desde San José a Limón puede durar entre 3 y 4 horas, dependiendo del tráfico y las condiciones de la carretera. Por lo tanto, es crucial planificar con anticipación para evitar quedarte atrapado en Limón durante la noche. Además, el último autobús de Limón a Puerto Viejo sale a las 8pm, así que asegúrate de llegar a Limón con tiempo suficiente para hacer la transferencia.',
      <>Otra forma de llegar a Puerto Viejo es utilizando <a href="mailto:reservas.kalawala@gmail.com?subject=Organise private transportation&body= " target="_blank" rel="noopener noreferrer">transporte privado</a>. Esta opción se puede compartir con otros viajeros o ser privada para ti y tus acompañantes, lo que la convierte en una forma conveniente y cómoda de viajar a tu destino.</>,
      'Con el transporte privado, puedes ser recogido en el lugar que prefieras y ser dejado directamente en tu alojamiento en Puerto Viejo. Esta opción puede ser especialmente útil para aquellos que tienen equipaje pesado, prefieren más privacidad o tienen necesidades de viaje específicas.',
      'Dependiendo del número de viajeros, el transporte privado puede ser una opción más rentable en comparación con tomar un servicio de transporte compartido.',
      'Además, ofrece la flexibilidad de establecer tu propio horario y hacer paradas en el camino para disfrutar de algunas de las hermosas vistas a lo largo de la ruta.',
      'Si estás interesado en reservar transporte privado a Puerto Viejo, hay varias empresas de buena reputación que ofrecen este servicio. Siempre es una buena idea investigar tus opciones y comparar precios para encontrar la mejor oferta.',
      'También ofrecemos este servicio y podemos proporcionarte las rutas y precios para ayudarte a tomar la decisión más informada para tu viaje.',
      'En general, ya sea que prefieras la conveniencia del transporte público o la comodidad del transporte privado, hay varias formas de llegar a Puerto Viejo. Independientemente de tu elección, seguro disfrutarás de los impresionantes paisajes y la vibrante cultura de este hermoso pueblo caribeño en Talamanca, Costa Rica.',
    ],
  },
  fr: {
    seoTitle: 'Comment se rendre à Puerto Viejo depuis San José',
    seoDescription:
      "Si vous prévoyez un voyage à Puerto Viejo, au Costa Rica, vous vous demandez peut-être comment vous y rendre en transport public. Heureusement, plusieurs options s'offrent à vous pour rejoindre cette magnifique ville caribéenne de Talamanca.",
    heading: 'Comment se rendre à Puerto Viejo depuis San José',
    paragraphsBeforeStay: [
      "Si vous prévoyez un voyage à Puerto Viejo, au Costa Rica, vous vous demandez peut-être comment vous y rendre en transport public. Heureusement, plusieurs options s'offrent à vous pour rejoindre cette magnifique ville caribéenne de Talamanca.",
      <>L'un des moyens les plus populaires pour se rendre à Puerto Viejo est le bus. La principale compagnie qui dessert la ligne San José–Puerto Viejo est <a href="https://www.mepecr.com/HorarioS_S.html" target="_blank" rel="noopener noreferrer">MEPE</a>. La gare routière est située au centre de San José, exactement à l'angle de la 9e avenue et de la 12e rue, ce qui la rend facile à trouver.</>,
      <b><i>L'<a href="https://www.mepecr.com/HorarioS_S.html" target="_blank" rel="noopener noreferrer">horaire des bus</a> vers Puerto Viejo est le suivant : 6h, 8h, 10h, 14h, et le dernier à 16h.</i></b>,
      "Bien qu'il ne soit pas possible de réserver de billets à l'avance, il est toujours conseillé d'arriver tôt à la gare routière pour vous assurer une place dans le bus. Gardez à l'esprit qu'en haute saison touristique, comme pendant les vacances et les week-ends, les bus peuvent se remplir rapidement, alors planifiez en conséquence.",
    ],
    stayRecommendationTitle: "Où loger lorsqu'on voyage vers Puerto Viejo ?",
    paragraphsBetween: [
      "Le bus effectue de nombreux arrêts et s'arrêtera également à la gare routière de Limón, à Cahuita, puis enfin à Puerto Viejo.",
      "Si vous cherchez à économiser sur les frais de transport, l'option la moins chère est de prendre le bus public. Ces bus sont propres, fiables et offrent un moyen abordable de se rendre à Puerto Viejo. Bien qu'ils ne soient pas aussi luxueux que certains services de navette privée, ils vous conduiront à destination en toute sécurité et à l'heure.",
      "Avec des horaires de bus réguliers depuis San José et d'autres villes voisines, il est facile de planifier votre voyage et de profiter de tout ce que Puerto Viejo a à offrir.",
      <b><i>Une autre option pour se rendre à Puerto Viejo depuis San José est de prendre le bus <a href="https://maps.app.goo.gl/a5kV7YvzybHjVae28" target="_blank" rel="noopener noreferrer">Caribeños</a>, qui va directement à Limón. De là, vous pouvez prendre une correspondance vers un bus qui va à Puerto Viejo.</i></b>,
      <>L'horaire des bus de San José à Limón part de l'<a href="https://maps.app.goo.gl/a5kV7YvzybHjVae28" target="_blank" rel="noopener noreferrer">arrêt Caribeños</a> situé Calle Central, Cinco Esquinas. Les bus partent toutes les heures de 6h à 19h, ce qui permet de planifier facilement votre voyage. Une fois arrivé à Limón, vous pouvez marcher jusqu'à l'arrêt de bus <a href="https://maps.app.goo.gl/WV4CmLqzco2Eft7y9" target="_blank" rel="noopener noreferrer">Mepe</a>, situé près du marché central, et prendre un bus qui part toutes les heures vers Puerto Viejo.</>,
      "Cependant, il est important de noter que le trajet de San José à Limón peut prendre entre 3 et 4 heures, selon le trafic et l'état des routes. Il est donc essentiel de planifier à l'avance pour éviter de rester bloqué à Limón pour la nuit. De plus, le dernier bus de Limón à Puerto Viejo part à 20h, alors assurez-vous d'arriver à Limón avec suffisamment de temps pour faire la correspondance.",
      <>Une autre façon de se rendre à Puerto Viejo est d'utiliser un <a href="mailto:reservas.kalawala@gmail.com?subject=Organise private transportation&body= " target="_blank" rel="noopener noreferrer">transport privé</a>. Cette option peut être partagée avec d'autres voyageurs ou privée pour vous et vos compagnons, ce qui en fait un moyen pratique et confortable de rejoindre votre destination.</>,
      "Avec le transport privé, vous pouvez être pris en charge où vous le souhaitez et déposé directement à votre hébergement à Puerto Viejo. Cette option peut être particulièrement utile pour ceux qui ont des bagages lourds, préfèrent plus d'intimité ou ont des besoins de voyage spécifiques.",
      "Selon le nombre de voyageurs, le transport privé peut être une option plus économique par rapport à une navette partagée.",
      "De plus, il offre la flexibilité de fixer votre propre horaire et de vous arrêter en chemin pour profiter de certains des magnifiques paysages tout au long du trajet.",
      "Si vous souhaitez réserver un transport privé vers Puerto Viejo, plusieurs entreprises de bonne réputation proposent ce service. Il est toujours conseillé de comparer vos options et les prix pour trouver la meilleure offre.",
      "Nous proposons également ce service et pouvons vous fournir les itinéraires et les tarifs pour vous aider à prendre la décision la plus éclairée pour votre voyage.",
      "En somme, que vous préfériez la commodité du transport public ou le confort du transport privé, il existe plusieurs façons de se rendre à Puerto Viejo. Quel que soit votre choix, vous apprécierez à coup sûr les paysages magnifiques et la culture vibrante de cette superbe ville caribéenne de Talamanca, au Costa Rica.",
    ],
  },
  he: {
    seoTitle: 'כיצד להגיע לפוארטו ויחו מסן חוזה',
    seoDescription:
      "אם אתם מתכננים טיול לפוארטו ויחו, קוסטה ריקה, ייתכן שאתם תוהים כיצד להגיע לשם באמצעות תחבורה ציבורית. למרבה המזל, ישנן מספר אפשרויות זמינות שיכולות לקחת אתכם לעיירה הקריבית היפה הזו בטלמנקה.",
    heading: 'כיצד להגיע לפוארטו ויחו מסן חוזה',
    paragraphsBeforeStay: [
      "אם אתם מתכננים טיול לפוארטו ויחו, קוסטה ריקה, ייתכן שאתם תוהים כיצד להגיע לשם באמצעות תחבורה ציבורית. למרבה המזל, ישנן מספר אפשרויות זמינות שיכולות לקחת אתכם לעיירה הקריבית היפה הזו בטלמנקה.",
      <>אחת הדרכים הפופולריות ביותר להגיע לפוארטו ויחו היא באוטובוס. חברת האוטובוסים העיקרית המפעילה את המסלול מסן חוזה לפוארטו ויחו היא <a href="https://www.mepecr.com/HorarioS_S.html" target="_blank" rel="noopener noreferrer">MEPE</a>. תחנת האוטובוס ממוקמת במרכז סן חוזה, בדיוק בשדרה 9 ורחוב 12, כך שקל למצוא אותה.</>,
      <b><i><a href="https://www.mepecr.com/HorarioS_S.html" target="_blank" rel="noopener noreferrer">לוח הזמנים של האוטובוס</a> לפוארטו ויחו הוא כדלקמן: 6 בבוקר, 8 בבוקר, 10 בבוקר, 2 אחר הצהריים, והאחרון ב-4 אחר הצהריים.</i></b>,
      'אמנם אי אפשר להזמין כרטיסים מראש, אך תמיד כדאי להגיע לתחנת האוטובוס מוקדם כדי להבטיח את מקומכם באוטובוס. זכרו שבעונות השיא, כמו חגים וסופי שבוע, האוטובוסים עלולים להתמלא במהירות, אז תכננו בהתאם.',
    ],
    stayRecommendationTitle: 'היכן להתארח בנסיעה לפוארטו ויחו?',
    paragraphsBetween: [
      'לאוטובוס יש תחנות רבות, והוא גם יעצור בתחנת האוטובוס בלימון, בקאוויטה, ולבסוף בפוארטו ויחו.',
      "אם אתם מחפשים לחסוך קצת כסף בעלויות התחבורה, האפשרות הזולה ביותר היא לקחת את האוטובוס הציבורי. האוטובוסים האלה נקיים, אמינים, ומציעים דרך משתלמת להגיע לפוארטו ויחו. למרות שהם אולי לא מפוארים כמו חלק משירותי ההסעה הפרטיים, הם יביאו אתכם ליעדכם בבטחה ובזמן.",
      "עם לוחות זמנים סדירים של אוטובוסים מסן חוזה ומעיירות סמוכות אחרות, קל לתכנן את הטיול שלכם וליהנות מכל מה שלפוארטו ויחו יש להציע.",
      <b><i>אפשרות נוספת להגיע לפוארטו ויחו מסן חוזה היא לקחת את האוטובוס של <a href="https://maps.app.goo.gl/a5kV7YvzybHjVae28" target="_blank" rel="noopener noreferrer">Caribeños</a>, שנוסע ישירות ללימון. משם, תוכלו לעבור לאוטובוס שנוסע לפוארטו ויחו.</i></b>,
      <>לוח הזמנים של האוטובוס מסן חוזה ללימון יוצא מ<a href="https://maps.app.goo.gl/a5kV7YvzybHjVae28" target="_blank" rel="noopener noreferrer">תחנת Caribeños</a> הממוקמת בקאיה סנטרל, סינקו אסקינאס. אוטובוסים יוצאים כל שעה מ-6 בבוקר עד 7 בערב, כך שקל לתכנן את הטיול שלכם בהתאם. ברגע שתגיעו ללימון, תוכלו ללכת ברגל לתחנת האוטובוס של <a href="https://maps.app.goo.gl/WV4CmLqzco2Eft7y9" target="_blank" rel="noopener noreferrer">Mepe</a>, הממוקמת ליד השוק המרכזי, ולעלות על אוטובוס שיוצא כל שעה לפוארטו ויחו.</>,
      "עם זאת, חשוב לציין שהמסע מסן חוזה ללימון יכול לארוך כ-3 עד 4 שעות, בהתאם לתנועה ולתנאי הכביש. לכן, חשוב לתכנן מראש כדי להימנע מלהיתקע בלימון בן לילה. כמו כן, האוטובוס האחרון מלימון לפוארטו ויחו יוצא ב-8 בערב, אז ודאו שאתם מגיעים ללימון עם מספיק זמן לבצע את המעבר.",
      <>דרך נוספת להגיע לפוארטו ויחו היא באמצעות <a href="mailto:reservas.kalawala@gmail.com?subject=Organise private transportation&body= " target="_blank" rel="noopener noreferrer">הסעה פרטית</a>. אפשרות זו יכולה להיות משותפת עם נוסעים אחרים או פרטית עבורכם ועבור בני לוויתכם, מה שהופך אותה לדרך נוחה ונעימה להגיע ליעדכם.</>,
      'עם הסעה פרטית, תוכלו להיאסף מכל מקום שתעדיפו ולהיות מוסעים ישירות למקום האירוח שלכם בפוארטו ויחו. אפשרות זו יכולה להיות מועילה במיוחד למי שיש לו מטען כבד, מעדיף פרטיות רבה יותר, או שיש לו צרכי נסיעה מיוחדים.',
      'בהתאם למספר הנוסעים, הסעה פרטית יכולה להיות אפשרות משתלמת יותר בהשוואה לקחת הסעה משותפת.',
      'בנוסף, היא מציעה את הגמישות לקבוע לוח זמנים משלכם ולעצור בדרך כדי ליהנות מכמה מהנופים היפים לאורך המסלול.',
      "אם אתם מעוניינים להזמין הסעה פרטית לפוארטו ויחו, ישנן מספר חברות בעלות מוניטין טוב שמציעות שירות זה. תמיד כדאי לבדוק את האפשרויות שלכם ולהשוות מחירים כדי למצוא את העסקה הטובה ביותר.",
      'אנחנו גם מציעים שירות זה ויכולים לספק לכם את המסלולים והמחירים כדי לעזור לכם לקבל את ההחלטה המושכלת ביותר לנסיעותיכם.',
      "בסך הכול, בין אם אתם מעדיפים את הנוחות של תחבורה ציבורית או את הנעימות של הסעה פרטית, ישנן מספר דרכים להגיע לפוארטו ויחו. ללא קשר לבחירתכם, בהחלט תיהנו מהנוף המדהים ומהתרבות התוססת של העיירה הקריבית היפה הזו בטלמנקה, קוסטה ריקה.",
    ],
  },
  it: {
    seoTitle: 'Come Arrivare a Puerto Viejo da San José',
    seoDescription:
      "Se stai pianificando un viaggio a Puerto Viejo, Costa Rica, potresti chiederti come arrivarci utilizzando i mezzi pubblici. Fortunatamente, ci sono diverse opzioni disponibili che possono portarti in questo splendido paese caraibico di Talamanca.",
    heading: 'Come Arrivare a Puerto Viejo da San José',
    paragraphsBeforeStay: [
      "Se stai pianificando un viaggio a Puerto Viejo, Costa Rica, potresti chiederti come arrivarci utilizzando i mezzi pubblici. Fortunatamente, ci sono diverse opzioni disponibili che possono portarti in questo splendido paese caraibico di Talamanca.",
      <>Uno dei modi più diffusi per arrivare a Puerto Viejo è l'autobus. La principale compagnia di autobus che copre la tratta da San José a Puerto Viejo è <a href="https://www.mepecr.com/HorarioS_S.html" target="_blank" rel="noopener noreferrer">MEPE</a>. La stazione degli autobus si trova nel centro di San José, esattamente tra la nona avenida e la dodicesima calle, quindi è facile da trovare.</>,
      <b><i>L'<a href="https://www.mepecr.com/HorarioS_S.html" target="_blank" rel="noopener noreferrer">orario degli autobus</a> per Puerto Viejo è il seguente: 6:00, 8:00, 10:00, 14:00 e l'ultimo alle 16:00.</i></b>,
      "Anche se non è possibile prenotare i biglietti in anticipo, è sempre consigliabile arrivare presto alla stazione degli autobus per assicurarti un posto. Tieni presente che durante i periodi di alta stagione, come le vacanze e i fine settimana, gli autobus possono riempirsi rapidamente, quindi pianifica di conseguenza.",
    ],
    stayRecommendationTitle: 'Dove alloggiare quando si viaggia verso Puerto Viejo?',
    paragraphsBetween: [
      "L'autobus ha molte fermate e si ferma anche alla stazione di Limón, a Cahuita e infine a Puerto Viejo.",
      "Se vuoi risparmiare sui costi di trasporto, l'opzione più economica è prendere l'autobus pubblico. Questi autobus sono puliti, affidabili e offrono un modo conveniente per arrivare a Puerto Viejo. Anche se non sono lussuosi come alcuni servizi di navetta privata, ti porteranno a destinazione in sicurezza e in orario.",
      "Grazie agli orari regolari degli autobus da San José e da altre città vicine, è facile pianificare il tuo viaggio e goderti tutto ciò che Puerto Viejo ha da offrire.",
      <b><i>Un'altra opzione per arrivare a Puerto Viejo da San José è prendere l'autobus di <a href="https://maps.app.goo.gl/a5kV7YvzybHjVae28" target="_blank" rel="noopener noreferrer">Caribeños</a>, che va direttamente a Limón. Da lì, puoi cambiare autobus per uno diretto a Puerto Viejo.</i></b>,
      <>Gli autobus da San José a Limón partono dalla <a href="https://maps.app.goo.gl/a5kV7YvzybHjVae28" target="_blank" rel="noopener noreferrer">fermata di Caribeños</a> situata in Calle Central, Cinco Esquinas. Gli autobus partono ogni ora dalle 6:00 alle 19:00, quindi è facile pianificare il tuo viaggio di conseguenza. Una volta arrivato a Limón, puoi camminare fino alla fermata degli autobus <a href="https://maps.app.goo.gl/WV4CmLqzco2Eft7y9" target="_blank" rel="noopener noreferrer">Mepe</a>, situata vicino al mercato centrale, e prendere un autobus che parte ogni ora verso Puerto Viejo.</>,
      "Tuttavia, è importante notare che il viaggio da San José a Limón può richiedere dalle 3 alle 4 ore, a seconda del traffico e delle condizioni stradali. Per questo è fondamentale pianificare con anticipo per evitare di rimanere bloccato a Limón per la notte. Inoltre, l'ultimo autobus da Limón a Puerto Viejo parte alle 20:00, quindi assicurati di arrivare a Limón con abbastanza tempo per effettuare il cambio.",
      <>Un altro modo per arrivare a Puerto Viejo è utilizzare un <a href="mailto:reservas.kalawala@gmail.com?subject=Organise private transportation&body= " target="_blank" rel="noopener noreferrer">trasporto privato</a>. Questa opzione può essere condivisa con altri viaggiatori oppure essere privata per te e i tuoi accompagnatori, rendendola un modo comodo e confortevole per raggiungere la tua destinazione.</>,
      "Con il trasporto privato, puoi essere prelevato dal luogo che preferisci e portato direttamente al tuo alloggio a Puerto Viejo. Questa opzione può essere particolarmente utile per chi ha bagagli pesanti, preferisce più privacy o ha esigenze di viaggio specifiche.",
      "A seconda del numero di viaggiatori, il trasporto privato può essere un'opzione più conveniente rispetto a una navetta condivisa.",
      "Inoltre, offre la flessibilità di stabilire il proprio orario e di fermarsi lungo il tragitto per godersi alcuni dei bellissimi paesaggi del percorso.",
      "Se sei interessato a prenotare un trasporto privato verso Puerto Viejo, ci sono diverse aziende affidabili che offrono questo servizio. È sempre una buona idea informarsi sulle opzioni disponibili e confrontare i prezzi per trovare l'offerta migliore.",
      "Offriamo anche noi questo servizio e possiamo fornirti percorsi e prezzi per aiutarti a prendere la decisione più informata per il tuo viaggio.",
      "In definitiva, sia che tu preferisca la comodità del trasporto pubblico sia il comfort del trasporto privato, ci sono diversi modi per arrivare a Puerto Viejo. Qualunque sia la tua scelta, potrai sicuramente goderti gli splendidi paesaggi e la vivace cultura di questo bellissimo paese caraibico di Talamanca, Costa Rica.",
    ],
  },
  pt: {
    seoTitle: 'Como chegar a Puerto Viejo a partir de San José',
    seoDescription:
      "Se está a planear uma viagem a Puerto Viejo, Costa Rica, pode estar a perguntar-se como chegar lá utilizando transporte público. Felizmente, existem várias opções disponíveis que o podem levar até esta bela vila caribenha em Talamanca.",
    heading: 'Como chegar a Puerto Viejo a partir de San José',
    paragraphsBeforeStay: [
      "Se está a planear uma viagem a Puerto Viejo, Costa Rica, pode estar a perguntar-se como chegar lá utilizando transporte público. Felizmente, existem várias opções disponíveis que o podem levar até esta bela vila caribenha em Talamanca.",
      <>Uma das formas mais populares de chegar a Puerto Viejo é de autocarro. A principal empresa de autocarros que serve a rota entre San José e Puerto Viejo é a <a href="https://www.mepecr.com/HorarioS_S.html" target="_blank" rel="noopener noreferrer">MEPE</a>. A estação de autocarros situa-se no centro de San José, exatamente na avenida 9 com a rua 12, sendo fácil de encontrar.</>,
      <b><i>O <a href="https://www.mepecr.com/HorarioS_S.html" target="_blank" rel="noopener noreferrer">horário de autocarros</a> para Puerto Viejo é o seguinte: 6h, 8h, 10h, 14h e o último às 16h.</i></b>,
      'Embora não seja possível reservar bilhetes com antecedência, é sempre boa ideia chegar cedo à estação de autocarros para garantir o seu lugar. Tenha em conta que, durante as épocas de maior procura, como feriados e fins de semana, os autocarros podem encher-se rapidamente, por isso planeie em conformidade.',
    ],
    stayRecommendationTitle: 'Onde ficar hospedado ao viajar para Puerto Viejo?',
    paragraphsBetween: [
      'O autocarro faz muitas paragens e também para na estação de autocarros de Limón, Cahuita e, por fim, Puerto Viejo.',
      "Se procura poupar algum dinheiro nos custos de transporte, a opção mais económica é apanhar o autocarro público. Estes autocarros são limpos, fiáveis e oferecem uma forma acessível de chegar a Puerto Viejo. Embora não sejam tão luxuosos como alguns dos serviços de transporte privado, levá-lo-ão ao seu destino em segurança e a horas.",
      "Com horários de autocarro regulares a partir de San José e de outras vilas próximas, é fácil planear a sua viagem e desfrutar de tudo o que Puerto Viejo tem para oferecer.",
      <b><i>Outra opção para chegar a Puerto Viejo a partir de San José é apanhar o autocarro da <a href="https://maps.app.goo.gl/a5kV7YvzybHjVae28" target="_blank" rel="noopener noreferrer">Caribeños</a>, que vai diretamente para Limón. A partir daí, pode fazer transbordo para um autocarro que vai para Puerto Viejo.</i></b>,
      <>O horário de autocarros de San José para Limón parte da <a href="https://maps.app.goo.gl/a5kV7YvzybHjVae28" target="_blank" rel="noopener noreferrer">paragem da Caribeños</a>, situada na Calle Central, Cinco Esquinas. Os autocarros partem de hora a hora, das 6h às 19h, por isso é fácil planear a sua viagem em conformidade. Assim que chegar a Limón, pode caminhar até à paragem de autocarro da <a href="https://maps.app.goo.gl/WV4CmLqzco2Eft7y9" target="_blank" rel="noopener noreferrer">Mepe</a>, situada perto do mercado central, e apanhar um autocarro que parte de hora a hora para Puerto Viejo.</>,
      "No entanto, é importante notar que a viagem de San José a Limón pode demorar entre 3 a 4 horas, dependendo do trânsito e das condições da estrada. Por isso, é fundamental planear com antecedência para evitar ficar preso em Limón durante a noite. Além disso, o último autocarro de Limón para Puerto Viejo parte às 20h, por isso certifique-se de que chega a Limón com tempo suficiente para fazer a ligação.",
      <>Outra forma de chegar a Puerto Viejo é utilizando <a href="mailto:reservas.kalawala@gmail.com?subject=Organise private transportation&body= " target="_blank" rel="noopener noreferrer">transporte privado</a>. Esta opção pode ser partilhada com outros viajantes ou privada para si e para os seus acompanhantes, tornando-a numa forma conveniente e confortável de viajar até ao seu destino.</>,
      "Com o transporte privado, pode ser recolhido onde preferir e deixado diretamente no seu alojamento em Puerto Viejo. Esta opção pode ser especialmente útil para quem tem bagagem pesada, prefere mais privacidade ou tem necessidades de viagem específicas.",
      "Dependendo do número de viajantes, o transporte privado pode ser uma opção mais económica em comparação com um shuttle partilhado.",
      "Além disso, oferece a flexibilidade de definir o seu próprio horário e parar pelo caminho para desfrutar de algumas das belas paisagens ao longo da rota.",
      "Se estiver interessado em reservar transporte privado para Puerto Viejo, existem várias empresas de boa reputação que oferecem este serviço. É sempre boa ideia pesquisar as suas opções e comparar preços para encontrar a melhor oferta.",
      "Também oferecemos este serviço e podemos fornecer-lhe as rotas e os preços para o ajudar a tomar a decisão mais informada para a sua viagem.",
      "Em suma, quer prefira a conveniência do transporte público ou o conforto do transporte privado, existem várias formas de chegar a Puerto Viejo. Seja qual for a sua escolha, vai certamente desfrutar da paisagem deslumbrante e da cultura vibrante desta bela vila caribenha em Talamanca, Costa Rica.",
    ],
  },
  hi: {
    seoTitle: 'सान होज़े से प्वेर्तो वियेहो कैसे पहुंचें',
    seoDescription:
      "यदि आप कोस्टा रिका के प्वेर्तो वियेहो की यात्रा की योजना बना रहे हैं, तो आप सोच रहे होंगे कि सार्वजनिक परिवहन का उपयोग करके वहां कैसे पहुंचा जाए। सौभाग्य से, कई विकल्प उपलब्ध हैं जो आपको तालामांका के इस खूबसूरत कैरिबियन कस्बे तक पहुंचा सकते हैं।",
    heading: 'सान होज़े से प्वेर्तो वियेहो कैसे पहुंचें',
    paragraphsBeforeStay: [
      "यदि आप कोस्टा रिका के प्वेर्तो वियेहो की यात्रा की योजना बना रहे हैं, तो आप सोच रहे होंगे कि सार्वजनिक परिवहन का उपयोग करके वहां कैसे पहुंचा जाए। सौभाग्य से, कई विकल्प उपलब्ध हैं जो आपको तालामांका के इस खूबसूरत कैरिबियन कस्बे तक पहुंचा सकते हैं।",
      <>प्वेर्तो वियेहो पहुंचने के सबसे लोकप्रिय तरीकों में से एक है बस। सान होज़े से प्वेर्तो वियेहो के मार्ग पर सेवा देने वाली मुख्य बस कंपनी <a href="https://www.mepecr.com/HorarioS_S.html" target="_blank" rel="noopener noreferrer">MEPE</a> है। बस स्टेशन सान होज़े के केंद्र में, ठीक 9वीं एवेन्यू और 12वीं स्ट्रीट पर स्थित है, जिससे इसे ढूंढना आसान हो जाता है।</>,
      <b><i>प्वेर्तो वियेहो के लिए <a href="https://www.mepecr.com/HorarioS_S.html" target="_blank" rel="noopener noreferrer">बस का समय</a> इस प्रकार है: सुबह 6 बजे, सुबह 8 बजे, सुबह 10 बजे, दोपहर 2 बजे, और आखिरी बस शाम 4 बजे।</i></b>,
      'हालांकि आप पहले से टिकट आरक्षित नहीं कर सकते, फिर भी अपनी सीट पक्की करने के लिए बस स्टेशन जल्दी पहुंचना हमेशा एक अच्छा विचार है। ध्यान रखें कि छुट्टियों और सप्ताहांत जैसे व्यस्त यात्रा मौसम के दौरान, बसें जल्दी भर सकती हैं, इसलिए उसी के अनुसार योजना बनाएं।',
    ],
    stayRecommendationTitle: 'प्वेर्तो वियेहो की यात्रा करते समय कहां ठहरें?',
    paragraphsBetween: [
      'बस के कई पड़ाव हैं, और यह लिमोन, काहुइटा के बस स्टेशन पर भी रुकेगी, और अंत में, प्वेर्तो वियेहो में।',
      "यदि आप परिवहन खर्च पर कुछ पैसे बचाना चाहते हैं, तो सबसे सस्ता विकल्प है सार्वजनिक बस लेना। ये बसें साफ-सुथरी, भरोसेमंद हैं, और प्वेर्तो वियेहो पहुंचने का एक किफ़ायती तरीका प्रदान करती हैं। भले ही ये कुछ निजी शटल सेवाओं जितनी शानदार न हों, लेकिन ये आपको सुरक्षित और समय पर आपकी मंज़िल तक पहुंचा देंगी।",
      "सान होज़े और अन्य आस-पास के कस्बों से नियमित बस समय-सारणी के साथ, अपनी यात्रा की योजना बनाना और प्वेर्तो वियेहो में उपलब्ध हर चीज़ का आनंद लेना आसान है।",
      <b><i>सान होज़े से प्वेर्तो वियेहो पहुंचने का एक और तरीका है <a href="https://maps.app.goo.gl/a5kV7YvzybHjVae28" target="_blank" rel="noopener noreferrer">Caribeños</a> से बस लेना, जो सीधे लिमोन जाती है। वहां से, आप प्वेर्तो वियेहो जाने वाली बस में बदल सकते हैं।</i></b>,
      <>सान होज़े से लिमोन जाने वाली बस <a href="https://maps.app.goo.gl/a5kV7YvzybHjVae28" target="_blank" rel="noopener noreferrer">Caribeños स्टॉप</a> से निकलती है, जो कैले सेंट्रल, सिंको एस्किनास में स्थित है। बसें सुबह 6 बजे से शाम 7 बजे तक हर घंटे निकलती हैं, इसलिए अपनी यात्रा की योजना बनाना आसान है। एक बार जब आप लिमोन पहुंच जाएं, तो आप पैदल चलकर <a href="https://maps.app.goo.gl/WV4CmLqzco2Eft7y9" target="_blank" rel="noopener noreferrer">Mepe</a> बस स्टॉप तक जा सकते हैं, जो केंद्रीय बाज़ार के पास स्थित है, और वहां से प्वेर्तो वियेहो के लिए हर घंटे निकलने वाली बस ले सकते हैं।</>,
      "हालांकि, यह ध्यान रखना ज़रूरी है कि सान होज़े से लिमोन तक की यात्रा में ट्रैफिक और सड़क की स्थिति के आधार पर लगभग 3 से 4 घंटे लग सकते हैं। इसलिए, लिमोन में रातभर फंसने से बचने के लिए पहले से योजना बनाना बहुत ज़रूरी है। साथ ही, लिमोन से प्वेर्तो वियेहो जाने वाली आखिरी बस रात 8 बजे निकलती है, इसलिए सुनिश्चित करें कि आप स्थानांतरण के लिए पर्याप्त समय के साथ लिमोन पहुंचें।",
      <>प्वेर्तो वियेहो पहुंचने का एक और तरीका है <a href="mailto:reservas.kalawala@gmail.com?subject=Organise private transportation&body= " target="_blank" rel="noopener noreferrer">निजी परिवहन</a> का उपयोग करना। यह विकल्प अन्य यात्रियों के साथ साझा किया जा सकता है या आपके और आपके साथियों के लिए निजी हो सकता है, जिससे यह आपकी मंज़िल तक यात्रा करने का एक सुविधाजनक और आरामदायक तरीका बन जाता है।</>,
      'निजी परिवहन के साथ, आपको आपकी पसंदीदा जगह से उठाया जा सकता है और सीधे प्वेर्तो वियेहो में आपके ठहरने की जगह पर छोड़ा जा सकता है। यह विकल्प उन लोगों के लिए खासतौर पर मददगार हो सकता है जिनके पास भारी सामान है, जो अधिक निजता पसंद करते हैं, या जिनकी विशेष यात्रा ज़रूरतें हैं।',
      'यात्रियों की संख्या के आधार पर, साझा शटल लेने की तुलना में निजी परिवहन अधिक किफ़ायती विकल्प हो सकता है।',
      'इसके अलावा, यह आपको अपना खुद का कार्यक्रम तय करने और रास्ते में मौजूद कुछ खूबसूरत नज़ारों का आनंद लेने के लिए रुकने की लचीलापन भी देता है।',
      "यदि आप प्वेर्तो वियेहो के लिए निजी परिवहन बुक करने में रुचि रखते हैं, तो कई प्रतिष्ठित कंपनियां हैं जो यह सेवा प्रदान करती हैं। अपने विकल्पों पर शोध करना और सबसे अच्छा सौदा पाने के लिए कीमतों की तुलना करना हमेशा एक अच्छा विचार है।",
      'हम भी यह सेवा प्रदान करते हैं और आपकी यात्रा के लिए सबसे सूचित निर्णय लेने में मदद करने हेतु आपको मार्ग और कीमतें दे सकते हैं।',
      "कुल मिलाकर, चाहे आप सार्वजनिक परिवहन की सुविधा पसंद करें या निजी परिवहन का आराम, प्वेर्तो वियेहो पहुंचने के कई तरीके हैं। आपकी पसंद चाहे जो भी हो, आप कोस्टा रिका के तालामांका में स्थित इस खूबसूरत कैरिबियन कस्बे के शानदार नज़ारों और जीवंत संस्कृति का ज़रूर आनंद लेंगे।",
    ],
  },
};

export function travellingToPuertoContent(locale: Locale): TravellingToPuertoContent {
  return travellingToPuerto[locale] ?? travellingToPuerto.en!;
}

export interface CahuitaParkContent {
  seoTitle: string;
  seoDescription: string;
  heading: string;
  photoCredit: React.ReactNode;
  introParagraphs: string[];
  enterHeading: string;
  enterParagraphs: string[];
  stayRecommendationTitle: string;
  snorkelHeading: string;
  snorkelParagraphs: [string, string, string];
  snorkelListItems: [string, string, string];
  snorkelClosing: string;
  wildlifeHeading: string;
  wildlifeParagraphs: [string, string, string];
  scheduleHeading: string;
  scheduleParagraphs: [React.ReactNode, string];
  boatHeading: string;
  boatParagraphs: [string, React.ReactNode, string];
  plasticHeading: string;
  plasticParagraphs: [React.ReactNode, string, string];
  tipsHeading: string;
  tipsListItems: [string, string, string, string];
  closing: React.ReactNode;
}

const cahuitaPark: Partial<Record<Locale, CahuitaParkContent>> = {
  en: {
    seoTitle: 'Visiting Cahuita National Park: What to Know Before You Go',
    seoDescription:
      "Cahuita National Park is one of the easiest and most relaxed national parks to visit on Costa Rica's Caribbean coast. It combines jungle trails, white-sand beaches, wildlife, and coral reefs in one place.",
    heading: 'Visiting Cahuita National Park: What to Know Before You Go',
    photoCredit: <>Photo by <a href="https://haakonkrohn.com/" target="_blank" rel="noopener noreferrer">Haakon S. Krohn</a></>,
    introParagraphs: [
      "Cahuita National Park is one of the easiest and most relaxed national parks to visit on Costa Rica's Caribbean coast. It combines jungle trails, white-sand beaches, wildlife, and coral reefs in one place.",
      'If you are staying near Cahuita town or Puerto Viejo, this is a great half-day or full-day trip. Below is a clear guide to help you plan your visit.',
    ],
    enterHeading: 'Enter from Cahuita Town',
    enterParagraphs: [
      'The most common entrance is in Cahuita town, near Playa Blanca.',
      'This entrance works on a donation basis, which makes it cheaper than other park entrances. The donation helps support park maintenance and local guides.',
      'Arrive early in the morning if you can. It is cooler, quieter, and better for wildlife spotting.',
    ],
    stayRecommendationTitle: 'Where to stay near Cahuita National Park?',
    snorkelHeading: 'Snorkeling Inside the Park',
    snorkelParagraphs: [
      'Snorkeling is one of the main reasons people visit Cahuita National Park.',
      "The coral reef here is one of the largest on Costa Rica's Caribbean coast. You can see colorful fish, coral formations, and sometimes rays.",
      'Most visitors book a guided snorkeling tour, which includes:',
    ],
    snorkelListItems: ['A local guide', 'Snorkeling gear', 'A boat ride to the reef'],
    snorkelClosing: 'Conditions depend on the weather, so visibility can change from day to day.',
    wildlifeHeading: 'Watch Your Food Around Wildlife',
    wildlifeParagraphs: [
      'Cahuita is full of animals. You may see monkeys, raccoons, iguanas, coatis, and sloths.',
      'Some animals are very used to visitors and may try to steal food. Keep snacks in a closed bag and never leave food unattended.',
      'Feeding animals is not allowed and can harm them.',
    ],
    scheduleHeading: 'Know the Park Schedule',
    scheduleParagraphs: [
      <>The park <strong>closes at 4:00 p.m.</strong> Visitors must exit before that time.</>,
      'This is another reason to enter early. You will have more time to walk, swim, and relax without rushing.',
    ],
    boatHeading: 'Boat Ride Back Instead of Walking',
    boatParagraphs: [
      'The main trail runs along the coast and can be long if you walk the full route.',
      <>Many visitors choose to walk one way and <strong>return by boat</strong>. Local boat operators offer rides back toward Cahuita town.</>,
      'This is a good option if you want to enjoy the trail without walking the entire distance.',
    ],
    plasticHeading: 'Plastic Is Not Allowed',
    plasticParagraphs: [
      <><strong>Single-use plastics</strong> are not allowed inside the park.</>,
      'This includes plastic bags, disposable bottles, and plastic food packaging. Bring reusable bottles and containers.',
      'Park staff may check bags at the entrance.',
    ],
    tipsHeading: 'Final Tips Before You Go',
    tipsListItems: [
      'Wear comfortable walking shoes or sandals',
      'Bring water in a reusable bottle',
      'Use reef-safe sunscreen',
      'Start early to avoid heat and crowds',
    ],
    closing: <><strong>Cahuita National Park is calm, beautiful, and easy to visit.</strong> With a little planning, it is one of the best nature experiences on the Caribbean coast of Costa Rica.</>,
  },
  es: {
    seoTitle: 'Visitar el Parque Nacional Cahuita: lo que tenés que saber',
    seoDescription:
      'El Parque Nacional Cahuita es uno de los parques más accesibles y tranquilos del Caribe costarricense. Combina selva, playa, fauna y arrecife en un solo lugar.',
    heading: 'Visitar el Parque Nacional Cahuita: lo que tenés que saber',
    photoCredit: <>Foto de <a href="https://haakonkrohn.com/" target="_blank" rel="noopener noreferrer">Haakon S. Krohn</a></>,
    introParagraphs: [
      'El Parque Nacional Cahuita es uno de los parques más accesibles y tranquilos del Caribe costarricense. Combina selva, playa, fauna y arrecife en un solo lugar.',
      'Si estás en Cahuita o Puerto Viejo, es una excursión ideal de medio día o de día completo. Acá te dejo una guía clara para organizar tu visita.',
    ],
    enterHeading: 'Entrada por el pueblo de Cahuita',
    enterParagraphs: [
      'La entrada más usada es la que está en el pueblo de Cahuita, cerca de Playa Blanca.',
      'Esta entrada funciona con donación voluntaria, por lo que suele ser más económica. La donación ayuda al mantenimiento del parque y a la comunidad local.',
      'Lo mejor es entrar temprano. Hay menos calor, menos gente y más animales activos.',
    ],
    // The pre-merge Spanish page left this title untranslated (literally
    // "Where to stay near Cahuita National Park?") and also had a second,
    // duplicate StayRecommendation later with a title about Puerto Viejo bus
    // services — unrelated to this article, apparently pasted in from
    // BusHours. Translated the real title; the stray second block is dropped.
    stayRecommendationTitle: '¿Dónde hospedarte cerca del Parque Nacional Cahuita?',
    snorkelHeading: 'Snorkel dentro del parque',
    snorkelParagraphs: [
      'El snorkel es una de las actividades principales del parque.',
      'El arrecife de Cahuita es uno de los más grandes del Caribe de Costa Rica. Podés ver peces de colores, corales y, a veces, rayas.',
      'Lo más común es hacerlo con un tour guiado, que suele incluir:',
    ],
    snorkelListItems: ['Guía local', 'Equipo de snorkel', 'Traslado en bote hasta el arrecife'],
    snorkelClosing: 'La visibilidad depende del clima y del estado del mar.',
    wildlifeHeading: 'Cuidado con la comida y los animales',
    wildlifeParagraphs: [
      'El parque tiene mucha fauna. Es común ver monos, mapaches, iguanas, pizotes y perezosos.',
      'Algunos animales intentan robar comida. Guardá bien tus snacks y no los dejés a la vista.',
      'No está permitido alimentar a los animales.',
    ],
    scheduleHeading: 'Horario del parque',
    scheduleParagraphs: [
      <>El parque <strong>cierra a las 4:00 p.m.</strong> Todos los visitantes deben salir antes de esa hora.</>,
      'Por eso conviene entrar temprano y recorrer el parque sin apuro.',
    ],
    boatHeading: 'Regresar en bote',
    boatParagraphs: [
      'El sendero principal es largo si lo caminás completo.',
      <>Muchos visitantes hacen el recorrido a pie en un solo sentido y <strong>regresan en bote</strong> hacia Cahuita. Hay lancheros locales que ofrecen este servicio.</>,
      'Es una buena opción si no querés caminar todo el trayecto de regreso.',
    ],
    plasticHeading: 'No se permite plástico',
    plasticParagraphs: [
      <>No se permite el ingreso de <strong>plásticos de un solo uso</strong>.</>,
      'Esto incluye bolsas plásticas, botellas desechables y empaques de comida. Llevá botella reutilizable y recipientes reutilizables.',
      'En la entrada pueden revisar los bolsos.',
    ],
    tipsHeading: 'Consejos finales',
    tipsListItems: [
      'Usá zapatos cómodos',
      'Llevá agua en botella reutilizable',
      'Usá protector solar biodegradable',
      'Entrá temprano',
    ],
    closing: <><strong>El Parque Nacional Cahuita es fácil de visitar, natural y muy especial.</strong> Con una buena planificación, es una de las mejores experiencias del Caribe de Costa Rica.</>,
  },
  fr: {
    seoTitle: "Visiter le parc national de Cahuita : ce qu'il faut savoir avant d'y aller",
    seoDescription:
      "Le parc national de Cahuita est l'un des parcs nationaux les plus faciles et les plus paisibles à visiter sur la côte caribéenne du Costa Rica. Il combine sentiers de jungle, plages de sable blanc, faune sauvage et récifs coralliens en un seul lieu.",
    heading: "Visiter le parc national de Cahuita : ce qu'il faut savoir avant d'y aller",
    photoCredit: <>Photo par <a href="https://haakonkrohn.com/" target="_blank" rel="noopener noreferrer">Haakon S. Krohn</a></>,
    introParagraphs: [
      "Le parc national de Cahuita est l'un des parcs nationaux les plus faciles et les plus paisibles à visiter sur la côte caribéenne du Costa Rica. Il combine sentiers de jungle, plages de sable blanc, faune sauvage et récifs coralliens en un seul lieu.",
      "Si vous séjournez près du village de Cahuita ou à Puerto Viejo, c'est une excellente excursion d'une demi-journée ou d'une journée complète. Voici un guide clair pour vous aider à planifier votre visite.",
    ],
    enterHeading: 'Entrer par le village de Cahuita',
    enterParagraphs: [
      "L'entrée la plus courante se trouve dans le village de Cahuita, près de Playa Blanca.",
      "Cette entrée fonctionne sur la base d'un don, ce qui la rend moins chère que les autres entrées du parc. Le don contribue à l'entretien du parc et soutient les guides locaux.",
      "Arrivez tôt le matin si possible. Il y fait plus frais, c'est plus calme, et c'est idéal pour observer la faune.",
    ],
    stayRecommendationTitle: 'Où loger près du parc national de Cahuita ?',
    snorkelHeading: 'Faire du snorkeling dans le parc',
    snorkelParagraphs: [
      "Le snorkeling est l'une des principales raisons pour lesquelles les gens visitent le parc national de Cahuita.",
      "Le récif corallien ici est l'un des plus grands de la côte caribéenne du Costa Rica. Vous pouvez y voir des poissons colorés, des formations coralliennes et parfois des raies.",
      "La plupart des visiteurs réservent une excursion de snorkeling guidée, qui comprend :",
    ],
    snorkelListItems: ['Un guide local', 'Le matériel de snorkeling', "Un trajet en bateau jusqu'au récif"],
    snorkelClosing: "Les conditions dépendent de la météo, donc la visibilité peut varier d'un jour à l'autre.",
    wildlifeHeading: 'Surveillez votre nourriture près de la faune',
    wildlifeParagraphs: [
      "Cahuita regorge d'animaux. Vous pourrez y voir des singes, des ratons laveurs, des iguanes, des coatis et des paresseux.",
      "Certains animaux sont très habitués aux visiteurs et peuvent essayer de voler de la nourriture. Gardez vos en-cas dans un sac fermé et ne laissez jamais de nourriture sans surveillance.",
      "Il est interdit de nourrir les animaux, ce qui peut leur nuire.",
    ],
    scheduleHeading: 'Connaître les horaires du parc',
    scheduleParagraphs: [
      <>Le parc <strong>ferme à 16h00</strong>. Les visiteurs doivent en sortir avant cette heure.</>,
      "C'est une raison de plus pour y entrer tôt. Vous aurez plus de temps pour marcher, nager et vous détendre sans être pressé.",
    ],
    boatHeading: "Revenir en bateau plutôt qu'à pied",
    boatParagraphs: [
      "Le sentier principal longe la côte et peut être long si vous parcourez l'itinéraire complet à pied.",
      <>De nombreux visiteurs choisissent de marcher dans un sens et de <strong>revenir en bateau</strong>. Des bateliers locaux proposent des trajets retour vers le village de Cahuita.</>,
      "C'est une bonne option si vous souhaitez profiter du sentier sans marcher toute la distance.",
    ],
    plasticHeading: 'Le plastique est interdit',
    plasticParagraphs: [
      <>Les <strong>plastiques à usage unique</strong> ne sont pas autorisés à l'intérieur du parc.</>,
      "Cela inclut les sacs plastiques, les bouteilles jetables et les emballages alimentaires en plastique. Apportez des bouteilles et des contenants réutilisables.",
      "Le personnel du parc peut vérifier les sacs à l'entrée.",
    ],
    tipsHeading: "Derniers conseils avant d'y aller",
    tipsListItems: [
      'Portez des chaussures de marche ou des sandales confortables',
      "Apportez de l'eau dans une bouteille réutilisable",
      'Utilisez une crème solaire respectueuse des récifs',
      'Partez tôt pour éviter la chaleur et la foule',
    ],
    closing: <><strong>Le parc national de Cahuita est calme, magnifique et facile à visiter.</strong> Avec un peu de planification, c'est l'une des meilleures expériences nature de la côte caribéenne du Costa Rica.</>,
  },
  de: {
    seoTitle: 'Besuch des Nationalparks Cahuita: Was Sie vorher wissen sollten',
    seoDescription:
      "Der Nationalpark Cahuita ist einer der am leichtesten zugänglichen und entspanntesten Nationalparks an der Karibikküste Costa Ricas. Er vereint Dschungelpfade, weiße Sandstrände, Tierwelt und Korallenriffe an einem einzigen Ort.",
    heading: 'Besuch des Nationalparks Cahuita: Was Sie vorher wissen sollten',
    photoCredit: <>Foto von <a href="https://haakonkrohn.com/" target="_blank" rel="noopener noreferrer">Haakon S. Krohn</a></>,
    introParagraphs: [
      "Der Nationalpark Cahuita ist einer der am leichtesten zugänglichen und entspanntesten Nationalparks an der Karibikküste Costa Ricas. Er vereint Dschungelpfade, weiße Sandstrände, Tierwelt und Korallenriffe an einem einzigen Ort.",
      'Wenn Sie in der Nähe von Cahuita oder Puerto Viejo übernachten, ist dies ein großartiger Halbtages- oder Ganztagesausflug. Im Folgenden finden Sie einen übersichtlichen Leitfaden, der Ihnen bei der Planung Ihres Besuchs hilft.',
    ],
    enterHeading: 'Eingang vom Ort Cahuita aus',
    enterParagraphs: [
      'Der am häufigsten genutzte Eingang befindet sich im Ort Cahuita, in der Nähe von Playa Blanca.',
      'Dieser Eingang funktioniert auf Spendenbasis, was ihn günstiger macht als andere Parkeingänge. Die Spende unterstützt die Instandhaltung des Parks und die lokalen Guides.',
      'Kommen Sie nach Möglichkeit früh am Morgen. Es ist kühler, ruhiger und besser geeignet, um Tiere zu beobachten.',
    ],
    stayRecommendationTitle: 'Wo übernachten in der Nähe des Nationalparks Cahuita?',
    snorkelHeading: 'Schnorcheln im Park',
    snorkelParagraphs: [
      'Schnorcheln ist einer der Hauptgründe, warum Menschen den Nationalpark Cahuita besuchen.',
      "Das Korallenriff hier ist eines der größten an der Karibikküste Costa Ricas. Sie können bunte Fische, Korallenformationen und manchmal auch Rochen sehen.",
      'Die meisten Besucher buchen eine geführte Schnorcheltour, die Folgendes umfasst:',
    ],
    snorkelListItems: ['Einen lokalen Guide', 'Schnorchelausrüstung', 'Eine Bootsfahrt zum Riff'],
    snorkelClosing: 'Die Bedingungen hängen vom Wetter ab, daher kann sich die Sichtweite von Tag zu Tag ändern.',
    wildlifeHeading: 'Achten Sie in der Nähe von Wildtieren auf Ihr Essen',
    wildlifeParagraphs: [
      'Cahuita ist voller Tiere. Sie können Affen, Waschbären, Leguane, Nasenbären und Faultiere sehen.',
      'Manche Tiere sind sehr an Besucher gewöhnt und versuchen möglicherweise, Essen zu stehlen. Bewahren Sie Snacks in einer verschlossenen Tasche auf und lassen Sie Essen niemals unbeaufsichtigt.',
      'Das Füttern von Tieren ist nicht erlaubt und kann ihnen schaden.',
    ],
    scheduleHeading: 'Kennen Sie die Öffnungszeiten des Parks',
    scheduleParagraphs: [
      <>Der Park <strong>schließt um 16:00 Uhr.</strong> Besucher müssen ihn vor dieser Uhrzeit verlassen.</>,
      'Das ist ein weiterer Grund, früh in den Park zu gehen. So haben Sie mehr Zeit zum Wandern, Schwimmen und Entspannen, ohne sich hetzen zu müssen.',
    ],
    boatHeading: 'Mit dem Boot zurück statt zu Fuß',
    boatParagraphs: [
      'Der Hauptweg verläuft entlang der Küste und kann lang sein, wenn Sie die gesamte Strecke zu Fuß zurücklegen.',
      <>Viele Besucher gehen den Weg nur in eine Richtung zu Fuß und <strong>kehren mit dem Boot zurück</strong>. Lokale Bootsbetreiber bieten Fahrten zurück in Richtung des Orts Cahuita an.</>,
      'Das ist eine gute Option, wenn Sie den Weg genießen möchten, ohne die gesamte Strecke laufen zu müssen.',
    ],
    plasticHeading: 'Plastik ist nicht erlaubt',
    plasticParagraphs: [
      <><strong>Einwegplastik</strong> ist im Park nicht erlaubt.</>,
      'Dazu zählen Plastiktüten, Einwegflaschen und Lebensmittelverpackungen aus Plastik. Bringen Sie wiederverwendbare Flaschen und Behälter mit.',
      'Das Parkpersonal kann Taschen am Eingang kontrollieren.',
    ],
    tipsHeading: 'Letzte Tipps vor Ihrem Besuch',
    tipsListItems: [
      'Tragen Sie bequeme Wanderschuhe oder Sandalen',
      'Bringen Sie Wasser in einer wiederverwendbaren Flasche mit',
      'Verwenden Sie riffverträgliche Sonnencreme',
      'Starten Sie früh, um Hitze und Menschenmassen zu vermeiden',
    ],
    closing: <><strong>Der Nationalpark Cahuita ist ruhig, wunderschön und einfach zu besuchen.</strong> Mit ein wenig Planung ist er eines der besten Naturerlebnisse an der Karibikküste Costa Ricas.</>,
  },
  he: {
    seoTitle: 'ביקור בפארק הלאומי קאוויטה: מה כדאי לדעת לפני שיוצאים',
    seoDescription:
      "הפארק הלאומי קאוויטה הוא אחד הפארקים הלאומיים הקלים והנינוחים ביותר לביקור בחוף הקריבי של קוסטה ריקה. הוא משלב שבילי ג'ונגל, חופי חול לבן, חיות בר ושוניות אלמוגים במקום אחד.",
    heading: 'ביקור בפארק הלאומי קאוויטה: מה כדאי לדעת לפני שיוצאים',
    photoCredit: <>צילום מאת <a href="https://haakonkrohn.com/" target="_blank" rel="noopener noreferrer">Haakon S. Krohn</a></>,
    introParagraphs: [
      "הפארק הלאומי קאוויטה הוא אחד הפארקים הלאומיים הקלים והנינוחים ביותר לביקור בחוף הקריבי של קוסטה ריקה. הוא משלב שבילי ג'ונגל, חופי חול לבן, חיות בר ושוניות אלמוגים במקום אחד.",
      'אם אתם מתארחים ליד עיירת קאוויטה או פוארטו ויחו, זהו טיול מצוין לחצי יום או ליום שלם. להלן מדריך ברור שיעזור לכם לתכנן את הביקור שלכם.',
    ],
    enterHeading: 'כניסה מעיירת קאוויטה',
    enterParagraphs: [
      'הכניסה הנפוצה ביותר היא בעיירת קאוויטה, ליד פלאיה בלנקה.',
      'כניסה זו פועלת על בסיס תרומה, מה שהופך אותה לזולה יותר מכניסות אחרות לפארק. התרומה מסייעת בתחזוקת הפארק ובתמיכה במדריכים המקומיים.',
      'הגיעו מוקדם בבוקר אם אתם יכולים. האווירה קרירה יותר, שקטה יותר, ומתאימה יותר לצפייה בחיות בר.',
    ],
    stayRecommendationTitle: 'היכן להתארח ליד הפארק הלאומי קאוויטה?',
    snorkelHeading: 'שנורקלינג בתוך הפארק',
    snorkelParagraphs: [
      'שנורקלינג הוא אחת הסיבות העיקריות לכך שאנשים מבקרים בפארק הלאומי קאוויטה.',
      'שונית האלמוגים כאן היא אחת הגדולות בחוף הקריבי של קוסטה ריקה. תוכלו לראות דגים צבעוניים, מבני אלמוגים ולעיתים גם תריסנים.',
      'רוב המבקרים מזמינים סיור שנורקלינג מודרך, הכולל:',
    ],
    snorkelListItems: ['מדריך מקומי', 'ציוד שנורקלינג', 'הפלגה בסירה אל השונית'],
    snorkelClosing: 'התנאים תלויים במזג האוויר, כך שהראות עשויה להשתנות מיום ליום.',
    wildlifeHeading: 'שימו לב לאוכל ליד חיות הבר',
    wildlifeParagraphs: [
      'קאוויטה מלאה בבעלי חיים. ייתכן שתראו קופים, רקונים, איגואנות, קואטי ועצלנים.',
      'חלק מבעלי החיים מורגלים מאוד למבקרים ועלולים לנסות לגנוב אוכל. שמרו על חטיפים בשקית סגורה ולעולם אל תשאירו אוכל ללא השגחה.',
      'האכלת בעלי חיים אסורה ועלולה לפגוע בהם.',
    ],
    scheduleHeading: 'הכירו את שעות הפארק',
    scheduleParagraphs: [
      <>הפארק <strong>נסגר בשעה 16:00.</strong> על המבקרים לצאת לפני מועד זה.</>,
      'זו סיבה נוספת להיכנס מוקדם. יהיה לכם יותר זמן להתהלך, לשחות ולהירגע ללא לחץ.',
    ],
    boatHeading: 'חזרה בסירה במקום הליכה',
    boatParagraphs: [
      'השביל הראשי משתרע לאורך החוף ועלול להיות ארוך אם הולכים את כל המסלול.',
      <>מבקרים רבים בוחרים ללכת כיוון אחד <strong>ולחזור בסירה</strong>. מפעילי סירות מקומיים מציעים הסעה חזרה לכיוון עיירת קאוויטה.</>,
      'זוהי אפשרות טובה אם אתם רוצים ליהנות מהשביל מבלי ללכת את כל המרחק.',
    ],
    plasticHeading: 'פלסטיק אינו מותר',
    plasticParagraphs: [
      <><strong>פלסטיק חד-פעמי</strong> אינו מותר בתוך הפארק.</>,
      'זה כולל שקיות פלסטיק, בקבוקים חד-פעמיים ואריזות מזון מפלסטיק. הביאו בקבוקים ומכלים לשימוש חוזר.',
      'צוות הפארק עשוי לבדוק תיקים בכניסה.',
    ],
    tipsHeading: 'טיפים אחרונים לפני שיוצאים',
    tipsListItems: [
      'לבשו נעלי הליכה נוחות או סנדלים',
      'הביאו מים בבקבוק לשימוש חוזר',
      'השתמשו בקרם הגנה ידידותי לשוניות',
      'צאו מוקדם כדי להימנע מחום ומהמונים',
    ],
    closing: <><strong>הפארק הלאומי קאוויטה הוא שקט, יפהפה וקל לביקור.</strong> עם קצת תכנון, זוהי אחת מחוויות הטבע הטובות ביותר בחוף הקריבי של קוסטה ריקה.</>,
  },
  it: {
    seoTitle: 'Visitare il Parco Nazionale di Cahuita: Cosa Sapere Prima di Partire',
    seoDescription:
      "Il Parco Nazionale di Cahuita è uno dei parchi nazionali più semplici e rilassanti da visitare sulla costa caraibica della Costa Rica. Riunisce in un unico luogo sentieri nella giungla, spiagge di sabbia bianca, fauna selvatica e barriere coralline.",
    heading: 'Visitare il Parco Nazionale di Cahuita: Cosa Sapere Prima di Partire',
    photoCredit: <>Foto di <a href="https://haakonkrohn.com/" target="_blank" rel="noopener noreferrer">Haakon S. Krohn</a></>,
    introParagraphs: [
      "Il Parco Nazionale di Cahuita è uno dei parchi nazionali più semplici e rilassanti da visitare sulla costa caraibica della Costa Rica. Riunisce in un unico luogo sentieri nella giungla, spiagge di sabbia bianca, fauna selvatica e barriere coralline.",
      "Se soggiorni vicino al paese di Cahuita o a Puerto Viejo, questa è un'ottima gita di mezza giornata o di un'intera giornata. Di seguito trovi una guida chiara per pianificare la tua visita.",
    ],
    enterHeading: 'Ingresso dal Paese di Cahuita',
    enterParagraphs: [
      "L'ingresso più utilizzato si trova nel paese di Cahuita, vicino a Playa Blanca.",
      "Questo ingresso funziona con un sistema di donazione volontaria, il che lo rende più economico rispetto ad altri accessi al parco. La donazione contribuisce alla manutenzione del parco e sostiene le guide locali.",
      "Se puoi, arriva presto al mattino. Fa più fresco, c'è meno gente ed è più facile avvistare la fauna selvatica.",
    ],
    stayRecommendationTitle: 'Dove alloggiare vicino al Parco Nazionale di Cahuita?',
    snorkelHeading: 'Fare Snorkeling nel Parco',
    snorkelParagraphs: [
      "Lo snorkeling è una delle ragioni principali per cui si visita il Parco Nazionale di Cahuita.",
      "La barriera corallina qui è una delle più grandi della costa caraibica della Costa Rica. Puoi vedere pesci colorati, formazioni coralline e talvolta anche razze.",
      "La maggior parte dei visitatori prenota un tour di snorkeling guidato, che include:",
    ],
    snorkelListItems: ['Una guida locale', 'Attrezzatura da snorkeling', 'Un tragitto in barca fino alla barriera corallina'],
    snorkelClosing: "Le condizioni dipendono dal meteo, quindi la visibilità può cambiare di giorno in giorno.",
    wildlifeHeading: 'Fai Attenzione al Cibo con la Fauna Selvatica',
    wildlifeParagraphs: [
      "Cahuita è piena di animali. Potresti vedere scimmie, procioni, iguane, coati e bradipi.",
      "Alcuni animali sono molto abituati ai visitatori e potrebbero cercare di rubare il cibo. Tieni gli snack in una borsa chiusa e non lasciare mai il cibo incustodito.",
      "Non è consentito dare da mangiare agli animali e può essere dannoso per loro.",
    ],
    scheduleHeading: 'Orari di Apertura del Parco',
    scheduleParagraphs: [
      <>Il parco <strong>chiude alle 16:00.</strong> I visitatori devono uscire prima di quell'orario.</>,
      "Questo è un altro motivo per entrare presto: avrai più tempo per camminare, nuotare e rilassarti senza fretta.",
    ],
    boatHeading: 'Tornare in Barca Invece che a Piedi',
    boatParagraphs: [
      "Il sentiero principale costeggia la costa e può risultare lungo se percorso per intero a piedi.",
      <>Molti visitatori scelgono di percorrere il sentiero a piedi in un solo senso e <strong>tornare in barca</strong>. Gli operatori locali offrono tragitti di ritorno verso il paese di Cahuita.</>,
      "È una buona opzione se vuoi goderti il sentiero senza percorrere l'intera distanza a piedi.",
    ],
    plasticHeading: 'La Plastica Non È Consentita',
    plasticParagraphs: [
      <>Non è consentito l'ingresso di <strong>plastica monouso</strong> all'interno del parco.</>,
      "Questo include sacchetti di plastica, bottiglie usa e getta e confezioni di cibo in plastica. Porta con te bottiglie e contenitori riutilizzabili.",
      "Il personale del parco potrebbe controllare le borse all'ingresso.",
    ],
    tipsHeading: 'Ultimi Consigli Prima di Partire',
    tipsListItems: [
      'Indossa scarpe comode da cammino o sandali',
      'Porta con te acqua in una bottiglia riutilizzabile',
      'Usa una crema solare rispettosa dei coralli',
      'Parti presto per evitare il caldo e la folla',
    ],
    closing: <><strong>Il Parco Nazionale di Cahuita è tranquillo, bellissimo e facile da visitare.</strong> Con un po' di pianificazione, è una delle migliori esperienze naturalistiche della costa caraibica della Costa Rica.</>,
  },
  pt: {
    seoTitle: 'Visitar o Parque Nacional de Cahuita: o que precisa de saber antes de ir',
    seoDescription:
      "O Parque Nacional de Cahuita é um dos parques nacionais mais fáceis e descontraídos de visitar na costa caribenha da Costa Rica. Combina trilhos na selva, praias de areia branca, vida selvagem e recifes de coral, tudo num só lugar.",
    heading: 'Visitar o Parque Nacional de Cahuita: o que precisa de saber antes de ir',
    photoCredit: <>Foto de <a href="https://haakonkrohn.com/" target="_blank" rel="noopener noreferrer">Haakon S. Krohn</a></>,
    introParagraphs: [
      "O Parque Nacional de Cahuita é um dos parques nacionais mais fáceis e descontraídos de visitar na costa caribenha da Costa Rica. Combina trilhos na selva, praias de areia branca, vida selvagem e recifes de coral, tudo num só lugar.",
      "Se estiver hospedado perto da vila de Cahuita ou de Puerto Viejo, esta é uma ótima excursão de meio dia ou de dia inteiro. Aqui fica um guia claro para o ajudar a planear a sua visita.",
    ],
    enterHeading: 'Entrar pela Vila de Cahuita',
    enterParagraphs: [
      "A entrada mais comum é na vila de Cahuita, perto de Playa Blanca.",
      "Esta entrada funciona por donativo, o que a torna mais barata do que as outras entradas do parque. O donativo ajuda a sustentar a manutenção do parque e os guias locais.",
      "Chegue cedo de manhã, se puder. Está mais fresco, mais sossegado e é melhor para avistar vida selvagem.",
    ],
    stayRecommendationTitle: 'Onde ficar hospedado perto do Parque Nacional de Cahuita?',
    snorkelHeading: 'Snorkel dentro do Parque',
    snorkelParagraphs: [
      "O snorkel é uma das principais razões pelas quais as pessoas visitam o Parque Nacional de Cahuita.",
      "O recife de coral aqui é um dos maiores da costa caribenha da Costa Rica. Pode ver peixes coloridos, formações de coral e, por vezes, raias.",
      "A maioria dos visitantes reserva um passeio de snorkel guiado, que inclui:",
    ],
    snorkelListItems: ['Um guia local', 'Equipamento de snorkel', 'Um passeio de barco até ao recife'],
    snorkelClosing: 'As condições dependem do estado do tempo, por isso a visibilidade pode variar de dia para dia.',
    wildlifeHeading: 'Cuidado com a Comida perto da Vida Selvagem',
    wildlifeParagraphs: [
      'Cahuita está cheia de animais. Poderá ver macacos, guaxinins, iguanas, quatis e preguiças.',
      'Alguns animais estão muito habituados aos visitantes e podem tentar roubar comida. Guarde os lanches num saco fechado e nunca deixe comida sem vigilância.',
      'Não é permitido alimentar os animais e isso pode prejudicá-los.',
    ],
    scheduleHeading: 'Conheça o Horário do Parque',
    scheduleParagraphs: [
      <>O parque <strong>fecha às 16h00</strong>. Os visitantes têm de sair antes dessa hora.</>,
      'Esta é mais uma razão para entrar cedo. Terá mais tempo para caminhar, nadar e relaxar sem pressa.',
    ],
    boatHeading: 'Regressar de Barco em Vez de a Pé',
    boatParagraphs: [
      'O trilho principal segue ao longo da costa e pode ser longo se percorrer todo o trajeto a pé.',
      <>Muitos visitantes optam por caminhar apenas num sentido e <strong>regressar de barco</strong>. Os barqueiros locais oferecem transporte de regresso até à vila de Cahuita.</>,
      'Esta é uma boa opção se quiser desfrutar do trilho sem caminhar toda a distância.',
    ],
    plasticHeading: 'Não é Permitido Plástico',
    plasticParagraphs: [
      <>Não é permitida a entrada de <strong>plásticos de utilização única</strong> no parque.</>,
      'Isto inclui sacos de plástico, garrafas descartáveis e embalagens de plástico para alimentos. Traga garrafas e recipientes reutilizáveis.',
      'A equipa do parque pode revistar as mochilas na entrada.',
    ],
    tipsHeading: 'Últimas Dicas Antes de Ir',
    tipsListItems: [
      'Use calçado confortável para caminhar ou sandálias',
      'Traga água numa garrafa reutilizável',
      'Use protetor solar biodegradável, seguro para os recifes',
      'Comece cedo para evitar o calor e as multidões',
    ],
    closing: <><strong>O Parque Nacional de Cahuita é calmo, bonito e fácil de visitar.</strong> Com um pouco de planeamento, é uma das melhores experiências de natureza na costa caribenha da Costa Rica.</>,
  },
  hi: {
    seoTitle: 'काहुइटा राष्ट्रीय उद्यान जाना: जाने से पहले क्या जानें',
    seoDescription:
      "काहुइटा राष्ट्रीय उद्यान, कोस्टा रिका के कैरिबियन तट पर घूमने के लिए सबसे आसान और सबसे सुकूनभरे राष्ट्रीय उद्यानों में से एक है। यह एक ही जगह पर जंगल के रास्तों, सफेद रेत के समुद्र तटों, वन्यजीवों और प्रवाल भित्तियों को जोड़ता है।",
    heading: 'काहुइटा राष्ट्रीय उद्यान जाना: जाने से पहले क्या जानें',
    photoCredit: <>फोटो: <a href="https://haakonkrohn.com/" target="_blank" rel="noopener noreferrer">Haakon S. Krohn</a></>,
    introParagraphs: [
      "काहुइटा राष्ट्रीय उद्यान, कोस्टा रिका के कैरिबियन तट पर घूमने के लिए सबसे आसान और सबसे सुकूनभरे राष्ट्रीय उद्यानों में से एक है। यह एक ही जगह पर जंगल के रास्तों, सफेद रेत के समुद्र तटों, वन्यजीवों और प्रवाल भित्तियों को जोड़ता है।",
      'यदि आप काहुइटा कस्बे या प्वेर्तो वियेहो के पास ठहरे हैं, तो यह आधे दिन या पूरे दिन की एक बेहतरीन यात्रा है। नीचे आपकी यात्रा की योजना बनाने में मदद के लिए एक स्पष्ट गाइड दी गई है।',
    ],
    enterHeading: 'काहुइटा कस्बे से प्रवेश',
    enterParagraphs: [
      'सबसे आम प्रवेश द्वार काहुइटा कस्बे में, प्लाया ब्लांका के पास है।',
      'यह प्रवेश द्वार दान के आधार पर काम करता है, जिससे यह पार्क के अन्य प्रवेश द्वारों की तुलना में सस्ता है। दान पार्क के रखरखाव और स्थानीय गाइडों की मदद में उपयोग होता है।',
      'यदि हो सके तो सुबह जल्दी पहुंचें। यह समय ठंडा, शांत और वन्यजीव देखने के लिए बेहतर होता है।',
    ],
    stayRecommendationTitle: 'काहुइटा राष्ट्रीय उद्यान के पास कहां ठहरें?',
    snorkelHeading: 'पार्क के अंदर स्नॉर्कलिंग',
    snorkelParagraphs: [
      'स्नॉर्कलिंग काहुइटा राष्ट्रीय उद्यान आने के मुख्य कारणों में से एक है।',
      'यहां की प्रवाल भित्ति कोस्टा रिका के कैरिबियन तट पर सबसे बड़ी भित्तियों में से एक है। आप रंग-बिरंगी मछलियां, प्रवाल संरचनाएं और कभी-कभी स्टिंगरे भी देख सकते हैं।',
      'अधिकांश आगंतुक एक गाइडेड स्नॉर्कलिंग टूर बुक करते हैं, जिसमें शामिल है:',
    ],
    snorkelListItems: ['स्थानीय गाइड', 'स्नॉर्कलिंग उपकरण', 'भित्ति तक बोट की सवारी'],
    snorkelClosing: 'स्थितियां मौसम पर निर्भर करती हैं, इसलिए दृश्यता दिन-प्रतिदिन बदल सकती है।',
    wildlifeHeading: 'वन्यजीवों के आस-पास अपने खाने का ध्यान रखें',
    wildlifeParagraphs: [
      'काहुइटा जानवरों से भरा है। आपको बंदर, रैकून, इगुआना, कोआती और स्लॉथ दिख सकते हैं।',
      'कुछ जानवर आगंतुकों के बहुत आदी हो चुके हैं और खाना चुराने की कोशिश कर सकते हैं। स्नैक्स को बंद बैग में रखें और खाने को कभी भी लावारिस न छोड़ें।',
      'जानवरों को खाना खिलाना अनुमति नहीं है और यह उन्हें नुकसान पहुंचा सकता है।',
    ],
    scheduleHeading: 'पार्क के समय के बारे में जानें',
    scheduleParagraphs: [
      <>पार्क <strong>शाम 4:00 बजे बंद हो जाता है।</strong> आगंतुकों को उस समय से पहले बाहर निकलना ज़रूरी है।</>,
      'यह जल्दी प्रवेश करने का एक और कारण है। आपके पास बिना जल्दबाज़ी के चलने, तैरने और आराम करने के लिए ज़्यादा समय होगा।',
    ],
    boatHeading: 'पैदल चलने की बजाय बोट से वापसी',
    boatParagraphs: [
      'मुख्य रास्ता तट के किनारे-किनारे चलता है और अगर आप पूरा रास्ता पैदल तय करें तो यह लंबा हो सकता है।',
      <>कई आगंतुक एक तरफ पैदल जाना और <strong>बोट से वापस आना</strong> चुनते हैं। स्थानीय बोट संचालक काहुइटा कस्बे की ओर वापसी की सवारी देते हैं।</>,
      'यह एक अच्छा विकल्प है यदि आप पूरी दूरी पैदल चले बिना रास्ते का आनंद लेना चाहते हैं।',
    ],
    plasticHeading: 'प्लास्टिक की अनुमति नहीं है',
    plasticParagraphs: [
      <>पार्क के अंदर <strong>एकल-उपयोग प्लास्टिक</strong> की अनुमति नहीं है।</>,
      'इसमें प्लास्टिक बैग, डिस्पोज़ेबल बोतलें, और प्लास्टिक खाद्य पैकेजिंग शामिल हैं। पुन: उपयोग होने वाली बोतलें और डिब्बे साथ लाएं।',
      'पार्क स्टाफ प्रवेश द्वार पर बैग की जांच कर सकता है।',
    ],
    tipsHeading: 'जाने से पहले अंतिम सुझाव',
    tipsListItems: [
      'आरामदायक चलने वाले जूते या सैंडल पहनें',
      'पुन: उपयोग होने वाली बोतल में पानी लाएं',
      'रीफ-सेफ सनस्क्रीन का उपयोग करें',
      'गर्मी और भीड़ से बचने के लिए जल्दी शुरुआत करें',
    ],
    closing: <><strong>काहुइटा राष्ट्रीय उद्यान शांत, खूबसूरत है और घूमने में आसान है।</strong> थोड़ी सी योजना के साथ, यह कोस्टा रिका के कैरिबियन तट पर सबसे बेहतरीन प्रकृति अनुभवों में से एक है।</>,
  },
};

export function cahuitaParkContent(locale: Locale): CahuitaParkContent {
  return cahuitaPark[locale] ?? cahuitaPark.en!;
}

export interface BestTimeToVisitContent {
  seoTitle: string;
  seoDescription: string;
  heading: string;
  heroAlt: string;
  photoCredit: React.ReactNode;
  introParagraphs: [string, string];
  stayRecommendationTitle: string;
  hardToPredictHeading: string;
  hardToPredictParagraphs: [string, string];
  surprisesListItems: [string, string, string];
  bestTimeHeading: string;
  bestTimeParagraphs: [React.ReactNode, string];
  /** Independently authored per locale — Spanish has an extra water-temperature
   * bullet and splits English's third point in two. Not reconciled, per the
   * precedent set for listing copy in Phase 3b: each locale's own list. */
  bestTimeListItems: string[];
  febAprHeading: string;
  febAprParagraphs: [string, string];
  wetMonthsHeading: string;
  wetMonthsParagraphs: [string, React.ReactNode, React.ReactNode, string];
  tipsHeading: string;
  /** Also independently authored — English includes an MSN weather-app link
   * Spanish doesn't. Left as published rather than added to Spanish, for the
   * same reason. */
  tipsListItems: React.ReactNode[];
  conclusionHeading: string;
  conclusionParagraph: string;
}

const bestTimeToVisit: Partial<Record<Locale, BestTimeToVisitContent>> = {
  en: {
    seoTitle: 'Best Time to Visit Puerto Viejo de Limón, Costa Rica',
    seoDescription:
      'Find the best time to visit Puerto Viejo de Limón. Learn why September and October are the most reliable months for clear skies and calm ocean, plus what to expect in other seasons.',
    heading: 'The Best Time of the Year to Visit Puerto Viejo de Limón, Costa Rica',
    heroAlt: 'Beach in Puerto Viejo de Limón, Costa Rica',
    photoCredit: <>Photo by <a href="https://web.archive.org/web/20161028110553/http://www.panoramio.com/user/4645711?with_photo_id=101824520" target="_blank" rel="noopener noreferrer">hh oldman</a></>,
    introParagraphs: [
      'Choosing when to visit Puerto Viejo is not as simple as checking a weather chart. The South Caribbean coast can change from week to week.',
      'Multi-year cycles also affect it. Some years are drier. Some years are wetter. That is why "average" weather can feel wrong when you arrive.',
    ],
    stayRecommendationTitle: 'Looking to stay in Puerto Viejo?',
    hardToPredictHeading: 'Why Puerto Viejo Weather Is Hard to Predict',
    hardToPredictParagraphs: [
      'Puerto Viejo does not follow the same seasons as the Pacific side of Costa Rica: rain and ocean conditions depend on wider Caribbean systems.',
      'This means you can get surprises in any month:',
    ],
    surprisesListItems: [
      'Weeks that stay sunny during "rainy season"',
      'Heavy rain during months labeled "dry season"',
      'Ocean conditions that shift fast',
    ],
    bestTimeHeading: 'The True Best Time to Visit: September and October',
    bestTimeParagraphs: [
      <>Contrary to what many websites mention, the most reliable time to visit is <strong>September and October</strong>.</>,
      'It is often called the Caribbean summer. It is the one period that consistently brings the mix most travelers want.',
    ],
    bestTimeListItems: [
      'Clear skies for many days in a row',
      'Calm ocean conditions',
      'Great beach days without the peak-season crowds',
    ],
    febAprHeading: 'February to April: Not as Reliable as Advertised',
    febAprParagraphs: [
      'Many guides list February to April as the dry season. In my experience, this time can be as varied and unpredictable as any other month.',
      'You might get perfect beach days. You might also get rain, clouds, and changing sea conditions. It can be a good time to visit, but it is not a sure thing.',
    ],
    wetMonthsHeading: 'Months That Tend to Be Wetter',
    wetMonthsParagraphs: [
      'Some months are more likely to bring heavy rain and greyer skies.',
      <><strong>December</strong> tends to be very rainy. The ocean can also feel rougher.</>,
      <><strong>May and June</strong> also tend to be wet, with more frequent showers and higher humidity.</>,
      'These months can still be beautiful, especially if you like a greener landscape and do not mind getting caught in rain.',
    ],
    tipsHeading: 'Quick Planning Tips',
    tipsListItems: [
      'If you want the best odds of sun and calm sea, plan for September or October.',
      'If you travel in other months, pack for mixed weather and stay flexible.',
      'For snorkeling and swimming, calm ocean matters as much as rain.',
      <><a href="https://www.msn.com/es-xl/el-tiempo/pronostico/in-Puerto-Viejo,Limon?loc=eyJhIjoiSG90ZWwgUHVlcnRvIFZpZWpvIiwibCI6IlB1ZXJ0byBWaWVqbyIsInIiOiJMaW1vbiIsImMiOiJDb3N0YSBSaWNhIiwiaSI6IkNSIiwidCI6MTAxLCJnIjoiZXMteGwiLCJ4IjoiLTgyLjc1MzQwMjcwOTk2MDk0IiwieSI6IjkuNjU3MTk5ODU5NjE5MTQifQ%3D%3D&weadegreetype=C" target="_blank" rel="noopener noreferrer">MSN</a> is my go to app for predicting the weather.</>,
    ],
    conclusionHeading: 'Key Takeaways',
    conclusionParagraph:
      'Puerto Viejo weather can change a lot from year to year, so charts do not tell the full story. If you want the most reliable mix of clear skies and a calm ocean, September and October are the best choice.',
  },
  es: {
    seoTitle: 'La Mejor Época para Visitar Puerto Viejo de Limón, Costa Rica',
    seoDescription:
      'Descubre la mejor época para visitar Puerto Viejo de Limón. Septiembre y octubre ofrecen el clima más estable, con cielos despejados y mar tranquilo en el Caribe costarricense.',
    heading: 'La Mejor Época del Año para Visitar Puerto Viejo de Limón, Costa Rica',
    heroAlt: 'Playa en Puerto Viejo de Limón, Costa Rica',
    photoCredit: <>Foto de <a href="https://web.archive.org/web/20161028110553/http://www.panoramio.com/user/4645711?with_photo_id=101824520" target="_blank" rel="noopener noreferrer">hh oldman</a></>,
    introParagraphs: [
      'Elegir cuándo visitar Puerto Viejo no es tan simple como revisar una tabla del clima. En el Caribe Sur, el tiempo puede cambiar de una semana a otra.',
      'Además, existen ciclos de varios años que influyen mucho. Algunos años son más secos. Otros son más lluviosos. Por eso, los promedios muchas veces no reflejan la realidad.',
    ],
    stayRecommendationTitle: '¿Buscas dónde hospedarte en Puerto Viejo?',
    hardToPredictHeading: 'Por Qué el Clima en Puerto Viejo es Difícil de Predecir',
    hardToPredictParagraphs: [
      'Puerto Viejo no sigue las mismas estaciones que el Pacífico de Costa Rica. Aquí, la lluvia y el estado del mar dependen de sistemas caribeños más amplios.',
      'Esto provoca situaciones como:',
    ],
    surprisesListItems: [
      'Días soleados en plena "temporada lluviosa"',
      'Lluvia intensa en meses considerados "secos"',
      'Cambios rápidos en el estado del mar',
    ],
    bestTimeHeading: 'La Mejor Época para Visitar: Septiembre y Octubre',
    bestTimeParagraphs: [
      <>A diferencia de lo que indican muchos sitios web, la época más confiable para visitar Puerto Viejo es <strong>septiembre y octubre</strong>.</>,
      'A este periodo se le conoce como el verano del Caribe. Es el momento del año que ofrece las condiciones más estables.',
    ],
    bestTimeListItems: [
      'Cielos despejados durante varios días seguidos',
      'Mar tranquilo',
      'Agua cálida ideal para nadar y hacer snorkel',
      'Menos turistas que en temporada alta',
    ],
    febAprHeading: 'Febrero a Abril: No Tan Seguro Como Parece',
    febAprParagraphs: [
      'Muchos guías mencionan febrero a abril como la estación seca. En mi experiencia, este periodo puede ser tan variable como cualquier otro mes.',
      'Algunos días pueden ser perfectos. Otros pueden traer lluvia, nubes y un mar cambiante. Es una buena época para viajar, pero no es garantía de clima seco.',
    ],
    wetMonthsHeading: 'Meses que Suelen Ser Más Lluviosos',
    wetMonthsParagraphs: [
      'Hay meses que muestran un patrón más claro de lluvias frecuentes.',
      <><strong>Diciembre</strong> suele ser muy lluvioso y el mar puede estar más movido.</>,
      <><strong>Mayo y junio</strong> también tienden a ser meses húmedos, con lluvias constantes y mayor sensación de humedad.</>,
      'Aun así, estos meses tienen paisajes muy verdes y pueden ser una buena opción si no te molesta la lluvia.',
    ],
    tipsHeading: 'Consejos Rápidos para Planear tu Viaje',
    tipsListItems: [
      'Si buscas sol y mar tranquilo, septiembre y octubre son la mejor opción.',
      'En otros meses, viaja con expectativas flexibles y ropa adecuada para lluvia.',
      'Para nadar y hacer snorkel, el estado del mar es tan importante como el clima.',
    ],
    conclusionHeading: 'Conclusión',
    conclusionParagraph:
      'El clima en Puerto Viejo cambia mucho de un año a otro, por lo que las estadísticas no siempre ayudan. Si quieres la combinación más confiable de buen clima y mar calmado, septiembre y octubre son la mejor elección.',
  },
  fr: {
    seoTitle: 'Meilleure période pour visiter Puerto Viejo de Limón, Costa Rica',
    seoDescription:
      "Découvrez la meilleure période pour visiter Puerto Viejo de Limón. Apprenez pourquoi septembre et octobre sont les mois les plus fiables pour un ciel dégagé et une mer calme, ainsi qu'à quoi vous attendre durant les autres saisons.",
    heading: "La meilleure période de l'année pour visiter Puerto Viejo de Limón, Costa Rica",
    heroAlt: 'Plage à Puerto Viejo de Limón, Costa Rica',
    photoCredit: <>Photo par <a href="https://web.archive.org/web/20161028110553/http://www.panoramio.com/user/4645711?with_photo_id=101824520" target="_blank" rel="noopener noreferrer">hh oldman</a></>,
    introParagraphs: [
      "Choisir quand visiter Puerto Viejo n'est pas aussi simple que de consulter un tableau météo. La côte caribéenne sud peut changer d'une semaine à l'autre.",
      "Des cycles pluriannuels l'influencent également. Certaines années sont plus sèches. D'autres sont plus pluvieuses. C'est pourquoi le climat « moyen » peut sembler erroné à votre arrivée.",
    ],
    stayRecommendationTitle: 'Vous cherchez où loger à Puerto Viejo ?',
    hardToPredictHeading: 'Pourquoi la météo à Puerto Viejo est difficile à prévoir',
    hardToPredictParagraphs: [
      "Puerto Viejo ne suit pas les mêmes saisons que le Pacifique du Costa Rica : la pluie et l'état de la mer dépendent de systèmes caribéens plus vastes.",
      "Cela signifie que vous pouvez avoir des surprises n'importe quel mois :",
    ],
    surprisesListItems: [
      'Des semaines ensoleillées en pleine « saison des pluies »',
      'De fortes pluies durant des mois étiquetés « saison sèche »',
      'Des conditions océaniques qui changent rapidement',
    ],
    bestTimeHeading: 'La véritable meilleure période pour visiter : septembre et octobre',
    bestTimeParagraphs: [
      <>Contrairement à ce qu'indiquent de nombreux sites web, la période la plus fiable pour visiter est <strong>septembre et octobre</strong>.</>,
      "On l'appelle souvent l'été caribéen. C'est la seule période qui offre systématiquement le mélange que la plupart des voyageurs recherchent.",
    ],
    bestTimeListItems: [
      "Un ciel dégagé plusieurs jours d'affilée",
      'Une mer calme',
      "De belles journées de plage sans l'affluence de la haute saison",
    ],
    febAprHeading: "Février à avril : pas aussi fiable qu'on le prétend",
    febAprParagraphs: [
      "De nombreux guides classent février à avril comme la saison sèche. D'après mon expérience, cette période peut être aussi variable et imprévisible que n'importe quel autre mois.",
      "Vous pourriez avoir des journées de plage parfaites. Vous pourriez aussi avoir de la pluie, des nuages et une mer changeante. Cela peut être une bonne période pour visiter, mais ce n'est pas garanti.",
    ],
    wetMonthsHeading: 'Les mois généralement les plus pluvieux',
    wetMonthsParagraphs: [
      "Certains mois sont plus susceptibles d'apporter de fortes pluies et un ciel plus gris.",
      <><strong>Décembre</strong> a tendance à être très pluvieux. La mer peut également sembler plus agitée.</>,
      <><strong>Mai et juin</strong> ont également tendance à être humides, avec des averses plus fréquentes et une humidité plus élevée.</>,
      "Ces mois peuvent tout de même être magnifiques, surtout si vous aimez les paysages plus verdoyants et que la pluie ne vous dérange pas.",
    ],
    tipsHeading: 'Conseils rapides pour planifier votre voyage',
    tipsListItems: [
      'Si vous voulez les meilleures chances de soleil et de mer calme, prévoyez septembre ou octobre.',
      'Si vous voyagez à un autre moment, préparez-vous à un temps variable et restez flexible.',
      'Pour le snorkeling et la baignade, une mer calme compte tout autant que la pluie.',
      <><a href="https://www.msn.com/es-xl/el-tiempo/pronostico/in-Puerto-Viejo,Limon?loc=eyJhIjoiSG90ZWwgUHVlcnRvIFZpZWpvIiwibCI6IlB1ZXJ0byBWaWVqbyIsInIiOiJMaW1vbiIsImMiOiJDb3N0YSBSaWNhIiwiaSI6IkNSIiwidCI6MTAxLCJnIjoiZXMteGwiLCJ4IjoiLTgyLjc1MzQwMjcwOTk2MDk0IiwieSI6IjkuNjU3MTk5ODU5NjE5MTQifQ%3D%3D&weadegreetype=C" target="_blank" rel="noopener noreferrer">MSN</a> est mon application de référence pour prévoir la météo.</>,
    ],
    conclusionHeading: 'Points clés à retenir',
    conclusionParagraph:
      "La météo à Puerto Viejo peut beaucoup varier d'une année à l'autre, donc les tableaux ne racontent pas toute l'histoire. Si vous voulez la combinaison la plus fiable de ciel dégagé et de mer calme, septembre et octobre sont le meilleur choix.",
  },
  de: {
    seoTitle: 'Beste Reisezeit für Puerto Viejo de Limón, Costa Rica',
    seoDescription:
      'Finden Sie die beste Reisezeit für Puerto Viejo de Limón heraus. Erfahren Sie, warum September und Oktober die zuverlässigsten Monate für klaren Himmel und ruhiges Meer sind, und was Sie in anderen Jahreszeiten erwarten können.',
    heading: 'Die beste Jahreszeit für einen Besuch in Puerto Viejo de Limón, Costa Rica',
    heroAlt: 'Strand in Puerto Viejo de Limón, Costa Rica',
    photoCredit: <>Foto von <a href="https://web.archive.org/web/20161028110553/http://www.panoramio.com/user/4645711?with_photo_id=101824520" target="_blank" rel="noopener noreferrer">hh oldman</a></>,
    introParagraphs: [
      'Die Wahl des richtigen Zeitpunkts für einen Besuch in Puerto Viejo ist nicht so einfach wie ein Blick auf eine Wettertabelle. Die Südkaribikküste kann sich von Woche zu Woche verändern.',
      'Auch mehrjährige Zyklen wirken sich darauf aus. Manche Jahre sind trockener, manche feuchter. Deshalb kann sich das „durchschnittliche" Wetter bei Ihrer Ankunft völlig anders anfühlen.',
    ],
    stayRecommendationTitle: 'Suchen Sie eine Unterkunft in Puerto Viejo?',
    hardToPredictHeading: 'Warum das Wetter in Puerto Viejo schwer vorherzusagen ist',
    hardToPredictParagraphs: [
      'Puerto Viejo folgt nicht denselben Jahreszeiten wie die Pazifikseite Costa Ricas: Regen und Meeresbedingungen hängen von größeren karibischen Wettersystemen ab.',
      'Das bedeutet, dass Sie in jedem Monat Überraschungen erleben können:',
    ],
    surprisesListItems: [
      'Wochen, die während der „Regenzeit" sonnig bleiben',
      'Starke Regenfälle in Monaten, die als „Trockenzeit" gelten',
      'Sich schnell ändernde Meeresbedingungen',
    ],
    bestTimeHeading: 'Die wirklich beste Reisezeit: September und Oktober',
    bestTimeParagraphs: [
      <>Entgegen dem, was viele Webseiten behaupten, sind <strong>September und Oktober</strong> die zuverlässigste Reisezeit.</>,
      'Diese Zeit wird oft als karibischer Sommer bezeichnet. Es ist die einzige Periode, die durchgängig die Mischung bringt, die sich die meisten Reisenden wünschen.',
    ],
    bestTimeListItems: [
      'Klarer Himmel an vielen aufeinanderfolgenden Tagen',
      'Ruhige Meeresbedingungen',
      'Tolle Strandtage ohne die Menschenmassen der Hauptsaison',
    ],
    febAprHeading: 'Februar bis April: Nicht so zuverlässig wie beworben',
    febAprParagraphs: [
      'Viele Reiseführer nennen Februar bis April als Trockenzeit. Meiner Erfahrung nach kann diese Zeit ebenso wechselhaft und unvorhersehbar sein wie jeder andere Monat.',
      'Sie könnten perfekte Strandtage erwischen. Genauso gut könnten Sie Regen, Wolken und wechselnde Meeresbedingungen erleben. Es kann eine gute Reisezeit sein, aber eine Garantie ist es nicht.',
    ],
    wetMonthsHeading: 'Monate, die tendenziell feuchter sind',
    wetMonthsParagraphs: [
      'In manchen Monaten ist starker Regen und grauerer Himmel wahrscheinlicher.',
      <><strong>Dezember</strong> ist tendenziell sehr regnerisch. Auch das Meer kann sich rauer anfühlen.</>,
      <><strong>Mai und Juni</strong> sind ebenfalls tendenziell feucht, mit häufigeren Schauern und höherer Luftfeuchtigkeit.</>,
      'Diese Monate können dennoch wunderschön sein, besonders wenn Sie eine grünere Landschaft mögen und es Ihnen nichts ausmacht, gelegentlich in den Regen zu kommen.',
    ],
    tipsHeading: 'Schnelle Planungstipps',
    tipsListItems: [
      'Wenn Sie die besten Chancen auf Sonne und ruhiges Meer wollen, planen Sie für September oder Oktober.',
      'Wenn Sie in anderen Monaten reisen, packen Sie für wechselhaftes Wetter und bleiben Sie flexibel.',
      'Zum Schnorcheln und Schwimmen ist ein ruhiges Meer genauso wichtig wie der Regen.',
      <><a href="https://www.msn.com/es-xl/el-tiempo/pronostico/in-Puerto-Viejo,Limon?loc=eyJhIjoiSG90ZWwgUHVlcnRvIFZpZWpvIiwibCI6IlB1ZXJ0byBWaWVqbyIsInIiOiJMaW1vbiIsImMiOiJDb3N0YSBSaWNhIiwiaSI6IkNSIiwidCI6MTAxLCJnIjoiZXMteGwiLCJ4IjoiLTgyLjc1MzQwMjcwOTk2MDk0IiwieSI6IjkuNjU3MTk5ODU5NjE5MTQifQ%3D%3D&weadegreetype=C" target="_blank" rel="noopener noreferrer">MSN</a> ist meine bevorzugte App, um das Wetter vorherzusagen.</>,
    ],
    conclusionHeading: 'Das Wichtigste in Kürze',
    conclusionParagraph:
      'Das Wetter in Puerto Viejo kann sich von Jahr zu Jahr stark verändern, weshalb Tabellen nicht die ganze Geschichte erzählen. Wenn Sie die zuverlässigste Kombination aus klarem Himmel und ruhigem Meer wünschen, sind September und Oktober die beste Wahl.',
  },
  he: {
    seoTitle: 'הזמן הטוב ביותר לבקר בפוארטו ויחו דה לימון, קוסטה ריקה',
    seoDescription:
      'גלו את הזמן הטוב ביותר לבקר בפוארטו ויחו דה לימון. למדו מדוע ספטמבר ואוקטובר הם החודשים האמינים ביותר לשמיים בהירים ולים רגוע, ומה לצפות בעונות אחרות.',
    heading: 'העונה הטובה ביותר בשנה לביקור בפוארטו ויחו דה לימון, קוסטה ריקה',
    heroAlt: 'חוף בפוארטו ויחו דה לימון, קוסטה ריקה',
    photoCredit: <>צילום מאת <a href="https://web.archive.org/web/20161028110553/http://www.panoramio.com/user/4645711?with_photo_id=101824520" target="_blank" rel="noopener noreferrer">hh oldman</a></>,
    introParagraphs: [
      'בחירת המועד לביקור בפוארטו ויחו אינה פשוטה כמו בדיקת תרשים מזג אוויר. חוף הקריביים הדרומי יכול להשתנות משבוע לשבוע.',
      'גם מחזורים רב-שנתיים משפיעים על כך. יש שנים יבשות יותר. יש שנים גשומות יותר. לכן מזג אוויר "ממוצע" עלול להרגיש שגוי כשאתם מגיעים.',
    ],
    stayRecommendationTitle: 'מחפשים היכן להתארח בפוארטו ויחו?',
    hardToPredictHeading: 'מדוע קשה לחזות את מזג האוויר בפוארטו ויחו',
    hardToPredictParagraphs: [
      'פוארטו ויחו אינה עוקבת אחר אותן עונות כמו הצד הפסיפי של קוסטה ריקה: הגשם ותנאי הים תלויים במערכות קריביות רחבות יותר.',
      'המשמעות היא שאתם עלולים לחוות הפתעות בכל חודש:',
    ],
    surprisesListItems: [
      'שבועות שנשארים שטופי שמש במהלך "עונת הגשמים"',
      'גשם כבד בחודשים המכונים "עונה יבשה"',
      'תנאי ים שמשתנים במהירות',
    ],
    bestTimeHeading: 'הזמן הטוב ביותר האמיתי לביקור: ספטמבר ואוקטובר',
    bestTimeParagraphs: [
      <>בניגוד למה שאתרים רבים מציינים, הזמן האמין ביותר לביקור הוא <strong>ספטמבר ואוקטובר</strong>.</>,
      'לעיתים קרובות מכנים זאת הקיץ הקריבי. זוהי התקופה היחידה שמביאה באופן עקבי את התמהיל שרוב הנוסעים מחפשים.',
    ],
    bestTimeListItems: [
      'שמיים בהירים במשך ימים רבים ברציפות',
      'תנאי ים רגועים',
      'ימי חוף נהדרים ללא ההמונים של עונת השיא',
    ],
    febAprHeading: 'פברואר עד אפריל: לא אמין כפי שמפרסמים',
    febAprParagraphs: [
      'מדריכים רבים מציינים את פברואר עד אפריל כעונה היבשה. מניסיוני, תקופה זו יכולה להיות משתנה ובלתי צפויה כמו כל חודש אחר.',
      'אתם עשויים לזכות בימי חוף מושלמים. אתם גם עשויים לחוות גשם, עננים ותנאי ים משתנים. זה יכול להיות זמן טוב לביקור, אבל זה לא דבר בטוח.',
    ],
    wetMonthsHeading: 'חודשים שנוטים להיות גשומים יותר',
    wetMonthsParagraphs: [
      'חלק מהחודשים סבירים יותר להביא גשם כבד ושמיים אפורים יותר.',
      <><strong>דצמבר</strong> נוטה להיות גשום מאוד. גם הים עלול להרגיש סוער יותר.</>,
      <><strong>מאי ויוני</strong> נוטים גם הם להיות גשומים, עם ממטרים תכופים יותר ולחות גבוהה יותר.</>,
      'החודשים האלה עדיין יכולים להיות יפהפיים, במיוחד אם אתם אוהבים נוף ירוק יותר ולא אכפת לכם להיתפס בגשם.',
    ],
    tipsHeading: 'טיפים מהירים לתכנון',
    tipsListItems: [
      'אם אתם רוצים את הסיכויים הטובים ביותר לשמש וים רגוע, תכננו לספטמבר או אוקטובר.',
      'אם אתם נוסעים בחודשים אחרים, ארזו למזג אוויר מעורב והישארו גמישים.',
      'לשנורקלינג ולשחייה, ים רגוע חשוב לא פחות מגשם.',
      <><a href="https://www.msn.com/es-xl/el-tiempo/pronostico/in-Puerto-Viejo,Limon?loc=eyJhIjoiSG90ZWwgUHVlcnRvIFZpZWpvIiwibCI6IlB1ZXJ0byBWaWVqbyIsInIiOiJMaW1vbiIsImMiOiJDb3N0YSBSaWNhIiwiaSI6IkNSIiwidCI6MTAxLCJnIjoiZXMteGwiLCJ4IjoiLTgyLjc1MzQwMjcwOTk2MDk0IiwieSI6IjkuNjU3MTk5ODU5NjE5MTQifQ%3D%3D&weadegreetype=C" target="_blank" rel="noopener noreferrer">MSN</a> הוא האפליקציה שאני משתמש בה כדי לחזות את מזג האוויר.</>,
    ],
    conclusionHeading: 'עיקרי הדברים',
    conclusionParagraph:
      'מזג האוויר בפוארטו ויחו יכול להשתנות רבות משנה לשנה, כך שתרשימים לא מספרים את כל הסיפור. אם אתם רוצים את השילוב האמין ביותר של שמיים בהירים וים רגוע, ספטמבר ואוקטובר הם הבחירה הטובה ביותר.',
  },
  it: {
    seoTitle: 'Il Periodo Migliore per Visitare Puerto Viejo de Limón, Costa Rica',
    seoDescription:
      "Scopri il periodo migliore per visitare Puerto Viejo de Limón. Scopri perché settembre e ottobre sono i mesi più affidabili per cieli sereni e mare calmo, e cosa aspettarti nelle altre stagioni.",
    heading: "Il Periodo Migliore dell'Anno per Visitare Puerto Viejo de Limón, Costa Rica",
    heroAlt: 'Spiaggia a Puerto Viejo de Limón, Costa Rica',
    photoCredit: <>Foto di <a href="https://web.archive.org/web/20161028110553/http://www.panoramio.com/user/4645711?with_photo_id=101824520" target="_blank" rel="noopener noreferrer">hh oldman</a></>,
    introParagraphs: [
      "Scegliere quando visitare Puerto Viejo non è semplice come consultare una tabella meteo. La costa del Caribe Sud può cambiare da una settimana all'altra.",
      'Influiscono anche cicli pluriennali. Alcuni anni sono più secchi, altri più piovosi. Per questo il clima "medio" può risultare fuorviante quando arrivi.',
    ],
    stayRecommendationTitle: 'Cerchi un alloggio a Puerto Viejo?',
    hardToPredictHeading: 'Perché il Clima di Puerto Viejo è Difficile da Prevedere',
    hardToPredictParagraphs: [
      "Puerto Viejo non segue le stesse stagioni del versante Pacifico della Costa Rica: la pioggia e le condizioni del mare dipendono da sistemi caraibici più ampi.",
      'Questo significa che puoi trovare sorprese in qualsiasi mese:',
    ],
    surprisesListItems: [
      'Settimane di sole pieno durante la "stagione delle piogge"',
      'Piogge intense in mesi classificati come "stagione secca"',
      'Condizioni del mare che cambiano rapidamente',
    ],
    bestTimeHeading: 'Il Vero Periodo Migliore per Visitare: Settembre e Ottobre',
    bestTimeParagraphs: [
      <>Contrariamente a quanto affermano molti siti web, il periodo più affidabile per visitare è <strong>settembre e ottobre</strong>.</>,
      "Viene spesso chiamata l'estate caraibica. È l'unico periodo che offre in modo costante la combinazione che la maggior parte dei viaggiatori desidera.",
    ],
    bestTimeListItems: [
      'Cieli sereni per molti giorni consecutivi',
      'Mare calmo',
      "Ottime giornate di spiaggia senza la folla dell'alta stagione",
    ],
    febAprHeading: 'Da Febbraio ad Aprile: Meno Affidabile di Quanto Si Dica',
    febAprParagraphs: [
      "Molte guide indicano il periodo da febbraio ad aprile come stagione secca. Nella mia esperienza, questo periodo può essere tanto variabile e imprevedibile quanto qualsiasi altro mese.",
      "Potresti avere giornate di spiaggia perfette. Ma potresti anche trovare pioggia, nuvole e un mare mutevole. Può essere un buon periodo per visitare, ma non è una certezza.",
    ],
    wetMonthsHeading: 'I Mesi Tendenzialmente Più Piovosi',
    wetMonthsParagraphs: [
      "Alcuni mesi hanno maggiori probabilità di portare piogge intense e cieli più grigi.",
      <><strong>Dicembre</strong> tende a essere molto piovoso. Anche il mare può risultare più mosso.</>,
      <>Anche <strong>maggio e giugno</strong> tendono a essere piovosi, con acquazzoni più frequenti e un'umidità più alta.</>,
      "Questi mesi possono comunque essere bellissimi, soprattutto se ti piace un paesaggio più verde e non ti dispiace essere sorpreso dalla pioggia.",
    ],
    tipsHeading: 'Consigli Rapidi per Organizzare il Viaggio',
    tipsListItems: [
      'Se vuoi le migliori probabilità di sole e mare calmo, pianifica per settembre o ottobre.',
      'Se viaggi in altri mesi, prepara i bagagli per un clima variabile e mantieni flessibilità nei programmi.',
      'Per fare snorkeling e nuotare, un mare calmo conta quanto la pioggia.',
      <><a href="https://www.msn.com/es-xl/el-tiempo/pronostico/in-Puerto-Viejo,Limon?loc=eyJhIjoiSG90ZWwgUHVlcnRvIFZpZWpvIiwibCI6IlB1ZXJ0byBWaWVqbyIsInIiOiJMaW1vbiIsImMiOiJDb3N0YSBSaWNhIiwiaSI6IkNSIiwidCI6MTAxLCJnIjoiZXMteGwiLCJ4IjoiLTgyLjc1MzQwMjcwOTk2MDk0IiwieSI6IjkuNjU3MTk5ODU5NjE5MTQifQ%3D%3D&weadegreetype=C" target="_blank" rel="noopener noreferrer">MSN</a> è la mia app di riferimento per prevedere il meteo.</>,
    ],
    conclusionHeading: 'In Sintesi',
    conclusionParagraph:
      "Il clima di Puerto Viejo può cambiare molto da un anno all'altro, quindi le tabelle non raccontano tutta la storia. Se cerchi la combinazione più affidabile di cieli sereni e mare calmo, settembre e ottobre sono la scelta migliore.",
  },
  pt: {
    seoTitle: 'A Melhor Época para Visitar Puerto Viejo de Limón, Costa Rica',
    seoDescription:
      "Descubra a melhor época para visitar Puerto Viejo de Limón. Saiba porque é que setembro e outubro são os meses mais fiáveis para céu limpo e mar calmo, além do que esperar nas outras estações.",
    heading: 'A Melhor Época do Ano para Visitar Puerto Viejo de Limón, Costa Rica',
    heroAlt: 'Praia em Puerto Viejo de Limón, Costa Rica',
    photoCredit: <>Foto de <a href="https://web.archive.org/web/20161028110553/http://www.panoramio.com/user/4645711?with_photo_id=101824520" target="_blank" rel="noopener noreferrer">hh oldman</a></>,
    introParagraphs: [
      "Escolher quando visitar Puerto Viejo não é tão simples como consultar uma tabela meteorológica. A costa caribenha sul pode mudar de semana para semana.",
      'Também existem ciclos plurianuais que influenciam o clima. Alguns anos são mais secos. Outros são mais chuvosos. É por isso que o clima "médio" pode parecer errado quando se chega.',
    ],
    stayRecommendationTitle: 'Procura alojamento em Puerto Viejo?',
    hardToPredictHeading: 'Porque é o Clima de Puerto Viejo Difícil de Prever',
    hardToPredictParagraphs: [
      'Puerto Viejo não segue as mesmas estações que o lado do Pacífico da Costa Rica: a chuva e as condições do mar dependem de sistemas caribenhos mais amplos.',
      'Isto significa que pode haver surpresas em qualquer mês:',
    ],
    surprisesListItems: [
      'Semanas de sol durante a "época das chuvas"',
      'Chuva forte durante meses classificados como "época seca"',
      'Condições do mar que mudam rapidamente',
    ],
    bestTimeHeading: 'A Verdadeira Melhor Época para Visitar: Setembro e Outubro',
    bestTimeParagraphs: [
      <>Ao contrário do que muitos sites mencionam, a época mais fiável para visitar é <strong>setembro e outubro</strong>.</>,
      'É frequentemente chamado o verão caribenho. É o único período que traz consistentemente a combinação que a maioria dos viajantes procura.',
    ],
    bestTimeListItems: [
      'Céu limpo durante vários dias seguidos',
      'Mar calmo',
      'Ótimos dias de praia sem as multidões da época alta',
    ],
    febAprHeading: 'Fevereiro a Abril: Não Tão Fiável Como Anunciado',
    febAprParagraphs: [
      'Muitos guias apontam fevereiro a abril como a época seca. Na minha experiência, este período pode ser tão variável e imprevisível como qualquer outro mês.',
      'Pode ter dias de praia perfeitos. Também pode ter chuva, nuvens e mar em mudança. Pode ser uma boa altura para visitar, mas não é garantido.',
    ],
    wetMonthsHeading: 'Meses Que Tendem a Ser Mais Chuvosos',
    wetMonthsParagraphs: [
      'Alguns meses têm maior probabilidade de trazer chuva forte e céu mais cinzento.',
      <><strong>Dezembro</strong> costuma ser muito chuvoso. O mar também pode parecer mais agitado.</>,
      <><strong>Maio e junho</strong> também tendem a ser húmidos, com aguaceiros mais frequentes e maior humidade.</>,
      'Estes meses ainda podem ser lindos, sobretudo se gostar de uma paisagem mais verde e não se importar de apanhar chuva.',
    ],
    tipsHeading: 'Dicas Rápidas de Planeamento',
    tipsListItems: [
      'Se quiser as melhores probabilidades de sol e mar calmo, planeie para setembro ou outubro.',
      'Se viajar noutros meses, prepare-se para clima variável e mantenha-se flexível.',
      'Para snorkel e natação, o estado do mar importa tanto como a chuva.',
      <><a href="https://www.msn.com/es-xl/el-tiempo/pronostico/in-Puerto-Viejo,Limon?loc=eyJhIjoiSG90ZWwgUHVlcnRvIFZpZWpvIiwibCI6IlB1ZXJ0byBWaWVqbyIsInIiOiJMaW1vbiIsImMiOiJDb3N0YSBSaWNhIiwiaSI6IkNSIiwidCI6MTAxLCJnIjoiZXMteGwiLCJ4IjoiLTgyLjc1MzQwMjcwOTk2MDk0IiwieSI6IjkuNjU3MTk5ODU5NjE5MTQifQ%3D%3D&weadegreetype=C" target="_blank" rel="noopener noreferrer">MSN</a> é a minha aplicação preferida para consultar a previsão do tempo.</>,
    ],
    conclusionHeading: 'Principais Conclusões',
    conclusionParagraph:
      'O clima de Puerto Viejo pode mudar muito de ano para ano, por isso as tabelas não contam toda a história. Se quiser a combinação mais fiável de céu limpo e mar calmo, setembro e outubro são a melhor escolha.',
  },
  hi: {
    seoTitle: 'प्वेर्तो वियेहो दे लिमोन, कोस्टा रिका घूमने का सबसे अच्छा समय',
    seoDescription:
      'प्वेर्तो वियेहो दे लिमोन घूमने का सबसे अच्छा समय जानें। जानें कि सितंबर और अक्टूबर साफ आसमान और शांत समुद्र के लिए सबसे भरोसेमंद महीने क्यों हैं, साथ ही अन्य मौसमों में क्या उम्मीद करें।',
    heading: 'प्वेर्तो वियेहो दे लिमोन, कोस्टा रिका घूमने के लिए साल का सबसे अच्छा समय',
    heroAlt: 'कोस्टा रिका के प्वेर्तो वियेहो दे लिमोन का समुद्र तट',
    photoCredit: <>फोटो: <a href="https://web.archive.org/web/20161028110553/http://www.panoramio.com/user/4645711?with_photo_id=101824520" target="_blank" rel="noopener noreferrer">hh oldman</a></>,
    introParagraphs: [
      'प्वेर्तो वियेहो कब घूमने जाएं यह तय करना मौसम का चार्ट देखने जितना आसान नहीं है। दक्षिणी कैरिबियन तट पर मौसम हफ्ते-दर-हफ्ते बदल सकता है।',
      'कई वर्षों के चक्र भी इसे प्रभावित करते हैं। कुछ साल ज़्यादा सूखे होते हैं। कुछ साल ज़्यादा बारिश वाले होते हैं। इसलिए जब आप वहां पहुंचते हैं तो "औसत" मौसम गलत महसूस हो सकता है।',
    ],
    stayRecommendationTitle: 'प्वेर्तो वियेहो में ठहरने की जगह ढूंढ रहे हैं?',
    hardToPredictHeading: 'प्वेर्तो वियेहो के मौसम का अनुमान लगाना क्यों मुश्किल है',
    hardToPredictParagraphs: [
      'प्वेर्तो वियेहो कोस्टा रिका के प्रशांत तट जैसे मौसमों का पालन नहीं करता: यहां बारिश और समुद्र की स्थिति व्यापक कैरिबियन मौसम प्रणालियों पर निर्भर करती है।',
      'इसका मतलब है कि आपको किसी भी महीने में आश्चर्य मिल सकते हैं:',
    ],
    surprisesListItems: [
      '"बरसात के मौसम" के दौरान भी धूप वाले हफ्ते',
      '"सूखे मौसम" के रूप में जाने जाने वाले महीनों में भारी बारिश',
      'तेज़ी से बदलती समुद्र की स्थिति',
    ],
    bestTimeHeading: 'घूमने का वास्तविक सबसे अच्छा समय: सितंबर और अक्टूबर',
    bestTimeParagraphs: [
      <>कई वेबसाइटों पर जो बताया जाता है उसके विपरीत, घूमने का सबसे भरोसेमंद समय <strong>सितंबर और अक्टूबर</strong> है।</>,
      'इसे अक्सर कैरिबियन समर कहा जाता है। यह एक ऐसा दौर है जो लगातार वह मिश्रण लाता है जो ज़्यादातर यात्री चाहते हैं।',
    ],
    bestTimeListItems: [
      'लगातार कई दिनों तक साफ आसमान',
      'शांत समुद्र की स्थिति',
      'पीक-सीज़न की भीड़ के बिना शानदार बीच डेज़',
    ],
    febAprHeading: 'फरवरी से अप्रैल: जितना बताया जाता है उतना भरोसेमंद नहीं',
    febAprParagraphs: [
      'कई गाइड फरवरी से अप्रैल को सूखा मौसम बताते हैं। मेरे अनुभव में, यह समय किसी भी अन्य महीने जितना ही विविध और अप्रत्याशित हो सकता है।',
      'आपको बेहतरीन बीच डेज़ मिल सकते हैं। आपको बारिश, बादल और बदलती समुद्र की स्थिति भी मिल सकती है। यह घूमने के लिए एक अच्छा समय हो सकता है, लेकिन यह कोई गारंटी नहीं है।',
    ],
    wetMonthsHeading: 'ज़्यादा बारिश वाले महीने',
    wetMonthsParagraphs: [
      'कुछ महीनों में भारी बारिश और धुंधले आसमान की संभावना ज़्यादा होती है।',
      <><strong>दिसंबर</strong> में आमतौर पर बहुत बारिश होती है। समुद्र भी ज़्यादा उग्र महसूस हो सकता है।</>,
      <><strong>मई और जून</strong> भी आमतौर पर बरसाती होते हैं, जिनमें बार-बार बारिश होती है और उमस ज़्यादा रहती है।</>,
      'ये महीने फिर भी खूबसूरत हो सकते हैं, खासकर यदि आपको हरा-भरा परिदृश्य पसंद है और आपको बारिश में भीगने से कोई एतराज़ नहीं है।',
    ],
    tipsHeading: 'झटपट योजना बनाने के सुझाव',
    tipsListItems: [
      'यदि आप धूप और शांत समुद्र की सबसे अच्छी संभावना चाहते हैं, तो सितंबर या अक्टूबर की योजना बनाएं।',
      'यदि आप अन्य महीनों में यात्रा करते हैं, तो मिश्रित मौसम के लिए सामान पैक करें और लचीले रहें।',
      'स्नॉर्कलिंग और तैराकी के लिए, शांत समुद्र उतना ही मायने रखता है जितनी बारिश।',
      <>मौसम का अनुमान लगाने के लिए मेरा पसंदीदा ऐप <a href="https://www.msn.com/es-xl/el-tiempo/pronostico/in-Puerto-Viejo,Limon?loc=eyJhIjoiSG90ZWwgUHVlcnRvIFZpZWpvIiwibCI6IlB1ZXJ0byBWaWVqbyIsInIiOiJMaW1vbiIsImMiOiJDb3N0YSBSaWNhIiwiaSI6IkNSIiwidCI6MTAxLCJnIjoiZXMteGwiLCJ4IjoiLTgyLjc1MzQwMjcwOTk2MDk0IiwieSI6IjkuNjU3MTk5ODU5NjE5MTQifQ%3D%3D&weadegreetype=C" target="_blank" rel="noopener noreferrer">MSN</a> है।</>,
    ],
    conclusionHeading: 'मुख्य बातें',
    conclusionParagraph:
      'प्वेर्तो वियेहो का मौसम साल-दर-साल काफी बदल सकता है, इसलिए चार्ट पूरी कहानी नहीं बताते। यदि आप साफ आसमान और शांत समुद्र का सबसे भरोसेमंद मिश्रण चाहते हैं, तो सितंबर और अक्टूबर सबसे अच्छा विकल्प हैं।',
  },
};

export function bestTimeToVisitContent(locale: Locale): BestTimeToVisitContent {
  return bestTimeToVisit[locale] ?? bestTimeToVisit.en!;
}

interface TourOperator {
  name: string;
  href: string;
  description: string;
}

export interface IndigenousTravelContent {
  seoTitle: string;
  seoDescription: string;
  heading: string;
  heroAlt: string;
  introParagraph: string;
  stayRecommendationTitle: string;
  afterStayParagraph: string;
  territoriesHeading: string;
  territoriesParagraphs: [string, string];
  experiencesHeading: string;
  experiencesIntro: string;
  dailyLifeHeading: string;
  dailyLifeParagraph: string;
  cacaoHeading: string;
  cacaoParagraphs: [string, string];
  medicinalHeading: string;
  medicinalParagraphs: [string, string];
  operatorsHeading: string;
  operatorsIntro: string;
  operators: [TourOperator, TourOperator, TourOperator];
  askAboutTourParagraph: string;
  tipsHeading: string;
  tipsParagraphs: [string, string, string];
  differentWayHeading: string;
  differentWayParagraphs: [string, string];
}

const indigenousTravel: Partial<Record<Locale, IndigenousTravelContent>> = {
  en: {
    seoTitle: 'Indigenous Culture Near Puerto Viejo de Talamanca',
    seoDescription:
      "Discover Indigenous Bribri culture near Puerto Viejo de Talamanca. Learn about ancestral cacao, traditional medicine, and authentic cultural experiences in Indigenous communities of Costa Rica's South Caribbean.",
    heading: 'Indigenous Culture Near Puerto Viejo de Talamanca',
    heroAlt: 'Bribri Indigenous culture near Puerto Viejo',
    introParagraph:
      'Puerto Viejo de Talamanca is known for its beaches, relaxed atmosphere, and incredible jungle. But just inland, there is another side of the region that many travelers never see.',
    stayRecommendationTitle: 'Looking to stay in Puerto Viejo?',
    afterStayParagraph:
      "Close to town, Indigenous territories offer a deeper look into life on Costa Rica's South Caribbean coast. Here, culture is part of everyday life.",
    territoriesHeading: 'Indigenous Territories Near Puerto Viejo',
    territoriesParagraphs: [
      "Puerto Viejo is located near the Bribri Indigenous Territory of Talamanca and the Keköldi Indigenous Reserve. These lands belong to the Bribri people, one of Costa Rica's most important Indigenous groups.",
      'Many families still speak the Bribri language, grow their own food, and use traditional knowledge in their daily routines.',
    ],
    experiencesHeading: 'What Cultural Experiences Are Like',
    experiencesIntro:
      'Most visits are led by members of the community. Groups are small, and the focus is on learning, respect, and personal connection.',
    dailyLifeHeading: 'Daily life and community visits',
    dailyLifeParagraph:
      'Visitors walk through family land, see traditional homes, and learn how Bribri families organize daily life, work, and social roles.',
    cacaoHeading: 'Cacao and tradition',
    cacaoParagraphs: [
      'Cacao plays a central role in Bribri culture. Many tours show the ancestral preparation process, from the cacao pod to the final drink.',
      'Guides explain why cacao is important in ceremonies and everyday life, and visitors usually taste it prepared in the traditional way.',
    ],
    medicinalHeading: 'Medicinal plants and nature',
    medicinalParagraphs: [
      'Some experiences include forest walks focused on medicinal plants and their traditional uses for health and daily care.',
      'Many tours end with a visit to a waterfall inside Indigenous territory, valued for both its natural beauty and cultural meaning.',
    ],
    operatorsHeading: 'Local Tour Operators in Puerto Viejo',
    operatorsIntro: 'Several local agencies work directly with Indigenous communities to offer these experiences in a responsible way.',
    operators: [
      { name: 'Life Culture Travel Costa Rica', href: 'https://lifeculturetravelcostarica.com/', description: 'Offers cultural experiences including Bribri shaman and chocolate tours, medicinal plant walks, and local community immersion.' },
      { name: 'Exploradores Outdoors', href: 'https://exploradoresoutdoors.com/tours/indigenous-experience-chocolate-tour/', description: 'Provides an Indigenous experience and chocolate tour that covers Bribri traditions, medicinal plants, and a visit to a waterfall.' },
      { name: 'Bribri Magic Chocolate & Waterfall Experience', href: 'https://www.viator.com/tours/Limon/Chocolate-taste-true/d4513-238841P2', description: 'Small-group tour from Puerto Viejo to learn Bribri culture, make cacao, and swim in a waterfall.' },
    ],
    askAboutTourParagraph: 'When booking, ask if the tour is guided by community members and how the visit supports local families.',
    tipsHeading: 'Practical Tips for Visitors',
    tipsParagraphs: [
      'Tours operate year-round and usually start in the morning.',
      "Bring closed shoes, water, sun protection, and insect repellent. Always follow your guide's instructions and ask before taking photos.",
      'Buying crafts or food directly from families is one of the best ways to support the community.',
    ],
    differentWayHeading: 'A Different Way to Experience the South Caribbean',
    differentWayParagraphs: [
      'Visiting Indigenous communities near Puerto Viejo adds depth and meaning to your trip. It is about learning, not rushing.',
      'This experience suits travelers who want a calmer, more authentic connection with the place they are visiting.',
    ],
  },
  es: {
    seoTitle: 'Cultura Indígena Cerca de Puerto Viejo de Talamanca',
    seoDescription:
      'Descubre la cultura indígena Bribri cerca de Puerto Viejo de Talamanca. Aprende sobre cacao ancestral, medicina tradicional y experiencias culturales auténticas en comunidades indígenas del Caribe Sur de Costa Rica.',
    heading: 'Cultura Indígena Cerca de Puerto Viejo de Talamanca',
    heroAlt: 'Cultura indígena Bribri cerca de Puerto Viejo',
    introParagraph:
      'Puerto Viejo de Talamanca es conocido por sus playas, su ambiente relajado y su selva tropical. Pero muy cerca del pueblo existe otra experiencia que muchos viajeros pasan por alto.',
    stayRecommendationTitle: '¿Busca Casas Equipadas en Puerto Viejo?',
    afterStayParagraph:
      'Lejos de las costas turisticas, se encuentran territorios indígenas donde la cultura no es un espectáculo, sino parte de la vida diaria. Visitar estas comunidades permite entender otra forma de vivir en el Caribe Sur de Costa Rica.',
    territoriesHeading: 'Territorios Indígenas Cerca de Puerto Viejo',
    territoriesParagraphs: [
      'Puerto Viejo se ubica cerca del Territorio Indígena Bribri de Talamanca y de la Reserva Indígena Keköldi. Estas tierras son hogar del pueblo Bribri, uno de los grupos indígenas más importantes del país.',
      'Aquí se conservan el idioma Bribri, la agricultura tradicional, el uso de plantas medicinales y una fuerte conexión con la naturaleza. No son zonas turísticas artificiales, son comunidades vivas.',
    ],
    experiencesHeading: '¿Cómo Son las Experiencias Culturales?',
    experiencesIntro: 'Las visitas suelen ser guiadas por personas de la misma comunidad. Los grupos son pequeños y el enfoque es educativo y respetuoso.',
    dailyLifeHeading: 'Vida diaria y comunidad',
    dailyLifeParagraph:
      'Durante el recorrido, los visitantes conocen cómo viven las familias, cómo organizan su trabajo diario y cómo se relacionan con la tierra que habitan.',
    cacaoHeading: 'Cacao y tradición',
    cacaoParagraphs: [
      'El cacao tiene un papel central en la cultura Bribri. Muchas experiencias muestran el proceso ancestral de preparación, desde el fruto hasta la bebida final.',
      'Además de probar el cacao, los guías explican su valor cultural y espiritual dentro de la comunidad.',
    ],
    medicinalHeading: 'Plantas medicinales y naturaleza',
    medicinalParagraphs: [
      'Algunos recorridos incluyen caminatas por el bosque para aprender sobre plantas medicinales y su uso tradicional.',
      'Muchas visitas terminan en cascadas ubicadas dentro del territorio indígena, espacios valorados tanto por su belleza natural como por su significado cultural.',
    ],
    operatorsHeading: 'Agencias Locales en Puerto Viejo',
    operatorsIntro: 'En Puerto Viejo existen agencias locales que trabajan en conjunto con comunidades indígenas para ofrecer estas experiencias de forma responsable.',
    operators: [
      { name: 'Life Culture Travel Costa Rica', href: 'https://lifeculturetravelcostarica.com/', description: 'Ofrece experiencias culturales que incluyen visitas a comunidades Bribri, tours de cacao, caminatas de plantas medicinales y aprendizaje sobre la vida local.' },
      { name: 'Exploradores Outdoors', href: 'https://exploradoresoutdoors.com/tours/indigenous-experience-chocolate-tour/', description: 'Brinda tours indígenas enfocados en tradiciones Bribri, cacao ancestral, plantas medicinales y visitas a cascadas dentro del territorio indígena.' },
      { name: 'Bribri Magic Chocolate & Waterfall Experience', href: 'https://www.viator.com/tours/Limon/Chocolate-taste-true/d4513-238841P2', description: 'Operador de grupos pequeños que combina la preparación tradicional de cacao, aprendizaje cultural Bribri y una visita a una cascada.' },
    ],
    askAboutTourParagraph: 'Al reservar, es recomendable preguntar si el tour es guiado por miembros de la comunidad y cómo se distribuyen los beneficios.',
    tipsHeading: 'Consejos Prácticos para la Visita',
    tipsParagraphs: [
      'Estas experiencias están disponibles durante todo el año y suelen comenzar por la mañana.',
      'Se recomienda llevar zapatos cerrados, agua, protección solar y repelente. Siempre sigue las indicaciones del guía y pide permiso antes de tomar fotografías.',
      'Comprar artesanías o productos directamente a las familias es una forma concreta de apoyar a la comunidad.',
    ],
    differentWayHeading: 'Una Forma Distinta de Conocer el Caribe Sur',
    differentWayParagraphs: [
      // Pre-merge page ended this sentence without a period.
      'Explorar la cultura indígena cerca de Puerto Viejo añade una dimensión más profunda al viaje. Es una oportunidad para aprender y conocer la cultura local.',
      'Es una experiencia tranquila, auténtica y muy distinta a las actividades típicas de playa. Ideal para quienes buscan entender mejor el lugar que visitan.',
    ],
  },
  fr: {
    seoTitle: 'Culture indigène près de Puerto Viejo de Talamanca',
    seoDescription:
      "Découvrez la culture indigène Bribri près de Puerto Viejo de Talamanca. Apprenez-en davantage sur le cacao ancestral, la médecine traditionnelle et des expériences culturelles authentiques au sein des communautés indigènes des Caraïbes sud du Costa Rica.",
    heading: 'Culture indigène près de Puerto Viejo de Talamanca',
    heroAlt: 'Culture indigène Bribri près de Puerto Viejo',
    introParagraph:
      "Puerto Viejo de Talamanca est connue pour ses plages, son ambiance décontractée et sa jungle extraordinaire. Mais juste à l'intérieur des terres, se cache une autre facette de la région que de nombreux voyageurs ne découvrent jamais.",
    stayRecommendationTitle: 'Vous cherchez où loger à Puerto Viejo ?',
    afterStayParagraph:
      "Tout près de la ville, les territoires indigènes offrent un regard plus profond sur la vie de la côte caribéenne sud du Costa Rica. Ici, la culture fait partie du quotidien.",
    territoriesHeading: 'Territoires indigènes près de Puerto Viejo',
    territoriesParagraphs: [
      "Puerto Viejo est situé près du territoire indigène Bribri de Talamanca et de la réserve indigène de Keköldi. Ces terres appartiennent au peuple Bribri, l'un des groupes indigènes les plus importants du Costa Rica.",
      "De nombreuses familles parlent encore la langue bribri, cultivent leur propre nourriture et utilisent des savoirs traditionnels dans leur quotidien.",
    ],
    experiencesHeading: 'À quoi ressemblent les expériences culturelles',
    experiencesIntro:
      "La plupart des visites sont menées par des membres de la communauté. Les groupes sont réduits, et l'accent est mis sur l'apprentissage, le respect et le lien personnel.",
    dailyLifeHeading: 'Vie quotidienne et visites communautaires',
    dailyLifeParagraph:
      "Les visiteurs traversent des terres familiales, découvrent des habitations traditionnelles et apprennent comment les familles bribri organisent leur vie quotidienne, leur travail et leurs rôles sociaux.",
    cacaoHeading: 'Le cacao et la tradition',
    cacaoParagraphs: [
      "Le cacao joue un rôle central dans la culture bribri. De nombreuses visites présentent le processus de préparation ancestral, depuis la cabosse de cacao jusqu'à la boisson finale.",
      "Les guides expliquent pourquoi le cacao est important dans les cérémonies et la vie quotidienne, et les visiteurs le goûtent généralement préparé de façon traditionnelle.",
    ],
    medicinalHeading: 'Plantes médicinales et nature',
    medicinalParagraphs: [
      "Certaines expériences incluent des promenades en forêt centrées sur les plantes médicinales et leurs usages traditionnels pour la santé et les soins quotidiens.",
      "De nombreuses visites se terminent par une cascade située à l'intérieur du territoire indigène, appréciée à la fois pour sa beauté naturelle et sa signification culturelle.",
    ],
    operatorsHeading: 'Agences locales à Puerto Viejo',
    operatorsIntro:
      "Plusieurs agences locales travaillent directement avec les communautés indigènes pour proposer ces expériences de manière responsable.",
    operators: [
      { name: 'Life Culture Travel Costa Rica', href: 'https://lifeculturetravelcostarica.com/', description: "Propose des expériences culturelles incluant des visites de chamans bribri et des tours du chocolat, des promenades autour des plantes médicinales, ainsi qu'une immersion dans la communauté locale." },
      { name: 'Exploradores Outdoors', href: 'https://exploradoresoutdoors.com/tours/indigenous-experience-chocolate-tour/', description: "Propose une expérience indigène et un tour du chocolat couvrant les traditions bribri, les plantes médicinales, ainsi qu'une visite d'une cascade." },
      { name: 'Bribri Magic Chocolate & Waterfall Experience', href: 'https://www.viator.com/tours/Limon/Chocolate-taste-true/d4513-238841P2', description: "Excursion en petit groupe depuis Puerto Viejo pour découvrir la culture bribri, préparer du cacao et se baigner dans une cascade." },
    ],
    askAboutTourParagraph:
      "Au moment de réserver, demandez si la visite est guidée par des membres de la communauté et comment elle profite aux familles locales.",
    tipsHeading: 'Conseils pratiques pour les visiteurs',
    tipsParagraphs: [
      "Les visites ont lieu toute l'année et commencent généralement le matin.",
      "Prévoyez des chaussures fermées, de l'eau, une protection solaire et un répulsif anti-insectes. Suivez toujours les instructions de votre guide et demandez la permission avant de prendre des photos.",
      "Acheter de l'artisanat ou de la nourriture directement auprès des familles est l'un des meilleurs moyens de soutenir la communauté.",
    ],
    differentWayHeading: 'Une manière différente de découvrir les Caraïbes sud',
    differentWayParagraphs: [
      "Visiter les communautés indigènes près de Puerto Viejo apporte profondeur et sens à votre voyage. Il s'agit d'apprendre, pas de se presser.",
      "Cette expérience convient aux voyageurs qui recherchent un lien plus calme et plus authentique avec le lieu qu'ils visitent.",
    ],
  },
  de: {
    seoTitle: 'Indigene Kultur in der Nähe von Puerto Viejo de Talamanca',
    seoDescription:
      "Entdecken Sie die indigene Bribri-Kultur in der Nähe von Puerto Viejo de Talamanca. Erfahren Sie mehr über traditionellen Kakao, traditionelle Medizin und authentische kulturelle Erlebnisse in indigenen Gemeinschaften der costa-ricanischen Südkaribik.",
    heading: 'Indigene Kultur in der Nähe von Puerto Viejo de Talamanca',
    heroAlt: 'Indigene Bribri-Kultur in der Nähe von Puerto Viejo',
    introParagraph:
      'Puerto Viejo de Talamanca ist bekannt für seine Strände, die entspannte Atmosphäre und den unglaublichen Dschungel. Doch nur ein Stück landeinwärts gibt es eine andere Seite der Region, die viele Reisende nie zu Gesicht bekommen.',
    stayRecommendationTitle: 'Suchen Sie eine Unterkunft in Puerto Viejo?',
    afterStayParagraph:
      "Nahe der Stadt bieten indigene Territorien einen tieferen Einblick in das Leben an der Südkaribikküste Costa Ricas. Hier ist Kultur Teil des Alltags.",
    territoriesHeading: 'Indigene Territorien in der Nähe von Puerto Viejo',
    territoriesParagraphs: [
      "Puerto Viejo liegt in der Nähe des indigenen Bribri-Territoriums von Talamanca und des indigenen Reservats Keköldi. Diese Ländereien gehören dem Volk der Bribri, einer der wichtigsten indigenen Gruppen Costa Ricas.",
      'Viele Familien sprechen noch die Bribri-Sprache, bauen ihre eigenen Lebensmittel an und nutzen traditionelles Wissen in ihrem täglichen Leben.',
    ],
    experiencesHeading: 'Wie kulturelle Erlebnisse aussehen',
    experiencesIntro:
      'Die meisten Besuche werden von Mitgliedern der Gemeinschaft geleitet. Die Gruppen sind klein, und der Fokus liegt auf Lernen, Respekt und persönlicher Verbindung.',
    dailyLifeHeading: 'Alltag und Gemeinschaftsbesuche',
    dailyLifeParagraph:
      'Besucher gehen durch das Land der Familien, sehen traditionelle Häuser und erfahren, wie Bribri-Familien ihren Alltag, ihre Arbeit und soziale Rollen organisieren.',
    cacaoHeading: 'Kakao und Tradition',
    cacaoParagraphs: [
      'Kakao spielt eine zentrale Rolle in der Kultur der Bribri. Viele Touren zeigen den traditionellen Zubereitungsprozess, von der Kakaoschote bis zum fertigen Getränk.',
      'Guides erklären, warum Kakao bei Zeremonien und im Alltag wichtig ist, und Besucher probieren ihn normalerweise auf traditionelle Weise zubereitet.',
    ],
    medicinalHeading: 'Heilpflanzen und Natur',
    medicinalParagraphs: [
      'Manche Erlebnisse beinhalten Waldspaziergänge, die sich auf Heilpflanzen und ihre traditionelle Verwendung für Gesundheit und Alltag konzentrieren.',
      'Viele Touren enden mit einem Besuch an einem Wasserfall innerhalb des indigenen Territoriums, der sowohl für seine natürliche Schönheit als auch für seine kulturelle Bedeutung geschätzt wird.',
    ],
    operatorsHeading: 'Lokale Tourenanbieter in Puerto Viejo',
    operatorsIntro: 'Mehrere lokale Agenturen arbeiten direkt mit indigenen Gemeinschaften zusammen, um diese Erlebnisse auf verantwortungsvolle Weise anzubieten.',
    operators: [
      { name: 'Life Culture Travel Costa Rica', href: 'https://lifeculturetravelcostarica.com/', description: 'Bietet kulturelle Erlebnisse an, darunter Bribri-Schamanen- und Schokoladentouren, Spaziergänge zu Heilpflanzen und das Eintauchen in die lokale Gemeinschaft.' },
      { name: 'Exploradores Outdoors', href: 'https://exploradoresoutdoors.com/tours/indigenous-experience-chocolate-tour/', description: 'Bietet ein indigenes Erlebnis und eine Schokoladentour, die Bribri-Traditionen, Heilpflanzen und einen Besuch an einem Wasserfall umfasst.' },
      { name: 'Bribri Magic Chocolate & Waterfall Experience', href: 'https://www.viator.com/tours/Limon/Chocolate-taste-true/d4513-238841P2', description: 'Kleingruppentour ab Puerto Viejo, um die Bribri-Kultur kennenzulernen, Kakao herzustellen und in einem Wasserfall zu schwimmen.' },
    ],
    askAboutTourParagraph: 'Fragen Sie bei der Buchung, ob die Tour von Mitgliedern der Gemeinschaft geleitet wird und wie der Besuch die lokalen Familien unterstützt.',
    tipsHeading: 'Praktische Tipps für Besucher',
    tipsParagraphs: [
      'Touren finden das ganze Jahr über statt und beginnen normalerweise am Morgen.',
      "Bringen Sie geschlossene Schuhe, Wasser, Sonnenschutz und Insektenschutzmittel mit. Befolgen Sie stets die Anweisungen Ihres Guides und fragen Sie, bevor Sie Fotos machen.",
      'Der Kauf von Kunsthandwerk oder Lebensmitteln direkt von den Familien ist eine der besten Möglichkeiten, die Gemeinschaft zu unterstützen.',
    ],
    differentWayHeading: 'Eine andere Art, die Südkaribik zu erleben',
    differentWayParagraphs: [
      'Der Besuch indigener Gemeinschaften in der Nähe von Puerto Viejo verleiht Ihrer Reise Tiefe und Bedeutung. Es geht ums Lernen, nicht ums Hetzen.',
      'Dieses Erlebnis eignet sich für Reisende, die eine ruhigere, authentischere Verbindung zu dem Ort suchen, den sie besuchen.',
    ],
  },
  he: {
    seoTitle: 'תרבות ילידית ליד פוארטו ויחו דה טלמנקה',
    seoDescription:
      "גלו את התרבות הילידית של הברי-ברי ליד פוארטו ויחו דה טלמנקה. למדו על קקאו אבותי, רפואה מסורתית וחוויות תרבותיות אותנטיות בקהילות ילידיות בקריביים הדרומי של קוסטה ריקה.",
    heading: 'תרבות ילידית ליד פוארטו ויחו דה טלמנקה',
    heroAlt: 'תרבות ילידית ברי-ברי ליד פוארטו ויחו',
    introParagraph:
      'פוארטו ויחו דה טלמנקה ידועה בחופיה, באווירתה הרגועה ובג\'ונגל המדהים שלה. אך ממש בפנים הארץ, יש צד נוסף של האזור שרוב הנוסעים אף פעם לא רואים.',
    stayRecommendationTitle: 'מחפשים היכן להתארח בפוארטו ויחו?',
    afterStayParagraph:
      "בקרבת העיירה, טריטוריות ילידיות מציעות מבט מעמיק יותר על החיים בחוף הקריבי הדרומי של קוסטה ריקה. כאן, התרבות היא חלק מהחיים היום-יומיים.",
    territoriesHeading: 'טריטוריות ילידיות ליד פוארטו ויחו',
    territoriesParagraphs: [
      "פוארטו ויחו ממוקמת ליד הטריטוריה הילידית ברי-ברי של טלמנקה ושמורת קקולדי הילידית. אדמות אלו שייכות לעם הברי-ברי, אחת מקבוצות הילידים החשובות ביותר בקוסטה ריקה.",
      'משפחות רבות עדיין דוברות את שפת הברי-ברי, מגדלות את מזונן בעצמן, ומשתמשות בידע מסורתי בשגרת חייהן היום-יומית.',
    ],
    experiencesHeading: 'כיצד נראות החוויות התרבותיות',
    experiencesIntro:
      'רוב הביקורים מונחים על ידי בני הקהילה עצמה. הקבוצות קטנות, והדגש הוא על למידה, כבוד וחיבור אישי.',
    dailyLifeHeading: 'חיי יום-יום וביקורי קהילה',
    dailyLifeParagraph:
      'המבקרים הולכים ברגל דרך אדמות המשפחה, רואים בתים מסורתיים, ולומדים כיצד משפחות הברי-ברי מארגנות את חיי היום-יום, העבודה והתפקידים החברתיים שלהן.',
    cacaoHeading: 'קקאו ומסורת',
    cacaoParagraphs: [
      'לקקאו תפקיד מרכזי בתרבות הברי-ברי. סיורים רבים מציגים את תהליך ההכנה האבותי, מתרמיל הקקאו ועד המשקה הסופי.',
      'המדריכים מסבירים מדוע הקקאו חשוב בטקסים ובחיי היום-יום, והמבקרים בדרך כלל טועמים אותו מוכן בדרך המסורתית.',
    ],
    medicinalHeading: 'צמחי מרפא וטבע',
    medicinalParagraphs: [
      'חלק מהחוויות כוללות הליכות ביער המתמקדות בצמחי מרפא ובשימושיהם המסורתיים לבריאות ולטיפול יומיומי.',
      'סיורים רבים מסתיימים בביקור במפל בתוך הטריטוריה הילידית, המוערך הן בשל יופיו הטבעי והן בשל משמעותו התרבותית.',
    ],
    operatorsHeading: 'מפעילי סיורים מקומיים בפוארטו ויחו',
    operatorsIntro: 'מספר סוכנויות מקומיות עובדות ישירות עם קהילות ילידיות כדי להציע חוויות אלה באופן אחראי.',
    operators: [
      { name: 'Life Culture Travel Costa Rica', href: 'https://lifeculturetravelcostarica.com/', description: 'מציעה חוויות תרבותיות הכוללות סיורי שמאן וקקאו של הברי-ברי, הליכות צמחי מרפא, והתערות בקהילה המקומית.' },
      { name: 'Exploradores Outdoors', href: 'https://exploradoresoutdoors.com/tours/indigenous-experience-chocolate-tour/', description: 'מספקת חוויה ילידית וסיור שוקולד המקיף את מסורות הברי-ברי, צמחי מרפא, וביקור במפל.' },
      { name: 'Bribri Magic Chocolate & Waterfall Experience', href: 'https://www.viator.com/tours/Limon/Chocolate-taste-true/d4513-238841P2', description: 'סיור קבוצות קטנות מפוארטו ויחו ללמוד על תרבות הברי-ברי, להכין קקאו, ולשחות במפל.' },
    ],
    askAboutTourParagraph: 'בעת ההזמנה, שאלו אם הסיור מונחה על ידי בני הקהילה וכיצד הביקור תומך במשפחות המקומיות.',
    tipsHeading: 'טיפים מעשיים למבקרים',
    tipsParagraphs: [
      'הסיורים פועלים לאורך כל השנה ובדרך כלל מתחילים בבוקר.',
      "הביאו נעליים סגורות, מים, הגנה מהשמש ותרסיס נגד חרקים. תמיד פעלו לפי הוראות המדריך שלכם ובקשו רשות לפני צילום תמונות.",
      'קניית מלאכת יד או מזון ישירות מהמשפחות היא אחת הדרכים הטובות ביותר לתמוך בקהילה.',
    ],
    differentWayHeading: 'דרך שונה לחוות את הקריביים הדרומי',
    differentWayParagraphs: [
      'ביקור בקהילות ילידיות ליד פוארטו ויחו מוסיף עומק ומשמעות לטיול שלכם. מדובר בלמידה, לא במהירות.',
      'חוויה זו מתאימה לנוסעים שרוצים חיבור רגוע ואותנטי יותר עם המקום שהם מבקרים בו.',
    ],
  },
  it: {
    seoTitle: 'Cultura Indigena Vicino a Puerto Viejo de Talamanca',
    seoDescription:
      "Scopri la cultura indigena Bribri vicino a Puerto Viejo de Talamanca. Conosci il cacao ancestrale, la medicina tradizionale e le esperienze culturali autentiche nelle comunità indigene del Caribe Sud della Costa Rica.",
    heading: 'Cultura Indigena Vicino a Puerto Viejo de Talamanca',
    heroAlt: 'Cultura indigena Bribri vicino a Puerto Viejo',
    introParagraph:
      "Puerto Viejo de Talamanca è conosciuta per le sue spiagge, l'atmosfera rilassata e l'incredibile giungla. Ma appena nell'entroterra si trova un altro volto della regione che molti viaggiatori non arrivano mai a vedere.",
    stayRecommendationTitle: 'Cerchi un alloggio a Puerto Viejo?',
    afterStayParagraph:
      "Vicino al paese, i territori indigeni offrono uno sguardo più profondo sulla vita nel Caribe Sud della Costa Rica. Qui, la cultura fa parte della vita quotidiana.",
    territoriesHeading: 'Territori Indigeni Vicino a Puerto Viejo',
    territoriesParagraphs: [
      "Puerto Viejo si trova vicino al Territorio Indigeno Bribri di Talamanca e alla Riserva Indigena Keköldi. Queste terre appartengono al popolo Bribri, uno dei gruppi indigeni più importanti della Costa Rica.",
      "Molte famiglie parlano ancora la lingua Bribri, coltivano il proprio cibo e utilizzano conoscenze tradizionali nella vita di tutti i giorni.",
    ],
    experiencesHeading: 'Come Sono le Esperienze Culturali',
    experiencesIntro: "La maggior parte delle visite è condotta da membri della comunità stessa. I gruppi sono piccoli e l'attenzione è rivolta all'apprendimento, al rispetto e alla connessione personale.",
    dailyLifeHeading: 'Vita quotidiana e visite alla comunità',
    dailyLifeParagraph:
      "I visitatori camminano attraverso i terreni familiari, vedono le abitazioni tradizionali e scoprono come le famiglie Bribri organizzano la vita quotidiana, il lavoro e i ruoli sociali.",
    cacaoHeading: 'Cacao e tradizione',
    cacaoParagraphs: [
      "Il cacao svolge un ruolo centrale nella cultura Bribri. Molti tour mostrano il processo di preparazione ancestrale, dal baccello di cacao fino alla bevanda finale.",
      "Le guide spiegano perché il cacao è importante nelle cerimonie e nella vita quotidiana, e i visitatori di solito lo assaggiano preparato secondo la tradizione.",
    ],
    medicinalHeading: 'Piante medicinali e natura',
    medicinalParagraphs: [
      "Alcune esperienze includono passeggiate nella foresta incentrate sulle piante medicinali e sui loro usi tradizionali per la salute e la cura quotidiana.",
      "Molti tour si concludono con la visita a una cascata all'interno del territorio indigeno, apprezzata sia per la sua bellezza naturale sia per il suo significato culturale.",
    ],
    operatorsHeading: 'Operatori Turistici Locali a Puerto Viejo',
    operatorsIntro: "Diverse agenzie locali lavorano direttamente con le comunità indigene per offrire queste esperienze in modo responsabile.",
    operators: [
      { name: 'Life Culture Travel Costa Rica', href: 'https://lifeculturetravelcostarica.com/', description: "Offre esperienze culturali che includono tour dello sciamano Bribri e del cioccolato, passeggiate tra le piante medicinali e l'immersione nella comunità locale." },
      { name: 'Exploradores Outdoors', href: 'https://exploradoresoutdoors.com/tours/indigenous-experience-chocolate-tour/', description: "Offre un'esperienza indigena e un tour del cioccolato che comprende le tradizioni Bribri, le piante medicinali e la visita a una cascata." },
      { name: 'Bribri Magic Chocolate & Waterfall Experience', href: 'https://www.viator.com/tours/Limon/Chocolate-taste-true/d4513-238841P2', description: "Tour in piccoli gruppi da Puerto Viejo per conoscere la cultura Bribri, preparare il cacao e fare il bagno in una cascata." },
    ],
    askAboutTourParagraph: "Al momento della prenotazione, chiedi se il tour è guidato da membri della comunità e in che modo la visita sostiene le famiglie locali.",
    tipsHeading: 'Consigli Pratici per i Visitatori',
    tipsParagraphs: [
      "I tour si svolgono tutto l'anno e di solito iniziano al mattino.",
      "Porta scarpe chiuse, acqua, protezione solare e repellente per insetti. Segui sempre le indicazioni della guida e chiedi il permesso prima di scattare foto.",
      "Acquistare artigianato o cibo direttamente dalle famiglie è uno dei modi migliori per sostenere la comunità.",
    ],
    differentWayHeading: 'Un Modo Diverso di Vivere il Caribe Sud',
    differentWayParagraphs: [
      "Visitare le comunità indigene vicino a Puerto Viejo aggiunge profondità e significato al tuo viaggio. Si tratta di imparare, non di correre.",
      "Questa esperienza è adatta ai viaggiatori che desiderano una connessione più calma e autentica con il luogo che stanno visitando.",
    ],
  },
  pt: {
    seoTitle: 'Cultura Indígena Perto de Puerto Viejo de Talamanca',
    seoDescription:
      "Descubra a cultura indígena Bribri perto de Puerto Viejo de Talamanca. Saiba mais sobre o cacau ancestral, a medicina tradicional e as experiências culturais autênticas nas comunidades indígenas do Caribe Sul da Costa Rica.",
    heading: 'Cultura Indígena Perto de Puerto Viejo de Talamanca',
    heroAlt: 'Cultura indígena Bribri perto de Puerto Viejo',
    introParagraph:
      "Puerto Viejo de Talamanca é conhecida pelas suas praias, ambiente descontraído e selva incrível. Mas, mesmo no interior, existe um outro lado da região que muitos viajantes nunca chegam a ver.",
    stayRecommendationTitle: 'Procura alojamento em Puerto Viejo?',
    afterStayParagraph:
      "Perto da vila, os territórios indígenas oferecem um olhar mais profundo sobre a vida na costa caribenha sul da Costa Rica. Aqui, a cultura faz parte do quotidiano.",
    territoriesHeading: 'Territórios Indígenas Perto de Puerto Viejo',
    territoriesParagraphs: [
      "Puerto Viejo situa-se perto do Território Indígena Bribri de Talamanca e da Reserva Indígena Keköldi. Estas terras pertencem ao povo Bribri, um dos grupos indígenas mais importantes da Costa Rica.",
      "Muitas famílias ainda falam a língua bribri, cultivam os seus próprios alimentos e utilizam conhecimentos tradicionais no seu dia a dia.",
    ],
    experiencesHeading: 'Como São as Experiências Culturais',
    experiencesIntro:
      "A maioria das visitas é conduzida por membros da comunidade. Os grupos são pequenos, e o foco está na aprendizagem, no respeito e na ligação pessoal.",
    dailyLifeHeading: 'Vida quotidiana e visitas à comunidade',
    dailyLifeParagraph:
      "Os visitantes caminham por terrenos familiares, veem casas tradicionais e aprendem como as famílias bribri organizam a vida quotidiana, o trabalho e os papéis sociais.",
    cacaoHeading: 'Cacau e tradição',
    cacaoParagraphs: [
      "O cacau desempenha um papel central na cultura bribri. Muitos passeios mostram o processo de preparação ancestral, desde a vagem de cacau até à bebida final.",
      "Os guias explicam porque é que o cacau é importante nas cerimónias e no dia a dia, e os visitantes normalmente provam-no preparado à maneira tradicional.",
    ],
    medicinalHeading: 'Plantas medicinais e natureza',
    medicinalParagraphs: [
      "Algumas experiências incluem caminhadas pela floresta centradas em plantas medicinais e nos seus usos tradicionais para a saúde e os cuidados diários.",
      "Muitos passeios terminam com uma visita a uma cascata dentro do território indígena, valorizada tanto pela sua beleza natural como pelo seu significado cultural.",
    ],
    operatorsHeading: 'Operadores Turísticos Locais em Puerto Viejo',
    operatorsIntro:
      "Várias agências locais trabalham diretamente com comunidades indígenas para oferecer estas experiências de forma responsável.",
    operators: [
      { name: 'Life Culture Travel Costa Rica', href: 'https://lifeculturetravelcostarica.com/', description: 'Oferece experiências culturais que incluem tours com xamãs bribri e de chocolate, caminhadas de plantas medicinais e imersão na comunidade local.' },
      { name: 'Exploradores Outdoors', href: 'https://exploradoresoutdoors.com/tours/indigenous-experience-chocolate-tour/', description: 'Proporciona uma experiência indígena e tour de chocolate que abrange tradições bribri, plantas medicinais e uma visita a uma cascata.' },
      { name: 'Bribri Magic Chocolate & Waterfall Experience', href: 'https://www.viator.com/tours/Limon/Chocolate-taste-true/d4513-238841P2', description: 'Tour em pequeno grupo, a partir de Puerto Viejo, para conhecer a cultura bribri, preparar cacau e nadar numa cascata.' },
    ],
    askAboutTourParagraph: 'Ao reservar, pergunte se o passeio é conduzido por membros da comunidade e de que forma a visita apoia as famílias locais.',
    tipsHeading: 'Dicas Práticas para Visitantes',
    tipsParagraphs: [
      "Os passeios funcionam durante todo o ano e costumam começar de manhã.",
      "Leve calçado fechado, água, proteção solar e repelente de insetos. Siga sempre as instruções do seu guia e peça autorização antes de tirar fotografias.",
      "Comprar artesanato ou comida diretamente às famílias é uma das melhores formas de apoiar a comunidade.",
    ],
    differentWayHeading: 'Uma Forma Diferente de Viver o Caribe Sul',
    differentWayParagraphs: [
      "Visitar comunidades indígenas perto de Puerto Viejo acrescenta profundidade e significado à sua viagem. Trata-se de aprender, sem pressa.",
      "Esta experiência é ideal para viajantes que procuram uma ligação mais calma e autêntica com o lugar que estão a visitar.",
    ],
  },
  hi: {
    seoTitle: 'प्वेर्तो वियेहो दे तालामांका के पास आदिवासी संस्कृति',
    seoDescription:
      "प्वेर्तो वियेहो दे तालामांका के पास ब्रिब्री आदिवासी संस्कृति की खोज करें। कोस्टा रिका के दक्षिणी कैरिबियन के आदिवासी समुदायों में पैतृक काकाओ, पारंपरिक चिकित्सा और प्रामाणिक सांस्कृतिक अनुभवों के बारे में जानें।",
    heading: 'प्वेर्तो वियेहो दे तालामांका के पास आदिवासी संस्कृति',
    heroAlt: 'प्वेर्तो वियेहो के पास ब्रिब्री आदिवासी संस्कृति',
    introParagraph:
      'प्वेर्तो वियेहो दे तालामांका अपने समुद्र तटों, सुकूनभरे माहौल और अद्भुत जंगल के लिए जाना जाता है। लेकिन थोड़ा भीतरी इलाके में, इस क्षेत्र का एक और पहलू है जिसे कई यात्री कभी नहीं देख पाते।',
    stayRecommendationTitle: 'प्वेर्तो वियेहो में ठहरने की जगह ढूंढ रहे हैं?',
    afterStayParagraph:
      "कस्बे के पास ही, आदिवासी क्षेत्र कोस्टा रिका के दक्षिणी कैरिबियन तट पर जीवन की गहरी झलक पेश करते हैं। यहां, संस्कृति रोज़मर्रा की ज़िंदगी का हिस्सा है।",
    territoriesHeading: 'प्वेर्तो वियेहो के पास आदिवासी क्षेत्र',
    territoriesParagraphs: [
      "प्वेर्तो वियेहो तालामांका के ब्रिब्री आदिवासी क्षेत्र और केकोल्दी आदिवासी रिज़र्व के पास स्थित है। ये भूमि ब्रिब्री लोगों की है, जो कोस्टा रिका के सबसे महत्वपूर्ण आदिवासी समूहों में से एक हैं।",
      'कई परिवार आज भी ब्रिब्री भाषा बोलते हैं, अपना खुद का भोजन उगाते हैं, और अपनी रोज़मर्रा की दिनचर्या में पारंपरिक ज्ञान का उपयोग करते हैं।',
    ],
    experiencesHeading: 'सांस्कृतिक अनुभव कैसे होते हैं',
    experiencesIntro:
      'अधिकांश यात्राओं का नेतृत्व समुदाय के सदस्य करते हैं। समूह छोटे होते हैं, और ध्यान सीखने, सम्मान और व्यक्तिगत जुड़ाव पर केंद्रित होता है।',
    dailyLifeHeading: 'रोज़मर्रा की ज़िंदगी और सामुदायिक यात्राएं',
    dailyLifeParagraph:
      'आगंतुक परिवार की भूमि से होकर गुज़रते हैं, पारंपरिक घर देखते हैं, और सीखते हैं कि ब्रिब्री परिवार अपनी रोज़मर्रा की ज़िंदगी, काम और सामाजिक भूमिकाओं को कैसे व्यवस्थित करते हैं।',
    cacaoHeading: 'काकाओ और परंपरा',
    cacaoParagraphs: [
      'ब्रिब्री संस्कृति में काकाओ की केंद्रीय भूमिका है। कई टूर पैतृक तैयारी प्रक्रिया दिखाते हैं, काकाओ की फली से लेकर अंतिम पेय तक।',
      'गाइड बताते हैं कि समारोहों और रोज़मर्रा की ज़िंदगी में काकाओ इतना महत्वपूर्ण क्यों है, और आगंतुक आमतौर पर इसे पारंपरिक तरीके से तैयार करके चखते हैं।',
    ],
    medicinalHeading: 'औषधीय पौधे और प्रकृति',
    medicinalParagraphs: [
      'कुछ अनुभवों में औषधीय पौधों और स्वास्थ्य तथा रोज़मर्रा की देखभाल के लिए उनके पारंपरिक उपयोगों पर केंद्रित जंगल की सैर शामिल है।',
      'कई टूर आदिवासी क्षेत्र के अंदर एक झरने की यात्रा के साथ समाप्त होते हैं, जिसे इसकी प्राकृतिक सुंदरता और सांस्कृतिक महत्व दोनों के लिए सराहा जाता है।',
    ],
    operatorsHeading: 'प्वेर्तो वियेहो में स्थानीय टूर ऑपरेटर',
    operatorsIntro: 'कई स्थानीय एजेंसियां इन अनुभवों को ज़िम्मेदार तरीके से प्रदान करने के लिए सीधे आदिवासी समुदायों के साथ काम करती हैं।',
    operators: [
      { name: 'Life Culture Travel Costa Rica', href: 'https://lifeculturetravelcostarica.com/', description: 'ब्रिब्री शमन और चॉकलेट टूर, औषधीय पौधों की सैर, और स्थानीय समुदाय में विसर्जन सहित सांस्कृतिक अनुभव प्रदान करता है।' },
      { name: 'Exploradores Outdoors', href: 'https://exploradoresoutdoors.com/tours/indigenous-experience-chocolate-tour/', description: 'एक आदिवासी अनुभव और चॉकलेट टूर प्रदान करता है जिसमें ब्रिब्री परंपराएं, औषधीय पौधे, और एक झरने की यात्रा शामिल है।' },
      { name: 'Bribri Magic Chocolate & Waterfall Experience', href: 'https://www.viator.com/tours/Limon/Chocolate-taste-true/d4513-238841P2', description: 'प्वेर्तो वियेहो से एक छोटे समूह का टूर, जिसमें ब्रिब्री संस्कृति सीखना, काकाओ बनाना, और झरने में तैरना शामिल है।' },
    ],
    askAboutTourParagraph: 'बुकिंग करते समय, पूछें कि क्या टूर का संचालन समुदाय के सदस्य करते हैं और यह यात्रा स्थानीय परिवारों की किस तरह मदद करती है।',
    tipsHeading: 'आगंतुकों के लिए व्यावहारिक सुझाव',
    tipsParagraphs: [
      'टूर पूरे साल चलते हैं और आमतौर पर सुबह शुरू होते हैं।',
      "बंद जूते, पानी, धूप से सुरक्षा और कीट-प्रतिरोधी साथ लाएं। हमेशा अपने गाइड के निर्देशों का पालन करें और फोटो लेने से पहले अनुमति मांगें।",
      'परिवारों से सीधे हस्तशिल्प या भोजन खरीदना समुदाय की मदद करने के सबसे अच्छे तरीकों में से एक है।',
    ],
    differentWayHeading: 'दक्षिणी कैरिबियन का अनुभव करने का एक अलग तरीका',
    differentWayParagraphs: [
      'प्वेर्तो वियेहो के पास आदिवासी समुदायों की यात्रा आपकी यात्रा में गहराई और अर्थ जोड़ती है। यह जल्दबाज़ी के बारे में नहीं, सीखने के बारे में है।',
      'यह अनुभव उन यात्रियों के लिए उपयुक्त है जो जिस जगह घूम रहे हैं उसके साथ एक शांत, अधिक प्रामाणिक जुड़ाव चाहते हैं।',
    ],
  },
};

export function indigenousTravelContent(locale: Locale): IndigenousTravelContent {
  return indigenousTravel[locale] ?? indigenousTravel.en!;
}

export interface HiddenGemSection {
  headingText: string;
  headingHref?: string;
  paragraphs: [React.ReactNode, React.ReactNode];
  list?: { label: string; items: [string, string, string] };
  tipLine?: string;
}

export interface PuertoHiddenGemsContent {
  seoTitle: string;
  seoDescription: string;
  heading: string;
  heroAlt: string;
  photoCredit: React.ReactNode;
  introParagraphs: [string, string];
  stayRecommendationTitle: string;
  sections: [HiddenGemSection, HiddenGemSection, HiddenGemSection, HiddenGemSection, HiddenGemSection, HiddenGemSection];
  tipsHeading: string;
  tipsIntro: string;
  tipsListItems: [string, string, string, string];
  closingParagraph: string;
}

const puertoHiddenGems: Partial<Record<Locale, PuertoHiddenGemsContent>> = {
  en: {
    seoTitle: 'Hidden Gems in Puerto Viejo: Quiet Spots Locals Love',
    seoDescription:
      'Puerto Viejo has famous beaches, music, and nightlife. But some of its best places stay off the main list. These spots feel calmer, closer to nature, and more personal. If you want fewer crowds and real local flavor, start here. These hidden gems are easy to reach and worth the effort.',
    heading: 'Hidden Gems in Puerto Viejo: Quiet Spots Locals Love',
    // The pre-merge pages' alt text ("Kayaking in Punta Uva") described a
    // different photo; this hero is a general Puerto Viejo de Talamanca shot.
    heroAlt: 'Puerto Viejo de Talamanca, Costa Rica',
    photoCredit: <>Photo by <a href="https://commons.wikimedia.org/wiki/User:Letartean" target="_blank" rel="noopener noreferrer">Letartean</a></>,
    introParagraphs: [
      'Puerto Viejo is easy to love. Most visitors hit the famous beaches, grab a cocktail in town, and call it a day. But the best moments often happen in quieter places: small coves, hidden stretches of sand, and simple local meals that taste like the Caribbean.',
      'Below are a few hidden gems around Puerto Viejo that feel calmer and more personal. None of them require a complicated plan. You just need a bit of time, sun protection, and a slow pace.',
    ],
    stayRecommendationTitle: 'Where to stay in Puerto Viejo for easy access to these hidden gems',
    sections: [
      {
        headingText: 'Playa Chiquita',
        headingHref: 'https://maps.app.goo.gl/tTS4h2KYududsyh8A',
        paragraphs: [
          'Playa Chiquita is a more secluded stretch of sand that many people skip. It feels tucked away, with fewer crowds and a calmer mood.',
          "The water is not always calm, but the vibes there definitely are. It's the perfect spot for a slow morning.",
        ],
        list: { label: 'Perfect for:', items: ['Relaxing under the trees', 'Exploring on foot', 'A simple picnic'] },
      },
      {
        headingText: 'Playa Grande',
        headingHref: 'https://maps.app.goo.gl/zpRcsq96dC9MnVRU7',
        paragraphs: [
          "Playa Grande is known by surfers, but it's also one of the most striking beaches in the area. It feels wide, open, and less traveled than other spots.",
          "Even if you don't surf, it's worth a visit for the scenery and long walks. Just keep in mind the waves can be strong.",
        ],
        list: { label: 'Good to know:', items: ['Better for experienced surfers than swimmers', 'Great for photos and walks', 'Usually quieter than Cocles'] },
      },
      {
        headingText: 'Punta Cocles Coves & Jaguar Rescue Center',
        headingHref: 'https://www.jaguarrescue.foundation',
        paragraphs: [
          <>In front of the <a href="https://www.jaguarrescue.foundation" target="_blank" rel="noopener noreferrer">Jaguar Rescue Center</a>, you'll find small coves and quieter beach corners. The rocky points break up the coastline, so it's easy to find a spot that feels private.</>,
          'This area is also one of the best places to spot wildlife. You might see monkeys in the trees or a sloth high up near the road.',
        ],
        tipLine: 'Tip: Go early in the morning for fewer people and more animal activity.',
      },
      {
        headingText: 'Punta Uva Kayaking Without a Tour',
        paragraphs: [
          "Punta Uva is famous for its beach, but the river is the real secret. You don't need a tour to enjoy it. Just rent a kayak and explore at your own pace.",
          "The water is usually smooth, and the jungle feels close on both sides. It's peaceful and easy, even if you're not an expert paddler.",
        ],
        list: { label: 'Bring:', items: ['Sun protection', 'Water and a dry bag', 'Respectful distance for wildlife'] },
      },
      {
        headingText: 'Restaurante Caribeño 1872 for Rice and Beans',
        paragraphs: [
          <>If you want one meal that feels truly local, check out <a href="https://maps.app.goo.gl/ynskDRDozJkGW1ML6" target="_blank" rel="noopener noreferrer">Restaurante Caribeño 1872</a> for rich, flavorful Caribbean food.</>,
          "The flavor is rich, the portions feel generous, and the vibe is relaxed. It's the kind of place you'll want to return to.",
        ],
      },
      {
        headingText: 'Punta Mona & Gandoca-Manzanillo Wildlife Refuge',
        headingHref: 'https://maps.app.goo.gl/8dDzcZiUrhuuPmCy8',
        paragraphs: [
          'Punta Mona feels far, in the best way. You can rent a boat and ask the driver to take you along the coast to the pristine beaches and quiet shores inside the Gandoca-Manzanillo National Wildlife Refuge.',
          "The reward is clear water, quiet shoreline, and a sense that you've left the busy world behind.",
        ],
        list: { label: 'Good to know:', items: ['Bring snacks and water (there are no shops)', 'Go with calm weather and sea conditions', 'Pack out everything you bring in'] },
      },
    ],
    tipsHeading: 'Quick Tips to Enjoy These Spots',
    tipsIntro: 'A few small choices make a big difference in Puerto Viejo—both for your day and for the places you visit.',
    tipsListItems: [
      'Start early to get calm beaches and cooler weather',
      'Use reef-safe sunscreen when you swim or snorkel',
      'Keep a respectful distance from wildlife',
      "Don't leave valuables on the beach",
    ],
    closingParagraph:
      "These hidden gems are what make the trip feel special—quiet water, wild coastlines, and food that tastes like home in the Caribbean. Pick two or three from this list and leave space for slow moments. That's when Puerto Viejo shows its best side.",
  },
  es: {
    seoTitle: 'Joyas escondidas en Puerto Viejo',
    seoDescription:
      'Puerto Viejo tiene playas famosas, música y vida nocturna. Pero algunos de sus mejores lugares quedan fuera de las listas más conocidas. Son espacios más tranquilos, conectados con la naturaleza y con un sabor local auténtico. Si buscas menos gente y experiencias reales, empieza aquí.',
    heading: 'Joyas escondidas en Puerto Viejo',
    heroAlt: 'Puerto Viejo de Talamanca, Costa Rica',
    photoCredit: <>Foto de <a href="https://commons.wikimedia.org/wiki/User:Letartean" target="_blank" rel="noopener noreferrer">Letartean</a></>,
    introParagraphs: [
      'Puerto Viejo es fácil de amar. La mayoría de los visitantes va a las playas más conocidas, se toma un cóctel en el pueblo y sigue al siguiente destino. Pero los mejores momentos suelen aparecer en lugares más tranquilos: pequeñas caletas, tramos de arena escondidos y comidas sencillas que saben a Caribe.',
      'A continuación te compartimos algunas joyas escondidas alrededor de Puerto Viejo de Talamanca, Costa Rica, que se sienten más calmadas y personales. No requieren planes complicados. Solo un poco de tiempo, protección solar y ganas de ir despacio.',
    ],
    stayRecommendationTitle: 'Dónde hospedarte en Puerto Viejo para llegar fácil a estas joyas escondidas',
    sections: [
      {
        headingText: 'Playa Chiquita',
        headingHref: 'https://maps.app.goo.gl/tTS4h2KYududsyh8A',
        paragraphs: [
          'Playa Chiquita es un tramo de playa más apartado que muchas personas pasan por alto. Se siente recogido, con menos gente y un ambiente más relajado.',
          'El mar no siempre está completamente calmado, pero la energía del lugar sí lo está. Es un sitio ideal para una mañana lenta.',
        ],
        list: { label: 'Ideal para:', items: ['Descansar bajo los árboles', 'Explorar caminando', 'Un picnic sencillo'] },
      },
      {
        headingText: 'Playa Grande',
        headingHref: 'https://maps.app.goo.gl/zpRcsq96dC9MnVRU7',
        paragraphs: [
          'Playa Grande es conocida entre surfistas, pero también es una de las playas más impactantes de la zona. Es amplia, abierta y mucho menos transitada que otras.',
          'Aunque no practiques surf, vale la pena visitarla por el paisaje y las caminatas largas. Eso sí, las olas suelen ser fuertes.',
        ],
        list: { label: 'A tener en cuenta:', items: ['Mejor para surfistas con experiencia que para nadar', 'Excelente para fotos y caminatas', 'Suele ser más tranquila que Cocles'] },
      },
      {
        headingText: 'Caletas de Punta Cocles y Jaguar Rescue Center',
        headingHref: 'https://www.jaguarrescue.foundation',
        paragraphs: [
          <>Frente al <a href="https://www.jaguarrescue.foundation" target="_blank" rel="noopener noreferrer">Jaguar Rescue Center</a>, encontrarás pequeñas caletas y rincones de playa más tranquilos. Las formaciones rocosas dividen la costa y facilitan encontrar un espacio con sensación de privacidad.</>,
          'Además, esta zona es excelente para observar fauna. Es común ver monos entre los árboles o algún perezoso cerca de la carretera.',
        ],
        tipLine: 'Consejo: ve temprano en la mañana para menos gente y más actividad animal.',
      },
      {
        headingText: 'Kayak en Punta Uva sin tour',
        paragraphs: [
          'Punta Uva es famosa por su playa, pero el río es el verdadero secreto. No necesitas contratar un tour. Basta con alquilar un kayak y explorar a tu ritmo.',
          'El agua suele estar tranquila y la selva se siente muy cerca en ambos lados. Es una experiencia relajada, incluso si no tienes mucha experiencia remando.',
        ],
        list: { label: 'Lleva contigo:', items: ['Protección solar', 'Agua y una bolsa seca', 'Distancia respetuosa con la fauna'] },
      },
      {
        headingText: 'Restaurante Caribeño 1872 y su rice and beans',
        paragraphs: [
          <>Si buscas una comida realmente local, visita <a href="https://maps.app.goo.gl/ynskDRDozJkGW1ML6" target="_blank" rel="noopener noreferrer">Restaurante Caribeño 1872</a>. Su rice and beans es uno de esos platos simples que se vuelven inolvidables cuando están bien hechos.</>,
          'El sabor es intenso, las porciones generosas y el ambiente relajado. Es el tipo de lugar al que dan ganas de volver.',
        ],
      },
      {
        headingText: 'Punta Mona y el Refugio de Vida Silvestre Gandoca-Manzanillo',
        headingHref: 'https://maps.app.goo.gl/8dDzcZiUrhuuPmCy8',
        paragraphs: [
          'Punta Mona se siente lejana, en el mejor sentido. Puedes alquilar una lancha y pedir que te lleven por la costa hasta playas vírgenes y tranquilas dentro del Refugio de Vida Silvestre Gandoca-Manzanillo.',
          'La recompensa es agua clara, orillas silenciosas y la sensación de haber dejado atrás el movimiento del mundo.',
        ],
        list: { label: 'Recomendaciones:', items: ['Lleva agua y algo de comer (no hay tiendas)', 'Elige días con buen clima y mar tranquilo', 'Llévate de vuelta todo lo que lleves'] },
      },
    ],
    tipsHeading: 'Consejos rápidos para disfrutar estos lugares',
    tipsIntro: 'Pequeñas decisiones pueden marcar una gran diferencia en Puerto Viejo, tanto para tu experiencia como para los sitios que visitas.',
    tipsListItems: [
      'Empieza temprano para encontrar playas más tranquilas',
      'Usa bloqueador solar amigable con los arrecifes',
      'Mantén distancia y respeto con la fauna',
      'No dejes objetos de valor en la playa',
    ],
    closingParagraph:
      'Estas joyas escondidas son las que hacen que el viaje se sienta especial: aguas tranquilas, costas salvajes y comida que sabe a hogar caribeño. Elige dos o tres y deja espacio para ir sin prisa. Ahí es cuando Puerto Viejo muestra su mejor cara.',
  },
  fr: {
    seoTitle: 'Trésors cachés de Puerto Viejo : les coins tranquilles préférés des habitants',
    seoDescription:
      "Puerto Viejo a ses plages célèbres, sa musique et sa vie nocturne. Mais certains de ses meilleurs endroits restent en dehors des sentiers battus. Ces lieux sont plus calmes, plus proches de la nature et plus personnels. Si vous voulez moins de foule et une véritable saveur locale, commencez ici. Ces trésors cachés sont faciles d'accès et valent vraiment le détour.",
    heading: 'Trésors cachés de Puerto Viejo : les coins tranquilles préférés des habitants',
    heroAlt: 'Puerto Viejo de Talamanca, Costa Rica',
    photoCredit: <>Photo par <a href="https://commons.wikimedia.org/wiki/User:Letartean" target="_blank" rel="noopener noreferrer">Letartean</a></>,
    introParagraphs: [
      "Puerto Viejo est facile à aimer. La plupart des visiteurs se rendent sur les plages célèbres, prennent un cocktail en ville, et considèrent leur journée terminée. Mais les meilleurs moments se produisent souvent dans des lieux plus tranquilles : petites criques, bandes de sable cachées et repas locaux tout simples qui ont le goût des Caraïbes.",
      "Voici quelques trésors cachés autour de Puerto Viejo qui semblent plus calmes et plus personnels. Aucun ne nécessite de plan compliqué. Il vous faut simplement un peu de temps, une protection solaire et un rythme tranquille.",
    ],
    stayRecommendationTitle: 'Où loger à Puerto Viejo pour accéder facilement à ces trésors cachés',
    sections: [
      {
        headingText: 'Playa Chiquita',
        headingHref: 'https://maps.app.goo.gl/tTS4h2KYududsyh8A',
        paragraphs: [
          "Playa Chiquita est une étendue de sable plus isolée que beaucoup de gens ignorent. Elle semble à l'écart, avec moins de monde et une ambiance plus calme.",
          "L'eau n'y est pas toujours calme, mais l'ambiance, elle, l'est assurément. C'est l'endroit idéal pour une matinée tranquille.",
        ],
        list: { label: 'Idéal pour :', items: ['Se détendre sous les arbres', 'Explorer à pied', 'Un pique-nique simple'] },
      },
      {
        headingText: 'Playa Grande',
        headingHref: 'https://maps.app.goo.gl/zpRcsq96dC9MnVRU7',
        paragraphs: [
          "Playa Grande est connue des surfeurs, mais c'est aussi l'une des plages les plus impressionnantes de la région. Elle semble large, ouverte, et moins fréquentée que d'autres endroits.",
          "Même si vous ne surfez pas, elle vaut le détour pour ses paysages et ses longues promenades. Gardez simplement à l'esprit que les vagues peuvent être fortes.",
        ],
        list: { label: 'Bon à savoir :', items: ["Plus adaptée aux surfeurs expérimentés qu'aux nageurs", 'Excellente pour les photos et les promenades', 'Généralement plus tranquille que Cocles'] },
      },
      {
        headingText: 'Criques de Punta Cocles et Jaguar Rescue Center',
        headingHref: 'https://www.jaguarrescue.foundation',
        paragraphs: [
          <>En face du <a href="https://www.jaguarrescue.foundation" target="_blank" rel="noopener noreferrer">Jaguar Rescue Center</a>, vous trouverez de petites criques et des coins de plage plus tranquilles. Les pointes rocheuses fragmentent le littoral, ce qui permet de trouver facilement un endroit qui semble privé.</>,
          "Cette zone est également l'un des meilleurs endroits pour observer la faune. Vous pourriez apercevoir des singes dans les arbres ou un paresseux perché près de la route.",
        ],
        tipLine: "Astuce : allez-y tôt le matin pour moins de monde et plus d'activité animale.",
      },
      {
        headingText: 'Kayak à Punta Uva sans excursion organisée',
        paragraphs: [
          "Punta Uva est célèbre pour sa plage, mais la rivière est le véritable secret. Vous n'avez pas besoin d'une excursion organisée pour en profiter. Louez simplement un kayak et explorez à votre propre rythme.",
          "L'eau y est généralement calme, et la jungle semble proche des deux côtés. C'est paisible et facile, même si vous n'êtes pas un pagayeur expérimenté.",
        ],
        list: { label: 'À emporter :', items: ['Protection solaire', "De l'eau et un sac étanche", 'Une distance respectueuse envers la faune'] },
      },
      {
        headingText: 'Restaurante Caribeño 1872 pour son Rice and Beans',
        paragraphs: [
          <>Si vous cherchez un repas vraiment authentique, rendez-vous au <a href="https://maps.app.goo.gl/ynskDRDozJkGW1ML6" target="_blank" rel="noopener noreferrer">Restaurante Caribeño 1872</a> pour une cuisine caribéenne riche et savoureuse.</>,
          "La saveur est intense, les portions généreuses, et l'ambiance détendue. C'est le genre d'endroit où l'on a envie de revenir.",
        ],
      },
      {
        headingText: 'Punta Mona et le Refuge national de vie sauvage de Gandoca-Manzanillo',
        headingHref: 'https://maps.app.goo.gl/8dDzcZiUrhuuPmCy8',
        paragraphs: [
          "Punta Mona semble lointaine, dans le meilleur sens du terme. Vous pouvez louer un bateau et demander au pilote de vous emmener le long de la côte jusqu'aux plages immaculées et aux rivages tranquilles du Refuge national de vie sauvage de Gandoca-Manzanillo.",
          "La récompense : une eau claire, un littoral silencieux, et le sentiment d'avoir laissé derrière soi l'agitation du monde.",
        ],
        list: { label: 'Bon à savoir :', items: ["Apportez des en-cas et de l'eau (il n'y a pas de commerces)", 'Partez par beau temps et mer calme', 'Remportez tout ce que vous apportez'] },
      },
    ],
    tipsHeading: 'Conseils rapides pour profiter de ces lieux',
    tipsIntro:
      "Quelques petits choix font une grande différence à Puerto Viejo, aussi bien pour votre journée que pour les lieux que vous visitez.",
    tipsListItems: [
      "Partez tôt pour profiter de plages calmes et d'une météo plus fraîche",
      'Utilisez une crème solaire respectueuse des récifs pour nager ou faire du snorkeling',
      'Gardez une distance respectueuse envers la faune',
      "Ne laissez pas d'objets de valeur sur la plage",
    ],
    closingParagraph:
      "Ces trésors cachés sont ce qui rend le voyage vraiment spécial : eaux tranquilles, littoraux sauvages et nourriture qui a le goût d'un foyer caribéen. Choisissez-en deux ou trois dans cette liste et laissez de la place pour les moments lents. C'est là que Puerto Viejo révèle son meilleur visage.",
  },
  de: {
    seoTitle: 'Geheimtipps in Puerto Viejo: Ruhige Orte, die Einheimische lieben',
    seoDescription:
      'Puerto Viejo hat berühmte Strände, Musik und Nachtleben. Aber einige seiner besten Orte stehen nicht auf der üblichen Liste. Diese Orte wirken ruhiger, naturnäher und persönlicher. Wenn Sie weniger Menschenmassen und echtes lokales Flair suchen, beginnen Sie hier. Diese Geheimtipps sind leicht zu erreichen und die Mühe wert.',
    heading: 'Geheimtipps in Puerto Viejo: Ruhige Orte, die Einheimische lieben',
    heroAlt: 'Puerto Viejo de Talamanca, Costa Rica',
    photoCredit: <>Foto von <a href="https://commons.wikimedia.org/wiki/User:Letartean" target="_blank" rel="noopener noreferrer">Letartean</a></>,
    introParagraphs: [
      'Puerto Viejo ist leicht zu lieben. Die meisten Besucher steuern die berühmten Strände an, gönnen sich einen Cocktail im Ort und lassen den Tag ausklingen. Doch die schönsten Momente entstehen oft an ruhigeren Orten: kleinen Buchten, versteckten Sandstreifen und einfachen lokalen Mahlzeiten, die nach Karibik schmecken.',
      'Im Folgenden finden Sie ein paar Geheimtipps rund um Puerto Viejo, die ruhiger und persönlicher wirken. Keiner von ihnen erfordert einen komplizierten Plan. Sie brauchen nur etwas Zeit, Sonnenschutz und ein gemächliches Tempo.',
    ],
    stayRecommendationTitle: 'Wo übernachten in Puerto Viejo, um diese Geheimtipps leicht zu erreichen',
    sections: [
      {
        headingText: 'Playa Chiquita',
        headingHref: 'https://maps.app.goo.gl/tTS4h2KYududsyh8A',
        paragraphs: [
          'Playa Chiquita ist ein abgelegenerer Sandstreifen, den viele Leute auslassen. Er wirkt versteckt, mit weniger Menschen und einer ruhigeren Stimmung.',
          "Das Wasser ist nicht immer ruhig, die Stimmung dort aber definitiv. Es ist der perfekte Ort für einen gemächlichen Morgen.",
        ],
        list: { label: 'Perfekt für:', items: ['Entspannen unter den Bäumen', 'Erkunden zu Fuß', 'Ein einfaches Picknick'] },
      },
      {
        headingText: 'Playa Grande',
        headingHref: 'https://maps.app.goo.gl/zpRcsq96dC9MnVRU7',
        paragraphs: [
          "Playa Grande ist bei Surfern bekannt, ist aber auch einer der eindrucksvollsten Strände der Gegend. Er wirkt weitläufig, offen und weniger besucht als andere Orte.",
          "Auch wenn Sie nicht surfen, lohnt sich ein Besuch wegen der Landschaft und langer Spaziergänge. Denken Sie nur daran, dass die Wellen stark sein können.",
        ],
        list: { label: 'Gut zu wissen:', items: ['Besser für erfahrene Surfer als für Schwimmer geeignet', 'Toll für Fotos und Spaziergänge', 'Meist ruhiger als Cocles'] },
      },
      {
        headingText: 'Buchten von Punta Cocles & Jaguar Rescue Center',
        headingHref: 'https://www.jaguarrescue.foundation',
        paragraphs: [
          <>Gegenüber dem <a href="https://www.jaguarrescue.foundation" target="_blank" rel="noopener noreferrer">Jaguar Rescue Center</a> finden Sie kleine Buchten und ruhigere Strandecken. Die felsigen Landzungen unterbrechen die Küstenlinie, sodass es leicht ist, einen Platz zu finden, der sich privat anfühlt.</>,
          'Diese Gegend ist zudem einer der besten Orte, um Tiere zu beobachten. Sie könnten Affen in den Bäumen oder ein Faultier hoch oben in der Nähe der Straße sehen.',
        ],
        tipLine: 'Tipp: Gehen Sie früh am Morgen dorthin, um weniger Menschen und mehr Tieraktivität zu erleben.',
      },
      {
        headingText: 'Kajakfahren in Punta Uva ohne Tour',
        paragraphs: [
          "Punta Uva ist für seinen Strand berühmt, doch der Fluss ist das eigentliche Geheimnis. Sie brauchen keine Tour, um ihn zu genießen. Mieten Sie einfach ein Kajak und erkunden Sie ihn in Ihrem eigenen Tempo.",
          "Das Wasser ist normalerweise ruhig, und der Dschungel fühlt sich auf beiden Seiten nah an. Es ist friedlich und einfach, auch wenn Sie kein erfahrener Paddler sind.",
        ],
        list: { label: 'Mitbringen:', items: ['Sonnenschutz', 'Wasser und eine trockene Tasche', 'Respektvollen Abstand zur Tierwelt'] },
      },
      {
        headingText: 'Restaurante Caribeño 1872 für Rice and Beans',
        paragraphs: [
          <>Wenn Sie ein Essen möchten, das sich wirklich lokal anfühlt, probieren Sie das <a href="https://maps.app.goo.gl/ynskDRDozJkGW1ML6" target="_blank" rel="noopener noreferrer">Restaurante Caribeño 1872</a> mit reichhaltiger, aromatischer karibischer Küche.</>,
          "Der Geschmack ist intensiv, die Portionen wirken großzügig, und die Atmosphäre ist entspannt. Es ist die Art von Ort, zu dem man gerne zurückkehrt.",
        ],
      },
      {
        headingText: 'Punta Mona & Wildschutzgebiet Gandoca-Manzanillo',
        headingHref: 'https://maps.app.goo.gl/8dDzcZiUrhuuPmCy8',
        paragraphs: [
          "Punta Mona fühlt sich weit weg an, im besten Sinne. Sie können ein Boot mieten und den Fahrer bitten, Sie entlang der Küste zu den unberührten Stränden und ruhigen Ufern innerhalb des Nationalen Wildschutzgebiets Gandoca-Manzanillo zu bringen.",
          "Die Belohnung ist klares Wasser, ruhige Küstenlinie und das Gefühl, die geschäftige Welt hinter sich gelassen zu haben.",
        ],
        list: { label: 'Gut zu wissen:', items: ['Bringen Sie Snacks und Wasser mit (es gibt keine Geschäfte)', 'Fahren Sie nur bei ruhigem Wetter und Meeresbedingungen', 'Nehmen Sie alles, was Sie mitbringen, wieder mit zurück'] },
      },
    ],
    tipsHeading: 'Schnelle Tipps, um diese Orte zu genießen',
    tipsIntro: 'Ein paar kleine Entscheidungen machen in Puerto Viejo einen großen Unterschied – sowohl für Ihren Tag als auch für die Orte, die Sie besuchen.',
    tipsListItems: [
      'Starten Sie früh, um ruhige Strände und kühleres Wetter zu erleben',
      'Verwenden Sie riffverträgliche Sonnencreme beim Schwimmen oder Schnorcheln',
      'Halten Sie respektvollen Abstand zur Tierwelt',
      "Lassen Sie keine Wertsachen am Strand liegen",
    ],
    closingParagraph:
      "Diese Geheimtipps sind es, die die Reise besonders machen – ruhiges Wasser, wilde Küstenlinien und Essen, das sich wie ein karibisches Zuhause anfühlt. Wählen Sie zwei oder drei aus dieser Liste aus und lassen Sie Raum für gemächliche Momente. Dann zeigt Puerto Viejo seine beste Seite.",
  },
  he: {
    seoTitle: 'פנינים נסתרות בפוארטו ויחו: פינות שקטות שהמקומיים אוהבים',
    seoDescription:
      'לפוארטו ויחו יש חופים מפורסמים, מוזיקה וחיי לילה. אבל חלק מהמקומות הטובים ביותר שלה נשארים מחוץ לרשימה הראשית. הפינות האלה מרגישות רגועות יותר, קרובות יותר לטבע, ואישיות יותר. אם אתם רוצים פחות המונים וטעם מקומי אמיתי, התחילו כאן. הפנינים הנסתרות האלה קלות להגעה ושוות את המאמץ.',
    heading: 'פנינים נסתרות בפוארטו ויחו: פינות שקטות שהמקומיים אוהבים',
    heroAlt: 'פוארטו ויחו דה טלמנקה, קוסטה ריקה',
    photoCredit: <>צילום מאת <a href="https://commons.wikimedia.org/wiki/User:Letartean" target="_blank" rel="noopener noreferrer">Letartean</a></>,
    introParagraphs: [
      'קל לאהוב את פוארטו ויחו. רוב המבקרים פוקדים את החופים המפורסמים, לוגמים קוקטייל בעיירה, ומסיימים את היום. אבל הרגעים הטובים ביותר קורים לרוב במקומות שקטים יותר: מפרצונים קטנים, רצועות חול נסתרות, וארוחות מקומיות פשוטות שטועמות כמו הקריביים.',
      'להלן כמה פנינים נסתרות סביב פוארטו ויחו שמרגישות רגועות ואישיות יותר. אף אחת מהן לא דורשת תוכנית מסובכת. אתם רק צריכים קצת זמן, הגנה מהשמש, וקצב איטי.',
    ],
    stayRecommendationTitle: 'היכן להתארח בפוארטו ויחו לגישה נוחה לפנינים הנסתרות האלה',
    sections: [
      {
        headingText: "פלאיה צ'יקיטה",
        headingHref: 'https://maps.app.goo.gl/tTS4h2KYududsyh8A',
        paragraphs: [
          "פלאיה צ'יקיטה היא רצועת חול מבודדת יותר שרבים מדלגים עליה. היא מרגישה מוסתרת, עם פחות המונים ואווירה רגועה יותר.",
          'המים לא תמיד רגועים, אבל האווירה שם בהחלט כן. זו הפינה המושלמת לבוקר איטי.',
        ],
        list: { label: 'מושלם עבור:', items: ['הירגעות בצל העצים', 'חקירה ברגל', 'פיקניק פשוט'] },
      },
      {
        headingText: 'פלאיה גרנדה',
        headingHref: 'https://maps.app.goo.gl/zpRcsq96dC9MnVRU7',
        paragraphs: [
          'פלאיה גרנדה מוכרת בקרב גולשים, אבל היא גם אחד החופים המרשימים ביותר באזור. היא מרגישה רחבה, פתוחה, ופחות מבוקרת ממקומות אחרים.',
          'גם אם אתם לא גולשים, שווה לבקר בה בזכות הנוף וההליכות הארוכות. רק זכרו שהגלים יכולים להיות חזקים.',
        ],
        list: { label: 'טוב לדעת:', items: ['מתאים יותר לגולשים מנוסים מאשר לשחיינים', 'מצוין לתמונות ולהליכות', 'בדרך כלל שקטה יותר מקוקלס'] },
      },
      {
        headingText: 'מפרצוני פונטה קוקלס ומרכז Jaguar Rescue Center',
        headingHref: 'https://www.jaguarrescue.foundation',
        paragraphs: [
          <>מול <a href="https://www.jaguarrescue.foundation" target="_blank" rel="noopener noreferrer">Jaguar Rescue Center</a>, תמצאו מפרצונים קטנים ופינות חוף שקטות יותר. הבליטות הסלעיות שוברות את קו החוף, כך שקל למצוא פינה שמרגישה פרטית.</>,
          'אזור זה הוא גם אחד המקומות הטובים ביותר לצפייה בחיות בר. ייתכן שתראו קופים על העצים או עצלן גבוה ליד הכביש.',
        ],
        tipLine: 'טיפ: הגיעו מוקדם בבוקר לפחות אנשים ויותר פעילות של בעלי חיים.',
      },
      {
        headingText: 'קיאקינג בפונטה אובה בלי סיור מאורגן',
        paragraphs: [
          'פונטה אובה מפורסמת בזכות החוף שלה, אבל הנהר הוא הסוד האמיתי. אתם לא צריכים סיור מאורגן כדי ליהנות ממנו. פשוט שכרו קיאק וחקרו בקצב שלכם.',
          'המים בדרך כלל חלקים, והג\'ונגל מרגיש קרוב משני הצדדים. זה שליו וקל, גם אם אתם לא חותרים מומחים.',
        ],
        list: { label: 'קחו איתכם:', items: ['הגנה מהשמש', 'מים ותיק יבש', 'מרחק מכבד מחיות הבר'] },
      },
      {
        headingText: 'Restaurante Caribeño 1872 לרייס אנד בינס',
        paragraphs: [
          <>אם אתם רוצים ארוחה שמרגישה באמת מקומית, בקרו ב-<a href="https://maps.app.goo.gl/ynskDRDozJkGW1ML6" target="_blank" rel="noopener noreferrer">Restaurante Caribeño 1872</a> לאוכל קריבי עשיר וטעים.</>,
          'הטעם עשיר, המנות מרגישות נדיבות, והאווירה רגועה. זה סוג המקום שתרצו לחזור אליו.',
        ],
      },
      {
        headingText: 'פונטה מונה ורפוגיו לחיות בר גנדוקה-מנסניו',
        headingHref: 'https://maps.app.goo.gl/8dDzcZiUrhuuPmCy8',
        paragraphs: [
          'פונטה מונה מרגישה רחוקה, במובן הטוב ביותר. תוכלו לשכור סירה ולבקש מהנהג לקחת אתכם לאורך החוף אל החופים הבתוליים והחופים השקטים בתוך הרפוגיו הלאומי לחיות בר גנדוקה-מנסניו.',
          'התגמול הוא מים צלולים, קו חוף שקט, ותחושה שהשארתם מאחור את העולם העמוס.',
        ],
        list: { label: 'טוב לדעת:', items: ['הביאו חטיפים ומים (אין חנויות)', 'צאו כשמזג האוויר ותנאי הים רגועים', 'קחו איתכם החוצה כל מה שהבאתם'] },
      },
    ],
    tipsHeading: 'טיפים מהירים ליהנות מהמקומות האלה',
    tipsIntro: 'כמה בחירות קטנות עושות הבדל גדול בפוארטו ויחו - גם ביום שלכם וגם במקומות שאתם מבקרים בהם.',
    tipsListItems: [
      'צאו מוקדם כדי לתפוס חופים רגועים ומזג אוויר קריר יותר',
      'השתמשו בקרם הגנה ידידותי לשוניות כשאתם שוחים או עושים שנורקלינג',
      'שמרו על מרחק מכבד מחיות הבר',
      'אל תשאירו חפצי ערך על החוף',
    ],
    closingParagraph:
      'הפנינים הנסתרות האלה הן מה שהופך את הטיול למיוחד - מים שקטים, קווי חוף פראיים, ואוכל שטועם כמו בית בקריביים. בחרו שניים או שלושה מהרשימה הזו והשאירו מקום לרגעים איטיים. אז פוארטו ויחו מראה את הצד הטוב ביותר שלה.',
  },
  it: {
    seoTitle: 'Gioielli Nascosti di Puerto Viejo: Gli Angoli Tranquilli Amati dai Locali',
    seoDescription:
      "Puerto Viejo ha spiagge famose, musica e vita notturna. Ma alcuni dei suoi posti migliori restano fuori dalle liste principali. Questi luoghi risultano più tranquilli, più vicini alla natura e più personali. Se cerchi meno folla e un autentico sapore locale, inizia da qui. Questi gioielli nascosti sono facili da raggiungere e ne vale la pena.",
    heading: 'Gioielli Nascosti di Puerto Viejo: Gli Angoli Tranquilli Amati dai Locali',
    heroAlt: 'Puerto Viejo de Talamanca, Costa Rica',
    photoCredit: <>Foto di <a href="https://commons.wikimedia.org/wiki/User:Letartean" target="_blank" rel="noopener noreferrer">Letartean</a></>,
    introParagraphs: [
      "Puerto Viejo è facile da amare. La maggior parte dei visitatori va sulle spiagge famose, si prende un cocktail in paese e chiude così la giornata. Ma i momenti migliori accadono spesso nei luoghi più tranquilli: piccole calette, tratti di sabbia nascosti e pasti semplici che sanno di Caribe.",
      "Di seguito trovi alcuni gioielli nascosti intorno a Puerto Viejo che risultano più tranquilli e personali. Nessuno di essi richiede un piano complicato. Ti serve solo un po' di tempo, protezione solare e la voglia di andare piano.",
    ],
    stayRecommendationTitle: 'Dove alloggiare a Puerto Viejo per raggiungere facilmente questi gioielli nascosti',
    sections: [
      {
        headingText: 'Playa Chiquita',
        headingHref: 'https://maps.app.goo.gl/tTS4h2KYududsyh8A',
        paragraphs: [
          "Playa Chiquita è un tratto di spiaggia più appartato che molti si lasciano sfuggire. Si sente nascosta, con meno folla e un'atmosfera più calma.",
          "Il mare non è sempre calmo, ma l'atmosfera del posto lo è di sicuro. È il luogo perfetto per una mattinata rilassata.",
        ],
        list: { label: 'Perfetto per:', items: ['Rilassarsi sotto gli alberi', 'Esplorare a piedi', 'Un semplice picnic'] },
      },
      {
        headingText: 'Playa Grande',
        headingHref: 'https://maps.app.goo.gl/zpRcsq96dC9MnVRU7',
        paragraphs: [
          "Playa Grande è conosciuta dai surfisti, ma è anche una delle spiagge più suggestive della zona. Appare ampia, aperta e meno frequentata rispetto ad altri luoghi.",
          "Anche se non fai surf, vale la pena visitarla per il paesaggio e le lunghe passeggiate. Tieni solo presente che le onde possono essere forti.",
        ],
        list: { label: 'Utile da sapere:', items: ['Più adatta ai surfisti esperti che ai nuotatori', 'Ottima per foto e passeggiate', 'Di solito più tranquilla di Cocles'] },
      },
      {
        headingText: 'Le Calette di Punta Cocles e il Jaguar Rescue Center',
        headingHref: 'https://www.jaguarrescue.foundation',
        paragraphs: [
          <>Di fronte al <a href="https://www.jaguarrescue.foundation" target="_blank" rel="noopener noreferrer">Jaguar Rescue Center</a>, troverai piccole calette e angoli di spiaggia più tranquilli. I promontori rocciosi interrompono la linea costiera, rendendo facile trovare un punto che sembra tutto per te.</>,
          "Questa zona è anche uno dei posti migliori per avvistare la fauna selvatica. Potresti vedere scimmie tra gli alberi o un bradipo in alto vicino alla strada.",
        ],
        tipLine: 'Consiglio: vai presto al mattino per trovare meno gente e più attività animale.',
      },
      {
        headingText: 'Kayak a Punta Uva Senza Tour',
        paragraphs: [
          "Punta Uva è famosa per la sua spiaggia, ma il fiume è il vero segreto. Non serve un tour per goderselo: basta noleggiare un kayak ed esplorare al proprio ritmo.",
          "L'acqua è di solito calma e la giungla si sente vicina da entrambi i lati. È un'esperienza tranquilla e semplice, anche se non sei un rematore esperto.",
        ],
        list: { label: 'Porta con te:', items: ['Protezione solare', 'Acqua e una sacca stagna', 'La giusta distanza di rispetto dalla fauna'] },
      },
      {
        headingText: 'Restaurante Caribeño 1872 per il Rice and Beans',
        paragraphs: [
          <>Se vuoi un pasto che sappia davvero di autentico, vai al <a href="https://maps.app.goo.gl/ynskDRDozJkGW1ML6" target="_blank" rel="noopener noreferrer">Restaurante Caribeño 1872</a> per assaporare una cucina caraibica ricca e saporita.</>,
          "Il sapore è intenso, le porzioni sembrano generose e l'atmosfera è rilassata. È il tipo di posto in cui ti verrà voglia di tornare.",
        ],
      },
      {
        headingText: 'Punta Mona e il Rifugio di Fauna Selvatica Gandoca-Manzanillo',
        headingHref: 'https://maps.app.goo.gl/8dDzcZiUrhuuPmCy8',
        paragraphs: [
          "Punta Mona sembra lontana, nel senso migliore del termine. Puoi noleggiare una barca e chiedere al conducente di portarti lungo la costa fino alle spiagge incontaminate e alle rive tranquille all'interno del Rifugio Nazionale di Fauna Selvatica Gandoca-Manzanillo.",
          "La ricompensa è acqua cristallina, una costa silenziosa e la sensazione di aver lasciato alle spalle il mondo frenetico.",
        ],
        list: { label: 'Utile da sapere:', items: ['Porta snack e acqua (non ci sono negozi)', 'Vai con condizioni meteo e mare favorevoli', 'Riporta via tutto ciò che porti con te'] },
      },
    ],
    tipsHeading: 'Consigli Rapidi per Vivere al Meglio Questi Luoghi',
    tipsIntro: "Poche piccole scelte fanno una grande differenza a Puerto Viejo, sia per la tua giornata sia per i luoghi che visiti.",
    tipsListItems: [
      'Parti presto per trovare spiagge tranquille e un clima più fresco',
      'Usa una crema solare rispettosa dei coralli quando nuoti o fai snorkeling',
      'Mantieni una distanza rispettosa dalla fauna selvatica',
      'Non lasciare oggetti di valore in spiaggia',
    ],
    closingParagraph:
      "Questi gioielli nascosti sono ciò che rende speciale il viaggio: acque tranquille, coste selvagge e un cibo che sa di casa nel Caribe. Scegline due o tre da questa lista e lascia spazio ai momenti lenti. È lì che Puerto Viejo mostra il suo lato migliore.",
  },
  pt: {
    seoTitle: 'Joias Escondidas em Puerto Viejo: Recantos Tranquilos que os Locais Adoram',
    seoDescription:
      "Puerto Viejo tem praias famosas, música e vida noturna. Mas alguns dos seus melhores lugares ficam fora da lista principal. Estes recantos são mais calmos, mais próximos da natureza e mais pessoais. Se procura menos multidões e um verdadeiro sabor local, comece por aqui. Estas joias escondidas são fáceis de alcançar e valem bem o esforço.",
    heading: 'Joias Escondidas em Puerto Viejo: Recantos Tranquilos que os Locais Adoram',
    heroAlt: 'Puerto Viejo de Talamanca, Costa Rica',
    photoCredit: <>Foto de <a href="https://commons.wikimedia.org/wiki/User:Letartean" target="_blank" rel="noopener noreferrer">Letartean</a></>,
    introParagraphs: [
      "Puerto Viejo é fácil de amar. A maioria dos visitantes vai às praias famosas, toma um cocktail na vila e dá o dia por terminado. Mas os melhores momentos acontecem, muitas vezes, em lugares mais tranquilos: pequenas enseadas, faixas de areia escondidas e refeições simples e locais que sabem a Caraíbas.",
      "Aqui ficam algumas joias escondidas em torno de Puerto Viejo que são mais calmas e pessoais. Nenhuma delas exige um plano complicado. Só precisa de algum tempo, proteção solar e um ritmo tranquilo.",
    ],
    stayRecommendationTitle: 'Onde ficar hospedado em Puerto Viejo para chegar facilmente a estas joias escondidas',
    sections: [
      {
        headingText: 'Playa Chiquita',
        headingHref: 'https://maps.app.goo.gl/tTS4h2KYududsyh8A',
        paragraphs: [
          "Playa Chiquita é um trecho de praia mais isolado que muita gente ignora. Sente-se recatada, com menos gente e um ambiente mais calmo.",
          "A água nem sempre está calma, mas o ambiente decididamente está. É o local perfeito para uma manhã tranquila.",
        ],
        list: { label: 'Perfeita para:', items: ['Relaxar debaixo das árvores', 'Explorar a pé', 'Um piquenique simples'] },
      },
      {
        headingText: 'Playa Grande',
        headingHref: 'https://maps.app.goo.gl/zpRcsq96dC9MnVRU7',
        paragraphs: [
          "Playa Grande é conhecida entre os surfistas, mas é também uma das praias mais impressionantes da região. Sente-se ampla, aberta e menos frequentada do que outros locais.",
          "Mesmo que não pratique surf, vale a pena visitá-la pela paisagem e pelos longos passeios a pé. Só tenha em conta que as ondas podem ser fortes.",
        ],
        list: { label: 'Bom saber:', items: ['Mais indicada para surfistas experientes do que para nadar', 'Ótima para fotografias e caminhadas', 'Normalmente mais sossegada do que Cocles'] },
      },
      {
        headingText: 'Enseadas de Punta Cocles e Jaguar Rescue Center',
        headingHref: 'https://www.jaguarrescue.foundation',
        paragraphs: [
          <>Em frente ao <a href="https://www.jaguarrescue.foundation" target="_blank" rel="noopener noreferrer">Jaguar Rescue Center</a>, vai encontrar pequenas enseadas e recantos de praia mais tranquilos. Os pontões rochosos quebram a linha costeira, por isso é fácil encontrar um local com sensação de privacidade.</>,
          "Esta zona é também um dos melhores lugares para avistar vida selvagem. Poderá ver macacos nas árvores ou uma preguiça lá bem no alto, perto da estrada.",
        ],
        tipLine: 'Dica: vá de manhã cedo para menos gente e mais atividade animal.',
      },
      {
        headingText: 'Caiaque em Punta Uva Sem Tour',
        paragraphs: [
          "Punta Uva é famosa pela sua praia, mas o rio é o verdadeiro segredo. Não precisa de um tour para o desfrutar. Basta alugar um caiaque e explorar ao seu ritmo.",
          "A água costuma estar tranquila, e a selva sente-se próxima em ambos os lados. É pacífico e fácil, mesmo que não seja um remador experiente.",
        ],
        list: { label: 'Leve consigo:', items: ['Proteção solar', 'Água e um saco impermeável', 'Distância respeitosa em relação à vida selvagem'] },
      },
      {
        headingText: 'Restaurante Caribeño 1872 para Rice and Beans',
        paragraphs: [
          <>Se quiser uma refeição verdadeiramente local, visite o <a href="https://maps.app.goo.gl/ynskDRDozJkGW1ML6" target="_blank" rel="noopener noreferrer">Restaurante Caribeño 1872</a>, pela sua comida caribenha rica e saborosa.</>,
          "O sabor é intenso, as doses são generosas e o ambiente é descontraído. É o tipo de sítio ao qual vai querer voltar.",
        ],
      },
      {
        headingText: 'Punta Mona e o Refúgio de Vida Silvestre Gandoca-Manzanillo',
        headingHref: 'https://maps.app.goo.gl/8dDzcZiUrhuuPmCy8',
        paragraphs: [
          "Punta Mona sente-se distante, no melhor sentido possível. Pode alugar um barco e pedir ao condutor que o leve ao longo da costa até às praias intocadas e margens tranquilas dentro do Refúgio Nacional de Vida Silvestre Gandoca-Manzanillo.",
          "A recompensa é água cristalina, uma linha de costa silenciosa e a sensação de ter deixado para trás o mundo agitado.",
        ],
        list: { label: 'Bom saber:', items: ['Leve lanches e água (não há lojas)', 'Vá com bom tempo e mar calmo', 'Leve consigo tudo o que trouxer'] },
      },
    ],
    tipsHeading: 'Dicas Rápidas para Aproveitar Estes Locais',
    tipsIntro: "Algumas pequenas escolhas fazem uma grande diferença em Puerto Viejo — tanto para o seu dia como para os lugares que visita.",
    tipsListItems: [
      'Comece cedo para encontrar praias calmas e temperaturas mais amenas',
      'Use protetor solar seguro para os recifes quando nadar ou fizer snorkel',
      'Mantenha uma distância respeitosa da vida selvagem',
      'Não deixe objetos de valor na praia',
    ],
    closingParagraph:
      "Estas joias escondidas são o que torna a viagem especial — águas tranquilas, costas selvagens e comida que sabe a lar nas Caraíbas. Escolha duas ou três desta lista e deixe espaço para momentos tranquilos. É aí que Puerto Viejo mostra o seu melhor lado.",
  },
  hi: {
    seoTitle: 'प्वेर्तो वियेहो की छुपी हुई जगहें: स्थानीय लोगों की पसंदीदा शांत जगहें',
    seoDescription:
      'प्वेर्तो वियेहो में मशहूर समुद्र तट, संगीत और नाइटलाइफ़ है। लेकिन इसकी कुछ सबसे अच्छी जगहें मुख्य सूची से बाहर रहती हैं। ये जगहें ज़्यादा शांत, प्रकृति के करीब और ज़्यादा निजी महसूस होती हैं। यदि आप कम भीड़ और असली स्थानीय स्वाद चाहते हैं, तो यहीं से शुरुआत करें। ये छुपी हुई जगहें पहुंचने में आसान हैं और इनके लिए मेहनत करना सार्थक है।',
    heading: 'प्वेर्तो वियेहो की छुपी हुई जगहें: स्थानीय लोगों की पसंदीदा शांत जगहें',
    heroAlt: 'कोस्टा रिका का प्वेर्तो वियेहो दे तालामांका',
    photoCredit: <>फोटो: <a href="https://commons.wikimedia.org/wiki/User:Letartean" target="_blank" rel="noopener noreferrer">Letartean</a></>,
    introParagraphs: [
      'प्वेर्तो वियेहो से प्यार करना आसान है। ज़्यादातर आगंतुक मशहूर समुद्र तटों पर जाते हैं, कस्बे में एक कॉकटेल लेते हैं, और दिन खत्म कर देते हैं। लेकिन सबसे अच्छे पल अक्सर शांत जगहों में होते हैं: छोटी खाड़ियां, रेत के छुपे हुए हिस्से, और सादा स्थानीय भोजन जिसका स्वाद कैरिबियन जैसा होता है।',
      'नीचे प्वेर्तो वियेहो के आस-पास कुछ छुपी हुई जगहें दी गई हैं जो ज़्यादा शांत और ज़्यादा निजी महसूस होती हैं। इनमें से किसी के लिए भी जटिल योजना की ज़रूरत नहीं है। आपको बस थोड़ा समय, धूप से सुरक्षा, और धीमी रफ्तार चाहिए।',
    ],
    stayRecommendationTitle: 'इन छुपी हुई जगहों तक आसान पहुंच के लिए प्वेर्तो वियेहो में कहां ठहरें',
    sections: [
      {
        headingText: 'प्लाया चिकिता',
        headingHref: 'https://maps.app.goo.gl/tTS4h2KYududsyh8A',
        paragraphs: [
          'प्लाया चिकिता रेत का एक ज़्यादा एकांत हिस्सा है जिसे कई लोग छोड़ देते हैं। यह छुपा हुआ महसूस होता है, कम भीड़ और शांत माहौल के साथ।',
          'पानी हमेशा शांत नहीं होता, लेकिन वहां का माहौल ज़रूर शांत है। यह एक धीमी सुबह के लिए बिल्कुल सही जगह है।',
        ],
        list: { label: 'इसके लिए बिल्कुल सही:', items: ['पेड़ों के नीचे आराम करना', 'पैदल घूमना', 'एक सादा पिकनिक'] },
      },
      {
        headingText: 'प्लाया ग्रांडे',
        headingHref: 'https://maps.app.goo.gl/zpRcsq96dC9MnVRU7',
        paragraphs: [
          'प्लाया ग्रांडे सर्फरों के बीच जाना जाता है, लेकिन यह इलाके के सबसे शानदार समुद्र तटों में से एक भी है। यह चौड़ा, खुला और अन्य जगहों की तुलना में कम भीड़भाड़ वाला महसूस होता है।',
          "भले ही आप सर्फिंग न करें, यह दृश्यों और लंबी सैर के लिए घूमने लायक है। बस ध्यान रखें कि लहरें तेज़ हो सकती हैं।",
        ],
        list: { label: 'जानना ज़रूरी:', items: ['तैराकों की तुलना में अनुभवी सर्फरों के लिए बेहतर', 'फोटो और सैर के लिए शानदार', 'आमतौर पर कॉक्लेस से ज़्यादा शांत'] },
      },
      {
        headingText: 'पुंटा कॉक्लेस की खाड़ियां और Jaguar Rescue Center',
        headingHref: 'https://www.jaguarrescue.foundation',
        paragraphs: [
          <><a href="https://www.jaguarrescue.foundation" target="_blank" rel="noopener noreferrer">Jaguar Rescue Center</a> के सामने, आपको छोटी खाड़ियां और समुद्र तट के ज़्यादा शांत कोने मिलेंगे। चट्टानी बिंदु तटरेखा को खंडों में बांटते हैं, इसलिए एक ऐसी जगह ढूंढना आसान है जो निजी महसूस हो।</>,
          'यह इलाका वन्यजीव देखने के लिए भी सबसे अच्छी जगहों में से एक है। आपको पेड़ों में बंदर या सड़क के पास ऊंचाई पर एक स्लॉथ दिख सकता है।',
        ],
        tipLine: 'सुझाव: कम लोगों और ज़्यादा जानवरों की गतिविधि के लिए सुबह जल्दी जाएं।',
      },
      {
        headingText: 'बिना टूर के पुंटा उवा में कयाकिंग',
        paragraphs: [
          "पुंटा उवा अपने समुद्र तट के लिए मशहूर है, लेकिन नदी असली रहस्य है। इसका आनंद लेने के लिए आपको टूर की ज़रूरत नहीं है। बस एक कयाक किराए पर लें और अपनी गति से घूमें।",
          "पानी आमतौर पर शांत होता है, और जंगल दोनों तरफ करीब महसूस होता है। यह शांतिपूर्ण और आसान है, भले ही आप एक विशेषज्ञ पैडलर न हों।",
        ],
        list: { label: 'साथ लाएं:', items: ['धूप से सुरक्षा', 'पानी और एक ड्राई बैग', 'वन्यजीवों से सम्मानजनक दूरी'] },
      },
      {
        headingText: 'राइस एंड बीन्स के लिए Restaurante Caribeño 1872',
        paragraphs: [
          <>यदि आप एक ऐसा भोजन चाहते हैं जो सचमुच स्थानीय महसूस हो, तो समृद्ध और स्वादिष्ट कैरिबियन भोजन के लिए <a href="https://maps.app.goo.gl/ynskDRDozJkGW1ML6" target="_blank" rel="noopener noreferrer">Restaurante Caribeño 1872</a> ज़रूर जाएं।</>,
          "स्वाद समृद्ध है, मात्रा उदार महसूस होती है, और माहौल आरामदेह है। यह उस तरह की जगह है जहां आप बार-बार लौटना चाहेंगे।",
        ],
      },
      {
        headingText: 'पुंटा मोना और गंडोका-मानसानियो वन्यजीव शरण्यस्थल',
        headingHref: 'https://maps.app.goo.gl/8dDzcZiUrhuuPmCy8',
        paragraphs: [
          'पुंटा मोना दूर महसूस होता है, सबसे अच्छे अर्थ में। आप एक बोट किराए पर ले सकते हैं और चालक से गंडोका-मानसानियो राष्ट्रीय वन्यजीव शरण्यस्थल के अंदर बेदाग समुद्र तटों और शांत किनारों तक तट के साथ-साथ ले जाने के लिए कह सकते हैं।',
          "इसका इनाम है साफ पानी, शांत तटरेखा, और यह एहसास कि आपने व्यस्त दुनिया को पीछे छोड़ दिया है।",
        ],
        list: { label: 'जानना ज़रूरी:', items: ['स्नैक्स और पानी साथ लाएं (यहां कोई दुकान नहीं है)', 'शांत मौसम और समुद्र की स्थिति में जाएं', 'जो कुछ भी लाएं, उसे वापस अपने साथ ले जाएं'] },
      },
    ],
    tipsHeading: 'इन जगहों का आनंद लेने के लिए झटपट सुझाव',
    tipsIntro: 'कुछ छोटे फैसले प्वेर्तो वियेहो में बड़ा फर्क डालते हैं - आपके दिन के लिए भी और जिन जगहों पर आप जाते हैं उनके लिए भी।',
    tipsListItems: [
      'शांत समुद्र तट और ठंडे मौसम के लिए जल्दी शुरुआत करें',
      'तैरते या स्नॉर्कल करते समय रीफ-सेफ सनस्क्रीन का उपयोग करें',
      'वन्यजीवों से सम्मानजनक दूरी बनाए रखें',
      'समुद्र तट पर कीमती सामान न छोड़ें',
    ],
    closingParagraph:
      "ये छुपी हुई जगहें ही यात्रा को खास बनाती हैं - शांत पानी, जंगली तटरेखाएं, और ऐसा खाना जिसका स्वाद कैरिबियन में घर जैसा लगता है। इस सूची में से दो या तीन चुनें और धीमे पलों के लिए जगह छोड़ें। तभी प्वेर्तो वियेहो अपना सबसे अच्छा रूप दिखाता है।",
  },
};

export function puertoHiddenGemsContent(locale: Locale): PuertoHiddenGemsContent {
  return puertoHiddenGems[locale] ?? puertoHiddenGems.en!;
}

export interface BusHoursContent {
  seoTitle: string;
  seoDescription: string;
  heading: string;
  photoCredit: React.ReactNode;
  introParagraph: React.ReactNode;
  aboutHeading: string;
  aboutParagraph1: React.ReactNode;
  aboutParagraph2: string;
  stayRecommendationTitle: string;
  routesHeading: string;
  routesIntro: string;
  destinations: [string, string, string, string, string];
  schedulesHeading: string;
  sanJoseHeading: string;
  sanJoseIntro: string;
  limonHeading: string;
  limonIntro: string;
  manzanilloHeading: string;
  manzanilloIntro: string;
  sixaolaHeading: string;
  sixaolaIntro: string;
  tableRouteHeader: string;
  tableDepartureHeader: string;
  tableWeekdayHeader: string;
  tableSundayHeader: string;
  tipsHeading: string;
  tipsListItems: [string, string, string, string, string];
  ticketsHeading: string;
  ticketsParagraph: string;
  contactHeading: string;
  contactIntro: string;
  closingParagraph: string;
}

const busHours: Partial<Record<Locale, BusHoursContent>> = {
  en: {
    seoTitle: 'Complete Bus Schedule from Puerto Viejo, Costa Rica - MEPE Bus Routes & Timetables',
    seoDescription:
      "Find the complete bus schedule from Puerto Viejo to San Jose, Limón, Cahuita, Manzanillo, and Sixaola. MEPE bus timetables, routes, and transportation information for Costa Rica's Caribbean coast.",
    heading: 'Complete Bus Schedule from Puerto Viejo, Costa Rica - MEPE Bus Routes & Timetables',
    photoCredit: <>Photo by <a href="https://web.archive.org/web/20161028110553/http://www.panoramio.com/user/4645711?with_photo_id=101824520" target="_blank" rel="noopener noreferrer">hh oldman</a></>,
    introParagraph:
      <>Planning your transportation in Costa Rica's Caribbean coast? Look no further! This comprehensive guide provides you with all the bus schedules you need to travel from Puerto Viejo to major destinations including <strong>San Jose</strong>, <strong>Limón</strong>, <strong>Cahuita</strong>, <strong>Manzanillo</strong>, and <strong>Sixaola</strong>. Whether you're searching for "bus San Jose Puerto Viejo", "bus Cahuita Puerto Viejo", or "bus from Puerto Viejo to San Jose", we've got you covered with the most up-to-date MEPE bus timetables.</>,
    aboutHeading: 'About MEPE Bus Service',
    aboutParagraph1:
      <><strong><a href="https://www.mepe.co.cr/Ingles/index.html" target="_blank" rel="noopener noreferrer">MEPE</a> (Empresa de Transportes Públicos de Limón)</strong> is the primary bus company operating throughout Costa Rica's Caribbean coast. Known for their reliable service and extensive network, MEPE buses connect Puerto Viejo with major cities and tourist destinations across the region. Their modern fleet provides comfortable transportation for both locals and visitors, making it the preferred choice for budget-conscious travelers exploring Costa Rica's stunning Caribbean coastline.</>,
    aboutParagraph2:
      'MEPE buses are easily recognizable by their distinctive blue and white colors, and they operate on fixed schedules that are generally punctual. The company has been serving the Caribbean region for decades, building a reputation for safety, affordability, and comprehensive coverage of the area\'s most important routes.',
    // The pre-merge Spanish page's title here ("¿Dónde hospedarte para visitar
    // el Parque Nacional Cahuita?") belonged to a different article — see the
    // CahuitaPark commit, which found the reverse: a stray StayRecommendation
    // with this article's title. The two pages were cross-contaminated.
    stayRecommendationTitle: 'Where to stay while using Puerto Viejo bus services?',
    routesHeading: 'Bus Routes from Puerto Viejo',
    routesIntro: 'Puerto Viejo serves as a major transportation hub for the Southern Caribbean region. From here, you can easily reach:',
    destinations: [
      "San Jose - Costa Rica's capital city (approximately 4-5 hours)",
      'Limón - The Caribbean port city (approximately 1 hour)',
      'Cahuita - Famous for its national park and beaches (approximately 30 minutes)',
      'Manzanillo - Gateway to Gandoca-Manzanillo Wildlife Refuge (approximately 20 minutes)',
      'Sixaola - Border town with Panama (approximately 1.5 hours)',
    ],
    schedulesHeading: 'Complete Bus Schedules',
    sanJoseHeading: 'San José ↔ Puerto Viejo (stops in Cahuita)',
    sanJoseIntro: "This is the main route connecting Puerto Viejo with Costa Rica's capital city. Perfect for travelers arriving from or heading to San José International Airport.",
    limonHeading: 'Limón ↔ Puerto Viejo (stops in Cahuita)',
    limonIntro: 'This is one of the most frequent routes, connecting Puerto Viejo with the port city of Limón. Perfect for travelers heading to or from San Jose, as Limón serves as a major connection point.',
    manzanilloHeading: 'Puerto Viejo ↔ Manzanillo',
    manzanilloIntro: 'This route takes you to the beautiful beaches of Manzanillo and provides access to the Gandoca-Manzanillo National Wildlife Refuge.',
    sixaolaHeading: 'Sixaola ↔ Puerto Viejo (stops in Bri Bri)',
    sixaolaIntro: 'This route connects Puerto Viejo with the border town of Sixaola, perfect for travelers heading to Panama. The route also stops in Bri Bri, providing access to indigenous communities and cultural experiences.',
    tableRouteHeader: 'Route',
    tableDepartureHeader: 'Departure Times',
    tableWeekdayHeader: 'Monday - Saturday',
    tableSundayHeader: 'Sunday & Holidays',
    tipsHeading: 'Tips for Bus Travel in Puerto Viejo',
    tipsListItems: [
      'Arrive Early: Buses can fill up quickly, especially during peak tourist season',
      'Cash Only: MEPE buses accept cash payments only - have colones ready',
      'Baggage: Small bags can be stored overhead, larger luggage goes in the cargo area',
      'Comfort: Bring water and snacks for longer journeys',
      'Connections: while Limón is the main hub for connections to San Jose and other destinations, you can also get to Puerto Viejo from San Jose.',
    ],
    ticketsHeading: 'Where to Buy Tickets',
    ticketsParagraph: 'Bus tickets can be purchased at the main bus stops in Puerto Viejo. The primary bus stop is located near the basketball court in downtown Puerto Viejo, close to the Deleite Ice Cream Shop.',
    contactHeading: 'Contact for Bus Information',
    contactIntro: 'Need updated information about schedules or routes? You can contact the bus company via WhatsApp for the most current information about bus services:',
    closingParagraph: 'For the most comfortable stay while exploring the Caribbean coast, consider booking one of our fully equipped homes in Puerto Viejo or Playa Chiquita. We offer convenient locations near bus stops and provide all the amenities you need for a perfect Costa Rican getaway!',
  },
  es: {
    seoTitle: 'Horarios Completos de Autobuses desde Puerto Viejo, Costa Rica - Rutas y Horarios MEPE',
    seoDescription:
      'Encuentra los horarios completos de autobuses desde Puerto Viejo hacia San José, Limón, Cahuita, Manzanillo y Sixaola. Horarios MEPE, rutas e información de transporte para la costa caribeña de Costa Rica.',
    heading: 'Horarios Completos de Autobuses desde Puerto Viejo, Costa Rica - Rutas y Horarios MEPE',
    photoCredit: <>Foto de <a href="https://web.archive.org/web/20161028110553/http://www.panoramio.com/user/4645711?with_photo_id=101824520" target="_blank" rel="noopener noreferrer">hh oldman</a></>,
    introParagraph:
      <>¿Planificando tu transporte en la costa caribeña de Costa Rica? ¡No busques más! Esta guía completa te proporciona todos los horarios de autobuses que necesitas para viajar desde Puerto Viejo a destinos principales incluyendo <strong>San José</strong>, <strong>Limón</strong>, <strong>Cahuita</strong>, <strong>Manzanillo</strong> y <strong>Sixaola</strong>. Ya sea que busques "autobús San José Puerto Viejo", "autobús Cahuita Puerto Viejo" o "autobús de Puerto Viejo a San José", te tenemos cubierto con los horarios MEPE más actualizados.</>,
    aboutHeading: 'Acerca del Servicio de Autobuses MEPE',
    aboutParagraph1:
      <><strong><a href="https://www.mepe.co.cr/Ingles/index.html" target="_blank" rel="noopener noreferrer">MEPE</a> (Empresa de Transportes Públicos de Limón)</strong> es la empresa de autobuses principal que opera en toda la costa caribeña de Costa Rica. Conocida por su servicio confiable y red extensa, los autobuses MEPE conectan Puerto Viejo con las principales ciudades y destinos turísticos de la región. Su flota moderna proporciona transporte cómodo tanto para locales como visitantes, convirtiéndola en la opción preferida para viajeros conscientes del presupuesto que exploran la impresionante costa caribeña de Costa Rica.</>,
    aboutParagraph2:
      'Los autobuses MEPE son fácilmente reconocibles por sus distintivos colores azul y blanco, y operan en horarios fijos que generalmente son puntuales. La empresa ha estado sirviendo a la región del Caribe durante décadas, construyendo una reputación de seguridad, asequibilidad y cobertura integral de las rutas más importantes del área.',
    stayRecommendationTitle: '¿Dónde hospedarte mientras usas los servicios de autobús de Puerto Viejo?',
    routesHeading: 'Rutas de Autobuses desde Puerto Viejo',
    routesIntro: 'Puerto Viejo sirve como un importante centro de transporte para la región del Caribe Sur. Desde aquí, puedes llegar fácilmente a:',
    destinations: [
      'San José - La capital de Costa Rica (aproximadamente 4-5 horas)',
      'Limón - La ciudad portuaria del Caribe (aproximadamente 1 hora)',
      'Cahuita - Famosa por su parque nacional y playas (aproximadamente 30 minutos)',
      'Manzanillo - Puerta de entrada al Refugio de Vida Silvestre Gandoca-Manzanillo (aproximadamente 20 minutos)',
      'Sixaola - Ciudad fronteriza con Panamá (aproximadamente 1.5 horas)',
    ],
    schedulesHeading: 'Horarios Completos de Autobuses',
    sanJoseHeading: 'San José ↔ Puerto Viejo (para en Cahuita)',
    sanJoseIntro: 'Esta es la ruta principal que conecta Puerto Viejo con la capital de Costa Rica. Perfecta para viajeros que llegan o se dirigen al Aeropuerto Internacional de San José.',
    limonHeading: 'Limón ↔ Puerto Viejo (para en Cahuita)',
    limonIntro: 'Esta es una de las rutas más frecuentes, conectando Puerto Viejo con la ciudad portuaria de Limón. Perfecta para viajeros que se dirigen hacia o desde San José, ya que Limón sirve como un importante punto de conexión.',
    manzanilloHeading: 'Puerto Viejo ↔ Manzanillo',
    manzanilloIntro: 'Esta ruta te lleva a las hermosas playas de Manzanillo y proporciona acceso al Refugio Nacional de Vida Silvestre Gandoca-Manzanillo.',
    sixaolaHeading: 'Sixaola ↔ Puerto Viejo (para en Bri Bri)',
    sixaolaIntro: 'Esta ruta conecta Puerto Viejo con la ciudad fronteriza de Sixaola, perfecta para viajeros que se dirigen a Panamá. La ruta también para en Bri Bri, proporcionando acceso a comunidades indígenas y experiencias culturales.',
    tableRouteHeader: 'Ruta',
    tableDepartureHeader: 'Horarios de Salida',
    tableWeekdayHeader: 'Lunes - Sábado',
    tableSundayHeader: 'Domingo y Feriados',
    tipsHeading: 'Consejos para Viajar en Autobús en Puerto Viejo',
    tipsListItems: [
      'Llega Temprano: Los autobuses pueden llenarse rápidamente, especialmente durante la temporada alta turística',
      'Solo Efectivo: Los autobuses MEPE solo aceptan pagos en efectivo - ten colones listos',
      'Equipaje: Las bolsas pequeñas se pueden guardar arriba, el equipaje más grande va en el área de carga',
      'Comodidad: Trae agua y bocadillos para viajes más largos',
      'Conexiones: aunque Limón es el centro principal para conexiones a San José y otros destinos, también puedes llegar a Puerto Viejo desde San José.',
    ],
    ticketsHeading: 'Dónde Comprar Boletos',
    ticketsParagraph: 'Los boletos de autobús se pueden comprar en las paradas principales de autobús en Puerto Viejo. La parada principal de autobús está ubicada cerca de la cancha de baloncesto en el centro de Puerto Viejo, cerca de la Heladería Deleite.',
    contactHeading: 'Contacto para Información de Autobuses',
    contactIntro: '¿Necesitas información actualizada sobre horarios o rutas? Puedes contactar por WhatsApp la empresa de buses para obtener la información más reciente sobre los servicios de autobús:',
    closingParagraph: 'Para la estadía más cómoda mientras exploras la costa caribeña, considera reservar una de nuestras casas completamente equipadas en Puerto Viejo o Playa Chiquita. ¡Ofrecemos ubicaciones convenientes cerca de las paradas de autobús y proporcionamos todas las comodidades que necesitas para una escapada perfecta costarricense!',
  },
  fr: {
    seoTitle: 'Horaires complets des bus depuis Puerto Viejo, Costa Rica - Itinéraires et horaires MEPE',
    seoDescription:
      "Retrouvez les horaires complets des bus depuis Puerto Viejo vers San José, Limón, Cahuita, Manzanillo et Sixaola. Horaires, itinéraires et informations de transport MEPE pour la côte caribéenne du Costa Rica.",
    heading: 'Horaires complets des bus depuis Puerto Viejo, Costa Rica - Itinéraires et horaires MEPE',
    photoCredit: <>Photo par <a href="https://web.archive.org/web/20161028110553/http://www.panoramio.com/user/4645711?with_photo_id=101824520" target="_blank" rel="noopener noreferrer">hh oldman</a></>,
    introParagraph:
      <>Vous planifiez votre transport sur la côte caribéenne du Costa Rica ? Ne cherchez plus ! Ce guide complet vous fournit tous les horaires de bus nécessaires pour voyager depuis Puerto Viejo vers les principales destinations, notamment <strong>San José</strong>, <strong>Limón</strong>, <strong>Cahuita</strong>, <strong>Manzanillo</strong> et <strong>Sixaola</strong>. Que vous recherchiez « bus San José Puerto Viejo », « bus Cahuita Puerto Viejo » ou « bus de Puerto Viejo à San José », nous avons ce qu'il vous faut avec les horaires MEPE les plus à jour.</>,
    aboutHeading: 'À propos du service de bus MEPE',
    aboutParagraph1:
      <><strong><a href="https://www.mepe.co.cr/Ingles/index.html" target="_blank" rel="noopener noreferrer">MEPE</a> (Empresa de Transportes Públicos de Limón)</strong> est la principale compagnie de bus opérant sur toute la côte caribéenne du Costa Rica. Reconnue pour son service fiable et son vaste réseau, les bus MEPE relient Puerto Viejo aux principales villes et destinations touristiques de la région. Sa flotte moderne offre un transport confortable aussi bien aux habitants qu'aux visiteurs, ce qui en fait le choix privilégié des voyageurs soucieux de leur budget qui explorent la magnifique côte caribéenne du Costa Rica.</>,
    aboutParagraph2:
      "Les bus MEPE se reconnaissent facilement à leurs couleurs bleu et blanc distinctives, et fonctionnent selon des horaires fixes généralement ponctuels. L'entreprise dessert la région caribéenne depuis des décennies, se forgeant une réputation de sécurité, d'accessibilité et de couverture complète des itinéraires les plus importants de la zone.",
    stayRecommendationTitle: 'Où loger tout en utilisant les services de bus de Puerto Viejo ?',
    routesHeading: 'Itinéraires de bus depuis Puerto Viejo',
    routesIntro:
      "Puerto Viejo est un important carrefour de transport pour la région des Caraïbes sud. Depuis ici, vous pouvez facilement rejoindre :",
    destinations: [
      'San José - la capitale du Costa Rica (environ 4 à 5 heures)',
      'Limón - la ville portuaire des Caraïbes (environ 1 heure)',
      'Cahuita - réputée pour son parc national et ses plages (environ 30 minutes)',
      "Manzanillo - porte d'entrée du Refuge national de vie sauvage de Gandoca-Manzanillo (environ 20 minutes)",
      'Sixaola - ville frontalière avec le Panama (environ 1h30)',
    ],
    schedulesHeading: 'Horaires complets des bus',
    sanJoseHeading: 'San José ↔ Puerto Viejo (arrêt à Cahuita)',
    sanJoseIntro:
      "C'est l'itinéraire principal reliant Puerto Viejo à la capitale du Costa Rica. Idéal pour les voyageurs arrivant ou se dirigeant vers l'aéroport international de San José.",
    limonHeading: 'Limón ↔ Puerto Viejo (arrêt à Cahuita)',
    limonIntro:
      "C'est l'un des itinéraires les plus fréquents, reliant Puerto Viejo à la ville portuaire de Limón. Idéal pour les voyageurs se dirigeant vers ou depuis San José, Limón servant de point de connexion majeur.",
    manzanilloHeading: 'Puerto Viejo ↔ Manzanillo',
    manzanilloIntro:
      "Cet itinéraire vous mène aux magnifiques plages de Manzanillo et donne accès au Refuge national de vie sauvage de Gandoca-Manzanillo.",
    sixaolaHeading: 'Sixaola ↔ Puerto Viejo (arrêt à Bri Bri)',
    sixaolaIntro:
      "Cet itinéraire relie Puerto Viejo à la ville frontalière de Sixaola, idéal pour les voyageurs se dirigeant vers le Panama. L'itinéraire s'arrête également à Bri Bri, donnant accès à des communautés indigènes et à des expériences culturelles.",
    tableRouteHeader: 'Trajet',
    tableDepartureHeader: 'Horaires de départ',
    tableWeekdayHeader: 'Lundi - Samedi',
    tableSundayHeader: 'Dimanche et jours fériés',
    tipsHeading: 'Conseils pour voyager en bus à Puerto Viejo',
    tipsListItems: [
      'Arrivez tôt : les bus peuvent se remplir rapidement, surtout en haute saison touristique',
      "Espèces uniquement : les bus MEPE n'acceptent que les paiements en espèces - ayez des colones à disposition",
      'Bagages : les petits sacs peuvent être rangés en hauteur, les bagages plus volumineux vont dans la soute',
      "Confort : apportez de l'eau et des en-cas pour les trajets plus longs",
      "Correspondances : bien que Limón soit le principal point de connexion vers San José et d'autres destinations, vous pouvez également rejoindre Puerto Viejo depuis San José.",
    ],
    ticketsHeading: 'Où acheter les billets',
    ticketsParagraph:
      "Les billets de bus peuvent être achetés aux principaux arrêts de bus de Puerto Viejo. L'arrêt de bus principal est situé près du terrain de basketball, au centre de Puerto Viejo, à proximité de la boutique de glaces Deleite.",
    contactHeading: 'Contact pour les informations sur les bus',
    contactIntro:
      "Besoin d'informations actualisées sur les horaires ou les itinéraires ? Vous pouvez contacter la compagnie de bus par WhatsApp pour obtenir les informations les plus récentes sur les services de bus :",
    closingParagraph:
      "Pour un séjour des plus confortables lors de l'exploration de la côte caribéenne, envisagez de réserver l'une de nos maisons entièrement équipées à Puerto Viejo ou à Playa Chiquita. Nous offrons des emplacements pratiques près des arrêts de bus et fournissons toutes les commodités nécessaires pour une escapade costaricienne parfaite !",
  },
  de: {
    seoTitle: 'Vollständiger Busfahrplan ab Puerto Viejo, Costa Rica – MEPE-Busrouten und Fahrpläne',
    seoDescription:
      "Finden Sie den vollständigen Busfahrplan von Puerto Viejo nach San José, Limón, Cahuita, Manzanillo und Sixaola. MEPE-Fahrpläne, Routen und Transportinformationen für die Karibikküste Costa Ricas.",
    heading: 'Vollständiger Busfahrplan ab Puerto Viejo, Costa Rica – MEPE-Busrouten und Fahrpläne',
    photoCredit: <>Foto von <a href="https://web.archive.org/web/20161028110553/http://www.panoramio.com/user/4645711?with_photo_id=101824520" target="_blank" rel="noopener noreferrer">hh oldman</a></>,
    introParagraph:
      <>Planen Sie Ihren Transport an der Karibikküste Costa Ricas? Suchen Sie nicht weiter! Dieser umfassende Leitfaden bietet Ihnen alle Busfahrpläne, die Sie benötigen, um von Puerto Viejo zu wichtigen Zielen wie <strong>San José</strong>, <strong>Limón</strong>, <strong>Cahuita</strong>, <strong>Manzanillo</strong> und <strong>Sixaola</strong> zu reisen. Egal, ob Sie nach „Bus San José Puerto Viejo", „Bus Cahuita Puerto Viejo" oder „Bus von Puerto Viejo nach San José" suchen – wir haben Sie mit den aktuellsten MEPE-Fahrplänen abgedeckt.</>,
    aboutHeading: 'Über den MEPE-Busservice',
    aboutParagraph1:
      <><strong><a href="https://www.mepe.co.cr/Ingles/index.html" target="_blank" rel="noopener noreferrer">MEPE</a> (Empresa de Transportes Públicos de Limón)</strong> ist das wichtigste Busunternehmen, das an der gesamten Karibikküste Costa Ricas verkehrt. Bekannt für seinen zuverlässigen Service und sein weitreichendes Netz verbinden die MEPE-Busse Puerto Viejo mit den wichtigsten Städten und Touristenzielen der Region. Ihre moderne Flotte bietet sowohl Einheimischen als auch Besuchern einen komfortablen Transport und macht sie zur bevorzugten Wahl für budgetbewusste Reisende, die die atemberaubende Karibikküste Costa Ricas erkunden.</>,
    aboutParagraph2:
      'MEPE-Busse sind leicht an ihren markanten blau-weißen Farben zu erkennen und verkehren nach festen Fahrplänen, die im Allgemeinen pünktlich eingehalten werden. Das Unternehmen bedient die karibische Region seit Jahrzehnten und hat sich einen Ruf für Sicherheit, Erschwinglichkeit und eine umfassende Abdeckung der wichtigsten Routen der Gegend erarbeitet.',
    stayRecommendationTitle: 'Wo übernachten, während Sie die Busdienste von Puerto Viejo nutzen?',
    routesHeading: 'Busrouten ab Puerto Viejo',
    routesIntro: 'Puerto Viejo dient als wichtiger Verkehrsknotenpunkt für die Südkaribik-Region. Von hier aus erreichen Sie problemlos:',
    destinations: [
      "San José – die Hauptstadt Costa Ricas (etwa 4-5 Stunden)",
      'Limón – die karibische Hafenstadt (etwa 1 Stunde)',
      'Cahuita – berühmt für seinen Nationalpark und seine Strände (etwa 30 Minuten)',
      'Manzanillo – Tor zum Wildschutzgebiet Gandoca-Manzanillo (etwa 20 Minuten)',
      'Sixaola – Grenzstadt zu Panama (etwa 1,5 Stunden)',
    ],
    schedulesHeading: 'Vollständige Busfahrpläne',
    sanJoseHeading: 'San José ↔ Puerto Viejo (Halt in Cahuita)',
    sanJoseIntro: "Dies ist die Hauptroute, die Puerto Viejo mit der Hauptstadt Costa Ricas verbindet. Perfekt für Reisende, die vom internationalen Flughafen San José ankommen oder dorthin fahren.",
    limonHeading: 'Limón ↔ Puerto Viejo (Halt in Cahuita)',
    limonIntro: 'Dies ist eine der am häufigsten befahrenen Routen und verbindet Puerto Viejo mit der Hafenstadt Limón. Perfekt für Reisende, die von oder nach San José unterwegs sind, da Limón als wichtiger Umsteigepunkt dient.',
    manzanilloHeading: 'Puerto Viejo ↔ Manzanillo',
    manzanilloIntro: 'Diese Route bringt Sie zu den wunderschönen Stränden von Manzanillo und ermöglicht den Zugang zum Nationalen Wildschutzgebiet Gandoca-Manzanillo.',
    sixaolaHeading: 'Sixaola ↔ Puerto Viejo (Halt in Bri Bri)',
    sixaolaIntro: 'Diese Route verbindet Puerto Viejo mit der Grenzstadt Sixaola und ist perfekt für Reisende, die nach Panama weiterreisen. Die Route hält außerdem in Bri Bri und ermöglicht so den Zugang zu indigenen Gemeinschaften und kulturellen Erlebnissen.',
    tableRouteHeader: 'Route',
    tableDepartureHeader: 'Abfahrtszeiten',
    tableWeekdayHeader: 'Montag - Samstag',
    tableSundayHeader: 'Sonntag & Feiertage',
    tipsHeading: 'Tipps für Busreisen in Puerto Viejo',
    tipsListItems: [
      'Früh ankommen: Busse können sich schnell füllen, besonders während der Hauptreisesaison',
      'Nur Bargeld: MEPE-Busse akzeptieren nur Barzahlung – halten Sie Colones bereit',
      'Gepäck: Kleine Taschen können über dem Sitz verstaut werden, größeres Gepäck kommt in den Laderaum',
      'Komfort: Bringen Sie Wasser und Snacks für längere Fahrten mit',
      'Anschlüsse: Obwohl Limón der Hauptknotenpunkt für Anschlüsse nach San José und andere Ziele ist, können Sie auch direkt von San José nach Puerto Viejo gelangen.',
    ],
    ticketsHeading: 'Wo Sie Tickets kaufen können',
    ticketsParagraph: 'Busfahrkarten können an den wichtigsten Bushaltestellen in Puerto Viejo gekauft werden. Die Hauptbushaltestelle befindet sich in der Nähe des Basketballplatzes im Zentrum von Puerto Viejo, nahe der Eisdiele Deleite.',
    contactHeading: 'Kontakt für Businformationen',
    contactIntro: 'Benötigen Sie aktuelle Informationen zu Fahrplänen oder Routen? Sie können das Busunternehmen über WhatsApp kontaktieren, um die aktuellsten Informationen zu den Busdiensten zu erhalten:',
    closingParagraph: 'Für den komfortabelsten Aufenthalt beim Erkunden der Karibikküste empfehlen wir Ihnen, eines unserer voll ausgestatteten Häuser in Puerto Viejo oder Playa Chiquita zu buchen. Wir bieten günstige Lagen in der Nähe von Bushaltestellen und alle Annehmlichkeiten, die Sie für einen perfekten Costa-Rica-Urlaub brauchen!',
  },
  he: {
    seoTitle: 'לוח זמנים מלא של אוטובוסים מפוארטו ויחו, קוסטה ריקה - מסלולים ולוחות זמנים של MEPE',
    seoDescription:
      "מצאו את לוח הזמנים המלא של האוטובוסים מפוארטו ויחו לסן חוזה, לימון, קאוויטה, מנסניו וסיקסאולה. לוחות זמנים, מסלולים ומידע תחבורתי של MEPE עבור החוף הקריבי של קוסטה ריקה.",
    heading: 'לוח זמנים מלא של אוטובוסים מפוארטו ויחו, קוסטה ריקה - מסלולים ולוחות זמנים של MEPE',
    photoCredit: <>צילום מאת <a href="https://web.archive.org/web/20161028110553/http://www.panoramio.com/user/4645711?with_photo_id=101824520" target="_blank" rel="noopener noreferrer">hh oldman</a></>,
    introParagraph:
      <>מתכננים את התחבורה שלכם בחוף הקריבי של קוסטה ריקה? אל תחפשו יותר! מדריך מקיף זה מספק לכם את כל לוחות הזמנים של האוטובוסים שאתם צריכים כדי לנסוע מפוארטו ויחו ליעדים המרכזיים, כולל <strong>סן חוזה</strong>, <strong>לימון</strong>, <strong>קאוויטה</strong>, <strong>מנסניו</strong>, ו<strong>סיקסאולה</strong>. בין אם אתם מחפשים "אוטובוס סן חוזה פוארטו ויחו", "אוטובוס קאוויטה פוארטו ויחו", או "אוטובוס מפוארטו ויחו לסן חוזה", אנחנו מכסים אתכם עם לוחות הזמנים המעודכנים ביותר של MEPE.</>,
    aboutHeading: 'אודות שירות האוטובוסים MEPE',
    aboutParagraph1:
      <><strong><a href="https://www.mepe.co.cr/Ingles/index.html" target="_blank" rel="noopener noreferrer">MEPE</a> (Empresa de Transportes Públicos de Limón)</strong> היא חברת האוטובוסים העיקרית הפועלת לאורך כל החוף הקריבי של קוסטה ריקה. ידועה בזכות השירות האמין והרשת הענפה שלה, אוטובוסי MEPE מחברים את פוארטו ויחו עם ערים מרכזיות ויעדי תיירות ברחבי האזור. הצי המודרני שלהם מספק תחבורה נוחה הן לתושבים המקומיים והן למבקרים, מה שהופך אותה לבחירה המועדפת עבור נוסעים מודעי-תקציב החוקרים את קו החוף הקריבי המדהים של קוסטה ריקה.</>,
    aboutParagraph2:
      'אוטובוסי MEPE ניתנים לזיהוי בקלות בזכות הצבעים הכחולים והלבנים הייחודיים שלהם, והם פועלים לפי לוחות זמנים קבועים שבדרך כלל עומדים בזמנים. החברה משרתת את אזור הקריביים כבר עשרות שנים, ובנתה מוניטין של בטיחות, מחירים נוחים וכיסוי מקיף של המסלולים החשובים ביותר באזור.',
    stayRecommendationTitle: 'היכן להתארח בזמן שימוש בשירותי האוטובוס של פוארטו ויחו?',
    routesHeading: 'מסלולי אוטובוס מפוארטו ויחו',
    routesIntro: 'פוארטו ויחו משמשת כמרכז תחבורה מרכזי לאזור הקריביים הדרומי. מכאן, תוכלו להגיע בקלות אל:',
    destinations: [
      'סן חוזה - בירת קוסטה ריקה (כ-4 עד 5 שעות)',
      'לימון - עיר הנמל הקריבית (כשעה)',
      'קאוויטה - מפורסמת בזכות הפארק הלאומי והחופים שלה (כ-30 דקות)',
      'מנסניו - שער הכניסה לרפוגיו לחיות בר גנדוקה-מנסניו (כ-20 דקות)',
      'סיקסאולה - עיירת גבול עם פנמה (כשעה וחצי)',
    ],
    schedulesHeading: 'לוחות זמנים מלאים של האוטובוסים',
    sanJoseHeading: 'סן חוזה ↔ פוארטו ויחו (עוצר בקאוויטה)',
    sanJoseIntro: 'זהו המסלול הראשי המחבר את פוארטו ויחו עם בירת קוסטה ריקה. מושלם עבור נוסעים המגיעים משדה התעופה הבינלאומי של סן חוזה או נוסעים אליו.',
    limonHeading: 'לימון ↔ פוארטו ויחו (עוצר בקאוויטה)',
    limonIntro: 'זהו אחד המסלולים התכופים ביותר, המחבר את פוארטו ויחו עם עיר הנמל לימון. מושלם עבור נוסעים הנוסעים אל סן חוזה או ממנה, שכן לימון משמשת כנקודת חיבור מרכזית.',
    manzanilloHeading: 'פוארטו ויחו ↔ מנסניו',
    manzanilloIntro: 'מסלול זה לוקח אתכם לחופים היפים של מנסניו ומספק גישה לרפוגיו הלאומי לחיות בר גנדוקה-מנסניו.',
    sixaolaHeading: 'סיקסאולה ↔ פוארטו ויחו (עוצר בברי ברי)',
    sixaolaIntro: 'מסלול זה מחבר את פוארטו ויחו עם עיירת הגבול סיקסאולה, מושלם עבור נוסעים הנוסעים לפנמה. המסלול עוצר גם בברי ברי, ומספק גישה לקהילות ילידיות וחוויות תרבותיות.',
    tableRouteHeader: 'מסלול',
    tableDepartureHeader: 'שעות יציאה',
    tableWeekdayHeader: 'שני - שבת',
    tableSundayHeader: 'ראשון וחגים',
    tipsHeading: 'טיפים לנסיעה באוטובוס בפוארטו ויחו',
    tipsListItems: [
      'הגיעו מוקדם: האוטובוסים עלולים להתמלא במהירות, במיוחד בעונת התיירות השיא',
      'מזומן בלבד: אוטובוסי MEPE מקבלים תשלום במזומן בלבד - הכינו קולונים מראש',
      'מטען: תיקים קטנים ניתן לאחסן מעל הראש, מטען גדול יותר הולך לאזור המטען',
      'נוחות: הביאו מים וחטיפים לנסיעות ארוכות יותר',
      'חיבורים: אף על פי שלימון היא המרכז הראשי לחיבורים לסן חוזה וליעדים אחרים, אפשר גם להגיע לפוארטו ויחו מסן חוזה.',
    ],
    ticketsHeading: 'היכן לקנות כרטיסים',
    ticketsParagraph: 'כרטיסי אוטובוס ניתן לרכוש בתחנות האוטובוס הראשיות בפוארטו ויחו. תחנת האוטובוס העיקרית ממוקמת ליד מגרש הכדורסל במרכז פוארטו ויחו, בקרבת חנות הגלידה Deleite.',
    contactHeading: 'יצירת קשר למידע על אוטובוסים',
    contactIntro: 'צריכים מידע מעודכן על לוחות זמנים או מסלולים? תוכלו ליצור קשר עם חברת האוטובוסים דרך וואטסאפ לקבלת המידע העדכני ביותר על שירותי האוטובוס:',
    closingParagraph: 'לשהות הנוחה ביותר בזמן חקירת החוף הקריבי, שקלו להזמין את אחד הבתים המאובזרים במלואם שלנו בפוארטו ויחו או בפלאיה צ\'יקיטה. אנו מציעים מיקומים נוחים ליד תחנות האוטובוס ומספקים את כל השירותים שאתם צריכים לחופשה קוסטריקנית מושלמת!',
  },
  it: {
    seoTitle: 'Orario Completo degli Autobus da Puerto Viejo, Costa Rica - Percorsi e Orari MEPE',
    seoDescription:
      "Trova l'orario completo degli autobus da Puerto Viejo verso San José, Limón, Cahuita, Manzanillo e Sixaola. Orari, tratte e informazioni sui trasporti MEPE per la costa caraibica della Costa Rica.",
    heading: 'Orario Completo degli Autobus da Puerto Viejo, Costa Rica - Percorsi e Orari MEPE',
    photoCredit: <>Foto di <a href="https://web.archive.org/web/20161028110553/http://www.panoramio.com/user/4645711?with_photo_id=101824520" target="_blank" rel="noopener noreferrer">hh oldman</a></>,
    introParagraph:
      <>Stai pianificando i tuoi spostamenti sulla costa caraibica della Costa Rica? Non cercare oltre! Questa guida completa ti offre tutti gli orari degli autobus di cui hai bisogno per viaggiare da Puerto Viejo verso le principali destinazioni, tra cui <strong>San José</strong>, <strong>Limón</strong>, <strong>Cahuita</strong>, <strong>Manzanillo</strong> e <strong>Sixaola</strong>. Che tu stia cercando "autobus San José Puerto Viejo", "autobus Cahuita Puerto Viejo" o "autobus da Puerto Viejo a San José", abbiamo tutto ciò che ti serve con gli orari MEPE più aggiornati.</>,
    aboutHeading: 'Informazioni sul Servizio Autobus MEPE',
    aboutParagraph1:
      <><strong><a href="https://www.mepe.co.cr/Ingles/index.html" target="_blank" rel="noopener noreferrer">MEPE</a> (Empresa de Transportes Públicos de Limón)</strong> è la principale compagnia di autobus che opera lungo tutta la costa caraibica della Costa Rica. Conosciuta per il suo servizio affidabile e la rete estesa, gli autobus MEPE collegano Puerto Viejo con le principali città e destinazioni turistiche della regione. La loro flotta moderna offre un trasporto confortevole sia ai locali sia ai visitatori, rendendola la scelta preferita dai viaggiatori attenti al budget che esplorano la splendida costa caraibica della Costa Rica.</>,
    aboutParagraph2:
      "Gli autobus MEPE sono facilmente riconoscibili per i loro caratteristici colori blu e bianco, e operano secondo orari fissi generalmente puntuali. L'azienda serve la regione caraibica da decenni, costruendosi una reputazione di sicurezza, convenienza e copertura completa delle tratte più importanti della zona.",
    stayRecommendationTitle: 'Dove alloggiare mentre usi i servizi di autobus di Puerto Viejo?',
    routesHeading: 'Tratte degli Autobus da Puerto Viejo',
    routesIntro: 'Puerto Viejo funge da importante snodo dei trasporti per la regione del Caribe Sud. Da qui puoi raggiungere facilmente:',
    destinations: [
      "San José - la capitale della Costa Rica (circa 4-5 ore)",
      'Limón - la città portuale caraibica (circa 1 ora)',
      'Cahuita - famosa per il suo parco nazionale e le sue spiagge (circa 30 minuti)',
      "Manzanillo - porta d'accesso al Rifugio di Fauna Selvatica Gandoca-Manzanillo (circa 20 minuti)",
      'Sixaola - città di confine con Panama (circa 1,5 ore)',
    ],
    schedulesHeading: 'Orari Completi degli Autobus',
    sanJoseHeading: 'San José ↔ Puerto Viejo (con fermata a Cahuita)',
    sanJoseIntro: "Questa è la tratta principale che collega Puerto Viejo con la capitale della Costa Rica. Perfetta per i viaggiatori in arrivo o in partenza dall'Aeroporto Internazionale di San José.",
    limonHeading: 'Limón ↔ Puerto Viejo (con fermata a Cahuita)',
    limonIntro: 'Questa è una delle tratte più frequenti, che collega Puerto Viejo con la città portuale di Limón. Perfetta per i viaggiatori diretti verso o provenienti da San José, dato che Limón funge da importante punto di connessione.',
    manzanilloHeading: 'Puerto Viejo ↔ Manzanillo',
    manzanilloIntro: 'Questa tratta ti porta alle bellissime spiagge di Manzanillo e offre accesso al Rifugio Nazionale di Fauna Selvatica Gandoca-Manzanillo.',
    sixaolaHeading: 'Sixaola ↔ Puerto Viejo (con fermata a Bri Bri)',
    sixaolaIntro: 'Questa tratta collega Puerto Viejo con la città di confine di Sixaola, perfetta per i viaggiatori diretti a Panama. Il percorso passa anche per Bri Bri, offrendo accesso a comunità indigene ed esperienze culturali.',
    tableRouteHeader: 'Tratta',
    tableDepartureHeader: 'Orari di Partenza',
    tableWeekdayHeader: 'Lunedì - Sabato',
    tableSundayHeader: 'Domenica e Festivi',
    tipsHeading: 'Consigli per Viaggiare in Autobus a Puerto Viejo',
    tipsListItems: [
      "Arriva in anticipo: gli autobus possono riempirsi rapidamente, specialmente durante l'alta stagione turistica",
      'Solo contanti: gli autobus MEPE accettano solo pagamenti in contanti - tieni pronti i colones',
      'Bagagli: le borse piccole possono essere riposte sopra il sedile, i bagagli più grandi vanno nel vano portabagagli',
      'Comfort: porta acqua e snack per i viaggi più lunghi',
      'Coincidenze: sebbene Limón sia il principale snodo per le coincidenze verso San José e altre destinazioni, puoi anche raggiungere Puerto Viejo direttamente da San José.',
    ],
    ticketsHeading: 'Dove Acquistare i Biglietti',
    ticketsParagraph: "I biglietti dell'autobus possono essere acquistati alle fermate principali di Puerto Viejo. La fermata principale si trova vicino al campo da basket nel centro di Puerto Viejo, accanto alla gelateria Deleite.",
    contactHeading: 'Contatti per Informazioni sugli Autobus',
    contactIntro: 'Hai bisogno di informazioni aggiornate su orari o tratte? Puoi contattare la compagnia di autobus via WhatsApp per le informazioni più recenti sui servizi:',
    closingParagraph: 'Per il soggiorno più confortevole mentre esplori la costa caraibica, prendi in considerazione la prenotazione di una delle nostre case completamente attrezzate a Puerto Viejo o Playa Chiquita. Offriamo posizioni comode vicino alle fermate degli autobus e tutti i comfort di cui hai bisogno per una perfetta vacanza in Costa Rica!',
  },
  pt: {
    seoTitle: 'Horário Completo de Autocarros a partir de Puerto Viejo, Costa Rica - Rotas e Horários MEPE',
    seoDescription:
      "Encontre o horário completo de autocarros de Puerto Viejo para San José, Limón, Cahuita, Manzanillo e Sixaola. Horários MEPE, rotas e informações de transporte para a costa caribenha da Costa Rica.",
    heading: 'Horário Completo de Autocarros a partir de Puerto Viejo, Costa Rica - Rotas e Horários MEPE',
    photoCredit: <>Foto de <a href="https://web.archive.org/web/20161028110553/http://www.panoramio.com/user/4645711?with_photo_id=101824520" target="_blank" rel="noopener noreferrer">hh oldman</a></>,
    introParagraph:
      <>A planear o seu transporte na costa caribenha da Costa Rica? Não procure mais! Este guia completo fornece-lhe todos os horários de autocarro de que precisa para viajar de Puerto Viejo até aos principais destinos, incluindo <strong>San José</strong>, <strong>Limón</strong>, <strong>Cahuita</strong>, <strong>Manzanillo</strong> e <strong>Sixaola</strong>. Quer esteja a procurar "autocarro San José Puerto Viejo", "autocarro Cahuita Puerto Viejo" ou "autocarro de Puerto Viejo para San José", nós temos tudo o que precisa com os horários MEPE mais atualizados.</>,
    aboutHeading: 'Sobre o Serviço de Autocarros MEPE',
    aboutParagraph1:
      <><strong><a href="https://www.mepe.co.cr/Ingles/index.html" target="_blank" rel="noopener noreferrer">MEPE</a> (Empresa de Transportes Públicos de Limón)</strong> é a principal empresa de autocarros que opera em toda a costa caribenha da Costa Rica. Conhecida pelo seu serviço fiável e pela sua vasta rede, os autocarros da MEPE ligam Puerto Viejo às principais cidades e destinos turísticos da região. A sua frota moderna proporciona um transporte confortável tanto para os habitantes locais como para os visitantes, tornando-a a escolha preferida dos viajantes com orçamento limitado que exploram a deslumbrante costa caribenha da Costa Rica.</>,
    aboutParagraph2:
      "Os autocarros da MEPE são facilmente reconhecíveis pelas suas cores distintivas em azul e branco, e operam segundo horários fixos que costumam ser pontuais. A empresa serve a região das Caraíbas há décadas, construindo uma reputação de segurança, acessibilidade e cobertura abrangente das rotas mais importantes da área.",
    stayRecommendationTitle: 'Onde ficar hospedado enquanto utiliza os serviços de autocarro de Puerto Viejo?',
    routesHeading: 'Rotas de Autocarro a partir de Puerto Viejo',
    routesIntro: "Puerto Viejo funciona como um importante centro de transportes para a região do Caribe Sul. A partir daqui, pode chegar facilmente a:",
    destinations: [
      "San José - a capital da Costa Rica (aproximadamente 4-5 horas)",
      "Limón - a cidade portuária caribenha (aproximadamente 1 hora)",
      "Cahuita - famosa pelo seu parque nacional e praias (aproximadamente 30 minutos)",
      "Manzanillo - porta de entrada para o Refúgio de Vida Silvestre Gandoca-Manzanillo (aproximadamente 20 minutos)",
      "Sixaola - cidade fronteiriça com o Panamá (aproximadamente 1,5 horas)",
    ],
    schedulesHeading: 'Horários Completos de Autocarros',
    sanJoseHeading: 'San José ↔ Puerto Viejo (para em Cahuita)',
    sanJoseIntro: "Esta é a rota principal que liga Puerto Viejo à capital da Costa Rica. Perfeita para viajantes que chegam do, ou se dirigem ao, Aeroporto Internacional de San José.",
    limonHeading: 'Limón ↔ Puerto Viejo (para em Cahuita)',
    limonIntro: "Esta é uma das rotas mais frequentes, ligando Puerto Viejo à cidade portuária de Limón. Perfeita para viajantes que se dirigem para, ou vêm de, San José, já que Limón funciona como um importante ponto de ligação.",
    manzanilloHeading: 'Puerto Viejo ↔ Manzanillo',
    manzanilloIntro: "Esta rota leva-o até às belas praias de Manzanillo e dá acesso ao Refúgio Nacional de Vida Silvestre Gandoca-Manzanillo.",
    sixaolaHeading: 'Sixaola ↔ Puerto Viejo (para em Bri Bri)',
    sixaolaIntro: "Esta rota liga Puerto Viejo à cidade fronteiriça de Sixaola, perfeita para viajantes que se dirigem ao Panamá. A rota também para em Bri Bri, dando acesso a comunidades indígenas e experiências culturais.",
    tableRouteHeader: 'Rota',
    tableDepartureHeader: 'Horários de Partida',
    tableWeekdayHeader: 'Segunda a Sábado',
    tableSundayHeader: 'Domingo e Feriados',
    tipsHeading: 'Dicas para Viajar de Autocarro em Puerto Viejo',
    tipsListItems: [
      'Chegue Cedo: os autocarros podem encher rapidamente, especialmente durante a época alta turística',
      'Só Dinheiro: os autocarros da MEPE só aceitam pagamento em dinheiro - tenha colones prontos',
      'Bagagem: as malas pequenas podem ser guardadas em cima, a bagagem maior vai na zona de carga',
      'Conforto: leve água e snacks para viagens mais longas',
      'Ligações: embora Limón seja o principal centro de ligações para San José e outros destinos, também pode chegar a Puerto Viejo a partir de San José.',
    ],
    ticketsHeading: 'Onde Comprar Bilhetes',
    ticketsParagraph: "Os bilhetes de autocarro podem ser comprados nas paragens principais de Puerto Viejo. A paragem principal fica situada perto do campo de basquetebol, no centro de Puerto Viejo, junto à gelataria Deleite.",
    contactHeading: 'Contacto para Informações de Autocarro',
    contactIntro: "Precisa de informações atualizadas sobre horários ou rotas? Pode contactar a empresa de autocarros via WhatsApp para obter as informações mais recentes sobre os serviços de autocarro:",
    closingParagraph: "Para a estadia mais confortável enquanto explora a costa caribenha, considere reservar uma das nossas casas totalmente equipadas em Puerto Viejo ou Playa Chiquita. Oferecemos localizações convenientes perto das paragens de autocarro e disponibilizamos todas as comodidades de que precisa para uma escapadela perfeita à Costa Rica!",
  },
  hi: {
    seoTitle: 'प्वेर्तो वियेहो, कोस्टा रिका से पूरी बस समय-सारणी - MEPE बस मार्ग और समय-सारणी',
    seoDescription:
      "प्वेर्तो वियेहो से सान होज़े, लिमोन, काहुइटा, मानसानियो और सिक्सोला तक की पूरी बस समय-सारणी पाएं। कोस्टा रिका के कैरिबियन तट के लिए MEPE बस समय-सारणी, मार्ग और परिवहन जानकारी।",
    heading: 'प्वेर्तो वियेहो, कोस्टा रिका से पूरी बस समय-सारणी - MEPE बस मार्ग और समय-सारणी',
    photoCredit: <>फोटो: <a href="https://web.archive.org/web/20161028110553/http://www.panoramio.com/user/4645711?with_photo_id=101824520" target="_blank" rel="noopener noreferrer">hh oldman</a></>,
    introParagraph:
      <>कोस्टा रिका के कैरिबियन तट पर अपने परिवहन की योजना बना रहे हैं? आगे और मत ढूंढिए! यह विस्तृत गाइड आपको प्वेर्तो वियेहो से <strong>सान होज़े</strong>, <strong>लिमोन</strong>, <strong>काहुइटा</strong>, <strong>मानसानियो</strong> और <strong>सिक्सोला</strong> सहित प्रमुख गंतव्यों तक यात्रा करने के लिए ज़रूरी सभी बस समय-सारणी प्रदान करती है। चाहे आप "बस सान होज़े प्वेर्तो वियेहो", "बस काहुइटा प्वेर्तो वियेहो", या "प्वेर्तो वियेहो से सान होज़े के लिए बस" खोज रहे हों, हमने आपके लिए सबसे अद्यतन MEPE बस समय-सारणी के साथ हर चीज़ का ध्यान रखा है।</>,
    aboutHeading: 'MEPE बस सेवा के बारे में',
    aboutParagraph1:
      <><strong><a href="https://www.mepe.co.cr/Ingles/index.html" target="_blank" rel="noopener noreferrer">MEPE</a> (Empresa de Transportes Públicos de Limón)</strong> कोस्टा रिका के पूरे कैरिबियन तट पर संचालित होने वाली मुख्य बस कंपनी है। अपनी भरोसेमंद सेवा और विस्तृत नेटवर्क के लिए जानी जाने वाली, MEPE बसें प्वेर्तो वियेहो को इस क्षेत्र के प्रमुख शहरों और पर्यटन स्थलों से जोड़ती हैं। इनका आधुनिक बेड़ा स्थानीय लोगों और आगंतुकों दोनों के लिए आरामदायक परिवहन प्रदान करता है, जिससे यह कोस्टा रिका की शानदार कैरिबियन तटरेखा घूमने वाले बजट के प्रति सजग यात्रियों की पसंदीदा पसंद बन जाती है।</>,
    aboutParagraph2:
      "MEPE बसें अपने विशिष्ट नीले और सफेद रंगों से आसानी से पहचानी जा सकती हैं, और ये तय समय-सारणी पर चलती हैं जो आमतौर पर समयनिष्ठ होती हैं। यह कंपनी दशकों से कैरिबियन क्षेत्र की सेवा कर रही है, और सुरक्षा, किफ़ायत तथा इलाके के सबसे महत्वपूर्ण मार्गों के व्यापक कवरेज के लिए एक प्रतिष्ठा बना चुकी है।",
    stayRecommendationTitle: 'प्वेर्तो वियेहो की बस सेवाओं का उपयोग करते समय कहां ठहरें?',
    routesHeading: 'प्वेर्तो वियेहो से बस मार्ग',
    routesIntro: 'प्वेर्तो वियेहो दक्षिणी कैरिबियन क्षेत्र के लिए एक प्रमुख परिवहन केंद्र के रूप में काम करता है। यहां से, आप आसानी से पहुंच सकते हैं:',
    destinations: [
      'सान होज़े - कोस्टा रिका की राजधानी (लगभग 4-5 घंटे)',
      'लिमोन - कैरिबियन बंदरगाह शहर (लगभग 1 घंटा)',
      'काहुइटा - अपने राष्ट्रीय उद्यान और समुद्र तटों के लिए प्रसिद्ध (लगभग 30 मिनट)',
      'मानसानियो - गंडोका-मानसानियो वन्यजीव शरण्यस्थल का प्रवेश द्वार (लगभग 20 मिनट)',
      'सिक्सोला - पनामा के साथ सीमावर्ती कस्बा (लगभग 1.5 घंटे)',
    ],
    schedulesHeading: 'पूरी बस समय-सारणी',
    sanJoseHeading: 'सान होज़े ↔ प्वेर्तो वियेहो (काहुइटा में रुकती है)',
    sanJoseIntro: "यह प्वेर्तो वियेहो को कोस्टा रिका की राजधानी से जोड़ने वाला मुख्य मार्ग है। सान होज़े अंतरराष्ट्रीय हवाई अड्डे से आने या वहां जाने वाले यात्रियों के लिए बिल्कुल सही।",
    limonHeading: 'लिमोन ↔ प्वेर्तो वियेहो (काहुइटा में रुकती है)',
    limonIntro: 'यह सबसे आम मार्गों में से एक है, जो प्वेर्तो वियेहो को बंदरगाह शहर लिमोन से जोड़ता है। सान होज़े जाने या वहां से आने वाले यात्रियों के लिए बिल्कुल सही, क्योंकि लिमोन एक प्रमुख संपर्क बिंदु के रूप में काम करता है।',
    manzanilloHeading: 'प्वेर्तो वियेहो ↔ मानसानियो',
    manzanilloIntro: 'यह मार्ग आपको मानसानियो के खूबसूरत समुद्र तटों तक ले जाता है और गंडोका-मानसानियो राष्ट्रीय वन्यजीव शरण्यस्थल तक पहुंच प्रदान करता है।',
    sixaolaHeading: 'सिक्सोला ↔ प्वेर्तो वियेहो (ब्री ब्री में रुकती है)',
    sixaolaIntro: 'यह मार्ग प्वेर्तो वियेहो को सीमावर्ती कस्बे सिक्सोला से जोड़ता है, जो पनामा जाने वाले यात्रियों के लिए बिल्कुल सही है। यह मार्ग ब्री ब्री में भी रुकता है, जो आदिवासी समुदायों और सांस्कृतिक अनुभवों तक पहुंच प्रदान करता है।',
    tableRouteHeader: 'मार्ग',
    tableDepartureHeader: 'प्रस्थान समय',
    tableWeekdayHeader: 'सोमवार - शनिवार',
    tableSundayHeader: 'रविवार और छुट्टियां',
    tipsHeading: 'प्वेर्तो वियेहो में बस यात्रा के लिए सुझाव',
    tipsListItems: [
      'जल्दी पहुंचें: बसें जल्दी भर सकती हैं, खासकर पीक पर्यटन मौसम के दौरान',
      'सिर्फ नकद: MEPE बसें केवल नकद भुगतान स्वीकार करती हैं - कोलोन तैयार रखें',
      'सामान: छोटे बैग ऊपर रखे जा सकते हैं, बड़ा सामान कार्गो एरिया में जाता है',
      'आराम: लंबी यात्राओं के लिए पानी और स्नैक्स साथ लाएं',
      'कनेक्शन: हालांकि लिमोन सान होज़े और अन्य गंतव्यों के लिए कनेक्शन का मुख्य केंद्र है, आप सान होज़े से भी सीधे प्वेर्तो वियेहो पहुंच सकते हैं।',
    ],
    ticketsHeading: 'टिकट कहां खरीदें',
    ticketsParagraph: 'बस टिकट प्वेर्तो वियेहो के मुख्य बस स्टॉप पर खरीदे जा सकते हैं। मुख्य बस स्टॉप डाउनटाउन प्वेर्तो वियेहो में बास्केटबॉल कोर्ट के पास, Deleite आइसक्रीम शॉप के नज़दीक स्थित है।',
    contactHeading: 'बस जानकारी के लिए संपर्क',
    contactIntro: 'समय-सारणी या मार्गों के बारे में अद्यतन जानकारी चाहिए? आप बस सेवाओं के बारे में सबसे मौजूदा जानकारी के लिए WhatsApp के ज़रिए बस कंपनी से संपर्क कर सकते हैं:',
    closingParagraph: 'कैरिबियन तट घूमते समय सबसे आरामदायक ठहराव के लिए, प्वेर्तो वियेहो या प्लाया चिकिता में हमारे किसी पूरी तरह सुसज्जित घर को बुक करने पर विचार करें। हम बस स्टॉप के पास सुविधाजनक स्थान प्रदान करते हैं और एक बेहतरीन कोस्टा रिका यात्रा के लिए आपको चाहिए वो सभी सुविधाएं देते हैं!',
  },
};

export function busHoursContent(locale: Locale): BusHoursContent {
  return busHours[locale] ?? busHours.en!;
}
