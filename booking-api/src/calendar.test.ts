import { createBookingApiHandler } from "./app";
import { clearCalendarRatesCache } from "./calendar";
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

beforeEach(() => {
  clearCalendarRatesCache();
});

afterEach(() => {
  global.fetch = originalFetch;
  jest.restoreAllMocks();
  clearCalendarRatesCache();
});

function makeCalendarEvent(slug = "Geco", month = "2099-06", language = "en"): LambdaHttpRequest {
  return {
    version: "2.0",
    rawPath: `/api/calendar/${slug}`,
    queryStringParameters: {
      month,
      language,
    },
    headers: {
      origin: "https://kalawala.test",
      "user-agent": "Jest Browser",
      "x-kalawala-device-id": "device-calendar-123",
    },
    requestContext: {
      http: {
        method: "GET",
        path: `/api/calendar/${slug}`,
        sourceIp: "203.0.113.30",
        userAgent: "Jest Browser",
      },
    },
  };
}

function makeSmoobuWebhookEvent(body: unknown): LambdaHttpRequest {
  return {
    version: "2.0",
    rawPath: "/api/webhooks/smoobu",
    headers: {
      "content-type": "application/json",
      "x-smoobu-webhook-secret": "smoobu-webhook-secret-value",
      "user-agent": "Smoobu Webhook",
    },
    body: JSON.stringify(body),
    requestContext: {
      http: {
        method: "POST",
        path: "/api/webhooks/smoobu",
        sourceIp: "203.0.113.40",
        userAgent: "Smoobu Webhook",
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

test("GET /api/calendar/:apartmentSlug returns full-month Smoobu rates with stats and price dots", async () => {
  const fetchFn = jest.fn(async (_url: string | URL, _init?: RequestInit) =>
    jsonResponse({
      data: {
        "1": {
          "2099-06-01": { price: 100, min_length_of_stay: 2, available: 1 },
          "2099-06-02": { price: 120, min_length_of_stay: null, available: 1 },
          "2099-06-03": { price: 150, min_length_of_stay: 3, available: 1 },
          "2099-06-04": { price: null, min_length_of_stay: null, available: 1 },
          "2099-06-05": { price: 200, min_length_of_stay: 4, available: 0 },
        },
      },
    })
  );
  global.fetch = fetchFn as typeof fetch;
  const handler = createBookingApiHandler(config);

  const response = await handler(makeCalendarEvent("GecoES", "2099-06", "es"));

  expect(response.statusCode).toBe(200);
  const body = JSON.parse(response.body);
  expect(body.property).toEqual({
    propertyId: "b8a1f2e7-86d3-4c30-8f6a-8046a5f9a111",
    slug: "Geco",
    name: "Casa Geco",
  });
  expect(body.month).toBe("2099-06");
  expect(body.currency).toBe("USD");
  expect(body.days).toHaveLength(30);
  expect(body.stats).toEqual({
    availableNightCount: 3,
    minPriceCents: 10000,
    maxPriceCents: 15000,
    averagePriceCents: 12333,
  });
  expect(body.days.slice(0, 6)).toEqual([
    {
      date: "2099-06-01",
      available: true,
      priceCents: 10000,
      minStay: 2,
      dot: "green",
      ariaLabelKey: "calendar.priceLow",
    },
    {
      date: "2099-06-02",
      available: true,
      priceCents: 12000,
      minStay: null,
      dot: "yellow",
      ariaLabelKey: "calendar.priceAverage",
    },
    {
      date: "2099-06-03",
      available: true,
      priceCents: 15000,
      minStay: 3,
      dot: "red",
      ariaLabelKey: "calendar.priceHigh",
    },
    {
      date: "2099-06-04",
      available: true,
      priceCents: null,
      minStay: null,
      dot: "grey",
      ariaLabelKey: "calendar.unavailable",
    },
    {
      date: "2099-06-05",
      available: false,
      priceCents: 20000,
      minStay: 4,
      dot: "grey",
      ariaLabelKey: "calendar.unavailable",
    },
    {
      date: "2099-06-06",
      available: false,
      priceCents: null,
      minStay: null,
      dot: "grey",
      ariaLabelKey: "calendar.unavailable",
    },
  ]);
  expect(body.cache).toMatchObject({
    status: "miss",
    ttlSeconds: 300,
  });
  expect(JSON.stringify(body)).not.toContain("smoobuApartmentId");

  const [url, init] = fetchFn.mock.calls[0];
  const parsedUrl = new URL(url.toString());
  expect(parsedUrl.pathname).toBe("/api/rates");
  expect(parsedUrl.searchParams.getAll("apartments[]")).toEqual(["1"]);
  expect(parsedUrl.searchParams.get("start_date")).toBe("2099-06-01");
  expect(parsedUrl.searchParams.get("end_date")).toBe("2099-06-30");
  expect((init?.headers as Record<string, string>)["Api-Key"]).toBe("smoobu-secret-value");
});

test("GET /api/calendar/:apartmentSlug caches responses per apartment and month", async () => {
  global.fetch = jest.fn(async () =>
    jsonResponse({
      data: {
        "1": {
          "2099-07-01": { price: 100, min_length_of_stay: 2, available: 1 },
        },
      },
    })
  ) as typeof fetch;
  const handler = createBookingApiHandler(config);

  const first = await handler(makeCalendarEvent("Geco", "2099-07"));
  const second = await handler(makeCalendarEvent("Geco", "2099-07"));

  expect(first.statusCode).toBe(200);
  expect(second.statusCode).toBe(200);
  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(JSON.parse(first.body).cache.status).toBe("miss");
  expect(JSON.parse(second.body).cache.status).toBe("hit");
});

test("POST /api/webhooks/smoobu updateRates invalidates cached calendar rates", async () => {
  const fetchFn = jest.fn(async () =>
    jsonResponse({
      data: {
        "1": {
          "2099-08-01": { price: 100, min_length_of_stay: 2, available: 1 },
        },
      },
    })
  );
  global.fetch = fetchFn as typeof fetch;
  const handler = createBookingApiHandler(config);

  await handler(makeCalendarEvent("Geco", "2099-08"));
  await handler(makeCalendarEvent("Geco", "2099-08"));
  expect(fetchFn).toHaveBeenCalledTimes(1);

  const webhookResponse = await handler(
    makeSmoobuWebhookEvent({
      action: "updateRates",
      data: {
        apartmentId: 1,
        date: "2099-08-12",
      },
    })
  );

  expect(webhookResponse.statusCode).toBe(200);
  expect(JSON.parse(webhookResponse.body)).toEqual({
    received: true,
    action: "updateRates",
    cache: {
      invalidatedEntries: 1,
    },
  });

  await handler(makeCalendarEvent("Geco", "2099-08"));
  expect(fetchFn).toHaveBeenCalledTimes(2);
});

test("GET /api/calendar/:apartmentSlug rejects unknown public property slugs", async () => {
  const handler = createBookingApiHandler(config);

  const response = await handler(makeCalendarEvent("Unknown", "2099-06"));

  expect(response.statusCode).toBe(404);
  expect(JSON.parse(response.body).error).toMatchObject({
    code: "property_not_found",
  });
});
