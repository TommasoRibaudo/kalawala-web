import { test, expect } from './fixtures/base.fixture';
import { portal } from './helpers/selectors';

/**
 * Guest Portal E2E tests.
 *
 * Uses the `appPage` fixture so cookie consent is already dismissed and
 * API mocks (including portal login at `/api/portal/login`) are active
 * before every test.
 *
 * Validates: Requirements 11.1, 11.2, 11.3
 */
test.describe('Guest Portal', () => {
  test('displays a login form with reservation ID and password fields', async ({ appPage }) => {
    await appPage.goto('/en/portal');

    // Requirement 11.1 — Login form with reservation ID and password fields
    await expect(portal.reservationIdInput(appPage)).toBeVisible();
    await expect(portal.passwordInput(appPage)).toBeVisible();
    await expect(portal.submitButton(appPage)).toBeVisible();

    // Verify English labels are present
    await expect(appPage.getByLabel('Reservation ID')).toBeVisible();
    await expect(appPage.getByLabel('Portal password')).toBeVisible();
  });

  test('submitting portal login navigates to the reservation detail page', async ({ appPage }) => {
    // Mock the portal reservation detail endpoint so the detail page loads
    // after navigation without a network error.
    await appPage.route('**/api/portal/reservation/**', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          reservation: {
            reservationPublicId: 'RES-MOCK-12345',
            arrivalDate: '2025-03-15',
            departureDate: '2025-03-20',
            guests: 2,
            status: 'confirmed',
            property: {
              name: 'Casa Geco',
              slug: 'Geco',
              listingUrl: '/Geco',
              guestCapacity: 4,
            },
            price: {
              totalAmountCents: 45000,
              currency: 'USD',
            },
          },
          hold: null,
          payment: {
            method: 'paypal',
            status: 'captured',
          },
        }),
      });
    });

    await appPage.goto('/en/portal');

    // Requirement 11.2 — Submit portal login with mocked credentials
    await portal.reservationIdInput(appPage).fill('RES-MOCK-12345');
    await portal.passwordInput(appPage).fill('test-password');
    await portal.submitButton(appPage).click();

    // Verify navigation to the reservation detail page
    await appPage.waitForURL('**/en/portal/RES-MOCK-12345');
    expect(appPage.url()).toContain('/en/portal/RES-MOCK-12345');
  });

  test('Spanish portal page displays Spanish-language labels', async ({ appPage }) => {
    await appPage.goto('/es/portal');

    // Requirement 11.3 — Spanish-language labels are displayed
    await expect(portal.reservationIdInput(appPage)).toBeVisible();
    await expect(portal.passwordInput(appPage)).toBeVisible();
    await expect(portal.submitButton(appPage)).toBeVisible();

    // Verify Spanish labels from Portal.i18n.ts
    await expect(appPage.getByLabel('ID de reserva')).toBeVisible();
    await expect(appPage.getByLabel('Contraseña del portal')).toBeVisible();
    await expect(appPage.getByRole('heading', { name: 'Gestiona tu reserva' })).toBeVisible();
  });
});
