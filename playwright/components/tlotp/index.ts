import { Page, expect } from '@playwright/test';
import * as selectors from './selectors';

export async function navigateToTlotp(page: Page): Promise<void> {
  await page.goto(selectors.route);
  await page.waitForLoadState('domcontentloaded');
  await page.locator(selectors.heading).waitFor({ state: 'visible' });
}

export async function navigateToTlotpViaNav(page: Page): Promise<void> {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');
  await page.locator(selectors.navTlotp).click();
  await page.locator(selectors.heading).waitFor({ state: 'visible' });
}

export async function titleIsCorrect(page: Page): Promise<void> {
  await expect(page).toHaveTitle(/TLOTP|The Lord of the Prompt/i);
}

export async function headingIsVisible(page: Page): Promise<void> {
  await expect(page.locator(selectors.heading)).toContainText('TLOTP');
}

export async function taglineIsVisible(page: Page): Promise<void> {
  await expect(page.locator(selectors.tagline)).toContainText('Un prompt para controlarlos a todos');
}

export async function githubLinkIsPresent(page: Page): Promise<void> {
  const link = page.locator(selectors.githubLink);
  await expect(link).toBeVisible();
  await expect(link).toHaveAttribute('href', /github\.com/);
}

export async function ppiaIsNotInNav(page: Page): Promise<void> {
  await expect(page.locator(selectors.navPpia)).toHaveCount(0);
}

export async function tlotpHeaderMatchesSnapshot(page: Page, snapshotName: string): Promise<void> {
  await expect(page.locator(selectors.tlotpHeader)).toHaveScreenshot(snapshotName, { animations: 'disabled' });
}
