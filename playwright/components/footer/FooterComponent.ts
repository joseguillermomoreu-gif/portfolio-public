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
  readonly footerText: Locator;

  constructor(page: Page) {
    this.container = page.locator(FooterSelectors.container);
    this.socialLinks = page.locator(FooterSelectors.socialLinks);
    this.version = page.locator(FooterSelectors.version);
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

  /** Masks para contenido dinámico (versión + año) — usado en visual regression */
  getLocatorWithMasks(): { locator: Locator; masks: Locator[] } {
    return {
      locator: this.container,
      masks: [
        this.container.getByText(/v\d+\.\d+\.\d+/),
        this.container.getByText(/202\d/),
      ],
    };
  }
}
