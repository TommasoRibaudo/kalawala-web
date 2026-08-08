import { test, expect } from './fixtures/base.fixture';
import { bookingFlow, bookingWidget } from './helpers/selectors';

/**
 * Booking Flow E2E tests.
 *
 * Uses the `appPage` fixture so cookie consent is already dismissed and
 * API mocks (availability, hold, PayPal order, PayPal capture) are active
 * before every test.
 *
 * The booking page at `/en/book` with `autoSearch=true` triggers an automatic
 * availability search on page load. The mocked availability response returns
 * two properties: Casa Geco and Casa Rana.
 *
 * Validates: Requirements 8.1, 8.2, 8.3, 8.4, 8.5, 8.6
 */

/** Booking page URL with query params that trigger an automatic search */
const BOOKING_URL =
  '/en/book?arrivalDate=2028-06-15&departureDate=2028-06-20&guests=2&autoSearch=true';

test.describe('Booking Flow', () => {
  test('displays property cards in the results step after search', async ({ appPage }) => {
    // Requirement 8.1 — API mocks intercept all Booking API calls
    // Requirement 8.2 — Available property cards are displayed in the results step
    await appPage.goto(BOOKING_URL);

    // Wait for the results step to become active (autoSearch fires on load)
    const resultsSlide = appPage.locator(
      '.booking-wizard-slide--active .booking-results',
    );
    await expect(resultsSlide).toBeVisible({ timeout: 15_000 });

    // Verify both mocked properties appear as cards
    const propertyCards = resultsSlide.locator('.booking-result-card');
    await expect(propertyCards).toHaveCount(2);
    await expect(resultsSlide.getByText('Casa Geco')).toBeVisible();
    await expect(resultsSlide.getByText('Casa Rana')).toBeVisible();
  });

  test('step indicator reflects the current step throughout the flow', async ({ appPage }) => {
    // Requirement 8.6 — Wizard step indicator reflects the current step
    await appPage.goto(BOOKING_URL);

    const stepIndicator = bookingFlow.stepIndicator(appPage);
    await expect(stepIndicator).toBeVisible({ timeout: 15_000 });

    // After auto-search completes, the active step should be "Choose home" (Results)
    // Wait for results to load first
    await expect(
      appPage.locator('.booking-wizard-slide--active .booking-results'),
    ).toBeVisible({ timeout: 15_000 });

    // The Results step should be the active one (aria-current="step")
    const resultsStep = stepIndicator.locator('li[aria-current="step"]');
    await expect(resultsStep).toBeVisible();
    await expect(resultsStep).toContainText('Choose home');

    // The Search step should be marked as done (has the check icon)
    const steps = stepIndicator.locator('li');
    await expect(steps.first()).toHaveClass(/booking-wizard-step--done/);
  });

  test('selecting a property shows the checkout form', async ({ appPage }) => {
    // Requirement 8.3 — Checkout form is displayed after selecting a property
    await appPage.goto(BOOKING_URL);

    // Wait for results
    const resultsSlide = appPage.locator(
      '.booking-wizard-slide--active .booking-results',
    );
    await expect(resultsSlide).toBeVisible({ timeout: 15_000 });

    // Click "Book with PayPal" on the first property card (Casa Geco)
    const bookButton = resultsSlide
      .locator('.booking-result-card')
      .first()
      .getByRole('button', { name: /Book with PayPal/i });
    await bookButton.click();

    // The checkout slide should now be active
    const checkoutSlide = appPage.locator('.booking-wizard-slide--active');
    await expect(checkoutSlide).toBeVisible();

    // Verify all checkout form fields are present
    await expect(checkoutSlide.getByLabel('First name')).toBeVisible();
    await expect(checkoutSlide.getByLabel('Last name')).toBeVisible();
    await expect(checkoutSlide.getByLabel('Email')).toBeVisible();
    await expect(checkoutSlide.getByLabel('Phone')).toBeVisible();
    await expect(checkoutSlide.getByLabel('Country')).toBeVisible();
    await expect(
      checkoutSlide.getByLabel(/I accept the booking terms/i),
    ).toBeVisible();

    // Step indicator should show "Details & payment" as active
    const stepIndicator = bookingFlow.stepIndicator(appPage);
    const activeStep = stepIndicator.locator('li[aria-current="step"]');
    await expect(activeStep).toContainText('Details & payment');
  });

  test('submitting checkout form with hold response makes PayPal button available', async ({
    appPage,
  }) => {
    // Requirement 8.4 — PayPal payment button becomes available after hold
    await appPage.goto(BOOKING_URL);

    // Wait for results and select a property
    await expect(
      appPage.locator('.booking-wizard-slide--active .booking-results'),
    ).toBeVisible({ timeout: 15_000 });

    const bookButton = appPage
      .locator('.booking-wizard-slide--active .booking-result-card')
      .first()
      .getByRole('button', { name: /Book with PayPal/i });
    await bookButton.click();

    // Fill in the checkout form
    const checkoutSlide = appPage.locator('.booking-wizard-slide--active');
    await checkoutSlide.getByLabel('First name').fill('John');
    await checkoutSlide.getByLabel('Last name').fill('Doe');
    await checkoutSlide.getByLabel('Email').fill('john.doe@example.com');
    await checkoutSlide.getByLabel('Phone').fill('+1234567890');
    await checkoutSlide.getByLabel('Country').fill('US');
    await checkoutSlide
      .getByLabel('Create a password to manage your booking')
      .fill('securepassword123');
    await checkoutSlide
      .getByLabel(/I accept the booking terms/i)
      .check();

    // Submit the checkout form (triggers hold creation)
    await checkoutSlide
      .getByRole('button', { name: /Continue to payment/i })
      .click();

    // After the mocked hold response, the "Continue to payment" PayPal button
    // should appear in the hold-active section
    const holdSection = checkoutSlide.locator(
      '.booking-checkout-panel__hold',
    );
    await expect(holdSection).toBeVisible({ timeout: 10_000 });

    // Verify the reservation ID from the mock is displayed
    await expect(holdSection.getByText('RES-MOCK-12345')).toBeVisible();

    // The PayPal payment button should be available
    const paypalButton = holdSection.getByRole('button', {
      name: /Continue to payment/i,
    });
    await expect(paypalButton).toBeVisible();
    await expect(paypalButton).toBeEnabled();
  });

  test('confirmation step displays reservation ID after capture', async ({
    appPage,
  }) => {
    // Requirement 8.5 — Confirmation message with reservation ID is displayed
    // Requirement 8.6 — Step indicator shows Confirmed step

    // Simulate arriving at the confirmation page with stored confirmation data.
    // The PayPal capture flow normally redirects to /en/book/confirmed after
    // capturing the order. We inject the confirmation state into sessionStorage
    // (which is what the app uses) and navigate directly to the confirmed route.
    await appPage.addInitScript(() => {
      sessionStorage.setItem(
        'kalawala_booking_confirmation',
        JSON.stringify({
          booking: {
            bookingSessionId: 'mock-session-001',
            reservationPublicId: 'RES-MOCK-12345',
            status: 'booking_confirmed',
            language: 'en',
            arrivalDate: '2026-03-15',
            departureDate: '2026-03-20',
            guests: 2,
            confirmedAt: '2026-03-10T12:00:00Z',
            property: {
              propertyId: 'prop-geco',
              slug: 'geco',
              listingUrl: '/Geco',
              name: 'Casa Geco',
            },
            price: {
              currency: 'USD',
              totalAmountCents: 45000,
            },
          },
          payment: {
            method: 'paypal',
            status: 'captured',
            paypalOrderId: 'PAYPAL-ORDER-MOCK-001',
            paypalCaptureId: 'PAYPAL-CAPTURE-MOCK-001',
            capturedAt: '2026-03-10T12:00:00Z',
          },
        }),
      );
    });

    await appPage.goto('/en/book/confirmed');

    // The confirmation panel should be visible
    const confirmationPanel = appPage.locator('.booking-confirmation-panel');
    await expect(confirmationPanel).toBeVisible({ timeout: 10_000 });

    // Verify the confirmation title
    await expect(
      confirmationPanel.getByRole('heading', { name: /Booking confirmed/i }),
    ).toBeVisible();

    // Verify the reservation ID is displayed
    await expect(
      confirmationPanel.getByText('RES-MOCK-12345'),
    ).toBeVisible();

    // Step indicator should show "Confirmed" as the active step
    const stepIndicator = bookingFlow.stepIndicator(appPage);
    const activeStep = stepIndicator.locator('li[aria-current="step"]');
    await expect(activeStep).toContainText('Confirmed');
  });
});
