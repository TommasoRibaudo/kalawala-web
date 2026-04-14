import { BookingApiConfig } from "./types";

const DEFAULT_MAX_BODY_BYTES = 64 * 1024;
const DEFAULT_MAX_TRACKED_RATE_LIMIT_BUCKETS = 10_000;

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

export function loadConfig(env: NodeJS.ProcessEnv = process.env): BookingApiConfig {
  return {
    allowedOrigins: splitCsv(env.BOOKING_API_ALLOWED_ORIGINS),
    maxBodyBytes: parseMaxBodyBytes(env.BOOKING_API_MAX_BODY_BYTES),
    smoobuWebhookSecret: env.SMOOBU_WEBHOOK_SECRET,
    abuseProtection: {
      enabled: parseBoolean(env.BOOKING_API_ABUSE_PROTECTION_ENABLED, true),
      captchaChallengesEnabled: parseBoolean(env.BOOKING_API_CAPTCHA_CHALLENGES_ENABLED, true),
      maxTrackedBuckets: parsePositiveInteger(
        env.BOOKING_API_RATE_LIMIT_MAX_BUCKETS,
        DEFAULT_MAX_TRACKED_RATE_LIMIT_BUCKETS
      ),
    },
  };
}
