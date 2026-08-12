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
  nl: {
    seoTitle: 'Tien uur om Cahuita te verkennen',
    seoDescription:
      "Als je maar tien uur hebt om Cahuita te verkennen, laten we onze tijd dan optimaal benutten! We beginnen ons avontuur vroeg en staan om 7 uur 's ochtends op. Als eerste drinken we een kop koffie en genieten we van een heerlijke ham-en-kaascroissant, vers uit de oven van Degustibus Bakery.",
    heading: 'Tien uur om Cahuita te verkennen',
    paragraphsBeforeStay: [
      "Als je maar tien uur hebt om Cahuita te verkennen, laten we onze tijd dan optimaal benutten! We beginnen ons avontuur vroeg en staan om 7 uur 's ochtends op. Als eerste drinken we een kop koffie en genieten we van een heerlijke ham-en-kaascroissant, vers uit de oven van Degustibus Bakery.",
      'Na het heerlijke ontbijt liepen we naar de bushalte bij het basketbalveld van het dorp, tegenover ijssalon Deelite. Het is belangrijk om te weten dat er twee bushaltes in de buurt zijn: de grotere is voor de MEPE-bussen naar San José, en de kleinere voor de bussen naar Limón. Wij nemen de laatste. Je kunt het kaartje dezelfde dag kopen of direct betalen bij het instappen. Het loket is een klein kraampje naast de shuttle.',
      'We nemen de bus die om 8:20 uur langs onze halte komt. De rit duurt ongeveer 30 minuten, en we stappen uit bij het hoofdterminal van Cahuita, vlak bij onze eerste bestemming: Nationaal Park Cahuita. Met behulp van Google Maps en de plaatselijke bewoners lopen we de goede kant op, terwijl we de drukte van het dorp gadeslaan dat zich opmaakt om toeristen te ontvangen.',
      'Nationaal Park Cahuita is geopend van 8 tot 16 uur in beide sectoren: Playa Blanca en Puerto Vargas. Vandaag bezoeken we Playa Blanca, waar de toegang gratis is, hoewel een vrijwillige bijdrage wordt geaccepteerd. Vergeet niet dat het, omdat het een nationaal park is, niet is toegestaan huisdieren of alcoholische dranken mee naar binnen te nemen.',
    ],
    stayRecommendationTitle: 'Waar overnachten tijdens het verkennen van Cahuita?',
    paragraphsAfterStay: [
      <b key="hike"><i>We komen om 9:15 uur aan bij het park, precies op het moment dat de zon warmer begint te worden. We huren een gids in voor onze wandeltocht, omdat we meer willen leren over de biodiversiteit van het park en soorten willen zien die je in je eentje soms lastig te spotten zijn. Het lukt ons om verschillende dieren te zien, zoals diverse vogelsoorten, en we horen en zien brulapen, luiaards en talloze plantensoorten. De wandeling duurde ongeveer twee uur.</i></b>,
      'Na de wandeling gingen we direct lunchen bij een typische soda genaamd Kawe, waar we genoten van heerlijke rice and beans die ons de energie gaven om dit rustige en prachtige dorp verder te verkennen. Daarna maakten we een wandeling langs de winkels van het dorp, waar we wat souvenirs kochten.',
      'Onze volgende stop waren enkele prachtige natuurlijke zwembadjes waarover we hadden gehoord en die we graag wilden zien. We waren onder de indruk van deze plek! Natuurlijke zwembadjes op een rustige plek, perfect om te ontspannen.',
      'We hebben nog een paar uur over, en om 16 uur gaan we terug naar het centrum van Cahuita om te genieten van een heerlijke Pati bij Delrita, waarvan de reputatie volledig verdiend is - het is heerlijk! Zo ronden we onze dag af. We lopen naar het busterminal om de bus van 17:15 uur naar Puerto Viejo te halen, en vertrekken met de wens om terug te keren naar dit prachtige Caribische dorpje.',
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
    seoTitle: 'Flights to Puerto Viejo, Costa Rica: how to fly to the Caribbean coast',
    seoDescription:
      "Looking for flights to Puerto Viejo? There's no airport in town, but a short domestic flight from San José (SJO) to Limón plus a quick transfer gets you to Costa Rica's Caribbean coast fast. Here's how.",
    heading: 'Flights to Puerto Viejo, Costa Rica',
    heroAlt: 'Flying to Puerto Viejo Costa Rica',
    intro:
      "Looking for flights to Puerto Viejo? There is no airport in Puerto Viejo itself, but you can fly most of the way: a short domestic flight from San José (SJO) to Limón, then a quick transfer down the coast. It is the fastest way to reach the Caribbean coast, and this guide walks through exactly how to do it.",
    stayRecommendationTitle: 'Where to stay when flying to Puerto Viejo?',
    bodyParagraphs: [
      <>To book your flight, head to <a href="https://www.flysansa.com" target="_blank" rel="noopener noreferrer">flysansa.com</a> and pick your travel dates and times, then enter your personal and payment details to confirm. Sansa Airlines runs several flights a day, so you can usually find one that fits your schedule.</>,
      <>The first leg is a flight to San Jose International Airport, also known as <a href="https://maps.app.goo.gl/4wEYh3ZHCWNWSrQo6" target="_blank" rel="noopener noreferrer">Juan Santamaría</a> (SJO), the largest airport in Costa Rica. It connects to plenty of international destinations, so it's a practical place to start. After you land, clear customs and head to the Domestic Gate: there is a big old airplane parked outside, so you can't miss it.</>,
      <>The flight takes about 40 minutes on a small but safe Cessna, with a bird's-eye view of <a href="https://maps.app.goo.gl/ZZoEh3xB5jQGG4Mf9" target="_blank" rel="noopener noreferrer">Braulio Carrillo National Park</a> below.</>,
      "Once you land in Limón, a private transfer runs to Puerto Viejo for about $75 USD. The driver meets you at the airport and takes you straight to your accommodation. You can also catch a bus or taxi from Limón, but we'd sort out the private transfer ahead of time to save time and steer clear of any scams.",
    ],
    closingParagraphs: [
      "From there, all that's left is to settle into the slow pace of Puerto Viejo. Whether you want to laze on the beach, walk into the jungle, or dig into the Caribbean cooking, the town has plenty going for it.",
      "The short version: the domestic flight from San Jose to Limón puts Puerto Viejo within easy reach of just about anywhere. A quick flight, a private transfer waiting at the other end, and you'll have a tropical cocktail in hand before long. If you'd like a hand planning the trip or arranging a private transfer from Limón, get in touch.",
    ],
  },
  es: {
    seoTitle: 'Vuelos a Puerto Viejo, Costa Rica: cómo llegar en avión al Caribe',
    seoDescription:
      '¿Buscas vuelos a Puerto Viejo? No hay aeropuerto en el pueblo, pero un corto vuelo doméstico de San José (SJO) a Limón más un rápido traslado te llevan al Caribe de Costa Rica. Aquí te explicamos cómo.',
    heading: 'Vuelos a Puerto Viejo, Costa Rica',
    // The pre-merge ES page's alt text ("Kayaking in Punta Uva") described a
    // different photo entirely; EN's alt was correct for this image.
    heroAlt: 'Flying to Puerto Viejo Costa Rica',
    intro:
      '¿Buscas vuelos a Puerto Viejo? En Puerto Viejo no hay aeropuerto, pero puedes volar casi todo el camino: un corto vuelo doméstico de San José (SJO) a Limón y luego un rápido traslado por la costa. Es la forma más rápida de llegar al Caribe, y esta guía te explica exactamente cómo hacerlo.',
    stayRecommendationTitle: '¿Dónde hospedarte cuando vueles a Puerto Viejo?',
    bodyParagraphs: [
      <>Para reservar tu vuelo, entra en <a href="https://www.flysansa.com" target="_blank" rel="noopener noreferrer">flysansa.com</a> y selecciona tus fechas y horarios de viaje. Después ingresas tus datos personales y de pago para completar la reserva. Sansa Airlines tiene varios vuelos al día, así que suele ser fácil encontrar uno que encaje con tu horario.</>,
      <>El primer tramo es un vuelo al Aeropuerto Internacional de San José, también conocido como <a href="https://maps.app.goo.gl/4wEYh3ZHCWNWSrQo6" target="_blank" rel="noopener noreferrer">Juan Santamaría</a> (SJO), el aeropuerto más grande de Costa Rica. Conecta con muchos destinos internacionales, así que es un buen punto de partida. Al aterrizar, pasa la aduana y dirígete al Gate Doméstico: afuera hay un avión antiguo grande, así que es fácil de reconocer.</>,
      <>El vuelo dura unos 40 minutos en un Cessna pequeño pero seguro, con una vista panorámica del <a href="https://maps.app.goo.gl/ZZoEh3xB5jQGG4Mf9" target="_blank" rel="noopener noreferrer">Parque Nacional Braulio Carrillo</a>.</>,
      'Al llegar a Limón, un traslado privado te lleva a Puerto Viejo por unos $75 USD. El chófer te espera en el aeropuerto y te lleva directo a tu alojamiento, sin complicaciones. También puedes tomar un autobús o un taxi desde Limón, pero te recomendamos organizar el traslado privado con antelación para ahorrar tiempo y evitar posibles estafas.',
    ],
    closingParagraphs: [
      'A partir de aquí, solo te queda acomodarte al ritmo pausado de Puerto Viejo. Ya sea tumbarte en la playa, meterte en la selva o probar la comida caribeña, el pueblo tiene mucho que ofrecer.',
      'En resumen: el vuelo doméstico de San José a Limón pone Puerto Viejo al alcance desde casi cualquier lugar. Un vuelo corto, un traslado privado esperándote al final, y en poco tiempo tendrás un cóctel tropical en la mano. Si quieres una mano para organizar el viaje o el traslado privado desde Limón, escríbenos.',
    ],
  },
  de: {
    seoTitle: 'Flüge nach Puerto Viejo, Costa Rica: So gelangen Sie an die Karibikküste',
    seoDescription:
      "Sie suchen Flüge nach Puerto Viejo? Der Ort selbst hat keinen Flughafen, aber ein kurzer Inlandsflug von San José (SJO) nach Limón plus ein schneller Transfer bringt Sie schnell an Costa Ricas Karibikküste. So geht's.",
    heading: 'Flüge nach Puerto Viejo, Costa Rica',
    heroAlt: 'Flug nach Puerto Viejo, Costa Rica',
    intro:
      "Sie suchen Flüge nach Puerto Viejo? In Puerto Viejo selbst gibt es keinen Flughafen, aber Sie können den größten Teil der Strecke fliegen: ein kurzer Inlandsflug von San José (SJO) nach Limón und anschließend ein schneller Transfer die Küste hinunter. Es ist der schnellste Weg an die Karibikküste, und dieser Leitfaden zeigt Ihnen genau, wie es geht.",
    stayRecommendationTitle: 'Wo übernachten, wenn Sie nach Puerto Viejo fliegen?',
    bodyParagraphs: [
      <>Um Ihren Flug zu buchen, gehen Sie auf <a href="https://www.flysansa.com" target="_blank" rel="noopener noreferrer">flysansa.com</a> und wählen Sie Ihre Reisedaten und -zeiten aus. Danach geben Sie Ihre persönlichen Daten und Zahlungsinformationen ein, um die Buchung abzuschließen. Sansa Airlines fliegt mehrmals täglich, sodass sich meist ein Flug findet, der zu Ihrem Zeitplan passt.</>,
      <>Der erste Abschnitt ist der Flug zum Internationalen Flughafen von San José, auch bekannt als <a href="https://maps.app.goo.gl/4wEYh3ZHCWNWSrQo6" target="_blank" rel="noopener noreferrer">Juan Santamaría</a> (SJO), dem größten Flughafen Costa Ricas. Er ist gut mit vielen internationalen Zielen verbunden und damit ein bequemer Ausgangspunkt. Nach der Landung gehen Sie durch den Zoll zum Inlandsterminal: Draußen steht ein großes altes Flugzeug, das leicht zu erkennen ist.</>,
      <>Der Flug dauert etwa 40 Minuten in einer kleinen, aber sicheren Cessna und bietet Ihnen einen Blick aus der Vogelperspektive auf den <a href="https://maps.app.goo.gl/ZZoEh3xB5jQGG4Mf9" target="_blank" rel="noopener noreferrer">Nationalpark Braulio Carrillo</a>.</>,
      "Sobald Sie in Limón ankommen, bringt Sie ein privater Transfer für etwa 75 USD nach Puerto Viejo. Ein Fahrer wartet am Flughafen auf Sie und bringt Sie direkt zu Ihrer Unterkunft, ganz ohne Stress. Alternativ nehmen Sie einen Bus oder ein Taxi von Limón, wir empfehlen jedoch, den privaten Transfer im Voraus zu organisieren, um Zeit zu sparen und mögliche Betrugsversuche zu vermeiden.",
    ],
    closingParagraphs: [
      "Jetzt bleibt Ihnen nur noch, sich zurückzulehnen und die entspannte Atmosphäre von Puerto Viejo zu genießen. Ob Sie am Strand faulenzen, den Dschungel erkunden oder die karibische Küche probieren möchten: Puerto Viejo hat für jeden etwas zu bieten.",
      "Kurz gesagt: Dank des Inlandsflugs von San José nach Limón ist Puerto Viejo von fast überall aus einfach zu erreichen. Ein kurzer Flug, ein privater Transfer am anderen Ende, und schon bald halten Sie einen tropischen Cocktail in der Hand. Wenn Sie Hilfe bei der Organisation Ihrer Reise oder beim privaten Transfer von Limón brauchen, melden Sie sich bei uns.",
    ],
  },
  fr: {
    seoTitle: 'Vols pour Puerto Viejo, Costa Rica : comment rejoindre la côte caraïbe en avion',
    seoDescription:
      "Vous cherchez des vols pour Puerto Viejo ? Il n'y a pas d'aéroport dans la ville, mais un court vol intérieur de San José (SJO) à Limón, suivi d'un transfert rapide, vous conduit vite jusqu'à la côte caraïbe du Costa Rica. Voici comment.",
    heading: 'Vols pour Puerto Viejo, Costa Rica',
    heroAlt: 'Vol vers Puerto Viejo, Costa Rica',
    intro:
      "Vous cherchez des vols pour Puerto Viejo ? Il n'y a pas d'aéroport à Puerto Viejo même, mais vous pouvez faire l'essentiel du trajet en avion : un court vol intérieur de San José (SJO) à Limón, puis un transfert rapide le long de la côte. C'est le moyen le plus rapide de rejoindre la côte caraïbe, et ce guide vous explique exactement comment procéder.",
    stayRecommendationTitle: "Où loger quand on prend l'avion pour Puerto Viejo ?",
    bodyParagraphs: [
      <>Pour réserver votre vol, rendez-vous sur <a href="https://www.flysansa.com" target="_blank" rel="noopener noreferrer">flysansa.com</a> et sélectionnez vos dates et horaires de voyage. Vous saisissez ensuite vos informations personnelles et de paiement pour finaliser la réservation. Sansa Airlines propose plusieurs vols par jour, il est donc facile d'en trouver un qui convienne à votre emploi du temps.</>,
      <>La première étape est un vol jusqu'à l'aéroport international de San José, également connu sous le nom de <a href="https://maps.app.goo.gl/4wEYh3ZHCWNWSrQo6" target="_blank" rel="noopener noreferrer">Juan Santamaría</a> (SJO), le plus grand aéroport du Costa Rica. Il est bien relié à de nombreuses destinations internationales, ce qui en fait un point de départ commode. Une fois arrivé, passez la douane et dirigez-vous vers la porte des vols intérieurs : un grand vieil avion trône à l'extérieur, difficile de le manquer.</>,
      <>Le vol dure environ 40 minutes à bord d'un petit Cessna sûr, avec une vue à vol d'oiseau sur le <a href="https://maps.app.goo.gl/ZZoEh3xB5jQGG4Mf9" target="_blank" rel="noopener noreferrer">parc national Braulio Carrillo</a>.</>,
      "Une fois arrivé à Limón, un transfert privé vous conduit à Puerto Viejo pour environ 75 USD. Le chauffeur vous attend à l'aéroport et vous emmène directement à votre hébergement, sans tracas. Vous pouvez aussi prendre un bus ou un taxi depuis Limón, mais nous vous conseillons d'organiser le transfert privé à l'avance pour gagner du temps et éviter les arnaques.",
    ],
    closingParagraphs: [
      "À ce stade, il ne vous reste plus qu'à vous détendre et à profiter de l'ambiance décontractée de Puerto Viejo. Que vous vouliez lézarder sur la plage, explorer la jungle ou goûter à la cuisine caribéenne, le village a de quoi faire.",
      "En bref : le vol intérieur de San José à Limón met Puerto Viejo à portée depuis à peu près n'importe où. Un vol rapide, un transfert privé qui vous attend à l'arrivée, et vous siroterez un cocktail tropical en un rien de temps. Si vous voulez un coup de main pour organiser votre voyage ou le transfert privé depuis Limón, écrivez-nous.",
    ],
  },
  he: {
    seoTitle: 'טיסות לפוארטו ויחו, קוסטה ריקה: איך טסים לחוף הקריבי',
    seoDescription:
      'מחפשים טיסות לפוארטו ויחו? בעיירה עצמה אין שדה תעופה, אך טיסה פנימית קצרה מסן חוזה (SJO) ללימון בתוספת הסעה מהירה מביאה אתכם במהירות אל החוף הקריבי של קוסטה ריקה. הנה איך.',
    heading: 'טיסות לפוארטו ויחו, קוסטה ריקה',
    heroAlt: 'טיסה לפוארטו ויחו, קוסטה ריקה',
    intro:
      'מחפשים טיסות לפוארטו ויחו? בפוארטו ויחו עצמה אין שדה תעופה, אך אפשר לטוס את רוב הדרך: טיסה פנימית קצרה מסן חוזה (SJO) ללימון, ואז הסעה מהירה לאורך החוף. זו הדרך המהירה ביותר להגיע אל החוף הקריבי, והמדריך הזה מסביר לכם בדיוק כיצד לעשות זאת.',
    stayRecommendationTitle: 'היכן להתארח כשטסים לפוארטו ויחו?',
    bodyParagraphs: [
      <>כדי להזמין את הטיסה, היכנסו לאתר <a href="https://www.flysansa.com" target="_blank" rel="noopener noreferrer">flysansa.com</a> ובחרו את תאריכי ושעות הנסיעה. לאחר מכן תזינו את הפרטים האישיים ופרטי התשלום כדי להשלים את ההזמנה. ל-Sansa Airlines יש כמה טיסות ביום, כך שקל למצוא אחת שמתאימה ללוח הזמנים שלכם.</>,
      <>הקטע הראשון הוא טיסה לנמל התעופה הבינלאומי של סן חוזה, המוכר גם בשם <a href="https://maps.app.goo.gl/4wEYh3ZHCWNWSrQo6" target="_blank" rel="noopener noreferrer">חואן סנטמריה</a> (SJO), שדה התעופה הגדול ביותר בקוסטה ריקה. הוא מחובר היטב ליעדים בינלאומיים רבים, ולכן הוא נקודת פתיחה נוחה. אחרי הנחיתה תעברו את המכס ותפנו לשער הטיסות הפנימיות: בחוץ עומד מטוס ישן וגדול, כך שקשה לפספס אותו.</>,
      <>הטיסה נמשכת כ-40 דקות במטוס Cessna קטן אך בטוח, המעניק לכם נוף ציפור על <a href="https://maps.app.goo.gl/ZZoEh3xB5jQGG4Mf9" target="_blank" rel="noopener noreferrer">הפארק הלאומי בראוליו קריו</a>.</>,
      "כשתגיעו ללימון, הסעה פרטית תיקח אתכם לפוארטו ויחו תמורת כ-75 דולר אמריקאי. הנהג יחכה לכם בשדה התעופה וייקח אתכם ישירות למקום האירוח, בלי כאב ראש. אפשר גם לקחת אוטובוס או מונית מלימון, אבל כדאי לתאם את ההסעה הפרטית מראש כדי לחסוך זמן ולהימנע מהונאות.",
    ],
    closingParagraphs: [
      "מכאן, כל מה שנותר הוא להירגע וליהנות מהאווירה הנינוחה של פוארטו ויחו. בין אם בא לכם להתמתח על החוף, לצאת לג'ונגל או לטעום מהמטבח הקריבי, יש כאן הרבה מה לעשות.",
      "בקצרה: הטיסה הפנימית מסן חוזה ללימון הופכת את פוארטו ויחו לנגישה כמעט מכל מקום. טיסה קצרה, הסעה פרטית שמחכה לכם בצד השני, ותוך זמן קצר יהיה לכם קוקטייל טרופי ביד. אם בא לכם עזרה בארגון הטיול או בתיאום הסעה פרטית מלימון, כתבו לנו.",
    ],
  },
  it: {
    seoTitle: 'Voli per Puerto Viejo, Costa Rica: come raggiungere la costa caraibica in aereo',
    seoDescription:
      "Cerchi voli per Puerto Viejo? In città non c'è un aeroporto, ma un breve volo nazionale da San José (SJO) a Limón più un rapido trasferimento ti portano velocemente sulla costa caraibica della Costa Rica. Ecco come.",
    heading: 'Voli per Puerto Viejo, Costa Rica',
    heroAlt: 'Volo verso Puerto Viejo, Costa Rica',
    intro:
      "Cerchi voli per Puerto Viejo? A Puerto Viejo stessa non c'è un aeroporto, ma puoi percorrere in aereo gran parte del tragitto: un breve volo nazionale da San José (SJO) a Limón, poi un rapido trasferimento lungo la costa. È il modo più veloce per raggiungere la costa caraibica, e questa guida ti spiega esattamente come fare.",
    stayRecommendationTitle: 'Dove alloggiare quando si vola verso Puerto Viejo?',
    bodyParagraphs: [
      <>Per prenotare il tuo volo, vai su <a href="https://www.flysansa.com" target="_blank" rel="noopener noreferrer">flysansa.com</a> e seleziona le date e gli orari del tuo viaggio. Poi inserisci i tuoi dati personali e di pagamento per completare la prenotazione. Sansa Airlines ha diversi voli al giorno, così è facile trovarne uno adatto ai tuoi orari.</>,
      <>La prima tappa è un volo fino all'Aeroporto Internazionale di San José, conosciuto anche come <a href="https://maps.app.goo.gl/4wEYh3ZHCWNWSrQo6" target="_blank" rel="noopener noreferrer">Juan Santamaría</a> (SJO), il più grande aeroporto della Costa Rica. È ben collegato con molte destinazioni internazionali, quindi è un comodo punto di partenza. Dopo l'atterraggio, passa la dogana e dirigiti verso il Gate Nazionale: fuori c'è un vecchio aereo di grandi dimensioni, difficile non notarlo.</>,
      <>Il volo dura circa 40 minuti su un piccolo ma sicuro Cessna, che ti regala una vista dall'alto sul <a href="https://maps.app.goo.gl/ZZoEh3xB5jQGG4Mf9" target="_blank" rel="noopener noreferrer">Parco Nazionale Braulio Carrillo</a>.</>,
      "Una volta arrivato a Limón, un trasferimento privato ti porta a Puerto Viejo per circa 75 USD. L'autista ti aspetta in aeroporto e ti accompagna direttamente al tuo alloggio, senza pensieri. In alternativa puoi prendere un autobus o un taxi da Limón, ma ti consigliamo di organizzare il trasferimento privato in anticipo per risparmiare tempo ed evitare possibili truffe.",
    ],
    closingParagraphs: [
      "A questo punto non ti resta che startene tranquillo e goderti l'atmosfera rilassata di Puerto Viejo. Che tu voglia oziare in spiaggia, esplorare la giungla o assaggiare la cucina caraibica, qui c'è di che divertirsi.",
      "In breve: il volo nazionale da San José a Limón mette Puerto Viejo a portata di mano da quasi ovunque. Un volo veloce, un trasferimento privato ad aspettarti all'arrivo, e in men che non si dica avrai un cocktail tropicale in mano. Se vuoi una mano per organizzare il viaggio o il trasferimento privato da Limón, scrivici.",
    ],
  },
  pt: {
    seoTitle: 'Voos para Puerto Viejo, Costa Rica: como chegar à costa caribenha de avião',
    seoDescription:
      "À procura de voos para Puerto Viejo? A vila em si não tem aeroporto, mas um curto voo doméstico de San José (SJO) para Limón mais um transfer rápido levam-no depressa até à costa caribenha da Costa Rica. Veja como.",
    heading: 'Voos para Puerto Viejo, Costa Rica',
    heroAlt: 'Voo para Puerto Viejo, Costa Rica',
    intro:
      "À procura de voos para Puerto Viejo? Em Puerto Viejo não existe aeroporto, mas pode fazer a maior parte do percurso de avião: um curto voo doméstico de San José (SJO) para Limón e depois um transfer rápido ao longo da costa. É a forma mais rápida de chegar à costa caribenha, e este guia mostra-lhe exatamente como fazê-lo.",
    stayRecommendationTitle: 'Onde ficar hospedado ao voar para Puerto Viejo?',
    bodyParagraphs: [
      <>Para reservar o seu voo, aceda a <a href="https://www.flysansa.com" target="_blank" rel="noopener noreferrer">flysansa.com</a> e selecione as suas datas e horários de viagem. A seguir, introduz os seus dados pessoais e de pagamento para concluir a reserva. A Sansa Airlines tem vários voos por dia, por isso é fácil encontrar um que se ajuste ao seu horário.</>,
      <>A primeira etapa é um voo até ao Aeroporto Internacional de San José, também conhecido como <a href="https://maps.app.goo.gl/4wEYh3ZHCWNWSrQo6" target="_blank" rel="noopener noreferrer">Juan Santamaría</a> (SJO), o maior aeroporto da Costa Rica. Está bem ligado a muitos destinos internacionais, por isso é um ponto de partida prático. Depois de aterrar, passe pela alfândega e dirija-se ao Portão Doméstico: há um grande avião antigo lá fora, difícil de não ver.</>,
      <>O voo demora aproximadamente 40 minutos num pequeno mas seguro Cessna, oferecendo-lhe uma vista aérea do <a href="https://maps.app.goo.gl/ZZoEh3xB5jQGG4Mf9" target="_blank" rel="noopener noreferrer">Parque Nacional Braulio Carrillo</a>.</>,
      "Assim que chegar a Limón, um transfer privado leva-o até Puerto Viejo por aproximadamente 75 USD. O motorista espera-o no aeroporto e leva-o diretamente ao seu alojamento, sem complicações. Em alternativa, pode apanhar um autocarro ou táxi de Limón, mas recomendamos que organize o transfer privado com antecedência para poupar tempo e evitar possíveis burlas.",
    ],
    closingParagraphs: [
      "Chegados a este ponto, resta apenas relaxar e desfrutar do ambiente descontraído de Puerto Viejo. Quer queira estender-se na praia, explorar a selva ou provar a gastronomia caribenha, a vila tem muito que oferecer.",
      "Em resumo: o voo doméstico de San José para Limón coloca Puerto Viejo ao alcance a partir de quase qualquer lugar. Um voo rápido, um transfer privado à sua espera no fim, e num instante terá um cocktail tropical na mão. Se quiser uma ajuda para organizar a viagem ou o transfer privado a partir de Limón, fale connosco.",
    ],
  },
  hi: {
    seoTitle: 'प्वेर्तो वियेहो, कोस्टा रिका के लिए उड़ानें: कैरिबियन तट तक हवाई जहाज़ से कैसे पहुंचें',
    seoDescription:
      "प्वेर्तो वियेहो के लिए उड़ानें ढूंढ रहे हैं? शहर में कोई हवाई अड्डा नहीं है, लेकिन सान होज़े (SJO) से लिमोन तक की एक छोटी घरेलू उड़ान और उसके बाद एक त्वरित ट्रांसफर आपको तेज़ी से कोस्टा रिका के कैरिबियन तट तक पहुंचा देता है। यहां जानिए कैसे।",
    heading: 'प्वेर्तो वियेहो, कोस्टा रिका के लिए उड़ानें',
    heroAlt: 'कोस्टा रिका के प्वेर्तो वियेहो के लिए उड़ान',
    intro:
      "प्वेर्तो वियेहो के लिए उड़ानें ढूंढ रहे हैं? प्वेर्तो वियेहो में खुद कोई हवाई अड्डा नहीं है, लेकिन आप अधिकांश रास्ता हवाई जहाज़ से तय कर सकते हैं: सान होज़े (SJO) से लिमोन तक की एक छोटी घरेलू उड़ान, और फिर तट के किनारे एक त्वरित ट्रांसफर। कैरिबियन तट तक पहुंचने का यह सबसे तेज़ तरीका है, और यह गाइड आपको बिल्कुल यही बताती है कि इसे कैसे करना है।",
    stayRecommendationTitle: 'प्वेर्तो वियेहो के लिए उड़ान भरते समय कहां ठहरें?',
    bodyParagraphs: [
      <>अपनी फ्लाइट बुक करने के लिए, <a href="https://www.flysansa.com" target="_blank" rel="noopener noreferrer">flysansa.com</a> पर जाएं और अपनी यात्रा की तारीखें और समय चुनें। इसके बाद बुकिंग पूरी करने के लिए अपनी व्यक्तिगत और भुगतान जानकारी दर्ज करें। Sansa Airlines दिनभर में कई फ्लाइटें चलाती है, इसलिए अपने कार्यक्रम के अनुसार फ्लाइट ढूंढना आसान रहता है।</>,
      <>पहला चरण है सान होज़े अंतरराष्ट्रीय हवाई अड्डे तक की उड़ान, जिसे <a href="https://maps.app.goo.gl/4wEYh3ZHCWNWSrQo6" target="_blank" rel="noopener noreferrer">Juan Santamaría</a> (SJO) के नाम से भी जाना जाता है, जो कोस्टा रिका का सबसे बड़ा हवाई अड्डा है। यह कई अंतरराष्ट्रीय गंतव्यों से अच्छी तरह जुड़ा है, इसलिए यहां से शुरुआत करना सुविधाजनक है। उतरने के बाद सीमा शुल्क (कस्टम्स) पार करके घरेलू गेट की ओर जाएं: बाहर एक बड़ा पुराना हवाई जहाज़ रखा है, जिसे पहचानना मुश्किल नहीं।</>,
      <>फ्लाइट एक छोटे लेकिन सुरक्षित सेस्ना (Cessna) विमान में लगभग 40 मिनट की होती है, जो आपको <a href="https://maps.app.goo.gl/ZZoEh3xB5jQGG4Mf9" target="_blank" rel="noopener noreferrer">Braulio Carrillo National Park</a> का विहंगम दृश्य दिखाती है।</>,
      "लिमोन पहुंचने के बाद, एक निजी ट्रांसफर आपको लगभग $75 USD में प्वेर्तो वियेहो तक पहुंचा देगा। ड्राइवर हवाई अड्डे पर आपका इंतज़ार करेगा और आपको सीधे आपके ठहरने की जगह तक ले जाएगा, बिना किसी झंझट के। आप चाहें तो लिमोन से बस या टैक्सी भी ले सकते हैं, लेकिन समय बचाने और किसी भी धोखाधड़ी से बचने के लिए निजी ट्रांसफर पहले से तय कर लेना बेहतर है।",
    ],
    closingParagraphs: [
      "अब बस आराम से बैठकर प्वेर्तो वियेहो के सुकूनभरे माहौल का आनंद लीजिए। चाहे समुद्र तट पर सुस्ताना हो, जंगल की सैर करनी हो, या कैरिबियन व्यंजन चखने हों, यहां करने को बहुत कुछ है।",
      "संक्षेप में: सान होज़े से लिमोन तक की घरेलू उड़ान की बदौलत प्वेर्तो वियेहो लगभग कहीं से भी आसानी से पहुंच में आ जाता है। एक छोटी फ्लाइट, अंत में इंतज़ार करता एक निजी ट्रांसफर, और थोड़ी ही देर में आपके हाथ में एक ट्रॉपिकल कॉकटेल होगा। अगर आपको अपनी यात्रा की योजना बनाने या लिमोन से निजी ट्रांसफर तय करने में मदद चाहिए, तो हमसे संपर्क करें।",
    ],
  },
  nl: {
    seoTitle: 'Vluchten naar Puerto Viejo, Costa Rica: zo vlieg je naar de Caribische kust',
    seoDescription:
      'Op zoek naar vluchten naar Puerto Viejo? In het dorp zelf is geen luchthaven, maar een korte binnenlandse vlucht van San José (SJO) naar Limón plus een snelle transfer brengt je snel naar de Caribische kust van Costa Rica. Zo doe je dat.',
    heading: 'Vluchten naar Puerto Viejo, Costa Rica',
    heroAlt: 'Vliegen naar Puerto Viejo, Costa Rica',
    intro:
      'Op zoek naar vluchten naar Puerto Viejo? In Puerto Viejo zelf is geen luchthaven, maar je kunt het grootste deel van de reis vliegen: een korte binnenlandse vlucht van San José (SJO) naar Limón en daarna een snelle transfer langs de kust. Het is de snelste manier om de Caribische kust te bereiken, en deze gids legt precies uit hoe je dat doet.',
    stayRecommendationTitle: 'Waar overnachten als je naar Puerto Viejo vliegt?',
    bodyParagraphs: [
      <>Om je vlucht te boeken, ga je naar <a href="https://www.flysansa.com" target="_blank" rel="noopener noreferrer">flysansa.com</a> en kies je je reisdata en -tijden. Daarna voer je je persoonlijke gegevens en betaalgegevens in om je boeking af te ronden. Sansa Airlines vliegt meerdere keren per dag, dus je vindt meestal wel een vlucht die in je schema past.</>,
      <>Het eerste deel is de vlucht naar de internationale luchthaven van San José, ook bekend als <a href="https://maps.app.goo.gl/4wEYh3ZHCWNWSrQo6" target="_blank" rel="noopener noreferrer">Juan Santamaría</a> (SJO), de grootste luchthaven van Costa Rica. Hij is goed verbonden met veel internationale bestemmingen, dus een handig vertrekpunt. Na de landing ga je door de douane naar de binnenlandse gate: er staat buiten een groot, oud vliegtuig, dus je vindt het zo.</>,
      <>De vlucht duurt ongeveer 40 minuten in een kleine maar veilige Cessna, met uitzicht in vogelvlucht over <a href="https://maps.app.goo.gl/ZZoEh3xB5jQGG4Mf9" target="_blank" rel="noopener noreferrer">Nationaal Park Braulio Carrillo</a>.</>,
      'Zodra je in Limón aankomt, brengt een privétransfer je voor ongeveer 75 USD naar Puerto Viejo. De chauffeur wacht je op bij de luchthaven en brengt je rechtstreeks naar je accommodatie, zonder gedoe. Je kunt ook een bus of taxi nemen vanuit Limón, maar we raden aan om de privétransfer vooraf te regelen om tijd te besparen en oplichting te vermijden.',
    ],
    closingParagraphs: [
      'Nu hoef je alleen nog achterover te leunen en te genieten van de ontspannen sfeer van Puerto Viejo. Of je nu wilt luieren op het strand, de jungle in wilt of de Caribische keuken wilt proeven, er valt hier genoeg te doen.',
      'Kort samengevat: dankzij de binnenlandse vlucht van San José naar Limón is Puerto Viejo vanaf vrijwel overal makkelijk te bereiken. Een korte vlucht, een privétransfer die aan de andere kant op je wacht, en binnen de kortste keren nip je van een tropische cocktail. Wil je hulp bij het plannen van je reis of het regelen van een privétransfer vanaf Limón? Neem gerust contact met ons op.',
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
  nl: {
    seoTitle: '2 dagen en 1 nacht in Puerto Viejo',
    seoDescription:
      'Heb je maar een paar dagen om Puerto Viejo te bezoeken? Wij ook! We hadden maar 1 nacht, komend vanuit Tortuguero, en wilden het beste maken van de tijd die we hadden in dit charmante strandstadje aan de zuidelijke Caribische kust van Costa Rica.',
    heading: '2 dagen en 1 nacht in Puerto Viejo',
    intro:
      'Heb je maar een paar dagen om Puerto Viejo te bezoeken? Wij ook! We hadden maar 1 nacht, komend vanuit Tortuguero, en wilden het beste maken van de tijd die we hadden in dit charmante strandstadje aan de zuidelijke Caribische kust van Costa Rica. Met zijn ontspannen sfeer, ongerepte stranden en weelderige tropische jungle is Puerto Viejo de perfecte bestemming voor een snel weekendje weg. In dit artikel delen we onze ervaring van twee dagen in Puerto Viejo en geven we je tips om het meeste uit je reis te halen.',
    stayRecommendationTitle: 'Waar overnachten als je maar 2 dagen in Puerto Viejo hebt?',
    day1Paragraphs: [
      <>We kwamen vroeg op een zaterdagochtend in Puerto Viejo aan, vol enthousiasme om aan ons avontuur te beginnen. Onze <a href="https://www.reservaskalawala.com/en/tucano/" target="_blank" rel="noopener noreferrer">Airbnb</a> was nog niet klaar, dus besloten we in de buurt een quad te huren en naar Punta Uva te gaan om wat te zonnen. Het strand was prachtig, met turquoise en kalm water. We huurden kayaks en verkenden de kust. Voor de lunch stopten we bij <a href="https://maps.app.goo.gl/TnyD131GeLKYeARSA" target="_blank" rel="noopener noreferrer">Selvin's</a>, een lokaal Caribisch restaurant, en proefden er heerlijke Caribische kip met rice and beans.</>,
      <>Daarna checkten we in bij onze Airbnb, namen een verfrissende douche en rustten een tijdje uit. Voor het avondeten besloten we <a href="https://maps.app.goo.gl/2vNghKagTvPVHnip6" target="_blank" rel="noopener noreferrer">Cafe Viejo</a> te proberen, een Italiaans restaurant in het centrum van het dorp. Het eten was fantastisch, we probeerden de "Fritto Misto", een mix van gefrituurde vis en zeevruchten. Later die avond gingen we naar <a href="https://maps.app.goo.gl/fXnSossA1PqAfkbh9" target="_blank" rel="noopener noreferrer">Salsa Brava</a>, een strandbar die bekendstaat om zijn reggae-avonden en relaxte sfeer.</>,
    ],
    day2Paragraphs: [
      <>De volgende dag stonden we later op dan we hadden gewild, haalden we koffie en croissants bij <a href="https://maps.app.goo.gl/UW6EWzA4h9WQTsbX6" target="_blank" rel="noopener noreferrer">Degustibus Bakery</a> en vertrokken we naar Cocles. Er is een leuk en goed onderhouden pad vlak bij de bakkerij dat naar Cocles leidt, waar we een mooi uitzichtpunt ontdekten voordat we bij het strand aankwamen.</>,
      'Na onze wandeling gingen we terug naar het huis om te pakken en uit te checken. We hadden geluk dat we op een zondag vertrokken, want ons werd verteld dat er dan geen grote vrachtwagens op de weg mogen, waardoor onze terugreis naar San José soepeler verliep dan verwacht.',
    ],
    closing:
      'Puerto Viejo is een uitstekende bestemming voor een snel weekendje weg. Met zijn prachtige stranden, levendige nachtleven en natuurlijke schoonheid kom je nooit iets te doen tekort. Of je nu op zoek bent naar avontuur of ontspanning, Puerto Viejo heeft voor iedereen iets te bieden. Waar wacht je nog op? Boek vandaag nog je reis en ervaar zelf de magie van Puerto Viejo!',
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
  de: {
    seoTitle: 'So erreichen Sie das Nationale Wildschutzgebiet Gandoca-Manzanillo von Puerto Viejo, Costa Rica',
    seoDescription:
      'Das Nationale Wildschutzgebiet Gandoca-Manzanillo in der Provinz Limón ist eines der bestgehüteten Geheimnisse der costa-ricanischen Südkaribik. Dieses beeindruckende Schutzgebiet bietet eine vielfältige Auswahl an Ökosystemen, von Mangroven und Korallenriffen bis hin zu unberührten Stränden.',
    heading: 'So erreichen Sie das Nationale Wildschutzgebiet Gandoca-Manzanillo von Puerto Viejo, Costa Rica',
    heroAlt: 'Nationales Wildschutzgebiet Gandoca-Manzanillo',
    intro:
      <>Das <a href="https://maps.app.goo.gl/orUHFbrZvpJH1fnb9" target="_blank" rel="noopener noreferrer">Nationale Wildschutzgebiet Gandoca-Manzanillo</a> in der Provinz Limón ist eines der bestgehüteten Geheimnisse der costa-ricanischen Südkaribik. Dieses beeindruckende Schutzgebiet bietet eine vielfältige Auswahl an Ökosystemen, von Mangroven und Korallenriffen bis hin zu unberührten Stränden. Wenn Sie sich in Puerto Viejo de Talamanca aufhalten und einen Ausflug in die Natur suchen, ist dies eine hervorragende Option. In diesem Leitfaden zeigen wir Ihnen, wie Sie von Puerto Viejo aus einfach dorthin gelangen, um dieses Naturparadies in vollen Zügen zu erkunden.</>,
    transportOptionsHeading: 'Transportmöglichkeiten',
    stayRecommendationTitle: 'Wo übernachten bei einem Besuch von Gandoca-Manzanillo?',
    busHeading: '1. Bus von Puerto Viejo nach Manzanillo',
    busIntro:
      <>Die einfachste und günstigste Art, das <a href="https://maps.app.goo.gl/orUHFbrZvpJH1fnb9" target="_blank" rel="noopener noreferrer">Nationale Wildschutzgebiet Gandoca-Manzanillo</a> zu erreichen, ist der Bus vom Zentrum von Puerto Viejo nach Manzanillo. Die <a href="https://maps.app.goo.gl/orUHFbrZvpJH1fnb9" target="_blank" rel="noopener noreferrer">Bushaltestelle</a> befindet sich dort, wo Sie die Tickets kaufen, in der Nähe des Basketballplatzes oder bei der Eisdiele Deleite.</>,
    busSchedulesLabel: 'Busfahrpläne:',
    tableRouteHeader: 'Route',
    tableDepartureHeader: 'Abfahrtszeiten',
    scooterHeading: '2. Einen Roller oder 4x4 mieten',
    scooterParagraph1:
      <>Wenn Sie lieber in Ihrem eigenen Tempo erkunden möchten, ist die Miete eines Rollers oder 4x4 eine hervorragende Option. Wenn Sie in unseren Häusern im Zentrum von Puerto Viejo wohnen, können Sie Fahrzeuge direkt gegenüber bei <a href="https://maps.app.goo.gl/uao7BMUuwFLyRL6dA" target="_blank" rel="noopener noreferrer">Mistery Jungle</a> mieten, ab 30 $. Wenn Sie in unseren Villen in Playa Chiquita wohnen, können Sie sich das Fahrzeug direkt zu Ihrer Villa liefern lassen.</>,
    scooterParagraph2:
      'Diese Option ist ideal für alle, die ein individuelles Abenteuer suchen, da Sie überall anhalten können, wo Sie möchten, und das charmante Dorf Manzanillo erkunden können, ohne sich um Busfahrpläne kümmern zu müssen. Genießen Sie die Freiheit, auf Ihre eigene Art zu erkunden, und entdecken Sie alle Ecken, die dieses schöne Reiseziel zu bieten hat.',
    carHeading: '3. Mit dem Auto von Puerto Viejo aus',
    carParagraph:
      'Wenn Sie sich entscheiden, mit dem Auto von Puerto Viejo aus zu fahren, folgen Sie einfach der Richtung Manzanillo über die 14 km lange Strecke. Bei der Ankunft finden Sie Parkplätze außerhalb des Schutzgebiets, wo Ihnen einige Einheimische gegen eine kleine Gebühr anbieten, auf Ihr Fahrzeug aufzupassen. Aus Sicherheitsgründen empfehlen wir, keine Wertsachen im Auto zu lassen.',
    conclusionHeading: 'Fazit',
    conclusionParagraph1:
      'Das Nationale Wildschutzgebiet Gandoca-Manzanillo ist ein Muss für Natur- und Abenteuerliebhaber. Ob Sie mit dem Bus fahren, ein Fahrzeug mieten oder selbst fahren — dieses Naturparadies ist einfach und bequem zu erreichen.',
    conclusionParagraph2:
      'Wir laden Sie ein, Ihren Besuch in diesem wunderschönen Schutzgebiet zu planen und die Gelegenheit zu nutzen, in unseren gemütlichen Häusern in Puerto Viejo de Talamanca zu übernachten. Wir bieten eine komfortable und entspannende Umgebung — perfekt, um die Natur zu genießen und alles zu erkunden, was die Region zu bieten hat. Entdecken Sie den Charme des Nationalen Wildschutzgebiets Gandoca-Manzanillo und die Herzlichkeit unserer Villen!',
  },
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
  nl: {
    seoTitle: 'Zo kom je van Puerto Viejo naar het Nationaal Wildreservaat Gandoca-Manzanillo, Costa Rica',
    seoDescription:
      'Het Nationaal Wildreservaat Gandoca-Manzanillo, gelegen in de provincie Limón, is een van de best bewaarde geheimen van de Zuid-Caribische kust van Costa Rica. Dit indrukwekkende wildreservaat biedt een rijke variëteit aan ecosystemen, van mangroves en koraalriffen tot ongerepte stranden.',
    heading: 'Zo kom je van Puerto Viejo naar het Nationaal Wildreservaat Gandoca-Manzanillo, Costa Rica',
    heroAlt: 'Nationaal Wildreservaat Gandoca-Manzanillo',
    intro:
      <>Het <a href="https://maps.app.goo.gl/orUHFbrZvpJH1fnb9" target="_blank" rel="noopener noreferrer">Nationaal Wildreservaat Gandoca-Manzanillo</a>, gelegen in de provincie Limón, is een van de best bewaarde geheimen van de Zuid-Caribische kust van Costa Rica. Dit indrukwekkende wildreservaat biedt een rijke variëteit aan ecosystemen, van mangroves en koraalriffen tot ongerepte stranden. Ben je in Puerto Viejo de Talamanca en op zoek naar een uitje in de natuur, dan is dit een uitstekende optie. In deze gids laten we je zien hoe je er eenvoudig vanuit Puerto Viejo naartoe komt, zodat je dit natuurparadijs volledig kunt verkennen.</>,
    transportOptionsHeading: 'Vervoersmogelijkheden',
    stayRecommendationTitle: 'Waar overnachten bij een bezoek aan Gandoca-Manzanillo?',
    busHeading: '1. Bus van Puerto Viejo naar Manzanillo',
    busIntro:
      <>De eenvoudigste en goedkoopste manier om het <a href="https://maps.app.goo.gl/orUHFbrZvpJH1fnb9" target="_blank" rel="noopener noreferrer">Nationaal Wildreservaat Gandoca-Manzanillo</a> te bereiken, is met de bus vanuit het centrum van Puerto Viejo naar Manzanillo. De <a href="https://maps.app.goo.gl/orUHFbrZvpJH1fnb9" target="_blank" rel="noopener noreferrer">bushalte</a> bevindt zich waar je de kaartjes koopt, vlak bij het basketbalveld of bij de ijssalon Deleite.</>,
    busSchedulesLabel: 'Busdienstregelingen:',
    tableRouteHeader: 'Route',
    tableDepartureHeader: 'Vertrektijden',
    scooterHeading: '2. Een scooter of 4x4 huren',
    scooterParagraph1:
      <>Als je liever in je eigen tempo verkent, is het huren van een scooter of 4x4 een uitstekende optie. Verblijf je in een van onze huizen in het centrum van Puerto Viejo, dan kun je pal ertegenover voertuigen huren bij <a href="https://maps.app.goo.gl/uao7BMUuwFLyRL6dA" target="_blank" rel="noopener noreferrer">Mistery Jungle</a>, met prijzen vanaf 30 dollar. Verblijf je in onze villa's in Playa Chiquita, dan kun je vragen om het voertuig rechtstreeks bij je villa te laten bezorgen.</>,
    scooterParagraph2:
      'Deze optie is ideaal voor wie op zoek is naar een avontuur op maat, want je kunt stoppen waar je maar wilt en het charmante dorpje Manzanillo verkennen zonder je zorgen te maken over busdienstregelingen. Geniet van de vrijheid om op je eigen manier te ontdekken en verken alle hoekjes die deze prachtige bestemming te bieden heeft.',
    carHeading: "3. Met de auto vanuit Puerto Viejo",
    carParagraph:
      'Als je besluit met de auto vanuit Puerto Viejo te reizen, rijd je gewoon richting Manzanillo over de 14 km lange route. Bij aankomst vind je parkeergelegenheid buiten het reservaat, waar sommige lokale bewoners aanbieden om tegen een kleine vergoeding op je voertuig te letten. We raden aan geen waardevolle spullen in de auto achter te laten, voor de veiligheid.',
    conclusionHeading: 'Conclusie',
    conclusionParagraph1:
      'Het Nationaal Wildreservaat Gandoca-Manzanillo is een bestemming die natuur- en avontuurliefhebbers niet mogen missen. Of je nu met de bus reist, een voertuig huurt of zelf rijdt, dit natuurparadijs is eenvoudig en gemakkelijk te bereiken.',
    conclusionParagraph2:
      "We nodigen je uit om je bezoek aan dit prachtige reservaat te plannen en van de gelegenheid gebruik te maken om te overnachten in onze gezellige huizen in Puerto Viejo de Talamanca. We bieden een comfortabele en ontspannen omgeving, perfect om van de natuur te genieten en alles te verkennen wat de regio te bieden heeft. Ontdek de charme van het Nationaal Wildreservaat Gandoca-Manzanillo en de warmte van onze villa's!",
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
  de: {
    seoTitle: 'Wie man von San José nach Puerto Viejo kommt',
    seoDescription:
      'Wenn Sie eine Reise nach Puerto Viejo, Costa Rica, planen, fragen Sie sich vielleicht, wie Sie mit öffentlichen Verkehrsmitteln dorthin gelangen. Zum Glück gibt es mehrere Optionen, die Sie in diese wunderschöne Karibikstadt in Talamanca bringen.',
    heading: 'Wie man von San José nach Puerto Viejo kommt',
    paragraphsBeforeStay: [
      'Wenn Sie eine Reise nach Puerto Viejo, Costa Rica, planen, fragen Sie sich vielleicht, wie Sie mit öffentlichen Verkehrsmitteln dorthin gelangen. Zum Glück gibt es mehrere Optionen, die Sie in diese wunderschöne Karibikstadt in Talamanca bringen.',
      <>Eine der beliebtesten Möglichkeiten, nach Puerto Viejo zu gelangen, ist der Bus. Das wichtigste Busunternehmen auf der Strecke von San José nach Puerto Viejo ist <a href="https://www.mepecr.com/HorarioS_S.html" target="_blank" rel="noopener noreferrer">MEPE</a>. Die Busstation befindet sich im Zentrum von San José, genau an der 9. Avenue und 12. Straße, und ist daher leicht zu finden.</>,
      <b><i>Der <a href="https://www.mepecr.com/HorarioS_S.html" target="_blank" rel="noopener noreferrer">Busfahrplan</a> nach Puerto Viejo lautet wie folgt: 6, 8 und 10 Uhr, 14 Uhr sowie der letzte Bus um 16 Uhr.</i></b>,
      'Zwar können Sie keine Tickets im Voraus reservieren, aber es ist immer ratsam, früh an der Busstation zu sein, um sich einen Platz im Bus zu sichern. Beachten Sie, dass die Busse in der Hauptreisezeit, etwa an Feiertagen und Wochenenden, schnell voll werden können, planen Sie also entsprechend.',
    ],
    stayRecommendationTitle: 'Wo übernachten auf dem Weg nach Puerto Viejo?',
    paragraphsBetween: [
      'Der Bus hat viele Haltestellen und hält auch an den Busstationen in Limón und Cahuita, bevor er schließlich Puerto Viejo erreicht.',
      'Wenn Sie bei den Transportkosten sparen möchten, ist der öffentliche Bus die günstigste Option. Diese Busse sind sauber, zuverlässig und bieten eine erschwingliche Möglichkeit, nach Puerto Viejo zu gelangen. Auch wenn sie nicht so luxuriös sind wie private Shuttleservices, bringen sie Sie sicher und pünktlich an Ihr Ziel.',
      'Dank regelmäßiger Busfahrpläne von San José und anderen nahegelegenen Orten lässt sich Ihre Reise leicht planen, damit Sie alles genießen können, was Puerto Viejo zu bieten hat.',
      <b><i>Eine weitere Möglichkeit, von San José nach Puerto Viejo zu gelangen, ist der Bus von <a href="https://maps.app.goo.gl/a5kV7YvzybHjVae28" target="_blank" rel="noopener noreferrer">Caribeños</a>, der direkt nach Limón fährt. Von dort können Sie in einen Bus nach Puerto Viejo umsteigen.</i></b>,
      <>Der Busfahrplan von San José nach Limón startet an der <a href="https://maps.app.goo.gl/a5kV7YvzybHjVae28" target="_blank" rel="noopener noreferrer">Caribeños-Haltestelle</a> an der Calle Central, Cinco Esquinas. Die Busse fahren stündlich von 6 bis 19 Uhr, sodass sich Ihre Reise leicht planen lässt. In Limón angekommen, können Sie zur <a href="https://maps.app.goo.gl/WV4CmLqzco2Eft7y9" target="_blank" rel="noopener noreferrer">Mepe</a>-Bushaltestelle laufen, die sich in der Nähe des zentralen Marktes befindet, und einen der stündlich abfahrenden Busse nach Puerto Viejo nehmen.</>,
      'Beachten Sie jedoch, dass die Fahrt von San José nach Limón je nach Verkehr und Straßenverhältnissen etwa 3 bis 4 Stunden dauern kann. Planen Sie daher unbedingt im Voraus, um nicht über Nacht in Limón festzusitzen. Außerdem fährt der letzte Bus von Limón nach Puerto Viejo um 20 Uhr ab, stellen Sie also sicher, dass Sie rechtzeitig in Limón ankommen, um den Anschluss zu schaffen.',
      <>Eine weitere Möglichkeit, nach Puerto Viejo zu gelangen, ist ein <a href="mailto:reservas.kalawala@gmail.com?subject=Organise private transportation&body= " target="_blank" rel="noopener noreferrer">privater Transport</a>. Diese Option kann mit anderen Reisenden geteilt werden oder privat für Sie und Ihre Begleitung sein, was sie zu einer bequemen und komfortablen Art macht, an Ihr Ziel zu reisen.</>,
      'Mit privatem Transport können Sie an einem beliebigen Ort abgeholt und direkt zu Ihrer Unterkunft in Puerto Viejo gebracht werden. Diese Option ist besonders hilfreich für alle mit viel Gepäck, mehr Privatsphäre oder besonderen Reisebedürfnissen.',
      'Je nach Anzahl der Reisenden kann privater Transport im Vergleich zu einem geteilten Shuttle sogar kostengünstiger sein.',
      'Außerdem bietet er die Flexibilität, den eigenen Zeitplan zu bestimmen und unterwegs anzuhalten, um einige der wunderschönen Ausblicke entlang der Strecke zu genießen.',
      'Wenn Sie an privatem Transport nach Puerto Viejo interessiert sind, gibt es mehrere renommierte Unternehmen, die diesen Service anbieten. Es lohnt sich immer, die Optionen zu recherchieren und Preise zu vergleichen, um das beste Angebot zu finden.',
      'Auch wir bieten diesen Service an und können Ihnen Routen und Preise nennen, damit Sie die beste Entscheidung für Ihre Reise treffen können.',
      'Ob Sie nun die Bequemlichkeit öffentlicher Verkehrsmittel oder den Komfort eines privaten Transports bevorzugen — es gibt mehrere Wege nach Puerto Viejo. Unabhängig von Ihrer Wahl werden Sie die atemberaubende Landschaft und lebendige Kultur dieser wunderschönen Karibikstadt in Talamanca, Costa Rica, garantiert genießen.',
    ],
  },
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
  nl: {
    seoTitle: 'Hoe kom je van San José naar Puerto Viejo',
    seoDescription:
      'Als je een reis naar Puerto Viejo, Costa Rica plant, vraag je je misschien af hoe je er met het openbaar vervoer kunt komen. Gelukkig zijn er verschillende opties die je naar dit prachtige Caribische dorpje in Talamanca kunnen brengen.',
    heading: 'Hoe kom je van San José naar Puerto Viejo',
    paragraphsBeforeStay: [
      'Als je een reis naar Puerto Viejo, Costa Rica plant, vraag je je misschien af hoe je er met het openbaar vervoer kunt komen. Gelukkig zijn er verschillende opties die je naar dit prachtige Caribische dorpje in Talamanca kunnen brengen.',
      <>Een van de populairste manieren om naar Puerto Viejo te reizen is met de bus. Het belangrijkste busbedrijf dat de route van San José naar Puerto Viejo bedient, is <a href="https://www.mepecr.com/HorarioS_S.html" target="_blank" rel="noopener noreferrer">MEPE</a>. Het busstation bevindt zich in het centrum van San José, precies op de hoek van de 9e avenue en de 12e straat, waardoor het gemakkelijk te vinden is.</>,
      <b><i>De <a href="https://www.mepecr.com/HorarioS_S.html" target="_blank" rel="noopener noreferrer">busdienstregeling</a> naar Puerto Viejo is als volgt: 6.00, 8.00, 10.00, 14.00 uur en de laatste om 16.00 uur.</i></b>,
      'Hoewel je geen tickets vooraf kunt reserveren, is het altijd verstandig om vroeg bij het busstation aan te komen om zeker te zijn van een plek in de bus. Houd er rekening mee dat de bussen in drukke reisperiodes, zoals feestdagen en weekenden, snel vol kunnen raken, dus plan dienovereenkomstig.',
    ],
    stayRecommendationTitle: 'Waar overnachten tijdens je reis naar Puerto Viejo?',
    paragraphsBetween: [
      'De bus maakt veel stops en stopt ook bij de busstations van Limón en Cahuita, voordat hij uiteindelijk Puerto Viejo bereikt.',
      'Als je wilt besparen op vervoerskosten, is de openbare bus de goedkoopste optie. Deze bussen zijn schoon, betrouwbaar en bieden een betaalbare manier om naar Puerto Viejo te komen. Hoewel ze niet zo luxueus zijn als sommige privé-shuttlediensten, brengen ze je veilig en op tijd naar je bestemming.',
      'Dankzij regelmatige busdienstregelingen vanuit San José en andere nabijgelegen dorpen is het eenvoudig om je reis te plannen en te genieten van alles wat Puerto Viejo te bieden heeft.',
      <b><i>Een andere optie om van San José naar Puerto Viejo te komen, is de bus van <a href="https://maps.app.goo.gl/a5kV7YvzybHjVae28" target="_blank" rel="noopener noreferrer">Caribeños</a> te nemen, die rechtstreeks naar Limón gaat. Vandaar kun je overstappen op een bus naar Puerto Viejo.</i></b>,
      <>De busdienstregeling van San José naar Limón vertrekt vanaf de <a href="https://maps.app.goo.gl/a5kV7YvzybHjVae28" target="_blank" rel="noopener noreferrer">Caribeños-halte</a> aan de Calle Central, Cinco Esquinas. Er vertrekt elk uur een bus, van 6.00 tot 19.00 uur, waardoor je je reis eenvoudig kunt plannen. Eenmaal in Limón kun je te voet naar de <a href="https://maps.app.goo.gl/WV4CmLqzco2Eft7y9" target="_blank" rel="noopener noreferrer">Mepe</a>-bushalte lopen, die zich bij de centrale markt bevindt, en een bus nemen die elk uur naar Puerto Viejo vertrekt.</>,
      'Houd er echter rekening mee dat de reis van San José naar Limón, afhankelijk van het verkeer en de wegomstandigheden, ongeveer 3 tot 4 uur kan duren. Het is dus cruciaal om vooruit te plannen, zodat je niet \'s nachts in Limón vastzit. Bovendien vertrekt de laatste bus van Limón naar Puerto Viejo om 20.00 uur, zorg er dus voor dat je op tijd in Limón aankomt om de overstap te halen.',
      <>Een andere manier om naar Puerto Viejo te komen is via <a href="mailto:reservas.kalawala@gmail.com?subject=Organise private transportation&body= " target="_blank" rel="noopener noreferrer">privévervoer</a>. Deze optie kan gedeeld worden met andere reizigers of privé zijn voor jou en je reisgenoten, waardoor het een handige en comfortabele manier is om naar je bestemming te reizen.</>,
      'Met privévervoer kun je worden opgehaald waar je maar wilt en rechtstreeks worden afgezet bij je accommodatie in Puerto Viejo. Deze optie kan vooral handig zijn voor mensen met zwaar bagage, die meer privacy willen of specifieke reisbehoeften hebben.',
      'Afhankelijk van het aantal reizigers kan privévervoer zelfs voordeliger zijn dan een gedeelde shuttle.',
      'Daarnaast biedt het de flexibiliteit om je eigen schema te bepalen en onderweg te stoppen om van enkele prachtige uitzichten langs de route te genieten.',
      'Als je geïnteresseerd bent in het boeken van privévervoer naar Puerto Viejo, zijn er verschillende betrouwbare bedrijven die deze dienst aanbieden. Het is altijd verstandig om je opties te onderzoeken en prijzen te vergelijken om de beste deal te vinden.',
      'Ook wij bieden deze dienst aan en kunnen je de routes en prijzen geven, zodat je de best geïnformeerde beslissing voor je reis kunt nemen.',
      'Kortom, of je nu het gemak van het openbaar vervoer verkiest of het comfort van privévervoer, er zijn verschillende manieren om naar Puerto Viejo te komen. Wat je keuze ook is, je zult zeker genieten van het prachtige landschap en de levendige cultuur van dit mooie Caribische dorpje in Talamanca, Costa Rica.',
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
  nl: {
    seoTitle: 'Nationaal Park Cahuita bezoeken: wat je vooraf moet weten',
    seoDescription:
      'Nationaal Park Cahuita is een van de makkelijkst te bezoeken en meest ontspannen nationale parken aan de Caribische kust van Costa Rica. Het combineert jungle­paden, witte zandstranden, wilde dieren en koraalriffen op één plek.',
    heading: 'Nationaal Park Cahuita bezoeken: wat je vooraf moet weten',
    photoCredit: <>Foto door <a href="https://haakonkrohn.com/" target="_blank" rel="noopener noreferrer">Haakon S. Krohn</a></>,
    introParagraphs: [
      'Nationaal Park Cahuita is een van de makkelijkst te bezoeken en meest ontspannen nationale parken aan de Caribische kust van Costa Rica. Het combineert junglepaden, witte zandstranden, wilde dieren en koraalriffen op één plek.',
      'Als je in de buurt van het dorp Cahuita of Puerto Viejo verblijft, is dit een geweldig uitje van een halve of hele dag. Hieronder vind je een duidelijke gids om je bezoek te plannen.',
    ],
    enterHeading: 'Binnenkomen vanuit het dorp Cahuita',
    enterParagraphs: [
      'De meest gebruikte ingang bevindt zich in het dorp Cahuita, vlak bij Playa Blanca.',
      'Deze ingang werkt op basis van een vrijwillige bijdrage, waardoor hij goedkoper is dan andere ingangen van het park. De bijdrage helpt het onderhoud van het park en de lokale gidsen te ondersteunen.',
      'Kom indien mogelijk vroeg in de ochtend. Het is dan koeler, rustiger en beter om dieren te spotten.',
    ],
    stayRecommendationTitle: 'Waar overnachten bij Nationaal Park Cahuita?',
    snorkelHeading: 'Snorkelen in het park',
    snorkelParagraphs: [
      'Snorkelen is een van de belangrijkste redenen waarom mensen Nationaal Park Cahuita bezoeken.',
      'Het koraalrif hier is een van de grootste aan de Caribische kust van Costa Rica. Je kunt kleurrijke vissen, koraalformaties en soms roggen zien.',
      'De meeste bezoekers boeken een begeleide snorkeltour, die het volgende omvat:',
    ],
    snorkelListItems: ['Een lokale gids', 'Snorkeluitrusting', 'Een boottocht naar het rif'],
    snorkelClosing: 'De omstandigheden zijn afhankelijk van het weer, dus het zicht kan van dag tot dag verschillen.',
    wildlifeHeading: 'Let op je eten in de buurt van dieren',
    wildlifeParagraphs: [
      'Cahuita zit vol dieren. Je kunt apen, wasberen, leguanen, neusberen en luiaards tegenkomen.',
      'Sommige dieren zijn erg gewend aan bezoekers en proberen soms eten te stelen. Bewaar snacks in een gesloten tas en laat eten nooit onbeheerd achter.',
      'Het is niet toegestaan dieren te voeren, en het kan hen schaden.',
    ],
    scheduleHeading: 'Ken de openingstijden van het park',
    scheduleParagraphs: [
      <>Het park <strong>sluit om 16.00 uur.</strong> Bezoekers moeten vóór die tijd naar buiten.</>,
      'Dit is nog een reden om vroeg naar binnen te gaan. Je hebt dan meer tijd om te wandelen, te zwemmen en te ontspannen zonder je te hoeven haasten.',
    ],
    boatHeading: 'Terug met de boot in plaats van lopen',
    boatParagraphs: [
      'Het hoofdpad loopt langs de kust en kan lang zijn als je de volledige route te voet aflegt.',
      <>Veel bezoekers lopen één kant op en <strong>keren terug met de boot</strong>. Lokale bootoperators bieden ritten terug richting het dorp Cahuita aan.</>,
      'Dit is een goede optie als je van het pad wilt genieten zonder de hele afstand te lopen.',
    ],
    plasticHeading: 'Plastic is niet toegestaan',
    plasticParagraphs: [
      <><strong>Wegwerpplastic</strong> is niet toegestaan in het park.</>,
      'Dit omvat plastic tassen, wegwerpflessen en plastic voedselverpakkingen. Neem herbruikbare flessen en bakjes mee.',
      'Het parkpersoneel kan tassen controleren bij de ingang.',
    ],
    tipsHeading: 'Laatste tips voordat je gaat',
    tipsListItems: [
      'Draag comfortabele wandelschoenen of sandalen',
      'Neem water mee in een herbruikbare fles',
      'Gebruik rifvriendelijke zonnebrand',
      'Begin vroeg om hitte en drukte te vermijden',
    ],
    closing: <><strong>Nationaal Park Cahuita is rustig, prachtig en makkelijk te bezoeken.</strong> Met een beetje planning is het een van de beste natuurervaringen aan de Caribische kust van Costa Rica.</>,
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
  nl: {
    seoTitle: 'Beste tijd om Puerto Viejo de Limón, Costa Rica te bezoeken',
    seoDescription:
      'Ontdek de beste tijd om Puerto Viejo de Limón te bezoeken. Lees waarom september en oktober de meest betrouwbare maanden zijn voor heldere luchten en een kalme zee, en wat je in andere seizoenen kunt verwachten.',
    heading: 'De beste tijd van het jaar om Puerto Viejo de Limón, Costa Rica te bezoeken',
    heroAlt: 'Strand in Puerto Viejo de Limón, Costa Rica',
    photoCredit: <>Foto door <a href="https://web.archive.org/web/20161028110553/http://www.panoramio.com/user/4645711?with_photo_id=101824520" target="_blank" rel="noopener noreferrer">hh oldman</a></>,
    introParagraphs: [
      'Kiezen wanneer je Puerto Viejo bezoekt, is niet zo eenvoudig als het raadplegen van een weergrafiek. De zuidelijke Caribische kust kan van week tot week veranderen.',
      "Ook meerjarige cycli spelen een rol. Sommige jaren zijn droger. Andere jaren zijn natter. Daarom kan het 'gemiddelde' weer verkeerd aanvoelen zodra je aankomt.",
    ],
    stayRecommendationTitle: 'Op zoek naar een verblijf in Puerto Viejo?',
    hardToPredictHeading: 'Waarom het weer in Puerto Viejo moeilijk te voorspellen is',
    hardToPredictParagraphs: [
      'Puerto Viejo volgt niet dezelfde seizoenen als de Pacifische kust van Costa Rica: regen en de staat van de zee hangen af van bredere Caribische weersystemen.',
      'Dat betekent dat je in elke maand verrassingen kunt tegenkomen:',
    ],
    surprisesListItems: [
      "Weken die zonnig blijven tijdens het 'regenseizoen'",
      "Zware regenval in maanden die als 'droog seizoen' worden bestempeld",
      'Zeeomstandigheden die snel omslaan',
    ],
    bestTimeHeading: 'De echte beste tijd om te bezoeken: september en oktober',
    bestTimeParagraphs: [
      <>In tegenstelling tot wat veel websites beweren, is de meest betrouwbare tijd om te bezoeken <strong>september en oktober</strong>.</>,
      'Deze periode wordt vaak de Caribische zomer genoemd. Het is de enige periode die consequent de combinatie biedt die de meeste reizigers willen.',
    ],
    bestTimeListItems: [
      'Heldere luchten, meerdere dagen achter elkaar',
      'Kalme zee',
      'Geweldige stranddagen zonder de drukte van het hoogseizoen',
    ],
    febAprHeading: 'Februari tot april: minder betrouwbaar dan geadverteerd',
    febAprParagraphs: [
      'Veel gidsen noemen februari tot april als het droge seizoen. In mijn ervaring kan deze periode net zo wisselvallig en onvoorspelbaar zijn als elke andere maand.',
      'Je kunt perfecte stranddagen treffen. Je kunt ook regen, wolken en wisselende zeeomstandigheden tegenkomen. Het kan een goede tijd zijn om te reizen, maar het is geen zekerheid.',
    ],
    wetMonthsHeading: 'Maanden die vaak natter zijn',
    wetMonthsParagraphs: [
      'Sommige maanden brengen vaker zware regen en grijzere luchten met zich mee.',
      <><strong>December</strong> is doorgaans erg regenachtig. Ook de zee kan dan ruwer aanvoelen.</>,
      <><strong>Mei en juni</strong> zijn ook vaak nat, met vaker regenbuien en een hogere luchtvochtigheid.</>,
      'Deze maanden kunnen nog steeds prachtig zijn, vooral als je van een groener landschap houdt en het niet erg vindt om in de regen te lopen.',
    ],
    tipsHeading: 'Snelle plantips',
    tipsListItems: [
      'Wil je de beste kans op zon en een kalme zee, plan dan voor september of oktober.',
      'Reis je in een andere maand, pak dan kleding voor wisselend weer in en blijf flexibel.',
      'Voor snorkelen en zwemmen is een kalme zee net zo belangrijk als regen.',
      <>Mijn favoriete app om het weer te voorspellen is <a href="https://www.msn.com/es-xl/el-tiempo/pronostico/in-Puerto-Viejo,Limon?loc=eyJhIjoiSG90ZWwgUHVlcnRvIFZpZWpvIiwibCI6IlB1ZXJ0byBWaWVqbyIsInIiOiJMaW1vbiIsImMiOiJDb3N0YSBSaWNhIiwiaSI6IkNSIiwidCI6MTAxLCJnIjoiZXMteGwiLCJ4IjoiLTgyLjc1MzQwMjcwOTk2MDk0IiwieSI6IjkuNjU3MTk5ODU5NjE5MTQifQ%3D%3D&weadegreetype=C" target="_blank" rel="noopener noreferrer">MSN</a>.</>,
    ],
    conclusionHeading: 'Belangrijkste conclusies',
    conclusionParagraph:
      "Het weer in Puerto Viejo kan van jaar tot jaar sterk verschillen, dus grafieken vertellen niet het hele verhaal. Wil je de meest betrouwbare combinatie van heldere luchten en een kalme zee, dan zijn september en oktober de beste keuze.",
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
  nl: {
    seoTitle: 'Inheemse cultuur bij Puerto Viejo de Talamanca',
    seoDescription:
      'Ontdek de inheemse Bribri-cultuur bij Puerto Viejo de Talamanca. Leer over voorouderlijke cacao, traditionele geneeskunde en authentieke culturele ervaringen in inheemse gemeenschappen aan de Zuid-Caribische kust van Costa Rica.',
    heading: 'Inheemse cultuur bij Puerto Viejo de Talamanca',
    heroAlt: 'Inheemse Bribri-cultuur bij Puerto Viejo',
    introParagraph:
      'Puerto Viejo de Talamanca staat bekend om zijn stranden, ontspannen sfeer en indrukwekkende jungle. Maar net landinwaarts ligt een andere kant van de regio die veel reizigers nooit te zien krijgen.',
    stayRecommendationTitle: 'Op zoek naar een verblijf in Puerto Viejo?',
    afterStayParagraph:
      'Vlak bij het dorp bieden inheemse gebieden een dieper inzicht in het leven aan de Zuid-Caribische kust van Costa Rica. Hier maakt cultuur deel uit van het dagelijks leven.',
    territoriesHeading: 'Inheemse gebieden bij Puerto Viejo',
    territoriesParagraphs: [
      'Puerto Viejo ligt vlak bij het inheemse gebied Bribri van Talamanca en het inheemse reservaat Keköldi. Deze gronden behoren toe aan het Bribri-volk, een van de belangrijkste inheemse groepen van Costa Rica.',
      'Veel families spreken nog steeds de Bribri-taal, verbouwen hun eigen voedsel en gebruiken traditionele kennis in hun dagelijks leven.',
    ],
    experiencesHeading: 'Hoe culturele ervaringen eruitzien',
    experiencesIntro:
      'De meeste bezoeken worden geleid door leden van de gemeenschap. De groepen zijn klein en de nadruk ligt op leren, respect en persoonlijk contact.',
    dailyLifeHeading: 'Dagelijks leven en gemeenschapsbezoeken',
    dailyLifeParagraph:
      'Bezoekers wandelen over familiegrond, zien traditionele woningen en leren hoe Bribri-families hun dagelijks leven, werk en sociale rollen organiseren.',
    cacaoHeading: 'Cacao en traditie',
    cacaoParagraphs: [
      'Cacao speelt een centrale rol in de Bribri-cultuur. Veel tours tonen het voorouderlijke bereidingsproces, van de cacaopeul tot de uiteindelijke drank.',
      'Gidsen leggen uit waarom cacao belangrijk is bij ceremonies en in het dagelijks leven, en bezoekers proeven het meestal op traditionele wijze bereid.',
    ],
    medicinalHeading: 'Geneeskrachtige planten en natuur',
    medicinalParagraphs: [
      'Sommige ervaringen omvatten boswandelingen gericht op geneeskrachtige planten en hun traditioneel gebruik voor gezondheid en dagelijkse verzorging.',
      'Veel tours eindigen met een bezoek aan een waterval binnen inheems gebied, gewaardeerd om zowel zijn natuurlijke schoonheid als zijn culturele betekenis.',
    ],
    operatorsHeading: 'Lokale touroperators in Puerto Viejo',
    operatorsIntro: 'Verschillende lokale bureaus werken rechtstreeks samen met inheemse gemeenschappen om deze ervaringen op een verantwoorde manier aan te bieden.',
    operators: [
      { name: 'Life Culture Travel Costa Rica', href: 'https://lifeculturetravelcostarica.com/', description: 'Biedt culturele ervaringen aan, waaronder Bribri-sjamaan- en chocoladetours, wandelingen langs geneeskrachtige planten en onderdompeling in de lokale gemeenschap.' },
      { name: 'Exploradores Outdoors', href: 'https://exploradoresoutdoors.com/tours/indigenous-experience-chocolate-tour/', description: 'Biedt een inheemse ervaring en chocoladetour die Bribri-tradities, geneeskrachtige planten en een bezoek aan een waterval omvat.' },
      { name: 'Bribri Magic Chocolate & Waterfall Experience', href: 'https://www.viator.com/tours/Limon/Chocolate-taste-true/d4513-238841P2', description: 'Kleinschalige tour vanuit Puerto Viejo om over de Bribri-cultuur te leren, cacao te bereiden en te zwemmen bij een waterval.' },
    ],
    askAboutTourParagraph: 'Vraag bij het boeken of de tour wordt geleid door leden van de gemeenschap en hoe het bezoek de lokale families ondersteunt.',
    tipsHeading: 'Praktische tips voor bezoekers',
    tipsParagraphs: [
      'Tours vinden het hele jaar door plaats en beginnen meestal in de ochtend.',
      "Neem gesloten schoenen, water, zonbescherming en insectenwerend middel mee. Volg altijd de aanwijzingen van je gids en vraag toestemming voordat je foto's maakt.",
      'Handwerk of eten rechtstreeks bij families kopen is een van de beste manieren om de gemeenschap te steunen.',
    ],
    differentWayHeading: 'Een andere manier om de Zuid-Caribische kust te ervaren',
    differentWayParagraphs: [
      'Een bezoek aan inheemse gemeenschappen bij Puerto Viejo voegt diepgang en betekenis toe aan je reis. Het draait om leren, niet om haasten.',
      'Deze ervaring past bij reizigers die een rustigere, meer authentieke band willen met de plek die ze bezoeken.',
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
  nl: {
    seoTitle: 'Verborgen parels in Puerto Viejo: rustige plekken waar locals van houden',
    seoDescription:
      'Puerto Viejo heeft beroemde stranden, muziek en nachtleven. Maar sommige van de beste plekken staan niet op de gebruikelijke lijstjes. Deze plekken voelen rustiger, dichter bij de natuur en persoonlijker aan. Wil je minder drukte en echte lokale sfeer, begin dan hier. Deze verborgen parels zijn makkelijk te bereiken en de moeite waard.',
    heading: 'Verborgen parels in Puerto Viejo: rustige plekken waar locals van houden',
    heroAlt: 'Puerto Viejo de Talamanca, Costa Rica',
    photoCredit: <>Foto door <a href="https://commons.wikimedia.org/wiki/User:Letartean" target="_blank" rel="noopener noreferrer">Letartean</a></>,
    introParagraphs: [
      'Puerto Viejo is makkelijk om lief te hebben. De meeste bezoekers gaan naar de beroemde stranden, drinken een cocktail in het dorp en noemen dat een geslaagde dag. Maar de mooiste momenten vinden vaak plaats op rustigere plekken: kleine baaitjes, verborgen stukjes zand en eenvoudige lokale maaltijden die smaken naar de Caraïben.',
      'Hieronder vind je een paar verborgen parels rond Puerto Viejo die rustiger en persoonlijker aanvoelen. Geen van alle vereist een ingewikkeld plan. Je hebt alleen wat tijd, zonbescherming en een rustig tempo nodig.',
    ],
    stayRecommendationTitle: 'Waar overnachten in Puerto Viejo voor gemakkelijke toegang tot deze verborgen parels',
    sections: [
      {
        headingText: 'Playa Chiquita',
        headingHref: 'https://maps.app.goo.gl/tTS4h2KYududsyh8A',
        paragraphs: [
          'Playa Chiquita is een afgelegener strook zand die veel mensen overslaan. Het voelt verscholen, met minder drukte en een rustigere sfeer.',
          'Het water is niet altijd kalm, maar de sfeer daar zeker wel. Het is de perfecte plek voor een rustige ochtend.',
        ],
        list: { label: 'Perfect voor:', items: ['Ontspannen onder de bomen', 'Te voet verkennen', 'Een simpele picknick'] },
      },
      {
        headingText: 'Playa Grande',
        headingHref: 'https://maps.app.goo.gl/zpRcsq96dC9MnVRU7',
        paragraphs: [
          'Playa Grande is bekend bij surfers, maar het is ook een van de opvallendste stranden in de omgeving. Het voelt breed, open en minder bezocht dan andere plekken.',
          'Ook als je niet surft, is het een bezoek waard vanwege het landschap en lange wandelingen. Houd er wel rekening mee dat de golven sterk kunnen zijn.',
        ],
        list: { label: 'Goed om te weten:', items: ['Beter voor ervaren surfers dan voor zwemmers', 'Geweldig voor foto\'s en wandelingen', 'Meestal rustiger dan Cocles'] },
      },
      {
        headingText: 'Baaitjes bij Punta Cocles & Jaguar Rescue Center',
        headingHref: 'https://www.jaguarrescue.foundation',
        paragraphs: [
          <>Vlak voor het <a href="https://www.jaguarrescue.foundation" target="_blank" rel="noopener noreferrer">Jaguar Rescue Center</a> vind je kleine baaitjes en rustigere stukjes strand. De rotspunten breken de kustlijn op, waardoor het makkelijk is een plek te vinden die privé aanvoelt.</>,
          'Dit gebied is ook een van de beste plekken om wilde dieren te spotten. Je kunt apen in de bomen zien of een luiaard hoog bij de weg.',
        ],
        tipLine: "Tip: ga vroeg in de ochtend voor minder mensen en meer dierenactiviteit.",
      },
      {
        headingText: 'Kayakken bij Punta Uva zonder tour',
        paragraphs: [
          'Punta Uva staat bekend om zijn strand, maar de rivier is het echte geheim. Je hebt geen tour nodig om ervan te genieten. Huur gewoon een kayak en verken de omgeving in je eigen tempo.',
          'Het water is meestal kalm, en de jungle voelt aan beide kanten dichtbij. Het is rustgevend en eenvoudig, zelfs als je geen ervaren peddelaar bent.',
        ],
        list: { label: 'Neem mee:', items: ['Zonbescherming', 'Water en een droogzak', 'Respectvolle afstand tot wilde dieren'] },
      },
      {
        headingText: 'Restaurante Caribeño 1872 voor rice and beans',
        paragraphs: [
          <>Wil je een maaltijd die echt lokaal aanvoelt, ga dan naar <a href="https://maps.app.goo.gl/ynskDRDozJkGW1ML6" target="_blank" rel="noopener noreferrer">Restaurante Caribeño 1872</a> voor rijk, smaakvol Caribisch eten.</>,
          'De smaak is rijk, de porties zijn royaal en de sfeer is ontspannen. Het is het soort plek waar je graag naar terugkeert.',
        ],
      },
      {
        headingText: 'Punta Mona & Wildreservaat Gandoca-Manzanillo',
        headingHref: 'https://maps.app.goo.gl/8dDzcZiUrhuuPmCy8',
        paragraphs: [
          'Punta Mona voelt ver weg, op de beste manier. Je kunt een boot huren en de schipper vragen je langs de kust te varen naar de ongerepte stranden en stille oevers binnen het Nationaal Wildreservaat Gandoca-Manzanillo.',
          'De beloning is helder water, een stille kustlijn en het gevoel dat je de drukke wereld achter je hebt gelaten.',
        ],
        list: { label: 'Goed om te weten:', items: ['Neem snacks en water mee (er zijn geen winkels)', 'Ga bij kalm weer en rustige zee', 'Neem alles wat je meebrengt weer mee terug'] },
      },
    ],
    tipsHeading: 'Snelle tips om van deze plekken te genieten',
    tipsIntro: 'Een paar kleine keuzes maken een groot verschil in Puerto Viejo, zowel voor je dag als voor de plekken die je bezoekt.',
    tipsListItems: [
      'Begin vroeg voor rustige stranden en koeler weer',
      'Gebruik rifvriendelijke zonnebrand als je zwemt of snorkelt',
      'Houd respectvolle afstand tot wilde dieren',
      'Laat geen waardevolle spullen op het strand achter',
    ],
    closingParagraph:
      'Deze verborgen parels zijn wat de reis speciaal maakt: rustig water, wilde kustlijnen en eten dat smaakt als thuis in het Caribisch gebied. Kies er twee of drie uit deze lijst en laat ruimte voor rustige momenten. Dan laat Puerto Viejo zijn beste kant zien.',
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
  nl: {
    seoTitle: 'Volledige busdienstregeling vanuit Puerto Viejo, Costa Rica - MEPE-busroutes en dienstregelingen',
    seoDescription:
      'Vind de volledige busdienstregeling van Puerto Viejo naar San José, Limón, Cahuita, Manzanillo en Sixaola. MEPE-dienstregelingen, routes en vervoersinformatie voor de Caribische kust van Costa Rica.',
    heading: 'Volledige busdienstregeling vanuit Puerto Viejo, Costa Rica - MEPE-busroutes en dienstregelingen',
    photoCredit: <>Foto door <a href="https://web.archive.org/web/20161028110553/http://www.panoramio.com/user/4645711?with_photo_id=101824520" target="_blank" rel="noopener noreferrer">hh oldman</a></>,
    introParagraph:
      <>Ben je je vervoer aan de Caribische kust van Costa Rica aan het plannen? Zoek niet verder! Deze uitgebreide gids geeft je alle busdienstregelingen die je nodig hebt om vanuit Puerto Viejo naar belangrijke bestemmingen te reizen, waaronder <strong>San José</strong>, <strong>Limón</strong>, <strong>Cahuita</strong>, <strong>Manzanillo</strong> en <strong>Sixaola</strong>. Of je nu zoekt naar "bus San José Puerto Viejo", "bus Cahuita Puerto Viejo" of "bus van Puerto Viejo naar San José", wij hebben je gedekt met de meest actuele MEPE-dienstregelingen.</>,
    aboutHeading: 'Over de MEPE-busdienst',
    aboutParagraph1:
      <><strong><a href="https://www.mepe.co.cr/Ingles/index.html" target="_blank" rel="noopener noreferrer">MEPE</a> (Empresa de Transportes Públicos de Limón)</strong> is het belangrijkste busbedrijf dat actief is langs de hele Caribische kust van Costa Rica. Bekend om hun betrouwbare service en uitgebreide netwerk, verbinden MEPE-bussen Puerto Viejo met de belangrijkste steden en toeristische bestemmingen in de regio. Hun moderne vloot biedt comfortabel vervoer voor zowel lokale bewoners als bezoekers, waardoor het de voorkeurskeuze is voor budgetbewuste reizigers die de prachtige Caribische kustlijn van Costa Rica verkennen.</>,
    aboutParagraph2:
      'MEPE-bussen zijn gemakkelijk herkenbaar aan hun kenmerkende blauwe en witte kleuren, en rijden volgens vaste dienstregelingen die over het algemeen stipt worden aangehouden. Het bedrijf bedient de Caribische regio al decennialang en heeft een reputatie opgebouwd op het gebied van veiligheid, betaalbaarheid en uitgebreide dekking van de belangrijkste routes in het gebied.',
    stayRecommendationTitle: 'Waar overnachten terwijl je gebruikmaakt van de busdiensten van Puerto Viejo?',
    routesHeading: 'Busroutes vanuit Puerto Viejo',
    routesIntro: 'Puerto Viejo fungeert als een belangrijk vervoersknooppunt voor de zuidelijke Caribische regio. Vanaf hier kun je gemakkelijk bereiken:',
    destinations: [
      'San José - de hoofdstad van Costa Rica (ongeveer 4-5 uur)',
      'Limón - de Caribische havenstad (ongeveer 1 uur)',
      'Cahuita - beroemd om zijn nationaal park en stranden (ongeveer 30 minuten)',
      'Manzanillo - toegangspoort tot het Wildreservaat Gandoca-Manzanillo (ongeveer 20 minuten)',
      'Sixaola - grensstad met Panama (ongeveer 1,5 uur)',
    ],
    schedulesHeading: 'Volledige busdienstregelingen',
    sanJoseHeading: 'San José ↔ Puerto Viejo (stopt in Cahuita)',
    sanJoseIntro: 'Dit is de hoofdroute die Puerto Viejo verbindt met de hoofdstad van Costa Rica. Perfect voor reizigers die aankomen van of op weg zijn naar de internationale luchthaven van San José.',
    limonHeading: 'Limón ↔ Puerto Viejo (stopt in Cahuita)',
    limonIntro: 'Dit is een van de meest frequente routes en verbindt Puerto Viejo met de havenstad Limón. Perfect voor reizigers die van of naar San José reizen, aangezien Limón als een belangrijk overstappunt fungeert.',
    manzanilloHeading: 'Puerto Viejo ↔ Manzanillo',
    manzanilloIntro: 'Deze route brengt je naar de prachtige stranden van Manzanillo en biedt toegang tot het Nationaal Wildreservaat Gandoca-Manzanillo.',
    sixaolaHeading: 'Sixaola ↔ Puerto Viejo (stopt in Bri Bri)',
    sixaolaIntro: 'Deze route verbindt Puerto Viejo met de grensstad Sixaola, perfect voor reizigers die op weg zijn naar Panama. De route stopt ook in Bri Bri, wat toegang biedt tot inheemse gemeenschappen en culturele ervaringen.',
    tableRouteHeader: 'Route',
    tableDepartureHeader: 'Vertrektijden',
    tableWeekdayHeader: 'Maandag - zaterdag',
    tableSundayHeader: 'Zondag & feestdagen',
    tipsHeading: 'Tips voor busreizen in Puerto Viejo',
    tipsListItems: [
      'Kom vroeg: bussen kunnen snel vol raken, vooral tijdens het hoogseizoen',
      'Alleen contant: MEPE-bussen accepteren alleen contante betalingen - houd colones bij de hand',
      'Bagage: kleine tassen kunnen boven worden opgeborgen, grotere bagage gaat in het bagageruim',
      'Comfort: neem water en snacks mee voor langere ritten',
      'Overstappen: hoewel Limón het belangrijkste knooppunt is voor overstappen naar San José en andere bestemmingen, kun je ook rechtstreeks vanuit San José naar Puerto Viejo komen.',
    ],
    ticketsHeading: 'Waar je tickets kunt kopen',
    ticketsParagraph: 'Bustickets kunnen worden gekocht bij de belangrijkste bushaltes in Puerto Viejo. De belangrijkste bushalte bevindt zich bij het basketbalveld in het centrum van Puerto Viejo, dicht bij de ijssalon Deleite.',
    contactHeading: 'Contact voor businformatie',
    contactIntro: 'Heb je actuele informatie nodig over dienstregelingen of routes? Je kunt het busbedrijf via WhatsApp contacteren voor de meest actuele informatie over de busdiensten:',
    closingParagraph: 'Voor het meest comfortabele verblijf tijdens het verkennen van de Caribische kust, overweeg een van onze volledig uitgeruste huizen in Puerto Viejo of Playa Chiquita te boeken. We bieden handige locaties dicht bij bushaltes en alle voorzieningen die je nodig hebt voor een perfecte Costa Ricaanse uitstap!',
  },
};

export function busHoursContent(locale: Locale): BusHoursContent {
  return busHours[locale] ?? busHours.en!;
}

/* ------------------------------------------------------------------ *
 * Weather cluster — hub article
 *
 * SEO gap (see docs / GSC review): ~10k+ impressions on "clima puerto
 * viejo (limón)" queries with almost no clicks. This hub owns the
 * "what is the weather actually like, month by month" intent, distinct
 * from bestTimeToVisit (which owns "which month should I book"). The
 * 12-row table is the cluster hub; the page component links each row to
 * its monthly article once that article ships.
 * ------------------------------------------------------------------ */

/** One row of the month-by-month table. `temp`/`rain` carry units inline
 * so they read the same across locales; `verdict` is the short "in short"
 * cell. Ordered January…December; the page component pairs each row with
 * its monthly-article RouteKey by index. */
export interface WeatherMonthRow {
  month: string;
  temp: string;
  rain: string;
  verdict: string;
}

export interface WeatherHubContent {
  seoTitle: string;
  seoDescription: string;
  heading: string;
  heroAlt: string;
  photoCredit: React.ReactNode;
  introParagraphs: [string, string];
  stayRecommendationTitle: string;
  tableHeading: string;
  tableIntro: string;
  colMonth: string;
  colTemp: string;
  colRain: string;
  colVerdict: string;
  monthRows: WeatherMonthRow[];
  windowsHeading: string;
  windowsParagraphs: [string, string, string];
  liveHeading: string;
  liveParagraphs: [React.ReactNode, string];
  rainyHeading: string;
  rainyIntro: string;
  rainyListItems: string[];
  packHeading: string;
  packListItems: string[];
  takeawaysHeading: string;
  takeawaysParagraph: string;
}

const weatherHub: Partial<Record<Locale, WeatherHubContent>> = {
  en: {
    seoTitle: 'Weather in Puerto Viejo de Limón: Month-by-Month Climate Guide',
    seoDescription:
      "What's the weather really like in Puerto Viejo de Limón? A month-by-month breakdown of rain, sun, heat and sea conditions, plus the best things to do on rainy days.",
    heading: 'Weather in Puerto Viejo de Limón: a month-by-month guide',
    heroAlt: 'Caribbean beach and jungle in Puerto Viejo de Talamanca, Costa Rica',
    photoCredit: <>Photo: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
    introParagraphs: [
      'Puerto Viejo de Talamanca sits on Costa Rica’s southern Caribbean coast, in a tropical rainforest climate that stays warm all year: daytime highs of 27-29°C and a sea around 28-29°C in every month.',
      'What changes is the rain and the state of the ocean. And crucially, the Caribbean coast doesn’t follow the same calendar as the Pacific side. There’s no true dry season here, but there are drier, sunnier windows. This guide walks through the whole year so you know what to expect whenever you come.',
    ],
    stayRecommendationTitle: 'Looking to stay in Puerto Viejo?',
    tableHeading: 'Puerto Viejo weather, month by month',
    tableIntro: 'Figures are approximate averages, rain here usually means an afternoon or overnight downpour, not an all-day grey-out. Tap a month for the full breakdown.',
    colMonth: 'Month',
    colTemp: 'Temp (high / low)',
    colRain: 'Rain',
    colVerdict: 'In short',
    monthRows: [
      { month: 'January', temp: '27 / 22°C', rain: '~200 mm', verdict: 'Warm and breezy; some showers, good surf' },
      { month: 'February', temp: '28 / 22°C', rain: '~110 mm', verdict: 'Driest window, best beach and snorkelling' },
      { month: 'March', temp: '28 / 22°C', rain: '~170 mm', verdict: 'Warm and fairly dry; great for hikes' },
      { month: 'April', temp: '29 / 23°C', rain: '~210 mm', verdict: 'Greening up; crowds thin after Easter' },
      { month: 'May', temp: '28 / 23°C', rain: '~300 mm', verdict: 'Afternoon showers; lush and quiet' },
      { month: 'June', temp: '28 / 23°C', rain: '~340 mm', verdict: 'Wet; turtle season; lively jungle' },
      { month: 'July', temp: '27 / 22°C', rain: '~400 mm', verdict: 'Mixed sun and heavy showers; good surf' },
      { month: 'August', temp: '28 / 23°C', rain: '~320 mm', verdict: 'Rainy spells; dramatic green jungle' },
      { month: 'September', temp: '28 / 22°C', rain: '~165 mm', verdict: 'Veranillo, calm sea, clear water, few crowds' },
      { month: 'October', temp: '28 / 22°C', rain: '~200 mm', verdict: 'Best value, calm sea, low prices' },
      { month: 'November', temp: '27 / 22°C', rain: '~400 mm', verdict: 'Among the wettest; waterfalls and deep green' },
      { month: 'December', temp: '27 / 21°C', rain: '~350 mm', verdict: 'Festive; surf swells; busy and rainy' },
    ],
    windowsHeading: 'The two drier windows (and two wet peaks)',
    windowsParagraphs: [
      'Unlike the Pacific coast, the Caribbean side gets two calmer spells. The first is February to March, the classic dry window with generally the lowest rainfall of the year.',
      'The second is the veranillo, the "little summer" of September and October. While much of Costa Rica is in its wettest stretch, the Talamanca mountains wring the rain out of the trade winds and the southern Caribbean stays comparatively clear, calm seas, clear water, and the year’s best value.',
      'There are two rainy peaks: roughly June-July, and again from November into January. Sources disagree on which is wettest and it swings from year to year, so expect heavier showers and a rougher sea in both stretches. It stays green and beautiful, just wetter.',
    ],
    liveHeading: 'Checking the weather before you come',
    liveParagraphs: [
      <>Because conditions shift week to week, a live forecast beats any average. <a href="https://www.msn.com/en-us/weather/forecast/in-Puerto-Viejo,Lim%C3%B3n" target="_blank" rel="noopener noreferrer">MSN Weather</a> and Windy are both reliable for the Puerto Viejo area.</>,
      'For beach days, watch the sea as much as the rain: a calm ocean matters more for swimming and snorkelling than a few afternoon showers do.',
    ],
    rainyHeading: 'What to do when it rains',
    rainyIntro: 'A wet afternoon is no reason to lose a day. Some of the best things here are even better in the rain:',
    rainyListItems: [
      'Take a chocolate (cacao) farm tour, mostly under cover and wonderful when it pours',
      'Visit a Bribri Indigenous community and learn about cacao and traditional medicine',
      'Explore Cahuita National Park, the wildlife stays active and the crowds thin out',
      'Settle into a Caribbean café or chocolate shop in town',
      'Book a cooking class or a spa treatment and let the storm pass',
    ],
    packHeading: 'What to pack for Caribbean weather',
    packListItems: [
      'Light, quick-dry clothing, it is humid year-round',
      'A compact rain jacket or poncho, in any month',
      'Reef-safe sunscreen and insect repellent',
      'Water shoes or sandals for wet trails and rocky beaches',
      'A dry bag for phone and camera',
      'A light layer for cooler, breezier evenings in December and January',
    ],
    takeawaysHeading: 'Key takeaways',
    takeawaysParagraph:
      'Puerto Viejo is warm and green all year, with no true dry season but two reliably calmer windows: February-March and the September-October veranillo. November-December is the wettest. Whenever you visit, pack for the odd shower and keep an eye on the sea for beach days; the rain here rarely lasts all day.',
  },
  es: {
    seoTitle: 'El clima en Puerto Viejo de Limón: guía del tiempo mes a mes',
    seoDescription:
      '¿Cómo es realmente el clima en Puerto Viejo de Limón? Un desglose mes a mes de lluvia, sol, calor y estado del mar, además de qué hacer los días lluviosos.',
    heading: 'El clima en Puerto Viejo de Limón: guía mes a mes',
    heroAlt: 'Playa y selva caribeña en Puerto Viejo de Talamanca, Costa Rica',
    photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
    introParagraphs: [
      'Puerto Viejo de Talamanca está en el Caribe Sur de Costa Rica, con un clima de selva tropical que se mantiene cálido todo el año: máximas de 27-29°C durante el día y un mar de unos 28-29°C en cualquier mes.',
      'Lo que cambia es la lluvia y el estado del mar. Y, muy importante, el Caribe no sigue el mismo calendario que el Pacífico. Aquí no hay una verdadera estación seca, pero sí ventanas más secas y soleadas. Esta guía recorre todo el año para que sepas qué esperar cuando vengas.',
    ],
    stayRecommendationTitle: '¿Buscas dónde hospedarte en Puerto Viejo?',
    tableHeading: 'El clima de Puerto Viejo, mes a mes',
    tableIntro: 'Las cifras son promedios aproximados, aquí la lluvia suele ser un aguacero de la tarde o de la noche, no un día gris entero. Toca un mes para ver el detalle.',
    colMonth: 'Mes',
    colTemp: 'Temp (máx / mín)',
    colRain: 'Lluvia',
    colVerdict: 'En resumen',
    monthRows: [
      { month: 'Enero', temp: '27 / 22°C', rain: '~200 mm', verdict: 'Cálido y ventoso; algunos aguaceros, buen surf' },
      { month: 'Febrero', temp: '28 / 22°C', rain: '~110 mm', verdict: 'La ventana más seca, mejor playa y snorkel' },
      { month: 'Marzo', temp: '28 / 22°C', rain: '~170 mm', verdict: 'Cálido y bastante seco; ideal para caminatas' },
      { month: 'Abril', temp: '29 / 23°C', rain: '~210 mm', verdict: 'Reverdece; menos gente después de Semana Santa' },
      { month: 'Mayo', temp: '28 / 23°C', rain: '~300 mm', verdict: 'Aguaceros de tarde; verde y tranquilo' },
      { month: 'Junio', temp: '28 / 23°C', rain: '~340 mm', verdict: 'Lluvioso; temporada de tortugas; selva viva' },
      { month: 'Julio', temp: '27 / 22°C', rain: '~400 mm', verdict: 'Sol y aguaceros fuertes; buen surf' },
      { month: 'Agosto', temp: '28 / 23°C', rain: '~320 mm', verdict: 'Períodos de lluvia; selva de un verde intenso' },
      { month: 'Septiembre', temp: '28 / 22°C', rain: '~165 mm', verdict: 'Veranillo, mar en calma, agua clara, poca gente' },
      { month: 'Octubre', temp: '28 / 22°C', rain: '~200 mm', verdict: 'La mejor relación calidad-precio, mar en calma' },
      { month: 'Noviembre', temp: '27 / 22°C', rain: '~400 mm', verdict: 'De los más lluviosos; cascadas y verde intenso' },
      { month: 'Diciembre', temp: '27 / 21°C', rain: '~350 mm', verdict: 'Festivo; oleaje de surf; concurrido y lluvioso' },
    ],
    windowsHeading: 'Las dos ventanas secas (y los dos picos de lluvia)',
    windowsParagraphs: [
      'A diferencia del Pacífico, el Caribe tiene dos períodos más tranquilos. El primero es de febrero a marzo, la ventana seca clásica, con generalmente la menor lluvia del año.',
      'El segundo es el veranillo, el "pequeño verano" de septiembre y octubre. Mientras gran parte de Costa Rica vive su época más lluviosa, las montañas de Talamanca frenan la humedad de los vientos alisios y el Caribe Sur se mantiene más despejado, mar en calma, agua clara y los mejores precios del año.',
      'En realidad hay dos picos de lluvia: aproximadamente junio-julio y de nuevo de noviembre a enero. Las fuentes no coinciden en cuál es el más lluvioso y varía de un año a otro, así que espera aguaceros más fuertes y un mar más bravo en ambos períodos. Se mantiene verde y hermoso, solo que más húmedo.',
    ],
    liveHeading: 'Consultar el clima antes de venir',
    liveParagraphs: [
      <>Como el tiempo cambia de una semana a otra, un pronóstico en vivo vale más que cualquier promedio. <a href="https://www.msn.com/es-xl/el-tiempo/pronostico/in-Puerto-Viejo,Limon" target="_blank" rel="noopener noreferrer">MSN Tiempo</a> y Windy son fiables para la zona de Puerto Viejo.</>,
      'Para los días de playa, fíjate en el mar tanto como en la lluvia: un océano en calma importa más para nadar y hacer snorkel que un par de aguaceros de la tarde.',
    ],
    rainyHeading: 'Qué hacer cuando llueve',
    rainyIntro: 'Una tarde de lluvia no es motivo para perder el día. Algunas de las mejores experiencias aquí son aún mejores bajo la lluvia:',
    rainyListItems: [
      'Haz un tour de cacao (chocolate), casi todo bajo techo y encantador cuando llueve',
      'Visita una comunidad indígena Bribri y aprende sobre el cacao y la medicina tradicional',
      'Recorre el Parque Nacional Cahuita, la fauna sigue activa y hay menos gente',
      'Relájate en un café caribeño o una chocolatería del pueblo',
      'Reserva una clase de cocina o un masaje y deja pasar la tormenta',
    ],
    packHeading: 'Qué llevar para el clima caribeño',
    packListItems: [
      'Ropa ligera y de secado rápido, hay humedad todo el año',
      'Una chaqueta impermeable o poncho compacto, en cualquier mes',
      'Protector solar respetuoso con el arrecife y repelente de insectos',
      'Zapatos de agua o sandalias para senderos mojados y playas con roca',
      'Una bolsa seca para el teléfono y la cámara',
      'Una capa ligera para las noches más frescas y ventosas de diciembre y enero',
    ],
    takeawaysHeading: 'Puntos clave',
    takeawaysParagraph:
      'Puerto Viejo es cálido y verde todo el año, sin una verdadera estación seca pero con dos ventanas más tranquilas: febrero-marzo y el veranillo de septiembre-octubre. Noviembre-diciembre es lo más lluvioso. Vengas cuando vengas, lleva algo para la lluvia y fíjate en el mar para los días de playa; aquí rara vez llueve todo el día.',
  },
  de: {
    seoTitle: 'Wetter in Puerto Viejo de Limón, Klima-Ratgeber Monat für Monat',
    seoDescription:
      'Wie ist das Wetter in Puerto Viejo de Limón wirklich? Eine Übersicht Monat für Monat über Regen, Sonne, Hitze und Meeresbedingungen, dazu die besten Aktivitäten für Regentage.',
    heading: 'Wetter in Puerto Viejo de Limón: Ein Ratgeber Monat für Monat',
    heroAlt: 'Karibischer Strand und Dschungel in Puerto Viejo de Talamanca, Costa Rica',
    photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
    introParagraphs: [
      'Puerto Viejo de Talamanca liegt an der südlichen Karibikküste Costa Ricas, in einem tropischen Regenwaldklima, das ganzjährig warm bleibt: Tageshöchstwerte von 27-29°C und ein Meer von rund 28-29°C in jedem Monat.',
      'Was sich ändert, sind der Regen und der Zustand des Meeres, und ganz entscheidend folgt die Karibikküste nicht demselben Kalender wie die Pazifikseite. Eine echte Trockenzeit gibt es hier nicht, aber es gibt trockenere, sonnigere Fenster. Dieser Ratgeber führt durch das ganze Jahr, damit du weißt, was dich erwartet, wann immer du kommst.',
    ],
    stayRecommendationTitle: 'Suchst du eine Unterkunft in Puerto Viejo?',
    tableHeading: 'Das Wetter in Puerto Viejo, Monat für Monat',
    tableIntro: 'Die Zahlen sind ungefähre Durchschnittswerte, Regen bedeutet hier meist einen Guss am Nachmittag oder in der Nacht, nicht einen grauen Tag von früh bis spät. Tippe auf einen Monat für alle Details.',
    colMonth: 'Monat',
    colTemp: 'Temp (max / min)',
    colRain: 'Regen',
    colVerdict: 'Kurz gesagt',
    monthRows: [
      { month: 'Januar', temp: '27 / 22°C', rain: '~200 mm', verdict: 'Warm und windig; einige Schauer, gute Wellen' },
      { month: 'Februar', temp: '28 / 22°C', rain: '~110 mm', verdict: 'Trockenstes Fenster, bester Strand und Schnorcheln' },
      { month: 'März', temp: '28 / 22°C', rain: '~170 mm', verdict: 'Warm und recht trocken; ideal zum Wandern' },
      { month: 'April', temp: '29 / 23°C', rain: '~210 mm', verdict: 'Es ergrünt; weniger Andrang nach Ostern' },
      { month: 'Mai', temp: '28 / 23°C', rain: '~300 mm', verdict: 'Nachmittagsschauer; üppig und ruhig' },
      { month: 'Juni', temp: '28 / 23°C', rain: '~340 mm', verdict: 'Nass; Schildkrötensaison; lebendiger Dschungel' },
      { month: 'Juli', temp: '27 / 22°C', rain: '~400 mm', verdict: 'Sonne und heftige Schauer im Wechsel; gute Wellen' },
      { month: 'August', temp: '28 / 23°C', rain: '~320 mm', verdict: 'Regenphasen; sattgrüner Dschungel' },
      { month: 'September', temp: '28 / 22°C', rain: '~165 mm', verdict: 'Veranillo, ruhige See, klares Wasser, wenig Andrang' },
      { month: 'Oktober', temp: '28 / 22°C', rain: '~200 mm', verdict: 'Bestes Preis-Leistungs-Verhältnis, ruhige See, niedrige Preise' },
      { month: 'November', temp: '27 / 22°C', rain: '~400 mm', verdict: 'Zu den nassesten; Wasserfälle und tiefes Grün' },
      { month: 'Dezember', temp: '27 / 21°C', rain: '~350 mm', verdict: 'Festlich; Surf-Wellen; voll und regnerisch' },
    ],
    windowsHeading: 'Die zwei trockeneren Fenster (und die zwei Regengipfel)',
    windowsParagraphs: [
      'Anders als die Pazifikküste hat die Karibikseite zwei ruhigere Phasen. Die erste reicht von Februar bis März, das klassische Trockenfenster mit dem geringsten Niederschlag des Jahres.',
      'Die zweite ist der Veranillo, der „kleine Sommer" im September und Oktober. Während weite Teile Costa Ricas ihre nasseste Zeit erleben, ringen die Talamanca-Berge den Passatwinden den Regen ab, und die südliche Karibik bleibt vergleichsweise klar, ruhige See, klares Wasser und das beste Preis-Leistungs-Verhältnis des Jahres.',
      'Eigentlich gibt es zwei Regengipfel: etwa Juni-Juli und dann wieder von November bis in den Januar. Die Quellen sind sich wirklich uneinig, welcher der nasseste ist, und es schwankt von Jahr zu Jahr, also rechne in beiden Phasen mit heftigeren Schauern und einem raueren Meer. Es bleibt grün und wunderschön, nur nasser.',
    ],
    liveHeading: 'Das Wetter vor deiner Anreise prüfen',
    liveParagraphs: [
      <>Da sich die Bedingungen von Woche zu Woche ändern, schlägt eine Live-Vorhersage jeden Durchschnittswert. <a href="https://www.msn.com/en-us/weather/forecast/in-Puerto-Viejo,Lim%C3%B3n" target="_blank" rel="noopener noreferrer">MSN Wetter</a> und Windy sind beide zuverlässig für die Region Puerto Viejo.</>,
      'Für Strandtage achte ebenso auf das Meer wie auf den Regen: Ein ruhiger Ozean zählt fürs Schwimmen und Schnorcheln mehr als ein paar Nachmittagsschauer.',
    ],
    rainyHeading: 'Was tun, wenn es regnet',
    rainyIntro: 'Ein nasser Nachmittag ist kein Grund, einen Tag zu verlieren. Manches vom Besten hier ist im Regen sogar noch schöner:',
    rainyListItems: [
      'Mach eine Kakao- (Schokoladen-) Farmtour, meist überdacht und herrlich, wenn es schüttet',
      'Besuche eine indigene Bribri-Gemeinschaft und lerne etwas über Kakao und traditionelle Medizin',
      'Erkunde den Cahuita-Nationalpark, die Tierwelt bleibt aktiv und die Menschenmengen lichten sich',
      'Mach es dir in einem karibischen Café oder einer Schokoladenmanufaktur im Ort gemütlich',
      'Buche einen Kochkurs oder eine Spa-Behandlung und lass das Unwetter vorüberziehen',
    ],
    packHeading: 'Was du für das karibische Wetter einpacken solltest',
    packListItems: [
      'Leichte, schnell trocknende Kleidung, es ist ganzjährig feucht',
      'Eine kompakte Regenjacke oder ein Poncho, in jedem Monat',
      'Riffschonende Sonnencreme und Insektenschutz',
      'Wasserschuhe oder Sandalen für nasse Wege und felsige Strände',
      'Einen wasserdichten Beutel für Handy und Kamera',
      'Eine leichte Schicht für kühlere, windigere Abende im Dezember und Januar',
    ],
    takeawaysHeading: 'Das Wichtigste in Kürze',
    takeawaysParagraph:
      'Puerto Viejo ist ganzjährig warm und grün, ohne echte Trockenzeit, aber mit zwei zuverlässig ruhigeren Fenstern: Februar-März und dem Veranillo im September-Oktober. November-Dezember ist am nassesten. Wann immer du kommst, pack für den einen oder anderen Schauer und achte an Strandtagen auf das Meer; der Regen hält hier selten den ganzen Tag an.',
  },
  fr: {
    seoTitle: 'Météo à Puerto Viejo de Limón, Guide du climat mois par mois',
    seoDescription:
      'Quel temps fait-il vraiment à Puerto Viejo de Limón ? Un récapitulatif mois par mois de la pluie, du soleil, de la chaleur et de l\'état de la mer, avec les meilleures activités pour les jours de pluie.',
    heading: 'Météo à Puerto Viejo de Limón : un guide mois par mois',
    heroAlt: 'Plage des Caraïbes et jungle à Puerto Viejo de Talamanca, Costa Rica',
    photoCredit: <>Photo : <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
    introParagraphs: [
      'Puerto Viejo de Talamanca se trouve sur la côte caraïbe sud du Costa Rica, dans un climat de forêt tropicale humide qui reste chaud toute l\'année : des maximales de 27-29°C en journée et une mer autour de 28-29°C chaque mois.',
      'Ce qui change, c\'est la pluie et l\'état de l\'océan. Et, point essentiel, la côte caraïbe ne suit pas le même calendrier que le versant pacifique. Il n\'y a pas ici de véritable saison sèche, mais il existe des fenêtres plus sèches et plus ensoleillées. Ce guide parcourt toute l\'année pour que vous sachiez à quoi vous attendre, quelle que soit la période où vous venez.',
    ],
    stayRecommendationTitle: 'Vous cherchez où loger à Puerto Viejo ?',
    tableHeading: 'La météo de Puerto Viejo, mois par mois',
    tableIntro: 'Les chiffres sont des moyennes approximatives, ici, la pluie prend généralement la forme d\'une averse l\'après-midi ou la nuit, pas d\'une grisaille qui dure toute la journée. Touchez un mois pour tout le détail.',
    colMonth: 'Mois',
    colTemp: 'Temp (max / min)',
    colRain: 'Pluie',
    colVerdict: 'En bref',
    monthRows: [
      { month: 'Janvier', temp: '27 / 22°C', rain: '~200 mm', verdict: 'Chaud et venteux ; quelques averses, bonnes vagues' },
      { month: 'Février', temp: '28 / 22°C', rain: '~110 mm', verdict: 'La fenêtre la plus sèche, meilleure plage et snorkeling' },
      { month: 'Mars', temp: '28 / 22°C', rain: '~170 mm', verdict: 'Chaud et assez sec ; idéal pour les randonnées' },
      { month: 'Avril', temp: '29 / 23°C', rain: '~210 mm', verdict: 'La nature reverdit ; moins de monde après Pâques' },
      { month: 'Mai', temp: '28 / 23°C', rain: '~300 mm', verdict: 'Averses l\'après-midi ; luxuriant et tranquille' },
      { month: 'Juin', temp: '28 / 23°C', rain: '~340 mm', verdict: 'Pluvieux ; saison des tortues ; jungle animée' },
      { month: 'Juillet', temp: '27 / 22°C', rain: '~400 mm', verdict: 'Soleil et fortes averses en alternance ; bonnes vagues' },
      { month: 'Août', temp: '28 / 23°C', rain: '~320 mm', verdict: 'Épisodes pluvieux ; jungle d\'un vert spectaculaire' },
      { month: 'Septembre', temp: '28 / 22°C', rain: '~165 mm', verdict: 'Veranillo, mer calme, eau claire, peu de monde' },
      { month: 'Octobre', temp: '28 / 22°C', rain: '~200 mm', verdict: 'Meilleur rapport qualité-prix, mer calme, prix bas' },
      { month: 'Novembre', temp: '27 / 22°C', rain: '~400 mm', verdict: 'Parmi les plus pluvieux ; cascades et vert profond' },
      { month: 'Décembre', temp: '27 / 21°C', rain: '~350 mm', verdict: 'Festif ; houle de surf ; animé et pluvieux' },
    ],
    windowsHeading: 'Les deux fenêtres plus sèches (et les deux pics de pluie)',
    windowsParagraphs: [
      'Contrairement à la côte pacifique, le versant caraïbe connaît deux périodes plus calmes. La première va de février à mars, la fenêtre sèche classique, avec les précipitations les plus faibles de l\'année.',
      'La seconde est le veranillo, le « petit été » de septembre et octobre. Alors qu\'une grande partie du Costa Rica traverse sa période la plus humide, les montagnes de Talamanca essorent la pluie des alizés et le sud des Caraïbes reste relativement dégagé, mer calme, eau claire et le meilleur rapport qualité-prix de l\'année.',
      'Il y a en réalité deux pics de pluie : environ juin-juillet, puis de nouveau de novembre jusqu\'en janvier. Les sources divergent réellement sur celui qui est le plus humide et cela varie d\'une année à l\'autre, alors attendez-vous à des averses plus fortes et à une mer plus agitée pendant les deux périodes. Tout reste vert et magnifique, simplement plus mouillé.',
    ],
    liveHeading: 'Vérifier la météo avant de venir',
    liveParagraphs: [
      <>Comme les conditions changent d\'une semaine à l\'autre, une prévision en direct vaut mieux que n\'importe quelle moyenne. <a href="https://www.msn.com/en-us/weather/forecast/in-Puerto-Viejo,Lim%C3%B3n" target="_blank" rel="noopener noreferrer">MSN Météo</a> et Windy sont tous deux fiables pour la région de Puerto Viejo.</>,
      'Pour les journées à la plage, surveillez la mer autant que la pluie : un océan calme compte davantage pour la baignade et le snorkeling que quelques averses en fin de journée.',
    ],
    rainyHeading: 'Que faire quand il pleut',
    rainyIntro: 'Un après-midi pluvieux n\'est pas une raison de perdre une journée. Certaines des meilleures activités ici sont encore plus belles sous la pluie :',
    rainyListItems: [
      'Faites une visite de plantation de cacao (chocolat), surtout à l\'abri et merveilleuse quand il pleut à verse',
      'Visitez une communauté autochtone Bribri et découvrez le cacao et la médecine traditionnelle',
      'Explorez le parc national de Cahuita, la faune reste active et il y a moins de monde',
      'Installez-vous dans un café caribéen ou une chocolaterie du village',
      'Réservez un cours de cuisine ou un soin au spa et laissez passer l\'orage',
    ],
    packHeading: 'Que mettre dans sa valise pour le climat caribéen',
    packListItems: [
      'Des vêtements légers à séchage rapide, il fait humide toute l\'année',
      'Une veste de pluie compacte ou un poncho, quel que soit le mois',
      'Une crème solaire respectueuse des récifs et un répulsif anti-insectes',
      'Des chaussures d\'eau ou des sandales pour les sentiers mouillés et les plages rocheuses',
      'Un sac étanche pour le téléphone et l\'appareil photo',
      'Une couche légère pour les soirées plus fraîches et venteuses de décembre et janvier',
    ],
    takeawaysHeading: 'À retenir',
    takeawaysParagraph:
      'Puerto Viejo est chaud et vert toute l\'année, sans véritable saison sèche mais avec deux fenêtres nettement plus calmes : février-mars et le veranillo de septembre-octobre. Novembre-décembre est la période la plus humide. Quelle que soit votre période de visite, prévoyez de quoi affronter une averse ou deux et surveillez la mer pour les journées de plage ; ici, la pluie dure rarement toute la journée.',
  },
  it: {
    seoTitle: 'Meteo a Puerto Viejo de Limón, Guida al clima mese per mese',
    seoDescription:
      'Com\'è davvero il meteo a Puerto Viejo de Limón? Un\'analisi mese per mese di pioggia, sole, caldo e condizioni del mare, con le cose migliori da fare nei giorni di pioggia.',
    heading: 'Meteo a Puerto Viejo de Limón: una guida mese per mese',
    heroAlt: 'Spiaggia caraibica e giungla a Puerto Viejo de Talamanca, Costa Rica',
    photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
    introParagraphs: [
      'Puerto Viejo de Talamanca si trova sulla costa caraibica meridionale del Costa Rica, in un clima di foresta pluviale tropicale che resta caldo tutto l\'anno: massime diurne di 27-29°C e un mare intorno ai 28-29°C in ogni mese.',
      'Ciò che cambia è la pioggia e lo stato dell\'oceano. E, cosa fondamentale, la costa caraibica non segue lo stesso calendario del versante pacifico. Qui non c\'è una vera stagione secca, ma esistono finestre più asciutte e soleggiate. Questa guida percorre l\'intero anno perché tu sappia cosa aspettarti in qualunque periodo tu venga.',
    ],
    stayRecommendationTitle: 'Cerchi dove alloggiare a Puerto Viejo?',
    tableHeading: 'Il meteo di Puerto Viejo, mese per mese',
    tableIntro: 'I dati sono medie approssimative, qui la pioggia di solito è un acquazzone pomeridiano o notturno, non un\'intera giornata grigia. Tocca un mese per tutti i dettagli.',
    colMonth: 'Mese',
    colTemp: 'Temp (max / min)',
    colRain: 'Pioggia',
    colVerdict: 'In breve',
    monthRows: [
      { month: 'Gennaio', temp: '27 / 22°C', rain: '~200 mm', verdict: 'Caldo e ventilato; qualche rovescio, buone onde' },
      { month: 'Febbraio', temp: '28 / 22°C', rain: '~110 mm', verdict: 'La finestra più asciutta, spiaggia e snorkeling al meglio' },
      { month: 'Marzo', temp: '28 / 22°C', rain: '~170 mm', verdict: 'Caldo e piuttosto secco; ottimo per le escursioni' },
      { month: 'Aprile', temp: '29 / 23°C', rain: '~210 mm', verdict: 'Rinverdisce; meno gente dopo Pasqua' },
      { month: 'Maggio', temp: '28 / 23°C', rain: '~300 mm', verdict: 'Rovesci pomeridiani; rigoglioso e tranquillo' },
      { month: 'Giugno', temp: '28 / 23°C', rain: '~340 mm', verdict: 'Piovoso; stagione delle tartarughe; giungla vivace' },
      { month: 'Luglio', temp: '27 / 22°C', rain: '~400 mm', verdict: 'Sole e forti rovesci alternati; buone onde' },
      { month: 'Agosto', temp: '28 / 23°C', rain: '~320 mm', verdict: 'Fasi piovose; giungla di un verde spettacolare' },
      { month: 'Settembre', temp: '28 / 22°C', rain: '~165 mm', verdict: 'Veranillo, mare calmo, acqua limpida, poca gente' },
      { month: 'Ottobre', temp: '28 / 22°C', rain: '~200 mm', verdict: 'Miglior rapporto qualità-prezzo, mare calmo, prezzi bassi' },
      { month: 'Novembre', temp: '27 / 22°C', rain: '~400 mm', verdict: 'Tra i più piovosi; cascate e verde intenso' },
      { month: 'Dicembre', temp: '27 / 21°C', rain: '~350 mm', verdict: 'Festivo; mareggiate da surf; affollato e piovoso' },
    ],
    windowsHeading: 'Le due finestre più asciutte (e i due picchi di pioggia)',
    windowsParagraphs: [
      'A differenza della costa pacifica, il versante caraibico ha due periodi più tranquilli. Il primo va da febbraio a marzo, la classica finestra secca, con le precipitazioni più basse dell\'anno.',
      'Il secondo è il veranillo, la "piccola estate" di settembre e ottobre. Mentre gran parte del Costa Rica vive il suo periodo più piovoso, le montagne di Talamanca spremono la pioggia dagli alisei e i Caraibi meridionali restano relativamente limpidi, mare calmo, acqua trasparente e il miglior rapporto qualità-prezzo dell\'anno.',
      'In realtà ci sono due picchi di pioggia: all\'incirca giugno-luglio e poi di nuovo da novembre fino a gennaio. Le fonti sono davvero in disaccordo su quale sia il più piovoso e varia di anno in anno, quindi aspettati rovesci più intensi e un mare più mosso in entrambi i periodi. Resta verde e stupendo, solo più bagnato.',
    ],
    liveHeading: 'Controllare il meteo prima di partire',
    liveParagraphs: [
      <>Poiché le condizioni cambiano di settimana in settimana, una previsione in tempo reale batte qualsiasi media. <a href="https://www.msn.com/en-us/weather/forecast/in-Puerto-Viejo,Lim%C3%B3n" target="_blank" rel="noopener noreferrer">MSN Meteo</a> e Windy sono entrambi affidabili per la zona di Puerto Viejo.</>,
      'Per le giornate in spiaggia, tieni d\'occhio il mare tanto quanto la pioggia: un oceano calmo conta di più per nuotare e fare snorkeling di quanto contino un paio di rovesci pomeridiani.',
    ],
    rainyHeading: 'Cosa fare quando piove',
    rainyIntro: 'Un pomeriggio di pioggia non è un motivo per perdere una giornata. Alcune delle esperienze migliori qui sono ancora più belle sotto la pioggia:',
    rainyListItems: [
      'Fai un tour in una piantagione di cacao (cioccolato), quasi tutto al coperto e meraviglioso quando diluvia',
      'Visita una comunità indigena Bribri e scopri il cacao e la medicina tradizionale',
      'Esplora il Parco Nazionale di Cahuita, la fauna resta attiva e c\'è meno gente',
      'Rilassati in un caffè caraibico o in una cioccolateria del paese',
      'Prenota un corso di cucina o un trattamento alla spa e lascia passare il temporale',
    ],
    packHeading: 'Cosa mettere in valigia per il clima caraibico',
    packListItems: [
      'Abbigliamento leggero ad asciugatura rapida, c\'è umidità tutto l\'anno',
      'Una giacca antipioggia compatta o un poncho, in qualsiasi mese',
      'Crema solare rispettosa della barriera corallina e repellente per insetti',
      'Scarpe da scoglio o sandali per sentieri bagnati e spiagge rocciose',
      'Una sacca stagna per telefono e macchina fotografica',
      'Uno strato leggero per le serate più fresche e ventilate di dicembre e gennaio',
    ],
    takeawaysHeading: 'Punti chiave',
    takeawaysParagraph:
      'Puerto Viejo è caldo e verde tutto l\'anno, senza una vera stagione secca ma con due finestre decisamente più tranquille: febbraio-marzo e il veranillo di settembre-ottobre. Novembre-dicembre è il periodo più piovoso. In qualunque momento tu venga, metti in valigia qualcosa per un rovescio o due e guarda il mare per le giornate in spiaggia; qui la pioggia raramente dura tutto il giorno.',
  },
  pt: {
    seoTitle: 'Clima em Puerto Viejo de Limón, Guia do tempo mês a mês',
    seoDescription:
      'Como é realmente o clima em Puerto Viejo de Limón? Uma análise mês a mês de chuva, sol, calor e condições do mar, além das melhores coisas para fazer em dias de chuva.',
    heading: 'Clima em Puerto Viejo de Limón: um guia mês a mês',
    heroAlt: 'Praia caribenha e selva em Puerto Viejo de Talamanca, Costa Rica',
    photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
    introParagraphs: [
      'Puerto Viejo de Talamanca fica na costa caribenha sul da Costa Rica, num clima de floresta tropical úmida que se mantém quente o ano todo: máximas diurnas de 27-29°C e um mar em torno de 28-29°C em qualquer mês.',
      'O que muda é a chuva e o estado do oceano. E, ponto crucial, a costa caribenha não segue o mesmo calendário do lado do Pacífico. Aqui não há uma verdadeira estação seca, mas existem janelas mais secas e ensolaradas. Este guia percorre o ano inteiro para que você saiba o que esperar sempre que vier.',
    ],
    stayRecommendationTitle: 'Procurando onde se hospedar em Puerto Viejo?',
    tableHeading: 'O clima de Puerto Viejo, mês a mês',
    tableIntro: 'Os números são médias aproximadas, aqui a chuva costuma ser um aguaceiro da tarde ou da noite, não um dia cinzento inteiro. Toque num mês para ver todos os detalhes.',
    colMonth: 'Mês',
    colTemp: 'Temp (máx / mín)',
    colRain: 'Chuva',
    colVerdict: 'Em resumo',
    monthRows: [
      { month: 'Janeiro', temp: '27 / 22°C', rain: '~200 mm', verdict: 'Quente e ventoso; algumas pancadas, bom surf' },
      { month: 'Fevereiro', temp: '28 / 22°C', rain: '~110 mm', verdict: 'A janela mais seca, melhor praia e mergulho' },
      { month: 'Março', temp: '28 / 22°C', rain: '~170 mm', verdict: 'Quente e bastante seco; ótimo para caminhadas' },
      { month: 'Abril', temp: '29 / 23°C', rain: '~210 mm', verdict: 'A vegetação reverdece; menos gente após a Páscoa' },
      { month: 'Maio', temp: '28 / 23°C', rain: '~300 mm', verdict: 'Pancadas à tarde; exuberante e tranquilo' },
      { month: 'Junho', temp: '28 / 23°C', rain: '~340 mm', verdict: 'Chuvoso; temporada das tartarugas; selva viva' },
      { month: 'Julho', temp: '27 / 22°C', rain: '~400 mm', verdict: 'Sol e fortes pancadas alternados; bom surf' },
      { month: 'Agosto', temp: '28 / 23°C', rain: '~320 mm', verdict: 'Períodos de chuva; selva de um verde espetacular' },
      { month: 'Setembro', temp: '28 / 22°C', rain: '~165 mm', verdict: 'Veranillo, mar calmo, água clara, pouca gente' },
      { month: 'Outubro', temp: '28 / 22°C', rain: '~200 mm', verdict: 'Melhor custo-benefício, mar calmo, preços baixos' },
      { month: 'Novembro', temp: '27 / 22°C', rain: '~400 mm', verdict: 'Entre os mais chuvosos; cachoeiras e verde profundo' },
      { month: 'Dezembro', temp: '27 / 21°C', rain: '~350 mm', verdict: 'Festivo; ondas de surf; movimentado e chuvoso' },
    ],
    windowsHeading: 'As duas janelas mais secas (e os dois picos de chuva)',
    windowsParagraphs: [
      'Ao contrário da costa do Pacífico, o lado caribenho tem dois períodos mais calmos. O primeiro vai de fevereiro a março, a clássica janela seca, com a menor precipitação do ano.',
      'O segundo é o veranillo, o "pequeno verão" de setembro e outubro. Enquanto boa parte da Costa Rica vive sua época mais chuvosa, as montanhas de Talamanca espremem a chuva dos ventos alísios e o sul do Caribe permanece relativamente limpo, mar calmo, água clara e o melhor custo-benefício do ano.',
      'Na verdade há dois picos de chuva: aproximadamente junho-julho e novamente de novembro até janeiro. As fontes realmente divergem sobre qual é o mais chuvoso e isso varia de ano para ano, então espere pancadas mais fortes e um mar mais agitado em ambos os períodos. Continua verde e lindo, apenas mais molhado.',
    ],
    liveHeading: 'Consultar o clima antes de vir',
    liveParagraphs: [
      <>Como as condições mudam de semana para semana, uma previsão ao vivo vale mais do que qualquer média. O <a href="https://www.msn.com/en-us/weather/forecast/in-Puerto-Viejo,Lim%C3%B3n" target="_blank" rel="noopener noreferrer">MSN Clima</a> e o Windy são ambos confiáveis para a região de Puerto Viejo.</>,
      'Para dias de praia, observe o mar tanto quanto a chuva: um oceano calmo importa mais para nadar e mergulhar do que algumas pancadas à tarde.',
    ],
    rainyHeading: 'O que fazer quando chove',
    rainyIntro: 'Uma tarde chuvosa não é motivo para perder o dia. Algumas das melhores experiências aqui ficam ainda melhores na chuva:',
    rainyListItems: [
      'Faça um tour por uma fazenda de cacau (chocolate), quase todo coberto e maravilhoso quando cai um toró',
      'Visite uma comunidade indígena Bribri e aprenda sobre o cacau e a medicina tradicional',
      'Explore o Parque Nacional Cahuita, a fauna continua ativa e há menos gente',
      'Instale-se num café caribenho ou numa chocolateria da vila',
      'Reserve uma aula de culinária ou um tratamento de spa e deixe a tempestade passar',
    ],
    packHeading: 'O que levar para o clima caribenho',
    packListItems: [
      'Roupas leves e de secagem rápida, há umidade o ano todo',
      'Uma capa de chuva compacta ou poncho, em qualquer mês',
      'Protetor solar que respeite os recifes e repelente de insetos',
      'Sapatilhas de água ou sandálias para trilhas molhadas e praias com pedras',
      'Uma bolsa estanque para o celular e a câmera',
      'Uma camada leve para as noites mais frescas e ventosas de dezembro e janeiro',
    ],
    takeawaysHeading: 'Pontos principais',
    takeawaysParagraph:
      'Puerto Viejo é quente e verde o ano todo, sem uma verdadeira estação seca, mas com duas janelas comprovadamente mais calmas: fevereiro-março e o veranillo de setembro-outubro. Novembro-dezembro é o mais chuvoso. Venha quando vier, leve algo para uma pancada ou duas e observe o mar nos dias de praia; aqui a chuva raramente dura o dia inteiro.',
  },
  he: {
    seoTitle: 'מזג האוויר בפוארטו ויאחו דה לימון, מדריך אקלים חודש אחר חודש',
    seoDescription:
      'איך באמת מזג האוויר בפוארטו ויאחו דה לימון? פירוט חודש אחר חודש של גשם, שמש, חום ומצב הים, יחד עם הדברים הטובים ביותר לעשות בימים גשומים.',
    heading: 'מזג האוויר בפוארטו ויאחו דה לימון: מדריך חודש אחר חודש',
    heroAlt: 'חוף קריבי וג\'ונגל בפוארטו ויאחו דה טלמנקה, קוסטה ריקה',
    photoCredit: <>תמונה: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
    introParagraphs: [
      'פוארטו ויאחו דה טלמנקה שוכנת בחוף הקריבי הדרומי של קוסטה ריקה, באקלים של יער גשם טרופי שנשאר חמים כל השנה: מקסימום יומי של 27-29°C וים סביב 28-29°C בכל חודש.',
      'מה שמשתנה הוא הגשם ומצב האוקיינוס, וחשוב מכול, החוף הקריבי אינו הולך לפי אותו לוח שנה כמו צד האוקיינוס השקט. אין כאן עונה יבשה אמיתית, אך יש חלונות יבשים ושטופי שמש יותר. המדריך הזה עובר על כל השנה כדי שתדעו למה לצפות מתי שלא תגיעו.',
    ],
    stayRecommendationTitle: 'מחפשים היכן להתארח בפוארטו ויאחו?',
    tableHeading: 'מזג האוויר בפוארטו ויאחו, חודש אחר חודש',
    tableIntro: 'המספרים הם ממוצעים משוערים, גשם כאן פירושו בדרך כלל ממטר של אחר צהריים או לילה, לא יום אפור שלם. הקישו על חודש לפירוט המלא.',
    colMonth: 'חודש',
    colTemp: 'טמפ׳ (מקס\' / מינ\')',
    colRain: 'גשם',
    colVerdict: 'בקצרה',
    monthRows: [
      { month: 'ינואר', temp: '27 / 22°C', rain: '~200 mm', verdict: 'חמים ורוחני; מעט ממטרים, גלישה טובה' },
      { month: 'פברואר', temp: '28 / 22°C', rain: '~110 mm', verdict: 'החלון היבש ביותר, החוף והשנרקול הטובים ביותר' },
      { month: 'מרץ', temp: '28 / 22°C', rain: '~170 mm', verdict: 'חמים ויבש למדי; מצוין לטיולים רגליים' },
      { month: 'אפריל', temp: '29 / 23°C', rain: '~210 mm', verdict: 'הכול מוריק; פחות תיירים אחרי הפסחא' },
      { month: 'מאי', temp: '28 / 23°C', rain: '~300 mm', verdict: 'ממטרי אחר צהריים; שופע וירוק ושקט' },
      { month: 'יוני', temp: '28 / 23°C', rain: '~340 mm', verdict: 'גשום; עונת הצבים; ג\'ונגל תוסס' },
      { month: 'יולי', temp: '27 / 22°C', rain: '~400 mm', verdict: 'שמש וממטרים כבדים לסירוגין; גלישה טובה' },
      { month: 'אוגוסט', temp: '28 / 23°C', rain: '~320 mm', verdict: 'תקופות גשם; ג\'ונגל בירוק דרמטי' },
      { month: 'ספטמבר', temp: '28 / 22°C', rain: '~165 mm', verdict: 'ורניז\'ו, ים רגוע, מים צלולים, מעט תיירים' },
      { month: 'אוקטובר', temp: '28 / 22°C', rain: '~200 mm', verdict: 'התמורה הטובה ביותר, ים רגוע, מחירים נמוכים' },
      { month: 'נובמבר', temp: '27 / 22°C', rain: '~400 mm', verdict: 'מהגשומים ביותר; מפלים וירוק עמוק' },
      { month: 'דצמבר', temp: '27 / 21°C', rain: '~350 mm', verdict: 'חגיגי; גלי גלישה; עמוס וגשום' },
    ],
    windowsHeading: 'שני החלונות היבשים יותר (ושני שיאי הגשמים)',
    windowsParagraphs: [
      'בניגוד לחוף האוקיינוס השקט, בצד הקריבי יש שתי תקופות רגועות יותר. הראשונה היא מפברואר עד מרץ, החלון היבש הקלאסי, עם כמות המשקעים הנמוכה ביותר בשנה.',
      'השנייה היא הוורניז\'ו, "הקיץ הקטן" של ספטמבר ואוקטובר. בעוד חלק גדול מקוסטה ריקה נמצא בתקופה הגשומה ביותר שלו, הרי טלמנקה סוחטים את הגשם מרוחות הסחר, והקריביים הדרומיים נשארים בהירים יחסית, ים רגוע, מים צלולים והתמורה הטובה ביותר של השנה.',
      'למעשה יש שני שיאי גשמים: בערך יוני-יולי, ושוב מנובמבר אל תוך ינואר. המקורות באמת חלוקים בשאלה איזה מהם הגשום ביותר, וזה משתנה משנה לשנה, אז צפו לממטרים חזקים יותר ולים סוער יותר בשתי התקופות. עדיין ירוק ומרהיב, פשוט רטוב יותר.',
    ],
    liveHeading: 'בדיקת מזג האוויר לפני שמגיעים',
    liveParagraphs: [
      <>מכיוון שהתנאים משתנים משבוע לשבוע, תחזית בזמן אמת עדיפה על כל ממוצע. <a href="https://www.msn.com/en-us/weather/forecast/in-Puerto-Viejo,Lim%C3%B3n" target="_blank" rel="noopener noreferrer">MSN מזג אוויר</a> ו-Windy אמינים שניהם עבור אזור פוארטו ויאחו.</>,
      'לימי חוף, שימו לב לים לא פחות מאשר לגשם: אוקיינוס רגוע חשוב יותר לשחייה ולשנרקול מאשר כמה ממטרי אחר צהריים.',
    ],
    rainyHeading: 'מה לעשות כשיורד גשם',
    rainyIntro: 'אחר צהריים גשום אינו סיבה לאבד יום. חלק מהחוויות הטובות ביותר כאן אף טובות יותר בגשם:',
    rainyListItems: [
      'צאו לסיור בחוות קקאו (שוקולד), רובו תחת קורת גג ונפלא כשיורד גשם זלעפות',
      'בקרו בקהילת הילידים בריברי ולמדו על הקקאו והרפואה המסורתית',
      'טיילו בפארק הלאומי קאוויטה, חיות הבר נשארות פעילות והקהל מתדלדל',
      'התיישבו בבית קפה קריבי או בחנות שוקולד בעיירה',
      'הזמינו סדנת בישול או טיפול ספא ותנו לסערה לחלוף',
    ],
    packHeading: 'מה לארוז למזג האוויר הקריבי',
    packListItems: [
      'בגדים קלים ומתייבשים במהירות, לחות שוררת כל השנה',
      'מעיל גשם קומפקטי או פונצ\'ו, בכל חודש',
      'קרם הגנה ידידותי לשוניות ודוחה חרקים',
      'נעלי מים או סנדלים לשבילים רטובים ולחופים סלעיים',
      'תיק אטום למים לטלפון ולמצלמה',
      'שכבה קלה לערבים הקרירים והרוחניים יותר בדצמבר ובינואר',
    ],
    takeawaysHeading: 'עיקרי הדברים',
    takeawaysParagraph:
      'פוארטו ויאחו חמימה וירוקה כל השנה, ללא עונה יבשה אמיתית אך עם שני חלונות רגועים יותר באופן עקבי: פברואר-מרץ והוורניז\'ו של ספטמבר-אוקטובר. נובמבר-דצמבר הם הגשומים ביותר. מתי שלא תבקרו, ארזו לקראת ממטר או שניים ושימו עין על הים לימי החוף; הגשם כאן כמעט אף פעם לא נמשך יום שלם.',
  },
  hi: {
    seoTitle: 'प्वेर्तो विएखो दे लिमोन में मौसम, महीने-दर-महीने जलवायु गाइड',
    seoDescription:
      'प्वेर्तो विएखो दे लिमोन में मौसम वास्तव में कैसा रहता है? बारिश, धूप, गर्मी और समुद्र की स्थिति का महीने-दर-महीने ब्यौरा, साथ ही बरसात के दिनों में करने के लिए सबसे बढ़िया चीज़ें।',
    heading: 'प्वेर्तो विएखो दे लिमोन में मौसम: एक महीने-दर-महीने गाइड',
    heroAlt: 'प्वेर्तो विएखो दे तालामांका, कोस्टा रिका में कैरिबियन समुद्र तट और जंगल',
    photoCredit: <>फ़ोटो: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
    introParagraphs: [
      'प्वेर्तो विएखो दे तालामांका कोस्टा रिका के दक्षिणी कैरिबियन तट पर बसा है, एक उष्णकटिबंधीय वर्षावन जलवायु में जो साल भर गर्म रहती है: दिन का अधिकतम तापमान 27-29°C और हर महीने समुद्र का तापमान लगभग 28-29°C।',
      'जो बदलता है वह है बारिश और समुद्र की स्थिति। और सबसे अहम बात, कैरिबियन तट प्रशांत तट जैसा कैलेंडर नहीं मानता। यहाँ कोई सच्चा शुष्क मौसम नहीं है, पर अपेक्षाकृत सूखे और धूप वाले दौर ज़रूर हैं। यह गाइड पूरे साल पर नज़र डालती है ताकि आप जब भी आएँ, जान सकें कि क्या उम्मीद करनी है।',
    ],
    stayRecommendationTitle: 'प्वेर्तो विएखो में ठहरने की जगह ढूँढ रहे हैं?',
    tableHeading: 'प्वेर्तो विएखो का मौसम, महीने-दर-महीने',
    tableIntro: 'आँकड़े अनुमानित औसत हैं, यहाँ बारिश का मतलब आमतौर पर दोपहर या रात की मूसलाधार बौछार है, न कि पूरे दिन का धूसर आसमान। पूरे ब्यौरे के लिए किसी महीने पर टैप करें।',
    colMonth: 'महीना',
    colTemp: 'तापमान (अधिकतम / न्यूनतम)',
    colRain: 'बारिश',
    colVerdict: 'संक्षेप में',
    monthRows: [
      { month: 'जनवरी', temp: '27 / 22°C', rain: '~200 mm', verdict: 'गर्म और हवादार; कुछ बौछारें, अच्छी सर्फिंग' },
      { month: 'फ़रवरी', temp: '28 / 22°C', rain: '~110 mm', verdict: 'सबसे सूखा दौर, समुद्र तट और स्नॉर्कलिंग के लिए बेहतरीन' },
      { month: 'मार्च', temp: '28 / 22°C', rain: '~170 mm', verdict: 'गर्म और काफ़ी सूखा; पैदल यात्राओं के लिए शानदार' },
      { month: 'अप्रैल', temp: '29 / 23°C', rain: '~210 mm', verdict: 'हरियाली लौटती है; ईस्टर के बाद भीड़ कम होती है' },
      { month: 'मई', temp: '28 / 23°C', rain: '~300 mm', verdict: 'दोपहर की बौछारें; हरा-भरा और शांत' },
      { month: 'जून', temp: '28 / 23°C', rain: '~340 mm', verdict: 'गीला; कछुओं का मौसम; जीवंत जंगल' },
      { month: 'जुलाई', temp: '27 / 22°C', rain: '~400 mm', verdict: 'धूप और तेज़ बौछारें मिली-जुली; अच्छी सर्फिंग' },
      { month: 'अगस्त', temp: '28 / 23°C', rain: '~320 mm', verdict: 'बारिश के दौर; गहरे हरे रंग का जंगल' },
      { month: 'सितंबर', temp: '28 / 22°C', rain: '~165 mm', verdict: 'वेरानिय्यो, शांत समुद्र, साफ़ पानी, कम भीड़' },
      { month: 'अक्टूबर', temp: '28 / 22°C', rain: '~200 mm', verdict: 'सबसे किफ़ायती, शांत समुद्र, कम दाम' },
      { month: 'नवंबर', temp: '27 / 22°C', rain: '~400 mm', verdict: 'सबसे बरसाती महीनों में से; झरने और गहरी हरियाली' },
      { month: 'दिसंबर', temp: '27 / 21°C', rain: '~350 mm', verdict: 'उत्सवमय; सर्फ लहरें; भीड़भाड़ और बारिश' },
    ],
    windowsHeading: 'दो अपेक्षाकृत सूखे दौर (और बारिश के दो चरम)',
    windowsParagraphs: [
      'प्रशांत तट के विपरीत, कैरिबियन ओर दो शांत दौर मिलते हैं। पहला फ़रवरी से मार्च तक है, वह क्लासिक सूखा दौर जिसमें साल की सबसे कम बारिश होती है।',
      'दूसरा है वेरानिय्यो, सितंबर और अक्टूबर की "छोटी गर्मी"। जब अधिकांश कोस्टा रिका अपने सबसे गीले दौर में होता है, तालामांका के पहाड़ व्यापारिक हवाओं से बारिश निचोड़ लेते हैं और दक्षिणी कैरिबियन तुलनात्मक रूप से साफ़ रहता है, शांत समुद्र, साफ़ पानी, और साल का सबसे बढ़िया मोल-भाव।',
      'दरअसल बारिश के दो चरम होते हैं: मोटे तौर पर जून-जुलाई, और फिर नवंबर से जनवरी तक। स्रोत वाकई इस बात पर एकमत नहीं हैं कि सबसे गीला कौन-सा है और यह साल-दर-साल बदलता रहता है, इसलिए दोनों दौरों में तेज़ बौछारों और अधिक उथल-पुथल भरे समुद्र की उम्मीद रखें। तब भी यह हरा-भरा और सुंदर रहता है, बस अधिक गीला।',
    ],
    liveHeading: 'आने से पहले मौसम की जाँच',
    liveParagraphs: [
      <>चूँकि हालात हफ़्ते-दर-हफ़्ते बदलते रहते हैं, कोई भी औसत की तुलना में लाइव पूर्वानुमान बेहतर होता है। प्वेर्तो विएखो क्षेत्र के लिए <a href="https://www.msn.com/en-us/weather/forecast/in-Puerto-Viejo,Lim%C3%B3n" target="_blank" rel="noopener noreferrer">MSN Weather</a> और Windy दोनों भरोसेमंद हैं।</>,
      'समुद्र तट के दिनों के लिए, बारिश जितना ही समुद्र पर भी नज़र रखें: तैरने और स्नॉर्कलिंग के लिए शांत समुद्र दोपहर की कुछ बौछारों से कहीं ज़्यादा मायने रखता है।',
    ],
    rainyHeading: 'बारिश हो तो क्या करें',
    rainyIntro: 'गीली दोपहर पूरे दिन को गँवाने की कोई वजह नहीं है। यहाँ की कुछ बेहतरीन चीज़ें बारिश में और भी बढ़िया लगती हैं:',
    rainyListItems: [
      'कोको (चॉकलेट) फ़ार्म का दौरा करें, ज़्यादातर छत के नीचे और मूसलाधार बारिश में बेहद सुखद',
      'किसी ब्रिब्री आदिवासी समुदाय में जाएँ और कोको तथा पारंपरिक औषधि के बारे में जानें',
      'काउइता राष्ट्रीय उद्यान घूमें, वन्यजीव सक्रिय रहते हैं और भीड़ छँट जाती है',
      'कस्बे के किसी कैरिबियन कैफ़े या चॉकलेट की दुकान में आराम से बैठें',
      'कुकिंग क्लास या स्पा ट्रीटमेंट बुक करें और तूफ़ान को बीतने दें',
    ],
    packHeading: 'कैरिबियन मौसम के लिए क्या साथ लाएँ',
    packListItems: [
      'हल्के, जल्दी सूखने वाले कपड़े, साल भर उमस रहती है',
      'एक कॉम्पैक्ट रेन जैकेट या पॉन्चो, किसी भी महीने में',
      'रीफ़-सुरक्षित सनस्क्रीन और कीट प्रतिरोधक',
      'गीली पगडंडियों और चट्टानी तटों के लिए वॉटर शूज़ या सैंडल',
      'फ़ोन और कैमरे के लिए एक वॉटरप्रूफ़ बैग',
      'दिसंबर और जनवरी की ठंडी, हवादार शामों के लिए एक हल्की परत',
    ],
    takeawaysHeading: 'मुख्य बातें',
    takeawaysParagraph:
      'प्वेर्तो विएखो साल भर गर्म और हरा-भरा रहता है, बिना किसी सच्चे शुष्क मौसम के पर दो भरोसेमंद शांत दौरों के साथ: फ़रवरी-मार्च और सितंबर-अक्टूबर का वेरानिय्यो। नवंबर-दिसंबर सबसे बरसाती है। आप जब भी आएँ, एक-दो बौछार के लिए तैयारी रखें और समुद्र तट के दिनों के लिए समुद्र पर नज़र रखें; यहाँ बारिश शायद ही कभी पूरे दिन चलती है।',
  },
  nl: {
    seoTitle: 'Weer in Puerto Viejo de Limón, Klimaatgids maand voor maand',
    seoDescription:
      'Hoe is het weer in Puerto Viejo de Limón nu echt? Een overzicht per maand van regen, zon, hitte en zeecondities, plus de leukste dingen om te doen op regenachtige dagen.',
    heading: 'Weer in Puerto Viejo de Limón: een gids maand voor maand',
    heroAlt: 'Caribisch strand en jungle in Puerto Viejo de Talamanca, Costa Rica',
    photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
    introParagraphs: [
      'Puerto Viejo de Talamanca ligt aan de zuidelijke Caribische kust van Costa Rica, in een tropisch regenwoudklimaat dat het hele jaar warm blijft: overdag maxima van 27-29°C en een zee van rond de 28-29°C in elke maand.',
      'Wat verandert, is de regen en de toestand van de oceaan. En cruciaal: de Caribische kust volgt niet dezelfde kalender als de Pacifische kant. Een echt droog seizoen is er hier niet, maar er zijn wel drogere, zonnigere periodes. Deze gids loopt het hele jaar door, zodat je weet wat je kunt verwachten wanneer je ook komt.',
    ],
    stayRecommendationTitle: 'Op zoek naar een verblijf in Puerto Viejo?',
    tableHeading: 'Het weer in Puerto Viejo, maand voor maand',
    tableIntro: 'De cijfers zijn benaderende gemiddelden, regen betekent hier meestal een middag- of nachtelijke stortbui, geen hele dag grijs. Tik op een maand voor alle details.',
    colMonth: 'Maand',
    colTemp: 'Temp (max / min)',
    colRain: 'Regen',
    colVerdict: 'Kort gezegd',
    monthRows: [
      { month: 'Januari', temp: '27 / 22°C', rain: '~200 mm', verdict: 'Warm en winderig; wat buien, goede golven' },
      { month: 'Februari', temp: '28 / 22°C', rain: '~110 mm', verdict: 'Droogste periode, beste strand en snorkelen' },
      { month: 'Maart', temp: '28 / 22°C', rain: '~170 mm', verdict: 'Warm en vrij droog; ideaal voor wandelingen' },
      { month: 'April', temp: '29 / 23°C', rain: '~210 mm', verdict: 'Alles wordt groen; minder drukte na Pasen' },
      { month: 'Mei', temp: '28 / 23°C', rain: '~300 mm', verdict: 'Middagbuien; weelderig en rustig' },
      { month: 'Juni', temp: '28 / 23°C', rain: '~340 mm', verdict: 'Nat; schildpaddenseizoen; levendige jungle' },
      { month: 'Juli', temp: '27 / 22°C', rain: '~400 mm', verdict: 'Zon en zware buien afgewisseld; goede golven' },
      { month: 'Augustus', temp: '28 / 23°C', rain: '~320 mm', verdict: 'Regenachtige periodes; jungle in spectaculair groen' },
      { month: 'September', temp: '28 / 22°C', rain: '~165 mm', verdict: 'Veranillo, kalme zee, helder water, weinig drukte' },
      { month: 'Oktober', temp: '28 / 22°C', rain: '~200 mm', verdict: 'Beste prijs-kwaliteit, kalme zee, lage prijzen' },
      { month: 'November', temp: '27 / 22°C', rain: '~400 mm', verdict: 'Tot de natste; watervallen en diep groen' },
      { month: 'December', temp: '27 / 21°C', rain: '~350 mm', verdict: 'Feestelijk; surfdeining; druk en nat' },
    ],
    windowsHeading: 'De twee drogere periodes (en de twee natte pieken)',
    windowsParagraphs: [
      'Anders dan de Pacifische kust kent de Caribische kant twee kalmere periodes. De eerste loopt van februari tot maart, de klassieke droge periode met de laagste neerslag van het jaar.',
      'De tweede is de veranillo, de "kleine zomer" van september en oktober. Terwijl een groot deel van Costa Rica in zijn natste periode zit, wringen de bergen van Talamanca de regen uit de passaatwinden en blijft het zuidelijke Caribisch gebied relatief helder, kalme zee, helder water en de beste prijs-kwaliteitverhouding van het jaar.',
      'Er zijn eigenlijk twee natte pieken: ongeveer juni-juli, en opnieuw van november tot in januari. Bronnen zijn het echt oneens over welke het natst is en het verschilt van jaar tot jaar, dus verwacht in beide periodes zwaardere buien en een ruwere zee. Het blijft groen en prachtig, alleen natter.',
    ],
    liveHeading: 'Het weer checken voordat je komt',
    liveParagraphs: [
      <>Omdat de omstandigheden van week tot week veranderen, is een live voorspelling beter dan welk gemiddelde dan ook. <a href="https://www.msn.com/en-us/weather/forecast/in-Puerto-Viejo,Lim%C3%B3n" target="_blank" rel="noopener noreferrer">MSN Weer</a> en Windy zijn allebei betrouwbaar voor de omgeving van Puerto Viejo.</>,
      'Let voor stranddagen net zo goed op de zee als op de regen: een kalme oceaan telt voor zwemmen en snorkelen zwaarder dan een paar middagbuien.',
    ],
    rainyHeading: 'Wat te doen als het regent',
    rainyIntro: 'Een natte middag is geen reden om een dag te verliezen. Sommige van de beste dingen hier zijn in de regen zelfs nog mooier:',
    rainyListItems: [
      'Doe een tour over een cacao- (chocolade-) boerderij, grotendeels overdekt en heerlijk als het giet',
      'Bezoek een inheemse Bribri-gemeenschap en leer over cacao en traditionele geneeskunde',
      'Verken Nationaal Park Cahuita, de dieren blijven actief en de drukte neemt af',
      'Strijk neer in een Caribisch café of chocoladewinkel in het dorp',
      'Boek een kookles of een spabehandeling en laat de bui overtrekken',
    ],
    packHeading: 'Wat mee te nemen voor het Caribische weer',
    packListItems: [
      'Lichte, sneldrogende kleding, het is het hele jaar vochtig',
      'Een compacte regenjas of poncho, in elke maand',
      'Rifvriendelijke zonnebrand en insectenwerend middel',
      'Waterschoenen of sandalen voor natte paden en rotsige stranden',
      'Een waterdichte tas voor telefoon en camera',
      'Een lichte extra laag voor de koelere, winderigere avonden in december en januari',
    ],
    takeawaysHeading: 'Kernpunten',
    takeawaysParagraph:
      'Puerto Viejo is het hele jaar warm en groen, zonder echt droog seizoen maar met twee betrouwbaar kalmere periodes: februari-maart en de veranillo van september-oktober. November-december is het natst. Wanneer je ook komt, pak iets in voor een bui of twee en houd de zee in de gaten voor stranddagen; regen houdt hier zelden de hele dag aan.',
  },
};

export function weatherHubContent(locale: Locale): WeatherHubContent {
  return weatherHub[locale] ?? weatherHub.en!;
}

/* ------------------------------------------------------------------ *
 * Weather cluster — monthly spokes
 *
 * One shared shape for all twelve months; the page component
 * (MonthlyWeatherArticle) is likewise shared, driven by the month key.
 * Each spoke links back up to the hub (weatherHubContent) and sideways to
 * sibling months via OtherBlogs. Phase 1 ships September–December.
 * ------------------------------------------------------------------ */

export type MonthKey =
  | 'january' | 'february' | 'march' | 'april' | 'may' | 'june'
  | 'july' | 'august' | 'september' | 'october' | 'november' | 'december';

export interface WeatherSnapshotRow {
  label: string;
  value: string;
}

export interface MonthlyWeatherContent {
  seoTitle: string;
  seoDescription: string;
  heading: string;
  heroAlt: string;
  photoCredit: React.ReactNode;
  snapshotHeading: string;
  snapshot: WeatherSnapshotRow[];
  whatItsLikeHeading: string;
  whatItsLikeParagraphs: string[];
  rainHeading: string;
  rainParagraph: string;
  rainyDayIntro: string;
  rainyDayItems: string[];
  crowdsHeading: string;
  crowdsParagraph: string;
  stayRecommendationTitle: string;
  verdictHeading: string;
  verdictParagraph: string;
  hubLinkText: string;
  takeawaysHeading: string;
  takeawaysParagraph: string;
}

const monthlyWeather: Partial<Record<MonthKey, Partial<Record<Locale, MonthlyWeatherContent>>>> = {
  january: {
    en: {
      seoTitle: 'Weather in Puerto Viejo in January: climate, rain and sea',
      seoDescription:
        'January in Puerto Viejo de Talamanca is warm and breezy, with post-holiday calm, a few showers and good surf. Here is what to expect and how to plan your trip.',
      heading: 'Weather in Puerto Viejo in January',
      heroAlt: 'Breezy Caribbean beach in Puerto Viejo de Talamanca in January',
      photoCredit: <>Photo: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'January at a glance',
      snapshot: [
        { label: 'Temperature', value: '27°C / 22°C' },
        { label: 'Rain', value: '~200 mm, easing after the December peak' },
        { label: 'Sea', value: 'Breezy, some surf, ~28°C' },
        { label: 'Crowds', value: 'Busy early, calmer after mid-month' },
      ],
      whatItsLikeHeading: 'What January is actually like',
      whatItsLikeParagraphs: [
        'January starts the year warm and green. December\'s heaviest rains are usually letting up, and though showers still blow through, the bright, breezy days grow more common as the weeks pass.',
        'The trade winds keep the air fresh and feed a lively surf scene. Once the New Year crowds thin out after the first week or two, the Caribbean coast settles into an easy, pleasant rhythm.',
      ],
      rainHeading: 'How much does it rain?',
      rainParagraph:
        'January averages around 200 mm, usually drier than December. Warm days get broken up by passing showers rather than long grey spells, with the occasional windy, wetter patch.',
      rainyDayIntro: 'If a shower rolls in, there is plenty to do:',
      rainyDayItems: [
        'Take a cacao farm and chocolate tour',
        'Watch the surfers at Salsa Brava on a breezy day',
        'Explore Cahuita National Park between showers',
      ],
      crowdsHeading: 'Crowds, prices and events',
      crowdsParagraph:
        'The first week or two still carries holiday crowds and higher prices. After that both ease off noticeably, so late January can be a sweet spot: warm weather without the peak-season rush.',
      stayRecommendationTitle: 'Where to stay in Puerto Viejo in January',
      verdictHeading: 'Is January a good time to visit?',
      verdictParagraph:
        'Yes, especially from mid-month on. The days are warm, green and breezy, the surf is good, and crowds and prices ease once the New Year rush is over.',
      hubLinkText: 'See the full month-by-month weather guide →',
      takeawaysHeading: 'Key takeaways',
      takeawaysParagraph:
        'January is warm, green and breezy, drying out after December with a lively surf scene. Come after the first couple of weeks for the best mix of good weather and thinner crowds, and pack for the odd passing shower.',
    },
    es: {
      seoTitle: 'El clima en Puerto Viejo en enero: tiempo, lluvia y mar',
      seoDescription:
        'En enero, Puerto Viejo de Talamanca es cálido y ventoso, con calma tras las fiestas, algunos aguaceros y buen surf. Esto es lo que puedes esperar y cómo planificar.',
      heading: 'El clima en Puerto Viejo en enero',
      heroAlt: 'Playa caribeña ventosa en Puerto Viejo de Talamanca en enero',
      photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Enero de un vistazo',
      snapshot: [
        { label: 'Temperatura', value: '27°C / 22°C' },
        { label: 'Lluvia', value: '~200 mm, cediendo tras el pico de diciembre' },
        { label: 'Mar', value: 'Ventoso, algo de surf, ~28°C' },
        { label: 'Afluencia', value: 'Alta al inicio, más tranquila tras mediados de mes' },
      ],
      whatItsLikeHeading: 'Cómo es enero en realidad',
      whatItsLikeParagraphs: [
        'Enero abre el año cálido y verde. Las lluvias más fuertes de diciembre suelen ir cediendo y, aunque todavía cae algún aguacero, los días luminosos y ventosos se multiplican conforme avanza el mes.',
        'Los vientos alisios mantienen el aire fresco y animan la escena del surf. Cuando la gente de Año Nuevo se dispersa después de la primera o segunda semana, el Caribe se vuelve un lugar tranquilo y agradable.',
      ],
      rainHeading: '¿Cuánto llueve?',
      rainParagraph:
        'Enero promedia unos 200 mm, casi siempre más seco que diciembre. Cuenta con días cálidos que cortan aguaceros de paso, y no largos períodos grises, con algún episodio ventoso y más húmedo de vez en cuando.',
      rainyDayIntro: 'Si llega un aguacero, hay mucho por hacer:',
      rainyDayItems: [
        'Haz un tour de cacao y chocolate',
        'Observa a los surfistas en Salsa Brava en un día ventoso',
        'Recorre el Parque Nacional Cahuita entre aguaceros',
      ],
      crowdsHeading: 'Afluencia, precios y eventos',
      crowdsParagraph:
        'La primera o segunda semana todavía trae multitudes de las fiestas y precios más altos. Luego ambos bajan de forma notable, así que finales de enero puede ser el mejor momento para el clima cálido sin el ajetreo de la temporada alta.',
      stayRecommendationTitle: 'Dónde hospedarte en Puerto Viejo en enero',
      verdictHeading: '¿Es enero una buena época para visitar?',
      verdictParagraph:
        'Sí, sobre todo desde mediados de mes. Los días son cálidos, verdes y ventosos, el surf es bueno, y la gente y los precios ceden una vez pasado el ajetreo de Año Nuevo.',
      hubLinkText: 'Ver la guía completa del clima mes a mes →',
      takeawaysHeading: 'Puntos clave',
      takeawaysParagraph:
        'Enero es cálido, verde y ventoso, se va secando tras diciembre y trae una escena de surf muy animada. Ven después de las dos primeras semanas para combinar buen clima con menos gente, y lleva algo para el aguacero de paso.',
    },
    de: {
      seoTitle: 'Wetter in Puerto Viejo im Januar: Klima, Regen und Meer',
      seoDescription:
        'Der Januar in Puerto Viejo de Talamanca ist warm und windig, mit Ruhe nach den Feiertagen, einigen Schauern und guten Wellen. Das erwartet Sie und so planen Sie Ihre Reise.',
      heading: 'Wetter in Puerto Viejo im Januar',
      heroAlt: 'Windiger Karibikstrand in Puerto Viejo de Talamanca im Januar',
      photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Der Januar auf einen Blick',
      snapshot: [
        { label: 'Temperatur', value: '27°C / 22°C' },
        { label: 'Regen', value: '~200 mm, lässt nach dem Dezember-Höhepunkt nach' },
        { label: 'Meer', value: 'Windig, etwas Wellengang, ~28°C' },
        { label: 'Andrang', value: 'Früh voll, ruhiger nach Monatsmitte' },
      ],
      whatItsLikeHeading: 'Wie der Januar tatsächlich ist',
      whatItsLikeParagraphs: [
        'Der Januar eröffnet das Jahr warm und grün. Die stärksten Regenfälle des Dezembers lassen meist nach, und auch wenn noch Schauer durchziehen, werden die hellen, windigen Tage im Lauf des Monats häufiger.',
        'Die Passatwinde halten die Luft frisch und sorgen für eine lebendige Surfszene. Sobald sich die Neujahrsmenge nach der ersten oder zweiten Woche verläuft, kommt an der Karibikküste eine entspannte, angenehme Stimmung auf.',
      ],
      rainHeading: 'Wie viel regnet es?',
      rainParagraph:
        'Der Januar bringt im Schnitt rund 200 mm und ist meist trockener als der Dezember. Rechnen Sie mit warmen Tagen, die vorüberziehende Schauer unterbrechen, statt mit langen grauen Phasen, dazu hin und wieder ein windiger, nasserer Abschnitt.',
      rainyDayIntro: 'Wenn ein Schauer aufzieht, gibt es viel zu tun:',
      rainyDayItems: [
        'Eine Kakaofarm- und Schokoladentour machen',
        'An einem windigen Tag den Surfern an der Salsa Brava zusehen',
        'Zwischen den Schauern den Cahuita-Nationalpark erkunden',
      ],
      crowdsHeading: 'Andrang, Preise und Veranstaltungen',
      crowdsParagraph:
        'In der ersten oder zweiten Woche herrschen noch Feiertagsandrang und höhere Preise. Danach lassen beide spürbar nach, sodass der späte Januar warmes Wetter ohne den Hochsaison-Trubel bietet.',
      stayRecommendationTitle: 'Wo man im Januar in Puerto Viejo übernachtet',
      verdictHeading: 'Ist der Januar eine gute Reisezeit?',
      verdictParagraph:
        'Ja, besonders ab Monatsmitte. Die Tage sind warm, grün und windig, die Surfszene ist gut, und Andrang wie Preise lassen nach dem Neujahrstrubel nach.',
      hubLinkText: 'Zum vollständigen Monat-für-Monat-Wetterführer →',
      takeawaysHeading: 'Das Wichtigste in Kürze',
      takeawaysParagraph:
        'Der Januar ist warm, grün und windig, trocknet nach dem Dezember ab und bietet eine lebendige Surfszene. Kommen Sie nach den ersten paar Wochen für die beste Mischung aus gutem Wetter und weniger Andrang und packen Sie etwas für den gelegentlichen Schauer ein.',
    },
    fr: {
      seoTitle: 'Météo à Puerto Viejo en janvier : climat, pluie et mer',
      seoDescription:
        'En janvier, Puerto Viejo de Talamanca est chaud et venteux, avec un calme d\'après-fêtes, quelques averses et de bonnes vagues. Voici à quoi vous attendre et comment planifier votre voyage.',
      heading: 'Météo à Puerto Viejo en janvier',
      heroAlt: 'Plage caraïbe venteuse à Puerto Viejo de Talamanca en janvier',
      photoCredit: <>Photo : <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Janvier en un coup d\'œil',
      snapshot: [
        { label: 'Température', value: '27°C / 22°C' },
        { label: 'Pluie', value: '~200 mm, en baisse après le pic de décembre' },
        { label: 'Mer', value: 'Venteuse, quelques vagues, ~28°C' },
        { label: 'Affluence', value: 'Chargée au début, plus calme après la mi-mois' },
      ],
      whatItsLikeHeading: 'À quoi ressemble janvier',
      whatItsLikeParagraphs: [
        'Janvier ouvre l\'année, chaud et verdoyant. Les pluies les plus fortes de décembre s\'atténuent en général et, même si quelques averses passent encore, les journées lumineuses et venteuses se font plus nombreuses au fil du mois.',
        'Les alizés gardent l\'air frais et animent le surf. Une fois la foule du Nouvel An dissipée, après la première ou la deuxième semaine, la côte caraïbe devient un endroit détendu et agréable.',
      ],
      rainHeading: 'Combien pleut-il ?',
      rainParagraph:
        'Janvier reçoit en moyenne environ 200 mm, plus sec que décembre le plus souvent. Comptez sur des journées chaudes coupées d\'averses passagères, et non de longues périodes grises, avec parfois un épisode venteux et plus humide.',
      rainyDayIntro: 'Si une averse s\'invite, il y a de quoi faire :',
      rainyDayItems: [
        'Faire un tour de ferme de cacao et de chocolat',
        'Observer les surfeurs à Salsa Brava par temps venteux',
        'Explorer le parc national de Cahuita entre deux averses',
      ],
      crowdsHeading: 'Affluence, prix et événements',
      crowdsParagraph:
        'La première ou la deuxième semaine garde encore la foule des fêtes et des prix plus élevés. Ensuite les deux baissent nettement, si bien que la fin janvier permet de profiter de la chaleur sans la cohue de la haute saison.',
      stayRecommendationTitle: 'Où loger à Puerto Viejo en janvier',
      verdictHeading: 'Janvier est-il un bon moment pour venir ?',
      verdictParagraph:
        'Oui, surtout à partir de la mi-mois. Les journées sont chaudes, verdoyantes et venteuses, le surf est au rendez-vous, et l\'affluence comme les prix retombent une fois passée la cohue du Nouvel An.',
      hubLinkText: 'Voir le guide météo complet mois par mois →',
      takeawaysHeading: 'À retenir',
      takeawaysParagraph:
        'Janvier est chaud, verdoyant et venteux, il s\'assèche après décembre et la scène de surf y est animée. Venez après les deux premières semaines pour allier beau temps et tranquillité, et prévoyez de quoi affronter une averse passagère.',
    },
    it: {
      seoTitle: 'Meteo a Puerto Viejo a gennaio: clima, pioggia e mare',
      seoDescription:
        'A gennaio Puerto Viejo de Talamanca è calda e ventilata, con la calma dopo le feste, qualche acquazzone e buone onde. Ecco cosa aspettarti e come pianificare il viaggio.',
      heading: 'Meteo a Puerto Viejo a gennaio',
      heroAlt: 'Spiaggia caraibica ventilata a Puerto Viejo de Talamanca a gennaio',
      photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Gennaio in breve',
      snapshot: [
        { label: 'Temperatura', value: '27°C / 22°C' },
        { label: 'Pioggia', value: '~200 mm, in calo dopo il picco di dicembre' },
        { label: 'Mare', value: 'Ventilato, un po\' di onde, ~28°C' },
        { label: 'Affluenza', value: 'Affollato all\'inizio, più tranquillo dopo metà mese' },
      ],
      whatItsLikeHeading: 'Com\'è gennaio in realtà',
      whatItsLikeParagraphs: [
        'Gennaio apre l\'anno caldo e verde. Le piogge più intense di dicembre di solito si attenuano e, anche se qualche acquazzone passa ancora, con l\'avanzare del mese le giornate luminose e ventilate si fanno più frequenti.',
        'Gli alisei mantengono l\'aria fresca e danno vita a una bella scena del surf. Quando la folla di Capodanno si dirada, dopo la prima o la seconda settimana, la costa caraibica diventa un luogo rilassato e piacevole.',
      ],
      rainHeading: 'Quanto piove?',
      rainParagraph:
        'Gennaio registra in media circa 200 mm, quasi sempre più asciutto di dicembre. Conta su giornate calde spezzate da acquazzoni di passaggio, e non su lunghi periodi grigi, con qualche fase ventosa e più umida qua e là.',
      rainyDayIntro: 'Se arriva un acquazzone, c\'è molto da fare:',
      rainyDayItems: [
        'Fare un tour di una piantagione di cacao e del cioccolato',
        'Guardare i surfisti a Salsa Brava in una giornata ventosa',
        'Esplorare il Parco Nazionale Cahuita tra un acquazzone e l\'altro',
      ],
      crowdsHeading: 'Affluenza, prezzi ed eventi',
      crowdsParagraph:
        'La prima o la seconda settimana porta ancora la folla delle feste e prezzi più alti. Poi entrambi calano nettamente, così la fine di gennaio regala il caldo senza la ressa dell\'alta stagione.',
      stayRecommendationTitle: 'Dove alloggiare a Puerto Viejo a gennaio',
      verdictHeading: 'Gennaio è un buon momento per visitare?',
      verdictParagraph:
        'Sì, soprattutto da metà mese. Le giornate sono calde, verdi e ventilate, il surf è buono, e affluenza e prezzi calano una volta passata la ressa di Capodanno.',
      hubLinkText: 'Guarda la guida meteo completa mese per mese →',
      takeawaysHeading: 'Punti chiave',
      takeawaysParagraph:
        'Gennaio è caldo, verde e ventilato, si asciuga dopo dicembre e ha una scena del surf molto vivace. Vieni dopo le prime due settimane per unire bel tempo e meno folla, e porta qualcosa per l\'acquazzone di passaggio.',
    },
    pt: {
      seoTitle: 'Clima em Puerto Viejo em janeiro: tempo, chuva e mar',
      seoDescription:
        'Janeiro em Puerto Viejo de Talamanca é quente e ventoso, com a calma pós-festas, alguns aguaceiros e boas ondas. Veja o que esperar e como planejar sua viagem.',
      heading: 'Clima em Puerto Viejo em janeiro',
      heroAlt: 'Praia caribenha ventosa em Puerto Viejo de Talamanca em janeiro',
      photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Janeiro num relance',
      snapshot: [
        { label: 'Temperatura', value: '27°C / 22°C' },
        { label: 'Chuva', value: '~200 mm, diminuindo após o pico de dezembro' },
        { label: 'Mar', value: 'Ventoso, algumas ondas, ~28°C' },
        { label: 'Movimento', value: 'Cheio no início, mais calmo após meados do mês' },
      ],
      whatItsLikeHeading: 'Como janeiro é de fato',
      whatItsLikeParagraphs: [
        'Janeiro abre o ano quente e verde. As chuvas mais fortes de dezembro costumam estar diminuindo e, mesmo que ainda passem aguaceiros, os dias claros e ventosos ficam mais frequentes conforme o mês avança.',
        'Os ventos alísios mantêm o ar fresco e dão vida ao surfe. Quando a multidão de Ano Novo se dispersa, depois da primeira ou segunda semana, a costa caribenha vira um lugar tranquilo e agradável.',
      ],
      rainHeading: 'Quanto chove?',
      rainParagraph:
        'Janeiro tem em média cerca de 200 mm, quase sempre mais seco que dezembro. Conte com dias quentes cortados por aguaceiros passageiros, e não com longos períodos cinzentos, e um ou outro episódio ventoso e mais úmido.',
      rainyDayIntro: 'Se chegar um aguaceiro, há muito o que fazer:',
      rainyDayItems: [
        'Fazer um tour de fazenda de cacau e chocolate',
        'Observar os surfistas em Salsa Brava num dia ventoso',
        'Explorar o Parque Nacional Cahuita entre aguaceiros',
      ],
      crowdsHeading: 'Movimento, preços e eventos',
      crowdsParagraph:
        'A primeira ou segunda semana ainda traz as multidões das festas e preços mais altos. Depois disso ambos caem bastante, então o fim de janeiro rende clima quente sem a correria da alta temporada.',
      stayRecommendationTitle: 'Onde ficar em Puerto Viejo em janeiro',
      verdictHeading: 'Janeiro é uma boa época para visitar?',
      verdictParagraph:
        'Sim, especialmente a partir de meados do mês. Os dias são quentes, verdes e ventosos, o surfe é bom, e o movimento e os preços caem depois da correria de Ano Novo.',
      hubLinkText: 'Ver o guia completo de clima mês a mês →',
      takeawaysHeading: 'Principais conclusões',
      takeawaysParagraph:
        'Janeiro é quente, verde e ventoso, seca após dezembro e tem uma cena de surfe animada. Venha depois das duas primeiras semanas para juntar bom tempo e menos gente, e leve algo para o aguaceiro passageiro.',
    },
    he: {
      seoTitle: 'מזג האוויר בPuerto Viejo בינואר: אקלים, גשם וים',
      seoDescription:
        'ינואר בPuerto Viejo de Talamanca חם ורוחני, עם שקט אחרי החגים, כמה ממטרים וגלישה טובה. הנה למה לצפות ואיך לתכנן את הטיול שלכם.',
      heading: 'מזג האוויר בPuerto Viejo בינואר',
      heroAlt: 'חוף קריבי רוחני בPuerto Viejo de Talamanca בינואר',
      photoCredit: <>תמונה: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'ינואר במבט חטוף',
      snapshot: [
        { label: 'טמפרטורה', value: '27°C / 22°C' },
        { label: 'גשם', value: '~200 מ"מ, נחלש אחרי שיא דצמבר' },
        { label: 'ים', value: 'רוחני, מעט גלישה, ~28°C' },
        { label: 'עומס', value: 'עמוס בהתחלה, רגוע יותר אחרי אמצע החודש' },
      ],
      whatItsLikeHeading: 'איך נראה ינואר בפועל',
      whatItsLikeParagraphs: [
        'ינואר פותח את השנה חם וירוק. הגשמים הכבדים של דצמבר בדרך כלל נחלשים, ואף שעדיין עוברים ממטרים, מספר הימים הבהירים והרוחניים גדל ככל שהחודש מתקדם.',
        'רוחות הסחר שומרות על אוויר רענן ומחיות את סצנת הגלישה. ברגע שקהל השנה החדשה מתפזר, אחרי השבוע הראשון או השני, החוף הקריבי הופך למקום רגוע ונעים.',
      ],
      rainHeading: 'כמה יורד גשם?',
      rainParagraph:
        'בינואר יורדים בממוצע כ-200 מ"מ, ברוב המקרים יבש יותר מדצמבר. צפו לימים חמים שנקטעים בממטרים חולפים, ולא לרצפים אפורים ארוכים, עם פרק רוחני וגשום יותר פה ושם.',
      rainyDayIntro: 'אם מגיע ממטר, יש הרבה מה לעשות:',
      rainyDayItems: [
        'לצאת לסיור בחוות קקאו ושוקולד',
        'לצפות בגולשים ב-Salsa Brava ביום רוחני',
        'לחקור את הפארק הלאומי Cahuita בין הממטרים',
      ],
      crowdsHeading: 'עומס, מחירים ואירועים',
      crowdsParagraph:
        'השבוע הראשון או השני עדיין נושא את קהל החגים ומחירים גבוהים יותר. לאחר מכן שניהם יורדים במידה ניכרת, כך שסוף ינואר נותן מזג אוויר חם בלי העומס של שיא העונה.',
      stayRecommendationTitle: 'איפה להתארח בPuerto Viejo בינואר',
      verdictHeading: 'האם ינואר הוא זמן טוב לביקור?',
      verdictParagraph:
        'כן, במיוחד מאמצע החודש. הימים חמים, ירוקים ורוחניים, הגלישה טובה, והעומס והמחירים יורדים אחרי הבהלה של השנה החדשה.',
      hubLinkText: 'למדריך מזג האוויר המלא חודש אחר חודש ←',
      takeawaysHeading: 'נקודות מפתח',
      takeawaysParagraph:
        'ינואר חם, ירוק ורוחני, מתייבש אחרי דצמבר עם סצנת גלישה תוססת. בואו אחרי השבועיים הראשונים לשילוב הטוב ביותר של מזג אוויר טוב ופחות עומס, וארזו משהו לממטר חולף.',
    },
    hi: {
      seoTitle: 'जनवरी में Puerto Viejo का मौसम: जलवायु, बारिश और समुद्र',
      seoDescription:
        'Puerto Viejo de Talamanca में जनवरी गर्म और हवादार होता है, त्योहारों के बाद की शांति, कुछ बौछारें और अच्छी सर्फिंग के साथ। जानिए क्या उम्मीद करें और अपनी यात्रा की योजना कैसे बनाएं।',
      heading: 'जनवरी में Puerto Viejo का मौसम',
      heroAlt: 'जनवरी में Puerto Viejo de Talamanca का हवादार कैरिबियन समुद्र तट',
      photoCredit: <>तस्वीर: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'एक नज़र में जनवरी',
      snapshot: [
        { label: 'तापमान', value: '27°C / 22°C' },
        { label: 'बारिश', value: '~200 मिमी, दिसंबर के चरम के बाद कम होती हुई' },
        { label: 'समुद्र', value: 'हवादार, कुछ लहरें, ~28°C' },
        { label: 'भीड़', value: 'शुरू में व्यस्त, महीने के मध्य के बाद शांत' },
      ],
      whatItsLikeHeading: 'जनवरी असल में कैसा होता है',
      whatItsLikeParagraphs: [
        'जनवरी साल की शुरुआत गर्म और हरे-भरे रूप में करता है। दिसंबर की सबसे तेज़ बारिशें आमतौर पर कम पड़ने लगती हैं, और बौछारें भले ही अब भी आती हों, महीना जैसे-जैसे बढ़ता है, उजले और हवादार दिन ज़्यादा मिलने लगते हैं।',
        'व्यापारिक हवाएं वातावरण को ताज़ा रखती हैं और सर्फिंग को जीवंत बनाए रखती हैं। पहले या दूसरे सप्ताह के बाद जब नए साल की भीड़ छंट जाती है, तो कैरिबियन तट पर रहना आरामदायक और सुखद हो जाता है।',
      ],
      rainHeading: 'कितनी बारिश होती है?',
      rainParagraph:
        'जनवरी में औसतन लगभग 200 मिमी बारिश होती है, और यह अक्सर दिसंबर से सूखा रहता है। लंबे भूरे दौर के बजाय गुज़रती बौछारों से बाधित गर्म दिनों की उम्मीद रखें, बीच-बीच में किसी हवादार और ज़्यादा गीले दौर के साथ।',
      rainyDayIntro: 'अगर बौछार आ जाए, तो करने के लिए बहुत कुछ है:',
      rainyDayItems: [
        'कोको फार्म और चॉकलेट टूर करें',
        'हवादार दिन में Salsa Brava पर सर्फ़रों को देखें',
        'बौछारों के बीच Cahuita राष्ट्रीय उद्यान की सैर करें',
      ],
      crowdsHeading: 'भीड़, कीमतें और आयोजन',
      crowdsParagraph:
        'पहला या दूसरा सप्ताह अब भी त्योहारों की भीड़ और ऊंची कीमतें लेकर आता है। इसके बाद दोनों काफ़ी कम हो जाते हैं, इसलिए जनवरी का अंत चरम मौसम की भागदौड़ के बिना गर्म मौसम देता है।',
      stayRecommendationTitle: 'जनवरी में Puerto Viejo में कहाँ ठहरें',
      verdictHeading: 'क्या जनवरी घूमने का अच्छा समय है?',
      verdictParagraph:
        'हां, खासकर महीने के मध्य से। दिन गर्म, हरे-भरे और हवादार रहते हैं, सर्फिंग अच्छी रहती है, और नए साल की भागदौड़ के बाद भीड़ और कीमतें दोनों घट जाती हैं।',
      hubLinkText: 'महीने-दर-महीने की पूरी मौसम गाइड देखें →',
      takeawaysHeading: 'मुख्य बातें',
      takeawaysParagraph:
        'जनवरी गर्म, हरा-भरा और हवादार होता है, दिसंबर के बाद सूखता हुआ और एक जीवंत सर्फिंग दृश्य के साथ। अच्छे मौसम और कम भीड़ के सबसे अच्छे मेल के लिए पहले कुछ हफ्तों के बाद आएं, और किसी गुज़रती बौछार के लिए कुछ साथ रखें।',
    },
    nl: {
      seoTitle: 'Weer in Puerto Viejo in januari: klimaat, regen en zee',
      seoDescription:
        'Januari in Puerto Viejo de Talamanca is warm en winderig, met rust na de feestdagen, wat buien en goede golven. Dit kunt u verwachten en zo plant u uw reis.',
      heading: 'Weer in Puerto Viejo in januari',
      heroAlt: 'Winderig Caribisch strand in Puerto Viejo de Talamanca in januari',
      photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Januari in een oogopslag',
      snapshot: [
        { label: 'Temperatuur', value: '27°C / 22°C' },
        { label: 'Regen', value: '~200 mm, neemt af na de piek van december' },
        { label: 'Zee', value: 'Winderig, wat golven, ~28°C' },
        { label: 'Drukte', value: 'Vroeg druk, rustiger na half januari' },
      ],
      whatItsLikeHeading: 'Hoe januari aanvoelt',
      whatItsLikeParagraphs: [
        'Januari opent het jaar warm en groen. De zwaarste regens van december nemen meestal af, en al trekken er nog buien over, naarmate de maand vordert komen er meer heldere, winderige dagen.',
        'De passaatwinden houden de lucht fris en geven de surfscene leven. Zodra de nieuwjaarsdrukte na de eerste of tweede week wegtrekt, wordt de Caribische kust een ontspannen, aangename plek.',
      ],
      rainHeading: 'Hoeveel regent het?',
      rainParagraph:
        'Januari kent gemiddeld zo\'n 200 mm en is meestal droger dan december. Reken op warme dagen die door voorbijtrekkende buien worden onderbroken, en niet op lange grijze perioden, met af en toe een winderige, nattere periode.',
      rainyDayIntro: 'Als er een bui opsteekt, is er genoeg te doen:',
      rainyDayItems: [
        'Een cacaoboerderij- en chocoladetour maken',
        'Op een winderige dag de surfers bij Salsa Brava bekijken',
        'Tussen de buien door Nationaal Park Cahuita verkennen',
      ],
      crowdsHeading: 'Drukte, prijzen en evenementen',
      crowdsParagraph:
        'De eerste of tweede week kent nog de feestdagendrukte en hogere prijzen. Daarna nemen beide merkbaar af, dus eind januari levert warm weer zonder de hoogseizoendrukte.',
      stayRecommendationTitle: 'Waar te verblijven in Puerto Viejo in januari',
      verdictHeading: 'Is januari een goede tijd om te bezoeken?',
      verdictParagraph:
        'Ja, vooral vanaf half januari. De dagen zijn warm, groen en winderig, de surfscene is goed, en drukte en prijzen nemen af na de nieuwjaarsdrukte.',
      hubLinkText: 'Bekijk de volledige maand-voor-maand weergids →',
      takeawaysHeading: 'Belangrijkste punten',
      takeawaysParagraph:
        'Januari is warm, groen en winderig, droogt op na december en heeft een levendige surfscene. Kom na de eerste paar weken voor de beste mix van goed weer en minder drukte, en pak iets in voor de incidentele voorbijtrekkende bui.',
    },
  },
  february: {
    en: {
      seoTitle: 'Weather in Puerto Viejo in February: climate, rain and sea',
      seoDescription:
        'February is the driest month in Puerto Viejo de Talamanca, the classic dry window with warm sun and the best beach and snorkelling conditions. Here is what to expect.',
      heading: 'Weather in Puerto Viejo in February',
      heroAlt: 'Sunny dry-season beach in Puerto Viejo de Talamanca in February',
      photoCredit: <>Photo: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'February at a glance',
      snapshot: [
        { label: 'Temperature', value: '28°C / 22°C' },
        { label: 'Rain', value: '~110 mm, the driest month' },
        { label: 'Sea', value: 'Often calm and clear, ~28°C' },
        { label: 'Crowds', value: 'Moderate, popular dry-season month' },
      ],
      whatItsLikeHeading: 'What February is actually like',
      whatItsLikeParagraphs: [
        'February is the classic dry window on the southern Caribbean. It is usually the driest month of the year, with the most reliable stretches of warm sun and blue sky.',
        'The sea is often at its calmest and clearest, which makes it one of the best months for the beach, swimming and snorkelling. Nothing is guaranteed, and the Caribbean can still surprise you, but your odds of great beach weather are about as good as they get here.',
      ],
      rainHeading: 'How much does it rain?',
      rainParagraph:
        'February averages only around 110 mm, the lowest of the year. The occasional shower still turns up, but long sunny spells are the norm rather than the exception.',
      rainyDayIntro: 'On the rare wet afternoon, you have plenty of options:',
      rainyDayItems: [
        'Snorkel the reef while the water is clear and calm',
        'Take a cacao and chocolate tour',
        'Visit a Bribri Indigenous community',
      ],
      crowdsHeading: 'Crowds, prices and events',
      crowdsParagraph:
        'As the most reliable dry-season month, February draws a crowd, so expect moderate numbers and higher prices than the green season. Book accommodation ahead if you want the best options.',
      stayRecommendationTitle: 'Where to stay in Puerto Viejo in February',
      verdictHeading: 'Is February a good time to visit?',
      verdictParagraph:
        'Yes. For classic dry, sunny beach weather it is one of the best months of the year, so if your trip is all about the sea and the sand, February is a strong choice.',
      hubLinkText: 'See the full month-by-month weather guide →',
      takeawaysHeading: 'Key takeaways',
      takeawaysParagraph:
        'February is the driest month in Puerto Viejo, with the most reliable sun and often the calmest, clearest sea: prime beach and snorkelling weather. Expect moderate crowds and book ahead, but pack for the odd Caribbean surprise shower.',
    },
    es: {
      seoTitle: 'El clima en Puerto Viejo en febrero: tiempo, lluvia y mar',
      seoDescription:
        'Febrero es el mes más seco en Puerto Viejo de Talamanca, la clásica ventana seca con sol cálido y las mejores condiciones de playa y snorkel. Esto es lo que puedes esperar.',
      heading: 'El clima en Puerto Viejo en febrero',
      heroAlt: 'Playa soleada de temporada seca en Puerto Viejo de Talamanca en febrero',
      photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Febrero de un vistazo',
      snapshot: [
        { label: 'Temperatura', value: '28°C / 22°C' },
        { label: 'Lluvia', value: '~110 mm, el mes más seco' },
        { label: 'Mar', value: 'A menudo en calma y claro, ~28°C' },
        { label: 'Afluencia', value: 'Moderada, mes popular de temporada seca' },
      ],
      whatItsLikeHeading: 'Cómo es febrero en realidad',
      whatItsLikeParagraphs: [
        'Febrero es la clásica ventana seca del Caribe Sur. Suele ser el mes más seco del año, con los períodos más fiables de sol cálido y cielo azul.',
        'El mar suele estar en su punto más tranquilo y claro, lo que lo convierte en uno de los mejores meses para la playa, nadar y hacer snorkel. Nada está garantizado, y el Caribe todavía puede sorprender, pero las probabilidades de buen clima de playa son de las mejores del año.',
      ],
      rainHeading: '¿Cuánto llueve?',
      rainParagraph:
        'Febrero promedia solo unos 110 mm, lo más bajo del año. Aún cae algún aguacero suelto, pero los largos períodos soleados son la norma y no la excepción.',
      rainyDayIntro: 'En la rara tarde lluviosa, tienes muchas opciones:',
      rainyDayItems: [
        'Haz snorkel en el arrecife mientras el agua está clara y en calma',
        'Haz un tour de cacao y chocolate',
        'Visita una comunidad indígena Bribri',
      ],
      crowdsHeading: 'Afluencia, precios y eventos',
      crowdsParagraph:
        'Al ser el mes más fiable de la temporada seca, febrero atrae gente, así que cuenta con afluencia moderada y precios más altos que en la temporada verde. Reserva alojamiento con antelación si quieres las mejores opciones.',
      stayRecommendationTitle: 'Dónde hospedarte en Puerto Viejo en febrero',
      verdictHeading: '¿Es febrero una buena época para visitar?',
      verdictParagraph:
        'Sí. Para el clásico clima seco y soleado de playa es uno de los mejores meses del año, así que si tu viaje gira en torno al mar y la arena, febrero es una gran elección.',
      hubLinkText: 'Ver la guía completa del clima mes a mes →',
      takeawaysHeading: 'Puntos clave',
      takeawaysParagraph:
        'Febrero es el mes más seco de Puerto Viejo, con el sol más fiable y a menudo el mar más tranquilo y claro: clima ideal de playa y snorkel. Espera afluencia moderada y reserva con antelación, pero lleva algo por si el Caribe sorprende con un aguacero.',
    },
    de: {
      seoTitle: 'Wetter in Puerto Viejo im Februar: Klima, Regen und Meer',
      seoDescription:
        'Februar ist der trockenste Monat in Puerto Viejo de Talamanca, das klassische Trockenfenster mit warmer Sonne und den besten Bedingungen für Strand und Schnorcheln. Das erwartet Sie.',
      heading: 'Wetter in Puerto Viejo im Februar',
      heroAlt: 'Sonniger Strand der Trockenzeit in Puerto Viejo de Talamanca im Februar',
      photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Februar auf einen Blick',
      snapshot: [
        { label: 'Temperatur', value: '28°C / 22°C' },
        { label: 'Regen', value: '~110 mm, der trockenste Monat' },
        { label: 'Meer', value: 'Oft ruhig und klar, ~28°C' },
        { label: 'Andrang', value: 'Mäßig, beliebter Monat der Trockenzeit' },
      ],
      whatItsLikeHeading: 'Wie der Februar tatsächlich ist',
      whatItsLikeParagraphs: [
        'Der Februar ist das klassische Trockenfenster an der südlichen Karibikküste. Er ist meist der trockenste Monat des Jahres, mit den verlässlichsten Phasen warmer Sonne und blauen Himmels.',
        'Das Meer ist oft am ruhigsten und klarsten, was ihn zu einem der besten Monate für Strand, Schwimmen und Schnorcheln macht. Garantiert ist nichts, und die Karibik kann einen immer noch überraschen, doch die Chancen auf herrliches Strandwetter sind hier so gut wie nie.',
      ],
      rainHeading: 'Wie viel regnet es?',
      rainParagraph:
        'Im Februar fallen im Schnitt nur etwa 110 mm, der niedrigste Wert des Jahres. Der eine oder andere Schauer zieht noch durch, doch lange sonnige Phasen sind die Regel und nicht die Ausnahme.',
      rainyDayIntro: 'An dem seltenen verregneten Nachmittag haben Sie viele Möglichkeiten:',
      rainyDayItems: [
        'Schnorcheln Sie am Riff, solange das Wasser klar und ruhig ist',
        'Machen Sie eine Kakao- und Schokoladentour',
        'Besuchen Sie eine indigene Bribri-Gemeinschaft',
      ],
      crowdsHeading: 'Andrang, Preise und Veranstaltungen',
      crowdsParagraph:
        'Als verlässlichster Monat der Trockenzeit ist der Februar beliebt, rechnen Sie also mit mäßigem Andrang und höheren Preisen als in der grünen Saison. Buchen Sie Ihre Unterkunft im Voraus, wenn Sie die besten Optionen wollen.',
      stayRecommendationTitle: 'Wo man im Februar in Puerto Viejo übernachtet',
      verdictHeading: 'Ist der Februar eine gute Reisezeit?',
      verdictParagraph:
        'Ja. Für klassisches trockenes, sonniges Strandwetter ist er einer der besten Monate des Jahres, und wenn sich Ihre Reise ganz um Meer und Sand dreht, ist der Februar eine starke Wahl.',
      hubLinkText: 'Zum vollständigen Monat-für-Monat-Wetterführer →',
      takeawaysHeading: 'Wichtigste Erkenntnisse',
      takeawaysParagraph:
        'Der Februar ist der trockenste Monat in Puerto Viejo, mit der verlässlichsten Sonne und oft dem ruhigsten, klarsten Meer: ideales Wetter für Strand und Schnorcheln. Rechnen Sie mit mäßigem Andrang und buchen Sie im Voraus, aber packen Sie für den gelegentlichen karibischen Überraschungsschauer.',
    },
    fr: {
      seoTitle: 'Météo à Puerto Viejo en février : climat, pluie et mer',
      seoDescription:
        'Février est le mois le plus sec à Puerto Viejo de Talamanca, la classique fenêtre sèche avec un soleil chaud et les meilleures conditions pour la plage et le snorkeling. Voici à quoi vous attendre.',
      heading: 'Météo à Puerto Viejo en février',
      heroAlt: 'Plage ensoleillée de saison sèche à Puerto Viejo de Talamanca en février',
      photoCredit: <>Photo: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Février en un coup d\'œil',
      snapshot: [
        { label: 'Température', value: '28°C / 22°C' },
        { label: 'Pluie', value: '~110 mm, le mois le plus sec' },
        { label: 'Mer', value: 'Souvent calme et claire, ~28°C' },
        { label: 'Affluence', value: 'Modérée, mois prisé de la saison sèche' },
      ],
      whatItsLikeHeading: 'À quoi ressemble février',
      whatItsLikeParagraphs: [
        'Février est la classique fenêtre sèche du sud des Caraïbes. C\'est en général le mois le plus sec de l\'année, avec les périodes les plus fiables de soleil chaud et de ciel bleu.',
        'La mer est souvent à son plus calme et à son plus clair, ce qui en fait l\'un des meilleurs mois pour la plage, la baignade et le snorkeling. Rien n\'est garanti, et les Caraïbes peuvent encore vous surprendre, mais vos chances de profiter d\'un beau temps de plage sont ici parmi les meilleures.',
      ],
      rainHeading: 'Combien pleut-il ?',
      rainParagraph:
        'Février ne totalise en moyenne qu\'environ 110 mm, le plus faible de l\'année. Quelques averses passent encore, mais les longues périodes ensoleillées sont la norme plutôt que l\'exception.',
      rainyDayIntro: 'Lors du rare après-midi pluvieux, vous avez de nombreuses options :',
      rainyDayItems: [
        'Faites du snorkeling sur le récif pendant que l\'eau est claire et calme',
        'Faites un tour du cacao et du chocolat',
        'Visitez une communauté autochtone Bribri',
      ],
      crowdsHeading: 'Affluence, prix et événements',
      crowdsParagraph:
        'Mois le plus fiable de la saison sèche, février est prisé, alors attendez-vous à une affluence modérée et à des prix plus élevés qu\'en saison verte. Réservez votre hébergement à l\'avance si vous voulez les meilleures options.',
      stayRecommendationTitle: 'Où loger à Puerto Viejo en février',
      verdictHeading: 'Février est-il une bonne période pour visiter ?',
      verdictParagraph:
        'Oui. Pour un temps de plage classique, sec et ensoleillé, c\'est l\'un des meilleurs mois de l\'année, et si votre voyage tourne autour de la mer et du sable, février est un excellent choix.',
      hubLinkText: 'Voir le guide météo complet mois par mois →',
      takeawaysHeading: 'Points clés',
      takeawaysParagraph:
        'Février est le mois le plus sec à Puerto Viejo, avec le soleil le plus fiable et souvent la mer la plus calme et la plus claire : un temps idéal pour la plage et le snorkeling. Attendez-vous à une affluence modérée et réservez à l\'avance, mais prévoyez de quoi faire face à une averse surprise des Caraïbes.',
    },
    it: {
      seoTitle: 'Meteo a Puerto Viejo a febbraio: clima, pioggia e mare',
      seoDescription:
        'Febbraio è il mese più secco a Puerto Viejo de Talamanca, la classica finestra secca con sole caldo e le migliori condizioni per spiaggia e snorkeling. Ecco cosa aspettarti.',
      heading: 'Meteo a Puerto Viejo a febbraio',
      heroAlt: 'Spiaggia soleggiata della stagione secca a Puerto Viejo de Talamanca a febbraio',
      photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Febbraio in breve',
      snapshot: [
        { label: 'Temperatura', value: '28°C / 22°C' },
        { label: 'Pioggia', value: '~110 mm, il mese più secco' },
        { label: 'Mare', value: 'Spesso calmo e limpido, ~28°C' },
        { label: 'Affluenza', value: 'Moderata, mese popolare della stagione secca' },
      ],
      whatItsLikeHeading: 'Com\'è febbraio in realtà',
      whatItsLikeParagraphs: [
        'Febbraio è la classica finestra secca dei Caraibi meridionali. È di solito il mese più secco dell\'anno, con i periodi più affidabili di sole caldo e cielo azzurro.',
        'Il mare è spesso al suo massimo di calma e limpidezza, il che lo rende uno dei mesi migliori per la spiaggia, il nuoto e lo snorkeling. Niente è garantito, e i Caraibi possono ancora sorprenderti, ma le probabilità di un ottimo tempo da spiaggia sono tra le migliori dell\'anno.',
      ],
      rainHeading: 'Quanto piove?',
      rainParagraph:
        'A febbraio cadono in media solo circa 110 mm, il valore più basso dell\'anno. Qualche acquazzone isolato capita ancora, ma le lunghe schiarite soleggiate sono la norma più che l\'eccezione.',
      rainyDayIntro: 'Nel raro pomeriggio piovoso, hai molte opzioni:',
      rainyDayItems: [
        'Fai snorkeling sulla barriera corallina mentre l\'acqua è limpida e calma',
        'Fai un tour del cacao e del cioccolato',
        'Visita una comunità indigena Bribri',
      ],
      crowdsHeading: 'Affluenza, prezzi ed eventi',
      crowdsParagraph:
        'Essendo il mese più affidabile della stagione secca, febbraio è popolare, quindi aspettati un\'affluenza moderata e prezzi più alti rispetto alla stagione verde. Prenota l\'alloggio in anticipo se vuoi le opzioni migliori.',
      stayRecommendationTitle: 'Dove alloggiare a Puerto Viejo a febbraio',
      verdictHeading: 'Febbraio è un buon periodo per visitare?',
      verdictParagraph:
        'Sì. Per il classico tempo da spiaggia secco e soleggiato è uno dei mesi migliori dell\'anno, e se il tuo viaggio ruota tutto intorno al mare e alla sabbia, febbraio è un\'ottima scelta.',
      hubLinkText: 'Vedi la guida meteo completa mese per mese →',
      takeawaysHeading: 'Punti chiave',
      takeawaysParagraph:
        'Febbraio è il mese più secco di Puerto Viejo, con il sole più affidabile e spesso il mare più calmo e limpido: tempo ideale per spiaggia e snorkeling. Aspettati un\'affluenza moderata e prenota in anticipo, ma metti in valigia qualcosa per l\'occasionale acquazzone a sorpresa dei Caraibi.',
    },
    pt: {
      seoTitle: 'Clima em Puerto Viejo em fevereiro: tempo, chuva e mar',
      seoDescription:
        'Fevereiro é o mês mais seco em Puerto Viejo de Talamanca, a clássica janela seca com sol quente e as melhores condições para praia e snorkeling. Veja o que esperar.',
      heading: 'Clima em Puerto Viejo em fevereiro',
      heroAlt: 'Praia ensolarada da estação seca em Puerto Viejo de Talamanca em fevereiro',
      photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Fevereiro num relance',
      snapshot: [
        { label: 'Temperatura', value: '28°C / 22°C' },
        { label: 'Chuva', value: '~110 mm, o mês mais seco' },
        { label: 'Mar', value: 'Muitas vezes calmo e claro, ~28°C' },
        { label: 'Movimento', value: 'Moderado, mês popular da estação seca' },
      ],
      whatItsLikeHeading: 'Como fevereiro é de fato',
      whatItsLikeParagraphs: [
        'Fevereiro é a clássica janela seca do Caribe Sul. Costuma ser o mês mais seco do ano, com os períodos mais confiáveis de sol quente e céu azul.',
        'O mar costuma estar no seu ponto mais calmo e claro, o que o torna um dos melhores meses para a praia, nadar e fazer snorkeling. Nada é garantido, e o Caribe ainda pode surpreender, mas as chances de um ótimo tempo de praia estão entre as melhores do ano.',
      ],
      rainHeading: 'Quanto chove?',
      rainParagraph:
        'Fevereiro tem em média apenas cerca de 110 mm, o menor do ano. Uma pancada de chuva ainda aparece de vez em quando, mas os longos períodos de sol são a regra, não a exceção.',
      rainyDayIntro: 'Na rara tarde chuvosa, você tem muitas opções:',
      rainyDayItems: [
        'Faça snorkeling no recife enquanto a água está clara e calma',
        'Faça um tour de cacau e chocolate',
        'Visite uma comunidade indígena Bribri',
      ],
      crowdsHeading: 'Movimento, preços e eventos',
      crowdsParagraph:
        'Por ser o mês mais confiável da estação seca, fevereiro é popular, então espere movimento moderado e preços mais altos do que na estação verde. Reserve a hospedagem com antecedência se quiser as melhores opções.',
      stayRecommendationTitle: 'Onde se hospedar em Puerto Viejo em fevereiro',
      verdictHeading: 'Fevereiro é uma boa época para visitar?',
      verdictParagraph:
        'Sim. Para o clássico tempo de praia seco e ensolarado é um dos melhores meses do ano, e se a sua viagem gira em torno do mar e da areia, fevereiro é uma excelente escolha.',
      hubLinkText: 'Veja o guia de clima completo mês a mês →',
      takeawaysHeading: 'Pontos principais',
      takeawaysParagraph:
        'Fevereiro é o mês mais seco de Puerto Viejo, com o sol mais confiável e muitas vezes o mar mais calmo e claro: tempo ideal para praia e snorkeling. Espere movimento moderado e reserve com antecedência, mas leve algo para a eventual pancada de chuva surpresa do Caribe.',
    },
    he: {
      seoTitle: 'מזג האוויר בפוארטו ויאחו בפברואר: אקלים, גשם וים',
      seoDescription:
        'פברואר הוא החודש היבש ביותר בפוארטו ויאחו דה טלמנקה, חלון היובש הקלאסי עם שמש חמה והתנאים הטובים ביותר לחוף ולשנורקלינג. הנה למה לצפות.',
      heading: 'מזג האוויר בפוארטו ויאחו בפברואר',
      heroAlt: 'חוף שטוף שמש בעונה היבשה בפוארטו ויאחו דה טלמנקה בפברואר',
      photoCredit: <>צילום: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'פברואר במבט חטוף',
      snapshot: [
        { label: 'טמפרטורה', value: '28°C / 22°C' },
        { label: 'גשם', value: '~110 מ"מ, החודש היבש ביותר' },
        { label: 'ים', value: 'לרוב רגוע וצלול, ~28°C' },
        { label: 'עומס', value: 'בינוני, חודש פופולרי בעונה היבשה' },
      ],
      whatItsLikeHeading: 'איך נראה פברואר בפועל',
      whatItsLikeParagraphs: [
        'פברואר הוא חלון היובש הקלאסי בקריביים הדרומיים. זהו בדרך כלל החודש היבש ביותר בשנה, עם התקופות האמינות ביותר של שמש חמה ושמיים כחולים.',
        'הים לרוב במיטבו מבחינת רוגע וצלילות, מה שהופך אותו לאחד החודשים הטובים ביותר לחוף, לשחייה ולשנורקלינג. שום דבר לא מובטח, והקריביים עדיין יכולים להפתיע, אך הסיכויים למזג אוויר חופי מצוין טובים כמעט כפי שהם יכולים להיות כאן.',
      ],
      rainHeading: 'כמה גשם יורד?',
      rainParagraph:
        'בפברואר יורדים בממוצע רק כ-110 מ"מ, הנמוך ביותר בשנה. עדיין מופיע ממטר מזדמן, אך מקטעי שמש ארוכים הם הכלל ולא היוצא מן הכלל.',
      rainyDayIntro: 'באחר צהריים גשום ונדיר, יש לכם שלל אפשרויות:',
      rainyDayItems: [
        'עשו שנורקלינג בשונית בזמן שהמים צלולים ורגועים',
        'צאו לסיור קקאו ושוקולד',
        'בקרו בקהילה הילידית Bribri',
      ],
      crowdsHeading: 'עומס, מחירים ואירועים',
      crowdsParagraph:
        'בהיותו החודש האמין ביותר בעונה היבשה, פברואר פופולרי, אז צפו לעומס בינוני ולמחירים גבוהים יותר מאשר בעונה הירוקה. הזמינו לינה מראש אם אתם רוצים את האפשרויות הטובות ביותר.',
      stayRecommendationTitle: 'איפה להתארח בפוארטו ויאחו בפברואר',
      verdictHeading: 'האם פברואר הוא זמן טוב לביקור?',
      verdictParagraph:
        'כן. למזג אוויר חופי קלאסי, יבש ושטוף שמש זהו אחד החודשים הטובים ביותר בשנה, ואם הטיול שלכם כולו סביב הים והחול, פברואר הוא בחירה מצוינת.',
      hubLinkText: 'צפו במדריך מזג האוויר המלא חודש אחר חודש →',
      takeawaysHeading: 'נקודות עיקריות',
      takeawaysParagraph:
        'פברואר הוא החודש היבש ביותר בפוארטו ויאחו, עם השמש האמינה ביותר ולרוב הים הרגוע והצלול ביותר: מזג אוויר אידיאלי לחוף ולשנורקלינג. צפו לעומס בינוני והזמינו מראש, אך ארזו גם למקרה של ממטר הפתעה קריבי.',
    },
    hi: {
      seoTitle: 'फ़रवरी में पुएर्तो विएखो का मौसम: जलवायु, बारिश और समुद्र',
      seoDescription:
        'फ़रवरी पुएर्तो विएखो दे तालामांका का सबसे शुष्क महीना है, गर्म धूप और समुद्र तट तथा स्नॉर्कलिंग की बेहतरीन परिस्थितियों वाली क्लासिक शुष्क अवधि। यहाँ जानिए क्या उम्मीद करें।',
      heading: 'फ़रवरी में पुएर्तो विएखो का मौसम',
      heroAlt: 'फ़रवरी में पुएर्तो विएखो दे तालामांका में शुष्क मौसम का धूप भरा समुद्र तट',
      photoCredit: <>फ़ोटो: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'एक नज़र में फ़रवरी',
      snapshot: [
        { label: 'तापमान', value: '28°C / 22°C' },
        { label: 'बारिश', value: '~110 मिमी, सबसे शुष्क महीना' },
        { label: 'समुद्र', value: 'अक्सर शांत और साफ़, ~28°C' },
        { label: 'भीड़', value: 'मध्यम, शुष्क मौसम का लोकप्रिय महीना' },
      ],
      whatItsLikeHeading: 'फ़रवरी असल में कैसा होता है',
      whatItsLikeParagraphs: [
        'फ़रवरी दक्षिणी कैरिबियन की क्लासिक शुष्क अवधि है। यह आमतौर पर साल का सबसे शुष्क महीना होता है, जिसमें गर्म धूप और नीले आसमान के सबसे भरोसेमंद दौर आते हैं।',
        'समुद्र अक्सर सबसे शांत और साफ़ होता है, जिससे यह समुद्र तट, तैराकी और स्नॉर्कलिंग के लिए सबसे अच्छे महीनों में से एक बन जाता है। इसकी कोई गारंटी नहीं है, और कैरिबियन अब भी आपको चौंका सकता है, फिर भी शानदार समुद्र तट के मौसम की संभावनाएँ यहाँ जितनी अच्छी हो सकती हैं उतनी ही रहती हैं।',
      ],
      rainHeading: 'कितनी बारिश होती है?',
      rainParagraph:
        'फ़रवरी में औसतन केवल लगभग 110 मिमी बारिश होती है, जो साल में सबसे कम है। कभी-कभार एक बौछार अब भी आ जाती है, लेकिन लंबे धूप भरे दौर अपवाद नहीं बल्कि आम बात हैं।',
      rainyDayIntro: 'किसी दुर्लभ बरसाती दोपहर में, आपके पास ढेरों विकल्प हैं:',
      rainyDayItems: [
        'जब पानी साफ़ और शांत हो तब चट्टान पर स्नॉर्कलिंग करें',
        'कोको और चॉकलेट टूर पर जाएँ',
        'किसी Bribri स्वदेशी समुदाय का दौरा करें',
      ],
      crowdsHeading: 'भीड़, कीमतें और आयोजन',
      crowdsParagraph:
        'शुष्क मौसम के सबसे भरोसेमंद महीने के रूप में, फ़रवरी लोकप्रिय है, इसलिए मध्यम भीड़ और हरित मौसम की तुलना में ऊँची कीमतों की उम्मीद करें। बेहतरीन विकल्प चाहिए तो आवास पहले से बुक करें।',
      stayRecommendationTitle: 'फ़रवरी में पुएर्तो विएखो में कहाँ ठहरें',
      verdictHeading: 'क्या फ़रवरी घूमने के लिए अच्छा समय है?',
      verdictParagraph:
        'हाँ। क्लासिक शुष्क, धूप भरे समुद्र तट के मौसम के लिए यह साल के सबसे अच्छे महीनों में से एक है, और अगर आपकी यात्रा पूरी तरह समुद्र और रेत के बारे में है, तो फ़रवरी एक बढ़िया विकल्प है।',
      hubLinkText: 'महीने-दर-महीने की पूरी मौसम गाइड देखें →',
      takeawaysHeading: 'मुख्य बातें',
      takeawaysParagraph:
        'फ़रवरी पुएर्तो विएखो का सबसे शुष्क महीना है, जिसमें सबसे भरोसेमंद धूप और अक्सर सबसे शांत, साफ़ समुद्र होता है: समुद्र तट और स्नॉर्कलिंग के लिए बेहतरीन मौसम। मध्यम भीड़ की उम्मीद करें और पहले से बुक करें, लेकिन कभी-कभार कैरिबियन की अचानक बौछार के लिए भी सामान रखें।',
    },
    nl: {
      seoTitle: 'Weer in Puerto Viejo in februari: klimaat, regen en zee',
      seoDescription:
        'Februari is de droogste maand in Puerto Viejo de Talamanca, het klassieke droge venster met warme zon en de beste omstandigheden voor strand en snorkelen. Dit is wat je kunt verwachten.',
      heading: 'Weer in Puerto Viejo in februari',
      heroAlt: 'Zonnig strand in het droge seizoen in Puerto Viejo de Talamanca in februari',
      photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Februari in het kort',
      snapshot: [
        { label: 'Temperatuur', value: '28°C / 22°C' },
        { label: 'Regen', value: '~110 mm, de droogste maand' },
        { label: 'Zee', value: 'Vaak kalm en helder, ~28°C' },
        { label: 'Drukte', value: 'Matig, populaire maand in het droge seizoen' },
      ],
      whatItsLikeHeading: 'Hoe februari aanvoelt',
      whatItsLikeParagraphs: [
        'Februari is het klassieke droge venster aan de zuidelijke Caribische kust. Het is doorgaans de droogste maand van het jaar, met de meest betrouwbare periodes van warme zon en blauwe lucht.',
        'De zee is vaak op zijn kalmst en helderst, waardoor het een van de beste maanden is voor het strand, zwemmen en snorkelen. Niets is gegarandeerd, en de Caraïben kunnen je nog altijd verrassen, maar de kans op prachtig strandweer is hier zo goed als het maar kan.',
      ],
      rainHeading: 'Hoeveel regent het?',
      rainParagraph:
        'Februari kent gemiddeld slechts zo\'n 110 mm, het laagste van het jaar. Af en toe valt er nog een bui, maar lange zonnige periodes zijn eerder regel dan uitzondering.',
      rainyDayIntro: 'Op de zeldzame natte middag heb je volop opties:',
      rainyDayItems: [
        'Snorkel bij het rif terwijl het water helder en kalm is',
        'Doe een cacao- en chocoladetour',
        'Bezoek een inheemse Bribri-gemeenschap',
      ],
      crowdsHeading: 'Drukte, prijzen en evenementen',
      crowdsParagraph:
        'Als meest betrouwbare maand van het droge seizoen is februari populair, dus reken op matige drukte en hogere prijzen dan in het groene seizoen. Boek je accommodatie op tijd als je de beste opties wilt.',
      stayRecommendationTitle: 'Waar te verblijven in Puerto Viejo in februari',
      verdictHeading: 'Is februari een goede tijd om te bezoeken?',
      verdictParagraph:
        'Ja. Voor klassiek droog, zonnig strandweer is het een van de beste maanden van het jaar, en als je reis helemaal draait om de zee en het zand, is februari een sterke keuze.',
      hubLinkText: 'Bekijk de volledige maand-voor-maand weergids →',
      takeawaysHeading: 'Belangrijkste punten',
      takeawaysParagraph:
        'Februari is de droogste maand in Puerto Viejo, met de meest betrouwbare zon en vaak de kalmste, helderste zee: ideaal strand- en snorkelweer. Reken op matige drukte en boek op tijd, maar pak ook iets in voor de incidentele Caribische verrassingsbui.',
    },
  },
  march: {
    en: {
      seoTitle: 'Weather in Puerto Viejo in March: climate, rain and sea',
      seoDescription:
        'March in Puerto Viejo de Talamanca stays warm and fairly dry as the dry window continues, great for beaches, hikes and jungle. Here is what to expect.',
      heading: 'Weather in Puerto Viejo in March',
      heroAlt: 'Warm sunny day on the Caribbean coast of Puerto Viejo de Talamanca in March',
      photoCredit: <>Photo: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'March at a glance',
      snapshot: [
        { label: 'Temperature', value: '28°C / 22°C' },
        { label: 'Rain', value: '~170 mm, still on the drier side' },
        { label: 'Sea', value: 'Warm, generally pleasant, ~28°C' },
        { label: 'Crowds', value: 'Moderate, dry-season demand' },
      ],
      whatItsLikeHeading: 'What March is actually like',
      whatItsLikeParagraphs: [
        'March keeps the dry window going, warm and fairly bright. It is one of the warmer months of the year, with plenty of sun and comfortable beach days.',
        'It handles most plans well: good for the beach, ideal for jungle hikes and wildlife before the wetter months arrive, and reliable enough to build day trips around.',
      ],
      rainHeading: 'How much does it rain?',
      rainParagraph:
        'March averages around 170 mm, still on the drier side for this coast. Days are mostly warm and bright, with the occasional short shower, especially later on.',
      rainyDayIntro: 'If a shower passes through, there is plenty to do:',
      rainyDayItems: [
        'Hike the flat coastal trail in Cahuita National Park',
        'Take a chocolate (cacao) tour',
        'Snorkel or swim on a calm afternoon',
      ],
      crowdsHeading: 'Crowds, prices and events',
      crowdsParagraph:
        'March still sees dry-season demand, so crowds and prices sit in the middle: a little quieter than February but busier than the green season. Some years Easter falls in late March and brings a local surge.',
      stayRecommendationTitle: 'Where to stay in Puerto Viejo in March',
      verdictHeading: 'Is March a good time to visit?',
      verdictParagraph:
        'Yes. Warm, fairly dry and versatile, March suits beach lovers and hikers alike, and it is one of the more dependable months for a bit of everything.',
      hubLinkText: 'See the full month-by-month weather guide →',
      takeawaysHeading: 'Key takeaways',
      takeawaysParagraph:
        'March keeps the dry window going: warm, fairly dry and great for both beaches and jungle. Crowds are moderate, watch for Easter if it falls late in the month, and pack for the occasional afternoon shower.',
    },
    es: {
      seoTitle: 'El clima en Puerto Viejo en marzo: tiempo, lluvia y mar',
      seoDescription:
        'Marzo en Puerto Viejo de Talamanca se mantiene cálido y bastante seco mientras continúa la ventana seca, ideal para playas, caminatas y selva. Esto es lo que puedes esperar.',
      heading: 'El clima en Puerto Viejo en marzo',
      heroAlt: 'Día cálido y soleado en el Caribe de Puerto Viejo de Talamanca en marzo',
      photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Marzo de un vistazo',
      snapshot: [
        { label: 'Temperatura', value: '28°C / 22°C' },
        { label: 'Lluvia', value: '~170 mm, todavía del lado más seco' },
        { label: 'Mar', value: 'Cálido, en general agradable, ~28°C' },
        { label: 'Afluencia', value: 'Moderada, demanda de temporada seca' },
      ],
      whatItsLikeHeading: 'Cómo es marzo en realidad',
      whatItsLikeParagraphs: [
        'Marzo continúa la ventana seca y se mantiene cálido y bastante luminoso. Es uno de los meses más cálidos del año, con mucho sol y cómodos días de playa.',
        'Se adapta a casi cualquier plan: bueno para la playa, ideal para caminatas por la selva y ver fauna antes de que lleguen los meses más húmedos, y con un clima fiable para planear excursiones.',
      ],
      rainHeading: '¿Cuánto llueve?',
      rainParagraph:
        'Marzo promedia unos 170 mm, todavía del lado más seco para esta costa. Los días son en su mayoría cálidos y luminosos, con algún aguacero corto, sobre todo al final del día.',
      rainyDayIntro: 'Si pasa un aguacero, hay mucho por hacer:',
      rainyDayItems: [
        'Recorre el sendero costero plano del Parque Nacional Cahuita',
        'Haz un tour de chocolate (cacao)',
        'Haz snorkel o nada en una tarde tranquila',
      ],
      crowdsHeading: 'Afluencia, precios y eventos',
      crowdsParagraph:
        'Marzo aún tiene demanda de temporada seca, así que la afluencia y los precios quedan en un punto medio: algo más tranquilo que febrero pero más concurrido que la temporada verde. Algunos años la Semana Santa cae a finales de marzo y trae un repunte local.',
      stayRecommendationTitle: 'Dónde hospedarte en Puerto Viejo en marzo',
      verdictHeading: '¿Es marzo una buena época para visitar?',
      verdictParagraph:
        'Sí. Cálido, bastante seco y versátil, marzo va bien tanto para amantes de la playa como para senderistas, y es uno de los meses más fiables para un poco de todo.',
      hubLinkText: 'Ver la guía completa del clima mes a mes →',
      takeawaysHeading: 'Puntos clave',
      takeawaysParagraph:
        'Marzo mantiene la ventana seca: cálido, bastante seco y genial tanto para playas como para selva. La afluencia es moderada, ojo con la Semana Santa si cae a fin de mes, y lleva algo para algún aguacero de la tarde.',
    },
    de: {
      seoTitle: 'Wetter in Puerto Viejo im März: Klima, Regen und Meer',
      seoDescription:
        'Der März in Puerto Viejo de Talamanca bleibt warm und recht trocken, während das Trockenfenster anhält, ideal für Strände, Wanderungen und Dschungel. Das erwartet dich.',
      heading: 'Wetter in Puerto Viejo im März',
      heroAlt: 'Warmer, sonniger Tag an der Karibikküste von Puerto Viejo de Talamanca im März',
      photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'März auf einen Blick',
      snapshot: [
        { label: 'Temperatur', value: '28°C / 22°C' },
        { label: 'Regen', value: '~170 mm, noch auf der trockeneren Seite' },
        { label: 'Meer', value: 'Warm, allgemein angenehm, ~28°C' },
        { label: 'Andrang', value: 'Moderat, Nachfrage der Trockenzeit' },
      ],
      whatItsLikeHeading: 'Wie der März tatsächlich ist',
      whatItsLikeParagraphs: [
        'Der März hält das Trockenfenster offen und bleibt warm und recht hell. Er ist einer der wärmeren Monate des Jahres, mit viel Sonne und angenehmen Strandtagen.',
        'Er kommt mit fast jedem Plan zurecht: gut für den Strand, ideal für Dschungelwanderungen und Tierbeobachtungen, bevor die feuchteren Monate kommen, und verlässlich genug, um Tagesausflüge darauf aufzubauen.',
      ],
      rainHeading: 'Wie viel regnet es?',
      rainParagraph:
        'Der März erreicht im Schnitt rund 170 mm, für diese Küste noch auf der trockeneren Seite. Die Tage sind überwiegend warm und hell, mit gelegentlichen kurzen Schauern, vor allem im späteren Tagesverlauf.',
      rainyDayIntro: 'Wenn ein Schauer durchzieht, gibt es viel zu tun:',
      rainyDayItems: [
        'Wandere den flachen Küstenpfad im Cahuita-Nationalpark',
        'Mache eine Schokoladen- (Kakao-)Tour',
        'Schnorchle oder schwimme an einem ruhigen Nachmittag',
      ],
      crowdsHeading: 'Andrang, Preise und Veranstaltungen',
      crowdsParagraph:
        'Im März herrscht noch die Nachfrage der Trockenzeit, sodass Andrang und Preise im Mittelfeld liegen: etwas ruhiger als im Februar, aber belebter als in der grünen Saison. Ostern kann in manchen Jahren auf Ende März fallen und bringt einen lokalen Ansturm.',
      stayRecommendationTitle: 'Wo man im März in Puerto Viejo übernachtet',
      verdictHeading: 'Ist der März eine gute Reisezeit?',
      verdictParagraph:
        'Ja. Warm, recht trocken und vielseitig, passt der März Strandliebhabern wie Wanderern gleichermaßen, und er ist einer der verlässlichsten Monate für ein bisschen von allem.',
      hubLinkText: 'Zum vollständigen Wetterführer Monat für Monat →',
      takeawaysHeading: 'Das Wichtigste in Kürze',
      takeawaysParagraph:
        'Der März hält das Trockenfenster offen: warm, recht trocken und großartig für Strände wie Dschungel. Der Andrang ist moderat, achte auf Ostern, falls es spät im Monat liegt, und packe für den gelegentlichen Nachmittagsschauer.',
    },
    fr: {
      seoTitle: 'Météo à Puerto Viejo en mars : climat, pluie et mer',
      seoDescription:
        'En mars, Puerto Viejo de Talamanca reste chaud et plutôt sec tandis que la fenêtre sèche se poursuit, parfait pour les plages, les randonnées et la jungle. Voici à quoi vous attendre.',
      heading: 'Météo à Puerto Viejo en mars',
      heroAlt: 'Journée chaude et ensoleillée sur la côte caraïbe de Puerto Viejo de Talamanca en mars',
      photoCredit: <>Photo : <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Mars en un coup d\'œil',
      snapshot: [
        { label: 'Température', value: '28°C / 22°C' },
        { label: 'Pluie', value: '~170 mm, encore du côté le plus sec' },
        { label: 'Mer', value: 'Chaude, généralement agréable, ~28°C' },
        { label: 'Affluence', value: 'Modérée, demande de saison sèche' },
      ],
      whatItsLikeHeading: 'À quoi ressemble le mois de mars',
      whatItsLikeParagraphs: [
        'Mars prolonge la fenêtre sèche et reste chaud et plutôt lumineux. C\'est l\'un des mois les plus chauds de l\'année, avec beaucoup de soleil et d\'agréables journées de plage.',
        'Il s\'accommode de presque tous les programmes : bon pour la plage, idéal pour les randonnées en jungle et l\'observation de la faune avant l\'arrivée des mois plus humides, et assez fiable pour caler des excursions à la journée.',
      ],
      rainHeading: 'Combien pleut-il ?',
      rainParagraph:
        'Mars affiche en moyenne environ 170 mm, encore du côté le plus sec pour cette côte. Les journées sont majoritairement chaudes et lumineuses, avec une averse courte de temps en temps, surtout en fin de journée.',
      rainyDayIntro: 'Si une averse passe, il y a de quoi s\'occuper :',
      rainyDayItems: [
        'Parcourez le sentier côtier plat du parc national de Cahuita',
        'Faites un tour du chocolat (cacao)',
        'Faites du snorkeling ou nagez lors d\'un après-midi calme',
      ],
      crowdsHeading: 'Affluence, prix et événements',
      crowdsParagraph:
        'Mars connaît encore la demande de la saison sèche, si bien que l\'affluence et les prix restent moyens : un peu plus calme que février mais plus animé que la saison verte. La Semana Santa peut tomber fin mars certaines années et provoque un afflux local.',
      stayRecommendationTitle: 'Où loger à Puerto Viejo en mars',
      verdictHeading: 'Mars est-il une bonne période pour visiter ?',
      verdictParagraph:
        'Oui. Chaud, plutôt sec et polyvalent, mars convient aussi bien aux amateurs de plage qu\'aux randonneurs, et c\'est l\'un des mois les plus fiables pour un peu de tout.',
      hubLinkText: 'Voir le guide météo complet mois par mois →',
      takeawaysHeading: 'À retenir',
      takeawaysParagraph:
        'Mars maintient la fenêtre sèche : chaud, plutôt sec et parfait pour les plages comme pour la jungle. L\'affluence est modérée, surveillez Pâques s\'il tombe tard dans le mois, et prévoyez de quoi affronter l\'averse occasionnelle de l\'après-midi.',
    },
    it: {
      seoTitle: 'Meteo a Puerto Viejo a marzo: clima, pioggia e mare',
      seoDescription:
        'A marzo Puerto Viejo de Talamanca resta caldo e piuttosto secco mentre prosegue la finestra secca, ottimo per spiagge, escursioni e giungla. Ecco cosa aspettarti.',
      heading: 'Meteo a Puerto Viejo a marzo',
      heroAlt: 'Giornata calda e soleggiata sulla costa caraibica di Puerto Viejo de Talamanca a marzo',
      photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Marzo in breve',
      snapshot: [
        { label: 'Temperatura', value: '28°C / 22°C' },
        { label: 'Pioggia', value: '~170 mm, ancora sul versante più secco' },
        { label: 'Mare', value: 'Caldo, generalmente piacevole, ~28°C' },
        { label: 'Affluenza', value: 'Moderata, domanda della stagione secca' },
      ],
      whatItsLikeHeading: 'Com\'è marzo in realtà',
      whatItsLikeParagraphs: [
        'Marzo prosegue la finestra secca e resta caldo e piuttosto luminoso. È uno dei mesi più caldi dell\'anno, con tanto sole e comode giornate di mare.',
        'Si adatta a quasi ogni programma: buono per la spiaggia, ideale per escursioni nella giungla e avvistamenti di fauna prima dell\'arrivo dei mesi più umidi, e abbastanza affidabile per organizzare gite in giornata.',
      ],
      rainHeading: 'Quanto piove?',
      rainParagraph:
        'Marzo registra in media circa 170 mm, ancora sul versante più secco per questa costa. Le giornate sono perlopiù calde e luminose, con qualche breve rovescio, soprattutto nel tardo pomeriggio.',
      rainyDayIntro: 'Se passa un rovescio, c\'è molto da fare:',
      rainyDayItems: [
        'Percorri il sentiero costiero pianeggiante del Parco Nazionale di Cahuita',
        'Fai un tour del cioccolato (cacao)',
        'Fai snorkeling o nuota in un pomeriggio tranquillo',
      ],
      crowdsHeading: 'Affluenza, prezzi ed eventi',
      crowdsParagraph:
        'Marzo vede ancora la domanda della stagione secca, quindi affluenza e prezzi restano nella media: un po\' più tranquillo di febbraio ma più affollato della stagione verde. La Semana Santa può cadere a fine marzo in alcuni anni e porta un picco locale.',
      stayRecommendationTitle: 'Dove alloggiare a Puerto Viejo a marzo',
      verdictHeading: 'Marzo è un buon periodo per visitare?',
      verdictParagraph:
        'Sì. Caldo, piuttosto secco e versatile, marzo va bene sia per gli amanti della spiaggia sia per gli escursionisti, ed è uno dei mesi più affidabili per un po\' di tutto.',
      hubLinkText: 'Vedi la guida meteo completa mese per mese →',
      takeawaysHeading: 'Punti chiave',
      takeawaysParagraph:
        'Marzo mantiene aperta la finestra secca: caldo, piuttosto secco e perfetto sia per le spiagge sia per la giungla. L\'affluenza è moderata, attenzione alla Pasqua se cade a fine mese, e metti in valigia qualcosa per il rovescio pomeridiano occasionale.',
    },
    pt: {
      seoTitle: 'Clima em Puerto Viejo em março: tempo, chuva e mar',
      seoDescription:
        'Março em Puerto Viejo de Talamanca continua quente e bastante seco enquanto a janela seca prossegue, ótimo para praias, caminhadas e selva. Veja o que esperar.',
      heading: 'Clima em Puerto Viejo em março',
      heroAlt: 'Dia quente e ensolarado no litoral caribenho de Puerto Viejo de Talamanca em março',
      photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Março num relance',
      snapshot: [
        { label: 'Temperatura', value: '28°C / 22°C' },
        { label: 'Chuva', value: '~170 mm, ainda do lado mais seco' },
        { label: 'Mar', value: 'Quente, geralmente agradável, ~28°C' },
        { label: 'Movimento', value: 'Moderado, demanda da estação seca' },
      ],
      whatItsLikeHeading: 'Como março é de fato',
      whatItsLikeParagraphs: [
        'Março dá continuidade à janela seca e se mantém quente e bastante luminoso. É um dos meses mais quentes do ano, com muito sol e dias de praia agradáveis.',
        'Ele dá conta de quase todo tipo de plano: bom para a praia, ideal para caminhadas na selva e observação de fauna antes da chegada dos meses mais úmidos, e confiável o suficiente para montar passeios de um dia.',
      ],
      rainHeading: 'Quanto chove?',
      rainParagraph:
        'Março tem uma média de cerca de 170 mm, ainda do lado mais seco para este litoral. Os dias são em geral quentes e luminosos, com alguma pancada rápida de chuva, sobretudo no fim do dia.',
      rainyDayIntro: 'Se passar uma pancada de chuva, há muito o que fazer:',
      rainyDayItems: [
        'Percorra a trilha costeira plana do Parque Nacional Cahuita',
        'Faça um tour de chocolate (cacau)',
        'Faça snorkel ou nade numa tarde tranquila',
      ],
      crowdsHeading: 'Movimento, preços e eventos',
      crowdsParagraph:
        'Março ainda registra a demanda da estação seca, então movimento e preços ficam num meio-termo: um pouco mais tranquilo que fevereiro, mas mais movimentado que a estação verde. A Semana Santa pode cair no fim de março em alguns anos e traz um pico local.',
      stayRecommendationTitle: 'Onde se hospedar em Puerto Viejo em março',
      verdictHeading: 'Março é uma boa época para visitar?',
      verdictParagraph:
        'Sim. Quente, bastante seco e versátil, março agrada tanto aos amantes de praia quanto aos caminhantes, e é um dos meses mais confiáveis para um pouco de tudo.',
      hubLinkText: 'Ver o guia completo de clima mês a mês →',
      takeawaysHeading: 'Pontos principais',
      takeawaysParagraph:
        'Março mantém a janela seca: quente, bastante seco e ótimo tanto para praias quanto para a selva. O movimento é moderado, fique atento à Páscoa se ela cair no fim do mês, e leve algo para a eventual pancada de chuva da tarde.',
    },
    he: {
      seoTitle: 'מזג האוויר בפוארטו ויאחו במרץ: אקלים, גשם וים',
      seoDescription:
        'מרץ בפוארטו ויאחו דה טלמנקה נשאר חמים ויבש למדי בעוד חלון היובש נמשך, מצוין לחופים, לטיולים רגליים ולג\'ונגל. הנה למה לצפות.',
      heading: 'מזג האוויר בפוארטו ויאחו במרץ',
      heroAlt: 'יום חמים ושטוף שמש בחוף הקריבי של פוארטו ויאחו דה טלמנקה במרץ',
      photoCredit: <>צילום: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'מרץ במבט חטוף',
      snapshot: [
        { label: 'טמפרטורה', value: '28°C / 22°C' },
        { label: 'גשם', value: '~170 mm, עדיין בצד היבש יותר' },
        { label: 'ים', value: 'חמים, נעים בדרך כלל, ~28°C' },
        { label: 'עומס מבקרים', value: 'בינוני, ביקוש של עונת היובש' },
      ],
      whatItsLikeHeading: 'איך נראה מרץ בפועל',
      whatItsLikeParagraphs: [
        'מרץ ממשיך את חלון היובש, ונשאר חמים ובהיר למדי. זהו אחד החודשים החמים יותר בשנה, עם שפע שמש וימי חוף נעימים.',
        'הוא מסתדר כמעט עם כל תוכנית: טוב לחוף, אידיאלי לטיולים בג\'ונגל ולצפייה בחיות בר לפני שמגיעים החודשים הגשומים יותר, ואמין מספיק כדי לבנות סביבו טיולי יום.',
      ],
      rainHeading: 'כמה יורד גשם?',
      rainParagraph:
        'במרץ יורדים בממוצע כ-170 mm, עדיין בצד היבש יותר עבור החוף הזה. הימים חמימים ובהירים ברובם, עם ממטר קצר מדי פעם, בעיקר בשעות אחר הצהריים המאוחרות.',
      rainyDayIntro: 'אם עובר ממטר, יש הרבה מה לעשות:',
      rainyDayItems: [
        'טיילו בשביל החוף המישורי בפארק הלאומי קאוויטה',
        'צאו לסיור שוקולד (קקאו)',
        'צללו עם שנורקל או שחו בשעת אחר צהריים רגועה',
      ],
      crowdsHeading: 'עומס מבקרים, מחירים ואירועים',
      crowdsParagraph:
        'במרץ עדיין קיים ביקוש של עונת היובש, ולכן עומס המבקרים והמחירים בינוניים: קצת שקט יותר מפברואר אך עמוס יותר מהעונה הירוקה. בחלק מהשנים חג הפסחא חל בסוף מרץ ומביא גל מקומי.',
      stayRecommendationTitle: 'היכן להתאכסן בפוארטו ויאחו במרץ',
      verdictHeading: 'האם מרץ הוא זמן טוב לבקר?',
      verdictParagraph:
        'כן. חמים, יבש למדי ורב-תכליתי, מרץ מתאים גם לחובבי חוף וגם למטיילים, וזהו אחד החודשים האמינים יותר לטעימה מכל דבר.',
      hubLinkText: 'צפו במדריך מזג האוויר המלא חודש אחר חודש →',
      takeawaysHeading: 'נקודות עיקריות',
      takeawaysParagraph:
        'מרץ שומר על חלון היובש פתוח: חמים, יבש למדי ומצוין גם לחופים וגם לג\'ונגל. עומס המבקרים בינוני; שימו לב לחג הפסחא אם הוא חל בסוף החודש, וארזו לקראת ממטר אחר צהריים מזדמן.',
    },
    hi: {
      seoTitle: 'मार्च में प्यूर्टो विएहो का मौसम: जलवायु, बारिश और समुद्र',
      seoDescription:
        'मार्च में प्यूर्टो विएहो डे तालामांका गर्म और काफ़ी शुष्क रहता है क्योंकि शुष्क दौर जारी रहता है, समुद्र तटों, ट्रेक और जंगल के लिए बढ़िया। यहाँ जानिए क्या उम्मीद करें।',
      heading: 'मार्च में प्यूर्टो विएहो का मौसम',
      heroAlt: 'मार्च में प्यूर्टो विएहो डे तालामांका के कैरिबियन तट पर गर्म धूप वाला दिन',
      photoCredit: <>फ़ोटो: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'एक नज़र में मार्च',
      snapshot: [
        { label: 'तापमान', value: '28°C / 22°C' },
        { label: 'बारिश', value: '~170 mm, अब भी अपेक्षाकृत शुष्क' },
        { label: 'समुद्र', value: 'गर्म, आम तौर पर सुखद, ~28°C' },
        { label: 'भीड़', value: 'मध्यम, शुष्क मौसम की माँग' },
      ],
      whatItsLikeHeading: 'मार्च असल में कैसा होता है',
      whatItsLikeParagraphs: [
        'मार्च शुष्क दौर को जारी रखता है और गर्म तथा काफ़ी उजला बना रहता है। यह साल के गर्म महीनों में से एक है, भरपूर धूप और आरामदायक समुद्र तट वाले दिनों के साथ।',
        'यह लगभग हर तरह की योजना के लिए ठीक बैठता है: समुद्र तट के लिए अच्छा, अधिक नम महीनों के आने से पहले जंगल की ट्रेकिंग और वन्यजीव देखने के लिए आदर्श, और दिन-भर की सैर की योजना बनाने भर को भरोसेमंद।',
      ],
      rainHeading: 'कितनी बारिश होती है?',
      rainParagraph:
        'मार्च में औसतन लगभग 170 mm बारिश होती है, जो इस तट के लिहाज़ से अब भी अपेक्षाकृत शुष्क है। दिन ज़्यादातर गर्म और उजले रहते हैं, बीच-बीच में छोटी बौछारों के साथ, ख़ासकर दिन के बाद के हिस्से में।',
      rainyDayIntro: 'अगर कोई बौछार आ जाए, तो करने को बहुत कुछ है:',
      rainyDayItems: [
        'काहुइता नेशनल पार्क में समतल तटीय पगडंडी पर ट्रेक करें',
        'चॉकलेट (कोको) टूर लें',
        'किसी शांत दोपहर में स्नॉर्कलिंग करें या तैरें',
      ],
      crowdsHeading: 'भीड़, दाम और आयोजन',
      crowdsParagraph:
        'मार्च में अब भी शुष्क मौसम की माँग रहती है, इसलिए भीड़ और दाम बीच के रहते हैं: फ़रवरी से थोड़ा शांत पर हरित मौसम से अधिक व्यस्त। कुछ वर्षों में ईस्टर मार्च के अंत में पड़ सकता है और स्थानीय भीड़ बढ़ा देता है।',
      stayRecommendationTitle: 'मार्च में प्यूर्टो विएहो में कहाँ ठहरें',
      verdictHeading: 'क्या मार्च घूमने के लिए अच्छा समय है?',
      verdictParagraph:
        'हाँ। गर्म, काफ़ी शुष्क और बहुउद्देश्यीय, मार्च समुद्र तट प्रेमियों और ट्रेकर्स दोनों के लिए उपयुक्त है, और थोड़ा-थोड़ा सब कुछ करने के लिए यह अधिक भरोसेमंद महीनों में से एक है।',
      hubLinkText: 'महीने-दर-महीने पूरी मौसम गाइड देखें →',
      takeawaysHeading: 'मुख्य बातें',
      takeawaysParagraph:
        'मार्च शुष्क दौर को बनाए रखता है: गर्म, काफ़ी शुष्क और समुद्र तटों तथा जंगल दोनों के लिए बढ़िया। भीड़ मध्यम रहती है, अगर ईस्टर महीने के अंत में पड़े तो ध्यान रखें, और कभी-कभार की दोपहर की बौछार के लिए सामान रखें।',
    },
    nl: {
      seoTitle: 'Weer in Puerto Viejo in maart: klimaat, regen en zee',
      seoDescription:
        'Maart in Puerto Viejo de Talamanca blijft warm en vrij droog terwijl het droge venster aanhoudt, ideaal voor stranden, wandelingen en jungle. Dit kun je verwachten.',
      heading: 'Weer in Puerto Viejo in maart',
      heroAlt: 'Warme, zonnige dag aan de Caribische kust van Puerto Viejo de Talamanca in maart',
      photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Maart in het kort',
      snapshot: [
        { label: 'Temperatuur', value: '28°C / 22°C' },
        { label: 'Regen', value: '~170 mm, nog aan de drogere kant' },
        { label: 'Zee', value: 'Warm, over het algemeen aangenaam, ~28°C' },
        { label: 'Drukte', value: 'Matig, vraag in het droge seizoen' },
      ],
      whatItsLikeHeading: 'Hoe maart aanvoelt',
      whatItsLikeParagraphs: [
        'Maart houdt het droge venster open en blijft warm en vrij helder. Het is een van de warmere maanden van het jaar, met volop zon en aangename stranddagen.',
        'Het kan met bijna elk plan overweg: goed voor het strand, ideaal voor junglewandelingen en het spotten van dieren voordat de nattere maanden aanbreken, en betrouwbaar genoeg om dagtochten omheen te plannen.',
      ],
      rainHeading: 'Hoeveel regent het?',
      rainParagraph:
        'Maart telt gemiddeld zo\'n 170 mm, voor deze kust nog aan de drogere kant. De dagen zijn overwegend warm en helder, met af en toe een korte bui, vooral later op de dag.',
      rainyDayIntro: 'Als er een bui overtrekt, is er genoeg te doen:',
      rainyDayItems: [
        'Wandel het vlakke kustpad in Nationaal Park Cahuita',
        'Doe een chocolade- (cacao)tour',
        'Snorkel of zwem op een rustige middag',
      ],
      crowdsHeading: 'Drukte, prijzen en evenementen',
      crowdsParagraph:
        'Maart kent nog de vraag van het droge seizoen, dus drukte en prijzen zitten in het middenveld: iets rustiger dan februari maar drukker dan het groene seizoen. Pasen kan sommige jaren eind maart vallen en zorgt voor een lokale piek.',
      stayRecommendationTitle: 'Waar te overnachten in Puerto Viejo in maart',
      verdictHeading: 'Is maart een goede tijd om te bezoeken?',
      verdictParagraph:
        'Ja. Warm, vrij droog en veelzijdig, maart bevalt zowel strandliefhebbers als wandelaars, en het is een van de betrouwbaardere maanden voor van alles wat.',
      hubLinkText: 'Bekijk de volledige weergids maand voor maand →',
      takeawaysHeading: 'Belangrijkste punten',
      takeawaysParagraph:
        'Maart houdt het droge venster open: warm, vrij droog en geweldig voor zowel stranden als jungle. De drukte is matig, let op Pasen als het laat in de maand valt, en pak in voor de incidentele middagbui.',
    },
  },
  april: {
    en: {
      seoTitle: 'Weather in Puerto Viejo in April: climate, rain and sea',
      seoDescription:
        'April in Puerto Viejo de Talamanca is warm and lush as the dry window fades into greener days, with crowds thinning after Easter. Here is what to expect.',
      heading: 'Weather in Puerto Viejo in April',
      heroAlt: 'Lush warm Caribbean coast in Puerto Viejo de Talamanca in April',
      photoCredit: <>Photo: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'April at a glance',
      snapshot: [
        { label: 'Temperature', value: '29°C / 23°C' },
        { label: 'Rain', value: '~210 mm, rising into the green season' },
        { label: 'Sea', value: 'Warm, usually pleasant, ~28°C' },
        { label: 'Crowds', value: 'Busy over Easter, quieter after' },
      ],
      whatItsLikeHeading: 'What April is actually like',
      whatItsLikeParagraphs: [
        'April is a transition month, often the warmest of the year, with the dry window fading and the landscape turning lush and green. There is still plenty of sun, but showers start showing up a little more often.',
        'After Easter (which usually falls in April), the local crowds drop off and prices ease, so the second half of the month is a relaxed, warm time on the coast.',
      ],
      rainHeading: 'How much does it rain?',
      rainParagraph:
        'April averages around 210 mm as rainfall starts to build toward the green season. Mornings tend to be warm and bright, with a rising chance of showers in the afternoon or evening.',
      rainyDayIntro: 'When a shower comes through, you are well covered:',
      rainyDayItems: [
        'Take a cacao and chocolate tour',
        'Explore Cahuita National Park as the jungle greens up',
        'Relax in a Caribbean café in town',
      ],
      crowdsHeading: 'Crowds, prices and events',
      crowdsParagraph:
        'Easter (Semana Santa) is one of the busiest local travel weeks of the year, so early April can be crowded and pricier. Once it passes, both crowds and rates drop noticeably.',
      stayRecommendationTitle: 'Where to stay in Puerto Viejo in April',
      verdictHeading: 'Is April a good time to visit?',
      verdictParagraph:
        'Yes, especially after Easter. The weather is warm, lush and still fairly bright, crowds thin out and prices ease, a nice balance before the wetter months set in.',
      hubLinkText: 'See the full month-by-month weather guide →',
      takeawaysHeading: 'Key takeaways',
      takeawaysParagraph:
        'April is warm and lush, a transition from dry to green season with rising showers. Skip the Easter crowds if you can, aim for the second half of the month, and pack for warm days with the odd afternoon downpour.',
    },
    es: {
      seoTitle: 'El clima en Puerto Viejo en abril: tiempo, lluvia y mar',
      seoDescription:
        'Abril en Puerto Viejo de Talamanca es cálido y frondoso mientras la ventana seca da paso a días más verdes, con menos gente tras la Semana Santa. Esto es lo que puedes esperar.',
      heading: 'El clima en Puerto Viejo en abril',
      heroAlt: 'Costa caribeña cálida y frondosa en Puerto Viejo de Talamanca en abril',
      photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Abril de un vistazo',
      snapshot: [
        { label: 'Temperatura', value: '29°C / 23°C' },
        { label: 'Lluvia', value: '~210 mm, subiendo hacia la temporada verde' },
        { label: 'Mar', value: 'Cálido, normalmente agradable, ~28°C' },
        { label: 'Afluencia', value: 'Alta en Semana Santa, más tranquila después' },
      ],
      whatItsLikeHeading: 'Cómo es abril en realidad',
      whatItsLikeParagraphs: [
        'Abril es un mes de transición, a menudo el más cálido del año, con la ventana seca desvaneciéndose y el paisaje volviéndose frondoso y verde. Todavía hay mucho sol, pero los aguaceros empiezan a asomar algo más seguido.',
        'Tras la Semana Santa (que suele caer en abril), la afluencia local baja y los precios ceden, así que la segunda mitad del mes es un momento relajado y cálido en la costa.',
      ],
      rainHeading: '¿Cuánto llueve?',
      rainParagraph:
        'Abril promedia unos 210 mm a medida que la lluvia empieza a aumentar hacia la temporada verde. Las mañanas suelen ser cálidas y luminosas, con una probabilidad creciente de aguaceros por la tarde o la noche.',
      rainyDayIntro: 'Cuando llega un aguacero, tienes muchas opciones:',
      rainyDayItems: [
        'Haz un tour de cacao y chocolate',
        'Recorre el Parque Nacional Cahuita mientras reverdece la selva',
        'Relájate en un café caribeño del pueblo',
      ],
      crowdsHeading: 'Afluencia, precios y eventos',
      crowdsParagraph:
        'La Semana Santa es una de las semanas de viaje local más concurridas del año, así que principios de abril puede estar lleno y más caro. Una vez que pasa, tanto la afluencia como las tarifas bajan notablemente.',
      stayRecommendationTitle: 'Dónde hospedarte en Puerto Viejo en abril',
      verdictHeading: '¿Es abril una buena época para visitar?',
      verdictParagraph:
        'Sí, sobre todo tras la Semana Santa. El clima es cálido, frondoso y todavía bastante luminoso, la gente disminuye y los precios ceden, un buen equilibrio antes de que lleguen los meses más húmedos.',
      hubLinkText: 'Ver la guía completa del clima mes a mes →',
      takeawaysHeading: 'Puntos clave',
      takeawaysParagraph:
        'Abril es cálido y frondoso, una transición de la temporada seca a la verde con aguaceros en aumento. Evita la multitud de Semana Santa si puedes, apunta a la segunda mitad del mes y lleva algo para días cálidos con algún aguacero de tarde.',
    },
    de: {
      seoTitle: 'Wetter in Puerto Viejo im April: Klima, Regen und Meer',
      seoDescription:
        'Der April in Puerto Viejo de Talamanca ist warm und üppig, wenn das trockene Fenster in grünere Tage übergeht und die Besucherzahlen nach Ostern zurückgehen. Das können Sie erwarten.',
      heading: 'Wetter in Puerto Viejo im April',
      heroAlt: 'Üppige, warme Karibikküste in Puerto Viejo de Talamanca im April',
      photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Der April auf einen Blick',
      snapshot: [
        { label: 'Temperatur', value: '29°C / 23°C' },
        { label: 'Regen', value: '~210 mm, steigend zur grünen Saison' },
        { label: 'Meer', value: 'Warm, meist angenehm, ~28°C' },
        { label: 'Andrang', value: 'Voll über Ostern, ruhiger danach' },
      ],
      whatItsLikeHeading: 'Wie der April tatsächlich ist',
      whatItsLikeParagraphs: [
        'Der April ist ein Übergangsmonat, oft der wärmste des Jahres, wenn das trockene Fenster ausklingt und die Landschaft üppig und grün wird. Es gibt weiterhin viel Sonne, aber Schauer tauchen etwas häufiger auf.',
        'Nach Ostern (das meist in den April fällt) lässt der lokale Andrang nach und die Preise geben nach, sodass die zweite Monatshälfte eine entspannte, warme Zeit an der Küste ist.',
      ],
      rainHeading: 'Wie viel regnet es?',
      rainParagraph:
        'Im April fallen durchschnittlich rund 210 mm, da der Regen zur grünen Saison hin zunimmt. Die Morgenstunden sind meist warm und hell, mit einer steigenden Wahrscheinlichkeit von Schauern am Nachmittag oder Abend.',
      rainyDayIntro: 'Wenn ein Schauer durchzieht, sind Sie bestens versorgt:',
      rainyDayItems: [
        'Machen Sie eine Kakao- und Schokoladentour',
        'Erkunden Sie den Cahuita-Nationalpark, während der Dschungel ergrünt',
        'Entspannen Sie in einem karibischen Café im Ort',
      ],
      crowdsHeading: 'Andrang, Preise und Veranstaltungen',
      crowdsParagraph:
        'Ostern (Semana Santa) ist eine der geschäftigsten lokalen Reisewochen des Jahres, daher kann es Anfang April voll und teurer sein. Sobald es vorbei ist, sinken sowohl der Andrang als auch die Preise deutlich.',
      stayRecommendationTitle: 'Wo Sie im April in Puerto Viejo übernachten',
      verdictHeading: 'Ist der April eine gute Reisezeit?',
      verdictParagraph:
        'Ja, besonders nach Ostern. Das Wetter ist warm, üppig und noch recht hell, der Andrang lässt nach und die Preise geben nach, eine schöne Balance, bevor die feuchteren Monate einsetzen.',
      hubLinkText: 'Zum vollständigen Monat-für-Monat-Wetterführer →',
      takeawaysHeading: 'Das Wichtigste in Kürze',
      takeawaysParagraph:
        'Der April ist warm und üppig, ein Übergang von der Trocken- zur grünen Saison mit zunehmenden Schauern. Meiden Sie nach Möglichkeit den Oster-Andrang, zielen Sie auf die zweite Monatshälfte und packen Sie für warme Tage mit gelegentlichem Nachmittagsguss.',
    },
    fr: {
      seoTitle: 'Météo à Puerto Viejo en avril : climat, pluie et mer',
      seoDescription:
        'En avril, Puerto Viejo de Talamanca est chaud et luxuriant, tandis que la fenêtre sèche cède la place à des jours plus verts et que l\'affluence diminue après Pâques. Voici à quoi vous attendre.',
      heading: 'Météo à Puerto Viejo en avril',
      heroAlt: 'Côte caribéenne chaude et luxuriante à Puerto Viejo de Talamanca en avril',
      photoCredit: <>Photo : <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Aperçu du mois d\'avril',
      snapshot: [
        { label: 'Température', value: '29°C / 23°C' },
        { label: 'Pluie', value: '~210 mm, en hausse vers la saison verte' },
        { label: 'Mer', value: 'Chaude, généralement agréable, ~28°C' },
        { label: 'Affluence', value: 'Forte pendant Pâques, plus calme ensuite' },
      ],
      whatItsLikeHeading: 'À quoi ressemble avril',
      whatItsLikeParagraphs: [
        'Avril est un mois de transition, souvent le plus chaud de l\'année, la fenêtre sèche s\'estompant et le paysage devenant luxuriant et vert. Vous profitez encore de beaucoup de soleil, mais les averses commencent à passer un peu plus souvent.',
        'Après Pâques (qui tombe généralement en avril), l\'affluence locale diminue et les prix se détendent, si bien que la seconde moitié du mois est un moment détendu et chaud sur la côte.',
      ],
      rainHeading: 'Combien pleut-il ?',
      rainParagraph:
        'Avril reçoit en moyenne environ 210 mm, à mesure que les pluies commencent à s\'intensifier vers la saison verte. Les matinées sont plutôt chaudes et lumineuses, avec une probabilité croissante d\'averses l\'après-midi ou le soir.',
      rainyDayIntro: 'Quand une averse passe, vous avez de quoi faire :',
      rainyDayItems: [
        'Faites un tour du cacao et du chocolat',
        'Explorez le parc national Cahuita tandis que la jungle reverdit',
        'Détendez-vous dans un café caribéen en ville',
      ],
      crowdsHeading: 'Affluence, prix et événements',
      crowdsParagraph:
        'Pâques (Semana Santa) est l\'une des semaines de voyage locales les plus fréquentées de l\'année, donc le début avril peut être bondé et plus cher. Une fois passée, l\'affluence comme les tarifs baissent nettement.',
      stayRecommendationTitle: 'Où loger à Puerto Viejo en avril',
      verdictHeading: 'Avril est-il une bonne période pour visiter ?',
      verdictParagraph:
        'Oui, surtout après Pâques. Le temps est chaud, luxuriant et encore assez lumineux, l\'affluence baisse et les prix se détendent, un bel équilibre avant les mois plus humides.',
      hubLinkText: 'Voir le guide météo complet mois par mois →',
      takeawaysHeading: 'À retenir',
      takeawaysParagraph:
        'Avril est chaud et luxuriant, une transition de la saison sèche à la saison verte avec des averses en hausse. Évitez la foule de Pâques si vous le pouvez, visez la seconde moitié du mois et prévoyez des tenues pour des journées chaudes avec quelques averses l\'après-midi.',
    },
    it: {
      seoTitle: 'Meteo a Puerto Viejo ad aprile: clima, pioggia e mare',
      seoDescription:
        'Ad aprile Puerto Viejo de Talamanca è caldo e rigoglioso, mentre la finestra secca lascia spazio a giornate più verdi e l\'affluenza cala dopo Pasqua. Ecco cosa aspettarti.',
      heading: 'Meteo a Puerto Viejo ad aprile',
      heroAlt: 'Costa caraibica calda e rigogliosa a Puerto Viejo de Talamanca ad aprile',
      photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Aprile in breve',
      snapshot: [
        { label: 'Temperatura', value: '29°C / 23°C' },
        { label: 'Pioggia', value: '~210 mm, in aumento verso la stagione verde' },
        { label: 'Mare', value: 'Caldo, di solito piacevole, ~28°C' },
        { label: 'Affluenza', value: 'Alta durante Pasqua, più tranquilla dopo' },
      ],
      whatItsLikeHeading: 'Com\'è aprile in realtà',
      whatItsLikeParagraphs: [
        'Aprile è un mese di transizione, spesso il più caldo dell\'anno, con la finestra secca che sfuma e il paesaggio che si fa rigoglioso e verde. C\'è ancora molto sole, ma gli acquazzoni iniziano a comparire un po\' più spesso.',
        'Dopo Pasqua (che di solito cade ad aprile), l\'affluenza locale diminuisce e i prezzi si allentano, così la seconda metà del mese è un periodo rilassato e caldo sulla costa.',
      ],
      rainHeading: 'Quanto piove?',
      rainParagraph:
        'Ad aprile cadono in media circa 210 mm, mentre la pioggia inizia a crescere verso la stagione verde. Le mattine sono di solito calde e luminose, con una probabilità crescente di acquazzoni nel pomeriggio o alla sera.',
      rainyDayIntro: 'Quando arriva un acquazzone, hai molte opzioni:',
      rainyDayItems: [
        'Fai un tour del cacao e del cioccolato',
        'Esplora il Parco Nazionale Cahuita mentre la giungla rinverdisce',
        'Rilassati in un caffè caraibico in paese',
      ],
      crowdsHeading: 'Affluenza, prezzi ed eventi',
      crowdsParagraph:
        'La Pasqua (Semana Santa) è una delle settimane di viaggio locali più affollate dell\'anno, quindi l\'inizio di aprile può essere affollato e più caro. Una volta passata, sia l\'affluenza sia le tariffe calano sensibilmente.',
      stayRecommendationTitle: 'Dove alloggiare a Puerto Viejo ad aprile',
      verdictHeading: 'Aprile è un buon periodo per visitare?',
      verdictParagraph:
        'Sì, soprattutto dopo Pasqua. Il clima è caldo, rigoglioso e ancora piuttosto luminoso, l\'affluenza cala e i prezzi scendono, un bell\'equilibrio prima dei mesi più piovosi.',
      hubLinkText: 'Guarda la guida meteo completa mese per mese →',
      takeawaysHeading: 'Punti chiave',
      takeawaysParagraph:
        'Aprile è caldo e rigoglioso, una transizione dalla stagione secca a quella verde con acquazzoni in aumento. Evita la folla di Pasqua se puoi, punta alla seconda metà del mese e prepara l\'abbigliamento per giornate calde con qualche acquazzone pomeridiano.',
    },
    pt: {
      seoTitle: 'Clima em Puerto Viejo em abril: tempo, chuva e mar',
      seoDescription:
        'Abril em Puerto Viejo de Talamanca é quente e exuberante, à medida que a janela seca dá lugar a dias mais verdes e o movimento diminui depois da Páscoa. Veja o que esperar.',
      heading: 'Clima em Puerto Viejo em abril',
      heroAlt: 'Costa caribenha quente e exuberante em Puerto Viejo de Talamanca em abril',
      photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Abril num relance',
      snapshot: [
        { label: 'Temperatura', value: '29°C / 23°C' },
        { label: 'Chuva', value: '~210 mm, subindo rumo à estação verde' },
        { label: 'Mar', value: 'Quente, geralmente agradável, ~28°C' },
        { label: 'Movimento', value: 'Cheio na Páscoa, mais calmo depois' },
      ],
      whatItsLikeHeading: 'Como abril é de fato',
      whatItsLikeParagraphs: [
        'Abril é um mês de transição, muitas vezes o mais quente do ano, com a janela seca se dissipando e a paisagem ficando exuberante e verde. Ainda há bastante sol, mas as pancadas de chuva começam a aparecer um pouco mais vezes.',
        'Depois da Páscoa (que costuma cair em abril), o movimento local cai e os preços aliviam, então a segunda metade do mês é um período tranquilo e quente na costa.',
      ],
      rainHeading: 'Quanto chove?',
      rainParagraph:
        'Abril tem em média cerca de 210 mm, à medida que a chuva começa a aumentar rumo à estação verde. As manhãs costumam ser quentes e claras, com uma chance crescente de pancadas de chuva à tarde ou à noite.',
      rainyDayIntro: 'Quando cai uma pancada de chuva, você tem muitas opções:',
      rainyDayItems: [
        'Faça um tour de cacau e chocolate',
        'Explore o Parque Nacional Cahuita enquanto a selva reverdece',
        'Relaxe num café caribenho na vila',
      ],
      crowdsHeading: 'Movimento, preços e eventos',
      crowdsParagraph:
        'A Páscoa (Semana Santa) é uma das semanas de viagem local mais movimentadas do ano, então o início de abril pode ficar cheio e mais caro. Quando ela passa, tanto o movimento quanto as tarifas caem visivelmente.',
      stayRecommendationTitle: 'Onde ficar em Puerto Viejo em abril',
      verdictHeading: 'Abril é uma boa época para visitar?',
      verdictParagraph:
        'Sim, especialmente depois da Páscoa. O clima é quente, exuberante e ainda bastante claro, o movimento diminui e os preços aliviam, um bom equilíbrio antes dos meses mais chuvosos.',
      hubLinkText: 'Veja o guia completo de clima mês a mês →',
      takeawaysHeading: 'Pontos principais',
      takeawaysParagraph:
        'Abril é quente e exuberante, uma transição da estação seca para a verde com pancadas de chuva em alta. Evite a multidão da Páscoa se puder, mire na segunda metade do mês e leve roupas para dias quentes com uma ou outra pancada à tarde.',
    },
    he: {
      seoTitle: 'מזג האוויר בפוארטו ויאחו באפריל: אקלים, גשם וים',
      seoDescription:
        'אפריל בפוארטו ויאחו דה טלמנקה חם ושופע ירק, כשחלון היובש מפנה מקום לימים ירוקים יותר והצפיפות פוחתת אחרי חג הפסחא. הנה למה לצפות.',
      heading: 'מזג האוויר בפוארטו ויאחו באפריל',
      heroAlt: 'חוף קריבי חם ושופע ירק בפוארטו ויאחו דה טלמנקה באפריל',
      photoCredit: <>צילום: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'אפריל במבט מהיר',
      snapshot: [
        { label: 'טמפרטורה', value: '29°C / 23°C' },
        { label: 'גשם', value: '~210 מ"מ, בעלייה לקראת העונה הירוקה' },
        { label: 'ים', value: 'חם, בדרך כלל נעים, ~28°C' },
        { label: 'צפיפות', value: 'עמוס בחג הפסחא, רגוע יותר אחריו' },
      ],
      whatItsLikeHeading: 'איך נראה אפריל בפועל',
      whatItsLikeParagraphs: [
        'אפריל הוא חודש מעבר, לרוב החם ביותר בשנה, כשחלון היובש דועך והנוף הופך שופע וירוק. עדיין יש שמש רבה, אבל ממטרים מתחילים להופיע מעט תכופים יותר.',
        'אחרי חג הפסחא (שנופל בדרך כלל באפריל), הצפיפות המקומית יורדת והמחירים מתמתנים, כך שהמחצית השנייה של החודש היא זמן רגוע וחם על החוף.',
      ],
      rainHeading: 'כמה יורד גשם?',
      rainParagraph:
        'באפריל יורדים בממוצע כ-210 מ"מ, כשהגשם מתחיל להתגבר לקראת העונה הירוקה. הבקרים חמים ובהירים בדרך כלל, עם סיכוי הולך וגובר לממטרים אחר הצהריים או בערב.',
      rainyDayIntro: 'כשממטר עובר, יש לכם שפע אפשרויות:',
      rainyDayItems: [
        'צאו לסיור קקאו ושוקולד',
        'טיילו בפארק הלאומי Cahuita בזמן שיער הגשם מוריק',
        'הירגעו בבית קפה קריבי בכפר',
      ],
      crowdsHeading: 'צפיפות, מחירים ואירועים',
      crowdsParagraph:
        'חג הפסחא (Semana Santa) הוא אחד משבועות הנסיעה המקומיים העמוסים ביותר בשנה, ולכן תחילת אפריל עשויה להיות עמוסה ויקרה יותר. לאחר שהוא חולף, גם הצפיפות וגם המחירים יורדים במידה ניכרת.',
      stayRecommendationTitle: 'היכן להתארח בפוארטו ויאחו באפריל',
      verdictHeading: 'האם אפריל הוא זמן טוב לביקור?',
      verdictParagraph:
        'כן, במיוחד אחרי חג הפסחא. מזג האוויר חם, שופע ירק ועדיין בהיר למדי, הצפיפות פוחתת והמחירים מתמתנים, איזון נעים לפני החודשים הגשומים יותר.',
      hubLinkText: 'צפו במדריך מזג האוויר המלא חודש אחר חודש →',
      takeawaysHeading: 'נקודות עיקריות',
      takeawaysParagraph:
        'אפריל חם ושופע ירק, מעבר מהעונה היבשה לירוקה עם ממטרים הולכים וגוברים. הימנעו מעומס חג הפסחא אם אפשר, כוונו למחצית השנייה של החודש וארזו לימים חמים עם ממטר מזדמן אחר הצהריים.',
    },
    hi: {
      seoTitle: 'अप्रैल में प्वेर्तो विएखो का मौसम: जलवायु, वर्षा और समुद्र',
      seoDescription:
        'अप्रैल में प्वेर्तो विएखो दे तालामांका गर्म और हरा-भरा रहता है, जब शुष्क मौसम हरियाली भरे दिनों में बदलता है और ईस्टर के बाद भीड़ कम हो जाती है। यहाँ जानिए क्या उम्मीद करें।',
      heading: 'अप्रैल में प्वेर्तो विएखो का मौसम',
      heroAlt: 'अप्रैल में प्वेर्तो विएखो दे तालामांका में हरा-भरा, गर्म कैरिबियन तट',
      photoCredit: <>फ़ोटो: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'एक नज़र में अप्रैल',
      snapshot: [
        { label: 'तापमान', value: '29°C / 23°C' },
        { label: 'वर्षा', value: '~210 mm, हरे मौसम की ओर बढ़ती हुई' },
        { label: 'समुद्र', value: 'गर्म, आमतौर पर सुखद, ~28°C' },
        { label: 'भीड़', value: 'ईस्टर पर अधिक, बाद में शांत' },
      ],
      whatItsLikeHeading: 'अप्रैल असल में कैसा होता है',
      whatItsLikeParagraphs: [
        'अप्रैल एक संक्रमण का महीना है, अक्सर साल का सबसे गर्म, जब शुष्क मौसम फीका पड़ता है और परिदृश्य हरा-भरा और हरियाली से भर जाता है। धूप अब भी भरपूर रहती है, पर बौछारें थोड़ी अधिक बार आने लगती हैं।',
        'ईस्टर (जो आमतौर पर अप्रैल में पड़ता है) के बाद स्थानीय भीड़ घट जाती है और दाम कम हो जाते हैं, जिससे महीने का दूसरा भाग तट पर एक आरामदेह, गर्म समय बन जाता है।',
      ],
      rainHeading: 'कितनी वर्षा होती है?',
      rainParagraph:
        'अप्रैल में औसतन लगभग 210 mm वर्षा होती है, क्योंकि हरे मौसम की ओर बारिश बढ़ने लगती है। सुबहें ज़्यादातर गर्म और चमकीली रहती हैं, जिनमें दोपहर या शाम को बौछारों की संभावना बढ़ती जाती है।',
      rainyDayIntro: 'जब बौछार आती है, तब भी आपके पास भरपूर विकल्प हैं:',
      rainyDayItems: [
        'कोको और चॉकलेट टूर करें',
        'Cahuita राष्ट्रीय उद्यान घूमें, जब जंगल हरा-भरा हो रहा हो',
        'गाँव के किसी कैरिबियन कैफ़े में आराम करें',
      ],
      crowdsHeading: 'भीड़, दाम और आयोजन',
      crowdsParagraph:
        'ईस्टर (Semana Santa) साल के सबसे व्यस्त स्थानीय यात्रा सप्ताहों में से एक है, इसलिए अप्रैल की शुरुआत में भीड़ और दाम अधिक हो सकते हैं। ईस्टर के बीत जाने के बाद भीड़ और दरें दोनों काफ़ी घट जाती हैं।',
      stayRecommendationTitle: 'अप्रैल में प्वेर्तो विएखो में कहाँ ठहरें',
      verdictHeading: 'क्या अप्रैल घूमने का अच्छा समय है?',
      verdictParagraph:
        'हाँ, खासकर ईस्टर के बाद। मौसम गर्म, हरा-भरा और अब भी काफ़ी चमकीला रहता है, भीड़ कम होती जाती है और दाम घटते हैं, अधिक नम महीनों से पहले एक सुखद संतुलन।',
      hubLinkText: 'महीने-दर-महीने पूरा मौसम गाइड देखें →',
      takeawaysHeading: 'मुख्य बातें',
      takeawaysParagraph:
        'अप्रैल गर्म और हरा-भरा होता है, शुष्क से हरे मौसम की ओर एक संक्रमण, जिसमें बौछारें बढ़ती जाती हैं। हो सके तो ईस्टर की भीड़ से बचें, महीने के दूसरे भाग को चुनें और गर्म दिनों के लिए सामान रखें, जिनमें कभी-कभी दोपहर की तेज़ बौछार आ सकती है।',
    },
    nl: {
      seoTitle: 'Weer in Puerto Viejo in april: klimaat, regen en zee',
      seoDescription:
        'April in Puerto Viejo de Talamanca is warm en weelderig, terwijl het droge venster overgaat in groenere dagen en de drukte na Pasen afneemt. Dit kun je verwachten.',
      heading: 'Weer in Puerto Viejo in april',
      heroAlt: 'Weelderige, warme Caribische kust in Puerto Viejo de Talamanca in april',
      photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'April in een oogopslag',
      snapshot: [
        { label: 'Temperatuur', value: '29°C / 23°C' },
        { label: 'Regen', value: '~210 mm, stijgend richting het groene seizoen' },
        { label: 'Zee', value: 'Warm, meestal aangenaam, ~28°C' },
        { label: 'Drukte', value: 'Druk rond Pasen, rustiger daarna' },
      ],
      whatItsLikeHeading: 'Hoe april aanvoelt',
      whatItsLikeParagraphs: [
        'April is een overgangsmaand, vaak de warmste van het jaar, terwijl het droge venster vervaagt en het landschap weelderig en groen wordt. Er is nog volop zon, maar buien komen iets vaker langs.',
        'Na Pasen (dat meestal in april valt) neemt de lokale drukte af en dalen de prijzen, waardoor de tweede helft van de maand een ontspannen, warme tijd aan de kust is.',
      ],
      rainHeading: 'Hoeveel regent het?',
      rainParagraph:
        'April kent gemiddeld zo\'n 210 mm, terwijl de regen begint toe te nemen richting het groene seizoen. De ochtenden zijn meestal warm en helder, met een groeiende kans op buien in de middag of avond.',
      rainyDayIntro: 'Als er een bui overtrekt, zit je goed:',
      rainyDayItems: [
        'Doe een cacao- en chocoladetour',
        'Verken Nationaal Park Cahuita terwijl de jungle opgroent',
        'Ontspan in een Caribisch café in het dorp',
      ],
      crowdsHeading: 'Drukte, prijzen en evenementen',
      crowdsParagraph:
        'Pasen (Semana Santa) is een van de drukste lokale reisweken van het jaar, dus begin april kan druk en duurder zijn. Zodra het voorbij is, dalen zowel de drukte als de tarieven merkbaar.',
      stayRecommendationTitle: 'Waar te verblijven in Puerto Viejo in april',
      verdictHeading: 'Is april een goede tijd om te bezoeken?',
      verdictParagraph:
        'Ja, vooral na Pasen. Het weer is warm, weelderig en nog vrij helder, de drukte neemt af en de prijzen dalen, een mooie balans vóór de nattere maanden.',
      hubLinkText: 'Bekijk de volledige weergids maand voor maand →',
      takeawaysHeading: 'Belangrijkste punten',
      takeawaysParagraph:
        'April is warm en weelderig, een overgang van het droge naar het groene seizoen met toenemende buien. Vermijd de Pasen-drukte als je kunt, mik op de tweede helft van de maand en pak in voor warme dagen met af en toe een middagbui.',
    },
  },
  may: {
    en: {
      seoTitle: 'Weather in Puerto Viejo in May: climate, rain and sea',
      seoDescription:
        'May in Puerto Viejo de Talamanca opens the green season, with a deep-green jungle, afternoon showers, plenty of wildlife and low prices. Here is what to expect.',
      heading: 'Weather in Puerto Viejo in May',
      heroAlt: 'Green rainy-season jungle in Puerto Viejo de Talamanca in May',
      photoCredit: <>Photo: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'May at a glance',
      snapshot: [
        { label: 'Temperature', value: '28°C / 23°C' },
        { label: 'Rain', value: '~300 mm, green season begins' },
        { label: 'Sea', value: 'Variable, warm, ~28°C' },
        { label: 'Crowds', value: 'Low, good value' },
      ],
      whatItsLikeHeading: 'What May is actually like',
      whatItsLikeParagraphs: [
        'May opens the green season on the Caribbean coast. The rain picks up, usually as warm afternoon showers, and the jungle turns a deep, living green.',
        'Mornings are often bright and good for the beach, and the wetter weather tends to hold off until later in the day. Crowds are thin and prices are low, so it is a good month for nature lovers who do not mind getting rained on.',
      ],
      rainHeading: 'How much does it rain?',
      rainParagraph:
        'May averages around 300 mm. It usually falls as afternoon or evening downpours rather than all-day drizzle, so you can still build your plans around bright mornings.',
      rainyDayIntro: 'The rain is when the jungle trips come into their own:',
      rainyDayItems: [
        'Take a cacao and chocolate tour, which is lovely in the rain',
        'Look for wildlife in a green, dripping Cahuita National Park',
        'Visit a Bribri Indigenous community',
      ],
      crowdsHeading: 'Crowds, prices and events',
      crowdsParagraph:
        'May is low season, so there are few people about and prices sit among the lowest of the year. It is good value if you are happy to work around the afternoon showers.',
      stayRecommendationTitle: 'Where to stay in Puerto Viejo in May',
      verdictHeading: 'Is May a good time to visit?',
      verdictParagraph:
        'Yes, if you like things green, quiet and cheap. You give up some guaranteed beach time in exchange for a lush landscape, busy wildlife and low prices, and the mornings are often bright anyway.',
      hubLinkText: 'See the full month-by-month weather guide →',
      takeawaysHeading: 'Key takeaways',
      takeawaysParagraph:
        'May kicks off the green season, with a lush jungle, warm afternoon showers, busy wildlife and low prices. Plan around the bright mornings and bring a rain jacket; it is one of the greenest and best-value times to come.',
    },
    es: {
      seoTitle: 'El clima en Puerto Viejo en mayo: tiempo, lluvia y mar',
      seoDescription:
        'Mayo en Puerto Viejo de Talamanca abre la temporada verde, con una selva de un verde intenso, aguaceros por la tarde, mucha fauna y precios bajos. Esto es lo que puedes esperar.',
      heading: 'El clima en Puerto Viejo en mayo',
      heroAlt: 'Selva verde de temporada lluviosa en Puerto Viejo de Talamanca en mayo',
      photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Mayo de un vistazo',
      snapshot: [
        { label: 'Temperatura', value: '28°C / 23°C' },
        { label: 'Lluvia', value: '~300 mm, comienza la temporada verde' },
        { label: 'Mar', value: 'Variable, cálido, ~28°C' },
        { label: 'Afluencia', value: 'Baja, buena relación calidad-precio' },
      ],
      whatItsLikeHeading: 'Cómo es mayo en realidad',
      whatItsLikeParagraphs: [
        'Mayo abre la temporada verde en el Caribe. La lluvia aumenta, casi siempre en forma de aguaceros cálidos por la tarde, y la selva se pone de un verde intenso y llena de vida.',
        'Las mañanas suelen ser luminosas y buenas para la playa, y lo más húmedo llega más entrada la jornada. Hay poca gente y los precios son bajos, así que es un buen mes para los amantes de la naturaleza a los que no les asusta mojarse.',
      ],
      rainHeading: '¿Cuánto llueve?',
      rainParagraph:
        'Mayo ronda los 300 mm. Suele caer en aguaceros de tarde o de noche, y no como lluvia de todo el día, así que puedes organizarte en torno a las mañanas luminosas.',
      rainyDayIntro: 'Con lluvia es cuando las excursiones por la selva lucen mejor:',
      rainyDayItems: [
        'Haz un tour de cacao y chocolate, estupendo bajo la lluvia',
        'Busca fauna en un Parque Nacional Cahuita verde y goteante',
        'Visita una comunidad indígena Bribri',
      ],
      crowdsHeading: 'Afluencia, precios y eventos',
      crowdsParagraph:
        'Mayo es temporada baja, así que hay poca gente y los precios están entre los más bajos del año. Sale muy a cuenta si no te importa organizarte alrededor de los aguaceros de la tarde.',
      stayRecommendationTitle: 'Dónde hospedarte en Puerto Viejo en mayo',
      verdictHeading: '¿Es mayo una buena época para visitar?',
      verdictParagraph:
        'Sí, si te gusta lo verde, lo tranquilo y lo barato. Renuncias a algo de playa garantizada a cambio de un paisaje frondoso, fauna activa y precios bajos, y aun así las mañanas suelen amanecer luminosas.',
      hubLinkText: 'Ver la guía completa del clima mes a mes →',
      takeawaysHeading: 'Puntos clave',
      takeawaysParagraph:
        'Mayo arranca la temporada verde, con selva frondosa, aguaceros cálidos por la tarde, fauna activa y precios bajos. Organízate alrededor de las mañanas luminosas y lleva un chubasquero; es una de las épocas más verdes y económicas para venir.',
    },
    de: {
      seoTitle: 'Wetter in Puerto Viejo im Mai: Klima, Regen und Meer',
      seoDescription:
        'Der Mai in Puerto Viejo de Talamanca eröffnet die grüne Saison, mit tiefgrünem Dschungel, nachmittäglichen Schauern, viel Tierwelt und niedrigen Preisen. Das erwartet dich.',
      heading: 'Wetter in Puerto Viejo im Mai',
      heroAlt: 'Grüner Regenzeit-Dschungel in Puerto Viejo de Talamanca im Mai',
      photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Der Mai auf einen Blick',
      snapshot: [
        { label: 'Temperatur', value: '28°C / 23°C' },
        { label: 'Regen', value: '~300 mm, die grüne Saison beginnt' },
        { label: 'Meer', value: 'Wechselhaft, warm, ~28°C' },
        { label: 'Andrang', value: 'Niedrig, gutes Preis-Leistungs-Verhältnis' },
      ],
      whatItsLikeHeading: 'Wie sich der Mai anfühlt',
      whatItsLikeParagraphs: [
        'Der Mai eröffnet die grüne Saison an der Karibikküste. Der Regen nimmt zu, meist als warme Nachmittagsschauer, und der Dschungel färbt sich sattgrün und steckt voller Leben.',
        'Die Morgen sind oft hell und gut für den Strand, und das feuchtere Wetter setzt meist erst später am Tag ein. Es ist wenig los und die Preise sind niedrig, ein guter Monat für Naturliebhaber, denen etwas Regen nichts ausmacht.',
      ],
      rainHeading: 'Wie viel regnet es?',
      rainParagraph:
        'Der Mai bringt im Schnitt rund 300 mm. Der Regen kommt meist als nachmittäglicher oder abendlicher Guss und nicht als Dauerregen, sodass du deine Pläne um die hellen Morgen legen kannst.',
      rainyDayIntro: 'Bei Regen kommen die Ausflüge in den Dschungel erst richtig zur Geltung:',
      rainyDayItems: [
        'Mach eine Kakao- und Schokoladentour, schön bei Regen',
        'Halte im grünen, tropfnassen Cahuita-Nationalpark nach Tieren Ausschau',
        'Besuche eine indigene Bribri-Gemeinschaft',
      ],
      crowdsHeading: 'Andrang, Preise und Events',
      crowdsParagraph:
        'Der Mai ist Nebensaison, daher ist wenig los und die Preise gehören zu den niedrigsten des Jahres. Das Preis-Leistungs-Verhältnis stimmt, wenn es dir nichts ausmacht, dich um die Nachmittagsschauer herum zu organisieren.',
      stayRecommendationTitle: 'Wo du im Mai in Puerto Viejo übernachtest',
      verdictHeading: 'Ist der Mai eine gute Reisezeit?',
      verdictParagraph:
        'Ja, wenn du Grün, Ruhe und ein gutes Preis-Leistungs-Verhältnis magst. Du gibst etwas garantierte Strandzeit auf und bekommst dafür eine üppige Landschaft, aktive Tierwelt und niedrige Preise; helle Morgen sind trotzdem oft dabei.',
      hubLinkText: 'Zum vollständigen Monat-für-Monat-Wetterguide →',
      takeawaysHeading: 'Das Wichtigste in Kürze',
      takeawaysParagraph:
        'Der Mai startet die grüne Saison, mit üppigem Dschungel, warmen Nachmittagsschauern, aktiver Tierwelt und niedrigen Preisen. Plane rund um die hellen Morgen und pack eine Regenjacke ein; es ist eine der grünsten und günstigsten Reisezeiten.',
    },
    fr: {
      seoTitle: 'Météo à Puerto Viejo en mai : climat, pluie et mer',
      seoDescription:
        'En mai, Puerto Viejo de Talamanca ouvre la saison verte, avec une jungle d\'un vert profond, des averses l\'après-midi, une belle faune et des prix bas. Voici à quoi vous attendre.',
      heading: 'Météo à Puerto Viejo en mai',
      heroAlt: 'Jungle verdoyante de saison des pluies à Puerto Viejo de Talamanca en mai',
      photoCredit: <>Photo : <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Mai en un coup d\'œil',
      snapshot: [
        { label: 'Température', value: '28°C / 23°C' },
        { label: 'Pluie', value: '~300 mm, la saison verte commence' },
        { label: 'Mer', value: 'Variable, chaude, ~28°C' },
        { label: 'Affluence', value: 'Faible, bon rapport qualité-prix' },
      ],
      whatItsLikeHeading: 'À quoi ressemble le mois de mai',
      whatItsLikeParagraphs: [
        'Mai ouvre la saison verte sur la côte caraïbe. La pluie s\'intensifie, le plus souvent en averses chaudes l\'après-midi, et la jungle vire au vert profond et déborde de vie.',
        'Les matinées sont souvent lumineuses et propices à la plage, et le temps plus humide arrive plus tard dans la journée. Il y a peu de monde et les prix sont bas : un bon mois pour les amoureux de la nature que la pluie ne rebute pas.',
      ],
      rainHeading: 'Combien pleut-il ?',
      rainParagraph:
        'Mai enregistre en moyenne environ 300 mm. La pluie tombe surtout en averses l\'après-midi ou en soirée, et non toute la journée, ce qui vous laisse organiser vos matinées lumineuses.',
      rainyDayIntro: 'C\'est sous la pluie que les sorties en pleine jungle prennent tout leur sens :',
      rainyDayItems: [
        'Faites un tour du cacao et du chocolat, agréable sous la pluie',
        'Cherchez des animaux dans un parc national de Cahuita vert et ruisselant',
        'Visitez une communauté autochtone Bribri',
      ],
      crowdsHeading: 'Affluence, prix et événements',
      crowdsParagraph:
        'Mai est en basse saison : il y a donc peu de monde et les prix comptent parmi les plus bas de l\'année. Le rapport qualité-prix est excellent si vous acceptez de composer avec les averses de l\'après-midi.',
      stayRecommendationTitle: 'Où loger à Puerto Viejo en mai',
      verdictHeading: 'Mai est-il une bonne période pour visiter ?',
      verdictParagraph:
        'Oui, si vous aimez la verdure, le calme et le bon rapport qualité-prix. Vous cédez un peu de plage garantie pour un paysage luxuriant, une faune active et des prix bas, et les matinées restent souvent lumineuses.',
      hubLinkText: 'Voir le guide météo complet mois par mois →',
      takeawaysHeading: 'À retenir',
      takeawaysParagraph:
        'Mai lance la saison verte : jungle luxuriante, averses chaudes l\'après-midi, faune active et prix bas. Organisez-vous autour des matinées lumineuses et emportez une veste de pluie ; c\'est l\'une des périodes les plus vertes et les plus abordables pour venir.',
    },
    it: {
      seoTitle: 'Meteo a Puerto Viejo a maggio: clima, pioggia e mare',
      seoDescription:
        'Maggio a Puerto Viejo de Talamanca apre la stagione verde, con una giungla di un verde intenso, acquazzoni pomeridiani, tanta fauna e prezzi bassi. Ecco cosa aspettarti.',
      heading: 'Meteo a Puerto Viejo a maggio',
      heroAlt: 'Giungla verde della stagione delle piogge a Puerto Viejo de Talamanca a maggio',
      photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Maggio in breve',
      snapshot: [
        { label: 'Temperatura', value: '28°C / 23°C' },
        { label: 'Pioggia', value: '~300 mm, inizia la stagione verde' },
        { label: 'Mare', value: 'Variabile, caldo, ~28°C' },
        { label: 'Affluenza', value: 'Bassa, ottimo rapporto qualità-prezzo' },
      ],
      whatItsLikeHeading: 'Com\'è maggio',
      whatItsLikeParagraphs: [
        'Maggio apre la stagione verde sulla costa caraibica. La pioggia aumenta, di solito come caldi acquazzoni pomeridiani, e la giungla si tinge di verde intenso e si riempie di vita.',
        'Le mattine sono spesso luminose e adatte alla spiaggia, mentre il tempo più umido arriva più avanti nella giornata. C\'è poca gente e i prezzi sono bassi: un bel mese per gli amanti della natura a cui non dispiace bagnarsi un po\'.',
      ],
      rainHeading: 'Quanto piove?',
      rainParagraph:
        'Maggio registra in media circa 300 mm. Cade soprattutto come acquazzoni pomeridiani o serali, non per tutto il giorno, così puoi organizzarti intorno alle mattine luminose.',
      rainyDayIntro: 'È con la pioggia che le escursioni nella giungla danno il meglio:',
      rainyDayItems: [
        'Fai un tour del cacao e del cioccolato, piacevole sotto la pioggia',
        'Cerca animali in un Parco Nazionale di Cahuita verde e gocciolante',
        'Visita una comunità indigena Bribri',
      ],
      crowdsHeading: 'Affluenza, prezzi ed eventi',
      crowdsParagraph:
        'Maggio è bassa stagione, quindi c\'è poca gente e i prezzi sono tra i più bassi dell\'anno. Il rapporto qualità-prezzo è ottimo se non ti pesa organizzarti intorno agli acquazzoni pomeridiani.',
      stayRecommendationTitle: 'Dove alloggiare a Puerto Viejo a maggio',
      verdictHeading: 'Maggio è un buon periodo per visitare?',
      verdictParagraph:
        'Sì, se ti piacciono il verde, la tranquillità e il buon rapporto qualità-prezzo. Rinunci a un po\' di spiaggia garantita per un paesaggio rigoglioso, fauna attiva e prezzi bassi, e le mattine restano spesso luminose.',
      hubLinkText: 'Vedi la guida meteo completa mese per mese →',
      takeawaysHeading: 'Punti chiave',
      takeawaysParagraph:
        'Maggio dà il via alla stagione verde: giungla rigogliosa, caldi acquazzoni pomeridiani, fauna attiva e prezzi bassi. Organizzati intorno alle mattine luminose e porta una giacca antipioggia; è uno dei periodi più verdi e convenienti per venire.',
    },
    pt: {
      seoTitle: 'Tempo em Puerto Viejo em maio: clima, chuva e mar',
      seoDescription:
        'Maio em Puerto Viejo de Talamanca abre a estação verde, com uma selva de um verde intenso, aguaceiros à tarde, muita fauna e preços baixos. Veja o que esperar.',
      heading: 'Tempo em Puerto Viejo em maio',
      heroAlt: 'Selva verde da estação chuvosa em Puerto Viejo de Talamanca em maio',
      photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Maio num relance',
      snapshot: [
        { label: 'Temperatura', value: '28°C / 23°C' },
        { label: 'Chuva', value: '~300 mm, começa a estação verde' },
        { label: 'Mar', value: 'Variável, quente, ~28°C' },
        { label: 'Movimento', value: 'Baixo, boa relação custo-benefício' },
      ],
      whatItsLikeHeading: 'Como é maio',
      whatItsLikeParagraphs: [
        'Maio abre a estação verde na costa caribenha. A chuva aumenta, quase sempre em aguaceiros quentes à tarde, e a selva ganha um verde intenso e se enche de vida.',
        'As manhãs costumam ser luminosas e boas para a praia, e o tempo mais úmido chega mais para o fim do dia. Há pouca gente e os preços são baixos: um bom mês para quem gosta de natureza e não se importa de se molhar um pouco.',
      ],
      rainHeading: 'Quanto chove?',
      rainParagraph:
        'Maio tem média de cerca de 300 mm. Costuma vir em aguaceiros à tarde ou à noite, e não como chuva o dia todo, então dá para se organizar em torno das manhãs luminosas.',
      rainyDayIntro: 'É na chuva que os passeios pela selva ficam melhores:',
      rainyDayItems: [
        'Faça um tour de cacau e chocolate, gostoso na chuva',
        'Procure animais no Parque Nacional Cahuita verde e encharcado',
        'Visite uma comunidade indígena Bribri',
      ],
      crowdsHeading: 'Movimento, preços e eventos',
      crowdsParagraph:
        'Maio é baixa temporada, então há pouca gente e os preços estão entre os mais baixos do ano. O custo-benefício é ótimo se você não se incomodar de se organizar em torno dos aguaceiros da tarde.',
      stayRecommendationTitle: 'Onde ficar em Puerto Viejo em maio',
      verdictHeading: 'Maio é uma boa época para visitar?',
      verdictParagraph:
        'Sim, se você gosta de verde, tranquilidade e bom custo-benefício. Você abre mão de um pouco de praia garantida por uma paisagem exuberante, fauna ativa e preços baixos, e as manhãs ainda costumam amanhecer luminosas.',
      hubLinkText: 'Veja o guia completo de clima mês a mês →',
      takeawaysHeading: 'Pontos principais',
      takeawaysParagraph:
        'Maio dá início à estação verde: selva exuberante, aguaceiros quentes à tarde, fauna ativa e preços baixos. Organize-se em torno das manhãs luminosas e leve uma capa de chuva; é uma das épocas mais verdes e em conta para vir.',
    },
    he: {
      seoTitle: 'מזג האוויר בפוארטו ויאחו במאי: אקלים, גשם וים',
      seoDescription:
        'מאי בפוארטו ויאחו דה טלמנקה פותח את העונה הירוקה: יער טרופי ירוק ושופע, ממטרים אחר הצהריים, חיות בר רבות ומחירים נמוכים. הנה למה לצפות.',
      heading: 'מזג האוויר בפוארטו ויאחו במאי',
      heroAlt: 'יער טרופי ירוק של עונת הגשמים בפוארטו ויאחו דה טלמנקה במאי',
      photoCredit: <>צילום: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'מאי במבט מהיר',
      snapshot: [
        { label: 'טמפרטורה', value: '28°C / 23°C' },
        { label: 'גשם', value: '~300 mm, העונה הירוקה מתחילה' },
        { label: 'ים', value: 'משתנה, חמים, ~28°C' },
        { label: 'עומס', value: 'נמוך, תמורה טובה למחיר' },
      ],
      whatItsLikeHeading: 'איך מרגיש מאי',
      whatItsLikeParagraphs: [
        'מאי פותח את העונה הירוקה בחוף הקריבי. הגשם מתגבר, לרוב כממטרים חמימים אחר הצהריים, והיער הטרופי נצבע בירוק עז ומתמלא חיים.',
        'הבקרים לרוב בהירים ומתאימים לחוף, ומזג האוויר הלח מגיע מאוחר יותר ביום. יש מעט מבקרים והמחירים נמוכים, כך שזה חודש טוב לאוהבי טבע שלא אכפת להם קצת להירטב.',
      ],
      rainHeading: 'כמה יורד גשם?',
      rainParagraph:
        'במאי יורדים בממוצע כ־300 מ"מ. הוא מגיע בעיקר כממטרים אחר הצהריים או בערב, ולא כגשם לאורך כל היום, כך שאפשר לתכנן סביב הבקרים הבהירים.',
      rainyDayIntro: 'דווקא בגשם הטיולים ביער נראים במיטבם:',
      rainyDayItems: [
        'צאו לסיור קקאו ושוקולד, נעים בגשם',
        'חפשו חיות בפארק הלאומי Cahuita הירוק והטובל בגשם',
        'בקרו בקהילת הילידים Bribri',
      ],
      crowdsHeading: 'עומס, מחירים ואירועים',
      crowdsParagraph:
        'מאי הוא עונה שקטה, ולכן יש מעט מבקרים והמחירים מהנמוכים בשנה. התמורה למחיר מצוינת אם לא אכפת לכם להתארגן סביב ממטרי אחר הצהריים.',
      stayRecommendationTitle: 'איפה להתארח בפוארטו ויאחו במאי',
      verdictHeading: 'האם מאי הוא זמן טוב לביקור?',
      verdictParagraph:
        'כן, אם אתם אוהבים ירוק, שקט ותמורה טובה למחיר. אתם מוותרים על מעט זמן חוף מובטח ומקבלים נוף שופע, חיות בר פעילות ומחירים נמוכים, והבקרים ממילא לרוב בהירים.',
      hubLinkText: 'צפו במדריך מזג האוויר המלא חודש אחר חודש →',
      takeawaysHeading: 'נקודות עיקריות',
      takeawaysParagraph:
        'מאי פותח את העונה הירוקה: יער טרופי שופע, ממטרים חמימים אחר הצהריים, חיות בר פעילות ומחירים נמוכים. תכננו סביב הבקרים הבהירים וארזו מעיל גשם; זה אחד הזמנים הירוקים והמשתלמים ביותר לבוא.',
    },
    hi: {
      seoTitle: 'मई में प्यूर्टो विएजो का मौसम: जलवायु, बारिश और समुद्र',
      seoDescription:
        'मई में प्यूर्टो विएजो दे तालामांका हरित मौसम की शुरुआत करता है: गहरा हरा-भरा जंगल, दोपहर की बौछारें, ढेर सारे वन्यजीव और कम कीमतें। यहाँ जानिए क्या उम्मीद करें।',
      heading: 'मई में प्यूर्टो विएजो का मौसम',
      heroAlt: 'मई में प्यूर्टो विएजो दे तालामांका में बरसात के मौसम का हरा-भरा जंगल',
      photoCredit: <>फ़ोटो: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'एक नज़र में मई',
      snapshot: [
        { label: 'तापमान', value: '28°C / 23°C' },
        { label: 'बारिश', value: '~300 mm, हरित मौसम शुरू होता है' },
        { label: 'समुद्र', value: 'परिवर्तनशील, गर्म, ~28°C' },
        { label: 'भीड़', value: 'कम, बढ़िया मूल्य' },
      ],
      whatItsLikeHeading: 'मई कैसा होता है',
      whatItsLikeParagraphs: [
        'मई कैरिबियन तट पर हरित मौसम की शुरुआत करता है। बारिश बढ़ती है, अक्सर दोपहर की गर्म बौछारों के रूप में, और जंगल गहरे हरे रंग में रंगकर जीवंत हो उठता है।',
        'सुबहें अक्सर उजली और समुद्र तट के लिए अच्छी रहती हैं, और नमी वाला मौसम दिन में बाद में आता है। भीड़ कम रहती है और कीमतें कम, इसलिए यह उन प्रकृति प्रेमियों के लिए अच्छा महीना है जिन्हें थोड़ा भीगने से परहेज़ नहीं।',
      ],
      rainHeading: 'कितनी बारिश होती है?',
      rainParagraph:
        'मई में औसतन लगभग 300 mm बारिश होती है। यह ज़्यादातर दोपहर या शाम की तेज़ बौछारों के रूप में आती है, पूरे दिन नहीं, इसलिए आप उजली सुबहों के हिसाब से योजना बना सकते हैं।',
      rainyDayIntro: 'बारिश में ही जंगल की सैर सबसे अच्छी लगती है:',
      rainyDayItems: [
        'कोको और चॉकलेट टूर करें, बारिश में मज़ेदार',
        'हरे-भरे और भीगे Cahuita राष्ट्रीय उद्यान में वन्यजीव खोजें',
        'किसी Bribri आदिवासी समुदाय में जाएँ',
      ],
      crowdsHeading: 'भीड़, कीमतें और आयोजन',
      crowdsParagraph:
        'मई कम सीज़न है, इसलिए भीड़ कम रहती है और कीमतें साल की सबसे कम कीमतों में से होती हैं। अगर आप दोपहर की बौछारों के आसपास खुद को ढाल लें, तो यह बढ़िया मूल्य वाला समय है।',
      stayRecommendationTitle: 'मई में प्यूर्टो विएजो में कहाँ ठहरें',
      verdictHeading: 'क्या मई घूमने का अच्छा समय है?',
      verdictParagraph:
        'हाँ, अगर आपको हरियाली, शांति और बढ़िया मूल्य पसंद है। आप थोड़ा पक्का समुद्र तट समय छोड़कर हरा-भरा परिदृश्य, सक्रिय वन्यजीव और कम कीमतें पाते हैं, और सुबहें वैसे भी अक्सर उजली रहती हैं।',
      hubLinkText: 'महीने-दर-महीने का पूरा मौसम गाइड देखें →',
      takeawaysHeading: 'मुख्य बातें',
      takeawaysParagraph:
        'मई हरित मौसम शुरू करता है: हरा-भरा जंगल, दोपहर की गर्म बौछारें, सक्रिय वन्यजीव और कम कीमतें। उजली सुबहों के हिसाब से योजना बनाएँ और रेन जैकेट रखें; यह आने के सबसे हरे-भरे और किफ़ायती समयों में से एक है।',
    },
    nl: {
      seoTitle: 'Weer in Puerto Viejo in mei: klimaat, regen en zee',
      seoDescription:
        'Mei opent in Puerto Viejo de Talamanca het groene seizoen, met een diepgroene jungle, middagbuien, veel dieren en lage prijzen. Dit kun je verwachten.',
      heading: 'Weer in Puerto Viejo in mei',
      heroAlt: 'Groene regenseizoen-jungle in Puerto Viejo de Talamanca in mei',
      photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Mei in een oogopslag',
      snapshot: [
        { label: 'Temperatuur', value: '28°C / 23°C' },
        { label: 'Regen', value: '~300 mm, het groene seizoen begint' },
        { label: 'Zee', value: 'Wisselend, warm, ~28°C' },
        { label: 'Drukte', value: 'Laag, goede prijs-kwaliteit' },
      ],
      whatItsLikeHeading: 'Hoe mei aanvoelt',
      whatItsLikeParagraphs: [
        'Mei opent het groene seizoen aan de Caribische kust. De regen neemt toe, meestal als warme middagbuien, en de jungle kleurt diepgroen en zit vol leven.',
        'De ochtenden zijn vaak helder en goed voor het strand, en het nattere weer komt pas later op de dag. Het is rustig en de prijzen zijn laag, een fijne maand voor natuurliefhebbers die niet vies zijn van wat regen.',
      ],
      rainHeading: 'Hoeveel regent het?',
      rainParagraph:
        'Mei kent gemiddeld zo\'n 300 mm. De regen valt vooral als middag- of avondbuien, niet de hele dag, zodat je je plannen rond de heldere ochtenden kunt maken.',
      rainyDayIntro: 'Juist in de regen komen de jungletochten het best tot hun recht:',
      rainyDayItems: [
        'Doe een cacao- en chocoladetour, fijn in de regen',
        'Zoek naar dieren in een groen, druipend Cahuita National Park',
        'Bezoek een inheemse Bribri-gemeenschap',
      ],
      crowdsHeading: 'Drukte, prijzen en evenementen',
      crowdsParagraph:
        'Mei is laagseizoen, dus het is rustig en de prijzen horen bij de laagste van het jaar. De prijs-kwaliteit is uitstekend als je het niet erg vindt je rond de middagbuien te schikken.',
      stayRecommendationTitle: 'Waar te verblijven in Puerto Viejo in mei',
      verdictHeading: 'Is mei een goede tijd om te bezoeken?',
      verdictParagraph:
        'Ja, als je van groen, rust en een goede prijs houdt. Je levert wat gegarandeerde strandtijd in voor een weelderig landschap, actieve dieren en lage prijzen, en de ochtenden zijn vaak toch helder.',
      hubLinkText: 'Bekijk de volledige maand-voor-maand weergids →',
      takeawaysHeading: 'Belangrijkste punten',
      takeawaysParagraph:
        'Mei trapt het groene seizoen af: weelderige jungle, warme middagbuien, actieve dieren en lage prijzen. Plan rond de heldere ochtenden en neem een regenjas mee; het is een van de groenste en voordeligste periodes om te komen.',
    },
  },
  june: {
    en: {
      seoTitle: 'Weather in Puerto Viejo in June: climate, rain and sea',
      seoDescription:
        'June in Puerto Viejo de Talamanca is wet and green, with turtle-nesting season nearby, a lively jungle and low prices. Here is what to expect and how to plan for it.',
      heading: 'Weather in Puerto Viejo in June',
      heroAlt: 'Wet green rainforest in Puerto Viejo de Talamanca in June',
      photoCredit: <>Photo: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'June at a glance',
      snapshot: [
        { label: 'Temperature', value: '28°C / 23°C' },
        { label: 'Rain', value: '~340 mm, a wet month' },
        { label: 'Sea', value: 'Often rougher, warm, ~28°C' },
        { label: 'Crowds', value: 'Low, green-season value' },
      ],
      whatItsLikeHeading: 'What June actually feels like',
      whatItsLikeParagraphs: [
        'June sits firmly in the green season: wet, warm and vividly green. Showers are frequent and the sea can be rougher, but bright breaks still turn up, especially in the mornings.',
        'It is a good month for nature. The jungle is at its liveliest, and the wider Gandoca-Manzanillo area falls within the sea-turtle nesting season. If you love a wild, green coast, June delivers.',
      ],
      rainHeading: 'How much does it rain?',
      rainParagraph:
        'June averages around 340 mm. Expect regular showers and some heavier downpours, usually broken up by warm, bright spells rather than raining nonstop.',
      rainyDayIntro: 'The rain is made for indoor and nature outings:',
      rainyDayItems: [
        'Take a cacao and chocolate tour',
        'Ask locally about guided sea-turtle nesting tours in the Gandoca-Manzanillo area',
        'Explore a green, lively Cahuita National Park',
      ],
      crowdsHeading: 'Crowds, prices and events',
      crowdsParagraph:
        'June is low season, so there are few people around and prices are low. It is good value if you are ready for wet weather and want the coast largely to yourself.',
      stayRecommendationTitle: 'Where to stay in Puerto Viejo in June',
      verdictHeading: 'Is June a good time to visit?',
      verdictParagraph:
        'It depends on what you want. For lush nature, wildlife, quiet beaches and low prices, yes. If you need reliable dry beach days, one of the drier months will suit you better.',
      hubLinkText: 'See the full month-by-month weather guide →',
      takeawaysHeading: 'Key takeaways',
      takeawaysParagraph:
        'June is wet, warm and green, with lively wildlife, turtle-nesting season nearby and low prices. Plan around the brighter mornings and pack a good rain jacket; come for the nature, not for guaranteed beach weather.',
    },
    es: {
      seoTitle: 'El clima en Puerto Viejo en junio: tiempo, lluvia y mar',
      seoDescription:
        'Junio en Puerto Viejo de Talamanca es húmedo y verde, con temporada de anidación de tortugas cerca, selva viva y precios bajos. Esto es lo que puedes esperar y cómo organizarte.',
      heading: 'El clima en Puerto Viejo en junio',
      heroAlt: 'Selva verde y húmeda en Puerto Viejo de Talamanca en junio',
      photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Junio de un vistazo',
      snapshot: [
        { label: 'Temperatura', value: '28°C / 23°C' },
        { label: 'Lluvia', value: '~340 mm, un mes húmedo' },
        { label: 'Mar', value: 'A menudo más bravo, cálido, ~28°C' },
        { label: 'Afluencia', value: 'Baja, valor de temporada verde' },
      ],
      whatItsLikeHeading: 'Cómo se siente junio',
      whatItsLikeParagraphs: [
        'Junio está de lleno en la temporada verde: húmedo, cálido y de un verde intenso. Los aguaceros son frecuentes y el mar puede estar más bravo, pero aún aparecen claros luminosos, sobre todo por la mañana.',
        'Es un buen mes para la naturaleza. La selva está en su punto más vivo, y la zona de Gandoca-Manzanillo entra en la temporada de anidación de tortugas marinas. Si te gusta una costa salvaje y verde, junio cumple.',
      ],
      rainHeading: '¿Cuánto llueve?',
      rainParagraph:
        'Junio promedia unos 340 mm. Espera aguaceros regulares y alguno más fuerte, casi siempre intercalados con ratos cálidos y luminosos, no lluvia sin parar.',
      rainyDayIntro: 'La lluvia es perfecta para las salidas bajo techo y de naturaleza:',
      rainyDayItems: [
        'Haz un tour de cacao y chocolate',
        'Pregunta localmente por tours guiados de anidación de tortugas en la zona de Gandoca-Manzanillo',
        'Recorre un Parque Nacional Cahuita verde y lleno de vida',
      ],
      crowdsHeading: 'Afluencia, precios y eventos',
      crowdsParagraph:
        'Junio es temporada baja, así que hay poca gente y los precios son bajos. Sale muy a cuenta si vienes preparado para la humedad y quieres la costa casi para ti.',
      stayRecommendationTitle: 'Dónde hospedarte en Puerto Viejo en junio',
      verdictHeading: '¿Es junio una buena época para visitar?',
      verdictParagraph:
        'Depende de lo que busques. Para naturaleza frondosa, fauna, playas tranquilas y precios bajos, sí. Si necesitas días de playa secos y fiables, uno de los meses más secos te vendrá mejor.',
      hubLinkText: 'Ver la guía completa del clima mes a mes →',
      takeawaysHeading: 'Puntos clave',
      takeawaysParagraph:
        'Junio es húmedo, cálido y verde, con fauna activa, temporada de anidación de tortugas cerca y precios bajos. Organízate alrededor de las mañanas más luminosas y lleva una buena chaqueta impermeable; ven por la naturaleza, no por la playa garantizada.',
    },
    de: {
      seoTitle: 'Wetter in Puerto Viejo im Juni: Klima, Regen und Meer',
      seoDescription:
        'Der Juni in Puerto Viejo de Talamanca ist nass und grün, mit der nahen Nistsaison der Meeresschildkröten, lebendigem Dschungel und niedrigen Preisen. Das erwartet dich, und so planst du deine Reise.',
      heading: 'Wetter in Puerto Viejo im Juni',
      heroAlt: 'Nasser grüner Regenwald in Puerto Viejo de Talamanca im Juni',
      photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Der Juni auf einen Blick',
      snapshot: [
        { label: 'Temperatur', value: '28°C / 23°C' },
        { label: 'Regen', value: '~340 mm, ein nasser Monat' },
        { label: 'Meer', value: 'Oft rauer, warm, ~28°C' },
        { label: 'Andrang', value: 'Gering, Wert der grünen Saison' },
      ],
      whatItsLikeHeading: 'Wie sich der Juni anfühlt',
      whatItsLikeParagraphs: [
        'Der Juni liegt mitten in der grünen Saison: nass, warm und leuchtend grün. Schauer sind häufig und das Meer kann rauer sein, doch helle Aufheiterungen gibt es weiterhin, vor allem am Morgen.',
        'Es ist ein guter Monat für die Natur. Der Dschungel ist am lebendigsten, und das weitere Gebiet um Gandoca-Manzanillo fällt in die Nistsaison der Meeresschildkröten. Wenn du eine wilde, grüne Küste magst, liefert der Juni.',
      ],
      rainHeading: 'Wie viel regnet es?',
      rainParagraph:
        'Der Juni bringt im Schnitt rund 340 mm. Rechne mit regelmäßigen Schauern und einigen kräftigeren Güssen; meist wechseln sie sich mit warmen, hellen Phasen ab, statt ununterbrochen zu regnen.',
      rainyDayIntro: 'Der Regen ist wie gemacht für Ausflüge drinnen und in der Natur:',
      rainyDayItems: [
        'Mach eine Kakao- und Schokoladentour',
        'Frage vor Ort nach geführten Touren zur Schildkröten-Nistsaison im Gebiet Gandoca-Manzanillo',
        'Erkunde einen grünen, lebendigen Cahuita-Nationalpark',
      ],
      crowdsHeading: 'Andrang, Preise und Veranstaltungen',
      crowdsParagraph:
        'Der Juni ist Nebensaison, daher ist wenig los und die Preise sind niedrig. Ein preiswerter Monat, wenn du auf nasses Wetter eingestellt bist und die Küste weitgehend für dich allein haben möchtest.',
      stayRecommendationTitle: 'Wo man im Juni in Puerto Viejo übernachtet',
      verdictHeading: 'Ist der Juni eine gute Reisezeit?',
      verdictParagraph:
        'Das hängt davon ab, was du suchst. Für üppige Natur, Tierwelt, ruhige Strände und niedrige Preise: ja. Wenn du verlässlich trockene Strandtage brauchst, passt einer der trockeneren Monate besser.',
      hubLinkText: 'Zum vollständigen Wetterführer Monat für Monat →',
      takeawaysHeading: 'Wichtigste Punkte',
      takeawaysParagraph:
        'Der Juni ist nass, warm und grün, mit lebendiger Tierwelt, naher Schildkröten-Nistsaison und niedrigen Preisen. Plane rund um die helleren Morgenstunden und pack eine gute Regenjacke ein; komm für die Natur, nicht für garantiertes Strandwetter.',
    },
    fr: {
      seoTitle: 'Météo à Puerto Viejo en juin : climat, pluie et mer',
      seoDescription:
        'En juin, Puerto Viejo de Talamanca est humide et verdoyant, avec la saison de nidification des tortues tout près, une jungle animée et des prix bas. Voici à quoi vous attendre et comment vous organiser.',
      heading: 'Météo à Puerto Viejo en juin',
      heroAlt: 'Forêt tropicale verte et humide à Puerto Viejo de Talamanca en juin',
      photoCredit: <>Photo: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Juin en un coup d\'œil',
      snapshot: [
        { label: 'Température', value: '28°C / 23°C' },
        { label: 'Pluie', value: '~340 mm, un mois humide' },
        { label: 'Mer', value: 'Souvent plus agitée, chaude, ~28°C' },
        { label: 'Affluence', value: 'Faible, l\'atout de la saison verte' },
      ],
      whatItsLikeHeading: 'À quoi ressemble le mois de juin',
      whatItsLikeParagraphs: [
        'Juin est en pleine saison verte : humide, chaud et d\'un vert éclatant. Les averses sont fréquentes et la mer peut être plus agitée, mais de belles éclaircies reviennent, surtout le matin.',
        'C\'est un bon mois pour la nature. La jungle est à son apogée, et la région élargie de Gandoca-Manzanillo entre dans la saison de nidification des tortues marines. Si vous aimez une côte sauvage et verte, juin tient ses promesses.',
      ],
      rainHeading: 'Combien pleut-il ?',
      rainParagraph:
        'Juin affiche en moyenne environ 340 mm. Attendez-vous à des averses régulières et à quelques pluies plus intenses, le plus souvent entrecoupées de moments chauds et lumineux, et non d\'une pluie continue.',
      rainyDayIntro: 'La pluie est idéale pour les sorties en intérieur et en pleine nature :',
      rainyDayItems: [
        'Faites un tour du cacao et du chocolat',
        'Renseignez-vous sur place sur les tours guidés de nidification des tortues dans la région de Gandoca-Manzanillo',
        'Explorez un parc national de Cahuita vert et plein de vie',
      ],
      crowdsHeading: 'Affluence, prix et événements',
      crowdsParagraph:
        'Juin est en basse saison, l\'affluence est donc faible et les prix bas. Le rapport qualité-prix est bon si vous êtes prêt à affronter le temps humide et à avoir la côte presque pour vous seul.',
      stayRecommendationTitle: 'Où loger à Puerto Viejo en juin',
      verdictHeading: 'Juin est-il une bonne période pour visiter ?',
      verdictParagraph:
        'Cela dépend de ce que vous cherchez. Pour une nature luxuriante, la faune, des plages tranquilles et des prix bas, oui. Si vous avez besoin de journées de plage sèches et fiables, l\'un des mois plus secs vous conviendra mieux.',
      hubLinkText: 'Voir le guide météo complet mois par mois →',
      takeawaysHeading: 'Points clés',
      takeawaysParagraph:
        'Juin est humide, chaud et verdoyant, avec une faune animée, la saison de nidification des tortues tout près et des prix bas. Organisez-vous autour des matinées plus lumineuses et emportez un bon imperméable ; venez pour la nature, pas pour un temps de plage garanti.',
    },
    it: {
      seoTitle: 'Meteo a Puerto Viejo a giugno: clima, pioggia e mare',
      seoDescription:
        'A giugno Puerto Viejo de Talamanca è umido e verde, con la stagione di nidificazione delle tartarughe lì vicino, giungla vivace e prezzi bassi. Ecco cosa aspettarti e come organizzarti.',
      heading: 'Meteo a Puerto Viejo a giugno',
      heroAlt: 'Foresta pluviale verde e umida a Puerto Viejo de Talamanca a giugno',
      photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Giugno in breve',
      snapshot: [
        { label: 'Temperatura', value: '28°C / 23°C' },
        { label: 'Pioggia', value: '~340 mm, un mese umido' },
        { label: 'Mare', value: 'Spesso più mosso, caldo, ~28°C' },
        { label: 'Affluenza', value: 'Bassa, convenienza della stagione verde' },
      ],
      whatItsLikeHeading: 'Com\'è giugno',
      whatItsLikeParagraphs: [
        'Giugno è pienamente nella stagione verde: umido, caldo e di un verde brillante. Gli acquazzoni sono frequenti e il mare può essere più mosso, ma le schiarite luminose non mancano, soprattutto al mattino.',
        'È un buon mese per la natura. La giungla è al massimo della sua vitalità, e l\'ampia zona di Gandoca-Manzanillo rientra nella stagione di nidificazione delle tartarughe marine. Se ami una costa selvaggia e verde, giugno non delude.',
      ],
      rainHeading: 'Quanto piove?',
      rainParagraph:
        'A giugno cadono in media circa 340 mm. Aspettati acquazzoni regolari e qualche rovescio più intenso, quasi sempre alternati a momenti caldi e luminosi, non pioggia ininterrotta.',
      rainyDayIntro: 'La pioggia è perfetta per le uscite al coperto e nella natura:',
      rainyDayItems: [
        'Fai un tour del cacao e del cioccolato',
        'Chiedi sul posto dei tour guidati sulla nidificazione delle tartarughe nella zona di Gandoca-Manzanillo',
        'Esplora un Parco Nazionale di Cahuita verde e vivace',
      ],
      crowdsHeading: 'Affluenza, prezzi ed eventi',
      crowdsParagraph:
        'Giugno è bassa stagione, quindi c\'è poca gente e i prezzi sono bassi. Ottimo valore se sei pronto al tempo umido e vuoi la costa quasi tutta per te.',
      stayRecommendationTitle: 'Dove alloggiare a Puerto Viejo a giugno',
      verdictHeading: 'Giugno è un buon periodo per visitare?',
      verdictParagraph:
        'Dipende da cosa cerchi. Per natura rigogliosa, fauna, spiagge tranquille e prezzi bassi, sì. Se hai bisogno di giornate di mare asciutte e affidabili, uno dei mesi più secchi farà più al caso tuo.',
      hubLinkText: 'Consulta la guida meteo completa mese per mese →',
      takeawaysHeading: 'Punti chiave',
      takeawaysParagraph:
        'Giugno è umido, caldo e verde, con fauna vivace, stagione di nidificazione delle tartarughe lì vicino e prezzi bassi. Organizzati intorno alle mattine più luminose e porta una buona giacca impermeabile; vieni per la natura, non per un mare garantito.',
    },
    pt: {
      seoTitle: 'Clima em Puerto Viejo em junho: tempo, chuva e mar',
      seoDescription:
        'Junho em Puerto Viejo de Talamanca é úmido e verde, com a época de desova das tartarugas ali perto, selva animada e preços baixos. Veja o que esperar e como se organizar.',
      heading: 'Clima em Puerto Viejo em junho',
      heroAlt: 'Floresta tropical verde e úmida em Puerto Viejo de Talamanca em junho',
      photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Junho num relance',
      snapshot: [
        { label: 'Temperatura', value: '28°C / 23°C' },
        { label: 'Chuva', value: '~340 mm, um mês úmido' },
        { label: 'Mar', value: 'Muitas vezes mais agitado, quente, ~28°C' },
        { label: 'Movimento', value: 'Baixo, vantagem da estação verde' },
      ],
      whatItsLikeHeading: 'Como é junho',
      whatItsLikeParagraphs: [
        'Junho está em plena estação verde: úmido, quente e de um verde vívido. As pancadas de chuva são frequentes e o mar pode ficar mais agitado, mas as aberturas de sol ainda aparecem, sobretudo pela manhã.',
        'É um bom mês para a natureza. A selva está no seu auge, e a área mais ampla de Gandoca-Manzanillo entra na época de desova das tartarugas marinhas. Se você gosta de uma costa selvagem e verde, junho cumpre.',
      ],
      rainHeading: 'Quanto chove?',
      rainParagraph:
        'Junho tem média em torno de 340 mm. Espere pancadas de chuva regulares e alguns aguaceiros mais fortes, quase sempre intercalados com períodos quentes e ensolarados, e não chuva sem parar.',
      rainyDayIntro: 'A chuva é perfeita para os passeios cobertos e na natureza:',
      rainyDayItems: [
        'Faça um tour de cacau e chocolate',
        'Pergunte no local sobre tours guiados de desova de tartarugas na área de Gandoca-Manzanillo',
        'Explore um Parque Nacional de Cahuita verde e cheio de vida',
      ],
      crowdsHeading: 'Movimento, preços e eventos',
      crowdsParagraph:
        'Junho é baixa temporada, então há pouca gente e os preços são baixos. O custo-benefício é ótimo se você estiver preparado para o tempo úmido e quiser a costa quase só para você.',
      stayRecommendationTitle: 'Onde se hospedar em Puerto Viejo em junho',
      verdictHeading: 'Junho é uma boa época para visitar?',
      verdictParagraph:
        'Depende do que você procura. Para natureza exuberante, vida selvagem, praias tranquilas e preços baixos, sim. Se você precisa de dias de praia secos e confiáveis, um dos meses mais secos vai lhe servir melhor.',
      hubLinkText: 'Veja o guia completo de clima mês a mês →',
      takeawaysHeading: 'Pontos principais',
      takeawaysParagraph:
        'Junho é úmido, quente e verde, com vida selvagem animada, época de desova das tartarugas ali perto e preços baixos. Organize-se em torno das manhãs mais claras e leve uma boa capa de chuva; venha pela natureza, não por tempo de praia garantido.',
    },
    he: {
      seoTitle: 'מזג האוויר בפוארטו ויאחו ביוני: אקלים, גשם וים',
      seoDescription:
        'יוני בפוארטו ויאחו דה טלמנקה הוא לח וירוק, עם עונת קינון הצבים בקרבת מקום, ג\'ונגל שוקק ומחירים נמוכים. הנה למה לצפות ואיך לתכנן.',
      heading: 'מזג האוויר בפוארטו ויאחו ביוני',
      heroAlt: 'יער גשם ירוק ולח בפוארטו ויאחו דה טלמנקה ביוני',
      photoCredit: <>צילום: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'יוני במבט חטוף',
      snapshot: [
        { label: 'טמפרטורה', value: '28°C / 23°C' },
        { label: 'גשם', value: '~340 מ"מ, חודש לח' },
        { label: 'ים', value: 'לרוב סוער יותר, חמים, ~28°C' },
        { label: 'עומס מבקרים', value: 'נמוך, היתרון של העונה הירוקה' },
      ],
      whatItsLikeHeading: 'איך מרגיש יוני',
      whatItsLikeParagraphs: [
        'יוני נמצא במלוא העונה הירוקה: לח, חמים וירוק עז. הממטרים תכופים והים עשוי להיות סוער יותר, אך הפוגות בהירות עדיין מגיעות, במיוחד בבקרים.',
        'זהו חודש טוב לטבע. הג\'ונגל בשיא חיוניותו, ואזור Gandoca-Manzanillo הרחב נכנס לעונת קינון צבי הים. אם אתם אוהבים חוף פראי וירוק, יוני מספק את הסחורה.',
      ],
      rainHeading: 'כמה גשם יורד?',
      rainParagraph:
        'ביוני יורדים בממוצע כ-340 מ"מ. צפו לממטרים סדירים ולכמה מטחי גשם חזקים יותר, שלרוב משולבים בפרקי זמן חמימים ובהירים ולא בגשם רצוף.',
      rainyDayIntro: 'הגשם מושלם לטיולים מקורים ולטיולי טבע:',
      rainyDayItems: [
        'צאו לסיור קקאו ושוקולד',
        'שאלו מקומית על סיורים מודרכים לצפייה בקינון צבי ים באזור Gandoca-Manzanillo',
        'טיילו בפארק הלאומי Cahuita הירוק והתוסס',
      ],
      crowdsHeading: 'עומס מבקרים, מחירים ואירועים',
      crowdsParagraph:
        'יוני הוא עונה שקטה, ולכן יש מעט מבקרים והמחירים נמוכים. חודש משתלם אם אתם ערוכים למזג אוויר לח ורוצים את החוף כמעט כולו לעצמכם.',
      stayRecommendationTitle: 'היכן להתארח בפוארטו ויאחו ביוני',
      verdictHeading: 'האם יוני הוא זמן טוב לבקר?',
      verdictParagraph:
        'זה תלוי במה שאתם מחפשים. לטבע שופע, חיות בר, חופים שקטים ומחירים נמוכים, כן. אם אתם זקוקים לימי חוף יבשים ואמינים, אחד החודשים היבשים יותר יתאים לכם יותר.',
      hubLinkText: 'צפו במדריך מזג האוויר המלא חודש אחר חודש ←',
      takeawaysHeading: 'נקודות עיקריות',
      takeawaysParagraph:
        'יוני לח, חמים וירוק, עם חיות בר תוססות, עונת קינון צבים בקרבת מקום ומחירים נמוכים. תכננו סביב הבקרים הבהירים יותר וארזו מעיל גשם טוב; בואו בשביל הטבע ולא בשביל מזג חוף מובטח.',
    },
    hi: {
      seoTitle: 'जून में पुएर्तो विएखो का मौसम: जलवायु, बारिश और समुद्र',
      seoDescription:
        'जून में पुएर्तो विएखो दे तालामांका नम और हरा-भरा रहता है, पास ही कछुओं के घोंसले बनाने का मौसम, जीवंत जंगल और कम दाम। यहाँ जानिए क्या उम्मीद करें और कैसे योजना बनाएँ।',
      heading: 'जून में पुएर्तो विएखो का मौसम',
      heroAlt: 'जून में पुएर्तो विएखो दे तालामांका में नम हरा वर्षावन',
      photoCredit: <>फ़ोटो: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'एक नज़र में जून',
      snapshot: [
        { label: 'तापमान', value: '28°C / 23°C' },
        { label: 'बारिश', value: '~340 mm, एक नम महीना' },
        { label: 'समुद्र', value: 'अक्सर अधिक उथल-पुथल भरा, गर्म, ~28°C' },
        { label: 'भीड़', value: 'कम, हरित मौसम का लाभ' },
      ],
      whatItsLikeHeading: 'जून कैसा होता है',
      whatItsLikeParagraphs: [
        'जून पूरी तरह हरित मौसम में होता है: नम, गर्म और चटख हरा। बौछारें बार-बार पड़ती हैं और समुद्र अधिक उथल-पुथल भरा हो सकता है, फिर भी उजली धूप के अंतराल मिल ही जाते हैं, खासकर सुबह के समय।',
        'यह प्रकृति के लिए अच्छा महीना है। जंगल अपने सबसे जीवंत रूप में होता है, और व्यापक Gandoca-Manzanillo क्षेत्र समुद्री कछुओं के घोंसले बनाने के मौसम में आता है। अगर आपको जंगली और हरा-भरा तट पसंद है, तो जून निराश नहीं करता।',
      ],
      rainHeading: 'कितनी बारिश होती है?',
      rainParagraph:
        'जून में औसतन लगभग 340 mm बारिश होती है। नियमित बौछारों और कुछ तेज़ मूसलधार बारिश की उम्मीद रखें, जो अक्सर लगातार बरसने के बजाय गर्म, उजले अंतरालों के बीच-बीच आती हैं।',
      rainyDayIntro: 'बारिश इनडोर और प्रकृति की सैर के लिए एकदम सही है:',
      rainyDayItems: [
        'कोको और चॉकलेट टूर करें',
        'Gandoca-Manzanillo क्षेत्र में कछुओं के घोंसले देखने के गाइडेड टूर के बारे में स्थानीय स्तर पर पूछें',
        'हरे-भरे और जीवंत Cahuita राष्ट्रीय उद्यान की सैर करें',
      ],
      crowdsHeading: 'भीड़, दाम और आयोजन',
      crowdsParagraph:
        'जून कम सीज़न है, इसलिए भीड़ कम रहती है और दाम कम होते हैं। अगर आप नम मौसम के लिए तैयार हैं और तट लगभग अपने लिए चाहते हैं, तो यह बढ़िया मूल्य वाला महीना है।',
      stayRecommendationTitle: 'जून में पुएर्तो विएखो में कहाँ ठहरें',
      verdictHeading: 'क्या जून घूमने के लिए अच्छा समय है?',
      verdictParagraph:
        'यह इस पर निर्भर करता है कि आप क्या चाहते हैं। हरी-भरी प्रकृति, वन्यजीव, शांत समुद्र तटों और कम दामों के लिए, हाँ। अगर आपको भरोसेमंद सूखे समुद्र तट वाले दिन चाहिए, तो कोई सूखा महीना आपके लिए बेहतर रहेगा।',
      hubLinkText: 'महीने-दर-महीने पूरी मौसम गाइड देखें →',
      takeawaysHeading: 'मुख्य बातें',
      takeawaysParagraph:
        'जून नम, गर्म और हरा-भरा होता है, जीवंत वन्यजीवन, पास ही कछुओं के घोंसले का मौसम और कम दामों के साथ। उजली सुबहों के हिसाब से योजना बनाएँ और एक अच्छी बरसाती जैकेट रखें; गारंटीशुदा समुद्र तट मौसम के लिए नहीं, प्रकृति के लिए आएँ।',
    },
    nl: {
      seoTitle: 'Weer in Puerto Viejo in juni: klimaat, regen en zee',
      seoDescription:
        'Juni in Puerto Viejo de Talamanca is nat en groen, met vlakbij het nestseizoen van zeeschildpadden, een levendige jungle en lage prijzen. Dit kun je verwachten en zo plan je.',
      heading: 'Weer in Puerto Viejo in juni',
      heroAlt: 'Nat groen regenwoud in Puerto Viejo de Talamanca in juni',
      photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Juni in een oogopslag',
      snapshot: [
        { label: 'Temperatuur', value: '28°C / 23°C' },
        { label: 'Regen', value: '~340 mm, een natte maand' },
        { label: 'Zee', value: 'Vaak ruwer, warm, ~28°C' },
        { label: 'Drukte', value: 'Laag, voordeel van het groene seizoen' },
      ],
      whatItsLikeHeading: 'Hoe juni aanvoelt',
      whatItsLikeParagraphs: [
        'Juni zit volop in het groene seizoen: nat, warm en felgroen. Buien komen vaak voor en de zee kan ruwer zijn, maar heldere opklaringen blijven komen, vooral in de ochtend.',
        'Het is een goede maand voor de natuur. De jungle is op zijn levendigst, en het bredere gebied rond Gandoca-Manzanillo valt binnen het nestseizoen van zeeschildpadden. Houd je van een wilde, groene kust, dan levert juni.',
      ],
      rainHeading: 'Hoeveel regent het?',
      rainParagraph:
        'Juni komt gemiddeld uit op zo\'n 340 mm. Reken op regelmatige buien en enkele stevigere hoosbuien; meestal wisselen ze af met warme, heldere periodes en regent het niet onafgebroken.',
      rainyDayIntro: 'De regen is ideaal voor uitstapjes binnen en in de natuur:',
      rainyDayItems: [
        'Doe een cacao- en chocoladetour',
        'Vraag ter plaatse naar begeleide tours rond het nestseizoen van zeeschildpadden in het gebied Gandoca-Manzanillo',
        'Verken een groen, levendig Nationaal Park Cahuita',
      ],
      crowdsHeading: 'Drukte, prijzen en evenementen',
      crowdsParagraph:
        'Juni is laagseizoen, dus het is rustig en de prijzen zijn laag. Veel waarde voor je geld als je op nat weer bent voorbereid en de kust grotendeels voor jezelf wilt.',
      stayRecommendationTitle: 'Waar te verblijven in Puerto Viejo in juni',
      verdictHeading: 'Is juni een goede tijd voor een bezoek?',
      verdictParagraph:
        'Dat hangt af van wat je zoekt. Voor weelderige natuur, dieren, rustige stranden en lage prijzen: ja. Heb je betrouwbare droge stranddagen nodig, dan past een van de drogere maanden beter bij je.',
      hubLinkText: 'Bekijk de volledige weergids maand voor maand →',
      takeawaysHeading: 'Belangrijkste punten',
      takeawaysParagraph:
        'Juni is nat, warm en groen, met een levendige dierenwereld, vlakbij het nestseizoen van schildpadden en lage prijzen. Plan rond de helderdere ochtenden en neem een goede regenjas mee; kom voor de natuur, niet voor gegarandeerd strandweer.',
    },
  },
  july: {
    en: {
      seoTitle: 'Weather in Puerto Viejo in July: climate, rain and sea',
      seoDescription:
        'July in Puerto Viejo de Talamanca is a mixed bag: warm sun and heavy showers, sometimes a short drier spell, with good surf and a lively jungle. Here is what to expect.',
      heading: 'Weather in Puerto Viejo in July',
      heroAlt: 'Green Caribbean coast with surf in Puerto Viejo de Talamanca in July',
      photoCredit: <>Photo: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'July at a glance',
      snapshot: [
        { label: 'Temperature', value: '27°C / 22°C' },
        { label: 'Rain', value: '~400 mm, wet and variable' },
        { label: 'Sea', value: 'Good surf, warm, ~28°C' },
        { label: 'Crowds', value: 'Moderate, summer holiday travel' },
      ],
      whatItsLikeHeading: 'What July actually looks like',
      whatItsLikeParagraphs: [
        'July is one of the more unpredictable months. It can be quite wet, with heavy showers, but the Caribbean coast sometimes gets a short drier spell mid-season that hands you bright, warm days between the rain.',
        'The jungle is lush and the surf is often good, so the place feels lively. It also lands during the northern-hemisphere summer holidays, so you will see more visitors than in the quieter green-season months.',
      ],
      rainHeading: 'How much does it rain?',
      rainParagraph:
        'July can average around 400 mm and swings a lot from year to year. Expect a mix of heavy downpours and warm bright spells; some years throw in a welcome short dry stretch.',
      rainyDayIntro: 'Rain or shine, there is plenty to do:',
      rainyDayItems: [
        'Watch or try the surf on a good swell',
        'Take a cacao and chocolate tour',
        'Explore Cahuita National Park between showers',
      ],
      crowdsHeading: 'Crowds, prices and events',
      crowdsParagraph:
        'July brings a bump in visitors thanks to summer holidays abroad, so crowds and prices run a little higher than the green-season months on either side, though still well short of the December-February peak.',
      stayRecommendationTitle: 'Where to stay in Puerto Viejo in July',
      verdictHeading: 'Is July a good time to visit?',
      verdictParagraph:
        'Yes, if you are flexible. You might catch a bright, surf-filled stretch or a soggy one, but the jungle is at its liveliest and the mood is good. Pack for both and roll with it.',
      hubLinkText: 'See the full month-by-month weather guide →',
      takeawaysHeading: 'Key takeaways',
      takeawaysParagraph:
        'July is warm, green and unpredictable: heavy showers, good surf and sometimes a short drier spell. Expect a summer-holiday bump in visitors, plan flexibly around the weather, and pack for both sun and rain.',
    },
    es: {
      seoTitle: 'El clima en Puerto Viejo en julio: tiempo, lluvia y mar',
      seoDescription:
        'Julio en Puerto Viejo de Talamanca es variable: sol cálido y aguaceros fuertes, a veces un breve período más seco, con buen surf y selva viva. Esto es lo que puedes esperar.',
      heading: 'El clima en Puerto Viejo en julio',
      heroAlt: 'Costa caribeña verde con surf en Puerto Viejo de Talamanca en julio',
      photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Julio de un vistazo',
      snapshot: [
        { label: 'Temperatura', value: '27°C / 22°C' },
        { label: 'Lluvia', value: '~400 mm, húmedo y variable' },
        { label: 'Mar', value: 'Buen surf, cálido, ~28°C' },
        { label: 'Afluencia', value: 'Moderada, viajes de vacaciones de verano' },
      ],
      whatItsLikeHeading: 'Cómo es julio',
      whatItsLikeParagraphs: [
        'Julio es uno de los meses más impredecibles. Puede ser bastante húmedo, con aguaceros fuertes, pero el Caribe a veces recibe un breve período más seco a media temporada que te regala días cálidos y luminosos entre la lluvia.',
        'La selva está frondosa y el surf suele ser bueno, así que se nota el ambiente. También cae en las vacaciones de verano del hemisferio norte, así que verás más visitantes que en los meses más tranquilos de la temporada verde.',
      ],
      rainHeading: '¿Cuánto llueve?',
      rainParagraph:
        'Julio puede promediar unos 400 mm y cambia bastante de un año a otro. Espera una mezcla de aguaceros fuertes y ratos cálidos y luminosos; algunos años traen un bienvenido período seco corto.',
      rainyDayIntro: 'Con lluvia o sol, hay mucho por hacer:',
      rainyDayItems: [
        'Observa o prueba el surf con un buen oleaje',
        'Haz un tour de cacao y chocolate',
        'Recorre el Parque Nacional Cahuita entre aguaceros',
      ],
      crowdsHeading: 'Afluencia, precios y eventos',
      crowdsParagraph:
        'Julio trae un repunte de visitantes por las vacaciones de verano en el extranjero, así que la afluencia y los precios suben un poco respecto a los meses de temporada verde de alrededor, aunque siguen lejos del pico de diciembre a febrero.',
      stayRecommendationTitle: 'Dónde hospedarte en Puerto Viejo en julio',
      verdictHeading: '¿Es julio una buena época para visitar?',
      verdictParagraph:
        'Sí, si eres flexible. Te puede tocar una racha luminosa y con surf o una pasada por agua, pero la selva está en su punto más vivo y el ambiente es bueno. Lleva para ambos y adáptate.',
      hubLinkText: 'Ver la guía completa del clima mes a mes →',
      takeawaysHeading: 'Puntos clave',
      takeawaysParagraph:
        'Julio es cálido, verde e impredecible: aguaceros fuertes, buen surf y a veces un breve período más seco. Espera un repunte de visitantes por las vacaciones de verano, planea con flexibilidad y lleva para sol y lluvia.',
    },
    de: {
      seoTitle: 'Wetter in Puerto Viejo im Juli: Klima, Regen und Meer',
      seoDescription:
        'Der Juli in Puerto Viejo de Talamanca ist wechselhaft: warme Sonne und heftige Schauer, manchmal eine kurze trockenere Phase, mit gutem Surf und lebendigem Dschungel. Das erwartet dich hier.',
      heading: 'Wetter in Puerto Viejo im Juli',
      heroAlt: 'Grüne Karibikküste mit Surf in Puerto Viejo de Talamanca im Juli',
      photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Der Juli auf einen Blick',
      snapshot: [
        { label: 'Temperatur', value: '27°C / 22°C' },
        { label: 'Regen', value: '~400 mm, nass und wechselhaft' },
        { label: 'Meer', value: 'Guter Surf, warm, ~28°C' },
        { label: 'Andrang', value: 'Mäßig, Sommerferienreisen' },
      ],
      whatItsLikeHeading: 'Wie der Juli so ist',
      whatItsLikeParagraphs: [
        'Der Juli ist einer der unbeständigsten Monate. Er kann recht nass sein, mit heftigen Schauern, aber die Karibikküste bekommt zur Saisonmitte manchmal eine kurze trockenere Phase, die dir zwischen dem Regen helle, warme Tage beschert.',
        'Der Dschungel ist üppig und der Surf oft gut, daher geht es lebhaft zu. Er fällt zudem mit den Sommerferien der Nordhalbkugel zusammen, sodass du mehr Besucher siehst als in den ruhigeren Monaten der grünen Saison.',
      ],
      rainHeading: 'Wie viel regnet es?',
      rainParagraph:
        'Der Juli kann im Durchschnitt bei etwa 400 mm liegen und schwankt von Jahr zu Jahr stark. Erwarte eine Mischung aus heftigen Güssen und warmen, hellen Phasen; manche Jahre bringen eine willkommene kurze Trockenperiode.',
      rainyDayIntro: 'Ob Regen oder Sonnenschein, es gibt viel zu tun:',
      rainyDayItems: [
        'Beobachte oder probiere den Surf bei gutem Wellengang',
        'Mach eine Kakao- und Schokoladentour',
        'Erkunde den Cahuita-Nationalpark zwischen den Schauern',
      ],
      crowdsHeading: 'Andrang, Preise und Veranstaltungen',
      crowdsParagraph:
        'Der Juli bringt wegen der Sommerferien im Ausland einen Anstieg der Besucherzahlen, sodass Andrang und Preise etwas höher sind als in den umliegenden Monaten der grünen Saison, aber noch weit unter dem Höhepunkt von Dezember bis Februar liegen.',
      stayRecommendationTitle: 'Wo man im Juli in Puerto Viejo übernachtet',
      verdictHeading: 'Ist der Juli eine gute Reisezeit?',
      verdictParagraph:
        'Ja, wenn du flexibel bist. Du erwischst vielleicht eine helle, surfreiche Phase oder eine verregnete, aber der Dschungel ist am lebendigsten und die Stimmung stimmt. Pack für beides und bleib flexibel.',
      hubLinkText: 'Zum vollständigen Wetterführer Monat für Monat →',
      takeawaysHeading: 'Das Wichtigste in Kürze',
      takeawaysParagraph:
        'Der Juli ist warm, grün und wechselhaft: heftige Schauer, guter Surf und manchmal eine kurze trockenere Phase. Erwarte einen Anstieg der Besucher durch die Sommerferien, plane flexibel um das Wetter herum und pack für Sonne und Regen.',
    },
    fr: {
      seoTitle: 'Météo à Puerto Viejo en juillet : climat, pluie et mer',
      seoDescription:
        'Juillet à Puerto Viejo de Talamanca est changeant : soleil chaud et fortes averses, parfois une courte période plus sèche, avec du bon surf et une jungle vivante. Voici à quoi vous attendre.',
      heading: 'Météo à Puerto Viejo en juillet',
      heroAlt: 'Côte caraïbe verdoyante avec du surf à Puerto Viejo de Talamanca en juillet',
      photoCredit: <>Photo : <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Juillet en un coup d\'œil',
      snapshot: [
        { label: 'Température', value: '27°C / 22°C' },
        { label: 'Pluie', value: '~400 mm, humide et variable' },
        { label: 'Mer', value: 'Bon surf, chaude, ~28°C' },
        { label: 'Affluence', value: 'Modérée, voyages des vacances d\'été' },
      ],
      whatItsLikeHeading: 'À quoi ressemble le mois de juillet',
      whatItsLikeParagraphs: [
        'Juillet est l\'un des mois les plus imprévisibles. Il peut être assez humide, avec de fortes averses, mais la côte caraïbe connaît parfois une courte période plus sèche en milieu de saison qui vous offre des journées lumineuses et chaudes entre les pluies.',
        'La jungle est luxuriante et le surf souvent bon, l\'ambiance est donc au rendez-vous. Il tombe aussi pendant les vacances d\'été de l\'hémisphère nord, vous verrez donc plus de visiteurs que pendant les mois plus calmes de la saison verte.',
      ],
      rainHeading: 'Combien pleut-il ?',
      rainParagraph:
        'Juillet peut atteindre en moyenne environ 400 mm et varie beaucoup d\'une année à l\'autre. Attendez-vous à un mélange de fortes averses et de moments chauds et lumineux ; certaines années apportent une courte période sèche bienvenue.',
      rainyDayIntro: 'Qu\'il pleuve ou qu\'il fasse beau, il y a beaucoup à faire :',
      rainyDayItems: [
        'Regardez ou essayez le surf avec une bonne houle',
        'Faites un tour du cacao et du chocolat',
        'Explorez le parc national de Cahuita entre les averses',
      ],
      crowdsHeading: 'Affluence, prix et événements',
      crowdsParagraph:
        'Juillet connaît une hausse des visiteurs grâce aux vacances d\'été à l\'étranger, l\'affluence et les prix sont donc un peu plus élevés que les mois voisins de la saison verte, tout en restant bien en deçà du pic de décembre à février.',
      stayRecommendationTitle: 'Où loger à Puerto Viejo en juillet',
      verdictHeading: 'Juillet est-il une bonne période pour visiter ?',
      verdictParagraph:
        'Oui, si vous êtes flexible. Vous pourriez tomber sur une période lumineuse et pleine de surf ou sur une période pluvieuse, mais la jungle est à son comble et l\'ambiance est bonne. Préparez-vous aux deux et faites avec.',
      hubLinkText: 'Voir le guide météo complet mois par mois →',
      takeawaysHeading: 'À retenir',
      takeawaysParagraph:
        'Juillet est chaud, vert et changeant : fortes averses, bon surf et parfois une courte période plus sèche. Attendez-vous à une hausse de visiteurs due aux vacances d\'été, planifiez avec souplesse en fonction de la météo et préparez-vous au soleil comme à la pluie.',
    },
    it: {
      seoTitle: 'Meteo a Puerto Viejo a luglio: clima, pioggia e mare',
      seoDescription:
        'Luglio a Puerto Viejo de Talamanca è variabile: sole caldo e forti acquazzoni, a volte un breve periodo più asciutto, con buon surf e giungla vivace. Ecco cosa aspettarsi.',
      heading: 'Meteo a Puerto Viejo a luglio',
      heroAlt: 'Costa caraibica verde con surf a Puerto Viejo de Talamanca a luglio',
      photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Luglio in breve',
      snapshot: [
        { label: 'Temperatura', value: '27°C / 22°C' },
        { label: 'Pioggia', value: '~400 mm, umido e variabile' },
        { label: 'Mare', value: 'Buon surf, caldo, ~28°C' },
        { label: 'Affluenza', value: 'Moderata, viaggi delle vacanze estive' },
      ],
      whatItsLikeHeading: 'Com\'è luglio',
      whatItsLikeParagraphs: [
        'Luglio è uno dei mesi più imprevedibili. Può essere piuttosto piovoso, con forti acquazzoni, ma la costa caraibica a volte riceve un breve periodo più asciutto a metà stagione che ti regala giornate luminose e calde tra la pioggia.',
        'La giungla è rigogliosa e il surf spesso buono, quindi l\'atmosfera è viva. Cade anche durante le vacanze estive dell\'emisfero nord, quindi vedrai più visitatori rispetto ai mesi più tranquilli della stagione verde.',
      ],
      rainHeading: 'Quanto piove?',
      rainParagraph:
        'Luglio può registrare una media di circa 400 mm ed è piuttosto variabile di anno in anno. Aspettati un mix di forti acquazzoni e momenti caldi e luminosi; alcuni anni portano un gradito breve periodo asciutto.',
      rainyDayIntro: 'Con pioggia o sole, c\'è molto da fare:',
      rainyDayItems: [
        'Guarda o prova il surf con una buona onda',
        'Fai un tour del cacao e del cioccolato',
        'Esplora il Parco Nazionale di Cahuita tra un acquazzone e l\'altro',
      ],
      crowdsHeading: 'Affluenza, prezzi ed eventi',
      crowdsParagraph:
        'Luglio porta un aumento di visitatori grazie alle vacanze estive all\'estero, quindi affluenza e prezzi sono un po\' più alti rispetto ai mesi circostanti della stagione verde, pur restando ben al di sotto del picco di dicembre-febbraio.',
      stayRecommendationTitle: 'Dove alloggiare a Puerto Viejo a luglio',
      verdictHeading: 'Luglio è un buon periodo per visitare?',
      verdictParagraph:
        'Sì, se sei flessibile. Potresti beccare un periodo luminoso e pieno di surf oppure uno piovoso, ma la giungla è al massimo della sua vitalità e l\'atmosfera è bella. Prepara per entrambi e prendila come viene.',
      hubLinkText: 'Guarda la guida meteo completa mese per mese →',
      takeawaysHeading: 'Punti chiave',
      takeawaysParagraph:
        'Luglio è caldo, verde e variabile: forti acquazzoni, buon surf e a volte un breve periodo più asciutto. Aspettati un aumento di visitatori per le vacanze estive, pianifica con flessibilità in base al meteo e prepara sia per il sole sia per la pioggia.',
    },
    pt: {
      seoTitle: 'Clima em Puerto Viejo em julho: tempo, chuva e mar',
      seoDescription:
        'Julho em Puerto Viejo de Talamanca é variável: sol quente e aguaceiros fortes, às vezes um breve período mais seco, com bom surf e selva viva. Veja o que esperar.',
      heading: 'Clima em Puerto Viejo em julho',
      heroAlt: 'Costa caribenha verde com surf em Puerto Viejo de Talamanca em julho',
      photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Julho num relance',
      snapshot: [
        { label: 'Temperatura', value: '27°C / 22°C' },
        { label: 'Chuva', value: '~400 mm, úmido e variável' },
        { label: 'Mar', value: 'Bom surf, quente, ~28°C' },
        { label: 'Movimento', value: 'Moderado, viagens de férias de verão' },
      ],
      whatItsLikeHeading: 'Como é julho',
      whatItsLikeParagraphs: [
        'Julho é um dos meses mais imprevisíveis. Pode ser bastante chuvoso, com aguaceiros fortes, mas a costa caribenha às vezes recebe um breve período mais seco no meio da temporada que garante dias claros e quentes entre as chuvas.',
        'A selva está exuberante e o surf costuma ser bom, então o clima é animado. Também cai nas férias de verão do hemisfério norte, então você verá mais visitantes do que nos meses mais tranquilos da temporada verde.',
      ],
      rainHeading: 'Quanto chove?',
      rainParagraph:
        'Julho pode ter uma média de cerca de 400 mm e varia bastante de ano para ano. Espere uma mistura de aguaceiros fortes e momentos quentes e claros; alguns anos trazem um bem-vindo período seco curto.',
      rainyDayIntro: 'Com chuva ou sol, há muito para fazer:',
      rainyDayItems: [
        'Observe ou experimente o surf com uma boa ondulação',
        'Faça um tour de cacau e chocolate',
        'Explore o Parque Nacional Cahuita entre os aguaceiros',
      ],
      crowdsHeading: 'Movimento, preços e eventos',
      crowdsParagraph:
        'Julho traz um aumento de visitantes graças às férias de verão no exterior, então o movimento e os preços são um pouco mais altos do que nos meses vizinhos da temporada verde, embora ainda bem abaixo do pico de dezembro a fevereiro.',
      stayRecommendationTitle: 'Onde ficar em Puerto Viejo em julho',
      verdictHeading: 'Julho é uma boa época para visitar?',
      verdictParagraph:
        'Sim, se você for flexível. Pode pegar um período claro e cheio de surf ou um chuvoso, mas a selva está no seu auge e o astral é bom. Leve para os dois e vá levando.',
      hubLinkText: 'Ver o guia completo de clima mês a mês →',
      takeawaysHeading: 'Pontos-chave',
      takeawaysParagraph:
        'Julho é quente, verde e variável: aguaceiros fortes, bom surf e às vezes um breve período mais seco. Espere um aumento de visitantes pelas férias de verão, planeje com flexibilidade em torno do clima e leve tanto para sol quanto para chuva.',
    },
    he: {
      seoTitle: 'מזג האוויר בפוארטו ויאחו ביולי: אקלים, גשם וים',
      seoDescription:
        'יולי בפוארטו ויאחו דה טלמנקה הוא הפכפך: שמש חמה וממטרים כבדים, לעיתים תקופה יבשה קצרה, עם גלישה טובה וג\'ונגל תוסס. הנה למה לצפות.',
      heading: 'מזג האוויר בפוארטו ויאחו ביולי',
      heroAlt: 'חוף קריבי ירוק עם גלישה בפוארטו ויאחו דה טלמנקה ביולי',
      photoCredit: <>צילום: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'יולי במבט חטוף',
      snapshot: [
        { label: 'טמפרטורה', value: '27°C / 22°C' },
        { label: 'גשם', value: '~400 מ"מ, לח והפכפך' },
        { label: 'ים', value: 'גלישה טובה, חמים, ~28°C' },
        { label: 'עומס', value: 'בינוני, נסיעות חופשת הקיץ' },
      ],
      whatItsLikeHeading: 'איך מרגיש יולי',
      whatItsLikeParagraphs: [
        'יולי הוא אחד החודשים הבלתי צפויים. הוא יכול להיות גשום למדי, עם ממטרים כבדים, אך החוף הקריבי מקבל לעיתים תקופה יבשה קצרה באמצע העונה, שמעניקה ימים בהירים וחמים בין הגשמים.',
        'הג\'ונגל שופע והגלישה לרוב טובה, אז יש אווירה תוססת. הוא גם חופף לחופשת הקיץ של חצי הכדור הצפוני, כך שתראה יותר מבקרים מאשר בחודשים השקטים יותר של העונה הירוקה.',
      ],
      rainHeading: 'כמה גשם יורד?',
      rainParagraph:
        'יולי יכול לרדת בממוצע סביב 400 מ"מ והוא הפכפך למדי משנה לשנה. צפה לתערובת של ממטרים כבדים וקטעים חמים ובהירים; בחלק מהשנים מגיעה תקופה יבשה קצרה ומבורכת.',
      rainyDayIntro: 'בגשם או בשמש, יש הרבה מה לעשות:',
      rainyDayItems: [
        'צפה או נסה את הגלישה בגלים טובים',
        'צא לסיור קקאו ושוקולד',
        'סייר בפארק הלאומי Cahuita בין הממטרים',
      ],
      crowdsHeading: 'עומס, מחירים ואירועים',
      crowdsParagraph:
        'יולי מביא עלייה במספר המבקרים בזכות חופשות הקיץ בחו"ל, כך שהעומס והמחירים מעט גבוהים יותר מאשר בחודשי העונה הירוקה שסביבו, אם כי עדיין הרבה מתחת לשיא של דצמבר-פברואר.',
      stayRecommendationTitle: 'היכן להתארח בפוארטו ויאחו ביולי',
      verdictHeading: 'האם יולי הוא זמן טוב לבקר?',
      verdictParagraph:
        'כן, אם אתה גמיש. אתה עשוי לתפוס תקופה בהירה ומלאת גלישה או תקופה גשומה, אך הג\'ונגל בשיא חיוניותו והאווירה טובה. ארוז לשניהם וזרום עם זה.',
      hubLinkText: 'צפה במדריך מזג האוויר המלא חודש אחר חודש ←',
      takeawaysHeading: 'נקודות עיקריות',
      takeawaysParagraph:
        'יולי חם, ירוק והפכפך: ממטרים כבדים, גלישה טובה ולעיתים תקופה יבשה קצרה. צפה לעלייה במבקרים בשל חופשת הקיץ, תכנן בגמישות סביב מזג האוויר וארוז גם לשמש וגם לגשם.',
    },
    hi: {
      seoTitle: 'जुलाई में पुएर्तो विएजो का मौसम: जलवायु, बारिश और समुद्र',
      seoDescription:
        'पुएर्तो विएजो दे तालामांका में जुलाई मिला-जुला रहता है: गर्म धूप और तेज़ बौछारें, कभी-कभी एक छोटी सूखी अवधि, अच्छे सर्फ़ और जीवंत जंगल के साथ। यहाँ जानिए क्या उम्मीद करें।',
      heading: 'जुलाई में पुएर्तो विएजो का मौसम',
      heroAlt: 'जुलाई में पुएर्तो विएजो दे तालामांका में सर्फ़ के साथ हरा कैरिबियन तट',
      photoCredit: <>फ़ोटो: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'एक नज़र में जुलाई',
      snapshot: [
        { label: 'तापमान', value: '27°C / 22°C' },
        { label: 'बारिश', value: '~400 mm, नम और परिवर्तनशील' },
        { label: 'समुद्र', value: 'अच्छा सर्फ़, गर्म, ~28°C' },
        { label: 'भीड़', value: 'मध्यम, गर्मी की छुट्टियों की यात्रा' },
      ],
      whatItsLikeHeading: 'जुलाई कैसा होता है',
      whatItsLikeParagraphs: [
        'जुलाई सबसे अनिश्चित महीनों में से एक है। यह काफ़ी नम हो सकता है, तेज़ बौछारों के साथ, लेकिन कैरिबियन तट पर कभी-कभी मौसम के बीचोंबीच एक छोटी सूखी अवधि आ जाती है, जो बारिश के बीच उजले, गर्म दिन दे देती है।',
        'जंगल हरा-भरा है और सर्फ़ अक्सर अच्छा रहता है, इसलिए माहौल जीवंत रहता है। यह उत्तरी गोलार्ध की गर्मी की छुट्टियों के साथ भी पड़ता है, इसलिए आपको हरित मौसम के शांत महीनों की तुलना में अधिक पर्यटक दिखेंगे।',
      ],
      rainHeading: 'कितनी बारिश होती है?',
      rainParagraph:
        'जुलाई में औसतन लगभग 400 mm बारिश हो सकती है और यह साल-दर-साल काफ़ी परिवर्तनशील रहता है। तेज़ बौछारों और गर्म, उजले समय के मिश्रण की उम्मीद करें; कुछ वर्षों में एक स्वागतयोग्य छोटी सूखी अवधि आती है।',
      rainyDayIntro: 'बारिश हो या धूप, करने को बहुत कुछ है:',
      rainyDayItems: [
        'अच्छी लहरों पर सर्फ़ देखें या आज़माएँ',
        'कोको और चॉकलेट टूर लें',
        'बौछारों के बीच Cahuita राष्ट्रीय उद्यान का पता लगाएँ',
      ],
      crowdsHeading: 'भीड़, कीमतें और आयोजन',
      crowdsParagraph:
        'विदेश में गर्मी की छुट्टियों के कारण जुलाई में पर्यटकों की संख्या बढ़ जाती है, इसलिए आसपास के हरित मौसम के महीनों की तुलना में भीड़ और कीमतें थोड़ी अधिक होती हैं, हालाँकि दिसंबर-फ़रवरी के चरम से अभी भी काफ़ी कम रहती हैं।',
      stayRecommendationTitle: 'जुलाई में पुएर्तो विएजो में कहाँ ठहरें',
      verdictHeading: 'क्या जुलाई घूमने का अच्छा समय है?',
      verdictParagraph:
        'हाँ, अगर आप लचीले हैं। आपको एक उजली, सर्फ़ से भरी अवधि मिल सकती है या एक नम अवधि, लेकिन जंगल अपने सबसे जीवंत रूप में होता है और माहौल अच्छा रहता है। दोनों के लिए सामान पैक करें और जो हो उसके साथ चलें।',
      hubLinkText: 'महीने-दर-महीने पूरा मौसम गाइड देखें →',
      takeawaysHeading: 'मुख्य बातें',
      takeawaysParagraph:
        'जुलाई गर्म, हरा-भरा और परिवर्तनशील होता है: तेज़ बौछारें, अच्छा सर्फ़ और कभी-कभी एक छोटी सूखी अवधि। गर्मी की छुट्टियों के कारण पर्यटकों में वृद्धि की उम्मीद करें, मौसम के अनुसार लचीली योजना बनाएँ, और धूप व बारिश दोनों के लिए सामान पैक करें।',
    },
    nl: {
      seoTitle: 'Weer in Puerto Viejo in juli: klimaat, regen en zee',
      seoDescription:
        'Juli in Puerto Viejo de Talamanca is wisselvallig: warme zon en zware buien, soms een korte drogere periode, met goede surf en een levendige jungle. Dit kun je verwachten.',
      heading: 'Weer in Puerto Viejo in juli',
      heroAlt: 'Groene Caribische kust met surf in Puerto Viejo de Talamanca in juli',
      photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Juli in het kort',
      snapshot: [
        { label: 'Temperatuur', value: '27°C / 22°C' },
        { label: 'Regen', value: '~400 mm, nat en wisselvallig' },
        { label: 'Zee', value: 'Goede surf, warm, ~28°C' },
        { label: 'Drukte', value: 'Matig, zomervakantiereizen' },
      ],
      whatItsLikeHeading: 'Hoe juli eruitziet',
      whatItsLikeParagraphs: [
        'Juli is een van de meest onvoorspelbare maanden. Het kan behoorlijk nat zijn, met zware buien, maar de Caribische kust krijgt halverwege het seizoen soms een korte drogere periode die je heldere, warme dagen tussen de regen door geeft.',
        'De jungle is weelderig en de surf is vaak goed, dus het is er levendig. Het valt ook in de zomervakantie op het noordelijk halfrond, dus je ziet meer bezoekers dan in de rustigere maanden van het groene seizoen.',
      ],
      rainHeading: 'Hoeveel regent het?',
      rainParagraph:
        'Juli komt gemiddeld uit op zo\'n 400 mm en varieert sterk van jaar tot jaar. Verwacht een mix van zware buien en warme, heldere momenten; sommige jaren brengen een welkome korte droge periode.',
      rainyDayIntro: 'Of het nu regent of de zon schijnt, er is genoeg te doen:',
      rainyDayItems: [
        'Kijk naar of probeer de surf bij een goede deining',
        'Doe een cacao- en chocoladetour',
        'Verken het Nationaal Park Cahuita tussen de buien door',
      ],
      crowdsHeading: 'Drukte, prijzen en evenementen',
      crowdsParagraph:
        'Juli brengt door de zomervakantie in het buitenland een toename van bezoekers, dus de drukte en de prijzen liggen iets hoger dan in de omliggende maanden van het groene seizoen, al blijven ze ruim onder de piek van december tot februari.',
      stayRecommendationTitle: 'Waar te verblijven in Puerto Viejo in juli',
      verdictHeading: 'Is juli een goede tijd om te bezoeken?',
      verdictParagraph:
        'Ja, als je flexibel bent. Je treft misschien een heldere, surfrijke periode of een natte, maar de jungle is op zijn levendigst en de sfeer zit goed. Pak voor beide in en laat het over je heen komen.',
      hubLinkText: 'Bekijk de volledige weergids maand voor maand →',
      takeawaysHeading: 'Belangrijkste punten',
      takeawaysParagraph:
        'Juli is warm, groen en wisselvallig: zware buien, goede surf en soms een korte drogere periode. Verwacht een toename van bezoekers door de zomervakantie, plan flexibel rond het weer en pak in voor zowel zon als regen.',
    },
  },
  august: {
    en: {
      seoTitle: 'Weather in Puerto Viejo in August: climate, rain and sea',
      seoDescription:
        'August in Puerto Viejo de Talamanca is warm and green, with rainy spells, a dramatic jungle and good surf. Here is what to expect and how to plan your trip.',
      heading: 'Weather in Puerto Viejo in August',
      heroAlt: 'Dramatic green jungle and beach in Puerto Viejo de Talamanca in August',
      photoCredit: <>Photo: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'August at a glance',
      snapshot: [
        { label: 'Temperature', value: '28°C / 23°C' },
        { label: 'Rain', value: '~320 mm, rainy spells, warm' },
        { label: 'Sea', value: 'Some surf, warm, ~28°C' },
        { label: 'Crowds', value: 'Moderate, tapering off late month' },
      ],
      whatItsLikeHeading: 'What August tends to be like',
      whatItsLikeParagraphs: [
        'August stays warm and green, with rainy spells rolling through and the jungle at its most dramatic. Bright breaks still come between the showers, usually in the mornings.',
        'The surf can be good and the landscape is lush and alive. August sits just before the calm September veranillo, so late in the month you sometimes get a hint of the clearer weather ahead.',
      ],
      rainHeading: 'How much does it rain?',
      rainParagraph:
        'August averages around 320 mm. Expect warm days with regular showers and occasional heavier bursts, usually broken up by bright spells rather than raining all day.',
      rainyDayIntro: 'When the rain comes, you have plenty of options:',
      rainyDayItems: [
        'Take a cacao and chocolate tour',
        'Explore a lush, dramatic Cahuita National Park',
        'Visit a Bribri Indigenous community',
      ],
      crowdsHeading: 'Crowds, prices and events',
      crowdsParagraph:
        'Early August still sees some summer-holiday travellers. Their numbers taper off later in the month, back toward quieter, lower-priced green-season conditions.',
      stayRecommendationTitle: 'Where to stay in Puerto Viejo in August',
      verdictHeading: 'Is August a good time to visit?',
      verdictParagraph:
        'Yes, for green-season travellers. You get warm, lush weather and good value, with bright mornings and the calmer veranillo just around the corner. Pack for showers.',
      hubLinkText: 'See the full month-by-month weather guide →',
      takeawaysHeading: 'Key takeaways',
      takeawaysParagraph:
        'August is warm, green and atmospheric, with rainy spells and good surf, just before the September veranillo. Plan around the bright mornings and pack a rain jacket; it is a lush, good-value month on the coast.',
    },
    es: {
      seoTitle: 'El clima en Puerto Viejo en agosto: tiempo, lluvia y mar',
      seoDescription:
        'Agosto en Puerto Viejo de Talamanca es cálido y verde, con períodos de lluvia, una selva dramática y buen surf. Esto es lo que puedes esperar y cómo organizarte.',
      heading: 'El clima en Puerto Viejo en agosto',
      heroAlt: 'Selva verde dramática y playa en Puerto Viejo de Talamanca en agosto',
      photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Agosto de un vistazo',
      snapshot: [
        { label: 'Temperatura', value: '28°C / 23°C' },
        { label: 'Lluvia', value: '~320 mm, períodos de lluvia, cálido' },
        { label: 'Mar', value: 'Algo de surf, cálido, ~28°C' },
        { label: 'Afluencia', value: 'Moderada, bajando a fin de mes' },
      ],
      whatItsLikeHeading: 'Cómo suele ser agosto',
      whatItsLikeParagraphs: [
        'Agosto se mantiene cálido y verde, con períodos de lluvia que van pasando y la selva en su punto más dramático. Entre los aguaceros aún salen claros luminosos, casi siempre por la mañana.',
        'El surf puede ser bueno y el paisaje está frondoso y lleno de vida. Agosto cae justo antes del tranquilo veranillo de septiembre, así que a finales de mes a veces ya se intuye el clima más despejado que viene.',
      ],
      rainHeading: '¿Cuánto llueve?',
      rainParagraph:
        'Agosto promedia unos 320 mm. Espera días cálidos con aguaceros regulares y algunos episodios más fuertes, normalmente interrumpidos por ratos luminosos y no lloviendo todo el día.',
      rainyDayIntro: 'Cuando llega la lluvia, no te faltan opciones:',
      rainyDayItems: [
        'Haz un tour de cacao y chocolate',
        'Recorre un Parque Nacional Cahuita frondoso y dramático',
        'Visita una comunidad indígena Bribri',
      ],
      crowdsHeading: 'Afluencia, precios y eventos',
      crowdsParagraph:
        'A principios de agosto todavía se ven algunos viajeros de vacaciones de verano. Su número baja más adelante en el mes, hacia condiciones de temporada verde más tranquilas y económicas.',
      stayRecommendationTitle: 'Dónde hospedarte en Puerto Viejo en agosto',
      verdictHeading: '¿Es agosto una buena época para visitar?',
      verdictParagraph:
        'Sí, para viajeros de temporada verde. Tienes clima cálido y frondoso, buen precio, mañanas luminosas y el tranquilo veranillo a la vuelta de la esquina. Lleva para aguaceros.',
      hubLinkText: 'Ver la guía completa del clima mes a mes →',
      takeawaysHeading: 'Puntos clave',
      takeawaysParagraph:
        'Agosto es cálido, verde y con atmósfera, con períodos de lluvia y buen surf, justo antes del veranillo de septiembre. Organízate alrededor de las mañanas luminosas y lleva chaqueta impermeable; es un mes frondoso y de buen precio en la costa.',
    },
    de: {
      seoTitle: 'Wetter in Puerto Viejo im August: Klima, Regen und Meer',
      seoDescription:
        'Der August in Puerto Viejo de Talamanca ist warm und grün, mit Regenphasen, einem eindrucksvollen Dschungel und gutem Surf. Das erwartet dich, und so planst du deine Reise.',
      heading: 'Wetter in Puerto Viejo im August',
      heroAlt: 'Eindrucksvoller grüner Dschungel und Strand in Puerto Viejo de Talamanca im August',
      photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'August auf einen Blick',
      snapshot: [
        { label: 'Temperatur', value: '28°C / 23°C' },
        { label: 'Regen', value: '~320 mm, Regenphasen, warm' },
        { label: 'Meer', value: 'Etwas Surf, warm, ~28°C' },
        { label: 'Andrang', value: 'Mäßig, lässt gegen Monatsende nach' },
      ],
      whatItsLikeHeading: 'Wie der August meist ausfällt',
      whatItsLikeParagraphs: [
        'Der August bleibt warm und grün, mit durchziehenden Regenphasen und dem Dschungel von seiner eindrucksvollsten Seite. Zwischen den Schauern gibt es weiterhin helle Aufheiterungen, oft am Morgen.',
        'Der Surf kann gut sein und die Landschaft ist üppig und voller Leben. Er liegt kurz vor dem ruhigen veranillo im September, sodass sich Ende August manchmal schon das klarere Wetter andeutet, das noch kommt.',
      ],
      rainHeading: 'Wie viel regnet es?',
      rainParagraph:
        'Der August bringt im Schnitt rund 320 mm. Erwarte warme Tage mit regelmäßigen Schauern und gelegentlich kräftigeren Güssen, die meist von hellen Phasen unterbrochen werden, statt den ganzen Tag zu regnen.',
      rainyDayIntro: 'Wenn der Regen kommt, hast du reichlich Möglichkeiten:',
      rainyDayItems: [
        'Mach eine Kakao- und Schokoladentour',
        'Erkunde den üppigen, eindrucksvollen Cahuita-Nationalpark',
        'Besuche eine indigene Bribri-Gemeinschaft',
      ],
      crowdsHeading: 'Andrang, Preise und Events',
      crowdsParagraph:
        'Anfang August sind noch einige Sommerurlauber unterwegs. Ihre Zahl nimmt im Laufe des Monats ab, hin zu ruhigeren, günstigeren Bedingungen der grünen Saison.',
      stayRecommendationTitle: 'Wo du im August in Puerto Viejo übernachtest',
      verdictHeading: 'Ist der August eine gute Reisezeit?',
      verdictParagraph:
        'Ja, für Reisende der grünen Saison. Du bekommst warmes, üppiges Wetter und ein gutes Preis-Leistungs-Verhältnis, mit hellen Morgen und dem ruhigeren veranillo gleich um die Ecke. Pack für Schauer.',
      hubLinkText: 'Zum vollständigen Monat-für-Monat-Wetterguide →',
      takeawaysHeading: 'Das Wichtigste in Kürze',
      takeawaysParagraph:
        'Der August ist warm, grün und stimmungsvoll, mit Regenphasen und gutem Surf, kurz vor dem veranillo im September. Plane rund um die hellen Morgen und pack eine Regenjacke ein; es ist ein üppiger Monat mit gutem Preis-Leistungs-Verhältnis an der Küste.',
    },
    fr: {
      seoTitle: 'Météo à Puerto Viejo en août : climat, pluie et mer',
      seoDescription:
        'En août, Puerto Viejo de Talamanca est chaud et vert, avec des épisodes de pluie, une jungle spectaculaire et de bonnes vagues. Voici à quoi vous attendre et comment planifier votre voyage.',
      heading: 'Météo à Puerto Viejo en août',
      heroAlt: 'Jungle verte spectaculaire et plage à Puerto Viejo de Talamanca en août',
      photoCredit: <>Photo: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Août en un coup d\'œil',
      snapshot: [
        { label: 'Température', value: '28°C / 23°C' },
        { label: 'Pluie', value: '~320 mm, épisodes de pluie, chaud' },
        { label: 'Mer', value: 'Un peu de surf, chaude, ~28°C' },
        { label: 'Affluence', value: 'Modérée, en baisse en fin de mois' },
      ],
      whatItsLikeHeading: 'À quoi ressemble le mois d\'août',
      whatItsLikeParagraphs: [
        'Août reste chaud et vert, avec des épisodes de pluie qui défilent et une jungle sous son jour le plus spectaculaire. Entre les averses, de belles éclaircies reviennent, souvent le matin.',
        'Le surf peut être bon et le paysage est luxuriant et plein de vie. Ce mois précède le calme veranillo de septembre, si bien que la fin août laisse parfois entrevoir le temps plus clair à venir.',
      ],
      rainHeading: 'Combien pleut-il ?',
      rainParagraph:
        'Août affiche en moyenne environ 320 mm. Attendez-vous à des journées chaudes avec des averses régulières et quelques épisodes plus intenses, généralement entrecoupés d\'éclaircies plutôt qu\'une pluie continue toute la journée.',
      rainyDayIntro: 'Quand la pluie arrive, les options ne manquent pas :',
      rainyDayItems: [
        'Faites un tour du cacao et du chocolat',
        'Explorez un parc national Cahuita luxuriant et spectaculaire',
        'Visitez une communauté autochtone Bribri',
      ],
      crowdsHeading: 'Affluence, prix et événements',
      crowdsParagraph:
        'Début août, on croise encore quelques voyageurs des vacances d\'été. Leur nombre baisse plus tard dans le mois, vers des conditions de saison verte plus calmes et plus abordables.',
      stayRecommendationTitle: 'Où loger à Puerto Viejo en août',
      verdictHeading: 'Août est-il une bonne période pour visiter ?',
      verdictParagraph:
        'Oui, pour les voyageurs de la saison verte. Vous profitez d\'un temps chaud et luxuriant, d\'un bon rapport qualité-prix, de matinées lumineuses et du calme veranillo juste au coin. Prévoyez pour les averses.',
      hubLinkText: 'Voir le guide météo complet mois par mois →',
      takeawaysHeading: 'À retenir',
      takeawaysParagraph:
        'Août est chaud, vert et plein d\'atmosphère, avec des épisodes de pluie et de bonnes vagues, juste avant le veranillo de septembre. Organisez-vous autour des matinées lumineuses et emportez une veste de pluie ; c\'est un mois luxuriant et avantageux sur la côte.',
    },
    it: {
      seoTitle: 'Meteo a Puerto Viejo ad agosto: clima, pioggia e mare',
      seoDescription:
        'Ad agosto Puerto Viejo de Talamanca è caldo e verde, con fasi di pioggia, una giungla spettacolare e buone onde. Ecco cosa aspettarti e come organizzare il viaggio.',
      heading: 'Meteo a Puerto Viejo ad agosto',
      heroAlt: 'Giungla verde spettacolare e spiaggia a Puerto Viejo de Talamanca ad agosto',
      photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Agosto in breve',
      snapshot: [
        { label: 'Temperatura', value: '28°C / 23°C' },
        { label: 'Pioggia', value: '~320 mm, fasi di pioggia, caldo' },
        { label: 'Mare', value: 'Un po\' di surf, caldo, ~28°C' },
        { label: 'Affluenza', value: 'Moderata, in calo a fine mese' },
      ],
      whatItsLikeHeading: 'Com\'è agosto di solito',
      whatItsLikeParagraphs: [
        'Agosto resta caldo e verde, con fasi di pioggia che si susseguono e la giungla nel suo aspetto più spettacolare. Tra un acquazzone e l\'altro tornano le schiarite luminose, spesso al mattino.',
        'Il surf può essere buono e il paesaggio è rigoglioso e pieno di vita. Agosto si colloca appena prima del tranquillo veranillo di settembre, così a fine mese a volte si intravede già il tempo più limpido in arrivo.',
      ],
      rainHeading: 'Quanto piove?',
      rainParagraph:
        'Agosto registra in media circa 320 mm. Aspettati giornate calde con acquazzoni regolari e qualche rovescio più intenso, di solito intervallati da schiarite anziché una pioggia continua per tutto il giorno.',
      rainyDayIntro: 'Quando arriva la pioggia, le opzioni non mancano:',
      rainyDayItems: [
        'Fai un tour del cacao e del cioccolato',
        'Esplora un Parco Nazionale di Cahuita rigoglioso e spettacolare',
        'Visita una comunità indigena Bribri',
      ],
      crowdsHeading: 'Affluenza, prezzi ed eventi',
      crowdsParagraph:
        'A inizio agosto ci sono ancora alcuni viaggiatori delle vacanze estive. Il loro numero cala con l\'avanzare del mese, verso condizioni di stagione verde più tranquille ed economiche.',
      stayRecommendationTitle: 'Dove alloggiare a Puerto Viejo ad agosto',
      verdictHeading: 'Agosto è un buon periodo per visitare?',
      verdictParagraph:
        'Sì, per i viaggiatori della stagione verde. Trovi un clima caldo e rigoglioso, un buon rapporto qualità-prezzo, mattine luminose e il tranquillo veranillo dietro l\'angolo. Metti in valigia per gli acquazzoni.',
      hubLinkText: 'Guarda la guida meteo completa mese per mese →',
      takeawaysHeading: 'Punti chiave',
      takeawaysParagraph:
        'Agosto è caldo, verde e suggestivo, con fasi di pioggia e buone onde, appena prima del veranillo di settembre. Organizzati intorno alle mattine luminose e porta una giacca impermeabile; è un mese rigoglioso e conveniente sulla costa.',
    },
    pt: {
      seoTitle: 'Clima em Puerto Viejo em agosto: tempo, chuva e mar',
      seoDescription:
        'Agosto em Puerto Viejo de Talamanca é quente e verde, com períodos de chuva, uma selva dramática e boas ondas. Veja o que esperar e como planejar sua viagem.',
      heading: 'Clima em Puerto Viejo em agosto',
      heroAlt: 'Selva verde dramática e praia em Puerto Viejo de Talamanca em agosto',
      photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Agosto num relance',
      snapshot: [
        { label: 'Temperatura', value: '28°C / 23°C' },
        { label: 'Chuva', value: '~320 mm, períodos de chuva, quente' },
        { label: 'Mar', value: 'Um pouco de surfe, quente, ~28°C' },
        { label: 'Movimento', value: 'Moderado, diminuindo no fim do mês' },
      ],
      whatItsLikeHeading: 'Como agosto costuma ser',
      whatItsLikeParagraphs: [
        'Agosto continua quente e verde, com períodos de chuva passando e a selva no seu visual mais dramático. Entre as pancadas de chuva ainda surgem aberturas de sol, quase sempre de manhã.',
        'O surfe pode ser bom e a paisagem está exuberante e cheia de vida. Agosto fica logo antes do tranquilo veranillo de setembro, então no fim do mês às vezes já dá para sentir o tempo mais aberto que está por vir.',
      ],
      rainHeading: 'Quanto chove?',
      rainParagraph:
        'Agosto tem em média cerca de 320 mm. Espere dias quentes com pancadas regulares e alguns aguaceiros mais fortes, geralmente intercalados por períodos de sol em vez de chuva o dia inteiro.',
      rainyDayIntro: 'Quando a chuva chega, as opções não faltam:',
      rainyDayItems: [
        'Faça um tour de cacau e chocolate',
        'Explore um Parque Nacional Cahuita exuberante e dramático',
        'Visite uma comunidade indígena Bribri',
      ],
      crowdsHeading: 'Movimento, preços e eventos',
      crowdsParagraph:
        'O início de agosto ainda recebe alguns viajantes das férias de verão. Esse número diminui mais para o fim do mês, rumo a condições de estação verde mais tranquilas e baratas.',
      stayRecommendationTitle: 'Onde se hospedar em Puerto Viejo em agosto',
      verdictHeading: 'Agosto é uma boa época para visitar?',
      verdictParagraph:
        'Sim, para viajantes da estação verde. Você tem um tempo quente e exuberante, bom custo-benefício, manhãs ensolaradas e o tranquilo veranillo logo ali. Leve roupa para pancadas de chuva.',
      hubLinkText: 'Veja o guia de clima completo mês a mês →',
      takeawaysHeading: 'Pontos principais',
      takeawaysParagraph:
        'Agosto é quente, verde e cheio de atmosfera, com períodos de chuva e boas ondas, logo antes do veranillo de setembro. Organize-se em torno das manhãs ensolaradas e leve uma capa de chuva; é um mês exuberante e de bom custo-benefício no litoral.',
    },
    he: {
      seoTitle: 'מזג האוויר בפוארטו ויאחו באוגוסט: אקלים, גשם וים',
      seoDescription:
        'אוגוסט בפוארטו ויאחו דה טלמנקה חם וירוק, עם ממטרים, ג\'ונגל דרמטי וגלישה טובה. הנה למה לצפות ואיך לתכנן את הטיול.',
      heading: 'מזג האוויר בפוארטו ויאחו באוגוסט',
      heroAlt: 'ג\'ונגל ירוק דרמטי וחוף בפוארטו ויאחו דה טלמנקה באוגוסט',
      photoCredit: <>צילום: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'אוגוסט במבט מהיר',
      snapshot: [
        { label: 'טמפרטורה', value: '28°C / 23°C' },
        { label: 'גשם', value: '~320 mm, ממטרים, חם' },
        { label: 'ים', value: 'מעט גלישה, חמים, ~28°C' },
        { label: 'עומס מבקרים', value: 'בינוני, פוחת לקראת סוף החודש' },
      ],
      whatItsLikeHeading: 'איך מרגיש אוגוסט',
      whatItsLikeParagraphs: [
        'אוגוסט נשאר חם וירוק, עם ממטרים שחולפים והג\'ונגל במיטבו הדרמטי. בין הממטרים עדיין מגיעות הפוגות בהירות, לרוב בבקרים.',
        'הגלישה יכולה להיות טובה והנוף שופע וחי. זה ממש לפני ה-veranillo הרגוע של ספטמבר, כך שסוף אוגוסט לפעמים מתחיל לרמז על מזג האוויר הבהיר יותר שמגיע.',
      ],
      rainHeading: 'כמה יורד גשם?',
      rainParagraph:
        'באוגוסט יורדים בממוצע כ-320 מ"מ. צפו לימים חמים עם ממטרים סדירים ומדי פעם מטחים חזקים יותר, שלרוב נקטעים בהפוגות בהירות ולא גשם לאורך כל היום.',
      rainyDayIntro: 'כשהגשם מגיע, לא חסרות אפשרויות:',
      rainyDayItems: [
        'צאו לסיור קקאו ושוקולד',
        'טיילו בפארק הלאומי Cahuita השופע והדרמטי',
        'בקרו בקהילת הילידים Bribri',
      ],
      crowdsHeading: 'עומס מבקרים, מחירים ואירועים',
      crowdsParagraph:
        'בתחילת אוגוסט עדיין מגיעים כמה מטיילים של חופשת הקיץ, ומספרם פוחת בהמשך החודש לעבר תנאי עונה ירוקה רגועים וזולים יותר.',
      stayRecommendationTitle: 'איפה להתארח בפוארטו ויאחו באוגוסט',
      verdictHeading: 'האם אוגוסט הוא זמן טוב לביקור?',
      verdictParagraph:
        'כן, למטיילי העונה הירוקה. תקבלו מזג אוויר חם ושופע ותמורה טובה למחיר, עם בקרים בהירים וה-veranillo הרגוע ממש מעבר לפינה. ארזו לקראת ממטרים.',
      hubLinkText: 'למדריך מזג האוויר המלא חודש אחר חודש →',
      takeawaysHeading: 'נקודות עיקריות',
      takeawaysParagraph:
        'אוגוסט חם, ירוק ואטמוספרי, עם ממטרים וגלישה טובה, ממש לפני ה-veranillo של ספטמבר. תכננו סביב הבקרים הבהירים וארזו מעיל גשם; זהו חודש שופע ומשתלם לאורך החוף.',
    },
    hi: {
      seoTitle: 'अगस्त में प्यूर्तो विएखो का मौसम: जलवायु, बारिश और समुद्र',
      seoDescription:
        'अगस्त में प्यूर्तो विएखो दे तालामांका गर्म और हरा-भरा रहता है, बारिश के दौर, नाटकीय जंगल और अच्छी सर्फिंग के साथ। जानिए क्या उम्मीद करें और अपनी यात्रा की योजना कैसे बनाएं।',
      heading: 'अगस्त में प्यूर्तो विएखो का मौसम',
      heroAlt: 'अगस्त में प्यूर्तो विएखो दे तालामांका में नाटकीय हरा-भरा जंगल और समुद्र तट',
      photoCredit: <>फ़ोटो: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'एक नज़र में अगस्त',
      snapshot: [
        { label: 'तापमान', value: '28°C / 23°C' },
        { label: 'बारिश', value: '~320 mm, बारिश के दौर, गर्म' },
        { label: 'समुद्र', value: 'थोड़ी सर्फिंग, गर्म, ~28°C' },
        { label: 'भीड़', value: 'मध्यम, महीने के अंत तक घटती हुई' },
      ],
      whatItsLikeHeading: 'अगस्त आमतौर पर कैसा होता है',
      whatItsLikeParagraphs: [
        'अगस्त गर्म और हरा-भरा बना रहता है, बारिश के दौर गुज़रते हैं और जंगल अपने सबसे नाटकीय रूप में दिखता है। बौछारों के बीच उजली धूप के पल भी मिलते हैं, अक्सर सुबह के समय।',
        'सर्फिंग अच्छी हो सकती है और नज़ारा हरा-भरा और जीवंत रहता है। यह सितंबर के शांत veranillo से ठीक पहले आता है, इसलिए अगस्त के आखिर में कभी-कभी आगे आने वाले साफ़ मौसम की झलक मिलने लगती है।',
      ],
      rainHeading: 'कितनी बारिश होती है?',
      rainParagraph:
        'अगस्त में औसतन लगभग 320 mm बारिश होती है। गर्म दिनों के साथ नियमित बौछारों और कभी-कभी तेज़ झड़ियों की उम्मीद करें, जो आमतौर पर पूरे दिन बरसने के बजाय उजले अंतरालों से बंटी रहती हैं।',
      rainyDayIntro: 'जब बारिश आती है, तो विकल्पों की कमी नहीं होती:',
      rainyDayItems: [
        'कोको और चॉकलेट टूर करें',
        'हरे-भरे और नाटकीय Cahuita राष्ट्रीय उद्यान की सैर करें',
        'किसी Bribri आदिवासी समुदाय में जाएं',
      ],
      crowdsHeading: 'भीड़, कीमतें और आयोजन',
      crowdsParagraph:
        'अगस्त की शुरुआत में गर्मियों की छुट्टियों के कुछ यात्री अब भी आते हैं, जो महीने के आगे बढ़ने के साथ घटकर अधिक शांत और सस्ती हरित-ऋतु की स्थितियों की ओर जाते हैं।',
      stayRecommendationTitle: 'अगस्त में प्यूर्तो विएखो में कहाँ ठहरें',
      verdictHeading: 'क्या अगस्त घूमने के लिए अच्छा समय है?',
      verdictParagraph:
        'हाँ, हरित-ऋतु के यात्रियों के लिए। आपको गर्म और हरा-भरा मौसम और अच्छा मूल्य मिलता है, उजली सुबहों और ठीक कोने पर मौजूद शांत veranillo के साथ। बौछारों के लिए सामान बांधें।',
      hubLinkText: 'महीने-दर-महीने की पूरी मौसम गाइड देखें →',
      takeawaysHeading: 'मुख्य बातें',
      takeawaysParagraph:
        'अगस्त गर्म, हरा-भरा और खुशनुमा होता है, बारिश के दौर और अच्छी सर्फिंग के साथ, सितंबर के veranillo से ठीक पहले। उजली सुबहों के हिसाब से योजना बनाएं और रेनकोट साथ रखें; तट पर यह एक हरा-भरा और किफ़ायती महीना है।',
    },
    nl: {
      seoTitle: 'Weer in Puerto Viejo in augustus: klimaat, regen en zee',
      seoDescription:
        'Augustus in Puerto Viejo de Talamanca is warm en groen, met regenbuien, een indrukwekkende jungle en goede surf. Dit kun je verwachten en zo plan je je reis.',
      heading: 'Weer in Puerto Viejo in augustus',
      heroAlt: 'Indrukwekkende groene jungle en strand in Puerto Viejo de Talamanca in augustus',
      photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Augustus in het kort',
      snapshot: [
        { label: 'Temperatuur', value: '28°C / 23°C' },
        { label: 'Regen', value: '~320 mm, regenbuien, warm' },
        { label: 'Zee', value: 'Wat surf, warm, ~28°C' },
        { label: 'Drukte', value: 'Matig, neemt af tegen het eind van de maand' },
      ],
      whatItsLikeHeading: 'Hoe augustus meestal is',
      whatItsLikeParagraphs: [
        'Augustus blijft warm en groen, met overtrekkende regenbuien en de jungle op zijn indrukwekkendst. Tussen de buien door komen nog steeds heldere opklaringen, vaak in de ochtend.',
        'De surf kan goed zijn en het landschap is weelderig en vol leven. Het valt net voor de rustige veranillo van september, dus eind augustus geeft soms al een hint van het helderder weer dat eraan komt.',
      ],
      rainHeading: 'Hoeveel regent het?',
      rainParagraph:
        'Augustus komt gemiddeld uit op zo\'n 320 mm. Verwacht warme dagen met regelmatige buien en af en toe een fellere plens, meestal afgewisseld met heldere periodes in plaats van de hele dag regen.',
      rainyDayIntro: 'Als de regen komt, zijn er opties genoeg:',
      rainyDayItems: [
        'Doe een cacao- en chocoladetour',
        'Verken het weelderige, indrukwekkende nationaal park Cahuita',
        'Bezoek een inheemse Bribri-gemeenschap',
      ],
      crowdsHeading: 'Drukte, prijzen en evenementen',
      crowdsParagraph:
        'Begin augustus zijn er nog wat zomervakantiegangers. Hun aantal neemt later in de maand af, richting rustigere, voordeligere omstandigheden van het groene seizoen.',
      stayRecommendationTitle: 'Waar te overnachten in Puerto Viejo in augustus',
      verdictHeading: 'Is augustus een goede tijd om te bezoeken?',
      verdictParagraph:
        'Ja, voor reizigers in het groene seizoen. Je krijgt warm, weelderig weer en goede prijzen, met heldere ochtenden en de rustige veranillo net om de hoek. Pak in voor buien.',
      hubLinkText: 'Bekijk de volledige weergids maand voor maand →',
      takeawaysHeading: 'Belangrijkste punten',
      takeawaysParagraph:
        'Augustus is warm, groen en sfeervol, met regenbuien en goede surf, net voor de veranillo van september. Plan rond de heldere ochtenden en neem een regenjas mee; het is een weelderige, voordelige maand aan de kust.',
    },
  },
  september: {
    en: {
      seoTitle: 'Weather in Puerto Viejo in September: climate, rain and sea',
      seoDescription:
        'September in Puerto Viejo de Talamanca is the start of the veranillo, with calmer seas, clear water and some of the fewest crowds all year. Here is what to expect.',
      heading: 'Weather in Puerto Viejo in September',
      heroAlt: 'Calm Caribbean sea in Puerto Viejo de Talamanca in September',
      photoCredit: <>Photo: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'September at a glance',
      snapshot: [
        { label: 'Temperature', value: '28°C / 22°C' },
        { label: 'Rain', value: '~165 mm, one of the drier months' },
        { label: 'Sea', value: 'Calm and clear, ~29°C' },
        { label: 'Crowds', value: 'Low, great value' },
      ],
      whatItsLikeHeading: 'What September is actually like',
      whatItsLikeParagraphs: [
        'September is the quiet secret of the southern Caribbean. While much of Costa Rica is in its rainiest stretch, Puerto Viejo slips into the veranillo, the "little summer", when the Talamanca mountains hold the heaviest rain back and the coast stays comparatively bright.',
        'The sea is at its calmest and clearest, so this is one of the best months of the year for snorkelling and swimming. Days are warm and often sunny, and any rain tends to come as a short afternoon or overnight shower.',
      ],
      rainHeading: 'How much does it rain?',
      rainParagraph:
        'September is one of the driest months here, averaging around 165 mm. That is not dry in absolute terms, but the rain usually comes in short bursts rather than all-day grey, so you will still get plenty of beach time.',
      rainyDayIntro: 'If a shower does roll through, you have plenty of options:',
      rainyDayItems: [
        'Snorkel between showers, when visibility is excellent',
        'Take a cacao farm and chocolate tour',
        'Explore Cahuita National Park with fewer people on the trails',
      ],
      crowdsHeading: 'Crowds, prices and events',
      crowdsParagraph:
        'This is one of the best-value windows of the year. Crowds are thin, room rates are low, and most of the town stays open, so you get calm, clear conditions without the peak-season prices.',
      stayRecommendationTitle: 'Where to stay in Puerto Viejo in September',
      verdictHeading: 'Is September a good time to visit?',
      verdictParagraph:
        'Yes. For many travellers it is the sweet spot. If you want calm, clear sea, warm sunny days and low prices, September is hard to beat on the Caribbean coast.',
      hubLinkText: 'See the full month-by-month weather guide →',
      takeawaysHeading: 'Key takeaways',
      takeawaysParagraph:
        'September brings the veranillo to Puerto Viejo: calm, clear seas, some of the driest weather of the year, thin crowds and low prices. Pack for the odd shower, but expect one of the best months for the beach and the reef.',
    },
    es: {
      seoTitle: 'El clima en Puerto Viejo en septiembre: tiempo, lluvia y mar',
      seoDescription:
        'Septiembre en Puerto Viejo de Talamanca marca el inicio del veranillo, con mar más tranquilo, agua clara y de la menor afluencia del año. Esto es lo que puedes esperar.',
      heading: 'El Clima en Puerto Viejo en Septiembre',
      heroAlt: 'Mar caribeño en calma en Puerto Viejo de Talamanca en septiembre',
      photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Septiembre de un vistazo',
      snapshot: [
        { label: 'Temperatura', value: '28°C / 22°C' },
        { label: 'Lluvia', value: '~165 mm, de los meses más secos' },
        { label: 'Mar', value: 'En calma y claro, ~29°C' },
        { label: 'Afluencia', value: 'Baja, excelente relación calidad-precio' },
      ],
      whatItsLikeHeading: 'Cómo es septiembre en realidad',
      whatItsLikeParagraphs: [
        'Septiembre es el secreto tranquilo del Caribe Sur. Mientras gran parte de Costa Rica vive su época más lluviosa, Puerto Viejo entra en el veranillo, el "pequeño verano", cuando las montañas de Talamanca frenan la lluvia más fuerte y la costa se mantiene comparativamente despejada.',
        'El mar está en su punto más tranquilo y claro, y eso convierte a este en uno de los mejores meses del año para hacer snorkel y nadar. Los días son cálidos y a menudo soleados, y la lluvia suele llegar como un aguacero corto por la tarde o la noche.',
      ],
      rainHeading: '¿Cuánto llueve?',
      rainParagraph:
        'Septiembre es uno de los meses más secos aquí, con unos 165 mm de promedio. No es seco en términos absolutos, pero la lluvia suele caer en ráfagas breves y no en días grises enteros, así que tendrás mucho tiempo de playa.',
      rainyDayIntro: 'Si pasa un aguacero, tienes muchas opciones:',
      rainyDayItems: [
        'Haz snorkel entre aguaceros, cuando la visibilidad es excelente',
        'Haz un tour de cacao y chocolate',
        'Recorre el Parque Nacional Cahuita con menos gente en los senderos',
      ],
      crowdsHeading: 'Afluencia, precios y eventos',
      crowdsParagraph:
        'Es una de las mejores ventanas del año en cuanto a precio. Hay poca gente, las tarifas son bajas y casi todo el pueblo sigue abierto, así que disfrutas de condiciones tranquilas y claras sin los precios de temporada alta.',
      stayRecommendationTitle: 'Dónde hospedarte en Puerto Viejo en septiembre',
      verdictHeading: '¿Es septiembre una buena época para visitar?',
      verdictParagraph:
        'Sí. Para muchos viajeros es el momento ideal. Si buscas mar en calma y claro, días cálidos y soleados y precios bajos, septiembre es difícil de superar en el Caribe.',
      hubLinkText: 'Ver la guía completa del clima mes a mes →',
      takeawaysHeading: 'Puntos clave',
      takeawaysParagraph:
        'Septiembre trae el veranillo a Puerto Viejo: mar en calma y claro, un clima de los más secos del año, poca gente y precios bajos. Lleva algo para algún aguacero, pero espera uno de los mejores meses para la playa y el arrecife.',
    },
    de: {
      seoTitle: 'Wetter in Puerto Viejo im September: Klima, Regen und Meer',
      seoDescription:
        'Der September in Puerto Viejo de Talamanca läutet den Veranillo ein, mit ruhigerer See, klarem Wasser und einem der ruhigsten Monate des Jahres. Das erwartet Sie.',
      heading: 'Wetter in Puerto Viejo im September',
      heroAlt: 'Ruhige Karibiksee in Puerto Viejo de Talamanca im September',
      photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Der September auf einen Blick',
      snapshot: [
        { label: 'Temperatur', value: '28°C / 22°C' },
        { label: 'Regen', value: '~165 mm, einer der trockeneren Monate' },
        { label: 'Meer', value: 'Ruhig und klar, ~29°C' },
        { label: 'Andrang', value: 'Gering, hervorragendes Preis-Leistungs-Verhältnis' },
      ],
      whatItsLikeHeading: 'Wie der September tatsächlich ist',
      whatItsLikeParagraphs: [
        'Der September ist das stille Geheimnis der südlichen Karibik. Während weite Teile Costa Ricas ihre regenreichste Zeit erleben, tritt Puerto Viejo in den Veranillo ein, den "kleinen Sommer", wenn die Talamanca-Berge den stärksten Regen fernhalten und die Küste vergleichsweise hell bleibt.',
        'Das Meer ist so ruhig und klar wie selten, was diesen Monat zu einem der besten des Jahres zum Schnorcheln und Schwimmen macht. Die Tage sind warm und oft sonnig, und Regen kommt meist als kurzer Schauer am Nachmittag oder in der Nacht.',
      ],
      rainHeading: 'Wie viel regnet es?',
      rainParagraph:
        'Der September ist hier einer der trockensten Monate, mit durchschnittlich rund 165 mm. Absolut gesehen ist das nicht trocken, doch der Regen kommt meist in kurzen Schüben statt als tagelanges Grau, sodass reichlich Zeit für den Strand bleibt.',
      rainyDayIntro: 'Zieht doch ein Schauer durch, haben Sie viele Möglichkeiten:',
      rainyDayItems: [
        'Schnorcheln zwischen den Schauern, wenn die Sicht ausgezeichnet ist',
        'Eine Kakaofarm- und Schokoladentour unternehmen',
        'Den Cahuita-Nationalpark mit weniger Menschen auf den Wegen erkunden',
      ],
      crowdsHeading: 'Andrang, Preise und Veranstaltungen',
      crowdsParagraph:
        'Dies ist eines der preislich attraktivsten Zeitfenster des Jahres. Der Andrang ist gering, die Zimmerpreise sind niedrig und der Großteil des Ortes bleibt geöffnet, sodass Sie ruhige, klare Bedingungen ohne die Preise der Hauptsaison genießen.',
      stayRecommendationTitle: 'Wo Sie im September in Puerto Viejo übernachten',
      verdictHeading: 'Ist der September eine gute Reisezeit?',
      verdictParagraph:
        'Ja. Für viele Reisende ist er der ideale Zeitpunkt. Wenn Sie ruhige, klare See, warme Sonnentage und niedrige Preise möchten, ist der September an der Karibikküste kaum zu schlagen.',
      hubLinkText: 'Zum vollständigen Monat-für-Monat-Wetterguide →',
      takeawaysHeading: 'Das Wichtigste in Kürze',
      takeawaysParagraph:
        'Der September bringt den Veranillo nach Puerto Viejo: ruhige, klare See, eines der trockeneren Wetter des Jahres, wenig Andrang und niedrige Preise. Packen Sie etwas für den gelegentlichen Schauer ein, freuen Sie sich aber auf einen der besten Monate für Strand und Riff.',
    },
    fr: {
      seoTitle: 'Météo à Puerto Viejo en septembre : climat, pluie et mer',
      seoDescription:
        'Septembre à Puerto Viejo de Talamanca marque le début du veranillo, avec une mer plus calme, une eau claire et l\'une des périodes les moins fréquentées de l\'année. Voici à quoi vous attendre.',
      heading: 'Météo à Puerto Viejo en septembre',
      heroAlt: 'Mer des Caraïbes calme à Puerto Viejo de Talamanca en septembre',
      photoCredit: <>Photo : <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Septembre en un coup d\'œil',
      snapshot: [
        { label: 'Température', value: '28°C / 22°C' },
        { label: 'Pluie', value: '~165 mm, l\'un des mois les plus secs' },
        { label: 'Mer', value: 'Calme et claire, ~29°C' },
        { label: 'Affluence', value: 'Faible, excellent rapport qualité-prix' },
      ],
      whatItsLikeHeading: 'À quoi ressemble septembre',
      whatItsLikeParagraphs: [
        'Septembre est le secret bien gardé des Caraïbes du Sud. Alors qu\'une grande partie du Costa Rica connaît sa période la plus pluvieuse, Puerto Viejo entre dans le veranillo, le "petit été", lorsque les montagnes de Talamanca tiennent à distance les pluies les plus fortes et que la côte reste comparativement lumineuse.',
        'La mer est à son plus calme et à son plus limpide, ce qui fait de ce mois l\'un des meilleurs de l\'année pour le snorkeling et la baignade. Les journées sont chaudes et souvent ensoleillées, et la pluie tombe plutôt sous forme d\'une brève averse l\'après-midi ou la nuit.',
      ],
      rainHeading: 'Combien pleut-il ?',
      rainParagraph:
        'Septembre est ici l\'un des mois les plus secs, avec environ 165 mm en moyenne. Ce n\'est pas sec dans l\'absolu, mais la pluie tombe généralement par courtes averses plutôt qu\'en journées grises entières, et vous profiterez de belles heures à la plage.',
      rainyDayIntro: 'Si une averse passe, les options ne manquent pas :',
      rainyDayItems: [
        'Faire du snorkeling entre les averses, quand la visibilité est excellente',
        'Suivre une visite d\'une plantation de cacao et une dégustation de chocolat',
        'Explorer le parc national de Cahuita avec moins de monde sur les sentiers',
      ],
      crowdsHeading: 'Affluence, prix et événements',
      crowdsParagraph:
        'C\'est l\'une des meilleures périodes de l\'année côté prix. L\'affluence est réduite, les tarifs des chambres sont bas et la plupart du village reste ouvert, si bien que vous profitez de conditions calmes et limpides sans les prix de la haute saison.',
      stayRecommendationTitle: 'Où séjourner à Puerto Viejo en septembre',
      verdictHeading: 'Septembre est-il une bonne période pour venir ?',
      verdictParagraph:
        'Oui. Pour de nombreux voyageurs, c\'est le moment idéal. Si vous recherchez une mer calme et claire, des journées chaudes et ensoleillées et des prix bas, septembre est difficile à battre sur la côte caraïbe.',
      hubLinkText: 'Voir le guide météo complet mois par mois →',
      takeawaysHeading: 'À retenir',
      takeawaysParagraph:
        'Septembre apporte le veranillo à Puerto Viejo : mer calme et claire, l\'un des temps les plus secs de l\'année, peu de monde et prix bas. Prévoyez de quoi affronter une averse, mais attendez-vous à l\'un des meilleurs mois pour la plage et le récif.',
    },
    it: {
      seoTitle: 'Meteo a Puerto Viejo a settembre: clima, pioggia e mare',
      seoDescription:
        'Settembre a Puerto Viejo de Talamanca segna l\'inizio del veranillo, con mare più calmo, acqua limpida e uno dei periodi meno affollati dell\'anno. Ecco cosa aspettarsi.',
      heading: 'Meteo a Puerto Viejo a settembre',
      heroAlt: 'Mare caraibico calmo a Puerto Viejo de Talamanca a settembre',
      photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Settembre in breve',
      snapshot: [
        { label: 'Temperatura', value: '28°C / 22°C' },
        { label: 'Pioggia', value: '~165 mm, uno dei mesi più asciutti' },
        { label: 'Mare', value: 'Calmo e limpido, ~29°C' },
        { label: 'Affluenza', value: 'Bassa, ottimo rapporto qualità-prezzo' },
      ],
      whatItsLikeHeading: 'Com\'è settembre',
      whatItsLikeParagraphs: [
        'Settembre è il segreto tranquillo dei Caraibi meridionali. Mentre gran parte del Costa Rica vive il suo periodo più piovoso, Puerto Viejo entra nel veranillo, la "piccola estate", quando le montagne di Talamanca tengono lontane le piogge più intense e la costa resta relativamente luminosa.',
        'Il mare è al suo punto più calmo e limpido, il che rende questo uno dei mesi migliori dell\'anno per lo snorkeling e il nuoto. Le giornate sono calde e spesso soleggiate, e la pioggia tende ad arrivare come un breve acquazzone nel pomeriggio o durante la notte.',
      ],
      rainHeading: 'Quanto piove?',
      rainParagraph:
        'Settembre è qui uno dei mesi più asciutti, con una media di circa 165 mm. Non è asciutto in termini assoluti, ma la pioggia di solito arriva in brevi rovesci anziché in intere giornate grigie, così avrai comunque molto tempo per la spiaggia.',
      rainyDayIntro: 'Se passa un acquazzone, le opzioni non mancano:',
      rainyDayItems: [
        'Fai snorkeling tra un acquazzone e l\'altro, quando la visibilità è eccellente',
        'Partecipa a un tour di una piantagione di cacao e di degustazione del cioccolato',
        'Esplora il Parco Nazionale di Cahuita con meno persone sui sentieri',
      ],
      crowdsHeading: 'Affluenza, prezzi ed eventi',
      crowdsParagraph:
        'È uno dei periodi con il miglior rapporto qualità-prezzo dell\'anno. C\'è poca gente, le tariffe delle camere sono basse e gran parte del paese resta aperto, così godi di condizioni calme e limpide senza i prezzi dell\'alta stagione.',
      stayRecommendationTitle: 'Dove alloggiare a Puerto Viejo a settembre',
      verdictHeading: 'Settembre è un buon momento per visitare?',
      verdictParagraph:
        'Sì. Per molti viaggiatori è il momento perfetto. Se cerchi un mare calmo e limpido, giornate calde e soleggiate e prezzi bassi, settembre è difficile da battere sulla costa caraibica.',
      hubLinkText: 'Vedi la guida meteo completa mese per mese →',
      takeawaysHeading: 'Punti chiave',
      takeawaysParagraph:
        'Settembre porta il veranillo a Puerto Viejo: mare calmo e limpido, uno dei climi più asciutti dell\'anno, poca gente e prezzi bassi. Metti in valigia qualcosa per l\'acquazzone di turno, ma aspettati uno dei mesi migliori per la spiaggia e la barriera corallina.',
    },
    pt: {
      seoTitle: 'Clima em Puerto Viejo em setembro: tempo, chuva e mar',
      seoDescription:
        'Setembro em Puerto Viejo de Talamanca marca o início do veranillo, com mar mais calmo, água clara e uma das épocas menos movimentadas do ano. Veja o que esperar.',
      heading: 'Clima em Puerto Viejo em setembro',
      heroAlt: 'Mar do Caribe calmo em Puerto Viejo de Talamanca em setembro',
      photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Setembro num relance',
      snapshot: [
        { label: 'Temperatura', value: '28°C / 22°C' },
        { label: 'Chuva', value: '~165 mm, um dos meses mais secos' },
        { label: 'Mar', value: 'Calmo e claro, ~29°C' },
        { label: 'Movimento', value: 'Baixo, ótimo custo-benefício' },
      ],
      whatItsLikeHeading: 'Como é setembro',
      whatItsLikeParagraphs: [
        'Setembro é o segredo tranquilo do Caribe Sul. Enquanto grande parte da Costa Rica vive sua época mais chuvosa, Puerto Viejo entra no veranillo, o "pequeno verão", quando as montanhas de Talamanca afastam as chuvas mais fortes e a costa se mantém comparativamente luminosa.',
        'O mar está no seu ponto mais calmo e claro, o que torna este um dos melhores meses do ano para mergulho de snorkel e para nadar. Os dias são quentes e muitas vezes ensolarados, e a chuva costuma chegar como um aguaceiro curto à tarde ou durante a noite.',
      ],
      rainHeading: 'Quanto chove?',
      rainParagraph:
        'Setembro é aqui um dos meses mais secos, com média de cerca de 165 mm. Não é seco em termos absolutos, mas a chuva geralmente vem em rajadas breves, e não em dias inteiros de céu cinzento, então você ainda terá bastante tempo de praia.',
      rainyDayIntro: 'Se passar um aguaceiro, as opções não faltam:',
      rainyDayItems: [
        'Faça snorkel entre os aguaceiros, quando a visibilidade está excelente',
        'Faça um tour de cacau e degustação de chocolate',
        'Explore o Parque Nacional Cahuita com menos gente nas trilhas',
      ],
      crowdsHeading: 'Movimento, preços e eventos',
      crowdsParagraph:
        'Esta é uma das melhores janelas do ano em relação a preço. Há pouca gente, as diárias são baixas e a maior parte da vila continua aberta, então você aproveita condições calmas e claras sem os preços da alta temporada.',
      stayRecommendationTitle: 'Onde se hospedar em Puerto Viejo em setembro',
      verdictHeading: 'Setembro é uma boa época para visitar?',
      verdictParagraph:
        'Sim. Para muitos viajantes é o momento ideal. Se você busca mar calmo e claro, dias quentes e ensolarados e preços baixos, setembro é difícil de superar na costa do Caribe.',
      hubLinkText: 'Ver o guia completo de clima mês a mês →',
      takeawaysHeading: 'Pontos principais',
      takeawaysParagraph:
        'Setembro traz o veranillo a Puerto Viejo: mar calmo e claro, um dos climas mais secos do ano, pouca gente e preços baixos. Leve algo para um aguaceiro, mas espere um dos melhores meses para a praia e o recife.',
    },
    he: {
      seoTitle: 'מזג האוויר בפוארטו ויאחו בספטמבר: אקלים, גשם וים',
      seoDescription:
        'ספטמבר בפוארטו ויאחו דה טלמנקה מסמן את תחילת ה-veranillo: ים רגוע יותר, מים צלולים ואחת התקופות הכי פחות עמוסות בשנה. הנה למה לצפות.',
      heading: 'מזג האוויר בפוארטו ויאחו בספטמבר',
      heroAlt: 'ים קריבי רגוע בפוארטו ויאחו דה טלמנקה בספטמבר',
      photoCredit: <>תמונה: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'ספטמבר במבט חטוף',
      snapshot: [
        { label: 'טמפרטורה', value: '28°C / 22°C' },
        { label: 'גשם', value: '~165 mm, מהחודשים היבשים יותר' },
        { label: 'ים', value: 'רגוע וצלול, ~29°C' },
        { label: 'עומס', value: 'נמוך, תמורה מצוינת למחיר' },
      ],
      whatItsLikeHeading: 'איך ספטמבר מרגיש',
      whatItsLikeParagraphs: [
        'ספטמבר הוא הסוד השקט של דרום הקריביים. בעוד חלק גדול מקוסטה ריקה נמצא בעונה הגשומה ביותר, פוארטו ויאחו נכנס ל-veranillo, ה"קיץ הקטן", כשהרי טלמנקה מרחיקים את הגשמים הכבדים ביותר והחוף נשאר בהיר יחסית.',
        'הים במיטבו, רגוע וצלול, מה שהופך את החודש הזה לאחד הטובים בשנה לשנורקלינג ולשחייה. הימים חמים ולרוב שטופי שמש, והגשם נוטה להגיע כממטר קצר אחר הצהריים או בלילה.',
      ],
      rainHeading: 'כמה יורד גשם?',
      rainParagraph:
        'ספטמבר הוא אחד החודשים היבשים ביותר כאן, עם ממוצע של כ-165 mm. זה לא יבש במונחים מוחלטים, אבל הגשם בדרך כלל מגיע במטחים קצרים ולא כיום אפור שלם, כך שעדיין יישאר לכם המון זמן לחוף.',
      rainyDayIntro: 'אם בכל זאת עובר ממטר, יש לכם שפע של אפשרויות:',
      rainyDayItems: [
        'עשו שנורקלינג בין הממטרים, הראות מצוינת החודש',
        'צאו לסיור בחוות קקאו וטעימת שוקולד',
        'טיילו בפארק הלאומי קאואיטה עם פחות אנשים בשבילים',
      ],
      crowdsHeading: 'עומס, מחירים ואירועים',
      crowdsParagraph:
        'זהו אחד החלונות המשתלמים ביותר בשנה. יש מעט מבקרים, מחירי החדרים נמוכים ורוב העיירה נשאר פתוח, כך שאתם נהנים מתנאים רגועים וצלולים בלי מחירי עונת השיא.',
      stayRecommendationTitle: 'היכן להתארח בפוארטו ויאחו בספטמבר',
      verdictHeading: 'האם ספטמבר הוא זמן טוב לבקר?',
      verdictParagraph:
        'כן. עבור מטיילים רבים זו נקודת המתיקות. אם אתם רוצים ים רגוע וצלול, ימים חמים ושטופי שמש ומחירים נמוכים, קשה לנצח את ספטמבר בחוף הקריבי.',
      hubLinkText: 'צפו במדריך מזג האוויר המלא חודש אחר חודש →',
      takeawaysHeading: 'עיקרי הדברים',
      takeawaysParagraph:
        'ספטמבר מביא את ה-veranillo לפוארטו ויאחו: ים רגוע וצלול, מזג אוויר מהיבשים בשנה, מעט מבקרים ומחירים נמוכים. ארזו משהו לממטר מזדמן, אבל צפו לאחד החודשים הטובים ביותר לחוף ולשונית האלמוגים.',
    },
    hi: {
      seoTitle: 'सितंबर में पुएर्तो विएखो का मौसम: जलवायु, बारिश और समुद्र',
      seoDescription:
        'पुएर्तो विएखो दे तालामांका में सितंबर veranillo की शुरुआत है: शांत समुद्र, साफ़ पानी और साल की सबसे कम भीड़ वाली अवधियों में से एक। जानिए क्या उम्मीद करें।',
      heading: 'सितंबर में पुएर्तो विएखो का मौसम',
      heroAlt: 'सितंबर में पुएर्तो विएखो दे तालामांका में शांत कैरेबियाई समुद्र',
      photoCredit: <>फ़ोटो: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'एक नज़र में सितंबर',
      snapshot: [
        { label: 'तापमान', value: '28°C / 22°C' },
        { label: 'बारिश', value: '~165 mm, सबसे सूखे महीनों में से एक' },
        { label: 'समुद्र', value: 'शांत और साफ़, ~29°C' },
        { label: 'भीड़', value: 'कम, बेहतरीन मूल्य' },
      ],
      whatItsLikeHeading: 'सितंबर असल में कैसा होता है',
      whatItsLikeParagraphs: [
        'सितंबर दक्षिणी कैरेबियन का शांत रहस्य है। जहाँ कोस्टा रिका का बड़ा हिस्सा अपने सबसे बारिश वाले दौर में होता है, वहीं पुएर्तो विएखो veranillo में प्रवेश करता है, यानी "छोटी गर्मी", जब तालामांका के पहाड़ सबसे भारी बारिश को दूर रखते हैं और तट तुलनात्मक रूप से उजला बना रहता है।',
        'समुद्र अपने सबसे शांत और साफ़ रूप में होता है, जो इसे स्नॉर्कलिंग और तैराकी के लिए साल के सबसे अच्छे महीनों में से एक बना देता है। दिन गर्म और अक्सर धूप वाले होते हैं, और बारिश आमतौर पर दोपहर या रात की छोटी-सी बौछार के रूप में आती है।',
      ],
      rainHeading: 'कितनी बारिश होती है?',
      rainParagraph:
        'सितंबर यहाँ के सबसे सूखे महीनों में से एक है, जिसमें औसतन लगभग 165 mm बारिश होती है। पूर्ण रूप से यह सूखा तो नहीं है, लेकिन बारिश आमतौर पर दिन भर के धुंधलेपन के बजाय छोटी-छोटी बौछारों में आती है, इसलिए आपको समुद्र तट पर बिताने के लिए भरपूर समय मिलेगा।',
      rainyDayIntro: 'अगर कोई बौछार आ भी जाए, तो आपके पास ढेरों विकल्प हैं:',
      rainyDayItems: [
        'बौछारों के बीच स्नॉर्कलिंग करें, इस महीने दृश्यता बेहतरीन रहती है',
        'कोको फ़ार्म और चॉकलेट टूर लें',
        'कम भीड़ वाले रास्तों के साथ काउइता राष्ट्रीय उद्यान की सैर करें',
      ],
      crowdsHeading: 'भीड़, कीमतें और आयोजन',
      crowdsParagraph:
        'यह साल की सबसे किफ़ायती अवधियों में से एक है। भीड़ कम रहती है, कमरों के दाम कम होते हैं और अधिकांश कस्बा खुला रहता है, इसलिए आपको पीक-सीज़न की कीमतों के बिना शांत, साफ़ हालात मिलते हैं।',
      stayRecommendationTitle: 'सितंबर में पुएर्तो विएखो में कहाँ ठहरें',
      verdictHeading: 'क्या सितंबर घूमने के लिए अच्छा समय है?',
      verdictParagraph:
        'हाँ। कई यात्रियों के लिए यह आदर्श समय है। अगर आप शांत, साफ़ समुद्र, गर्म धूप वाले दिन और कम कीमतें चाहते हैं, तो कैरेबियाई तट पर सितंबर को मात देना मुश्किल है।',
      hubLinkText: 'महीने-दर-महीने पूरा मौसम गाइड देखें →',
      takeawaysHeading: 'मुख्य बातें',
      takeawaysParagraph:
        'सितंबर पुएर्तो विएखो में veranillo लाता है: शांत, साफ़ समुद्र, साल के सबसे सूखे मौसमों में से एक, कम भीड़ और कम कीमतें। कभी-कभार की बौछार के लिए सामान रखें, पर समुद्र तट और रीफ़ के सबसे बेहतरीन महीनों में से एक की उम्मीद करें।',
    },
    nl: {
      seoTitle: 'Weer in Puerto Viejo in september: klimaat, regen en zee',
      seoDescription:
        'September in Puerto Viejo de Talamanca luidt de veranillo in: kalmere zee, helder water en een van de rustigste periodes van het jaar. Dit kun je verwachten.',
      heading: 'Weer in Puerto Viejo in september',
      heroAlt: 'Kalme Caribische zee in Puerto Viejo de Talamanca in september',
      photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'September in een oogopslag',
      snapshot: [
        { label: 'Temperatuur', value: '28°C / 22°C' },
        { label: 'Regen', value: '~165 mm, een van de drogere maanden' },
        { label: 'Zee', value: 'Kalm en helder, ~29°C' },
        { label: 'Drukte', value: 'Laag, uitstekende prijs-kwaliteitverhouding' },
      ],
      whatItsLikeHeading: 'Hoe september aanvoelt',
      whatItsLikeParagraphs: [
        'September is het stille geheim van de zuidelijke Caraïben. Terwijl een groot deel van Costa Rica in zijn natste periode zit, gaat Puerto Viejo de veranillo in, de "kleine zomer", wanneer de bergen van Talamanca de zwaarste regen op afstand houden en de kust vergelijkbaar helder blijft.',
        'De zee is op haar kalmst en helderst, wat dit een van de beste maanden van het jaar maakt om te snorkelen en te zwemmen. De dagen zijn warm en vaak zonnig, en regen komt meestal als een korte bui in de namiddag of \'s nachts.',
      ],
      rainHeading: 'Hoeveel regent het?',
      rainParagraph:
        'September is hier een van de droogste maanden, met gemiddeld zo\'n 165 mm. Absoluut gezien is dat niet droog, maar de regen komt meestal in korte buien in plaats van als een grijze dag zonder eind, dus je houdt volop stranddagen over.',
      rainyDayIntro: 'Trekt er toch een bui over, dan is er keuze genoeg:',
      rainyDayItems: [
        'Snorkel tussen de buien door, het zicht is deze maand uitstekend',
        'Doe een cacaoplantage- en chocoladetour',
        'Verken Nationaal Park Cahuita met minder mensen op de paden',
      ],
      crowdsHeading: 'Drukte, prijzen en evenementen',
      crowdsParagraph:
        'Dit is een van de voordeligste periodes van het jaar. Het is rustig, de kamerprijzen zijn laag en het grootste deel van het dorp blijft open, dus je geniet van kalme, heldere omstandigheden zonder de prijzen van het hoogseizoen.',
      stayRecommendationTitle: 'Waar te verblijven in Puerto Viejo in september',
      verdictHeading: 'Is september een goede tijd om te bezoeken?',
      verdictParagraph:
        'Ja. Voor veel reizigers is het de ideale periode. Wil je een kalme, heldere zee, warme zonnige dagen en lage prijzen, dan is september aan de Caribische kust moeilijk te verslaan.',
      hubLinkText: 'Bekijk de volledige weergids maand voor maand →',
      takeawaysHeading: 'Belangrijkste punten',
      takeawaysParagraph:
        'September brengt de veranillo naar Puerto Viejo: kalme, heldere zee, een van de drogere periodes van het jaar, weinig drukte en lage prijzen. Pak iets in voor de incidentele bui, maar reken op een van de beste maanden voor het strand en het rif.',
    },
  },
  october: {
    en: {
      seoTitle: 'Weather in Puerto Viejo in October: climate, rain and sea',
      seoDescription:
        'October in Puerto Viejo de Talamanca continues the veranillo: calm seas, thin crowds and the best value of the year on the Caribbean coast. Here is what to expect.',
      heading: 'Weather in Puerto Viejo in October',
      heroAlt: 'Sunny Caribbean beach in Puerto Viejo de Talamanca in October',
      photoCredit: <>Photo: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'October at a glance',
      snapshot: [
        { label: 'Temperature', value: '28°C / 22°C' },
        { label: 'Rain', value: '~200 mm, still relatively dry' },
        { label: 'Sea', value: 'Calm and clear, ~29°C' },
        { label: 'Crowds', value: 'Low, the best value of the year' },
      ],
      whatItsLikeHeading: 'What October is actually like',
      whatItsLikeParagraphs: [
        'October keeps the veranillo going. While the rest of the country is often at its wettest, the southern Caribbean stays comparatively bright, with calm seas and warm, frequently sunny days.',
        'It is a favourite of divers and snorkellers because the water stays clear and flat. With thin crowds and low prices, October is arguably the best all-round value month to visit Puerto Viejo.',
      ],
      rainHeading: 'How much does it rain?',
      rainParagraph:
        'October averages around 200 mm, still on the drier side for this coast. Expect warm, bright spells broken by the occasional short shower rather than long grey days.',
      rainyDayIntro: 'When a shower passes, there is plenty to do:',
      rainyDayItems: [
        'Dive or snorkel the reef while visibility is at its best',
        'Visit a Bribri Indigenous community and learn about cacao',
        'Relax in a Caribbean café or chocolate shop in town',
      ],
      crowdsHeading: 'Crowds, prices and events',
      crowdsParagraph:
        'October is the quietest, best-value stretch of the year. Rates are low and the beaches feel empty, ideal if you want calm conditions without the crowds or the peak-season prices.',
      stayRecommendationTitle: 'Where to stay in Puerto Viejo in October',
      verdictHeading: 'Is October a good time to visit?',
      verdictParagraph:
        'Absolutely. For calm, clear sea, warm days, thin crowds and the lowest prices, October is one of the smartest months to choose on the Caribbean coast.',
      hubLinkText: 'See the full month-by-month weather guide →',
      takeawaysHeading: 'Key takeaways',
      takeawaysParagraph:
        'October continues the veranillo: calm, clear seas, relatively dry weather, thin crowds and the best value of the year. Pack for the odd shower and enjoy some of the best beach and reef conditions Puerto Viejo offers.',
    },
    es: {
      seoTitle: 'El clima en Puerto Viejo en octubre: tiempo, lluvia y mar',
      seoDescription:
        'Octubre en Puerto Viejo de Talamanca continúa el veranillo: mar en calma, poca gente y la mejor relación calidad-precio del año en el Caribe. Esto es lo que puedes esperar.',
      heading: 'El Clima en Puerto Viejo en Octubre',
      heroAlt: 'Playa caribeña soleada en Puerto Viejo de Talamanca en octubre',
      photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Octubre de un vistazo',
      snapshot: [
        { label: 'Temperatura', value: '28°C / 22°C' },
        { label: 'Lluvia', value: '~200 mm, todavía relativamente seco' },
        { label: 'Mar', value: 'En calma y claro, ~29°C' },
        { label: 'Afluencia', value: 'Baja, la mejor relación calidad-precio del año' },
      ],
      whatItsLikeHeading: 'Cómo es octubre en realidad',
      whatItsLikeParagraphs: [
        'Octubre mantiene el veranillo. Mientras el resto del país suele estar en su época más lluviosa, el Caribe Sur se conserva comparativamente despejado, con mar en calma y días cálidos y con frecuencia soleados.',
        'Es uno de los favoritos de buceadores y aficionados al snorkel porque el agua permanece clara y plana. Con poca gente y precios bajos, octubre es posiblemente el mes con mejor relación calidad-precio para visitar Puerto Viejo.',
      ],
      rainHeading: '¿Cuánto llueve?',
      rainParagraph:
        'Octubre promedia unos 200 mm, todavía del lado más seco para esta costa. Espera ratos cálidos y despejados interrumpidos por algún aguacero corto, y no días grises largos.',
      rainyDayIntro: 'Cuando pasa un aguacero, hay mucho por hacer:',
      rainyDayItems: [
        'Bucea o haz snorkel en el arrecife mientras la visibilidad está en su mejor momento',
        'Visita una comunidad indígena Bribri y aprende sobre el cacao',
        'Relájate en un café caribeño o una chocolatería del pueblo',
      ],
      crowdsHeading: 'Afluencia, precios y eventos',
      crowdsParagraph:
        'Octubre es el período más tranquilo y con mejor precio del año. Las tarifas son bajas y las playas se sienten vacías, ideal si quieres condiciones tranquilas sin multitudes ni precios de temporada alta.',
      stayRecommendationTitle: 'Dónde hospedarte en Puerto Viejo en octubre',
      verdictHeading: '¿Es octubre una buena época para visitar?',
      verdictParagraph:
        'Por supuesto. Para mar en calma y claro, días cálidos, poca gente y los precios más bajos, octubre es uno de los meses más inteligentes para elegir en el Caribe.',
      hubLinkText: 'Ver la guía completa del clima mes a mes →',
      takeawaysHeading: 'Puntos clave',
      takeawaysParagraph:
        'Octubre continúa el veranillo: mar en calma y claro, clima relativamente seco, poca gente y la mejor relación calidad-precio del año. Lleva algo para algún aguacero y disfruta de algunas de las mejores condiciones de playa y arrecife de Puerto Viejo.',
    },
    de: {
      seoTitle: 'Wetter in Puerto Viejo im Oktober: Klima, Regen und Meer',
      seoDescription:
        'Der Oktober in Puerto Viejo de Talamanca setzt den veranillo fort: ruhige See, wenig Andrang und das beste Preis-Leistungs-Verhältnis des Jahres an der Karibikküste. Das erwartet dich.',
      heading: 'Wetter in Puerto Viejo im Oktober',
      heroAlt: 'Sonniger Karibikstrand in Puerto Viejo de Talamanca im Oktober',
      photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Der Oktober auf einen Blick',
      snapshot: [
        { label: 'Temperatur', value: '28°C / 22°C' },
        { label: 'Regen', value: '~200 mm, noch relativ trocken' },
        { label: 'Meer', value: 'Ruhig und klar, ~29°C' },
        { label: 'Andrang', value: 'Gering, das beste Preis-Leistungs-Verhältnis des Jahres' },
      ],
      whatItsLikeHeading: 'Wie der Oktober tatsächlich ist',
      whatItsLikeParagraphs: [
        'Der Oktober hält den veranillo aufrecht. Während der Rest des Landes oft am nassesten ist, bleibt die südliche Karibik vergleichsweise hell, mit ruhiger See und warmen, häufig sonnigen Tagen.',
        'Er ist ein Favorit von Tauchern und Schnorchlern, weil das Wasser klar und glatt bleibt. Bei wenig Andrang und niedrigen Preisen ist der Oktober wohl der Monat mit dem besten Gesamtpreis-Leistungs-Verhältnis für einen Besuch in Puerto Viejo.',
      ],
      rainHeading: 'Wie viel regnet es?',
      rainParagraph:
        'Der Oktober bringt im Schnitt rund 200 mm, für diese Küste noch eher trocken. Erwarte warme, helle Phasen, die von einem gelegentlichen kurzen Schauer unterbrochen werden, statt langer grauer Tage.',
      rainyDayIntro: 'Wenn ein Schauer durchzieht, gibt es viel zu tun:',
      rainyDayItems: [
        'Tauche oder schnorchle am Riff, solange die Sicht am besten ist',
        'Besuche eine indigene Bribri-Gemeinschaft und lerne etwas über Kakao',
        'Entspanne dich in einem karibischen Café oder einer Schokoladenmanufaktur im Ort',
      ],
      crowdsHeading: 'Andrang, Preise und Veranstaltungen',
      crowdsParagraph:
        'Der Oktober ist der ruhigste und günstigste Abschnitt des Jahres. Die Preise sind niedrig und die Strände wirken leer, ideal, wenn du ruhige Bedingungen ohne Menschenmassen und ohne Hauptsaisonpreise möchtest.',
      stayRecommendationTitle: 'Wo man im Oktober in Puerto Viejo übernachtet',
      verdictHeading: 'Ist der Oktober eine gute Reisezeit?',
      verdictParagraph:
        'Auf jeden Fall. Für ruhige, klare See, warme Tage, wenig Andrang und die niedrigsten Preise ist der Oktober einer der klügsten Monate für die Karibikküste.',
      hubLinkText: 'Zum vollständigen Wetterführer Monat für Monat →',
      takeawaysHeading: 'Das Wichtigste in Kürze',
      takeawaysParagraph:
        'Der Oktober setzt den veranillo fort: ruhige, klare See, relativ trockenes Wetter, wenig Andrang und das beste Preis-Leistungs-Verhältnis des Jahres. Pack etwas für den gelegentlichen Schauer ein und genieße einige der besten Strand- und Riffbedingungen, die Puerto Viejo zu bieten hat.',
    },
    fr: {
      seoTitle: 'Météo à Puerto Viejo en octobre : climat, pluie et mer',
      seoDescription:
        'En octobre, Puerto Viejo de Talamanca poursuit le veranillo : mer calme, peu de monde et le meilleur rapport qualité-prix de l\'année sur la côte caraïbe. Voici à quoi s\'attendre.',
      heading: 'Météo à Puerto Viejo en octobre',
      heroAlt: 'Plage caraïbe ensoleillée à Puerto Viejo de Talamanca en octobre',
      photoCredit: <>Photo : <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Octobre en un coup d\'œil',
      snapshot: [
        { label: 'Température', value: '28°C / 22°C' },
        { label: 'Pluie', value: '~200 mm, encore relativement sec' },
        { label: 'Mer', value: 'Calme et claire, ~29°C' },
        { label: 'Affluence', value: 'Faible, le meilleur rapport qualité-prix de l\'année' },
      ],
      whatItsLikeHeading: 'À quoi ressemble octobre',
      whatItsLikeParagraphs: [
        'Octobre maintient le veranillo. Alors que le reste du pays connaît souvent sa période la plus humide, le sud des Caraïbes reste comparativement lumineux, avec une mer calme et des journées chaudes et souvent ensoleillées.',
        'C\'est un mois favori des plongeurs et des amateurs de snorkeling car l\'eau reste claire et plane. Avec peu de monde et des prix bas, octobre est sans doute le mois offrant le meilleur rapport qualité-prix global pour visiter Puerto Viejo.',
      ],
      rainHeading: 'Combien pleut-il ?',
      rainParagraph:
        'Octobre affiche en moyenne environ 200 mm, encore du côté sec pour cette côte. Attendez-vous à des éclaircies chaudes et lumineuses ponctuées d\'une averse courte plutôt qu\'à de longues journées grises.',
      rainyDayIntro: 'Quand une averse passe, il y a de quoi faire :',
      rainyDayItems: [
        'Plongez ou faites du snorkeling sur le récif tant que la visibilité est optimale',
        'Visitez une communauté autochtone Bribri et découvrez le cacao',
        'Détendez-vous dans un café caraïbe ou une chocolaterie du village',
      ],
      crowdsHeading: 'Affluence, prix et événements',
      crowdsParagraph:
        'Octobre est la période la plus calme et la plus avantageuse de l\'année. Les tarifs sont bas et les plages semblent désertes, idéal si vous voulez des conditions paisibles sans la foule ni les prix de haute saison.',
      stayRecommendationTitle: 'Où loger à Puerto Viejo en octobre',
      verdictHeading: 'Octobre est-il une bonne période pour visiter ?',
      verdictParagraph:
        'Absolument. Pour une mer calme et claire, des journées chaudes, peu de monde et les prix les plus bas, octobre est l\'un des mois les plus judicieux à choisir sur la côte caraïbe.',
      hubLinkText: 'Voir le guide météo complet mois par mois →',
      takeawaysHeading: 'À retenir',
      takeawaysParagraph:
        'Octobre poursuit le veranillo : mer calme et claire, temps relativement sec, peu de monde et le meilleur rapport qualité-prix de l\'année. Prévoyez de quoi affronter l\'averse occasionnelle et profitez de certaines des meilleures conditions de plage et de récif qu\'offre Puerto Viejo.',
    },
    it: {
      seoTitle: 'Meteo a Puerto Viejo a ottobre: clima, pioggia e mare',
      seoDescription:
        'A ottobre Puerto Viejo de Talamanca prosegue il veranillo: mare calmo, poca gente e il miglior rapporto qualità-prezzo dell\'anno sulla costa caraibica. Ecco cosa aspettarsi.',
      heading: 'Meteo a Puerto Viejo a ottobre',
      heroAlt: 'Spiaggia caraibica soleggiata a Puerto Viejo de Talamanca a ottobre',
      photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Ottobre in breve',
      snapshot: [
        { label: 'Temperatura', value: '28°C / 22°C' },
        { label: 'Pioggia', value: '~200 mm, ancora relativamente asciutto' },
        { label: 'Mare', value: 'Calmo e limpido, ~29°C' },
        { label: 'Affluenza', value: 'Bassa, il miglior rapporto qualità-prezzo dell\'anno' },
      ],
      whatItsLikeHeading: 'Com\'è ottobre',
      whatItsLikeParagraphs: [
        'Ottobre mantiene vivo il veranillo. Mentre il resto del paese è spesso nel periodo più piovoso, i Caraibi meridionali restano relativamente luminosi, con mare calmo e giornate calde e spesso soleggiate.',
        'È uno dei mesi preferiti da sub e appassionati di snorkeling perché l\'acqua resta limpida e piatta. Con poca gente e prezzi bassi, ottobre è probabilmente il mese con il miglior rapporto qualità-prezzo complessivo per visitare Puerto Viejo.',
      ],
      rainHeading: 'Quanto piove?',
      rainParagraph:
        'Ottobre registra in media circa 200 mm, ancora sul versante più asciutto per questa costa. Aspettati momenti caldi e luminosi interrotti da qualche breve rovescio, anziché lunghe giornate grigie.',
      rainyDayIntro: 'Quando passa un rovescio, c\'è molto da fare:',
      rainyDayItems: [
        'Fai immersioni o snorkeling sulla barriera mentre la visibilità è al massimo',
        'Visita una comunità indigena Bribri e scopri il cacao',
        'Rilassati in un caffè caraibico o in una cioccolateria del paese',
      ],
      crowdsHeading: 'Affluenza, prezzi ed eventi',
      crowdsParagraph:
        'Ottobre è il periodo più tranquillo e conveniente dell\'anno. Le tariffe sono basse e le spiagge sembrano vuote, ideale se cerchi condizioni tranquille senza folla né prezzi dell\'alta stagione.',
      stayRecommendationTitle: 'Dove alloggiare a Puerto Viejo a ottobre',
      verdictHeading: 'Ottobre è un buon periodo per visitare?',
      verdictParagraph:
        'Assolutamente sì. Per mare calmo e limpido, giornate calde, poca gente e i prezzi più bassi, ottobre è uno dei mesi più azzeccati da scegliere sulla costa caraibica.',
      hubLinkText: 'Guarda la guida meteo completa mese per mese →',
      takeawaysHeading: 'Punti chiave',
      takeawaysParagraph:
        'Ottobre prosegue il veranillo: mare calmo e limpido, tempo relativamente asciutto, poca gente e il miglior rapporto qualità-prezzo dell\'anno. Metti in valigia qualcosa per l\'acquazzone di turno e goditi alcune delle migliori condizioni di spiaggia e barriera che Puerto Viejo offre.',
    },
    pt: {
      seoTitle: 'Clima em Puerto Viejo em outubro: tempo, chuva e mar',
      seoDescription:
        'Outubro em Puerto Viejo de Talamanca dá continuidade ao veranillo: mar calmo, pouca gente e o melhor custo-benefício do ano na costa caribenha. Veja o que esperar.',
      heading: 'Clima em Puerto Viejo em outubro',
      heroAlt: 'Praia caribenha ensolarada em Puerto Viejo de Talamanca em outubro',
      photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Outubro num relance',
      snapshot: [
        { label: 'Temperatura', value: '28°C / 22°C' },
        { label: 'Chuva', value: '~200 mm, ainda relativamente seco' },
        { label: 'Mar', value: 'Calmo e claro, ~29°C' },
        { label: 'Movimento', value: 'Baixo, o melhor custo-benefício do ano' },
      ],
      whatItsLikeHeading: 'Como é outubro',
      whatItsLikeParagraphs: [
        'Outubro mantém o veranillo. Enquanto o resto do país costuma estar na época mais chuvosa, o Caribe Sul permanece comparativamente claro, com mar calmo e dias quentes e frequentemente ensolarados.',
        'É um dos favoritos de mergulhadores e adeptos de snorkel porque a água continua clara e plana. Com pouca gente e preços baixos, outubro é possivelmente o mês com o melhor custo-benefício geral para visitar Puerto Viejo.',
      ],
      rainHeading: 'Quanto chove?',
      rainParagraph:
        'Outubro tem em média cerca de 200 mm, ainda no lado mais seco para esta costa. Espere períodos quentes e claros interrompidos por uma pancada curta ocasional, e não longos dias cinzentos.',
      rainyDayIntro: 'Quando passa uma pancada de chuva, há muito para fazer:',
      rainyDayItems: [
        'Mergulhe ou faça snorkel no recife enquanto a visibilidade está no auge',
        'Visite uma comunidade indígena Bribri e aprenda sobre o cacau',
        'Relaxe num café caribenho ou numa chocolataria da vila',
      ],
      crowdsHeading: 'Movimento, preços e eventos',
      crowdsParagraph:
        'Outubro é o período mais tranquilo e de melhor preço do ano. As tarifas são baixas e as praias parecem vazias, ideal se você quer condições calmas sem multidões nem preços de alta temporada.',
      stayRecommendationTitle: 'Onde se hospedar em Puerto Viejo em outubro',
      verdictHeading: 'Outubro é uma boa época para visitar?',
      verdictParagraph:
        'Com certeza. Para mar calmo e claro, dias quentes, pouca gente e os preços mais baixos, outubro é um dos meses mais inteligentes de se escolher na costa caribenha.',
      hubLinkText: 'Ver o guia completo de clima mês a mês →',
      takeawaysHeading: 'Pontos-chave',
      takeawaysParagraph:
        'Outubro dá continuidade ao veranillo: mar calmo e claro, tempo relativamente seco, pouca gente e o melhor custo-benefício do ano. Leve algo para a pancada ocasional e aproveite algumas das melhores condições de praia e recife que Puerto Viejo oferece.',
    },
    he: {
      seoTitle: 'מזג האוויר בפוארטו ויאחו באוקטובר: אקלים, גשם וים',
      seoDescription:
        'אוקטובר בפוארטו ויאחו דה טלמנקה ממשיך את ה-veranillo: ים רגוע, מעט מבקרים והתמורה הטובה ביותר לכסף בשנה בחוף הקריבי. הנה למה לצפות.',
      heading: 'מזג האוויר בפוארטו ויאחו באוקטובר',
      heroAlt: 'חוף קריבי שטוף שמש בפוארטו ויאחו דה טלמנקה באוקטובר',
      photoCredit: <>תמונה: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'אוקטובר במבט חטוף',
      snapshot: [
        { label: 'טמפרטורה', value: '28°C / 22°C' },
        { label: 'גשם', value: '~200 mm, עדיין יבש יחסית' },
        { label: 'ים', value: 'רגוע וצלול, ~29°C' },
        { label: 'עומס מבקרים', value: 'נמוך, התמורה הטובה ביותר לכסף בשנה' },
      ],
      whatItsLikeHeading: 'איך אוקטובר נראה',
      whatItsLikeParagraphs: [
        'אוקטובר משמר את ה-veranillo. בעוד שרוב חלקי המדינה נמצאים לרוב בשיא העונה הגשומה, הקריביים הדרומיים נשארים בהירים יחסית, עם ים רגוע וימים חמים ולעיתים קרובות שטופי שמש.',
        'זהו חודש מועדף על צוללנים ושנורקלרים משום שהמים נשארים צלולים וחלקים. עם מעט מבקרים ומחירים נמוכים, אוקטובר הוא ככל הנראה החודש עם התמורה הכוללת הטובה ביותר לכסף לביקור בפוארטו ויאחו.',
      ],
      rainHeading: 'כמה יורד גשם?',
      rainParagraph:
        'באוקטובר יורדים בממוצע כ-200 מ"מ, עדיין בצד היבש יותר עבור חוף זה. צפו לפרקי זמן חמים ובהירים הנקטעים בממטר קצר מזדמן, ולא לימים אפורים וארוכים.',
      rainyDayIntro: 'כשממטר חולף, יש הרבה מה לעשות:',
      rainyDayItems: [
        'צללו או שנורקלו בשונית בזמן שהראות במיטבה',
        'בקרו בקהילה ילידית של בני בריברי ולמדו על קקאו',
        'הירגעו בבית קפה קריבי או בחנות שוקולד בעיירה',
      ],
      crowdsHeading: 'עומס מבקרים, מחירים ואירועים',
      crowdsParagraph:
        'אוקטובר הוא התקופה השקטה ביותר והמשתלמת ביותר בשנה. המחירים נמוכים והחופים מרגישים ריקים, אידיאלי אם אתם רוצים תנאים רגועים בלי המונים ובלי מחירי עונת השיא.',
      stayRecommendationTitle: 'היכן להתארח בפוארטו ויאחו באוקטובר',
      verdictHeading: 'האם אוקטובר הוא זמן טוב לביקור?',
      verdictParagraph:
        'בהחלט. עבור ים רגוע וצלול, ימים חמים, מעט מבקרים והמחירים הנמוכים ביותר, אוקטובר הוא אחד החודשים החכמים ביותר לבחירה בחוף הקריבי.',
      hubLinkText: 'צפו במדריך מזג האוויר המלא חודש אחר חודש →',
      takeawaysHeading: 'נקודות עיקריות',
      takeawaysParagraph:
        'אוקטובר ממשיך את ה-veranillo: ים רגוע וצלול, מזג אוויר יבש יחסית, מעט מבקרים והתמורה הטובה ביותר לכסף בשנה. ארזו משהו לממטר המזדמן ותיהנו מכמה מהתנאים הטובים ביותר של חוף ושונית שפוארטו ויאחו מציעה.',
    },
    hi: {
      seoTitle: 'अक्टूबर में प्यूर्टो विएखो का मौसम: जलवायु, बारिश और समुद्र',
      seoDescription:
        'प्यूर्टो विएखो दे तालामांका में अक्टूबर veranillo को जारी रखता है: शांत समुद्र, कम भीड़ और कैरिबियन तट पर साल का सबसे अच्छा मूल्य। यहाँ जानिए क्या उम्मीद करें।',
      heading: 'अक्टूबर में प्यूर्टो विएखो का मौसम',
      heroAlt: 'अक्टूबर में प्यूर्टो विएखो दे तालामांका में धूप वाला कैरिबियन समुद्र तट',
      photoCredit: <>फ़ोटो: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'एक नज़र में अक्टूबर',
      snapshot: [
        { label: 'तापमान', value: '28°C / 22°C' },
        { label: 'बारिश', value: '~200 mm, अब भी अपेक्षाकृत सूखा' },
        { label: 'समुद्र', value: 'शांत और साफ़, ~29°C' },
        { label: 'भीड़', value: 'कम, साल का सबसे अच्छा मूल्य' },
      ],
      whatItsLikeHeading: 'अक्टूबर कैसा होता है',
      whatItsLikeParagraphs: [
        'अक्टूबर veranillo को बनाए रखता है। जबकि देश के बाकी हिस्से अक्सर सबसे अधिक गीले होते हैं, दक्षिणी कैरिबियन तुलनात्मक रूप से उज्ज्वल बना रहता है, शांत समुद्र और गर्म, अक्सर धूप वाले दिनों के साथ।',
        'यह गोताखोरों और स्नॉर्कलरों का पसंदीदा है क्योंकि पानी साफ़ और शांत रहता है। कम भीड़ और कम कीमतों के साथ, अक्टूबर संभवतः प्यूर्टो विएखो घूमने के लिए सर्वोत्तम समग्र मूल्य वाला महीना है।',
      ],
      rainHeading: 'कितनी बारिश होती है?',
      rainParagraph:
        'अक्टूबर में औसतन लगभग 200 mm बारिश होती है, इस तट के लिए अब भी सूखे पक्ष पर। लंबे धूसर दिनों के बजाय गर्म, उज्ज्वल अंतरालों की उम्मीद करें जो कभी-कभार की छोटी बौछार से टूटते हैं।',
      rainyDayIntro: 'जब बौछार गुज़रती है, तो करने के लिए बहुत कुछ है:',
      rainyDayItems: [
        'जब दृश्यता अपने सर्वश्रेष्ठ पर हो तब रीफ़ में गोता लगाएँ या स्नॉर्कल करें',
        'किसी ब्रिब्री आदिवासी समुदाय में जाएँ और कोको के बारे में जानें',
        'शहर के किसी कैरिबियन कैफ़े या चॉकलेट की दुकान में आराम करें',
      ],
      crowdsHeading: 'भीड़, कीमतें और आयोजन',
      crowdsParagraph:
        'अक्टूबर साल का सबसे शांत और सबसे किफ़ायती दौर है। दरें कम हैं और समुद्र तट खाली महसूस होते हैं, आदर्श अगर आप भीड़ या पीक-सीज़न की कीमतों के बिना शांत परिस्थितियाँ चाहते हैं।',
      stayRecommendationTitle: 'अक्टूबर में प्यूर्टो विएखो में कहाँ ठहरें',
      verdictHeading: 'क्या अक्टूबर घूमने का अच्छा समय है?',
      verdictParagraph:
        'बिल्कुल। शांत, साफ़ समुद्र, गर्म दिनों, कम भीड़ और सबसे कम कीमतों के लिए, अक्टूबर कैरिबियन तट पर चुनने के लिए सबसे समझदार महीनों में से एक है।',
      hubLinkText: 'महीने-दर-महीने का पूरा मौसम गाइड देखें →',
      takeawaysHeading: 'मुख्य बातें',
      takeawaysParagraph:
        'अक्टूबर veranillo को जारी रखता है: शांत, साफ़ समुद्र, अपेक्षाकृत सूखा मौसम, कम भीड़ और साल का सबसे अच्छा मूल्य। कभी-कभार की बौछार के लिए सामान रखें और प्यूर्टो विएखो द्वारा प्रदान की जाने वाली कुछ बेहतरीन समुद्र तट और रीफ़ परिस्थितियों का आनंद लें।',
    },
    nl: {
      seoTitle: 'Weer in Puerto Viejo in oktober: klimaat, regen en zee',
      seoDescription:
        'Oktober in Puerto Viejo de Talamanca zet de veranillo voort: kalme zee, weinig drukte en de beste prijs-kwaliteitverhouding van het jaar aan de Caribische kust. Dit kun je verwachten.',
      heading: 'Weer in Puerto Viejo in oktober',
      heroAlt: 'Zonnig Caribisch strand in Puerto Viejo de Talamanca in oktober',
      photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Oktober in één oogopslag',
      snapshot: [
        { label: 'Temperatuur', value: '28°C / 22°C' },
        { label: 'Regen', value: '~200 mm, nog relatief droog' },
        { label: 'Zee', value: 'Kalm en helder, ~29°C' },
        { label: 'Drukte', value: 'Laag, de beste prijs-kwaliteitverhouding van het jaar' },
      ],
      whatItsLikeHeading: 'Hoe oktober aanvoelt',
      whatItsLikeParagraphs: [
        'Oktober houdt de veranillo gaande. Terwijl de rest van het land vaak op zijn natst is, blijft het zuidelijke Caribisch gebied vergelijkbaar helder, met kalme zee en warme, vaak zonnige dagen.',
        'Het is een favoriet van duikers en snorkelaars omdat het water helder en vlak blijft. Met weinig drukte en lage prijzen is oktober wellicht de maand met de beste algehele prijs-kwaliteitverhouding om Puerto Viejo te bezoeken.',
      ],
      rainHeading: 'Hoeveel regent het?',
      rainParagraph:
        'Oktober kent gemiddeld zo\'n 200 mm, voor deze kust nog aan de drogere kant. Verwacht warme, heldere periodes onderbroken door een enkele korte bui in plaats van lange grauwe dagen.',
      rainyDayIntro: 'Als er een bui voorbijtrekt, is er genoeg te doen:',
      rainyDayItems: [
        'Duik of snorkel bij het rif terwijl het zicht op zijn best is',
        'Bezoek een inheemse Bribri-gemeenschap en leer over cacao',
        'Ontspan in een Caribisch café of een chocoladewinkel in het dorp',
      ],
      crowdsHeading: 'Drukte, prijzen en evenementen',
      crowdsParagraph:
        'Oktober is de rustigste en voordeligste periode van het jaar. De tarieven zijn laag en de stranden voelen leeg aan, ideaal als je rustige omstandigheden wilt zonder de drukte of de hoogseizoenprijzen.',
      stayRecommendationTitle: 'Waar te verblijven in Puerto Viejo in oktober',
      verdictHeading: 'Is oktober een goede tijd om te bezoeken?',
      verdictParagraph:
        'Absoluut. Voor een kalme, heldere zee, warme dagen, weinig drukte en de laagste prijzen is oktober een van de slimste maanden om te kiezen aan de Caribische kust.',
      hubLinkText: 'Bekijk de volledige weergids maand voor maand →',
      takeawaysHeading: 'Belangrijkste punten',
      takeawaysParagraph:
        'Oktober zet de veranillo voort: kalme, heldere zee, relatief droog weer, weinig drukte en de beste prijs-kwaliteitverhouding van het jaar. Pak iets in voor de incidentele bui en geniet van enkele van de beste strand- en rifomstandigheden die Puerto Viejo te bieden heeft.',
    },
  },
  november: {
    en: {
      seoTitle: 'Weather in Puerto Viejo in November: climate, rain and sea',
      seoDescription:
        'November is one of the wettest months in Puerto Viejo de Talamanca: deep-green jungle, full waterfalls and low prices. Here is what to expect and how to plan around the rain.',
      heading: 'Weather in Puerto Viejo in November',
      heroAlt: 'Lush green rainforest in Puerto Viejo de Talamanca in November',
      photoCredit: <>Photo: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'November at a glance',
      snapshot: [
        { label: 'Temperature', value: '27°C / 22°C' },
        { label: 'Rain', value: '~350-450 mm, one of the wettest months' },
        { label: 'Sea', value: 'Often rougher, ~28°C' },
        { label: 'Crowds', value: 'Low until late month' },
      ],
      whatItsLikeHeading: 'What November is actually like',
      whatItsLikeParagraphs: [
        'November is one of the wettest months on this coast, part of the rainy peak that runs from now into January (June and July are the other wet spell). After the calm veranillo of September and October, the rain returns in force, but it also turns the jungle a deep green and fills the rivers and waterfalls.',
        'You will still get sunny spells, especially in the mornings, but expect heavier and more frequent showers and a rougher sea. It is a month for travellers who love a wild, green landscape and do not mind getting caught in the rain.',
      ],
      rainHeading: 'How much does it rain?',
      rainParagraph:
        'Estimates vary by source, roughly 350 to 450 mm, but November is consistently one of the wettest months, and the ocean tends to be choppier. Rain can arrive at any time of day, so build flexibility into your plans and keep beach days opportunistic.',
      rainyDayIntro: 'The rain opens up the best indoor and jungle experiences:',
      rainyDayItems: [
        'Take a chocolate (cacao) tour, mostly under cover and good in the rain',
        'Chase full-flowing waterfalls and lush jungle trails',
        'Visit a Bribri Indigenous community for cacao and traditional medicine',
      ],
      crowdsHeading: 'Crowds, prices and events',
      crowdsParagraph:
        'November is low season, so prices are among the lowest of the year and the town is quiet, right up until the festive rush begins at the very end of the month. Great value if you are prepared for the weather.',
      stayRecommendationTitle: 'Where to stay in Puerto Viejo in November',
      verdictHeading: 'Is November a good time to visit?',
      verdictParagraph:
        'It depends on what you want. For low prices, empty beaches and a lush, dramatic jungle, yes. If your trip depends on guaranteed beach and calm sea, one of the drier months will suit you better.',
      hubLinkText: 'See the full month-by-month weather guide →',
      takeawaysHeading: 'Key takeaways',
      takeawaysParagraph:
        'November is one of Puerto Viejo’s wettest and greenest months, with rough seas and low prices. Come for the jungle, waterfalls and quiet, pack a good rain jacket, and stay flexible with beach plans.',
    },
    es: {
      seoTitle: 'El clima en Puerto Viejo en noviembre: tiempo, lluvia y mar',
      seoDescription:
        'Noviembre es uno de los meses más lluviosos en Puerto Viejo de Talamanca: selva de un verde intenso, cascadas llenas y precios bajos. Esto es lo que puedes esperar y cómo planificar.',
      heading: 'El Clima en Puerto Viejo en Noviembre',
      heroAlt: 'Selva verde y frondosa en Puerto Viejo de Talamanca en noviembre',
      photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Noviembre de un vistazo',
      snapshot: [
        { label: 'Temperatura', value: '27°C / 22°C' },
        { label: 'Lluvia', value: '~350-450 mm, de los meses más lluviosos' },
        { label: 'Mar', value: 'A menudo más bravo, ~28°C' },
        { label: 'Afluencia', value: 'Baja hasta fin de mes' },
      ],
      whatItsLikeHeading: 'Cómo es noviembre en realidad',
      whatItsLikeParagraphs: [
        'Noviembre es uno de los meses más lluviosos de esta costa, parte del pico lluvioso que va de ahora hasta enero (junio y julio son el otro período húmedo). Tras el veranillo tranquilo de septiembre y octubre, la lluvia regresa con fuerza, pero también tiñe la selva de un verde intenso y llena los ríos y las cascadas.',
        'Aún tendrás ratos soleados, sobre todo por la mañana, pero espera aguaceros más fuertes y frecuentes y un mar más bravo. Es un mes para viajeros que aman un paisaje verde y salvaje y a quienes no les importa mojarse.',
      ],
      rainHeading: '¿Cuánto llueve?',
      rainParagraph:
        'Las estimaciones varían según la fuente, entre unos 350 y 450 mm, pero noviembre es sistemáticamente uno de los meses más lluviosos, y el mar suele estar más picado. La lluvia puede llegar a cualquier hora, así que planifica con flexibilidad y aprovecha los días de playa cuando se den.',
      rainyDayIntro: 'La lluvia realza las mejores experiencias bajo techo y en la selva:',
      rainyDayItems: [
        'Haz un tour de cacao (chocolate), casi todo techado y estupendo bajo la lluvia',
        'Busca cascadas caudalosas y senderos de selva exuberante',
        'Visita una comunidad indígena Bribri para conocer el cacao y la medicina tradicional',
      ],
      crowdsHeading: 'Afluencia, precios y eventos',
      crowdsParagraph:
        'Noviembre es temporada baja, así que los precios están entre los más bajos del año y el pueblo está tranquilo, justo hasta que empieza el ajetreo festivo al final del mes. Gran relación calidad-precio si vienes preparado para el clima.',
      stayRecommendationTitle: 'Dónde hospedarte en Puerto Viejo en noviembre',
      verdictHeading: '¿Es noviembre una buena época para visitar?',
      verdictParagraph:
        'Depende de lo que busques. Para precios bajos, playas vacías y una selva exuberante y dramática, sí. Si tu viaje depende de playa garantizada y mar en calma, uno de los meses más secos te vendrá mejor.',
      hubLinkText: 'Ver la guía completa del clima mes a mes →',
      takeawaysHeading: 'Puntos clave',
      takeawaysParagraph:
        'Noviembre es uno de los meses más lluviosos y verdes de Puerto Viejo, con mar bravo y precios bajos. Ven por la selva, las cascadas y la tranquilidad, lleva una buena chaqueta impermeable y mantén flexibles los planes de playa.',
    },
    de: {
      seoTitle: 'Wetter in Puerto Viejo im November: Klima, Regen und Meer',
      seoDescription:
        'Der November ist einer der nassesten Monate in Puerto Viejo de Talamanca: tiefgrüner Dschungel, volle Wasserfälle und niedrige Preise. Das erwartet Sie und so planen Sie rund um den Regen.',
      heading: 'Wetter in Puerto Viejo im November',
      heroAlt: 'Üppig grüner Regenwald in Puerto Viejo de Talamanca im November',
      photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Der November auf einen Blick',
      snapshot: [
        { label: 'Temperatur', value: '27°C / 22°C' },
        { label: 'Regen', value: '~350-450 mm, einer der nassesten Monate' },
        { label: 'Meer', value: 'Oft rauer, ~28°C' },
        { label: 'Andrang', value: 'Gering bis Monatsende' },
      ],
      whatItsLikeHeading: 'Wie der November tatsächlich ist',
      whatItsLikeParagraphs: [
        'Der November ist einer der nassesten Monate an dieser Küste, Teil des Regengipfels, der sich von jetzt bis in den Januar zieht (Juni und Juli sind die andere Regenphase). Nach dem ruhigen veranillo im September und Oktober kehrt der Regen mit Macht zurück, doch er färbt den Dschungel auch in ein tiefes Grün und füllt die Flüsse und Wasserfälle.',
        'Sonnige Abschnitte gibt es weiterhin, besonders am Morgen, doch rechnen Sie mit stärkeren und häufigeren Schauern und einem raueren Meer. Es ist ein Monat für Reisende, die eine wilde, grüne Landschaft lieben und nichts dagegen haben, nass zu werden.',
      ],
      rainHeading: 'Wie viel regnet es?',
      rainParagraph:
        'Die Schätzungen variieren je nach Quelle, etwa 350 bis 450 mm, doch der November gehört durchweg zu den nassesten Monaten, und das Meer ist tendenziell unruhiger. Regen kann zu jeder Tageszeit einsetzen, planen Sie also flexibel und nutzen Sie Strandtage, wann immer sie sich bieten.',
      rainyDayIntro: 'Der Regen erschließt die besten Erlebnisse drinnen und im Dschungel:',
      rainyDayItems: [
        'Machen Sie eine Schokoladen- (Kakao-) Tour, meist überdacht und im Regen ein Genuss',
        'Entdecken Sie tosende Wasserfälle und üppige Dschungelpfade',
        'Besuchen Sie eine indigene Bribri-Gemeinschaft für Kakao und traditionelle Medizin',
      ],
      crowdsHeading: 'Andrang, Preise und Veranstaltungen',
      crowdsParagraph:
        'Der November ist Nebensaison, daher gehören die Preise zu den niedrigsten des Jahres und der Ort ist ruhig, bis ganz am Monatsende der festliche Trubel beginnt. Ein großartiges Preis-Leistungs-Verhältnis, wenn Sie auf das Wetter vorbereitet sind.',
      stayRecommendationTitle: 'Wo Sie im November in Puerto Viejo übernachten',
      verdictHeading: 'Ist der November eine gute Reisezeit?',
      verdictParagraph:
        'Das hängt davon ab, was Sie wollen. Für niedrige Preise, leere Strände und einen üppigen, dramatischen Dschungel: ja. Wenn Ihre Reise auf garantierten Strand und ruhiges Meer angewiesen ist, passt einer der trockeneren Monate besser.',
      hubLinkText: 'Zum vollständigen Wetterführer Monat für Monat →',
      takeawaysHeading: 'Das Wichtigste in Kürze',
      takeawaysParagraph:
        'Der November gehört zu den nassesten und grünsten Monaten in Puerto Viejo, mit rauer See und niedrigen Preisen. Kommen Sie für Dschungel, Wasserfälle und Ruhe, packen Sie eine gute Regenjacke ein und bleiben Sie bei den Strandplänen flexibel.',
    },
    fr: {
      seoTitle: 'Météo à Puerto Viejo en novembre : climat, pluie et mer',
      seoDescription:
        'Novembre est l\'un des mois les plus pluvieux à Puerto Viejo de Talamanca : jungle d\'un vert profond, cascades gonflées et prix bas. Voici à quoi vous attendre et comment composer avec la pluie.',
      heading: 'Météo à Puerto Viejo en novembre',
      heroAlt: 'Forêt tropicale luxuriante et verdoyante à Puerto Viejo de Talamanca en novembre',
      photoCredit: <>Photo : <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Novembre en un coup d\'œil',
      snapshot: [
        { label: 'Température', value: '27°C / 22°C' },
        { label: 'Pluie', value: '~350-450 mm, l\'un des mois les plus humides' },
        { label: 'Mer', value: 'Souvent plus agitée, ~28°C' },
        { label: 'Affluence', value: 'Faible jusqu\'à la fin du mois' },
      ],
      whatItsLikeHeading: 'À quoi ressemble novembre',
      whatItsLikeParagraphs: [
        'Novembre est l\'un des mois les plus humides de cette côte, il fait partie du pic de pluie qui s\'étend d\'ici jusqu\'en janvier (juin et juillet forment l\'autre période humide). Après le calme veranillo de septembre et octobre, la pluie revient en force, mais elle pare aussi la jungle d\'un vert profond et gonfle les rivières et les cascades.',
        'Vous aurez encore des éclaircies, surtout le matin, mais attendez-vous à des averses plus fortes et plus fréquentes et à une mer plus agitée. C\'est un mois pour les voyageurs qui aiment les paysages sauvages et verdoyants, et que la pluie ne dérange pas.',
      ],
      rainHeading: 'Combien pleut-il ?',
      rainParagraph:
        'Les estimations varient selon les sources, environ 350 à 450 mm, mais novembre compte systématiquement parmi les mois les plus humides, et l\'océan a tendance à être plus houleux. La pluie peut arriver à tout moment de la journée, alors prévoyez de la souplesse et saisissez les journées de plage quand elles se présentent.',
      rainyDayIntro: 'La pluie met en valeur les meilleures expériences en intérieur et dans la jungle :',
      rainyDayItems: [
        'Faites un tour du chocolat (cacao), en grande partie couvert et agréable sous la pluie',
        'Partez à la découverte de cascades gonflées et de sentiers de jungle luxuriante',
        'Visitez une communauté autochtone Bribri pour le cacao et la médecine traditionnelle',
      ],
      crowdsHeading: 'Affluence, prix et événements',
      crowdsParagraph:
        'Novembre est la basse saison, donc les prix comptent parmi les plus bas de l\'année et le village est tranquille, jusqu\'à ce que l\'effervescence des fêtes commence tout à la fin du mois. Un excellent rapport qualité-prix si vous êtes prêt pour la météo.',
      stayRecommendationTitle: 'Où loger à Puerto Viejo en novembre',
      verdictHeading: 'Novembre est-il une bonne période pour visiter ?',
      verdictParagraph:
        'Cela dépend de ce que vous recherchez. Pour des prix bas, des plages désertes et une jungle luxuriante et spectaculaire, oui. Si votre voyage dépend d\'une plage garantie et d\'une mer calme, l\'un des mois plus secs vous conviendra mieux.',
      hubLinkText: 'Voir le guide météo complet mois par mois →',
      takeawaysHeading: 'À retenir',
      takeawaysParagraph:
        'Novembre est l\'un des mois les plus humides et les plus verts de Puerto Viejo, avec une mer agitée et des prix bas. Venez pour la jungle, les cascades et le calme, emportez un bon imperméable et gardez vos projets de plage flexibles.',
    },
    it: {
      seoTitle: 'Meteo a Puerto Viejo a novembre: clima, pioggia e mare',
      seoDescription:
        'Novembre è uno dei mesi più piovosi a Puerto Viejo de Talamanca: giungla di un verde intenso, cascate piene e prezzi bassi. Ecco cosa aspettarsi e come organizzarsi con la pioggia.',
      heading: 'Meteo a Puerto Viejo a novembre',
      heroAlt: 'Rigogliosa foresta pluviale verde a Puerto Viejo de Talamanca a novembre',
      photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Novembre in breve',
      snapshot: [
        { label: 'Temperatura', value: '27°C / 22°C' },
        { label: 'Pioggia', value: '~350-450 mm, uno dei mesi più piovosi' },
        { label: 'Mare', value: 'Spesso più mosso, ~28°C' },
        { label: 'Affluenza', value: 'Bassa fino a fine mese' },
      ],
      whatItsLikeHeading: 'Com\'è novembre',
      whatItsLikeParagraphs: [
        'Novembre è uno dei mesi più piovosi di questa costa, fa parte del picco di pioggia che va da adesso fino a gennaio (giugno e luglio sono l\'altra fase piovosa). Dopo la calma del veranillo di settembre e ottobre, la pioggia torna con forza, ma tinge anche la giungla di un verde intenso e riempie i fiumi e le cascate.',
        'Avrai comunque schiarite, soprattutto al mattino, ma aspettati acquazzoni più forti e frequenti e un mare più mosso. È un mese per i viaggiatori che amano un paesaggio selvaggio e verde e a cui non dispiace bagnarsi.',
      ],
      rainHeading: 'Quanto piove?',
      rainParagraph:
        'Le stime variano a seconda della fonte, all\'incirca da 350 a 450 mm, ma novembre è costantemente uno dei mesi più piovosi, e l\'oceano tende a essere più agitato. La pioggia può arrivare a qualsiasi ora del giorno, quindi organizzati con flessibilità e cogli le giornate di mare quando capitano.',
      rainyDayIntro: 'La pioggia esalta le migliori esperienze al coperto e nella giungla:',
      rainyDayItems: [
        'Fai un tour del cioccolato (cacao), quasi tutto al coperto e piacevole sotto la pioggia',
        'Vai alla ricerca di cascate impetuose e sentieri di giungla lussureggiante',
        'Visita una comunità indigena Bribri per il cacao e la medicina tradizionale',
      ],
      crowdsHeading: 'Affluenza, prezzi ed eventi',
      crowdsParagraph:
        'Novembre è bassa stagione, quindi i prezzi sono tra i più bassi dell\'anno e il paese è tranquillo, fino a quando, proprio a fine mese, inizia il fermento delle feste. Un ottimo rapporto qualità-prezzo se sei preparato al meteo.',
      stayRecommendationTitle: 'Dove alloggiare a Puerto Viejo a novembre',
      verdictHeading: 'Novembre è un buon periodo per visitare?',
      verdictParagraph:
        'Dipende da cosa cerchi. Per prezzi bassi, spiagge deserte e una giungla lussureggiante e spettacolare, sì. Se il tuo viaggio dipende da spiaggia garantita e mare calmo, uno dei mesi più secchi ti si addice di più.',
      hubLinkText: 'Vedi la guida meteo completa mese per mese →',
      takeawaysHeading: 'Punti chiave',
      takeawaysParagraph:
        'Novembre è uno dei mesi più piovosi e più verdi di Puerto Viejo, con mare mosso e prezzi bassi. Vieni per la giungla, le cascate e la tranquillità, porta una buona giacca impermeabile e mantieni flessibili i piani da spiaggia.',
    },
    pt: {
      seoTitle: 'Clima em Puerto Viejo em novembro: tempo, chuva e mar',
      seoDescription:
        'Novembro é um dos meses mais chuvosos em Puerto Viejo de Talamanca: selva de verde intenso, cachoeiras cheias e preços baixos. Veja o que esperar e como planejar em torno da chuva.',
      heading: 'Clima em Puerto Viejo em novembro',
      heroAlt: 'Floresta tropical exuberante e verde em Puerto Viejo de Talamanca em novembro',
      photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Novembro num relance',
      snapshot: [
        { label: 'Temperatura', value: '27°C / 22°C' },
        { label: 'Chuva', value: '~350-450 mm, um dos meses mais chuvosos' },
        { label: 'Mar', value: 'Muitas vezes mais agitado, ~28°C' },
        { label: 'Movimento', value: 'Baixo até o fim do mês' },
      ],
      whatItsLikeHeading: 'Como é novembro',
      whatItsLikeParagraphs: [
        'Novembro é um dos meses mais chuvosos desta costa, faz parte do pico de chuva que vai de agora até janeiro (junho e julho são o outro período chuvoso). Depois do calmo veranillo de setembro e outubro, a chuva volta com força, mas também tinge a selva de um verde intenso e enche os rios e as cachoeiras.',
        'Você ainda terá momentos de sol, principalmente pela manhã, mas espere aguaceiros mais fortes e frequentes e um mar mais agitado. É um mês para viajantes que amam uma paisagem selvagem e verde e que não se importam de se molhar.',
      ],
      rainHeading: 'Quanto chove?',
      rainParagraph:
        'As estimativas variam conforme a fonte, cerca de 350 a 450 mm, mas novembro é consistentemente um dos meses mais chuvosos, e o oceano tende a ficar mais revolto. A chuva pode chegar a qualquer hora do dia, então planeje com flexibilidade e aproveite os dias de praia quando surgirem.',
      rainyDayIntro: 'A chuva realça as melhores experiências em ambientes fechados e na selva:',
      rainyDayItems: [
        'Faça um tour de chocolate (cacau), quase todo coberto e ótimo na chuva',
        'Vá atrás de cachoeiras caudalosas e trilhas de selva exuberante',
        'Visite uma comunidade indígena Bribri para conhecer o cacau e a medicina tradicional',
      ],
      crowdsHeading: 'Movimento, preços e eventos',
      crowdsParagraph:
        'Novembro é baixa temporada, então os preços estão entre os mais baixos do ano e a vila está tranquila, bem até o corre-corre festivo começar no finzinho do mês. Ótimo custo-benefício se você vier preparado para o clima.',
      stayRecommendationTitle: 'Onde se hospedar em Puerto Viejo em novembro',
      verdictHeading: 'Novembro é uma boa época para visitar?',
      verdictParagraph:
        'Depende do que você quer. Para preços baixos, praias vazias e uma selva exuberante e dramática, sim. Se sua viagem depende de praia garantida e mar calmo, um dos meses mais secos vai lhe servir melhor.',
      hubLinkText: 'Ver o guia completo de clima mês a mês →',
      takeawaysHeading: 'Pontos principais',
      takeawaysParagraph:
        'Novembro é um dos meses mais chuvosos e verdes de Puerto Viejo, com mar agitado e preços baixos. Venha pela selva, pelas cachoeiras e pela tranquilidade, leve uma boa capa de chuva e mantenha os planos de praia flexíveis.',
    },
    he: {
      seoTitle: 'מזג האוויר בפוארטו ויאחו בנובמבר: אקלים, גשם וים',
      seoDescription:
        'נובמבר הוא אחד החודשים הגשומים ביותר בפוארטו ויאחו דה טלמנקה: ג\'ונגל ירוק עמוק, מפלים גועשים ומחירים נמוכים. הנה למה לצפות וכיצד לתכנן סביב הגשם.',
      heading: 'מזג האוויר בפוארטו ויאחו בנובמבר',
      heroAlt: 'יער גשם ירוק ושופע בפוארטו ויאחו דה טלמנקה בנובמבר',
      photoCredit: <>צילום: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'נובמבר במבט חטוף',
      snapshot: [
        { label: 'טמפרטורה', value: '27°C / 22°C' },
        { label: 'גשם', value: '~350-450 mm, אחד החודשים הגשומים ביותר' },
        { label: 'ים', value: 'לרוב סוער יותר, ~28°C' },
        { label: 'עומס תיירים', value: 'נמוך עד סוף החודש' },
      ],
      whatItsLikeHeading: 'איך נובמבר נראה',
      whatItsLikeParagraphs: [
        'נובמבר הוא אחד החודשים הגשומים ביותר בחוף הזה, חלק משיא הגשמים שנמשך מעכשיו אל תוך ינואר (יוני ויולי הם תקופת הגשם האחרת). אחרי ה-veranillo הרגוע של ספטמבר ואוקטובר, הגשם חוזר בעוצמה, אך הוא גם צובע את הג\'ונגל בירוק עמוק וממלא את הנהרות והמפלים.',
        'עדיין תזכו להפוגות שמש, במיוחד בבקרים, אך צפו לממטרים חזקים ותכופים יותר ולים סוער יותר. זהו חודש למטיילים שאוהבים נוף פראי וירוק, ולא אכפת להם להירטב.',
      ],
      rainHeading: 'כמה יורד גשם?',
      rainParagraph:
        'ההערכות משתנות ממקור למקור, בערך 350 עד 450 mm, אבל נובמבר הוא בעקביות אחד החודשים הגשומים ביותר, והים נוטה להיות סוער יותר. הגשם עשוי להגיע בכל שעה ביום, אז שלבו גמישות בתוכניות ונצלו ימי חוף כשהם מזדמנים.',
      rainyDayIntro: 'הגשם פותח את חוויות הפנים והג\'ונגל הטובות ביותר:',
      rainyDayItems: [
        'צאו לסיור שוקולד (קקאו), ברובו מקורה וטוב בגשם',
        'רדפו אחר מפלים גועשים ושבילי ג\'ונגל שופעים',
        'בקרו בקהילת הילידים בריברי להיכרות עם קקאו ורפואה מסורתית',
      ],
      crowdsHeading: 'עומס תיירים, מחירים ואירועים',
      crowdsParagraph:
        'נובמבר הוא עונה שקטה, ולכן המחירים בין הנמוכים בשנה והעיירה רגועה, עד שממש בסוף החודש מתחיל השיא החגיגי. תמורה מצוינת אם תגיעו מוכנים למזג האוויר.',
      stayRecommendationTitle: 'היכן להתארח בפוארטו ויאחו בנובמבר',
      verdictHeading: 'האם נובמבר הוא זמן טוב לביקור?',
      verdictParagraph:
        'תלוי מה אתם מחפשים. למחירים נמוכים, חופים ריקים וג\'ונגל שופע ודרמטי, בהחלט. אם הטיול שלכם תלוי בחוף מובטח ובים רגוע, אחד החודשים היבשים יותר יתאים לכם יותר.',
      hubLinkText: 'צפו במדריך מזג האוויר המלא חודש אחר חודש →',
      takeawaysHeading: 'עיקרי הדברים',
      takeawaysParagraph:
        'נובמבר הוא אחד החודשים הגשומים והירוקים ביותר בפוארטו ויאחו, עם ים סוער ומחירים נמוכים. בואו בשביל הג\'ונגל, המפלים והשקט, ארזו מעיל גשם טוב ושמרו על גמישות בתוכניות החוף.',
    },
    hi: {
      seoTitle: 'नवंबर में पुएर्तो वियेखो का मौसम: जलवायु, बारिश और समुद्र',
      seoDescription:
        'पुएर्तो वियेखो दे तालामांका में नवंबर सबसे अधिक बारिश वाले महीनों में से एक है: गहरा हरा जंगल, भरे हुए झरने और कम कीमतें। जानिए क्या उम्मीद करें और बारिश के हिसाब से योजना कैसे बनाएं।',
      heading: 'नवंबर में पुएर्तो वियेखो का मौसम',
      heroAlt: 'नवंबर में पुएर्तो वियेखो दे तालामांका का हरा-भरा वर्षावन',
      photoCredit: <>फ़ोटो: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'एक नज़र में नवंबर',
      snapshot: [
        { label: 'तापमान', value: '27°C / 22°C' },
        { label: 'बारिश', value: '~350-450 mm, सबसे गीले महीनों में से एक' },
        { label: 'समुद्र', value: 'अक्सर अधिक अशांत, ~28°C' },
        { label: 'भीड़', value: 'महीने के अंत तक कम' },
      ],
      whatItsLikeHeading: 'नवंबर कैसा होता है',
      whatItsLikeParagraphs: [
        'इस तट पर नवंबर सबसे गीले महीनों में से एक है, यह बारिश के उस चरम का हिस्सा है जो अभी से जनवरी तक चलता है (जून और जुलाई दूसरा बरसाती दौर हैं)। सितंबर और अक्टूबर के शांत veranillo के बाद बारिश पूरे ज़ोर से लौटती है, लेकिन यह जंगल को गहरे हरे रंग में रंग देती है और नदियों तथा झरनों को भर देती है।',
        'आपको धूप के पल फिर भी मिलेंगे, खासकर सुबह के समय, पर तेज़ और अधिक बार होने वाली बौछारों और अधिक अशांत समुद्र की उम्मीद रखें। यह उन यात्रियों का महीना है जो जंगली और हरे परिदृश्य से प्यार करते हैं और जिन्हें भीगने में कोई परेशानी नहीं।',
      ],
      rainHeading: 'कितनी बारिश होती है?',
      rainParagraph:
        'अनुमान स्रोत के अनुसार बदलते हैं, मोटे तौर पर 350 से 450 mm, पर नवंबर लगातार सबसे गीले महीनों में से एक रहता है, और समुद्र अधिक उथल-पुथल भरा रहता है। बारिश दिन के किसी भी समय आ सकती है, इसलिए अपनी योजनाओं में लचीलापन रखें और समुद्र तट के दिनों का अवसर मिलते ही लाभ उठाएं।',
      rainyDayIntro: 'बारिश सबसे बेहतरीन इनडोर और जंगल अनुभवों को खोल देती है:',
      rainyDayItems: [
        'चॉकलेट (कोको) टूर करें, ज़्यादातर ढका हुआ और बारिश में बढ़िया',
        'भरपूर बहते झरनों और हरे-भरे जंगल के रास्तों का पीछा करें',
        'कोको और पारंपरिक चिकित्सा के लिए किसी ब्रिब्री आदिवासी समुदाय में जाएं',
      ],
      crowdsHeading: 'भीड़, कीमतें और आयोजन',
      crowdsParagraph:
        'नवंबर कम सीज़न है, इसलिए कीमतें साल में सबसे कम में से हैं और कस्बा शांत रहता है, ठीक तब तक जब तक महीने के बिल्कुल अंत में उत्सव की भागदौड़ शुरू नहीं हो जाती। अगर आप मौसम के लिए तैयार हैं तो शानदार मूल्य।',
      stayRecommendationTitle: 'नवंबर में पुएर्तो वियेखो में कहाँ ठहरें',
      verdictHeading: 'क्या नवंबर घूमने के लिए अच्छा समय है?',
      verdictParagraph:
        'यह इस पर निर्भर करता है कि आप क्या चाहते हैं। कम कीमतों, खाली समुद्र तटों और हरे-भरे, नाटकीय जंगल के लिए, हाँ। अगर आपकी यात्रा गारंटीशुदा समुद्र तट और शांत समुद्र पर निर्भर है, तो कोई सूखा महीना आपके लिए बेहतर रहेगा।',
      hubLinkText: 'महीने-दर-महीने का पूरा मौसम गाइड देखें →',
      takeawaysHeading: 'मुख्य बातें',
      takeawaysParagraph:
        'नवंबर पुएर्तो वियेखो के सबसे गीले और सबसे हरे महीनों में से एक है, अशांत समुद्र और कम कीमतों के साथ। जंगल, झरनों और शांति के लिए आएं, एक अच्छी बारिश की जैकेट साथ रखें और समुद्र तट की योजनाओं में लचीलापन बनाए रखें।',
    },
    nl: {
      seoTitle: 'Weer in Puerto Viejo in november: klimaat, regen en zee',
      seoDescription:
        'November is een van de natste maanden in Puerto Viejo de Talamanca: diepgroene jungle, volle watervallen en lage prijzen. Dit kun je verwachten en zo plan je rond de regen.',
      heading: 'Weer in Puerto Viejo in november',
      heroAlt: 'Weelderig groen regenwoud in Puerto Viejo de Talamanca in november',
      photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'November in een oogopslag',
      snapshot: [
        { label: 'Temperatuur', value: '27°C / 22°C' },
        { label: 'Regen', value: '~350-450 mm, een van de natste maanden' },
        { label: 'Zee', value: 'Vaak ruwer, ~28°C' },
        { label: 'Drukte', value: 'Laag tot eind van de maand' },
      ],
      whatItsLikeHeading: 'Hoe november aanvoelt',
      whatItsLikeParagraphs: [
        'November is een van de natste maanden aan deze kust, onderdeel van de natte piek die van nu tot in januari loopt (juni en juli vormen de andere natte periode). Na de rustige veranillo van september en oktober keert de regen in alle hevigheid terug, maar hij kleurt de jungle ook diep groen en vult de rivieren en watervallen.',
        'Je krijgt nog steeds zonnige momenten, vooral in de ochtend, maar reken op zwaardere en frequentere buien en een ruwere zee. Het is een maand voor reizigers die van een wild, groen landschap houden en het niet erg vinden om nat te worden.',
      ],
      rainHeading: 'Hoeveel regent het?',
      rainParagraph:
        'De schattingen verschillen per bron, ongeveer 350 tot 450 mm, maar november is steevast een van de natste maanden, en de oceaan is doorgaans woeliger. Regen kan op elk moment van de dag komen, dus bouw flexibiliteit in je plannen in en grijp stranddagen als ze zich voordoen.',
      rainyDayIntro: 'De regen opent de beste ervaringen binnen en in de jungle:',
      rainyDayItems: [
        'Doe een chocolade- (cacao-)tour, grotendeels overdekt en heerlijk in de regen',
        'Ga op zoek naar bruisende watervallen en weelderige junglepaden',
        'Bezoek een inheemse Bribri-gemeenschap voor cacao en traditionele geneeskunde',
      ],
      crowdsHeading: 'Drukte, prijzen en evenementen',
      crowdsParagraph:
        'November is laagseizoen, dus de prijzen behoren tot de laagste van het jaar en het dorp is rustig, tot helemaal aan het eind van de maand de feestdrukte losbarst. Uitstekende waarde als je voorbereid bent op het weer.',
      stayRecommendationTitle: 'Waar te verblijven in Puerto Viejo in november',
      verdictHeading: 'Is november een goede tijd om te bezoeken?',
      verdictParagraph:
        'Dat hangt af van wat je zoekt. Voor lage prijzen, lege stranden en een weelderige, dramatische jungle: ja. Als je reis afhangt van gegarandeerd strand en een kalme zee, past een van de drogere maanden beter bij je.',
      hubLinkText: 'Bekijk de volledige weergids maand voor maand →',
      takeawaysHeading: 'Belangrijkste punten',
      takeawaysParagraph:
        'November is een van de natste en groenste maanden van Puerto Viejo, met een ruwe zee en lage prijzen. Kom voor de jungle, de watervallen en de rust, pak een goede regenjas in en houd je strandplannen flexibel.',
    },
  },
  december: {
    en: {
      seoTitle: 'Weather in Puerto Viejo in December: climate, rain and sea',
      seoDescription:
        'December in Puerto Viejo de Talamanca is festive and lively, still rainy but with surf swells and holiday energy. Here is what to expect and how to plan your trip.',
      heading: 'Weather in Puerto Viejo in December',
      heroAlt: 'Festive Caribbean beach town of Puerto Viejo de Talamanca in December',
      photoCredit: <>Photo: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'December at a glance',
      snapshot: [
        { label: 'Temperature', value: '27°C / 21°C' },
        { label: 'Rain', value: '~350 mm, still wet, easing late month' },
        { label: 'Sea', value: 'Surf swells, ~28°C' },
        { label: 'Crowds', value: 'High over the holidays' },
      ],
      whatItsLikeHeading: 'What December is actually like',
      whatItsLikeParagraphs: [
        'December is a lively, festive month. It is still one of the wetter parts of the year, but the rain often eases as the month goes on, and the town fills with holiday energy: music, visitors and a buzzing beach scene.',
        'Northeast swells make December a favourite with surfers, and the famous Salsa Brava reef is at its best. Nights are the coolest of the year, which is a welcome change if you feel the humidity.',
      ],
      rainHeading: 'How much does it rain?',
      rainParagraph:
        'December averages around 350 mm, though it often trends drier toward the New Year. Expect a mix of showers and bright spells, and a sea that is more about surf than flat-water snorkelling this month.',
      rainyDayIntro: 'Rain or shine, December keeps you busy:',
      rainyDayItems: [
        'Watch or try surfing the season\'s northeast swells',
        'Take a chocolate tour or a cooking class between showers',
        'Enjoy the festive nightlife, music and Caribbean food in town',
      ],
      crowdsHeading: 'Crowds, prices and events',
      crowdsParagraph:
        'The festive season is peak time. Expect the busiest crowds and the highest prices of the year, especially from Christmas to New Year, so book your stay well in advance if you are coming for the holidays.',
      stayRecommendationTitle: 'Where to stay in Puerto Viejo in December',
      verdictHeading: 'Is December a good time to visit?',
      verdictParagraph:
        'If you want atmosphere, surf and holiday energy, December is a great time, just book early and accept some rain. For calm, dry snorkelling weather, the veranillo months suit better.',
      hubLinkText: 'See the full month-by-month weather guide →',
      takeawaysHeading: 'Key takeaways',
      takeawaysParagraph:
        'December is festive, lively and surf-friendly, still wet but often easing late in the month, with the coolest nights and the biggest crowds. Book early, pack for showers, and come for the energy rather than flat-water beach days.',
    },
    es: {
      seoTitle: 'El clima en Puerto Viejo en diciembre: tiempo, lluvia y mar',
      seoDescription:
        'Diciembre en Puerto Viejo de Talamanca es festivo y animado, todavía lluvioso pero con oleaje de surf y energía navideña. Esto es lo que puedes esperar y cómo planificar.',
      heading: 'El Clima en Puerto Viejo en Diciembre',
      heroAlt: 'Puerto Viejo de Talamanca, pueblo caribeño festivo, en diciembre',
      photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Diciembre de un vistazo',
      snapshot: [
        { label: 'Temperatura', value: '27°C / 21°C' },
        { label: 'Lluvia', value: '~350 mm, todavía húmedo, cede a fin de mes' },
        { label: 'Mar', value: 'Oleaje de surf, ~28°C' },
        { label: 'Afluencia', value: 'Alta durante las fiestas' },
      ],
      whatItsLikeHeading: 'Cómo es diciembre en realidad',
      whatItsLikeParagraphs: [
        'Diciembre es un mes animado y festivo. Sigue siendo una de las épocas más húmedas del año, pero la lluvia suele ceder a medida que avanza el mes, y el pueblo se llena de energía navideña: música, visitantes y un ambiente de playa vibrante.',
        'Los oleajes del noreste hacen de diciembre un favorito de los surfistas, y el famoso arrecife de Salsa Brava está en su mejor momento. Las noches son las más frescas del año, un cambio agradable si sientes la humedad.',
      ],
      rainHeading: '¿Cuánto llueve?',
      rainParagraph:
        'Diciembre promedia unos 350 mm, aunque suele volverse más seco hacia el Año Nuevo. Espera una mezcla de aguaceros y ratos despejados, y un mar más de surf que de snorkel en agua plana este mes.',
      rainyDayIntro: 'Con lluvia o con sol, diciembre te mantiene ocupado:',
      rainyDayItems: [
        'Observa o prueba el surf con los oleajes del noreste de la temporada',
        'Haz un tour de chocolate o una clase de cocina entre aguaceros',
        'Disfruta de la vida nocturna festiva, la música y la comida caribeña del pueblo',
      ],
      crowdsHeading: 'Afluencia, precios y eventos',
      crowdsParagraph:
        'La temporada festiva es el momento de mayor afluencia. Espera las mayores multitudes y los precios más altos del año, sobre todo de Navidad a Año Nuevo, así que reserva tu estadía con mucha antelación si vienes en fiestas.',
      stayRecommendationTitle: 'Dónde hospedarte en Puerto Viejo en diciembre',
      verdictHeading: '¿Es diciembre una buena época para visitar?',
      verdictParagraph:
        'Si buscas ambiente, surf y energía navideña, diciembre es una gran época, solo reserva temprano y acepta algo de lluvia. Para clima seco y en calma para snorkel, los meses del veranillo vienen mejor.',
      hubLinkText: 'Ver la guía completa del clima mes a mes →',
      takeawaysHeading: 'Puntos clave',
      takeawaysParagraph:
        'Diciembre es festivo, animado y bueno para el surf, todavía húmedo pero a menudo cediendo a fin de mes, con las noches más frescas y la mayor afluencia. Reserva temprano, lleva algo para los aguaceros y ven por la energía más que por días de playa en agua plana.',
    },
    de: {
      seoTitle: 'Wetter in Puerto Viejo im Dezember: Klima, Regen und Meer',
      seoDescription:
        'Der Dezember in Puerto Viejo de Talamanca ist festlich und lebhaft, noch regnerisch, aber mit Surf-Swells und Feiertagsstimmung. Das erwartet dich und so planst du deine Reise.',
      heading: 'Wetter in Puerto Viejo im Dezember',
      heroAlt: 'Festliches karibisches Küstenstädtchen Puerto Viejo de Talamanca im Dezember',
      photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Der Dezember auf einen Blick',
      snapshot: [
        { label: 'Temperatur', value: '27°C / 21°C' },
        { label: 'Regen', value: '~350 mm, noch nass, lässt gegen Monatsende nach' },
        { label: 'Meer', value: 'Surf-Swells, ~28°C' },
        { label: 'Andrang', value: 'Hoch über die Feiertage' },
      ],
      whatItsLikeHeading: 'Wie der Dezember tatsächlich ist',
      whatItsLikeParagraphs: [
        'Der Dezember ist ein lebhafter, festlicher Monat. Er zählt noch zu den feuchteren Zeiten des Jahres, doch der Regen lässt im Laufe des Monats oft nach, und der Ort füllt sich mit Feiertagsstimmung: Musik, Besucher und ein pulsierendes Strandleben.',
        'Nordost-Swells machen den Dezember zum Favoriten der Surfer, und das berühmte Riff Salsa Brava zeigt sich von seiner besten Seite. Die Nächte sind die kühlsten des Jahres, eine willkommene Abwechslung, wenn dir die Luftfeuchtigkeit zu schaffen macht.',
      ],
      rainHeading: 'Wie viel regnet es?',
      rainParagraph:
        'Im Dezember fallen im Schnitt rund 350 mm, wobei es zum Neujahr hin oft trockener wird. Rechne mit einer Mischung aus Schauern und sonnigen Abschnitten und einem Meer, das diesen Monat eher zum Surfen als zum Schnorcheln bei ruhigem Wasser einlädt.',
      rainyDayIntro: 'Ob Regen oder Sonne, der Dezember hält dich auf Trab:',
      rainyDayItems: [
        'Schau beim Surfen zu oder probiere die Nordost-Swells der Saison selbst',
        'Mach eine Schokoladentour oder einen Kochkurs zwischen den Schauern',
        'Genieße das festliche Nachtleben, die Musik und die karibische Küche im Ort',
      ],
      crowdsHeading: 'Andrang, Preise und Events',
      crowdsParagraph:
        'Die Festtagszeit ist Hochsaison. Rechne mit dem größten Andrang und den höchsten Preisen des Jahres, besonders von Weihnachten bis Neujahr, buche deinen Aufenthalt also weit im Voraus, wenn du über die Feiertage kommst.',
      stayRecommendationTitle: 'Wo man im Dezember in Puerto Viejo übernachtet',
      verdictHeading: 'Ist der Dezember eine gute Reisezeit?',
      verdictParagraph:
        'Wenn du Atmosphäre, Surf und Feiertagsstimmung suchst, ist der Dezember eine großartige Zeit, buche nur früh und nimm etwas Regen in Kauf. Für ruhiges, trockenes Schnorchelwetter eignen sich die Veranillo-Monate besser.',
      hubLinkText: 'Zum vollständigen Monat-für-Monat-Wetterguide →',
      takeawaysHeading: 'Das Wichtigste in Kürze',
      takeawaysParagraph:
        'Der Dezember ist festlich, lebhaft und surf-freundlich, noch nass, lässt aber gegen Monatsende oft nach, mit den kühlsten Nächten und dem größten Andrang. Buche früh, packe für Schauer und komm für die Energie statt für ruhige Strandtage bei stillem Wasser.',
    },
    fr: {
      seoTitle: 'Météo à Puerto Viejo en décembre : climat, pluie et mer',
      seoDescription:
        'Décembre à Puerto Viejo de Talamanca est festif et animé, encore pluvieux mais avec des houles de surf et une énergie des fêtes. Voici à quoi vous attendre et comment planifier votre voyage.',
      heading: 'Météo à Puerto Viejo en décembre',
      heroAlt: 'Village balnéaire caribéen festif de Puerto Viejo de Talamanca en décembre',
      photoCredit: <>Photo : <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Décembre en un coup d\'œil',
      snapshot: [
        { label: 'Température', value: '27°C / 21°C' },
        { label: 'Pluie', value: '~350 mm, encore humide, se calme en fin de mois' },
        { label: 'Mer', value: 'Houles de surf, ~28°C' },
        { label: 'Affluence', value: 'Élevée pendant les fêtes' },
      ],
      whatItsLikeHeading: 'À quoi ressemble décembre',
      whatItsLikeParagraphs: [
        'Décembre est un mois animé et festif. Il reste l\'une des périodes les plus humides de l\'année, mais la pluie faiblit souvent à mesure que le mois avance, et le village se remplit de l\'énergie des fêtes : musique, visiteurs et une ambiance de plage vibrante.',
        'Les houles du nord-est font de décembre un favori des surfeurs, et le célèbre récif de Salsa Brava est à son meilleur. Les nuits sont les plus fraîches de l\'année, un changement bienvenu si vous êtes sensible à l\'humidité.',
      ],
      rainHeading: 'Combien pleut-il ?',
      rainParagraph:
        'Décembre affiche en moyenne environ 350 mm, même s\'il tend souvent à s\'assécher à l\'approche du Nouvel An. Attendez-vous à un mélange d\'averses et d\'éclaircies, et à une mer davantage tournée vers le surf que vers le snorkeling en eau calme ce mois-ci.',
      rainyDayIntro: 'Pluie ou soleil, décembre vous tient occupé :',
      rainyDayItems: [
        'Regardez ou essayez le surf sur les houles du nord-est de la saison',
        'Faites un tour du chocolat ou un cours de cuisine entre deux averses',
        'Profitez de la vie nocturne festive, de la musique et de la cuisine caribéenne du village',
      ],
      crowdsHeading: 'Affluence, prix et événements',
      crowdsParagraph:
        'La saison des fêtes est la haute saison. Attendez-vous à la plus grande affluence et aux prix les plus élevés de l\'année, surtout de Noël au Nouvel An, alors réservez votre séjour bien à l\'avance si vous venez pour les fêtes.',
      stayRecommendationTitle: 'Où loger à Puerto Viejo en décembre',
      verdictHeading: 'Décembre est-il une bonne période pour visiter ?',
      verdictParagraph:
        'Si vous recherchez l\'ambiance, le surf et l\'énergie des fêtes, décembre est une période idéale, réservez simplement tôt et acceptez un peu de pluie. Pour un temps sec et calme propice au snorkeling, les mois du veranillo conviennent mieux.',
      hubLinkText: 'Voir le guide météo complet mois par mois →',
      takeawaysHeading: 'Points clés',
      takeawaysParagraph:
        'Décembre est festif, animé et propice au surf, encore humide mais se calmant souvent en fin de mois, avec les nuits les plus fraîches et la plus forte affluence. Réservez tôt, prévoyez de quoi affronter les averses et venez pour l\'énergie plutôt que pour des journées de plage en eau calme.',
    },
    it: {
      seoTitle: 'Meteo a Puerto Viejo a dicembre: clima, pioggia e mare',
      seoDescription:
        'Dicembre a Puerto Viejo de Talamanca è festoso e vivace, ancora piovoso ma con mareggiate da surf ed energia natalizia. Ecco cosa aspettarti e come pianificare il tuo viaggio.',
      heading: 'Meteo a Puerto Viejo a dicembre',
      heroAlt: 'Festosa cittadina balneare caraibica di Puerto Viejo de Talamanca a dicembre',
      photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Dicembre in breve',
      snapshot: [
        { label: 'Temperatura', value: '27°C / 21°C' },
        { label: 'Pioggia', value: '~350 mm, ancora umido, cala a fine mese' },
        { label: 'Mare', value: 'Mareggiate da surf, ~28°C' },
        { label: 'Affluenza', value: 'Alta durante le feste' },
      ],
      whatItsLikeHeading: 'Com\'è dicembre',
      whatItsLikeParagraphs: [
        'Dicembre è un mese vivace e festoso. È ancora uno dei periodi più umidi dell\'anno, ma la pioggia spesso cala con l\'avanzare del mese, e il paese si riempie di energia natalizia: musica, visitatori e un\'animata vita di spiaggia.',
        'Le mareggiate da nord-est rendono dicembre uno dei mesi preferiti dai surfisti, e la celebre barriera di Salsa Brava è al suo meglio. Le notti sono le più fresche dell\'anno, un cambiamento gradito se soffri l\'umidità.',
      ],
      rainHeading: 'Quanto piove?',
      rainParagraph:
        'Dicembre registra in media circa 350 mm, anche se tende spesso ad asciugarsi verso il Capodanno. Aspettati un mix di rovesci e schiarite, e un mare più adatto al surf che allo snorkeling in acque calme questo mese.',
      rainyDayIntro: 'Con la pioggia o con il sole, dicembre ti tiene impegnato:',
      rainyDayItems: [
        'Guarda o prova a surfare le mareggiate da nord-est della stagione',
        'Fai un tour del cioccolato o un corso di cucina tra un rovescio e l\'altro',
        'Goditi la vita notturna festosa, la musica e la cucina caraibica del paese',
      ],
      crowdsHeading: 'Affluenza, prezzi ed eventi',
      crowdsParagraph:
        'Il periodo delle feste è l\'alta stagione. Aspettati la maggiore affluenza e i prezzi più alti dell\'anno, soprattutto da Natale a Capodanno, quindi prenota il tuo soggiorno con largo anticipo se vieni per le feste.',
      stayRecommendationTitle: 'Dove alloggiare a Puerto Viejo a dicembre',
      verdictHeading: 'Dicembre è un buon periodo per visitare?',
      verdictParagraph:
        'Se cerchi atmosfera, surf ed energia natalizia, dicembre è un periodo fantastico, basta prenotare presto e mettere in conto un po\' di pioggia. Per un clima asciutto e calmo da snorkeling, i mesi del veranillo sono più indicati.',
      hubLinkText: 'Vedi la guida meteo completa mese per mese →',
      takeawaysHeading: 'Punti chiave',
      takeawaysParagraph:
        'Dicembre è festoso, vivace e ottimo per il surf, ancora umido ma spesso in calo a fine mese, con le notti più fresche e la maggiore affluenza. Prenota presto, prepara qualcosa per i rovesci e vieni per l\'energia più che per giornate di spiaggia in acque calme.',
    },
    pt: {
      seoTitle: 'Clima em Puerto Viejo em dezembro: tempo, chuva e mar',
      seoDescription:
        'Dezembro em Puerto Viejo de Talamanca é festivo e animado, ainda chuvoso mas com ondulações de surfe e energia natalina. Veja o que esperar e como planejar sua viagem.',
      heading: 'Clima em Puerto Viejo em dezembro',
      heroAlt: 'Vila caribenha festiva de Puerto Viejo de Talamanca em dezembro',
      photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'Dezembro num relance',
      snapshot: [
        { label: 'Temperatura', value: '27°C / 21°C' },
        { label: 'Chuva', value: '~350 mm, ainda úmido, diminuindo no fim do mês' },
        { label: 'Mar', value: 'Ondulações de surfe, ~28°C' },
        { label: 'Movimento', value: 'Alto durante as festas' },
      ],
      whatItsLikeHeading: 'Como é dezembro',
      whatItsLikeParagraphs: [
        'Dezembro é um mês animado e festivo. Ainda é uma das épocas mais úmidas do ano, mas a chuva costuma diminuir à medida que o mês avança, e a vila se enche de energia natalina: música, visitantes e uma agitada cena de praia.',
        'As ondulações de nordeste tornam dezembro um favorito dos surfistas, e o famoso recife de Salsa Brava está no seu melhor. As noites são as mais frescas do ano, uma mudança bem-vinda se você sente a umidade.',
      ],
      rainHeading: 'Quanto chove?',
      rainParagraph:
        'Dezembro tem média em torno de 350 mm, embora costume ficar mais seco à medida que se aproxima o Ano Novo. Espere uma mistura de pancadas de chuva e momentos de sol, e um mar mais voltado ao surfe do que ao mergulho de snorkel em água calma neste mês.',
      rainyDayIntro: 'Com chuva ou sol, dezembro mantém você ocupado:',
      rainyDayItems: [
        'Assista ou experimente surfar as ondulações de nordeste da temporada',
        'Faça um tour de chocolate ou uma aula de culinária entre as pancadas de chuva',
        'Aproveite a vida noturna festiva, a música e a comida caribenha da vila',
      ],
      crowdsHeading: 'Movimento, preços e eventos',
      crowdsParagraph:
        'A época festiva é a alta temporada. Espere a maior movimentação e os preços mais altos do ano, especialmente do Natal ao Ano Novo, então reserve sua estadia com bastante antecedência se vier para as festas.',
      stayRecommendationTitle: 'Onde se hospedar em Puerto Viejo em dezembro',
      verdictHeading: 'Dezembro é uma boa época para visitar?',
      verdictParagraph:
        'Se você quer atmosfera, surfe e energia natalina, dezembro é uma ótima época, só reserve cedo e aceite um pouco de chuva. Para um clima seco e calmo para snorkel, os meses do veranillo são mais adequados.',
      hubLinkText: 'Ver o guia completo de clima mês a mês →',
      takeawaysHeading: 'Principais conclusões',
      takeawaysParagraph:
        'Dezembro é festivo, animado e bom para o surfe, ainda úmido mas muitas vezes diminuindo no fim do mês, com as noites mais frescas e a maior movimentação. Reserve cedo, leve algo para as pancadas de chuva e venha pela energia, mais do que por dias de praia em água calma.',
    },
    he: {
      seoTitle: 'מזג האוויר בפוארטו ויאחו בדצמבר: אקלים, גשם וים',
      seoDescription:
        'דצמבר בפוארטו ויאחו דה טלמנקה חגיגי ותוסס, עדיין גשום אך עם גלי גלישה ואנרגיה של חגים. הנה למה לצפות וכיצד לתכנן את הטיול שלכם.',
      heading: 'מזג האוויר בפוארטו ויאחו בדצמבר',
      heroAlt: 'עיירת החוף הקריבית החגיגית פוארטו ויאחו דה טלמנקה בדצמבר',
      photoCredit: <>תמונה: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'דצמבר במבט מהיר',
      snapshot: [
        { label: 'טמפרטורה', value: '27°C / 21°C' },
        { label: 'גשם', value: '~350 mm, עדיין רטוב, נחלש בסוף החודש' },
        { label: 'ים', value: 'גלי גלישה, ~28°C' },
        { label: 'עומס מבקרים', value: 'גבוה בתקופת החגים' },
      ],
      whatItsLikeHeading: 'איך דצמבר נראה',
      whatItsLikeParagraphs: [
        'דצמבר הוא חודש תוסס וחגיגי. הוא עדיין אחת התקופות הגשומות יותר בשנה, אך הגשם נוטה להיחלש ככל שהחודש מתקדם, והעיירה מתמלאת באנרגיה של חגים: מוזיקה, מבקרים וזירת חוף שוקקת.',
        'גלי הצפון-מזרח הופכים את דצמבר לחביב על גולשים, ושונית סלסה בראבה המפורסמת נמצאת בשיאה. הלילות הם הקרירים ביותר בשנה, שינוי מבורך אם הלחות מכבידה עליכם.',
      ],
      rainHeading: 'כמה גשם יורד?',
      rainParagraph:
        'בדצמבר יורדים בממוצע כ-350 mm, אם כי לרוב הוא נעשה יבש יותר לקראת השנה החדשה. צפו לתערובת של ממטרים ורגעים בהירים, ולים שהוא יותר עניין של גלישה מאשר של שנורקלינג במים שקטים בחודש זה.',
      rainyDayIntro: 'בגשם או בשמש, דצמבר דואג שיהיה לכם מה לעשות:',
      rainyDayItems: [
        'צפו או נסו לגלוש על גלי הצפון-מזרח של העונה',
        'צאו לסיור שוקולד או לשיעור בישול בין הממטרים',
        'תיהנו מחיי הלילה החגיגיים, המוזיקה והאוכל הקריבי בעיירה',
      ],
      crowdsHeading: 'עומס מבקרים, מחירים ואירועים',
      crowdsParagraph:
        'עונת החגים היא שיא העונה. צפו לעומס המבקרים הגדול ביותר ולמחירים הגבוהים ביותר בשנה, במיוחד מחג המולד ועד השנה החדשה, הזמינו את השהות שלכם הרבה מראש אם אתם מגיעים לחגים.',
      stayRecommendationTitle: 'איפה להתארח בפוארטו ויאחו בדצמבר',
      verdictHeading: 'האם דצמבר הוא זמן טוב לביקור?',
      verdictParagraph:
        'אם אתם מחפשים אווירה, גלישה ואנרגיה של חגים, דצמבר הוא זמן מצוין, רק הזמינו מוקדם וקבלו מעט גשם. למזג אוויר יבש ורגוע לשנורקלינג, חודשי הוורניו מתאימים יותר.',
      hubLinkText: 'למדריך מזג האוויר המלא חודש אחר חודש →',
      takeawaysHeading: 'נקודות עיקריות',
      takeawaysParagraph:
        'דצמבר חגיגי, תוסס וידידותי לגלישה, עדיין רטוב אך לרוב נחלש בסוף החודש, עם הלילות הקרירים ביותר ועומס המבקרים הגדול ביותר. הזמינו מוקדם, ארזו לממטרים ובואו בשביל האנרגיה ולא בשביל ימי חוף במים שקטים.',
    },
    hi: {
      seoTitle: 'दिसंबर में प्यूर्टो विएखो का मौसम: जलवायु, बारिश और समुद्र',
      seoDescription:
        'प्यूर्टो विएखो दे तालामांका में दिसंबर उत्सवमय और जीवंत होता है, अब भी बरसाती पर सर्फ की लहरों और छुट्टियों की ऊर्जा के साथ। जानिए क्या उम्मीद करें और अपनी यात्रा की योजना कैसे बनाएं।',
      heading: 'दिसंबर में प्यूर्टो विएखो का मौसम',
      heroAlt: 'दिसंबर में प्यूर्टो विएखो दे तालामांका का उत्सवमय कैरिबियन तटीय कस्बा',
      photoCredit: <>तस्वीर: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'एक नज़र में दिसंबर',
      snapshot: [
        { label: 'तापमान', value: '27°C / 21°C' },
        { label: 'बारिश', value: '~350 mm, अब भी गीला, महीने के अंत में कम होता हुआ' },
        { label: 'समुद्र', value: 'सर्फ की लहरें, ~28°C' },
        { label: 'भीड़', value: 'छुट्टियों के दौरान अधिक' },
      ],
      whatItsLikeHeading: 'दिसंबर कैसा होता है',
      whatItsLikeParagraphs: [
        'दिसंबर एक जीवंत, उत्सवमय महीना है। यह अब भी साल के अधिक गीले हिस्सों में से एक है, पर जैसे-जैसे महीना आगे बढ़ता है बारिश अक्सर कम हो जाती है, और कस्बा छुट्टियों की ऊर्जा से भर जाता है: संगीत, पर्यटक और एक गुलज़ार समुद्रतट का माहौल।',
        'उत्तर-पूर्वी लहरें दिसंबर को सर्फ़रों का पसंदीदा बनाती हैं, और मशहूर साल्सा ब्रावा रीफ़ अपने सबसे अच्छे रूप में होती है। रातें साल की सबसे ठंडी होती हैं, जो नमी महसूस करने पर एक सुखद बदलाव है।',
      ],
      rainHeading: 'कितनी बारिश होती है?',
      rainParagraph:
        'दिसंबर में औसतन लगभग 350 mm बारिश होती है, हालांकि नववर्ष की ओर यह अक्सर सूखता जाता है। बौछारों और उजले पलों के मिश्रण की उम्मीद करें, और इस महीने ऐसे समुद्र की जो शांत पानी में स्नॉर्कलिंग से ज़्यादा सर्फ़ के बारे में है।',
      rainyDayIntro: 'बारिश हो या धूप, दिसंबर आपको व्यस्त रखता है:',
      rainyDayItems: [
        'मौसम की उत्तर-पूर्वी लहरों पर सर्फिंग देखें या आज़माएं',
        'बौछारों के बीच चॉकलेट टूर या कुकिंग क्लास करें',
        'कस्बे की उत्सवमय नाइटलाइफ़, संगीत और कैरिबियन भोजन का आनंद लें',
      ],
      crowdsHeading: 'भीड़, कीमतें और आयोजन',
      crowdsParagraph:
        'उत्सव का मौसम चरम समय होता है। साल की सबसे अधिक भीड़ और सबसे ऊंची कीमतों की उम्मीद करें, खासकर क्रिसमस से नववर्ष तक, यदि आप छुट्टियों के लिए आ रहे हैं तो अपना ठहराव काफ़ी पहले से बुक कर लें।',
      stayRecommendationTitle: 'दिसंबर में प्यूर्टो विएखो में कहां ठहरें',
      verdictHeading: 'क्या दिसंबर घूमने का अच्छा समय है?',
      verdictParagraph:
        'यदि आप माहौल, सर्फ़ और छुट्टियों की ऊर्जा चाहते हैं, तो दिसंबर एक बढ़िया समय है, बस जल्दी बुक करें और थोड़ी बारिश को स्वीकार करें। शांत, सूखे स्नॉर्कलिंग मौसम के लिए वेरानिलो के महीने बेहतर रहते हैं।',
      hubLinkText: 'पूरा महीने-दर-महीने मौसम गाइड देखें →',
      takeawaysHeading: 'मुख्य बातें',
      takeawaysParagraph:
        'दिसंबर उत्सवमय, जीवंत और सर्फ़-अनुकूल है, अब भी गीला पर अक्सर महीने के अंत में कम होता हुआ, सबसे ठंडी रातों और सबसे बड़ी भीड़ के साथ। जल्दी बुक करें, बौछारों के लिए सामान रखें, और शांत पानी वाले समुद्रतट दिनों के बजाय ऊर्जा के लिए आएं।',
    },
    nl: {
      seoTitle: 'Weer in Puerto Viejo in december: klimaat, regen en zee',
      seoDescription:
        'December in Puerto Viejo de Talamanca is feestelijk en levendig, nog nat maar met surfdeining en feestdagenenergie. Dit kun je verwachten en zo plan je je reis.',
      heading: 'Weer in Puerto Viejo in december',
      heroAlt: 'Feestelijk Caribisch kustplaatsje Puerto Viejo de Talamanca in december',
      photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
      snapshotHeading: 'December in een oogopslag',
      snapshot: [
        { label: 'Temperatuur', value: '27°C / 21°C' },
        { label: 'Regen', value: '~350 mm, nog nat, neemt af eind van de maand' },
        { label: 'Zee', value: 'Surfdeining, ~28°C' },
        { label: 'Drukte', value: 'Hoog tijdens de feestdagen' },
      ],
      whatItsLikeHeading: 'Hoe december aanvoelt',
      whatItsLikeParagraphs: [
        'December is een levendige, feestelijke maand. Het is nog een van de nattere periodes van het jaar, maar de regen neemt vaak af naarmate de maand vordert, en het dorp vult zich met feestdagenenergie: muziek, bezoekers en een bruisende strandsfeer.',
        'Noordoostelijke deining maakt december een favoriet onder surfers, en het beroemde Salsa Brava-rif is op zijn best. De nachten zijn de koelste van het jaar, een welkome verandering als je last hebt van de vochtigheid.',
      ],
      rainHeading: 'Hoeveel regent het?',
      rainParagraph:
        'December kent gemiddeld zo\'n 350 mm, al wordt het tegen de jaarwisseling vaak droger. Verwacht een mix van buien en heldere momenten, en een zee die deze maand meer om surfen draait dan om snorkelen in kalm water.',
      rainyDayIntro: 'Regen of zon, december houdt je bezig:',
      rainyDayItems: [
        'Bekijk of probeer het surfen op de noordoostelijke deining van het seizoen',
        'Doe een chocoladetour of een kookcursus tussen de buien door',
        'Geniet van het feestelijke nachtleven, de muziek en het Caribische eten in het dorp',
      ],
      crowdsHeading: 'Drukte, prijzen en evenementen',
      crowdsParagraph:
        'Het feestseizoen is hoogseizoen. Verwacht de grootste drukte en de hoogste prijzen van het jaar, vooral van Kerstmis tot Nieuwjaar, dus boek je verblijf ruim van tevoren als je voor de feestdagen komt.',
      stayRecommendationTitle: 'Waar te verblijven in Puerto Viejo in december',
      verdictHeading: 'Is december een goede tijd om te bezoeken?',
      verdictParagraph:
        'Als je sfeer, surf en feestdagenenergie zoekt, is december een geweldige tijd, boek gewoon vroeg en neem wat regen op de koop toe. Voor kalm, droog snorkelweer passen de veranillo-maanden beter.',
      hubLinkText: 'Bekijk de volledige maand-voor-maand weergids →',
      takeawaysHeading: 'Belangrijkste punten',
      takeawaysParagraph:
        'December is feestelijk, levendig en surfvriendelijk, nog nat maar vaak afnemend laat in de maand, met de koelste nachten en de grootste drukte. Boek vroeg, pak in voor buien en kom voor de energie in plaats van voor strandagen in kalm water.',
    },
  },
};

export function monthlyWeatherContent(month: MonthKey, locale: Locale): MonthlyWeatherContent {
  const byLocale = monthlyWeather[month]!;
  return byLocale[locale] ?? byLocale.en!;
}

export const weatherJanuaryContent = (locale: Locale): MonthlyWeatherContent => monthlyWeatherContent('january', locale);
export const weatherFebruaryContent = (locale: Locale): MonthlyWeatherContent => monthlyWeatherContent('february', locale);
export const weatherMarchContent = (locale: Locale): MonthlyWeatherContent => monthlyWeatherContent('march', locale);
export const weatherAprilContent = (locale: Locale): MonthlyWeatherContent => monthlyWeatherContent('april', locale);
export const weatherMayContent = (locale: Locale): MonthlyWeatherContent => monthlyWeatherContent('may', locale);
export const weatherJuneContent = (locale: Locale): MonthlyWeatherContent => monthlyWeatherContent('june', locale);
export const weatherJulyContent = (locale: Locale): MonthlyWeatherContent => monthlyWeatherContent('july', locale);
export const weatherAugustContent = (locale: Locale): MonthlyWeatherContent => monthlyWeatherContent('august', locale);
export const weatherSeptemberContent = (locale: Locale): MonthlyWeatherContent => monthlyWeatherContent('september', locale);
export const weatherOctoberContent = (locale: Locale): MonthlyWeatherContent => monthlyWeatherContent('october', locale);
export const weatherNovemberContent = (locale: Locale): MonthlyWeatherContent => monthlyWeatherContent('november', locale);
export const weatherDecemberContent = (locale: Locale): MonthlyWeatherContent => monthlyWeatherContent('december', locale);

/* ------------------------------------------------------------------ *
 * San José → Puerto Viejo — transport decision guide
 *
 * SEO gap: "buses puerto viejo san jose", "mepe san jose" and the English
 * route long-tail get impressions with ~0 clicks. Distinct spin from the
 * existing articles: bushours owns raw timetables, travellingtopuertoviejo
 * owns the travel-diary narrative — this one owns the decision (bus vs
 * shuttle vs private transfer vs flight) and links out to the other two.
 * ------------------------------------------------------------------ */

export interface TransportOptionRow {
  option: string;
  cost: string;
  time: string;
  comfort: string;
  bestFor: string;
}

export interface SanJoseOptionsContent {
  seoTitle: string;
  seoDescription: string;
  heading: string;
  heroAlt: string;
  photoCredit: React.ReactNode;
  introParagraphs: [string, string];
  tableHeading: string;
  tableIntro: string;
  colOption: string;
  colCost: string;
  colTime: string;
  colComfort: string;
  colBestFor: string;
  rows: TransportOptionRow[];
  busHeading: string;
  busParagraphs: string[];
  busLinkText: string;
  shuttleHeading: string;
  shuttleParagraphs: string[];
  transferHeading: string;
  transferParagraphs: string[];
  flightHeading: string;
  flightParagraphs: string[];
  flightLinkText: string;
  stayRecommendationTitle: string;
  returnHeading: string;
  returnParagraph: string;
  chooseHeading: string;
  chooseIntro: string;
  chooseListItems: string[];
  takeawaysHeading: string;
  takeawaysParagraph: string;
}

const sanJoseOptions: Partial<Record<Locale, SanJoseOptionsContent>> = {
  en: {
    seoTitle: 'San José to Puerto Viejo: bus, shuttle, private transfer and flight compared',
    seoDescription:
      'Bus, shared shuttle, private transfer or flight? Compare cost, time and comfort for every way to travel from San José to Puerto Viejo de Talamanca, and back.',
    heading: 'San José to Puerto Viejo: every way to get there compared',
    heroAlt: 'Road along the Caribbean coast toward Puerto Viejo de Talamanca, Costa Rica',
    photoCredit: <>Photo: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
    introParagraphs: [
      'Puerto Viejo de Talamanca sits about 210 km southeast of San José, on Costa Rica’s Caribbean coast. There are four realistic ways to make the trip, and the right one comes down to your budget, your luggage and how long you want to spend on the road.',
      'This guide sets them side by side: the public bus, a shared shuttle, a private transfer and the domestic flight. For exact bus times we link to our full schedule; here the aim is to help you choose.',
    ],
    tableHeading: 'The four options at a glance',
    tableIntro: 'Prices and times are approximate and change with season and traffic. Use them to compare, not as exact quotes.',
    colOption: 'Option',
    colCost: 'Cost (per person)',
    colTime: 'Door-to-door time',
    colComfort: 'Comfort',
    colBestFor: 'Best for',
    rows: [
      { option: 'Public bus (MEPE)', cost: '~$11-13', time: '~5-6 hrs', comfort: 'Basic', bestFor: 'Budget travellers' },
      { option: 'Shared shuttle', cost: '~$50-70', time: '~5 hrs', comfort: 'Comfortable', bestFor: 'Solo & couples, door-to-door' },
      { option: 'Private transfer', cost: '~$180-250 / vehicle', time: '~4.5 hrs', comfort: 'High', bestFor: 'Groups, families, luggage' },
      { option: 'Flight + transfer', cost: '~$90-150', time: '~2.5-3 hrs', comfort: 'High', bestFor: 'Saving time' },
    ],
    busHeading: 'Option 1: the public bus (cheapest)',
    busParagraphs: [
      'The MEPE bus is by far the cheapest way to reach Puerto Viejo, and locals and travellers use it alike. Direct buses leave San José from the Caribbean bus terminal (Gran Terminal del Caribe) several times a day and take around five to six hours with stops.',
      'It is basic. There are no reserved seats, and you pay cash in colones, but it gets you there for very little money. Come early in high season, since seats fill up, and keep your valuables with you.',
    ],
    busLinkText: 'See the full MEPE bus schedule and stops →',
    shuttleHeading: 'Option 2: shared shuttle',
    shuttleParagraphs: [
      'A shared shuttle is a tourist minivan that picks you up at your San José hotel and drops you at your accommodation in Puerto Viejo. It costs more than the bus but skips the terminals and connections, and the vehicles are air-conditioned and comfortable.',
      'It is a popular middle option for solo travellers and couples who want the convenience without paying for a private transfer.',
    ],
    transferHeading: 'Option 3: private transfer',
    transferParagraphs: [
      'A private transfer is your own vehicle and driver, door to door, on your schedule. For a family or a group it is often the best value per person, and it is the most comfortable choice if you have a lot of luggage or want to stop along the way.',
      'We can arrange a private transfer for your stay with us. Just ask, and we will sort out the route, timing and price so your arrival is stress-free.',
    ],
    flightHeading: 'Option 4: domestic flight (fastest)',
    flightParagraphs: [
      'If time matters more than money, you can fly. Domestic airlines link San José (SJO) with Limón in about 40 minutes, and from Limón it is a short transfer (around an hour) to Puerto Viejo.',
      'It is the quickest way to cross the country, and you get an aerial view of the rainforest on the way. You just add a transfer at the Limón end.',
    ],
    flightLinkText: 'Read our guide to reaching Puerto Viejo by plane →',
    stayRecommendationTitle: 'Where to stay when you arrive in Puerto Viejo',
    returnHeading: 'The return trip: Puerto Viejo → San José',
    returnParagraph:
      'Every option works in reverse. Direct MEPE buses run from Puerto Viejo back to San José through the day, with the first departures early in the morning. That is worth planning around if you have an onward flight from SJO. Shuttles, private transfers and flights all run the other way too; on a departure day, a private transfer or an early direct bus gives you the most reliable timing.',
    chooseHeading: 'Which should you choose?',
    chooseIntro: 'A quick way to decide:',
    chooseListItems: [
      'On a tight budget, or want the local experience → the MEPE bus',
      'Solo or a couple wanting easy door-to-door → a shared shuttle',
      'A family or group, lots of luggage, or want to stop along the way → a private transfer',
      'Short on time and happy to pay for it → fly to Limón and transfer',
    ],
    takeawaysHeading: 'Key takeaways',
    takeawaysParagraph:
      'Getting from San José to Puerto Viejo takes roughly five hours by road or under three by air. The bus is cheapest, a shuttle is the easy middle ground, a private transfer suits groups and luggage, and flying saves the most time. Pick by budget and party size, and let us help arrange your transfer when you book.',
  },
  es: {
    seoTitle: 'De San José a Puerto Viejo: bus, shuttle, transfer privado y avión',
    seoDescription:
      '¿Bus, shuttle compartido, transfer privado o avión? Compara precio, tiempo y comodidad de cada forma de viajar de San José a Puerto Viejo de Talamanca, y de regreso.',
    heading: 'De San José a Puerto Viejo: todas las formas de llegar comparadas',
    heroAlt: 'Carretera por la costa caribeña hacia Puerto Viejo de Talamanca, Costa Rica',
    photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
    introParagraphs: [
      'Puerto Viejo de Talamanca está a unos 210 km al sureste de San José, en el Caribe de Costa Rica. Hay cuatro formas realistas de hacer el viaje, y la mejor depende de tu presupuesto, tu equipaje y cuánto tiempo quieras pasar en la carretera.',
      'Esta guía las compara lado a lado: el bus público, un shuttle compartido, un transfer privado y el vuelo doméstico. Para los horarios exactos del bus enlazamos nuestro horario completo; aquí nos centramos en ayudarte a decidir.',
    ],
    tableHeading: 'Las cuatro opciones de un vistazo',
    tableIntro: 'Los precios y tiempos son aproximados y cambian según la temporada y el tráfico. Úsalos para comparar, no como cotizaciones exactas.',
    colOption: 'Opción',
    colCost: 'Precio (por persona)',
    colTime: 'Tiempo puerta a puerta',
    colComfort: 'Comodidad',
    colBestFor: 'Ideal para',
    rows: [
      { option: 'Bus público (MEPE)', cost: '~$11-13', time: '~5-6 h', comfort: 'Básica', bestFor: 'Viajeros con presupuesto ajustado' },
      { option: 'Shuttle compartido', cost: '~$50-70', time: '~5 h', comfort: 'Cómoda', bestFor: 'Solos y parejas, puerta a puerta' },
      { option: 'Transfer privado', cost: '~$180-250 / vehículo', time: '~4.5 h', comfort: 'Alta', bestFor: 'Grupos, familias, equipaje' },
      { option: 'Vuelo + transfer', cost: '~$90-150', time: '~2.5-3 h', comfort: 'Alta', bestFor: 'Ahorrar tiempo' },
    ],
    busHeading: 'Opción 1: el bus público (lo más barato)',
    busParagraphs: [
      'El bus de MEPE es, con diferencia, la forma más barata de llegar a Puerto Viejo, y lo usan tanto locales como viajeros. Los buses directos salen de San José desde la terminal del Caribe (Gran Terminal del Caribe) varias veces al día y tardan unas cinco a seis horas con las paradas.',
      'Es básico. No hay asientos reservados y se paga en efectivo, en colones, pero te lleva hasta allá por muy poco dinero. Llega temprano en temporada alta, porque los asientos se llenan, y mantén tus objetos de valor contigo.',
    ],
    busLinkText: 'Ver el horario completo y las paradas del bus MEPE →',
    shuttleHeading: 'Opción 2: shuttle compartido',
    shuttleParagraphs: [
      'Un shuttle compartido es una van turística que te recoge en tu hotel de San José y te deja en tu alojamiento en Puerto Viejo. Cuesta más que el bus, pero te ahorra las terminales y las conexiones, y los vehículos tienen aire acondicionado y son cómodos.',
      'Es una opción intermedia popular entre viajeros solos y parejas que quieren comodidad sin pagar un transfer privado.',
    ],
    transferHeading: 'Opción 3: transfer privado',
    transferParagraphs: [
      'Un transfer privado es tu propio vehículo y chofer, puerta a puerta y a tu horario. Para una familia o un grupo suele ser la mejor relación calidad-precio por persona, y es la opción más cómoda si llevas mucho equipaje o quieres parar por el camino.',
      'Podemos organizar un transfer privado para tu estadía con nosotros. Solo pídelo y nos encargamos de la ruta, el horario y el precio para que tu llegada sea sin estrés.',
    ],
    flightHeading: 'Opción 4: vuelo doméstico (lo más rápido)',
    flightParagraphs: [
      'Si el tiempo importa más que el dinero, puedes volar. Las aerolíneas domésticas conectan San José (SJO) con Limón en unos 40 minutos, y desde Limón es un transfer corto (alrededor de una hora) hasta Puerto Viejo.',
      'Es la forma más rápida de cruzar el país, y de paso ves la selva desde el aire. Solo añades un transfer en Limón.',
    ],
    flightLinkText: 'Lee nuestra guía para llegar a Puerto Viejo en avión →',
    stayRecommendationTitle: 'Dónde hospedarte al llegar a Puerto Viejo',
    returnHeading: 'El regreso: Puerto Viejo → San José',
    returnParagraph:
      'Todas las opciones funcionan a la inversa. Los buses directos de MEPE salen de Puerto Viejo hacia San José durante el día, con las primeras salidas temprano en la mañana. Conviene planificar en torno a ellas si tienes un vuelo de salida desde SJO. Los shuttles, transfers privados y vuelos también funcionan en sentido contrario; para el día de salida, un transfer privado o un bus directo temprano te dan el horario más confiable.',
    chooseHeading: '¿Cuál deberías elegir?',
    chooseIntro: 'Una forma rápida de decidir:',
    chooseListItems: [
      'Con presupuesto ajustado, o si quieres la experiencia local → el bus de MEPE',
      'Solo o en pareja buscando comodidad puerta a puerta → un shuttle compartido',
      'Una familia o grupo, mucho equipaje, o ganas de parar por el camino → un transfer privado',
      'Con poco tiempo y dispuesto a pagarlo → vuela a Limón y toma un transfer',
    ],
    takeawaysHeading: 'Puntos clave',
    takeawaysParagraph:
      'Ir de San José a Puerto Viejo toma unas cinco horas por carretera o menos de tres por aire. El bus es lo más barato, el shuttle es el punto medio cómodo, el transfer privado es lo mejor para grupos y equipaje, y volar ahorra más tiempo. Elige según tu presupuesto y el tamaño del grupo, y déjanos ayudarte a organizar tu transfer cuando reserves.',
  },
  de: {
    seoTitle: 'Von San José nach Puerto Viejo: Bus, Shuttle, Privattransfer und Flug im Vergleich',
    seoDescription:
      'Bus, Sammelshuttle, Privattransfer oder Flug? Vergleiche Preis, Zeit und Komfort für jede Art, von San José nach Puerto Viejo de Talamanca zu reisen, und zurück.',
    heading: 'Von San José nach Puerto Viejo: Alle Wege im Vergleich',
    heroAlt: 'Straße entlang der Karibikküste Richtung Puerto Viejo de Talamanca, Costa Rica',
    photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
    introParagraphs: [
      'Puerto Viejo de Talamanca liegt etwa 210 km südöstlich von San José, an der Karibikküste Costa Ricas. Es gibt vier realistische Möglichkeiten für die Reise, und welche die richtige ist, hängt von deinem Budget, deinem Gepäck und davon ab, wie viel Zeit du auf der Straße verbringen möchtest.',
      'Dieser Leitfaden stellt sie nebeneinander: den öffentlichen Bus, ein Sammelshuttle, einen Privattransfer und den Inlandsflug. Für die genauen Buszeiten verlinken wir unseren kompletten Fahrplan; hier helfen wir dir vor allem bei der Wahl.',
    ],
    tableHeading: 'Die vier Optionen auf einen Blick',
    tableIntro: 'Preise und Zeiten sind ungefähr und ändern sich je nach Saison und Verkehr. Nutze sie zum Vergleichen, nicht als genaue Angebote.',
    colOption: 'Option',
    colCost: 'Preis (pro Person)',
    colTime: 'Tür-zu-Tür-Zeit',
    colComfort: 'Komfort',
    colBestFor: 'Ideal für',
    rows: [
      { option: 'Öffentlicher Bus (MEPE)', cost: '~$11-13', time: '~5-6 Std.', comfort: 'Einfach', bestFor: 'Budgetreisende' },
      { option: 'Sammelshuttle', cost: '~$50-70', time: '~5 Std.', comfort: 'Komfortabel', bestFor: 'Alleinreisende & Paare, Tür zu Tür' },
      { option: 'Privattransfer', cost: '~$180-250 / Fahrzeug', time: '~4.5 Std.', comfort: 'Hoch', bestFor: 'Gruppen, Familien, Gepäck' },
      { option: 'Flug + Transfer', cost: '~$90-150', time: '~2.5-3 Std.', comfort: 'Hoch', bestFor: 'Zeit sparen' },
    ],
    busHeading: 'Option 1: Der öffentliche Bus (am günstigsten)',
    busParagraphs: [
      'Der MEPE-Bus ist mit Abstand die günstigste Art, nach Puerto Viejo zu kommen, und Einheimische wie Reisende nutzen ihn. Direktbusse fahren mehrmals täglich von San José vom Karibik-Busbahnhof (Gran Terminal del Caribe) ab und brauchen mit Zwischenstopps etwa fünf bis sechs Stunden.',
      'Er ist einfach. Es gibt keine reservierten Sitzplätze, und du zahlst bar in Colones, aber du kommst damit für sehr wenig Geld ans Ziel. Komm in der Hochsaison früh, da die Plätze schnell voll sind, und behalte Wertsachen bei dir.',
    ],
    busLinkText: 'Den kompletten MEPE-Busfahrplan und die Haltestellen ansehen →',
    shuttleHeading: 'Option 2: Sammelshuttle',
    shuttleParagraphs: [
      'Ein Sammelshuttle ist ein Touristen-Minivan, der dich an deinem Hotel in San José abholt und an deiner Unterkunft in Puerto Viejo absetzt. Es kostet mehr als der Bus, erspart dir aber Terminals und Umstiege, und die Fahrzeuge sind klimatisiert und bequem.',
      'Es ist eine beliebte Mittellösung für Alleinreisende und Paare, die Komfort wollen, ohne für einen Privattransfer zu zahlen.',
    ],
    transferHeading: 'Option 3: Privattransfer',
    transferParagraphs: [
      'Ein Privattransfer ist dein eigenes Fahrzeug mit Fahrer, von Tür zu Tür und nach deinem Zeitplan. Für eine Familie oder Gruppe ist es pro Person oft das beste Preis-Leistungs-Verhältnis und die bequemste Option, wenn du viel Gepäck hast oder unterwegs anhalten möchtest.',
      'Wir organisieren gern einen Privattransfer für deinen Aufenthalt bei uns. Frag einfach, und wir kümmern uns um Route, Zeit und Preis, damit deine Ankunft stressfrei verläuft.',
    ],
    flightHeading: 'Option 4: Inlandsflug (am schnellsten)',
    flightParagraphs: [
      'Wenn Zeit wichtiger ist als Geld, kannst du fliegen. Inlandsfluggesellschaften verbinden San José (SJO) in etwa 40 Minuten mit Limón, und von Limón ist es ein kurzer Transfer (rund eine Stunde) nach Puerto Viejo.',
      'Es ist die schnellste Art, das Land zu durchqueren, und du siehst dabei den Regenwald aus der Luft. Du fügst nur einen Transfer ab Limón hinzu.',
    ],
    flightLinkText: 'Lies unseren Leitfaden, wie du Puerto Viejo mit dem Flugzeug erreichst →',
    stayRecommendationTitle: 'Wo du bei deiner Ankunft in Puerto Viejo übernachtest',
    returnHeading: 'Die Rückreise: Puerto Viejo → San José',
    returnParagraph:
      'Jede Option funktioniert auch umgekehrt. Direkte MEPE-Busse fahren über den Tag verteilt von Puerto Viejo zurück nach San José, mit den ersten Abfahrten früh am Morgen. Das lohnt sich einzuplanen, wenn du einen Anschlussflug ab SJO hast. Auch Shuttles, Privattransfers und Flüge fahren in die andere Richtung; für den Abreisetag geben dir ein Privattransfer oder ein früher Direktbus die zuverlässigste Zeitplanung.',
    chooseHeading: 'Wofür solltest du dich entscheiden?',
    chooseIntro: 'Schnell entschieden:',
    chooseListItems: [
      'Knappes Budget oder Lust auf das lokale Erlebnis → der MEPE-Bus',
      'Allein oder als Paar mit dem Wunsch nach unkompliziertem Tür-zu-Tür → ein Sammelshuttle',
      'Eine Familie oder Gruppe, viel Gepäck oder Lust auf Zwischenstopps unterwegs → ein Privattransfer',
      'Wenig Zeit und bereit, dafür zu zahlen → flieg nach Limón und nimm einen Transfer',
    ],
    takeawaysHeading: 'Das Wichtigste in Kürze',
    takeawaysParagraph:
      'Von San José nach Puerto Viejo dauert es rund fünf Stunden über die Straße oder unter drei aus der Luft. Der Bus ist am günstigsten, ein Shuttle ist der bequeme Mittelweg, ein Privattransfer ist am besten für Gruppen und Gepäck, und der Flug spart die meiste Zeit. Wähle nach Budget und Gruppengröße, und lass uns deinen Transfer organisieren, wenn du buchst.',
  },
  fr: {
    seoTitle: 'De San José à Puerto Viejo : bus, navette, transfert privé et vol comparés',
    seoDescription:
      'Bus, navette partagée, transfert privé ou vol ? Comparez prix, temps et confort de chaque façon de voyager de San José à Puerto Viejo de Talamanca, et retour.',
    heading: 'De San José à Puerto Viejo : toutes les façons d’y aller comparées',
    heroAlt: 'Route le long de la côte caraïbe vers Puerto Viejo de Talamanca, Costa Rica',
    photoCredit: <>Photo : <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
    introParagraphs: [
      'Puerto Viejo de Talamanca se trouve à environ 210 km au sud-est de San José, sur la côte caraïbe du Costa Rica. Il existe quatre façons réalistes de faire le trajet, et la bonne dépend de votre budget, de vos bagages et du temps que vous voulez passer sur la route.',
      'Ce guide les compare côte à côte : le bus public, une navette partagée, un transfert privé et le vol intérieur. Pour les horaires exacts du bus, nous renvoyons à notre horaire complet ; ici, nous vous aidons surtout à choisir.',
    ],
    tableHeading: 'Les quatre options en un coup d’œil',
    tableIntro: 'Les prix et les temps sont approximatifs et varient selon la saison et le trafic. Utilisez-les pour comparer, pas comme des devis exacts.',
    colOption: 'Option',
    colCost: 'Prix (par personne)',
    colTime: 'Temps porte à porte',
    colComfort: 'Confort',
    colBestFor: 'Idéal pour',
    rows: [
      { option: 'Bus public (MEPE)', cost: '~$11-13', time: '~5-6 h', comfort: 'Basique', bestFor: 'Voyageurs à petit budget' },
      { option: 'Navette partagée', cost: '~$50-70', time: '~5 h', comfort: 'Confortable', bestFor: 'Solos & couples, porte à porte' },
      { option: 'Transfert privé', cost: '~$180-250 / véhicule', time: '~4.5 h', comfort: 'Élevé', bestFor: 'Groupes, familles, bagages' },
      { option: 'Vol + transfert', cost: '~$90-150', time: '~2.5-3 h', comfort: 'Élevé', bestFor: 'Gagner du temps' },
    ],
    busHeading: 'Option 1 : le bus public (le moins cher)',
    busParagraphs: [
      'Le bus MEPE est de loin le moyen le moins cher de rejoindre Puerto Viejo, et habitants comme voyageurs l’empruntent. Les bus directs partent de San José depuis la gare routière des Caraïbes (Gran Terminal del Caribe) plusieurs fois par jour et mettent environ cinq à six heures avec les arrêts.',
      'Il est basique. Pas de sièges réservés, et vous payez en espèces, en colones, mais il vous emmène là-bas pour très peu. Arrivez tôt en haute saison, car les places se remplissent, et gardez vos objets de valeur sur vous.',
    ],
    busLinkText: 'Voir l’horaire complet et les arrêts du bus MEPE →',
    shuttleHeading: 'Option 2 : navette partagée',
    shuttleParagraphs: [
      'Une navette partagée est un minibus touristique qui vous prend à votre hôtel de San José et vous dépose à votre hébergement à Puerto Viejo. Elle coûte plus cher que le bus, mais évite les gares et les correspondances, et les véhicules sont climatisés et confortables.',
      'C’est une option intermédiaire prisée des voyageurs solos et des couples qui veulent du confort sans payer un transfert privé.',
    ],
    transferHeading: 'Option 3 : transfert privé',
    transferParagraphs: [
      'Un transfert privé, c’est votre propre véhicule avec chauffeur, de porte à porte et à votre rythme. Pour une famille ou un groupe, c’est souvent le meilleur rapport qualité-prix par personne, et l’option la plus confortable si vous avez beaucoup de bagages ou voulez vous arrêter en chemin.',
      'Nous pouvons organiser un transfert privé pour votre séjour chez nous. Demandez-nous, et nous nous occupons de l’itinéraire, des horaires et du prix pour que votre arrivée soit sans stress.',
    ],
    flightHeading: 'Option 4 : vol intérieur (le plus rapide)',
    flightParagraphs: [
      'Si le temps compte plus que l’argent, vous pouvez prendre l’avion. Les compagnies intérieures relient San José (SJO) à Limón en environ 40 minutes, et depuis Limón, un court transfert (environ une heure) vous mène à Puerto Viejo.',
      'C’est le moyen le plus rapide de traverser le pays, et vous voyez la forêt tropicale d’en haut au passage. Il suffit d’ajouter un transfert côté Limón.',
    ],
    flightLinkText: 'Lisez notre guide pour rejoindre Puerto Viejo en avion →',
    stayRecommendationTitle: 'Où loger à votre arrivée à Puerto Viejo',
    returnHeading: 'Le trajet retour : Puerto Viejo → San José',
    returnParagraph:
      'Chaque option fonctionne dans l’autre sens. Les bus directs MEPE relient Puerto Viejo à San José tout au long de la journée, avec les premiers départs tôt le matin, à planifier si vous avez un vol au départ de SJO. Navettes, transferts privés et vols circulent aussi dans l’autre sens ; pour un jour de départ, un transfert privé ou un bus direct matinal vous offre les horaires les plus fiables.',
    chooseHeading: 'Lequel choisir ?',
    chooseIntro: 'Une façon rapide de décider :',
    chooseListItems: [
      'Budget serré, ou envie de l’expérience locale → le bus MEPE',
      'Solo ou en couple, envie d’un porte-à-porte facile → une navette partagée',
      'Une famille ou un groupe, beaucoup de bagages, ou envie de s’arrêter en chemin → un transfert privé',
      'Peu de temps et prêt à payer pour ça → volez vers Limón et prenez un transfert',
    ],
    takeawaysHeading: 'À retenir',
    takeawaysParagraph:
      'Aller de San José à Puerto Viejo prend environ cinq heures par la route ou moins de trois par les airs. Le bus est le moins cher, la navette est le compromis facile, le transfert privé est idéal pour les groupes et les bagages, et l’avion fait gagner le plus de temps. Choisissez selon votre budget et la taille de votre groupe, et laissez-nous organiser votre transfert au moment de réserver.',
  },
  it: {
    seoTitle: 'Da San José a Puerto Viejo: bus, navetta, transfer privato e volo a confronto',
    seoDescription:
      'Bus, navetta condivisa, transfer privato o volo? Confronta prezzo, tempo e comfort di ogni modo di viaggiare da San José a Puerto Viejo de Talamanca, e ritorno.',
    heading: 'Da San José a Puerto Viejo: tutti i modi per arrivarci a confronto',
    heroAlt: 'Strada lungo la costa caraibica verso Puerto Viejo de Talamanca, Costa Rica',
    photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
    introParagraphs: [
      'Puerto Viejo de Talamanca si trova a circa 210 km a sud-est di San José, sulla costa caraibica della Costa Rica. Ci sono quattro modi realistici per fare il viaggio, e quello giusto dipende dal tuo budget, dal tuo bagaglio e da quanto tempo vuoi passare in strada.',
      'Questa guida li mette a confronto uno accanto all’altro: il bus pubblico, una navetta condivisa, un transfer privato e il volo interno. Per gli orari esatti del bus rimandiamo al nostro orario completo; qui ci concentriamo sull’aiutarti a scegliere.',
    ],
    tableHeading: 'Le quattro opzioni a colpo d’occhio',
    tableIntro: 'Prezzi e tempi sono approssimativi e cambiano in base alla stagione e al traffico. Usali per confrontare, non come preventivi esatti.',
    colOption: 'Opzione',
    colCost: 'Prezzo (a persona)',
    colTime: 'Tempo porta a porta',
    colComfort: 'Comfort',
    colBestFor: 'Ideale per',
    rows: [
      { option: 'Bus pubblico (MEPE)', cost: '~$11-13', time: '~5-6 h', comfort: 'Essenziale', bestFor: 'Viaggiatori con budget ridotto' },
      { option: 'Navetta condivisa', cost: '~$50-70', time: '~5 h', comfort: 'Comodo', bestFor: 'Singoli e coppie, porta a porta' },
      { option: 'Transfer privato', cost: '~$180-250 / veicolo', time: '~4.5 h', comfort: 'Alto', bestFor: 'Gruppi, famiglie, bagagli' },
      { option: 'Volo + transfer', cost: '~$90-150', time: '~2.5-3 h', comfort: 'Alto', bestFor: 'Risparmiare tempo' },
    ],
    busHeading: 'Opzione 1: il bus pubblico (il più economico)',
    busParagraphs: [
      'Il bus MEPE è di gran lunga il modo più economico per raggiungere Puerto Viejo, e lo usano sia gli abitanti del posto sia i viaggiatori. I bus diretti partono da San José dalla stazione dei bus dei Caraibi (Gran Terminal del Caribe) più volte al giorno e impiegano circa cinque o sei ore, soste comprese.',
      'È essenziale. Niente posti riservati e si paga in contanti, in colones, ma ti porta fin lì per pochissimo. Arriva presto in alta stagione, perché i posti si riempiono, e tieni con te gli oggetti di valore.',
    ],
    busLinkText: 'Vedi l’orario completo e le fermate del bus MEPE →',
    shuttleHeading: 'Opzione 2: navetta condivisa',
    shuttleParagraphs: [
      'Una navetta condivisa è un minivan turistico che ti prende al tuo hotel di San José e ti lascia al tuo alloggio a Puerto Viejo. Costa più del bus, ma ti evita stazioni e coincidenze, e i veicoli sono climatizzati e comodi.',
      'È un’opzione intermedia molto amata da chi viaggia da solo e dalle coppie che vogliono comodità senza pagare un transfer privato.',
    ],
    transferHeading: 'Opzione 3: transfer privato',
    transferParagraphs: [
      'Un transfer privato è il tuo veicolo con autista, porta a porta e secondo i tuoi orari. Per una famiglia o un gruppo è spesso il miglior rapporto qualità-prezzo a persona, ed è l’opzione più comoda se hai molti bagagli o vuoi fermarti lungo il percorso.',
      'Possiamo organizzare un transfer privato per il tuo soggiorno con noi. Basta chiederlo e pensiamo noi a percorso, orari e prezzo, così il tuo arrivo è senza stress.',
    ],
    flightHeading: 'Opzione 4: volo interno (il più veloce)',
    flightParagraphs: [
      'Se il tempo conta più del denaro, puoi volare. Le compagnie interne collegano San José (SJO) con Limón in circa 40 minuti, e da Limón è un breve transfer (circa un’ora) fino a Puerto Viejo.',
      'È il modo più rapido per attraversare il paese e ti fa vedere la foresta pluviale dall’alto. Basta aggiungere un transfer dal lato di Limón.',
    ],
    flightLinkText: 'Leggi la nostra guida per raggiungere Puerto Viejo in aereo →',
    stayRecommendationTitle: 'Dove alloggiare al tuo arrivo a Puerto Viejo',
    returnHeading: 'Il viaggio di ritorno: Puerto Viejo → San José',
    returnParagraph:
      'Ogni opzione funziona anche al contrario. I bus diretti MEPE collegano Puerto Viejo a San José durante tutta la giornata, con le prime partenze la mattina presto. Da tenere in conto se hai un volo in partenza da SJO. Anche navette, transfer privati e voli viaggiano nell’altra direzione; per il giorno della partenza, un transfer privato o un bus diretto mattutino ti danno gli orari più affidabili.',
    chooseHeading: 'Quale scegliere?',
    chooseIntro: 'Un modo rapido per decidere:',
    chooseListItems: [
      'Budget ridotto, o voglia dell’esperienza locale → il bus MEPE',
      'Da solo o in coppia con voglia di un comodo porta a porta → una navetta condivisa',
      'Una famiglia o un gruppo, molti bagagli, o voglia di fermarsi lungo il percorso → un transfer privato',
      'Poco tempo e disposto a pagarlo → vola a Limón e prendi un transfer',
    ],
    takeawaysHeading: 'Punti chiave',
    takeawaysParagraph:
      'Andare da San José a Puerto Viejo richiede circa cinque ore su strada o meno di tre in aereo. Il bus è il più economico, la navetta è la comoda via di mezzo, il transfer privato è il migliore per gruppi e bagagli, e volare fa risparmiare più tempo. Scegli in base al budget e al numero di persone, e lascia che ti aiutiamo a organizzare il transfer quando prenoti.',
  },
  pt: {
    seoTitle: 'De San José a Puerto Viejo: ônibus, shuttle, transfer privado e voo comparados',
    seoDescription:
      'Ônibus, shuttle compartilhado, transfer privado ou voo? Compare preço, tempo e conforto de cada forma de viajar de San José a Puerto Viejo de Talamanca, e de volta.',
    heading: 'De San José a Puerto Viejo: todas as formas de chegar comparadas',
    heroAlt: 'Estrada pela costa caribenha rumo a Puerto Viejo de Talamanca, Costa Rica',
    photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
    introParagraphs: [
      'Puerto Viejo de Talamanca fica a cerca de 210 km a sudeste de San José, na costa caribenha da Costa Rica. Há quatro formas realistas de fazer a viagem, e a certa depende do seu orçamento, da sua bagagem e de quanto tempo você quer passar na estrada.',
      'Este guia as compara lado a lado: o ônibus público, um shuttle compartilhado, um transfer privado e o voo doméstico. Para os horários exatos do ônibus, indicamos o nosso horário completo; aqui, focamos em ajudar você a decidir.',
    ],
    tableHeading: 'As quatro opções num relance',
    tableIntro: 'Preços e tempos são aproximados e mudam conforme a temporada e o trânsito. Use-os para comparar, não como cotações exatas.',
    colOption: 'Opção',
    colCost: 'Preço (por pessoa)',
    colTime: 'Tempo porta a porta',
    colComfort: 'Conforto',
    colBestFor: 'Ideal para',
    rows: [
      { option: 'Ônibus público (MEPE)', cost: '~$11-13', time: '~5-6 h', comfort: 'Básico', bestFor: 'Viajantes com orçamento apertado' },
      { option: 'Shuttle compartilhado', cost: '~$50-70', time: '~5 h', comfort: 'Confortável', bestFor: 'Sozinhos e casais, porta a porta' },
      { option: 'Transfer privado', cost: '~$180-250 / veículo', time: '~4.5 h', comfort: 'Alto', bestFor: 'Grupos, famílias, bagagem' },
      { option: 'Voo + transfer', cost: '~$90-150', time: '~2.5-3 h', comfort: 'Alto', bestFor: 'Economizar tempo' },
    ],
    busHeading: 'Opção 1: o ônibus público (mais barato)',
    busParagraphs: [
      'O ônibus da MEPE é, de longe, a forma mais barata de chegar a Puerto Viejo, e é usado tanto por moradores quanto por viajantes. Os ônibus diretos saem de San José do terminal do Caribe (Gran Terminal del Caribe) várias vezes ao dia e levam cerca de cinco a seis horas, incluindo paradas.',
      'É básico. Não há lugares reservados e você paga em dinheiro, em colones, mas leva você até lá por muito pouco. Chegue cedo na alta temporada, pois os lugares lotam, e mantenha seus objetos de valor com você.',
    ],
    busLinkText: 'Ver o horário completo e as paradas do ônibus MEPE →',
    shuttleHeading: 'Opção 2: shuttle compartilhado',
    shuttleParagraphs: [
      'Um shuttle compartilhado é uma van turística que pega você no seu hotel em San José e deixa na sua acomodação em Puerto Viejo. Custa mais que o ônibus, mas evita terminais e conexões, e os veículos têm ar-condicionado e são confortáveis.',
      'É uma opção intermediária popular entre quem viaja sozinho e casais que querem comodidade sem pagar um transfer privado.',
    ],
    transferHeading: 'Opção 3: transfer privado',
    transferParagraphs: [
      'Um transfer privado é o seu próprio veículo com motorista, porta a porta e no seu horário. Para uma família ou grupo costuma ser o melhor custo-benefício por pessoa, e é a opção mais confortável se você leva muita bagagem ou quer parar pelo caminho.',
      'Podemos organizar um transfer privado para a sua estadia conosco. É só pedir, e cuidamos da rota, do horário e do preço para que a sua chegada seja sem estresse.',
    ],
    flightHeading: 'Opção 4: voo doméstico (mais rápido)',
    flightParagraphs: [
      'Se o tempo importa mais que o dinheiro, você pode voar. As companhias domésticas ligam San José (SJO) a Limón em cerca de 40 minutos, e de Limón é um transfer curto (por volta de uma hora) até Puerto Viejo.',
      'É a forma mais rápida de atravessar o país e você ainda vê a floresta tropical do alto. Você só adiciona um transfer no lado de Limón.',
    ],
    flightLinkText: 'Leia o nosso guia para chegar a Puerto Viejo de avião →',
    stayRecommendationTitle: 'Onde se hospedar ao chegar em Puerto Viejo',
    returnHeading: 'A viagem de volta: Puerto Viejo → San José',
    returnParagraph:
      'Todas as opções funcionam no sentido inverso. Os ônibus diretos da MEPE saem de Puerto Viejo de volta a San José ao longo do dia, com as primeiras saídas de manhã cedo. Vale planejar em torno delas se você tiver um voo de saída de SJO. Shuttles, transfers privados e voos também funcionam no sentido contrário; para o dia da partida, um transfer privado ou um ônibus direto cedo garantem os horários mais confiáveis.',
    chooseHeading: 'Qual você deve escolher?',
    chooseIntro: 'Uma forma rápida de decidir:',
    chooseListItems: [
      'Com orçamento apertado, ou querendo a experiência local → o ônibus da MEPE',
      'Sozinho ou em casal querendo um porta a porta fácil → um shuttle compartilhado',
      'Uma família ou grupo, muita bagagem, ou vontade de parar pelo caminho → um transfer privado',
      'Com pouco tempo e disposto a pagar por isso → voe até Limón e pegue um transfer',
    ],
    takeawaysHeading: 'Pontos principais',
    takeawaysParagraph:
      'Ir de San José a Puerto Viejo leva cerca de cinco horas por estrada ou menos de três pelo ar. O ônibus é o mais barato, o shuttle é o meio-termo fácil, o transfer privado é o melhor para grupos e bagagem, e voar economiza mais tempo. Escolha pelo orçamento e pelo tamanho do grupo, e deixe a gente ajudar a organizar o seu transfer quando reservar.',
  },
  he: {
    seoTitle: 'מ-San José ל-Puerto Viejo: אוטובוס, שאטל, הסעה פרטית וטיסה בהשוואה',
    seoDescription:
      'אוטובוס, שאטל משותף, הסעה פרטית או טיסה? השוו מחיר, זמן ונוחות לכל דרך לנסוע מ-San José ל-Puerto Viejo de Talamanca, ובחזרה.',
    heading: 'מ-San José ל-Puerto Viejo: כל הדרכים להגיע בהשוואה',
    heroAlt: 'כביש לאורך חוף הקריביים לכיוון Puerto Viejo de Talamanca, קוסטה ריקה',
    photoCredit: <>צילום: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
    introParagraphs: [
      'Puerto Viejo de Talamanca שוכנת כ-210 ק"מ דרומית-מזרחית ל-San José, על חוף הקריביים של קוסטה ריקה. יש ארבע דרכים ריאליות לעשות את הדרך, והנכונה תלויה בתקציב שלכם, בכמות המזוודות ובכמה זמן אתם מוכנים לבלות בכביש.',
      'המדריך הזה משווה ביניהן זו לצד זו: האוטובוס הציבורי, שאטל משותף, הסעה פרטית והטיסה הפנימית. לזמני האוטובוס המדויקים אנחנו מקשרים ללוח הזמנים המלא שלנו; כאן נתמקד בעזרה בבחירה.',
    ],
    tableHeading: 'ארבע האפשרויות במבט חטוף',
    tableIntro: 'המחירים והזמנים משוערים ומשתנים לפי העונה והתנועה. השתמשו בהם להשוואה, לא כהצעת מחיר מדויקת.',
    colOption: 'אפשרות',
    colCost: 'מחיר (לאדם)',
    colTime: 'זמן מדלת לדלת',
    colComfort: 'נוחות',
    colBestFor: 'מתאים במיוחד ל',
    rows: [
      { option: 'אוטובוס ציבורי (MEPE)', cost: '~$11-13', time: '~5-6 שעות', comfort: 'בסיסית', bestFor: 'מטיילים בתקציב מצומצם' },
      { option: 'שאטל משותף', cost: '~$50-70', time: '~5 שעות', comfort: 'נוחה', bestFor: 'יחידים וזוגות, מדלת לדלת' },
      { option: 'הסעה פרטית', cost: '~$180-250 / רכב', time: '~4.5 שעות', comfort: 'גבוהה', bestFor: 'קבוצות, משפחות, מזוודות' },
      { option: 'טיסה + הסעה', cost: '~$90-150', time: '~2.5-3 שעות', comfort: 'גבוהה', bestFor: 'חיסכון בזמן' },
    ],
    busHeading: 'אפשרות 1: האוטובוס הציבורי (הזול ביותר)',
    busParagraphs: [
      'האוטובוס של MEPE הוא ללא ספק הדרך הזולה ביותר להגיע ל-Puerto Viejo, ומשתמשים בו גם מקומיים וגם מטיילים. אוטובוסים ישירים יוצאים מ-San José מתחנת האוטובוסים של הקריביים (Gran Terminal del Caribe) כמה פעמים ביום, והנסיעה אורכת כחמש עד שש שעות כולל עצירות.',
      'הוא בסיסי. אין מקומות שמורים והתשלום במזומן, בקולונס, אבל הוא מביא אתכם לשם בזול מאוד. הגיעו מוקדם בעונה הגבוהה, כי המקומות מתמלאים, ושמרו על חפצי הערך קרוב אליכם.',
    ],
    busLinkText: 'צפו בלוח הזמנים המלא ובתחנות של אוטובוס MEPE ←',
    shuttleHeading: 'אפשרות 2: שאטל משותף',
    shuttleParagraphs: [
      'שאטל משותף הוא מיניוואן תיירותי שאוסף אתכם ממלון ב-San José ומוריד אתכם בבית ההארחה שלכם ב-Puerto Viejo. הוא עולה יותר מהאוטובוס, אבל חוסך את הטרחה של תחנות וחיבורים, והרכבים ממוזגים ונוחים.',
      'זו אפשרות ביניים פופולרית למטיילים יחידים ולזוגות שרוצים נוחות בלי לשלם על הסעה פרטית.',
    ],
    transferHeading: 'אפשרות 3: הסעה פרטית',
    transferParagraphs: [
      'הסעה פרטית היא רכב ונהג משלכם, מדלת לדלת ולפי הזמנים שלכם. למשפחה או קבוצה זו לרוב התמורה הטובה ביותר לאדם, וזו האפשרות הנוחה ביותר למי שנוסע עם הרבה מזוודות או רוצה לעצור בדרך.',
      'נשמח לארגן לכם הסעה פרטית לשהות אצלנו. רק בקשו, ואנחנו נדאג למסלול, לזמנים ולמחיר כדי שההגעה שלכם תהיה נטולת דאגות.',
    ],
    flightHeading: 'אפשרות 4: טיסה פנימית (המהירה ביותר)',
    flightParagraphs: [
      'אם הזמן חשוב יותר מהכסף, אפשר לטוס. חברות תעופה פנימיות מקשרות בין San José (SJO) ל-Limón בכ-40 דקות, ומ-Limón זו הסעה קצרה (כשעה) עד Puerto Viejo.',
      'זו הדרך המהירה ביותר לחצות את המדינה, ובדרך רואים את יער הגשם מלמעלה. רק מוסיפים הסעה בצד של Limón.',
    ],
    flightLinkText: 'קראו את המדריך שלנו להגעה ל-Puerto Viejo במטוס ←',
    stayRecommendationTitle: 'איפה להתארח כשמגיעים ל-Puerto Viejo',
    returnHeading: 'הדרך חזרה: מ-Puerto Viejo ל-San José',
    returnParagraph:
      'כל אפשרות עובדת גם בכיוון ההפוך. אוטובוסים ישירים של MEPE יוצאים מ-Puerto Viejo בחזרה ל-San José לאורך היום, כשהיציאות הראשונות מוקדם בבוקר. כדאי לתכנן סביבן אם יש לכם טיסת המשך מ-SJO. גם שאטלים, הסעות פרטיות וטיסות פועלים בכיוון ההפוך; ליום היציאה, הסעה פרטית או אוטובוס ישיר מוקדם ייתנו לכם את הזמנים האמינים ביותר.',
    chooseHeading: 'מה כדאי לכם לבחור?',
    chooseIntro: 'דרך מהירה להחליט:',
    chooseListItems: [
      'בתקציב מצומצם, או רוצים את החוויה המקומית ← האוטובוס של MEPE',
      'יחידים או זוג שרוצים דלת-לדלת פשוט ← שאטל משותף',
      'משפחה או קבוצה, הרבה מזוודות, או רצון לעצור בדרך ← הסעה פרטית',
      'קצרים בזמן ומוכנים לשלם על זה ← טוסו ל-Limón וקחו הסעה',
    ],
    takeawaysHeading: 'עיקרי הדברים',
    takeawaysParagraph:
      'המעבר מ-San José ל-Puerto Viejo אורך כחמש שעות בכביש או פחות משלוש באוויר. האוטובוס הוא הזול ביותר, השאטל הוא דרך הביניים הנוחה, ההסעה הפרטית מתאימה ביותר לקבוצות ולמזוודות, והטיסה חוסכת הכי הרבה זמן. בחרו לפי התקציב וגודל הקבוצה, ותנו לנו לעזור לארגן את ההסעה שלכם בזמן ההזמנה.',
  },
  hi: {
    seoTitle: 'San José से Puerto Viejo: बस, शटल, निजी ट्रांसफर और फ्लाइट की तुलना',
    seoDescription:
      'बस, साझा शटल, निजी ट्रांसफर या फ्लाइट? San José से Puerto Viejo de Talamanca तक, और वापसी की, हर यात्रा के तरीके की कीमत, समय और आराम की तुलना करें।',
    heading: 'San José से Puerto Viejo: पहुँचने के हर तरीके की तुलना',
    heroAlt: 'Puerto Viejo de Talamanca, कोस्टा रिका की ओर कैरिबियन तट के किनारे सड़क',
    photoCredit: <>फ़ोटो: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
    introParagraphs: [
      'Puerto Viejo de Talamanca, San José से लगभग 210 किमी दक्षिण-पूर्व में, कोस्टा रिका के कैरिबियन तट पर स्थित है। यह यात्रा करने के चार व्यावहारिक तरीके हैं, और सही तरीका आपके बजट, आपके सामान और सड़क पर आप कितना समय बिताना चाहते हैं, इस पर निर्भर करता है।',
      'यह गाइड उन्हें आमने-सामने रखकर तुलना करती है: सार्वजनिक बस, एक साझा शटल, एक निजी ट्रांसफर और घरेलू फ्लाइट। बस के सटीक समय के लिए, हम अपना पूरा शेड्यूल लिंक करते हैं; यहाँ हम आपको चुनने में मदद करने पर ध्यान देते हैं।',
    ],
    tableHeading: 'एक नज़र में चार विकल्प',
    tableIntro: 'कीमतें और समय अनुमानित हैं और मौसम व ट्रैफ़िक के साथ बदलते हैं। इन्हें तुलना के लिए इस्तेमाल करें, सटीक कोटेशन के रूप में नहीं।',
    colOption: 'विकल्प',
    colCost: 'कीमत (प्रति व्यक्ति)',
    colTime: 'दरवाज़े से दरवाज़े तक का समय',
    colComfort: 'आराम',
    colBestFor: 'सबसे उपयुक्त',
    rows: [
      { option: 'सार्वजनिक बस (MEPE)', cost: '~$11-13', time: '~5-6 घंटे', comfort: 'सामान्य', bestFor: 'कम बजट वाले यात्री' },
      { option: 'साझा शटल', cost: '~$50-70', time: '~5 घंटे', comfort: 'आरामदेह', bestFor: 'अकेले और जोड़े, दरवाज़े से दरवाज़े तक' },
      { option: 'निजी ट्रांसफर', cost: '~$180-250 / वाहन', time: '~4.5 घंटे', comfort: 'उच्च', bestFor: 'समूह, परिवार, सामान' },
      { option: 'फ्लाइट + ट्रांसफर', cost: '~$90-150', time: '~2.5-3 घंटे', comfort: 'उच्च', bestFor: 'समय बचाना' },
    ],
    busHeading: 'विकल्प 1: सार्वजनिक बस (सबसे सस्ती)',
    busParagraphs: [
      'MEPE बस Puerto Viejo पहुँचने का अब तक का सबसे सस्ता तरीका है, और स्थानीय लोग व यात्री दोनों इसका इस्तेमाल करते हैं। सीधी बसें San José से कैरिबियन बस टर्मिनल (Gran Terminal del Caribe) से दिन में कई बार चलती हैं और रुकावटों सहित करीब पाँच से छह घंटे लेती हैं।',
      'यह सामान्य है। कोई आरक्षित सीट नहीं, और आप नकद यानी कोलोनेस में भुगतान करते हैं, लेकिन यह आपको बहुत कम पैसे में वहाँ पहुँचा देती है। पीक सीज़न में जल्दी पहुँचें, क्योंकि सीटें भर जाती हैं, और अपनी कीमती चीज़ें अपने पास रखें।',
    ],
    busLinkText: 'MEPE बस का पूरा शेड्यूल और स्टॉप देखें →',
    shuttleHeading: 'विकल्प 2: साझा शटल',
    shuttleParagraphs: [
      'साझा शटल एक पर्यटक मिनीवैन है जो आपको San José में आपके होटल से उठाती है और Puerto Viejo में आपके ठहरने की जगह पर छोड़ देती है। इसकी कीमत बस से ज़्यादा है, लेकिन यह टर्मिनल और कनेक्शन की झंझट खत्म कर देती है, और वाहन वातानुकूलित तथा आरामदेह होते हैं।',
      'यह अकेले यात्रा करने वालों और जोड़ों के लिए एक लोकप्रिय बीच का विकल्प है, जो निजी ट्रांसफर की कीमत चुकाए बिना सुविधा चाहते हैं।',
    ],
    transferHeading: 'विकल्प 3: निजी ट्रांसफर',
    transferParagraphs: [
      'निजी ट्रांसफर आपका अपना वाहन और ड्राइवर है, दरवाज़े से दरवाज़े तक, आपके समय के अनुसार। किसी परिवार या समूह के लिए यह अक्सर प्रति व्यक्ति सबसे किफ़ायती होता है, और जिनके पास ढेर सारा सामान है या जो रास्ते में रुकना चाहते हैं, उनके लिए यह सबसे आरामदेह विकल्प है।',
      'हम आपके हमारे यहाँ ठहरने के लिए निजी ट्रांसफर की व्यवस्था कर सकते हैं। बस कहिए, और हम रास्ता, समय और कीमत संभाल लेंगे ताकि आपका आगमन तनावमुक्त रहे।',
    ],
    flightHeading: 'विकल्प 4: घरेलू फ्लाइट (सबसे तेज़)',
    flightParagraphs: [
      'अगर समय पैसे से ज़्यादा मायने रखता है, तो आप उड़ान भर सकते हैं। घरेलू एयरलाइंस San José (SJO) को Limón से करीब 40 मिनट में जोड़ती हैं, और Limón से Puerto Viejo तक एक छोटा ट्रांसफर (लगभग एक घंटा) है।',
      'यह देश को पार करने का सबसे तेज़ तरीका है और रास्ते में आपको वर्षावन का हवाई नज़ारा भी मिलता है। आपको बस Limón की ओर एक ट्रांसफर जोड़ना है।',
    ],
    flightLinkText: 'हवाई जहाज़ से Puerto Viejo पहुँचने की हमारी गाइड पढ़ें →',
    stayRecommendationTitle: 'Puerto Viejo पहुँचने पर कहाँ ठहरें',
    returnHeading: 'वापसी की यात्रा: Puerto Viejo → San José',
    returnParagraph:
      'हर विकल्प उल्टी दिशा में भी काम करता है। सीधी MEPE बसें दिन भर Puerto Viejo से San José वापस चलती हैं, जिनकी पहली रवानगी सुबह जल्दी होती है। अगर आपकी SJO से आगे की फ्लाइट है तो इसके हिसाब से योजना बनाना फ़ायदेमंद है। शटल, निजी ट्रांसफर और फ्लाइट भी दूसरी दिशा में चलते हैं; रवानगी के दिन के लिए, एक निजी ट्रांसफर या सुबह की सीधी बस आपको सबसे भरोसेमंद समय देती है।',
    chooseHeading: 'आपको कौन-सा चुनना चाहिए?',
    chooseIntro: 'तय करने का एक तेज़ तरीका:',
    chooseListItems: [
      'सीमित बजट में, या स्थानीय अनुभव चाहते हैं → MEPE बस',
      'अकेले या जोड़े के रूप में आसान दरवाज़े-से-दरवाज़े तक चाहते हैं → एक साझा शटल',
      'एक परिवार या समूह, ढेर सारा सामान, या रास्ते में रुकना चाहते हैं → एक निजी ट्रांसफर',
      'समय कम है और उसके लिए भुगतान करने को तैयार हैं → Limón के लिए उड़ान भरें और ट्रांसफर लें',
    ],
    takeawaysHeading: 'मुख्य बातें',
    takeawaysParagraph:
      'San José से Puerto Viejo पहुँचने में सड़क मार्ग से करीब पाँच घंटे या हवाई मार्ग से तीन घंटे से कम लगते हैं। बस सबसे सस्ती है, शटल आसान बीच का रास्ता है, निजी ट्रांसफर समूहों और सामान के लिए सबसे अच्छा है, और उड़ान सबसे ज़्यादा समय बचाती है। अपने बजट और समूह के आकार के हिसाब से चुनें, और बुकिंग के समय अपना ट्रांसफर व्यवस्थित करने में हमें मदद करने दें।',
  },
  nl: {
    seoTitle: 'Van San José naar Puerto Viejo: bus, shuttle, privétransfer en vlucht vergeleken',
    seoDescription:
      'Bus, gedeelde shuttle, privétransfer of vlucht? Vergelijk prijs, tijd en comfort van elke manier om van San José naar Puerto Viejo de Talamanca te reizen, en terug.',
    heading: 'Van San José naar Puerto Viejo: alle manieren om er te komen vergeleken',
    heroAlt: 'Weg langs de Caribische kust richting Puerto Viejo de Talamanca, Costa Rica',
    photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
    introParagraphs: [
      'Puerto Viejo de Talamanca ligt zo’n 210 km ten zuidoosten van San José, aan de Caribische kust van Costa Rica. Er zijn vier realistische manieren om de reis te maken, en de juiste hangt af van je budget, je bagage en hoeveel tijd je onderweg wilt doorbrengen.',
      'Deze gids zet ze naast elkaar: de openbare bus, een gedeelde shuttle, een privétransfer en de binnenlandse vlucht. Voor de exacte bustijden linken we naar ons volledige schema; hier helpen we je vooral kiezen.',
    ],
    tableHeading: 'De vier opties in één oogopslag',
    tableIntro: 'Prijzen en tijden zijn bij benadering en veranderen met het seizoen en het verkeer. Gebruik ze om te vergelijken, niet als exacte offerte.',
    colOption: 'Optie',
    colCost: 'Prijs (per persoon)',
    colTime: 'Deur-tot-deurtijd',
    colComfort: 'Comfort',
    colBestFor: 'Ideaal voor',
    rows: [
      { option: 'Openbare bus (MEPE)', cost: '~$11-13', time: '~5-6 u', comfort: 'Basic', bestFor: 'Reizigers met een klein budget' },
      { option: 'Gedeelde shuttle', cost: '~$50-70', time: '~5 u', comfort: 'Comfortabel', bestFor: 'Alleenreizigers & stellen, deur tot deur' },
      { option: 'Privétransfer', cost: '~$180-250 / voertuig', time: '~4.5 u', comfort: 'Hoog', bestFor: 'Groepen, gezinnen, bagage' },
      { option: 'Vlucht + transfer', cost: '~$90-150', time: '~2.5-3 u', comfort: 'Hoog', bestFor: 'Tijd besparen' },
    ],
    busHeading: 'Optie 1: de openbare bus (goedkoopst)',
    busParagraphs: [
      'De MEPE-bus is veruit de goedkoopste manier om Puerto Viejo te bereiken, en zowel locals als reizigers maken er gebruik van. Directe bussen vertrekken meerdere keren per dag vanuit San José vanaf het Caribische busstation (Gran Terminal del Caribe) en doen er ongeveer vijf tot zes uur over, inclusief stops.',
      'Hij is basic. Er zijn geen gereserveerde plaatsen en je betaalt contant in colones, maar hij brengt je er voor heel weinig geld. Kom vroeg in het hoogseizoen, want de plaatsen raken vol, en houd je waardevolle spullen bij je.',
    ],
    busLinkText: 'Bekijk het volledige MEPE-busschema en de haltes →',
    shuttleHeading: 'Optie 2: gedeelde shuttle',
    shuttleParagraphs: [
      'Een gedeelde shuttle is een toeristenbusje dat je bij je hotel in San José ophaalt en bij je accommodatie in Puerto Viejo afzet. Het kost meer dan de bus, maar bespaart je het gedoe van stations en overstappen, en de voertuigen zijn geairconditioneerd en comfortabel.',
      'Het is een populaire tussenoptie voor alleenreizigers en stellen die comfort willen zonder voor een privétransfer te betalen.',
    ],
    transferHeading: 'Optie 3: privétransfer',
    transferParagraphs: [
      'Een privétransfer is je eigen voertuig met chauffeur, van deur tot deur en op jouw schema. Voor een gezin of groep is het vaak de beste prijs-kwaliteitverhouding per persoon, en het is de comfortabelste optie als je veel bagage hebt of onderweg wilt stoppen.',
      'We regelen graag een privétransfer voor je verblijf bij ons. Vraag het ons gewoon, en wij zorgen voor de route, de timing en de prijs zodat je aankomst zonder stress verloopt.',
    ],
    flightHeading: 'Optie 4: binnenlandse vlucht (snelst)',
    flightParagraphs: [
      'Als tijd belangrijker is dan geld, kun je vliegen. Binnenlandse luchtvaartmaatschappijen verbinden San José (SJO) in ongeveer 40 minuten met Limón, en vanaf Limón is het een korte transfer (ongeveer een uur) naar Puerto Viejo.',
      'Het is de snelste manier om het land over te steken en je ziet het regenwoud onderweg vanuit de lucht. Je voegt alleen een transfer toe aan de kant van Limón.',
    ],
    flightLinkText: 'Lees onze gids om Puerto Viejo met het vliegtuig te bereiken →',
    stayRecommendationTitle: 'Waar te verblijven als je aankomt in Puerto Viejo',
    returnHeading: 'De terugreis: Puerto Viejo → San José',
    returnParagraph:
      'Elke optie werkt ook omgekeerd. Directe MEPE-bussen rijden de hele dag door van Puerto Viejo terug naar San José, met de eerste vertrekken vroeg in de ochtend. Het loont om daar rekening mee te houden als je een aansluitende vlucht vanaf SJO hebt. Ook shuttles, privétransfers en vluchten rijden de andere kant op; voor een vertrekdag geven een privétransfer of een vroege directe bus je de betrouwbaarste timing.',
    chooseHeading: 'Welke moet je kiezen?',
    chooseIntro: 'Snel beslissen:',
    chooseListItems: [
      'Klein budget, of zin in de lokale ervaring → de MEPE-bus',
      'Alleen of als stel op zoek naar eenvoudig deur tot deur → een gedeelde shuttle',
      'Een gezin of groep, veel bagage, of zin om onderweg te stoppen → een privétransfer',
      'Weinig tijd en bereid ervoor te betalen → vlieg naar Limón en neem een transfer',
    ],
    takeawaysHeading: 'Belangrijkste punten',
    takeawaysParagraph:
      'Van San José naar Puerto Viejo duurt ongeveer vijf uur over de weg of minder dan drie door de lucht. De bus is het goedkoopst, een shuttle is de makkelijke tussenweg, een privétransfer is het best voor groepen en bagage, en vliegen bespaart de meeste tijd. Kies op budget en groepsgrootte, en laat ons je transfer regelen wanneer je boekt.',
  },
};

export function sanJoseOptionsContent(locale: Locale): SanJoseOptionsContent {
  return sanJoseOptions[locale] ?? sanJoseOptions.en!;
}

/* ------------------------------------------------------------------ *
 * Gandoca-Manzanillo Wildlife Refuge — what-to-do guide
 *
 * SEO gap: "gandoca manzanillo", "refugio nacional gandoca-manzanillo",
 * "manzanillo national park" get impressions with ~0 clicks. Distinct from
 * the existing gettingToGandoca article (which is transport-only) — this is
 * the wildlife / beaches / snorkel / practical guide, linking to that one
 * for the how-to-get-there detail.
 * ------------------------------------------------------------------ */

export interface GandocaRefugeContent {
  seoTitle: string;
  seoDescription: string;
  heading: string;
  heroAlt: string;
  photoCredit: React.ReactNode;
  introParagraphs: [string, string];
  stayRecommendationTitle: string;
  wildlifeHeading: string;
  wildlifeIntro: string;
  wildlifeItems: string[];
  beachesHeading: string;
  beachesParagraphs: [string, string];
  thingsHeading: string;
  thingsIntro: string;
  thingsItems: string[];
  practicalHeading: string;
  practicalItems: string[];
  gettingThereHeading: string;
  gettingThereParagraph: string;
  gettingThereLinkText: string;
  takeawaysHeading: string;
  takeawaysParagraph: string;
}

const gandocaRefuge: Partial<Record<Locale, GandocaRefugeContent>> = {
  en: {
    seoTitle: 'Gandoca-Manzanillo Wildlife Refuge: wildlife, beaches & what to do',
    seoDescription:
      'A guide to the Gandoca-Manzanillo National Wildlife Refuge near Puerto Viejo: coral reef snorkelling, the Manzanillo-Punta Mona coastal trail, wildlife, sea turtles and practical tips.',
    heading: 'Gandoca-Manzanillo Wildlife Refuge: what to do',
    heroAlt: 'Coral-fringed Caribbean coast at the Gandoca-Manzanillo Wildlife Refuge, Costa Rica',
    photoCredit: <>Photo: <a href="https://commons.wikimedia.org/wiki/Category:Refugio_Nacional_de_Vida_Silvestre_Gandoca-Manzanillo" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
    introParagraphs: [
      'The Gandoca-Manzanillo National Wildlife Refuge (Refugio Nacional de Vida Silvestre Gandoca-Manzanillo) protects the stretch of Costa Rica’s southern Caribbean coast from the village of Manzanillo down to the Panama border. It is one of the wildest, least-developed corners of the region, and also one of the easiest to reach from Puerto Viejo.',
      'It combines rainforest, mangroves, one of Costa Rica’s few living coral reefs, and quiet beaches where sea turtles nest. You do not need a tour to enjoy it, but a local guide helps you find the wildlife.',
    ],
    stayRecommendationTitle: 'Where to stay near Gandoca-Manzanillo',
    wildlifeHeading: 'Wildlife you might see',
    wildlifeIntro: 'The refuge packs a lot of the Caribbean’s wildlife into a small, accessible area:',
    wildlifeItems: [
      'Sloths, howler and white-faced monkeys in the coastal forest',
      'Poison dart frogs, toucans and countless birds',
      'A living coral reef with tropical fish, rays and the occasional nurse shark',
      'Dolphins in the Gandoca lagoon (including the rare tucuxi)',
      'Nesting sea turtles on the beaches, roughly March to July; ask locally, as timing varies',
    ],
    beachesHeading: 'Beaches and the coastal trail',
    beachesParagraphs: [
      'Manzanillo beach, at the refuge entrance, is calm and good for swimming and snorkelling. From there, a coastal trail runs about 5.5 km through the jungle to Punta Mona, passing hidden coves and reef-fringed points along the way.',
      'It is a flat but sometimes muddy walk; allow a few hours if you want to swim and watch wildlife. A guide is worth it both for spotting animals and for keeping to the right paths.',
    ],
    thingsHeading: 'Best things to do',
    thingsIntro: 'A few ways to make the most of a visit:',
    thingsItems: [
      'Snorkel or dive the reef, one of the healthiest on Costa Rica’s Caribbean side, best on calm, clear days',
      'Hike the Manzanillo-Punta Mona coastal trail with a local guide',
      'Take a kayak or boat tour of the Gandoca lagoon to look for dolphins and manatees',
      'Eat fresh Caribbean food at one of the small sodas in Manzanillo village',
    ],
    practicalHeading: 'Practical tips',
    practicalItems: [
      'Hire a local community guide at Manzanillo; it supports the community and hugely improves what you see',
      'Bring cash (colones) for guides, parking and food; there are no big facilities',
      'Reef-safe sunscreen, insect repellent, water shoes and plenty of water are essentials',
      'For snorkelling, aim for the calmer, clearer windows (February-March and September-October), though the sea here changes day to day',
    ],
    gettingThereHeading: 'How to get there',
    gettingThereParagraph:
      'The refuge starts at Manzanillo, at the end of the coast road about 14 km southeast of Puerto Viejo. You can take the local bus, drive, or rent a scooter or bike.',
    gettingThereLinkText: 'See our full guide to getting to Gandoca-Manzanillo →',
    takeawaysHeading: 'Key takeaways',
    takeawaysParagraph:
      'Gandoca-Manzanillo is the wild, reef-and-rainforest end of the southern Caribbean, good for snorkelling, a coastal jungle hike and wildlife, and easy to reach from Puerto Viejo. Go with a local guide, bring cash and reef-safe gear, and pick a calm day for the water.',
  },
  es: {
    seoTitle: 'Refugio Gandoca-Manzanillo: fauna, playas y qué hacer',
    seoDescription:
      'Guía del Refugio Nacional de Vida Silvestre Gandoca-Manzanillo cerca de Puerto Viejo: snorkel en el arrecife, el sendero costero Manzanillo-Punta Mona, fauna, tortugas y consejos prácticos.',
    heading: 'Refugio Gandoca-Manzanillo: qué hacer',
    heroAlt: 'Costa caribeña con arrecife en el Refugio Gandoca-Manzanillo, Costa Rica',
    photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Refugio_Nacional_de_Vida_Silvestre_Gandoca-Manzanillo" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
    introParagraphs: [
      'El Refugio Nacional de Vida Silvestre Gandoca-Manzanillo protege el tramo del Caribe Sur de Costa Rica que va desde el pueblo de Manzanillo hasta la frontera con Panamá. Es uno de los rincones más salvajes y menos desarrollados de la región, y también uno de los más fáciles de alcanzar desde Puerto Viejo.',
      'Combina selva, manglares, uno de los pocos arrecifes de coral vivos de Costa Rica y playas tranquilas donde anidan tortugas marinas. No necesitas un tour para disfrutarlo, pero un guía local ayuda a encontrar la fauna.',
    ],
    stayRecommendationTitle: 'Dónde hospedarte cerca de Gandoca-Manzanillo',
    wildlifeHeading: 'Fauna que podrías ver',
    wildlifeIntro: 'El refugio concentra buena parte de la fauna del Caribe en un área pequeña y accesible:',
    wildlifeItems: [
      'Perezosos, monos aulladores y carablanca en el bosque costero',
      'Ranas venenosas, tucanes e incontables aves',
      'Un arrecife de coral vivo con peces tropicales, rayas y algún tiburón nodriza',
      'Delfines en la laguna de Gandoca (incluido el raro tucuxi)',
      'Tortugas marinas anidando en las playas, aproximadamente de marzo a julio; pregunta localmente, porque las fechas varían',
    ],
    beachesHeading: 'Playas y el sendero costero',
    beachesParagraphs: [
      'La playa de Manzanillo, en la entrada del refugio, es tranquila y buena para nadar y hacer snorkel. Desde allí, un sendero costero recorre unos 5.5 km por la selva hasta Punta Mona, pasando por calas escondidas y puntas con arrecife.',
      'Es una caminata plana pero a veces embarrada; calcula unas horas si quieres nadar y ver fauna. Vale la pena un guía tanto para avistar animales como para seguir los senderos correctos.',
    ],
    thingsHeading: 'Mejores cosas que hacer',
    thingsIntro: 'Algunas formas de aprovechar la visita al máximo:',
    thingsItems: [
      'Haz snorkel o buceo en el arrecife, uno de los más sanos del Caribe de Costa Rica, mejor en días tranquilos y claros',
      'Recorre el sendero costero Manzanillo-Punta Mona con un guía local',
      'Toma un tour en kayak o en bote por la laguna de Gandoca para buscar delfines y manatíes',
      'Come comida caribeña fresca en una de las pequeñas sodas del pueblo de Manzanillo',
    ],
    practicalHeading: 'Consejos prácticos',
    practicalItems: [
      'Contrata un guía comunitario local en Manzanillo; apoya a la comunidad y mejora muchísimo lo que ves',
      'Lleva efectivo (colones) para guías, parqueo y comida; no hay grandes instalaciones',
      'Protector solar respetuoso con el arrecife, repelente, zapatos de agua y mucha agua son esenciales',
      'Para el snorkel, apunta a las ventanas más tranquilas y claras (febrero-marzo y septiembre-octubre), aunque el mar aquí cambia de un día a otro',
    ],
    gettingThereHeading: 'Cómo llegar',
    gettingThereParagraph:
      'El refugio comienza en Manzanillo, al final de la carretera costera, a unos 14 km al sureste de Puerto Viejo. Puedes tomar el bus local, ir en carro o rentar un scooter o una bici.',
    gettingThereLinkText: 'Ver nuestra guía completa para llegar a Gandoca-Manzanillo →',
    takeawaysHeading: 'Puntos clave',
    takeawaysParagraph:
      'Gandoca-Manzanillo es el extremo salvaje, de arrecife y selva, del Caribe Sur, ideal para snorkel, una caminata costera por la jungla y fauna, y fácil de alcanzar desde Puerto Viejo. Ve con un guía local, lleva efectivo y equipo respetuoso con el arrecife, y elige un día tranquilo para el agua.',
  },
  de: {
    seoTitle: 'Schutzgebiet Gandoca-Manzanillo: Tierwelt, Strände & Aktivitäten',
    seoDescription:
      'Ein Führer zum Nationalen Wildschutzgebiet Gandoca-Manzanillo bei Puerto Viejo: Schnorcheln am Korallenriff, der Küstenpfad Manzanillo-Punta Mona, Tierwelt, Meeresschildkröten und praktische Tipps.',
    heading: 'Schutzgebiet Gandoca-Manzanillo: Was man unternehmen kann',
    heroAlt: 'Von Riffen gesäumte Karibikküste im Schutzgebiet Gandoca-Manzanillo, Costa Rica',
    photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Refugio_Nacional_de_Vida_Silvestre_Gandoca-Manzanillo" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
    introParagraphs: [
      'Das Nationale Wildschutzgebiet Gandoca-Manzanillo (Refugio Nacional de Vida Silvestre Gandoca-Manzanillo) schützt den Abschnitt der südlichen Karibikküste Costa Ricas vom Dorf Manzanillo bis zur Grenze zu Panama. Es ist einer der wildesten, am wenigsten erschlossenen Winkel der Region, und zugleich einer der am einfachsten von Puerto Viejo aus zu erreichenden.',
      'Es vereint Regenwald, Mangroven, eines der wenigen lebenden Korallenriffe Costa Ricas und ruhige Strände, an denen Meeresschildkröten nisten. Man braucht keine Tour, um es zu genießen, aber ein einheimischer Guide hilft, die Tierwelt zu entdecken.',
    ],
    stayRecommendationTitle: 'Wo man in der Nähe von Gandoca-Manzanillo übernachtet',
    wildlifeHeading: 'Tiere, die Sie sehen könnten',
    wildlifeIntro: 'Das Schutzgebiet vereint viel von der karibischen Tierwelt auf kleinem, gut zugänglichem Raum:',
    wildlifeItems: [
      'Faultiere, Brüll- und Kapuzineraffen im Küstenwald',
      'Pfeilgiftfrösche, Tukane und unzählige Vögel',
      'Ein lebendes Korallenriff mit tropischen Fischen, Rochen und gelegentlich einem Ammenhai',
      'Delfine in der Lagune von Gandoca (darunter der seltene Tucuxi)',
      'Nistende Meeresschildkröten an den Stränden, etwa von März bis Juli; fragen Sie vor Ort, da die Zeiten variieren',
    ],
    beachesHeading: 'Strände und der Küstenpfad',
    beachesParagraphs: [
      'Der Strand von Manzanillo am Eingang des Schutzgebiets ist ruhig und eignet sich gut zum Schwimmen und Schnorcheln. Von dort führt ein Küstenpfad etwa 5,5 km durch den Dschungel bis nach Punta Mona, vorbei an versteckten Buchten und von Riffen gesäumten Landspitzen.',
      'Es ist ein flacher, aber mitunter matschiger Weg; planen Sie ein paar Stunden ein, wenn Sie schwimmen und Tiere beobachten möchten. Ein Guide lohnt sich, um Tiere zu entdecken und auf den richtigen Wegen zu bleiben.',
    ],
    thingsHeading: 'Die besten Aktivitäten',
    thingsIntro: 'Ein paar Möglichkeiten, einen Besuch optimal zu nutzen:',
    thingsItems: [
      'Schnorcheln oder Tauchen am Riff, eines der gesündesten an Costa Ricas Karibikseite, am besten an ruhigen, klaren Tagen',
      'Wandern Sie den Küstenpfad Manzanillo-Punta Mona mit einem einheimischen Guide',
      'Machen Sie eine Kajak- oder Bootstour durch die Lagune von Gandoca, um nach Delfinen und Seekühen Ausschau zu halten',
      'Essen Sie frische karibische Küche in einer der kleinen Sodas im Dorf Manzanillo',
    ],
    practicalHeading: 'Praktische Tipps',
    practicalItems: [
      'Engagieren Sie in Manzanillo einen einheimischen Guide aus der Gemeinde; das unterstützt die Gemeinschaft und verbessert enorm, was Sie sehen',
      'Bringen Sie Bargeld (Colones) für Guides, Parken und Essen mit; es gibt keine großen Einrichtungen',
      'Riffschonende Sonnencreme, Insektenschutz, Wasserschuhe und viel Wasser sind unverzichtbar',
      'Zum Schnorcheln zielen Sie auf die ruhigeren, klareren Fenster (Februar-März und September-Oktober), doch das Meer wechselt hier von Tag zu Tag',
    ],
    gettingThereHeading: 'Wie man hinkommt',
    gettingThereParagraph:
      'Das Schutzgebiet beginnt in Manzanillo, am Ende der Küstenstraße, etwa 14 km südöstlich von Puerto Viejo. Sie können den örtlichen Bus nehmen, fahren oder einen Roller oder ein Fahrrad mieten.',
    gettingThereLinkText: 'Zu unserem ausführlichen Führer, wie man nach Gandoca-Manzanillo kommt →',
    takeawaysHeading: 'Das Wichtigste in Kürze',
    takeawaysParagraph:
      'Gandoca-Manzanillo ist das wilde Ende der südlichen Karibik aus Riff und Regenwald, ideal zum Schnorcheln, für eine Küstenwanderung durch den Dschungel und für Tierbeobachtungen, und leicht von Puerto Viejo aus zu erreichen. Gehen Sie mit einem einheimischen Guide, bringen Sie Bargeld und riffschonende Ausrüstung mit und wählen Sie einen ruhigen Tag fürs Wasser.',
  },
  fr: {
    seoTitle: 'Refuge Gandoca-Manzanillo : faune, plages et activités',
    seoDescription:
      'Un guide du refuge national de faune sauvage Gandoca-Manzanillo près de Puerto Viejo : snorkeling sur le récif corallien, sentier côtier Manzanillo-Punta Mona, faune, tortues marines et conseils pratiques.',
    heading: 'Refuge Gandoca-Manzanillo : que faire',
    heroAlt: 'Côte caraïbe bordée de récifs au refuge Gandoca-Manzanillo, Costa Rica',
    photoCredit: <>Photo : <a href="https://commons.wikimedia.org/wiki/Category:Refugio_Nacional_de_Vida_Silvestre_Gandoca-Manzanillo" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
    introParagraphs: [
      'Le refuge national de faune sauvage Gandoca-Manzanillo (Refugio Nacional de Vida Silvestre Gandoca-Manzanillo) protège la portion de la côte caraïbe sud du Costa Rica, du village de Manzanillo jusqu’à la frontière avec le Panama. C’est l’un des recoins les plus sauvages et les moins aménagés de la région, et aussi l’un des plus faciles d’accès depuis Puerto Viejo.',
      'Il réunit forêt tropicale, mangroves, l’un des rares récifs coralliens vivants du Costa Rica et des plages tranquilles où nichent les tortues marines. Pas besoin d’une excursion pour en profiter, mais un guide local aide à repérer la faune.',
    ],
    stayRecommendationTitle: 'Où loger près de Gandoca-Manzanillo',
    wildlifeHeading: 'La faune que vous pourriez voir',
    wildlifeIntro: 'Le refuge concentre une grande partie de la faune caraïbe dans un espace réduit et accessible :',
    wildlifeItems: [
      'Paresseux, singes hurleurs et capucins dans la forêt côtière',
      'Grenouilles venimeuses, toucans et d’innombrables oiseaux',
      'Un récif corallien vivant avec poissons tropicaux, raies et, à l’occasion, un requin-nourrice',
      'Des dauphins dans la lagune de Gandoca (dont le rare tucuxi)',
      'Des tortues marines qui nichent sur les plages, environ de mars à juillet ; renseignez-vous sur place, car les dates varient',
    ],
    beachesHeading: 'Les plages et le sentier côtier',
    beachesParagraphs: [
      'La plage de Manzanillo, à l’entrée du refuge, est calme et propice à la baignade et au snorkeling. De là, un sentier côtier serpente sur environ 5,5 km à travers la jungle jusqu’à Punta Mona, en passant par des criques cachées et des pointes bordées de récifs.',
      'C’est une marche plate mais parfois boueuse ; comptez quelques heures si vous voulez vous baigner et observer la faune. Un guide en vaut la peine, tant pour repérer les animaux que pour rester sur les bons chemins.',
    ],
    thingsHeading: 'Les meilleures activités',
    thingsIntro: 'Quelques façons de profiter au mieux de la visite :',
    thingsItems: [
      'Faites du snorkeling ou de la plongée sur le récif, l’un des plus sains du côté caraïbe du Costa Rica, au mieux par temps calme et clair',
      'Parcourez le sentier côtier Manzanillo-Punta Mona avec un guide local',
      'Faites une sortie en kayak ou en bateau dans la lagune de Gandoca pour chercher dauphins et lamantins',
      'Mangez une cuisine caraïbe fraîche dans l’une des petites sodas du village de Manzanillo',
    ],
    practicalHeading: 'Conseils pratiques',
    practicalItems: [
      'Engagez un guide communautaire local à Manzanillo ; cela soutient la communauté et améliore énormément ce que vous voyez',
      'Apportez des espèces (colones) pour les guides, le parking et la nourriture ; il n’y a pas de grandes infrastructures',
      'Crème solaire respectueuse des récifs, répulsif anti-insectes, chaussures d’eau et beaucoup d’eau sont indispensables',
      'Pour le snorkeling, visez les fenêtres plus calmes et plus claires (février-mars et septembre-octobre), mais la mer change ici d’un jour à l’autre',
    ],
    gettingThereHeading: 'Comment s’y rendre',
    gettingThereParagraph:
      'Le refuge commence à Manzanillo, au bout de la route côtière, à environ 14 km au sud-est de Puerto Viejo. Vous pouvez prendre le bus local, conduire, ou louer un scooter ou un vélo.',
    gettingThereLinkText: 'Voir notre guide complet pour se rendre à Gandoca-Manzanillo →',
    takeawaysHeading: 'À retenir',
    takeawaysParagraph:
      'Gandoca-Manzanillo est l’extrémité sauvage, de récif et de forêt, des Caraïbes du Sud, parfaite pour le snorkeling, une randonnée côtière dans la jungle et l’observation de la faune, et facile d’accès depuis Puerto Viejo. Partez avec un guide local, emportez des espèces et un équipement respectueux des récifs, et choisissez un jour calme pour l’eau.',
  },
  it: {
    seoTitle: 'Rifugio Gandoca-Manzanillo: fauna, spiagge e cosa fare',
    seoDescription:
      'Una guida al Rifugio Nazionale di Fauna Selvatica Gandoca-Manzanillo vicino a Puerto Viejo: snorkeling sulla barriera corallina, il sentiero costiero Manzanillo-Punta Mona, fauna, tartarughe marine e consigli pratici.',
    heading: 'Rifugio Gandoca-Manzanillo: cosa fare',
    heroAlt: 'Costa caraibica orlata di barriera corallina nel Rifugio Gandoca-Manzanillo, Costa Rica',
    photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Refugio_Nacional_de_Vida_Silvestre_Gandoca-Manzanillo" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
    introParagraphs: [
      'Il Rifugio Nazionale di Fauna Selvatica Gandoca-Manzanillo (Refugio Nacional de Vida Silvestre Gandoca-Manzanillo) protegge il tratto della costa caraibica meridionale della Costa Rica, dal villaggio di Manzanillo fino al confine con Panama. È uno degli angoli più selvaggi e meno sviluppati della regione, e anche uno dei più facili da raggiungere da Puerto Viejo.',
      'Unisce foresta pluviale, mangrovie, una delle poche barriere coralline vive della Costa Rica e spiagge tranquille dove nidificano le tartarughe marine. Non serve un tour per goderselo, ma una guida locale aiuta a individuare la fauna.',
    ],
    stayRecommendationTitle: 'Dove alloggiare vicino a Gandoca-Manzanillo',
    wildlifeHeading: 'La fauna che potresti vedere',
    wildlifeIntro: 'Il rifugio concentra buona parte della fauna caraibica in un’area piccola e accessibile:',
    wildlifeItems: [
      'Bradipi, scimmie urlatrici e cappuccine nella foresta costiera',
      'Rane velenose, tucani e innumerevoli uccelli',
      'Una barriera corallina viva con pesci tropicali, razze e, di tanto in tanto, uno squalo nutrice',
      'Delfini nella laguna di Gandoca (compreso il raro tucuxi)',
      'Tartarughe marine che nidificano sulle spiagge, all’incirca da marzo a luglio; informati sul posto, perché i periodi variano',
    ],
    beachesHeading: 'Le spiagge e il sentiero costiero',
    beachesParagraphs: [
      'La spiaggia di Manzanillo, all’ingresso del rifugio, è calma e adatta a nuotare e fare snorkeling. Da lì, un sentiero costiero si snoda per circa 5,5 km nella giungla fino a Punta Mona, passando per cale nascoste e punte orlate di barriera.',
      'È una camminata pianeggiante ma a volte fangosa; metti in conto qualche ora se vuoi nuotare e osservare la fauna. Una guida vale la pena sia per avvistare gli animali sia per restare sui sentieri giusti.',
    ],
    thingsHeading: 'Le cose migliori da fare',
    thingsIntro: 'Alcuni modi per sfruttare al meglio la visita:',
    thingsItems: [
      'Fai snorkeling o immersioni sulla barriera, una delle più sane del versante caraibico della Costa Rica, meglio nelle giornate calme e limpide',
      'Percorri il sentiero costiero Manzanillo-Punta Mona con una guida locale',
      'Fai un tour in kayak o in barca nella laguna di Gandoca per cercare delfini e lamantini',
      'Mangia cucina caraibica fresca in una delle piccole sodas del villaggio di Manzanillo',
    ],
    practicalHeading: 'Consigli pratici',
    practicalItems: [
      'Assumi una guida locale della comunità a Manzanillo; sostiene la comunità e migliora tantissimo ciò che vedi',
      'Porta contanti (colones) per guide, parcheggio e cibo; non ci sono grandi strutture',
      'Crema solare rispettosa della barriera, repellente per insetti, scarpe da scoglio e molta acqua sono essenziali',
      'Per lo snorkeling, punta alle finestre più calme e limpide (febbraio-marzo e settembre-ottobre), ma qui il mare cambia di giorno in giorno',
    ],
    gettingThereHeading: 'Come arrivare',
    gettingThereParagraph:
      'Il rifugio inizia a Manzanillo, alla fine della strada costiera, a circa 14 km a sud-est di Puerto Viejo. Puoi prendere il bus locale, andare in auto o noleggiare uno scooter o una bici.',
    gettingThereLinkText: 'Vedi la nostra guida completa per arrivare a Gandoca-Manzanillo →',
    takeawaysHeading: 'Punti chiave',
    takeawaysParagraph:
      'Gandoca-Manzanillo è l’estremità selvaggia, di barriera e foresta, dei Caraibi meridionali, perfetta per lo snorkeling, una camminata costiera nella giungla e la fauna, e facile da raggiungere da Puerto Viejo. Vai con una guida locale, porta contanti e attrezzatura rispettosa della barriera e scegli una giornata calma per l’acqua.',
  },
  pt: {
    seoTitle: 'Refúgio Gandoca-Manzanillo: fauna, praias e o que fazer',
    seoDescription:
      'Um guia do Refúgio Nacional de Vida Silvestre Gandoca-Manzanillo perto de Puerto Viejo: snorkel no recife de coral, a trilha costeira Manzanillo-Punta Mona, fauna, tartarugas marinhas e dicas práticas.',
    heading: 'Refúgio Gandoca-Manzanillo: o que fazer',
    heroAlt: 'Costa caribenha com recife no Refúgio Gandoca-Manzanillo, Costa Rica',
    photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Refugio_Nacional_de_Vida_Silvestre_Gandoca-Manzanillo" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
    introParagraphs: [
      'O Refúgio Nacional de Vida Silvestre Gandoca-Manzanillo (Refugio Nacional de Vida Silvestre Gandoca-Manzanillo) protege o trecho do Caribe Sul da Costa Rica, do vilarejo de Manzanillo até a fronteira com o Panamá. É um dos cantos mais selvagens e menos desenvolvidos da região, e também um dos mais fáceis de alcançar a partir de Puerto Viejo.',
      'Reúne floresta tropical, mangais, um dos poucos recifes de coral vivos da Costa Rica e praias tranquilas onde as tartarugas marinhas desovam. Você não precisa de um tour para aproveitá-lo, mas um guia local ajuda a encontrar a fauna.',
    ],
    stayRecommendationTitle: 'Onde se hospedar perto de Gandoca-Manzanillo',
    wildlifeHeading: 'Fauna que você pode ver',
    wildlifeIntro: 'O refúgio concentra boa parte da fauna do Caribe numa área pequena e acessível:',
    wildlifeItems: [
      'Preguiças, macacos-uivadores e macacos-prego na mata costeira',
      'Rãs venenosas, tucanos e incontáveis aves',
      'Um recife de coral vivo com peixes tropicais, arraias e, de vez em quando, um tubarão-lixa',
      'Golfinhos na lagoa de Gandoca (incluindo o raro tucuxi)',
      'Tartarugas marinhas desovando nas praias, aproximadamente de março a julho; pergunte no local, pois as datas variam',
    ],
    beachesHeading: 'As praias e a trilha costeira',
    beachesParagraphs: [
      'A praia de Manzanillo, na entrada do refúgio, é calma e boa para nadar e fazer snorkel. Dali, uma trilha costeira segue por cerca de 5,5 km pela selva até Punta Mona, passando por enseadas escondidas e pontas cercadas de recife.',
      'É uma caminhada plana, mas às vezes enlameada; reserve algumas horas se quiser nadar e observar a fauna. Vale a pena um guia, tanto para avistar animais quanto para seguir as trilhas certas.',
    ],
    thingsHeading: 'Melhores coisas para fazer',
    thingsIntro: 'Algumas formas de aproveitar ao máximo a visita:',
    thingsItems: [
      'Faça snorkel ou mergulho no recife, um dos mais saudáveis do lado caribenho da Costa Rica, melhor em dias calmos e claros',
      'Percorra a trilha costeira Manzanillo-Punta Mona com um guia local',
      'Faça um passeio de caiaque ou de barco pela lagoa de Gandoca para procurar golfinhos e peixes-boi',
      'Coma comida caribenha fresca numa das pequenas sodas do vilarejo de Manzanillo',
    ],
    practicalHeading: 'Dicas práticas',
    practicalItems: [
      'Contrate um guia comunitário local em Manzanillo; apoia a comunidade e melhora muito o que você vê',
      'Leve dinheiro (colones) para guias, estacionamento e comida; não há grandes estruturas',
      'Protetor solar que respeite os recifes, repelente, sapatilhas de água e bastante água são essenciais',
      'Para o snorkel, mire nas janelas mais calmas e claras (fevereiro-março e setembro-outubro), mas o mar aqui muda de um dia para o outro',
    ],
    gettingThereHeading: 'Como chegar',
    gettingThereParagraph:
      'O refúgio começa em Manzanillo, no fim da estrada costeira, a cerca de 14 km a sudeste de Puerto Viejo. Você pode pegar o ônibus local, ir de carro ou alugar uma scooter ou bicicleta.',
    gettingThereLinkText: 'Veja nosso guia completo para chegar a Gandoca-Manzanillo →',
    takeawaysHeading: 'Pontos principais',
    takeawaysParagraph:
      'Gandoca-Manzanillo é o extremo selvagem, de recife e floresta, do Caribe Sul, ótimo para snorkel, uma caminhada costeira pela selva e fauna, e fácil de alcançar a partir de Puerto Viejo. Vá com um guia local, leve dinheiro e equipamento que respeite o recife, e escolha um dia calmo para a água.',
  },
  he: {
    seoTitle: 'שמורת גנדוקה-מנזנייו: חיות בר, חופים ומה לעשות',
    seoDescription:
      'מדריך לשמורת חיות הבר הלאומית גנדוקה-מנזנייו ליד פוארטו ויאחו: שנורקלינג בשונית האלמוגים, שביל החוף מנזנייו-פונטה מונה, חיות בר, צבי ים וטיפים מעשיים.',
    heading: 'שמורת גנדוקה-מנזנייו: מה לעשות',
    heroAlt: 'חוף קריבי עטור שונית בשמורת גנדוקה-מנזנייו, קוסטה ריקה',
    photoCredit: <>צילום: <a href="https://commons.wikimedia.org/wiki/Category:Refugio_Nacional_de_Vida_Silvestre_Gandoca-Manzanillo" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
    introParagraphs: [
      'שמורת חיות הבר הלאומית גנדוקה-מנזנייו (Refugio Nacional de Vida Silvestre Gandoca-Manzanillo) מגִנה על רצועת חוף הקריביים הדרומי של קוסטה ריקה, מהכפר מנזנייו ועד הגבול עם פנמה. זהו אחד הפינות הפראיות והפחות מפותחות באזור, וגם אחד הקלים ביותר להגעה מפוארטו ויאחו.',
      'הוא משלב יער גשם, יערות מנגרוב, אחת מהשוניות החיות המעטות בקוסטה ריקה וחופים שקטים שבהם מקננים צבי ים. לא צריך טיור מאורגן כדי ליהנות ממנו, אבל מדריך מקומי עוזר לאתר את עולם החי.',
    ],
    stayRecommendationTitle: 'היכן להתארח ליד גנדוקה-מנזנייו',
    wildlifeHeading: 'חיות שאולי תראו',
    wildlifeIntro: 'השמורה מרכזת חלק גדול מעולם החי הקריבי בשטח קטן ונגיש:',
    wildlifeItems: [
      'עצלנים, קופי שאגן וקופי קפוצ\'ין ביער החוף',
      'צפרדעי רעל, טוקנים ואינספור ציפורים',
      'שונית אלמוגים חיה עם דגים טרופיים, טריגונים ומדי פעם כריש אומן',
      'דולפינים בלגונה של גנדוקה (כולל הטוקוקסי הנדיר)',
      'צבי ים המקננים על החופים, בערך ממרץ עד יולי; בררו במקום, כי המועדים משתנים',
    ],
    beachesHeading: 'החופים ושביל החוף',
    beachesParagraphs: [
      'חוף מנזנייו, בכניסה לשמורה, שקט ומתאים לשחייה ולשנורקלינג. משם, שביל חוף נמשך כ-5.5 ק"מ דרך הג\'ונגל עד פונטה מונה, וחולף על פני מפרצונים נסתרים ולשונות יבשה עטורות שונית.',
      'זו הליכה מישורית אך לעיתים בוצית; הקצו כמה שעות אם אתם רוצים לשחות ולצפות בחיות. שווה לקחת מדריך גם לאיתור בעלי החיים וגם כדי להישאר בשבילים הנכונים.',
    ],
    thingsHeading: 'הדברים הכי כדאיים לעשות',
    thingsIntro: 'כמה דרכים להפיק את המרב מהביקור:',
    thingsItems: [
      'שנרקלו או צללו בשונית, אחת הבריאות ביותר בצד הקריבי של קוסטה ריקה, הכי טוב בימים רגועים וצלולים',
      'צעדו בשביל החוף מנזנייו-פונטה מונה עם מדריך מקומי',
      'צאו לסיור קיאקים או סירה בלגונה של גנדוקה לחיפוש דולפינים ופרות ים',
      'אכלו אוכל קריבי טרי באחת מה-sodas הקטנות בכפר מנזנייו',
    ],
    practicalHeading: 'טיפים מעשיים',
    practicalItems: [
      'שכרו מדריך קהילתי מקומי במנזנייו; זה תומך בקהילה ומשפר מאוד את מה שתראו',
      'הביאו מזומן (קולונס) למדריכים, חניה ואוכל; אין מתקנים גדולים',
      'קרם הגנה ידידותי לשונית, דוחה חרקים, נעלי מים והרבה מים הם הכרחיים',
      'לשנורקלינג, כוונו לחלונות הרגועים והצלולים יותר (פברואר-מרץ וספטמבר-אוקטובר), אבל הים כאן משתנה מיום ליום',
    ],
    gettingThereHeading: 'איך מגיעים',
    gettingThereParagraph:
      'השמורה מתחילה במנזנייו, בקצה כביש החוף, כ-14 ק"מ דרומית-מזרחית לפוארטו ויאחו. אפשר לנסוע באוטובוס המקומי, ברכב, או לשכור קטנוע או אופניים.',
    gettingThereLinkText: 'למדריך המלא שלנו להגעה לגנדוקה-מנזנייו →',
    takeawaysHeading: 'עיקרי הדברים',
    takeawaysParagraph:
      'גנדוקה-מנזנייו היא הקצה הפראי, של שונית ויער גשם, של הקריביים הדרומיים, מצוינת לשנורקלינג, להליכת חוף בג\'ונגל ולצפייה בחיות בר, וקלה להגעה מפוארטו ויאחו. צאו עם מדריך מקומי, הביאו מזומן וציוד ידידותי לשונית, ובחרו יום רגוע למים.',
  },
  hi: {
    seoTitle: 'गंदोका-मंज़ानियो वन्यजीव शरण: वन्यजीव, समुद्र तट और क्या करें',
    seoDescription:
      'प्वेर्तो विएखो के पास गंदोका-मंज़ानियो राष्ट्रीय वन्यजीव शरण का मार्गदर्शक: कोरल रीफ़ में स्नॉर्कलिंग, मंज़ानियो-पुंता मोना तटीय पगडंडी, वन्यजीव, समुद्री कछुए और व्यावहारिक सुझाव।',
    heading: 'गंदोका-मंज़ानियो वन्यजीव शरण: क्या करें',
    heroAlt: 'गंदोका-मंज़ानियो वन्यजीव शरण, कोस्टा रिका में रीफ़ से घिरा कैरिबियन तट',
    photoCredit: <>फ़ोटो: <a href="https://commons.wikimedia.org/wiki/Category:Refugio_Nacional_de_Vida_Silvestre_Gandoca-Manzanillo" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
    introParagraphs: [
      'गंदोका-मंज़ानियो राष्ट्रीय वन्यजीव शरण (Refugio Nacional de Vida Silvestre Gandoca-Manzanillo) कोस्टा रिका के दक्षिणी कैरिबियन तट के उस हिस्से की रक्षा करती है जो मंज़ानियो गाँव से पनामा की सीमा तक फैला है। यह इस क्षेत्र के सबसे जंगली और सबसे कम विकसित कोनों में से एक है, और प्वेर्तो विएखो से पहुँचने में भी सबसे आसान में से एक।',
      'इसमें वर्षावन, मैंग्रोव, कोस्टा रिका की कुछ जीवित कोरल रीफ़ों में से एक, और शांत समुद्र तट हैं जहाँ समुद्री कछुए घोंसले बनाते हैं। इसका आनंद लेने के लिए किसी टूर की ज़रूरत नहीं, पर एक स्थानीय गाइड वन्यजीवन को खोजने में मदद करता है।',
    ],
    stayRecommendationTitle: 'गंदोका-मंज़ानियो के पास कहाँ ठहरें',
    wildlifeHeading: 'जो वन्यजीव आप देख सकते हैं',
    wildlifeIntro: 'यह शरण कैरिबियन के अधिकांश वन्यजीवन को एक छोटे, सुलभ क्षेत्र में समेट देती है:',
    wildlifeItems: [
      'तटीय जंगल में स्लॉथ, हाउलर और सफ़ेद-मुँह वाले बंदर',
      'ज़हरीले मेंढक, टूकन और अनगिनत पक्षी',
      'उष्णकटिबंधीय मछलियों, रे और कभी-कभार नर्स शार्क वाली एक जीवित कोरल रीफ़',
      'गंदोका लैगून में डॉल्फ़िन (दुर्लभ तुकुक्सी सहित)',
      'समुद्र तटों पर घोंसला बनाते समुद्री कछुए, लगभग मार्च से जुलाई तक; स्थानीय लोगों से पूछें, क्योंकि समय बदलता रहता है',
    ],
    beachesHeading: 'समुद्र तट और तटीय पगडंडी',
    beachesParagraphs: [
      'शरण के प्रवेश पर मंज़ानियो समुद्र तट शांत है और तैरने तथा स्नॉर्कलिंग के लिए अच्छा है। वहाँ से एक तटीय पगडंडी लगभग 5.5 किमी जंगल के बीच से होकर पुंता मोना तक जाती है, रास्ते में छिपी हुई खाड़ियों और रीफ़ से घिरी नोकों से गुज़रती है।',
      'यह समतल पर कभी-कभी कीचड़ भरी पैदल यात्रा है; अगर आप तैरना और वन्यजीव देखना चाहते हैं तो कुछ घंटे रखें। जानवरों को खोजने और सही रास्तों पर बने रहने, दोनों के लिए एक गाइड फ़ायदेमंद है।',
    ],
    thingsHeading: 'करने के लिए सबसे अच्छी चीज़ें',
    thingsIntro: 'यात्रा का पूरा लाभ उठाने के कुछ तरीके:',
    thingsItems: [
      'रीफ़ में स्नॉर्कल या डाइव करें, कोस्टा रिका के कैरिबियन ओर की सबसे स्वस्थ रीफ़ों में से एक, शांत और साफ़ दिनों में सबसे अच्छी',
      'स्थानीय गाइड के साथ मंज़ानियो-पुंता मोना तटीय पगडंडी पर चलें',
      'डॉल्फ़िन और मैनाटी खोजने के लिए गंदोका लैगून में कयाक या नाव का टूर लें',
      'मंज़ानियो गाँव की किसी छोटी soda में ताज़ा कैरिबियन खाना खाएँ',
    ],
    practicalHeading: 'व्यावहारिक सुझाव',
    practicalItems: [
      'मंज़ानियो में एक स्थानीय सामुदायिक गाइड रखें; यह समुदाय को सहारा देता है और जो आप देखते हैं उसे बहुत बेहतर बनाता है',
      'गाइड, पार्किंग और खाने के लिए नकद (कोलोनेस) साथ रखें; यहाँ बड़ी सुविधाएँ नहीं हैं',
      'रीफ़-सुरक्षित सनस्क्रीन, कीट प्रतिरोधक, वॉटर शूज़ और भरपूर पानी ज़रूरी हैं',
      'स्नॉर्कलिंग के लिए अधिक शांत और साफ़ अवधियों (फ़रवरी-मार्च और सितंबर-अक्टूबर) को चुनें, पर यहाँ समुद्र दिन-प्रतिदिन बदलता है',
    ],
    gettingThereHeading: 'कैसे पहुँचें',
    gettingThereParagraph:
      'शरण मंज़ानियो से शुरू होती है, तटीय सड़क के अंत में, प्वेर्तो विएखो से लगभग 14 किमी दक्षिण-पूर्व में। आप स्थानीय बस ले सकते हैं, गाड़ी चला सकते हैं, या स्कूटर या साइकिल किराए पर ले सकते हैं।',
    gettingThereLinkText: 'गंदोका-मंज़ानियो तक पहुँचने की हमारी पूरी गाइड देखें →',
    takeawaysHeading: 'मुख्य बातें',
    takeawaysParagraph:
      'गंदोका-मंज़ानियो दक्षिणी कैरिबियन का जंगली, रीफ़-और-वर्षावन वाला छोर है, स्नॉर्कलिंग, जंगल में तटीय पैदल यात्रा और वन्यजीवों के लिए बढ़िया, और प्वेर्तो विएखो से पहुँचने में आसान। स्थानीय गाइड के साथ जाएँ, नकद और रीफ़-सुरक्षित सामान लाएँ, और पानी के लिए एक शांत दिन चुनें।',
  },
  nl: {
    seoTitle: 'Reservaat Gandoca-Manzanillo: dieren, stranden & wat te doen',
    seoDescription:
      'Een gids voor het Nationaal Wildreservaat Gandoca-Manzanillo bij Puerto Viejo: snorkelen op het koraalrif, het kustpad Manzanillo-Punta Mona, dieren, zeeschildpadden en praktische tips.',
    heading: 'Reservaat Gandoca-Manzanillo: wat te doen',
    heroAlt: 'Met rif omzoomde Caribische kust in het reservaat Gandoca-Manzanillo, Costa Rica',
    photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Refugio_Nacional_de_Vida_Silvestre_Gandoca-Manzanillo" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
    introParagraphs: [
      'Het Nationaal Wildreservaat Gandoca-Manzanillo (Refugio Nacional de Vida Silvestre Gandoca-Manzanillo) beschermt het stuk van Costa Rica’s zuidelijke Caribische kust, van het dorp Manzanillo tot de grens met Panama. Het is een van de wildste, minst ontwikkelde hoekjes van de regio, en ook een van de makkelijkst te bereiken vanuit Puerto Viejo.',
      'Het combineert regenwoud, mangroven, een van Costa Rica’s weinige levende koraalriffen en rustige stranden waar zeeschildpadden nestelen. Je hebt geen tour nodig om ervan te genieten, maar een lokale gids helpt je de dieren te vinden.',
    ],
    stayRecommendationTitle: 'Waar te verblijven nabij Gandoca-Manzanillo',
    wildlifeHeading: 'Dieren die je zou kunnen zien',
    wildlifeIntro: 'Het reservaat bundelt veel van het Caribische dierenleven in een klein, toegankelijk gebied:',
    wildlifeItems: [
      'Luiaards, brulapen en kapucijnapen in het kustbos',
      'Gifkikkers, toekans en talloze vogels',
      'Een levend koraalrif met tropische vissen, roggen en af en toe een verpleegstershaai',
      'Dolfijnen in de lagune van Gandoca (waaronder de zeldzame tucuxi)',
      'Nestelende zeeschildpadden op de stranden, ongeveer van maart tot juli; vraag het ter plaatse na, want de timing wisselt',
    ],
    beachesHeading: 'De stranden en het kustpad',
    beachesParagraphs: [
      'Het strand van Manzanillo, bij de ingang van het reservaat, is kalm en goed om te zwemmen en te snorkelen. Vandaar loopt een kustpad zo’n 5,5 km door de jungle naar Punta Mona, langs verborgen baaien en met rif omzoomde landpunten.',
      'Het is een vlakke maar soms modderige wandeling; reken op een paar uur als je wilt zwemmen en dieren spotten. Een gids is de moeite waard, zowel om dieren te spotten als om op de juiste paden te blijven.',
    ],
    thingsHeading: 'De leukste dingen om te doen',
    thingsIntro: 'Een paar manieren om het meeste uit een bezoek te halen:',
    thingsItems: [
      'Snorkel of duik op het rif, een van de gezondste aan Costa Rica’s Caribische kant, het best op kalme, heldere dagen',
      'Wandel het kustpad Manzanillo-Punta Mona met een lokale gids',
      'Maak een kajak- of boottocht op de lagune van Gandoca om te zoeken naar dolfijnen en zeekoeien',
      'Eet vers Caribisch eten in een van de kleine sodas in het dorp Manzanillo',
    ],
    practicalHeading: 'Praktische tips',
    practicalItems: [
      'Huur een lokale gemeenschapsgids in Manzanillo; het steunt de gemeenschap en verbetert enorm wat je ziet',
      'Neem contant geld (colones) mee voor gidsen, parkeren en eten; er zijn geen grote voorzieningen',
      'Rifvriendelijke zonnebrand, insectenwerend middel, waterschoenen en veel water zijn essentieel',
      'Voor het snorkelen mik je op de kalmere, heldere periodes (februari-maart en september-oktober), maar de zee verandert hier van dag tot dag',
    ],
    gettingThereHeading: 'Hoe kom je er',
    gettingThereParagraph:
      'Het reservaat begint in Manzanillo, aan het eind van de kustweg, zo’n 14 km ten zuidoosten van Puerto Viejo. Je kunt de lokale bus nemen, rijden, of een scooter of fiets huren.',
    gettingThereLinkText: 'Bekijk onze volledige gids om in Gandoca-Manzanillo te komen →',
    takeawaysHeading: 'Belangrijkste punten',
    takeawaysParagraph:
      'Gandoca-Manzanillo is het wilde uiteinde van rif en regenwoud van het zuidelijke Caribisch gebied, geweldig om te snorkelen, een kustwandeling door de jungle en dieren, en makkelijk te bereiken vanuit Puerto Viejo. Ga met een lokale gids, neem contant geld en rifvriendelijke spullen mee, en kies een kalme dag voor het water.',
  },
};

export function gandocaRefugeContent(locale: Locale): GandocaRefugeContent {
  return gandocaRefuge[locale] ?? gandocaRefuge.en!;
}

/* ------------------------------------------------------------------ *
 * Puerto Viejo beaches guide
 *
 * High booking-intent gap: the beaches are the reason most guests come,
 * and several Kalawala villas sit right on the Playa Chiquita / Punta Uva
 * stretch. Beach-by-beach guide with swim/surf/snorkel guidance + safety.
 * ------------------------------------------------------------------ */

export interface BeachEntry {
  name: string;
  description: string;
}

export interface BeachesContent {
  seoTitle: string;
  seoDescription: string;
  heading: string;
  heroAlt: string;
  photoCredit: React.ReactNode;
  introParagraphs: [string, string];
  stayRecommendationTitle: string;
  beachesHeading: string;
  beaches: BeachEntry[];
  bestForHeading: string;
  bestForIntro: string;
  bestForItems: string[];
  safetyHeading: string;
  safetyParagraph: string;
  takeawaysHeading: string;
  takeawaysParagraph: string;
}

const beaches: Partial<Record<Locale, BeachesContent>> = {
  en: {
    seoTitle: 'The best beaches in Puerto Viejo, Costa Rica (local guide)',
    seoDescription:
      'A beach-by-beach guide to Puerto Viejo de Talamanca: Playa Cocles, Playa Chiquita, Punta Uva, Playa Negra and Manzanillo. Where to swim, surf, snorkel, and how to stay safe.',
    heading: 'The best beaches in Puerto Viejo',
    heroAlt: 'Turquoise Caribbean beach with palms at Punta Uva, Puerto Viejo, Costa Rica',
    photoCredit: <>Photo: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
    introParagraphs: [
      'The beaches are why most people fall for Puerto Viejo. Along one stretch of coast you get everything from serious surf breaks to calm, palm-fringed coves made for a lazy swim.',
      'Here is a beach-by-beach guide, running south from town, with honest notes on which are best for swimming, surfing and snorkelling, plus a word on staying safe in the water.',
    ],
    stayRecommendationTitle: 'Where to stay near the best beaches',
    beachesHeading: 'The beaches, one by one',
    beaches: [
      { name: 'Playa Negra', description: 'Just north of town, an easy black-sand beach that is great for a stroll and a sunset, with calmer water than the surf beaches.' },
      { name: 'Playa Cocles', description: 'The big surf beach a couple of kilometres south of town. Popular and lively, with seasonal lifeguards, but the currents are strong, so it suits surfing and sunbathing more than an easy swim.' },
      { name: 'Playa Chiquita', description: 'Not one beach but a string of small, calm, reef-sheltered coves tucked behind the jungle. Quiet and good for swimming and snorkelling, and where several of our villas sit.' },
      { name: 'Punta Uva', description: 'The postcard beach: turquoise water, a jungle-covered point and some of the calmest, clearest swimming and snorkelling on the coast. A local favourite.' },
      { name: 'Manzanillo', description: 'At the end of the road, the gateway to the Gandoca-Manzanillo refuge. Calm, clear water, a living reef offshore, and a laid-back village with a couple of great sodas.' },
    ],
    bestForHeading: 'Which beach for what',
    bestForIntro: 'A quick way to choose:',
    bestForItems: [
      'Calm swimming and families → Punta Uva, the Playa Chiquita coves, Manzanillo',
      'Snorkelling → Punta Uva and Manzanillo, on calm, clear days',
      'Surfing → Playa Cocles, and the famous Salsa Brava reef break for experts only',
      'A sunset stroll near town → Playa Negra',
    ],
    safetyHeading: 'Staying safe in the water',
    safetyParagraph:
      'Rip currents are real on the more exposed beaches, especially Playa Cocles. Swim where the water is calm and other people are in, keep an eye on children, and when in doubt choose the sheltered coves at Punta Uva or Playa Chiquita. The sea here changes from day to day, so check conditions before you dive in.',
    takeawaysHeading: 'Key takeaways',
    takeawaysParagraph:
      'Puerto Viejo’s beaches run from the surf of Playa Cocles to the calm, clear water of Punta Uva and Manzanillo, with the sheltered Playa Chiquita coves in between. Pick the beach that matches what you want, whether that is a swim, a surf or a snorkel, respect the currents, and you have one of the best stretches of coast in Costa Rica on your doorstep.',
  },
  es: {
    seoTitle: 'Las mejores playas de Puerto Viejo, Costa Rica (guía local)',
    seoDescription:
      'Guía playa por playa de Puerto Viejo de Talamanca: Playa Cocles, Playa Chiquita, Punta Uva, Playa Negra y Manzanillo. Dónde nadar, surfear, hacer snorkel y cómo cuidarte en el agua.',
    heading: 'Las mejores playas de Puerto Viejo',
    heroAlt: 'Playa caribeña turquesa con palmeras en Punta Uva, Puerto Viejo, Costa Rica',
    photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
    introParagraphs: [
      'Las playas son la razón por la que la mayoría se enamora de Puerto Viejo. A lo largo de un mismo tramo de costa encuentras de todo, desde buenas olas de surf hasta calas tranquilas rodeadas de palmeras, perfectas para un baño relajado.',
      'Aquí tienes una guía playa por playa, de norte a sur desde el pueblo, con notas honestas sobre cuáles son mejores para nadar, surfear y hacer snorkel, y una nota sobre cómo cuidarte en el agua.',
    ],
    stayRecommendationTitle: 'Dónde hospedarte cerca de las mejores playas',
    beachesHeading: 'Las playas, una por una',
    beaches: [
      { name: 'Playa Negra', description: 'Justo al norte del pueblo, una playa de arena negra fácil de disfrutar, ideal para caminar y ver el atardecer, con agua más tranquila que las playas de surf.' },
      { name: 'Playa Cocles', description: 'La gran playa de surf, a un par de kilómetros al sur del pueblo. Popular y animada, con salvavidas por temporadas, pero de corrientes fuertes, así que es más para surfear y tomar el sol que para nadar tranquilo.' },
      { name: 'Playa Chiquita', description: 'No es una sola playa, sino una serie de pequeñas calas tranquilas y protegidas por el arrecife, escondidas tras la selva. Tranquilas y buenas para nadar y hacer snorkel, y donde se ubican varias de nuestras villas.' },
      { name: 'Punta Uva', description: 'La playa de postal: agua turquesa, una punta cubierta de selva y de los baños y snorkel más tranquilos y claros de la costa. Una favorita local.' },
      { name: 'Manzanillo', description: 'Al final de la carretera, la entrada al refugio Gandoca-Manzanillo. Agua tranquila y clara, un arrecife vivo mar adentro y un pueblo relajado con un par de sodas estupendas.' },
    ],
    bestForHeading: 'Qué playa para qué',
    bestForIntro: 'Una forma rápida de elegir:',
    bestForItems: [
      'Baño tranquilo y familias → Punta Uva, las calas de Playa Chiquita, Manzanillo',
      'Snorkel → Punta Uva y Manzanillo, en días tranquilos y claros',
      'Surf → Playa Cocles, y el famoso arrecife de Salsa Brava solo para expertos',
      'Un paseo al atardecer cerca del pueblo → Playa Negra',
    ],
    safetyHeading: 'Cuidarte en el agua',
    safetyParagraph:
      'Las corrientes de resaca son reales en las playas más expuestas, sobre todo en Playa Cocles. Nada donde el agua esté tranquila y haya más gente, vigila a los niños y, ante la duda, elige las calas protegidas de Punta Uva o Playa Chiquita. El mar aquí cambia de un día a otro, así que revisa las condiciones antes de entrar.',
    takeawaysHeading: 'Puntos clave',
    takeawaysParagraph:
      'Las playas de Puerto Viejo van del surf de Playa Cocles al agua tranquila y clara de Punta Uva y Manzanillo, con las calas protegidas de Playa Chiquita en medio. Elige la playa según lo que busques, ya sea nadar, surfear o hacer snorkel, respeta las corrientes y tendrás uno de los mejores tramos de costa de Costa Rica a un paso.',
  },
  de: {
    seoTitle: 'Die schönsten Strände von Puerto Viejo, Costa Rica (Insider-Guide)',
    seoDescription:
      'Ein Strand-für-Strand-Führer für Puerto Viejo de Talamanca: Playa Cocles, Playa Chiquita, Punta Uva, Playa Negra und Manzanillo. Wo man schwimmt, surft, schnorchelt und sicher bleibt.',
    heading: 'Die schönsten Strände von Puerto Viejo',
    heroAlt: 'Türkisfarbener Karibikstrand mit Palmen in Punta Uva, Puerto Viejo, Costa Rica',
    photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
    introParagraphs: [
      'Die Strände sind der Grund, warum die meisten sich in Puerto Viejo verlieben. Entlang eines einzigen Küstenabschnitts gibt es alles, von guten Surfbreaks bis zu glasklaren, von Palmen gesäumten Buchten, perfekt für ein gemütliches Bad.',
      'Hier ein Strand-für-Strand-Führer, von Norden nach Süden ab dem Ort, mit ehrlichen Hinweisen, welche am besten zum Schwimmen, Surfen und Schnorcheln sind, und ein Wort zur Sicherheit im Wasser.',
    ],
    stayRecommendationTitle: 'Wo man in der Nähe der schönsten Strände übernachtet',
    beachesHeading: 'Die Strände, einer nach dem anderen',
    beaches: [
      { name: 'Playa Negra', description: 'Direkt nördlich des Ortes, ein unkomplizierter Strand mit schwarzem Sand, ideal für einen Spaziergang und den Sonnenuntergang, mit ruhigerem Wasser als die Surfstrände.' },
      { name: 'Playa Cocles', description: 'Der große Surfstrand ein paar Kilometer südlich des Ortes. Beliebt und lebhaft, mit saisonalen Rettungsschwimmern, aber starken Strömungen, also eher zum Surfen und Sonnen als zum entspannten Schwimmen.' },
      { name: 'Playa Chiquita', description: 'Nicht ein Strand, sondern eine Reihe kleiner, ruhiger, vom Riff geschützter Buchten, versteckt hinter dem Dschungel. Ruhig und gut zum Schwimmen und Schnorcheln, und hier liegen mehrere unserer Villen.' },
      { name: 'Punta Uva', description: 'Der Postkartenstrand: türkisfarbenes Wasser, eine dschungelbewachsene Landspitze und das ruhigste, klarste Schwimmen und Schnorcheln der Küste. Ein Favorit der Einheimischen.' },
      { name: 'Manzanillo', description: 'Am Ende der Straße, das Tor zum Schutzgebiet Gandoca-Manzanillo. Ruhiges, klares Wasser, ein lebendes Riff vor der Küste und ein entspanntes Dorf mit ein paar tollen Sodas.' },
    ],
    bestForHeading: 'Welcher Strand wofür',
    bestForIntro: 'Eine schnelle Entscheidungshilfe:',
    bestForItems: [
      'Ruhiges Schwimmen und Familien → Punta Uva, die Buchten von Playa Chiquita, Manzanillo',
      'Schnorcheln → Punta Uva und Manzanillo, an ruhigen, klaren Tagen',
      'Surfen → Playa Cocles und der berühmte Riffbreak Salsa Brava, nur für Profis',
      'Ein Sonnenuntergangsspaziergang nahe dem Ort → Playa Negra',
    ],
    safetyHeading: 'Sicherheit im Wasser',
    safetyParagraph:
      'Brandungsrückströmungen sind an den offeneren Stränden real, besonders an Playa Cocles. Schwimmen Sie dort, wo das Wasser ruhig ist und andere im Wasser sind, behalten Sie Kinder im Auge, und wählen Sie im Zweifel die geschützten Buchten von Punta Uva oder Playa Chiquita. Das Meer wechselt hier von Tag zu Tag, prüfen Sie also die Bedingungen, bevor Sie hineingehen.',
    takeawaysHeading: 'Das Wichtigste in Kürze',
    takeawaysParagraph:
      'Puerto Viejos Strände reichen vom Surf von Playa Cocles bis zum ruhigen, klaren Wasser von Punta Uva und Manzanillo, mit den geschützten Buchten von Playa Chiquita dazwischen. Passen Sie den Strand an das an, was Sie wollen, ob Schwimmen, Surfen oder Schnorcheln, respektieren Sie die Strömungen, und Sie haben einen der schönsten Küstenabschnitte Costa Ricas vor der Tür.',
  },
  fr: {
    seoTitle: 'Les plus belles plages de Puerto Viejo, Costa Rica (guide local)',
    seoDescription:
      'Un guide plage par plage de Puerto Viejo de Talamanca : Playa Cocles, Playa Chiquita, Punta Uva, Playa Negra et Manzanillo. Où nager, surfer, faire du snorkeling et rester en sécurité.',
    heading: 'Les plus belles plages de Puerto Viejo',
    heroAlt: 'Plage caraïbe turquoise bordée de palmiers à Punta Uva, Puerto Viejo, Costa Rica',
    photoCredit: <>Photo : <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
    introParagraphs: [
      'Les plages sont la raison pour laquelle la plupart des gens tombent sous le charme de Puerto Viejo. Sur un seul tronçon de côte, on trouve de tout, des bons spots de surf aux criques limpides bordées de palmiers, parfaites pour une baignade paisible.',
      'Voici un guide plage par plage, du nord au sud à partir du village, avec des notes honnêtes sur celles qui conviennent le mieux à la baignade, au surf et au snorkeling, et un mot sur la sécurité dans l’eau.',
    ],
    stayRecommendationTitle: 'Où loger près des plus belles plages',
    beachesHeading: 'Les plages, une par une',
    beaches: [
      { name: 'Playa Negra', description: 'Juste au nord du village, une plage de sable noir facile d’accès, idéale pour une promenade et un coucher de soleil, avec une eau plus calme que les plages de surf.' },
      { name: 'Playa Cocles', description: 'La grande plage de surf, à quelques kilomètres au sud du village. Populaire et animée, avec des sauveteurs en saison, mais des courants forts, donc plutôt pour surfer et bronzer que pour nager tranquillement.' },
      { name: 'Playa Chiquita', description: 'Pas une plage, mais une série de petites criques calmes abritées par le récif, cachées derrière la jungle. Tranquilles et bonnes pour la baignade et le snorkeling, et c’est là que se trouvent plusieurs de nos villas.' },
      { name: 'Punta Uva', description: 'La plage de carte postale : eau turquoise, une pointe couverte de jungle et parmi les baignades et le snorkeling les plus calmes et clairs de la côte. Une préférée des locaux.' },
      { name: 'Manzanillo', description: 'Au bout de la route, la porte d’entrée du refuge Gandoca-Manzanillo. Eau calme et claire, un récif vivant au large et un village décontracté avec quelques excellentes sodas.' },
    ],
    bestForHeading: 'Quelle plage pour quoi',
    bestForIntro: 'Pour choisir rapidement :',
    bestForItems: [
      'Baignade calme et familles → Punta Uva, les criques de Playa Chiquita, Manzanillo',
      'Snorkeling → Punta Uva et Manzanillo, par temps calme et clair',
      'Surf → Playa Cocles, et le célèbre récif de Salsa Brava réservé aux experts',
      'Une balade au coucher du soleil près du village → Playa Negra',
    ],
    safetyHeading: 'Rester en sécurité dans l’eau',
    safetyParagraph:
      'Les courants d’arrachement sont bien réels sur les plages les plus exposées, surtout Playa Cocles. Nagez là où l’eau est calme et où d’autres se baignent, gardez un œil sur les enfants et, en cas de doute, choisissez les criques abritées de Punta Uva ou Playa Chiquita. La mer change ici d’un jour à l’autre, vérifiez donc les conditions avant de vous baigner.',
    takeawaysHeading: 'À retenir',
    takeawaysParagraph:
      'Les plages de Puerto Viejo vont du surf de Playa Cocles à l’eau calme et claire de Punta Uva et Manzanillo, avec les criques abritées de Playa Chiquita entre les deux. Choisissez la plage selon vos envies, que ce soit nager, surfer ou faire du snorkeling, respectez les courants, et vous aurez l’un des plus beaux tronçons de côte du Costa Rica à votre porte.',
  },
  it: {
    seoTitle: 'Le spiagge più belle di Puerto Viejo, Costa Rica (guida locale)',
    seoDescription:
      'Una guida spiaggia per spiaggia di Puerto Viejo de Talamanca: Playa Cocles, Playa Chiquita, Punta Uva, Playa Negra e Manzanillo. Dove nuotare, surfare, fare snorkeling e come stare al sicuro.',
    heading: 'Le spiagge più belle di Puerto Viejo',
    heroAlt: 'Spiaggia caraibica turchese con palme a Punta Uva, Puerto Viejo, Costa Rica',
    photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
    introParagraphs: [
      'Le spiagge sono il motivo per cui la maggior parte delle persone si innamora di Puerto Viejo. Lungo un unico tratto di costa trovi di tutto, dai buoni break da surf alle cale cristalline orlate di palme, perfette per un bagno rilassato.',
      'Ecco una guida spiaggia per spiaggia, da nord a sud partendo dal paese, con note oneste su quali sono le migliori per nuotare, surfare e fare snorkeling, e una nota sulla sicurezza in acqua.',
    ],
    stayRecommendationTitle: 'Dove alloggiare vicino alle spiagge più belle',
    beachesHeading: 'Le spiagge, una per una',
    beaches: [
      { name: 'Playa Negra', description: 'Appena a nord del paese, una comoda spiaggia di sabbia nera, ottima per una passeggiata e per il tramonto, con acqua più calma rispetto alle spiagge da surf.' },
      { name: 'Playa Cocles', description: 'La grande spiaggia da surf, un paio di chilometri a sud del paese. Popolare e vivace, con bagnini stagionali, ma correnti forti, quindi più per surfare e prendere il sole che per nuotare tranquilli.' },
      { name: 'Playa Chiquita', description: 'Non una spiaggia sola, ma una serie di piccole cale tranquille protette dalla barriera, nascoste dietro la giungla. Tranquille e adatte a nuotare e fare snorkeling, e dove si trovano diverse delle nostre ville.' },
      { name: 'Punta Uva', description: 'La spiaggia da cartolina: acqua turchese, una punta coperta di giungla e alcuni dei bagni e degli snorkeling più calmi e limpidi della costa. Una preferita dai local.' },
      { name: 'Manzanillo', description: 'Alla fine della strada, la porta d’accesso al rifugio Gandoca-Manzanillo. Acqua calma e limpida, una barriera viva al largo e un paese rilassato con un paio di ottime sodas.' },
    ],
    bestForHeading: 'Quale spiaggia per cosa',
    bestForIntro: 'Un modo rapido per scegliere:',
    bestForItems: [
      'Nuoto tranquillo e famiglie → Punta Uva, le cale di Playa Chiquita, Manzanillo',
      'Snorkeling → Punta Uva e Manzanillo, nelle giornate calme e limpide',
      'Surf → Playa Cocles e il famoso reef break di Salsa Brava, solo per esperti',
      'Una passeggiata al tramonto vicino al paese → Playa Negra',
    ],
    safetyHeading: 'Sicurezza in acqua',
    safetyParagraph:
      'Le correnti di risacca sono reali sulle spiagge più esposte, soprattutto a Playa Cocles. Nuota dove l’acqua è calma e ci sono altre persone in acqua, tieni d’occhio i bambini e, nel dubbio, scegli le cale riparate di Punta Uva o Playa Chiquita. Qui il mare cambia di giorno in giorno, quindi controlla le condizioni prima di tuffarti.',
    takeawaysHeading: 'Punti chiave',
    takeawaysParagraph:
      'Le spiagge di Puerto Viejo vanno dal surf di Playa Cocles all’acqua calma e limpida di Punta Uva e Manzanillo, con le cale riparate di Playa Chiquita nel mezzo. Scegli la spiaggia in base a ciò che cerchi, che sia nuoto, surf o snorkeling, rispetta le correnti, e avrai uno dei tratti di costa più belli della Costa Rica a due passi.',
  },
  pt: {
    seoTitle: 'As melhores praias de Puerto Viejo, Costa Rica (guia local)',
    seoDescription:
      'Um guia praia a praia de Puerto Viejo de Talamanca: Playa Cocles, Playa Chiquita, Punta Uva, Playa Negra e Manzanillo. Onde nadar, surfar, fazer snorkel e como se manter seguro.',
    heading: 'As melhores praias de Puerto Viejo',
    heroAlt: 'Praia caribenha turquesa com palmeiras em Punta Uva, Puerto Viejo, Costa Rica',
    photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
    introParagraphs: [
      'As praias são o motivo pelo qual a maioria das pessoas se apaixona por Puerto Viejo. Ao longo de um único trecho de costa você encontra de tudo, de bons picos de surfe a enseadas cristalinas orladas de palmeiras, perfeitas para um banho tranquilo.',
      'Aqui vai um guia praia a praia, de norte a sul a partir da vila, com notas honestas sobre quais são melhores para nadar, surfar e fazer snorkel, e uma nota sobre segurança na água.',
    ],
    stayRecommendationTitle: 'Onde se hospedar perto das melhores praias',
    beachesHeading: 'As praias, uma a uma',
    beaches: [
      { name: 'Playa Negra', description: 'Logo ao norte da vila, uma praia de areia preta fácil de curtir, ótima para um passeio e para o pôr do sol, com água mais calma que as praias de surfe.' },
      { name: 'Playa Cocles', description: 'A grande praia de surfe, a alguns quilômetros ao sul da vila. Popular e animada, com salva-vidas por temporada, mas correntes fortes, então mais para surfar e tomar sol do que para nadar tranquilo.' },
      { name: 'Playa Chiquita', description: 'Não é uma praia só, mas uma sequência de pequenas enseadas calmas protegidas pelo recife, escondidas atrás da selva. Tranquilas e boas para nadar e fazer snorkel, e onde ficam várias das nossas villas.' },
      { name: 'Punta Uva', description: 'A praia de cartão-postal: água turquesa, uma ponta coberta de selva e alguns dos banhos e snorkel mais calmos e claros da costa. Uma favorita dos locais.' },
      { name: 'Manzanillo', description: 'No fim da estrada, a porta de entrada do refúgio Gandoca-Manzanillo. Água calma e clara, um recife vivo mar adentro e uma vila tranquila com um par de ótimas sodas.' },
    ],
    bestForHeading: 'Qual praia para quê',
    bestForIntro: 'Uma forma rápida de escolher:',
    bestForItems: [
      'Banho tranquilo e famílias → Punta Uva, as enseadas de Playa Chiquita, Manzanillo',
      'Snorkel → Punta Uva e Manzanillo, em dias calmos e claros',
      'Surfe → Playa Cocles e o famoso recife de Salsa Brava, só para experientes',
      'Um passeio ao pôr do sol perto da vila → Playa Negra',
    ],
    safetyHeading: 'Segurança na água',
    safetyParagraph:
      'As correntes de retorno são reais nas praias mais expostas, especialmente Playa Cocles. Nade onde a água está calma e há outras pessoas, fique de olho nas crianças e, na dúvida, escolha as enseadas protegidas de Punta Uva ou Playa Chiquita. O mar aqui muda de um dia para o outro, então confira as condições antes de entrar.',
    takeawaysHeading: 'Pontos principais',
    takeawaysParagraph:
      'As praias de Puerto Viejo vão do surfe de Playa Cocles à água calma e clara de Punta Uva e Manzanillo, com as enseadas protegidas de Playa Chiquita no meio. Escolha a praia conforme o que você quer, seja nadar, surfar ou fazer snorkel, respeite as correntes, e terá um dos melhores trechos de costa da Costa Rica à sua porta.',
  },
  he: {
    seoTitle: 'החופים הטובים ביותר בפוארטו ויאחו, קוסטה ריקה (מדריך מקומי)',
    seoDescription:
      'מדריך חוף אחר חוף לפוארטו ויאחו דה טלמנקה: פלאיה קוקלס, פלאיה צ\'יקיטה, פונטה אובה, פלאיה נגרה ומנזנייו. היכן לשחות, לגלוש, לעשות שנורקלינג ואיך להישאר בטוחים.',
    heading: 'החופים הטובים ביותר בפוארטו ויאחו',
    heroAlt: 'חוף קריבי טורקיז עם דקלים בפונטה אובה, פוארטו ויאחו, קוסטה ריקה',
    photoCredit: <>צילום: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
    introParagraphs: [
      'החופים הם הסיבה שרוב האנשים מתאהבים בפוארטו ויאחו. לאורך רצועת חוף אחת יש הכול, משוברי גלים טובים ועד מפרצונים צלולים עטורי דקלים, מושלמים לשחייה נינוחה.',
      'הנה מדריך חוף אחר חוף, מצפון לדרום החל מהעיירה, עם הערות כנות על אילו הכי טובים לשחייה, לגלישה ולשנורקלינג, ומילה על בטיחות במים.',
    ],
    stayRecommendationTitle: 'היכן להתארח ליד החופים הטובים ביותר',
    beachesHeading: 'החופים, אחד אחד',
    beaches: [
      { name: 'Playa Negra', description: 'ממש מצפון לעיירה, חוף חול שחור נוח, מצוין לטיול ולשקיעה, עם מים רגועים יותר מחופי הגלישה.' },
      { name: 'Playa Cocles', description: 'חוף הגלישה הגדול, כמה קילומטרים מדרום לעיירה. פופולרי ותוסס, עם מצילים בעונה, אך זרמים חזקים, ולכן יותר לגלישה ולשיזוף מאשר לשחייה נינוחה.' },
      { name: 'Playa Chiquita', description: 'לא חוף אחד אלא שרשרת של מפרצונים קטנים ורגועים מוגני שונית, חבויים מאחורי הג\'ונגל. שקטים וטובים לשחייה ולשנורקלינג, וכאן ממוקמות כמה מהווילות שלנו.' },
      { name: 'Punta Uva', description: 'חוף הגלויה: מים טורקיז, לשון יבשה מכוסת ג\'ונגל וכמה מהשחייה והשנורקלינג הרגועים והצלולים ביותר בחוף. אהוב על המקומיים.' },
      { name: 'Manzanillo', description: 'בקצה הכביש, השער לשמורת גנדוקה-מנזנייו. מים רגועים וצלולים, שונית חיה מול החוף וכפר נינוח עם כמה sodas מצוינות.' },
    ],
    bestForHeading: 'איזה חוף למה',
    bestForIntro: 'דרך מהירה לבחור:',
    bestForItems: [
      'שחייה רגועה ומשפחות → פונטה אובה, מפרצוני פלאיה צ\'יקיטה, מנזנייו',
      'שנורקלינג → פונטה אובה ומנזנייו, בימים רגועים וצלולים',
      'גלישה → פלאיה קוקלס, ושובר השונית המפורסם סלסה בראבה למנוסים בלבד',
      'טיול שקיעה ליד העיירה → פלאיה נגרה',
    ],
    safetyHeading: 'בטיחות במים',
    safetyParagraph:
      'זרמי חתירה הם דבר אמיתי בחופים החשופים יותר, במיוחד בפלאיה קוקלס. שחו במקום שבו המים רגועים ויש עוד אנשים במים, השגיחו על הילדים, ובמקרה של ספק בחרו את המפרצונים המוגנים של פונטה אובה או פלאיה צ\'יקיטה. הים כאן משתנה מיום ליום, אז בדקו את התנאים לפני שאתם נכנסים.',
    takeawaysHeading: 'עיקרי הדברים',
    takeawaysParagraph:
      'חופי פוארטו ויאחו נעים מהגלישה של פלאיה קוקלס אל המים הרגועים והצלולים של פונטה אובה ומנזנייו, עם המפרצונים המוגנים של פלאיה צ\'יקיטה באמצע. התאימו את החוף למה שאתם רוצים, בין אם שחייה, גלישה או שנורקלינג, כבדו את הזרמים, ותהיה לכם אחת מרצועות החוף היפות בקוסטה ריקה ממש מעבר לפינה.',
  },
  hi: {
    seoTitle: 'प्वेर्तो विएखो, कोस्टा रिका के सबसे अच्छे समुद्र तट (स्थानीय गाइड)',
    seoDescription:
      'प्वेर्तो विएखो दे तालामांका के समुद्र तटों का तट-दर-तट मार्गदर्शक: प्लाया कोकलेस, प्लाया चिकीता, पुंता उवा, प्लाया नेग्रा और मंज़ानियो। कहाँ तैरें, सर्फ़ करें, स्नॉर्कल करें और सुरक्षित कैसे रहें।',
    heading: 'प्वेर्तो विएखो के सबसे अच्छे समुद्र तट',
    heroAlt: 'पुंता उवा, प्वेर्तो विएखो, कोस्टा रिका में ताड़ के पेड़ों वाला फ़िरोज़ी कैरिबियन समुद्र तट',
    photoCredit: <>फ़ोटो: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
    introParagraphs: [
      'समुद्र तट ही वह वजह हैं जिनसे ज़्यादातर लोग प्वेर्तो विएखो पर मोहित हो जाते हैं। तट के एक ही हिस्से में आपको सब कुछ मिलता है, अच्छे सर्फ़ ब्रेक से लेकर ताड़ के पेड़ों से घिरी शीशे-सी शांत खाड़ियों तक, जो आराम से तैरने के लिए बेहतरीन हैं।',
      'यहाँ एक तट-दर-तट गाइड है, कस्बे से दक्षिण की ओर बढ़ते हुए, इस बारे में ईमानदार टिप्पणियों के साथ कि कौन-सा तैरने, सर्फ़ करने और स्नॉर्कलिंग के लिए सबसे अच्छा है, और पानी में सुरक्षित रहने पर एक बात।',
    ],
    stayRecommendationTitle: 'सबसे अच्छे समुद्र तटों के पास कहाँ ठहरें',
    beachesHeading: 'समुद्र तट, एक-एक करके',
    beaches: [
      { name: 'Playa Negra', description: 'कस्बे के ठीक उत्तर में, काली रेत वाला एक सहज समुद्र तट, टहलने और सूर्यास्त के लिए बढ़िया, सर्फ़ तटों की तुलना में शांत पानी के साथ।' },
      { name: 'Playa Cocles', description: 'कस्बे से कुछ किलोमीटर दक्षिण में बड़ा सर्फ़ तट। लोकप्रिय और जीवंत, मौसमी लाइफ़गार्ड के साथ, पर तेज़ धाराएँ, इसलिए आराम से तैरने के बजाय सर्फ़िंग और धूप सेंकने के लिए अधिक।' },
      { name: 'Playa Chiquita', description: 'एक तट नहीं, बल्कि जंगल के पीछे छिपी रीफ़-सुरक्षित छोटी, शांत खाड़ियों की एक शृंखला। शांत और तैरने तथा स्नॉर्कलिंग के लिए अच्छी, और यहीं हमारी कई villas स्थित हैं।' },
      { name: 'Punta Uva', description: 'पोस्टकार्ड वाला तट: फ़िरोज़ी पानी, जंगल से ढकी एक नोक और तट के सबसे शांत, साफ़ तैराकी और स्नॉर्कलिंग में से कुछ। स्थानीय लोगों की पसंदीदा।' },
      { name: 'Manzanillo', description: 'सड़क के अंत में, गंदोका-मंज़ानियो शरण का प्रवेश द्वार। शांत, साफ़ पानी, तट से दूर एक जीवित रीफ़ और कुछ बेहतरीन sodas वाला एक इत्मीनान भरा गाँव।' },
    ],
    bestForHeading: 'किस चीज़ के लिए कौन-सा तट',
    bestForIntro: 'जल्दी चुनने का एक तरीका:',
    bestForItems: [
      'शांत तैराकी और परिवार → पुंता उवा, प्लाया चिकीता की खाड़ियाँ, मंज़ानियो',
      'स्नॉर्कलिंग → पुंता उवा और मंज़ानियो, शांत और साफ़ दिनों में',
      'सर्फ़िंग → प्लाया कोकलेस, और केवल विशेषज्ञों के लिए मशहूर साल्सा ब्रावा रीफ़ ब्रेक',
      'कस्बे के पास सूर्यास्त की सैर → प्लाया नेग्रा',
    ],
    safetyHeading: 'पानी में सुरक्षित रहना',
    safetyParagraph:
      'अधिक खुले तटों पर, खासकर प्लाया कोकलेस में, रिप करंट सचमुच होते हैं। वहाँ तैरें जहाँ पानी शांत हो और अन्य लोग मौजूद हों, बच्चों पर नज़र रखें, और संदेह होने पर पुंता उवा या प्लाया चिकीता की सुरक्षित खाड़ियाँ चुनें। यहाँ समुद्र दिन-प्रतिदिन बदलता है, इसलिए पानी में उतरने से पहले स्थिति जाँच लें।',
    takeawaysHeading: 'मुख्य बातें',
    takeawaysParagraph:
      'प्वेर्तो विएखो के समुद्र तट प्लाया कोकलेस के सर्फ़ से लेकर पुंता उवा और मंज़ानियो के शांत, साफ़ पानी तक फैले हैं, बीच में प्लाया चिकीता की सुरक्षित खाड़ियों के साथ। जो आप चाहते हैं उसके अनुसार तट चुनें, चाहे तैरना हो, सर्फ़ करना या स्नॉर्कल करना, धाराओं का सम्मान करें, और कोस्टा रिका के सबसे अच्छे तटीय हिस्सों में से एक आपके दरवाज़े पर होगा।',
  },
  nl: {
    seoTitle: 'De mooiste stranden van Puerto Viejo, Costa Rica (lokale gids)',
    seoDescription:
      'Een strand-voor-strand gids voor Puerto Viejo de Talamanca: Playa Cocles, Playa Chiquita, Punta Uva, Playa Negra en Manzanillo. Waar je kunt zwemmen, surfen, snorkelen en veilig blijft.',
    heading: 'De mooiste stranden van Puerto Viejo',
    heroAlt: 'Turquoise Caribisch strand met palmen in Punta Uva, Puerto Viejo, Costa Rica',
    photoCredit: <>Foto: <a href="https://commons.wikimedia.org/wiki/Category:Puerto_Viejo_de_Talamanca" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></>,
    introParagraphs: [
      'De stranden zijn de reden dat de meeste mensen voor Puerto Viejo vallen. Langs één stuk kust vind je alles, van goede surfbreaks tot glasheldere, met palmen omzoomde baaien, perfect voor een luie duik.',
      'Hier is een strand-voor-strand gids, van noord naar zuid vanaf het dorp, met eerlijke aantekeningen over welke het best zijn om te zwemmen, surfen en snorkelen, en een woord over veiligheid in het water.',
    ],
    stayRecommendationTitle: 'Waar te verblijven nabij de mooiste stranden',
    beachesHeading: 'De stranden, een voor een',
    beaches: [
      { name: 'Playa Negra', description: 'Net ten noorden van het dorp, een ontspannen zwartzandstrand, ideaal voor een wandeling en de zonsondergang, met rustiger water dan de surfstranden.' },
      { name: 'Playa Cocles', description: 'Het grote surfstrand een paar kilometer ten zuiden van het dorp. Populair en levendig, met seizoensgebonden strandwachten, maar sterke stromingen, dus meer voor surfen en zonnen dan voor rustig zwemmen.' },
      { name: 'Playa Chiquita', description: 'Niet één strand, maar een reeks kleine, kalme, door het rif beschutte baaien, verscholen achter de jungle. Rustig en goed om te zwemmen en snorkelen, en waar meerdere van onze villa’s liggen.' },
      { name: 'Punta Uva', description: 'Het ansichtkaartstrand: turquoise water, een met jungle bedekte landpunt en enkele van de rustigste, helderste zwem- en snorkelplekken van de kust. Een favoriet onder de locals.' },
      { name: 'Manzanillo', description: 'Aan het eind van de weg, de toegangspoort tot het reservaat Gandoca-Manzanillo. Kalm, helder water, een levend rif voor de kust en een relaxed dorp met een paar geweldige sodas.' },
    ],
    bestForHeading: 'Welk strand waarvoor',
    bestForIntro: 'Snel kiezen:',
    bestForItems: [
      'Rustig zwemmen en gezinnen → Punta Uva, de baaien van Playa Chiquita, Manzanillo',
      'Snorkelen → Punta Uva en Manzanillo, op kalme, heldere dagen',
      'Surfen → Playa Cocles, en de beroemde rifbreak Salsa Brava alleen voor experts',
      'Een wandeling bij zonsondergang nabij het dorp → Playa Negra',
    ],
    safetyHeading: 'Veilig blijven in het water',
    safetyParagraph:
      'Muistromen zijn reëel op de meer open stranden, vooral Playa Cocles. Zwem waar het water kalm is en anderen in het water zijn, houd kinderen in de gaten en kies bij twijfel de beschutte baaien van Punta Uva of Playa Chiquita. De zee verandert hier van dag tot dag, dus check de omstandigheden voordat je erin gaat.',
    takeawaysHeading: 'Belangrijkste punten',
    takeawaysParagraph:
      'De stranden van Puerto Viejo lopen van de surf van Playa Cocles tot het kalme, heldere water van Punta Uva en Manzanillo, met de beschutte baaien van Playa Chiquita ertussen. Stem het strand af op wat je wilt, of dat nu zwemmen, surfen of snorkelen is, respecteer de stromingen, en je hebt een van de mooiste stukken kust van Costa Rica voor de deur.',
  },
};

export function beachesContent(locale: Locale): BeachesContent {
  return beaches[locale] ?? beaches.en!;
}
