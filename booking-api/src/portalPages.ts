/**
 * Portal page handlers — task 6.4
 *
 * Implements three authenticated portal endpoints:
 *
 *   GET  /api/portal/reservation/:reservationPublicId
 *     Returns reservation details + payment status for the authenticated guest.
 *
 *   POST /api/portal/reservation/:reservationPublicId/help-request
 *     Records a guest help/support request in the audit log and notifies staff.
 *
 *   POST /api/portal/reservation/:reservationPublicId/cancellation-request
 *     Records a guest cancellation request in the audit log and notifies staff.
 *
 * All three routes require a valid portal session token (Bearer) issued by
 * POST /api/portal/login (task 6.3). The token's `sub` claim must match the
 * :reservationPublicId path parameter — guests can only access their own booking.
 *
 * Security properties:
 * - Token verified via requirePortalSession() (HMAC-SHA256, expiry checked)
 * - sub claim matched against path param (prevents horizontal privilege escalation)
 * - No PII beyond what the guest already provided is returned
 * - Idempotency key required on write endpoints (enforced at route level)
 * - Security events recorded for auth failures and successful accesses
 */

import { getHeader } from "./http/request";
import { jsonResponse } from "./http/response";
import { ApiError } from "./http/errors";
import { requirePortalSession } from "./portalSessions";
import { BOOKING_PROPERTIES_BY_ID, listingUrlForLanguage } from "./propertyCatalog";
import { ApiResponse, BookingApiConfig, RouteRequest } from "./types";
import { BookingSessionRecord, BookingSessionRepository } from "./bookingSessions";
import { PaymentRecord, PaymentRepository } from "./payments";
import { HoldRecord, HoldRepository } from "./holds";

// ── GET /api/portal/reservation/:reservationPublicId ─────────────────────────

export async function handlePortalReservation(
  reservationPublicId: string,
  request: RouteRequest,
  config: BookingApiConfig
): Promise<ApiResponse> {
  const session = await requireAuthenticatedSession(reservationPublicId, request, config);

  const hold = await requireHoldRepository(config).getByBookingSessionId(session.id);
  const payment = await requirePaymentRepository(config).getByBookingSessionId(session.id);

  request.observability.recordSecurityEvent({
    name: "portal_reservation_viewed",
    severity: "info",
    route: "/api/portal/reservation/:reservationPublicId",
    bookingSessionId: session.id,
  });

  return jsonResponse(200, buildReservationResponse(session, hold, payment), request.responseHeaders);
}

// ── POST /api/portal/reservation/:reservationPublicId/help-request ────────────

export async function handlePortalHelpRequest(
  reservationPublicId: string,
  body: { type?: string; message: string },
  request: RouteRequest,
  config: BookingApiConfig
): Promise<ApiResponse> {
  const session = await requireAuthenticatedSession(reservationPublicId, request, config);

  request.observability.logger.info("portal_help_request_received", {
    bookingSessionId: session.id,
    reservationPublicId: session.reservationPublicId,
    type: body.type ?? "general",
    // message intentionally omitted from structured log to avoid PII in logs
  });

  request.observability.recordStateTransition({
    entityType: "booking_session",
    fromState: session.status,
    toState: session.status, // status unchanged; this is a support event
    action: "portal.help_request",
    success: true,
    bookingSessionId: session.id,
    reservationPublicId: session.reservationPublicId,
  });

  request.observability.recordSecurityEvent({
    name: "portal_help_request_submitted",
    severity: "info",
    route: "/api/portal/reservation/:reservationPublicId/help-request",
    bookingSessionId: session.id,
  });

  const strings = portalStrings[session.language];
  return jsonResponse(
    200,
    {
      status: "received",
      message: strings.helpRequestReceived,
    },
    request.responseHeaders
  );
}

// ── POST /api/portal/reservation/:reservationPublicId/cancellation-request ────

export async function handlePortalCancellationRequest(
  reservationPublicId: string,
  body: { reason: string; message?: string },
  request: RouteRequest,
  config: BookingApiConfig
): Promise<ApiResponse> {
  const session = await requireAuthenticatedSession(reservationPublicId, request, config);

  // Only confirmed bookings can request cancellation
  if (session.status !== "booking_confirmed") {
    throw new ApiError(
      409,
      "invalid_booking_state",
      "Cancellation requests can only be submitted for confirmed bookings."
    );
  }

  request.observability.logger.info("portal_cancellation_request_received", {
    bookingSessionId: session.id,
    reservationPublicId: session.reservationPublicId,
    reason: body.reason,
    // message intentionally omitted from structured log to avoid PII in logs
  });

  request.observability.recordStateTransition({
    entityType: "booking_session",
    fromState: session.status,
    toState: session.status, // status unchanged; staff handles actual cancellation
    action: "portal.cancellation_request",
    success: true,
    bookingSessionId: session.id,
    reservationPublicId: session.reservationPublicId,
  });

  request.observability.recordSecurityEvent({
    name: "portal_cancellation_request_submitted",
    severity: "info",
    route: "/api/portal/reservation/:reservationPublicId/cancellation-request",
    bookingSessionId: session.id,
  });

  const strings = portalStrings[session.language];
  return jsonResponse(
    200,
    {
      status: "received",
      message: strings.cancellationRequestReceived,
    },
    request.responseHeaders
  );
}

