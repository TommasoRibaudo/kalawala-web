# Open-source sync: keeping `smoobu-booking-engine` current

The public repo **[TommasoRibaudo/smoobu-booking-engine](https://github.com/TommasoRibaudo/smoobu-booking-engine)**
is a generalized, AGPL-3.0 fork of this repo's booking engine. It is **not a
mirror**: at extraction time every Kalawala-specific identifier (Smoobu apartment
IDs, property UUIDs, names, domains, contact/bank details) was replaced with
neutral demo data, and brand strings were abstracted behind a `SITE_NAME`
constant. Its own `AGENTS.md` says it plainly: *"There is no update channel;
treat it as a starting point you fork and maintain."*

So we can't `git push` changes across. This directory is the **review-gated**
bridge: it replays the same sanitizing transform on new `booking-api/` changes
and stages them for you to check before anything goes public.

## The mapping

| Public repo | Source here | Synced by this tooling? |
| --- | --- | --- |
| `api/` | `booking-api/` | **Yes** — automated (sanitize + patch + audit) |
| `web-widgets/` | subset of frontend `src/` | No — manual (see below) |
| `infra/` | `infra/` | No — manual (rarely changes) |

## Usage

```bash
scripts/opensource-sync/sync-public-booking-engine.sh
```

This will:
1. Read the last sync point from `.last-synced`.
2. List the `booking-api/` commits since then.
3. Clone the public repo, create a `sync/catch-up-<sha>` branch.
4. Path-rewrite `booking-api/ → api/`, run `sanitize.sed`, `git apply --reject`.
5. Run a **leak audit** (`leak-tokens.txt`) and print next steps.

It **never pushes**. You review the diff, resolve any `*.rej`, re-audit, run
`npm test`, commit, push, and open a PR. Only after that PR merges do you record
the new sync point:

```bash
echo <monorepo-sha-you-synced-to> > scripts/opensource-sync/.last-synced   # then commit
```

Pass an existing clone as `$1` to reuse it instead of cloning fresh.

## The files

- **`sanitize.sed`** — deterministic brand/data substitutions. The heart of the
  transform. Extend it whenever the audit flags a new recurring pattern.
- **`leak-tokens.txt`** — `grep -iEf` patterns for known-private strings. The
  script fails (exit 2) if any survive in the staged diff. **This is the real
  gate** — `sanitize.sed` is best-effort; the audit is what stops a leak.
- **`protected-paths.txt`** — public files that hold demo data/config and must
  never be overwritten (`branding.ts`, `propertyCatalog.ts`, seed SQL, `.env*`,
  `package.json`, READMEs). Their hunks are excluded; reconcile by hand.
- **`.last-synced`** — the monorepo SHA the public repo is current as of.

## What the audit can't catch — check by hand

`sanitize.sed` only does literal swaps. Always eyeball new **test fixtures** for:
- Guest **PII** (real names / emails / phone numbers) — e.g. a fixture once
  carried a real `firstName/lastName/email`. Replace with `Ana Mora /
  ana@example.com` or `Test Guest`.
- **Reworded comments** that name a real property without the `Casa ` prefix or
  quotes the sed keys on.
- New **identifiers** (a newly added apartment ID / UUID / slug) — add them to
  both `sanitize.sed` and `leak-tokens.txt`.

## What this does NOT sync (do manually)

- **`web-widgets/`** — the portable widgets were copied from the frontend at
  extraction, but the frontend has since diverged in *app-specific* ways: the
  i18n refactor made `BookingSearchWidget` import `Locale` / `bookingPath` /
  `bookingLanguage` from `src/i18n` and `PROPERTY_CAPACITY` from `constants.ts`,
  none of which exist in `web-widgets/` by design (it uses its own
  `useLanguageDetection` + `examples/Booking.i18n.ts`). A mechanical patch would
  break the build. Port widget UX/logic changes by hand, adapting to the
  web-widgets scaffolding, and run `cd web-widgets && npm test`.
- **`infra/`** — Terraform rarely changes and is easy to diff by hand:
  `git diff <.last-synced>..origin/main -- infra/`. Watch for real
  domains/account IDs/ARNs; the public module is parameterized via variables.

## Automation option (not enabled)

You chose the review-gate model, so this is a script you run — not a bot that
pushes. If you later want a nudge, add a GitHub Action on this repo that runs the
script in `--dry-run` spirit (list commits + audit) on pushes to `main` touching
`booking-api/**` and opens/updates a reminder issue. It must still stop at the
gate: never auto-push to the public repo.
