# Requirements — Mejoras transversales: CI/CD, UX & Infraestructura

## Contexto

- **Proyecto**: josemoreupeso.es — Portfolio personal
- **Stack**: PHP 8.1 · Symfony 6.4 · Twig · TypeScript · Playwright · GitHub Actions
- **Arquitectura**: Hexagonal (Ports & Adapters)
- **Tipo de aventura**: Mejoras transversales en proyecto existente
- **Issues consolidados**: #47 · #255 · #259 · #260 · #263
- **Agent team**: portfolio-sdd-team-032026
- **Fecha**: 2026-03-20

---

## Requisitos Funcionales

### RF-01 — Dark mode activo por defecto en desktop
**Tipo**: EVENT-DRIVEN | **Prioridad**: SHOULD | **Issue**: #263

WHEN un usuario visita la web en desktop (viewport ≥ 850px) sin preferencia
guardada en localStorage THE SYSTEM SHALL mostrar el tema oscuro por defecto.

**Criterios de aceptación**:
- `localStorage.getItem('theme')` vacío en desktop → dark mode activo
- El atributo `data-theme="dark"` está presente en `<html>` al cargar
- Mobile/tablet mantienen comportamiento actual (no afectados)

---

### RF-02 — Toggle de tema coherente con el estado inicial
**Tipo**: UBIQUITOUS | **Prioridad**: SHOULD | **Issue**: #263

THE SYSTEM SHALL inicializar el icono del toggle (moon cuando dark,
sun cuando light) coherente con el tema activo al cargar la página.

**Criterios de aceptación**:
- Al cargar en dark mode: icono `moon` visible en el botón toggle
- Al cargar en light mode: icono `sun` visible en el botón toggle
- El toggle cambia correctamente entre temas en ambas direcciones

---

### RF-03 — Upload de artifacts Playwright en fallo E2E
**Tipo**: EVENT-DRIVEN | **Prioridad**: SHOULD | **Issue**: #259

WHEN un job E2E falla en CI/CD (deploy.yml job `e2e` o pr-qa.yml job `qa-e2e-local`)
THE SYSTEM SHALL subir el Playwright HTML report, screenshots y traces como
artifact descargable con retención de 7 días.

**Criterios de aceptación**:
- Artifact `playwright-report-*` disponible en GitHub Actions tras fallo E2E
- Contiene HTML report + screenshots on-failure + traces on-first-retry
- Retención: 7 días
- No se sube en ejecuciones exitosas (`if: failure()`)
- Verificar que `playwright-report/` está accesible desde el runner (volumen Docker)

---

### RF-04 — Acción SSH pineada por SHA en el pipeline de deploy
**Tipo**: UBIQUITOUS | **Prioridad**: MUST | **Issue**: #255

THE SYSTEM SHALL usar `appleboy/ssh-action` referenciado por SHA completo
verificado en lugar de tag flotante (`@v1` o `@master`) en `deploy.yml`.

**Criterios de aceptación**:
- `appleboy/ssh-action` referenciado como `uses: appleboy/ssh-action@<SHA>  # vX.Y.Z`
- SHA verificado contra releases oficiales de github.com/appleboy/ssh-action
- Comentario con la versión legible junto al SHA
- Deploy funcional post-cambio

**Nota técnica**: `manual-deploy.yml` ya no existe en el repo. Solo afecta `deploy.yml`.

---

### RF-05 — Pull request template actualizado con checklist QA completo
**Tipo**: UBIQUITOUS | **Prioridad**: MUST | **Issue**: #260

THE SYSTEM SHALL disponer de `.github/pull_request_template.md` actualizado con:
tipo de cambio, descripción, y checklist QA completo.

**Criterios de aceptación**:
- Sección "Tipo de cambio" con checkboxes (feat/fix/refactor/chore/docs)
- Sección "Descripción breve del cambio"
- Checklist:
  - [ ] `make qa` pasa localmente (PHPUnit + PHPStan + CS Fixer + ESLint)
  - [ ] E2E pasan si hay cambios de UI (`make e2e`)
  - [ ] Snapshots E2E actualizados si hay cambios visuales (`make e2e-update-snapshots`)
  - [ ] No hay secrets ni datos sensibles en el código
  - [ ] El título del PR sigue Conventional Commits
  - [ ] Issue relacionada: `Closes #`
- No interfiere con el body del `auto-release-pr.yml`

**Nota técnica**: El archivo ya existe. Esta tarea lo actualiza/amplía.

---

### RF-06 — Cache headers para assets estáticos en producción
**Tipo**: UBIQUITOUS | **Prioridad**: SHOULD | **Issue**: #47

THE SYSTEM SHALL servir assets estáticos (CSS, JS, fuentes, imágenes, SVG)
con `Cache-Control: public, immutable` y `Expires: 1y` en producción (Nginx VPS).

**Criterios de aceptación**:
- `curl -I https://josemoreupeso.es/<asset>` muestra `Cache-Control: public, immutable`
- La config Nginx vive en el repo (IaC) y se despliega automáticamente
- Los assets tienen estrategia de cache-busting para evitar versiones obsoletas
- Lighthouse Performance score mejora (baseline antes del cambio)

**Nota técnica (riesgo)**: Los assets actuales no tienen fingerprinting. Activar
`immutable` sin cache-busting puede bloquear actualizaciones CSS/JS durante 1 año.
Decisión de diseño requerida: query-string versioning vs filename fingerprint.

---

## Requisitos No Funcionales

### RNF-01 — Seguridad (supply chain)
**Tipo**: UBIQUITOUS | **Prioridad**: MUST

THE SYSTEM SHALL pinear todas las GitHub Actions de terceros por SHA
para prevenir ataques de supply chain en el pipeline de deploy.

---

### RNF-02 — Performance de carga
**Tipo**: UBIQUITOUS | **Prioridad**: SHOULD

THE SYSTEM SHALL servir assets estáticos con headers de cache que permitan
al navegador no re-descargarlos en visitas sucesivas.

---

### RNF-03 — Mantenibilidad (Infrastructure as Code)
**Tipo**: UBIQUITOUS | **Prioridad**: SHOULD

THE SYSTEM SHALL mantener la configuración de Nginx en el repositorio
para garantizar reproducibilidad, auditabilidad y despliegue automatizado.

---

### RNF-04 — Observabilidad de CI/CD
**Tipo**: EVENT-DRIVEN | **Prioridad**: SHOULD

WHEN los tests E2E fallan en CI/CD THE SYSTEM SHALL proveer evidencias
descargables (screenshots, traces, HTML report) sin necesidad de
re-ejecutar los tests localmente.

---

## Notas de Implementación

| Issue | Hallazgo crítico del análisis |
|-------|-------------------------------|
| #255 | `@master` ya actualizado a `@v1` (sigue inseguro). `manual-deploy.yml` no existe. Solo afecta `deploy.yml`. |
| #259 | `playwright.config.ts` ya tiene HTML reporter en `playwright-report/`. Solo falta el step `upload-artifact@v4`. Verificar mounting volumen Docker. |
| #260 | El template ya existe. Se amplía el checklist. |
| #263 | Cambio de 1 línea + icono. ~30 snapshots desktop a regenerar con `make e2e-update-snapshots`. Tests funcionales de header a reescribir. |
| #47  | Config Nginx fuera del repo. Requiere decidir estrategia de cache-busting antes de implementar `immutable`. Es el cambio con mayor superficie de impacto. |
