import { Page } from '@playwright/test';

/**
 * The PayPal approval step is the one part of the booking flow that leaves our
 * own frontend and drives a third party's pages, so it is abstracted here.
 *
 *   'mock'    — booking-api points PAYPAL_BASE_URL at the local mock
 *               (mockProviders.js). Its approval page auto-redirects back to
 *               /book/return with a 1s meta-refresh; there is nothing to click.
 *   'sandbox' — booking-api points PAYPAL_BASE_URL at api-m.sandbox.paypal.com,
 *               so the browser is redirected to the real PayPal sandbox. We log
 *               in as the sandbox *buyer* and approve; PayPal then redirects
 *               back to /book/return, which captures and lands on
 *               /book/confirmed.
 *
 * Everything else in the flow is identical between the two modes, which is the
 * point: the mock run proves the whole harness, and only this function differs
 * when we swap in the real sandbox.
 */
export type PaypalApprovalMode = 'mock' | 'sandbox';

export function paypalApprovalMode(): PaypalApprovalMode {
  return process.env.PAYPAL_APPROVAL_MODE === 'sandbox' ? 'sandbox' : 'mock';
}

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `${name} must be set for PAYPAL_APPROVAL_MODE=sandbox. ` +
        'Populate booking-api/.env.sandbox (or export it) before running the sandbox flow.',
    );
  }
  return value;
}

/**
 * Waits out / drives the PayPal approval, returning once the app has captured
 * the payment and reached /book/confirmed.
 */
export async function approvePaypal(page: Page, mode: PaypalApprovalMode): Promise<void> {
  if (mode === 'mock') {
    await page.waitForURL(/\/book\/confirmed/, { timeout: 30_000 });
    return;
  }
  await approveOnPaypalSandbox(page);
}

/**
 * PayPal changes this markup without notice — if the sandbox flow starts
 * failing here, re-record the selectors against a live sandbox checkout. The
 * fallbacks below cover the common variants seen as of this writing:
 *   - single-page login vs. email-then-Next two-step login
 *   - the localized review CTA ("Completar compra" / "Complete Purchase" / …),
 *     matched by role+name since it has no stable id
 */
async function approveOnPaypalSandbox(page: Page): Promise<void> {
  const email = requiredEnv('PAYPAL_SANDBOX_BUYER_EMAIL');
  const password = requiredEnv('PAYPAL_SANDBOX_BUYER_PASSWORD');

  // The frontend does window.location.assign() to the approval URL, so the
  // approval happens in the same tab. Wait until we are actually on PayPal.
  await page.waitForURL(/paypal\.com/, { timeout: 60_000 });

  // Login. The email field is the reliable anchor across PayPal's splash
  // variants; wait for it rather than assuming which screen we landed on.
  const emailField = page.locator('#email, input[name="login_email"]').first();
  await emailField.waitFor({ state: 'visible', timeout: 60_000 });
  await emailField.fill(email);

  // Two-step login shows a "Next" button before the password field. A
  // single-page login shows both at once, so this click is best-effort.
  const nextButton = page.locator('#btnNext');
  if (await nextButton.isVisible().catch(() => false)) {
    await nextButton.click();
  }

  const passwordField = page.locator('#password, input[name="login_password"]').first();
  await passwordField.waitFor({ state: 'visible', timeout: 30_000 });
  await passwordField.fill(password);

  const loginButton = page.locator('#btnLogin');
  await loginButton.click();

  // Review page — approve the payment. The primary CTA has no stable id across
  // PayPal's variants (the once-reliable `#payment-submit-btn` was absent here),
  // and it is localized to the buyer account's language, so match it by role +
  // name across the locales we might hit. Verified against a Spanish sandbox
  // buyer, whose button reads "Completar compra".
  const payButton = page
    .getByRole('button', {
      name: /Completar compra|Complete Purchase|Pay Now|Pagar ahora|Continuar y revisar|Continue to Review Order/i,
    })
    .or(page.locator('#payment-submit-btn'))
    .first();
  await payButton.waitFor({ state: 'visible', timeout: 60_000 });
  await payButton.click();

  // Back on our site: /book/return captures, then routes to /book/confirmed.
  await page.waitForURL(/\/book\/confirmed/, { timeout: 90_000 });
}
