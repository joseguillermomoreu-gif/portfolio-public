import { Page } from '@playwright/test';

export async function scrollToTriggerEffect(page: Page, scrollY = 200): Promise<void> {
  await page.evaluate((y) => window.scrollTo(0, y), scrollY);
  // eslint-disable-next-line playwright/no-wait-for-timeout
  await page.waitForTimeout(300);
}
