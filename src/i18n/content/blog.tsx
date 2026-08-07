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
