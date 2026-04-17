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

export async function expandCard(page: Page, projectName: string): Promise<void> {
  const card = page.locator(selectors.projectCards).filter({
    has: page.locator(selectors.projectName, { hasText: projectName }),
  }).first();
  await card.locator(selectors.projectToggle).click();
}

export async function cardIsExpanded(page: Page, projectName: string): Promise<void> {
  const card = page.locator(selectors.projectCards).filter({
    has: page.locator(selectors.projectName, { hasText: projectName }),
  }).first();
  await expect(card).toHaveAttribute('data-expanded', 'true');
  await expect(card.locator(selectors.projectToggle)).toHaveAttribute('aria-expanded', 'true');
}

export async function cardIsCollapsed(page: Page, projectName: string): Promise<void> {
  const card = page.locator(selectors.projectCards).filter({
    has: page.locator(selectors.projectName, { hasText: projectName }),
  }).first();
  await expect(card).toHaveAttribute('data-expanded', 'false');
  await expect(card.locator(selectors.projectToggle)).toHaveAttribute('aria-expanded', 'false');
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

export async function projectCardMatchesSnapshot(page: Page, index: number, snapshotName: string): Promise<void> {
  await expect(page.locator(selectors.projectCards).nth(index)).toHaveScreenshot(snapshotName, { animations: 'disabled' });
}

export async function expandedCardMatchesSnapshot(page: Page, projectName: string, snapshotName: string): Promise<void> {
  const card = page.locator(selectors.projectCards).filter({
    has: page.locator(selectors.projectName, { hasText: projectName }),
  }).first();
  await expect(card).toHaveScreenshot(snapshotName, { animations: 'disabled' });
}

export async function projectsFooterMatchesSnapshot(page: Page, snapshotName: string): Promise<void> {
  await expect(page.locator(selectors.projectsFooter)).toHaveScreenshot(snapshotName, { animations: 'disabled' });
}

export async function donationSectionIsVisible(page: Page): Promise<void> {
  await expect(page.locator(selectors.donationSection)).toBeVisible();
}

export async function donationPaypalLinkIs(page: Page, href: string): Promise<void> {
  // Open modal first to expose the PayPal fallback link
  await page.locator(selectors.donationLink).click();
  await expect(page.locator(selectors.donationModal)).toBeVisible();
  await expect(page.locator(selectors.donationPaypalLink)).toHaveAttribute('href', href);
  await page.locator(selectors.donationModalClose).click();
}

export async function donationModalOpens(page: Page): Promise<void> {
  await page.locator(selectors.donationLink).click();
  await expect(page.locator(selectors.donationModal)).toBeVisible();
  await expect(page.locator(selectors.donationQrImage)).toBeVisible();
}

export async function donationModalClosesWithButton(page: Page): Promise<void> {
  await page.locator(selectors.donationModalClose).click();
  await expect(page.locator(selectors.donationModal)).toBeHidden();
}

export async function donationModalClosesWithBackdrop(page: Page): Promise<void> {
  await page.locator(selectors.donationLink).click();
  await expect(page.locator(selectors.donationModal)).toBeVisible();
  // Click on the top-left corner of the backdrop, outside the modal content
  await page.locator('.donation-modal-backdrop').click({ position: { x: 10, y: 10 } });
  await expect(page.locator(selectors.donationModal)).toBeHidden();
}

export async function donationSectionMatchesSnapshot(page: Page, snapshotName: string): Promise<void> {
  await expect(page.locator(selectors.donationSection)).toHaveScreenshot(snapshotName, { animations: 'disabled' });
}
