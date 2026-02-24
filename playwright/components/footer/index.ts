import { Page, expect } from '@playwright/test';
import * as selectors from './selectors';

export async function scrollToFooter(page: Page): Promise<void> {
  await page.locator(selectors.container).scrollIntoViewIfNeeded();
}

export async function socialLinksAreSecure(page: Page): Promise<void> {
  const links = page.locator(selectors.socialLinks);
  await expect(links.first()).toBeVisible();
  await expect(links.first()).toHaveAttribute('target', '_blank');
  await expect(links.first()).toHaveAttribute('rel', /noopener/);
}

export async function githubProfileLinkIsValid(page: Page): Promise<void> {
  const link = page.locator(selectors.container).locator(selectors.githubProfileLink);
  await expect(link).toBeVisible();
  await expect(link).toHaveAttribute('target', '_blank');
}

export async function yearIsCurrentYear(page: Page): Promise<void> {
  const year = page.locator(selectors.year);
  await expect(year).toBeVisible();
  await expect(year).toContainText(new Date().getFullYear().toString());
}

export async function versionMatchesSemver(page: Page): Promise<void> {
  const version = page.locator(selectors.version);
  await expect(version).toBeVisible();
  const versionText = await version.textContent();
  expect(versionText).toMatch(/^v\d+\.\d+\.\d+$/);
}

export async function footerMatchesSnapshot(page: Page, snapshotName: string): Promise<void> {
  await expect(page.locator(selectors.container)).toHaveScreenshot(snapshotName, {
    animations: 'disabled',
    mask: [page.locator(selectors.footerMeta)],
  });
}
