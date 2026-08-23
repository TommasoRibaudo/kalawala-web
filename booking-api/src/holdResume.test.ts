/**
 * GET /api/holds/:bookingSessionId — resumes an in-progress hold from a
 * payment-pending/deposit-instructions email link (#325).
 *
 * Auth mirrors each payment method's existing model: a `paypal` session's
 * bookingSessionId (a UUID) is already sufficient on its own elsewhere
 * (handleCreatePayPalOrder/handleCapturePayPalOrder take no separate token),
 * while a `manual_deposit` session requires the same `deposit_access` bearer
 * token already required by the receipt-upload endpoints.
 */

import { createBookingApiHandler } from "./app";
import { InMemoryBookingSessionRepository } from "./bookingSessions";
import { InMemoryHoldRepository } from "./holds";
import { InMemoryPaymentRepository } from "./payments";
import { StaticSecretProvider } from "./secrets";
import { BookingApiConfig, LambdaHttpRequest } from "./types";

const PORTAL_SECRET = "portal-session-secret-for-hold-resume-tests";

let bookingSessions: InMemoryBookingSessionRepository;
let config: BookingApiConfig;

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
    payments: new InMemoryPaymentRepository(),
    hold: { defaultTtlMinutes: 60, idempotencyTtlMinutes: 1440, staleIdempotencyLockSeconds: 120 },
    deposit: { holdTtlHours: 48, confirmTokenTtlHours: 168, staffConfirmBaseUrl: "https://kalawala.test-api/prod" },
    abuseProtection: { enabled: false, captchaChallengesEnabled: false, maxTrackedBuckets: 100 },
    email: { fromAddress: "test@kalawala.com", region: "us-east-1", disabled: true },
    observability: { serviceName: "booking-api", environment: "test", logLevel: "silent", metricsEnabled: false },
  };
}

const originalFetch = global.fetch;

beforeEach(() => {
  config = createTestConfig();
  depositHoldCount = 0;
});

afterEach(() => {
  global.fetch = originalFetch;
  jest.restoreAllMocks();
});

function jsonResp(body: unknown, init: ResponseInit = {}): Response {
  return new Response(JSON.stringify(body), {
    status: 200,
    ...init,
    headers: { "content-type": "application/json", ...(init.headers as Record<string, string> | undefined) },
  });
}

const SMOOBU_AVAILABILITY_RESPONSE = {
  availableApartments: [301061],
  prices: { "301061": { price: 510, currency: "USD" } },
  errorMessages: {},
};

function makeHappyPathFetch(): jest.Mock {
  return jest.fn(async (url: string | URL) => {
    const { hostname, pathname } = new URL(url.toString());
    if (hostname === "login.smoobu.com") {
      if (pathname === "/booking/checkApartmentAvailability") return jsonResp(SMOOBU_AVAILABILITY_RESPONSE);
      if (pathname === "/api/reservations") return jsonResp({ id: 987654 });
    }
    return jsonResp({ detail: "unexpected" }, { status: 500 });
  });
}

function makeSearchEvent(arrivalDate = "2099-06-10", departureDate = "2099-06-14"): LambdaHttpRequest {
  return {
    version: "2.0",
    rawPath: "/api/search",
    headers: { "content-type": "application/json", origin: "https://kalawala.test" },
    body: JSON.stringify({ arrivalDate, departureDate, guests: 2, language: "en" }),
    requestContext: { http: { method: "POST", path: "/api/search", sourceIp: "203.0.113.50" } },
  };
}

function makeHoldEvent(path: string, body: unknown, idempotencyKey: string): LambdaHttpRequest {
  return {
    version: "2.0",
    rawPath: path,
    headers: { "content-type": "application/json", "idempotency-key": idempotencyKey, origin: "https://kalawala.test" },
    body: JSON.stringify(body),
    requestContext: { http: { method: "POST", path, sourceIp: "203.0.113.50" } },
  };
}

function getHoldStateEvent(bookingSessionId: string, authorization?: string): LambdaHttpRequest {
  const path = `/api/holds/${bookingSessionId}`;
  return {
    version: "2.0",
    rawPath: path,
    headers: authorization ? { authorization } : {},
    requestContext: { http: { method: "GET", path, sourceIp: "203.0.113.50" } },
  };
}

async function setupPayPalHold(handler: ReturnType<typeof createBookingApiHandler>) {
  const searchResp = await handler(makeSearchEvent());
  expect(searchResp.statusCode).toBe(200);
  const searchBody = JSON.parse(searchResp.body);
  const propertyId = searchBody.properties[0].propertyId;

  const holdResp = await handler(
    makeHoldEvent(
      "/api/holds",
      {
        quoteId: searchBody.quoteId,
        bookingSessionId: searchBody.bookingSessionId,
        propertyId,
        paymentMethod: "paypal",
        guest: { firstName: "Ana", lastName: "Mora", email: "ana@example.com" },
        portalPassword: "correct horse battery staple",
        termsAccepted: true,
      },
      "idem-hold-resume-paypal-001"
    )
  );
  expect(holdResp.statusCode).toBe(200);
  return { bookingSessionId: searchBody.bookingSessionId as string, propertyId: propertyId as string };
}

