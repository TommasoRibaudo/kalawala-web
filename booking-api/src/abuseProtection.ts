import { createHash } from "crypto";
import { ApiError } from "./http/errors";
import { getHeader } from "./http/request";
import {
  AbuseProtectionConfig,
  AbuseProtectionPolicyName,
  HeadersMap,
  RouteRequest,
} from "./types";

type RateLimitScope = "ip" | "device";

interface RateLimitRule {
  scope: RateLimitScope;
  limit: number;
  windowSeconds: number;
  captchaAfter?: number;
}

interface AbusePolicy {
  name: AbuseProtectionPolicyName;
  rules: RateLimitRule[];
}

interface Bucket {
  count: number;
  resetAtMs: number;
}

interface RuleResult {
  rule: RateLimitRule;
  count: number;
  resetAtMs: number;
}

const DEFAULT_POLICIES: Record<AbuseProtectionPolicyName, AbusePolicy> = {
  publicRead: {
    name: "publicRead",
    rules: [
      { scope: "ip", limit: 120, windowSeconds: 60 },
      { scope: "device", limit: 80, windowSeconds: 60 },
    ],
  },
  availabilitySearch: {
    name: "availabilitySearch",
    rules: [
      { scope: "ip", limit: 30, windowSeconds: 60 },
      { scope: "device", limit: 20, windowSeconds: 60 },
    ],
  },
  holdCreate: {
    name: "holdCreate",
    rules: [
      { scope: "ip", limit: 8, windowSeconds: 15 * 60, captchaAfter: 3 },
      { scope: "device", limit: 5, windowSeconds: 15 * 60, captchaAfter: 2 },
    ],
  },
  paymentCreate: {
    name: "paymentCreate",
    rules: [
      { scope: "ip", limit: 12, windowSeconds: 10 * 60, captchaAfter: 5 },
      { scope: "device", limit: 8, windowSeconds: 10 * 60, captchaAfter: 4 },
    ],
  },
  paymentCapture: {
    name: "paymentCapture",
    rules: [
      { scope: "ip", limit: 20, windowSeconds: 10 * 60 },
      { scope: "device", limit: 12, windowSeconds: 10 * 60 },
    ],
  },
  depositEvent: {
    name: "depositEvent",
    rules: [
      { scope: "ip", limit: 20, windowSeconds: 10 * 60 },
      { scope: "device", limit: 10, windowSeconds: 10 * 60 },
    ],
  },
  webhook: {
    name: "webhook",
    rules: [{ scope: "ip", limit: 300, windowSeconds: 60 }],
  },
  portalLogin: {
    name: "portalLogin",
    rules: [
      { scope: "ip", limit: 10, windowSeconds: 5 * 60 },
      { scope: "device", limit: 5, windowSeconds: 5 * 60 },
    ],
  },
  portalRead: {
    name: "portalRead",
    rules: [
      { scope: "ip", limit: 60, windowSeconds: 60 },
      { scope: "device", limit: 40, windowSeconds: 60 },
    ],
  },
  portalWrite: {
    name: "portalWrite",
    rules: [
      { scope: "ip", limit: 12, windowSeconds: 10 * 60 },
      { scope: "device", limit: 8, windowSeconds: 10 * 60 },
    ],
  },
};

export class AbuseGuard {
  private readonly store: InMemoryRateLimitStore;
  private readonly now: () => number;

  constructor(
    private readonly config: AbuseProtectionConfig,
    now: () => number = Date.now
  ) {
    this.now = now;
    this.store = new InMemoryRateLimitStore(config.maxTrackedBuckets, now);
  }

  assertAllowed(request: RouteRequest, policyName: AbuseProtectionPolicyName | undefined): void {
    if (!this.config.enabled || !policyName) {
      return;
    }

    const policy = DEFAULT_POLICIES[policyName];
    const nowMs = this.now();
    const results = policy.rules.map((rule) => this.consumeRule(policy, rule, request, nowMs));

    applyRateLimitHeaders(request.responseHeaders, policy, results, nowMs);

    const exceeded = results.find(({ rule, count }) => count > rule.limit);
    if (exceeded) {
      const retryAfterSeconds = secondsUntil(exceeded.resetAtMs, nowMs);
      request.responseHeaders["Retry-After"] = String(retryAfterSeconds);

      throw new ApiError(429, "rate_limited", "Too many requests. Please try again later.", {
        retryable: true,
      });
    }

    // TODO(task-2.2): CAPTCHA bypass path is not yet implemented. This signals
    // the client to show a CAPTCHA challenge (via X-Captcha-Required) but the
    // server does not yet read an inbound X-Captcha-Token or verify it against
    // a CAPTCHA provider (reCAPTCHA/hCaptcha). Until that integration lands,
    // every request in the window after captchaAfter is rejected regardless of
    // whether the user completed a real challenge. Wire up provider verification
    // here before treating this 403 flow as end-to-end functional.
    const captchaRequired = results.find(
      ({ rule, count }) =>
        this.config.captchaChallengesEnabled &&
        typeof rule.captchaAfter === "number" &&
        count > rule.captchaAfter
    );
    if (captchaRequired) {
      request.responseHeaders["X-Captcha-Required"] = "true";
      request.responseHeaders["X-Captcha-Policy"] = policy.name;
      request.responseHeaders["X-Captcha-Window-Seconds"] = String(captchaRequired.rule.windowSeconds);

      throw new ApiError(403, "captcha_required", "Please complete the CAPTCHA challenge before continuing.", {
        fieldErrors: {
          captchaToken: ["captcha_required"],
        },
      });
    }
  }

