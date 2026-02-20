import { Page } from '@playwright/test';
import { ContactSelectors } from './selectors';

export function contactLocators(page: Page) {
  return {
    heading: page.locator(ContactSelectors.heading),
    emailLink: page.locator(ContactSelectors.emailLink).first(),
    githubLink: page.locator(ContactSelectors.githubLink).first(),
    linkedinLink: page.locator(ContactSelectors.linkedinLink).first(),
    contactCard: page.locator(ContactSelectors.contactCard),
    contactPage: page.locator(ContactSelectors.contactPage),
    contactHeader: page.locator(ContactSelectors.contactHeader),
    socialSection: page.locator(ContactSelectors.socialSection),
  };
}

export async function navigateToContact(page: Page): Promise<void> {
  await page.goto('/contacto');
  await page.waitForLoadState('domcontentloaded');
}
