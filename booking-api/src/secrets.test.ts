import { createBookingApiHandler } from "./app";
import {
  createSecretProvider,
  LambdaExtensionSecretProvider,
  MissingSecretProvider,
  StaticSecretProvider,
  validateBookingSecrets,
} from "./secrets";
import { BookingProviderSecrets, LambdaHttpRequest } from "./types";

const VALID_SECRETS: BookingProviderSecrets = {
  smoobuApiKey: "smoobu-api-key-123456",
  paypalClientId: "paypal-client-id-123456",
  paypalClientSecret: "paypal-client-secret-123456",
  paypalWebhookId: "paypal-webhook-id-123456",
  smoobuWebhookSecret: "smoobu-webhook-secret-123456",
  bookingEncryptionKeyBase64: Buffer.alloc(32, 7).toString("base64"),
  portalSessionSecret: "portal-session-secret-123456",
};

const originalFetch = global.fetch;

afterEach(() => {
  global.fetch = originalFetch;
});

test("validateBookingSecrets: rejects a non-object payload", () => {
  expect(() => validateBookingSecrets("not-an-object")).toThrow("JSON object");
  expect(() => validateBookingSecrets(null)).toThrow("JSON object");
  expect(() => validateBookingSecrets([1, 2, 3])).toThrow("JSON object");
});

test("validateBookingSecrets: rejects fields shorter than 16 characters", () => {
  expect(() =>
    validateBookingSecrets({
      ...VALID_SECRETS,
      smoobuApiKey: "short",
    })
  ).toThrow("invalid");
});

test("validateBookingSecrets: requires a 32-byte base64 encryption key", () => {
  expect(() =>
    validateBookingSecrets({
      ...VALID_SECRETS,
      bookingEncryptionKeyBase64: Buffer.alloc(16, 7).toString("base64"),
    })
  ).toThrow("invalid");
});

test("createSecretProvider: prefers Secrets Manager secret id over raw environment secrets", () => {
  const provider = createSecretProvider({
    BOOKING_API_SECRETS_MANAGER_SECRET_ID: "kalawala/dev/booking-api",
    AWS_SESSION_TOKEN: "session-token",
    SMOOBU_API_KEY: "raw-env-value-should-not-win",
  });

  expect(provider.source).toBe("aws-secrets-manager-extension");
});

test("createSecretProvider: blocks raw provider secrets outside local override mode", async () => {
  const provider = createSecretProvider({
    NODE_ENV: "production",
    SMOOBU_API_KEY: VALID_SECRETS.smoobuApiKey,
    PAYPAL_CLIENT_ID: VALID_SECRETS.paypalClientId,
    PAYPAL_CLIENT_SECRET: VALID_SECRETS.paypalClientSecret,
    PAYPAL_WEBHOOK_ID: VALID_SECRETS.paypalWebhookId,
    SMOOBU_WEBHOOK_SECRET: VALID_SECRETS.smoobuWebhookSecret,
    BOOKING_API_ENCRYPTION_KEY_BASE64: VALID_SECRETS.bookingEncryptionKeyBase64,
    BOOKING_API_PORTAL_SESSION_SECRET: VALID_SECRETS.portalSessionSecret,
  });

  expect(provider.source).toBe("invalid");
  await expect(provider.getSecrets()).rejects.toMatchObject({ code: "raw_env_secrets_not_allowed" });
});

test("LambdaExtensionSecretProvider: loads and caches a Secrets Manager JSON bundle", async () => {
  const fetchMock = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      SecretString: JSON.stringify(VALID_SECRETS),
    }),
  });
  global.fetch = fetchMock as unknown as typeof fetch;
  let now = 1_000;
  const provider = new LambdaExtensionSecretProvider({
    secretId: "kalawala/dev/booking-api",
    sessionToken: "session-token",
    cacheTtlMs: 10_000,
    now: () => now,
  });

  await expect(provider.getSecrets()).resolves.toEqual(VALID_SECRETS);
  now += 500;
  await expect(provider.getSecrets()).resolves.toEqual(VALID_SECRETS);

  expect(fetchMock).toHaveBeenCalledTimes(1);
  expect(fetchMock.mock.calls[0][0]).toContain("/secretsmanager/get?secretId=kalawala%2Fdev%2Fbooking-api");
  expect(fetchMock.mock.calls[0][1].headers["X-Aws-Parameters-Secrets-Token"]).toBe("session-token");
});

