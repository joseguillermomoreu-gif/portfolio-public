import { test, expect } from '@playwright/test';

test.describe('Lighthouse Performance & Best Practices', () => {

  test('homepage should load quickly', async ({ page }) => {
    const startTime = Date.now();
    await page.goto(`/`);
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;

    // Target: < 3 seconds for full page load
    expect(loadTime).toBeLessThan(3000);
  });

  test('critical CSS should be loaded', async ({ page }) => {
    await page.goto(`/`);

    // Verify main.css is loaded
    const cssLoaded = await page.locator('link[href*="main.css"]').count();
    expect(cssLoaded).toBeGreaterThan(0);
  });

  test('page should have single h1 for accessibility', async ({ page }) => {
    await page.goto(`/`);

    // Accessibility: exactly one h1 per page
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);
  });

  test('all images should have alt text', async ({ page }) => {
    await page.goto(`/`);

    const images = page.locator('img');
    const count = await images.count();

    // Check each image has alt attribute
    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });

  test('external links should have security attributes', async ({ page }) => {
    await page.goto(`/`);

    // Check external links have target="_blank" and rel="noopener"
    const externalLinks = page.locator('a[target="_blank"]');
    const count = await externalLinks.count();

    if (count > 0) {
      for (let i = 0; i < count; i++) {
        const rel = await externalLinks.nth(i).getAttribute('rel');
        expect(rel).toMatch(/noopener/);
      }
    }
  });

  test('page should have meta description for SEO', async ({ page }) => {
    await page.goto(`/`);

    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveCount(1);

    const content = await metaDescription.getAttribute('content');
    expect(content).toBeTruthy();
    expect(content!.length).toBeGreaterThan(50); // Meaningful description
  });

  test('page should have canonical URL', async ({ page }) => {
    await page.goto(`/`);

    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveCount(1);
  });

  test('static assets should be cacheable', async ({ page }) => {
    const response = await page.goto(`/css/main.css`);

    if (response) {
      const cacheControl = response.headers()['cache-control'];

      // In production (CI=true), cache headers should be present
      // In local dev (CI=false or undefined), PHP built-in server doesn't send cache headers
      if (process.env.CI === 'true') {
        expect(cacheControl).toBeTruthy();
      } else {
        // Local dev: just verify response was successful
        expect(response.status()).toBeLessThan(400);
      }
    }
  });

  test('all main pages should load successfully', async ({ page }) => {
    const pages = ['/', '/cv', '/contacto', '/code-ai'];

    for (const path of pages) {
      const response = await page.goto(`${path}`);
      expect(response?.status()).toBe(200);
    }
  });

  test('footer should display version number', async ({ page }) => {
    await page.goto(`/`);

    // Verify footer version is visible and has valid format
    const footerVersion = page.locator('.version, .footer-info .version, footer .version');
    await expect(footerVersion).toBeVisible();

    const versionText = await footerVersion.textContent();
    // Verify format: vX.X.X or X.X.X
    expect(versionText).toMatch(/v?\d+\.\d+\.\d+/);
  });
});
