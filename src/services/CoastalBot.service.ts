/**
 * coastal-bot chat widget loader.
 *
 * The widget is a third-party script: every message (plus the visitor's IP and
 * the current page URL) goes to coastal-bot.vercel.app, and the conversation
 * is kept in localStorage. It is therefore opt-in, and loads only once the
 * visitor has accepted analytics cookies — the same gate PostHog uses. Anyone
 * who rejects or ignores the banner never downloads it. The privacy policy
 * (src/i18n/content/privacy.tsx) describes it under Analytics.
 *
 * The <script> is injected rather than written into public/index.html so the
 * gate can run first. It must keep these exact attributes: the widget reads
 * data-bot-id from document.currentScript and derives its API host from src,
 * so it cannot be bundled, proxied or self-hosted. It is appended to <body>,
 * outside #root, so React never unmounts it on route changes, and the widget
 * itself ignores a second copy, so calling this more than once is harmless.
 *
 * Where the bubble would cover the sticky Reserve bar, the cookie banner or a
 * MessageTip, src/index.css hides it — the widget has no setting to move it.
 */
import { CookieConsentService } from './CookieConsent.service';

const WIDGET_SRC = 'https://coastal-bot.vercel.app/widget.js';
const BOT_ID = '5e911985-7c2d-40b7-8357-887ba4341f1d';
const STORAGE_KEY = `coastal-bot:${BOT_ID}`;

function hasConsent(): boolean {
  try {
    return CookieConsentService.hasConsent('analytics');
  } catch {
    return false;
  }
}

function injectScript(): void {
  if (document.querySelector(`script[src="${WIDGET_SRC}"]`)) return;

  const script = document.createElement('script');
  script.src = WIDGET_SRC;
  script.async = true;
  script.setAttribute('data-bot-id', BOT_ID);
  document.body.appendChild(script);
}

/**
 * Consent withdrawn: remove the bubble and the saved conversation. The script
 * itself stays in memory until the next page load, but with its element gone
 * it has nothing left to send from.
 */
function teardown(): void {
  document.querySelectorAll('coastal-bot').forEach((el) => el.remove());
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage unavailable; nothing was saved there either.
  }
}

let listening = false;

export function initCoastalBotIfConsented(): void {
  if (typeof window === 'undefined') return;

  if (hasConsent()) injectScript();

  if (listening) return;
  listening = true;
  CookieConsentService.onConsentChange(() => {
    if (hasConsent()) {
      injectScript();
    } else {
      teardown();
    }
  });
}
