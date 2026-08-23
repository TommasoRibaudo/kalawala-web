#!/usr/bin/env bash
#
# sync-public-booking-engine.sh
#
# Prepare a sanitized catch-up of booking-api/ changes for the PUBLIC
# smoobu-booking-engine repo. REVIEW-GATE model: this stages a branch + diff for
# you to inspect, test, and push. It never pushes and never touches main.
#
# Scope: api/ ONLY. web-widgets/ and infra/ are intentionally out of scope —
# see README.md ("What this does NOT sync") for why.
#
# Usage:
#   scripts/opensource-sync/sync-public-booking-engine.sh [PUBLIC_CLONE_DIR]
#
#   PUBLIC_CLONE_DIR  Optional path to an existing clone of the public repo.
#                     If omitted, a fresh clone is made in a temp dir.
#
# Env:
#   PUBLIC_REPO        GitHub slug of the public repo
#                      (default: TommasoRibaudo/smoobu-booking-engine)
#   SYNC_TARGET_REF    Monorepo ref to sync up to (default: origin/main)
#
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
MONOREPO="$(cd "$HERE/../.." && pwd)"
SED_FILE="$HERE/sanitize.sed"
LEAK_TOKENS="$HERE/leak-tokens.txt"
PROTECTED="$HERE/protected-paths.txt"
LAST_SYNCED_FILE="$HERE/.last-synced"

PUBLIC_REPO="${PUBLIC_REPO:-TommasoRibaudo/smoobu-booking-engine}"
TARGET_REF="${SYNC_TARGET_REF:-origin/main}"

bold() { printf '\033[1m%s\033[0m\n' "$*"; }
warn() { printf '\033[33m%s\033[0m\n' "$*"; }
err()  { printf '\033[31m%s\033[0m\n' "$*" >&2; }

[ -f "$LAST_SYNCED_FILE" ] || { err "Missing $LAST_SYNCED_FILE — cannot determine the last sync point."; exit 1; }
LAST_SYNCED="$(tr -d '[:space:]' < "$LAST_SYNCED_FILE")"

bold "==> Fetching monorepo origin"
git -C "$MONOREPO" fetch origin --quiet
TARGET_SHA="$(git -C "$MONOREPO" rev-parse "$TARGET_REF")"

if [ "$(git -C "$MONOREPO" rev-parse "$LAST_SYNCED")" = "$TARGET_SHA" ]; then
  bold "Public repo is already synced to $TARGET_REF ($(git -C "$MONOREPO" rev-parse --short "$TARGET_SHA")). Nothing to do."
  exit 0
fi

bold "==> booking-api commits to port ($LAST_SYNCED..$TARGET_REF)"
git -C "$MONOREPO" log --oneline "$LAST_SYNCED..$TARGET_SHA" -- booking-api/ || true
COMMIT_COUNT="$(git -C "$MONOREPO" log --oneline "$LAST_SYNCED..$TARGET_SHA" -- booking-api/ | wc -l | tr -d ' ')"
if [ "$COMMIT_COUNT" = "0" ]; then
  bold "No booking-api changes in range. Nothing to sync."
  exit 0
fi

# ── Locate / create the public clone ─────────────────────────────────────────
if [ "${1:-}" != "" ]; then
  PUB="$1"
  [ -d "$PUB/.git" ] || { err "$PUB is not a git clone."; exit 1; }
  bold "==> Using existing public clone: $PUB"
else
  PUB="$(mktemp -d)/smoobu-booking-engine"
  bold "==> Cloning $PUBLIC_REPO -> $PUB"
  gh repo clone "$PUBLIC_REPO" "$PUB" -- --quiet
fi

