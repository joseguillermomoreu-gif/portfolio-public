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
 * - Tests use granular component-level locators (NOT full-page containers)
 *   to minimize pixel diff surface and isolate regressions per component.
 * - Header and Footer are tested independently.
 * - Dynamic content (footer version/year, CV counter) is masked.
 * - Baselines generated locally (Docker) should pass locally.
 *   CI runs against production with same baselines.
 *
 * PATTERN: Strict POM - all selectors through Page Objects
 * RELATED ISSUES: #75, #91
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
   * HOME PAGE - Hero Section
   * Uses .hero-content to exclude scroll-indicator animated button.
   */
  test.describe('Home - Hero Section', () => {
    test('Desktop', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.desktop);
      await navigateAndWait(page, '/');
      const home = new HomePage(page);
      await expect(home.heroContent).toHaveScreenshot('home-hero-desktop.png', { animations: 'disabled' });
    });

    test('Mobile', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.mobile);
      await navigateAndWait(page, '/');
      const home = new HomePage(page);
      await expect(home.heroContent).toHaveScreenshot('home-hero-mobile.png', { animations: 'disabled' });
    });

    test('Dark Mode Desktop', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.desktop);
      await navigateAndWait(page, '/');
      const header = new HeaderComponent(page);
      await header.toggleTheme();
      expect(await header.getCurrentTheme()).toBe('dark');
      const home = new HomePage(page);
      await expect(home.heroContent).toHaveScreenshot('home-hero-dark-desktop.png', { animations: 'disabled' });
    });
  });

  /**
   * HOME PAGE - Quick Intro Section
   * Split into 4 granular components: header, stats, context, focus.
   */
  test.describe('Home - Quick Intro Section', () => {
    test.describe('Desktop', () => {
      test('Header', async ({ page }) => {
        await page.setViewportSize(VIEWPORTS.desktop);
        await navigateAndWait(page, '/');
        const home = new HomePage(page);
        await expect(home.quickIntroHeader).toHaveScreenshot('home-quick-intro-header-desktop.png', { animations: 'disabled' });
      });

      test('Stats', async ({ page }) => {
        await page.setViewportSize(VIEWPORTS.desktop);
        await navigateAndWait(page, '/');
        const home = new HomePage(page);
        await expect(home.introStats).toHaveScreenshot('home-quick-intro-stats-desktop.png', { animations: 'disabled' });
      });

      test('Context', async ({ page }) => {
        await page.setViewportSize(VIEWPORTS.desktop);
        await navigateAndWait(page, '/');
        const home = new HomePage(page);
        await expect(home.portfolioContext).toHaveScreenshot('home-quick-intro-context-desktop.png', { animations: 'disabled' });
      });

      test('Focus', async ({ page }) => {
        await page.setViewportSize(VIEWPORTS.desktop);
        await navigateAndWait(page, '/');
        const home = new HomePage(page);
        await expect(home.currentFocus).toHaveScreenshot('home-quick-intro-focus-desktop.png', { animations: 'disabled' });
      });
    });

    test.describe('Mobile', () => {
      test('Header', async ({ page }) => {
        await page.setViewportSize(VIEWPORTS.mobile);
        await navigateAndWait(page, '/');
        const home = new HomePage(page);
        await expect(home.quickIntroHeader).toHaveScreenshot('home-quick-intro-header-mobile.png', { animations: 'disabled' });
      });

      test('Stats', async ({ page }) => {
        await page.setViewportSize(VIEWPORTS.mobile);
        await navigateAndWait(page, '/');
        const home = new HomePage(page);
        await expect(home.introStats).toHaveScreenshot('home-quick-intro-stats-mobile.png', { animations: 'disabled' });
      });

      test('Context', async ({ page }) => {
        await page.setViewportSize(VIEWPORTS.mobile);
        await navigateAndWait(page, '/');
        const home = new HomePage(page);
        await expect(home.portfolioContext).toHaveScreenshot('home-quick-intro-context-mobile.png', { animations: 'disabled' });
      });

      test('Focus', async ({ page }) => {
        await page.setViewportSize(VIEWPORTS.mobile);
        await navigateAndWait(page, '/');
        const home = new HomePage(page);
        await expect(home.currentFocus).toHaveScreenshot('home-quick-intro-focus-mobile.png', { animations: 'disabled' });
      });
    });
  });

  /**
   * HOME PAGE - Skills Section
   * Captures stack-visual grid + each individual stack-item (8 items).
   */
  test.describe('Home - Skills Section', () => {
    test('Desktop - Grid', async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.desktop);
      await navigateAndWait(page, '/');
      const home = new HomePage(page);
      await expect(home.stackVisual).toHaveScreenshot('home-skills-grid-desktop.png', { animations: 'disabled' });
    });

    for (let i = 0; i < 8; i++) {
      test(`Desktop - Item ${i}`, async ({ page }) => {
        await page.setViewportSize(VIEWPORTS.desktop);
        await navigateAndWait(page, '/');
        const home = new HomePage(page);
        await expect(home.stackItems.nth(i)).toHaveScreenshot(`home-skills-item-${i}-desktop.png`, { animations: 'disabled' });
      });
    }
  });

  /**
   * HEADER COMPONENT
   * Tested on multiple pages to ensure cross-page consistency.
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
   * Split into 5 granular components.
   * programming-counter masked (dynamic: years/months/days elapsed since 2017).
   */
  test.describe('CV Page', () => {
    test.describe('Desktop', () => {
      test('Header', async ({ page }) => {
        await page.setViewportSize(VIEWPORTS.desktop);
        await navigateAndWait(page, '/cv');
        const cv = new CvPage(page);
        await expect(cv.cvHeader).toHaveScreenshot('cv-header-desktop.png', { animations: 'disabled' });
      });

      test('PDF Download Card', async ({ page }) => {
        await page.setViewportSize(VIEWPORTS.desktop);
        await navigateAndWait(page, '/cv');
        const cv = new CvPage(page);
        await expect(cv.pdfDownloadCard).toHaveScreenshot('cv-pdf-card-desktop.png', { animations: 'disabled' });
      });

      test('Tech Info', async ({ page }) => {
        await page.setViewportSize(VIEWPORTS.desktop);
        await navigateAndWait(page, '/cv');
        const cv = new CvPage(page);
        await expect(cv.cvTechInfo).toHaveScreenshot('cv-tech-info-desktop.png', { animations: 'disabled' });
      });

      test('Note', async ({ page }) => {
        await page.setViewportSize(VIEWPORTS.desktop);
        await navigateAndWait(page, '/cv');
        const cv = new CvPage(page);
        await expect(cv.cvNote).toHaveScreenshot('cv-note-desktop.png', { animations: 'disabled' });
      });

      test('Programming Counter', async ({ page }) => {
        await page.setViewportSize(VIEWPORTS.desktop);
        await navigateAndWait(page, '/cv');
        const cv = new CvPage(page);
        await expect(cv.programmingCounter).toHaveScreenshot('cv-counter-desktop.png', {
          animations: 'disabled',
          mask: [cv.programmingCounter],
        });
      });
    });

    test.describe('Mobile', () => {
      test('Header', async ({ page }) => {
        await page.setViewportSize(VIEWPORTS.mobile);
        await navigateAndWait(page, '/cv');
        const cv = new CvPage(page);
        await expect(cv.cvHeader).toHaveScreenshot('cv-header-mobile.png', { animations: 'disabled' });
      });

      test('PDF Download Card', async ({ page }) => {
        await page.setViewportSize(VIEWPORTS.mobile);
        await navigateAndWait(page, '/cv');
        const cv = new CvPage(page);
        await expect(cv.pdfDownloadCard).toHaveScreenshot('cv-pdf-card-mobile.png', { animations: 'disabled' });
      });

      test('Tech Info', async ({ page }) => {
        await page.setViewportSize(VIEWPORTS.mobile);
        await navigateAndWait(page, '/cv');
        const cv = new CvPage(page);
        await expect(cv.cvTechInfo).toHaveScreenshot('cv-tech-info-mobile.png', { animations: 'disabled' });
      });

      test('Note', async ({ page }) => {
        await page.setViewportSize(VIEWPORTS.mobile);
        await navigateAndWait(page, '/cv');
        const cv = new CvPage(page);
        await expect(cv.cvNote).toHaveScreenshot('cv-note-mobile.png', { animations: 'disabled' });
      });

      test('Programming Counter', async ({ page }) => {
        await page.setViewportSize(VIEWPORTS.mobile);
        await navigateAndWait(page, '/cv');
        const cv = new CvPage(page);
        await expect(cv.programmingCounter).toHaveScreenshot('cv-counter-mobile.png', {
          animations: 'disabled',
          mask: [cv.programmingCounter],
        });
      });
    });
  });

  /**
   * CONTACT PAGE
   * Split into 3 granular components: header, card, social section.
   */
  test.describe('Contact Page', () => {
    test.describe('Desktop', () => {
      test('Header', async ({ page }) => {
        await page.setViewportSize(VIEWPORTS.desktop);
        await navigateAndWait(page, '/contacto');
        const contact = new ContactPage(page);
        await expect(contact.contactHeader).toHaveScreenshot('contact-header-desktop.png', { animations: 'disabled' });
      });

      test('Contact Card', async ({ page }) => {
        await page.setViewportSize(VIEWPORTS.desktop);
        await navigateAndWait(page, '/contacto');
        const contact = new ContactPage(page);
        await expect(contact.contactCard).toHaveScreenshot('contact-card-desktop.png', { animations: 'disabled' });
      });

      test('Social Section', async ({ page }) => {
        await page.setViewportSize(VIEWPORTS.desktop);
        await navigateAndWait(page, '/contacto');
        const contact = new ContactPage(page);
        await expect(contact.socialSection).toHaveScreenshot('contact-social-desktop.png', { animations: 'disabled' });
      });
    });

    test.describe('Mobile', () => {
      test('Header', async ({ page }) => {
        await page.setViewportSize(VIEWPORTS.mobile);
        await navigateAndWait(page, '/contacto');
        const contact = new ContactPage(page);
        await expect(contact.contactHeader).toHaveScreenshot('contact-header-mobile.png', { animations: 'disabled' });
      });

      test('Contact Card', async ({ page }) => {
        await page.setViewportSize(VIEWPORTS.mobile);
        await navigateAndWait(page, '/contacto');
        const contact = new ContactPage(page);
        await expect(contact.contactCard).toHaveScreenshot('contact-card-mobile.png', { animations: 'disabled' });
      });

      test('Social Section', async ({ page }) => {
        await page.setViewportSize(VIEWPORTS.mobile);
        await navigateAndWait(page, '/contacto');
        const contact = new ContactPage(page);
        await expect(contact.socialSection).toHaveScreenshot('contact-social-mobile.png', { animations: 'disabled' });
      });
    });
  });

  /**
   * PROJECTS PAGE
   * Split into: header + each project card (5) + grid + footer.
   */
  test.describe('Projects Page', () => {
    test.describe('Desktop', () => {
      test('Header', async ({ page }) => {
        await page.setViewportSize(VIEWPORTS.desktop);
        await navigateAndWait(page, '/proyectos');
        const projects = new ProjectsPage(page);
        await expect(projects.projectsHeader).toHaveScreenshot('projects-header-desktop.png', { animations: 'disabled' });
      });

      for (let i = 0; i < 5; i++) {
        test(`Card ${i}`, async ({ page }) => {
          await page.setViewportSize(VIEWPORTS.desktop);
          await navigateAndWait(page, '/proyectos');
          const projects = new ProjectsPage(page);
          await expect(projects.projectCards.nth(i)).toHaveScreenshot(`projects-card-${i}-desktop.png`, { animations: 'disabled' });
        });
      }

      test('Grid', async ({ page }) => {
        await page.setViewportSize(VIEWPORTS.desktop);
        await navigateAndWait(page, '/proyectos');
        const projects = new ProjectsPage(page);
        await expect(projects.projectsGrid).toHaveScreenshot('projects-grid-desktop.png', { animations: 'disabled' });
      });

      test('Footer', async ({ page }) => {
        await page.setViewportSize(VIEWPORTS.desktop);
        await navigateAndWait(page, '/proyectos');
        const projects = new ProjectsPage(page);
        await expect(projects.projectsFooter).toHaveScreenshot('projects-footer-desktop.png', { animations: 'disabled' });
      });
    });

    test.describe('Mobile', () => {
      test('Header', async ({ page }) => {
        await page.setViewportSize(VIEWPORTS.mobile);
        await navigateAndWait(page, '/proyectos');
        const projects = new ProjectsPage(page);
        await expect(projects.projectsHeader).toHaveScreenshot('projects-header-mobile.png', { animations: 'disabled' });
      });

      for (let i = 0; i < 5; i++) {
        test(`Card ${i}`, async ({ page }) => {
          await page.setViewportSize(VIEWPORTS.mobile);
          await navigateAndWait(page, '/proyectos');
          const projects = new ProjectsPage(page);
          await expect(projects.projectCards.nth(i)).toHaveScreenshot(`projects-card-${i}-mobile.png`, { animations: 'disabled' });
        });
      }

      test('Grid', async ({ page }) => {
        await page.setViewportSize(VIEWPORTS.mobile);
        await navigateAndWait(page, '/proyectos');
        const projects = new ProjectsPage(page);
        await expect(projects.projectsGrid).toHaveScreenshot('projects-grid-mobile.png', { animations: 'disabled' });
      });

      test('Footer', async ({ page }) => {
        await page.setViewportSize(VIEWPORTS.mobile);
        await navigateAndWait(page, '/proyectos');
        const projects = new ProjectsPage(page);
        await expect(projects.projectsFooter).toHaveScreenshot('projects-footer-mobile.png', { animations: 'disabled' });
      });
    });
  });

  /**
   * PPIA PAGE
   * Solo header: el wip-card tiene animaciones CSS que causan inestabilidad en snapshots.
   */
  test.describe('PPiA Page', () => {
    test.describe('Desktop', () => {
      test('Header', async ({ page }) => {
        await page.setViewportSize(VIEWPORTS.desktop);
        await navigateAndWait(page, '/ppia');
        const ppia = new PpiaPage(page);
        await expect(ppia.ppiaHeader).toHaveScreenshot('ppia-header-desktop.png', { animations: 'disabled' });
      });
    });

    test.describe('Mobile', () => {
      test('Header', async ({ page }) => {
        await page.setViewportSize(VIEWPORTS.mobile);
        await navigateAndWait(page, '/ppia');
        const ppia = new PpiaPage(page);
        await expect(ppia.ppiaHeader).toHaveScreenshot('ppia-header-mobile.png', { animations: 'disabled' });
      });
    });
  });

  /**
   * CODE & AI PAGE
   * Split into: header + each article card (5) + articles grid.
   */
  test.describe('Code & AI Page', () => {
    test.describe('Desktop', () => {
      test('Header', async ({ page }) => {
        await page.setViewportSize(VIEWPORTS.desktop);
        await navigateAndWait(page, '/code-ai');
        const codeAi = new CodeAiPage(page);
        await expect(codeAi.codeAiHeader).toHaveScreenshot('code-ai-header-desktop.png', { animations: 'disabled' });
      });

      for (let i = 0; i < 5; i++) {
        test(`Article Card ${i}`, async ({ page }) => {
          await page.setViewportSize(VIEWPORTS.desktop);
          await navigateAndWait(page, '/code-ai');
          const codeAi = new CodeAiPage(page);
          await expect(codeAi.articleCards.nth(i)).toHaveScreenshot(`code-ai-card-${i}-desktop.png`, { animations: 'disabled' });
        });
      }

      test('Articles Grid', async ({ page }) => {
        await page.setViewportSize(VIEWPORTS.desktop);
        await navigateAndWait(page, '/code-ai');
        const codeAi = new CodeAiPage(page);
        await expect(codeAi.articlesGrid).toHaveScreenshot('code-ai-grid-desktop.png', { animations: 'disabled' });
      });
    });

    test.describe('Mobile', () => {
      test('Header', async ({ page }) => {
        await page.setViewportSize(VIEWPORTS.mobile);
        await navigateAndWait(page, '/code-ai');
        const codeAi = new CodeAiPage(page);
        await expect(codeAi.codeAiHeader).toHaveScreenshot('code-ai-header-mobile.png', { animations: 'disabled' });
      });

      for (let i = 0; i < 5; i++) {
        test(`Article Card ${i}`, async ({ page }) => {
          await page.setViewportSize(VIEWPORTS.mobile);
          await navigateAndWait(page, '/code-ai');
          const codeAi = new CodeAiPage(page);
          await expect(codeAi.articleCards.nth(i)).toHaveScreenshot(`code-ai-card-${i}-mobile.png`, { animations: 'disabled' });
        });
      }

      test('Articles Grid', async ({ page }) => {
        await page.setViewportSize(VIEWPORTS.mobile);
        await navigateAndWait(page, '/code-ai');
        const codeAi = new CodeAiPage(page);
        await expect(codeAi.articlesGrid).toHaveScreenshot('code-ai-grid-mobile.png', { animations: 'disabled' });
      });
    });
  });
});
