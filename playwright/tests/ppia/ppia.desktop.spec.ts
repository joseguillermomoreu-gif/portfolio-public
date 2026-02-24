import { test } from '@playwright/test';
import * as ppiaPage from '@components/ppia';

test('PPiA: título correcto y cabecera coincide con snapshot', { tag: ['@test', '@ppia', '@styles'] }, async ({ page }) => {
  await test.step('When: el usuario navega a la página PPiA', async () => {
    await ppiaPage.navigateToPpia(page);
  });

  await test.step('Then: el título de la página contiene PPiA', async () => {
    await ppiaPage.titleIsCorrect(page);
  });

  await test.step('Then: la cabecera coincide con el snapshot', async () => {
    await ppiaPage.ppiaHeaderMatchesSnapshot(page, 'ppia-header-desktop.png');
  });
});
