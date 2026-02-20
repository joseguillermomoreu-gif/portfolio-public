import { Page } from '@playwright/test';
import { CodeAiSelectors } from './selectors';

export function codeAiLocators(page: Page) {
  return {
    heading: page.locator(CodeAiSelectors.heading),
    articleCards: page.locator(CodeAiSelectors.articleCards),
    mainContent: page.locator(CodeAiSelectors.mainContent),
    codeAiHeader: page.locator(CodeAiSelectors.codeAiHeader),
    articlesGrid: page.locator(CodeAiSelectors.articlesGrid),
  };
}

export async function navigateToCodeAi(page: Page): Promise<void> {
  await page.goto('/code-ai');
  await page.waitForLoadState('domcontentloaded');
}

export async function getArticleCount(page: Page): Promise<number> {
  return await page.locator(CodeAiSelectors.articleCards).count();
}
