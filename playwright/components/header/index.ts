import { Page, Locator, expect } from '@playwright/test';
import * as selectors from './selectors';

export async function toggleTheme(page: Page): Promise<void> {
  await page.locator(selectors.themeToggle).click();
  // eslint-disable-next-line playwright/no-wait-for-timeout
  await page.waitForTimeout(400);
}

export async function getCurrentTheme(page: Page): Promise<string | null> {
  return page.evaluate(() => document.documentElement.getAttribute('data-theme'));
}

export async function openMobileMenu(page: Page): Promise<void> {
  await page.locator(selectors.mobileMenuToggle).click();
  await page.locator(selectors.navLinksContainer).waitFor({ state: 'visible' });
}

export async function closeMobileMenu(page: Page): Promise<void> {
  await page.locator(selectors.mobileOverlay).click();
  await page.locator(selectors.mobileOverlay).waitFor({ state: 'hidden' });
}

export async function scrollToTriggerEffect(page: Page, scrollY = 200): Promise<void> {
  await page.evaluate((y) => window.scrollTo(0, y), scrollY);
  // eslint-disable-next-line playwright/no-wait-for-timeout
  await page.waitForTimeout(300);
}

export function getNavLinkByHref(page: Page, href: string): Locator {
  return page.locator(selectors.navLinksContainer).locator(`a[href="${href}"]`);
}

// ─── LocalStorage ─────────────────────────────────────────────────────────────

export async function clearThemeFromLocalStorage(page: Page): Promise<void> {
  await page.evaluate(() => localStorage.clear());
}

export async function setLocalStorageThemeToLight(page: Page): Promise<void> {
  await page.evaluate(() => localStorage.setItem('theme', 'light'));
}

// ─── Assertions ───────────────────────────────────────────────────────────────

export async function themeIsDark(page: Page): Promise<void> {
  expect(await getCurrentTheme(page)).toBe('dark');
}

export async function themeIsLight(page: Page): Promise<void> {
  expect(await getCurrentTheme(page)).toBe('light');
}

export async function themeToggleIsVisible(page: Page): Promise<void> {
  await expect(page.locator(selectors.themeToggle)).toBeVisible();
}

export async function themeToggleIsHidden(page: Page): Promise<void> {
  await expect(page.locator(selectors.themeToggle)).toBeHidden();
}

export async function themeToggleHasAriaLabel(page: Page): Promise<void> {
  await expect(page.locator(selectors.themeToggle)).toHaveAttribute('aria-label', /theme/i);
}

export async function logoIsVisible(page: Page): Promise<void> {
  await expect(page.locator(selectors.logo)).toBeVisible();
}

export async function logoHasText(page: Page, text: string): Promise<void> {
  await expect(page.locator(selectors.logo)).toHaveText(text);
}

export async function hasNavLinksCount(page: Page, count: number): Promise<void> {
  await expect(page.locator(selectors.navLinks)).toHaveCount(count);
}

export async function navLinksAreInOrder(page: Page, expected: string[]): Promise<void> {
  const linkTexts = await page.locator(selectors.navLinks).allTextContents();
  for (let i = 0; i < expected.length; i++) {
    expect(linkTexts[i]).toBe(expected[i]);
  }
}

export async function activeNavLinkIs(page: Page, text: string): Promise<void> {
  const activeLink = page.locator(selectors.navLinksContainer).locator('.nav-link.active');
  await expect(activeLink).toHaveText(text);
}

export async function navigationHasAriaLabel(page: Page, label: string): Promise<void> {
  await expect(page.locator(selectors.navigation)).toHaveAttribute('aria-label', label);
}

export async function headerIsPresent(page: Page): Promise<void> {
  await expect(page.locator(selectors.container)).toBeVisible();
}

export async function mobileMenuToggleIsVisible(page: Page): Promise<void> {
  await expect(page.locator(selectors.mobileMenuToggle)).toBeVisible();
}

export async function mobileMenuIsClosed(page: Page): Promise<void> {
  const hasActive = await page.locator(selectors.navLinksContainer).evaluate((el) => el.classList.contains('active'));
  expect(hasActive).toBe(false);
}

export async function mobileMenuIsOpen(page: Page): Promise<void> {
  await expect(page.locator(selectors.navLinksContainer)).toHaveClass(/active/);
  await expect(page.locator(selectors.mobileMenuToggle)).toHaveClass(/active/);
  await expect(page.locator(selectors.mobileOverlay)).toHaveClass(/active/);
}

export async function mobileMenuToggleAriaExpandedIs(page: Page, value: string): Promise<void> {
  await expect(page.locator(selectors.mobileMenuToggle)).toHaveAttribute('aria-expanded', value);
}

export async function mobileMenuToggleHasAriaLabel(page: Page): Promise<void> {
  await expect(page.locator(selectors.mobileMenuToggle)).toHaveAttribute('aria-label', /.+/);
}

export async function closeWithEsc(page: Page): Promise<void> {
  await page.keyboard.press('Escape');
  await page.locator(selectors.mobileOverlay).waitFor({ state: 'hidden' });
}

// ─── Visual Regression ────────────────────────────────────────────────────────

export async function headerMatchesSnapshot(page: Page, snapshotName: string): Promise<void> {
  await expect(page.locator(selectors.container)).toHaveScreenshot(snapshotName, { animations: 'disabled' });
}

export async function headerFullPageMatchesSnapshot(page: Page, snapshotName: string): Promise<void> {
  await expect(page).toHaveScreenshot(snapshotName, { animations: 'disabled' });
}
