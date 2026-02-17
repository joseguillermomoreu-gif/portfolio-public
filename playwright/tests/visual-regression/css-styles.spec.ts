import { test, expect, Page } from '@playwright/test';
import { HeaderComponent } from '@components';
import { FooterComponent } from '@components';
import { HomePage } from '@pages';

/**
 * Visual Regression Tests - CSS Styles Baseline
 *
 * PURPOSE:
 * - Capture baseline screenshots with all CSS inline (styles/*.css.twig)
 * - Re-run after CSS refactoring to detect visual regressions
 * - Ensure pixel-perfect consistency during modularization
 *
 * WORKFLOW:
 * 1. Generate baselines (first run):
 *    BASE_URL=http://localhost:8080 npx playwright test visual-regression/css-styles.spec.ts --update-snapshots
 * 2. Refactor CSS component by component
 * 3. Re-run to verify no regressions:
 *    BASE_URL=http://localhost:8080 npx playwright test visual-regression/css-styles.spec.ts
 * 4. Review differences:
 *    npx playwright show-report
 *
 * PATTERN: Strict POM - all selectors through Page Objects
 * RELATED ISSUE: #75
 */

const VIEWPORTS = {
  desktop: { width: 1920, height: 1080 },
  mobile: { width: 375, height: 667 },
} as const;

async function navigateAndWait(page: Page, url: string): Promise<void> {
  await page.goto(url);
  await page.waitForLoadState('networkidle');
}

test.describe('CSS Styles - Visual Regression Baseline', () => {

  /**
   * HOME PAGE
   * Sections tested independently for granular regression detection
   */
  test.describe('Home - Hero Section', () => {
    test('Desktop', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.desktop);
      await navigateAndWait(page, '/');
      const home = new HomePage(page);
      await expect(home.hero).toHaveScreenshot('home-hero-desktop.png', { animations: 'disabled' });
    });

    test('Mobile', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.mobile);
      await navigateAndWait(page, '/');
      const home = new HomePage(page);
      await expect(home.hero).toHaveScreenshot('home-hero-mobile.png', { animations: 'disabled' });
    });

    test('Dark Mode Desktop', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.desktop);
      await navigateAndWait(page, '/');
      const header = new HeaderComponent(page);
      await header.toggleTheme();
      expect(await header.getCurrentTheme()).toBe('dark');
      const home = new HomePage(page);
      await expect(home.hero).toHaveScreenshot('home-hero-dark-desktop.png', { animations: 'disabled' });
    });
  });

  test.describe('Home - Quick Intro Section', () => {
    test('Desktop', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.desktop);
      await navigateAndWait(page, '/');
      const home = new HomePage(page);
      await expect(home.quickIntro).toHaveScreenshot('home-quick-intro-desktop.png', { animations: 'disabled' });
    });

    test('Mobile', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.mobile);
      await navigateAndWait(page, '/');
      const home = new HomePage(page);
      await expect(home.quickIntro).toHaveScreenshot('home-quick-intro-mobile.png', { animations: 'disabled' });
    });
  });

  test.describe('Home - Skills Section', () => {
    test('Desktop', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.desktop);
      await navigateAndWait(page, '/');
      const home = new HomePage(page);
      await expect(home.skillsSection).toHaveScreenshot('home-skills-desktop.png', { animations: 'disabled' });
    });

    test('Mobile', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.mobile);
      await navigateAndWait(page, '/');
      const home = new HomePage(page);
      await expect(home.skillsSection).toHaveScreenshot('home-skills-mobile.png', { animations: 'disabled' });
    });
  });

  /**
   * HEADER COMPONENT
   * Tested on multiple pages to ensure cross-page consistency
   */
  test.describe('Header Component', () => {
    test('Desktop - Top (not scrolled)', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.desktop);
      await navigateAndWait(page, '/');
      const header = new HeaderComponent(page);
      await expect(header.getLocator()).toHaveScreenshot('header-top-desktop.png', { animations: 'disabled' });
    });

    test('Desktop - Scrolled', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.desktop);
      await navigateAndWait(page, '/');
      const header = new HeaderComponent(page);
      await header.scrollToTriggerEffect(200);
      await expect(header.getLocator()).toHaveScreenshot('header-scrolled-desktop.png', { animations: 'disabled' });
    });

    test('Mobile - Nav Closed', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.mobile);
      await navigateAndWait(page, '/');
      const header = new HeaderComponent(page);
      await expect(header.getLocator()).toHaveScreenshot('header-mobile-closed.png', { animations: 'disabled' });
    });

    test('Mobile - Nav Open', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.mobile);
      await navigateAndWait(page, '/');
      const header = new HeaderComponent(page);
      await header.openMobileMenu();
      await expect(page).toHaveScreenshot('header-mobile-open.png', { animations: 'disabled' });
    });
  });

  /**
   * FOOTER COMPONENT
   * Dynamic content (version) masked
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

  /**
   * CV PAGE
   */
  test.describe('CV Page', () => {
    test('Desktop', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.desktop);
      await navigateAndWait(page, '/cv');
      await expect(page).toHaveScreenshot('cv-desktop.png', { fullPage: true, animations: 'disabled' });
    });

    test('Mobile', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.mobile);
      await navigateAndWait(page, '/cv');
      await expect(page).toHaveScreenshot('cv-mobile.png', { fullPage: true, animations: 'disabled' });
    });
  });

  /**
   * CONTACT PAGE
   */
  test.describe('Contact Page', () => {
    test('Desktop', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.desktop);
      await navigateAndWait(page, '/contacto');
      await expect(page).toHaveScreenshot('contact-desktop.png', { fullPage: true, animations: 'disabled' });
    });

    test('Mobile', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.mobile);
      await navigateAndWait(page, '/contacto');
      await expect(page).toHaveScreenshot('contact-mobile.png', { fullPage: true, animations: 'disabled' });
    });
  });

  /**
   * PROJECTS PAGE
   */
  test.describe('Projects Page', () => {
    test('Desktop', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.desktop);
      await navigateAndWait(page, '/proyectos');
      await expect(page).toHaveScreenshot('projects-desktop.png', { fullPage: true, animations: 'disabled' });
    });

    test('Mobile', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.mobile);
      await navigateAndWait(page, '/proyectos');
      await expect(page).toHaveScreenshot('projects-mobile.png', { fullPage: true, animations: 'disabled' });
    });
  });

  /**
   * PPIA PAGE
   */
  test.describe('PPiA Page', () => {
    test('Desktop', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.desktop);
      await navigateAndWait(page, '/ppia');
      await expect(page).toHaveScreenshot('ppia-desktop.png', { fullPage: true, animations: 'disabled' });
    });

    test('Mobile', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.mobile);
      await navigateAndWait(page, '/ppia');
      await expect(page).toHaveScreenshot('ppia-mobile.png', { fullPage: true, animations: 'disabled' });
    });
  });

  /**
   * CODE & AI PAGE
   */
  test.describe('Code & AI Page', () => {
    test('Desktop', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.desktop);
      await navigateAndWait(page, '/code-ai');
      await expect(page).toHaveScreenshot('code-ai-desktop.png', { fullPage: true, animations: 'disabled' });
    });

    test('Mobile', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.mobile);
      await navigateAndWait(page, '/code-ai');
      await expect(page).toHaveScreenshot('code-ai-mobile.png', { fullPage: true, animations: 'disabled' });
    });
  });
});
