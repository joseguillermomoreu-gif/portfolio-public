import { test } from '@playwright/test';
import * as projectsPage from '@components/projects';

test('Proyectos: conteo, enlaces y visibilidad de tarjetas son correctos', { tag: ['@test', '@projects'] }, async ({ page }) => {
  await test.step('When: el usuario navega a la página de proyectos', async () => {
    await projectsPage.navigateToProjects(page);
  });

  await test.step('Then: se renderizan exactamente 6 tarjetas de proyecto', async () => {
    await projectsPage.hasProjectCount(page, 6);
  });

  await test.step('Then: POM-PPIA tiene enlace a GitHub y Portfolio tiene enlace a producción', async () => {
    await projectsPage.projectGithubLinkIs(page, 'POM-PPIA', 'https://github.com/joseguillermomoreu-gif/pom-ppia');
    await projectsPage.projectWebsiteLinkIs(page, 'Portfolio', 'https://josemoreupeso.es');
  });

  await test.step('Then: la tarjeta PPIA es privada y no tiene enlace de GitHub', async () => {
    await projectsPage.ppiaProjectIsPrivate(page);
  });

  await test.step('Then: la sección de donación es visible con enlace PayPal correcto', async () => {
    await projectsPage.donationSectionIsVisible(page);
    await projectsPage.donationLinkIs(page, 'https://paypal.me/Joseguillermomoreu');
  });
});

// ─── Visual Regression ────────────────────────────────────────────────────────

test('Proyectos visual: cabecera, grid y footer en desktop', { tag: ['@test', '@projects', '@styles'] }, async ({ page }) => {
  await test.step('When: el usuario navega a la página de proyectos', async () => {
    await projectsPage.navigateToProjects(page);
  });

  await test.step('Then: la cabecera coincide con el snapshot', async () => {
    await projectsPage.projectsHeaderMatchesSnapshot(page, 'projects-header-desktop.png');
  });

  await test.step('Then: la sección de donación coincide con el snapshot', async () => {
    await projectsPage.donationSectionMatchesSnapshot(page, 'projects-donation-desktop.png');
  });

  await test.step('Then: cada tarjeta de proyecto coincide con su snapshot', async () => {
    const projectNames = ['tlotp', 'portfolio', 'pom-ppia', 'auto-skills', 'end2endguru99', 'ppia'];
    for (let i = 0; i < projectNames.length; i++) {
      await projectsPage.projectCardMatchesSnapshot(page, i, `projects-card-${projectNames[i]}-desktop.png`);
    }
  });

  await test.step('Then: el footer coincide con el snapshot', async () => {
    await projectsPage.projectsFooterMatchesSnapshot(page, 'projects-footer-desktop.png');
  });
});
