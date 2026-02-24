# POM: Projects

Página de proyectos (`/proyectos`). Cubre grid de tarjetas de proyecto con assertions directas sobre cada tarjeta.

---

## Acciones

- `navigateToProjects()` — Navega a `/proyectos`, espera `domcontentloaded` y el `h1` visible

## Assertions

- `hasProjectCount(count)` — Hay exactamente `count` tarjetas de proyecto
- `projectGithubLinkIs(projectName, href)` — La tarjeta del proyecto indicado tiene el href de GitHub esperado
- `projectWebsiteLinkIs(projectName, href)` — La tarjeta del proyecto indicado tiene el href de web esperado
- `ppiaProjectIsPrivate()` — La tarjeta PPIA tiene estado "Private", contiene el highlight de El Confidencial y no tiene enlace de GitHub visible

## Visual Regression

- `projectsHeaderMatchesSnapshot(snapshotName)` — Screenshot de `.projects-header`
- `projectsGridMatchesSnapshot(snapshotName)` — Screenshot de `.projects-grid`
- `projectsFooterMatchesSnapshot(snapshotName)` — Screenshot de `.projects-footer`

## Selectores

- `route` → `/proyectos`
- `heading` → `h1`
- `projectCards` → `[data-testid="project-card"]`
- `projectName` → `[data-testid="project-name"]`
- `projectStatus` → `[data-testid="project-status"]`
- `projectHighlights` → `[data-testid="project-highlights"]`
- `projectGithubLink` → `[data-testid="project-github-link"]`
- `projectWebsiteLink` → `[data-testid="project-website-link"]`
- `projectsHeader` → `.projects-header`
- `projectsGrid` → `.projects-grid`
- `projectsFooter` → `.projects-footer`
- `ppiaProjectName` → `PPIA` (constante)
- `ppiaStatusPrivate` → `Private` (constante)
- `ppiaHighlightText` → `El Confidencial` (constante)

---

*Specs*: `projects.desktop.spec.ts`, `projects.mobile.spec.ts`
