# Live booking full-flow acceptance tests

Drives the entire guest journey against the **real** booking-api (local stack),
not the in-browser API mocks the rest of `tests/e2e` use. Two specs, one per
payment path:

**`booking-full-flow.live.ts` — PayPal**
```
search → hold → PayPal approve → capture → confirmation
       → portal login → cancel → dates released
```

**`deposit-full-flow.live.ts` — bank transfer / SINPE** (no PayPal, no money)
```
search → deposit hold → receipt upload (S3/MinIO) → portal refused
       → staff confirms via signed link → portal works → cancel → dates released
```

Smoobu is **always mocked** (it has no sandbox — a real hold blocks live
inventory across every channel), so this never touches real inventory and is
safe to run on every PR. PayPal is the only provider that can be made real.

## Run it

```bash
# Mock PayPal — no credentials, no money, no external calls. Proves the whole
# flow end to end. This is what CI / pre-deploy runs by default.
npm run test:e2e:live

# Real PayPal *sandbox* — creates, approves and captures a real sandbox order.
# Reads booking-api/.env.sandbox and logs in as the sandbox buyer.
npm run test:e2e:live:sandbox
```

The orchestrator (`scripts/booking-live-e2e.sh`) owns docker + migrations +
the api/mocks process; Playwright (`playwright.live.config.ts`) owns the CRA
frontend. Docker Desktop must be running.

## Sandbox credentials

`npm run test:e2e:live:sandbox` needs `booking-api/.env.sandbox` filled in
(gitignored). The same values live in GitHub Actions secrets for CI:

| Env var | Where it comes from |
|---|---|
| `PAYPAL_CLIENT_ID` / `PAYPAL_CLIENT_SECRET` | PayPal Developer → Apps & Credentials → **Sandbox** REST app |
| `PAYPAL_SANDBOX_BUYER_EMAIL` / `PAYPAL_SANDBOX_BUYER_PASSWORD` | Testing Tools → Sandbox Accounts (a **personal** account) |

## Why the frontend talks to the API cross-origin

`playwright.live.config.ts` sets `REACT_APP_BOOKING_API_BASE_URL=http://localhost:4000`
so the browser calls the API directly (:3000 → :4000) instead of via CRA's
`/api` proxy. This mirrors production (site → API Gateway) and is **required**:
the booking-api derives the PayPal return/cancel URLs from the request's
`Origin` header (`paypalOrders.ts`); behind the proxy that Origin resolves to
:4000 and the post-payment redirect lands on the API instead of the site.

## Notes

- Dates are a unique far-future window per run (the `holds` table has an
  exclusion constraint that rejects an overlapping hold on the same property).
- The `sandbox` PayPal approval drives PayPal's own pages, whose markup PayPal
  changes without notice. If the sandbox run starts failing inside
  `helpers/livePaypal.ts`, re-record the selectors against a live sandbox
  checkout — the mock run is unaffected.
