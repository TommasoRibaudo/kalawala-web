# Requirements Document

## Introduction

This document defines the requirements for adding happy-path end-to-end (E2E) testing to the kalawala-web React marketing site using Playwright. The scope covers Playwright installation and configuration, a structured test folder layout, happy-path test coverage for all major user flows, API mocking for external services, CI integration via GitHub Actions, and basic visual regression checks. The goal is to catch regressions in critical user journeys — homepage browsing, property listing viewing, language switching, booking search, booking flow, blog reading, guest portal access, cookie consent, and responsive behavior — without hitting production APIs.

## Glossary

- **Playwright**: An open-source browser automation framework by Microsoft used for E2E testing across Chromium, Firefox, and WebKit.
- **E2E_Test_Suite**: The complete set of Playwright test files, fixtures, helpers, and configuration that comprise the E2E testing infrastructure for kalawala-web.
- **Dev_Server**: The local CRA development server started via `npm start` on `localhost:3000`.
- **Test_Runner**: The Playwright test runner invoked via `npx playwright test` or npm scripts.
- **Route_Mock**: A Playwright `page.route()` interception that returns a stubbed response instead of calling a real external API.
- **Fixture**: A reusable Playwright test fixture that provides shared setup (e.g., dismissing cookie consent, setting viewport) across tests.
- **Visual_Snapshot**: A screenshot captured by Playwright and compared against a baseline image to detect visual regressions.
- **CI_Workflow**: A GitHub Actions workflow that runs the E2E_Test_Suite on push or pull request events.
- **Booking_API**: The backend Lambda/API Gateway service that proxies Smoobu availability, holds, and payment operations.
- **Cookie_Consent_Banner**: The dialog component that asks users to accept, reject, or customize cookie preferences before analytics tracking begins.
- **Navigation_Bar**: The FixedNavigation component providing links to Home, Availability, Photos, Contact, and Blog sections.
- **Booking_Search_Widget**: The sidebar/hero form component with check-in, check-out, and guest fields that navigates to the booking page.
- **Language_Switcher**: The FlagComponent/LanguageSwitcher that toggles between English and Spanish URL variants.
- **Guest_Portal**: The portal pages (`/portal`, `/portalES`) where guests log in with a reservation ID and password to view booking details.
- **Listing_Page**: A property detail page (e.g., `/Geco`, `/Rana`) showing images, amenities, reviews, map, and a Booking_Search_Widget.
- **Accessible_Selector**: A Playwright locator strategy that targets elements by role, label, text, or placeholder rather than CSS class or test-id.

## Requirements

### Requirement 1: Playwright Installation and Configuration

**User Story:** As a developer, I want Playwright installed and configured with sensible defaults, so that I can run E2E tests locally and in CI with minimal setup.

#### Acceptance Criteria

1. THE E2E_Test_Suite SHALL include `@playwright/test` as a devDependency in the root `package.json`.
2. THE E2E_Test_Suite SHALL include a `playwright.config.ts` file at the project root that configures Chromium as the default browser project.
3. WHERE Firefox and WebKit browser projects are enabled, THE E2E_Test_Suite SHALL include them as additional projects in `playwright.config.ts`.
4. THE `playwright.config.ts` SHALL set `baseURL` to `http://localhost:3000`.
5. THE `playwright.config.ts` SHALL configure a `webServer` block that starts the Dev_Server via `npm start`, waits for `http://localhost:3000`, and reuses an existing server if already running.
6. THE `playwright.config.ts` SHALL configure HTML report output, trace collection on first retry, screenshot capture on failure, and video recording on first retry.
7. THE `package.json` SHALL include the following npm scripts: `test:e2e` (headless run), `test:e2e:ui` (Playwright UI mode), `test:e2e:headed` (headed browser run), and `test:e2e:report` (open HTML report).
8. THE `.gitignore` SHALL exclude Playwright result artifacts (`test-results/`, `playwright-report/`, `blob-report/`) and installed browser binaries.

### Requirement 2: Test Folder Structure

**User Story:** As a developer, I want a well-organized test folder structure, so that tests are easy to find, maintain, and extend.

#### Acceptance Criteria

