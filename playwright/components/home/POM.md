# POM - Home Component

Componente de la página principal (`/`).

**Archivos**: `index.ts`, `selectors.ts`
**Extiende**: `BasePage` (`pages/BasePage.ts`)

---

## Locators

| Locator | Selector | Descripción |
|---------|----------|-------------|
| `hero` | `.hero` | Sección hero principal |
| `heroContent` | `.hero-content` | Contenido del hero (excluye scroll-indicator) |
| `heroCvButton` | `.hero a[href="/cv"]` | CTA botón CV |
| `heroContactButton` | `.hero a[href="/contacto"]` | CTA botón Contacto |
| `quickIntro` | `.quick-intro` | Sección quick intro completa |
| `quickIntroHeader` | `.quick-intro-header` | Cabecera de la sección intro |
| `introStats` | `.intro-stats` | Contenedor de las 4 stat cards |
| `statCards` | `.stat-card` | Cada stat card individual |
| `portfolioContext` | `.portfolio-context, .intro-highlights` | Sección portfolio context |
| `currentFocus` | `.current-focus` | Sección current focus |
| `skillsSection` | `.skills-section` | Sección de skills completa |
| `stackVisual` | `.stack-visual` | Grid visual del stack tecnológico |
| `stackItems` | `.stack-item` | Cada item individual del stack |
| `akkodisLink` | `a[href*="akkodis.com"]` | Link externo a Akkodis |
| `elConfidencialLink` | `a[href*="elconfidencial.com"]` | Link externo a El Confidencial |
| `githubProfileLink` | `a[href="https://github.com/joseguillermomoreu-gif"]` | Link al perfil GitHub |

## Métodos

| Método | Retorno | Descripción |
|--------|---------|-------------|
| `navigate()` | `Promise<void>` | Navega a `/` y espera `domcontentloaded` |
| `getStatCardsCount()` | `Promise<number>` | Cuenta el número de stat cards visibles |

Métodos heredados de `BasePage`: `getText(locator)`, `getBodyText()`, `getTitle()`, `isVisible(locator)`.

---

*Última actualización: 2026-02-19*
