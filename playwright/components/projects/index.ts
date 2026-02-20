import { Page, Locator } from '@playwright/test';
import { ProjectsSelectors } from './selectors';

export function projectsLocators(page: Page) {
  return {
    heading: page.locator(ProjectsSelectors.heading),
    projectCards: page.locator(ProjectsSelectors.projectCards),
    mainContent: page.locator(ProjectsSelectors.mainContent),
    projectsPage: page.locator(ProjectsSelectors.projectsPage),
    projectsHeader: page.locator(ProjectsSelectors.projectsHeader),
    projectsGrid: page.locator(ProjectsSelectors.projectsGrid),
    projectsFooter: page.locator(ProjectsSelectors.projectsFooter),
  };
}

export async function navigateToProjects(page: Page): Promise<void> {
  await page.goto('/proyectos');
  await page.waitForLoadState('domcontentloaded');
}

export function getProjectCardByName(page: Page, name: string): Locator {
  return page.locator(ProjectsSelectors.projectCards).filter({
    has: page.locator(ProjectsSelectors.projectName, { hasText: name }),
  }).first();
}

export function getProjectStatus(card: Locator): Locator {
  return card.locator(ProjectsSelectors.projectStatus);
}

export function getProjectDescription(card: Locator): Locator {
  return card.locator(ProjectsSelectors.projectDescription);
}

export function getProjectStack(card: Locator): Locator {
  return card.locator(ProjectsSelectors.projectStack);
}

export function getProjectTags(card: Locator): Locator {
  return card.locator(ProjectsSelectors.projectTags);
}

export function getProjectHighlights(card: Locator): Locator {
  return card.locator(ProjectsSelectors.projectHighlights);
}

export function getProjectGithubLink(card: Locator): Locator {
  return card.locator(ProjectsSelectors.projectGithubLink);
}

export function getProjectWebsiteLink(card: Locator): Locator {
  return card.locator(ProjectsSelectors.projectWebsiteLink);
}
