import { test } from '@playwright/test';
import * as cvPage from '@components/cv';

test('CV: título, descarga PDF y carrusel son correctos', { tag: ['@test', '@cv'] }, async ({ page }) => {
  await test.step('When: el usuario navega a la página CV', async () => {
    await cvPage.navigateToCv(page);
  });

  await test.step('Then: el título de la página contiene CV y el nombre del autor', async () => {
    await cvPage.titleIsCorrect(page);
  });

  await test.step('Then: el enlace de descarga del PDF es visible y el carrusel tiene el título "Stack Técnico"', async () => {
    await cvPage.pdfLinkIsVisible(page);
    await cvPage.skillsCarouselHasTitle(page);
  });
});

// ─── Visual Regression ────────────────────────────────────────────────────────

test('CV visual: cabecera, PDF y técnica en desktop', { tag: ['@test', '@cv', '@styles'] }, async ({ page }) => {
  await test.step('When: el usuario navega a la página CV', async () => {
    await cvPage.navigateToCv(page);
  });

  await test.step('Then: la cabecera coincide con el snapshot', async () => {
    await cvPage.cvHeaderMatchesSnapshot(page, 'cv-header-desktop.png');
  });

  await test.step('Then: la tarjeta de descarga PDF coincide con el snapshot', async () => {
    await cvPage.cvPdfCardMatchesSnapshot(page, 'cv-pdf-card-desktop.png');
  });

  await test.step('Then: la información técnica coincide con el snapshot', async () => {
    await cvPage.cvTechInfoMatchesSnapshot(page, 'cv-tech-info-desktop.png');
  });
});
