import { test, expect } from '@playwright/test';
import { HeaderComponent } from '@components';

const mobileViewport = { width: 390, height: 844 };

test.use({ hasTouch: true });

test.describe('Dark Mode - Mobile (Forced Dark, < 850px)', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(mobileViewport);
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload({ waitUntil: 'networkidle' });
  });

  test('should hide theme toggle button on mobile', async ({ page }) => {
    const header = new HeaderComponent(page);
    await page.goto('/');
    await expect(header.themeToggle).toBeHidden();
  });

  test('should force dark mode on mobile', async ({ page }) => {
    await page.goto('/');
    const theme = await (new HeaderComponent(page)).getCurrentTheme();
    expect(theme).toBe('dark');
  });

  test('should maintain dark mode on reload (mobile)', async ({ page }) => {
    await page.goto('/');
    let theme = await (new HeaderComponent(page)).getCurrentTheme();
    expect(theme).toBe('dark');

    await page.reload();
    theme = await (new HeaderComponent(page)).getCurrentTheme();
    expect(theme).toBe('dark');
  });

  test('should ignore localStorage light theme on mobile', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.setItem('theme', 'light'));
    await page.reload();

    const theme = await (new HeaderComponent(page)).getCurrentTheme();
    expect(theme).toBe('dark');
  });

  test('should force dark mode in landscape (< 850px wide)', async ({ page }) => {
    await page.setViewportSize({ width: 844, height: 390 });
    await page.goto('/');

    const header = new HeaderComponent(page);
    const theme = await header.getCurrentTheme();
    expect(theme).toBe('dark');
    await expect(header.themeToggle).toBeHidden();
  });
});

test.describe('Dark Mode - Tablet Breakpoint', () => {
  test('should force dark mode on tablets < 850px', async ({ page }) => {
    await page.setViewportSize({ width: 844, height: 390 });
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());

    const header = new HeaderComponent(page);
    const theme = await header.getCurrentTheme();
    expect(theme).toBe('dark');
    await expect(header.themeToggle).toBeHidden();
  });

  test('should allow theme toggle on tablets >= 850px', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());

    const header = new HeaderComponent(page);
    const initialTheme = await header.getCurrentTheme();
    expect(initialTheme).toBe('light');
    await expect(header.themeToggle).toBeVisible();

    await header.toggleTheme();
    const newTheme = await header.getCurrentTheme();
    expect(newTheme).toBe('dark');
  });
});

test.describe('Dark Mode - Desktop Theme Toggle', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('should start with light theme by default on desktop', async ({ page }) => {
    await page.goto('/');
    const theme = await (new HeaderComponent(page)).getCurrentTheme();
    expect(theme).toBe('light');
  });

  test('should display theme toggle button on desktop', async ({ page }) => {
    const header = new HeaderComponent(page);
    await page.goto('/');
    await expect(header.themeToggle).toBeVisible();
    await expect(header.themeToggle).toHaveAttribute('aria-label', /theme/i);
  });
});
