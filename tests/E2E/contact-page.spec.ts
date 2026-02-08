import { test, expect } from '@playwright/test';

test.describe('Contact Page - Smoke Tests', () => {

  test('should display contact page with correct title', async ({ page }) => {
    await page.goto(`/contacto`);

    // Verify page loads
    await expect(page).toHaveTitle(/Contacto.*José Moreu/i);
  });

  test('should display main heading', async ({ page }) => {
    await page.goto(`/contacto`);

    // Verify main heading
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should display email link', async ({ page }) => {
    await page.goto(`/contacto`);

    // Verify email link (mailto:)
    // v1.4.3: Scoped to contact-card to avoid footer email
    const emailLink = page.locator('.contact-card a[href^="mailto:"], .contact-item a[href^="mailto:"]').first();
    await expect(emailLink).toBeVisible();

    const href = await emailLink.getAttribute('href');
    expect(href).toContain('joseguillermomoreu@gmail.com');
  });

  test('should display social network links', async ({ page }) => {
    await page.goto(`/contacto`);

    // Verify GitHub link
    const githubLink = page.locator('a[href*="github.com"]');
    await expect(githubLink.first()).toBeVisible();

    // Verify LinkedIn link
    const linkedinLink = page.locator('a[href*="linkedin.com"]');
    await expect(linkedinLink.first()).toBeVisible();

    // Verify Instagram link
    const instagramLink = page.locator('a[href*="instagram.com"]');
    await expect(instagramLink.first()).toBeVisible();
  });

  test('social links should have security attributes', async ({ page }) => {
    await page.goto(`/contacto`);

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

  test('should display contact methods', async ({ page }) => {
    await page.goto(`/contacto`);

    const pageContent = await page.locator('body').textContent();

    // Verify contact information is present
    expect(pageContent).toMatch(/email|correo|contacto/i);
  });

  test('should have proper spacing in social section', async ({ page }) => {
    await page.goto(`/contacto`);

    // Verify social section heading exists
    const socialHeading = page.locator('h3').filter({ hasText: /encuéntrame|redes/i });
    await expect(socialHeading).toBeVisible();

    // Verify social buttons container exists after heading
    const socialButtons = page.locator('.social-buttons, [class*="social"]').first();
    await expect(socialButtons).toBeVisible();
  });

  test('should be responsive', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(`/contacto`);

    await expect(page.locator('h1')).toBeVisible();
    // v1.4.3: Scoped to avoid footer email
    await expect(page.locator('.contact-card a[href^="mailto:"], .contact-item a[href^="mailto:"]').first()).toBeVisible();

    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.locator('h1')).toBeVisible();
  });
});
