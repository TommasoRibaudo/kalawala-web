import { test, expect, Page } from '@playwright/test';
import { approvePaypal, paypalApprovalMode } from './helpers/livePaypal';

/**
 * Full-flow booking acceptance test — runs against the REAL booking-api
 * (local stack: Postgres + mock Smoobu), not the in-browser API mocks the rest
 * of tests/e2e use. It drives the whole guest journey end to end:
 *
 *   search -> hold -> PayPal approve -> capture -> confirmation
 *          -> portal login -> cancel -> dates released
 *
 * PayPal is the only provider that can be made real here: with
 * PAYPAL_APPROVAL_MODE=sandbox the payment is created, approved and captured
 * against api-m.sandbox.paypal.com. Smoobu has no sandbox, so it stays mocked —
 * which also means this test never blocks real inventory and is safe to run on
 * every PR.
 *
 * Because Smoobu is mocked, the dates only need to be unique per run (the
 * holds table has an exclusion constraint that rejects an overlapping hold on
 * the same property), not "far in the future to avoid real guests". A unique
 * far-future window gives us both for free.
 *
 * Prerequisites (the orchestrator script scripts/booking-live-e2e.sh sets these
 * up): docker Postgres up + migrated, booking-api + mock providers running on
 * :4000/:4010, and the CRA frontend on :3000 proxying /api to :4000.
 */

const GUEST = {
  firstName: 'Smoke',
  lastName: 'Test',
  email: 'jane.doe@example.com', // email is disabled in these runs; never sent
  phone: '+50600000000',
  country: 'CR',
  password: 'live-e2e-portal-password-123',
};

/** A unique far-future 4-night window, derived from the clock so re-runs never
 *  collide on the holds exclusion constraint. */
function uniqueStayWindow(): { arrival: string; departure: string } {
  // Spread arrivals across ~5 years of far-future days: 2091-01-01 + N days.
  const dayOffset = Math.floor(Date.now() / 1000) % 1800;
  const base = new Date(Date.UTC(2091, 0, 1));
  base.setUTCDate(base.getUTCDate() + dayOffset);
  const arrival = base.toISOString().slice(0, 10);
  base.setUTCDate(base.getUTCDate() + 4);
  const departure = base.toISOString().slice(0, 10);
  return { arrival, departure };
}

async function acceptCookieConsent(page: Page): Promise<void> {
  // Matches CookieConsentService.ConsentState — set before load so the banner
  // never intercepts a click.
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

test.describe('Booking full flow (real API, mock Smoobu, PayPal ' + paypalApprovalMode() + ')', () => {
  // The PayPal redirect + capture is genuinely slow in sandbox mode.
  test.setTimeout(180_000);

  test('books, pays, manages, and cancels a reservation end to end', async ({ page }) => {
    const mode = paypalApprovalMode();
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

    // ── 2. Checkout form ──────────────────────────────────────────────────────
    await firstCard.getByRole('button', { name: /Book with PayPal/i }).click();

    const checkout = page.locator('.booking-wizard-slide--active');
    await checkout.getByLabel('First name').fill(GUEST.firstName);
    await checkout.getByLabel('Last name').fill(GUEST.lastName);
    await checkout.getByLabel('Email').fill(GUEST.email);
    await checkout.getByLabel('Phone').fill(GUEST.phone);
    await checkout.getByLabel('Country').fill(GUEST.country);
    await checkout
      .getByLabel('Create a password to manage your booking')
      .fill(GUEST.password);
    await checkout.getByLabel(/I accept the booking terms/i).check();

    // ── 3. Hold ───────────────────────────────────────────────────────────────
    // Capture the real reservation id from the /api/holds response — we need it
    // to log into the portal later.
    const holdResponsePromise = page.waitForResponse(
      (r) => r.url().includes('/api/holds') && r.request().method() === 'POST',
    );
    await checkout.getByRole('button', { name: /Continue to payment/i }).click();

    const holdResponse = await holdResponsePromise;
    expect(holdResponse.ok(), `hold creation failed: ${holdResponse.status()}`).toBeTruthy();
    const holdBody = await holdResponse.json();
    const reservationPublicId: string = holdBody.booking?.reservationPublicId;
    expect(reservationPublicId, 'no reservationPublicId in hold response').toBeTruthy();

    const holdSection = checkout.locator('.booking-checkout-panel__hold');
    await expect(holdSection).toBeVisible({ timeout: 15_000 });
    await expect(holdSection.getByText(reservationPublicId)).toBeVisible();

    // ── 4. PayPal order + approve + capture ──────────────────────────────────
    await holdSection.getByRole('button', { name: /Continue to payment/i }).click();
    await approvePaypal(page, mode); // lands on /book/confirmed

    // ── 5. Confirmation ───────────────────────────────────────────────────────
    const confirmation = page.locator('.booking-confirmation-panel');
    await expect(confirmation).toBeVisible({ timeout: 30_000 });
    await expect(
      confirmation.getByRole('heading', { name: /Booking confirmed/i }),
    ).toBeVisible();
    await expect(confirmation.getByText(reservationPublicId)).toBeVisible();

    // ── 6. Portal login ───────────────────────────────────────────────────────
    await page.goto('/en/portal');
    await page.locator('#portalReservationId').fill(reservationPublicId);
    await page.locator('#portalPassword').fill(GUEST.password);
    await page.getByRole('button', { name: /sign in|iniciar sesión|submit/i }).click();

    // Detail page loads with a confirmed, cancellable booking.
    await expect(page).toHaveURL(new RegExp(`/portal/${reservationPublicId}`), {
      timeout: 20_000,
    });
    await expect(page.locator('.portal-detail-status--booking_confirmed, .portal-detail-status--confirmed'))
      .toBeVisible();
    const cancelButton = page.locator('.portal-detail-actions__cancel');
    await expect(cancelButton).toBeVisible();

    // ── 7. Cancel ─────────────────────────────────────────────────────────────
    await cancelButton.click();
    const cancelPanel = page.locator('.portal-request-panel--danger');
    await expect(cancelPanel).toBeVisible();
    await cancelPanel.locator('#portalCancellationReason').fill('Automated live e2e test');

    const cancelResponsePromise = page.waitForResponse(
      (r) => r.url().includes('/cancel') && r.request().method() === 'POST',
    );
    await cancelPanel.locator('.portal-request-panel__submit--danger').click();
    const cancelResponse = await cancelResponsePromise;
    expect(cancelResponse.ok(), `cancellation failed: ${cancelResponse.status()}`).toBeTruthy();

    // Success alert appears and the booking status flips to Cancelled.
    await expect(cancelPanel.locator('.alert-success')).toBeVisible({ timeout: 15_000 });
    await expect(page.locator('.portal-detail-status--cancelled')).toBeVisible();

    // ── 8. Dates released ─────────────────────────────────────────────────────
    // Re-search the same window; the property must be bookable again, proving
    // the cancellation deleted the (mock) Smoobu reservation and freed the dates.
    await page.goto(
      `/en/book?arrivalDate=${arrival}&departureDate=${departure}&guests=2&autoSearch=true`,
    );
    const reSearchResults = page.locator('.booking-wizard-slide--active .booking-results');
    await expect(reSearchResults).toBeVisible({ timeout: 30_000 });
    await expect(reSearchResults.locator('.booking-result-card').first()).toBeVisible();
  });
});
