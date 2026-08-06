import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation } from 'react-router-dom';
import { detectLocaleFromPath } from '../i18n';

/**
 * Catch-all 404.
 *
 * The router previously had no `*` route, so any unmatched URL rendered an
 * empty page with the index.html <title> — a soft 404 that search engines
 * index as a real, empty page. `noindex` plus a genuine message is the
 * minimum honest response.
 *
 * Language is inferred the same way the rest of the app does it: Spanish
 * routes end in "ES" (see hooks/useLanguageDetection.ts).
 */
const NotFound = () => {
  const { pathname } = useLocation();
  const locale = detectLocaleFromPath(pathname);

  const copy = (locale === 'es')
    ? {
        title: 'Página no encontrada | Reservas Kalawala',
        heading: 'No encontramos esta página',
        body: 'Es posible que el enlace esté roto o que la página se haya movido.',
        cta: 'Volver al inicio',
        home: '/HomeES',
      }
    : {
        title: 'Page not found | Reservas Kalawala',
        heading: 'We could not find that page',
        body: 'The link may be broken, or the page may have moved.',
        cta: 'Back to home',
        home: '/',
      };

  return (
    <main className="container" style={{ padding: '120px 16px', textAlign: 'center' }}>
      <Helmet>
        <html lang={(locale === 'es') ? 'es' : 'en'} />
        <title>{copy.title}</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <h1>404</h1>
      <h2>{copy.heading}</h2>
      <p>{copy.body}</p>
      <Link className="btn btn-main" to={copy.home}>
        {copy.cta}
      </Link>
    </main>
  );
};

export default NotFound;
