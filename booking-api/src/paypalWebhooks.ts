import { createHash, randomUUID } from "crypto";
import { BookingSessionRepository } from "./bookingSessions";
import { ApiError } from "./http/errors";
import { getHeader } from "./http/request";
import { jsonResponse } from "./http/response";
import { PaymentRepository } from "./payments";
import { createPayPalClient, PayPalVerifySignatureInput } from "./paypalClient";
import { ApiResponse, BookingApiConfig, RouteRequest } from "./types";

// ─── Webhook event repository ─────────────────────────────────────────────────

export type WebhookEventStatus = "pending" | "processed" | "duplicate" | "ignored" | "failed";

export interface WebhookEventRecord {
  id: string;
  provider: "paypal";
  externalEventId: string;
  eventType: string;
  receivedAt: string;
  processedAt?: string;
  status: WebhookEventStatus;
  payloadHash: string;
}

export interface WebhookEventRepository {
  /** Returns true if the event was newly inserted; false if it was a duplicate. */
  insertIfNew(input: {
    externalEventId: string;
    eventType: string;
    payloadHash: string;
  }): Promise<{ inserted: boolean; record: WebhookEventRecord }>;

  markProcessed(externalEventId: string, status: WebhookEventStatus): Promise<void>;
}

export class InMemoryWebhookEventRepository implements WebhookEventRepository {
  private readonly records = new Map<string, WebhookEventRecord>();

  async insertIfNew(input: {
    externalEventId: string;
    eventType: string;
    payloadHash: string;
  }): Promise<{ inserted: boolean; record: WebhookEventRecord }> {
    const existing = this.records.get(input.externalEventId);
    if (existing) {
      return { inserted: false, record: existing };
    }

    const record: WebhookEventRecord = {
      id: randomUUID(),
      provider: "paypal",
      externalEventId: input.externalEventId,
      eventType: input.eventType,
      receivedAt: new Date().toISOString(),
      status: "pending",
      payloadHash: input.payloadHash,
    };
    this.records.set(input.externalEventId, record);
    return { inserted: true, record };
  }

  async markProcessed(externalEventId: string, status: WebhookEventStatus): Promise<void> {
    const existing = this.records.get(externalEventId);
    if (existing) {
      this.records.set(externalEventId, {
        ...existing,
        status,
        processedAt: new Date().toISOString(),
      });
    }
  }
}

// ─── PayPal webhook event shapes ──────────────────────────────────────────────

interface PayPalWebhookEvent {
  id?: string;
  event_type?: string;
  resource?: {
    id?: string;
    status?: string;
    custom_id?: string;
    purchase_units?: Array<{
      reference_id?: string;
      custom_id?: string;
      payments?: {
        captures?: Array<{
          id?: string;
          status?: string;
          amount?: { currency_code?: string; value?: string };
        }>;
      };
    }>;
  };
}

// ─── Signature verification ───────────────────────────────────────────────────

/**
 * Verifies a PayPal webhook signature using the postback (online) method.
 * Calls PayPal's POST /v1/notifications/verify-webhook-signature endpoint.
 *
 * Returns:
 *  - "valid"     — signature verified successfully
 *  - "invalid"   — PayPal returned FAILURE (forged or tampered webhook)
 *  - "error"     — transient provider error (network, 5xx); caller should 503
 */
export async function verifyPayPalWebhookSignature(
  request: RouteRequest,
  config: BookingApiConfig,
  webhookId: string
): Promise<"valid" | "invalid" | "error"> {
  const authAlgo = getHeader(request.headers, "paypal-auth-algo");
  const certUrl = getHeader(request.headers, "paypal-cert-url");
  const transmissionId = getHeader(request.headers, "paypal-transmission-id");
  const transmissionSig = getHeader(request.headers, "paypal-transmission-sig");
  const transmissionTime = getHeader(request.headers, "paypal-transmission-time");

  if (!authAlgo || !certUrl || !transmissionId || !transmissionSig || !transmissionTime) {
    return "invalid";
  }

  let parsedEvent: unknown;
  try {
    parsedEvent = JSON.parse(request.rawBody);
  } catch {
    return "invalid";
  }

  const verifyPayload: PayPalVerifySignatureInput = {
    auth_algo: authAlgo,
    cert_url: certUrl,
    transmission_id: transmissionId,
    transmission_sig: transmissionSig,
    transmission_time: transmissionTime,
    webhook_id: webhookId,
    webhook_event: parsedEvent,
  };

  const paypalClient = await createPayPalClient(config);

  try {
    // PayPalClient.verifyWebhookSignature already records the provider call metric
    const result = await paypalClient.verifyWebhookSignature(verifyPayload, request.observability);
    return result.verification_status === "SUCCESS" ? "valid" : "invalid";
  } catch (error) {
    // Provider error (network timeout, 5xx) — distinguish from a forged webhook
    request.observability.recordSecurityEvent({
      name: "paypal_webhook_verify_provider_error",
      severity: "error",
      route: "/api/webhooks/paypal",
      provider: "paypal",
      errorCode: error instanceof ApiError ? error.code : "unknown_error",
    });
    return "error";
  }
}

