import { loadConfig } from "./config";
import { createObservability } from "./observability";
import { createSmoobuClient } from "./smoobuClient";
import { processExpiredHolds, HoldExpiryResult } from "./holdExpiry";
import { BookingApiConfig } from "./types";

/**
 * Lambda entry point for the scheduled hold expiry worker.
 * Triggered by EventBridge rule (e.g. rate(1 minute)).
 *
 * TODO(rds): Replace getHoldRepository / getBookingSessionRepository with
 * RDS-backed implementations once the database persistence layer lands.
 * Until then, this handler is a functional no-op in deployed environments
 * because the in-memory fallback repos start empty on every cold start.
 * The core logic in processExpiredHolds is fully tested and ready for
 * real repositories.
 */
export async function handler(): Promise<HoldExpiryResult> {
  const config = loadConfig();

  const observability = createObservability(config.observability);
  const logger = observability.createLogger({ worker: "hold-expiry" });

  if (!config.bookingSessions || !config.holds) {
    logger.warn("hold_expiry_no_repositories", {
      hasBookingSessions: !!config.bookingSessions,
      hasHolds: !!config.holds,
      note: "RDS-backed repositories not yet wired. Worker is a no-op until persistence layer lands.",
    });
    return {
      processed: 0,
      expired: 0,
      smoobuCancelled: 0,
      smoobuCancelFailed: 0,
      sessionUpdateFailed: 0,
      errors: [],
    };
  }

  const smoobuClient = await createSmoobuClient(config);

  return processExpiredHolds({
    holds: config.holds,
    bookingSessions: config.bookingSessions,
    smoobuClient,
    logger,
  });
}
