/**
 * Placeholder handler for the availability watchdog scheduled worker.
 *
 * This stub is deployed by Terraform on initial `terraform apply`.
 * CI/CD replaces it with the real compiled handler from
 * booking-api/src/availabilityWatchdogHandler.ts via `aws lambda update-function-code`.
 */
export async function handler(event) {
  console.log(JSON.stringify({
    level: "info",
    eventType: "availability_watchdog_placeholder_invoked",
    event,
    note: "Replace this placeholder with the real availability watchdog via CI/CD.",
  }));

  return {
    checked: 0,
    closed: 0,
    reopened: 0,
    inconclusive: 0,
    reasserted: 0,
    reassertFailed: 0,
    findings: [],
  };
}
