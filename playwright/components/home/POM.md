# POM: Home

Página principal (`/`). Cubre hero, quick intro, stats cards, portfolio context, current focus y skills section.

---

## Acciones

- `navigateHome()` — Navega a `/` y espera `domcontentloaded`
- `getStatCardsCount()` — Retorna el número de stat cards visibles

## Assertions

- `titleIsCorrect()` — El título de la página contiene "José Moreu Peso"
- `cvCtaIsVisible()` — El botón CTA del CV es visible
- `contactCtaIsVisible()` — El botón CTA de Contacto es visible
- `hasFourStatCards()` — Hay exactamente 4 stat cards
- `portfolioPublicRepoLinkIsValid()` — El enlace al repo público de GitHub es visible y válido

## Visual Regression

- `heroMatchesSnapshot(snapshotName)` — Screenshot de `.hero-content`
- `skillsGridMatchesSnapshot(snapshotName)` — Screenshot de `.stack-visual`
- `quickIntroHeaderMatchesSnapshot(snapshotName)` — Screenshot de `.quick-intro-header`
- `quickIntroStatsMatchesSnapshot(snapshotName)` — Screenshot de `.intro-stats`
- `portfolioContextMatchesSnapshot(snapshotName)` — Screenshot de `.portfolio-context`
- `currentFocusMatchesSnapshot(snapshotName)` — Screenshot de `.current-focus`

## Selectores

- `hero` → `.hero`
- `heroContent` → `.hero-content`
- `heroCvButton` → `.hero a[href="/cv"]`
- `heroContactButton` → `.hero a[href="/contacto"]`
- `quickIntro` → `.quick-intro`
- `quickIntroHeader` → `.quick-intro-header`
- `introStats` → `.intro-stats`
- `statCards` → `.stat-card`
- `portfolioContext` → `.portfolio-context, .intro-highlights`
- `currentFocus` → `.current-focus`
- `skillsSection` → `.skills-section`
- `stackVisual` → `.stack-visual`
- `stackItems` → `.stack-item`
- `akkodisLink` → `a[href*="akkodis.com"]`
- `elConfidencialLink` → `a[href*="elconfidencial.com"]`
- `githubProfileLink` → `a[href="https://github.com/joseguillermomoreu-gif"]`

---

*Specs*: `home.desktop.spec.ts`, `home.mobile.spec.ts`
