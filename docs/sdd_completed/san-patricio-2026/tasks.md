# Tasks — San Patricio Theme & Article

## Contexto
**Aventura**: Nueva feature en proyecto existente
**Generado con**: TLOTP v4.0.0 — Gandalf SDD
**Branch**: `feature/palantir_29260317` (ya existe)

---

## Grafo de Dependencias

```
T1 (Controller) ──► T3 (Twig page)
                         │
T2 (base.html.twig) ◄─── T4 (JS) ──► T5 (CSS)
                         │
                         ▼
                    T6 (E2E tests)
                         │
                         ▼
                    T7 (Article)
```

Orden de implementación recomendado: T1 → T2 → T3 → T4 → T5 → T6 → T7

---

## Tareas

### T1 — SanPatricioController
**Tamaño**: S
**RF**: RF-01, RF-02

**Descripción**: Crear `src/Controllers/SanPatricioController.php` con ruta `GET /san_patricio`. Verifica si la fecha actual (Europe/Madrid) es anterior a 2026-03-17T23:59:59. Si activa → renderiza `pages/san_patricio/index.html.twig`. Si expirada → renderiza mensaje neutro.

**Criterios de aceptación**:
- [ ] GET /san_patricio responde 200 durante el 17/03/2026
- [ ] GET /san_patricio muestra mensaje neutro si fecha > 2026-03-17T23:59:59 Europe/Madrid
- [ ] DateTimeZone('Europe/Madrid') usado explícitamente
- [ ] Sigue el patrón de PortfolioController (constructor injection, return $this->render())
- [ ] PHPStan level 9 pasa sin errores

---

### T2 — Modificar base.html.twig (incluir san_patricio.js)
**Tamaño**: S
**RF**: RF-03, RF-04

**Descripción**: Añadir el script tag de `san_patricio.js` en `templates/base.html.twig` para que corra en todas las páginas. El botón dark mode (ID `theme-toggle`, líneas 92-96) debe ser accesible para que JS pueda intercambiarlo por el trébol.

**Criterios de aceptación**:
- [ ] `<script src="/js/san_patricio.js">` incluido en base.html.twig antes del cierre de `</body>`
- [ ] El ID `theme-toggle` del botón darkmode no ha cambiado (JS lo necesita para sustituirlo)
- [ ] Los E2E existentes siguen pasando (sin tema activo, el botón darkmode sigue presente)

---

### T3 — san_patricio.html.twig
**Tamaño**: S
**RF**: RF-01, RF-02

**Descripción**: Crear `templates/pages/san_patricio/index.html.twig` extendiendo `base.html.twig`. Incluye contenido festivo irlandés (mensaje invitando al pub más cercano a tomar una Guinness, decoración con tréboles 🍀☘️). El script de `san_patricio.js` se activa automáticamente (incluido desde base.html.twig).

**Criterios de aceptación**:
- [ ] La página extiende `base.html.twig`
- [ ] Muestra mensaje festivo irlandés con al menos una referencia al pub/Guinness
- [ ] Incluye decoración con emojis de trébol
- [ ] La página del estado expirado (controlado por el Controller) muestra mensaje neutro sin emojis festivos

---

### T4 — san_patricio.js
**Tamaño**: M
**RF**: RF-03, RF-04, RF-05

**Descripción**: Crear `public/js/san_patricio.js`. Implementar:
1. Función `activateTheme()`: guarda `localStorage.setItem('san_patricio_theme', 'active')`, inyecta `san_patricio.css` dinámicamente (ID: `san-patricio-stylesheet`), sustituye botón darkmode por trébol 🍀.
2. Función `deactivateTheme()`: elimina flag localStorage, elimina `<link id="san-patricio-stylesheet">`, restaura botón darkmode.
3. Al cargar cualquier página: si localStorage tiene el flag activo Y la fecha actual es ≤ 2026-03-17T23:59:59 → activa tema. Si fecha expirada → llama `deactivateTheme()` y limpia localStorage.
4. Si la página actual es `/san_patricio` → llama `activateTheme()` al cargar.
5. El botón trébol tiene event listener para llamar `deactivateTheme()` (solo fuera de `/san_patricio`).

