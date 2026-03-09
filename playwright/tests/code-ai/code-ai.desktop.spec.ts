import { test } from '@playwright/test';
import * as codeAiPage from '@components/code-ai';

// ─── Article List ─────────────────────────────────────────────────────────────

test('Code & AI: título, artículos y enlace al portfolio son correctos', { tag: ['@test', '@code_ai'] }, async ({ page }) => {
  await test.step('When: el usuario navega a la página Code & AI', async () => {
    await codeAiPage.navigateToCodeAi(page);
  });

  await test.step('Then: el título de la página contiene Code & AI y el nombre del autor', async () => {
    await codeAiPage.titleIsCorrect(page);
  });

  await test.step('Then: se renderiza al menos una tarjeta y el enlace al portfolio es visible', async () => {
    await codeAiPage.hasAtLeastOneArticle(page);
    await codeAiPage.portfolioArticleLinkIsVisible(page);
  });
});

test('Code & AI: navega de la lista al detalle de artículo', { tag: ['@test', '@code_ai'] }, async ({ page }) => {
  await test.step('Given: estoy en la página de listado de Code & AI', async () => {
    await codeAiPage.navigateToCodeAi(page);
  });

  await test.step('When: hago click en el enlace al artículo portfolio', async () => {
    await codeAiPage.clickPortfolioArticleLink(page);
  });

  await test.step('Then: llego a la página de detalle con el título correcto', async () => {
    await codeAiPage.portfolioArticleIsLoaded(page);
  });
});

// ─── Article Detail ───────────────────────────────────────────────────────────

test('Code & AI detalle: título, fechas y párrafos del artículo portfolio', { tag: ['@test', '@code_ai'] }, async ({ page }) => {
  await test.step('When: el usuario navega al detalle del artículo del portfolio', async () => {
    await codeAiPage.navigateToPortfolioArticle(page);
  });

  await test.step('Then: el título de la página coincide con el artículo', async () => {
    await codeAiPage.portfolioArticleIsLoaded(page);
  });

  await test.step('Then: el artículo muestra fecha y contiene párrafos', async () => {
    await codeAiPage.articleBodyContainsDateMetadata(page);
    await codeAiPage.articleHasParagraphs(page);
  });
});

test('Code & AI detalle: carga el artículo automatizando-e2e-con-ia', { tag: ['@test', '@code_ai'] }, async ({ page }) => {
  await test.step('When: el usuario navega al artículo de PPiA', async () => {
    await codeAiPage.navigateToPpiaArticle(page);
  });

  await test.step('Then: el título de la página coincide con el artículo de PPiA', async () => {
    await codeAiPage.ppiaArticleIsLoaded(page);
  });
});

test('Code & AI detalle: los bloques de código tienen syntax highlighting', { tag: ['@test', '@code_ai'] }, async ({ page }) => {
  await test.step('When: el usuario navega al detalle del artículo del portfolio', async () => {
    await codeAiPage.navigateToPortfolioArticle(page);
  });

  await test.step('Then: los bloques de código tienen syntax highlighting con highlight.js', async () => {
    await codeAiPage.codeBlocksHaveSyntaxHighlighting(page);
  });
});

test('Code & AI visual: bloque de código con syntax highlighting', { tag: ['@test', '@code_ai', '@styles'] }, async ({ page }) => {
  await test.step('When: el usuario navega al detalle del artículo del portfolio', async () => {
    await codeAiPage.navigateToPortfolioArticle(page);
  });

  await test.step('Then: el primer bloque de código coincide con el snapshot', async () => {
    await codeAiPage.firstCodeBlockMatchesSnapshot(page, 'code-ai-codeblock-desktop.png');
  });
});

// ─── Article Navigation ───────────────────────────────────────────────────────

test('Code & AI detalle: el botón volver apunta a /code-ai con el texto correcto', { tag: ['@test', '@code_ai'] }, async ({ page }) => {
  await test.step('When: el usuario navega al detalle del artículo del portfolio', async () => {
    await codeAiPage.navigateToPortfolioArticle(page);
  });

  await test.step('Then: el botón volver apunta a /code-ai', async () => {
    await codeAiPage.backButtonPointsToCodeAi(page);
  });

  await test.step('And: el texto del botón volver es correcto', async () => {
    await codeAiPage.backButtonHasCorrectText(page);
  });
});

test('Code & AI detalle: el botón volver navega de vuelta a /code-ai', { tag: ['@test', '@code_ai'] }, async ({ page }) => {
  await test.step('Given: estoy en el detalle del artículo del portfolio', async () => {
    await codeAiPage.navigateToPortfolioArticle(page);
  });

  await test.step('When: hago click en el botón volver', async () => {
    await codeAiPage.clickBackButton(page);
  });

  await test.step('Then: vuelvo a la página Code & AI', async () => {
    await codeAiPage.titleIsCorrect(page);
  });
});

test('Code & AI visual: navegación del artículo en desktop', { tag: ['@test', '@code_ai', '@styles'] }, async ({ page }) => {
  await test.step('When: el usuario navega al detalle del artículo del portfolio', async () => {
    await codeAiPage.navigateToPortfolioArticle(page);
  });

  await test.step('Then: la barra de navegación del artículo coincide con el snapshot', async () => {
    await codeAiPage.articleNavMatchesSnapshot(page, 'code-ai-article-nav-desktop.png');
  });
});

// ─── 404 ──────────────────────────────────────────────────────────────────────

test('Code & AI: devuelve 404 para un artículo inexistente', { tag: ['@test', '@code_ai'] }, async ({ page }) => {
  await test.step('When: el usuario navega a un artículo inexistente', async () => {
    await codeAiPage.notFoundArticleReturns404(page);
  });
});

// ─── Visual Regression ────────────────────────────────────────────────────────

test('Code & AI visual: cabecera y grid en desktop', { tag: ['@test', '@code_ai', '@styles'] }, async ({ page }) => {
  await test.step('When: el usuario navega a la página Code & AI', async () => {
    await codeAiPage.navigateToCodeAi(page);
  });

  await test.step('Then: la cabecera coincide con el snapshot', async () => {
    await codeAiPage.codeAiHeaderMatchesSnapshot(page, 'code-ai-header-desktop.png');
  });

  await test.step('Then: la primera card de artículo coincide con el snapshot', async () => {
    await codeAiPage.firstArticleCardMatchesSnapshot(page, 'code-ai-first-card-desktop.png');
  });

  await test.step('Then: la última card de artículo coincide con el snapshot', async () => {
    await codeAiPage.lastArticleCardMatchesSnapshot(page, 'code-ai-last-card-desktop.png');
  });
});
