import { test } from '@playwright/test';
import * as tlotpPage from '@components/tlotp';

test('TLOTP visual: cabecera en mobile', { tag: ['@test', '@tlotp', '@styles'] }, async ({ page }) => {
  await test.step('When: el usuario navega a la página TLOTP', async () => {
    await tlotpPage.navigateToTlotp(page);
  });

  await test.step('Then: la cabecera coincide con el snapshot', async () => {
    await tlotpPage.tlotpHeaderMatchesSnapshot(page, 'tlotp-header-mobile.png');
  });
});