**Criterios de aceptación**:
- [ ] Visitar /san_patricio guarda el flag en localStorage
- [ ] Navegar a otra página muestra el trébol en el header si el flag está activo
- [ ] Clic en trébol (fuera de /san_patricio) elimina el flag y restaura darkmode
- [ ] Si fecha > 2026-03-17T23:59:59, el JS limpia localStorage aunque tenga el flag
- [ ] ESLint pasa sin errores
- [ ] Funciona sin errores en consola del navegador

---

### T5 — san_patricio.css
**Tamaño**: S
**RF**: RF-03, RNF-01, RNF-02

**Descripción**: Crear `public/css/san_patricio.css` con acentos verdes sutiles para el tema. Estilos solo additivos (no hacer override de propiedades de layout para no romper responsive). El fichero no toca ni importa ningún CSS core.

Estilos sugeridos:
- Header: borde inferior verde sutil
- Links activos/hover: tinte verde
- Botón trébol: estilo coherente con el darkmode button existente
- Posibles: separadores, badges con verde irlandés (#2D8A4E o similar)

**Criterios de aceptación**:
- [ ] Fichero standalone, no importa CSS core
- [ ] Acentos verdes presentes en al menos header y links
- [ ] El layout responsive no se rompe (verificar en mobile y desktop)
- [ ] El trébol en el header tiene el mismo tamaño/posición que el botón darkmode

---

### T6 — E2E Tests Playwright
**Tamaño**: M
**RF**: RF-05, RF-01, RF-02, RF-03, RF-04

**Descripción**: Crear tests E2E en `playwright/tests/specs/san_patricio.spec.ts`. Implementar POM en `playwright/pages/SanPatricioPage.ts` con selectores en `playwright/pages/SanPatricioSelectors.ts`.

Tests a implementar:
1. `beforeEach`: limpiar localStorage (`localStorage.removeItem('san_patricio_theme')`)
2. Test: visitar /san_patricio activa el tema (localStorage tiene el flag)
3. Test: navegar a home después de activar tema → trébol visible en header
4. Test: clic en trébol → darkmode button restaurado, localStorage limpio
5. Test: verificar que el trébol no aparece en páginas normales sin activación previa

**Criterios de aceptación**:
- [ ] `beforeEach` limpia localStorage (RF-05, RNF-03)
- [ ] Selectores CSS solo en `*Selectors.ts` (POM estricto)
- [ ] Tests solo usan métodos del POM, nunca selectores directos
- [ ] ESLint pasa sin errores
- [ ] `make e2e` pasa en verde
- [ ] Los E2E existentes no se ven afectados

---

### T7 — Artículo Code & AI: TLOTP + SDD + IA
**Tamaño**: M
**RF**: RF-06

**Descripción**: Añadir nuevo artículo en `data/articles.json` describiendo el uso de TLOTP + SDD + IA para especificar y desarrollar esta feature. Contenido en Markdown en el campo `content`.

**Estructura del artículo**:
- **Título**: "Cómo TLOTP + SDD + IA especificaron esta feature en tiempo real"
- **Slug**: `tlotp-sdd-ia-san-patricio`
- **Tags**: `["tlotp", "sdd", "ia", "symfony", "playwright"]`
- **Sección**: Code & AI
- **Contenido**: Describe el flujo Gandalf SDD (Rohirrim → Field Report → Objetivo → Requisitos → Design → Tasks), cómo la IA generó la spec completa, y menciona el próximo experimento: SDD full-project desde cero hasta producción en una sesión con métricas.

**Criterios de aceptación**:
- [ ] Artículo visible en `/code-ai` (listado)
- [ ] Artículo accesible en `/code-ai/tlotp-sdd-ia-san-patricio`
- [ ] Menciona el próximo experimento de SDD full-project con métricas
- [ ] Markdown renderizado correctamente con syntax highlighting si hay código

---

## Resumen

| Task | Descripción                  | Tamaño | Dependencias |
|------|------------------------------|--------|--------------|
| T1   | SanPatricioController        | S      | —            |
| T2   | Modificar base.html.twig     | S      | —            |
| T3   | san_patricio.html.twig       | S      | T1           |
| T4   | san_patricio.js              | M      | T2           |
| T5   | san_patricio.css             | S      | T4           |
| T6   | E2E Tests                    | M      | T1,T2,T3,T4,T5 |
| T7   | Artículo Code & AI           | M      | —            |

**Total**: 7 tareas · 3S + 3M · Estimación relativa: ~1 sesión de implementación
