import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright config for the full-flow live booking acceptance test
 * (tests/e2e/live/*.live.ts).
 *
 * Kept separate from playwright.config.ts because this suite needs the REAL
 * booking-api running (not the in-browser API mocks the default e2e suite uses)
 * and must run serially against a shared Postgres + mock-Smoobu stack. The
 * orchestrator scripts/booking-live-e2e.sh brings that stack up before invoking
 * this config; the webServer block below reuses an already-running CRA dev
 * server, or starts one if you run this config directly.
 */
const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './tests/e2e/live',
  testMatch: '**/*.live.ts',
  // Serial: one shared DB + one mock provider process.
  fullyParallel: false,
  workers: 1,
  forbidOnly: isCI,
  retries: 0,
  reporter: [
    ['html', { open: 'never', outputFolder: 'playwright-report-live' }],
    ['list'],
  ],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: process.env.E2E_WEB_COMMAND ?? (isCI ? 'npx serve -s build -l 3000' : 'npm start'),
    url: 'http://localhost:3000',
    reuseExistingServer: true,
    timeout: 180_000,
    env: {
      ...process.env,
      // Talk to the API cross-origin (:3000 -> :4000), exactly as production
      // does (site -> API Gateway), rather than via CRA's /api proxy. This
      // matters because the booking-api derives the PayPal return/cancel URLs
      // from the request's Origin header (paypalOrders.ts) — behind the proxy
      // that Origin resolves to :4000 and the post-payment redirect lands on
      // the API instead of the site. CORS already allows :3000
      // (BOOKING_API_ALLOWED_ORIGINS in .env.local).
      REACT_APP_BOOKING_API_BASE_URL: 'http://localhost:4000',
      // Don't pop open a browser tab when CRA boots.
      BROWSER: 'none',
    },
  },
});
