import { Page, expect } from '@playwright/test';
import * as selectors from './selectors';

// ─── Navigation ───────────────────────────────────────────────────────────────

export async function goto(page: Page): Promise<void> {
  await page.goto('/san_patricio');
  await page.waitForLoadState('domcontentloaded');
}

export async function gotoHome(page: Page): Promise<void> {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');
}

// ─── LocalStorage ─────────────────────────────────────────────────────────────

export async function clearLocalStorage(page: Page): Promise<void> {
  await page.evaluate(() => localStorage.clear());
}

export async function isThemeActive(page: Page): Promise<boolean> {
  return page.evaluate(() => localStorage.getItem('san_patricio_theme') === 'active');
}

// ─── Header assertions ────────────────────────────────────────────────────────

export async function isShamrockVisible(page: Page): Promise<boolean> {
  return page.locator(selectors.shamrockToggle).isVisible();
}

export async function isDarkmodeButtonVisible(page: Page): Promise<boolean> {
  return page.locator(selectors.themeToggle).isVisible();
}

export async function clickShamrock(page: Page): Promise<void> {
  await page.locator(selectors.shamrockToggle).click();
}

// ─── Page assertions ──────────────────────────────────────────────────────────

export async function pageIsVisible(page: Page): Promise<void> {
  await expect(page.locator(selectors.pageSection)).toBeVisible();
}

export async function pageTitleIsCorrect(page: Page): Promise<void> {
  await expect(page.locator(selectors.title)).toBeVisible();
  await expect(page.locator(selectors.title)).toContainText('San Patricio');
}

export async function shamrockIsVisible(page: Page): Promise<void> {
  await expect(page.locator(selectors.shamrockToggle)).toBeVisible();
}

export async function shamrockIsNotVisible(page: Page): Promise<void> {
  await expect(page.locator(selectors.shamrockToggle)).toBeHidden();
}

export async function darkmodeButtonIsVisible(page: Page): Promise<void> {
  await expect(page.locator(selectors.themeToggle)).toBeVisible();
}

export async function darkmodeButtonIsNotVisible(page: Page): Promise<void> {
  await expect(page.locator(selectors.themeToggle)).toBeHidden();
}

export async function themeIsActiveInLocalStorage(page: Page): Promise<void> {
  const active = await isThemeActive(page);
  expect(active).toBe(true);
}

export async function themeIsNotActiveInLocalStorage(page: Page): Promise<void> {
  const active = await isThemeActive(page);
  expect(active).toBe(false);
}
