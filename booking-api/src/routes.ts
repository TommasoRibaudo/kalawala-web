import { timingSafeEqual } from "crypto";
import { getHeader } from "./http/request";
import { jsonResponse } from "./http/response";
import { notImplemented, ApiError } from "./http/errors";
import { Router } from "./http/router";
import { handleCalendarRequest } from "./calendar";
import { handleManualDepositHandoff, handleManualDepositHandoffEvent } from "./depositHandoff";
import { handleCreatePayPalHold } from "./holds";
import { handleCreatePayPalOrder, handleCapturePayPalOrder } from "./paypalOrders";
import { handlePayPalWebhook } from "./paypalWebhooks";
import { handleAvailabilitySearch } from "./search";
import { handleSmoobuWebhook } from "./smoobuWebhooks";
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
      const searchRequest = validateSearchRequest(request.body);
      return handleAvailabilitySearch(searchRequest, config, request.responseHeaders, request.observability);
    },
    { requireJsonBody: true, abuseProtection: "availabilitySearch" }
  );

  router.get("/api/calendar/:apartmentSlug", async (request) => {
    const calendarRequest = validateCalendarRequest(request.pathParams, request.query);
    return handleCalendarRequest(calendarRequest, config, request.responseHeaders, request.observability);
  }, { abuseProtection: "publicRead" });

  router.post(
    "/api/holds",
    async (request) => {
      const holdRequest = validateHoldRequest(request.body);
      return handleCreatePayPalHold(holdRequest, request, config);
    },
    { requireJsonBody: true, requireIdempotencyKey: true, abuseProtection: "holdCreate" }
  );

  router.post(
    "/api/paypal/order",
    async (request) => {
      const body = validateBookingSessionRequest(request.body);
      return handleCreatePayPalOrder(body, request, config);
    },
    { requireJsonBody: true, requireIdempotencyKey: true, abuseProtection: "paymentCreate" }
  );

  router.post(
    "/api/paypal/capture",
    async (request) => {
      const body = validatePayPalCaptureRequest(request.body);
      return handleCapturePayPalOrder(body, request, config);
    },
    { requireJsonBody: true, requireIdempotencyKey: true, abuseProtection: "paymentCapture" }
  );

  router.get("/api/deposit-handoff", async (request) => {
    const query = validateDepositHandoffQuery(request.query);
    return handleManualDepositHandoff(query, config, request.responseHeaders, request.observability);
  }, { abuseProtection: "publicRead" });

  router.post(
    "/api/deposit-handoff/events",
    async (request) => {
      const event = validateDepositHandoffEvent(request.body);
      return handleManualDepositHandoffEvent(event, config, request.responseHeaders, request.observability);
    },
    { requireJsonBody: true, requireIdempotencyKey: true, abuseProtection: "depositEvent" }
  );

  router.post(
    "/api/webhooks/paypal",
    async (request) => {
      assertJsonObject(request.body);
      assertPayPalWebhookHeaders(request);
      return handlePayPalWebhook(request, config);
    },
    { requireJsonBody: true, preserveRawBody: true, abuseProtection: "webhook" }
  );

  router.post(
    "/api/webhooks/smoobu",
    async (request) => {
      const body = assertJsonObject(request.body);
      await assertSmoobuWebhookSecret(request, config);
      return handleSmoobuWebhook(request, config, body);
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
