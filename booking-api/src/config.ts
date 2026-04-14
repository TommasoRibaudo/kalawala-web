import { BookingApiConfig } from "./types";

const DEFAULT_MAX_BODY_BYTES = 64 * 1024;

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

export function loadConfig(env: NodeJS.ProcessEnv = process.env): BookingApiConfig {
  return {
    allowedOrigins: splitCsv(env.BOOKING_API_ALLOWED_ORIGINS),
    maxBodyBytes: parseMaxBodyBytes(env.BOOKING_API_MAX_BODY_BYTES),
    smoobuWebhookSecret: env.SMOOBU_WEBHOOK_SECRET,
  };
}
