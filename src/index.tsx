import React from 'react';
import ReactDOM from 'react-dom/client';
import { CookieConsentService } from './services/CookieConsent.service';
import { initPostHogIfConsented } from './services/PostHog.service';
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
