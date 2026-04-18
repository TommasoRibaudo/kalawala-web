# =============================================================================
# cleanup-for-public.ps1
#
# Purges sensitive files from ALL git history using git-filter-repo, then
# verifies the cleanup.
#
# WHAT THIS DOES:
#   1. Removes sensitive files from every commit in every branch/tag
#   2. Removes the old remote (git-filter-repo safety measure)
#
# PREREQUISITES:
#   - python -m git_filter_repo must work
#   - Run from the repo root
#   - Commit or stash any uncommitted changes first
#
# AFTER RUNNING:
#   - Verify the repo looks correct (git log, check files)
#   - Re-add the remote:  git remote add origin <url>
#   - Force-push ALL branches:  git push origin --all --force
#   - Force-push ALL tags:      git push origin --tags --force
#   - All collaborators must re-clone (their local copies have the old history)
# =============================================================================

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  Kalawala repo cleanup for public safety" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# --- Preflight checks -------------------------------------------------------

if (-not (Test-Path ".git")) {
    Write-Host "ERROR: Run this script from the repo root." -ForegroundColor Red
    exit 1
}

# Check for uncommitted changes
$diffStatus = git diff --quiet 2>&1; $diffClean = $LASTEXITCODE -eq 0
$cachedStatus = git diff --cached --quiet 2>&1; $cachedClean = $LASTEXITCODE -eq 0

if (-not $diffClean -or -not $cachedClean) {
    Write-Host "ERROR: You have uncommitted changes. Commit or stash them first." -ForegroundColor Red
    exit 1
}

$branch = git branch --show-current
$commitCount = git rev-list --all --count
Write-Host "Current branch: $branch"
Write-Host "Total commits:  $commitCount"
Write-Host ""

# --- Define files to purge from history --------------------------------------

$filesToPurge = @(
    "docs/own_booking_engine/threat_model.md"
    "docs/own_booking_engine/runbooks.md"
    "docs/own_booking_engine/prompts.md"
    "docs/own_booking_engine/Introduction – Smoobu Api.pdf"
    "infra/environments/dev.tfvars"
    "infra/environments/staging.tfvars"
    "infra/environments/prod.tfvars"
    "AGENTS.md"
    "CLAUDE.md"
)

Write-Host "Files to purge from ALL history:" -ForegroundColor Yellow
foreach ($f in $filesToPurge) {
    Write-Host "  - $f"
}
Write-Host ""

$confirm = Read-Host "Continue? This rewrites git history and cannot be undone. [y/N]"
if ($confirm -ne "y" -and $confirm -ne "Y") {
    Write-Host "Aborted."
    exit 0
}

# --- Run git-filter-repo ----------------------------------------------------

Write-Host ""
Write-Host "Running git-filter-repo to purge files from history..." -ForegroundColor Cyan
Write-Host ""

# Build the --path arguments
$filterArgs = @()
foreach ($f in $filesToPurge) {
    $filterArgs += "--path"
    $filterArgs += $f
}
$filterArgs += "--invert-paths"
$filterArgs += "--force"

python -m git_filter_repo @filterArgs

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: git-filter-repo failed with exit code $LASTEXITCODE" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "git-filter-repo completed successfully." -ForegroundColor Green
Write-Host ""

# --- Verify purge worked -----------------------------------------------------

Write-Host "Verifying files are gone from history..." -ForegroundColor Cyan
$leaked = $false
foreach ($f in $filesToPurge) {
    $found = git log --all --diff-filter=A --name-only --format="" -- $f 2>$null
    if ($found) {
        Write-Host "  WARNING: '$f' still found in history!" -ForegroundColor Red
        $leaked = $true
    } else {
        Write-Host "  OK: '$f' purged" -ForegroundColor Green
    }
}

if ($leaked) {
    Write-Host ""
    Write-Host "WARNING: Some files were not fully purged. Review manually." -ForegroundColor Red
} else {
    Write-Host ""
    Write-Host "All sensitive files purged from history." -ForegroundColor Green
}

# --- Summary -----------------------------------------------------------------

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  DONE - Next steps:" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Verify the repo looks correct:" -ForegroundColor White
Write-Host "     git log --oneline -20"
Write-Host "     git status"
Write-Host ""
Write-Host "2. Re-add the remote (git-filter-repo removes it as a safety measure):" -ForegroundColor White
Write-Host "     git remote add origin https://github.com/TommasoRibaudo/kalawala-web.git"
Write-Host ""
Write-Host "3. Force-push ALL branches and tags:" -ForegroundColor White
Write-Host "     git push origin --all --force"
Write-Host "     git push origin --tags --force"
Write-Host ""
Write-Host "4. Tell all collaborators to re-clone. Their local copies have the old history." -ForegroundColor White
Write-Host ""
