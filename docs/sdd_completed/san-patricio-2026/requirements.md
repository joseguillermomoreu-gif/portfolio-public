# Requirements — San Patricio Theme & Article

## Contexto
**Aventura**: Nueva feature en proyecto existente
**Stack**: Symfony 6.4 · PHP 8.1 · Twig 3.x · Hexagonal DDD
**Fecha límite de actividad**: hasta el 2026-03-17T23:59:59 (Europe/Madrid)
**Generado con**: TLOTP v4.0.0 — Gandalf SDD

---

## Requisitos Funcionales

### RF-01 — Activación del tema San Patricio
**Tipo**: EVENT-DRIVEN · **Prioridad**: MUST

WHEN the user visits /san_patricio
THE SYSTEM SHALL activate the St. Patrick's Day theme,
display a festive page with an Irish-themed message inviting
the user to visit their nearest Irish pub for a Guinness,
and persist the active theme in localStorage.

### RF-02 — Expiración automática del tema
**Tipo**: UNWANTED · **Prioridad**: MUST

IF the current date is after 2026-03-17T23:59:59 (Europe/Madrid)
THEN THE SYSTEM SHALL NOT activate the St. Patrick's theme,
even if the user visits /san_patricio, and SHALL display
a neutral "this page is no longer available" message.

### RF-03 — Sustitución del botón de darkmode por trébol
**Tipo**: OPTION · **Prioridad**: MUST

WHERE the St. Patrick's Day theme is active
THE SYSTEM SHALL replace the dark mode toggle button
with a shamrock button (🍀) in the header of every page,
applying subtle green color accents to the UI without
breaking the existing responsive layout.

### RF-04 — Desactivación del tema al clicar el trébol
**Tipo**: EVENT-DRIVEN · **Prioridad**: MUST

WHEN the user clicks the shamrock button on any page
other than /san_patricio
THE SYSTEM SHALL deactivate the St. Patrick's Day theme,
remove the theme flag from localStorage, restore the dark
mode toggle button, and remove all green accent styles.

### RF-05 — Aislamiento de E2E existentes
**Tipo**: UBIQUITOUS · **Prioridad**: SHOULD

THE SYSTEM SHALL ensure that existing Playwright E2E tests
are not affected by the St. Patrick's theme activation,
isolating any new E2E tests for /san_patricio so they
only trigger the theme when starting from that specific URL.

### RF-06 — Artículo TLOTP + SDD + IA
**Tipo**: UBIQUITOUS · **Prioridad**: MUST

THE SYSTEM SHALL publish an article in the Code & AI section
describing how TLOTP + SDD + AI was used to specify and
develop this feature, including a mention of the next
experiment planned: full-project SDD from zero to production
in one session with metrics.

---

## Requisitos No Funcionales

### RNF-01 — Performance
El tema de San Patricio no debe añadir más de 100ms al tiempo de carga
de ninguna página. Los assets CSS/JS del tema se cargarán solo cuando
el tema esté activo (localStorage flag).

### RNF-02 — Mantenibilidad
El código del tema estará aislado en ficheros dedicados
(san_patricio.css, san_patricio.js o similar) sin modificar
los ficheros CSS/JS core de la aplicación.

### RNF-03 — Testabilidad
Los tests E2E existentes no deben requerir modificaciones.
Los nuevos tests de /san_patricio limpiarán localStorage
antes de ejecutarse para garantizar estado inicial limpio.

---

## Resumen
- **Funcionales**: 6 (MUST: 5 · SHOULD: 1)
- **No funcionales**: 3
