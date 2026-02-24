import { Page, expect } from '@playwright/test';
import * as selectors from './selectors';

export async function navigateToProjects(page: Page): Promise<void> {
  await page.goto(selectors.route);
  await page.waitForLoadState('domcontentloaded');
  await page.locator(selectors.heading).waitFor({ state: 'visible' });
}

export async function hasProjectCount(page: Page, count: number): Promise<void> {
  await expect(page.locator(selectors.projectCards)).toHaveCount(count);
}

export async function projectGithubLinkIs(page: Page, projectName: string, href: string): Promise<void> {
  const card = page.locator(selectors.projectCards).filter({
    has: page.locator(selectors.projectName, { hasText: projectName }),
  }).first();
  await expect(card.locator(selectors.projectGithubLink)).toHaveAttribute('href', href);
}

export async function projectWebsiteLinkIs(page: Page, projectName: string, href: string): Promise<void> {
  const card = page.locator(selectors.projectCards).filter({
    has: page.locator(selectors.projectName, { hasText: projectName }),
  }).first();
  await expect(card.locator(selectors.projectWebsiteLink)).toHaveAttribute('href', href);
}

export async function ppiaProjectIsPrivate(page: Page): Promise<void> {
  const card = page.locator(selectors.projectCards).filter({
    has: page.locator(selectors.projectName).getByText(selectors.ppiaProjectName, { exact: true }),
  }).first();
  await expect(card.locator(selectors.projectStatus)).toContainText(selectors.ppiaStatusPrivate);
  await expect(card.locator(selectors.projectHighlights)).toContainText(selectors.ppiaHighlightText);
  await expect(card.locator(selectors.projectGithubLink)).toBeHidden();
}

export async function projectsHeaderMatchesSnapshot(page: Page, snapshotName: string): Promise<void> {
  await expect(page.locator(selectors.projectsHeader)).toHaveScreenshot(snapshotName, { animations: 'disabled' });
}

export async function projectsGridMatchesSnapshot(page: Page, snapshotName: string): Promise<void> {
  await expect(page.locator(selectors.projectsGrid)).toHaveScreenshot(snapshotName, { animations: 'disabled' });
}

export async function projectsFooterMatchesSnapshot(page: Page, snapshotName: string): Promise<void> {
  await expect(page.locator(selectors.projectsFooter)).toHaveScreenshot(snapshotName, { animations: 'disabled' });
}