let depositHoldCount = 0;

async function setupDepositHold(handler: ReturnType<typeof createBookingApiHandler>) {
  depositHoldCount += 1;
  // Non-overlapping date ranges per call — the in-memory hold repo rejects a
  // second hold on the same property whose dates overlap an existing one, so
  // each call gets its own month entirely.
  const month = String(depositHoldCount).padStart(2, "0");
  const arrivalDate = `2100-${month}-10`;
  const departureDate = `2100-${month}-14`;

  const searchResp = await handler(makeSearchEvent(arrivalDate, departureDate));
  expect(searchResp.statusCode).toBe(200);
  const searchBody = JSON.parse(searchResp.body);
  const propertyId = searchBody.properties[0].propertyId;

  const holdResp = await handler(
    makeHoldEvent(
      "/api/deposit-holds",
      {
        quoteId: searchBody.quoteId,
        bookingSessionId: searchBody.bookingSessionId,
        propertyId,
        guest: { firstName: "Ana", lastName: "Mora", email: "ana@example.com" },
        portalPassword: "correct horse battery staple",
        termsAccepted: true,
      },
      `idem-hold-resume-deposit-${depositHoldCount}`
    )
  );
  expect(holdResp.statusCode).toBe(200);
  const holdBody = JSON.parse(holdResp.body);
  return {
    bookingSessionId: searchBody.bookingSessionId as string,
    propertyId: propertyId as string,
    depositAccessToken: holdBody.depositAccessToken as string,
  };
}

describe("GET /api/holds/:bookingSessionId", () => {
  it("returns hold state for a PayPal session with no token required", async () => {
    global.fetch = makeHappyPathFetch() as typeof fetch;
    const handler = createBookingApiHandler(config);
    const { bookingSessionId, propertyId } = await setupPayPalHold(handler);

    const response = await handler(getHoldStateEvent(bookingSessionId));

    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    expect(body).toMatchObject({
      booking: {
        bookingSessionId,
        property: { propertyId },
        payment: { method: "paypal" },
      },
      nextAction: "create_paypal_order",
    });
    expect(body.bankInfo).toBeUndefined();
    expect(body.depositAccessToken).toBeUndefined();
  });

  it("404s for an unknown booking session", async () => {
    global.fetch = makeHappyPathFetch() as typeof fetch;
    const handler = createBookingApiHandler(config);
    const response = await handler(getHoldStateEvent("b8a1f2e7-0000-4000-8000-000000000000"));
    expect(response.statusCode).toBe(404);
  });

  it("rejects a manual-deposit session with no Authorization header", async () => {
    global.fetch = makeHappyPathFetch() as typeof fetch;
    const handler = createBookingApiHandler(config);
    const { bookingSessionId } = await setupDepositHold(handler);

    const response = await handler(getHoldStateEvent(bookingSessionId));
    expect(response.statusCode).toBe(401);
  });

  it("rejects a manual-deposit session with a token for a different booking", async () => {
    global.fetch = makeHappyPathFetch() as typeof fetch;
    const handler = createBookingApiHandler(config);
    const { bookingSessionId } = await setupDepositHold(handler);
    // A second deposit hold's token must not unlock the first one's state.
    const { depositAccessToken: otherToken } = await setupDepositHold(handler);

    const response = await handler(getHoldStateEvent(bookingSessionId, `Bearer ${otherToken}`));
    expect(response.statusCode).toBe(403);
  });

  it("returns hold state + bank info for a manual-deposit session with a valid token", async () => {
    global.fetch = makeHappyPathFetch() as typeof fetch;
    const handler = createBookingApiHandler(config);
    const { bookingSessionId, propertyId, depositAccessToken } = await setupDepositHold(handler);

    const response = await handler(getHoldStateEvent(bookingSessionId, `Bearer ${depositAccessToken}`));

    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    expect(body).toMatchObject({
      booking: {
        bookingSessionId,
        property: { propertyId },
        payment: { method: "manual_deposit" },
      },
      nextAction: "upload_deposit_receipt",
      depositAccessToken,
    });
    expect(body.bankInfo).toBeDefined();
    expect(typeof body.depositAccessTokenExpiresInSeconds).toBe("number");
    expect(body.depositAccessTokenExpiresInSeconds).toBeGreaterThan(0);
  });
});
