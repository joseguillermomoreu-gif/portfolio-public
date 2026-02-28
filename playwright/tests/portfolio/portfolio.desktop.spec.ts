import { test } from '@playwright/test';
import * as portfolioPage from '@components/portfolio';

// ─── Smoke & Content ──────────────────────────────────────────────────────────

test('Portfolio: título, categorías y keywords son correctos', { tag: ['@test', '@portfolio'] }, async ({ page }) => {
  await test.step('When: el usuario navega a la página de portfolio', async () => {
    await portfolioPage.navigateToPortfolio(page);
  });

  await test.step('Then: el título contiene Portfolio y el nombre del autor', async () => {
    await portfolioPage.titleIsCorrect(page);
  });

  await test.step('Then: se renderizan 4 categorías y 17 keywords', async () => {
    await portfolioPage.hasCategoryCount(page, 4);
    await portfolioPage.hasKeywordCount(page, 18);
  });

  await test.step('Then: arquitectura y testing tienen 4 keywords y sus etiquetas son visibles', async () => {
    await portfolioPage.categoryHasKeywordCount(page, 'arquitectura', 4);
    await portfolioPage.categoryLabelContains(page, 'arquitectura', 'Arquitectura');
    await portfolioPage.categoryHasKeywordCount(page, 'testing', 4);
  });
});

// ─── Modal Interaction ────────────────────────────────────────────────────────

test('Portfolio: al hacer click en DDD se abre el modal con título y cuerpo', { tag: ['@test', '@portfolio'] }, async ({ page }) => {
  await test.step('Given: el usuario navega a la página de portfolio', async () => {
    await portfolioPage.navigateToPortfolio(page);
  });

  await test.step('When: hago click en la keyword DDD', async () => {
    await portfolioPage.openModal(page, 'ddd');
  });

  await test.step('Then: el modal DDD es visible con título, contenido y overlay', async () => {
    await portfolioPage.modalIsVisible(page, 'ddd');
    await portfolioPage.modalHasTitle(page, 'ddd', 'Domain-Driven Design');
    await portfolioPage.modalHasBody(page, 'ddd', 'DDD');
    await portfolioPage.modalOverlayIsVisible(page);
  });
});

test('Portfolio: al hacer click en cerrar se oculta el modal', { tag: ['@test', '@portfolio'] }, async ({ page }) => {
  await test.step('Given: el modal DDD está abierto', async () => {
    await portfolioPage.navigateToPortfolio(page);
    await portfolioPage.openModal(page, 'ddd');
  });

  await test.step('When: hago click en el botón de cierre', async () => {
    await portfolioPage.closeModalByButton(page);
  });

  await test.step('Then: el modal y el overlay están ocultos', async () => {
    await portfolioPage.modalOverlayIsHidden(page);
    await portfolioPage.modalIsHidden(page, 'ddd');
  });
});

test('Portfolio: al hacer click en el overlay se cierra el modal', { tag: ['@test', '@portfolio'] }, async ({ page }) => {
  await test.step('Given: el modal de Playwright está abierto', async () => {
    await portfolioPage.navigateToPortfolio(page);
    await portfolioPage.openModal(page, 'playwright');
  });

  await test.step('When: hago click en el overlay', async () => {
    await portfolioPage.closeModalByOverlay(page);
  });

  await test.step('Then: el modal está oculto', async () => {
    await portfolioPage.modalIsHidden(page, 'playwright');
  });
});

test('Portfolio: al pulsar ESC se cierra el modal', { tag: ['@test', '@portfolio'] }, async ({ page }) => {
  await test.step('Given: el modal de Docker está abierto', async () => {
    await portfolioPage.navigateToPortfolio(page);
    await portfolioPage.openModal(page, 'docker');
  });

  await test.step('When: pulso Escape', async () => {
    await portfolioPage.closeModalByEsc(page);
  });

  await test.step('Then: el modal está oculto', async () => {
    await portfolioPage.modalIsHidden(page, 'docker');
  });
});

test('Portfolio: el modal de simpleicons muestra la imagen de marca', { tag: ['@test', '@portfolio'] }, async ({ page }) => {
  await test.step('Given: el usuario navega a la página de portfolio', async () => {
    await portfolioPage.navigateToPortfolio(page);
  });

  await test.step('When: abro el modal de Symfony', async () => {
    await portfolioPage.openModal(page, 'symfony');
  });

  await test.step('Then: la cabecera del modal muestra un icono de marca', async () => {
    await portfolioPage.modalBrandIconIsVisible(page, 'symfony', 'symfony');
  });
});

test('Portfolio: el modal de monograma muestra el elemento de monograma', { tag: ['@test', '@portfolio'] }, async ({ page }) => {
  await test.step('Given: el usuario navega a la página de portfolio', async () => {
    await portfolioPage.navigateToPortfolio(page);
  });

  await test.step('When: abro el modal de DDD', async () => {
    await portfolioPage.openModal(page, 'ddd');
  });

  await test.step('Then: la cabecera del modal muestra un monograma', async () => {
    await portfolioPage.modalMonogramIsVisible(page, 'ddd');
  });
});

// ─── Visual Regression ────────────────────────────────────────────────────────

test('Portfolio visual: cabecera y keywords en desktop', { tag: ['@test', '@portfolio', '@styles'] }, async ({ page }) => {
  await test.step('When: el usuario navega a la página de portfolio', async () => {
    await portfolioPage.navigateToPortfolio(page);
  });

  await test.step('Then: la cabecera coincide con el snapshot', async () => {
    await portfolioPage.portfolioHeaderMatchesSnapshot(page, 'portfolio-header-desktop.png');
  });

  await test.step('Then: la sección de keywords coincide con el snapshot', async () => {
    await portfolioPage.keywordsSectionMatchesSnapshot(page, 'portfolio-keywords-desktop.png');
  });
});
