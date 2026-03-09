import { test } from '@playwright/test';
import * as codeAiPage from '@components/code-ai';
import * as headerComponent from '@components/header';

test('Code & AI visual: cabecera y grid en mobile', { tag: ['@test', '@code_ai', '@styles'] }, async ({ page }) => {
  await test.step('When: el usuario navega a la página Code & AI', async () => {
    await codeAiPage.navigateToCodeAi(page);
  });

  await test.step('Then: la cabecera coincide con el snapshot', async () => {
    await codeAiPage.codeAiHeaderMatchesSnapshot(page, 'code-ai-header-mobile.png');
  });

  await test.step('And: se oculta el header para el snapshot', async () => {
    await headerComponent.hideHeader(page);
  });

  await test.step('Then: la primera card de artículo coincide con el snapshot', async () => {
    await codeAiPage.firstArticleCardMatchesSnapshot(page, 'code-ai-first-card-mobile.png');
  });

  await test.step('Then: la última card de artículo coincide con el snapshot', async () => {
    await codeAiPage.lastArticleCardMatchesSnapshot(page, 'code-ai-last-card-mobile.png');
  });
});
