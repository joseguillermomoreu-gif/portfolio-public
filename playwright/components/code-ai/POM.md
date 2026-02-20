# POM: Code & AI

Sección de artículos Code & AI (`/code-ai`). Cubre el listado de artículos y acceso a detalle de artículo vía navegación directa.

---

## Acciones

- `navigateToCodeAi()` — Navega a `/code-ai` y espera `domcontentloaded`
- `getArticleCount()` — Retorna el número de tarjetas de artículo visibles

## Notas

- Cubre el listado de artículos (`/code-ai`), no las páginas de detalle.
- Las páginas de detalle se testean con `page.goto()` directamente en el spec.

## Selectores

- `heading` → `h1`
- `articleCards` → `.article-card`
- `mainContent` → `main`
- `codeAiHeader` → `.code-ai-header`
- `articlesGrid` → `.articles-grid`

---

*Spec*: `code-ai.spec.ts`