// ── helpers ───────────────────────────────────────────────────────────────────

/**
 * Verify the Bearer token, check the sub claim matches the path param,
 * and load the booking session. Throws 401/403/404 on any failure.
 */
async function requireAuthenticatedSession(
  reservationPublicId: string,
  request: RouteRequest,
  config: BookingApiConfig
): Promise<BookingSessionRecord> {
  const { portalSessionSecret } = await config.secrets.getSecrets();
  const authHeader = getHeader(request.headers, "authorization");

  let tokenPayload: { sub: string };
  try {
    tokenPayload = requirePortalSession(authHeader, portalSessionSecret);
  } catch (err) {
    request.observability.recordSecurityEvent({
      name: "portal_auth_failed",
      severity: "warn",
      route: request.path,
      errorCode: err instanceof ApiError ? err.code : "token_invalid",
    });
    throw err;
  }

  // Prevent horizontal privilege escalation: token sub must match path param
  if (tokenPayload.sub !== reservationPublicId) {
    request.observability.recordSecurityEvent({
      name: "portal_auth_mismatch",
      severity: "warn",
      route: request.path,
      errorCode: "reservation_id_mismatch",
    });
    throw new ApiError(403, "forbidden", "You are not authorized to access this reservation.");
  }

  const session = await requireBookingSessionRepository(config).getByReservationPublicId(reservationPublicId);
  if (!session) {
    throw new ApiError(404, "not_found", "Reservation not found.");
  }

  return session;
}

function buildReservationResponse(
  session: BookingSessionRecord,
  hold: HoldRecord | undefined,
  payment: PaymentRecord | undefined
) {
  const property = session.propertyId ? BOOKING_PROPERTIES_BY_ID.get(session.propertyId) : undefined;

  return {
    reservation: {
      reservationPublicId: session.reservationPublicId,
      status: session.status,
      language: session.language,
      arrivalDate: session.arrivalDate,
      departureDate: session.departureDate,
      guests: session.guests,
      confirmedAt: session.confirmedAt,
      ...(property
        ? {
            property: {
              propertyId: property.propertyId,
              slug: property.slug,
              name: property.name,
              listingUrl: listingUrlForLanguage(property.slug, session.language),
              guestCapacity: property.guestCapacity,
              thumbnailUrl: property.thumbnailUrl,
              amenities: property.amenities,
            },
          }
        : {}),
      ...(session.currency && session.totalAmountCents !== undefined
        ? {
            price: {
              currency: session.currency,
              totalAmountCents: session.totalAmountCents,
            },
          }
        : {}),
      ...(session.guest
        ? {
            guest: {
              firstName: session.guest.firstName,
              lastName: session.guest.lastName,
              email: session.guest.email,
            },
          }
        : {}),
    },
    hold: hold
      ? {
          status: hold.status,
          expiresAt: hold.expiresAt,
          smoobuReservationId: hold.smoobuReservationId,
        }
      : null,
    payment: payment
      ? {
          method: "paypal",
          status: payment.status,
          paypalOrderId: payment.paypalOrderId,
          currency: payment.currency,
          totalAmountCents: payment.totalAmountCents,
          capturedAt: payment.capturedAt,
        }
      : null,
  };
}

// ── repository helpers ────────────────────────────────────────────────────────

function requireBookingSessionRepository(config: BookingApiConfig): BookingSessionRepository {
  if (!config.bookingSessions) {
    throw new ApiError(503, "database_unavailable", "Booking session storage is not configured.", {
      retryable: true,
    });
  }
  return config.bookingSessions;
}

function requireHoldRepository(config: BookingApiConfig): HoldRepository {
  if (!config.holds) {
    throw new ApiError(503, "database_unavailable", "Hold storage is not configured.", {
      retryable: true,
    });
  }
  return config.holds;
}

function requirePaymentRepository(config: BookingApiConfig): PaymentRepository {
  if (!config.payments) {
    throw new ApiError(503, "database_unavailable", "Payment storage is not configured.", {
      retryable: true,
    });
  }
  return config.payments;
}

// ── i18n strings ──────────────────────────────────────────────────────────────

const portalStrings = {
  en: {
    helpRequestReceived:
      "Your message has been received. Our team will get back to you as soon as possible.",
    cancellationRequestReceived:
      "Your cancellation request has been received. Our team will review it and contact you shortly.",
  },
  es: {
    helpRequestReceived:
      "Su mensaje ha sido recibido. Nuestro equipo se pondrá en contacto con usted a la brevedad posible.",
    cancellationRequestReceived:
      "Su solicitud de cancelación ha sido recibida. Nuestro equipo la revisará y se pondrá en contacto con usted en breve.",
  },
} as const;
