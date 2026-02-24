import { test } from '@playwright/test';
import * as contactPage from '@components/contact';

test('Contacto visual: cabecera, tarjeta y redes en mobile', { tag: ['@test', '@contact', '@styles'] }, async ({ page }) => {
  await test.step('When: el usuario navega a la página de contacto', async () => {
    await contactPage.navigateToContact(page);
  });

  await test.step('Then: la cabecera coincide con el snapshot', async () => {
    await contactPage.contactHeaderMatchesSnapshot(page, 'contact-header-mobile.png');
  });

  await test.step('Then: la tarjeta de contacto coincide con el snapshot', async () => {
    await contactPage.contactCardMatchesSnapshot(page, 'contact-card-mobile.png');
  });

  await test.step('Then: la sección de redes sociales coincide con el snapshot', async () => {
    await contactPage.socialSectionMatchesSnapshot(page, 'contact-social-mobile.png');
  });
});
