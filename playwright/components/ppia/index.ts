import { Page, expect } from '@playwright/test';
import * as selectors from './selectors';

export async function navigateToPpia(page: Page): Promise<void> {
  await page.goto(selectors.route);
  await page.waitForLoadState('domcontentloaded');
  await page.locator(selectors.heading).waitFor({ state: 'visible' });
}

export async function titleIsCorrect(page: Page): Promise<void> {
  await expect(page).toHaveTitle(/PPiA|Playwright Page Inspector/i);
}

export async function ppiaHeaderMatchesSnapshot(page: Page, snapshotName: string): Promise<void> {
  await expect(page.locator(selectors.ppiaHeader)).toHaveScreenshot(snapshotName, { animations: 'disabled' });
}
