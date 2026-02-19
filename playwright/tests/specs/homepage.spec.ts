import { test, expect } from '@playwright/test';
import { HomePage } from '@pages';
import { HeaderComponent, FooterComponent } from '@components';

test.describe('Homepage - Smoke', () => {
  test('should serve homepage successfully', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(/José Moreu Peso/);
  });
});

test.describe('Homepage - Hero Section', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
  });

  test('should display hero section', async () => {
    await expect(homePage.hero).toBeVisible();
  });

  test('should display owner name in hero', async () => {
    const heroText = await homePage.getText(homePage.hero);
    expect(heroText).toContain('José Moreu');
  });

  test('should display CV CTA button', async () => {
    await expect(homePage.heroCvButton).toBeVisible();
  });

  test('should display Contact CTA button', async () => {
    await expect(homePage.heroContactButton).toBeVisible();
  });
});

test.describe('Homepage - Quick Intro Section', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
  });

  test('should display Quick Intro section', async () => {
    await expect(homePage.quickIntro).toBeVisible();
  });

  test('should mention 8+ years of experience', async () => {
    const bodyText = await homePage.getBodyText();
    expect(bodyText).toMatch(/8\+?\s*(años|years)/i);
  });

  test('should mention current company or focus', async () => {
    const bodyText = await homePage.getBodyText();
    expect(bodyText).toMatch(/Akkodis|El Confidencial|actual/i);
  });
});

test.describe('Homepage - Stats Cards', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
  });

  test('should display 4 stat cards', async () => {
    const count = await homePage.getStatCardsCount();
    expect(count).toBe(4);
  });

  test('should display "Dev con IA" card with Claude/GPT reference', async () => {
    const statsText = await homePage.getText(homePage.introStats);
    expect(statsText).toContain('Dev con IA');
    expect(statsText).toMatch(/Claude|GPT/i);
  });

  test('should display QA card with Playwright', async () => {
    const statsText = await homePage.getText(homePage.introStats);
    expect(statsText).toContain('QA');
    expect(statsText).toContain('Playwright');
  });

  test('should display Backend card with PHP/Symfony', async () => {
    const statsText = await homePage.getText(homePage.introStats);
    expect(statsText).toContain('Backend');
    expect(statsText).toMatch(/PHP|Symfony/i);
  });

  test('should display years of experience stat', async () => {
    const statsText = await homePage.getText(homePage.introStats);
    expect(statsText).toMatch(/8\+/);
    expect(statsText).toMatch(/Años|Experiencia/i);
  });
});

test.describe('Homepage - Portfolio Context', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
  });

  test('should display portfolio context section', async () => {
    await expect(homePage.portfolioContext.first()).toBeVisible();
  });

  test('should have portfolio-public repository link in context section', async () => {
    const publicRepoLink = homePage.portfolioContext.first().locator('a[href*="portfolio-public"]');
    await expect(publicRepoLink).toBeVisible();
    await expect(publicRepoLink).toHaveAttribute('href', 'https://github.com/joseguillermomoreu-gif/portfolio-public');
    await expect(publicRepoLink).toHaveAttribute('target', '_blank');
  });
});

test.describe('Homepage - Current Focus Links', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
  });

  test('should have Akkodis link opening in new tab', async () => {
    await expect(homePage.akkodisLink).toBeVisible();
    await expect(homePage.akkodisLink).toHaveAttribute('target', '_blank');
  });

  test('should have El Confidencial link opening in new tab', async () => {
    await expect(homePage.elConfidencialLink).toBeVisible();
    await expect(homePage.elConfidencialLink).toHaveAttribute('target', '_blank');
  });

  test('should specify Senior Backend Developer role', async () => {
    const bodyText = await homePage.getBodyText();
    expect(bodyText).toContain('Senior Backend');
  });

  test('should specify Tech Lead for E2E automation', async () => {
    const bodyText = await homePage.getBodyText();
    expect(bodyText).toContain('Tech Lead');
    expect(bodyText).toMatch(/Playwright|E2E|automatizacion/i);
  });
});

test.describe('Homepage - Header & Footer', () => {
  test('should display header', async ({ page }) => {
    const header = new HeaderComponent(page);
    await page.goto('/');
    await expect(header.container).toBeVisible();
  });

  test('should display footer', async ({ page }) => {
    const footer = new FooterComponent(page);
    await page.goto('/');
    await expect(footer.container).toBeVisible();
  });

  test('should have GitHub profile link in footer', async ({ page }) => {
    const footer = new FooterComponent(page);
    await page.goto('/');
    const githubLink = footer.container.locator('a[href="https://github.com/joseguillermomoreu-gif"]');
    await expect(githubLink).toBeVisible();
    await expect(githubLink).toHaveAttribute('target', '_blank');
  });
});

test.describe('Homepage - Responsive', () => {
  test('should display 4 stat cards on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const homePage = new HomePage(page);
    await homePage.navigate();
    const count = await homePage.getStatCardsCount();
    expect(count).toBe(4);
  });

  test('should display hero and quick intro on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const homePage = new HomePage(page);
    await homePage.navigate();
    await expect(homePage.hero).toBeVisible();
    await expect(homePage.quickIntro).toBeVisible();
  });
});

// #102 - Mejoras home
test.describe('Homepage - Mejoras #102', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
  });

  test('should use "y Tech Lead" (not comma) in intro headline', async () => {
    const introText = await homePage.getText(homePage.quickIntroHeader);
    expect(introText).toContain('y Tech Lead Playwright');
    expect(introText).not.toMatch(/Backend,\s*Tech Lead/);
  });

  test('should mention portfolio is in continuous growth', async () => {
    const contextText = await homePage.getText(homePage.portfolioContext.first());
    expect(contextText).toMatch(/continuo crecimiento|mejora continua/i);
  });

  test('should link to public portfolio repository', async ({ page }) => {
    const publicRepoLink = page.locator('a[href*="portfolio-public"]');
    await expect(publicRepoLink).toBeVisible();
    await expect(publicRepoLink).toHaveAttribute('href', 'https://github.com/joseguillermomoreu-gif/portfolio-public');
  });

  test('should show 2+ years for "Coding con IA" skill', async () => {
    const skillsText = await homePage.getText(homePage.stackVisual);
    // Busca "Coding con IA" junto a indicador de 2+
    expect(skillsText).toMatch(/Coding con IA/i);
    expect(skillsText).toMatch(/\+\s*de\s*2|2\+/i);
  });

  test('hero tagline should be properly centered on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await homePage.navigate();
    const tagline = page.locator('.hero .tagline');
    await expect(tagline).toBeVisible();
    const styles = await tagline.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return { textAlign: computed.textAlign };
    });
    expect(styles.textAlign).toBe('center');
  });

  test('hero tagline should wrap naturally (not nowrap) on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await homePage.navigate();
    const tagline = page.locator('.hero .tagline');
    const styles = await tagline.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return { whiteSpace: computed.whiteSpace };
    });
    expect(styles.whiteSpace).not.toBe('nowrap');
  });

  test('hero tagline "con IA como copiloto" should be on second line on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await homePage.navigate();
    const tagline = page.locator('.hero .tagline');
    const highlight = tagline.locator('.highlight');
    const taglineBox = await tagline.boundingBox();
    const highlightBox = await highlight.boundingBox();
    // El highlight debe estar en una Y claramente mayor que el inicio del tagline (segunda línea)
    expect(highlightBox!.y).toBeGreaterThan(taglineBox!.y + 20);
  });
});
