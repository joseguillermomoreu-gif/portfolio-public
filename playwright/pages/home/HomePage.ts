import { Page, Locator } from '@playwright/test';
import { BasePage } from '../BasePage';
import { HomeSelectors } from './selectors';

export class HomePage extends BasePage {
  readonly hero: Locator;
  readonly heroCvButton: Locator;
  readonly heroContactButton: Locator;
  readonly quickIntro: Locator;
  readonly introStats: Locator;
  readonly statCards: Locator;
  readonly portfolioContext: Locator;
  readonly skillsSection: Locator;

  constructor(page: Page) {
    super(page);
    this.hero = page.locator(HomeSelectors.hero);
    this.heroCvButton = page.locator(HomeSelectors.heroCvButton);
    this.heroContactButton = page.locator(HomeSelectors.heroContactButton);
    this.quickIntro = page.locator(HomeSelectors.quickIntro);
    this.introStats = page.locator(HomeSelectors.introStats);
    this.statCards = page.locator(HomeSelectors.statCards);
    this.portfolioContext = page.locator(HomeSelectors.portfolioContext);
    this.skillsSection = page.locator(HomeSelectors.skillsSection);
  }

  async navigate(): Promise<void> {
    await super.navigate('/');
  }

  async getStatCardsCount(): Promise<number> {
    return await this.statCards.count();
  }
}
