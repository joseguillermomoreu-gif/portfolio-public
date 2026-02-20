import { test } from '@playwright/test';
import * as homePage from '@components/home';
import * as headerPage from '@components/header';

test('header dark mode: en desktop el tema es light por defecto y el toggle es visible', async ({ page }) => {
  await test.step('Given: viewport desktop con localStorage limpio', async () => {
    await homePage.navigateHome(page);
    await headerPage.clearThemeFromLocalStorage(page);
    await page.reload();
  });

  await test.step('Then: el tema por defecto es light y el toggle es visible con aria-label', async () => {
    await headerPage.themeIsLight(page);
    await headerPage.themeToggleIsVisible(page);
    await headerPage.themeToggleHasAriaLabel(page);
  });
});
