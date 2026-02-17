import { test, expect } from '@playwright/test';
import { ProjectsPage } from '@pages';

test.describe('Proyectos Page', () => {
  let projectsPage: ProjectsPage;

  test.beforeEach(async ({ page }) => {
    projectsPage = new ProjectsPage(page);
    await projectsPage.navigate();
  });

  test('should display projects page with heading "Proyectos"', async ({ page }) => {
    await expect(page).toHaveURL(/\/proyectos/);
    await expect(projectsPage.heading).toContainText('Proyectos');
  });

  test('should display 5 project cards', async () => {
    await expect(projectsPage.projectCards).toHaveCount(5);
  });

  test('should display POM-PPIA project correctly', async () => {
    const card = projectsPage.getProjectCardByName('POM-PPIA');

    await expect(projectsPage.getProjectStatus(card)).toContainText('Production');
    await expect(projectsPage.getProjectDescription(card)).toContainText('Generador de POM');
    await expect(projectsPage.getProjectStack(card)).toContainText('Python 3.12+');
    await expect(projectsPage.getProjectStack(card)).toContainText('OpenAI GPT-4');
    await expect(projectsPage.getProjectTags(card)).toContainText('Python');
    await expect(projectsPage.getProjectTags(card)).toContainText('OpenAI');
    await expect(projectsPage.getProjectTags(card)).toContainText('Playwright');
    await expect(projectsPage.getProjectHighlights(card)).toContainText('Arquitectura Hexagonal');

    const githubLink = projectsPage.getProjectGithubLink(card);
    await expect(githubLink).toBeVisible();
    await expect(githubLink).toHaveAttribute('href', 'https://github.com/joseguillermomoreu-gif/pom-ppia');
  });

  test('should display End2EndGuru99 as Showcase project', async () => {
    const card = projectsPage.getProjectCardByName('End2EndGuru99');

    await expect(projectsPage.getProjectStatus(card)).toContainText('Showcase');
    await expect(projectsPage.getProjectDescription(card)).toContainText('PPIA');
    await expect(projectsPage.getProjectTags(card)).toContainText('PPIA');
    await expect(projectsPage.getProjectTags(card)).toContainText('POM-PPIA');

    const githubLink = projectsPage.getProjectGithubLink(card);
    await expect(githubLink).toHaveAttribute('href', 'https://github.com/joseguillermomoreu-gif/end2endGuru99');
  });

  test('should display Portfolio project in Production with website link', async () => {
    const card = projectsPage.getProjectCardByName('Portfolio');

    await expect(projectsPage.getProjectStatus(card)).toContainText('Production');
    await expect(projectsPage.getProjectGithubLink(card)).toBeVisible();

    const websiteLink = projectsPage.getProjectWebsiteLink(card);
    await expect(websiteLink).toBeVisible();
    await expect(websiteLink).toHaveAttribute('href', 'https://josemoreupeso.es');
  });

  test('should display PPIA as Private project without GitHub link', async () => {
    const card = projectsPage.projectCards.filter({
      has: projectsPage.page.locator('[data-testid="project-name"]').getByText('PPIA', { exact: true }),
    }).first();

    await expect(projectsPage.getProjectStatus(card)).toContainText('Private');
    await expect(projectsPage.getProjectHighlights(card)).toContainText('El Confidencial');
    await expect(projectsPage.getProjectGithubLink(card)).toBeHidden();
  });

  test('should display Claude Code Auto-Skills in Production', async () => {
    const card = projectsPage.getProjectCardByName('Claude Code Auto-Skills');

    await expect(card).toBeVisible();
    await expect(projectsPage.getProjectStatus(card)).toContainText('Production');
    await expect(projectsPage.getProjectStack(card)).toContainText('Bash');
    await expect(projectsPage.getProjectTags(card)).toContainText('Claude Code');
    await expect(projectsPage.getProjectTags(card)).toContainText('IA');

    const githubLink = projectsPage.getProjectGithubLink(card);
    await expect(githubLink).toHaveAttribute('href', 'https://github.com/joseguillermomoreu-gif/claude-code-auto-skills');
  });

  test('should have responsive layout on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await projectsPage.navigate();
    await expect(projectsPage.projectCards).toHaveCount(5);
    await expect(projectsPage.projectCards.first()).toBeVisible();
  });

  test('featured projects should appear before non-featured', async () => {
    const firstProject = projectsPage.projectCards.nth(0);
    await expect(firstProject).toContainText(/POM-PPIA|Claude Code Auto-Skills|Portfolio|End2EndGuru99/);

    const lastProject = projectsPage.projectCards.nth(4);
    await expect(lastProject).toContainText('Playwright Page Inspector with AI');
  });
});
