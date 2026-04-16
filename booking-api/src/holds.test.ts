import { createBookingApiHandler } from "./app";
import { InMemoryBookingSessionRepository } from "./bookingSessions";
import { InMemoryHoldRepository } from "./holds";
import { StaticSecretProvider } from "./secrets";
import { BookingApiConfig, LambdaHttpRequest } from "./types";

let bookingSessions: InMemoryBookingSessionRepository;
let holds: InMemoryHoldRepository;
let config: BookingApiConfig;

function createTestConfig(): BookingApiConfig {
  bookingSessions = new InMemoryBookingSessionRepository();
  holds = new InMemoryHoldRepository();
  return {
    allowedOrigins: ["https://kalawala.test"],
    maxBodyBytes: 64 * 1024,
    secrets: new StaticSecretProvider({
      smoobuApiKey: "smoobu-secret-value",
      paypalClientId: "paypal-client-id-value",
      paypalClientSecret: "paypal-client-secret-value",
      paypalWebhookId: "paypal-webhook-id-value",
      smoobuWebhookSecret: "smoobu-webhook-secret-value",
      bookingEncryptionKeyBase64: Buffer.alloc(32, 7).toString("base64"),
      portalSessionSecret: "portal-session-secret-value",
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
    bookingSessions,
    holds,
    hold: {
      defaultTtlMinutes: 60,
      idempotencyTtlMinutes: 1440,
      staleIdempotencyLockSeconds: 120,
    },
    abuseProtection: {
      enabled: false,
      captchaChallengesEnabled: false,
      maxTrackedBuckets: 100,
    },
    observability: {
      serviceName: "booking-api",
      environment: "test",
      logLevel: "silent",
      metricsEnabled: false,
    },
  };
}

const originalFetch = global.fetch;

beforeEach(() => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date("2026-04-15T18:00:00Z"));
  config = createTestConfig();
});

afterEach(() => {
  jest.useRealTimers();
  global.fetch = originalFetch;
  jest.restoreAllMocks();
});

function makeSearchEvent(): LambdaHttpRequest {
  return {
    version: "2.0",
    rawPath: "/api/search",
    headers: {
      "content-type": "application/json",
      origin: "https://kalawala.test",
      "user-agent": "Jest Browser",
      "x-kalawala-device-id": "device-hold-123",
    },
    body: JSON.stringify({
      arrivalDate: "2099-06-10",
      departureDate: "2099-06-14",
      guests: 2,
      language: "en",
      source: "booking_page",
    }),
    requestContext: {
      http: {
        method: "POST",
        path: "/api/search",
        sourceIp: "203.0.113.30",
        userAgent: "Jest Browser",
      },
    },
  };
}

function makeHoldEvent(body: unknown, idempotencyKey = "idem-hold-0000000001"): LambdaHttpRequest {
  return {
    version: "2.0",
    rawPath: "/api/holds",
    headers: {
      "content-type": "application/json",
      "idempotency-key": idempotencyKey,
      origin: "https://kalawala.test",
      "user-agent": "Jest Browser",
      "x-kalawala-device-id": "device-hold-123",
    },
    body: JSON.stringify(body),
    requestContext: {
      http: {
        method: "POST",
        path: "/api/holds",
        sourceIp: "203.0.113.30",
        userAgent: "Jest Browser",
      },
    },
  };
}

function jsonResponse(body: unknown, init: ResponseInit = {}): Response {
  return new Response(JSON.stringify(body), {
    status: 200,
    ...init,
    headers: {
      "content-type": "application/json",
      ...(init.headers as Record<string, string> | undefined),
    },
  });
}

