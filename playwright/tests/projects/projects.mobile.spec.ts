import { test, expect } from '@playwright/test';
import { projectsLocators } from '@components/projects';

test.beforeEach(async ({ page }) => {
  await page.goto('/proyectos');
  // eslint-disable-next-line playwright/no-networkidle
  await page.waitForLoadState('networkidle');
});

test('Projects - Header', async ({ page }) => {
  const { projectsHeader } = projectsLocators(page);
  await expect(projectsHeader).toHaveScreenshot('projects-header-mobile.png', { animations: 'disabled' });
});

test('Projects - Grid', async ({ page }) => {
  const { projectsGrid } = projectsLocators(page);
  await expect(projectsGrid).toHaveScreenshot('projects-grid-mobile.png', { animations: 'disabled' });
});

test('Projects - Footer', async ({ page }) => {
  const { projectsFooter } = projectsLocators(page);
  await expect(projectsFooter).toHaveScreenshot('projects-footer-mobile.png', { animations: 'disabled' });
});
