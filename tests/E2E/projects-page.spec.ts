import { test, expect } from '@playwright/test';

test.describe('Proyectos Page', () => {
  test('should display projects page with correct content', async ({ page }) => {
    await page.goto('/proyectos');

    // Check page loads successfully
    await expect(page).toHaveURL(/\/proyectos/);

    // Check page title
    await expect(page.locator('h1')).toContainText('Proyectos');

    // Check all 5 projects are visible (including private PPIA)
    const projectCards = page.locator('[data-testid="project-card"]');
    await expect(projectCards).toHaveCount(5);
  });

  test('should display POM-PPIA project correctly', async ({ page }) => {
    await page.goto('/proyectos');

    const pomPpiaCard = page.locator('[data-testid="project-card"]').filter({
      has: page.locator('[data-testid="project-name"]', { hasText: 'POM-PPIA' })
    }).first();

    // Check project name
    await expect(pomPpiaCard.locator('[data-testid="project-name"]')).toContainText('POM-PPIA');

    // Check description
    await expect(pomPpiaCard.locator('[data-testid="project-description"]')).toContainText('Generador de POM');

    // Check status badge - production
    await expect(pomPpiaCard.locator('[data-testid="project-status"]')).toContainText('Production');

    // Check GitHub link exists
    const githubLink = pomPpiaCard.locator('[data-testid="project-github-link"]');
    await expect(githubLink).toBeVisible();
    await expect(githubLink).toHaveAttribute('href', 'https://github.com/joseguillermomoreu-gif/pom-ppia');

    // Check stack technologies are visible
    await expect(pomPpiaCard.locator('[data-testid="project-stack"]')).toContainText('Python 3.12+');
    await expect(pomPpiaCard.locator('[data-testid="project-stack"]')).toContainText('OpenAI GPT-4');

    // Check tags
    await expect(pomPpiaCard.locator('[data-testid="project-tags"]')).toContainText('Python');
    await expect(pomPpiaCard.locator('[data-testid="project-tags"]')).toContainText('OpenAI');
    await expect(pomPpiaCard.locator('[data-testid="project-tags"]')).toContainText('Playwright');

    // Check highlights
    await expect(pomPpiaCard.locator('[data-testid="project-highlights"]')).toContainText('Arquitectura Hexagonal');
  });

  test('should display End2EndGuru99 as showcase project', async ({ page }) => {
    await page.goto('/proyectos');

    const guru99Card = page.locator('[data-testid="project-card"]').filter({
      has: page.locator('[data-testid="project-name"]', { hasText: 'End2EndGuru99' })
    }).first();

    // Check status is showcase
    await expect(guru99Card.locator('[data-testid="project-status"]')).toContainText('Showcase');

    // Check description mentions PPIA tools
    await expect(guru99Card.locator('[data-testid="project-description"]')).toContainText('PPIA');

    // Check tags include PPIA and POM-PPIA
    await expect(guru99Card.locator('[data-testid="project-tags"]')).toContainText('PPIA');
    await expect(guru99Card.locator('[data-testid="project-tags"]')).toContainText('POM-PPIA');

    // Check GitHub link
    const githubLink = guru99Card.locator('[data-testid="project-github-link"]');
    await expect(githubLink).toBeVisible();
    await expect(githubLink).toHaveAttribute('href', 'https://github.com/joseguillermomoreu-gif/end2endGuru99');
  });

  test('should display Portfolio project with website link', async ({ page }) => {
    await page.goto('/proyectos');

    const portfolioCard = page.locator('[data-testid="project-card"]').filter({
      has: page.locator('[data-testid="project-name"]', { hasText: 'Portfolio' })
    }).first();

    // Check status is production
    await expect(portfolioCard.locator('[data-testid="project-status"]')).toContainText('Production');

    // Check both GitHub and website links exist
    await expect(portfolioCard.locator('[data-testid="project-github-link"]')).toBeVisible();

    const websiteLink = portfolioCard.locator('[data-testid="project-website-link"]');
    await expect(websiteLink).toBeVisible();
    await expect(websiteLink).toHaveAttribute('href', 'https://josemoreupeso.es');
  });

  test('should display PPIA as private project without GitHub link', async ({ page }) => {
    await page.goto('/proyectos');

    const ppiaCard = page.locator('[data-testid="project-card"]').filter({
      has: page.locator('[data-testid="project-name"]').getByText('PPIA', { exact: true })
    }).first();

    // Check status is private
    await expect(ppiaCard.locator('[data-testid="project-status"]')).toContainText('Private');

    // Check highlights mention El Confidencial
    await expect(ppiaCard.locator('[data-testid="project-highlights"]')).toContainText('El Confidencial');

    // Check GitHub link does NOT exist (private repo)
    await expect(ppiaCard.locator('[data-testid="project-github-link"]')).not.toBeVisible();
  });

  test('should display Claude Code Auto-Skills correctly', async ({ page }) => {
    await page.goto('/proyectos');

    const autoSkillsCard = page.locator('[data-testid="project-card"]').filter({
      has: page.locator('[data-testid="project-name"]', { hasText: 'Claude Code Auto-Skills' })
    }).first();

    // Check it's visible
    await expect(autoSkillsCard).toBeVisible();

    // Check status is production
    await expect(autoSkillsCard.locator('[data-testid="project-status"]')).toContainText('Production');

    // Check stack includes Bash
    await expect(autoSkillsCard.locator('[data-testid="project-stack"]')).toContainText('Bash');

    // Check tags include Claude Code and IA
    await expect(autoSkillsCard.locator('[data-testid="project-tags"]')).toContainText('Claude Code');
    await expect(autoSkillsCard.locator('[data-testid="project-tags"]')).toContainText('IA');

    // Check GitHub link
    const githubLink = autoSkillsCard.locator('[data-testid="project-github-link"]');
    await expect(githubLink).toBeVisible();
    await expect(githubLink).toHaveAttribute('href', 'https://github.com/joseguillermomoreu-gif/claude-code-auto-skills');
  });

  test('should have responsive layout on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
    await page.goto('/proyectos');

    // Projects should still be visible on mobile
    const projectCards = page.locator('[data-testid="project-card"]');
    await expect(projectCards).toHaveCount(5);

    // First project should be visible
    await expect(projectCards.first()).toBeVisible();
  });

  test('should display featured projects first', async ({ page }) => {
    await page.goto('/proyectos');

    const projectCards = page.locator('[data-testid="project-card"]');

    // First 4 projects should be featured (POM-PPIA, Auto-Skills, Portfolio, End2EndGuru99)
    const firstProject = projectCards.nth(0);
    await expect(firstProject).toContainText(/POM-PPIA|Claude Code Auto-Skills|Portfolio|End2EndGuru99/);

    // Last project should be PPIA (not featured)
    const lastProject = projectCards.nth(4);
    await expect(lastProject).toContainText('Playwright Page Inspector with AI');
  });
});
