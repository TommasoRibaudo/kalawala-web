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
      <>We arrived in Puerto Viejo early on a Saturday morning, excited to start our adventure. Our <a href="https://reservaskalawala.com/Tucano" target="_blank" rel="noopener noreferrer">Airbnb</a> wasn't ready yet, so we decided to rent a quad nearby and head to Punta Uva to soak up some sun. The beach was stunning, with turquoise and calm waters. We rented Kayaks and explored the coast. For lunch, we stopped by <a href="https://maps.app.goo.gl/TnyD131GeLKYeARSA" target="_blank" rel="noopener noreferrer">Selvin's</a>, a local Caribbean restaurant, and tried some delicious Caribbean chicken with Rice and Beans.</>,
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
      <>Llegamos a Puerto Viejo temprano un sábado por la mañana, emocionados por comenzar nuestra aventura. Nuestro <a href="https://reservaskalawala.com/Tucano" target="_blank" rel="noopener noreferrer">Airbnb</a> no estaba listo aún, así que decidimos alquilar un ATV cerca y dirigirnos a Punta Uva para disfrutar del sol. La playa era impresionante, con aguas turquesas y tranquilas. Alquilamos kayaks y exploramos la costa. Para el almuerzo, nos detuvimos en <a href="https://maps.app.goo.gl/TnyD131GeLKYeARSA" target="_blank" rel="noopener noreferrer">Selvin's</a>, un restaurante caribeño local, y probamos un delicioso pollo caribeño con rice and beans.</>,
      <>Después, nos registramos en nuestro Airbnb, tomamos una ducha refrescante y descansamos por un rato. Para la cena, decidimos probar <a href="https://maps.app.goo.gl/2vNghKagTvPVHnip6" target="_blank" rel="noopener noreferrer">Cafe Viejo</a>, un restaurante italiano ubicado en el centro del pueblo. La comida fue fantástica; probamos el "Fritto Misto", una mezcla de pescado y mariscos fritos. Más tarde esa noche, nos dirigimos a <a href="https://maps.app.goo.gl/fXnSossA1PqAfkbh9" target="_blank" rel="noopener noreferrer">Salsa Brava</a>, un bar en la playa conocido por sus noches de reggae y ambiente relajado.</>,
    ],
    day2Paragraphs: [
      <>Al día siguiente, nos levantamos más tarde de lo que hubiéramos querido, tomamos café y croissants en la <a href="https://maps.app.goo.gl/UW6EWzA4h9WQTsbX6" target="_blank" rel="noopener noreferrer">Panadería Degustibus</a> y nos dirigimos a Cocles. Hay un camino agradable y bien cuidado cerca de la panadería que conduce a Cocles, donde descubrimos un bonito mirador antes de llegar a la playa.</>,
      'Después de nuestra caminata, regresamos a la casa para empacar y hacer el check-out. Tuvimos suerte de irnos un domingo, ya que nos dijeron que no se permiten camiones grandes en la carretera, lo que hizo nuestro viaje de regreso a San José más suave de lo esperado.',
    ],
    closing:
      '¡Puerto Viejo es un excelente destino para una escapada rápida de fin de semana. Con sus impresionantes playas, vibrante vida nocturna y belleza natural, nunca te quedarás sin cosas que hacer. Ya sea que busques aventura o descansar, Puerto Viejo tiene algo que ofrecer para todos. ¿Qué estás esperando? ¡Reserva tu viaje hoy y experimenta la magia de Puerto Viejo por ti mismo!',
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
};

export function cahuitaParkContent(locale: Locale): CahuitaParkContent {
  return cahuitaPark[locale] ?? cahuitaPark.en!;
}
