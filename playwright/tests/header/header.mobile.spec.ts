import { test } from '@playwright/test';
import * as homePage from '@components/home';
import * as headerPage from '@components/header';

test('header nav mobile: estado inicial — hamburger visible, cerrado y con ARIA correctos', { tag: ['@test', '@header'] }, async ({ page }) => {
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
});

test('header nav mobile: abrir menú — aria-expanded y estado activo', { tag: ['@test', '@header'] }, async ({ page }) => {
  await test.step('Given: el usuario navega a la página principal', async () => {
    await homePage.navigateHome(page);
  });

  await test.step('When: el usuario hace click en el hamburger', async () => {
    await headerPage.openMobileMenu(page);
  });

  await test.step('Then: aria-expanded cambia a true y el menú está activo', async () => {
    await headerPage.mobileMenuToggleAriaExpandedIs(page, 'true');
    await headerPage.mobileMenuIsOpen(page);
  });
});

test('header nav mobile: click en el overlay cierra el menú', { tag: ['@test', '@header'] }, async ({ page }) => {
  await test.step('Given: el usuario navega y el menú está abierto', async () => {
    await homePage.navigateHome(page);
    await headerPage.openMobileMenu(page);
  });

  await test.step('When: el usuario hace click en el overlay', async () => {
    await headerPage.closeMobileMenu(page);
  });

  await test.step('Then: el menú está cerrado', async () => {
    await headerPage.mobileMenuIsClosed(page);
  });
});

test('header nav mobile: tecla Escape cierra el menú', { tag: ['@test', '@header'] }, async ({ page }) => {
  await test.step('Given: el usuario navega y el menú está abierto', async () => {
    await homePage.navigateHome(page);
    await headerPage.openMobileMenu(page);
  });

  await test.step('When: el usuario pulsa Escape', async () => {
    await headerPage.closeWithEsc(page);
  });

  await test.step('Then: el menú está cerrado', async () => {
    await headerPage.mobileMenuIsClosed(page);
  });
});

test('header visual: aspecto en mobile (menú cerrado y abierto)', { tag: ['@test', '@header', '@styles'] }, async ({ page }) => {
  await test.step('Given: el usuario navega a la página principal', async () => {
    await homePage.navigateHome(page);
  });

  await test.step('Given: el header con menú cerrado coincide con el snapshot', async () => {
    await headerPage.headerMatchesSnapshot(page, 'header-mobile-closed.png');
  });

  await test.step('When: el usuario abre el menú de navegación', async () => {
    await headerPage.openMobileMenu(page);
  });

  await test.step('Then: la página completa con menú abierto coincide con el snapshot', async () => {
    await headerPage.headerFullPageMatchesSnapshot(page, 'header-mobile-open.png');
  });
});

test('header dark mode: dark mode se fuerza en mobile (375×667)', { tag: ['@test', '@header', '@dark_mode'] }, async ({ page }) => {
  await test.step('When: el usuario navega a la página principal con localStorage limpio', async () => {
    await homePage.navigateHome(page);
    await headerPage.clearThemeFromLocalStorage(page);
  });

  await test.step('Then: el tema es dark y el toggle está oculto', async () => {
    await headerPage.themeIsDark(page);
    await headerPage.themeToggleIsHidden(page);
  });
});

test('header dark mode: dark mode persiste en mobile tras recargar', { tag: ['@test', '@header', '@dark_mode'] }, async ({ page }) => {
  await test.step('Given: localStorage limpio', async () => {
    await homePage.navigateHome(page);
    await headerPage.clearThemeFromLocalStorage(page);
    await page.reload();
  });

  await test.step('When: el usuario recarga la página', async () => {
    await page.reload();
  });

  await test.step('Then: el tema sigue siendo dark', async () => {
    await headerPage.themeIsDark(page);
  });
});

test('header dark mode: dark mode ignora localStorage light en mobile', { tag: ['@test', '@header', '@dark_mode'] }, async ({ page }) => {
  await test.step('Given: localStorage tiene theme=light', async () => {
    await homePage.navigateHome(page);
    await headerPage.setLocalStorageThemeToLight(page);
  });

  await test.step('When: el usuario recarga la página', async () => {
    await page.reload();
  });

  await test.step('Then: dark mode sigue forzado', async () => {
    await headerPage.themeIsDark(page);
  });
});
