import { Page, Locator } from '@playwright/test';
import { BasePage } from '../BasePage';
import { CodeAiSelectors } from './selectors';

export class CodeAiPage extends BasePage {
  readonly heading: Locator;
  readonly articleCards: Locator;
  readonly mainContent: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.locator(CodeAiSelectors.heading);
    this.articleCards = page.locator(CodeAiSelectors.articleCards);
    this.mainContent = page.locator(CodeAiSelectors.mainContent);
  }

  async navigate(): Promise<void> {
    await super.navigate('/code-ai');
  }

  async getArticleCount(): Promise<number> {
    return await this.articleCards.count();
  }
}
