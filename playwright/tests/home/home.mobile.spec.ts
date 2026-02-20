import { test } from '@playwright/test';
import * as homePage from '@components/home';

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
