import { test } from '@playwright/test';
import * as ppiaPage from '@components/ppia';

test('PPiA visual: cabecera en mobile', { tag: ['@test', '@ppia', '@styles'] }, async ({ page }) => {
  await test.step('When: el usuario navega a la página PPiA', async () => {
    await ppiaPage.navigateToPpia(page);
  });

  await test.step('Then: la cabecera coincide con el snapshot', async () => {
    await ppiaPage.ppiaHeaderMatchesSnapshot(page, 'ppia-header-mobile.png');
  });
});
