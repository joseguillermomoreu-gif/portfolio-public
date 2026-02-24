import { test } from '@playwright/test';
import * as homePage from '@components/home';
import * as headerPage from '@components/header';
import * as utils from '@components/index';

const EXPECTED_NAV_ORDER = ['Home', 'CV', 'Portfolio', 'Code & AI', 'PPiA', 'Proyectos', 'Contacto'];

test('header nav: se renderiza con logo, 7 enlaces y aria-label correctos', { tag: ['@test', '@header'] }, async ({ page }) => {
  await test.step('When: el usuario navega a la página principal', async () => {
    await homePage.navigateHome(page);
  });

  await test.step('Then: el logo es visible y muestra el nombre del propietario', async () => {
    await headerPage.logoIsVisible(page);
    await headerPage.logoHasText(page, 'José Moreu Peso');
  });

  await test.step('Then: hay 7 enlaces de navegación en el orden esperado', async () => {
    await headerPage.hasNavLinksCount(page, 7);
    await headerPage.navLinksAreInOrder(page, EXPECTED_NAV_ORDER);
  });

  await test.step('Then: el enlace activo es "Home" y la nav tiene aria-label', async () => {
    await headerPage.activeNavLinkIs(page, 'Home');
    await headerPage.navigationHasAriaLabel(page, 'Main navigation');
  });
});

test('header nav: el header está presente en todas las páginas', { tag: ['@test', '@header'] }, async ({ page }) => {
  const routes = ['/', '/cv', '/portfolio', '/contacto', '/proyectos', '/code-ai', '/ppia'];

  for (const route of routes) {
    await test.step(`When: el usuario navega a ${route}`, async () => {
      await page.goto(route);
    });

    await test.step(`Then: el header y el logo son visibles en ${route}`, async () => {
      await headerPage.headerIsPresent(page);
      await headerPage.logoIsVisible(page);
    });
  }
});

test('header visual: aspecto en desktop (sin scroll y con scroll)', { tag: ['@test', '@header', '@styles'] }, async ({ page }) => {
  await test.step('Given: el usuario navega a la página principal', async () => {
    await homePage.navigateHome(page);
  });

  await test.step('Given: el header sin scroll coincide con el snapshot', async () => {
    await headerPage.headerMatchesSnapshot(page, 'header-top-desktop.png');
  });

  await test.step('When: el usuario hace scroll hacia abajo', async () => {
    await utils.scrollToTriggerEffect(page, 200);
  });

  await test.step('Then: el header con scroll coincide con el snapshot', async () => {
    await headerPage.headerMatchesSnapshot(page, 'header-scrolled-desktop.png');
  });
});

test('header dark mode: en desktop el tema es light por defecto y el toggle es visible', { tag: ['@test', '@header', '@dark_mode'] }, async ({ page }) => {
  await test.step('When: el usuario navega a la página principal con localStorage limpio', async () => {
    await homePage.navigateHome(page);
    await headerPage.clearThemeFromLocalStorage(page);
    await page.reload();
  });

  await test.step('Then: el tema por defecto es light y el toggle es visible con aria-label', async () => {
    await headerPage.themeIsLight(page);
    await headerPage.themeToggleIsVisible(page);
    await headerPage.themeToggleHasAriaLabel(page);
  });
});
