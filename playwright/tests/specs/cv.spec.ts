import { test, expect } from '@playwright/test';
import { CvPage } from '@pages';

test.describe('CV Page', () => {
  let cvPage: CvPage;

  test.beforeEach(async ({ page }) => {
    cvPage = new CvPage(page);
    await cvPage.navigate();
  });

  test('should display CV page with correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/CV.*José Moreu/i);
  });

  test('should display main heading with CV/Currículum', async () => {
    await expect(cvPage.heading).toContainText(/Currículum|CV/i);
  });

  test('should display PDF download link', async () => {
    await expect(cvPage.pdfLink).toBeVisible();
  });

  test('should display Senior Backend Developer title', async () => {
    const bodyText = await cvPage.getBodyText();
    expect(bodyText).toContain('Senior Backend Developer');
  });

  test('should display owner name', async () => {
    const bodyText = await cvPage.getBodyText();
    expect(bodyText).toContain('José');
    expect(bodyText).toContain('Moreu');
  });

  test('should display tech info section (Cómo está hecho este CV)', async () => {
    const bodyText = await cvPage.getBodyText();
    expect(bodyText).toMatch(/cómo está hecho|tech info|html/i);
  });

  test('should display WIP generator button', async () => {
    const count = await cvPage.wipButton.count();
    if (count > 0) {
      await expect(cvPage.wipButton.first()).toBeVisible();
      const buttonText = await cvPage.wipButton.first().textContent();
      expect(buttonText).toMatch(/WIP|Genera tu CV/i);
    }
  });

  test('should mention benefits of HTML CV', async () => {
    const bodyText = await cvPage.getBodyText();
    const hasBenefits =
      bodyText.includes('responsive') ||
      bodyText.includes('PDF') ||
      bodyText.includes('HTML') ||
      bodyText.includes('dinámico');
    expect(hasBenefits).toBe(true);
  });

  test('should display days coding counter if present', async () => {
    const counter = cvPage.programmingCounter;
    if (await counter.count() > 0) {
      await expect(counter.first()).toBeVisible();
      const counterText = await counter.first().textContent();
      expect(counterText).toMatch(/\d+/);
      expect(counterText?.toLowerCase()).toMatch(/día|day/i);
    }
  });

  test('should be readable on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await cvPage.navigate();
    await expect(cvPage.heading).toBeVisible();
  });

  test('should be readable on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await cvPage.navigate();
    await expect(cvPage.heading).toBeVisible();
  });
});
