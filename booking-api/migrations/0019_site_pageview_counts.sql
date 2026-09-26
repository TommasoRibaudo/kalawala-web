-- Aggregate, anonymous pageview counters for basic traffic visibility that
-- does not depend on cookie consent.
--
-- GA4/PostHog/Meta Pixel (see CookieConsentService on the frontend) only fire
-- after a visitor explicitly opts in, so anyone who is still pending or has
-- rejected cookies is invisible to every analytics tool the site has. Some
-- DPAs (CNIL most explicitly) recognise a narrow exemption from consent for
-- first-party "audience measurement" tooling, provided it is used only for
-- the site owner's own statistics, never shared with third parties, never
-- lets a visitor be tracked across sites, and never persists an identifier
-- that could re-identify a visitor.
--
-- This table goes stricter than that exemption requires so there is no
-- ambiguity and no identifier-rotation/retention machinery to build: no row
-- here is ever keyed by, or derived from, anything that identifies a visitor
-- (no cookie, no hashed IP/user-agent, no device id). Every row is a plain
-- counter for a (day, path, language, device category, referrer category)
-- bucket, incremented in place — see booking-api/src/siteMetrics.ts. A table
-- that only ever holds aggregate counts cannot be used to reconstruct an
-- individual visit, so there is also no retention limit to enforce: rows are
-- kept indefinitely.
--
-- Deliberately has no foreign key to booking_sessions or any other table —
-- this is an unlinked, anonymous counter, not part of the booking or
-- attribution data model. Compare tracking_identifiers (migration 0016),
-- which is the separate, consented, identified path used for reporting
-- conversions.
--
-- language reuses the existing booking_language enum (widened in migration
-- 0017 to the site's 9 released locales) rather than a second hardcoded list
-- — migration 0018 removed exactly that kind of duplicated, driftable list.
create table site_pageview_counts (
  day date not null,
  path text not null,
  language booking_language not null,
  device_category text not null,
  referrer_category text not null,
  pageview_count bigint not null default 0,
  updated_at timestamptz not null default now(),

  constraint site_pageview_counts_pk
    primary key (day, path, language, device_category, referrer_category),
  constraint site_pageview_counts_device_category_check
    check (device_category in ('mobile', 'tablet', 'desktop', 'other')),
  constraint site_pageview_counts_referrer_category_check
    check (referrer_category in ('direct', 'search', 'social', 'internal', 'other'))
);

create index site_pageview_counts_day_idx on site_pageview_counts (day);
