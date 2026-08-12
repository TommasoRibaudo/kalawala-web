import { resetSmoobuRateLimitState } from "./smoobuClient";

// The Smoobu rate-limit backoff window lives at module scope (see
// smoobuClient.ts) so it survives across Lambda invocations within a warm
// execution environment. In tests, all test cases in a file share that same
// module instance, so a 429 simulated in one test would otherwise leak into
// every later test in the file and make them wait out a stale backoff window.
afterEach(() => {
  resetSmoobuRateLimitState();
});
