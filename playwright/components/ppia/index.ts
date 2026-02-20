import { Page } from '@playwright/test';
import * as selectors from './selectors';

export function ppiaLocators(page: Page) {
  return {
    heading: page.locator(selectors.heading),
    mainContent: page.locator(selectors.mainContent),
    ppiaPage: page.locator(selectors.ppiaPage),
    ppiaHeader: page.locator(selectors.ppiaHeader),
    wipCard: page.locator(selectors.wipCard),
  };
}

export async function navigateToPpia(page: Page): Promise<void> {
  await page.goto('/ppia');
  await page.waitForLoadState('domcontentloaded');
}
