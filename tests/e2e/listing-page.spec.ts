import { test, expect } from './fixtures/base.fixture';
import { nav } from './helpers/selectors';

/**
 * Listing Page E2E tests.
 *
 * Uses the `appPage` fixture so cookie consent is already dismissed and
 * API mocks are active before every test.
 *
 * The listing page (`/Geco`) renders:
 *   - Property name as an `<h1>` heading
 *   - An image grid (`.imagesContainer`) that opens a full-screen gallery on click
 *   - An amenities section (`.amenaties` → `.amenitiesCont`)
 *   - A BookingSearchWidget (`.booking-search-widget`)
 *   - A GuestReviews section (`.guest-reviews`)
 *
 * Validates: Requirements 6.1, 6.2, 6.3, 6.4
 */
test.describe('Listing Page', () => {
  test.beforeEach(async ({ appPage }) => {
    // Mock the calendar API endpoint used by CalendarWithPriceDots
    // to prevent network errors during listing page tests.
    await appPage.route('**/api/calendar/**', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          month: '2025-07',
          days: [],
          stats: { availableNightCount: 0, averagePriceCents: 0 },
        }),
      });
    });
  });

  test('listing page loads with property name, images, amenities, and booking widget', async ({ appPage }) => {
    // Requirement 6.1 — Verify property name, image grid, amenities, and
    // BookingSearchWidget are visible on the English listing page.
    await appPage.goto('/Geco');

    // Property name heading
    await expect(appPage.getByRole('heading', { name: 'House Geco', level: 1 })).toBeVisible();

    // Image grid container
    const imagesContainer = appPage.locator('.imagesContainer');
    await expect(imagesContainer).toBeVisible();

    // At least one image is rendered inside the grid
    await expect(imagesContainer.locator('img').first()).toBeVisible();

    // Amenities section
    const amenitiesSection = appPage.locator('.amenaties');
    await expect(amenitiesSection).toBeVisible();
    // Verify at least one amenity icon is rendered
    const amenityItems = amenitiesSection.locator('.amenitiesCont .col');
    await expect(amenityItems.first()).toBeVisible();
    expect(await amenityItems.count()).toBeGreaterThan(0);

    // Booking search widget
    const bookingWidget = appPage.locator('.booking-search-widget');
    await expect(bookingWidget).toBeVisible();
  });

  test('image gallery opens when the image grid is clicked', async ({ appPage }) => {
    // Requirement 6.2 — Verify that interacting with the image area advances
    // to show more images. The listing page uses a clickable image grid that
    // opens a full-screen gallery modal (ImagesModal) rather than a carousel.
    await appPage.goto('/Geco');

    const imagesContainer = appPage.locator('.imagesContainer');
    await expect(imagesContainer).toBeVisible();

    // Click the image grid to open the gallery modal
    await imagesContainer.click();

    // The ImagesModal renders as a `.imagesModal` overlay
    const galleryModal = appPage.locator('.imagesModal');
    await expect(galleryModal).toBeVisible();

    // Verify the gallery contains images
    await expect(galleryModal.locator('img').first()).toBeVisible();
  });

  test('guest reviews section is present on the listing page', async ({ appPage }) => {
    // Requirement 6.3 — Verify the guest reviews section is present.
    await appPage.goto('/Geco');

    const reviewsSection = appPage.locator('.guest-reviews');
    await expect(reviewsSection).toBeVisible();

    // Verify the reviews heading is visible
    await expect(
      reviewsSection.getByRole('heading', { name: 'What our guests are saying' }),
    ).toBeVisible();

    // Verify at least one review card is rendered
    const reviewCards = reviewsSection.locator('.guest-reviews__card');
    await expect(reviewCards.first()).toBeVisible();
    expect(await reviewCards.count()).toBeGreaterThan(0);
  });

  test('Spanish listing page displays Spanish-language content', async ({ appPage }) => {
    // Requirement 6.4 — Verify that `/GecoES` displays Spanish content.
    await appPage.goto('/GecoES');

    // Spanish property name
    await expect(appPage.getByRole('heading', { name: 'Casa Geco', level: 1 })).toBeVisible();

    // Spanish description text
    await expect(
      appPage.getByText('Ubicada en el corazón del pueblo'),
    ).toBeVisible();

    // Spanish guest reviews heading
    await expect(
      appPage.locator('.guest-reviews').getByRole('heading', { name: 'Lo que dicen nuestros huéspedes' }),
    ).toBeVisible();

    // Spanish booking widget title
    await expect(appPage.getByText('Ver Disponibilidad')).toBeVisible();
  });
});
