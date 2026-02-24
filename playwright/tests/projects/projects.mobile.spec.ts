import { test } from '@playwright/test';
import * as projectsPage from '@components/projects';

test('Proyectos visual: cabecera, grid y footer en mobile', { tag: ['@test', '@projects', '@styles'] }, async ({ page }) => {
  await test.step('When: el usuario navega a la página de proyectos', async () => {
    await projectsPage.navigateToProjects(page);
  });

  await test.step('Then: la cabecera coincide con el snapshot', async () => {
    await projectsPage.projectsHeaderMatchesSnapshot(page, 'projects-header-mobile.png');
  });

  await test.step('Then: el grid coincide con el snapshot', async () => {
    await projectsPage.projectsGridMatchesSnapshot(page, 'projects-grid-mobile.png');
  });

  await test.step('Then: el footer coincide con el snapshot', async () => {
    await projectsPage.projectsFooterMatchesSnapshot(page, 'projects-footer-mobile.png');
  });
});
