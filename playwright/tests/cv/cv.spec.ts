import { test, expect, type Page } from '@playwright/test';
import { cvLocators, navigateToCv } from '@components/cv';

const VIEWPORTS = {
  desktop: { width: 1920, height: 1080 },
  mobile: { width: 375, height: 667 },
} as const;

async function navigateAndWait(page: Page, url: string): Promise<void> {
  await page.goto(url);
  // eslint-disable-next-line playwright/no-networkidle
  await page.waitForLoadState('networkidle');
}

test.describe('CV - Smoke & Content', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToCv(page);
  });

  test('should load CV page with correct title', async ({ page }) => {
    await test.step('Then the page title contains CV and owner name', async () => {
      await expect(page).toHaveTitle(/CV.*José Moreu/i);
    });
  });

  test('should display PDF download link', async ({ page }) => {
    const { pdfLink } = cvLocators(page);

    await test.step('Then the PDF download link is visible', async () => {
      await expect(pdfLink).toBeVisible();
    });
  });
});

test.describe('CV - Visual', () => {
  test.describe('Desktop', () => {
    test('Header', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.desktop);
      await navigateAndWait(page, '/cv');
      const { cvHeader } = cvLocators(page);
      await expect(cvHeader).toHaveScreenshot('cv-header-desktop.png', { animations: 'disabled' });
    });

    test('PDF Download Card', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.desktop);
      await navigateAndWait(page, '/cv');
      const { pdfDownloadCard } = cvLocators(page);
      await expect(pdfDownloadCard).toHaveScreenshot('cv-pdf-card-desktop.png', { animations: 'disabled' });
    });

    test('Tech Info', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.desktop);
      await navigateAndWait(page, '/cv');
      const { cvTechInfo } = cvLocators(page);
      await expect(cvTechInfo).toHaveScreenshot('cv-tech-info-desktop.png', { animations: 'disabled' });
    });

    test('Note', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.desktop);
      await navigateAndWait(page, '/cv');
      const { cvNote } = cvLocators(page);
      await expect(cvNote).toHaveScreenshot('cv-note-desktop.png', { animations: 'disabled' });
    });
  });

  test.describe('Mobile', () => {
    test('Header', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.mobile);
      await navigateAndWait(page, '/cv');
      const { cvHeader } = cvLocators(page);
      await expect(cvHeader).toHaveScreenshot('cv-header-mobile.png', { animations: 'disabled' });
    });

    test('PDF Download Card', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.mobile);
      await navigateAndWait(page, '/cv');
      const { pdfDownloadCard } = cvLocators(page);
      await expect(pdfDownloadCard).toHaveScreenshot('cv-pdf-card-mobile.png', { animations: 'disabled' });
    });

    test('Tech Info', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.mobile);
      await navigateAndWait(page, '/cv');
      const { cvTechInfo } = cvLocators(page);
      await expect(cvTechInfo).toHaveScreenshot('cv-tech-info-mobile.png', { animations: 'disabled' });
    });

    test('Note', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.mobile);
      await navigateAndWait(page, '/cv');
      const { cvNote } = cvLocators(page);
      await expect(cvNote).toHaveScreenshot('cv-note-mobile.png', { animations: 'disabled' });
    });
  });
});
