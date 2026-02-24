import { Page, expect } from '@playwright/test';
import * as selectors from './selectors';

export async function navigateToCv(page: Page): Promise<void> {
  await page.goto(selectors.route);
  await page.waitForLoadState('domcontentloaded');
  await page.locator(selectors.heading).waitFor({ state: 'visible' });
}

export async function titleIsCorrect(page: Page): Promise<void> {
  await expect(page).toHaveTitle(/CV.*José Moreu/i);
}

export async function pdfLinkIsVisible(page: Page): Promise<void> {
  await expect(page.locator(selectors.pdfLink)).toBeVisible();
}

export async function skillsCarouselHasTitle(page: Page): Promise<void> {
  const section = page.locator(selectors.skillsCarouselSection);
  await expect(section).toBeVisible();
  await expect(section).toContainText(selectors.skillsCarouselTitle);
}

export async function cvHeaderMatchesSnapshot(page: Page, snapshotName: string): Promise<void> {
  await expect(page.locator(selectors.cvHeader)).toHaveScreenshot(snapshotName, { animations: 'disabled' });
}

export async function cvPdfCardMatchesSnapshot(page: Page, snapshotName: string): Promise<void> {
  await expect(page.locator(selectors.pdfDownloadCard)).toHaveScreenshot(snapshotName, { animations: 'disabled' });
}

export async function cvTechInfoMatchesSnapshot(page: Page, snapshotName: string): Promise<void> {
  await expect(page.locator(selectors.cvTechInfo)).toHaveScreenshot(snapshotName, { animations: 'disabled' });
}
