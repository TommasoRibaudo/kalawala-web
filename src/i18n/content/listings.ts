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
        "The space, completely private, has A/C, fully equipped kitchen, a private bathroom with hot water. The parking space is private, spacious and enclosed. Every house has a small porch for our guests.",
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
        "El espacio, completamente privado, tiene A/C, cocina totalmente equipada, un baño privado con agua caliente. El espacio de estacionamiento es privado, espacioso y encerrado. Cada casa tiene un pequeño porche para nuestros huéspedes.",
        "Todos los espacios descritos aquí son privados, incluida la cocina y el baño totalmente equipado. Tendrás todo lo que necesitas para sentirte como en casa.",
        "Cerca puedes encontrar restaurantes, supermercados y alquiler de bicicletas. Confiamos en nuestros huéspedes para seguir el sentido común al salir de nuestra casa, por eso tenemos 0 reglas de salida y ninguna lista de salida.",
        "¿Tienes alguna petición especial? Estaríamos más que felices de acomodarte si podemos. Por favor, no dudes en hacérnoslo saber.",
        "Puerto Viejo es un destino popular para turistas de todo el mundo, gracias a sus impresionantes alrededores. El pueblo cuenta con inmensas playas que están rodeadas de selva tropical, así como dos Parques Nacionales (Manzanillo y Cahuita). Por la noche, el pueblo cobra vida con una escena nocturna animada y activa. Cuando te hospedas aquí, podrás sumergirte completamente en todo lo que hace único a Puerto Viejo.",
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
        "Located in the heart of town, this house has space for up to 5 people and features a fully equipped kitchen, a bathroom, 2 A/C units, and a private parking lot.",
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
        "Located in the heart of town, this house has space for up to 5 people and features a fully equipped kitchen, a bathroom, 2 A/C units, and a private parking lot.",
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
  },
};

export function listingContent(key: ListingKey, locale: Locale): ListingContent {
  const byLocale = CONTENT[key];
  return byLocale[locale] ?? byLocale[DEFAULT_LOCALE]!;
}
