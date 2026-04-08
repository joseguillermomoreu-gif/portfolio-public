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

export async function desiredSkillsSectionIsVisible(page: Page): Promise<void> {
  await expect(page.locator(selectors.desiredSkillsSection)).toBeVisible();
}

export async function hasDesiredSkillCount(page: Page, count: number): Promise<void> {
  await expect(page.locator(selectors.desiredSkillCard)).toHaveCount(count);
}

export async function desiredSkillsHaveProgressBars(page: Page): Promise<void> {
  const cards = page.locator(selectors.desiredSkillCard);
  const count = await cards.count();
  for (let i = 0; i < count; i++) {
    await expect(cards.nth(i).locator(selectors.progressBar)).toBeVisible();
  }
}

export async function timelineSectionIsVisible(page: Page): Promise<void> {
  await expect(page.locator(selectors.timelineSection)).toBeVisible();
}

export async function timelineHasTitle(page: Page): Promise<void> {
  const section = page.locator(selectors.timelineSection);
  await expect(section).toContainText(selectors.timelineSectionTitle);
}

export async function hasTimelineItemCount(page: Page, count: number): Promise<void> {
  await expect(page.locator(selectors.timelineItem)).toHaveCount(count);
}

export async function timelineCompaniesHaveNames(page: Page): Promise<void> {
  const cards = page.locator(selectors.timelineCard);
  const count = await cards.count();
  for (let i = 0; i < count; i++) {
    await expect(cards.nth(i).locator(selectors.timelineCompanyName)).toBeVisible();
  }
}

export async function hasTimelineRoleCount(page: Page, count: number): Promise<void> {
  await expect(page.locator(selectors.timelineRole)).toHaveCount(count);
}

export async function timelineRolesHaveContent(page: Page): Promise<void> {
  const roles = page.locator(selectors.timelineRole);
  const count = await roles.count();
  for (let i = 0; i < count; i++) {
    const role = roles.nth(i);
    await expect(role.locator(selectors.timelinePosition)).toBeVisible();
    await expect(role.locator(selectors.timelineTechTag).first()).toBeVisible();
  }
}

export async function timelineSectionMatchesSnapshot(page: Page, snapshotName: string): Promise<void> {
  await expect(page.locator(selectors.timelineSection)).toHaveScreenshot(snapshotName, { animations: 'disabled' });
}