// ─── POST /api/webhooks/paypal ────────────────────────────────────────────────

export async function handlePayPalWebhook(
  request: RouteRequest,
  config: BookingApiConfig
): Promise<ApiResponse> {
  const { paypalWebhookId } = await config.secrets.getSecrets();

  // 1. Verify signature
  //    - "valid"   → proceed
  //    - "invalid" → reject with 400 (security event)
  //    - "error"   → reject with 503 so PayPal retries (transient provider failure)
  const signatureResult = await verifyPayPalWebhookSignature(request, config, paypalWebhookId);

  if (signatureResult === "error") {
    // Transient failure talking to PayPal's verify API — return 503 so PayPal retries
    throw new ApiError(503, "webhook_verify_unavailable", "PayPal signature verification service is temporarily unavailable.", {
      retryable: true,
    });
  }

  if (signatureResult === "invalid") {
    request.observability.recordSecurityEvent({
      name: "paypal_webhook_invalid_signature",
      severity: "warn",
      route: "/api/webhooks/paypal",
      provider: "paypal",
    });
    throw new ApiError(400, "webhook_signature_invalid", "PayPal webhook signature verification failed.");
  }

  // 2. Parse event
  let event: PayPalWebhookEvent;
  try {
    event = JSON.parse(request.rawBody) as PayPalWebhookEvent;
  } catch {
    throw new ApiError(400, "invalid_json", "Webhook body is not valid JSON.");
  }

  const externalEventId = event.id;
  const eventType = event.event_type;

  if (!externalEventId || !eventType) {
    throw new ApiError(400, "invalid_webhook_payload", "Webhook event is missing id or event_type.");
  }

  // 3. Dedupe — idempotent insert
  const webhookEvents = getWebhookEventRepository(config);
  const payloadHash = sha256(request.rawBody);
  const { inserted } = await webhookEvents.insertIfNew({
    externalEventId,
    eventType,
    payloadHash,
  });

  if (!inserted) {
    request.observability.recordStateTransition({
      entityType: "webhook_event",
      toState: "duplicate",
      action: `paypal.webhook.${eventType}`,
      success: true,
      provider: "paypal",
      providerObjectId: externalEventId,
    });
    return jsonResponse(200, { received: true, duplicate: true }, request.responseHeaders);
  }

  // 4. Apply state transitions
  try {
    await applyPayPalWebhookEvent(event, config, request);
    await webhookEvents.markProcessed(externalEventId, "processed");
  } catch (error) {
    await webhookEvents.markProcessed(externalEventId, "failed");
    throw error;
  }

  return jsonResponse(200, { received: true }, request.responseHeaders);
}

// ─── State machine transitions ────────────────────────────────────────────────

async function applyPayPalWebhookEvent(
  event: PayPalWebhookEvent,
  config: BookingApiConfig,
  request: RouteRequest
): Promise<void> {
  const eventType = event.event_type ?? "";

  switch (eventType) {
    case "PAYMENT.CAPTURE.COMPLETED":
      await handleCaptureCompleted(event, config, request);
      break;

    case "PAYMENT.CAPTURE.DENIED":
    case "PAYMENT.CAPTURE.REVERSED":
      await handleCaptureFailed(event, config, request, eventType);
      break;

    case "CHECKOUT.ORDER.APPROVED":
      // Buyer approved the order — no state change needed; capture is triggered by the
      // frontend calling POST /api/paypal/capture. Log for observability only.
      request.observability.recordStateTransition({
        entityType: "webhook_event",
        toState: "ignored",
        action: `paypal.webhook.${eventType}`,
        success: true,
        provider: "paypal",
        providerObjectId: event.id,
      });
      break;

    default:
      // Unknown event type — acknowledge and ignore
      request.observability.recordStateTransition({
        entityType: "webhook_event",
        toState: "ignored",
        action: `paypal.webhook.${eventType}`,
        success: true,
        provider: "paypal",
        providerObjectId: event.id,
      });
      break;
  }
}

