import { Page, expect } from '@playwright/test';
import * as selectors from './selectors';

export async function navigateToContact(page: Page): Promise<void> {
  await page.goto(selectors.route);
  await page.waitForLoadState('domcontentloaded');
  await page.locator(selectors.heading).waitFor({ state: 'visible' });
}

export async function titleIsCorrect(page: Page): Promise<void> {
  await expect(page).toHaveTitle(/Contacto.*José Moreu/i);
}

export async function emailLinkIsValid(page: Page): Promise<void> {
  const link = page.locator(selectors.emailLink);
  await expect(link).toBeVisible();
  const href = await link.getAttribute('href');
  expect(href).toContain(selectors.emailAddress);
}

export async function githubLinkIsValid(page: Page): Promise<void> {
  const link = page.locator(selectors.githubLink);
  await expect(link).toBeVisible();
  await expect(link).toHaveAttribute('href', 'https://github.com/joseguillermomoreu-gif');
}

export async function externalLinksAreSecure(page: Page): Promise<void> {
  const links = page.locator(selectors.externalLinks);
  const count = await links.count();
  for (let i = 0; i < count; i++) {
    const rel = await links.nth(i).getAttribute('rel');
    expect(rel).toMatch(/noopener/);
  }
}

export async function contactHeaderMatchesSnapshot(page: Page, snapshotName: string): Promise<void> {
  await expect(page.locator(selectors.contactHeader)).toHaveScreenshot(snapshotName, { animations: 'disabled' });
}

export async function contactCardMatchesSnapshot(page: Page, snapshotName: string): Promise<void> {
  await expect(page.locator(selectors.contactCard)).toHaveScreenshot(snapshotName, { animations: 'disabled' });
}

export async function socialSectionMatchesSnapshot(page: Page, snapshotName: string): Promise<void> {
  await expect(page.locator(selectors.socialSection)).toHaveScreenshot(snapshotName, { animations: 'disabled' });
}
