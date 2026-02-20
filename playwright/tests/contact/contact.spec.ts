import { test, expect, type Page } from '@playwright/test';
import { contactLocators, navigateToContact } from '@components/contact';

const VIEWPORTS = {
  desktop: { width: 1920, height: 1080 },
  mobile: { width: 375, height: 667 },
} as const;

async function navigateAndWait(page: Page, url: string): Promise<void> {
  await page.goto(url);
  // eslint-disable-next-line playwright/no-networkidle
  await page.waitForLoadState('networkidle');
}

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
    await test.step('Then all external links have rel="noopener"', async () => {
      const externalLinks = page.locator('a[target="_blank"]');
      const count = await externalLinks.count();
      for (let i = 0; i < count; i++) {
        const rel = await externalLinks.nth(i).getAttribute('rel');
        expect(rel).toMatch(/noopener/);
      }
    });
  });
});

test.describe('Contact - Visual', () => {
  test.describe('Desktop', () => {
    test('Header', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.desktop);
      await navigateAndWait(page, '/contacto');
      const { contactHeader } = contactLocators(page);
      await expect(contactHeader).toHaveScreenshot('contact-header-desktop.png', { animations: 'disabled' });
    });

    test('Contact Card', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.desktop);
      await navigateAndWait(page, '/contacto');
      const { contactCard } = contactLocators(page);
      await expect(contactCard).toHaveScreenshot('contact-card-desktop.png', { animations: 'disabled' });
    });

    test('Social Section', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.desktop);
      await navigateAndWait(page, '/contacto');
      const { socialSection } = contactLocators(page);
      await expect(socialSection).toHaveScreenshot('contact-social-desktop.png', { animations: 'disabled' });
    });
  });

  test.describe('Mobile', () => {
    test('Header', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.mobile);
      await navigateAndWait(page, '/contacto');
      const { contactHeader } = contactLocators(page);
      await expect(contactHeader).toHaveScreenshot('contact-header-mobile.png', { animations: 'disabled' });
    });

    test('Contact Card', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.mobile);
      await navigateAndWait(page, '/contacto');
      const { contactCard } = contactLocators(page);
      await expect(contactCard).toHaveScreenshot('contact-card-mobile.png', { animations: 'disabled' });
    });

    test('Social Section', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.mobile);
      await navigateAndWait(page, '/contacto');
      const { socialSection } = contactLocators(page);
      await expect(socialSection).toHaveScreenshot('contact-social-mobile.png', { animations: 'disabled' });
    });
  });
});
