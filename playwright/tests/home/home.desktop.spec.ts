import { test } from '@playwright/test';
import * as homePage from '@components/home';
import * as headerPage from '@components/header';

test('home: la página principal tiene el título correcto', async ({ page }) => {
  await test.step('When: el usuario navega a la página principal', async () => {
    await homePage.navigateHome(page);
  });

  await test.step('Then: el título contiene el nombre del propietario', async () => {
    await homePage.titleIsCorrect(page);
  });
});

test('home hero: el botón CTA de CV es visible', async ({ page }) => {
  await test.step('When: el usuario navega a la página principal', async () => {
    await homePage.navigateHome(page);
  });

  await test.step('Then: el botón CTA de CV es visible', async () => {
    await homePage.cvCtaIsVisible(page);
  });
});

test('home hero: el botón CTA de Contacto es visible', async ({ page }) => {
  await test.step('When: el usuario navega a la página principal', async () => {
    await homePage.navigateHome(page);
  });

  await test.step('Then: el botón CTA de Contacto es visible', async () => {
    await homePage.contactCtaIsVisible(page);
  });
});

test('home stats: se muestran 4 stat cards', async ({ page }) => {
  await test.step('When: el usuario navega a la página principal', async () => {
    await homePage.navigateHome(page);
  });

  await test.step('Then: se renderizan 4 stat cards', async () => {
    await homePage.hasFourStatCards(page);
  });
});

test('home contexto: existe el enlace al repositorio público del portfolio', async ({ page }) => {
  await test.step('When: el usuario navega a la página principal', async () => {
    await homePage.navigateHome(page);
  });

  await test.step('Then: el enlace al repositorio público es visible con href y target correctos', async () => {
    await homePage.portfolioPublicRepoLinkIsValid(page);
  });
});

// ─── Visual Regression ────────────────────────────────────────────────────────

test('home visual hero', async ({ page }) => {
  await test.step('When: el usuario navega a la página principal', async () => {
    await homePage.navigateHome(page);
  });

  await test.step('Then: el hero coincide con el snapshot visual', async () => {
    await homePage.heroMatchesSnapshot(page, 'home-hero-desktop.png');
  });
});

test('home visual hero: modo oscuro', async ({ page }) => {
  await test.step('When: el usuario navega a la página principal y activa el modo oscuro', async () => {
    await homePage.navigateHome(page);
    await headerPage.toggleTheme(page);
  });

  await test.step('Then: el tema activo es oscuro', async () => {
    await headerPage.themeIsDark(page);
  });

  await test.step('Then: el hero coincide con el snapshot en modo oscuro', async () => {
    await homePage.heroMatchesSnapshot(page, 'home-hero-dark-desktop.png');
  });
});

test('home visual skills: grid', async ({ page }) => {
  await test.step('When: el usuario navega a la página principal', async () => {
    await homePage.navigateHome(page);
  });

  await test.step('Then: el grid de skills coincide con el snapshot visual', async () => {
    await homePage.skillsGridMatchesSnapshot(page, 'home-skills-grid-desktop.png');
  });
});

test('home visual quick intro: header', async ({ page }) => {
  await test.step('When: el usuario navega a la página principal', async () => {
    await homePage.navigateHome(page);
  });

  await test.step('Then: el header de quick intro coincide con el snapshot visual', async () => {
    await homePage.quickIntroHeaderMatchesSnapshot(page, 'home-quick-intro-header-desktop.png');
  });
});

test('home visual quick intro: stats', async ({ page }) => {
  await test.step('When: el usuario navega a la página principal', async () => {
    await homePage.navigateHome(page);
  });

  await test.step('Then: las stats de quick intro coinciden con el snapshot visual', async () => {
    await homePage.quickIntroStatsMatchesSnapshot(page, 'home-quick-intro-stats-desktop.png');
  });
});

test('home visual contexto', async ({ page }) => {
  await test.step('When: el usuario navega a la página principal', async () => {
    await homePage.navigateHome(page);
  });

  await test.step('Then: la sección de contexto coincide con el snapshot visual', async () => {
    await homePage.portfolioContextMatchesSnapshot(page, 'home-quick-intro-context-desktop.png');
  });
});

test('home visual foco', async ({ page }) => {
  await test.step('When: el usuario navega a la página principal', async () => {
    await homePage.navigateHome(page);
  });

  await test.step('Then: la sección de foco actual coincide con el snapshot visual', async () => {
    await homePage.currentFocusMatchesSnapshot(page, 'home-quick-intro-focus-desktop.png');
  });
});
