import { loadConfig } from "./config";
import { createObservability } from "./observability";
import { createSmoobuClient } from "./smoobuClient";
import { processExpiredHolds, HoldExpiryResult } from "./holdExpiry";
import { BookingApiConfig } from "./types";

/**
 * Lambda entry point for the scheduled hold expiry worker.
 * Triggered by EventBridge rule (e.g. rate(1 minute)).
 *
 * IMPORTANT — Repository wiring:
 * loadConfig() does not yet populate `bookingSessions` or `holds` because
 * the RDS persistence layer has not landed. When it does, loadConfig() must
 * be updated to instantiate the RDS-backed repositories and assign them to
 * config.bookingSessions and config.holds. Without that change this handler
 * remains a no-op. The same applies to paymentReconciliationHandler.ts.
 *
 * The core logic in processExpiredHolds is fully tested with in-memory
 * repositories and ready for real ones.
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
