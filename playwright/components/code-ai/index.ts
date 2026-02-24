import { Page, expect } from '@playwright/test';
import * as selectors from './selectors';

export async function navigateToCodeAi(page: Page): Promise<void> {
  await page.goto(selectors.route);
  await page.waitForLoadState('domcontentloaded');
  await page.locator(selectors.heading).waitFor({ state: 'visible' });
}

export async function navigateToPortfolioArticle(page: Page): Promise<void> {
  await page.goto(selectors.routePortfolioArticle);
  await page.waitForLoadState('domcontentloaded');
}

export async function navigateToPpiaArticle(page: Page): Promise<void> {
  await page.goto(selectors.routePpiaArticle);
  await page.waitForLoadState('domcontentloaded');
}

export async function titleIsCorrect(page: Page): Promise<void> {
  await expect(page).toHaveTitle(/Code & AI.*José Moreu Peso/i);
}

export async function portfolioArticleIsLoaded(page: Page): Promise<void> {
  await expect(page).toHaveURL(/.*\/code-ai\/como-construi-este-portfolio/);
  await expect(page).toHaveTitle(/Cómo construí este portfolio/i);
}

export async function ppiaArticleIsLoaded(page: Page): Promise<void> {
  await expect(page).toHaveTitle(/PPIA|Playwright Page Inspector/i);
}

export async function notFoundArticleReturns404(page: Page): Promise<void> {
  const response = await page.goto(selectors.routeNotFoundArticle, { waitUntil: 'domcontentloaded' });
  expect(response?.status()).toBe(404);
}

export async function hasAtLeastOneArticle(page: Page): Promise<void> {
  expect(await page.locator(selectors.articleCards).count()).toBeGreaterThan(0);
}

export async function portfolioArticleLinkIsVisible(page: Page): Promise<void> {
  await expect(page.locator(selectors.portfolioArticleLink).first()).toBeVisible();
}

export async function clickPortfolioArticleLink(page: Page): Promise<void> {
  await page.locator(selectors.portfolioArticleLink).first().click();
}

export async function articleBodyContainsDateMetadata(page: Page): Promise<void> {
  const bodyText = await page.locator(selectors.articleContent).textContent() ?? '';
  expect(bodyText).toMatch(/publicado|published|actualizado|updated/i);
}

export async function articleHasParagraphs(page: Page): Promise<void> {
  expect(await page.locator(selectors.articleParagraph).count()).toBeGreaterThan(0);
}

export async function codeAiHeaderMatchesSnapshot(page: Page, snapshotName: string): Promise<void> {
  await expect(page.locator(selectors.codeAiHeader)).toHaveScreenshot(snapshotName, { animations: 'disabled' });
}

export async function articlesGridMatchesSnapshot(page: Page, snapshotName: string): Promise<void> {
  await expect(page.locator(selectors.articlesGrid)).toHaveScreenshot(snapshotName, { animations: 'disabled' });
}
