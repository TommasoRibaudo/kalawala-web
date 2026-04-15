# Booking API Observability Baseline

Task: 2.4 Observability baseline  
Status: completed  
Date: 2026-04-14

## Purpose

Provide the first production observability contract for the backend booking API before provider integrations and Terraform-managed CloudWatch resources land.

The runtime baseline is implemented in `booking-api/src/observability.ts` and is dependency-free so it can run inside AWS Lambda. Terraform task 2.10 should convert the metric names and alert signals below into CloudWatch dashboards, alarms, and notification targets.

## Source Context

References consulted:

- `docs/own_booking_engine/tasks.md`
- `docs/own_booking_engine/plan.md`
- `docs/own_booking_engine/prd.md`
- `docs/own_booking_engine/api_contract.md`
- `docs/own_booking_engine/Introduction - Smoobu Api.pdf` (filename on disk uses an en dash)
- `AGENTS.md`

Smoobu API details that shape the signals:

- Smoobu calls stay backend-only and authenticate with `Api-Key`.
- Availability uses `POST /booking/checkApartmentAvailability`.
- Rates use `GET /api/rates`.
- Webhook actions include `updateRates`, `newReservation`, `cancelReservation`, and `updateReservation`.
- The documented Smoobu API rate limit is 1000 requests per minute; the backend must observe 429 responses and remaining/reset headers when available.

## Runtime Log Contract

Every backend invocation emits structured JSON logs with:

- `timestamp`
- `level`
- `service`
- `environment`
- `eventType`
- `correlationId`
- `awsRequestId` when API Gateway/Lambda provides it
- `method`, `path`, and matched `route`
- `statusCode`, `statusCodeClass`, and `durationMs`
- hashed client identifiers (`clientIpHash`, `userAgentHash`) instead of raw IP/user-agent values
- safe booking/provider fields when future route handlers record provider calls or state transitions

Sensitive fields are redacted recursively before logging. Redacted keys include secrets, tokens, authorization headers, API keys, passwords, session values, PayPal signatures, Smoobu webhook secrets, and encryption-key shaped fields. Route handlers should continue to avoid logging raw request bodies, raw webhook payloads, raw provider headers, or guest PII.

## Correlation IDs

`X-Correlation-Id` remains the public trace header. The API accepts a safe caller-provided value or generates a UUID, echoes it in every response, and attaches it to all request, metric, provider, state-transition, and security-event logs.

Future provider clients must pass the same correlation ID into:

- Smoobu availability/rates/reservation logs
- PayPal create/capture/webhook verification logs
- DB audit/state transition logs
- worker/reconciliation logs

## Event Types

| Event type | Purpose |
|---|---|
| `http_request_completed` | One structured request lifecycle log per API invocation. |
| `http_request_metrics` | CloudWatch Embedded Metric Format request metrics. |
| `provider_call_completed` | Future Smoobu/PayPal/DB/cache/email call timing and status. |
| `provider_call_metrics` | Provider latency, error, and Smoobu rate-limit metrics. |
| `booking_state_transition` | Future booking/hold/payment/webhook state transition audit signal. |
| `booking_state_transition_metrics` | Counts and failures for state changes. |
| `security_event` | Explicit security signal from route handlers. |
| `security_event_metrics` | Security-event counts by name/severity. |
| `operational_alert` | Alarm-worthy condition log with `alertName` and `severity`. |
| `operational_alert_metrics` | Count of alert-worthy conditions. |

## Metrics

Namespace: `Kalawala/BookingApi`

Base dimensions:

- `Service`
- `Environment`

HTTP dimensions:

- `Route`
- `Method`
- `StatusCodeClass`

Provider dimensions:

- `Provider`
- `Operation`

Security/state dimensions:

- `SecurityEvent`
- `Severity`
- `EntityType`
- `Action`
- `ToState`

Metric names:

