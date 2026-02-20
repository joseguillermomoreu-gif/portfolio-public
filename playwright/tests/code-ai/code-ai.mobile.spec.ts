import { test, expect } from '@playwright/test';
import { codeAiLocators } from '@components/code-ai';

test.beforeEach(async ({ page }) => {
  await page.goto('/code-ai');
  // eslint-disable-next-line playwright/no-networkidle
  await page.waitForLoadState('networkidle');
});

test('Code & AI - Header', async ({ page }) => {
  const { codeAiHeader } = codeAiLocators(page);
  await expect(codeAiHeader).toHaveScreenshot('code-ai-header-mobile.png', { animations: 'disabled' });
});

test('Code & AI - Articles Grid', async ({ page }) => {
  const { articlesGrid } = codeAiLocators(page);
  await expect(articlesGrid).toHaveScreenshot('code-ai-grid-mobile.png', { animations: 'disabled' });
});