test("POST /api/holds creates a local hold and Smoobu blocked-channel provisional reservation", async () => {
  const fetchFn = jest.fn(async (url: string | URL, _init?: RequestInit) => {
    const pathname = new URL(url.toString()).pathname;
    if (pathname === "/booking/checkApartmentAvailability") {
      return jsonResponse({
        availableApartments: [1],
        prices: {
          "1": { price: 510, currency: "USD" },
        },
        errorMessages: {},
      });
    }
    if (pathname === "/api/reservations") {
      return jsonResponse({ id: 987654 });
    }
    return jsonResponse({ detail: "unexpected" }, { status: 500 });
  });
  global.fetch = fetchFn as typeof fetch;
  const handler = createBookingApiHandler(config);

  const searchResponse = await handler(makeSearchEvent());
  const searchBody = JSON.parse(searchResponse.body);
  const holdRequest = {
    quoteId: searchBody.quoteId,
    bookingSessionId: searchBody.bookingSessionId,
    propertyId: searchBody.properties[0].propertyId,
    paymentMethod: "paypal",
    guest: {
      firstName: "Ana",
      lastName: "Mora",
      email: "ana@example.com",
      phone: "+50688888888",
      country: "CR",
      message: "Arriving around 4pm",
    },
    portalPassword: "correct horse battery staple",
    termsAccepted: true,
    marketingConsent: false,
  };

  const response = await handler(makeHoldEvent(holdRequest));

  expect(response.statusCode).toBe(200);
  const body = JSON.parse(response.body);
  expect(body).toMatchObject({
    booking: {
      bookingSessionId: searchBody.bookingSessionId,
      status: "hold_active",
      language: "en",
      arrivalDate: "2099-06-10",
      departureDate: "2099-06-14",
      guests: 2,
      property: {
        slug: "Geco",
        listingUrl: "/Geco",
        name: "Casa Geco",
      },
      price: {
        currency: "USD",
        totalAmountCents: 51000,
        nightlyAverageCents: 12750,
        nights: 4,
        rateSource: "smoobu",
      },
      hold: {
        status: "active",
        expiresAt: "2026-04-15T19:00:00.000Z",
      },
      payment: {
        method: "paypal",
        status: "pending",
      },
    },
    nextAction: "create_paypal_order",
  });
  expect(body.booking.reservationPublicId).toMatch(/^KWL-[A-Z2-9]{8}$/);
  expect(JSON.stringify(body)).not.toContain("987654");
  expect(JSON.stringify(body)).not.toContain("smoobuReservationId");

  expect(fetchFn).toHaveBeenCalledTimes(3);
  const [, holdAvailabilityInit] = fetchFn.mock.calls[1];
  expect(JSON.parse(holdAvailabilityInit?.body as string)).toEqual({
    arrivalDate: "2099-06-10",
    departureDate: "2099-06-14",
    apartments: [1],
    customerId: 9,
    guests: 2,
  });

  const [reservationUrl, reservationInit] = fetchFn.mock.calls[2];
  expect(new URL(reservationUrl.toString()).pathname).toBe("/api/reservations");
  const reservationPayload = JSON.parse(reservationInit?.body as string);
  expect(reservationPayload).toMatchObject({
    arrivalDate: "2099-06-10",
    departureDate: "2099-06-14",
    channelId: 11,
    apartmentId: 1,
    firstName: "Ana",
    lastName: "Mora",
    email: "ana@example.com",
    phone: "+50688888888",
    country: "CR",
    adults: 2,
    children: 0,
    price: 510,
    priceStatus: 0,
    prepayment: 0,
    prepaymentStatus: 0,
    deposit: 0,
    depositStatus: 0,
    language: "en",
  });
  expect(reservationPayload.notice).toContain("Kalawala PayPal provisional hold");
  expect(reservationPayload.notice).toContain("Not confirmed until PayPal payment is verified");

  const storedSession = await bookingSessions.getById(searchBody.bookingSessionId);
  const storedHold = await holds.getByBookingSessionId(searchBody.bookingSessionId);
  expect(storedSession).toMatchObject({
    status: "hold_active",
    paymentMethod: "paypal",
    totalAmountCents: 51000,
    expiresAt: "2026-04-15T19:00:00.000Z",
  });
  expect(storedSession?.portalPasswordHash).toMatch(/^scrypt\$N16384r8p1\$/);
  expect(storedSession?.portalPasswordHash).not.toContain("correct horse battery staple");
  expect(storedHold).toMatchObject({
    status: "active",
    smoobuReservationId: 987654,
    smoobuChannelId: 11,
  });
});

test("POST /api/holds replays successful responses for the same idempotency key without another Smoobu reservation", async () => {
  global.fetch = jest.fn(async (url: string | URL) => {
    const pathname = new URL(url.toString()).pathname;
    if (pathname === "/booking/checkApartmentAvailability") {
      return jsonResponse({
        availableApartments: [1],
        prices: {
          "1": { price: 510, currency: "USD" },
        },
        errorMessages: {},
      });
    }
    return jsonResponse({ id: 987654 });
  }) as typeof fetch;
  const handler = createBookingApiHandler(config);
  const searchResponse = await handler(makeSearchEvent());
  const searchBody = JSON.parse(searchResponse.body);
  const holdRequest = {
    quoteId: searchBody.quoteId,
    bookingSessionId: searchBody.bookingSessionId,
    propertyId: searchBody.properties[0].propertyId,
    paymentMethod: "paypal",
    guest: {
      firstName: "Ana",
      lastName: "Mora",
      email: "ana@example.com",
    },
    portalPassword: "correct horse battery staple",
    termsAccepted: true,
  };

  const first = await handler(makeHoldEvent(holdRequest, "idem-hold-duplicate-1"));
  const second = await handler(makeHoldEvent(holdRequest, "idem-hold-duplicate-1"));

  expect(first.statusCode).toBe(200);
  expect(second.statusCode).toBe(200);
  expect(JSON.parse(second.body)).toEqual(JSON.parse(first.body));
  expect((global.fetch as jest.Mock).mock.calls.filter(([url]) => new URL(url.toString()).pathname === "/api/reservations")).toHaveLength(1);
});

