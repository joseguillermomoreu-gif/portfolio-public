import { test, expect } from '@playwright/test';

test.describe('PortfolioController E2E Tests', () => {
  const baseURL = 'https://josemoreupeso.es';

  test.describe('Homepage - Route: /', () => {
    test('should respond with 200 OK', async ({ page }) => {
      const response = await page.goto(`${baseURL}/`);
      expect(response?.status()).toBe(200);
    });

    test('should display portfolio owner name', async ({ page }) => {
      await page.goto(`${baseURL}/`);
      await expect(page).toHaveTitle(/José Moreu Peso/);
      // Verify name appears in the page content
      await expect(page.locator('body')).toContainText('José Moreu Peso');
    });

    test('should display skills section', async ({ page }) => {
      await page.goto(`${baseURL}/`);
      // Verify skills are present (from portfolio.json)
      const pageContent = await page.locator('body').textContent();
      expect(pageContent).toContain('PHP');
    });

    test('should display social networks', async ({ page }) => {
      await page.goto(`${baseURL}/`);
      // Verify GitHub link is present (use .first() to handle multiple matches)
      const githubLink = page.locator('a[href*="github.com"]').first();
      await expect(githubLink).toBeVisible();
    });
  });

  test.describe('CV Page - Route: /cv', () => {
    test('should respond with 200 OK', async ({ page }) => {
      const response = await page.goto(`${baseURL}/cv`);
      expect(response?.status()).toBe(200);
    });

    test('should display CV page title', async ({ page }) => {
      await page.goto(`${baseURL}/cv`);
      await expect(page).toHaveTitle(/CV.*José Moreu Peso/i);
    });

    test('should display professional experience section', async ({ page }) => {
      await page.goto(`${baseURL}/cv`);
      // CV data should contain work experience
      const pageContent = await page.locator('body').textContent();
      // Verify typical CV sections are present
      expect(pageContent?.toLowerCase()).toMatch(/experiencia|experience|trabajo|work/);
    });

    test('should have link to download PDF CV', async ({ page }) => {
      await page.goto(`${baseURL}/cv`);
      // Verify PDF download link exists
      const pdfLink = page.locator('a[href*=".pdf"]');
      await expect(pdfLink).toBeVisible();
    });
  });

  test.describe('Contact Page - Route: /contacto', () => {
    test('should respond with 200 OK', async ({ page }) => {
      const response = await page.goto(`${baseURL}/contacto`);
      expect(response?.status()).toBe(200);
    });

    test('should display contact page title', async ({ page }) => {
      await page.goto(`${baseURL}/contacto`);
      await expect(page).toHaveTitle(/Contacto.*José Moreu Peso/i);
    });

    test('should display contact email', async ({ page }) => {
      await page.goto(`${baseURL}/contacto`);
      await expect(page.locator('body')).toContainText('joseguillermomoreu@gmail.com');
    });

    test('should display social media links', async ({ page }) => {
      await page.goto(`${baseURL}/contacto`);
      // Verify social links are present (use .first() to handle multiple matches)
      const githubLink = page.locator('a[href*="github.com"]').first();
      await expect(githubLink).toBeVisible();
    });
  });

  test.describe('PPiA Page - Route: /ppia', () => {
    test('should respond with 200 OK', async ({ page }) => {
      const response = await page.goto(`${baseURL}/ppia`);
      expect(response?.status()).toBe(200);
    });

    test('should display PPiA page title', async ({ page }) => {
      await page.goto(`${baseURL}/ppia`);
      await expect(page).toHaveTitle(/PPiA|Prompting Pragmático para Ingeniería Ágil/i);
    });

    test('should contain PPiA content', async ({ page }) => {
      await page.goto(`${baseURL}/ppia`);
      const pageContent = await page.locator('body').textContent();
      // Verify PPiA specific content is present
      expect(pageContent?.toLowerCase()).toMatch(/ppia|prompting|pragmático/);
    });
  });

  test.describe('Navigation and Integration', () => {
    test('should navigate from homepage to CV page', async ({ page }) => {
      await page.goto(`${baseURL}/`);

      // Click on CV link (assuming it exists in navigation)
      const cvLink = page.locator('a[href="/cv"]').first();
      await cvLink.click();

      // Verify we're on CV page
      await expect(page).toHaveURL(`${baseURL}/cv`);
      await expect(page).toHaveTitle(/CV/i);
    });

    test('should navigate from homepage to contact page', async ({ page }) => {
      await page.goto(`${baseURL}/`);

      // Click on contact link
      const contactLink = page.locator('a[href="/contacto"]').first();
      await contactLink.click();

      // Verify we're on contact page
      await expect(page).toHaveURL(`${baseURL}/contacto`);
      await expect(page).toHaveTitle(/Contacto/i);
    });

    test('should have consistent header across all pages', async ({ page }) => {
      // Verify header is present on all main pages
      const pages = ['/', '/cv', '/contacto'];

      for (const path of pages) {
        await page.goto(`${baseURL}${path}`);
        // Assuming there's a navigation header with the owner's name
        await expect(page.locator('body')).toContainText('José Moreu Peso');
      }
    });
  });
});
