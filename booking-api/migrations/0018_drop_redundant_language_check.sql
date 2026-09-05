-- Hotfix for a production incident: migration 0017 widened the booking_language
-- Postgres ENUM to all 9 site locales, but missed a separate, redundant CHECK
-- constraint on booking_sessions (added in 0003_booking_sessions.sql, before
-- this table trusted the enum type alone to validate the column). That
-- constraint still hardcoded ('en', 'es'), so every search request in the 7
-- new locales failed inserting a booking_sessions row with a 500.
--
-- The enum type is now the single source of truth for valid language codes
-- (see bookingSessions.ts's BOOKING_LANGUAGES for the same list on the
-- application side) — this table-level CHECK duplicated that validation with
-- a second, independently-maintained list that silently went stale.
alter table booking_sessions
  drop constraint booking_sessions_language_required;
