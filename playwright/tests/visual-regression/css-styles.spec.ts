import { test, expect, Page } from '@playwright/test';
import { HeaderComponent } from '@components';
import { FooterComponent } from '@components';
import { HomePage } from '@pages';
import { CvPage } from '@pages';
import { ContactPage } from '@pages';
import { ProjectsPage } from '@pages';
import { PpiaPage } from '@pages';
import { CodeAiPage } from '@pages';

/**
 * Visual Regression Tests - CSS Styles Baseline
 *
 * PURPOSE:
 * - Capture baseline screenshots with all CSS inline (styles/*.css.twig)
 * - Re-run after CSS refactoring to detect visual regressions
 * - Ensure pixel-perfect consistency during modularization
 *
 * WORKFLOW:
 * 1. Generate baselines (first run or after CSS changes):
 *    make e2e-update-snapshots
 * 2. Refactor CSS component by component
 * 3. Re-run to verify no regressions:
 *    make e2e
 * 4. Review differences:
 *    make e2e-report
 *
 * STRATEGY:
 * - All page tests use page-container locators (NOT fullPage) to exclude
 *   header and footer from per-page screenshots.
 * - Header and Footer are tested independently with their own locators.
 * - Dynamic content (footer version/year, CV counter) is masked.
 * - This ensures baselines generated locally (Docker) pass when run
 *   locally against both local server and production.
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
  // eslint-disable-next-line playwright/no-networkidle
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
   * Dynamic content (version + year) masked.
   * Footer is tested independently — not included in page-level shots.
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
   * Uses .cv-page container (excludes header/footer).
   * Masks .programming-counter (dynamic: years/months/days elapsed since 2017).
   */
  test.describe('CV Page', () => {
    test('Desktop', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.desktop);
      await navigateAndWait(page, '/cv');
      const cv = new CvPage(page);
      await expect(cv.cvPage).toHaveScreenshot('cv-desktop.png', {
        animations: 'disabled',
        mask: [cv.programmingCounter],
      });
    });

    test('Mobile', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.mobile);
      await navigateAndWait(page, '/cv');
      const cv = new CvPage(page);
      await expect(cv.cvPage).toHaveScreenshot('cv-mobile.png', {
        animations: 'disabled',
        mask: [cv.programmingCounter],
      });
    });
  });

  /**
   * CONTACT PAGE
   * Uses .contact-page container (excludes header/footer).
   */
  test.describe('Contact Page', () => {
    test('Desktop', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.desktop);
      await navigateAndWait(page, '/contacto');
      const contact = new ContactPage(page);
      await expect(contact.contactPage).toHaveScreenshot('contact-desktop.png', { animations: 'disabled' });
    });

    test('Mobile', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.mobile);
      await navigateAndWait(page, '/contacto');
      const contact = new ContactPage(page);
      await expect(contact.contactPage).toHaveScreenshot('contact-mobile.png', { animations: 'disabled' });
    });
  });

  /**
   * PROJECTS PAGE
   * Uses .projects-page container (excludes header/footer).
   */
  test.describe('Projects Page', () => {
    test('Desktop', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.desktop);
      await navigateAndWait(page, '/proyectos');
      const projects = new ProjectsPage(page);
      await expect(projects.projectsPage).toHaveScreenshot('projects-desktop.png', { animations: 'disabled' });
    });

    test('Mobile', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.mobile);
      await navigateAndWait(page, '/proyectos');
      const projects = new ProjectsPage(page);
      await expect(projects.projectsPage).toHaveScreenshot('projects-mobile.png', { animations: 'disabled' });
    });
  });

  /**
   * PPIA PAGE
   * Uses .ppia-page container (excludes header/footer).
   */
  test.describe('PPiA Page', () => {
    test('Desktop', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.desktop);
      await navigateAndWait(page, '/ppia');
      const ppia = new PpiaPage(page);
      await expect(ppia.ppiaPage).toHaveScreenshot('ppia-desktop.png', { animations: 'disabled' });
    });

    test('Mobile', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.mobile);
      await navigateAndWait(page, '/ppia');
      const ppia = new PpiaPage(page);
      await expect(ppia.ppiaPage).toHaveScreenshot('ppia-mobile.png', { animations: 'disabled' });
    });
  });

  /**
   * CODE & AI PAGE
   * Uses main content container (excludes header/footer).
   */
  test.describe('Code & AI Page', () => {
    test('Desktop', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.desktop);
      await navigateAndWait(page, '/code-ai');
      const codeAi = new CodeAiPage(page);
      await expect(codeAi.mainContent).toHaveScreenshot('code-ai-desktop.png', { animations: 'disabled' });
    });

    test('Mobile', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.mobile);
      await navigateAndWait(page, '/code-ai');
      const codeAi = new CodeAiPage(page);
      await expect(codeAi.mainContent).toHaveScreenshot('code-ai-mobile.png', { animations: 'disabled' });
    });
  });
});
