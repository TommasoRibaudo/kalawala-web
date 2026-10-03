import React from 'react';
import { Locale } from '../locales';

/**
 * Privacy Policy content — English and Spanish are the two languages this
 * business actually operates in (see the Footer's contact block: WhatsApp,
 * phone, and email are only ever shown in these two), so they're written and
 * maintained directly. Every other released locale falls back to the English
 * text via `privacyContent()`'s `?? privacy.en!`, the same shape used
 * elsewhere in this file's sibling `blog.tsx` (see `busHoursContent`) — a
 * missing legal translation should read as "the accurate English version",
 * never as a guessed one.
 *
 * This is a good-faith draft grounded in the data flows actually implemented
 * in this codebase (booking-api's data model, CookieConsentService's cookie
 * categories, and the anonymous pageview counters in
 * booking-api/migrations/0019_site_pageview_counts.sql) — it is not a
 * substitute for review by a lawyer familiar with Costa Rican law and GDPR
 * (this site draws EU visitors, so GDPR applies extraterritorially).
 */

export interface PrivacySection {
  heading: string;
  body: React.ReactNode;
}

export interface PrivacyContent {
  seoTitle: string;
  seoDescription: string;
  heading: string;
  effectiveDateLabel: string;
  effectiveDate: string;
  intro: React.ReactNode;
  sections: PrivacySection[];
  contactHeading: string;
  contactIntro: React.ReactNode;
}

const EFFECTIVE_DATE = '2026-10-02';

