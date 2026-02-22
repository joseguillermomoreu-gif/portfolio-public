import { test, expect } from '@playwright/test';
import {
  portfolioLocators,
  navigateToPortfolio,
  openModal,
  closeModalByButton,
  closeModalByOverlay,
  closeModalByEsc,
  getModal,
} from '@components/portfolio';

// ─── Smoke & Content ──────────────────────────────────────────────────────────

test.describe('Portfolio - Smoke & Content', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToPortfolio(page);
  });

  test('should load portfolio page with correct title', async ({ page }) => {
    await test.step('Then the page title contains Portfolio and owner name', async () => {
      await expect(page).toHaveTitle(/Portfolio.*José Moreu Peso/i);
    });
  });

  test('should display 4 keyword categories', async ({ page }) => {
    const { keywordCategories } = portfolioLocators(page);

    await test.step('Then 4 category sections are rendered', async () => {
      await expect(keywordCategories).toHaveCount(4);
    });
  });

  test('should display all 16 keyword items', async ({ page }) => {
    const { keywordItems } = portfolioLocators(page);

    await test.step('Then exactly 16 keyword items are rendered', async () => {
      await expect(keywordItems).toHaveCount(16);
    });
  });

  test('should display arquitectura category with 4 keywords', async ({ page }) => {
    const { categoryArquitectura } = portfolioLocators(page);

    await test.step('Then Arquitectura has 4 keyword items', async () => {
      await expect(categoryArquitectura.locator('.keyword-item')).toHaveCount(4);
    });

    await test.step('Then Arquitectura category label is visible', async () => {
      await expect(categoryArquitectura.locator('.category-label')).toContainText('Arquitectura');
    });
  });

  test('should display testing category with 4 keywords', async ({ page }) => {
    const { categoryTesting } = portfolioLocators(page);

    await test.step('Then Testing has 4 keyword items', async () => {
      await expect(categoryTesting.locator('.keyword-item')).toHaveCount(4);
    });
  });
});

// ─── Modal Interaction ────────────────────────────────────────────────────────

test.describe('Portfolio - Modal Interaction', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToPortfolio(page);
  });

  test('clicking DDD keyword opens modal with title and body', async ({ page }) => {
    await test.step('When I click the DDD keyword', async () => {
      await openModal(page, 'ddd');
    });

    await test.step('Then the DDD modal is visible with title and content', async () => {
      const modal = getModal(page, 'ddd');
      await expect(modal).toBeVisible();
      await expect(modal.locator('.modal-title')).toContainText('Domain-Driven Design');
      await expect(modal.locator('.modal-body')).toContainText('DDD');
    });

    await test.step('Then the overlay is visible', async () => {
      const { modalOverlay } = portfolioLocators(page);
      await expect(modalOverlay).toBeVisible();
    });
  });

  test('clicking close button hides modal', async ({ page }) => {
    await test.step('Given the DDD modal is open', async () => {
      await openModal(page, 'ddd');
    });

    await test.step('When I click the close button', async () => {
      await closeModalByButton(page);
    });

    await test.step('Then the modal and overlay are hidden', async () => {
      const { modalOverlay } = portfolioLocators(page);
      await expect(modalOverlay).toBeHidden();
      await expect(getModal(page, 'ddd')).toBeHidden();
    });
  });

  test('clicking overlay closes modal', async ({ page }) => {
    await test.step('Given the Playwright modal is open', async () => {
      await openModal(page, 'playwright');
    });

    await test.step('When I click the overlay', async () => {
      await closeModalByOverlay(page);
    });

    await test.step('Then the modal is hidden', async () => {
      await expect(getModal(page, 'playwright')).toBeHidden();
    });
  });

  test('pressing ESC closes modal', async ({ page }) => {
    await test.step('Given the Docker modal is open', async () => {
      await openModal(page, 'docker');
    });

    await test.step('When I press Escape', async () => {
      await closeModalByEsc(page);
    });

    await test.step('Then the modal is hidden', async () => {
      await expect(getModal(page, 'docker')).toBeHidden();
    });
  });

  test('simpleicons modal shows brand image', async ({ page }) => {
    await test.step('When I open the Symfony modal', async () => {
      await openModal(page, 'symfony');
    });

    await test.step('Then the modal header shows a brand icon image', async () => {
      const modal = getModal(page, 'symfony');
      const icon = modal.locator('.modal-icon--brand');
      await expect(icon).toBeVisible();
      await expect(icon).toHaveAttribute('src', /simpleicons\.org\/symfony/);
    });
  });

  test('monogram modal shows monogram element', async ({ page }) => {
    await test.step('When I open the DDD modal', async () => {
      await openModal(page, 'ddd');
    });

    await test.step('Then the modal header shows a monogram', async () => {
      const modal = getModal(page, 'ddd');
      await expect(modal.locator('.modal-icon--monogram')).toBeVisible();
    });
  });
});

// ─── Visual Regression ────────────────────────────────────────────────────────

test.describe('Portfolio - Visual', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/portfolio');
    // eslint-disable-next-line playwright/no-networkidle
    await page.waitForLoadState('networkidle');
  });

  test('Portfolio - Header', async ({ page }) => {
    const { portfolioHeader } = portfolioLocators(page);
    await expect(portfolioHeader).toHaveScreenshot('portfolio-header-desktop.png', { animations: 'disabled' });
  });

  test('Portfolio - Keywords Section', async ({ page }) => {
    const { keywordsSection } = portfolioLocators(page);
    await expect(keywordsSection).toHaveScreenshot('portfolio-keywords-desktop.png', { animations: 'disabled' });
  });
});
