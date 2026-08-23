import { test, expect, Page } from '@playwright/test';
import { mintDepositConfirmUrl } from './helpers/staffLink';

/**
 * Full-flow MANUAL DEPOSIT acceptance test — the bank-transfer / SINPE path,
 * which involves no PayPal at all:
 *
 *   search -> Bank transfer/SINPE -> deposit hold -> receipt upload (S3/MinIO)
 *          -> portal refused (not yet confirmed) -> staff confirms via signed
 *             link -> portal works -> cancel -> dates released
 *
 * Runs entirely against the local stack (real booking-api + mock Smoobu + MinIO
 * standing in for the receipts S3 bucket). No money moves in this flow at all —
 * the "payment" is a bank transfer the guest just asserts with a receipt image,
 * and staff confirm it out of band. So this needs no PayPal credentials and is
 * identical in mock and sandbox runs.
 *
 * The staff confirmation link normally arrives by email; email is disabled
 * locally, so we mint the exact same signed token via the API's own signing
 * code (see helpers/staffLink.ts).
 */

const GUEST = {
  firstName: 'Deposit',
  lastName: 'Tester',
  email: 'deposit.tester@example.com',
  phone: '+50600000000',
  country: 'CR',
  password: 'live-e2e-deposit-password-123',
};

// 1x1 PNG — a valid receipt image for the MIME allowlist.
const RECEIPT_PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
  'base64',
);

function uniqueStayWindow(): { arrival: string; departure: string } {
  // Offset differently from the PayPal spec so the two suites never collide on
  // the holds exclusion constraint when run back to back.
  const dayOffset = (Math.floor(Date.now() / 1000) % 1800) + 1800;
  const base = new Date(Date.UTC(2091, 0, 1));
  base.setUTCDate(base.getUTCDate() + dayOffset);
  const arrival = base.toISOString().slice(0, 10);
  base.setUTCDate(base.getUTCDate() + 4);
  const departure = base.toISOString().slice(0, 10);
  return { arrival, departure };
}

async function acceptCookieConsent(page: Page): Promise<void> {
  await page.addInitScript(() => {
    localStorage.setItem(
      'cookie_consent',
      JSON.stringify({
        status: 'accepted',
        preferences: { analytics: false, marketing: false, functional: true },
        timestamp: Date.now(),
        version: '1.0',
      }),
    );
  });
}

