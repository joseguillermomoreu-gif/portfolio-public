import { test, expect } from '@playwright/test';
import { contactLocators } from '@components/contact';

test.beforeEach(async ({ page }) => {
  await page.goto('/contacto');
  // eslint-disable-next-line playwright/no-networkidle
  await page.waitForLoadState('networkidle');
});

test('Contact - Header', async ({ page }) => {
  const { contactHeader } = contactLocators(page);
  await expect(contactHeader).toHaveScreenshot('contact-header-mobile.png', { animations: 'disabled' });
});

test('Contact - Contact Card', async ({ page }) => {
  const { contactCard } = contactLocators(page);
  await expect(contactCard).toHaveScreenshot('contact-card-mobile.png', { animations: 'disabled' });
});

test('Contact - Social Section', async ({ page }) => {
  const { socialSection } = contactLocators(page);
  await expect(socialSection).toHaveScreenshot('contact-social-mobile.png', { animations: 'disabled' });
});
