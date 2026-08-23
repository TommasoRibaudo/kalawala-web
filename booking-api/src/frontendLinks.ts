/**
 * frontendLinks.ts
 *
 * Builds absolute URLs back into the SPA's booking page, for guest-facing
 * links sent by email (payment-pending / deposit-instructions). Derives the
 * origin from the request that triggered the send, so one Lambda serves both
 * localhost and production without env var changes — the same trick already
 * used for PayPal's `return_url`/`cancel_url`.
 */

import type { BookingLanguage } from "./bookingSessions";
import { getHeader } from "./http/request";
import { BookingApiConfig, RouteRequest } from "./types";

/**
 * The SPA only bare-roots the "home" route for English (see `pathForKey()` in
 * src/routes.config.ts) — every other route, "book" included, is registered
 * under its locale prefix ("/en/book", "/es/book"). There is no legacy
 * redirect covering "/book" the way there is for prerendered listing pages,
 * so a bare "/book" path 404s.
 */
export function bookPathForLanguage(language: BookingLanguage): string {
  return language === "es" ? "/es/book" : "/en/book";
}

/**
 * Builds `${origin}${bookPath}?bookingSessionId=...&<extraParams>`, so the
 * guest lands on the booking page with the hold already resumed. Falls back
 * to `config.bookingPageBaseUrl` when the triggering request has no `Origin`
 * header (e.g. no live browser request in play); returns `undefined` when
 * neither is available, so callers can omit the link the same way they do
 * today when it can't be built.
 */
export function buildBookingPageUrl(
  session: { id: string; language: BookingLanguage },
  request: RouteRequest,
  config: BookingApiConfig,
  extraParams: Record<string, string> = {}
): string | undefined {
  const requestOrigin = getHeader(request.headers, "origin")?.trim();
  const origin = requestOrigin || config.bookingPageBaseUrl;
  if (!origin) {
    return undefined;
  }

  const params = new URLSearchParams({ bookingSessionId: session.id, ...extraParams });
  return `${origin.replace(/\/+$/, "")}${bookPathForLanguage(session.language)}?${params.toString()}`;
}
