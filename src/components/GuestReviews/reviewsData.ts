export interface Review {
  reviewer: string;
  location?: string;
  rating: 5;
  date: string;
  stayType: string;
  text: { en: string; es: string };
}

export const GUEST_REVIEWS: Record<string, Review[]> = {
  GECO: [
    {
      reviewer: 'Lia',
      location: 'Fort Collins, Colorado',
      rating: 5,
      date: 'June 2025',
      stayType: 'Stayed a few nights',
      text: {
        en: "Our stay here was perfect! The location is amazing, as it's walking distance to restaurants, stores, and multiple beaches. Even though it's right in town, the house is quiet and peaceful. We even had the wonderful experience of seeing a sloth right in the front yard! Would definitely stay here again!",
        es: '¡Nuestra estadía aquí fue perfecta! La ubicación es increíble, a poca distancia a pie de restaurantes, tiendas y múltiples playas. Aunque está justo en el pueblo, la casa es tranquila y acogedora. ¡Hasta tuvimos la maravillosa experiencia de ver un perezoso en el jardín! ¡Sin duda volveríamos!',
      },
    },
    {
      reviewer: 'Caroline',
      location: 'San Luis Obispo, California',
      rating: 5,
      date: 'April 2026',
      stayType: 'Stayed a few nights',
      text: {
        en: 'Fantastic stay! Centrally located yet quiet and private. Tomaso and team was responsive and helpful above & beyond.',
        es: '¡Estadía fantástica! Ubicación céntrica pero tranquila y privada. Tomaso y su equipo fueron muy atentos y serviciales, más allá de lo esperado.',
      },
    },
    {
      reviewer: 'Andrea',
      location: 'Quepos, Costa Rica',
      rating: 5,
      date: 'February 2026',
      stayType: 'Stayed a few nights',
      text: {
        en: 'Our stay was simply perfect. The house is wonderfully central, cozy, and has a very cool style. We will definitely come back — highly recommended. Great host, Tommaso!',
        es: 'Simplemente perfecta nuestra estadía, la casa es céntrica maravillosa y acogedora con un estilo muy cool, definitivamente volveremos altamente recomendados, ¡grandeee Tommasooo!',
      },
    },
  ],

  TUCANO: [
    {
      reviewer: 'Ivette',
      location: 'Raleigh, North Carolina',
      rating: 5,
      date: 'December 2025',
      stayType: 'Stayed one night',
      text: {
        en: "This Airbnb was an amazing place to stay! Super easy to get to, a convenient parking spot off the main road, and right above a great food spot! You're even given a coupon to use there for your entire stay!",
        es: '¡Este Airbnb fue un lugar increíble para hospedarse! Muy fácil de llegar, con un conveniente lugar de estacionamiento junto a la carretera principal, y justo encima de un excelente restaurante. ¡Incluso te dan un cupón para usar durante toda tu estadía!',
      },
    },
    {
      reviewer: 'Tekoa',
      location: 'Washington, District of Columbia',
      rating: 5,
      date: 'June 2025',
      stayType: 'Stayed a few nights',
      text: {
        en: 'The apartment was beautiful and very clean!! We had a wonderful time there. The beach is basically across the street! We loved being right over the bakery and enjoyed the air conditioning :) a great price as well!!',
        es: '¡¡El apartamento era hermoso y muy limpio!! Lo pasamos de maravilla. ¡La playa está prácticamente al cruzar la calle! Nos encantó estar justo encima de la panadería y disfrutamos del aire acondicionado :) ¡¡Y a un precio excelente!!',
      },
    },
    {
      reviewer: 'Laura',
      location: 'United Kingdom',
      rating: 5,
      date: 'March 2026',
      stayType: 'Stayed one night',
      text: {
        en: 'The property is very spacious & clean. The check-in was super easy, with clear instructions. The apartment is centrally located, and you can explore the area on foot. You stay right above a bakery that offers a delicious breakfast.',
        es: 'La propiedad es muy amplia y limpia. El check-in fue muy sencillo, con instrucciones claras. El apartamento está en una ubicación céntrica y se puede explorar la zona a pie. Te alojás justo encima de una panadería que ofrece un delicioso desayuno.',
      },
    },
  ],

  RANA: [
    {
      reviewer: 'Jennifer',
      location: 'Arlington, Texas',
      rating: 5,
      date: 'April 2026',
      stayType: 'Stayed a few nights',
      text: {
        en: 'We had a great stay! There were lots of restaurants and shops nearby, the beach was like a 5 minute walk and our host was very responsive and helped with everything we needed. Both rooms had AC which was heaven sent after a long day of heat and humidity. I would definitely stay here again!',
        es: '¡Tuvimos una estadía excelente! Hay muchos restaurantes y tiendas cerca, la playa está a solo 5 minutos caminando y el anfitrión fue muy atento y ayudó con todo lo que necesitábamos. Ambas habitaciones tienen aire acondicionado, que fue un regalo del cielo tras un largo día de calor y humedad. ¡Sin duda volvería!',
      },
    },
    {
      reviewer: 'Guillermo',
      location: 'Santa Ana, Costa Rica',
      rating: 5,
      date: 'April 2026',
      stayType: 'Stayed with a pet',
      text: {
        en: "Great experience with Kalawala and Tommaso. It's the second time I've stayed with them and it has been a great experience all around. That is why I have chosen him for my second visit to Puerto Viejo. Thank you for the great experience, and looking forward to visiting again soon.",
        es: 'Gran experiencia con Kalawala y Tommaso, es la segunda vez que me hospedo con ellos y ha sido una gran experiencia en todos los sentidos. Por eso lo elegí para mi segunda visita a Puerto Viejo. Gracias por la gran experiencia, y esperando volver pronto.',
      },
    },
    {
      reviewer: 'Paul',
      rating: 5,
      date: 'November 2025',
      stayType: 'Stayed one night',
      text: {
        en: "The location was central and the beach and many other options are so close. The property is secure and Tom was a great, responsive host. I could not have asked for a better experience!",
        es: 'La ubicación era céntrica y la playa y muchas otras opciones están muy cerca. La propiedad es segura y Tom fue un anfitrión excelente y muy atento. ¡No podría haber pedido una mejor experiencia!',
      },
    },
  ],

  AREKA: [
    {
      reviewer: 'Gregor',
      rating: 5,
      date: 'April 2026',
      stayType: 'Stayed a few nights',
      text: {
        en: "We had an amazing time in this beautiful house! Everything was neat and clean, and we enjoyed the spacious outside area. Plus it's really close to the beautiful Playa Chiquita! We can only recommend staying here :) The hosts were super friendly and responsive! We couldn't have imagined a nicer stay.",
        es: '¡Pasamos un tiempo increíble en esta hermosa casa! Todo estaba ordenado y limpio, y disfrutamos del amplio espacio exterior. Además, ¡está muy cerca de la hermosa Playa Chiquita! Solo podemos recomendar alojarse aquí :) Los anfitriones fueron super amables y atentos. No podríamos haber imaginado una estadía más agradable.',
      },
    },
    {
      reviewer: 'Alexandra',
      location: 'Vancouver, Canada',
      rating: 5,
      date: 'February 2026',
      stayType: 'Stayed one night',
      text: {
        en: 'What a cute little bungalow! Quiet, private, clean, safely located, and so beautifully decorated! We loved staying here for one night and wished we spent more time here. We also really appreciated the curtains as they allowed us to sleep in a bit. Would love to stay again!',
        es: '¡Qué lindo bungalow! Tranquilo, privado, limpio, bien ubicado y tan bien decorado. Nos encantó quedarnos aquí una noche y ojalá hubiéramos pasado más tiempo. También agradecimos mucho las cortinas que nos permitieron dormir un poco más. ¡Nos encantaría volver!',
      },
    },
    {
      reviewer: 'Maria Daniela Cerdas',
      location: 'San José, Costa Rica',
      rating: 5,
      date: 'January 2026',
      stayType: 'Stayed a few nights',
      text: {
        en: "This place is even better than described. It's very easy to find and check in, and it feels cozy from the very first moment. The air conditioning is a lifesaver in the beach heat. The bed is comfortable and the kitchen is fully equipped with everything we needed. Playa Chiquita is only a 5-minute walk away. Thank you, Luciano and Tomasso, for making our stay a dream!",
        es: 'Este lugar es aún mejor de lo que describen. Es muy fácil de encontrar y hacer el check-in, y se siente acogedor desde el primer momento. El aire acondicionado es un salvavidas en el calor de la playa. La cama es cómoda y la cocina está completamente equipada. Playa Chiquita está a solo 5 minutos a pie. ¡Gracias, Luciano y Tomasso, por hacer de nuestra estadía un sueño!',
      },
    },
  ],

  PAPPAGALLO: [
    {
      reviewer: 'Jacqueline',
      rating: 5,
      date: 'April 2026',
      stayType: 'Stayed with kids',
      text: {
        en: 'We had an amazing stay! The location was perfect and super easy to find. One of our favorite parts was the bakery downstairs — the food was absolutely delicious. Tom was a wonderful host, very responsive and helpful, making sure everything went smoothly. We would definitely stay here again!',
        es: '¡Tuvimos una estadía increíble! La ubicación fue perfecta y muy fácil de encontrar. Una de nuestras partes favoritas fue la panadería de abajo, ¡la comida estuvo absolutamente deliciosa! Tom fue un anfitrión maravilloso, muy atento y servicial. ¡Definitivamente volveríamos!',
      },
    },
    {
      reviewer: 'Elainet',
      rating: 5,
      date: 'February 2026',
      stayType: 'Stayed one night',
      text: {
        en: "Although our stay was short and sweet, we really enjoyed being so close to the beach. The apartment was amazing and cozy, and we really enjoyed the bakery right under the apartment. The host was great with instructions and welcoming. Overall 10/10 recommend.",
        es: 'Aunque nuestra estadía fue corta, la disfrutamos mucho. El apartamento era increíble y acogedor, y disfrutamos muchísimo de la panadería justo debajo. El anfitrión fue excelente con las instrucciones y muy cálido en la bienvenida. En general, 100% recomendado.',
      },
    },
    {
      reviewer: 'Carmen',
      location: 'San Francisco, California',
      rating: 5,
      date: 'December 2025',
      stayType: 'Stayed a few nights',
      text: {
        en: "We had a wonderful stay at Tommaso's! The place was comfortable and exactly as described. Everything we needed was there, and Tommaso was very friendly, responsive, and made the whole experience stress-free. The location was perfect. We truly enjoyed our time here and would happily stay again — highly recommend!",
        es: '¡Tuvimos una estadía maravillosa con Tommaso! El lugar era cómodo y exactamente como lo describen. Todo lo que necesitábamos estaba ahí, y Tommaso fue muy amable, atento y hizo que toda la experiencia fuera sin estrés. La ubicación fue perfecta. Disfrutamos mucho nuestra estadía y volveríamos encantados. ¡Muy recomendado!',
      },
    },
  ],

  'VILLA CORAL': [
    {
      reviewer: 'Sephora',
      location: 'Newark, Delaware',
      rating: 5,
      date: 'December 2025',
      stayType: 'Stayed a few nights',
      text: {
        en: 'We felt right at home. Tommaso was very welcoming and helpful during our stay. We arrived a little early but the place was already ready and he was very accommodating! There were food spots right down the street, everything was extremely walkable or a short car ride away. Several beaches are nearby as well.',
        es: 'Nos sentimos como en casa. Tommaso fue muy acogedor y servicial durante nuestra estadía. Llegamos un poco temprano pero el lugar ya estaba listo y fue muy complaciente. Había lugares para comer justo calle abajo, todo era muy accesible a pie o en poco tiempo en carro. También hay varias playas cercanas.',
      },
    },
    {
      reviewer: 'María José',
      location: 'San José Province, Costa Rica',
      rating: 5,
      date: 'March 2026',
      stayType: 'Stayed one night',
      text: {
        en: 'The apartment is absolutely gorgeous! It has everything you might need and it\'s very private and peaceful during the night. Additionally, the location is just great!',
        es: '¡El apartamento es absolutamente precioso! Tiene todo lo que puedas necesitar y es muy privado y tranquilo durante la noche. Además, ¡la ubicación es simplemente perfecta!',
      },
    },
    {
      reviewer: 'Eva',
      rating: 5,
      date: 'June 2025',
      stayType: 'Stayed about a week',
      text: {
        en: 'The Villa was super beautiful and really clean. The furnishing was also really nice! The Villa is just a short walk from a beautiful beach! All communications with our host were really easy and they are super friendly! The pool is also a nice addition to cool off. Such a beautiful place to spend your holidays!',
        es: 'La villa era super hermosa y muy limpia. ¡El mobiliario también era muy bonito! La villa está a solo un corto paseo de una hermosa playa. Toda la comunicación con el anfitrión fue muy fácil y son super amables. La piscina también es un añadido genial para refrescarse. ¡Un lugar precioso para pasar las vacaciones!',
      },
    },
  ],

  PLUMERIA: [
    {
      reviewer: 'Tabea',
      rating: 5,
      date: 'April 2026',
      stayType: 'Stayed a few nights',
      text: {
        en: "We had a wonderful stay! Everything we needed was available, and the many plants provided great privacy. The nature experience was especially impressive: we heard howler monkeys in the morning and even saw an agouti in the garden one evening. It truly felt like being in the middle of nature. The house was also very clean. Highly recommended!",
        es: '¡Tuvimos una estadía maravillosa! Todo lo que necesitábamos estaba disponible y las muchas plantas brindaban mucha privacidad. La experiencia con la naturaleza fue especialmente impresionante: escuchamos monos aulladores por la mañana e incluso vimos un agutí en el jardín una tarde. Realmente se sentía estar en medio de la naturaleza. La casa también estaba muy limpia. ¡Muy recomendada!',
      },
    },
    {
      reviewer: 'Alexandra',
      rating: 5,
      date: 'May 2025',
      stayType: 'Stayed one night',
      text: {
        en: "We had a great stay! The place was spotless, recently renovated and styled, very cozy and comfortable. It's in a perfect location, within walking distance to the beach and restaurants. The host was incredibly responsive and kind. Highly recommend.",
        es: '¡Tuvimos una gran estadía! El lugar estaba impecable, recién renovado y decorado, muy acogedor y cómodo. Está en una ubicación perfecta, a poca distancia a pie de la playa y los restaurantes. El anfitrión fue increíblemente atento y amable. Muy recomendado.',
      },
    },
    {
      reviewer: 'Abraham',
      location: 'Baeza, Ecuador',
      rating: 5,
      date: 'October 2025',
      stayType: 'Stayed a few nights',
      text: {
        en: 'Wonderful spot close to the most beautiful places. Bike rentals nearby within walking distance. The place is beautiful and quiet — a perfect retreat.',
        es: 'Un lugar maravilloso cerca de los sitios más hermosos. Alquiler de bicicletas a poca distancia a pie. El lugar es hermoso y tranquilo, un retiro perfecto.',
      },
    },
  ],

  GIULIA: [
    {
      reviewer: 'Darice',
      location: 'New York, New York',
      rating: 5,
      date: 'February 2026',
      stayType: 'Stayed a few nights',
      text: {
        en: "This was a last minute trip and everything worked out perfectly. The most relaxing place I've visited since 2016. Beach within walking distance, family owned restaurants just a few minutes away. No need to leave — the wildlife will soothe you from one of two porches from dawn to dusk. Clean bathrooms, cutlery, pots and pans. Fans were one of the best amenities. Will stay again soon.",
        es: 'Este fue un viaje de último momento y todo salió perfectamente. El lugar más relajante que he visitado desde 2016. Playa a poca distancia a pie, restaurantes familiares a solo minutos. No es necesario salir, la fauna silvestre te acompañará desde las dos terrazas del amanecer al atardecer. Baños limpios, cubertería, ollas y sartenes. Los ventiladores fueron uno de los mejores servicios. Volveré pronto.',
      },
    },
    {
      reviewer: 'Daniel',
      rating: 5,
      date: 'March 2026',
      stayType: 'Stayed a few nights',
      text: {
        en: 'A great place to stay in Puerto Viejo. This casita was clean, peaceful and had so many comforts. Being able to walk to the beach everyday was a real positive, but so many great things were also a short drive away. Would recommend.',
        es: 'Un excelente lugar para hospedarse en Puerto Viejo. Esta casita estaba limpia, tranquila y tenía muchas comodidades. Poder caminar a la playa todos los días fue un gran punto a favor, y muchas cosas geniales estaban también a poca distancia en carro. Lo recomiendo.',
      },
    },
    {
      reviewer: 'Sara',
      location: 'Lubbock, Texas',
      rating: 5,
      date: 'October 2025',
      stayType: 'Stayed a few nights',
      text: {
        en: "This was our first time visiting Costa Rica, and this Airbnb in Puerto Viejo truly felt like home. The space was beautiful, comfortable, and had everything we needed. You can really feel the care and thought put into every detail. We loved relaxing here after exploring the beaches and town — it made our trip even more special. Highly recommend to anyone visiting Puerto Viejo!",
        es: 'Era nuestra primera vez en Costa Rica y este Airbnb en Puerto Viejo realmente se sintió como en casa. El espacio era hermoso, cómodo y tenía todo lo que necesitábamos. Se nota el cuidado y detalle en cada rincón. Nos encantó relajarnos aquí después de explorar las playas y el pueblo, lo que hizo nuestro viaje aún más especial. ¡Muy recomendado para quienes visiten Puerto Viejo!',
      },
    },
  ],

  'VILLA MAR': [
    {
      reviewer: 'Christina',
      location: 'Las Vegas, Nevada',
      rating: 5,
      date: 'January 2026',
      stayType: 'Stayed with kids',
      text: {
        en: "STOP scrolling, and BOOK this place. We stay at Airbnbs all over when traveling. This is a great, clean, and super great place! Close to everything, easy access, you can walk, safe to stay if you're a single woman traveling, just great! We come to Costa Rica often, and will book again.",
        es: '¡PARA de hacer scroll y RESERVA este lugar! Nos hospedamos en Airbnbs de todo el mundo cuando viajamos. ¡Este es un lugar increíble, limpio y excelente! Cerca de todo, fácil acceso, se puede caminar, seguro para una mujer viajando sola, ¡simplemente genial! Venimos seguido a Costa Rica y volveremos a reservar.',
      },
    },
    {
      reviewer: 'Jeannine',
      location: 'Jacksonville, Florida',
      rating: 5,
      date: 'November 2025',
      stayType: 'Stayed a few nights',
      text: {
        en: "Tommaso's home in Puerto Viejo was beautiful. Easily one of my favorite Airbnbs I've ever stayed in. Also, want to highlight how WONDERFUL his check-in instructions were — they made finding the place a breeze. The location was private and very quiet. I would highly recommend his place, and hope to visit and stay here again!",
        es: 'La casa de Tommaso en Puerto Viejo fue hermosa. Fácilmente uno de mis Airbnbs favoritos en los que me he hospedado. También quiero destacar lo MARAVILLOSAS que fueron sus instrucciones de check-in, que hicieron que encontrar el lugar fuera muy fácil. La ubicación era privada y muy tranquila. ¡Lo recomiendo ampliamente y espero volver a hospedarse aquí!',
      },
    },
    {
      reviewer: 'Paula',
      location: 'Cartago, Costa Rica',
      rating: 5,
      date: 'November 2025',
      stayType: 'Stayed a few nights',
      text: {
        en: 'The place is very beautiful, has a great location, and is quite private. Tomasso is an excellent host, always very attentive and ready to help with anything you need. I loved it and would definitely stay here again. Highly recommended!',
        es: 'El lugar es muy hermoso, tiene una excelente ubicación y es bastante privado. Tomasso es un anfitrión excelente, siempre muy atento y dispuesto a ayudar con lo que necesites. Me encantó y definitivamente volvería. ¡Muy recomendado!',
      },
    },
  ],

  DELFINES: [
    {
      reviewer: 'Marsaude',
      location: 'New York, New York',
      rating: 5,
      date: 'February 2026',
      stayType: 'Stayed one night',
      text: {
        en: "The place was beautiful. It felt private and secure, and everything was very clean. The hosts were kind and respectful, and the property exceeded our expectations based on the photos. The location is great — walkable to town and close to the beach. We would absolutely stay here again. It was well worth the price.",
        es: 'El lugar era hermoso. Se sentía privado y seguro, y todo estaba muy limpio. Los anfitriones fueron amables y respetuosos, y la propiedad superó nuestras expectativas con base en las fotos. La ubicación es excelente, se puede caminar al pueblo y está cerca de la playa. Sin duda volveríamos. Valió completamente la pena el precio.',
      },
    },
    {
      reviewer: 'Alexa',
      rating: 5,
      date: 'March 2026',
      stayType: 'Stayed a few nights',
      text: {
        en: "Great place to stay! Walkable to everything, safe, nature is beautiful. It is warm but there is ample air conditioning. Woke up every morning to the birds chirping — had a lovely stay.",
        es: 'Un lugar excelente para hospedarse. Se puede caminar a todo, seguro y la naturaleza es hermosa. Hace calor pero hay abundante aire acondicionado. Nos despertamos cada mañana con el canto de los pájaros. Una estadía encantadora.',
      },
    },
    {
      reviewer: 'Kathy',
      location: 'Kelowna, Canada',
      rating: 5,
      date: 'November 2025',
      stayType: 'Stayed a few nights',
      text: {
        en: 'Our family of 3 really enjoyed our time in Puerto Viejo. We felt safe and the house was beautiful.',
        es: 'Nuestra familia de 3 personas disfrutó mucho nuestro tiempo en Puerto Viejo. Nos sentimos seguros y la casa era hermosa.',
      },
    },
  ],
};
