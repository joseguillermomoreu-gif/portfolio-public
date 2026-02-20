import { Page, Locator } from '@playwright/test';
import * as selectors from './selectors';

export function footerLocators(page: Page) {
  return {
    container: page.locator(selectors.container),
    socialLinks: page.locator(selectors.socialLinks),
    version: page.locator(selectors.version),
    year: page.locator(selectors.year),
    footerMeta: page.locator(selectors.footerMeta),
    footerText: page.locator(selectors.footerText),
  };
}

export async function scrollToFooter(page: Page): Promise<void> {
  await page.locator(selectors.container).scrollIntoViewIfNeeded();
}

/**
 * Locators de contenido dinámico para usar como masks en visual regression.
 * Se enmascara .footer-meta (versión) para que cambios en el texto no afecten a los snapshots.
 */
export function footerDynamicMasks(page: Page): Locator[] {
  return [page.locator(selectors.footerMeta)];
}
