# POM: Portfolio

Página de portfolio (`/portfolio`). Grid de 16 keywords organizados en 4 categorías (Arquitectura, Testing, Backend, Tooling). Cada keyword abre un modal centrado con descripción en markdown.

---

## Acciones

- `navigateToPortfolio()` — Navega a `/portfolio`, espera `domcontentloaded` y el `h1` visible
- `openModal(keywordId)` — Click en el keyword con el id indicado; espera que el modal sea visible
- `closeModalByButton()` — Click en el botón de cierre del modal activo; espera que el overlay quede hidden
- `closeModalByOverlay()` — Click en coordenadas (20,20) fuera del modal card; espera que el overlay quede hidden
- `closeModalByEsc()` — Pulsa Escape; espera que el overlay quede hidden

## Assertions

- `titleIsCorrect()` — El título de la página contiene "Portfolio" y "José Moreu Peso"
- `hasCategoryCount(count)` — Hay exactamente `count` secciones de categoría
- `hasKeywordCount(count)` — Hay exactamente `count` keyword items en total
- `categoryHasKeywordCount(category, count)` — La categoría indicada tiene `count` keywords
- `categoryLabelContains(category, text)` — La etiqueta de la categoría contiene el texto indicado
- `modalOverlayIsVisible()` / `modalOverlayIsHidden()` — Visibilidad del overlay
- `modalIsVisible(id)` / `modalIsHidden(id)` — Visibilidad del modal con el id indicado
- `modalHasTitle(id, text)` — El modal contiene el título indicado
- `modalHasBody(id, text)` — El modal contiene el texto indicado en el cuerpo
- `modalBrandIconIsVisible(id, brandSlug)` — El modal muestra un icono de Simple Icons con el slug correcto
- `modalMonogramIsVisible(id)` — El modal muestra un elemento de monograma

## Visual Regression

- `portfolioHeaderMatchesSnapshot(snapshotName)` — Screenshot de `[data-testid="portfolio-header"]`
- `keywordsSectionMatchesSnapshot(snapshotName)` — Screenshot de `[data-testid="keywords-section"]`

## Notas

- `.modal` tiene `pointer-events: none`; `.modal-card` tiene `pointer-events: all`. Los clics fuera del card caen al overlay sin detección de coordenadas JS; por eso `closeModalByOverlay()` hace click en (20, 20).
- `activeModalClose` apunta al botón de cierre del modal actualmente visible (`.modal:not(.hidden) .modal-close`) para evitar ambigüedad con los 16 modales pre-renderizados.

## Selectores

- `route` → `/portfolio`
- `heading` → `[data-testid="portfolio-header"] h1`
- `portfolioHeader` → `[data-testid="portfolio-header"]`
- `keywordsSection` → `[data-testid="keywords-section"]`
- `keywordCategories` → `.keyword-category`
- `keywordItems` → `.keyword-item`
- `modalOverlay` → `#modal-overlay`
- `activeModalClose` → `.modal:not(.hidden) .modal-close`
- `modalTitle` → `.modal-title`
- `modalBody` → `.modal-body`
- `categoryLabel` → `.category-label`
- `modalIconBrand` → `.modal-icon--brand`
- `modalIconMonogram` → `.modal-icon--monogram`
- `categoryByName(name)` → `[data-category="${name}"]` (helper dinámico)
- `modalById(id)` → `#modal-${id}` (helper dinámico)
- `keywordById(id)` → `[data-keyword-id="${id}"]` (helper dinámico)

---

*Specs*: `portfolio.desktop.spec.ts`, `portfolio.mobile.spec.ts`