test.describe('Manual deposit full flow (real API, mock Smoobu + MinIO)', () => {
  test.setTimeout(120_000);

  test('reserves by deposit, uploads a receipt, staff confirms, then cancels', async ({ page }) => {
    const { arrival, departure } = uniqueStayWindow();
    await acceptCookieConsent(page);

    // ── 1. Search ────────────────────────────────────────────────────────────
    await page.goto(
      `/en/book?arrivalDate=${arrival}&departureDate=${departure}&guests=2&autoSearch=true`,
    );
    const results = page.locator('.booking-wizard-slide--active .booking-results');
    await expect(results).toBeVisible({ timeout: 30_000 });
    const firstCard = results.locator('.booking-result-card').first();
    await expect(firstCard).toBeVisible();

    // ── 2. Deposit checkout form ──────────────────────────────────────────────
    await firstCard.getByRole('button', { name: 'Bank transfer / SINPE' }).click();

    const panel = page.locator('.booking-wizard-slide--active');
    await panel.locator('#depositHoldFirstName').fill(GUEST.firstName);
    await panel.locator('#depositHoldLastName').fill(GUEST.lastName);
    await panel.locator('#depositHoldEmail').fill(GUEST.email);
    await panel.locator('#depositHoldPhone').fill(GUEST.phone);
    await panel.locator('#depositHoldCountry').fill(GUEST.country);
    await panel.locator('#depositHoldPortalPassword').fill(GUEST.password);
    await panel.locator('#depositHoldTermsAccepted').check();

    // ── 3. Deposit hold ───────────────────────────────────────────────────────
    const holdResponsePromise = page.waitForResponse(
      (r) => r.url().includes('/api/deposit-holds') && r.request().method() === 'POST',
    );
    await panel.locator('.booking-checkout-panel__form button[type="submit"]').click();

    const holdResponse = await holdResponsePromise;
    expect(holdResponse.ok(), `deposit hold failed: ${holdResponse.status()}`).toBeTruthy();
    const holdBody = await holdResponse.json();
    const reservationPublicId: string = holdBody.booking?.reservationPublicId;
    const bookingSessionId: string = holdBody.booking?.bookingSessionId;
    expect(reservationPublicId, 'no reservationPublicId in deposit hold response').toBeTruthy();
    expect(bookingSessionId, 'no bookingSessionId in deposit hold response').toBeTruthy();

    // ── 4. Receipt upload (browser -> presigned URL -> MinIO) ─────────────────
    const uploadSection = page.locator('.booking-deposit-checkout__upload');
    await expect(uploadSection).toBeVisible({ timeout: 15_000 });
    await uploadSection.locator('input[type="file"]').setInputFiles({
      name: 'receipt.png',
      mimeType: 'image/png',
      buffer: RECEIPT_PNG,
    });
    // The success alert only renders after the PUT to S3/MinIO resolves — this
    // is the check that catches a missing/wrong CORS rule on the bucket.
    await expect(uploadSection.locator('.alert-success')).toBeVisible({ timeout: 30_000 });

    // ── 5. Portal is refused before staff confirm ─────────────────────────────
    await page.goto('/en/portal');
    await page.locator('#portalReservationId').fill(reservationPublicId);
    await page.locator('#portalPassword').fill(GUEST.password);
    await page.getByRole('button', { name: /sign in|iniciar sesión|submit/i }).click();
    // 403 booking_not_confirmed -> a login error, still on the login page.
    await expect(page.locator('.portal-login-alert')).toBeVisible({ timeout: 15_000 });
    await expect(page).not.toHaveURL(new RegExp(`/portal/${reservationPublicId}`));

    // ── 6. Staff confirmation via the signed link ─────────────────────────────
    const staffUrl = mintDepositConfirmUrl({ bookingSessionId, reservationPublicId });
    await page.goto(staffUrl);
    // The GET review page must render the reservation and must NOT have mutated
    // anything (GET renders, POST mutates — the split that stops mail scanners).
    await expect(page.getByText(reservationPublicId)).toBeVisible();

    const confirmResponsePromise = page.waitForResponse(
      (r) => r.url().includes('/api/staff/deposit-review') && r.request().method() === 'POST',
    );
    await page.locator('button[type="submit"]').first().click();
    const confirmResponse = await confirmResponsePromise;
    expect(confirmResponse.ok(), `staff confirm failed: ${confirmResponse.status()}`).toBeTruthy();
    await expect(page.getByRole('heading', { name: /confirmed/i })).toBeVisible({ timeout: 15_000 });

    // ── 7. Portal now works ───────────────────────────────────────────────────
    await page.goto('/en/portal');
    await page.locator('#portalReservationId').fill(reservationPublicId);
    await page.locator('#portalPassword').fill(GUEST.password);
    await page.getByRole('button', { name: /sign in|iniciar sesión|submit/i }).click();
    await expect(page).toHaveURL(new RegExp(`/portal/${reservationPublicId}`), { timeout: 20_000 });
    await expect(
      page.locator('.portal-detail-status--booking_confirmed, .portal-detail-status--confirmed'),
    ).toBeVisible();

    // ── 8. Cancel + dates released ────────────────────────────────────────────
    const cancelButton = page.locator('.portal-detail-actions__cancel');
    await expect(cancelButton).toBeVisible();
    await cancelButton.click();
    const cancelPanel = page.locator('.portal-request-panel--danger');
    await cancelPanel.locator('#portalCancellationReason').fill('Automated live deposit e2e test');
    const cancelResponsePromise = page.waitForResponse(
      (r) => r.url().includes('/cancel') && r.request().method() === 'POST',
    );
    await cancelPanel.locator('.portal-request-panel__submit--danger').click();
    const cancelResponse = await cancelResponsePromise;
    expect(cancelResponse.ok(), `cancellation failed: ${cancelResponse.status()}`).toBeTruthy();
    await expect(page.locator('.portal-detail-status--cancelled')).toBeVisible({ timeout: 15_000 });

    // The deposit flow persists a "resume after SINPE round-trip" state (#308);
    // clear it so /book runs a fresh search instead of resuming the old panel.
    await page.evaluate(() => localStorage.removeItem('kalawala_deposit_checkout'));
    await page.goto(
      `/en/book?arrivalDate=${arrival}&departureDate=${departure}&guests=2&autoSearch=true`,
    );
    const reSearch = page.locator('.booking-wizard-slide--active .booking-results');
    await expect(reSearch).toBeVisible({ timeout: 30_000 });
    await expect(reSearch.locator('.booking-result-card').first()).toBeVisible();
  });
});
