# POM: Projects

Página de proyectos (`/proyectos`). Cubre grid de tarjetas de proyecto con helpers para acceder a cada campo de la tarjeta.

---

## Acciones

- `navigateToProjects()` — Navega a `/proyectos` y espera `domcontentloaded`
- `getProjectCardByName(name)` — Retorna el locator de la tarjeta de proyecto por nombre
- `getProjectStatus(card)` — Retorna el locator del estado del proyecto en la tarjeta
- `getProjectDescription(card)` — Retorna el locator de la descripción del proyecto
- `getProjectStack(card)` — Retorna el locator del stack tecnológico
- `getProjectTags(card)` — Retorna el locator de las tags del proyecto
- `getProjectHighlights(card)` — Retorna el locator de los highlights del proyecto
- `getProjectGithubLink(card)` — Retorna el locator del enlace GitHub del proyecto
- `getProjectWebsiteLink(card)` — Retorna el locator del enlace web del proyecto

## Selectores

- `heading` → `h1`
- `projectCards` → `[data-testid="project-card"]`
- `mainContent` → `main`
- `projectsPage` → `.projects-page`
- `projectsHeader` → `.projects-header`
- `projectsGrid` → `.projects-grid`
- `projectsFooter` → `.projects-footer`

---

*Spec*: `projects.spec.ts`
