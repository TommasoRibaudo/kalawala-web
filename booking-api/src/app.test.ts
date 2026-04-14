import { createBookingApiHandler } from "./app";
import { BookingApiConfig, LambdaHttpRequest } from "./types";

const config: BookingApiConfig = {
  allowedOrigins: ["https://kalawala.test"],
  maxBodyBytes: 64 * 1024,
  abuseProtection: {
    enabled: true,
    captchaChallengesEnabled: true,
    maxTrackedBuckets: 100,
  },
};

const validHoldBody = {
  quoteId: "qt_valid",
  bookingSessionId: "b8a1f2e7-86d3-4c30-8f6a-8046a5f9a111",
  propertyId: "a1b2c3d4-1234-4abc-89ab-000000000001",
  paymentMethod: "paypal",
  guest: {
    firstName: "Jane",
    lastName: "Doe",
    email: "jane@example.com",
  },
  portalPassword: "correct-horse-battery",
  termsAccepted: true,
};

function makePostEvent(body: unknown, idempotencyKey: string): LambdaHttpRequest {
  return {
    version: "2.0",
    rawPath: "/api/holds",
    headers: {
      "content-type": "application/json",
      "idempotency-key": idempotencyKey,
      "user-agent": "Jest Browser",
      "x-kalawala-device-id": "device-abc-123",
    },
    body: JSON.stringify(body),
    requestContext: {
      http: {
        method: "POST",
        path: "/api/holds",
        sourceIp: "203.0.113.10",
        userAgent: "Jest Browser",
      },
    },
  };
}

test("booking handler: hold route triggers CAPTCHA before repeated create attempts reach handler", async () => {
  const handler = createBookingApiHandler(config);

  const first = await handler(makePostEvent(validHoldBody, "idem-key-00000001"));
  const second = await handler(makePostEvent(validHoldBody, "idem-key-00000002"));
  const third = await handler(makePostEvent(validHoldBody, "idem-key-00000003"));

  expect(first.statusCode).toBe(501);
  expect(second.statusCode).toBe(501);
  expect(third.statusCode).toBe(403);
  expect(third.headers["X-Captcha-Required"]).toBe("true");
  expect(JSON.parse(third.body).error.code).toBe("captcha_required");
});
