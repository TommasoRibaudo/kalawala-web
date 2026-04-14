import { loadConfig } from "./config";
import { assertRouteHardening } from "./http/router";
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
import { ApiResponse, BookingApiConfig, LambdaHttpRequest, RouteRequest } from "./types";

export function createBookingApiHandler(config: BookingApiConfig = loadConfig()) {
  const router = createRouter(config);

  return async function bookingApiHandler(event: LambdaHttpRequest): Promise<ApiResponse> {
    const headers = normalizeHeaders(event.headers);
    const correlationId = getCorrelationId(headers);
    const responseHeaders = buildHeaders(config, correlationId, getHeader(headers, "origin"));

    try {
      const method = getMethod(event);
      if (method === "OPTIONS") {
        return optionsResponse(responseHeaders);
      }

      const path = getPath(event);
      const query = getQuery(event);
      const { route, pathParams } = router.match({ method, path });
      const rawBody = getRawBody(event, config.maxBodyBytes);
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
      };

      assertRouteHardening(request, route.options);

      return await route.handler(request);
    } catch (error) {
      return errorResponse(error, responseHeaders, correlationId);
    }
  };
}
