import { Page, Locator } from '@playwright/test';
import { BasePage } from '../BasePage';
import { PpiaSelectors } from './selectors';

export class PpiaPage extends BasePage {
  readonly heading: Locator;
  readonly mainContent: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.locator(PpiaSelectors.heading);
    this.mainContent = page.locator(PpiaSelectors.mainContent);
  }

  async navigate(): Promise<void> {
    await super.navigate('/ppia');
  }
}
