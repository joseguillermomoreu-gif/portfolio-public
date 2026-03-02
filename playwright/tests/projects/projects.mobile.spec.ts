import { test } from '@playwright/test';
import * as projectsPage from '@components/projects';
import * as headerPage from '@components/header';

test('Proyectos visual: cabecera, donación, tarjetas y footer en mobile', { tag: ['@test', '@projects', '@styles'] }, async ({ page }) => {
  await test.step('When: el usuario navega a la página de proyectos', async () => {
    await projectsPage.navigateToProjects(page);
  });

  await test.step('When: oculta el header flotante', async () => {
    await headerPage.hideHeader(page);
  });

  await test.step('Then: la cabecera coincide con el snapshot', async () => {
    await projectsPage.projectsHeaderMatchesSnapshot(page, 'projects-header-mobile.png');
  });

  await test.step('Then: la sección de donación coincide con el snapshot', async () => {
    await projectsPage.donationSectionMatchesSnapshot(page, 'projects-donation-mobile.png');
  });

  await test.step('Then: cada tarjeta de proyecto coincide con su snapshot', async () => {
    const projectNames = ['tlotp', 'portfolio', 'pom-ppia', 'auto-skills', 'end2endguru99', 'ppia'];
    for (let i = 0; i < projectNames.length; i++) {
      await projectsPage.projectCardMatchesSnapshot(page, i, `projects-card-${projectNames[i]}-mobile.png`);
    }
  });

  await test.step('Then: el footer coincide con el snapshot', async () => {
    await projectsPage.projectsFooterMatchesSnapshot(page, 'projects-footer-mobile.png');
  });
});
