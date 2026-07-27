import { Page, Route } from '@playwright/test';
import availabilityResponse from '../mocks/availability-response.json';
import holdResponse from '../mocks/hold-response.json';
import paypalOrderResponse from '../mocks/paypal-order-response.json';
import paypalCaptureResponse from '../mocks/paypal-capture-response.json';
import depositHandoffResponse from '../mocks/deposit-handoff-response.json';
import portalLoginResponse from '../mocks/portal-login-response.json';

/**
 * Per-test overrides for API mock responses.
 *
 * Each key accepts either:
 * - An object that replaces the default JSON response body, or
 * - A function that receives the Playwright Route for full control
 *   (e.g. returning a 500 status to test error handling).
 *
 * Validates: Requirements 14.1, 14.3, 14.4
 */
export interface MockOverrides {
  availability?: object | ((route: Route) => Promise<void>);
  hold?: object | ((route: Route) => Promise<void>);
  paypalOrder?: object | ((route: Route) => Promise<void>);
  paypalCapture?: object | ((route: Route) => Promise<void>);
  depositHandoff?: object | ((route: Route) => Promise<void>);
  portalLogin?: object | ((route: Route) => Promise<void>);
}

/**
 * Register Playwright route interceptions for all Booking API endpoints
 * and stub external third-party services.
 *
 * Call this **before** any page navigation so that the very first
 * network requests are already intercepted.
 *
 * @param page      - The Playwright Page instance
 * @param overrides - Optional per-test response overrides
 */
export async function setupApiMocks(
  page: Page,
  overrides: MockOverrides = {},
): Promise<void> {
  // -----------------------------------------------------------------------
  // Booking API mocks
  // -----------------------------------------------------------------------

  await page.route('**/api/search**', async (route) => {
    if (typeof overrides.availability === 'function') {
      return overrides.availability(route);
    }
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(overrides.availability ?? availabilityResponse),
    });
  });

  await page.route('**/api/holds**', async (route) => {
    if (typeof overrides.hold === 'function') {
      return overrides.hold(route);
    }
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(overrides.hold ?? holdResponse),
    });
  });

  await page.route('**/api/bookings/*/paypal/create-order**', async (route) => {
    if (typeof overrides.paypalOrder === 'function') {
      return overrides.paypalOrder(route);
    }
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(overrides.paypalOrder ?? paypalOrderResponse),
    });
  });

  await page.route('**/api/bookings/*/paypal/capture**', async (route) => {
    if (typeof overrides.paypalCapture === 'function') {
      return overrides.paypalCapture(route);
    }
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(overrides.paypalCapture ?? paypalCaptureResponse),
    });
  });

  await page.route('**/api/deposit-handoff**', async (route) => {
    if (typeof overrides.depositHandoff === 'function') {
      return overrides.depositHandoff(route);
    }
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(overrides.depositHandoff ?? depositHandoffResponse),
    });
  });

  await page.route('**/api/portal/login**', async (route) => {
    if (typeof overrides.portalLogin === 'function') {
      return overrides.portalLogin(route);
    }
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(overrides.portalLogin ?? portalLoginResponse),
    });
  });

  // -----------------------------------------------------------------------
  // Stub external third-party services (abort to prevent network calls)
  // -----------------------------------------------------------------------

  // Google Maps
  await page.route('**/maps.googleapis.com/**', (route) => route.abort());

  // Google reCAPTCHA
  await page.route('**/www.google.com/recaptcha/**', (route) => route.abort());
  await page.route('**/www.gstatic.com/recaptcha/**', (route) => route.abort());

  // PostHog analytics
  await page.route('**/us.i.posthog.com/**', (route) => route.abort());

  // Facebook Pixel
  await page.route('**/connect.facebook.net/**', (route) => route.abort());

  // Google Tag Manager
  await page.route('**/www.googletagmanager.com/**', (route) => route.abort());
}
