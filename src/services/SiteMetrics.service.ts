/**
 * Anonymous, consent-exempt pageview beacon.
 *
 * GA4/PostHog/Meta Pixel (see CookieConsentService) only fire after explicit
 * opt-in, so a pending or rejecting visitor is invisible to every analytics
 * tool the site has. This beacon is the narrow exception: it sends only a
 * page path and language, with no cookie, no localStorage id, and no
 * identifying header, to a backend endpoint that folds it straight into an
 * aggregate counter (booking-api/src/siteMetrics.ts,
 * migrations/0019_site_pageview_counts.sql) and never a per-visit row.
 *
 * Deliberately does NOT check CookieConsentService anywhere in this file —
 * that is the whole point of the exemption this relies on. Do not add a
 * consent gate here; see the migration file for the full rationale.
 */

import { Locale } from '../i18n';

const apiBaseUrl = (process.env.REACT_APP_BOOKING_API_BASE_URL || '').replace(/\/$/, '');
const PAGEVIEW_ENDPOINT = `${apiBaseUrl}/api/metrics/pageview`;

export function recordPageview(path: string, language: Locale): void {
  try {
    const payload = JSON.stringify({ path, language });

    if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
      const sent = navigator.sendBeacon(PAGEVIEW_ENDPOINT, new Blob([payload], { type: 'application/json' }));
      if (sent) return;
    }

    void fetch(PAGEVIEW_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      keepalive: true,
    }).catch(() => {
      // Best-effort only — a dropped pageview count must never surface to the visitor.
    });
  } catch {
    // Same as above: this beacon must never throw into its caller.
  }
}
