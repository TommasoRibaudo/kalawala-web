import { loadConfig } from "./config";
import { AbuseGuard } from "./abuseProtection";
import { RdsBookingSessionRepository } from "./bookingSessions";
import { getPool } from "./db";
import { assertRouteHardening } from "./http/router";
import { createObservability } from "./observability";
import {
  getClientIp,
  getCorrelationId,
  getHeader,
  getMethod,
  getPath,
  getQuery,
  getRawBody,
  getUserAgent,
  normalizeHeaders,
  parseJsonBody,
} from "./http/request";
import { buildHeaders, errorResponse, optionsResponse } from "./http/response";
import { createRouter } from "./routes";
import { ApiResponse, BookingApiConfig, HttpMethod, LambdaHttpRequest, RouteRequest } from "./types";

// Holds the in-flight or resolved repository initialisation promise so that
// concurrent requests that arrive before the first pool connection completes
// all await the same Promise rather than each spawning a separate getPool() call.
const bookingSessionRepositoryByConfig = new WeakMap<BookingApiConfig, Promise<void>>();

export function createBookingApiHandler(config: BookingApiConfig = loadConfig()) {
  const runtimeConfig: BookingApiConfig = { ...config };
  const router = createRouter(runtimeConfig);
  const abuseGuard = new AbuseGuard(runtimeConfig.abuseProtection);
  const observability = createObservability(runtimeConfig.observability);

  return async function bookingApiHandler(event: LambdaHttpRequest): Promise<ApiResponse> {
    const startedAtMs = Date.now();
    const headers = normalizeHeaders(event.headers);
    const correlationId = getCorrelationId(headers);
    const responseHeaders = buildHeaders(runtimeConfig, correlationId, getHeader(headers, "origin"));
    let method: HttpMethod = "GET";
    let path = "/";
    let routePattern: string | undefined;
    let abusePolicy: string | undefined;
    let response: ApiResponse | undefined;
    let errorForLog: unknown;

    try {
      method = getMethod(event);
      if (method === "OPTIONS") {
        response = optionsResponse(responseHeaders);
        return response;
      }

      path = getPath(event);
      const query = getQuery(event);
      const { route, pathParams } = router.match({ method, path });
      routePattern = route.pattern;
      abusePolicy = route.options.abuseProtection;
      const rawBody = getRawBody(event, runtimeConfig.maxBodyBytes);
      const body = parseJsonBody(rawBody, headers, route.options.requireJsonBody ?? false);

      const request: RouteRequest = {
        method,
        path,
        headers,
        responseHeaders,
        query,
        pathParams,
        body,
        rawBody,
        correlationId,
        clientIp: getClientIp(event),
        userAgent: getUserAgent(event, headers),
        awsRequestId: event.requestContext?.requestId,
        observability: observability.createRouteObservability({
          correlationId,
          awsRequestId: event.requestContext?.requestId,
          method,
          path,
          route: route.pattern,
        }),
      };

      assertRouteHardening(request, route.options);
      await abuseGuard.assertAllowed(request, route.options.abuseProtection);
      await ensureBookingSessionRepository(runtimeConfig, route.pattern, body);

      response = await route.handler(request);
      return response;
    } catch (error) {
      errorForLog = error;
      response = errorResponse(error, responseHeaders, correlationId);
      return response;
    } finally {
      observability.recordHttpRequest({
        correlationId,
        method,
        path,
        routePattern,
        abusePolicy,
        statusCode: response?.statusCode ?? 500,
        durationMs: Date.now() - startedAtMs,
        clientIp: getClientIp(event),
        userAgent: getUserAgent(event, headers),
        awsRequestId: event.requestContext?.requestId,
        error: errorForLog,
      });
    }
  };
}

function bookingSessionRepositoryRequired(routePattern: string, body: unknown): boolean {
  if (routePattern === "/api/webhooks/smoobu") {
    return !isSmoobuRatesOnlyWebhook(body);
  }

  return (
    routePattern === "/api/search" ||
    routePattern === "/api/holds" ||
    routePattern === "/api/paypal/order" ||
    routePattern === "/api/paypal/capture" ||
    routePattern === "/api/deposit-handoff" ||
    routePattern === "/api/deposit-handoff/events" ||
    routePattern === "/api/webhooks/paypal" ||
    routePattern === "/api/portal/login" ||
    routePattern === "/api/portal/reservation/:reservationPublicId" ||
    routePattern === "/api/portal/reservation/:reservationPublicId/help-request" ||
    routePattern === "/api/portal/reservation/:reservationPublicId/cancellation-request"
  );
}

async function ensureBookingSessionRepository(
  config: BookingApiConfig,
  routePattern: string,
  body: unknown
): Promise<void> {
  if (config.bookingSessions || !bookingSessionRepositoryRequired(routePattern, body)) {
    return;
  }

  // Reuse an existing in-flight initialisation promise so concurrent requests
  // that arrive before the pool is ready all await the same work rather than
  // each calling getPool() independently.
  let initPromise = bookingSessionRepositoryByConfig.get(config);
  if (!initPromise) {
    initPromise = getPool({ secretProvider: config.secrets }).then((pool) => {
      config.bookingSessions = new RdsBookingSessionRepository(pool);
    });
    bookingSessionRepositoryByConfig.set(config, initPromise);
  }

  await initPromise;
}

function isSmoobuRatesOnlyWebhook(body: unknown): boolean {
  return Boolean(
    body &&
      typeof body === "object" &&
      !Array.isArray(body) &&
      (body as { action?: unknown }).action === "updateRates"
  );
}
