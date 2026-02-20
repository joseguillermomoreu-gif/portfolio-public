import { test, expect, type Page } from '@playwright/test';
import { codeAiLocators, navigateToCodeAi, getArticleCount } from '@components/code-ai';

const VIEWPORTS = {
  desktop: { width: 1920, height: 1080 },
  mobile: { width: 375, height: 667 },
} as const;

async function navigateAndWait(page: Page, url: string): Promise<void> {
  await page.goto(url);
  // eslint-disable-next-line playwright/no-networkidle
  await page.waitForLoadState('networkidle');
}

// ─── Article List ─────────────────────────────────────────────────────────────

test.describe('Code & AI - Article List', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToCodeAi(page);
  });

  test('should load with correct title', async ({ page }) => {
    await test.step('Then the page title contains Code & AI and owner name', async () => {
      await expect(page).toHaveTitle(/Code & AI.*José Moreu Peso/i);
    });
  });

  test('should display at least one article card', async ({ page }) => {
    await test.step('Then at least one article card is rendered', async () => {
      const count = await getArticleCount(page);
      expect(count).toBeGreaterThan(0);
    });
  });

  test('should have links to article detail pages', async ({ page }) => {
    await test.step('Then a link to the portfolio article detail page is visible', async () => {
      const articleLink = page.locator('a[href*="/code-ai/como-construi-este-portfolio"]').first();
      await expect(articleLink).toBeVisible();
    });
  });
});

test.describe('Code & AI - Navigation', () => {
  test('should navigate from list to article detail', async ({ page }) => {
    await test.step('Given I am on the Code & AI listing page', async () => {
      await page.goto('/code-ai');
    });

    await test.step('When I click on the portfolio article link', async () => {
      const articleLink = page.locator('a[href*="/code-ai/como-construi-este-portfolio"]').first();
      await articleLink.click();
    });

    await test.step('Then I land on the article detail page with the correct title', async () => {
      await expect(page).toHaveURL(/.*\/code-ai\/como-construi-este-portfolio/);
      await expect(page).toHaveTitle(/Cómo construí este portfolio/i);
    });
  });
});

test.describe('Code & AI - 404 Error Handling', () => {
  test('should return 404 for non-existent article', async ({ page }) => {
    const response = await page.goto('/code-ai/non-existent-article', { waitUntil: 'domcontentloaded' });

    await test.step('Then the server responds with 404', async () => {
      expect(response?.status()).toBe(404);
    });
  });
});

// ─── Article Detail ───────────────────────────────────────────────────────────

test.describe('Code & AI - Article Detail', () => {
  test('should load portfolio article with correct title', async ({ page }) => {
    await page.goto('/code-ai/como-construi-este-portfolio');

    await test.step('Then the page title matches the article', async () => {
      await expect(page).toHaveTitle(/Cómo construí este portfolio/i);
    });
  });

  test('should display published/updated dates on detail page', async ({ page }) => {
    await page.goto('/code-ai/como-construi-este-portfolio');

    await test.step('Then the article shows a publication or update date', async () => {
      const bodyText = await page.locator('body').textContent() ?? '';
      expect(bodyText).toMatch(/publicado|published|actualizado|updated/i);
    });
  });

  test('should have paragraph structure in article content', async ({ page }) => {
    await page.goto('/code-ai/como-construi-este-portfolio');

    await test.step('Then the article body contains at least one paragraph', async () => {
      const paragraphs = page.locator('p');
      expect(await paragraphs.count()).toBeGreaterThan(0);
    });
  });

  test('should load automatizando-e2e-con-ia article', async ({ page }) => {
    await page.goto('/code-ai/automatizando-e2e-con-ia');

    await test.step('Then the page title matches the PPIA article', async () => {
      await expect(page).toHaveTitle(/PPIA|Playwright Page Inspector/i);
    });
  });
});

// ─── Visual Regression ────────────────────────────────────────────────────────

test.describe('Code & AI - Visual', () => {
  test.describe('Desktop', () => {
    test('Header', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.desktop);
      await navigateAndWait(page, '/code-ai');
      const { codeAiHeader } = codeAiLocators(page);
      await expect(codeAiHeader).toHaveScreenshot('code-ai-header-desktop.png', { animations: 'disabled' });
    });

    test('Articles Grid', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.desktop);
      await navigateAndWait(page, '/code-ai');
      const { articlesGrid } = codeAiLocators(page);
      await expect(articlesGrid).toHaveScreenshot('code-ai-grid-desktop.png', { animations: 'disabled' });
    });
  });

  test.describe('Mobile', () => {
    test('Header', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.mobile);
      await navigateAndWait(page, '/code-ai');
      const { codeAiHeader } = codeAiLocators(page);
      await expect(codeAiHeader).toHaveScreenshot('code-ai-header-mobile.png', { animations: 'disabled' });
    });

    test('Articles Grid', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.mobile);
      await navigateAndWait(page, '/code-ai');
      const { articlesGrid } = codeAiLocators(page);
      await expect(articlesGrid).toHaveScreenshot('code-ai-grid-mobile.png', { animations: 'disabled' });
    });
  });
});