1. THE E2E_Test_Suite SHALL place all test files under a `tests/e2e/` directory at the project root.
2. THE E2E_Test_Suite SHALL organize test files by feature area using descriptive filenames (e.g., `homepage.spec.ts`, `navigation.spec.ts`, `booking-flow.spec.ts`, `listing-page.spec.ts`, `language-switching.spec.ts`, `cookie-consent.spec.ts`, `responsive.spec.ts`, `guest-portal.spec.ts`, `blog.spec.ts`).
3. THE E2E_Test_Suite SHALL include a `tests/e2e/fixtures/` directory for shared Playwright fixtures.
4. THE E2E_Test_Suite SHALL include a `tests/e2e/helpers/` directory for reusable utility functions such as API mock setup and common navigation actions.

### Requirement 3: Homepage and App Loading

**User Story:** As a user, I want the homepage to load without errors, so that I can begin browsing vacation rental properties.

#### Acceptance Criteria

1. WHEN the English homepage (`/`) is loaded, THE E2E_Test_Suite SHALL verify that the page renders without console errors and the Navigation_Bar is visible.
2. WHEN the Spanish homepage (`/HomeES`) is loaded, THE E2E_Test_Suite SHALL verify that the page renders and the Navigation_Bar is visible.
3. WHEN the homepage is loaded, THE E2E_Test_Suite SHALL verify that the WelcomeSlider or hero section is visible.
4. WHEN the homepage is loaded, THE E2E_Test_Suite SHALL verify that the OurHomes property listing section is visible and contains property cards.

### Requirement 4: Main Navigation

**User Story:** As a user, I want the navigation bar to work correctly, so that I can move between sections and pages.

#### Acceptance Criteria

1. WHEN a user clicks the "Home" link in the Navigation_Bar, THE E2E_Test_Suite SHALL verify that the page scrolls to or navigates to the homepage body section.
2. WHEN a user clicks the "Availability" link in the Navigation_Bar, THE E2E_Test_Suite SHALL verify navigation to the call-to-action section.
3. WHEN a user clicks the "Photos" link in the Navigation_Bar, THE E2E_Test_Suite SHALL verify navigation to the portfolio section.
4. WHEN a user clicks the "Contact" link in the Navigation_Bar, THE E2E_Test_Suite SHALL verify navigation to the contact section.
5. WHEN a user clicks the "Blog" link in the Navigation_Bar, THE E2E_Test_Suite SHALL verify navigation to a blog page.
6. WHEN the Navigation_Bar is viewed on a mobile viewport (width ≤ 992px), THE E2E_Test_Suite SHALL verify that the hamburger menu toggle is visible and opens the navigation menu when clicked.

### Requirement 5: Language Switching

**User Story:** As a bilingual user, I want to switch between English and Spanish, so that I can browse the site in my preferred language.

#### Acceptance Criteria

1. WHEN a user activates the Language_Switcher on the English homepage (`/`), THE E2E_Test_Suite SHALL verify that the browser navigates to the Spanish homepage (`/HomeES`).
2. WHEN a user activates the Language_Switcher on a Spanish page, THE E2E_Test_Suite SHALL verify that the browser navigates to the corresponding English page.
3. WHEN a user activates the Language_Switcher on an English Listing_Page (e.g., `/Geco`), THE E2E_Test_Suite SHALL verify navigation to the Spanish variant (e.g., `/GecoES`).

### Requirement 6: Property Listing Pages

**User Story:** As a user, I want to view property listing pages with all key content, so that I can evaluate vacation rental options.

#### Acceptance Criteria

1. WHEN a Listing_Page is loaded (e.g., `/Geco`), THE E2E_Test_Suite SHALL verify that the property name, image carousel, amenities section, and Booking_Search_Widget are visible.
2. WHEN a user interacts with the image carousel on a Listing_Page, THE E2E_Test_Suite SHALL verify that the carousel advances to the next image.
3. WHEN a Listing_Page is loaded, THE E2E_Test_Suite SHALL verify that the guest reviews section is present.
4. WHEN a Spanish Listing_Page is loaded (e.g., `/GecoES`), THE E2E_Test_Suite SHALL verify that Spanish-language content is displayed.

### Requirement 7: Booking Search Widget Interaction

**User Story:** As a user, I want to use the booking search widget to find available properties, so that I can start the booking process.

#### Acceptance Criteria

