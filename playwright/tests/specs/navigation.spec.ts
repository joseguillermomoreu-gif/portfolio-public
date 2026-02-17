import { test, expect } from '@playwright/test';
import { HeaderComponent } from '@components';

const EXPECTED_NAV_ORDER = ['Home', 'CV', 'Code & AI', 'PPiA', 'Proyectos', 'Contacto'];

test.describe('Navigation - Menu Order', () => {
  let header: HeaderComponent;

  test.beforeEach(async ({ page }) => {
    header = new HeaderComponent(page);
    await page.goto('/');
  });

  test('should have correct menu order', async () => {
    const linkTexts = await header.navLinks.allTextContents();
    for (let i = 0; i < EXPECTED_NAV_ORDER.length; i++) {
      expect(linkTexts[i]).toBe(EXPECTED_NAV_ORDER[i]);
    }
  });

  test('Code & AI should come before PPiA', async () => {
    const linkTexts = await header.navLinks.allTextContents();
    const codeAiIndex = linkTexts.indexOf('Code & AI');
    const ppiaIndex = linkTexts.indexOf('PPiA');
    expect(codeAiIndex).toBeLessThan(ppiaIndex);
  });

  test('should display logo with owner name', async () => {
    await expect(header.logo).toBeVisible();
    await expect(header.logo).toHaveText('José Moreu Peso');
  });

  test('should have accessible navigation element', async () => {
    await expect(header.navigation).toHaveAttribute('aria-label', 'Main navigation');
  });

  test('should highlight active link on home page', async () => {
    const activeLink = header.navLinksContainer.locator('.nav-link.active');
    await expect(activeLink).toHaveText('Home');
  });
});

test.describe('Navigation - Desktop', () => {
  test('should display all nav links on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    const header = new HeaderComponent(page);
    await page.goto('/');

    await expect(header.navLinksContainer).toBeVisible();
    await expect(header.navLinks).toHaveCount(6);
  });
});

test.describe('Navigation - Mobile Hamburger', () => {
  const mobileViewport = { width: 375, height: 667 };

  test('should show hamburger button on mobile', async ({ page }) => {
    await page.setViewportSize(mobileViewport);
    const header = new HeaderComponent(page);
    await page.goto('/');
    await expect(header.mobileMenuToggle).toBeVisible();
  });

  test('mobile menu should be hidden by default', async ({ page }) => {
    await page.setViewportSize(mobileViewport);
    const header = new HeaderComponent(page);
    await page.goto('/');

    const hasActive = await header.navLinksContainer.evaluate(
      (el) => el.classList.contains('active')
    );
    expect(hasActive).toBe(false);
  });

  test('clicking hamburger should open mobile menu', async ({ page }) => {
    await page.setViewportSize(mobileViewport);
    const header = new HeaderComponent(page);
    await page.goto('/');

    await header.openMobileMenu();

    await expect(header.navLinksContainer).toHaveClass(/active/);
    await expect(header.mobileMenuToggle).toHaveClass(/active/);
    await expect(header.mobileOverlay).toHaveClass(/active/);
  });

  test('clicking overlay should close mobile menu', async ({ page }) => {
    await page.setViewportSize(mobileViewport);
    const header = new HeaderComponent(page);
    await page.goto('/');

    await header.openMobileMenu();
    await header.closeMobileMenu();

    const hasActive = await header.navLinksContainer.evaluate(
      (el) => el.classList.contains('active')
    );
    expect(hasActive).toBe(false);
  });

  test('clicking nav link should close mobile menu and navigate', async ({ page }) => {
    await page.setViewportSize(mobileViewport);
    const header = new HeaderComponent(page);
    await page.goto('/');

    await header.openMobileMenu();
    await header.navLinksContainer.locator('.nav-link:has-text("CV")').click();
    await page.waitForURL(/\/cv/);

    const hasActive = await header.navLinksContainer.evaluate(
      (el) => el.classList.contains('active')
    );
    expect(hasActive).toBe(false);
  });

  test('pressing ESC should close mobile menu', async ({ page }) => {
    await page.setViewportSize(mobileViewport);
    const header = new HeaderComponent(page);
    await page.goto('/');

    await header.openMobileMenu();
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);

    const hasActive = await header.navLinksContainer.evaluate(
      (el) => el.classList.contains('active')
    );
    expect(hasActive).toBe(false);
  });

  test('all 6 menu items should be accessible in mobile menu', async ({ page }) => {
    await page.setViewportSize(mobileViewport);
    const header = new HeaderComponent(page);
    await page.goto('/');

    await header.openMobileMenu();
    await expect(header.navLinks).toHaveCount(6);
  });
});

test.describe('Navigation - Accessibility', () => {
  test('hamburger should have proper ARIA attributes', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const header = new HeaderComponent(page);
    await page.goto('/');

    await expect(header.mobileMenuToggle).toHaveAttribute('aria-label', /.+/);
    await expect(header.mobileMenuToggle).toHaveAttribute('aria-expanded', 'false');

    await header.openMobileMenu();

    await expect(header.mobileMenuToggle).toHaveAttribute('aria-expanded', 'true');
  });
});

test.describe('Navigation - Header consistent across pages', () => {
  const routes = ['/', '/cv', '/contacto', '/proyectos', '/code-ai', '/ppia'];

  for (const route of routes) {
    test(`should display header on ${route}`, async ({ page }) => {
      const header = new HeaderComponent(page);
      await page.goto(route);
      await expect(header.container).toBeVisible();
      await expect(header.logo).toBeVisible();
    });
  }
});
