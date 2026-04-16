import { BookingApiConfig, LogLevel } from "./types";
import { createSecretProvider } from "./secrets";

const DEFAULT_MAX_BODY_BYTES = 64 * 1024;
const DEFAULT_MAX_TRACKED_RATE_LIMIT_BUCKETS = 10_000;
const DEFAULT_SERVICE_NAME = "booking-api";
const DEFAULT_SMOOBU_BASE_URL = "https://login.smoobu.com";
const DEFAULT_SMOOBU_TIMEOUT_MS = 8_000;
const DEFAULT_SMOOBU_MAX_RETRIES = 3;
const DEFAULT_SMOOBU_BASE_BACKOFF_MS = 250;
const DEFAULT_SMOOBU_MAX_BACKOFF_MS = 2_000;
const DEFAULT_SMOOBU_MAX_RATE_LIMIT_DELAY_MS = 60_000;
const DEFAULT_SMOOBU_HOLD_CHANNEL_ID = 11;
const DEFAULT_PAYPAL_HOLD_TTL_MINUTES = 60;
const DEFAULT_IDEMPOTENCY_TTL_MINUTES = 24 * 60;
const DEFAULT_STALE_IDEMPOTENCY_LOCK_SECONDS = 120;

function splitCsv(value: string | undefined): string[] {
  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseMaxBodyBytes(value: string | undefined): number {
  if (!value) {
    return DEFAULT_MAX_BODY_BYTES;
  }

  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    return DEFAULT_MAX_BODY_BYTES;
  }

  return parsed;
}

function parseBoolean(value: string | undefined, defaultValue: boolean): boolean {
  if (!value) {
    return defaultValue;
  }

  const normalized = value.trim().toLowerCase();
  if (["1", "true", "yes", "on"].includes(normalized)) {
    return true;
  }
  if (["0", "false", "no", "off"].includes(normalized)) {
    return false;
  }

  return defaultValue;
}

function parsePositiveInteger(value: string | undefined, defaultValue: number): number {
  if (!value) {
    return defaultValue;
  }

  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    return defaultValue;
  }

  return parsed;
}

function parseLogLevel(value: string | undefined): LogLevel {
  const normalized = value?.trim().toLowerCase();
  if (normalized === "debug" || normalized === "info" || normalized === "warn" || normalized === "error" || normalized === "silent") {
    return normalized;
  }

  return "info";
}

export function loadConfig(env: NodeJS.ProcessEnv = process.env): BookingApiConfig {
  return {
    allowedOrigins: splitCsv(env.BOOKING_API_ALLOWED_ORIGINS),
    maxBodyBytes: parseMaxBodyBytes(env.BOOKING_API_MAX_BODY_BYTES),
    secrets: createSecretProvider(env),
    smoobu: {
      baseUrl: normalizeBaseUrl(env.SMOOBU_BASE_URL, DEFAULT_SMOOBU_BASE_URL),
      customerId: parseOptionalPositiveInteger(env.SMOOBU_CUSTOMER_ID, "SMOOBU_CUSTOMER_ID"),
      timeoutMs: parsePositiveInteger(env.SMOOBU_TIMEOUT_MS, DEFAULT_SMOOBU_TIMEOUT_MS),
      maxRetries: parseNonNegativeInteger(env.SMOOBU_MAX_RETRIES, DEFAULT_SMOOBU_MAX_RETRIES),
      baseBackoffMs: parsePositiveInteger(env.SMOOBU_BASE_BACKOFF_MS, DEFAULT_SMOOBU_BASE_BACKOFF_MS),
      maxBackoffMs: parsePositiveInteger(env.SMOOBU_MAX_BACKOFF_MS, DEFAULT_SMOOBU_MAX_BACKOFF_MS),
      maxRateLimitDelayMs: parsePositiveInteger(
        env.SMOOBU_MAX_RATE_LIMIT_DELAY_MS,
        DEFAULT_SMOOBU_MAX_RATE_LIMIT_DELAY_MS
      ),
      holdChannelId: parseSmoobuHoldChannelId(env.SMOOBU_HOLD_CHANNEL_ID),
    },
    hold: {
      defaultTtlMinutes: parsePositiveInteger(env.PAYPAL_HOLD_TTL_MINUTES, DEFAULT_PAYPAL_HOLD_TTL_MINUTES),
      idempotencyTtlMinutes: parsePositiveInteger(
        env.BOOKING_API_IDEMPOTENCY_TTL_MINUTES,
        DEFAULT_IDEMPOTENCY_TTL_MINUTES
      ),
      staleIdempotencyLockSeconds: parsePositiveInteger(
        env.BOOKING_API_STALE_IDEMPOTENCY_LOCK_SECONDS,
        DEFAULT_STALE_IDEMPOTENCY_LOCK_SECONDS
      ),
    },
    abuseProtection: {
      enabled: parseBoolean(env.BOOKING_API_ABUSE_PROTECTION_ENABLED, true),
      captchaChallengesEnabled: parseBoolean(env.BOOKING_API_CAPTCHA_CHALLENGES_ENABLED, true),
      maxTrackedBuckets: parsePositiveInteger(
        env.BOOKING_API_RATE_LIMIT_MAX_BUCKETS,
        DEFAULT_MAX_TRACKED_RATE_LIMIT_BUCKETS
      ),
    },
    observability: {
      serviceName: env.BOOKING_API_SERVICE_NAME?.trim() || DEFAULT_SERVICE_NAME,
      environment: env.BOOKING_API_ENVIRONMENT?.trim() || env.NODE_ENV?.trim() || "local",
      logLevel: parseLogLevel(env.BOOKING_API_LOG_LEVEL),
      metricsEnabled: parseBoolean(env.BOOKING_API_METRICS_ENABLED, true),
    },
  };
}

function parseSmoobuHoldChannelId(value: string | undefined): 11 | 13 {
  if (!value) {
    return DEFAULT_SMOOBU_HOLD_CHANNEL_ID;
  }

  const parsed = Number(value);
  if (parsed === 11 || parsed === 13) {
    return parsed;
  }

  // eslint-disable-next-line no-console
  console.warn(`[booking-api] Ignoring invalid SMOOBU_HOLD_CHANNEL_ID value: expected 11 or 13, got "${value}"`);
  return DEFAULT_SMOOBU_HOLD_CHANNEL_ID;
}

function parseOptionalPositiveInteger(value: string | undefined, envName?: string): number | undefined {
  if (!value) {
    return undefined;
  }

  const parsed = Number(value);
  if (Number.isInteger(parsed) && parsed > 0) {
    return parsed;
  }

  if (envName) {
    // eslint-disable-next-line no-console
    console.warn(`[booking-api] Ignoring invalid ${envName} value: expected a positive integer, got "${value}"`);
  }

  return undefined;
}

function parseNonNegativeInteger(value: string | undefined, defaultValue: number): number {
  if (!value) {
    return defaultValue;
  }

  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 0) {
    return defaultValue;
  }

  return parsed;
}

function normalizeBaseUrl(value: string | undefined, defaultValue: string): string {
  const raw = value?.trim() || defaultValue;
  try {
    const parsed = new URL(raw);
    // Env parsing fails closed to the production Smoobu origin; the client
    // constructor still re-validates for manually constructed test clients.
    if (parsed.protocol !== "https:" && parsed.hostname !== "localhost") {
      return defaultValue;
    }
    return parsed.toString().replace(/\/+$/, "");
  } catch {
    return defaultValue;
  }
}
