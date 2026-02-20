import { Page, Locator } from '@playwright/test';
import * as selectors from './selectors';

export function projectsLocators(page: Page) {
  return {
    heading: page.locator(selectors.heading),
    projectCards: page.locator(selectors.projectCards),
    mainContent: page.locator(selectors.mainContent),
    projectsPage: page.locator(selectors.projectsPage),
    projectsHeader: page.locator(selectors.projectsHeader),
    projectsGrid: page.locator(selectors.projectsGrid),
    projectsFooter: page.locator(selectors.projectsFooter),
  };
}

export async function navigateToProjects(page: Page): Promise<void> {
  await page.goto('/proyectos');
  await page.waitForLoadState('domcontentloaded');
}

export function getProjectCardByName(page: Page, name: string): Locator {
  return page.locator(selectors.projectCards).filter({
    has: page.locator(selectors.projectName, { hasText: name }),
  }).first();
}

export function getProjectStatus(card: Locator): Locator {
  return card.locator(selectors.projectStatus);
}

export function getProjectDescription(card: Locator): Locator {
  return card.locator(selectors.projectDescription);
}

export function getProjectStack(card: Locator): Locator {
  return card.locator(selectors.projectStack);
}

export function getProjectTags(card: Locator): Locator {
  return card.locator(selectors.projectTags);
}

export function getProjectHighlights(card: Locator): Locator {
  return card.locator(selectors.projectHighlights);
}

export function getProjectGithubLink(card: Locator): Locator {
  return card.locator(selectors.projectGithubLink);
}

export function getProjectWebsiteLink(card: Locator): Locator {
  return card.locator(selectors.projectWebsiteLink);
}
