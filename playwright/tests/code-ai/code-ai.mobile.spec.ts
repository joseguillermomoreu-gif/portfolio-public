import { test } from '@playwright/test';
import * as codeAiPage from '@components/code-ai';

test('Code & AI visual: cabecera y grid en mobile', { tag: ['@test', '@code_ai', '@styles'] }, async ({ page }) => {
  await test.step('When: el usuario navega a la página Code & AI', async () => {
    await codeAiPage.navigateToCodeAi(page);
  });

  await test.step('Then: la cabecera coincide con el snapshot', async () => {
    await codeAiPage.codeAiHeaderMatchesSnapshot(page, 'code-ai-header-mobile.png');
  });

  await test.step('Then: el grid de artículos coincide con el snapshot', async () => {
    await codeAiPage.articlesGridMatchesSnapshot(page, 'code-ai-grid-mobile.png');
  });
});
