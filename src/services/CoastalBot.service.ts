/**
 * coastal-bot chat widget loader.
 *
 * The widget is a third-party script: every message is sent to
 * coastal-bot.vercel.app together with the visitor's IP and `pageUrl:
 * location.href` — the full URL, query string included — and the
 * conversation is kept in localStorage. So it is gated twice:
 *
 *  - Consent. It loads only once the visitor has accepted analytics cookies,
 *    the same gate PostHog uses. Anyone who rejects or ignores the banner
 *    never downloads it. The privacy policy (src/i18n/content/privacy.tsx)
 *    describes it under Analytics.
 *  - Route. Never on the booking and guest-portal pages. Deposit-reminder
 *    emails land on /book?bookingSessionId=…&depositAccessToken=…, PayPal
 *    returns with ?token=<orderId>, and Booking.page.tsx only strips those
 *    after its resume call returns — a message sent before then would carry
 *    the token to coastal-bot. A visit that starts on one of these routes
 *    never loads the script. One that reaches them client-side, with the
 *    widget already running, gets the body class below, which hides it with
 *    display:none: with no UI there is no way to send a message, and the
 *    widget sends nothing else that includes the URL.
 *
 * Hidden, never removed, for the route gate: the widget redraws its own
 * <coastal-bot> element whenever <html lang> changes, so removing it does not
 * stick, while a class on <body> also covers any element it draws later.
 *
 * The <script> is injected rather than written into public/index.html so
 * the gates can run first. It must keep these exact attributes: the widget
 * reads data-bot-id from document.currentScript and derives its API host
 * from src, so it cannot be bundled, proxied or self-hosted. It is appended
 * to <body>, outside #root, so React never unmounts it on route changes.
 *
 * Positioning around the site's own bottom-right elements lives in
 * src/index.css and MessageTipContainer — the widget has no setting to move
 * its button, so those move instead.
 */
import { CookieConsentService } from './CookieConsent.service';
import { routeKeyForPath, type RouteKey } from '../routes.config';

const WIDGET_SRC = 'https://coastal-bot.vercel.app/widget.js';
const BOT_ID = '5e911985-7c2d-40b7-8357-887ba4341f1d';
const STORAGE_KEY = `coastal-bot:${BOT_ID}`;

/** On <body> while the widget must not be visible. Styled in src/index.css. */
export const COASTAL_BOT_OFF_CLASS = 'coastal-bot-off';

/** Routes whose URLs can carry booking session ids, deposit or PayPal tokens. */
const EXCLUDED_ROUTES: ReadonlySet<RouteKey> = new Set<RouteKey>([
  'book',
  'bookReturn',
  'bookConfirmed',
  'portal',
  'portalDetail',
]);

/**
 * Set when consent is withdrawn after the widget has run in this page load.
 * A running script cannot be unloaded, and it ignores a second copy of its
 * own tag, so a fresh instance is only possible after a full page load —
 * until then it stays hidden even if consent is granted again.
 */
let withdrawn = false;
let listening = false;

function hasConsent(): boolean {
  try {
    return CookieConsentService.hasConsent('analytics');
  } catch {
    return false;
  }
}

function isExcluded(pathname: string): boolean {
  const match = routeKeyForPath(pathname);
  return !!match && EXCLUDED_ROUTES.has(match.key);
}

function isInjected(): boolean {
  return !!document.querySelector(`script[src="${WIDGET_SRC}"]`);
}

function injectScript(): void {
  if (isInjected()) return;

  const script = document.createElement('script');
  script.src = WIDGET_SRC;
  script.async = true;
  script.setAttribute('data-bot-id', BOT_ID);
  document.body.appendChild(script);
}

/** Consent withdrawn: drop the bubble and the saved conversation. */
function withdraw(): void {
  withdrawn = true;
  document.querySelectorAll('coastal-bot').forEach((el) => el.remove());
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage unavailable; nothing was saved there either.
  }
}

/**
 * Bring the widget in line with the current consent state and route. Called
 * on every route change (CoastalBotGate in Router.tsx) and on every consent
 * change.
 */
export function syncCoastalBot(pathname: string = window.location.pathname): void {
  if (typeof window === 'undefined') return;

  const consent = hasConsent();
  if (!consent && isInjected() && !withdrawn) withdraw();

  const show = consent && !withdrawn && !isExcluded(pathname);
  if (show) injectScript();
  document.body.classList.toggle(COASTAL_BOT_OFF_CLASS, !show);

  if (listening) return;
  listening = true;
  CookieConsentService.onConsentChange(() => syncCoastalBot());
}