# Always base the sync branch on the freshly-fetched public default branch
# (this repo's is `master`), so the diff is reviewed against current upstream
# regardless of what the clone had checked out.
git -C "$PUB" fetch origin --quiet
PUB_DEFAULT="$(git -C "$PUB" rev-parse --abbrev-ref origin/HEAD 2>/dev/null | sed 's#^origin/##')"
PUB_DEFAULT="${PUB_DEFAULT:-master}"
git -C "$PUB" rev-parse --verify "origin/$PUB_DEFAULT" >/dev/null 2>&1 \
  || { err "$PUB has no origin/$PUB_DEFAULT — is '$PUBLIC_REPO' reachable?"; exit 1; }
BRANCH="sync/catch-up-$(git -C "$MONOREPO" rev-parse --short "$TARGET_SHA")"
git -C "$PUB" checkout -B "$BRANCH" "origin/$PUB_DEFAULT" --quiet

# ── Build the sanitized patch (api/ only, excluding protected paths) ──────────
PATCH="$(mktemp)"
EXCLUDES=()
while IFS= read -r line; do
  case "$line" in \#*|"") continue;; esac
  case "$line" in api/*) EXCLUDES+=( ":(exclude)booking-api/${line#api/}" );; esac
done < "$PROTECTED"

git -C "$MONOREPO" diff "$LAST_SYNCED..$TARGET_SHA" -- booking-api/ "${EXCLUDES[@]}" \
  | sed -E 's#([ab])/booking-api/#\1/api/#g' \
  | sed -f "$SED_FILE" > "$PATCH"

if [ ! -s "$PATCH" ]; then
  warn "Patch is empty after excluding protected paths. Any changes were to protected files only —"
  warn "reconcile those by hand (see protected-paths.txt). Nothing auto-applied."
  exit 0
fi

bold "==> Applying sanitized patch (rejects saved as *.rej for manual resolution)"
set +e
git -C "$PUB" apply --reject --whitespace=nowarn "$PATCH"
APPLY_RC=$?
set -e
REJECTS="$(find "$PUB/api" -name '*.rej' 2>/dev/null || true)"

# ── Leak audit: the real gate ────────────────────────────────────────────────
bold "==> Leak audit (scanning changes for private tokens)"
LEAKS="$(git -C "$PUB" diff | grep -E '^\+' | grep -inEf "$LEAK_TOKENS" \
          | grep -viE 'booking_engine|SITE_NAME|\$booking-' || true)"

echo
bold "──────────────────────────────────────────────────────────────────────────"
bold " SYNC PREPARED — review gate"
bold "──────────────────────────────────────────────────────────────────────────"
echo "Public clone : $PUB"
echo "Branch       : $BRANCH"
echo "Ported       : $COMMIT_COUNT booking-api commit(s) [$LAST_SYNCED..$(git -C "$MONOREPO" rev-parse --short "$TARGET_SHA")]"
[ -n "$REJECTS" ] && warn "Rejected hunks (resolve by hand):" && echo "$REJECTS"
if [ -n "$LEAKS" ]; then
  err "!! LEAK AUDIT FAILED — private tokens found in the staged diff:"
  err "$LEAKS"
  err "Fix these (extend sanitize.sed if recurring), re-audit, and do NOT push until clean."
fi
echo
bold "Next steps (you drive — nothing was pushed):"
cat <<EOF
  1. cd "$PUB"
  2. Resolve any *.rej hunks, then delete the .rej files.
  3. Re-run the leak audit until clean:
       git diff | grep -E '^\+' | grep -inEf "$LEAK_TOKENS" | grep -viE 'booking_engine|SITE_NAME|\\\$booking-'
  4. Manually review new test fixtures for guest PII (names/emails/phones) — sed cannot catch those.
  5. cd api && npm install && npm test && npm run typecheck
  6. git commit + git push -u origin "$BRANCH", then open a PR against $PUB_DEFAULT.
  7. AFTER the PR merges, record the new sync point in this repo:
       echo "$TARGET_SHA" > "$LAST_SYNCED_FILE"   # then commit it
EOF

# Fail the run if the audit found leaks or apply errored, so CI / a human notices.
[ -z "$LEAKS" ] || exit 2
exit 0
