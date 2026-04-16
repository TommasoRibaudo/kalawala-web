import { loadConfig } from "./config";
import { AbuseGuard } from "./abuseProtection";
import { InMemoryBookingSessionRepository } from "./bookingSessions";
import { InMemoryHoldRepository } from "./holds";
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

export function createBookingApiHandler(config: BookingApiConfig = loadConfig()) {
  const runtimeConfig: BookingApiConfig = {
    ...config,
    bookingSessions: config.bookingSessions ?? new InMemoryBookingSessionRepository(),
    holds: config.holds ?? new InMemoryHoldRepository(),
  };
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
      abuseGuard.assertAllowed(request, route.options.abuseProtection);

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
