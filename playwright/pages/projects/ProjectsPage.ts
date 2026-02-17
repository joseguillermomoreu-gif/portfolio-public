import { Page, Locator } from '@playwright/test';
import { BasePage } from '../BasePage';
import { ProjectsSelectors } from './selectors';

export class ProjectsPage extends BasePage {
  readonly heading: Locator;
  readonly projectCards: Locator;
  readonly mainContent: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.locator(ProjectsSelectors.heading);
    this.projectCards = page.locator(ProjectsSelectors.projectCards);
    this.mainContent = page.locator(ProjectsSelectors.mainContent);
  }

  async navigate(): Promise<void> {
    await super.navigate('/proyectos');
  }
}
