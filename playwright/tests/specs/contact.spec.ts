import { test, expect } from '@playwright/test';
import { ContactPage } from '@pages';

test.describe('Contact Page', () => {
  let contactPage: ContactPage;

  test.beforeEach(async ({ page }) => {
    contactPage = new ContactPage(page);
    await contactPage.navigate();
  });

  test('should display contact page with correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Contacto.*José Moreu/i);
  });

  test('should display main heading', async () => {
    await expect(contactPage.heading).toBeVisible();
  });

  test('should display email link pointing to correct address', async () => {
    await expect(contactPage.emailLink).toBeVisible();
    const href = await contactPage.emailLink.getAttribute('href');
    expect(href).toContain('joseguillermomoreu@gmail.com');
  });

  test('should display GitHub link pointing to user profile', async () => {
    await expect(contactPage.githubLink).toBeVisible();
    await expect(contactPage.githubLink).toHaveAttribute('href', 'https://github.com/joseguillermomoreu-gif');
  });

  test('should display LinkedIn link', async () => {
    await expect(contactPage.linkedinLink).toBeVisible();
  });

  test('should display Instagram link', async ({ page }) => {
    const instagramLink = page.locator('a[href*="instagram.com"]');
    await expect(instagramLink.first()).toBeVisible();
  });

  test('external links should have security attributes', async ({ page }) => {
    await contactPage.navigate();
    const externalLinks = page.locator('a[target="_blank"]');
    const count = await externalLinks.count();
    for (let i = 0; i < count; i++) {
      const rel = await externalLinks.nth(i).getAttribute('rel');
      expect(rel).toMatch(/noopener/);
    }
  });

  test('should display social section heading', async ({ page }) => {
    const socialHeading = page.locator('h3').filter({ hasText: /encuéntrame|redes/i });
    await expect(socialHeading).toBeVisible();
  });

  test('should be readable on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await contactPage.navigate();
    await expect(contactPage.heading).toBeVisible();
    await expect(contactPage.emailLink).toBeVisible();
  });

  test('should be readable on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await contactPage.navigate();
    await expect(contactPage.heading).toBeVisible();
  });
});
