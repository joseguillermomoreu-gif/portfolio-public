import { test, expect } from '@playwright/test';


test.describe('Navigation Menu - Order (v1.3.0)', () => {
  test('should have correct menu order', async ({ page }) => {
    await page.goto('/');

    const navLinks = page.locator('.nav-links .nav-link');
    const linkTexts = await navLinks.allTextContents();

    // Expected order: Home, CV, Code & AI, PPiA, Contacto
    expect(linkTexts[0]).toBe('Home');
    expect(linkTexts[1]).toBe('CV');
    expect(linkTexts[2]).toBe('Code & AI');
    expect(linkTexts[3]).toBe('PPiA');
    expect(linkTexts[4]).toBe('Contacto');
  });

  test('Code & AI should come before PPiA', async ({ page }) => {
    await page.goto('/');

    const navLinks = page.locator('.nav-links .nav-link');
    const linkTexts = await navLinks.allTextContents();

    const codeAiIndex = linkTexts.indexOf('Code & AI');
    const ppiaIndex = linkTexts.indexOf('PPiA');

    expect(codeAiIndex).toBeLessThan(ppiaIndex);
  });
});

test.describe('Navigation Menu - Desktop', () => {
  test('should display all nav links on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');

    const navLinks = page.locator('.nav-links');
    await expect(navLinks).toBeVisible();

    // Hamburger should be hidden
    const hamburger = page.locator('.mobile-menu-toggle');
    const hamburgerCount = await hamburger.count();

    if (hamburgerCount > 0) {
      await expect(hamburger).not.toBeVisible();
    }
  });
});

test.describe('Navigation Menu - Mobile Hamburger (v1.3.0)', () => {
  test('should show hamburger button on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const hamburger = page.locator('.mobile-menu-toggle');
    await expect(hamburger).toBeVisible();
  });

  test('menu should be hidden by default on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const navLinks = page.locator('.nav-links');

    // Should exist but have active class removed (off-screen)
    await expect(navLinks).toBeAttached();

    // Check if it has 'active' class (should not)
    const hasActive = await navLinks.evaluate(el => el.classList.contains('active'));
    expect(hasActive).toBe(false);
  });

  test('clicking hamburger should open mobile menu', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const hamburger = page.locator('.mobile-menu-toggle');
    const navLinks = page.locator('.nav-links');

    // Click hamburger
    await hamburger.click();

    // Wait a bit for animation
    await page.waitForTimeout(500);

    // Menu should become visible with active class
    await expect(navLinks).toHaveClass(/active/);

    // Hamburger should animate to X
    await expect(hamburger).toHaveClass(/active/);

    // Overlay should appear
    const overlay = page.locator('.mobile-overlay');
    await expect(overlay).toHaveClass(/active/);
  });

  test('clicking menu link should close mobile menu', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const hamburger = page.locator('.mobile-menu-toggle');
    const navLinks = page.locator('.nav-links');

    // Open menu
    await hamburger.click();
    await page.waitForTimeout(500);
    await expect(navLinks).toHaveClass(/active/);

    // Click a link
    const cvLink = page.locator('.nav-link:has-text("CV")');
    await cvLink.click();

    // Wait for navigation
    await page.waitForURL(/\/cv/);

    // Menu should close (check on new page after load)
    const navLinksAfter = page.locator('.nav-links');
    const hasActive = await navLinksAfter.evaluate(el => el.classList.contains('active'));
    expect(hasActive).toBe(false);
  });

  test('clicking overlay should close mobile menu', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const hamburger = page.locator('.mobile-menu-toggle');
    const navLinks = page.locator('.nav-links');
    const overlay = page.locator('.mobile-overlay');

    // Open menu
    await hamburger.click();
    await page.waitForTimeout(500);
    await expect(navLinks).toHaveClass(/active/);

    // Click overlay
    await overlay.click();
    await page.waitForTimeout(300);

    // Menu should close
    const hasActive = await navLinks.evaluate(el => el.classList.contains('active'));
    expect(hasActive).toBe(false);
  });

  test('pressing ESC should close mobile menu', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const hamburger = page.locator('.mobile-menu-toggle');
    const navLinks = page.locator('.nav-links');

    // Open menu
    await hamburger.click();
    await page.waitForTimeout(500);
    await expect(navLinks).toHaveClass(/active/);

    // Press ESC
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);

    // Menu should close
    const hasActive = await navLinks.evaluate(el => el.classList.contains('active'));
    expect(hasActive).toBe(false);
  });

  test('all menu items should be accessible in mobile menu', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const hamburger = page.locator('.mobile-menu-toggle');
    await hamburger.click();
    await page.waitForTimeout(500);

    const navLinks = page.locator('.nav-links .nav-link');
    await expect(navLinks).toHaveCount(5);

    // Verify all links are visible when menu is open
    for (let i = 0; i < 5; i++) {
      await expect(navLinks.nth(i)).toBeAttached();
    }
  });
});

test.describe('Navigation Menu - Accessibility (v1.3.0)', () => {
  test('hamburger should have proper ARIA attributes', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const hamburger = page.locator('.mobile-menu-toggle');

    // Should have aria-label
    const ariaLabel = await hamburger.getAttribute('aria-label');
    expect(ariaLabel).toBeTruthy();

    // Should have aria-expanded (false when closed)
    const ariaExpanded = await hamburger.getAttribute('aria-expanded');
    expect(ariaExpanded).toBe('false');

    // Open menu
    await hamburger.click();
    await page.waitForTimeout(500);

    // aria-expanded should be true
    const ariaExpandedOpen = await hamburger.getAttribute('aria-expanded');
    expect(ariaExpandedOpen).toBe('true');
  });
});
