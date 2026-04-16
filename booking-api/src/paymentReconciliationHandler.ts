import { loadConfig } from "./config";
import { createObservability } from "./observability";
import { createPayPalClient } from "./paypalClient";
import { reconcilePendingPayments, ReconciliationResult } from "./paymentReconciliation";

/**
 * Lambda entry point for the scheduled payment reconciliation worker.
 * Triggered by EventBridge rule (e.g. rate(5 minutes)).
 *
 * Checks all "pending PayPal" sessions against the PayPal Orders API
 * and resolves missing webhooks or stale/abandoned payments.
 *
 * IMPORTANT — Repository wiring:
 * loadConfig() does not yet populate `bookingSessions` or `payments` because
 * the RDS persistence layer has not landed. When it does, loadConfig() must
 * be updated to instantiate the RDS-backed repositories and assign them to
 * config.bookingSessions and config.payments. Without that change this
 * handler remains a no-op. The same applies to holdExpiryHandler.ts.
 *
 * The core logic in reconcilePendingPayments is fully tested with in-memory
 * repositories and ready for real ones.
 */
export async function handler(): Promise<ReconciliationResult> {
  const config = loadConfig();

  const observability = createObservability(config.observability);
  const logger = observability.createLogger({ worker: "payment-reconciliation" });

  // Guard: repositories are undefined until loadConfig() is updated to wire
  // RDS-backed implementations. Log a warning every invocation so the no-op
  // state is visible in CloudWatch and easy to catch during persistence work.
  if (!config.bookingSessions || !config.payments) {
    logger.warn("payment_reconciliation_no_repositories", {
      hasBookingSessions: !!config.bookingSessions,
      hasPayments: !!config.payments,
      note: "Repositories not wired in loadConfig(). Worker is a no-op. See paymentReconciliationHandler.ts header comment.",
    });
    return {
      processed: 0,
      confirmed: 0,
      markedFailed: 0,
      stillPending: 0,
      providerErrors: 0,
      errors: [],
    };
  }

  const paypalClient = await createPayPalClient(config);

  return reconcilePendingPayments({
    payments: config.payments,
    bookingSessions: config.bookingSessions,
    paypalClient,
    logger,
  });
}
