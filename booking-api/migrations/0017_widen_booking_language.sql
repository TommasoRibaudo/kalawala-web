-- Widen booking_language to match the marketing site's 9 released locales
-- (src/i18n/locales.ts). The booking engine has been English/Spanish-only
-- since it was built, predating the site's later 9-locale i18n rollout.
--
-- IMPORTANT — enum extension and transaction boundaries. Same constraint as
-- migrations/0014_manual_deposit.sql: scripts/migrate.js wraps the entire
-- run in a single transaction. PostgreSQL permits `alter type ... add value`
-- inside a transaction block, but the new label cannot be *used* until that
-- transaction commits. So:
--
--   * `alter type` must be a top-level statement, not inside a do $$ block —
--     PostgreSQL rejects ALTER TYPE ... ADD from a function body.
--   * nothing in this file, or in any migration still pending in the same
--     run, may reference these new language codes in a CHECK, index
--     predicate, INSERT or UPDATE.
--
-- Land this migration in its own `npm run migrate` before deploying code
-- that writes any of the new values.

alter type booking_language add value if not exists 'de';
alter type booking_language add value if not exists 'fr';
alter type booking_language add value if not exists 'it';
alter type booking_language add value if not exists 'pt';
alter type booking_language add value if not exists 'he';
alter type booking_language add value if not exists 'hi';
alter type booking_language add value if not exists 'nl';
