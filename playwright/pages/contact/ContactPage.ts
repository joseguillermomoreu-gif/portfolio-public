import { Page, Locator } from '@playwright/test';
import { BasePage } from '../BasePage';
import { ContactSelectors } from './selectors';

export class ContactPage extends BasePage {
  readonly heading: Locator;
  readonly emailLink: Locator;
  readonly githubLink: Locator;
  readonly linkedinLink: Locator;
  readonly contactCard: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.locator(ContactSelectors.heading);
    this.emailLink = page.locator(ContactSelectors.emailLink).first();
    this.githubLink = page.locator(ContactSelectors.githubLink).first();
    this.linkedinLink = page.locator(ContactSelectors.linkedinLink).first();
    this.contactCard = page.locator(ContactSelectors.contactCard);
  }

  async navigate(): Promise<void> {
    await super.navigate('/contacto');
  }
}
