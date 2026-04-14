export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "OPTIONS";

export type HeadersMap = Record<string, string>;

export interface LambdaHttpRequest {
  version?: string;
  routeKey?: string;
  rawPath?: string;
  path?: string;
  rawQueryString?: string;
  queryStringParameters?: Record<string, string | undefined> | null;
  headers?: Record<string, string | undefined> | null;
  body?: string | null;
  isBase64Encoded?: boolean;
  requestContext?: {
    http?: {
      method?: string;
      path?: string;
      sourceIp?: string;
      userAgent?: string;
    };
    identity?: {
      sourceIp?: string;
      userAgent?: string;
    };
  };
}

export interface ApiResponse {
  statusCode: number;
  headers: HeadersMap;
  body: string;
  isBase64Encoded?: false;
}

export interface RouteRequest {
  method: HttpMethod;
  path: string;
  headers: HeadersMap;
  responseHeaders: HeadersMap;
  query: Record<string, string>;
  pathParams: Record<string, string>;
  body: unknown;
  rawBody: string;
  correlationId: string;
  clientIp?: string;
  userAgent?: string;
}

export interface JsonBody {
  [key: string]: unknown;
}

export type RouteHandler = (request: RouteRequest) => Promise<ApiResponse> | ApiResponse;

export type AbuseProtectionPolicyName =
  | "publicRead"
  | "availabilitySearch"
  | "holdCreate"
  | "paymentCreate"
  | "paymentCapture"
  | "depositEvent"
  | "webhook"
  | "portalLogin"
  | "portalRead"
  | "portalWrite";

export interface RouteOptions {
  requireJsonBody?: boolean;
  requireIdempotencyKey?: boolean;
  preserveRawBody?: boolean;
  rejectQuerySecrets?: boolean;
  abuseProtection?: AbuseProtectionPolicyName;
}

export interface RouteDefinition {
  method: HttpMethod;
  pattern: string;
  options: RouteOptions;
  handler: RouteHandler;
}

export interface BookingApiConfig {
  allowedOrigins: string[];
  maxBodyBytes: number;
  smoobuWebhookSecret?: string;
  abuseProtection: AbuseProtectionConfig;
}

export interface AbuseProtectionConfig {
  enabled: boolean;
  captchaChallengesEnabled: boolean;
  maxTrackedBuckets: number;
}

export type FieldErrors = Record<string, string[]>;
