import { Page, Locator } from '@playwright/test';
import { BasePage } from '../BasePage';
import { CvSelectors } from './selectors';

export class CvPage extends BasePage {
  readonly heading: Locator;
  readonly pdfLink: Locator;
  readonly programmingCounter: Locator;
  readonly wipButton: Locator;
  readonly cvPage: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.locator(CvSelectors.heading);
    this.pdfLink = page.locator(CvSelectors.pdfLink).first();
    this.programmingCounter = page.locator(CvSelectors.programmingCounter);
    this.wipButton = page.locator(CvSelectors.wipButton);
    this.cvPage = page.locator(CvSelectors.cvPage);
  }

  async navigate(): Promise<void> {
    await super.navigate('/cv');
  }
}
