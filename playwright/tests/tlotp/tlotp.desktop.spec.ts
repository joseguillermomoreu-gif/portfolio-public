import { test } from '@playwright/test';
import * as tlotpPage from '@components/tlotp';

// Tests de contenido y visual snapshot eliminados: en producción /tlotp redirige (302)
// al estático TLOTP cuando está desplegado. El título, heading, tagline, link GitHub
// y snapshots pertenecen a la página Twig de Symfony (fallback sin TLOTP desplegado).

test('TLOTP: PPIA no aparece en el menú de navegación', { tag: ['@test', '@tlotp', '@nav'] }, async ({ page }) => {
  await test.step('When: el usuario navega a la página TLOTP', async () => {
    await tlotpPage.navigateToTlotp(page);
  });

  await test.step('Then: el menú no contiene enlace a /ppia', async () => {
    await tlotpPage.ppiaIsNotInNav(page);
  });
});

test('TLOTP: navegación desde el menú principal funciona', { tag: ['@test', '@tlotp', '@nav'] }, async ({ page }) => {
  await test.step('When: el usuario hace click en TLOTP en el menú', async () => {
    await tlotpPage.navigateToTlotpViaNav(page);
  });

  await test.step('Then: la página TLOTP carga correctamente', async () => {
    await tlotpPage.headingIsVisible(page);
  });
});
