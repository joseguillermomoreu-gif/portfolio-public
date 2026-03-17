import { test } from '@playwright/test';
import * as sanPatricio from '@components/san_patricio';

test.beforeEach(async ({ page }) => {
  // RF-05, RNF-03: limpiar localStorage antes de cada test para garantizar aislamiento
  await page.goto('/');
  await sanPatricio.clearLocalStorage(page);
});

test('san patricio: visitar /san_patricio activa el tema en localStorage', { tag: ['@test', '@san_patricio'] }, async ({ page }) => {
  await test.step('When: el usuario visita /san_patricio', async () => {
    await sanPatricio.goto(page);
  });

  await test.step('Then: el flag san_patricio_theme está "active" en localStorage', async () => {
    await sanPatricio.themeIsActiveInLocalStorage(page);
  });

  await test.step('And: la página festiva es visible', async () => {
    await sanPatricio.pageIsVisible(page);
    await sanPatricio.pageTitleIsCorrect(page);
  });
});

test('san patricio: tras activar el tema, el trébol es visible en home y el darkmode button no', { tag: ['@test', '@san_patricio'] }, async ({ page }) => {
  await test.step('Given: el usuario activa el tema visitando /san_patricio', async () => {
    await sanPatricio.goto(page);
    await sanPatricio.themeIsActiveInLocalStorage(page);
  });

  await test.step('When: el usuario navega a home', async () => {
    await sanPatricio.gotoHome(page);
  });

  await test.step('Then: el botón trébol es visible en el header', async () => {
    await sanPatricio.shamrockIsVisible(page);
  });

  await test.step('And: el botón darkmode no está visible', async () => {
    await sanPatricio.darkmodeButtonIsNotVisible(page);
  });
});

test('san patricio: clic en trébol desde home desactiva el tema y restaura el darkmode button', { tag: ['@test', '@san_patricio'] }, async ({ page }) => {
  await test.step('Given: el usuario activa el tema y navega a home', async () => {
    await sanPatricio.goto(page);
    await sanPatricio.gotoHome(page);
    await sanPatricio.shamrockIsVisible(page);
  });

  await test.step('When: el usuario hace clic en el botón trébol', async () => {
    await sanPatricio.clickShamrock(page);
  });

  await test.step('Then: el botón darkmode es restaurado en el header', async () => {
    await sanPatricio.darkmodeButtonIsVisible(page);
  });

  await test.step('And: el flag san_patricio_theme se elimina de localStorage', async () => {
    await sanPatricio.themeIsNotActiveInLocalStorage(page);
  });
});

test('san patricio: sin activación previa el trébol no aparece en páginas normales', { tag: ['@test', '@san_patricio'] }, async ({ page }) => {
  await test.step('Given: localStorage limpio (sin activación previa del tema)', async () => {
    // beforeEach ya limpia localStorage; navegamos directamente a home sin pasar por /san_patricio
    await sanPatricio.gotoHome(page);
  });

  await test.step('Then: el botón trébol no está presente en el header', async () => {
    await sanPatricio.shamrockIsNotVisible(page);
  });

  await test.step('And: el botón darkmode sí está visible', async () => {
    await sanPatricio.darkmodeButtonIsVisible(page);
  });
});
