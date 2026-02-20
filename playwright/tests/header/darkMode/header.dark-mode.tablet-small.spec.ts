import { test } from '@playwright/test';
import * as homePage from '@components/home';
import * as headerPage from '@components/header';

test('header dark mode: dark mode se fuerza en tablets < 850px (844×390)', async ({ page }) => {
  await test.step('Given: viewport tablet landscape de 844×390 con localStorage limpio', async () => {
    await homePage.navigateHome(page);
    await headerPage.clearThemeFromLocalStorage(page);
  });

  await test.step('Then: el tema es dark y el toggle está oculto', async () => {
    await headerPage.themeIsDark(page);
    await headerPage.themeToggleIsHidden(page);
  });
});

test('header dark mode: dark mode persiste tras recargar', async ({ page }) => {
  await test.step('Given: localStorage limpio', async () => {
    await homePage.navigateHome(page);
    await headerPage.clearThemeFromLocalStorage(page);
    await page.reload();
  });

  await test.step('When: el usuario recarga la página', async () => {
    await page.reload();
  });

  await test.step('Then: el tema sigue siendo dark', async () => {
    await headerPage.themeIsDark(page);
  });
});

test('header dark mode: dark mode ignora localStorage light', async ({ page }) => {
  await test.step('Given: localStorage tiene theme=light', async () => {
    await homePage.navigateHome(page);
    await headerPage.setLocalStorageThemeToLight(page);
  });

  await test.step('When: el usuario recarga la página', async () => {
    await page.reload();
  });

  await test.step('Then: dark mode sigue forzado', async () => {
    await headerPage.themeIsDark(page);
  });
});
