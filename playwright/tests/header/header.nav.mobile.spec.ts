import { test } from '@playwright/test';
import * as homePage from '@components/home';
import * as headerPage from '@components/header';

test('header nav mobile: estado inicial del hamburger — visible, cerrado y con ARIA correctos', async ({ page }) => {
  await test.step('When: el usuario navega a la página principal', async () => {
    await homePage.navigateHome(page);
  });

  await test.step('Then: el hamburger es visible y el menú está cerrado', async () => {
    await headerPage.mobileMenuToggleIsVisible(page);
    await headerPage.mobileMenuIsClosed(page);
  });

  await test.step('Then: el hamburger tiene aria-label y aria-expanded es false', async () => {
    await headerPage.mobileMenuToggleHasAriaLabel(page);
    await headerPage.mobileMenuToggleAriaExpandedIs(page, 'false');
  });

  await test.step('When: el usuario abre el menú', async () => {
    await headerPage.openMobileMenu(page);
  });

  await test.step('Then: aria-expanded cambia a true', async () => {
    await headerPage.mobileMenuToggleAriaExpandedIs(page, 'true');
  });
});

test('header nav mobile: apertura y cierre del menú hamburguesa', async ({ page }) => {
  await test.step('When: el usuario navega a la página principal', async () => {
    await homePage.navigateHome(page);
  });

  await test.step('When: el usuario hace click en el hamburger', async () => {
    await headerPage.openMobileMenu(page);
  });

  await test.step('Then: el menú de navegación y el overlay están activos', async () => {
    await headerPage.mobileMenuIsOpen(page);
  });

  await test.step('When: el usuario hace click en el overlay', async () => {
    await headerPage.closeMobileMenu(page);
  });

  await test.step('Then: el menú está cerrado', async () => {
    await headerPage.mobileMenuIsClosed(page);
  });

  await test.step('When: el usuario vuelve a abrir el menú y pulsa Escape', async () => {
    await headerPage.openMobileMenu(page);
    await headerPage.closeWithEsc(page);
  });

  await test.step('Then: el menú está cerrado', async () => {
    await headerPage.mobileMenuIsClosed(page);
  });
});
