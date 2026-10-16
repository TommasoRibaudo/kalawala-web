/**
 * Site-owned chat button, shown while the coastal-bot widget cannot be.
 *
 * The widget is consent-gated (CoastalBot.service.ts): until the visitor has
 * accepted analytics cookies its script is never downloaded, so a visitor who
 * has not answered the banner — or who rejected it — had no sign that a chat
 * exists. This button stands in for it in the same corner, a moment after the
 * page loads, and sits ABOVE the cookie banner rather than being hidden by it.
 *
 *  - Already consented: clicking opens the real widget (waiting for it if the
 *    script is still loading).
 *  - Not consented: clicking asks first. Accepting grants analytics — the
 *    category the privacy policy files the assistant under — and nothing else;
 *    marketing keeps whatever the visitor had chosen. The banner closes with
 *    the choice, the widget loads and opens itself.
 *
 * It steps aside once the real widget is on the page, and for good if that
 * never happens (bot switched off, site not on its allowed list). Never on the
 * booking and portal routes, same as the widget.
 */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CookieConsentService } from '../../services/CookieConsent.service';
import {
  isCoastalBotRouteAllowed,
  openCoastalBot,
  whenCoastalBotReady,
} from '../../services/CoastalBot.service';
import { isPrerender } from '../../utils/isPrerender';
import { useMessages } from '../../i18n/useMessages';
import './ChatLauncher.style.scss';

const SHOW_DELAY_MS = 1500;
/** Gap between the launcher and the cookie banner it sits above. */
const BANNER_GAP_PX = 16;
/** The speech bubble comes up this long after the button, and stays this long. */
const TEASER_DELAY_MS = 2500;
const TEASER_STAY_MS = 15000;
/** Once per visit, like the widget's own pop-up: not again on the next page. */
const TEASER_SEEN_KEY = 'chat-launcher-teaser';

function teaserSeen(): boolean {
  try {
    return sessionStorage.getItem(TEASER_SEEN_KEY) === '1';
  } catch {
    return false;
  }
}

function markTeaserSeen(): void {
  try {
    sessionStorage.setItem(TEASER_SEEN_KEY, '1');
  } catch {
    // Storage blocked: the bubble may show again on the next page, no harm.
  }
}

type WidgetStatus = 'idle' | 'loading' | 'up' | 'failed';

function hasAnalyticsConsent(): boolean {
  try {
    return CookieConsentService.hasConsent('analytics');
  } catch {
    return false;
  }
}

