import { test } from '@playwright/test';
import * as tlotpPage from '@components/tlotp';

test('TLOTP: título correcto, contenido visible y link GitHub presente', { tag: ['@test', '@tlotp'] }, async ({ page }) => {
  await test.step('When: el usuario navega a la página TLOTP', async () => {
    await tlotpPage.navigateToTlotp(page);
  });

  await test.step('Then: el título de la página contiene TLOTP', async () => {
    await tlotpPage.titleIsCorrect(page);
  });

  await test.step('Then: el heading h1 contiene TLOTP', async () => {
    await tlotpPage.headingIsVisible(page);
  });

  await test.step('Then: el tagline es visible', async () => {
    await tlotpPage.taglineIsVisible(page);
  });

  await test.step('Then: el enlace a GitHub está presente', async () => {
    await tlotpPage.githubLinkIsPresent(page);
  });
});

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

test('TLOTP visual: cabecera coincide con snapshot', { tag: ['@test', '@tlotp', '@styles'] }, async ({ page }) => {
  await test.step('When: el usuario navega a la página TLOTP', async () => {
    await tlotpPage.navigateToTlotp(page);
  });

  await test.step('Then: la cabecera coincide con el snapshot', async () => {
    await tlotpPage.tlotpHeaderMatchesSnapshot(page, 'tlotp-header-desktop.png');
  });
});
