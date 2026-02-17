import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright E2E Test Configuration - josemoreupeso.es
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './playwright/tests',

  timeout: 30 * 1000,

  expect: {
    timeout: 5000,
  },

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,

  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['list'],
    ['json', { outputFile: 'test-results/results.json' }],
  ],

  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:8080',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // Local dev server via PHP built-in (only when not pointing to external BASE_URL)
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: 'php -S localhost:8080 -t public public/index.php',
        url: 'http://localhost:8080',
        reuseExistingServer: true,
        timeout: 30 * 1000,
      },
});