  private consumeRule(
    policy: AbusePolicy,
    rule: RateLimitRule,
    request: RouteRequest,
    nowMs: number
  ): RuleResult {
    const identity = rule.scope === "ip" ? getIpIdentity(request) : getDeviceIdentity(request);
    const key = `${policy.name}:${rule.scope}:${hashIdentity(identity)}:${rule.windowSeconds}`;
    const bucket = this.store.increment(key, rule.windowSeconds, nowMs);

    return {
      rule,
      count: bucket.count,
      resetAtMs: bucket.resetAtMs,
    };
  }
}

class InMemoryRateLimitStore {
  private readonly buckets = new Map<string, Bucket>();

  constructor(
    private readonly maxBuckets: number,
    private readonly now: () => number
  ) {}

  increment(key: string, windowSeconds: number, nowMs: number): Bucket {
    const existing = this.buckets.get(key);
    const windowMs = windowSeconds * 1000;

    if (!existing || existing.resetAtMs <= nowMs) {
      const bucket = { count: 1, resetAtMs: nowMs + windowMs };
      this.buckets.set(key, bucket);
      this.pruneIfNeeded();
      return bucket;
    }

    existing.count += 1;
    return existing;
  }

  private pruneIfNeeded(): void {
    if (this.buckets.size <= this.maxBuckets) {
      return;
    }

    const nowMs = this.now();
    for (const [key, bucket] of this.buckets) {
      if (bucket.resetAtMs <= nowMs) {
        this.buckets.delete(key);
      }
    }

    while (this.buckets.size > this.maxBuckets) {
      const oldestKey = this.buckets.keys().next().value as string | undefined;
      if (!oldestKey) {
        return;
      }
      this.buckets.delete(oldestKey);
    }
  }
}

function getIpIdentity(request: RouteRequest): string {
  return request.clientIp ?? "missing-ip";
}

function getDeviceIdentity(request: RouteRequest): string {
  const explicitDeviceId = getHeader(request.headers, "x-kalawala-device-id") ?? getHeader(request.headers, "x-device-id");
  if (explicitDeviceId && /^[A-Za-z0-9._:-]{8,128}$/.test(explicitDeviceId)) {
    return `device:${explicitDeviceId}`;
  }

  const acceptLanguage = getHeader(request.headers, "accept-language") ?? "";
  return `fingerprint:${request.userAgent ?? "missing-user-agent"}:${acceptLanguage}`;
}

function hashIdentity(identity: string): string {
  return createHash("sha256").update(identity).digest("hex").slice(0, 32);
}

function applyRateLimitHeaders(
  headers: HeadersMap,
  policy: AbusePolicy,
  results: RuleResult[],
  nowMs: number
): void {
  const tightest = results.reduce((current, candidate) => {
    const currentRemaining = current.rule.limit - current.count;
    const candidateRemaining = candidate.rule.limit - candidate.count;
    return candidateRemaining < currentRemaining ? candidate : current;
  });

  headers["X-RateLimit-Policy"] = policy.name;
  headers["X-RateLimit-Limit"] = String(tightest.rule.limit);
  headers["X-RateLimit-Remaining"] = String(Math.max(0, tightest.rule.limit - tightest.count));
  headers["X-RateLimit-Reset"] = String(Math.ceil(tightest.resetAtMs / 1000));

  const retryAfterSeconds = secondsUntil(tightest.resetAtMs, nowMs);
  headers["X-RateLimit-Reset-After"] = String(retryAfterSeconds);
}

function secondsUntil(resetAtMs: number, nowMs: number): number {
  return Math.max(1, Math.ceil((resetAtMs - nowMs) / 1000));
}
