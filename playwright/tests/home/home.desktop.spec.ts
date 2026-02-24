import { test } from '@playwright/test';
import * as homePage from '@components/home';
import * as headerPage from '@components/header';

test('home: la página principal tiene el título correcto', { tag: ['@test', '@home'] }, async ({ page }) => {
  await test.step('When: el usuario navega a la página principal', async () => {
    await homePage.navigateHome(page);
  });

  await test.step('Then: el título contiene el nombre del propietario', async () => {
    await homePage.titleIsCorrect(page);
  });

  await test.step('Then: la sección de foco actual coincide con el snapshot visual', async () => {
    await homePage.currentFocusMatchesSnapshot(page, 'home-quick-intro-focus-desktop.png');
  });
});

test('home hero: aparecenlos botones de CV y de Contacto', { tag: ['@test', '@home', '@styles'] }, async ({ page }) => {
  await test.step('When: el usuario navega a la página principal', async () => {
    await homePage.navigateHome(page);
  });

  await test.step('Then: el botón CTA de CV es visible', async () => {
    await homePage.cvCtaIsVisible(page);
  });

  await test.step('Then: el botón CTA de Contacto es visible', async () => {
    await homePage.contactCtaIsVisible(page);
  });

  await test.step('Then: el hero coincide con el snapshot visual', async () => {
    await homePage.heroMatchesSnapshot(page, 'home-hero-desktop.png');
  });
});

test('home visual quick intro: header', { tag: ['@test', '@home', '@styles'] }, async ({ page }) => {
  await test.step('When: el usuario navega a la página principal', async () => {
    await homePage.navigateHome(page);
  });

  await test.step('Then: el header de quick intro coincide con el snapshot visual', async () => {
    await homePage.quickIntroHeaderMatchesSnapshot(page, 'home-quick-intro-header-desktop.png');
  });
});

test('home stats: se muestran 4 stat cards', { tag: ['@test', '@home', '@styles'] }, async ({ page }) => {
  await test.step('When: el usuario navega a la página principal', async () => {
    await homePage.navigateHome(page);
  });

  await test.step('Then: se renderizan 4 stat cards', async () => {
    await homePage.hasFourStatCards(page);
  });

  await test.step('Then: las stats de quick intro coinciden con el snapshot visual', async () => {
    await homePage.quickIntroStatsMatchesSnapshot(page, 'home-quick-intro-stats-desktop.png');
  });
});

test('home contexto: existe el enlace al repositorio público del portfolio', { tag: ['@test', '@home'] }, async ({ page }) => {
  await test.step('When: el usuario navega a la página principal', async () => {
    await homePage.navigateHome(page);
  });

  await test.step('Then: el enlace al repositorio público es visible con href y target correctos', async () => {
    await homePage.portfolioPublicRepoLinkIsValid(page);
  });
});

test('home contexto: el enlace a Akkodis y de El confidencial son validoses válido', { tag: ['@test', '@home', '@styles'] }, async ({ page }) => {
  await test.step('When: el usuario navega a la página principal', async () => {
    await homePage.navigateHome(page);
  });

  await test.step('Then: el enlace a Akkodis es visible con href y target correctos', async () => {
    await homePage.akkodisLinkIsValid(page);
  });

  await test.step('Then: el enlace a El Confidencial es visible con href y target correctos', async () => {
    await homePage.elConfidencialLinkIsValid(page);
  });

  await test.step('Then: la sección de contexto coincide con el snapshot visual', async () => {
    await homePage.portfolioContextMatchesSnapshot(page, 'home-quick-intro-context-desktop.png');
  });
});

test('home visual hero: modo oscuro', { tag: ['@test', '@home', '@styles', '@dark_mode'] }, async ({ page }) => {
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
