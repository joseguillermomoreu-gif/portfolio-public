import { Page, Locator } from '@playwright/test';
import * as selectors from './selectors';

export function codeAiLocators(page: Page) {
  return {
    heading: page.locator(selectors.heading),
    articleCards: page.locator(selectors.articleCards),
    mainContent: page.locator(selectors.mainContent),
    codeAiHeader: page.locator(selectors.codeAiHeader),
    articlesGrid: page.locator(selectors.articlesGrid),
  };
}

export async function navigateToCodeAi(page: Page): Promise<void> {
  await page.goto('/code-ai');
  await page.waitForLoadState('domcontentloaded');
}

export async function getArticleCount(page: Page): Promise<number> {
  return await page.locator(selectors.articleCards).count();
}

export function getPortfolioArticleLink(page: Page): Locator {
  return page.locator(selectors.portfolioArticleLink).first();
}

export function getArticleContent(page: Page): Locator {
  return page.locator(selectors.articleContent);
}

export function getArticleParagraphs(page: Page): Locator {
  return page.locator(selectors.articleParagraph);
}
