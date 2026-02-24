import { Page, expect } from '@playwright/test';
import * as selectors from './selectors';

export async function navigateToPortfolio(page: Page): Promise<void> {
  await page.goto(selectors.route);
  await page.waitForLoadState('domcontentloaded');
  await page.locator(selectors.heading).waitFor({ state: 'visible' });
}

export async function titleIsCorrect(page: Page): Promise<void> {
  await expect(page).toHaveTitle(/Portfolio.*José Moreu Peso/i);
}

export async function hasCategoryCount(page: Page, count: number): Promise<void> {
  await expect(page.locator(selectors.keywordCategories)).toHaveCount(count);
}

export async function hasKeywordCount(page: Page, count: number): Promise<void> {
  await expect(page.locator(selectors.keywordItems)).toHaveCount(count);
}

export async function categoryHasKeywordCount(page: Page, category: string, count: number): Promise<void> {
  await expect(
    page.locator(selectors.categoryByName(category)).locator(selectors.keywordItems)
  ).toHaveCount(count);
}

export async function categoryLabelContains(page: Page, category: string, text: string): Promise<void> {
  await expect(
    page.locator(selectors.categoryByName(category)).locator(selectors.categoryLabel)
  ).toContainText(text);
}

export async function openModal(page: Page, keywordId: string): Promise<void> {
  await page.locator(selectors.keywordById(keywordId)).click();
  await page.locator(selectors.modalById(keywordId)).waitFor({ state: 'visible' });
}

export async function closeModalByButton(page: Page): Promise<void> {
  // Target only the visible modal's close button (others have display:none)
  await page.locator(selectors.activeModalClose).click();
  await page.locator(selectors.modalOverlay).waitFor({ state: 'hidden' });
}

export async function closeModalByOverlay(page: Page): Promise<void> {
  // Click at viewport top-left — outside the centered modal card.
  // The click passes through .modal (pointer-events:none) and lands on #modal-overlay.
  await page.mouse.click(20, 20);
  await page.locator(selectors.modalOverlay).waitFor({ state: 'hidden' });
}

export async function closeModalByEsc(page: Page): Promise<void> {
  await page.keyboard.press('Escape');
  await page.locator(selectors.modalOverlay).waitFor({ state: 'hidden' });
}

export async function modalOverlayIsVisible(page: Page): Promise<void> {
  await expect(page.locator(selectors.modalOverlay)).toBeVisible();
}

export async function modalOverlayIsHidden(page: Page): Promise<void> {
  await expect(page.locator(selectors.modalOverlay)).toBeHidden();
}

export async function modalIsVisible(page: Page, id: string): Promise<void> {
  await expect(page.locator(selectors.modalById(id))).toBeVisible();
}

export async function modalIsHidden(page: Page, id: string): Promise<void> {
  await expect(page.locator(selectors.modalById(id))).toBeHidden();
}

export async function modalHasTitle(page: Page, id: string, text: string): Promise<void> {
  await expect(
    page.locator(selectors.modalById(id)).locator(selectors.modalTitle)
  ).toContainText(text);
}

export async function modalHasBody(page: Page, id: string, text: string): Promise<void> {
  await expect(
    page.locator(selectors.modalById(id)).locator(selectors.modalBody)
  ).toContainText(text);
}

export async function modalBrandIconIsVisible(page: Page, id: string, brandSlug: string): Promise<void> {
  const icon = page.locator(selectors.modalById(id)).locator(selectors.modalIconBrand);
  await expect(icon).toBeVisible();
  await expect(icon).toHaveAttribute('src', new RegExp(`simpleicons\\.org/${brandSlug}`));
}

export async function modalMonogramIsVisible(page: Page, id: string): Promise<void> {
  await expect(
    page.locator(selectors.modalById(id)).locator(selectors.modalIconMonogram)
  ).toBeVisible();
}

export async function portfolioHeaderMatchesSnapshot(page: Page, snapshotName: string): Promise<void> {
  await expect(page.locator(selectors.portfolioHeader)).toHaveScreenshot(snapshotName, { animations: 'disabled' });
}

export async function keywordsSectionMatchesSnapshot(page: Page, snapshotName: string): Promise<void> {
  await expect(page.locator(selectors.keywordsSection)).toHaveScreenshot(snapshotName, { animations: 'disabled' });
}
