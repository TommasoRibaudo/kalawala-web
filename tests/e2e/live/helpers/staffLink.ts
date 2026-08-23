import * as fs from 'fs';
import * as path from 'path';

/**
 * Mints the signed staff "deposit confirm" link that normally arrives by email.
 *
 * Email is disabled in local/CI runs (EMAIL_DISABLED=true), so instead of
 * scraping a logged email we mint the exact same token the API would, using the
 * API's own signing code (booking-api/dist/signedTokens.js) as the single
 * source of truth. This mirrors the documented manual step in
 * docs/own_booking_engine/local-development.md.
 *
 * GET on the returned URL renders the staff review page; a POST (the button on
 * that page) confirms. The token is bound to one booking session + reservation
 * id and carries the deposit_confirm purpose, so it cannot be replayed against
 * any other route.
 */

const REPO_ROOT = path.resolve(__dirname, '../../../..');
const SIGNED_TOKENS = path.join(REPO_ROOT, 'booking-api', 'dist', 'signedTokens.js');
const ENV_LOCAL = path.join(REPO_ROOT, 'booking-api', '.env.local');

/** The API derives the staff-link signing key from the portal session secret. */
function portalSessionSecret(): string {
  if (process.env.BOOKING_API_PORTAL_SESSION_SECRET) {
    return process.env.BOOKING_API_PORTAL_SESSION_SECRET;
  }
  // Fall back to whatever the local stack is actually running with.
  if (fs.existsSync(ENV_LOCAL)) {
    for (const line of fs.readFileSync(ENV_LOCAL, 'utf8').split(/\r?\n/)) {
      const m = line.match(/^\s*BOOKING_API_PORTAL_SESSION_SECRET\s*=\s*(.+?)\s*$/);
      if (m) return m[1].replace(/^["']|["']$/g, '');
    }
  }
  // The .env.local.example default, so a fresh checkout still works.
  return 'local-dev-portal-session-secret-change-me';
}

export function mintDepositConfirmUrl(input: {
  bookingSessionId: string;
  reservationPublicId: string;
  apiBaseUrl?: string;
  ttlSeconds?: number;
}): string {
  if (!fs.existsSync(SIGNED_TOKENS)) {
    throw new Error(
      `Cannot mint staff link: ${SIGNED_TOKENS} not found. Build the booking-api first ` +
        '(the orchestrator does this; run `npm --prefix booking-api run build`).',
    );
  }
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { issueSignedToken } = require(SIGNED_TOKENS) as {
    issueSignedToken: (
      input: {
        bookingSessionId: string;
        reservationPublicId: string;
        purpose: 'deposit_access' | 'deposit_confirm' | 'deposit_reject';
        ttlSeconds: number;
      },
      portalSessionSecret: string,
    ) => string;
  };

  const token = issueSignedToken(
    {
      bookingSessionId: input.bookingSessionId,
      reservationPublicId: input.reservationPublicId,
      purpose: 'deposit_confirm',
      ttlSeconds: input.ttlSeconds ?? 3600,
    },
    portalSessionSecret(),
  );

  const base = input.apiBaseUrl ?? process.env.BOOKING_API_URL ?? 'http://localhost:4000';
  return `${base}/api/staff/deposit-review/${encodeURIComponent(token)}`;
}
