import { test } from '@playwright/test';
import * as homePage from '@components/home';
import * as headerPage from '@components/header';

test('header visual: aspecto en desktop sin scroll', async ({ page }) => {
  await test.step('When: el usuario navega a la página principal', async () => {
    await homePage.navigateHome(page);
  });

  await test.step('Then: el header coincide con el snapshot', async () => {
    await headerPage.headerMatchesSnapshot(page, 'header-top-desktop.png');
  });
});

test('header visual: aspecto en desktop con scroll', async ({ page }) => {
  await test.step('When: el usuario navega a la página principal', async () => {
    await homePage.navigateHome(page);
  });

  await test.step('When: el usuario hace scroll hacia abajo', async () => {
    await headerPage.scrollToTriggerEffect(page, 200);
  });

  await test.step('Then: el header con efecto scroll coincide con el snapshot', async () => {
    await headerPage.headerMatchesSnapshot(page, 'header-scrolled-desktop.png');
  });
});