const ChatLauncher: React.FC = () => {
  const m = useMessages().chatLauncher;
  const { pathname } = useLocation();

  const [delayElapsed, setDelayElapsed] = useState(false);
  const [consented, setConsented] = useState(false);
  const [status, setStatus] = useState<WidgetStatus>('idle');
  const [asking, setAsking] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const [bannerHeight, setBannerHeight] = useState(0);

  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const acceptRef = useRef<HTMLButtonElement>(null);

  // "A moment after load". Effects never run during the react-snap crawl's
  // first render, and the guard keeps them from baking the button into the
  // static pages (see utils/isPrerender.ts).
  useEffect(() => {
    if (isPrerender()) return;
    const timer = setTimeout(() => setDelayElapsed(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isPrerender()) return;
    setConsented(hasAnalyticsConsent());
    return CookieConsentService.onConsentChange(() => setConsented(hasAnalyticsConsent()));
  }, []);

  // Once consent is in, the real widget is on its way: keep this button until
  // it arrives so there is no gap, drop it for good if it never does.
  useEffect(() => {
    if (!consented) {
      setStatus('idle');
      return;
    }
    let cancelled = false;
    setStatus('loading');
    whenCoastalBotReady().then((el) => {
      if (!cancelled) setStatus(el ? 'up' : 'failed');
    });
    return () => {
      cancelled = true;
    };
  }, [consented]);

  // Stay above the cookie banner, whatever height it is at this width (its
  // buttons stack on phones, and "Options" expands it).
  useEffect(() => {
    if (isPrerender()) return;

    let resizeObserver: ResizeObserver | undefined;
    let watched: Element | null = null;

    const measure = () => {
      const banner = document.querySelector('.cookie-consent-banner');
      setBannerHeight(banner ? banner.getBoundingClientRect().height : 0);

      if (banner === watched) return;
      resizeObserver?.disconnect();
      watched = banner;
      if (banner && typeof ResizeObserver !== 'undefined') {
        resizeObserver = new ResizeObserver(measure);
        resizeObserver.observe(banner);
      }
    };

    measure();
    const mutationObserver = new MutationObserver(measure);
    mutationObserver.observe(document.body, { childList: true, subtree: true });
    window.addEventListener('resize', measure);

    return () => {
      mutationObserver.disconnect();
      resizeObserver?.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  const visible =
    delayElapsed &&
    isCoastalBotRouteAllowed(pathname) &&
    status !== 'up' &&
    status !== 'failed';

  // The speech bubble out of the button. Only while there is nothing else to
  // read: not once consented (the real widget has its own pop-up) and not
  // while the consent question is open in the same spot.
  useEffect(() => {
    if (!visible || consented || teaserSeen()) return;
    const show = setTimeout(() => {
      markTeaserSeen();
      setTeaser(true);
    }, TEASER_DELAY_MS);
    const hide = setTimeout(() => setTeaser(false), TEASER_DELAY_MS + TEASER_STAY_MS);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, [visible, consented]);

  const closeAsking = useCallback((returnFocus: boolean) => {
    setAsking(false);
    if (returnFocus) buttonRef.current?.focus();
  }, []);

  // The question is a popover, not a modal: dismissed by Escape or by a click
  // anywhere outside it.
  useEffect(() => {
    if (!asking) return;
    acceptRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeAsking(true);
    };
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) closeAsking(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('touchstart', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('touchstart', onPointerDown);
    };
  }, [asking, closeAsking]);

  const handleClick = () => {
    setTeaser(false);
    if (consented) {
      void openCoastalBot();
      return;
    }
    setAsking((open) => !open);
  };

  const handleAccept = () => {
    const previous = CookieConsentService.getConsentState();
    CookieConsentService.saveConsent({
      analytics: true,
      marketing: previous?.preferences.marketing ?? false,
      functional: true,
    });
    setAsking(false);
    void openCoastalBot();
  };

  if (!visible) return null;

  const bottom = bannerHeight > 0 ? bannerHeight + BANNER_GAP_PX : 20;

  return (
    <div
      ref={rootRef}
      className="chat-launcher"
      style={{ '--chat-launcher-bottom': `${bottom}px` } as React.CSSProperties}
    >
      {teaser && !asking && !consented && (
        <div className="chat-launcher__teaser">
          <button type="button" className="chat-launcher__teaser-text" onClick={handleClick}>
            {m.teaser}
          </button>
          <button
            type="button"
            className="chat-launcher__teaser-close"
            aria-label={m.dismiss}
            onClick={() => setTeaser(false)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
      {asking && (
        <div className="chat-launcher__ask" role="dialog" aria-label={m.open}>
          <p className="chat-launcher__ask-text">{m.consent}</p>
          <div className="chat-launcher__ask-actions">
            <button
              ref={acceptRef}
              type="button"
              className="chat-launcher__accept"
              onClick={handleAccept}
            >
              {m.accept}
            </button>
            <button
              type="button"
              className="chat-launcher__decline"
              onClick={() => closeAsking(true)}
            >
              {m.decline}
            </button>
          </div>
        </div>
      )}
      <button
        ref={buttonRef}
        type="button"
        className="chat-launcher__button"
        aria-label={m.open}
        aria-haspopup={consented ? undefined : 'dialog'}
        aria-expanded={consented ? undefined : asking}
        aria-busy={status === 'loading'}
        onClick={handleClick}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>
    </div>
  );
};

export default ChatLauncher;
