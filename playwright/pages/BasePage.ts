import { Page, Locator } from '@playwright/test';

/**
 * Clase base para todos los Page Objects.
 * Siguiendo patrón POM estricto - única fuente de selectores.
 */
export abstract class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(path: string = '/'): Promise<void> {
    await this.page.goto(path);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  async isVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  async getText(locator: Locator): Promise<string> {
    return (await locator.textContent()) ?? '';
  }

  async getBodyText(): Promise<string> {
    return (await this.page.locator('body').textContent()) ?? '';
  }
}
