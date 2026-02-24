import { test } from '@playwright/test';
import * as footerPage from '@components/footer';
import * as homePage from '@components/home';

test('footer visual: footer en mobile', { tag: ['@test', '@footer', '@styles'] }, async ({ page }) => {
  await test.step('Given: el usuario navega a la página principal', async () => {
    await homePage.navigateHome(page);
  });

  await test.step('When: el usuario hace scroll al footer', async () => {
    await footerPage.scrollToFooter(page);
  });

  await test.step('Then: el footer coincide con el snapshot', async () => {
    await footerPage.footerMatchesSnapshot(page, 'footer-mobile.png');
  });
});
