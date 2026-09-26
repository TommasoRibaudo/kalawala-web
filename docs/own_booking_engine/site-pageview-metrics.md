# Site pageview metrics — data gathering guide

Read this before touching `site_pageview_counts`, before answering "how much traffic did X get", and before extending the anonymous-analytics feature. It exists so a future agent (or Tommaso) can go from "I need traffic numbers" to a working query without re-deriving any of this from scratch.

There is deliberately **no dashboard, no admin endpoint, and no scheduled report** for this data (see "Explicitly out of scope" below) — the only way to read it is to query the database directly. This doc is the reference for how to do that, both locally and against production.

---

## 1. What this is, in one paragraph

`site_pageview_counts` is an anonymous, aggregate-only pageview counter that runs for **every** visitor regardless of cookie consent — it exists specifically to answer "how much traffic are we getting" even for the visitors who reject or haven't yet answered the cookie banner, which GA4/PostHog/Meta Pixel can never see. It relies on the narrow "audience measurement" exemption from cookie consent that some DPAs recognise (CNIL most explicitly): no cookie, no hashed identifier, no cross-site tracking, no third-party sharing, first-party only, transparency in the privacy policy. The table only ever stores pre-aggregated counters (one row per day/path/language/device/referrer combination), never a per-visit event row, so there is nothing in it that could re-identify a visitor even in principle. Full legal/design rationale is in the header comment of the migration file (`booking-api/migrations/0019_site_pageview_counts.sql`) — read that if you need the "why", not just the "how".

**This is additive, not a replacement.** GA4, PostHog, and Meta Pixel are untouched and still gated on explicit consent via `CookieConsentService` — see `src/services/CookieConsent.service.ts`. Do not conflate the two systems; see section 8.

## 2. File map

| Concern | File |
|---|---|
| Table schema + full legal rationale | `booking-api/migrations/0019_site_pageview_counts.sql` |
| Bucketing logic (path/device/referrer classification) + upsert + HTTP handler | `booking-api/src/siteMetrics.ts` |
| Request validation (`path`, `language` only) | `booking-api/src/validation.ts` → `validateMetricsPageviewRequest` |
| Route registration (`POST /api/metrics/pageview`) | `booking-api/src/routes.ts` |
| Rate-limit policy (`metricsIngest`) | `booking-api/src/abuseProtection.ts`, `booking-api/src/types.ts` |
| Unit tests | `booking-api/src/siteMetrics.test.ts` |
| Frontend beacon (fires unconditionally, no consent check) | `src/services/SiteMetrics.service.ts` |
| Frontend wiring (fires on every route change) | `src/Router/Router.tsx` → `SiteMetricsPageView` component |

## 3. Schema

```sql
create table site_pageview_counts (
  day date not null,
  path text not null,
  language booking_language not null,   -- reuses the shared 9-locale enum, see migration 0017
  device_category text not null,        -- 'mobile' | 'tablet' | 'desktop' | 'other'
  referrer_category text not null,      -- 'direct' | 'search' | 'social' | 'internal' | 'other'
  pageview_count bigint not null default 0,
  updated_at timestamptz not null default now(),

  primary key (day, path, language, device_category, referrer_category)
);
```

Column meanings and gotchas:

