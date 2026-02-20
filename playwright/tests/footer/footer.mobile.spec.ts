import { test, expect } from '@playwright/test';
import { footerLocators, scrollToFooter, footerDynamicMasks } from '@components/footer';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  // eslint-disable-next-line playwright/no-networkidle
  await page.waitForLoadState('networkidle');
  await scrollToFooter(page);
});

test('Footer - Mobile', async ({ page }) => {
  const { container } = footerLocators(page);
  await expect(container).toHaveScreenshot('footer-mobile.png', { animations: 'disabled', mask: footerDynamicMasks(page) });
});
