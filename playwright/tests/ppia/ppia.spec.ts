import { test, expect, type Page } from '@playwright/test';
import { ppiaLocators } from '@components/ppia';

const VIEWPORTS = {
  desktop: { width: 1920, height: 1080 },
  mobile: { width: 375, height: 667 },
} as const;

async function navigateAndWait(page: Page, url: string): Promise<void> {
  await page.goto(url);
  // eslint-disable-next-line playwright/no-networkidle
  await page.waitForLoadState('networkidle');
}

test.describe('PPiA - Smoke', () => {
  test('should load PPiA page with correct title', async ({ page }) => {
    await page.goto('/ppia');

    await test.step('Then the page title contains PPiA', async () => {
      await expect(page).toHaveTitle(/PPiA|Playwright Page Inspector/i);
    });
  });
});

/**
 * PPiA - Visual
 *
 * Note: solo se captura el header.
 * El wip-card tiene animaciones CSS que causan inestabilidad en snapshots.
 */
test.describe('PPiA - Visual', () => {
  test('Desktop - Header', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.desktop);
    await navigateAndWait(page, '/ppia');
    const { ppiaHeader } = ppiaLocators(page);
    await expect(ppiaHeader).toHaveScreenshot('ppia-header-desktop.png', { animations: 'disabled' });
  });

  test('Mobile - Header', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile);
    await navigateAndWait(page, '/ppia');
    const { ppiaHeader } = ppiaLocators(page);
    await expect(ppiaHeader).toHaveScreenshot('ppia-header-mobile.png', { animations: 'disabled' });
  });
});
