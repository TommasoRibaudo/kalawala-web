import { createBookingApiHandler } from "./app";
import { InMemoryBookingSessionRepository } from "./bookingSessions";
import { StaticSecretProvider } from "./secrets";
import { BookingApiConfig, LambdaHttpRequest } from "./types";

const config: BookingApiConfig = {
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

const originalFetch = global.fetch;

afterEach(() => {
  global.fetch = originalFetch;
  jest.restoreAllMocks();
});

function makeSearchEvent(body: unknown): LambdaHttpRequest {
  return {
    version: "2.0",
    rawPath: "/api/search",
    headers: {
      "content-type": "application/json",
      origin: "https://kalawala.test",
      "user-agent": "Jest Browser",
      "x-kalawala-device-id": "device-search-123",
    },
    body: JSON.stringify(body),
    requestContext: {
      http: {
        method: "POST",
        path: "/api/search",
        sourceIp: "203.0.113.20",
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

test("POST /api/search calls Smoobu availability and returns safe property summaries", async () => {
  const fetchFn = jest.fn(async (_url: string | URL, _init?: RequestInit) =>
    jsonResponse({
      availableApartments: [1, 6],
      prices: {
        "1": { price: 510, currency: "USD" },
        "6": { price: 820, currency: "USD" },
      },
      errorMessages: {},
    })
  );
  global.fetch = fetchFn as typeof fetch;
  const handler = createBookingApiHandler(config);

  const response = await handler(
    makeSearchEvent({
      arrivalDate: "2099-06-10",
      departureDate: "2099-06-14",
      guests: 2,
      language: "es",
      discountCode: " 5OFF ",
      source: "booking_page",
    })
  );

  expect(response.statusCode).toBe(200);
  const body = JSON.parse(response.body);
  expect(body.bookingSessionId).toMatch(
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  );
  expect(body.quoteId).toMatch(/^qt_/);
  expect(body.resultsCount).toBe(2);
  expect(body.properties[0]).toMatchObject({
    slug: "Geco",
    listingUrl: "/GecoES",
    name: "Casa Geco",
    guestCapacity: 5,
    amenities: [
      { code: "bath", label: "Ba\u00f1o privado equipado" },
      { code: "kitchen", label: "Cocina privada equipada" },
      { code: "ac", label: "A/C" },
      { code: "parking", label: "Parqueo privado cercado" },
      { code: "wifi", label: "WiFi 100Mbps" },
      { code: "pet", label: "Acepta mascotas" },
    ],
    price: {
      currency: "USD",
      totalAmountCents: 51000,
      nightlyAverageCents: 12750,
      nights: 4,
      includesTaxes: false,
      rateSource: "smoobu",
    },
    actions: {
      viewListingUrl: "/GecoES",
      canCreatePayPalHold: true,
      canUseManualDepositHandoff: true,
    },
  });
  expect(JSON.stringify(body.properties)).not.toContain("smoobuApartmentId");

  const [, init] = fetchFn.mock.calls[0];
  expect(new URL(fetchFn.mock.calls[0][0].toString()).pathname).toBe("/booking/checkApartmentAvailability");
  expect((init?.headers as Record<string, string>)["Api-Key"]).toBe("smoobu-secret-value");
  expect(JSON.parse(init?.body as string)).toEqual({
    arrivalDate: "2099-06-10",
    departureDate: "2099-06-14",
    apartments: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    customerId: 9,
    guests: 2,
    discountCode: "5OFF",
  });
});

test("POST /api/search persists quoted booking session language for server-side communications", async () => {
  const bookingSessions = new InMemoryBookingSessionRepository();
  global.fetch = jest.fn(async () =>
    jsonResponse({
      availableApartments: [1],
      prices: {
        "1": { price: 510, currency: "USD" },
      },
      errorMessages: {},
    })
  ) as typeof fetch;
  const handler = createBookingApiHandler({ ...config, bookingSessions });

  const response = await handler(
    makeSearchEvent({
      arrivalDate: "2099-06-10",
      departureDate: "2099-06-14",
      guests: 3,
      language: "es",
      source: "booking_page",
    })
  );

  expect(response.statusCode).toBe(200);
  const body = JSON.parse(response.body);
  const session = await bookingSessions.getById(body.bookingSessionId);
  expect(session).toMatchObject({
    id: body.bookingSessionId,
    quoteId: body.quoteId,
    status: "quoted",
    language: "es",
    arrivalDate: "2099-06-10",
    departureDate: "2099-06-14",
    guests: 3,
    source: "booking_page",
  });
  expect(body.language).toBe("es");
});

test("POST /api/search returns structured 200 response when no houses are available", async () => {
  const bookingSessions = new InMemoryBookingSessionRepository();
  global.fetch = jest.fn(async () =>
    jsonResponse({
      availableApartments: [],
      prices: {},
      errorMessages: {},
    })
  ) as typeof fetch;
  const handler = createBookingApiHandler({ ...config, bookingSessions });

  const response = await handler(
    makeSearchEvent({
      arrivalDate: "2099-07-01",
      departureDate: "2099-07-03",
      guests: 2,
      language: "en",
    })
  );

  expect(response.statusCode).toBe(200);
  const body = JSON.parse(response.body);
  expect(body.resultsCount).toBe(0);
  expect(body.properties).toEqual([]);
  expect(await bookingSessions.getById(body.bookingSessionId)).toBeUndefined();
  expect(body.availabilityWarnings).toEqual([
    {
      code: "no_properties_available",
      messageKey: "booking.noAvailability",
    },
  ]);
});

test("POST /api/search maps Smoobu restriction details to safe warning codes", async () => {
  global.fetch = jest.fn(async () =>
    jsonResponse({
      availableApartments: [2],
      prices: {
        "2": { price: 300, currency: "USD" },
      },
      errorMessages: {
        "2": {
          errorCode: 401,
          message: "The duration of the booking is too short.",
          minimumLengthOfStay: 5,
        },
      },
    })
  ) as typeof fetch;
  const handler = createBookingApiHandler(config);

  const response = await handler(
    makeSearchEvent({
      arrivalDate: "2099-08-01",
      departureDate: "2099-08-02",
      guests: 2,
      language: "en",
    })
  );

  expect(response.statusCode).toBe(200);
  const body = JSON.parse(response.body);
  expect(body.resultsCount).toBe(0);
  expect(body.availabilityWarnings).toEqual([
    {
      code: "minimum_stay_not_met",
      messageKey: "booking.availability.minimum_stay_not_met",
      propertyId: "d06f7d50-cbbe-4ec6-954c-3e0f9ac2f2e7",
    },
  ]);
  expect(JSON.stringify(body)).not.toContain("The duration of the booking is too short.");
});

test("POST /api/search fails closed when Smoobu customer ID is missing", async () => {
  const handler = createBookingApiHandler({
    ...config,
    smoobu: {
      ...config.smoobu,
      customerId: undefined,
    },
  });

  const response = await handler(
    makeSearchEvent({
      arrivalDate: "2099-08-01",
      departureDate: "2099-08-02",
      guests: 2,
      language: "en",
    })
  );

  expect(response.statusCode).toBe(503);
  expect(JSON.parse(response.body).error).toMatchObject({
    code: "provider_config_missing",
    retryable: false,
  });
});

test("POST /api/search surfaces upstream Smoobu failures as provider errors", async () => {
  global.fetch = jest.fn(async () => jsonResponse({ detail: "temporary" }, { status: 503 })) as typeof fetch;
  const handler = createBookingApiHandler(config);

  const response = await handler(
    makeSearchEvent({
      arrivalDate: "2099-08-01",
      departureDate: "2099-08-02",
      guests: 2,
      language: "en",
    })
  );

  expect(response.statusCode).toBe(503);
  expect(JSON.parse(response.body).error).toMatchObject({
    code: "provider_unavailable",
    retryable: true,
  });
});

test("POST /api/search uses English listing URLs and drops unknown or unpriced Smoobu apartments", async () => {
  global.fetch = jest.fn(async () =>
    jsonResponse({
      availableApartments: [1, 999, 3],
      prices: {
        "1": { price: 510, currency: "USD" },
        "999": { price: 250, currency: "USD" },
      },
      errorMessages: {},
    })
  ) as typeof fetch;
  const handler = createBookingApiHandler(config);

  const response = await handler(
    makeSearchEvent({
      arrivalDate: "2099-09-10",
      departureDate: "2099-09-14",
      guests: 2,
      language: "en",
    })
  );

  expect(response.statusCode).toBe(200);
  const body = JSON.parse(response.body);
  expect(body.resultsCount).toBe(1);
  expect(body.properties).toHaveLength(1);
  expect(body.properties[0]).toMatchObject({
    slug: "Geco",
    listingUrl: "/Geco",
    actions: {
      viewListingUrl: "/Geco",
      canCreatePayPalHold: true,
    },
  });
  expect(JSON.stringify(body.properties)).not.toContain("999");
  expect(JSON.stringify(body.properties)).not.toContain("Tucano");
});
