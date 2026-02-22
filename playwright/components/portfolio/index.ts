import { Page, Locator } from '@playwright/test';
import * as selectors from './selectors';

export function portfolioLocators(page: Page) {
  return {
    portfolioPage:        page.locator(selectors.portfolioPage),
    portfolioHeader:      page.locator(selectors.portfolioHeader),
    heading:              page.locator(selectors.heading),
    subtitle:             page.locator(selectors.subtitle),
    keywordsSection:      page.locator(selectors.keywordsSection),
    keywordCategories:    page.locator(selectors.keywordCategories),
    keywordItems:         page.locator(selectors.keywordItems),
    categoryArquitectura: page.locator(selectors.categoryArquitectura),
    categoryTesting:      page.locator(selectors.categoryTesting),
    categoryBackend:      page.locator(selectors.categoryBackend),
    categoryTooling:      page.locator(selectors.categoryTooling),
    modalOverlay:         page.locator(selectors.modalOverlay),
    modalClose:           page.locator('.modal:not(.hidden) .modal-close'),
    modalCard:            page.locator(selectors.modalCard),
    modalTitle:           page.locator(selectors.modalTitle),
    modalBody:            page.locator(selectors.modalBody),
  };
}

export async function navigateToPortfolio(page: Page): Promise<void> {
  await page.goto('/portfolio');
  await page.waitForLoadState('domcontentloaded');
}

export function getKeywordItem(page: Page, id: string): Locator {
  return page.locator(selectors.keywordById(id));
}

export function getModal(page: Page, id: string): Locator {
  return page.locator(selectors.modalById(id));
}

export async function openModal(page: Page, keywordId: string): Promise<void> {
  await page.locator(selectors.keywordById(keywordId)).click();
  await page.locator(selectors.modalById(keywordId)).waitFor({ state: 'visible' });
}

export async function closeModalByButton(page: Page): Promise<void> {
  // Target only the visible modal's close button (others have display:none)
  await page.locator('.modal:not(.hidden) .modal-close').click();
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
