import { loadConfig } from "./config";
import { getPool } from "./db";
import { RdsHoldRepository } from "./holds";
import { createObservability } from "./observability";
import { createSmoobuClient } from "./smoobuClient";
import {
  runAvailabilityWatchdog,
  AvailabilityWatchdogResult,
  WatchdogMode,
} from "./availabilityWatchdog";
import { BookingApiConfig } from "./types";

interface WatchdogEvent {
  mode?: string;
  horizonDays?: number;
}

/**
 * Lambda entry point for the availability watchdog. Two EventBridge rules invoke
 * the same function with different payloads — see infra/availability_watchdog.tf:
 *
 *   { "mode": "reassert" }  every 10 minutes. Re-sends one close-push per stay
 *                           promoted in the last ~25 minutes. Handful of writes
 *                           a week; none once holds are born on channel 70.
 *   { "mode": "sweep" }     once a day. Read-only Smoobu check across the future
 *                           book; writes only where it finds a stay genuinely
 *                           back on sale.
 *
 * Defaults to "reassert" — the cheaper of the two — if the payload is missing or
 * malformed, so a misconfigured rule cannot accidentally schedule the heavier
 * job every ten minutes.
 *
 * Mirrors holdExpiryHandler.ts: the worker logic is fully testable against the
 * in-memory repository, and this file only does the RDS/Secrets Manager wiring.
 */
export async function handler(event: WatchdogEvent = {}): Promise<AvailabilityWatchdogResult> {
  const config = loadConfig();
  const mode = parseMode(event.mode);

  const observability = createObservability(config.observability);
  const logger = observability.createLogger({ worker: "availability-watchdog", mode });

  await ensureRepositories(config);

  if (!config.holds) {
    logger.warn("availability_watchdog_no_repositories", {
      note: "RDS-backed hold repository could not be initialised. Worker is a no-op.",
    });
    return {
      mode,
      checked: 0,
      closed: 0,
      reopened: 0,
      inconclusive: 0,
      reasserted: 0,
      reassertFailed: 0,
      findings: [],
    };
  }

  const smoobuClient = await createSmoobuClient(config);

  return runAvailabilityWatchdog({
    holds: config.holds,
    smoobuClient,
    logger,
    mode,
    customerId: config.smoobu.customerId,
    holdChannelId: config.smoobu.holdChannelId,
    ...(typeof event.horizonDays === "number" ? { horizonDays: event.horizonDays } : {}),
  });
}

function parseMode(value: unknown): WatchdogMode {
  return value === "sweep" ? "sweep" : "reassert";
}

async function ensureRepositories(config: BookingApiConfig): Promise<void> {
  if (config.holds) {
    return;
  }

  const pool = await getPool({ secretProvider: config.secrets });
  config.holds = new RdsHoldRepository(pool);
}