- **`day`** — UTC calendar day the pageview happened, computed server-side (`new Date().toISOString().slice(0, 10)` in `siteMetrics.ts`). Not Costa-Rica-local time, unlike some booking-flow date logic elsewhere in this codebase. If you're comparing this to a Costa-Rica-local report, days will be offset by up to 6 hours around midnight.
- **`path`** — normalized route (`normalizePagePath` in `siteMetrics.ts`): query string and hash stripped, bounded to 200 chars, lowercase-agnostic. Anything that doesn't look like a plain site path (or fails validation) is bucketed into a literal `/other` row rather than rejected — **`/other` is a real bucket you will see in query results, it is not an error.**
- **`language`** — one of the 9 site locales (`en, es, de, fr, it, pt, he, hi, nl` — see `src/i18n/locales.ts`), taken from the frontend's `useLocale()` at the time of the pageview. This is the *page's* language, not a browser-negotiated language.
- **`device_category`** — derived server-side from the `User-Agent` header via a lightweight regex classifier (no npm dependency). Missing/unparseable UA → `other`.
- **`referrer_category`** — derived server-side from the `Referer` header's **hostname only** (never its path or query string, which can carry search terms). `internal` means the referrer's hostname matched one of `config.allowedOrigins` (i.e., in-site navigation via a full page load, which is rare in an SPA — most in-site navigation won't even send a new pageview referrer). `direct` means no Referer header was sent at all (typed URL, bookmark, or a referrer-stripping browser/extension — those are indistinguishable and both land here). There is **no `paid` category** — deriving that would require reading UTM/`gclid` params off the current URL, which this feature deliberately never does (that stays in the separate, consented `tracking_identifiers` path — see section 8).
- **`pageview_count`** — a plain counter, incremented via `INSERT ... ON CONFLICT DO UPDATE SET pageview_count = pageview_count + 1`. One row per unique `(day, path, language, device_category, referrer_category)` tuple; a busy page on a busy day is still exactly one row.
- **No `id` column, no foreign keys.** This table is deliberately unlinked from `booking_sessions` or anything else — there is no way to join it to identify a person or a specific booking.

## 4. What is NOT captured (and why)

Confirmed with the user when this was built — don't silently "fix" these, they're deliberate:

- **No unique-visitor count.** Only raw pageview counts. Deduplicating visitors would require some kind of identifier (even an ephemeral, daily-rotating one), and as of this writing `booking-api/src/cacheFactory.ts`'s `RedisAdapter` is still a stub (`CACHE_BACKEND=memory` fallback) — there's no shared, TTL'd store cheap enough to hold a same-day dedup set yet. **Before adding unique-visitor tracking, check whether Redis/ElastiCache has actually been wired up since this was written** (search `cacheFactory.ts` for `TODO: replace with actual Redis`).
- **No geo/country dimension.** Would need either IP geolocation (touches an identifier, even briefly) or a CloudFront-only viewer-country header, and CloudFront was not confirmed to sit in front of the API Gateway (`infra/frontend.tf`'s CloudFront distribution fronts the *frontend* S3 bucket, not the booking API). If you add this later, use a header-based approach, never store or geolocate a raw IP.
- **No admin/reporting endpoint or dashboard.** Query the table directly (this doc). Building a `/api/admin/site-metrics` endpoint was considered and explicitly declined to keep scope down for a single-operator site — revisit if that stops being true.
- **No retention/cleanup job.** Rows are pure aggregates with no identifiers, so there's no privacy retention ceiling to enforce (unlike, say, CNIL's 13/25-month guidance for tools that DO use an identifier) — rows are kept indefinitely for year-over-year comparison. This also means there is no cron job to look for if you're wondering how old data disappears — it doesn't.
- **No paid-attribution / UTM / gclid signal.** See the `referrer_category` note above. That data belongs to the separate, consented path (`ga_client_id`, `gclid`, etc. on `booking_sessions`, gated by `marketing_consent` — migration `0016_tracking_identifiers.sql`).

## 5. How to connect and query

### 5a. Local development

```bash
docker compose up -d postgres          # starts Postgres on localhost:5433 (see docker-compose.yml)
npm run local:migrate                  # applies all migrations, including 0019
```

Then query directly:

```bash
psql "postgres://booking:booking@localhost:5433/kalawala" -c "select * from site_pageview_counts order by day desc, pageview_count desc limit 20;"
```

Credentials are the hardcoded local-only ones in `docker-compose.yml` (`booking`/`booking`) — nothing secret.

To generate local test data, hit the endpoint through the dev API server:

```bash
npm run build --prefix booking-api
npm run local:api    # booking API on :4000, see package.json
curl -s -X POST http://localhost:4000/api/metrics/pageview \
  -H "Content-Type: application/json" \
  -H "User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15" \
  -H "Referer: https://www.google.com/search?q=puerto+viejo" \
  -d '{"path":"/Geco","language":"en"}'
```

Or just run `npm start` and click around the site — `SiteMetricsPageView` in `Router.tsx` fires on every route change automatically, no consent banner interaction needed.

### 5b. Production (and any live environment)

The RDS instance is private (`publicly_accessible = false` in `infra/database.tf`) — there is no direct network path from a laptop. The established pattern (see `infra/MIGRATION_RUNBOOK.md` section 3.2, which used this exact mechanism to spot-check row counts during the us-east-1 → us-east-2 migration) is an **SSM Session Manager port-forward through the fck-nat EC2 instance**, which doubles as the bastion (`infra/vpc.tf`, search for "Also makes the instance usable as the SSM bastion").

Current environment facts (confirmed against `infra/environments/prod.tfvars` and `infra/variables.tf` — re-verify if this doc is more than a few months old, infra does change):

- Region: **us-east-2** (`aws_region` in `prod.tfvars`; the us-east-1 stack from before the migration is fully decommissioned per `infra/backend-us-east-2.hcl`'s header comment)
- fck-nat ASG name: **`kalawala-prod-fck-nat`** (`${var.project}-${var.environment}-fck-nat`, project=`kalawala`, environment=`prod`)
- DB name: **`kalawala_booking`**
- DB master username: **`kalawala_admin`** (default in `variables.tf`; don't hardcode the password — it's a Terraform `random_password`, fetch it live, see below)
- DB credentials secret: **`kalawala/prod/db`** in Secrets Manager (`db_secret_name` in `prod.tfvars`)

Step by step:

```bash
# 1. Find the current fck-nat instance (it's in an ASG, so the instance ID can
#    change after a replacement — always look it up fresh, don't cache it).
FCKNAT_INSTANCE_ID=$(aws autoscaling describe-auto-scaling-groups \
  --auto-scaling-group-names kalawala-prod-fck-nat \
  --region us-east-2 \
  --query 'AutoScalingGroups[0].Instances[0].InstanceId' \
  --output text)

# 2. Get the RDS endpoint (from Terraform state, or read the Secrets Manager
#    secret directly — step 4 below gets it from the same secret in one shot).
cd infra
RDS_ENDPOINT=$(terraform output -raw db_address)

# 3. Open the SSM tunnel (runs in the foreground; use & or a separate terminal).
aws ssm start-session \
  --target "${FCKNAT_INSTANCE_ID}" \
  --document-name AWS-StartPortForwardingSessionToRemoteHost \
  --parameters "{\"host\":[\"${RDS_ENDPOINT}\"],\"portNumber\":[\"5432\"],\"localPortNumber\":[\"15432\"]}" \
  --region us-east-2 &
sleep 5

# 4. Fetch the current master password (rotated/managed by Terraform — never
#    hardcode it in a doc, script, or shell history you intend to keep).
DB_PASSWORD=$(aws secretsmanager get-secret-value \
  --secret-id kalawala/prod/db \
  --region us-east-2 \
  --query SecretString --output text | jq -r .password)

# 5. Query through the tunnel.
PGPASSWORD="$DB_PASSWORD" psql -h localhost -p 15432 \
  -U kalawala_admin -d kalawala_booking \
  -c "select day, sum(pageview_count) from site_pageview_counts group by day order by day desc limit 14;"
```

**Safety note:** this connects as the RDS *master* user — the same credential the migration runner uses. It can drop tables. Only run `SELECT` statements against `site_pageview_counts` (or any table) through this path unless you specifically intend a write, and double-check the table name before running anything with `DELETE`/`UPDATE`/`DROP` in it. There is no separate read-only role provisioned for analytics as of this writing; if ad-hoc querying becomes routine, that's a reasonable follow-up (`CREATE ROLE ... WITH LOGIN; GRANT SELECT ON site_pageview_counts TO ...`) rather than continuing to reach for the master credential.

Close the tunnel when done (`kill %1` or Ctrl+C the background job) — it's a live SSM session against a production bastion.

## 6. Query cookbook

All of these run unmodified locally or through the production tunnel above.

**Total pageviews per day, last 30 days:**
```sql
select day, sum(pageview_count) as pageviews
from site_pageview_counts
where day >= current_date - interval '30 days'
group by day
order by day;
```

**Top 20 pages, all time:**
```sql
select path, sum(pageview_count) as pageviews
from site_pageview_counts
group by path
order by pageviews desc
limit 20;
```

**Traffic by language:**
```sql
select language, sum(pageview_count) as pageviews
from site_pageview_counts
group by language
order by pageviews desc;
```

**Device mix (mobile vs desktop vs tablet):**
```sql
select device_category, sum(pageview_count) as pageviews
from site_pageview_counts
group by device_category
order by pageviews desc;
```

**Where traffic comes from:**
```sql
select referrer_category, sum(pageview_count) as pageviews
from site_pageview_counts
group by referrer_category
order by pageviews desc;
```

**Trend for one specific page (e.g. a property listing) over time:**
```sql
select day, sum(pageview_count) as pageviews
from site_pageview_counts
where path = '/Geco'
group by day
order by day;
```

**Compare two date ranges (e.g. week-over-week):**
```sql
select
  case when day >= current_date - interval '7 days' then 'this_week' else 'last_week' end as period,
  sum(pageview_count) as pageviews
from site_pageview_counts
where day >= current_date - interval '14 days'
group by period;
```

**How much of `/other` (unclassified paths) is showing up — a data-quality check:**
```sql
select day, sum(pageview_count) as other_pageviews
from site_pageview_counts
where path = '/other'
group by day
order by day desc
limit 14;
```
If this is a large share of traffic, something upstream is sending malformed paths — check `normalizePagePath` in `siteMetrics.ts` and what the frontend is actually passing as `location.pathname`.

## 7. Verifying the pipeline is alive end-to-end

```bash
# 1. Confirm the route exists and validates input.
curl -s -i -X POST "${API_BASE_URL}/api/metrics/pageview" \
  -H "Content-Type: application/json" \
  -d '{"path":"/Geco","language":"xx"}'
# Expect: HTTP 422, fieldErrors.language = ["language_not_supported"]

# 2. Send a real beacon.
curl -s -i -X POST "${API_BASE_URL}/api/metrics/pageview" \
  -H "Content-Type: application/json" \
  -H "User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15" \
  -H "Referer: https://www.google.com/search?q=puerto+viejo" \
  -d '{"path":"/Geco","language":"en"}'
# Expect: HTTP 200 {"status":"ok"}

# 3. Confirm it landed (see section 5 for how to reach the DB).
psql ... -c "select * from site_pageview_counts where path = '/Geco' order by updated_at desc limit 1;"
# Expect: device_category = 'mobile', referrer_category = 'search', pageview_count incremented.
```

In the browser: open the site, open DevTools → Network, filter for `metrics/pageview`, navigate between pages, confirm one request fires per route change — with **no cookie header attached and no `Idempotency-Key`/device-id header** (this route must never carry an identifier; if you ever see one being sent, something has regressed). Then click "Reject All" in the cookie banner and confirm the beacon keeps firing while GA4/PostHog/Meta Pixel network calls stop — that's the whole point of this feature working correctly.

## 8. Relationship to other analytics — don't conflate these

| | `site_pageview_counts` (this feature) | GA4 / PostHog / Meta Pixel | `tracking_identifiers` on `booking_sessions` |
|---|---|---|---|
| Requires consent? | No (exempt) | Yes (`CookieConsentService`) | Yes (`marketing_consent` column) |
| Grain | Aggregate counter, no per-visit row | Per-event, client-side | Per booking session |
| Identifiers | None, ever | Cookies, client IDs | `ga_client_id`, `fbp`, `fbc`, `gclid` |
| Purpose | "How much traffic, roughly, from where" | Behavioral analytics, funnels | Server-side conversion reporting to ad platforms |
| Where | `booking-api` + Postgres | Frontend services, third-party | `booking-api`, migration `0016` |

If a question is about *conversions*, *campaigns*, or *individual user behavior*, this table is the wrong place to look — use GA4/PostHog (if consented) or the `tracking_identifiers` columns. If the question is "roughly how much traffic did we get, broken down by page/device/language/referrer-type, including visitors who declined cookies", this table is the answer.

## 9. If you're asked to extend this

Before adding a new dimension or capability, check whether the reason it was deferred still holds:

- **Unique visitors** → check if Redis/ElastiCache is wired up (`cacheFactory.ts`). If yes, a daily-rotating salted hash + a same-day dedup set (Redis `SETNX` with a 24h TTL) is the standard privacy-preserving pattern (how Plausible/Fathom/GoatCounter do it) — the salt must still rotate daily and never be persisted, or you lose the consent exemption.
- **Country/geo** → check if CloudFront now sits in front of the API Gateway. If yes, use its `CloudFront-Viewer-Country` header (coarse, no IP storage needed). Do not add IP-based geolocation that stores or logs a raw IP against this table.
- **A dashboard/admin endpoint** → reasonable once querying by hand becomes a recurring chore. Reuse the staff/portal auth pattern already in `portalAuth.ts`/`depositConfirm.ts` rather than inventing a new one.
- **Anything that would add an identifier of any kind** (cookie, localStorage, fingerprint, persisted hash) → stop and reconsider whether it still qualifies for the consent exemption this whole feature depends on. Read the rationale in migration `0019`'s header comment again before proceeding.
