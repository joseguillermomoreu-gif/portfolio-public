import { test, expect } from '@playwright/test';
import {
  portfolioLocators,
  navigateToPortfolio,
  openModal,
  closeModalByButton,
  getModal,
} from '@components/portfolio';

test.beforeEach(async ({ page }) => {
  await page.goto('/portfolio');
  // eslint-disable-next-line playwright/no-networkidle
  await page.waitForLoadState('networkidle');
});

test('Portfolio - Header', async ({ page }) => {
  const { portfolioHeader } = portfolioLocators(page);
  await expect(portfolioHeader).toHaveScreenshot('portfolio-header-mobile.png', { animations: 'disabled' });
});

test('Portfolio - Keywords Section', async ({ page }) => {
  const { keywordsSection } = portfolioLocators(page);
  await expect(keywordsSection).toHaveScreenshot('portfolio-keywords-mobile.png', { animations: 'disabled' });
});

test('Portfolio mobile - modal opens and closes', async ({ page }) => {
  await navigateToPortfolio(page);

  await openModal(page, 'tdd');

  const modal = getModal(page, 'tdd');
  await expect(modal).toBeVisible();
  await expect(modal.locator('.modal-title')).toContainText('Test-Driven Development');

  await closeModalByButton(page);
  await expect(modal).toBeHidden();
});

test('Portfolio mobile - all 4 categories present', async ({ page }) => {
  const { keywordCategories } = portfolioLocators(page);
  await expect(keywordCategories).toHaveCount(4);
});
