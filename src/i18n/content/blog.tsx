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
