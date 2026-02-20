import { test, expect } from '@playwright/test';
import { ppiaLocators } from '@components/ppia';

test.beforeEach(async ({ page }) => {
  await page.goto('/ppia');
  // eslint-disable-next-line playwright/no-networkidle
  await page.waitForLoadState('networkidle');
});

test('PPiA - Header', async ({ page }) => {
  const { ppiaHeader } = ppiaLocators(page);
  await expect(ppiaHeader).toHaveScreenshot('ppia-header-mobile.png', { animations: 'disabled' });
});
