import { test, expect } from '@playwright/test';
import { cvLocators } from '@components/cv';

test.beforeEach(async ({ page }) => {
  await page.goto('/cv');
  // eslint-disable-next-line playwright/no-networkidle
  await page.waitForLoadState('networkidle');
});

test('CV - Header', async ({ page }) => {
  const { cvHeader } = cvLocators(page);
  await expect(cvHeader).toHaveScreenshot('cv-header-mobile.png', { animations: 'disabled' });
});

test('CV - PDF Download Card', async ({ page }) => {
  const { pdfDownloadCard } = cvLocators(page);
  await expect(pdfDownloadCard).toHaveScreenshot('cv-pdf-card-mobile.png', { animations: 'disabled' });
});

test('CV - Tech Info', async ({ page }) => {
  const { cvTechInfo } = cvLocators(page);
  await expect(cvTechInfo).toHaveScreenshot('cv-tech-info-mobile.png', { animations: 'disabled' });
});

test('CV - Skills Carousel section is visible with title', async ({ page }) => {
  const { skillsCarouselSection } = cvLocators(page);
  await expect(skillsCarouselSection).toBeVisible();
  await expect(skillsCarouselSection).toContainText('Stack Técnico');
});
