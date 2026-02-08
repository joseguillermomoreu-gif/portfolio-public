import { test, expect } from '@playwright/test';

/**
 * Homepage Tests - josemoreupeso.es
 */

test.describe('Homepage Smoke Test', () => {
  test('should serve homepage successfully', async ({ page }) => {
    // Act - Navigate to homepage
    const response = await page.goto('/');

    // Assert - Verify response is OK
    expect(response?.status()).toBe(200);

    // Assert - Verify page loaded
    await expect(page).toHaveTitle(/José Moreu Peso/);
  });
});

test.describe('Quick Intro Section', () => {
  test('should display Quick Intro heading', async ({ page }) => {
    await page.goto('/');

    const heading = page.locator('h3:has-text("Quick Intro"), h2:has-text("Quick Intro")');
    await expect(heading).toBeVisible();
  });

  test('should display headline statement', async ({ page }) => {
    await page.goto('/');

    // Verify there's a prominent intro text
    const intro = page.locator('.quick-intro').first();
    await expect(intro).toBeVisible();

    const content = await intro.textContent();
    expect(content).toBeTruthy();
  });

  test('should display stats/highlights', async ({ page }) => {
    await page.goto('/');

    // Verify experience mention (8+ años)
    const pageContent = await page.locator('body').textContent();
    expect(pageContent).toMatch(/8\+?\s*(años|years)/i);
  });

  test('should display current company/focus', async ({ page }) => {
    await page.goto('/');

    const pageContent = await page.locator('body').textContent();

    // Verify mentions current work context
    expect(pageContent).toMatch(/Akkodis|El Confidencial|actual/i);
  });

  test('should be visually scannable', async ({ page }) => {
    await page.goto('/');

    const quickIntro = page.locator('.quick-intro').first();
    await expect(quickIntro).toBeVisible();

    // Should have visual structure
    const elements = await quickIntro.locator('> *').count();
    expect(elements).toBeGreaterThanOrEqual(1);

    // Verify content is present
    const content = await quickIntro.textContent();
    expect(content).toBeTruthy();
  });
});

// ===== v1.2.0 UX Improvements Tests =====

test.describe('Homepage - Hero Section (v1.2.0)', () => {
  test('should display name, title and CTA buttons', async ({ page }) => {
    await page.goto('/');

    // Name and title should be present
    const pageContent = await page.locator('.hero').textContent();
    expect(pageContent).toContain('José Moreu');

    // CTA buttons (scope to hero section to avoid nav links)
    const cvButton = page.locator('.hero a[href="/cv"]:has-text("Ver CV")');
    await expect(cvButton).toBeVisible();

    const contactButton = page.locator('.hero a[href="/contacto"]:has-text("Contacto")');
    await expect(contactButton).toBeVisible();
  });
});

test.describe('Homepage - Stats Cards (v1.2.0)', () => {
  test('should display 4 stat cards', async ({ page }) => {
    await page.goto('/');

    const statCards = page.locator('.stat-card');
    const count = await statCards.count();

    // v1.2.0: 4 cards (Experiencia, Dev IA, Backend, QA)
    expect(count).toBe(4);
  });

  test('should display "Dev con IA" card', async ({ page }) => {
    await page.goto('/');

    const statsContent = await page.locator('.intro-stats').textContent();

    expect(statsContent).toContain('Dev con IA');
    // Should mention Claude or GPT
    expect(statsContent).toMatch(/Claude|GPT/i);
  });

  test('should display "QA" card', async ({ page }) => {
    await page.goto('/');

    const statsContent = await page.locator('.intro-stats').textContent();

    expect(statsContent).toContain('QA');
    expect(statsContent).toContain('Playwright');
  });

  test('should display "Backend" card', async ({ page }) => {
    await page.goto('/');

    const statsContent = await page.locator('.intro-stats').textContent();

    expect(statsContent).toContain('Backend');
    expect(statsContent).toMatch(/PHP|Symfony/i);
  });

  test('should display years of experience', async ({ page }) => {
    await page.goto('/');

    const statsContent = await page.locator('.intro-stats').textContent();

    expect(statsContent).toMatch(/8\+/);
    expect(statsContent).toMatch(/Años|Experiencia/i);
  });
});

test.describe('Homepage - Portfolio Context (v1.2.0)', () => {
  test('should display "Sobre este portfolio" section', async ({ page }) => {
    await page.goto('/');

    const context = page.locator('.portfolio-context, .intro-highlights');
    await expect(context.first()).toBeVisible();

    const content = await context.first().textContent();

    // Should explain what this portfolio is
    expect(content).toMatch(/portfolio|demostración|habilidades/i);
  });

  test('should have GitHub link to user profile (not repo)', async ({ page }) => {
    await page.goto('/');

    // v1.4.7: GitHub link should point to user profile, not specific repo
    const githubLink = page.locator('.portfolio-context a[href="https://github.com/joseguillermomoreu-gif"]').first();
    await expect(githubLink).toBeVisible();

    // Should open in new tab
    const target = await githubLink.getAttribute('target');
    expect(target).toBe('_blank');

    // Should NOT link to /portfolio repo
    const href = await githubLink.getAttribute('href');
    expect(href).toBe('https://github.com/joseguillermomoreu-gif');
    expect(href).not.toContain('/portfolio');
  });

  test('should mention open source', async ({ page }) => {
    await page.goto('/');

    const pageContent = await page.locator('body').textContent();

    expect(pageContent).toMatch(/código abierto|open source|github/i);
  });
});

test.describe('Homepage - Current Focus Links (v1.2.0)', () => {
  test('should have link to Akkodis', async ({ page }) => {
    await page.goto('/');

    const akkodisLink = page.locator('a[href*="akkodis.com"]');
    await expect(akkodisLink).toBeVisible();

    // Should open in new tab
    const target = await akkodisLink.getAttribute('target');
    expect(target).toBe('_blank');
  });

  test('should have link to El Confidencial', async ({ page }) => {
    await page.goto('/');

    const elConfidencialLink = page.locator('a[href*="elconfidencial.com"]');
    await expect(elConfidencialLink).toBeVisible();

    // Should open in new tab
    const target = await elConfidencialLink.getAttribute('target');
    expect(target).toBe('_blank');
  });

  test('should specify "Senior Backend Developer" role', async ({ page }) => {
    await page.goto('/');

    // Check body content instead of specific selector to avoid strict mode violation
    const pageContent = await page.locator('body').textContent();

    expect(pageContent).toContain('Senior Backend');
  });

  test('should specify "Tech Lead" for E2E automation', async ({ page }) => {
    await page.goto('/');

    // Check body content instead of specific selector to avoid strict mode violation
    const pageContent = await page.locator('body').textContent();

    expect(pageContent).toContain('Tech Lead');
    expect(pageContent).toMatch(/Playwright|E2E|automatizacion/i);
  });
});

test.describe('Homepage - Responsive (v1.2.0)', () => {
  test('should display 4 cards in 2x2 grid on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const statCards = page.locator('.stat-card');
    await expect(statCards.first()).toBeVisible();

    // Should have 4 cards
    const count = await statCards.count();
    expect(count).toBe(4);
  });

  test('should be readable on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Hero should be visible
    const hero = page.locator('.hero');
    await expect(hero).toBeVisible();

    // Quick intro should be visible
    const quickIntro = page.locator('.quick-intro');
    await expect(quickIntro).toBeVisible();

    // Stats should be visible
    const stats = page.locator('.intro-stats');
    await expect(stats).toBeVisible();
  });
});
