import { test } from '@playwright/test';
import * as homePage from '@components/home';
import * as headerPage from '@components/header';

test('home visual hero', async ({ page }) => {
  await test.step('When: el usuario navega a la página principal', async () => {
    await homePage.navigateHome(page);
  });

  await test.step('Then: el hero coincide con el snapshot visual', async () => {
    await homePage.heroMatchesSnapshot(page, 'home-hero-mobile.png');
  });
});

test('home visual quick intro: header', async ({ page }) => {
  await test.step('When: el usuario navega a la página principal', async () => {
    await homePage.navigateHome(page);
  });

  await test.step('Then: el header de quick intro coincide con el snapshot visual', async () => {
    await homePage.quickIntroHeaderMatchesSnapshot(page, 'home-quick-intro-header-mobile.png');
  });
});

test('home visual quick intro: stats', async ({ page }) => {
  await test.step('When: el usuario navega a la página principal', async () => {
    await homePage.navigateHome(page);
  });

  await test.step('Then: las stats de quick intro coinciden con el snapshot visual', async () => {
    await homePage.quickIntroStatsMatchesSnapshot(page, 'home-quick-intro-stats-mobile.png');
  });
});

test('home visual contexto', async ({ page }) => {
  await test.step('When: el usuario navega a la página principal', async () => {
    await homePage.navigateHome(page);
  });

  await test.step('Then: la sección de contexto coincide con el snapshot visual', async () => {
    await homePage.portfolioContextMatchesSnapshot(page, 'home-quick-intro-context-mobile.png');
  });
});

test('home visual foco', async ({ page }) => {
  await test.step('When: el usuario navega a la página principal', async () => {
    await homePage.navigateHome(page);
  });

  await test.step('Then: la sección de foco actual coincide con el snapshot visual', async () => {
    await homePage.currentFocusMatchesSnapshot(page, 'home-quick-intro-focus-mobile.png');
  });
});

// ─── Skills Grid ──────────────────────────────────────────────────────────────

test('home visual skills: grid', async ({ page }) => {
  await test.step('When: el usuario navega a la página principal', async () => {
    await homePage.navigateHome(page);
  });

  await test.step('When: oculta el header', async () => {
    await headerPage.hideHeader(page);
  });

  await test.step('Then: el grid de skills (6 items) coincide con el snapshot visual', async () => {
    await homePage.skillsGridMatchesSnapshot(page, 'home-skills-grid-mobile.png');
  });
});

// ─── Skills: Esquinas expandidas ──────────────────────────────────────────────

test('home visual skills: esquina superior izquierda expandida', async ({ page }) => {
  await test.step('Given: el usuario navega a la página principal', async () => {
    await homePage.navigateHome(page);
  });

  await test.step('When: oculta el header y expande la skill de la esquina superior izquierda (pos 1)', async () => {
    await headerPage.hideHeader(page);
    await homePage.expandSkillAtPosition(page, 1);
  });

  await test.step('Then: el grid coincide con el snapshot visual', async () => {
    await homePage.skillsGridExpandedMatchesSnapshot(page, 'home-skills-grid-mobile-expanded-top-left.png');
  });
});

test('home visual skills: esquina superior derecha expandida', async ({ page }) => {
  await test.step('Given: el usuario navega a la página principal', async () => {
    await homePage.navigateHome(page);
  });

  await test.step('When: oculta el header y expande la skill de la esquina superior derecha (pos 2)', async () => {
    await headerPage.hideHeader(page);
    await homePage.expandSkillAtPosition(page, 2);
  });

  await test.step('Then: el grid coincide con el snapshot visual', async () => {
    await homePage.skillsGridExpandedMatchesSnapshot(page, 'home-skills-grid-mobile-expanded-top-right.png');
  });
});

test('home visual skills: esquina inferior izquierda expandida', async ({ page }) => {
  await test.step('Given: el usuario navega a la página principal', async () => {
    await homePage.navigateHome(page);
  });

  await test.step('When: oculta el header y expande la skill de la esquina inferior izquierda (pos 5)', async () => {
    await headerPage.hideHeader(page);
    await homePage.expandSkillAtPosition(page, 5);
  });

  await test.step('Then: el grid coincide con el snapshot visual', async () => {
    await homePage.skillsGridExpandedMatchesSnapshot(page, 'home-skills-grid-mobile-expanded-bottom-left.png');
  });
});

test('home visual skills: esquina inferior derecha expandida', async ({ page }) => {
  await test.step('Given: el usuario navega a la página principal', async () => {
    await homePage.navigateHome(page);
  });

  await test.step('When: oculta el header y expande la skill de la esquina inferior derecha (pos 6)', async () => {
    await headerPage.hideHeader(page);
    await homePage.expandSkillAtPosition(page, 6);
  });

  await test.step('Then: el grid coincide con el snapshot visual', async () => {
    await homePage.skillsGridExpandedMatchesSnapshot(page, 'home-skills-grid-mobile-expanded-bottom-right.png');
  });
});
