import { Page } from '@playwright/test';
import * as selectors from './selectors';

export function contactLocators(page: Page) {
  return {
    heading: page.locator(selectors.heading),
    emailLink: page.locator(selectors.emailLink),
    githubLink: page.locator(selectors.githubLink),
    linkedinLink: page.locator(selectors.linkedinLink),
    contactCard: page.locator(selectors.contactCard),
    contactPage: page.locator(selectors.contactPage),
    contactHeader: page.locator(selectors.contactHeader),
    socialSection: page.locator(selectors.socialSection),
    externalLinks: page.locator(selectors.externalLinks),
  };
}

export async function navigateToContact(page: Page): Promise<void> {
  await page.goto('/contacto');
  await page.waitForLoadState('domcontentloaded');
}
