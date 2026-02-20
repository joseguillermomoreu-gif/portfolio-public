import { test, expect } from '@playwright/test';
import { contactLocators, navigateToContact } from '@components/contact';

test.describe('Contact - Content & Links', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToContact(page);
  });

  test('should load contact page with correct title', async ({ page }) => {
    await test.step('Then the page title contains Contacto and owner name', async () => {
      await expect(page).toHaveTitle(/Contacto.*José Moreu/i);
    });
  });

  test('should display email link pointing to correct address', async ({ page }) => {
    const { emailLink } = contactLocators(page);

    await test.step('Then the email link is visible and points to the correct address', async () => {
      await expect(emailLink).toBeVisible();
      const href = await emailLink.getAttribute('href');
      expect(href).toContain('joseguillermomoreu@gmail.com');
    });
  });

  test('should display GitHub link pointing to user profile', async ({ page }) => {
    const { githubLink } = contactLocators(page);

    await test.step('Then the GitHub link points to the correct profile URL', async () => {
      await expect(githubLink).toBeVisible();
      await expect(githubLink).toHaveAttribute('href', 'https://github.com/joseguillermomoreu-gif');
    });
  });

  test('external links should have security attributes', async ({ page }) => {
    const { externalLinks } = contactLocators(page);

    await test.step('Then all external links have rel="noopener"', async () => {
      const count = await externalLinks.count();
      for (let i = 0; i < count; i++) {
        const rel = await externalLinks.nth(i).getAttribute('rel');
        expect(rel).toMatch(/noopener/);
      }
    });
  });
});

// ─── Visual Regression ────────────────────────────────────────────────────────

test.describe('Contact - Visual', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contacto');
    // eslint-disable-next-line playwright/no-networkidle
    await page.waitForLoadState('networkidle');
  });

  test('Contact - Header', async ({ page }) => {
    const { contactHeader } = contactLocators(page);
    await expect(contactHeader).toHaveScreenshot('contact-header-desktop.png', { animations: 'disabled' });
  });

  test('Contact - Contact Card', async ({ page }) => {
    const { contactCard } = contactLocators(page);
    await expect(contactCard).toHaveScreenshot('contact-card-desktop.png', { animations: 'disabled' });
  });

  test('Contact - Social Section', async ({ page }) => {
    const { socialSection } = contactLocators(page);
    await expect(socialSection).toHaveScreenshot('contact-social-desktop.png', { animations: 'disabled' });
  });
});
