import { Page, Locator } from '@playwright/test';
import { BasePage } from '../BasePage';
import { ContactSelectors } from './selectors';

export class ContactPage extends BasePage {
  readonly heading: Locator;
  readonly emailLink: Locator;
  readonly githubLink: Locator;
  readonly linkedinLink: Locator;
  readonly contactCard: Locator;
  readonly contactPage: Locator;
  readonly contactHeader: Locator;
  readonly socialSection: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.locator(ContactSelectors.heading);
    this.emailLink = page.locator(ContactSelectors.emailLink).first();
    this.githubLink = page.locator(ContactSelectors.githubLink).first();
    this.linkedinLink = page.locator(ContactSelectors.linkedinLink).first();
    this.contactCard = page.locator(ContactSelectors.contactCard);
    this.contactPage = page.locator(ContactSelectors.contactPage);
    this.contactHeader = page.locator(ContactSelectors.contactHeader);
    this.socialSection = page.locator(ContactSelectors.socialSection);
  }

  async navigate(): Promise<void> {
    await super.navigate('/contacto');
  }
}
