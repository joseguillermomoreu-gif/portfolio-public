import { test } from '@playwright/test';
import * as portfolioPage from '@components/portfolio';

test('Portfolio mobile: las 4 categorías están presentes', { tag: ['@test', '@portfolio'] }, async ({ page }) => {
  await test.step('When: el usuario navega a la página de portfolio', async () => {
    await portfolioPage.navigateToPortfolio(page);
  });

  await test.step('Then: se renderizan 4 secciones de categoría', async () => {
    await portfolioPage.hasCategoryCount(page, 4);
  });
});

test('Portfolio mobile: el modal TDD se abre correctamente', { tag: ['@test', '@portfolio'] }, async ({ page }) => {
  await test.step('Given: el usuario navega a la página de portfolio', async () => {
    await portfolioPage.navigateToPortfolio(page);
  });

  await test.step('When: abro el modal de TDD', async () => {
    await portfolioPage.openModal(page, 'tdd');
  });

  await test.step('Then: el modal TDD es visible con el título correcto', async () => {
    await portfolioPage.modalIsVisible(page, 'tdd');
    await portfolioPage.modalHasTitle(page, 'tdd', 'Test-Driven Development');
  });
});

test('Portfolio mobile: el modal TDD se cierra con el botón', { tag: ['@test', '@portfolio'] }, async ({ page }) => {
  await test.step('Given: el modal TDD está abierto', async () => {
    await portfolioPage.navigateToPortfolio(page);
    await portfolioPage.openModal(page, 'tdd');
  });

  await test.step('When: cierro el modal con el botón', async () => {
    await portfolioPage.closeModalByButton(page);
  });

  await test.step('Then: el modal está oculto', async () => {
    await portfolioPage.modalIsHidden(page, 'tdd');
  });
});

// ─── Visual Regression ────────────────────────────────────────────────────────

test('Portfolio visual: cabecera y keywords en mobile', { tag: ['@test', '@portfolio', '@styles'] }, async ({ page }) => {
  await test.step('When: el usuario navega a la página de portfolio', async () => {
    await portfolioPage.navigateToPortfolio(page);
  });

  await test.step('Then: la cabecera coincide con el snapshot', async () => {
    await portfolioPage.portfolioHeaderMatchesSnapshot(page, 'portfolio-header-mobile.png');
  });

  await test.step('Then: la sección de keywords coincide con el snapshot', async () => {
    await portfolioPage.keywordsSectionMatchesSnapshot(page, 'portfolio-keywords-mobile.png');
  });
});
