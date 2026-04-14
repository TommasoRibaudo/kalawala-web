import { timingSafeEqual } from "crypto";
import { getHeader } from "./http/request";
import { jsonResponse } from "./http/response";
import { notImplemented, ApiError } from "./http/errors";
import { Router } from "./http/router";
import { BookingApiConfig, RouteRequest } from "./types";
import {
  assertJsonObject,
  validateBookingSessionRequest,
  validateCalendarRequest,
  validateCancellationRequest,
  validateDepositHandoffEvent,
  validateDepositHandoffQuery,
  validateHoldRequest,
  validatePayPalCaptureRequest,
  validatePortalLogin,
  validatePortalMessage,
  validateReservationPublicId,
  validateSearchRequest,
} from "./validation";

export function createRouter(config: BookingApiConfig): Router {
  const router = new Router();

  router.get("/api/health", healthHandler);

  router.post(
    "/api/search",
    async (request) => {
      validateSearchRequest(request.body);
      throw notImplemented("Availability search is scaffolded; Smoobu integration lands in task 3.2.");
    },
    { requireJsonBody: true, abuseProtection: "availabilitySearch" }
  );

  router.get("/api/calendar/:apartmentSlug", async (request) => {
    validateCalendarRequest(request.pathParams, request.query);
    throw notImplemented("Calendar pricing route is scaffolded; Smoobu rates integration lands in task 3.8.");
  }, { abuseProtection: "publicRead" });

  router.post(
    "/api/holds",
    async (request) => {
      validateHoldRequest(request.body);
      throw notImplemented("PayPal hold creation is scaffolded; DB and Smoobu hold logic land in task 4.1.");
    },
    { requireJsonBody: true, requireIdempotencyKey: true, abuseProtection: "holdCreate" }
  );

  router.post(
    "/api/paypal/order",
    async (request) => {
      validateBookingSessionRequest(request.body);
      throw notImplemented("PayPal order creation is scaffolded; Orders API integration lands in task 5.1.");
    },
    { requireJsonBody: true, requireIdempotencyKey: true, abuseProtection: "paymentCreate" }
  );

  router.post(
    "/api/paypal/capture",
    async (request) => {
      validatePayPalCaptureRequest(request.body);
      throw notImplemented("PayPal capture is scaffolded; capture reconciliation lands in task 5.1.");
    },
    { requireJsonBody: true, requireIdempotencyKey: true, abuseProtection: "paymentCapture" }
  );

  router.get("/api/deposit-handoff", async (request) => {
    validateDepositHandoffQuery(request.query);
    throw notImplemented("Manual deposit handoff route is scaffolded; offline instructions land in task 4.3.");
  }, { abuseProtection: "publicRead" });

  router.post(
    "/api/deposit-handoff/events",
    async (request) => {
      validateDepositHandoffEvent(request.body);
      throw notImplemented("Manual deposit handoff event route is scaffolded; analytics/notification lands in task 4.4.");
    },
    { requireJsonBody: true, requireIdempotencyKey: true, abuseProtection: "depositEvent" }
  );

  router.post(
    "/api/webhooks/paypal",
    async (request) => {
      assertJsonObject(request.body);
      assertPayPalWebhookHeaders(request);
      throw notImplemented("PayPal webhook route is scaffolded; signature verification and state transitions land in task 5.2.");
    },
    { requireJsonBody: true, preserveRawBody: true, abuseProtection: "webhook" }
  );

  router.post(
    "/api/webhooks/smoobu",
    async (request) => {
      assertJsonObject(request.body);
      await assertSmoobuWebhookSecret(request, config);
      throw notImplemented("Smoobu webhook route is scaffolded; dedupe and reconciliation land in task 6.1.");
    },
    { requireJsonBody: true, preserveRawBody: true, rejectQuerySecrets: true, abuseProtection: "webhook" }
  );

  router.post(
    "/api/portal/login",
    async (request) => {
      validatePortalLogin(request.body);
      throw notImplemented("Portal login is scaffolded; password auth and sessions land in task 6.3.");
    },
    { requireJsonBody: true, abuseProtection: "portalLogin" }
  );

  router.get("/api/portal/reservation/:reservationPublicId", async (request) => {
    validateReservationPublicId(request.pathParams);
    throw notImplemented("Portal reservation read is scaffolded; authenticated reservation access lands in task 6.4.");
  }, { abuseProtection: "portalRead" });

  router.post(
    "/api/portal/reservation/:reservationPublicId/help-request",
    async (request) => {
      validateReservationPublicId(request.pathParams);
      validatePortalMessage(request.body);
      throw notImplemented("Portal help requests are scaffolded; support event persistence lands in task 6.4.");
    },
    { requireJsonBody: true, requireIdempotencyKey: true, abuseProtection: "portalWrite" }
  );

  router.post(
    "/api/portal/reservation/:reservationPublicId/cancellation-request",
    async (request) => {
      validateReservationPublicId(request.pathParams);
      validateCancellationRequest(request.body);
      throw notImplemented("Portal cancellation requests are scaffolded; support event persistence lands in task 6.4.");
    },
    { requireJsonBody: true, requireIdempotencyKey: true, abuseProtection: "portalWrite" }
  );

  return router;
}

function healthHandler(request: RouteRequest) {
  return jsonResponse(
    200,
    {
      status: "ok",
      service: "booking-api",
      correlationId: request.correlationId,
    },
    request.responseHeaders
  );
}

function assertPayPalWebhookHeaders(request: RouteRequest): void {
  const certUrl = getHeader(request.headers, "paypal-cert-url");
  const requiredHeaders = [
    "paypal-auth-algo",
    "paypal-cert-url",
    "paypal-transmission-id",
    "paypal-transmission-sig",
    "paypal-transmission-time",
  ];

  const missing = requiredHeaders.filter((header) => !getHeader(request.headers, header));
  if (missing.length > 0) {
    throw new ApiError(400, "invalid_webhook_headers", "PayPal webhook verification headers are required.", {
      fieldErrors: {
        headers: missing.map((header) => `${header}_required`),
      },
    });
  }

  if (!certUrl) {
    return;
  }

  let parsed: URL;
  try {
    parsed = new URL(certUrl);
  } catch {
    throw new ApiError(400, "invalid_webhook_headers", "PayPal cert URL is invalid.");
  }

  const hostname = parsed.hostname.toLowerCase();
  if (parsed.protocol !== "https:" || (hostname !== "paypal.com" && !hostname.endsWith(".paypal.com"))) {
    throw new ApiError(400, "invalid_webhook_headers", "PayPal cert URL host is not allowed.");
  }
}

async function assertSmoobuWebhookSecret(request: RouteRequest, config: BookingApiConfig): Promise<void> {
  const { smoobuWebhookSecret } = await config.secrets.getSecrets();

  const provided = getHeader(request.headers, "x-smoobu-webhook-secret");
  const expected = Buffer.from(smoobuWebhookSecret);
  const actual = Buffer.from(provided ?? "");
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) {
    throw new ApiError(401, "unauthorized", "Webhook secret is invalid.");
  }
}
