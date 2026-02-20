import { test, expect } from '@playwright/test';
import { navigateToPpia, ppiaLocators } from '@components/ppia';

test.describe('PPiA - Smoke', () => {
  test('should load PPiA page with correct title', async ({ page }) => {
    await navigateToPpia(page);

    await test.step('Then the page title contains PPiA', async () => {
      await expect(page).toHaveTitle(/PPiA|Playwright Page Inspector/i);
    });
  });
});

// ─── Visual Regression ────────────────────────────────────────────────────────

test.describe('PPiA - Visual', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/ppia');
    // eslint-disable-next-line playwright/no-networkidle
    await page.waitForLoadState('networkidle');
  });

  test('PPiA - Header', async ({ page }) => {
    const { ppiaHeader } = ppiaLocators(page);
    await expect(ppiaHeader).toHaveScreenshot('ppia-header-desktop.png', { animations: 'disabled' });
  });
});
