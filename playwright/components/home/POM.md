# POM: Home

Página principal (`/`). Cubre hero, quick intro, stats cards, portfolio context, current focus y skills section (expandable grid).

---

## Acciones

- `navigateHome()` — Navega a `/` y espera `domcontentloaded`
- `getStatCardsCount()` — Retorna el número de stat cards visibles
- `expandSkillAtPosition(position)` — Click en el skill expandible en la posición indicada (1-based); espera estado `is-open` y descripción revelada

## Assertions

- `titleIsCorrect()` — El título de la página contiene "José Moreu Peso"
- `cvCtaIsVisible()` — El botón CTA del CV es visible
- `contactCtaIsVisible()` — El botón CTA de Contacto es visible
- `hasFourStatCards()` — Hay exactamente 4 stat cards
- `portfolioPublicRepoLinkIsValid()` — El enlace al repo público es visible, apunta a `portfolio-public` y se abre en `_blank`
- `akkodisLinkIsValid()` — El enlace a Akkodis es visible con href y `target="_blank"` correctos
- `elConfidencialLinkIsValid()` — El enlace a El Confidencial es visible con href y `target="_blank"` correctos

## Visual Regression

- `heroMatchesSnapshot(snapshotName)` — Screenshot de `.hero-content`
- `skillsGridMatchesSnapshot(snapshotName)` — Screenshot de `.stack-visual` (sin expandir)
- `skillsGridExpandedMatchesSnapshot(snapshotName)` — Screenshot de `.stack-visual` (con skill expandida)
- `quickIntroHeaderMatchesSnapshot(snapshotName)` — Screenshot de `.quick-intro-header`
- `quickIntroStatsMatchesSnapshot(snapshotName)` — Screenshot de `.intro-stats`
- `portfolioContextMatchesSnapshot(snapshotName)` — Screenshot de `.portfolio-context, .intro-highlights`
- `currentFocusMatchesSnapshot(snapshotName)` — Screenshot de `.current-focus`

## Selectores

- `route` → `/`
- `heroContent` → `.hero-content`
- `heroCvButton` → `.hero a[href="/cv"]`
- `heroContactButton` → `.hero a[href="/contacto"]`
- `quickIntroHeader` → `.quick-intro-header`
- `introStats` → `.intro-stats`
- `statCards` → `.stat-card`
- `portfolioContext` → `.portfolio-context, .intro-highlights`
- `currentFocus` → `.current-focus`
- `stackVisual` → `.stack-visual`
- `stackItemExpandable` → `.stack-item--expandable`
- `stackItemOpen` → `.stack-item--expandable.is-open`
- `stackDescriptionRevealed` → `.stack-description.is-revealed`
- `akkodisLink` → `.current-focus a[href*="akkodis.com"]`
- `elConfidencialLink` → `.current-focus a[href*="elconfidencial.com"]`
- `publicRepoLink` → `a[href*="portfolio-public"]`
- `publicRepoUrl` → `https://github.com/joseguillermomoreu-gif/portfolio-public` (constante)
- `akkodisUrl` → `https://www.akkodis.com` (constante)
- `elConfidencialUrl` → `https://www.elconfidencial.com` (constante)

---

*Specs*: `home.desktop.spec.ts`, `home.mobile.spec.ts`, `home.skills.desktop.spec.ts`, `home.skills.mobile.spec.ts`
