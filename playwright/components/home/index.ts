import { Page, expect } from '@playwright/test';
import * as selectors from './selectors';

export async function navigateHome(page: Page): Promise<void> {
  await page.goto(selectors.route);
  await page.waitForLoadState('domcontentloaded');
}

export async function getStatCardsCount(page: Page): Promise<number> {
  return await page.locator(selectors.statCards).count();
}

// ─── Assertions ───────────────────────────────────────────────────────────────

export async function titleIsCorrect(page: Page): Promise<void> {
  await expect(page).toHaveTitle(/José Moreu Peso/);
}

export async function cvCtaIsVisible(page: Page): Promise<void> {
  await expect(page.locator(selectors.heroCvButton)).toBeVisible();
}

export async function contactCtaIsVisible(page: Page): Promise<void> {
  await expect(page.locator(selectors.heroContactButton)).toBeVisible();
}

export async function hasFourStatCards(page: Page): Promise<void> {
  const count = await getStatCardsCount(page);
  expect(count).toBe(4);
}

export async function portfolioPublicRepoLinkIsValid(page: Page): Promise<void> {
  const publicRepoLink = page.locator(selectors.portfolioContext).first().locator(selectors.publicRepoLink);
  await expect(publicRepoLink).toBeVisible();
  await expect(publicRepoLink).toHaveAttribute('href', selectors.publicRepoUrl);
  await expect(publicRepoLink).toHaveAttribute('target', '_blank');
}

export async function akkodisLinkIsValid(page: Page): Promise<void> {
  await expect(page.locator(selectors.akkodisLink)).toBeVisible();
  await expect(page.locator(selectors.akkodisLink)).toHaveAttribute('href', selectors.akkodisUrl);
  await expect(page.locator(selectors.akkodisLink)).toHaveAttribute('target', '_blank');
}

export async function elConfidencialLinkIsValid(page: Page): Promise<void> {
  await expect(page.locator(selectors.elConfidencialLink)).toBeVisible();
  await expect(page.locator(selectors.elConfidencialLink)).toHaveAttribute('href', selectors.elConfidencialUrl);
  await expect(page.locator(selectors.elConfidencialLink)).toHaveAttribute('target', '_blank');
}

export async function heroMatchesSnapshot(page: Page, snapshotName: string): Promise<void> {
  await expect(page.locator(selectors.heroContent)).toHaveScreenshot(snapshotName, { animations: 'disabled' });
}

export async function skillsGridMatchesSnapshot(page: Page, snapshotName: string): Promise<void> {
  await expect(page.locator(selectors.stackVisual)).toHaveScreenshot(snapshotName, { animations: 'disabled' });
}

export async function expandSkillAtPosition(page: Page, position: number): Promise<void> {
  const items = page.locator(selectors.stackItemExpandable).filter({ visible: true });
  await items.nth(position - 1).click();
  await page.locator(selectors.stackItemOpen).waitFor({ state: 'attached' });
  await page.locator(selectors.stackDescriptionRevealed).waitFor({ state: 'attached' });
}

export async function skillsGridExpandedMatchesSnapshot(page: Page, snapshotName: string): Promise<void> {
  await expect(page.locator(selectors.stackVisual)).toHaveScreenshot(snapshotName, { animations: 'disabled' });
}

export async function quickIntroHeaderMatchesSnapshot(page: Page, snapshotName: string): Promise<void> {
  await expect(page.locator(selectors.quickIntroHeader)).toHaveScreenshot(snapshotName, { animations: 'disabled' });
}

export async function quickIntroStatsMatchesSnapshot(page: Page, snapshotName: string): Promise<void> {
  await expect(page.locator(selectors.introStats)).toHaveScreenshot(snapshotName, { animations: 'disabled' });
}

export async function portfolioContextMatchesSnapshot(page: Page, snapshotName: string): Promise<void> {
  await expect(page.locator(selectors.portfolioContext)).toHaveScreenshot(snapshotName, { animations: 'disabled' });
}

export async function currentFocusMatchesSnapshot(page: Page, snapshotName: string): Promise<void> {
  await expect(page.locator(selectors.currentFocus)).toHaveScreenshot(snapshotName, { animations: 'disabled' });
}
