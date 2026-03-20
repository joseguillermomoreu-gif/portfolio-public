import { test } from '@playwright/test';
import * as homePage from '@components/home';
import * as headerPage from '@components/header';

test('header dark mode: en tablets >= 850px el toggle funciona (1024×768)', { tag: ['@test', '@header', '@dark_mode'] }, async ({ page }) => {
  await test.step('Given: el usuario navega con localStorage limpio', async () => {
    await homePage.navigateHome(page);
    await headerPage.clearThemeFromLocalStorage(page);
    await page.reload();
  });

  await test.step('Given: el tema por defecto es dark y el toggle es visible', async () => {
    await headerPage.themeIsDark(page);
    await headerPage.themeToggleIsVisible(page);
  });

  await test.step('When: el usuario hace click en el toggle de tema', async () => {
    await headerPage.toggleTheme(page);
  });

  await test.step('Then: el tema cambia a light', async () => {
    await headerPage.themeIsLight(page);
  });
});
