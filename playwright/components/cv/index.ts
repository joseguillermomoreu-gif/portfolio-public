import { Page } from '@playwright/test';
import * as selectors from './selectors';

export function cvLocators(page: Page) {
  return {
    heading: page.locator(selectors.heading),
    pdfLink: page.locator(selectors.pdfLink),
    programmingCounter: page.locator(selectors.programmingCounter),
    wipButton: page.locator(selectors.wipButton),
    cvPage: page.locator(selectors.cvPage),
    cvHeader: page.locator(selectors.cvHeader),
    pdfDownloadCard: page.locator(selectors.pdfDownloadCard),
    cvTechInfo: page.locator(selectors.cvTechInfo),
    cvNote: page.locator(selectors.cvNote),
    skillsCarouselSection: page.locator(selectors.skillsCarouselSection),
  };
}

export async function navigateToCv(page: Page): Promise<void> {
  await page.goto('/cv');
  await page.waitForLoadState('domcontentloaded');
}
