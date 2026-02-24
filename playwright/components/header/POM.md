# POM: Header

Header presente en todas las páginas. Gestiona navegación principal, theme toggle (light/dark) y menú hamburguesa en mobile.

---

## Acciones

- `toggleTheme()` — Click en el theme toggle; espera transición CSS (~400ms)
- `getCurrentTheme()` — Retorna el valor del atributo `data-theme` en `<html>`
- `openMobileMenu()` — Click en hamburguesa; espera `navLinksContainer` visible
- `closeMobileMenu()` — Click en overlay; espera `mobileOverlay` hidden
- `closeWithEsc()` — Pulsa Escape; espera `mobileOverlay` hidden
- `scrollToTriggerEffect(scrollY = 200)` — Scroll programático; espera transición CSS (~300ms)
- `getNavLinkByHref(href)` — Retorna locator del link de nav por href exacto
- `clearThemeFromLocalStorage()` — Limpia el theme del localStorage
- `setLocalStorageThemeToLight()` — Establece `theme=light` en localStorage
- `hideHeader()` — Oculta el elemento `<header>` vía JS (`visibility: hidden`); usado para screenshots del skills grid sin interferencia del header

## Assertions

- `themeIsDark()` / `themeIsLight()` — Verifica el tema activo en `data-theme`
- `themeToggleIsVisible()` / `themeToggleIsHidden()` — Visibilidad del botón de tema
- `themeToggleHasAriaLabel()` — El toggle tiene `aria-label` con valor que contiene "theme"
- `logoIsVisible()` — El logo es visible
- `logoHasText(text)` — El logo muestra el texto indicado
- `hasNavLinksCount(count)` — Número de enlaces de nav
- `navLinksAreInOrder(expected)` — Orden de los textos de los enlaces de nav
- `activeNavLinkIs(text)` — El enlace activo es el indicado
- `navigationHasAriaLabel(label)` — El elemento `<nav>` tiene el aria-label indicado
- `headerIsPresent()` — El contenedor `.header` es visible
- `mobileMenuToggleIsVisible()` — El hamburguesa es visible
- `mobileMenuIsClosed()` — El menú no tiene clase `active`
- `mobileMenuIsOpen()` — El menú, toggle y overlay tienen clase `active`
- `mobileMenuToggleAriaExpandedIs(value)` — `aria-expanded` del toggle es el valor indicado
- `mobileMenuToggleHasAriaLabel()` — El toggle tiene `aria-label` no vacío

## Visual Regression

- `headerMatchesSnapshot(snapshotName)` — Screenshot del contenedor `.header`
- `headerFullPageMatchesSnapshot(snapshotName)` — Screenshot de página completa

## Selectores

- `container` → `.header`
- `logo` → `.logo`
- `navigation` → `nav[role="navigation"]`
- `navLinksContainer` → `.nav-links`
- `navLinks` → `.nav-links .nav-link`
- `activeNavLink` → `.nav-link.active`
- `themeToggle` → `#theme-toggle`
- `mobileMenuToggle` → `.mobile-menu-toggle`
- `mobileOverlay` → `.mobile-overlay`

---

*Specs*: `header.desktop.spec.ts`, `header.mobile.spec.ts`, `header.dark-mode.tablet-small.spec.ts`, `header.dark-mode.tablet-large.spec.ts`
