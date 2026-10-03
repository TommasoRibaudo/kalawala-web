import React from 'react';
import ReactDOM from 'react-dom/client';
import { CookieConsentService } from './services/CookieConsent.service';
import { initPostHogIfConsented } from './services/PostHog.service';
import { routeKeyForPath } from './routes.config';
import { preloadRoute, type LoadableKey } from './routeLoader';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/styles/style.css'
// styles/scss/style.scss is an aggregate: it already @imports variables,
// mixins, common and every remaining template partial. Those partials used to
// be listed again here, so the whole Themefisher template was compiled into
// the bundle twice. Only the sheets that style.scss does NOT cover are listed.
import '../src/styles/_typography.scss'
import '../src/styles/scss/style.scss'

// Replay stored consent for returning visitors. Consent Mode defaults to denied
// in index.html on every load, so without this a visitor who accepted last week
// would still be tracked cookieless today.
const storedConsent = CookieConsentService.getConsentState();
if (storedConsent) {
  CookieConsentService.syncGoogleConsent(storedConsent.preferences);
}

// posthog.init() used to run right here, at module scope, on every page load.
// It now happens inside the analytics chunk, fetched on idle and only for
// visitors who have already accepted analytics cookies — everyone else never
// downloads the library. See services/PostHog.service.ts.
initPostHogIfConsented();

const rootElement = document.getElementById('root') as HTMLElement;

/*
 * Hydration cause #3 (docs/i18n-rollout-plan.md, Phase 11 P2): resolve and
 * cache the current URL's route component BEFORE the first render call.
 * hydrateRoot's first pass reconciles synchronously against the existing
 * (pre-rendered) DOM — anything that only resolves later, an effect or a
 * React.lazy() throw, is too late to avoid a mismatch, since react-snap's
 * prerendered HTML has no hydration markers for React to fall back on. See
 * routeLoader.tsx's header comment for the full mechanism, and Router.tsx's
 * <RouteLoader> — its cache-hit branch, taken here because of this pre-warm,
 * is the only branch safe to take on this first render.
 *
 * react-snap's own crawl runs this exact module too (fresh page/context per
 * URL, rootElement empty on first paint, same as a real cold visitor), so
 * pre-warming benefits the prerendered snapshot as well as real hydration.
 */
const initialRouteMatch = routeKeyForPath(window.location.pathname);
const initialRouteKey: LoadableKey = initialRouteMatch ? initialRouteMatch.key : 'notFound';

function mount(): void {
  if (rootElement.hasChildNodes()) {
    // Pre-rendered by react-snap — hydrate instead of full render
    ReactDOM.hydrateRoot(rootElement, <App />);
  } else {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      // <React.StrictMode>
        <App />
      // </React.StrictMode>
    );
  }
}

// A failed initial chunk load must not leave the page permanently
// un-mounted (strictly worse than today's transient hydration error) — log
// and mount anyway. <RouteLoader> falls back to its own effect-driven retry
// for whatever didn't warm in time.
preloadRoute(initialRouteKey)
  .catch((error) => {
    console.error(`[index] failed to preload initial route "${initialRouteKey}"`, error);
  })
  .then(mount);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
