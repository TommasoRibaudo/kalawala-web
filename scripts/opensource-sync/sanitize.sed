# sanitize.sed — brand/data substitutions applied to booking-api changes before
# they land in the PUBLIC smoobu-booking-engine repo.
#
# The public repo is a GENERALIZED fork: every Kalawala-specific identifier was
# replaced with neutral demo data at extraction time. This file replays that same
# transform on new changes so the public repo stays generic (and no private data
# — real Smoobu apartment IDs, property UUIDs, domains, guest info — leaks).
#
# It is deliberately conservative: deterministic literal swaps only. It CANNOT
# catch everything (reworded comments, guest-name fixtures, novel identifiers),
# which is why sync-public-booking-engine.sh runs a leak audit afterwards and
# STOPS if any known-private token survives. Treat that audit as the real gate;
# extend this file whenever the audit flags a new recurring pattern.
#
# ── Property UUIDs (propertyCatalog / seed data) → demo UUIDs ──────────────────
s/b8a1f2e7-86d3-4c30-8f6a-8046a5f9a111/11111111-0000-4000-8000-000000000001/g
s/a75f112f-5aa4-46a7-9f64-1a3b5f30b54c/11111111-0000-4000-8000-000000000002/g
s/d06f7d50-cbbe-4ec6-954c-3e0f9ac2f2e7/11111111-0000-4000-8000-000000000003/g
# A "will not match anything real" fixture that reused Geco's UUID prefix.
s/b8a1f2e7-0000-4000-8000-000000000000/11111111-0000-4000-8000-000000000000/g
#
# ── Real Smoobu apartment IDs → demo IDs (100001–100004) ──────────────────────
s/301061/100001/g
s/301058/100002/g
s/301064/100003/g
#
# ── Property-scoped test constant prefixes ────────────────────────────────────
s/GECO_/SUNSET_/g
s/PAPPAGALLO_/PALM_/g
s/RANA_/OCEAN_/g
#
# ── Property display names (longest first) ────────────────────────────────────
s/Casa Geco/Sunset Villa/g
s/Casa Pappagallo/Palm Cottage/g
s/Casa Rana/Ocean Breeze/g
#
# ── Property slugs, quoted (double and single) ────────────────────────────────
s/"Geco"/"SunsetVilla"/g
s/"Rana"/"OceanBreeze"/g
s/"Pappagallo"/"PalmCottage"/g
s/"Tucano"/"JungleLoft"/g
s/'Geco'/'SunsetVilla'/g
s/'Rana'/'OceanBreeze'/g
s/'Pappagallo'/'PalmCottage'/g
s/'Tucano'/'JungleLoft'/g
s/'VillaMar'/'SunsetVilla'/g
s/'VillaCoral'/'PalmCottage'/g
s/'Areka'/'OceanBreeze'/g
s/'Plumeria'/'JungleLoft'/g
s/'Giulia'/'SunsetVilla'/g
s/'Delfines'/'PalmCottage'/g
#
# ── Property names as bare words in prose/comments (AFTER the quoted-slug rules
#    above, so `"Geco"` → `"SunsetVilla"` wins for slugs and these only catch
#    prose like "a Geco deposit"). No \b word boundaries on purpose — BSD/macOS
#    sed does not support them; these are distinctive proper nouns that never
#    appear as a substring of a real identifier in this codebase. ─────────────
s/Pappagallo/Palm Cottage/g
s/VillaCoral/Palm Cottage/g
s/VillaMar/Sunset Villa/g
s/Geco/Sunset Villa/g
s/Rana/Ocean Breeze/g
s/Tucano/Jungle Loft/g
s/Areka/Ocean Breeze/g
s/Plumeria/Jungle Loft/g
s/Giulia/Sunset Villa/g
s/Delfines/Palm Cottage/g
# NOTE: real reservation/incident IDs and guest PII are intentionally NOT
# substituted here — hardcoding the value would leave a plaintext copy in this
# public repo (see leak-tokens.txt and .gitleaks.toml). Scrub those at the
# source and catch them at human review, not with a rule in this file.
#
# ── Domains, emails, DB name ──────────────────────────────────────────────────
s#api\.kalawala\.com#api.booking.test#g
s#staff@kalawala\.test#staff@example.com#g
s#test@kalawala\.com#test@example.com#g
s#reservas\.kalawala@gmail\.com#reservations@example.com#g
s#kalawala\.com#example.com#g
s#kalawala\.test#booking.test#g
s#5432/kalawala#5432/booking_engine#g
#
# ── Brand name → SITE_NAME (files that use it must import it from ./branding) ──
# Bare match (no trailing-space requirement): within booking-api/ "Kalawala"
# never appears as a substring of another identifier (checked at extraction
# and re-checked 2026-09-14), so this is safe as a catch-all. It must run
# before the sentence-final translated strings (subject/intro/note in
# non-en/es locales) get to the leak audit — those end the word in
# punctuation ("... de Kalawala.", "... Kalawala\"") rather than a space,
# which a space-anchored rule misses.
s/Kalawala/${SITE_NAME}/g
#
# ── Brand name, transliterated into non-Latin locale scripts ──────────────────
# he/hi translate "Kalawala" phonetically instead of keeping it Latin, so the
# rule above can't see it. This is a best-effort text swap only — it does NOT
# fix the string-literal-vs-template-literal issue below, and Hebrew grammar
# sometimes glues a preposition directly onto the word (e.g. "מקלאוואלה" =
# "מ" + the brand, no space) which needs a hyphen after swapping in the Latin
# placeholder ("מ-${SITE_NAME}") — sed can't tell those apart, check by hand.
s/קלאוואלה/${SITE_NAME}/g
s/कलावाला/${SITE_NAME}/g
#
# NOTE: every substitution in this file is a blind text swap — it has no idea
# whether it just inserted "${SITE_NAME}" into a double-quoted string (where
# it's literal dead text, NOT interpolated) versus a backtick template literal
# (where it works). Check every line this file touches that now contains
# "${SITE_NAME}", "${dir}" or similar: if the enclosing quotes aren't
# backticks, the placeholder will ship to guests literally instead of
# resolving. This bit real 7-new-locale email copy during the 2026-09-14 sync.
#
# ── Property ids as lowercase test-fixture strings (propertyId: "…") ──────────
# These are opaque handles inside isolated unit-test mocks, not the real
# BOOKING_PROPERTIES catalog, so any demo slug is a valid substitute — pick
# the canonical mapping above for consistency.
s/"areka"/"oceanbreeze"/g
#
# ── Frontend theme variables (web-widgets only) ───────────────────────────────
s/\$kalawala-/$booking-/g
