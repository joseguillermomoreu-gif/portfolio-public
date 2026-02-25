import { test } from '@playwright/test';
import * as cvPage from '@components/cv';

// ─── /cv ──────────────────────────────────────────────────────────────────────

test('CV mobile: botones y carrusel de skills son visibles', { tag: ['@test', '@cv'] }, async ({ page }) => {
  await test.step('When: el usuario navega a la página CV', async () => {
    await cvPage.navigateToCv(page);
  });

  await test.step('Then: el botón Ver HTML es visible', async () => {
    await cvPage.viewHtmlButtonIsVisible(page);
  });

  await test.step('Then: el enlace Descargar PDF es visible', async () => {
    await cvPage.downloadPdfLinkIsVisible(page);
  });

  await test.step('Then: el carrusel de skills tiene el título Stack Técnico', async () => {
    await cvPage.skillsCarouselHasTitle(page);
  });
});

// ─── Visual Regression ────────────────────────────────────────────────────────

test('CV visual: cabecera, tarjeta PDF y técnica en mobile', { tag: ['@test', '@cv', '@styles'] }, async ({ page }) => {
  await test.step('When: el usuario navega a la página CV', async () => {
    await cvPage.navigateToCv(page);
  });

  await test.step('Then: la cabecera coincide con el snapshot', async () => {
    await cvPage.cvHeaderMatchesSnapshot(page, 'cv-header-mobile.png');
  });

  await test.step('Then: la tarjeta de descarga PDF coincide con el snapshot', async () => {
    await cvPage.cvPdfCardMatchesSnapshot(page, 'cv-pdf-card-mobile.png');
  });

  await test.step('Then: la información técnica coincide con el snapshot', async () => {
    await cvPage.cvTechInfoMatchesSnapshot(page, 'cv-tech-info-mobile.png');
  });
});
