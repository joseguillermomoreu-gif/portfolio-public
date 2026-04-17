import { test } from '@playwright/test';
import * as cvPage from '@components/cv';

// ─── /cv ──────────────────────────────────────────────────────────────────────

test('CV: título, botones Ver HTML y Descargar PDF son correctos', { tag: ['@test', '@cv'] }, async ({ page }) => {
  await test.step('When: el usuario navega a la página CV', async () => {
    await cvPage.navigateToCv(page);
  });

  await test.step('Then: el título contiene CV y el nombre del autor', async () => {
    await cvPage.titleIsCorrect(page);
  });

  await test.step('Then: el botón Ver HTML es visible', async () => {
    await cvPage.viewHtmlButtonIsVisible(page);
  });

  await test.step('Then: el enlace Descargar PDF es visible con href y atributo download correctos', async () => {
    await cvPage.downloadPdfLinkIsVisible(page);
    await cvPage.downloadPdfLinkHasCorrectAttributes(page);
  });

  await test.step('Then: el carrusel de skills tiene el título Stack Técnico', async () => {
    await cvPage.skillsCarouselHasTitle(page);
  });
});

// ─── Desired Skills ──────────────────────────────────────────────────────────

test('CV: la sección de skills deseadas muestra 5 skills con barras de progreso', { tag: ['@test', '@cv'] }, async ({ page }) => {
  await test.step('When: el usuario navega a la página CV', async () => {
    await cvPage.navigateToCv(page);
  });

  await test.step('Then: la sección de skills deseadas es visible', async () => {
    await cvPage.desiredSkillsSectionIsVisible(page);
  });

  await test.step('Then: se muestran 5 skills deseadas', async () => {
    await cvPage.hasDesiredSkillCount(page, 5);
  });

  await test.step('Then: cada skill tiene barra de progreso', async () => {
    await cvPage.desiredSkillsHaveProgressBars(page);
  });
});

// ─── Timeline ────────────────────────────────────────────────────────────────

test('CV: el timeline muestra 2 empresas con 4 roles anidados', { tag: ['@test', '@cv'] }, async ({ page }) => {
  await test.step('When: el usuario navega a la pagina CV', async () => {
    await cvPage.navigateToCv(page);
  });

  await test.step('Then: la seccion timeline es visible con titulo correcto', async () => {
    await cvPage.timelineSectionIsVisible(page);
    await cvPage.timelineHasTitle(page);
  });

  await test.step('Then: se muestran 2 empresas en el timeline', async () => {
    await cvPage.hasTimelineItemCount(page, 2);
  });

  await test.step('Then: cada empresa muestra su nombre', async () => {
    await cvPage.timelineCompaniesHaveNames(page);
  });

  await test.step('Then: se muestran 4 roles anidados en total', async () => {
    await cvPage.hasTimelineRoleCount(page, 4);
  });

  await test.step('Then: cada rol tiene posicion y tecnologias', async () => {
    await cvPage.timelineRolesHaveContent(page);
  });
});

// ─── /cv.html ─────────────────────────────────────────────────────────────────

test('CV HTML: la página carga y muestra el contenido del CV', { tag: ['@test', '@cv'] }, async ({ page }) => {
  await test.step('When: el usuario navega a /cv.html', async () => {
    await cvPage.navigateToCvHtml(page);
  });

  await test.step('Then: el título contiene CV y el nombre del autor', async () => {
    await cvPage.cvHtmlTitleIsCorrect(page);
  });

  await test.step('Then: el contenido del CV es visible', async () => {
    await cvPage.cvHtmlHasContent(page);
  });
});

// ─── /cv/pdf ──────────────────────────────────────────────────────────────────

test('CV PDF: el endpoint /cv/pdf devuelve un PDF válido', { tag: ['@test', '@cv'] }, async ({ page }) => {
  await test.step('Then: GET /cv/pdf devuelve HTTP 200 y Content-Type application/pdf', async () => {
    await cvPage.cvPdfResponseIsValid(page);
  });
});

// ─── Visual Regression ────────────────────────────────────────────────────────

test('CV visual: cabecera, tarjeta PDF y stack técnico en desktop', { tag: ['@test', '@cv', '@styles'] }, async ({ page }) => {
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

