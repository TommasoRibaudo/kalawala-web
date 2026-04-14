import { AbuseGuard } from "./abuseProtection";
import { ApiError } from "./http/errors";
import { AbuseProtectionConfig, RouteRequest } from "./types";

const config: AbuseProtectionConfig = {
  enabled: true,
  captchaChallengesEnabled: true,
  maxTrackedBuckets: 100,
};

function makeRequest(overrides: Partial<RouteRequest> = {}): RouteRequest {
  return {
    method: "POST",
    path: "/api/holds",
    headers: {
      "user-agent": "Jest Browser",
      "accept-language": "en-US",
      "x-kalawala-device-id": "device-abc-123",
      ...overrides.headers,
    },
    responseHeaders: {},
    query: {},
    pathParams: {},
    body: undefined,
    rawBody: "",
    correlationId: "test-correlation",
    clientIp: "203.0.113.10",
    userAgent: "Jest Browser",
    ...overrides,
  };
}

function captureApiError(fn: () => void): ApiError {
  try {
    fn();
  } catch (error) {
    if (error instanceof ApiError) {
      return error;
    }
    throw error;
  }

  throw new Error("Expected ApiError to be thrown.");
}

test("AbuseGuard: returns CAPTCHA challenge after repeated hold-create attempts", () => {
  const guard = new AbuseGuard(config, () => 1_000);
  const request = makeRequest();

  guard.assertAllowed(request, "holdCreate");
  guard.assertAllowed(request, "holdCreate");

  const error = captureApiError(() => guard.assertAllowed(request, "holdCreate"));

  expect(error.statusCode).toBe(403);
  expect(error.code).toBe("captcha_required");
  expect(request.responseHeaders["X-Captcha-Required"]).toBe("true");
  expect(request.responseHeaders["X-Captcha-Policy"]).toBe("holdCreate");
});

test("AbuseGuard: enforces per-device limits across changing IP addresses", () => {
  const guard = new AbuseGuard(config, () => 1_000);

  for (let index = 0; index < 5; index += 1) {
    guard.assertAllowed(makeRequest({ clientIp: `203.0.113.${index + 1}` }), "portalLogin");
  }

  const error = captureApiError(() =>
    guard.assertAllowed(makeRequest({ clientIp: "203.0.113.99" }), "portalLogin")
  );

  expect(error.statusCode).toBe(429);
  expect(error.code).toBe("rate_limited");
});

test("AbuseGuard: resets buckets after the route window expires", () => {
  let now = 1_000;
  const guard = new AbuseGuard(config, () => now);
  const request = makeRequest();

  guard.assertAllowed(request, "holdCreate");
  guard.assertAllowed(request, "holdCreate");
  expect(captureApiError(() => guard.assertAllowed(request, "holdCreate")).code).toBe("captcha_required");

  now += 15 * 60 * 1000 + 1;

  expect(() => guard.assertAllowed(request, "holdCreate")).not.toThrow();
});

test("AbuseGuard: can be disabled by configuration", () => {
  const disabledGuard = new AbuseGuard({ ...config, enabled: false }, () => 1_000);
  const request = makeRequest();

  for (let index = 0; index < 20; index += 1) {
    disabledGuard.assertAllowed(request, "holdCreate");
  }

  expect(request.responseHeaders["X-RateLimit-Policy"]).toBeUndefined();
});

test("AbuseGuard: enforces IP-only policy (webhook) and sets Retry-After on 429", () => {
  const guard = new AbuseGuard(config, () => 1_000);

  // webhook policy: ip limit=300/60s, no device rule — exhaust via distinct device IDs
  for (let index = 0; index < 300; index += 1) {
    guard.assertAllowed(
      makeRequest({ headers: { "x-kalawala-device-id": `device-${index}` } }),
      "webhook"
    );
  }

  const request = makeRequest({ headers: { "x-kalawala-device-id": "device-overflow" } });
  const error = captureApiError(() => guard.assertAllowed(request, "webhook"));

  expect(error.statusCode).toBe(429);
  expect(error.code).toBe("rate_limited");
  expect(request.responseHeaders["Retry-After"]).toBeDefined();
  expect(Number(request.responseHeaders["Retry-After"])).toBeGreaterThan(0);
});

test("AbuseGuard: sets Retry-After header when IP limit is exceeded", () => {
  // Disable CAPTCHA so requests escalate straight to 429 when the IP cap is hit.
  const guard = new AbuseGuard({ ...config, captchaChallengesEnabled: false }, () => 1_000);

  // holdCreate ip limit=8/900s — use distinct device IDs so each device bucket stays at 1.
  for (let index = 0; index < 8; index += 1) {
    guard.assertAllowed(
      makeRequest({ headers: { "x-kalawala-device-id": `unique-device-${index}` } }),
      "holdCreate"
    );
  }

  const request = makeRequest({ headers: { "x-kalawala-device-id": "unique-device-overflow" } });
  const error = captureApiError(() => guard.assertAllowed(request, "holdCreate"));

  expect(error.statusCode).toBe(429);
  expect(request.responseHeaders["Retry-After"]).toBeDefined();
  expect(Number(request.responseHeaders["Retry-After"])).toBeGreaterThan(0);
});
