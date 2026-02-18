import { Page, Locator } from '@playwright/test';
import { BasePage } from '../BasePage';
import { ProjectsSelectors } from './selectors';

export class ProjectsPage extends BasePage {
  readonly heading: Locator;
  readonly projectCards: Locator;
  readonly mainContent: Locator;
  readonly projectsPage: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.locator(ProjectsSelectors.heading);
    this.projectCards = page.locator(ProjectsSelectors.projectCards);
    this.mainContent = page.locator(ProjectsSelectors.mainContent);
    this.projectsPage = page.locator(ProjectsSelectors.projectsPage);
  }

  async navigate(): Promise<void> {
    await super.navigate('/proyectos');
  }

  getProjectCardByName(name: string): Locator {
    return this.projectCards.filter({
      has: this.page.locator(ProjectsSelectors.projectName, { hasText: name }),
    }).first();
  }

  getProjectStatus(card: Locator): Locator {
    return card.locator(ProjectsSelectors.projectStatus);
  }

  getProjectDescription(card: Locator): Locator {
    return card.locator(ProjectsSelectors.projectDescription);
  }

  getProjectStack(card: Locator): Locator {
    return card.locator(ProjectsSelectors.projectStack);
  }

  getProjectTags(card: Locator): Locator {
    return card.locator(ProjectsSelectors.projectTags);
  }

  getProjectHighlights(card: Locator): Locator {
    return card.locator(ProjectsSelectors.projectHighlights);
  }

  getProjectGithubLink(card: Locator): Locator {
    return card.locator(ProjectsSelectors.projectGithubLink);
  }

  getProjectWebsiteLink(card: Locator): Locator {
    return card.locator(ProjectsSelectors.projectWebsiteLink);
  }
}
