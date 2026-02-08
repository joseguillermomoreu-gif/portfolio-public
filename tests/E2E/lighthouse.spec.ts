import { test, expect } from '@playwright/test';

test.describe('Lighthouse Performance & Best Practices', () => {
  const baseURL = 'https://josemoreupeso.es';

  test('homepage should load quickly', async ({ page }) => {
    const startTime = Date.now();
    await page.goto(`${baseURL}/`);
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;

    // Target: < 3 seconds for full page load
    expect(loadTime).toBeLessThan(3000);
  });

  test('critical CSS should be loaded', async ({ page }) => {
    await page.goto(`${baseURL}/`);

    // Verify main.css is loaded
    const cssLoaded = await page.locator('link[href*="main.css"]').count();
    expect(cssLoaded).toBeGreaterThan(0);
  });

  test('page should have single h1 for accessibility', async ({ page }) => {
    await page.goto(`${baseURL}/`);

    // Accessibility: exactly one h1 per page
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);
  });

  test('all images should have alt text', async ({ page }) => {
    await page.goto(`${baseURL}/`);

    const images = page.locator('img');
    const count = await images.count();

    // Check each image has alt attribute
    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });

  test('external links should have security attributes', async ({ page }) => {
    await page.goto(`${baseURL}/`);

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
    await page.goto(`${baseURL}/`);

    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveCount(1);

    const content = await metaDescription.getAttribute('content');
    expect(content).toBeTruthy();
    expect(content!.length).toBeGreaterThan(50); // Meaningful description
  });

  test('page should have canonical URL', async ({ page }) => {
    await page.goto(`${baseURL}/`);

    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveCount(1);
  });

  test('static assets should be cacheable', async ({ page }) => {
    const response = await page.goto(`${baseURL}/css/main.css`);

    if (response) {
      const cacheControl = response.headers()['cache-control'];
      // Should have some caching strategy
      expect(cacheControl).toBeTruthy();
    }
  });

  test('all main pages should load successfully', async ({ page }) => {
    const pages = ['/', '/cv', '/contacto', '/code-ai'];

    for (const path of pages) {
      const response = await page.goto(`${baseURL}${path}`);
      expect(response?.status()).toBe(200);
    }
  });
});
