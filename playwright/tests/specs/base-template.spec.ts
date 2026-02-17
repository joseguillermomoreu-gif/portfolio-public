import { test, expect } from '@playwright/test';
import { HeaderComponent, FooterComponent } from '@components';

test.describe('Base Template - Header', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display header', async ({ page }) => {
    const header = new HeaderComponent(page);
    await expect(header.container).toBeVisible();
  });

  test('should display logo with owner name', async ({ page }) => {
    const header = new HeaderComponent(page);
    await expect(header.logo).toHaveText('José Moreu Peso');
  });

  test('should have 6 navigation links', async ({ page }) => {
    const header = new HeaderComponent(page);
    await expect(header.navLinks).toHaveCount(6);
  });

  test('should have navigation links in correct order', async ({ page }) => {
    const header = new HeaderComponent(page);
    const expectedLinks = ['Home', 'CV', 'Code & AI', 'PPiA', 'Proyectos', 'Contacto'];
    const linkTexts = await header.navLinks.allTextContents();
    for (let i = 0; i < expectedLinks.length; i++) {
      expect(linkTexts[i]).toBe(expectedLinks[i]);
    }
  });

  test('should highlight active Home link on homepage', async ({ page }) => {
    const header = new HeaderComponent(page);
    const activeLink = header.navLinksContainer.locator('.nav-link.active');
    await expect(activeLink).toHaveText('Home');
  });

  test('should have accessible navigation element', async ({ page }) => {
    const header = new HeaderComponent(page);
    await expect(header.navigation).toHaveAttribute('aria-label', 'Main navigation');
  });
});

test.describe('Base Template - Theme Toggle (Desktop)', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('should start with light theme by default', async ({ page }) => {
    await page.goto('/');
    const theme = await (new HeaderComponent(page)).getCurrentTheme();
    expect(theme).toBe('light');
  });

  test('should display theme toggle button with aria-label', async ({ page }) => {
    const header = new HeaderComponent(page);
    await page.goto('/');
    await expect(header.themeToggle).toBeVisible();
    await expect(header.themeToggle).toHaveAttribute('aria-label', /theme/i);
  });
});

test.describe('Base Template - Footer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display footer', async ({ page }) => {
    const footer = new FooterComponent(page);
    await expect(footer.container).toBeVisible();
  });

  test('should have social links with security attributes', async ({ page }) => {
    const footer = new FooterComponent(page);
    await expect(footer.socialLinks.first()).toBeVisible();
    await expect(footer.socialLinks.first()).toHaveAttribute('target', '_blank');
    await expect(footer.socialLinks.first()).toHaveAttribute('rel', /noopener/);
  });

  test('should display version number in footer', async ({ page }) => {
    const footer = new FooterComponent(page);
    await footer.scrollToFooter();
    await expect(footer.version).toBeVisible();
    await expect(footer.version).toContainText(/v\d+\.\d+\.\d+/);
  });

  test('should display author attribution in footer', async ({ page }) => {
    const footer = new FooterComponent(page);
    await footer.scrollToFooter();
    await expect(footer.footerText).toContainText('José Guillermo Moreu');
    await expect(footer.footerText).toContainText('PHP + Symfony');
  });
});

test.describe('Base Template - SEO & Meta Tags', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have meta description and keywords', async ({ page }) => {
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /.+/);

    const metaKeywords = page.locator('meta[name="keywords"]');
    await expect(metaKeywords).toHaveAttribute('content', /.+/);
  });

  test('should have canonical link pointing to josemoreupeso.es', async ({ page }) => {
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', /josemoreupeso\.es/);
  });

  test('should have Open Graph meta tags', async ({ page }) => {
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'website');
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /https:\/\/.+/);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', /josemoreupeso\.es/);
  });

  test('should have Twitter Card meta tags', async ({ page }) => {
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
    await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[name="twitter:description"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute('content', /https:\/\/.+/);
  });
});

test.describe('Base Template - Accessibility (Lighthouse-style)', () => {
  test('each page should have single h1', async ({ page }) => {
    const routes = ['/', '/cv', '/contacto', '/proyectos', '/code-ai', '/ppia'];
    for (const route of routes) {
      await page.goto(route);
      const h1Count = await page.locator('h1').count();
      expect(h1Count).toBeLessThanOrEqual(1);
    }
  });

  test('external links should have noopener attribute', async ({ page }) => {
    await page.goto('/');
    const externalLinks = page.locator('a[target="_blank"]');
    const count = await externalLinks.count();
    for (let i = 0; i < count; i++) {
      const rel = await externalLinks.nth(i).getAttribute('rel');
      expect(rel).toMatch(/noopener/);
    }
  });
});

test.describe('Base Template - Smoke Routes', () => {
  const routes = [
    { path: '/', name: 'Homepage' },
    { path: '/cv', name: 'CV' },
    { path: '/contacto', name: 'Contact' },
    { path: '/proyectos', name: 'Projects' },
    { path: '/code-ai', name: 'Code & AI' },
    { path: '/ppia', name: 'PPiA' },
  ];

  for (const route of routes) {
    test(`should load ${route.name} with 200 OK`, async ({ page }) => {
      const response = await page.goto(route.path);
      expect(response?.status()).toBe(200);
    });
  }
});
