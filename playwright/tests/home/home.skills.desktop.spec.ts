import { test } from '@playwright/test';
import * as homePage from '@components/home';
import * as headerPage from '@components/header';

const SKILL_CORNERS = [
  { position: 1, label: 'superior izquierda', snapshot: 'home-skills-grid-desktop-expanded-top-left.png' },
  { position: 3, label: 'superior derecha',   snapshot: 'home-skills-grid-desktop-expanded-top-right.png' },
  { position: 7, label: 'inferior izquierda', snapshot: 'home-skills-grid-desktop-expanded-bottom-left.png' },
  { position: 9, label: 'inferior derecha',   snapshot: 'home-skills-grid-desktop-expanded-bottom-right.png' },
];

test('home visual skills: grid', { tag: ['@test', '@home', '@skills', '@styles'] }, async ({ page }) => {
  await test.step('When: el usuario navega a la página principal', async () => {
    await homePage.navigateHome(page);
  });

  await test.step('When: oculta el header', async () => {
    await headerPage.hideHeader(page);
  });

  await test.step('Then: el grid de skills coincide con el snapshot visual', async () => {
    await homePage.skillsGridMatchesSnapshot(page, 'home-skills-grid-desktop.png');
  });
});

for (const corner of SKILL_CORNERS) {
  test(`home visual skills: esquina ${corner.label} expandida`, { tag: ['@test', '@home', '@skills', '@styles'] }, async ({ page }) => {
    await test.step('Given: el usuario navega a la página principal', async () => {
      await homePage.navigateHome(page);
    });

    await test.step(`When: oculta el header y expande la skill de la esquina ${corner.label} (pos ${corner.position})`, async () => {
      await headerPage.hideHeader(page);
      await homePage.expandSkillAtPosition(page, corner.position);
    });

    await test.step('Then: el grid coincide con el snapshot visual', async () => {
      await homePage.skillsGridExpandedMatchesSnapshot(page, corner.snapshot);
    });
  });
}
