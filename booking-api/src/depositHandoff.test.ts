import { createBookingApiHandler } from "./app";
import { InMemoryBookingSessionRepository } from "./bookingSessions";
import { BOOKING_PROPERTIES } from "./propertyCatalog";
import { MissingSecretProvider } from "./secrets";
import { BookingApiConfig, LambdaHttpRequest } from "./types";

function createConfig(bookingSessions = new InMemoryBookingSessionRepository()): BookingApiConfig {
  return {
    allowedOrigins: ["https://kalawala.test"],
    maxBodyBytes: 64 * 1024,
    secrets: new MissingSecretProvider(),
    smoobu: {
      baseUrl: "https://login.smoobu.com",
      timeoutMs: 8_000,
      maxRetries: 3,
      baseBackoffMs: 250,
      maxBackoffMs: 2_000,
      maxRateLimitDelayMs: 60_000,
      holdChannelId: 11,
    },
    bookingSessions,
    hold: {
      defaultTtlMinutes: 60,
      idempotencyTtlMinutes: 1440,
      staleIdempotencyLockSeconds: 120,
    },
    abuseProtection: {
      enabled: true,
      captchaChallengesEnabled: true,
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

function makeGetEvent(queryStringParameters: Record<string, string>): LambdaHttpRequest {
  return {
    version: "2.0",
    rawPath: "/api/deposit-handoff",
    queryStringParameters,
    headers: {
      "user-agent": "Jest Browser",
      "x-kalawala-device-id": "device-deposit-123",
    },
    requestContext: {
      http: {
        method: "GET",
        path: "/api/deposit-handoff",
        sourceIp: "203.0.113.20",
        userAgent: "Jest Browser",
      },
    },
  };
}

test("GET /api/deposit-handoff returns read-only manual deposit instructions", async () => {
  const handler = createBookingApiHandler(createConfig());

  const response = await handler(makeGetEvent({ language: "en" }));
  const body = JSON.parse(response.body);

  expect(response.statusCode).toBe(200);
  expect(body).toMatchObject({
    language: "en",
    status: "manual_deposit_handoff",
    isBookingConfirmed: false,
    doesCreateHold: false,
    messageKey: "deposit.handoffIntro",
  });
  expect(body.instructions.bodyKeys).toEqual([
    "deposit.bankInstructions",
    "deposit.notConfirmed",
    "deposit.staffWillConfirm",
    "deposit.noReceiptUpload",
    "deposit.contactUs",
  ]);
  expect(body.instructions.contactMethods).toEqual([
    {
      type: "whatsapp",
      label: "+506 8463 2276",
      url: "https://wa.me/50684632276",
    },
    {
      type: "email",
      label: "reservas.kalawala@gmail.com",
      url: "mailto:reservas.kalawala@gmail.com",
    },
  ]);
});

test("GET /api/deposit-handoff echoes Spanish language without booking context", async () => {
  const handler = createBookingApiHandler(createConfig());

  const response = await handler(makeGetEvent({ language: "es" }));
  const body = JSON.parse(response.body);

  expect(response.statusCode).toBe(200);
  expect(body).toMatchObject({
    language: "es",
    status: "manual_deposit_handoff",
    isBookingConfirmed: false,
    doesCreateHold: false,
  });
  expect(body.bookingContext).toBeUndefined();
});

test("GET /api/deposit-handoff includes localized booking context when quote and property match", async () => {
  const bookingSessions = new InMemoryBookingSessionRepository();
  const property = BOOKING_PROPERTIES[0];
  const session = await bookingSessions.createQuotedSession({
    arrivalDate: "2099-06-10",
    departureDate: "2099-06-14",
    guests: 2,
    language: "es",
    quotedProperties: [
      {
        propertyId: property.propertyId,
        currency: "USD",
        totalAmountCents: 51000,
        nightlyAverageCents: 12750,
        nights: 4,
        includesTaxes: false,
        rateSource: "smoobu",
      },
    ],
  });
  const handler = createBookingApiHandler(createConfig(bookingSessions));

  const response = await handler(
    makeGetEvent({
      language: "es",
      quoteId: session.quoteId,
      propertyId: property.propertyId,
    })
  );
  const body = JSON.parse(response.body);

  expect(response.statusCode).toBe(200);
  expect(body.bookingContext).toMatchObject({
    quoteId: session.quoteId,
    arrivalDate: "2099-06-10",
    departureDate: "2099-06-14",
    guests: 2,
    property: {
      propertyId: property.propertyId,
      slug: property.slug,
      listingUrl: "/GecoES",
      name: property.name,
    },
  });
});

test("GET /api/deposit-handoff includes quote dates when quoteId is provided without propertyId", async () => {
  const bookingSessions = new InMemoryBookingSessionRepository();
  const session = await bookingSessions.createQuotedSession({
    arrivalDate: "2099-06-10",
    departureDate: "2099-06-14",
    guests: 2,
    language: "en",
  });
  const handler = createBookingApiHandler(createConfig(bookingSessions));

  const response = await handler(
    makeGetEvent({
      language: "en",
      quoteId: session.quoteId,
    })
  );
  const body = JSON.parse(response.body);

  expect(response.statusCode).toBe(200);
  expect(body.bookingContext).toEqual({
    quoteId: session.quoteId,
    arrivalDate: "2099-06-10",
    departureDate: "2099-06-14",
    guests: 2,
  });
});

test("GET /api/deposit-handoff returns partial context when quoteId is unknown", async () => {
  const handler = createBookingApiHandler(createConfig());

  const response = await handler(
    makeGetEvent({
      language: "en",
      quoteId: "qt_UNKNOWN",
    })
  );
  const body = JSON.parse(response.body);

  expect(response.statusCode).toBe(200);
  expect(body.bookingContext).toEqual({
    quoteId: "qt_UNKNOWN",
  });
});

test("GET /api/deposit-handoff rejects a property that does not belong to the quote", async () => {
  const bookingSessions = new InMemoryBookingSessionRepository();
  const session = await bookingSessions.createQuotedSession({
    arrivalDate: "2099-06-10",
    departureDate: "2099-06-14",
    guests: 2,
    language: "en",
    quotedProperties: [
      {
        propertyId: BOOKING_PROPERTIES[0].propertyId,
        currency: "USD",
        totalAmountCents: 51000,
        nightlyAverageCents: 12750,
        nights: 4,
        includesTaxes: false,
        rateSource: "smoobu",
      },
    ],
  });
  const handler = createBookingApiHandler(createConfig(bookingSessions));

  const response = await handler(
    makeGetEvent({
      language: "en",
      quoteId: session.quoteId,
      propertyId: BOOKING_PROPERTIES[1].propertyId,
    })
  );
  const body = JSON.parse(response.body);

  expect(response.statusCode).toBe(404);
  expect(body.error.code).toBe("deposit_context_not_found");
});
