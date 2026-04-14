import { ApiError } from "./errors";
import { ApiResponse, BookingApiConfig, HeadersMap } from "../types";

const SECURITY_HEADERS: HeadersMap = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "no-referrer",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
};

export function buildHeaders(
  config: BookingApiConfig,
  correlationId: string,
  requestOrigin?: string
): HeadersMap {
  const headers: HeadersMap = {
    ...SECURITY_HEADERS,
    "X-Correlation-Id": correlationId,
  };

  if (requestOrigin && config.allowedOrigins.includes(requestOrigin)) {
    headers["Access-Control-Allow-Origin"] = requestOrigin;
    headers["Access-Control-Allow-Credentials"] = "true";
    headers["Vary"] = "Origin";
  }

  return headers;
}

export function jsonResponse(statusCode: number, body: unknown, headers: HeadersMap): ApiResponse {
  return {
    statusCode,
    headers,
    body: JSON.stringify(body),
    isBase64Encoded: false,
  };
}

export function errorResponse(error: unknown, headers: HeadersMap, correlationId: string): ApiResponse {
  if (error instanceof ApiError) {
    return jsonResponse(
      error.statusCode,
      {
        error: {
          code: error.code,
          message: error.message,
          fieldErrors: error.fieldErrors,
          retryable: error.retryable,
          correlationId,
        },
      },
      headers
    );
  }

  return jsonResponse(
    500,
    {
      error: {
        code: "internal_error",
        message: "Unexpected server error.",
        retryable: true,
        correlationId,
      },
    },
    headers
  );
}

export function optionsResponse(headers: HeadersMap): ApiResponse {
  return {
    statusCode: 204,
    headers: {
      ...headers,
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers":
        "Content-Type,Accept,Accept-Language,X-Correlation-Id,Idempotency-Key,X-Kalawala-Device-Id,X-Device-Id,X-Captcha-Token,X-Smoobu-Webhook-Secret,PAYPAL-AUTH-ALGO,PAYPAL-CERT-URL,PAYPAL-TRANSMISSION-ID,PAYPAL-TRANSMISSION-SIG,PAYPAL-TRANSMISSION-TIME",
      "Access-Control-Max-Age": "600",
    },
    body: "",
    isBase64Encoded: false,
  };
}
