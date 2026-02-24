import { test } from '@playwright/test';
import * as footerPage from '@components/footer';
import * as homePage from '@components/home';

test('footer: contenido, enlaces y metadatos son correctos', { tag: ['@test', '@footer'] }, async ({ page }) => {
  await test.step('When: el usuario navega a la página principal', async () => {
    await homePage.navigateHome(page);
  });

  await test.step('Then: los enlaces sociales tienen target="_blank" y rel="noopener"', async () => {
    await footerPage.socialLinksAreSecure(page);
  });

  await test.step('Then: el enlace al perfil de GitHub es visible y se abre en nueva pestaña', async () => {
    await footerPage.githubProfileLinkIsValid(page);
  });

  await test.step('Then: el footer muestra el año actual y la versión en formato semver', async () => {
    await footerPage.yearIsCurrentYear(page);
    await footerPage.versionMatchesSemver(page);
  });
});

// ─── Visual Regression ────────────────────────────────────────────────────────

test('footer visual: footer en desktop', { tag: ['@test', '@footer', '@styles'] }, async ({ page }) => {
  await test.step('Given: el usuario navega a la página principal', async () => {
    await homePage.navigateHome(page);
  });

  await test.step('When: el usuario hace scroll al footer', async () => {
    await footerPage.scrollToFooter(page);
  });

  await test.step('Then: el footer coincide con el snapshot', async () => {
    await footerPage.footerMatchesSnapshot(page, 'footer-desktop.png');
  });
});
