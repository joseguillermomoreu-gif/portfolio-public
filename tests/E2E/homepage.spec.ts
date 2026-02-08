import { test, expect } from '@playwright/test';

/**
 * Homepage Tests - josemoreupeso.es
 */
const baseURL = 'https://josemoreupeso.es';

test.describe('Homepage Smoke Test', () => {
  test('should serve homepage successfully', async ({ page }) => {
    // Act - Navigate to homepage
    const response = await page.goto(baseURL);

    // Assert - Verify response is OK
    expect(response?.status()).toBe(200);

    // Assert - Verify page loaded
    await expect(page).toHaveTitle(/José Moreu Peso/);
  });
});

test.describe('Quick Intro Section', () => {
  test('should display Quick Intro heading', async ({ page }) => {
    await page.goto(baseURL);

    const heading = page.locator('h3:has-text("Quick Intro"), h2:has-text("Quick Intro")');
    await expect(heading).toBeVisible();
  });

  test('should display headline statement', async ({ page }) => {
    await page.goto(baseURL);

    // Verify there's a prominent intro text
    const intro = page.locator('.quick-intro').first();
    await expect(intro).toBeVisible();

    const content = await intro.textContent();
    expect(content).toBeTruthy();
  });

  test('should display stats/highlights', async ({ page }) => {
    await page.goto(baseURL);

    // Verify experience mention (8+ años)
    const pageContent = await page.locator('body').textContent();
    expect(pageContent).toMatch(/8\+?\s*(años|years)/i);
  });

  test('should display current company/focus', async ({ page }) => {
    await page.goto(baseURL);

    const pageContent = await page.locator('body').textContent();

    // Verify mentions current work context
    expect(pageContent).toMatch(/Akkodis|El Confidencial|actual/i);
  });

  test('should be visually scannable', async ({ page }) => {
    await page.goto(baseURL);

    const quickIntro = page.locator('.quick-intro').first();
    await expect(quickIntro).toBeVisible();

    // Should have visual structure
    const elements = await quickIntro.locator('> *').count();
    expect(elements).toBeGreaterThanOrEqual(1);

    // Verify content is present
    const content = await quickIntro.textContent();
    expect(content).toBeTruthy();
  });
});
