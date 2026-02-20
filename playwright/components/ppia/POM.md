# POM: PPiA

Página PPiA — Playwright Page Inspector with AI (`/ppia`). Cubre header y tarjeta WIP.

---

## Acciones

- `navigateToPpia()` — Navega a `/ppia` y espera `domcontentloaded`

## Notas

- El `wipCard` tiene animaciones CSS que causan inestabilidad en snapshots; solo se captura `ppiaHeader` para visual regression.

## Selectores

- `heading` → `h1`
- `mainContent` → `main`
- `ppiaPage` → `.ppia-page`
- `ppiaHeader` → `.ppia-header`
- `wipCard` → `.wip-card`

---

*Spec*: `ppia.spec.ts`
