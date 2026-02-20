import { test, expect, type Page } from '@playwright/test';
import { footerLocators, scrollToFooter, footerDynamicMasks } from '@components/footer';

const VIEWPORTS = {
  desktop: { width: 1920, height: 1080 },
  mobile: { width: 375, height: 667 },
} as const;

async function navigateAndWait(page: Page, url: string): Promise<void> {
  await page.goto(url);
  // eslint-disable-next-line playwright/no-networkidle
  await page.waitForLoadState('networkidle');
}

test.describe('Footer - Structure', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display social links with security attributes', async ({ page }) => {
    const { socialLinks } = footerLocators(page);

    await test.step('Then social links have target="_blank" and rel="noopener"', async () => {
      await expect(socialLinks.first()).toBeVisible();
      await expect(socialLinks.first()).toHaveAttribute('target', '_blank');
      await expect(socialLinks.first()).toHaveAttribute('rel', /noopener/);
    });
  });

  test('should have GitHub profile link', async ({ page }) => {
    const { container } = footerLocators(page);

    await test.step('Then the GitHub profile link is visible and opens in a new tab', async () => {
      const githubLink = container.locator('a[href="https://github.com/joseguillermomoreu-gif"]');
      await expect(githubLink).toBeVisible();
      await expect(githubLink).toHaveAttribute('target', '_blank');
    });
  });
});

test.describe('Footer - Dynamic Content', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the current year', async ({ page }) => {
    const { year } = footerLocators(page);
    const currentYear = new Date().getFullYear().toString();

    await test.step('Then the footer shows the current year', async () => {
      await expect(year).toBeVisible();
      await expect(year).toContainText(currentYear);
    });
  });

  test('should display version with semver format', async ({ page }) => {
    const { version } = footerLocators(page);

    await test.step('Then the version element matches vX.Y.Z format', async () => {
      await expect(version).toBeVisible();
      const versionText = await version.textContent();
      expect(versionText).toMatch(/^v\d+\.\d+\.\d+$/);
    });
  });
});

test.describe('Footer - Visual', () => {
  test('Desktop', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.desktop);
    await navigateAndWait(page, '/');
    await scrollToFooter(page);
    const { container } = footerLocators(page);
    await expect(container).toHaveScreenshot('footer-desktop.png', { animations: 'disabled', mask: footerDynamicMasks(page) });
  });

  test('Mobile', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile);
    await navigateAndWait(page, '/');
    await scrollToFooter(page);
    const { container } = footerLocators(page);
    await expect(container).toHaveScreenshot('footer-mobile.png', { animations: 'disabled', mask: footerDynamicMasks(page) });
  });
});
