import { test, expect } from '@playwright/test';

/**
 * Dark Mode Mobile Tests
 * Mobile devices (< 850px) use forced dark mode with no toggle
 * Desktop (>= 850px) allows theme switching
 */


// Mobile viewport size (iPhone 13)
const mobileViewport = { width: 390, height: 844 };

// Enable touch support for mobile tests
test.use({ hasTouch: true });

test.describe('Dark Mode - Mobile (Forced Dark)', () => {
  test.beforeEach(async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize(mobileViewport);

    // Clear localStorage and cache before each test
    await page.goto(`/`);
    await page.evaluate(() => localStorage.clear());
    // Hard reload to bypass cache
    await page.reload({ waitUntil: 'networkidle' });
  });

  test('should hide theme toggle button on mobile', async ({ page }) => {
    await page.goto(`/`);

    const themeToggle = page.locator('#theme-toggle');

    // Theme toggle should be hidden on mobile (display: none)
    await expect(themeToggle).toBeHidden();
  });

  test('should force dark mode on mobile', async ({ page }) => {
    await page.goto(`/`);

    const html = page.locator('html');

    // Mobile should always be dark mode
    await expect(html).toHaveAttribute('data-theme', 'dark');
  });

  test('should maintain dark mode on reload (mobile)', async ({ page }) => {
    await page.goto(`/`);

    // Verify initial dark theme
    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-theme', 'dark');

    // Reload page
    await page.reload();

    // Should still be dark theme
    await expect(html).toHaveAttribute('data-theme', 'dark');
  });

  test('should ignore localStorage theme on mobile', async ({ page }) => {
    await page.goto(`/`);

    // Try to set light theme in localStorage
    await page.evaluate(() => localStorage.setItem('theme', 'light'));

    // Reload page
    await page.reload();

    // Should still be dark theme (localStorage ignored on mobile)
    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-theme', 'dark');
  });

  test('should force dark mode in landscape orientation', async ({ page }) => {
    // Rotate to landscape (still < 768px width, so still mobile)
    await page.setViewportSize({ width: 844, height: 390 }); // iPhone 13 landscape

    await page.goto(`/`);

    const html = page.locator('html');

    // Should still force dark mode in landscape
    await expect(html).toHaveAttribute('data-theme', 'dark');

    // Toggle should be hidden
    const themeToggle = page.locator('#theme-toggle');
    await expect(themeToggle).toBeHidden();
  });
});

test.describe('Dark Mode - Tablet (Forced Dark)', () => {
  test('should force dark mode on tablets < 850px', async ({ page }) => {
    // Set tablet viewport (landscape mobile, < 850px width)
    await page.setViewportSize({ width: 844, height: 390 });

    await page.goto(`/`);
    await page.evaluate(() => localStorage.clear());

    const html = page.locator('html');
    const themeToggle = page.locator('#theme-toggle');

    // Should force dark mode (< 850px)
    await expect(html).toHaveAttribute('data-theme', 'dark');

    // Toggle should be hidden
    await expect(themeToggle).toBeHidden();
  });

  test('should allow theme toggle on tablets >= 850px', async ({ page }) => {
    // Set large tablet viewport (iPad, >= 850px width)
    await page.setViewportSize({ width: 1024, height: 768 });

    await page.goto(`/`);
    await page.evaluate(() => localStorage.clear());

    const html = page.locator('html');
    const themeToggle = page.locator('#theme-toggle');

    // Desktop behavior: light theme by default
    await expect(html).toHaveAttribute('data-theme', 'light');

    // Toggle should be visible
    await expect(themeToggle).toBeVisible();

    // Toggle should work
    await themeToggle.click();
    await page.waitForTimeout(300);

    await expect(html).toHaveAttribute('data-theme', 'dark');
  });
});
