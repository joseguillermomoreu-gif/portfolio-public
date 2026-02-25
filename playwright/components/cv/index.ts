import { Page, expect } from '@playwright/test';
import * as selectors from './selectors';

export async function navigateToCv(page: Page): Promise<void> {
  await page.goto(selectors.route);
  await page.waitForLoadState('domcontentloaded');
  await page.locator(selectors.heading).waitFor({ state: 'visible' });
}

export async function navigateToCvHtml(page: Page): Promise<void> {
  await page.goto(selectors.routeHtml);
  await page.waitForLoadState('domcontentloaded');
  await page.locator(selectors.cvHtmlName).waitFor({ state: 'visible' });
}

export async function titleIsCorrect(page: Page): Promise<void> {
  await expect(page).toHaveTitle(/CV.*José Moreu/i);
}

export async function cvHtmlTitleIsCorrect(page: Page): Promise<void> {
  await expect(page).toHaveTitle(/CV.*José Moreu/i);
}

export async function cvHtmlHasContent(page: Page): Promise<void> {
  await expect(page.locator(selectors.cvHtmlName)).toBeVisible();
}

export async function pdfLinkIsVisible(page: Page): Promise<void> {
  await expect(page.locator(selectors.pdfLink)).toBeVisible();
}

export async function viewHtmlButtonIsVisible(page: Page): Promise<void> {
  await expect(page.locator(selectors.viewHtmlButton)).toBeVisible();
}

export async function downloadPdfLinkIsVisible(page: Page): Promise<void> {
  await expect(page.locator(selectors.pdfLink)).toBeVisible();
}

export async function downloadPdfLinkHasCorrectAttributes(page: Page): Promise<void> {
  const link = page.locator(selectors.pdfLink);
  await expect(link).toHaveAttribute('href', selectors.routePdf);
  await expect(link).toHaveAttribute('download');
}

export async function cvPdfResponseIsValid(page: Page): Promise<void> {
  const response = await page.context().request.get(selectors.routePdf);
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('application/pdf');
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

export async function cvHtmlMatchesSnapshot(page: Page, snapshotName: string): Promise<void> {
  await expect(page).toHaveScreenshot(snapshotName, { animations: 'disabled' });
}
