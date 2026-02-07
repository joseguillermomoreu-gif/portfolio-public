import { test, expect } from '@playwright/test';

/**
 * Basic Smoke Test - josemoreupeso.es
 *
 * Simple test to verify the website is being served correctly.
 * POM (Page Object Model) implementation will come in a future task.
 */
test.describe('Homepage Smoke Test', () => {
  test('should serve homepage successfully', async ({ page }) => {
    // Act - Navigate to homepage
    const response = await page.goto('https://josemoreupeso.es');

    // Assert - Verify response is OK
    expect(response?.status()).toBe(200);

    // Assert - Verify page loaded
    await expect(page).toHaveTitle(/José Moreu Peso/);
  });
});