test("POST /api/holds rejects when the just-in-time Smoobu availability recheck fails", async () => {
  let availabilityCall = 0;
  global.fetch = jest.fn(async (url: string | URL) => {
    const pathname = new URL(url.toString()).pathname;
    if (pathname === "/booking/checkApartmentAvailability") {
      availabilityCall += 1;
      if (availabilityCall === 1) {
        return jsonResponse({
          availableApartments: [1],
          prices: {
            "1": { price: 510, currency: "USD" },
          },
          errorMessages: {},
        });
      }
      return jsonResponse({
        availableApartments: [],
        prices: {},
        errorMessages: {
          "1": {
            errorCode: 401,
            message: "The duration of the booking is too short.",
          },
        },
      });
    }
    return jsonResponse({ id: 987654 });
  }) as typeof fetch;
  const handler = createBookingApiHandler(config);
  const searchResponse = await handler(makeSearchEvent());
  const searchBody = JSON.parse(searchResponse.body);

  const response = await handler(
    makeHoldEvent({
      quoteId: searchBody.quoteId,
      bookingSessionId: searchBody.bookingSessionId,
      propertyId: searchBody.properties[0].propertyId,
      paymentMethod: "paypal",
      guest: {
        firstName: "Ana",
        lastName: "Mora",
        email: "ana@example.com",
      },
      portalPassword: "correct horse battery staple",
      termsAccepted: true,
    })
  );

  expect(response.statusCode).toBe(409);
  expect(JSON.parse(response.body).error).toMatchObject({
    code: "property_no_longer_available",
    retryable: false,
  });
  expect((global.fetch as jest.Mock).mock.calls.filter(([url]) => new URL(url.toString()).pathname === "/api/reservations")).toHaveLength(0);
  await expect(holds.getByBookingSessionId(searchBody.bookingSessionId)).resolves.toBeUndefined();
});

test("POST /api/holds rejects with 404 when bookingSessionId and quoteId do not match", async () => {
  const fetchFn = jest.fn();
  global.fetch = fetchFn as typeof fetch;
  const handler = createBookingApiHandler(config);

  const response = await handler(
    makeHoldEvent({
      quoteId: "qt_XXXXXXXXXXXXXXXX",
      bookingSessionId: "a1b2c3d4-e5f6-4a7b-8c9d-e0f1a2b3c4d5",
      propertyId: "b2c3d4e5-f6a7-4b8c-9d0e-f1a2b3c4d5e6",
      paymentMethod: "paypal",
      guest: { firstName: "Ana", lastName: "Mora", email: "ana@example.com" },
      portalPassword: "correct horse battery staple",
      termsAccepted: true,
    })
  );

  expect(response.statusCode).toBe(404);
  expect(JSON.parse(response.body).error.code).toBe("not_found");
  expect(fetchFn).not.toHaveBeenCalled();
});

test("POST /api/holds rejects with 409 when the quote has expired", async () => {
  global.fetch = jest.fn(async (url: string | URL) => {
    const pathname = new URL(url.toString()).pathname;
    if (pathname === "/booking/checkApartmentAvailability") {
      return jsonResponse({ availableApartments: [1], prices: { "1": { price: 510, currency: "USD" } }, errorMessages: {} });
    }
    return jsonResponse({ id: 987654 });
  }) as typeof fetch;
  const handler = createBookingApiHandler(config);
  const searchResponse = await handler(makeSearchEvent());
  const searchBody = JSON.parse(searchResponse.body);

  jest.advanceTimersByTime(11 * 60 * 1000);

  const response = await handler(
    makeHoldEvent({
      quoteId: searchBody.quoteId,
      bookingSessionId: searchBody.bookingSessionId,
      propertyId: searchBody.properties[0].propertyId,
      paymentMethod: "paypal",
      guest: { firstName: "Ana", lastName: "Mora", email: "ana@example.com" },
      portalPassword: "correct horse battery staple",
      termsAccepted: true,
    })
  );

  expect(response.statusCode).toBe(409);
  expect(JSON.parse(response.body).error.code).toBe("quote_expired");
  expect((global.fetch as jest.Mock).mock.calls.filter(([url]) => new URL(url.toString()).pathname === "/api/reservations")).toHaveLength(0);
});

