import { test, expect, type Page } from '@playwright/test';
import {
  projectsLocators,
  navigateToProjects,
  getProjectCardByName,
  getProjectGithubLink,
  getProjectWebsiteLink,
  getProjectStatus,
  getProjectHighlights,
} from '@components/projects';

const VIEWPORTS = {
  desktop: { width: 1920, height: 1080 },
  mobile: { width: 375, height: 667 },
} as const;

async function navigateAndWait(page: Page, url: string): Promise<void> {
  await page.goto(url);
  // eslint-disable-next-line playwright/no-networkidle
  await page.waitForLoadState('networkidle');
}

test.describe('Projects - Content', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToProjects(page);
  });

  test('should display 5 project cards', async ({ page }) => {
    const { projectCards } = projectsLocators(page);

    await test.step('Then exactly 5 project cards are rendered', async () => {
      await expect(projectCards).toHaveCount(5);
    });
  });

  test('should display POM-PPIA project with correct GitHub link', async ({ page }) => {
    await test.step('Then the POM-PPIA card has the correct GitHub link', async () => {
      const card = getProjectCardByName(page, 'POM-PPIA');
      await expect(getProjectGithubLink(card)).toHaveAttribute(
        'href', 'https://github.com/joseguillermomoreu-gif/pom-ppia'
      );
    });
  });

  test('should display Portfolio project with website link', async ({ page }) => {
    await test.step('Then the Portfolio card has a website link pointing to the production URL', async () => {
      const card = getProjectCardByName(page, 'Portfolio');
      await expect(getProjectWebsiteLink(card)).toHaveAttribute(
        'href', 'https://josemoreupeso.es'
      );
    });
  });

  test('should display PPIA as Private without GitHub link', async ({ page }) => {
    const { projectCards } = projectsLocators(page);

    await test.step('Then the PPIA card is Private and has no GitHub link', async () => {
      const card = projectCards.filter({
        has: page.locator('[data-testid="project-name"]').getByText('PPIA', { exact: true }),
      }).first();
      await expect(getProjectStatus(card)).toContainText('Private');
      await expect(getProjectHighlights(card)).toContainText('El Confidencial');
      await expect(getProjectGithubLink(card)).toBeHidden();
    });
  });
});

test.describe('Projects - Visual', () => {
  test.describe('Desktop', () => {
    test('Header', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.desktop);
      await navigateAndWait(page, '/proyectos');
      const { projectsHeader } = projectsLocators(page);
      await expect(projectsHeader).toHaveScreenshot('projects-header-desktop.png', { animations: 'disabled' });
    });

    test('Grid', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.desktop);
      await navigateAndWait(page, '/proyectos');
      const { projectsGrid } = projectsLocators(page);
      await expect(projectsGrid).toHaveScreenshot('projects-grid-desktop.png', { animations: 'disabled' });
    });

    test('Footer', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.desktop);
      await navigateAndWait(page, '/proyectos');
      const { projectsFooter } = projectsLocators(page);
      await expect(projectsFooter).toHaveScreenshot('projects-footer-desktop.png', { animations: 'disabled' });
    });
  });

  test.describe('Mobile', () => {
    test('Header', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.mobile);
      await navigateAndWait(page, '/proyectos');
      const { projectsHeader } = projectsLocators(page);
      await expect(projectsHeader).toHaveScreenshot('projects-header-mobile.png', { animations: 'disabled' });
    });

    test('Grid', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.mobile);
      await navigateAndWait(page, '/proyectos');
      const { projectsGrid } = projectsLocators(page);
      await expect(projectsGrid).toHaveScreenshot('projects-grid-mobile.png', { animations: 'disabled' });
    });

    test('Footer', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.mobile);
      await navigateAndWait(page, '/proyectos');
      const { projectsFooter } = projectsLocators(page);
      await expect(projectsFooter).toHaveScreenshot('projects-footer-mobile.png', { animations: 'disabled' });
    });
  });
});
