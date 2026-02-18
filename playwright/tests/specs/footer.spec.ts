import { test, expect } from '@playwright/test';
import { FooterComponent } from '@components';

/**
 * Footer - Functional Tests
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
