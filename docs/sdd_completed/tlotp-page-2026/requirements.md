# Requirements — Página TLOTP + mejoras conexas

## Contexto

- **Proyecto**: josemoreupeso.es — Portfolio personal
- **Stack**: PHP 8.1 · Symfony 6.4 · Arquitectura Hexagonal (DDD)
- **Frontend**: Twig templates · Vanilla CSS/JS
- **Tipo de aventura**: Nueva feature en proyecto existente

---

## Requisitos Funcionales

### RF-01 — Quitar PPIA del menú de navegación
**Tipo**: UBIQUITOUS | **Prioridad**: MUST

THE SYSTEM SHALL remove the PPIA item from the main
navigation menu while preserving the PPIA route accessible
via direct URL (no 404).

---

### RF-02 — Página dedicada para TLOTP
**Tipo**: UBIQUITOUS | **Prioridad**: MUST

THE SYSTEM SHALL have a dedicated page for TLOTP accessible
via the URL /tlotp, reachable from the main navigation menu.

---

### RF-03 — Contenido de la página TLOTP
**Tipo**: UBIQUITOUS | **Prioridad**: MUST

THE SYSTEM SHALL display on the TLOTP page: the project name
("TLOTP"), the tagline ("Un prompt para controlarlos a todos"),
a brief description of what TLOTP is, and a link to the
GitHub repository.

---

### RF-04 — Layout TLOTP igual que PPIA
**Tipo**: UBIQUITOUS | **Prioridad**: MUST

THE SYSTEM SHALL render the TLOTP page following the same
layout structure as the PPIA page (same template pattern:
hero section, description, CTA / links).

---

### RF-05 — TLOTP en el sitemap
**Tipo**: UBIQUITOUS | **Prioridad**: SHOULD

THE SYSTEM SHALL include the TLOTP page in the sitemap.xml
and ensure it is crawlable by search engines.

---

### RF-06 — Skill vibe-coding → SDD
**Tipo**: UBIQUITOUS | **Prioridad**: SHOULD

THE SYSTEM SHALL rename/update the "vibe-coding" skill
to "sdd" (Spec-Driven Development), updating its name,
description and associated metadata to reflect the
SDD methodology.

---

### RF-07 — Sync docs/sdd_completed/ al repo público
**Tipo**: UBIQUITOUS | **Prioridad**: SHOULD

THE SYSTEM SHALL include the contents of docs/sdd_completed/
in the CI/CD sync to the public repository (portfolio-public),
so completed SDD documents are publicly visible.

---

### RF-08 — Link a SDD examples en la skill description
**Tipo**: UBIQUITOUS | **Prioridad**: COULD

THE SYSTEM SHALL include in the SDD skill description a link
pointing to the docs/sdd_completed/ path of the public
repository, so users can browse real SDD examples.

---

## Requisitos No Funcionales

### RNF-01 — Performance
**Prioridad**: SHOULD

THE SYSTEM SHALL render the TLOTP page in under 300ms (TTFB),
consistent with the performance of other pages in the portfolio.

---

### RNF-02 — Seguridad
**Prioridad**: MUST

THE SYSTEM SHALL not introduce new user input surfaces on the
TLOTP page; all content shall be static and server-rendered
via Twig templates following existing Symfony security config.

---

### RNF-03 — Mantenibilidad
**Prioridad**: MUST

THE SYSTEM SHALL implement the TLOTP page reusing existing
Twig template patterns and CSS classes from the PPIA page to
minimize code duplication and simplify future maintenance.

---

## Resumen

| ID     | Descripción                            | Prioridad |
|--------|----------------------------------------|-----------|
| RF-01  | Quitar PPIA del menú                   | MUST      |
| RF-02  | Página /tlotp                          | MUST      |
| RF-03  | Contenido de la página TLOTP           | MUST      |
| RF-04  | Layout igual que PPIA                  | MUST      |
| RF-05  | TLOTP en sitemap.xml                   | SHOULD    |
| RF-06  | Skill vibe-coding → SDD                | SHOULD    |
| RF-07  | Sync sdd_completed al repo público     | SHOULD    |
| RF-08  | Link a SDD examples en skill           | COULD     |
| RNF-01 | Performance < 300ms TTFB               | SHOULD    |
| RNF-02 | Seguridad — solo contenido estático    | MUST      |
| RNF-03 | Mantenibilidad — reusar templates PPIA | MUST      |

**Total**: 8 funcionales (MUST: 4 · SHOULD: 3 · COULD: 1) + 3 no funcionales
