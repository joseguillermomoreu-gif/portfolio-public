import { Page, Locator } from '@playwright/test';
import { HeaderSelectors } from './selectors';

/**
 * Page Object for Header Component.
 * Única fuente de selectores para el header - los tests NO deben contener selectores directamente.
 */
export class HeaderComponent {
  private readonly page: Page;

  readonly container: Locator;
  readonly logo: Locator;
  readonly navigation: Locator;
  readonly navLinksContainer: Locator;
  readonly navLinks: Locator;
  readonly themeToggle: Locator;
  readonly mobileMenuToggle: Locator;
  readonly mobileOverlay: Locator;

  constructor(page: Page) {
    this.page = page;
    this.container = page.locator(HeaderSelectors.container);
    this.logo = page.locator(HeaderSelectors.logo);
    this.navigation = page.locator(HeaderSelectors.navigation);
    this.navLinksContainer = page.locator(HeaderSelectors.navLinksContainer);
    this.navLinks = page.locator(HeaderSelectors.navLinks);
    this.themeToggle = page.locator(HeaderSelectors.themeToggle);
    this.mobileMenuToggle = page.locator(HeaderSelectors.mobileMenuToggle);
    this.mobileOverlay = page.locator(HeaderSelectors.mobileOverlay);
  }

  async isVisible(): Promise<boolean> {
    return await this.container.isVisible();
  }

  async toggleTheme(): Promise<void> {
    await this.themeToggle.click();
    await this.page.waitForTimeout(400);
  }

  async getCurrentTheme(): Promise<string | null> {
    return await this.page.evaluate(() =>
      document.documentElement.getAttribute('data-theme')
    );
  }

  async openMobileMenu(): Promise<void> {
    await this.mobileMenuToggle.click();
    await this.page.waitForTimeout(400);
  }

  async closeMobileMenu(): Promise<void> {
    await this.mobileOverlay.click({ force: true });
    await this.page.waitForTimeout(300);
  }

  async scrollToTriggerEffect(scrollY: number = 200): Promise<void> {
    await this.page.evaluate((y) => window.scrollTo(0, y), scrollY);
    await this.page.waitForTimeout(300);
  }

  getNavLinkByHref(href: string): Locator {
    return this.navLinksContainer.locator(`a[href="${href}"]`);
  }

  getLocator(): Locator {
    return this.container;
  }
}
