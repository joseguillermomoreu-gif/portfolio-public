import { test } from '@playwright/test';
import * as contactPage from '@components/contact';

test('Contacto: título, enlaces y seguridad son correctos', { tag: ['@test', '@contact'] }, async ({ page }) => {
  await test.step('When: el usuario navega a la página de contacto', async () => {
    await contactPage.navigateToContact(page);
  });

  await test.step('Then: el título de la página contiene Contacto y el nombre del autor', async () => {
    await contactPage.titleIsCorrect(page);
  });

  await test.step('Then: el enlace de email y el de GitHub son válidos', async () => {
    await contactPage.emailLinkIsValid(page);
    await contactPage.githubLinkIsValid(page);
  });

  await test.step('Then: todos los enlaces externos tienen rel="noopener"', async () => {
    await contactPage.externalLinksAreSecure(page);
  });
});

// ─── Visual Regression ────────────────────────────────────────────────────────

test('Contacto visual: cabecera, tarjeta y redes en desktop', { tag: ['@test', '@contact', '@styles'] }, async ({ page }) => {
  await test.step('When: el usuario navega a la página de contacto', async () => {
    await contactPage.navigateToContact(page);
  });

  await test.step('Then: la cabecera coincide con el snapshot', async () => {
    await contactPage.contactHeaderMatchesSnapshot(page, 'contact-header-desktop.png');
  });

  await test.step('Then: la tarjeta de contacto coincide con el snapshot', async () => {
    await contactPage.contactCardMatchesSnapshot(page, 'contact-card-desktop.png');
  });

  await test.step('Then: la sección de redes sociales coincide con el snapshot', async () => {
    await contactPage.socialSectionMatchesSnapshot(page, 'contact-social-desktop.png');
  });
});
