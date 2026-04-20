import type { BookingSessionRepository } from "./bookingSessions";
import type { EmailConfig } from "./email";
import type { HoldRepository } from "./holds";
import type { PaymentRepository } from "./payments";
import type { WebhookEventRepository } from "./paypalWebhooks";
import type { PortalSessionRepository } from "./portalSessions";

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
    requestId?: string;
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
  awsRequestId?: string;
  observability: RouteObservability;
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

export interface PayPalClientConfig {
  /** Base URL of the PayPal API. Use the sandbox URL for non-production environments. */
  baseUrl: string;
  timeoutMs: number;
  /** Return URL after buyer approves (redirect flow). Leave empty when using the JS SDK. */
  orderReturnUrl: string;
  /** Cancel URL if buyer cancels (redirect flow). Leave empty when using the JS SDK. */
  orderCancelUrl: string;
}

export interface BookingApiConfig {
  allowedOrigins: string[];
  maxBodyBytes: number;
  secrets: BookingSecretProvider;
  smoobu: SmoobuClientConfig;
  paypal: PayPalClientConfig;
  email: EmailConfig;
  bookingSessions?: BookingSessionRepository;
  holds?: HoldRepository;
  payments?: PaymentRepository;
  webhookEvents?: WebhookEventRepository;
  portalSessions?: PortalSessionRepository;
  hold: HoldConfig;
  abuseProtection: AbuseProtectionConfig;
  observability: ObservabilityConfig;
}

export interface SmoobuClientConfig {
  baseUrl: string;
  customerId?: number;
  timeoutMs: number;
  maxRetries: number;
  baseBackoffMs: number;
  maxBackoffMs: number;
  maxRateLimitDelayMs: number;
  holdChannelId: 11 | 13;
}

export interface HoldConfig {
  defaultTtlMinutes: number;
  idempotencyTtlMinutes: number;
  staleIdempotencyLockSeconds: number;
}

export type CaptchaProvider = "hcaptcha" | "recaptcha";

export interface CaptchaVerifierConfig {
  provider: CaptchaProvider;
  secretKey: string;
  /** Override the verification endpoint (useful for tests). Defaults to the provider's production URL. */
  verifyUrl?: string;
}

export interface AbuseProtectionConfig {
  enabled: boolean;
  captchaChallengesEnabled: boolean;
  maxTrackedBuckets: number;
  /** When set, inbound X-Captcha-Token headers are verified against the provider before allowing bypass. */
  captchaVerifier?: CaptchaVerifierConfig;
}

export type FieldErrors = Record<string, string[]>;

export interface BookingProviderSecrets {
  smoobuApiKey: string;
  paypalClientId: string;
  paypalClientSecret: string;
  paypalWebhookId: string;
  smoobuWebhookSecret: string;
  bookingEncryptionKeyBase64: string;
  portalSessionSecret: string;
  rdsConnectionString: string;
}

export interface BookingSecretProvider {
  readonly source: "aws-secrets-manager-extension" | "static" | "missing" | "invalid";
  getSecrets(): Promise<BookingProviderSecrets>;
}

export type LogLevel = "debug" | "info" | "warn" | "error" | "silent";

export interface ObservabilityConfig {
  serviceName: string;
  environment: string;
  logLevel: LogLevel;
  metricsEnabled: boolean;
}

export interface ObservabilityLogger {
  debug(message: string, fields?: Record<string, unknown>): void;
  info(message: string, fields?: Record<string, unknown>): void;
  warn(message: string, fields?: Record<string, unknown>): void;
  error(message: string, fields?: Record<string, unknown>): void;
}

export type ProviderName = "smoobu" | "paypal" | "database" | "cache" | "email" | "internal";

export interface ProviderCallObservation {
  provider: ProviderName;
  operation: string;
  durationMs: number;
  statusCode?: number;
  retryable?: boolean;
  rateLimitRemaining?: number;
  rateLimitResetSeconds?: number;
  errorCode?: string;
}

export interface StateTransitionObservation {
  entityType: "booking_session" | "hold" | "payment" | "webhook_event" | "portal_session";
  fromState?: string;
  toState: string;
  action: string;
  success: boolean;
  bookingSessionId?: string;
  reservationPublicId?: string;
  provider?: ProviderName;
  providerObjectId?: string;
  errorCode?: string;
}

export interface SecurityEventObservation {
  name: string;
  severity: "info" | "warn" | "error";
  route?: string;
  provider?: ProviderName;
  errorCode?: string;
  bookingSessionId?: string;
}

export interface RouteObservability {
  logger: ObservabilityLogger;
  recordProviderCall(observation: ProviderCallObservation): void;
  recordStateTransition(observation: StateTransitionObservation): void;
  recordSecurityEvent(observation: SecurityEventObservation): void;
}
