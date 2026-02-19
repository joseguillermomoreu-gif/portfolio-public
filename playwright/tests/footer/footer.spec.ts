import { test, expect, Page } from '@playwright/test';
import { FooterComponent } from '@components';

// ─── Visual Regression Helpers ───────────────────────────────────────────────

const VIEWPORTS = {
  desktop: { width: 1920, height: 1080 },
  mobile: { width: 375, height: 667 },
} as const;

async function navigateAndWait(page: Page, url: string): Promise<void> {
  await page.goto(url);
  // eslint-disable-next-line playwright/no-networkidle
  await page.waitForLoadState('networkidle');
}

// ─── Functional Tests ─────────────────────────────────────────────────────────

/**
 * Footer - Dynamic Content
 *
 * Verifica que el footer muestra contenido dinámico correcto:
 *   - Año actual (© YYYY)
 *   - Versión de la aplicación (vX.Y.Z) según APP_VERSION del .env
 *
 * Playwright carga automáticamente el .env del proyecto,
 * por lo que process.env.APP_VERSION está disponible en los tests.
 */
test.describe('Footer - Dynamic Content', () => {
  let footer: FooterComponent;

  test.beforeEach(async ({ page }) => {
    footer = new FooterComponent(page);
    await page.goto('/');
  });

  test('should display the current year', async () => {
    const currentYear = new Date().getFullYear().toString();
    await expect(footer.year).toBeVisible();
    await expect(footer.year).toContainText(currentYear);
  });

  test('should display the app version from .env (APP_VERSION)', async () => {
    const appVersion = process.env['APP_VERSION'];
    expect(appVersion, 'APP_VERSION debe estar definida en .env').toBeTruthy();
    expect(appVersion).toMatch(/^\d+\.\d+\.\d+$/, 'APP_VERSION debe ser semver X.Y.Z');

    await expect(footer.version).toBeVisible();
    await expect(footer.version).toContainText(`v${appVersion}`);
  });

  test('should display version with semver format', async () => {
    await expect(footer.version).toBeVisible();
    const versionText = await footer.version.textContent();
    expect(versionText).toMatch(/^v\d+\.\d+\.\d+$/);
  });

  test('should display year with copyright symbol', async () => {
    await expect(footer.year).toBeVisible();
    const yearText = await footer.year.textContent();
    expect(yearText).toMatch(/^©\s*\d{4}$/);
  });
});

// ─── Visual Regression ────────────────────────────────────────────────────────

/**
 * Footer Component
 * Dynamic content (version) masked.
 */
test.describe('Footer Component', () => {
  test('Desktop', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.desktop);
    await navigateAndWait(page, '/');
    const footer = new FooterComponent(page);
    await footer.scrollToFooter();
    const { locator, masks } = footer.getLocatorWithMasks();
    await expect(locator).toHaveScreenshot('footer-desktop.png', { animations: 'disabled', mask: masks });
  });

  test('Mobile', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile);
    await navigateAndWait(page, '/');
    const footer = new FooterComponent(page);
    await footer.scrollToFooter();
    const { locator, masks } = footer.getLocatorWithMasks();
    await expect(locator).toHaveScreenshot('footer-mobile.png', { animations: 'disabled', mask: masks });
  });
});
