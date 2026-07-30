/**
 * Staff deposit review page — the "Confirm" button's form action must resolve,
 * from the browser's address bar, to the actual POST route.
 *
 * The GET page is served at /api/staff/deposit-review/{token} behind an API
 * Gateway stage (e.g. https://<id>.execute-api.<region>.amazonaws.com/prod/...).
 * Lambda only ever sees the path *after* the stage, so a bug in a root-relative
 * action (e.g. "/api/staff/deposit-review") that drops the stage prefix cannot
 * be seen by hitting the Lambda handler alone — it only shows up once a real
 * browser resolves the relative URL against the page it's actually looking at.
 * These tests reproduce that resolution with the Fetch API's URL, without a browser.
 */

import { createBookingApiHandler } from "./app";
import { InMemoryBookingSessionRepository } from "./bookingSessions";
import { InMemoryHoldRepository } from "./holds";
import { StaticSecretProvider } from "./secrets";
import { issueSignedToken } from "./signedTokens";
import { BookingApiConfig, LambdaHttpRequest } from "./types";

const PORTAL_SECRET = "portal-session-secret-for-deposit-confirm-tests";

let bookingSessions: InMemoryBookingSessionRepository;
let config: BookingApiConfig;
let handler: ReturnType<typeof createBookingApiHandler>;

function createTestConfig(): BookingApiConfig {
  bookingSessions = new InMemoryBookingSessionRepository();
  return {
    allowedOrigins: ["https://kalawala.test"],
    maxBodyBytes: 64 * 1024,
    secrets: new StaticSecretProvider({
      smoobuApiKey: "smoobu-secret-value",
      smoobuApiSecret: "smoobu-api-secret-value",
      smoobuWebhookSecret: "smoobu-webhook-secret-value",
      paypalClientId: "paypal-client-id-value",
      paypalClientSecret: "paypal-client-secret-value",
      paypalWebhookId: "paypal-webhook-id-value",
      bookingEncryptionKeyBase64: Buffer.alloc(32, 7).toString("base64"),
      portalSessionSecret: PORTAL_SECRET,
      rdsConnectionString: "postgres://booking_user:pw@db.example.com:5432/kalawala",
    }),
    smoobu: {
      baseUrl: "https://login.smoobu.com",
      customerId: 9,
      timeoutMs: 8_000,
      maxRetries: 0,
      baseBackoffMs: 250,
      maxBackoffMs: 2_000,
      maxRateLimitDelayMs: 60_000,
      holdChannelId: 11,
    },
    paypal: { baseUrl: "https://api-m.sandbox.paypal.com", timeoutMs: 10_000, orderReturnUrl: "", orderCancelUrl: "" },
    bookingSessions,
    holds: new InMemoryHoldRepository(),
    hold: { defaultTtlMinutes: 60, idempotencyTtlMinutes: 1440, staleIdempotencyLockSeconds: 120 },
    abuseProtection: { enabled: false, captchaChallengesEnabled: false, maxTrackedBuckets: 100 },
    email: { fromAddress: "test@kalawala.com", region: "us-east-1", disabled: true },
    observability: { serviceName: "booking-api", environment: "test", logLevel: "silent", metricsEnabled: false },
  };
}

async function seedSession(): Promise<{ id: string; reservationPublicId: string }> {
  const session = await bookingSessions.createQuotedSession({
    arrivalDate: "2099-05-01",
    departureDate: "2099-05-05",
    guests: 2,
    language: "en",
  });
  return { id: session.id, reservationPublicId: session.reservationPublicId };
}

function confirmToken(bookingSessionId: string, reservationPublicId: string): string {
  return issueSignedToken(
    { bookingSessionId, reservationPublicId, purpose: "deposit_confirm", ttlSeconds: 3600 },
    PORTAL_SECRET
  );
}

function getReviewPage(token: string): LambdaHttpRequest {
  const path = `/api/staff/deposit-review/${token}`;
  return {
    version: "2.0",
    rawPath: path,
    headers: {},
    requestContext: { http: { method: "GET", path, sourceIp: "203.0.113.9" } },
  };
}

function extractFormAction(html: string): string {
  const match = /<form\s+method="POST"\s+action="([^"]*)"/.exec(html);
  if (!match) {
    throw new Error("review page did not render the expected <form> element");
  }
  return match[1];
}

beforeEach(() => {
  config = createTestConfig();
  handler = createBookingApiHandler(config);
});

it("submits to the real POST route once resolved against the review page's own (stage-prefixed) URL", async () => {
  const session = await seedSession();
  const token = confirmToken(session.id, session.reservationPublicId);

  const response = await handler(getReviewPage(token));
  expect(response.statusCode).toBe(200);

  const action = extractFormAction(response.body);
  // Mirrors DEPOSIT_STAFF_CONFIRM_BASE_URL as Terraform builds it in lambda.tf:
  // https://<rest-api-id>.execute-api.<region>.amazonaws.com/<stage>
  const addressBarUrl = `https://abc123.execute-api.us-east-2.amazonaws.com/prod/api/staff/deposit-review/${token}`;

  const resolved = new URL(action, addressBarUrl);
  expect(resolved.pathname).toBe("/prod/api/staff/deposit-review");
});

it("also resolves correctly with no stage/base-path prefix (e.g. a future custom domain)", async () => {
  const session = await seedSession();
  const token = confirmToken(session.id, session.reservationPublicId);

  const response = await handler(getReviewPage(token));
  const action = extractFormAction(response.body);

  const addressBarUrl = `https://api.kalawala.com/api/staff/deposit-review/${token}`;
  const resolved = new URL(action, addressBarUrl);
  expect(resolved.pathname).toBe("/api/staff/deposit-review");
});