test("MissingSecretProvider: getSecrets throws 503 when no secret source is configured", async () => {
  const provider = new MissingSecretProvider();
  expect(provider.source).toBe("missing");
  await expect(provider.getSecrets()).rejects.toMatchObject({
    statusCode: 503,
    code: "secrets_not_configured",
  });
});

test("createSecretProvider: accepts BOOKING_API_SECRETS_JSON in test environment", async () => {
  const provider = createSecretProvider({
    NODE_ENV: "test",
    BOOKING_API_SECRETS_JSON: JSON.stringify(VALID_SECRETS),
  });

  expect(provider.source).toBe("static");
  await expect(provider.getSecrets()).resolves.toEqual(VALID_SECRETS);
});

test("createSecretProvider: accepts BOOKING_API_SECRETS_JSON with explicit insecure opt-in", async () => {
  const provider = createSecretProvider({
    NODE_ENV: "development",
    BOOKING_API_ALLOW_INSECURE_ENV_SECRETS: "true",
    BOOKING_API_SECRETS_JSON: JSON.stringify(VALID_SECRETS),
  });

  expect(provider.source).toBe("static");
  await expect(provider.getSecrets()).resolves.toEqual(VALID_SECRETS);
});

test("createSecretProvider: blocks BOOKING_API_SECRETS_JSON in production", async () => {
  const provider = createSecretProvider({
    NODE_ENV: "production",
    BOOKING_API_SECRETS_JSON: JSON.stringify(VALID_SECRETS),
  });

  expect(provider.source).toBe("invalid");
  await expect(provider.getSecrets()).rejects.toMatchObject({ code: "raw_env_secrets_not_allowed" });
});

test("LambdaExtensionSecretProvider: re-fetches after cache expires", async () => {
  const fetchMock = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ SecretString: JSON.stringify(VALID_SECRETS) }),
  });
  global.fetch = fetchMock as unknown as typeof fetch;
  let now = 1_000;
  const provider = new LambdaExtensionSecretProvider({
    secretId: "kalawala/dev/booking-api",
    sessionToken: "session-token",
    cacheTtlMs: 10_000,
    now: () => now,
  });

  await provider.getSecrets();
  now += 10_001;
  await provider.getSecrets();

  expect(fetchMock).toHaveBeenCalledTimes(2);
});

test("LambdaExtensionSecretProvider: throws when session token is absent", async () => {
  const provider = new LambdaExtensionSecretProvider({
    secretId: "kalawala/dev/booking-api",
  });

  await expect(provider.getSecrets()).rejects.toMatchObject({
    code: "secrets_unavailable",
  });
});

test("Smoobu webhook route reads shared secret from secret provider", async () => {
  const handler = createBookingApiHandler({
    allowedOrigins: [],
    maxBodyBytes: 64 * 1024,
    secrets: new StaticSecretProvider(VALID_SECRETS),
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
  });

  const event: LambdaHttpRequest = {
    version: "2.0",
    rawPath: "/api/webhooks/smoobu",
    headers: {
      "content-type": "application/json",
      "x-smoobu-webhook-secret": VALID_SECRETS.smoobuWebhookSecret,
    },
    body: JSON.stringify({ action: "updateRates", data: { id: 123 } }),
    requestContext: {
      http: {
        method: "POST",
        path: "/api/webhooks/smoobu",
        sourceIp: "203.0.113.10",
      },
    },
  };

  const response = await handler(event);

  expect(response.statusCode).toBe(501);
  expect(JSON.parse(response.body).error.code).toBe("not_implemented");
});
