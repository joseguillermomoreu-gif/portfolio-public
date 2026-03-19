# POM: TLOTP

Página TLOTP — The Lord of the Prompt (`/tlotp`). Cubre navegación, contenido, enlace GitHub y ausencia de PPIA en el menú.

---

## Acciones

- `navigateToTlotp()` — Navega directamente a `/tlotp`, espera `domcontentloaded` y el `h1` visible
- `navigateToTlotpViaNav()` — Navega desde home usando el enlace del nav

## Assertions

- `titleIsCorrect()` — El título de la página contiene "TLOTP" o "The Lord of the Prompt"
- `headingIsVisible()` — El `h1` contiene "TLOTP"
- `taglineIsVisible()` — El tagline contiene "Un prompt para controlarlos a todos"
- `githubLinkIsPresent()` — Existe un enlace a github.com en la sección CTA
- `ppiaIsNotInNav()` — El menú NO contiene enlace a /ppia

## Visual Regression

- `tlotpHeaderMatchesSnapshot(snapshotName)` — Screenshot de `.tlotp-header`

## Selectores

- `route` → `/tlotp`
- `heading` → `h1`
- `tlotpHeader` → `.tlotp-header`
- `tagline` → `.tlotp-tagline`
- `githubLink` → `.tlotp-cta a[href*="github.com"]`
- `navPpia` → `.nav-links a[href="/ppia"]`
- `navTlotp` → `.nav-links a[href="/tlotp"]`

---

*Specs*: `tlotp.desktop.spec.ts`, `tlotp.mobile.spec.ts`