1. WHEN a user fills in check-in date, check-out date, and guest count in the Booking_Search_Widget and submits, THE E2E_Test_Suite SHALL verify that the browser navigates to the booking page (`/book` or `/bookES`) with the correct query parameters.
2. WHEN a user submits the Booking_Search_Widget without a check-in date, THE E2E_Test_Suite SHALL verify that a validation error message is displayed.
3. WHEN a user clicks the guest increment button in the Booking_Search_Widget, THE E2E_Test_Suite SHALL verify that the guest count increases by one.
4. WHEN a user clicks the guest decrement button while the guest count is 1, THE E2E_Test_Suite SHALL verify that the guest count remains at 1 (minimum enforced).

### Requirement 8: Booking Flow (with API Mocking)

**User Story:** As a user, I want to complete the booking search and view results, so that I can select a property and proceed to checkout.

#### Acceptance Criteria

1. THE E2E_Test_Suite SHALL use Route_Mock to intercept all Booking_API calls (`/api/availability`, `/api/hold`, `/api/paypal/*`, `/api/deposit-handoff`) and return stable mock responses.
2. WHEN a user performs a booking search with mocked availability results, THE E2E_Test_Suite SHALL verify that available property cards are displayed in the results step.
3. WHEN a user selects a property from the mocked results and proceeds to checkout, THE E2E_Test_Suite SHALL verify that the checkout form (first name, last name, email, phone, country, terms checkbox) is displayed.
4. WHEN a user fills in the checkout form and submits with a mocked hold response, THE E2E_Test_Suite SHALL verify that the PayPal payment button becomes available.
5. WHEN the booking flow reaches the confirmation step with a mocked capture response, THE E2E_Test_Suite SHALL verify that a confirmation message with a reservation ID is displayed.
6. THE E2E_Test_Suite SHALL verify that the booking wizard step indicator reflects the current step (Search → Results → Checkout → Confirmation) throughout the flow.

### Requirement 9: Cookie Consent Banner

**User Story:** As a user, I want to interact with the cookie consent banner, so that I can control my privacy preferences.

#### Acceptance Criteria

1. WHEN the site is loaded for the first time (no prior consent stored), THE E2E_Test_Suite SHALL verify that the Cookie_Consent_Banner is visible.
2. WHEN a user clicks "Accept" on the Cookie_Consent_Banner, THE E2E_Test_Suite SHALL verify that the banner disappears.
3. WHEN a user clicks "Reject" on the Cookie_Consent_Banner, THE E2E_Test_Suite SHALL verify that the banner disappears.
4. WHEN a user clicks "Options" on the Cookie_Consent_Banner, THE E2E_Test_Suite SHALL verify that the detailed preference toggles (Essential, Analytics, Marketing) are displayed.
5. WHEN a user has previously accepted cookies, THE E2E_Test_Suite SHALL verify that the Cookie_Consent_Banner does not appear on subsequent page loads.

### Requirement 10: Blog Pages

**User Story:** As a user, I want to read blog posts, so that I can learn about Puerto Viejo and plan my trip.

#### Acceptance Criteria

1. WHEN a blog page is loaded (e.g., `/twodaysinpuertoviejo`), THE E2E_Test_Suite SHALL verify that the blog content and Navigation_Bar are visible.
2. WHEN a Spanish blog page is loaded (e.g., `/twodaysinpuertoviejoES`), THE E2E_Test_Suite SHALL verify that Spanish-language blog content is displayed.
3. WHEN a blog page is loaded, THE E2E_Test_Suite SHALL verify that the page title is set correctly via the document title or Helmet.

### Requirement 11: Guest Portal

**User Story:** As a guest, I want to access the guest portal, so that I can view my reservation details.

#### Acceptance Criteria

1. WHEN the guest portal page (`/portal`) is loaded, THE E2E_Test_Suite SHALL verify that a login form with reservation ID and password fields is displayed.
2. WHEN a user submits the portal login form with mocked credentials, THE E2E_Test_Suite SHALL use Route_Mock to intercept the portal login API call and verify navigation to the reservation detail page.
3. WHEN the Spanish guest portal page (`/portalES`) is loaded, THE E2E_Test_Suite SHALL verify that Spanish-language labels are displayed.

### Requirement 12: Responsive Behavior

**User Story:** As a user on a mobile device, I want the site to display correctly, so that I can browse and book on any screen size.