| Metric | Unit | Meaning |
|---|---|---|
| `RequestCount` | Count | Every API invocation. |
| `RequestLatencyMs` | Milliseconds | API handler latency. |
| `ErrorCount` | Count | Any 4xx/5xx response. |
| `ClientErrorCount` | Count | 4xx responses. |
| `ServerErrorCount` | Count | 5xx responses. |
| `RateLimitedCount` | Count | 429 responses from local abuse controls/WAF integration points. |
| `CaptchaRequiredCount` | Count | CAPTCHA escalation responses. |
| `WebhookRejectedCount` | Count | PayPal/Smoobu webhook requests rejected by validation/auth. |
| `UnauthorizedWebhookCount` | Count | Webhook auth failures. |
| `ProviderRequestCount` | Count | Future outbound provider calls. |
| `ProviderLatencyMs` | Milliseconds | Future outbound provider latency. |
| `ProviderErrorCount` | Count | Future provider 4xx/5xx/errors. |
| `SmoobuRateLimitedCount` | Count | Smoobu 429 responses. |
| `BookingStateTransitionCount` | Count | Future state transitions. |
| `BookingStateTransitionFailureCount` | Count | Failed state transitions. |
| `SecurityEventCount` | Count | Explicit security events. |
| `OperationalAlertCount` | Count | Alarm-worthy emitted alerts. |

## Alert Signals

These are emitted now as `operational_alert` logs/metrics and should become CloudWatch alarms in task 2.10.

| Alert name | Initial trigger | Severity |
|---|---|---|
| `booking_api_unhandled_error` | Any non-placeholder 5xx response. | Critical |
| `paypal_webhook_rejected` | PayPal webhook route returns 4xx/5xx. | Warning |
| `smoobu_webhook_auth_failure` | Smoobu webhook route returns 401. | Warning |
| `public_rate_limit_triggered` | Any route returns `rate_limited`. | Warning |
| `captcha_escalation_triggered` | Any route returns `captcha_required`. | Warning |
| `smoobu_provider_degraded` | Future Smoobu provider call returns 429 or an error code. | Warning |
| `booking_state_transition_failed` | Future route/worker records failed state transition. | Critical |

Recommended alarm thresholds for Terraform:

| Alarm | Suggested threshold |
|---|---|
| Booking API unhandled errors | `OperationalAlertCount{alertName=booking_api_unhandled_error} >= 1` for 1 datapoint. |
| PayPal webhook failures | `WebhookRejectedCount` on `/api/webhooks/paypal` >= 1 in 5 minutes. |
| Smoobu webhook auth failures | `UnauthorizedWebhookCount` on `/api/webhooks/smoobu` >= 3 in 5 minutes. |
| Smoobu provider degraded | `SmoobuRateLimitedCount >= 1` or provider error rate > 5% in 5 minutes. |
| Abuse spike | `RateLimitedCount >= 20` or `CaptchaRequiredCount >= 10` in 5 minutes. |
| State transition failures | `BookingStateTransitionFailureCount >= 1` for critical booking/payment transitions. |

## Dashboard Layout

Terraform task 2.10 should create a CloudWatch dashboard with these widgets:

1. API traffic: `RequestCount` by route and method.
2. API latency: p50/p95/p99 of `RequestLatencyMs` by route.
3. API errors: `ClientErrorCount`, `ServerErrorCount`, and `ErrorCount` by route.
4. Abuse controls: `RateLimitedCount` and `CaptchaRequiredCount`.
5. Webhook health: `WebhookRejectedCount`, `UnauthorizedWebhookCount`, and later processing lag p95.
6. Provider health: `ProviderRequestCount`, `ProviderErrorCount`, `ProviderLatencyMs`, and `SmoobuRateLimitedCount`.
7. Booking workflow: `BookingStateTransitionCount` and `BookingStateTransitionFailureCount`.
8. Operational alerts: `OperationalAlertCount` by `AlertName`.

## Implementation Notes

- Current route handlers are still provider/database placeholders. Placeholder 501 responses are logged and metered as `NotImplementedCount`, but they do not emit critical unhandled-error alerts.
- The observability helper exposes `recordProviderCall`, `recordStateTransition`, and `recordSecurityEvent` on `RouteRequest.observability` so future Smoobu, PayPal, webhook, DB, and portal work can use the same schema.
- Logs are privacy-conscious by default. Do not add raw request bodies or guest PII to log fields in future tasks.
