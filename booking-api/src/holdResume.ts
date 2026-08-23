/**
 * holdResume.ts — GET /api/holds/:bookingSessionId
 *
 * Rebuilds the checkout/deposit-step state for a guest who opens a
 * payment-pending or deposit-instructions email link cold — different
 * device, cleared storage, or just a new tab. Returns the same shape a fresh
 * hold-create call already returns (`buildHoldResponse`), so the frontend
 * reuses its existing PayPalHoldResponse/DepositHoldResponse handling rather
 * than needing a separate "resume" schema.
 *
 * Auth mirrors what already exists for each payment method rather than
 * inventing a new rule: a `paypal` session's `bookingSessionId` (a
 * `randomUUID()`) is already treated as sufficient on its own by
 * handleCreatePayPalOrder/handleCapturePayPalOrder, so this endpoint asks
 * nothing more of it. A `manual_deposit` session requires the same
 * `deposit_access` bearer token already required by the receipt-upload
 * endpoints.
 */

import { BookingSessionRepository } from "./bookingSessions";
import { buildBankInfo } from "./depositHandoff";
import { requireDepositAccess } from "./depositReceipt";
import { buildHoldResponse, HoldRepository, requireQuotedPrice } from "./holds";
import { ApiError } from "./http/errors";
import { getHeader } from "./http/request";
import { jsonResponse } from "./http/response";
import { BOOKING_PROPERTIES_BY_ID } from "./propertyCatalog";
import { extractBearerToken } from "./signedTokens";
import { ApiResponse, BookingApiConfig, RouteRequest } from "./types";

export async function handleGetHoldState(
  bookingSessionId: string,
  request: RouteRequest,
  config: BookingApiConfig
): Promise<ApiResponse> {
  const sessions = getRequiredBookingSessionRepository(config);
  const holds = getRequiredHoldRepository(config);

  const session = await sessions.getById(bookingSessionId);
  if (!session) {
    throw new ApiError(404, "not_found", "Booking session was not found.");
  }

  const property = BOOKING_PROPERTIES_BY_ID.get(session.propertyId ?? "");
  if (!property) {
    throw new ApiError(409, "invalid_booking_state", "The booking session has no property associated.");
  }

  const hold = await holds.getByBookingSessionId(session.id);
  if (!hold) {
    throw new ApiError(404, "not_found", "No hold was found for this booking session.");
  }

  const price = requireQuotedPrice(session, property.propertyId);
  const holdResponse = buildHoldResponse(session, hold, property, price);

  if (session.paymentMethod === "manual_deposit") {
    const authorizationHeader = getHeader(request.headers, "authorization");
    const payload = await requireDepositAccess(session.id, authorizationHeader, config);
    const token = extractBearerToken(authorizationHeader) as string;
    const nowSeconds = Math.floor(Date.now() / 1000);

    return jsonResponse(
      200,
      {
        ...holdResponse,
        bankInfo: buildBankInfo(property),
        depositAccessToken: token,
        depositAccessTokenExpiresInSeconds: Math.max(0, payload.exp - nowSeconds),
      },
      request.responseHeaders
    );
  }

  return jsonResponse(200, holdResponse, request.responseHeaders);
}

function getRequiredBookingSessionRepository(config: BookingApiConfig): BookingSessionRepository {
  if (!config.bookingSessions) {
    throw new ApiError(503, "database_unavailable", "Booking session storage is not configured.", {
      retryable: true,
    });
  }
  return config.bookingSessions;
}

function getRequiredHoldRepository(config: BookingApiConfig): HoldRepository {
  if (!config.holds) {
    throw new ApiError(503, "database_unavailable", "Hold storage is not configured.", { retryable: true });
  }
  return config.holds;
}