test("POST /api/holds rejects with 409 when the quoted price changed before hold creation", async () => {
  let availabilityCall = 0;
  global.fetch = jest.fn(async (url: string | URL) => {
    const pathname = new URL(url.toString()).pathname;
    if (pathname === "/booking/checkApartmentAvailability") {
      availabilityCall += 1;
      const price = availabilityCall === 1 ? 510 : 600;
      return jsonResponse({ availableApartments: [1], prices: { "1": { price, currency: "USD" } }, errorMessages: {} });
    }
    return jsonResponse({ id: 987654 });
  }) as typeof fetch;
  const handler = createBookingApiHandler(config);
  const searchResponse = await handler(makeSearchEvent());
  const searchBody = JSON.parse(searchResponse.body);

  const response = await handler(
    makeHoldEvent({
      quoteId: searchBody.quoteId,
      bookingSessionId: searchBody.bookingSessionId,
      propertyId: searchBody.properties[0].propertyId,
      paymentMethod: "paypal",
      guest: { firstName: "Ana", lastName: "Mora", email: "ana@example.com" },
      portalPassword: "correct horse battery staple",
      termsAccepted: true,
    })
  );

  expect(response.statusCode).toBe(409);
  expect(JSON.parse(response.body).error).toMatchObject({
    code: "property_no_longer_available",
    fieldErrors: { quoteId: ["quote_changed"] },
  });
  expect((global.fetch as jest.Mock).mock.calls.filter(([url]) => new URL(url.toString()).pathname === "/api/reservations")).toHaveLength(0);
});

test("POST /api/holds rejects with 409 when the same idempotency key is reused with a different request body", async () => {
  global.fetch = jest.fn(async (url: string | URL) => {
    const pathname = new URL(url.toString()).pathname;
    if (pathname === "/booking/checkApartmentAvailability") {
      return jsonResponse({ availableApartments: [1], prices: { "1": { price: 510, currency: "USD" } }, errorMessages: {} });
    }
    return jsonResponse({ id: 987654 });
  }) as typeof fetch;
  const handler = createBookingApiHandler(config);
  const searchResponse = await handler(makeSearchEvent());
  const searchBody = JSON.parse(searchResponse.body);

  const baseRequest = {
    quoteId: searchBody.quoteId,
    bookingSessionId: searchBody.bookingSessionId,
    propertyId: searchBody.properties[0].propertyId,
    paymentMethod: "paypal",
    guest: { firstName: "Ana", lastName: "Mora", email: "ana@example.com" },
    portalPassword: "correct horse battery staple",
    termsAccepted: true,
  };
  const differentRequest = { ...baseRequest, guest: { ...baseRequest.guest, email: "different@example.com" } };

  await handler(makeHoldEvent(baseRequest, "idem-conflict-key-1"));
  const conflict = await handler(makeHoldEvent(differentRequest, "idem-conflict-key-1"));

  expect(conflict.statusCode).toBe(409);
  expect(JSON.parse(conflict.body).error.code).toBe("idempotency_conflict");
});

test("POST /api/holds rejects with 409 when the booking session already has an active hold", async () => {
  global.fetch = jest.fn(async (url: string | URL) => {
    const pathname = new URL(url.toString()).pathname;
    if (pathname === "/booking/checkApartmentAvailability") {
      return jsonResponse({ availableApartments: [1], prices: { "1": { price: 510, currency: "USD" } }, errorMessages: {} });
    }
    return jsonResponse({ id: 987654 });
  }) as typeof fetch;
  const handler = createBookingApiHandler(config);
  const searchResponse = await handler(makeSearchEvent());
  const searchBody = JSON.parse(searchResponse.body);

  const holdRequest = {
    quoteId: searchBody.quoteId,
    bookingSessionId: searchBody.bookingSessionId,
    propertyId: searchBody.properties[0].propertyId,
    paymentMethod: "paypal",
    guest: { firstName: "Ana", lastName: "Mora", email: "ana@example.com" },
    portalPassword: "correct horse battery staple",
    termsAccepted: true,
  };

  const first = await handler(makeHoldEvent(holdRequest, "idem-dup-session-1"));
  // Second attempt with a fresh idempotency key: state machine blocks it because the
  // session has already transitioned to hold_active, before createCreatingHold is reached.
  const second = await handler(makeHoldEvent(holdRequest, "idem-dup-session-2"));

  expect(first.statusCode).toBe(200);
  expect(second.statusCode).toBe(409);
  expect(JSON.parse(second.body).error.code).toBe("invalid_booking_state");
});

