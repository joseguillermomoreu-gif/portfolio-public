import { test } from '@playwright/test';
import * as homePage from '@components/home';
import * as headerPage from '@components/header';

const EXPECTED_NAV_ORDER = ['Home', 'CV', 'Portfolio', 'Code & AI', 'PPiA', 'Proyectos', 'Contacto'];

test('header nav: se renderiza con logo, 7 enlaces y aria-label correctos', async ({ page }) => {
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

test('header nav: el header está presente en todas las páginas', async ({ page }) => {
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

test('header visual: aspecto en desktop sin scroll', async ({ page }) => {
  await test.step('When: el usuario navega a la página principal', async () => {
    await homePage.navigateHome(page);
  });

  await test.step('Then: el header coincide con el snapshot', async () => {
    await headerPage.headerMatchesSnapshot(page, 'header-top-desktop.png');
  });
});

test('header visual: aspecto en desktop con scroll', async ({ page }) => {
  await test.step('When: el usuario navega a la página principal', async () => {
    await homePage.navigateHome(page);
  });

  await test.step('When: el usuario hace scroll hacia abajo', async () => {
    await headerPage.scrollToTriggerEffect(page, 200);
  });

  await test.step('Then: el header con efecto scroll coincide con el snapshot', async () => {
    await headerPage.headerMatchesSnapshot(page, 'header-scrolled-desktop.png');
  });
});
