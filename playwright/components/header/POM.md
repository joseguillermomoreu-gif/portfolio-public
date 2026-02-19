# POM - Header Component

Componente del header, presente en todas las páginas.

**Archivos**: `index.ts`, `selectors.ts`
**Extiende**: — (no extiende BasePage)

---

## Locators

| Locator | Selector | Descripción |
|---------|----------|-------------|
| `container` | `.header` | Contenedor del header |
| `logo` | `.logo` | Logo del sitio |
| `navigation` | `nav[role="navigation"]` | Elemento de navegación principal |
| `navLinksContainer` | `.nav-links` | Contenedor de los links de nav |
| `navLinks` | `.nav-links .nav-link` | Todos los links de navegación |
| `themeToggle` | `#theme-toggle` | Botón de cambio light/dark |
| `mobileMenuToggle` | `.mobile-menu-toggle` | Botón hamburguesa (móvil) |
| `mobileOverlay` | `.mobile-overlay` | Overlay del menú móvil |

## Métodos

| Método | Retorno | Descripción |
|--------|---------|-------------|
| `isVisible()` | `Promise<boolean>` | Verifica si el header es visible |
| `toggleTheme()` | `Promise<void>` | Cambia entre light/dark mode (click + espera 400ms) |
| `getCurrentTheme()` | `Promise<string \| null>` | Devuelve el valor de `data-theme` del `<html>` |
| `openMobileMenu()` | `Promise<void>` | Abre el menú hamburguesa (click + espera 400ms) |
| `closeMobileMenu()` | `Promise<void>` | Cierra el menú via click en overlay (espera 300ms) |
| `scrollToTriggerEffect(scrollY?)` | `Promise<void>` | Scroll para activar efecto sticky (default 200px) |
| `getNavLinkByHref(href)` | `Locator` | Locator del nav link por su href |
| `getLocator()` | `Locator` | Locator del container |

## Comportamiento responsive

- **Desktop (≥769px)**: Todos los nav links visibles, theme toggle visible
- **Mobile (<769px)**: Hamburguesa visible, nav links ocultos hasta abrir menú, theme toggle oculto (dark mode forzado)

---

*Última actualización: 2026-02-19*