async function handleCaptureCompleted(
  event: PayPalWebhookEvent,
  config: BookingApiConfig,
  request: RouteRequest
): Promise<void> {
  const capture = event.resource?.purchase_units?.[0]?.payments?.captures?.[0];
  const captureId = capture?.id ?? event.resource?.id;
  // reference_id on purchase_unit is the bookingSessionId
  const bookingSessionId = event.resource?.purchase_units?.[0]?.reference_id
    ?? event.resource?.custom_id;

  if (!captureId || !bookingSessionId) {
    request.observability.recordStateTransition({
      entityType: "webhook_event",
      toState: "ignored",
      action: "paypal.webhook.PAYMENT.CAPTURE.COMPLETED",
      success: false,
      provider: "paypal",
      errorCode: "missing_capture_id_or_session_id",
    });
    return;
  }

  const sessions = getBookingSessionRepository(config);
  const payments = getPaymentRepository(config);

  const session = await sessions.getById(bookingSessionId);
  if (!session) {
    request.observability.recordStateTransition({
      entityType: "webhook_event",
      toState: "ignored",
      action: "paypal.webhook.PAYMENT.CAPTURE.COMPLETED",
      success: false,
      provider: "paypal",
      errorCode: "session_not_found",
    });
    return;
  }

  // Already confirmed — idempotent
  if (session.status === "booking_confirmed") {
    request.observability.recordStateTransition({
      entityType: "booking_session",
      fromState: "booking_confirmed",
      toState: "booking_confirmed",
      action: "paypal.webhook.PAYMENT.CAPTURE.COMPLETED",
      success: true,
      bookingSessionId: session.id,
      reservationPublicId: session.reservationPublicId,
      provider: "paypal",
      providerObjectId: captureId,
    });
    return;
  }

  // Only transition from paypal_order_created
  if (session.status !== "paypal_order_created") {
    request.observability.recordStateTransition({
      entityType: "webhook_event",
      toState: "ignored",
      action: "paypal.webhook.PAYMENT.CAPTURE.COMPLETED",
      success: false,
      bookingSessionId: session.id,
      provider: "paypal",
      errorCode: `unexpected_session_status_${session.status}`,
    });
    return;
  }

  const confirmedAt = new Date().toISOString();

  await payments.markCaptured({
    bookingSessionId: session.id,
    paypalCaptureId: captureId,
    capturedAt: confirmedAt,
  });

  await sessions.markBookingConfirmed({
    bookingSessionId: session.id,
    confirmedAt,
  });

  request.observability.recordStateTransition({
    entityType: "booking_session",
    fromState: "paypal_order_created",
    toState: "booking_confirmed",
    action: "paypal.webhook.PAYMENT.CAPTURE.COMPLETED",
    success: true,
    bookingSessionId: session.id,
    reservationPublicId: session.reservationPublicId,
    provider: "paypal",
    providerObjectId: captureId,
  });
}

async function handleCaptureFailed(
  event: PayPalWebhookEvent,
  config: BookingApiConfig,
  request: RouteRequest,
  eventType: string
): Promise<void> {
  const bookingSessionId = event.resource?.purchase_units?.[0]?.reference_id
    ?? event.resource?.custom_id;

  if (!bookingSessionId) {
    request.observability.recordStateTransition({
      entityType: "webhook_event",
      toState: "ignored",
      action: `paypal.webhook.${eventType}`,
      success: false,
      provider: "paypal",
      errorCode: "missing_session_id",
    });
    return;
  }

  const sessions = getBookingSessionRepository(config);
  const payments = getPaymentRepository(config);

  const session = await sessions.getById(bookingSessionId);
  if (!session) {
    return;
  }

  // Already in a terminal state — skip
  if (session.status === "booking_confirmed" || session.status === "failed") {
    return;
  }

  await payments.markFailed(session.id);
  await sessions.markFailed({ bookingSessionId: session.id, reason: eventType.toLowerCase() });

  request.observability.recordStateTransition({
    entityType: "booking_session",
    fromState: session.status,
    toState: "failed",
    action: `paypal.webhook.${eventType}`,
    success: true,
    bookingSessionId: session.id,
    reservationPublicId: session.reservationPublicId,
    provider: "paypal",
    providerObjectId: event.resource?.id,
  });
}

// ─── Repository accessors ─────────────────────────────────────────────────────

export function getWebhookEventRepository(config: BookingApiConfig): WebhookEventRepository {
  if (!config.webhookEvents) {
    throw new ApiError(503, "database_unavailable", "Webhook event storage is not configured.", {
      retryable: true,
    });
  }
  return config.webhookEvents;
}

function getBookingSessionRepository(config: BookingApiConfig): BookingSessionRepository {
  if (!config.bookingSessions) {
    throw new ApiError(503, "database_unavailable", "Booking session storage is not configured.", {
      retryable: true,
    });
  }
  return config.bookingSessions;
}

function getPaymentRepository(config: BookingApiConfig): PaymentRepository {
  if (!config.payments) {
    throw new ApiError(503, "database_unavailable", "Payment storage is not configured.", {
      retryable: true,
    });
  }
  return config.payments;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function sha256(input: string): string {
  return createHash("sha256").update(input).digest("hex");
}
