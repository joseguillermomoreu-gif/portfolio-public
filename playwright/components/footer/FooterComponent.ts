import { Page, Locator } from '@playwright/test';
import { FooterSelectors } from './selectors';

/**
 * Page Object for Footer Component.
 * Única fuente de selectores para el footer.
 */
export class FooterComponent {
  readonly container: Locator;
  readonly socialLinks: Locator;
  readonly version: Locator;
  readonly year: Locator;
  readonly footerMeta: Locator;
  readonly footerText: Locator;

  constructor(page: Page) {
    this.container = page.locator(FooterSelectors.container);
    this.socialLinks = page.locator(FooterSelectors.socialLinks);
    this.version = page.locator(FooterSelectors.version);
    this.year = page.locator(FooterSelectors.year);
    this.footerMeta = page.locator(FooterSelectors.footerMeta);
    this.footerText = page.locator(FooterSelectors.footerText);
  }

  async isVisible(): Promise<boolean> {
    return await this.container.isVisible();
  }

  async scrollToFooter(): Promise<void> {
    await this.container.scrollIntoViewIfNeeded();
  }

  getLocator(): Locator {
    return this.container;
  }

  /**
   * Locators de contenido dinámico para usar como masks en visual regression.
   * Se enmascara el contenedor .footer-meta completo (versión + año) para que
   * cambios en el texto de versión no afecten al tamaño de la caja enmascarada.
   */
  getDynamicMasks(): Locator[] {
    return [this.footerMeta];
  }

  /** Footer completo con masks aplicadas — usado en visual regression del footer */
  getLocatorWithMasks(): { locator: Locator; masks: Locator[] } {
    return {
      locator: this.container,
      masks: this.getDynamicMasks(),
    };
  }
}
