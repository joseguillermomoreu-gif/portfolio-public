import { test, expect } from '@playwright/test';
import { FooterComponent } from '@components';

test.describe('Homepage - Footer', () => {
  test('should display footer', async ({ page }) => {
    const footer = new FooterComponent(page);
    await page.goto('/');
    await expect(footer.container).toBeVisible();
  });

  test('should have GitHub profile link in footer', async ({ page }) => {
    const footer = new FooterComponent(page);
    await page.goto('/');
    const githubLink = footer.container.locator('a[href="https://github.com/joseguillermomoreu-gif"]');
    await expect(githubLink).toBeVisible();
    await expect(githubLink).toHaveAttribute('target', '_blank');
  });
});
