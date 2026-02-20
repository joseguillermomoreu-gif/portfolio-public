import { test, expect } from '@playwright/test';
import { cvLocators, navigateToCv } from '@components/cv';

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

// ─── Visual Regression ────────────────────────────────────────────────────────

test.describe('CV - Visual', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/cv');
    // eslint-disable-next-line playwright/no-networkidle
    await page.waitForLoadState('networkidle');
  });

  test('CV - Header', async ({ page }) => {
    const { cvHeader } = cvLocators(page);
    await expect(cvHeader).toHaveScreenshot('cv-header-desktop.png', { animations: 'disabled' });
  });

  test('CV - PDF Download Card', async ({ page }) => {
    const { pdfDownloadCard } = cvLocators(page);
    await expect(pdfDownloadCard).toHaveScreenshot('cv-pdf-card-desktop.png', { animations: 'disabled' });
  });

  test('CV - Tech Info', async ({ page }) => {
    const { cvTechInfo } = cvLocators(page);
    await expect(cvTechInfo).toHaveScreenshot('cv-tech-info-desktop.png', { animations: 'disabled' });
  });

  test('CV - Note', async ({ page }) => {
    const { cvNote } = cvLocators(page);
    await expect(cvNote).toHaveScreenshot('cv-note-desktop.png', { animations: 'disabled' });
  });
});
