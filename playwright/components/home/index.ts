import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../pages/BasePage';
import { HomeSelectors } from './selectors';

export class HomeComponent extends BasePage {
  readonly hero: Locator;
  readonly heroContent: Locator;
  readonly heroCvButton: Locator;
  readonly heroContactButton: Locator;
  readonly quickIntro: Locator;
  readonly quickIntroHeader: Locator;
  readonly introStats: Locator;
  readonly statCards: Locator;
  readonly portfolioContext: Locator;
  readonly currentFocus: Locator;
  readonly skillsSection: Locator;
  readonly stackVisual: Locator;
  readonly stackItems: Locator;
  readonly akkodisLink: Locator;
  readonly elConfidencialLink: Locator;
  readonly githubProfileLink: Locator;

  constructor(page: Page) {
    super(page);
    this.hero = page.locator(HomeSelectors.hero);
    this.heroContent = page.locator(HomeSelectors.heroContent);
    this.heroCvButton = page.locator(HomeSelectors.heroCvButton);
    this.heroContactButton = page.locator(HomeSelectors.heroContactButton);
    this.quickIntro = page.locator(HomeSelectors.quickIntro);
    this.quickIntroHeader = page.locator(HomeSelectors.quickIntroHeader);
    this.introStats = page.locator(HomeSelectors.introStats);
    this.statCards = page.locator(HomeSelectors.statCards);
    this.portfolioContext = page.locator(HomeSelectors.portfolioContext);
    this.currentFocus = page.locator(HomeSelectors.currentFocus);
    this.skillsSection = page.locator(HomeSelectors.skillsSection);
    this.stackVisual = page.locator(HomeSelectors.stackVisual);
    this.stackItems = page.locator(HomeSelectors.stackItems);
    this.akkodisLink = page.locator(HomeSelectors.akkodisLink);
    this.elConfidencialLink = page.locator(HomeSelectors.elConfidencialLink);
    this.githubProfileLink = page.locator(HomeSelectors.githubProfileLink);
  }

  async navigate(): Promise<void> {
    await super.navigate('/');
  }

  async getStatCardsCount(): Promise<number> {
    return await this.statCards.count();
  }
}
