# POM: Code & AI

Sección de artículos Code & AI (`/code-ai`). Cubre el listado de artículos y la navegación a páginas de detalle.

---

## Acciones

- `navigateToCodeAi()` — Navega a `/code-ai`, espera `domcontentloaded` y el `h1` visible
- `navigateToPortfolioArticle()` — Navega directamente al artículo del portfolio
- `navigateToPpiaArticle()` — Navega directamente al artículo de PPiA
- `clickPortfolioArticleLink()` — Hace click en el primer enlace al artículo del portfolio

## Assertions

- `titleIsCorrect()` — El título de la página contiene "Code & AI" y "José Moreu Peso"
- `hasAtLeastOneArticle()` — Se renderiza al menos una tarjeta de artículo
- `portfolioArticleLinkIsVisible()` — El enlace al artículo del portfolio es visible
- `portfolioArticleIsLoaded()` — La URL contiene el slug del artículo y el título de la página coincide
- `ppiaArticleIsLoaded()` — El título de la página coincide con el artículo de PPiA
- `notFoundArticleReturns404()` — Navegar a un slug inexistente retorna HTTP 404
- `articleBodyContainsDateMetadata()` — El cuerpo del artículo contiene texto de fecha (publicado/actualizado)
- `articleHasParagraphs()` — El artículo contiene al menos un párrafo `<p>`

## Visual Regression

- `codeAiHeaderMatchesSnapshot(snapshotName)` — Screenshot de `.code-ai-header`
- `articlesGridMatchesSnapshot(snapshotName)` — Screenshot de `.articles-grid`

## Selectores

- `route` → `/code-ai`
- `routePortfolioArticle` → `/code-ai/como-construi-este-portfolio`
- `routePpiaArticle` → `/code-ai/automatizando-e2e-con-ia`
- `routeNotFoundArticle` → `/code-ai/non-existent-article`
- `heading` → `h1`
- `articleCards` → `.article-card`
- `codeAiHeader` → `.code-ai-header`
- `articlesGrid` → `.articles-grid`
- `portfolioArticleLink` → `a[href*="/code-ai/como-construi-este-portfolio"]`
- `articleContent` → `body`
- `articleParagraph` → `p`

---

*Specs*: `code-ai.desktop.spec.ts`, `code-ai.mobile.spec.ts`
