import { defineConfig, devices } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Carga variables del .env en process.env si no están ya definidas.
 * Playwright no auto-carga .env cuando corre dentro de un contenedor Docker.
 */
function loadDotEnv(): void {
  const envPath = path.resolve(__dirname, '.env');
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
  for (const line of lines) {
    const match = line.match(/^([A-Z_][A-Z0-9_]*)=(.+)$/);
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = match[2].trim();
    }
  }
}

loadDotEnv();

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
  retries: process.env.CI ? 1 : 1,
  workers: process.env.CI ? 1 : 4,

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
      testIgnore: [
        '**/*.desktop.spec.ts',
        '**/*.mobile.spec.ts',
        '**/*.tablet-small.spec.ts',
        '**/*.tablet-large.spec.ts',
      ],
    },
    {
      name: 'desktop',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
      testMatch: '**/*.desktop.spec.ts',
    },
    {
      name: 'mobile',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 375, height: 667 },
      },
      testMatch: '**/*.mobile.spec.ts',
    },
    {
      name: 'tablet-small',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 844, height: 390 },
        hasTouch: true,
      },
      testMatch: '**/*.tablet-small.spec.ts',
    },
    {
      name: 'tablet-large',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1024, height: 768 },
        hasTouch: true,
      },
      testMatch: '**/*.tablet-large.spec.ts',
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
