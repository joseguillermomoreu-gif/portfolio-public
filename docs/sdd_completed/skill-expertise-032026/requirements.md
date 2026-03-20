# Requirements — SDD Skill, Expertise & Test Refactoring

## Contexto

- **Proyecto**: josemoreupeso.es — Portfolio personal
- **Stack**: PHP 8.1 / Symfony 6.4 / Arquitectura Hexagonal / JSON persistence
- **Testing**: PHPUnit + Playwright (TypeScript/POM)
- **CI/CD**: GitHub Actions → OVH VPS

---

## Requisitos Funcionales

### FR-01 — Migración fixtures → DataProviders (MUST)

**Tipo**: UBIQUITOUS

THE SYSTEM SHALL reemplazar los fixtures de fichero
(`tests/fixtures/articles-test.json`, `portfolio-valid.json`,
`portfolio-invalid.json`) por DataProviders inline en clases
PHP, siguiendo el patrón de `tests/Domain/ExpertiseArea/DataProvider/`,
sin dejar ficheros JSON de fixture huérfanos en `tests/fixtures/`

### FR-02 — Skill SDD en portfolio.json (MUST)

**Tipo**: UBIQUITOUS

THE SYSTEM SHALL añadir una entrada de skill `SDD` en
`data/portfolio.json` como primer elemento del array `skills`,
con `level: "expert"`, `stars: 5`, y descripción que explique
la metodología SDD con enlace al repositorio público y mención
a TLOTP como prompt de autoasistencia para generar SDDs correctos

### FR-03 — ExpertiseArea SDD en expertise-areas.json (MUST)

**Tipo**: UBIQUITOUS

THE SYSTEM SHALL añadir una nueva ExpertiseArea `SDD` en
`data/expertise-areas.json`, en la categoría `arquitectura`,
con descripción que explique la metodología, enlace a
`docs/sdd_completed/` en el repo público y ejemplos reales
(TLOTP page, /tlotp) usados en el portfolio

### FR-04 — Exclusión .claude/ del repo público (SHOULD)

**Tipo**: UNWANTED

IF el script `sync-to-public.sh` sincroniza ficheros de
`.claude/rules/`, `.claude/teams/` u otros ficheros internos
de configuración de Claude Code al repositorio público
THEN THE SYSTEM SHALL añadir la exclusión correspondiente
para que solo el código fuente llegue al repo público

### FR-05 — Commit release-process.md (MUST)

**Tipo**: UBIQUITOUS

THE SYSTEM SHALL commitear el cambio ya aplicado en
`.claude/rules/release-process.md` (paso 2: PR se crea
automáticamente, NO crear manualmente) como parte de
esta misma rama feature

---

## Requisitos No Funcionales

### NFR-01 — Calidad PHP (MUST)

THE SYSTEM SHALL mantener PHPStan level 9 sin errores y
PHP CS Fixer PSR-12 sin violaciones en todos los ficheros
PHP modificados o creados

### NFR-02 — Cobertura de tests (MUST)

THE SYSTEM SHALL mantener la cobertura de tests existente:
los DataProviders deben cubrir exactamente los mismos
escenarios que los fixtures que reemplazan

### NFR-03 — Mantenibilidad (SHOULD)

THE SYSTEM SHALL seguir el patrón de nomenclatura existente:
DataProvider classes en subdirectorio `DataProvider/` del
namespace de tests correspondiente
