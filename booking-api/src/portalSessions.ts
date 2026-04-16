/**
 * Portal session tokens — stateless HMAC-SHA256 signed tokens.
 *
 * Format (base64url-encoded JSON envelope):
 *   header.payload.signature
 *
 * Where:
 *   header    = base64url({ alg: "HS256", typ: "KWL-portal" })
 *   payload   = base64url({ sub: reservationPublicId, iat: epochSeconds, exp: epochSeconds })
 *   signature = HMAC-SHA256(header + "." + payload, secret)
 *
 * The secret is the `portalSessionSecret` from Secrets Manager.
 * Tokens are valid for PORTAL_SESSION_TTL_SECONDS (24 hours by default).
 */

import { createHmac, timingSafeEqual } from "crypto";
import { ApiError } from "./http/errors";

export const PORTAL_SESSION_TTL_SECONDS = 24 * 60 * 60; // 24 hours

const HEADER_B64 = b64url(JSON.stringify({ alg: "HS256", typ: "KWL-portal" }));

export interface PortalSessionPayload {
  sub: string; // reservationPublicId
  iat: number; // issued-at (epoch seconds)
  exp: number; // expires-at (epoch seconds)
}

/**
 * Issue a signed portal session token for the given reservation.
 */
export function issuePortalSessionToken(
  reservationPublicId: string,
  secret: string,
  nowSeconds: number = Math.floor(Date.now() / 1000)
): string {
  const payload: PortalSessionPayload = {
    sub: reservationPublicId,
    iat: nowSeconds,
    exp: nowSeconds + PORTAL_SESSION_TTL_SECONDS,
  };

  const payloadB64 = b64url(JSON.stringify(payload));
  const signingInput = `${HEADER_B64}.${payloadB64}`;
  const sig = hmacSha256(signingInput, secret);

  return `${signingInput}.${sig}`;
}

/**
 * Verify a portal session token and return the payload.
 * Throws ApiError 401 if the token is invalid, expired, or tampered.
 */
export function verifyPortalSessionToken(
  token: string,
  secret: string,
  nowSeconds: number = Math.floor(Date.now() / 1000)
): PortalSessionPayload {
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw invalidToken();
  }

  const [headerB64, payloadB64, providedSig] = parts;

  // Verify header
  if (headerB64 !== HEADER_B64) {
    throw invalidToken();
  }

  // Verify signature (timing-safe)
  const signingInput = `${headerB64}.${payloadB64}`;
  const expectedSig = hmacSha256(signingInput, secret);
  const expectedBuf = Buffer.from(expectedSig, "utf8");
  const providedBuf = Buffer.from(providedSig ?? "", "utf8");
  if (
    expectedBuf.length !== providedBuf.length ||
    !timingSafeEqual(expectedBuf, providedBuf)
  ) {
    throw invalidToken();
  }

  // Decode and validate payload
  let payload: unknown;
  try {
    payload = JSON.parse(b64urlDecode(payloadB64));
  } catch {
    throw invalidToken();
  }

  if (
    !payload ||
    typeof payload !== "object" ||
    typeof (payload as Record<string, unknown>).sub !== "string" ||
    typeof (payload as Record<string, unknown>).iat !== "number" ||
    typeof (payload as Record<string, unknown>).exp !== "number"
  ) {
    throw invalidToken();
  }

  const typed = payload as PortalSessionPayload;

  if (nowSeconds >= typed.exp) {
    throw new ApiError(401, "session_expired", "Your session has expired. Please log in again.");
  }

  return typed;
}

/**
 * Extract and verify the portal session token from the Authorization header.
 * Expects: Authorization: Bearer <token>
 */
export function requirePortalSession(
  authorizationHeader: string | undefined,
  secret: string
): PortalSessionPayload {
  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    throw new ApiError(401, "unauthorized", "Authorization header with Bearer token is required.");
  }

  const token = authorizationHeader.slice("Bearer ".length).trim();
  if (!token) {
    throw new ApiError(401, "unauthorized", "Authorization header with Bearer token is required.");
  }

  return verifyPortalSessionToken(token, secret);
}

// ── helpers ──────────────────────────────────────────────────────────────────

function hmacSha256(input: string, secret: string): string {
  return createHmac("sha256", secret).update(input).digest("base64url");
}

function b64url(input: string): string {
  return Buffer.from(input, "utf8").toString("base64url");
}

function b64urlDecode(input: string): string {
  return Buffer.from(input, "base64url").toString("utf8");
}

function invalidToken(): ApiError {
  return new ApiError(401, "unauthorized", "Invalid or expired session token.");
}
