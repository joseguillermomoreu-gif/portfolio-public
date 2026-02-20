import { Page } from '@playwright/test';
import { CvSelectors } from './selectors';

export function cvLocators(page: Page) {
  return {
    heading: page.locator(CvSelectors.heading),
    pdfLink: page.locator(CvSelectors.pdfLink).first(),
    programmingCounter: page.locator(CvSelectors.programmingCounter),
    wipButton: page.locator(CvSelectors.wipButton),
    cvPage: page.locator(CvSelectors.cvPage),
    cvHeader: page.locator(CvSelectors.cvHeader),
    pdfDownloadCard: page.locator(CvSelectors.pdfDownloadCard),
    cvTechInfo: page.locator(CvSelectors.cvTechInfo),
    cvNote: page.locator(CvSelectors.cvNote),
  };
}

export async function navigateToCv(page: Page): Promise<void> {
  await page.goto('/cv');
  await page.waitForLoadState('domcontentloaded');
}