#### Acceptance Criteria

1. THE E2E_Test_Suite SHALL run key tests at both desktop (1280×720) and mobile (375×667) viewport sizes.
2. WHEN the homepage is viewed at mobile viewport, THE E2E_Test_Suite SHALL verify that the hamburger menu is visible and the desktop navigation links are collapsed.
3. WHEN a Listing_Page is viewed at mobile viewport, THE E2E_Test_Suite SHALL verify that the page layout adapts without horizontal overflow.
4. WHEN the booking page is viewed at mobile viewport, THE E2E_Test_Suite SHALL verify that the search form and results are usable (fields visible, buttons tappable).

### Requirement 13: Accessible Selectors

**User Story:** As a developer, I want tests to use accessible selectors, so that tests are resilient to CSS changes and encourage accessible markup.

#### Acceptance Criteria

1. THE E2E_Test_Suite SHALL prefer `getByRole`, `getByLabel`, `getByText`, and `getByPlaceholder` locator strategies over CSS selectors or test-id attributes.
2. IF an element lacks accessible attributes, THEN THE E2E_Test_Suite SHALL use `data-testid` as a fallback and document the element as needing accessibility improvement.

### Requirement 14: API Mocking Strategy

**User Story:** As a developer, I want all external API calls mocked in E2E tests, so that tests are fast, deterministic, and do not hit production services.

#### Acceptance Criteria

1. THE E2E_Test_Suite SHALL include a shared helper module in `tests/e2e/helpers/` that sets up Route_Mock interceptions for Booking_API endpoints, Smoobu proxy endpoints, and Google reCAPTCHA verification.
2. THE E2E_Test_Suite SHALL include mock response fixtures (JSON files or inline objects) for availability search results, hold creation, PayPal order creation, PayPal capture, deposit handoff, and portal login.
3. THE E2E_Test_Suite SHALL intercept and stub Google Maps API requests to prevent external network calls during tests.
4. IF a test requires a specific API error scenario, THEN THE E2E_Test_Suite SHALL allow per-test Route_Mock overrides to return error responses.

### Requirement 15: Visual Regression Checks

**User Story:** As a developer, I want basic screenshot comparisons for key layouts, so that I can catch unintended visual changes.

#### Acceptance Criteria

1. THE E2E_Test_Suite SHALL capture Visual_Snapshot baselines for the homepage, one Listing_Page, and the booking search page at desktop viewport.
2. THE E2E_Test_Suite SHALL capture Visual_Snapshot baselines for the homepage at mobile viewport.
3. WHEN a Visual_Snapshot comparison fails, THE Test_Runner SHALL include the diff image in the HTML report for review.
4. THE E2E_Test_Suite SHALL store Visual_Snapshot baselines in a version-controlled directory (e.g., `tests/e2e/__screenshots__/`).

### Requirement 16: CI Integration via GitHub Actions

**User Story:** As a developer, I want E2E tests to run automatically in CI, so that regressions are caught before deployment.

#### Acceptance Criteria

1. THE CI_Workflow SHALL include a new GitHub Actions job that installs dependencies, installs Playwright browsers, builds the React app, and runs the E2E_Test_Suite.
2. THE CI_Workflow SHALL run the E2E test job on pull requests targeting the `main` branch and on pushes to `main`.
3. THE CI_Workflow SHALL upload the Playwright HTML report and any failure artifacts (screenshots, traces, videos) as GitHub Actions artifacts.
4. THE CI_Workflow SHALL run the E2E test job after the existing `typecheck` job passes, so that type errors are caught before E2E execution.
5. IF the E2E test job fails, THEN THE CI_Workflow SHALL prevent the deploy job from executing.

### Requirement 17: Shared Test Fixtures

**User Story:** As a developer, I want reusable test fixtures, so that common setup tasks (dismissing cookie consent, setting viewport) are not duplicated across test files.

#### Acceptance Criteria

1. THE E2E_Test_Suite SHALL provide a custom Playwright fixture that dismisses the Cookie_Consent_Banner before each test that requires a clean page state.
2. THE E2E_Test_Suite SHALL provide a custom Playwright fixture that configures mobile viewport settings for responsive tests.
3. THE E2E_Test_Suite SHALL provide a custom Playwright fixture that sets up standard Route_Mock interceptions for all external API calls.
