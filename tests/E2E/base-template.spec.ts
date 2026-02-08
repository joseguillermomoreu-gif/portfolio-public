import { test, expect } from '@playwright/test';

/**
 * Base Template E2E Tests
 * Tests for base.html.twig functionality:
 * - Theme toggle (light/dark mode)
 * - Navigation header
 * - Footer
 * - Accessibility
 */

test.describe('Base Template - Header & Navigation', () => {

  test('should display header with logo', async ({ page }) => {
    await page.goto(`/`);

    const logo = page.locator('.logo');
    await expect(logo).toBeVisible();
    await expect(logo).toHaveText('José Moreu Peso');
  });

  test('should have navigation links', async ({ page }) => {
    await page.goto(`/`);

    const navLinks = page.locator('.nav-links a');
    await expect(navLinks).toHaveCount(5);

    // Verify all navigation links (v1.3.0 order)
    const expectedLinks = ['Home', 'CV', 'Code & AI', 'PPiA', 'Contacto'];
    for (let i = 0; i < expectedLinks.length; i++) {
      await expect(navLinks.nth(i)).toHaveText(expectedLinks[i]);
    }
  });

  test('should highlight active navigation link', async ({ page }) => {
    await page.goto(`/`);

    const activeLink = page.locator('.nav-link.active');
    await expect(activeLink).toBeVisible();
    await expect(activeLink).toHaveText('Home');
  });

  test('should have accessible navigation', async ({ page }) => {
    await page.goto(`/`);

    const nav = page.locator('nav[role="navigation"]');
    await expect(nav).toHaveAttribute('aria-label', 'Main navigation');
  });
});

test.describe('Base Template - Theme Toggle', () => {

  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto(`/`);
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('should start with light theme by default', async ({ page }) => {
    await page.goto(`/`);

    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-theme', 'light');
  });

  test('should have theme toggle button', async ({ page }) => {
    await page.goto(`/`);

    const themeToggle = page.locator('#theme-toggle');
    await expect(themeToggle).toBeVisible();
    await expect(themeToggle).toHaveAttribute('aria-label', /theme/i);
  });

  // TODO: Reimplementar tests de interacción con theme toggle (ver issue #72)
  // - Theme toggle on button click
  // - Theme icon changes
  // - Theme persistence in localStorage
  // - Aria-label updates on theme change
});

test.describe('Base Template - Footer', () => {

  test('should display footer', async ({ page }) => {
    await page.goto(`/`);

    const footer = page.locator('.site-footer');
    await expect(footer).toBeVisible();
  });

  test('should have social links in footer', async ({ page }) => {
    await page.goto(`/`);

    const socialLinks = page.locator('.footer-social a');

    // Verify at least one social link exists
    await expect(socialLinks.first()).toBeVisible();

    // Verify social links have proper attributes
    await expect(socialLinks.first()).toHaveAttribute('target', '_blank');
    await expect(socialLinks.first()).toHaveAttribute('rel', /noopener/);
  });

  test('should display version and author in footer', async ({ page }) => {
    await page.goto(`/`);

    // Verify version is displayed (any version format like v0.X.X)
    // v1.4.3: Updated selector to .footer-version
    const version = page.locator('.footer-version');
    await expect(version).toBeVisible();
    await expect(version).toContainText(/v\d+\.\d+\.\d+/);

    // Verify "Powered by" text exists
    // v1.4.3: Updated selector to .footer-powered
    const poweredBy = page.locator('.footer-powered');
    await expect(poweredBy).toContainText('José Guillermo Moreu');

    // v1.4.3: Copyright removed in footer redesign
    // Footer now shows: "Hecho con ♥ y PHP+Symfony" + "Powered by José Guillermo Moreu"
  });
});

test.describe('Base Template - SEO & Meta Tags', () => {

  test('should have proper meta tags', async ({ page }) => {
    await page.goto(`/`);

    // Verify meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /.+/);

    // Verify meta keywords
    const metaKeywords = page.locator('meta[name="keywords"]');
    await expect(metaKeywords).toHaveAttribute('content', /.+/);

    // Verify canonical link
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', /josemoreupeso\.es/);
  });

  test('should have Open Graph meta tags', async ({ page }) => {
    await page.goto(`/`);

    // OG tags
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'website');
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /https:\/\/.+/);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', /josemoreupeso\.es/);
  });

  test('should have Twitter Card meta tags', async ({ page }) => {
    await page.goto(`/`);

    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
    await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[name="twitter:description"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute('content', /https:\/\/.+/);
  });
});
