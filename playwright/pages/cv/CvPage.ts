import { Page, Locator } from '@playwright/test';
import { BasePage } from '../BasePage';
import { CvSelectors } from './selectors';

export class CvPage extends BasePage {
  readonly heading: Locator;
  readonly pdfLink: Locator;
  readonly programmingCounter: Locator;
  readonly wipButton: Locator;
  readonly cvPage: Locator;
  readonly cvHeader: Locator;
  readonly pdfDownloadCard: Locator;
  readonly cvTechInfo: Locator;
  readonly cvNote: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.locator(CvSelectors.heading);
    this.pdfLink = page.locator(CvSelectors.pdfLink).first();
    this.programmingCounter = page.locator(CvSelectors.programmingCounter);
    this.wipButton = page.locator(CvSelectors.wipButton);
    this.cvPage = page.locator(CvSelectors.cvPage);
    this.cvHeader = page.locator(CvSelectors.cvHeader);
    this.pdfDownloadCard = page.locator(CvSelectors.pdfDownloadCard);
    this.cvTechInfo = page.locator(CvSelectors.cvTechInfo);
    this.cvNote = page.locator(CvSelectors.cvNote);
  }

  async navigate(): Promise<void> {
    await super.navigate('/cv');
  }
}