const privacy: Partial<Record<Locale, PrivacyContent>> = {
  en: {
    seoTitle: 'Privacy Policy | Reservas Kalawala',
    seoDescription:
      'How Reservas Kalawala collects, uses, and protects your information when you browse our site or book a vacation rental in Puerto Viejo, Costa Rica.',
    heading: 'Privacy Policy',
    effectiveDateLabel: 'Effective date',
    effectiveDate: EFFECTIVE_DATE,
    intro: (
      <>
        Reservas Kalawala ("we", "us", "our") operates this website and manages a small group of vacation rental
        properties in Puerto Viejo de Talamanca, Costa Rica. This policy explains what information we collect when
        you browse this site, request a quote, or book a stay with us, how we use it, who we share it with, and the
        choices and rights you have. It applies to every visitor, including visitors located in the European Union,
        the United Kingdom, and elsewhere.
      </>
    ),
    sections: [
      {
        heading: 'Information we collect',
        body: (
          <>
            <p>
              <strong>Booking and guest information.</strong> When you request a quote or make a reservation, we
              collect your name, email address, phone number, country, arrival and departure dates, number of
              guests, any message you send us, and — if you set one up to manage your reservation online — a
              password (stored only in hashed form, never in plain text). If you travel with a pet, we record that
              as well, since only some of our properties accept pets.
            </p>
            <p>
              <strong>Payment information.</strong> If you pay by PayPal, PayPal handles your card or account
              details directly — we never see or store your full card number. We keep a record of the payment
              reference and amount for our own accounting. If you pay by bank transfer, we ask you to upload a
              deposit receipt, which is stored securely and used only to confirm your payment.
            </p>
            <p>
              <strong>Communications.</strong> If you contact us — by WhatsApp, email, or through your reservation
              portal — we keep a record of that conversation so we can respond to you and any staff assisting with
              your stay.
            </p>
            <p>
              <strong>Cookies and similar technologies.</strong> See "Cookies and similar technologies" below.
            </p>
            <p>
              <strong>Technical and security information.</strong> Like most websites, our servers automatically log
              some technical information for every request (such as a hashed version of your IP address and browser
              type) to keep the booking system secure, prevent abuse of our booking and payment forms, and
              diagnose problems. This information is not used to identify you personally.
            </p>
          </>
        ),
      },
      {
        heading: 'How we use your information',
        body: (
          <ul>
            <li>To process your booking, quote, and payment, and to communicate with you about your reservation.</li>
            <li>To respond to questions, special requests, or help you get in touch through the reservation portal.</li>
            <li>To keep the booking and payment system secure and prevent fraud or abuse.</li>
            <li>To meet our legal, tax, and accounting obligations.</li>
            <li>
              To understand how our site is used and to show you relevant offers — only where you've given us
              consent to do so through the cookie banner (see below).
            </li>
          </ul>
        ),
      },
      {
        heading: 'Cookies and similar technologies',
        body: (
          <>
            <p>When you first visit this site, you're asked to choose which of the following you're comfortable with:</p>
            <ul>
              <li>
                <strong>Functional (always on).</strong> Cookies needed for the site and booking process to work at
                all — for example, remembering your language and your cookie preference itself. These aren't
                optional because the site can't function without them, and they aren't used to track you across
                other websites.
              </li>
              <li>
                <strong>Analytics (opt-in).</strong> Helps us understand which pages are useful and how visitors
                move through the booking flow, using Google Analytics and PostHog. Only active if you say yes.
                Accepting analytics also turns on our chat assistant (see below).
              </li>
              <li>
                <strong>Marketing (opt-in).</strong> Lets us and our advertising partners (Google, Meta) measure and
                improve advertising. Only active if you say yes.
              </li>
            </ul>
            <p>
              You can change your choice at any time, and we remember your preference for up to 12 months. If you
              decline analytics and marketing cookies, none of those tools run — we simply won't have that data
              about your visit.
            </p>
            <p>
              <strong>Chat assistant.</strong> If you accept analytics cookies, a chat button appears in the corner
              of the page (except on the booking and guest-portal pages). The assistant is provided by coastal-bot: when it loads, and whenever you send a
              message, your IP address, the page you're on and what you type are sent to coastal-bot to answer
              you. The conversation is kept in your browser for 30 minutes after your last message so it follows
              you between pages, and it's saved so we can review it. If you decline analytics, the chat never
              loads. Please don't share payment details in the chat.
            </p>
          </>
        ),
      },
      {
        heading: 'Anonymous traffic statistics',
        body: (
          <>
            <p>
              Separately from the cookies above, we also keep a simple, anonymous count of how many people view each
              page — for example, "42 people viewed the Geco listing page yesterday on mobile, arriving from a
              search engine." This runs for every visitor, including those who decline the cookie banner, because it
              cannot identify you: it uses no cookie, no device or browser fingerprint, and no IP address is ever
              stored against it. We only ever see totals, never anything tied to an individual visit or visitor, and
              this data is never shared with anyone outside Reservas Kalawala.
            </p>
          </>
        ),
      },
      {
        heading: 'Sharing your information',
        body: (
          <>
            <p>We share information with the following categories of providers, only as needed to run our business:</p>
            <ul>
              <li>
                <strong>Smoobu</strong>, our property management and booking software, to check availability and
                manage reservations across our properties.
              </li>
              <li><strong>PayPal</strong>, to process card and PayPal payments.</li>
              <li><strong>Amazon Web Services (AWS)</strong>, which hosts our booking system and website infrastructure.</li>
              <li><strong>Google and Meta</strong>, for analytics and advertising — only if you've given consent.</li>
              <li><strong>PostHog</strong>, for site analytics — only if you've given consent.</li>
              <li><strong>coastal-bot</strong>, which runs our chat assistant — only if you've given consent.</li>
            </ul>
            <p>We do not sell your personal information to anyone.</p>
          </>
        ),
      },
      {
        heading: 'International data transfers',
        body: (
          <>
            Our website and booking system are hosted in the United States. If you're visiting from the European
            Economic Area, the United Kingdom, or another region with data transfer rules, your information may be
            processed outside your country. We work with providers that maintain appropriate safeguards for
            handling information transferred internationally.
          </>
        ),
      },
      {
        heading: 'Data retention',
        body: (
          <>
            We keep booking and payment records for as long as needed to fulfil your reservation and for as long
            afterward as Costa Rican tax and accounting law requires. We keep messages and support conversations
            for as long as reasonably useful to assist you with your stay. Cookie preferences are remembered for up
            to 12 months, after which we'll ask again.
          </>
        ),
      },
      {
        heading: 'Your rights',
        body: (
          <>
            <p>Depending on where you live, you may have the right to:</p>
            <ul>
              <li>Ask what personal information we hold about you, and get a copy of it.</li>
              <li>Ask us to correct information that's wrong or incomplete.</li>
              <li>Ask us to delete your information, where we're not required to keep it for legal reasons.</li>
              <li>Object to, or ask us to restrict, certain uses of your information.</li>
              <li>Withdraw consent for analytics or marketing cookies at any time, with no effect on past processing.</li>
              <li>
                Lodge a complaint with your local data protection authority, if you believe we've handled your
                information improperly.
              </li>
            </ul>
            <p>To exercise any of these rights, contact us using the details below.</p>
          </>
        ),
      },
      {
        heading: "Children's privacy",
        body: (
          <>
            This site and our properties are not directed at children, and we do not knowingly collect personal
            information from children. If you believe a child has provided us with personal information, please
            contact us and we'll delete it.
          </>
        ),
      },
      {
        heading: 'Security',
        body: (
          <>
            We use reasonable technical and organizational measures to protect your information — including
            encrypted connections, hashed passwords, and access controls on our booking system. No method of
            transmission or storage is completely secure, but we work to protect your information appropriately.
          </>
        ),
      },
      {
        heading: 'Changes to this policy',
        body: (
          <>
            We may update this policy from time to time — for example, as our booking system or the tools we use
            change. We'll update the effective date above when we do. If changes are significant, we'll make that
            clear on this page.
          </>
        ),
      },
    ],
    contactHeading: 'Contact us',
    contactIntro: (
      <>
        If you have a question about this policy or want to exercise any of your rights, reach us at{' '}
        <a href="mailto:reservas.kalawala@gmail.com">reservas.kalawala@gmail.com</a>, by WhatsApp at{' '}
        <a href="https://wa.me/50684632276" target="_blank" rel="noopener noreferrer">+506 8463-2276</a>, or by mail
        at Puerto Viejo de Talamanca, Costa Rica.
      </>
    ),
  },

  es: {
    seoTitle: 'Política de Privacidad | Reservas Kalawala',
    seoDescription:
      'Cómo Reservas Kalawala recopila, utiliza y protege tu información cuando navegas nuestro sitio o reservas un alquiler vacacional en Puerto Viejo, Costa Rica.',
    heading: 'Política de Privacidad',
    effectiveDateLabel: 'Fecha de vigencia',
    effectiveDate: EFFECTIVE_DATE,
    intro: (
      <>
        Reservas Kalawala ("nosotros", "nuestro") opera este sitio web y administra un pequeño grupo de propiedades
        de alquiler vacacional en Puerto Viejo de Talamanca, Costa Rica. Esta política explica qué información
        recopilamos cuando navegas este sitio, solicitas una cotización o reservas una estadía con nosotros, cómo la
        utilizamos, con quién la compartimos y qué opciones y derechos tienes. Aplica a todos los visitantes,
        incluyendo quienes se encuentran en la Unión Europea, el Reino Unido y otros lugares.
      </>
    ),
    sections: [
      {
        heading: 'Información que recopilamos',
        body: (
          <>
            <p>
              <strong>Información de reserva y huésped.</strong> Cuando solicitas una cotización o haces una
              reserva, recopilamos tu nombre, correo electrónico, número de teléfono, país, fechas de llegada y
              salida, número de huéspedes, cualquier mensaje que nos envíes y — si configuras una para administrar
              tu reserva en línea — una contraseña (almacenada únicamente de forma cifrada, nunca en texto plano).
              Si viajas con una mascota, también lo registramos, ya que solo algunas de nuestras propiedades las
              aceptan.
            </p>
            <p>
              <strong>Información de pago.</strong> Si pagas con PayPal, PayPal maneja directamente los datos de tu
              tarjeta o cuenta — nunca vemos ni almacenamos tu número de tarjeta completo. Guardamos un registro de
              la referencia y el monto del pago para nuestra propia contabilidad. Si pagas por transferencia
              bancaria, te pedimos subir un comprobante de depósito, que se almacena de forma segura y se usa
              únicamente para confirmar tu pago.
            </p>
            <p>
              <strong>Comunicaciones.</strong> Si te comunicas con nosotros — por WhatsApp, correo electrónico o a
              través del portal de tu reserva — guardamos un registro de esa conversación para poder responderte a
              ti y al personal que colabora con tu estadía.
            </p>
            <p>
              <strong>Cookies y tecnologías similares.</strong> Ver "Cookies y tecnologías similares" más abajo.
            </p>
            <p>
              <strong>Información técnica y de seguridad.</strong> Como la mayoría de los sitios web, nuestros
              servidores registran automáticamente cierta información técnica de cada solicitud (como una versión
              cifrada de tu dirección IP y el tipo de navegador) para mantener el sistema de reservas seguro,
              prevenir el abuso de nuestros formularios de reserva y pago, y diagnosticar problemas. Esta
              información no se usa para identificarte personalmente.
            </p>
          </>
        ),
      },
      {
        heading: 'Cómo usamos tu información',
        body: (
          <ul>
            <li>Para procesar tu reserva, cotización y pago, y comunicarnos contigo sobre tu reservación.</li>
            <li>Para responder preguntas, solicitudes especiales o ayudarte a través del portal de reservas.</li>
            <li>Para mantener seguro el sistema de reservas y pagos, y prevenir fraude o abuso.</li>
            <li>Para cumplir con nuestras obligaciones legales, fiscales y contables.</li>
            <li>
              Para entender cómo se usa nuestro sitio y mostrarte ofertas relevantes — únicamente cuando nos hayas
              dado tu consentimiento a través del banner de cookies (ver abajo).
            </li>
          </ul>
        ),
      },
      {
        heading: 'Cookies y tecnologías similares',
        body: (
          <>
            <p>Cuando visitas este sitio por primera vez, se te pide elegir cuáles de las siguientes categorías aceptas:</p>
            <ul>
              <li>
                <strong>Funcionales (siempre activas).</strong> Cookies necesarias para que el sitio y el proceso de
                reserva funcionen — por ejemplo, recordar tu idioma y tu propia preferencia de cookies. No son
                opcionales porque el sitio no puede funcionar sin ellas, y no se usan para rastrearte en otros
                sitios web.
              </li>
              <li>
                <strong>Analíticas (opcionales).</strong> Nos ayudan a entender qué páginas son útiles y cómo se
                mueven los visitantes por el proceso de reserva, usando Google Analytics y PostHog. Solo se activan
                si aceptas. Aceptarlas también activa nuestro asistente de chat (ver abajo).
              </li>
              <li>
                <strong>Marketing (opcionales).</strong> Nos permiten a nosotros y a nuestros socios publicitarios
                (Google, Meta) medir y mejorar la publicidad. Solo se activan si aceptas.
              </li>
            </ul>
            <p>
              Puedes cambiar tu elección en cualquier momento, y recordamos tu preferencia hasta por 12 meses. Si
              rechazas las cookies de analítica y marketing, ninguna de esas herramientas se ejecuta — simplemente
              no tendremos esos datos sobre tu visita.
            </p>
            <p>
              <strong>Asistente de chat.</strong> Si aceptas las cookies analíticas, aparece un botón de chat en la
              esquina de la página (excepto en las páginas de reserva y del portal de huéspedes). El asistente lo provee coastal-bot: al cargarse, y cada vez que envías un
              mensaje, tu dirección IP, la página en la que estás y lo que escribes se envían a coastal-bot para
              responderte. La conversación se guarda en tu navegador durante 30 minutos desde tu último mensaje para
              que te acompañe entre páginas, y se almacena para que podamos revisarla. Si rechazas las analíticas,
              el chat nunca se carga. Por favor no compartas datos de pago en el chat.
            </p>
          </>
        ),
      },
      {
        heading: 'Estadísticas anónimas de tráfico',
        body: (
          <>
            <p>
              Aparte de las cookies mencionadas arriba, también mantenemos un conteo simple y anónimo de cuántas
              personas ven cada página — por ejemplo, "42 personas vieron la página de Geco ayer desde un celular,
              llegando desde un buscador". Esto ocurre para todos los visitantes, incluso quienes rechazan el banner
              de cookies, porque no puede identificarte: no usa cookies, ninguna huella de dispositivo o navegador,
              y nunca se almacena una dirección IP asociada. Solo vemos totales, nunca algo vinculado a una visita o
              visitante individual, y estos datos nunca se comparten fuera de Reservas Kalawala.
            </p>
          </>
        ),
      },
      {
        heading: 'Con quién compartimos tu información',
        body: (
          <>
            <p>Compartimos información con las siguientes categorías de proveedores, solo según sea necesario para operar nuestro negocio:</p>
            <ul>
              <li>
                <strong>Smoobu</strong>, nuestro software de gestión de propiedades y reservas, para verificar
                disponibilidad y administrar reservas en nuestras propiedades.
              </li>
              <li><strong>PayPal</strong>, para procesar pagos con tarjeta o PayPal.</li>
              <li><strong>Amazon Web Services (AWS)</strong>, que aloja nuestro sistema de reservas e infraestructura web.</li>
              <li><strong>Google y Meta</strong>, para analítica y publicidad — solo si has dado tu consentimiento.</li>
              <li><strong>PostHog</strong>, para analítica del sitio — solo si has dado tu consentimiento.</li>
              <li><strong>coastal-bot</strong>, que opera nuestro asistente de chat — solo si has dado tu consentimiento.</li>
            </ul>
            <p>No vendemos tu información personal a nadie.</p>
          </>
        ),
      },
      {
        heading: 'Transferencias internacionales de datos',
        body: (
          <>
            Nuestro sitio web y sistema de reservas están alojados en Estados Unidos. Si visitas desde el Espacio
            Económico Europeo, el Reino Unido u otra región con normas de transferencia de datos, tu información
            puede procesarse fuera de tu país. Trabajamos con proveedores que mantienen salvaguardas apropiadas para
            el manejo de información transferida internacionalmente.
          </>
        ),
      },
      {
        heading: 'Retención de datos',
        body: (
          <>
            Conservamos los registros de reserva y pago durante el tiempo necesario para cumplir tu reservación y,
            después de eso, durante el tiempo que exija la legislación fiscal y contable de Costa Rica. Conservamos
            mensajes y conversaciones de soporte durante el tiempo razonablemente útil para ayudarte con tu estadía.
            Las preferencias de cookies se recuerdan hasta por 12 meses, después de lo cual volveremos a
            preguntarte.
          </>
        ),
      },
      {
        heading: 'Tus derechos',
        body: (
          <>
            <p>Dependiendo de dónde vivas, es posible que tengas derecho a:</p>
            <ul>
              <li>Preguntar qué información personal tenemos sobre ti y obtener una copia.</li>
              <li>Pedirnos que corrijamos información incorrecta o incompleta.</li>
              <li>Pedirnos que eliminemos tu información, cuando no estemos obligados a conservarla por ley.</li>
              <li>Oponerte a, o pedirnos que restrinjamos, ciertos usos de tu información.</li>
              <li>Retirar tu consentimiento para cookies de analítica o marketing en cualquier momento, sin afectar el procesamiento previo.</li>
              <li>
                Presentar una queja ante tu autoridad local de protección de datos, si consideras que manejamos tu
                información de forma indebida.
              </li>
            </ul>
            <p>Para ejercer cualquiera de estos derechos, contáctanos usando los datos abajo.</p>
          </>
        ),
      },
      {
        heading: 'Privacidad de menores',
        body: (
          <>
            Este sitio y nuestras propiedades no están dirigidos a menores de edad, y no recopilamos
            conscientemente información personal de menores. Si crees que un menor nos ha proporcionado información
            personal, contáctanos y la eliminaremos.
          </>
        ),
      },
      {
        heading: 'Seguridad',
        body: (
          <>
            Usamos medidas técnicas y organizativas razonables para proteger tu información — incluyendo conexiones
            cifradas, contraseñas cifradas y controles de acceso en nuestro sistema de reservas. Ningún método de
            transmisión o almacenamiento es completamente seguro, pero trabajamos para proteger tu información de
            forma apropiada.
          </>
        ),
      },
      {
        heading: 'Cambios a esta política',
        body: (
          <>
            Podemos actualizar esta política de vez en cuando — por ejemplo, a medida que cambie nuestro sistema de
            reservas o las herramientas que usamos. Actualizaremos la fecha de vigencia arriba cuando lo hagamos. Si
            los cambios son significativos, lo indicaremos claramente en esta página.
          </>
        ),
      },
    ],
    contactHeading: 'Contáctanos',
    contactIntro: (
      <>
        Si tienes alguna pregunta sobre esta política o quieres ejercer alguno de tus derechos, contáctanos en{' '}
        <a href="mailto:reservas.kalawala@gmail.com">reservas.kalawala@gmail.com</a>, por WhatsApp al{' '}
        <a href="https://wa.me/50684632276" target="_blank" rel="noopener noreferrer">+506 8463-2276</a>, o por
        correo postal a Puerto Viejo de Talamanca, Costa Rica.
      </>
    ),
  },
};

export function privacyContent(locale: Locale): PrivacyContent {
  return privacy[locale] ?? privacy.en!;
}
