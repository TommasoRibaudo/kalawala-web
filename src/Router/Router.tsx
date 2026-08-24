import React from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { CookieConsentService } from '../services/CookieConsent.service';
import * as PostHog from '../services/PostHog.service';
import MessageTipContainer from '../components/MessageTip/MessageTipContainer.component';
import { useRandomPopup } from '../hooks/useRandomPopup';
import PortalGuard from '../components/PortalGuard/PortalGuard.component';
import { useLocale, RELEASED_LOCALES } from '../i18n';
import LocaleHtmlAttrs from '../components/LocaleHtmlAttrs/LocaleHtmlAttrs.component';
import { ROUTES, pathForKey, RouteKey } from '../routes.config';
import { RouteLoader } from '../routeLoader';

/*
 * Every routed page is declared once in src/routes.config.ts — key,
 * loadable module, webpackChunkName, and its slug in each locale — and this
 * file turns that table into the actual <Route> tree, one element per
 * (key, released locale) pair.
 *
 * No React.lazy()/<Suspense> anywhere in this file (or the rest of the
 * app) — see routeLoader.tsx's header comment for why: react-snap's
 * marker-less prerendered output can't hydrate cleanly against a Suspense
 * boundary, regardless of whether its child actually suspends on a given
 * render. <RouteLoader> is a plain promise-based loader instead;
 * index.tsx pre-warms the current page's entry before the first render so
 * <RouteLoader> takes its synchronous cache-hit branch on that render.
 *
 * The webpackChunkName comments living in routes.config.ts are still
 * load-bearing: scripts/inject-route-preloads.js recomputes those names
 * after build and fails if one goes missing from asset-manifest.json.
 */
const ROUTE_ELEMENTS: React.ReactNode[] = (Object.keys(ROUTES) as RouteKey[]).flatMap((key) => {
  return RELEASED_LOCALES.map((locale) => {
    const path = pathForKey(key, locale);
    const element = key === 'portalDetail'
      ? <PortalGuard><RouteLoader routeKey={key} /></PortalGuard>
      : <RouteLoader routeKey={key} />;
    return <Route key={`${key}-${locale}`} path={path} element={element} />;
  });
});

// Component to capture pageviews on route changes and manage PostHog consent
const PostHogPageView = () => {
  const location = useLocation();
  // gtag's own 'config' call already sends GA4's automatic page_view for the
  // first URL of the session (see public/index.html); this ref skips that
  // first render so client-side route changes don't double-count it.
  const isFirstRender = React.useRef(true);

  // Opt-in/out when consent changes
  React.useEffect(() => {
    const cleanup = CookieConsentService.onConsentChange((state) => {
      if (state.preferences.analytics) {
        PostHog.optIn();
      } else {
        PostHog.optOut();
      }
    });
    return cleanup;
  }, []);

  // Capture pageview only if analytics consent is given
  React.useEffect(() => {
    if (CookieConsentService.hasConsent('analytics')) {
      PostHog.capture('$pageview');
    }

    // GA4 only auto-tracks the initial full page load; without this, every
    // client-side route change (e.g. a blog post linking into /book) is
    // invisible to GA4 pageview-based reports and explorations.
    if (!isFirstRender.current && CookieConsentService.hasConsent('analytics') && typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_location: window.location.href,
        page_path: location.pathname + location.search,
        page_title: document.title,
      });
    }
    isFirstRender.current = false;
  }, [location]);

  return null;
};

// Component to handle random popup logic inside Router context
const RandomPopupHandler = () => {
  // Was a fourth hand-rolled copy of the Spanish-route check; now the shared
  // detector. useRandomPopup still takes a boolean — it moves to a locale with
  // the message catalogs in Phase 2.
  const locale = useLocale();

  useRandomPopup({ locale });

  return null; // This component doesn't render anything
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <LocaleHtmlAttrs />
      <PostHogPageView />
      <RandomPopupHandler />
      <Routes>
        {ROUTE_ELEMENTS}

        {/*
          English keeps the bare root ('/') as its canonical home — see
          pathForKey() in routes.config.ts. '/en' and '/en/' would otherwise
          be a second, duplicate-content copy of the same page, so both
          redirect client-side. Phase 5 adds the equivalent server-level
          301 in public/.htaccess for crawlers and direct hits that never
          load the SPA; this covers in-app navigation and dev.
        */}
        <Route path="/en" element={<Navigate to="/" replace />} />
        <Route path="/en/" element={<Navigate to="/" replace />} />

        {/*
          A dedicated route, separate from the "*" catch-all below, so
          react-snap (which navigates to explicit paths, not wildcards — see
          package.json's reactSnap.include) can prerender a static 404.html.
          scripts/generate-404.js copies the resulting build/404/index.html
          to build/404.html, and .htaccess serves it with a real HTTP 404
          status via ErrorDocument, instead of the soft-404 (200 + blank/
          generic page) unknown URLs used to get.
        */}
        <Route path="/404" element={<RouteLoader routeKey="notFound" />} />
        <Route path="*" element={<RouteLoader routeKey="notFound" />} />
      </Routes>
      <MessageTipContainer />
    </BrowserRouter>
  );
};

export default AppRouter;
