import { getHeader } from "./http/request";
import { jsonResponse } from "./http/response";
import { getPool } from "./db";
import { ApiResponse, BookingApiConfig, RouteRequest } from "./types";
import { MetricsPageviewRequest } from "./validation";

export type DeviceCategory = "mobile" | "tablet" | "desktop" | "other";
export type ReferrerCategory = "direct" | "search" | "social" | "internal" | "other";

interface Queryable {
  query<Row extends object = Record<string, unknown>>(text: string, values?: unknown[]): Promise<{ rows: Row[] }>;
}

const MAX_PATH_LENGTH = 200;
const SAFE_PATH_PATTERN = /^\/[a-z0-9\-_/]*$/i;

// Substrings matched against the referrer's hostname only — never its path or
// query string, which can carry search terms or other visitor-entered text.
const SEARCH_ENGINE_HOSTS = ["google.", "bing.com", "duckduckgo.com", "search.yahoo.com", "yandex.", "ecosia.org"];
const SOCIAL_HOSTS = [
  "facebook.com",
  "instagram.com",
  "tiktok.com",
  "pinterest.",
  "twitter.com",
  "x.com",
  "linkedin.com",
  "reddit.com",
  "whatsapp.com",
];

/**
 * Strips query/hash and bounds the path so a hostile or buggy client can't
 * push arbitrary strings into the aggregate table. Anything that doesn't look
 * like a plain site path falls back to a single shared "/other" bucket rather
 * than being rejected — a malformed path is a reason to bucket it, not to
 * fail the (harmless, best-effort) beacon.
 */
export function normalizePagePath(rawPath: string): string {
  if (!rawPath) return "/other";

  const withoutQueryOrHash = rawPath.split(/[?#]/)[0].trim();
  const withLeadingSlash = withoutQueryOrHash.startsWith("/") ? withoutQueryOrHash : `/${withoutQueryOrHash}`;
  const bounded = withLeadingSlash.slice(0, MAX_PATH_LENGTH);
  const withoutTrailingSlash = bounded.length > 1 ? bounded.replace(/\/+$/, "") : bounded;
  const finalPath = withoutTrailingSlash || "/";

  return SAFE_PATH_PATTERN.test(finalPath) ? finalPath : "/other";
}

/** Lightweight User-Agent bucketing. No new dependency — this only needs four buckets. */
export function classifyDeviceCategory(userAgent?: string): DeviceCategory {
  if (!userAgent) return "other";

  const ua = userAgent.toLowerCase();
  if (/ipad|tablet|(android(?!.*mobile))/.test(ua)) return "tablet";
  if (/mobi|iphone|ipod|android/.test(ua)) return "mobile";
  if (/mozilla|chrome|safari|firefox|edg\/|opr\//.test(ua)) return "desktop";
  return "other";
}

/**
 * Buckets the Referer header by hostname only. Deliberately never reads the
 * current request's own query string (gclid, utm_source, ...) — that paid
 * attribution signal belongs to the separate, consented tracking_identifiers
 * path (migration 0016), not this consent-exempt anonymous counter.
 */
export function classifyReferrerCategory(referrerHeader: string | undefined, allowedOrigins: string[]): ReferrerCategory {
  if (!referrerHeader) return "direct";

  let hostname: string;
  try {
    hostname = new URL(referrerHeader).hostname.toLowerCase();
  } catch {
    return "other";
  }

  const isOwnOrigin = allowedOrigins.some((origin) => {
    try {
      return new URL(origin).hostname.toLowerCase() === hostname;
    } catch {
      return false;
    }
  });
  if (isOwnOrigin) return "internal";

  if (SEARCH_ENGINE_HOSTS.some((host) => hostname.includes(host))) return "search";
  if (SOCIAL_HOSTS.some((host) => hostname.includes(host))) return "social";

  return "other";
}

export interface PageviewCounterKey {
  day: string;
  path: string;
  language: string;
  deviceCategory: DeviceCategory;
  referrerCategory: ReferrerCategory;
}

export async function recordPageview(pool: Queryable, key: PageviewCounterKey): Promise<void> {
  await pool.query(
    `insert into site_pageview_counts (day, path, language, device_category, referrer_category, pageview_count)
     values ($1, $2, $3, $4, $5, 1)
     on conflict (day, path, language, device_category, referrer_category)
     do update set pageview_count = site_pageview_counts.pageview_count + 1, updated_at = now()`,
    [key.day, key.path, key.language, key.deviceCategory, key.referrerCategory]
  );
}

function todayUtc(): string {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Handles the anonymous, consent-exempt pageview beacon. Reads only the
 * User-Agent and Referer headers to derive bucket labels server-side — never
 * request.clientIp, and never anything from the client-supplied body beyond
 * path/language — so no identifier of any kind ever reaches this table.
 */
export async function handleRecordPageview(
  body: MetricsPageviewRequest,
  request: RouteRequest,
  config: BookingApiConfig
): Promise<ApiResponse> {
  const pool = await getPool({ secretProvider: config.secrets });

  await recordPageview(pool, {
    day: todayUtc(),
    path: normalizePagePath(body.path),
    language: body.language,
    deviceCategory: classifyDeviceCategory(request.userAgent ?? getHeader(request.headers, "user-agent")),
    referrerCategory: classifyReferrerCategory(getHeader(request.headers, "referer"), config.allowedOrigins),
  });

  return jsonResponse(200, { status: "ok" }, request.responseHeaders);
}
