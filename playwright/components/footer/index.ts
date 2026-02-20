import { Page, Locator } from '@playwright/test';
import { FooterSelectors } from './selectors';

export function footerLocators(page: Page) {
  return {
    container: page.locator(FooterSelectors.container),
    socialLinks: page.locator(FooterSelectors.socialLinks),
    version: page.locator(FooterSelectors.version),
    year: page.locator(FooterSelectors.year),
    footerMeta: page.locator(FooterSelectors.footerMeta),
    footerText: page.locator(FooterSelectors.footerText),
  };
}

export async function scrollToFooter(page: Page): Promise<void> {
  await page.locator(FooterSelectors.container).scrollIntoViewIfNeeded();
}

/**
 * Locators de contenido dinámico para usar como masks en visual regression.
 * Se enmascara .footer-meta (versión) para que cambios en el texto no afecten a los snapshots.
 */
export function footerDynamicMasks(page: Page): Locator[] {
  return [page.locator(FooterSelectors.footerMeta)];
}
