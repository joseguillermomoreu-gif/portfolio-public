import { test } from '@playwright/test';
import * as homePage from '@components/home';
import * as headerPage from '@components/header';

test('header visual: aspecto en mobile con menú cerrado', async ({ page }) => {
  await test.step('When: el usuario navega a la página principal', async () => {
    await homePage.navigateHome(page);
  });

  await test.step('Then: el header con menú cerrado coincide con el snapshot', async () => {
    await headerPage.headerMatchesSnapshot(page, 'header-mobile-closed.png');
  });
});

test('header visual: aspecto en mobile con menú abierto', async ({ page }) => {
  await test.step('When: el usuario navega a la página principal', async () => {
    await homePage.navigateHome(page);
  });

  await test.step('When: el usuario abre el menú de navegación', async () => {
    await headerPage.openMobileMenu(page);
  });

  await test.step('Then: la página completa con menú abierto coincide con el snapshot', async () => {
    await headerPage.headerFullPageMatchesSnapshot(page, 'header-mobile-open.png');
  });
});
