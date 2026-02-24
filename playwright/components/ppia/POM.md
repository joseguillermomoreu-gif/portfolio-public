# POM: PPiA

Página PPiA — Playwright Page Inspector with AI (`/ppia`). Cubre header de la página.

---

## Acciones

- `navigateToPpia()` — Navega a `/ppia`, espera `domcontentloaded` y el `h1` visible

## Assertions

- `titleIsCorrect()` — El título de la página contiene "PPiA" o "Playwright Page Inspector"

## Visual Regression

- `ppiaHeaderMatchesSnapshot(snapshotName)` — Screenshot de `.ppia-header`

## Notas

- Solo se captura `ppiaHeader` para visual regression; el resto de la página tiene animaciones CSS que causarían inestabilidad en los snapshots.

## Selectores

- `route` → `/ppia`
- `heading` → `h1`
- `ppiaHeader` → `.ppia-header`

---

*Specs*: `ppia.desktop.spec.ts`, `ppia.mobile.spec.ts`
