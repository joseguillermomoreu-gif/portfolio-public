import { test } from '@playwright/test';
import * as sanPatricio from '@components/san_patricio';

test.beforeEach(async ({ page }) => {
  // Limpiar localStorage antes de cada test para garantizar aislamiento
  await page.goto('/');
  await sanPatricio.clearLocalStorage(page);
});

test('san patricio: /san_patricio redirige al artículo fuera del 17 de marzo', { tag: ['@test', '@san_patricio'] }, async ({ page }) => {
  await test.step('When: el usuario visita /san_patricio', async () => {
    await sanPatricio.goto(page);
  });

  await test.step('Then: es redirigido al artículo de San Patricio', async () => {
    await sanPatricio.expectRedirectToArticle(page);
  });
});

test('san patricio: sin activación previa el trébol no aparece en páginas normales', { tag: ['@test', '@san_patricio'] }, async ({ page }) => {
  await test.step('Given: localStorage limpio (sin activación previa del tema)', async () => {
    await sanPatricio.gotoHome(page);
  });

  await test.step('Then: el botón trébol no está presente en el header', async () => {
    await sanPatricio.shamrockIsNotVisible(page);
  });

  await test.step('And: el botón darkmode sí está visible', async () => {
    await sanPatricio.darkmodeButtonIsVisible(page);
  });
});
