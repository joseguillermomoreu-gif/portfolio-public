import { test, expect } from '@playwright/test';
import { CodeAiPage } from '@pages';

test.describe('Code & AI - Article List', () => {
  let codeAiPage: CodeAiPage;

  test.beforeEach(async ({ page }) => {
    codeAiPage = new CodeAiPage(page);
    await codeAiPage.navigate();
  });

  test('should load with 200 OK', async ({ page }) => {
    const response = await page.goto('/code-ai');
    expect(response?.status()).toBe(200);
  });

  test('should display Code & AI page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Code & AI.*José Moreu Peso/i);
  });

  test('should display at least one article card', async () => {
    const count = await codeAiPage.getArticleCount();
    expect(count).toBeGreaterThan(0);
  });

  test('should display first portfolio article', async () => {
    const bodyText = await codeAiPage.getBodyText();
    expect(bodyText).toContain('Cómo construí este portfolio');
  });

  test('should display article content (arquitectura hexagonal)', async () => {
    const bodyText = await codeAiPage.getBodyText();
    expect(bodyText).toContain('arquitectura hexagonal');
  });

  test('should have links to article detail pages', async ({ page }) => {
    const articleLink = page.locator('a[href*="/code-ai/como-construi-este-portfolio"]').first();
    await expect(articleLink).toBeVisible();
  });

  test('should display article tags', async () => {
    const bodyText = await codeAiPage.getBodyText();
    expect(bodyText).toMatch(/symfony|ddd|arquitectura|playwright|typescript/i);
  });

  test('should display published dates', async () => {
    const bodyText = await codeAiPage.getBodyText();
    expect(bodyText).toMatch(/\d{4}|\d{1,2}\/\d{1,2}|\d{1,2}-\d{1,2}/);
  });

  test('should display all published articles', async () => {
    const bodyText = await codeAiPage.getBodyText();
    expect(bodyText).toContain('Cómo construí este portfolio');
    expect(bodyText).toContain('PPIA');
  });
});

test.describe('Code & AI - Article Detail', () => {
  test('should load portfolio article with 200 OK', async ({ page }) => {
    const response = await page.goto('/code-ai/como-construi-este-portfolio');
    expect(response?.status()).toBe(200);
  });

  test('should display portfolio article title', async ({ page }) => {
    await page.goto('/code-ai/como-construi-este-portfolio');
    await expect(page).toHaveTitle(/Cómo construí este portfolio/i);
  });

  test('should display full article content', async ({ page }) => {
    const codeAiPage = new CodeAiPage(page);
    await page.goto('/code-ai/como-construi-este-portfolio');
    const bodyText = await codeAiPage.getBodyText();
    expect(bodyText).toContain('arquitectura hexagonal');
    expect(bodyText).toContain('TDD estricto');
    expect(bodyText).toContain('Claude Code');
  });

  test('should display article tags on detail page', async ({ page }) => {
    const codeAiPage = new CodeAiPage(page);
    await page.goto('/code-ai/como-construi-este-portfolio');
    const bodyText = await codeAiPage.getBodyText();
    expect(bodyText).toMatch(/symfony|ddd|arquitectura/i);
  });

  test('should display published/updated dates on detail page', async ({ page }) => {
    const codeAiPage = new CodeAiPage(page);
    await page.goto('/code-ai/como-construi-este-portfolio');
    const bodyText = await codeAiPage.getBodyText();
    expect(bodyText).toMatch(/publicado|published|actualizado|updated/i);
  });

  test('should load automatizando-e2e-con-ia article', async ({ page }) => {
    const response = await page.goto('/code-ai/automatizando-e2e-con-ia');
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(/PPIA|Playwright Page Inspector/i);
  });

  test('should have paragraph structure in article content', async ({ page }) => {
    await page.goto('/code-ai/como-construi-este-portfolio');
    const paragraphs = page.locator('p');
    const count = await paragraphs.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe('Code & AI - 404 Error Handling', () => {
  test('should return 404 for non-existent article', async ({ page }) => {
    const response = await page.goto('/code-ai/non-existent-article', {
      waitUntil: 'domcontentloaded',
    });
    expect(response?.status()).toBe(404);
  });

  test('should return 200 for /code-ai/ (article list)', async ({ page }) => {
    const response = await page.goto('/code-ai/', {
      waitUntil: 'domcontentloaded',
    });
    expect(response?.status()).toBe(200);
  });
});

test.describe('Code & AI - Navigation', () => {
  test('should navigate from list to article detail', async ({ page }) => {
    await page.goto('/code-ai');
    const articleLink = page.locator('a[href*="/code-ai/como-construi-este-portfolio"]').first();
    await articleLink.click();
    await expect(page).toHaveURL(/.*\/code-ai\/como-construi-este-portfolio/);
    await expect(page).toHaveTitle(/Cómo construí este portfolio/i);
  });

  test('should navigate from homepage to Code & AI via nav link', async ({ page }) => {
    await page.goto('/');
    const codeAiNavLink = page.locator('a[href="/code-ai"]').first();
    await codeAiNavLink.click();
    await expect(page).toHaveURL(`/code-ai`);
    await expect(page).toHaveTitle(/Code & AI/i);
  });

  test('should have consistent header across article pages', async ({ page }) => {
    const routes = [
      '/code-ai',
      '/code-ai/como-construi-este-portfolio',
      '/code-ai/automatizando-e2e-con-ia',
    ];
    for (const route of routes) {
      const codeAiPage = new CodeAiPage(page);
      await page.goto(route);
      const bodyText = await codeAiPage.getBodyText();
      expect(bodyText).toContain('José Moreu Peso');
    }
  });
});

test.describe('Code & AI - Optional Articles', () => {
  const optionalArticles = [
    { slug: 'ppia-migracion-python', pattern: /Python|TypeScript|migración/i },
    { slug: 'cicd-github-actions-portfolio', pattern: /CI\/CD|deployment|testing/i },
    { slug: 'ppia-testing-e2e-con-ia', pattern: /PPIA|Gherkin|Playwright/i },
    { slug: 'el-vibe-coding-llego', pattern: /Claude|IA|PPIA/i },
  ];

  for (const article of optionalArticles) {
    test(`should access ${article.slug} if published`, async ({ page }) => {
      const codeAiPage = new CodeAiPage(page);
      const response = await page.goto(`/code-ai/${article.slug}`, {
        waitUntil: 'domcontentloaded',
      });

      if (response?.status() === 200) {
        const bodyText = await codeAiPage.getBodyText();
        expect(bodyText).toMatch(article.pattern);
      }
    });
  }
});