test("POST /api/holds rolls back to failed state when Smoobu reservation creation fails", async () => {
  let availabilityCall = 0;
  global.fetch = jest.fn(async (url: string | URL) => {
    const pathname = new URL(url.toString()).pathname;
    if (pathname === "/booking/checkApartmentAvailability") {
      availabilityCall += 1;
      return jsonResponse({ availableApartments: [1], prices: { "1": { price: 510, currency: "USD" } }, errorMessages: {} });
    }
    if (pathname === "/api/reservations") {
      return jsonResponse({ error: "internal_server_error" }, { status: 500 });
    }
    return jsonResponse({}, { status: 500 });
  }) as typeof fetch;
  const handler = createBookingApiHandler(config);
  const searchResponse = await handler(makeSearchEvent());
  const searchBody = JSON.parse(searchResponse.body);

  const response = await handler(
    makeHoldEvent({
      quoteId: searchBody.quoteId,
      bookingSessionId: searchBody.bookingSessionId,
      propertyId: searchBody.properties[0].propertyId,
      paymentMethod: "paypal",
      guest: { firstName: "Ana", lastName: "Mora", email: "ana@example.com" },
      portalPassword: "correct horse battery staple",
      termsAccepted: true,
    })
  );

  expect(response.statusCode).toBe(503);

  const storedHold = await holds.getByBookingSessionId(searchBody.bookingSessionId);
  const storedSession = await bookingSessions.getById(searchBody.bookingSessionId);
  expect(storedHold?.status).toBe("failed");
  expect(storedSession?.status).toBe("failed");
  expect(storedHold?.smoobuReservationId).toBeUndefined();
});

test("POST /api/holds rejects with 409 when a different user races for the same property and overlapping dates", async () => {
  global.fetch = jest.fn(async (url: string | URL) => {
    const pathname = new URL(url.toString()).pathname;
    if (pathname === "/booking/checkApartmentAvailability") {
      return jsonResponse({
        availableApartments: [1],
        prices: { "1": { price: 510, currency: "USD" } },
        errorMessages: {},
      });
    }
    return jsonResponse({ id: 987654 });
  }) as typeof fetch;
  const handler = createBookingApiHandler(config);

  // User A searches and gets a quote
  const searchA = await handler(makeSearchEvent());
  const bodyA = JSON.parse(searchA.body);

  // User B searches independently and gets their own quote
  const searchB = await handler(makeSearchEvent());
  const bodyB = JSON.parse(searchB.body);

  const holdRequestA = {
    quoteId: bodyA.quoteId,
    bookingSessionId: bodyA.bookingSessionId,
    propertyId: bodyA.properties[0].propertyId,
    paymentMethod: "paypal",
    guest: { firstName: "Ana", lastName: "Mora", email: "ana@example.com" },
    portalPassword: "correct horse battery staple",
    termsAccepted: true,
  };
  const holdRequestB = {
    quoteId: bodyB.quoteId,
    bookingSessionId: bodyB.bookingSessionId,
    propertyId: bodyB.properties[0].propertyId,
    paymentMethod: "paypal",
    guest: { firstName: "Bob", lastName: "Smith", email: "bob@example.com" },
    portalPassword: "another secure passphrase",
    termsAccepted: true,
  };

  // User A creates a hold first — should succeed
  const responseA = await handler(makeHoldEvent(holdRequestA, "idem-user-a-00000001"));
  expect(responseA.statusCode).toBe(200);

  // User B tries the same property + overlapping dates — should be rejected
  const responseB = await handler(makeHoldEvent(holdRequestB, "idem-user-b-00000001"));
  expect(responseB.statusCode).toBe(409);
  expect(JSON.parse(responseB.body).error.code).toBe("property_no_longer_available");

  // Only one Smoobu reservation should have been created
  const reservationCalls = (global.fetch as jest.Mock).mock.calls.filter(
    ([url]) => new URL(url.toString()).pathname === "/api/reservations"
  );
  expect(reservationCalls).toHaveLength(1);
});
