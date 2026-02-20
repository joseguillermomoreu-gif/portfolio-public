import { Page } from '@playwright/test';
import { PpiaSelectors } from './selectors';

export function ppiaLocators(page: Page) {
  return {
    heading: page.locator(PpiaSelectors.heading),
    mainContent: page.locator(PpiaSelectors.mainContent),
    ppiaPage: page.locator(PpiaSelectors.ppiaPage),
    ppiaHeader: page.locator(PpiaSelectors.ppiaHeader),
    wipCard: page.locator(PpiaSelectors.wipCard),
  };
}

export async function navigateToPpia(page: Page): Promise<void> {
  await page.goto('/ppia');
  await page.waitForLoadState('domcontentloaded');
}
