# POM: Contact

Página de contacto (`/contacto`). Cubre email, links a GitHub, tarjeta de contacto y sección de redes sociales.

---

## Acciones

- `navigateToContact()` — Navega a `/contacto`, espera `domcontentloaded` y el `h1` visible

## Assertions

- `titleIsCorrect()` — El título de la página contiene "Contacto" y "José Moreu"
- `emailLinkIsValid()` — El enlace de email es visible y su href contiene la dirección de email
- `githubLinkIsValid()` — El enlace a GitHub es visible y apunta al perfil correcto
- `externalLinksAreSecure()` — Todos los enlaces con `target="_blank"` tienen `rel="noopener"`

## Visual Regression

- `contactHeaderMatchesSnapshot(snapshotName)` — Screenshot de `.contact-header`
- `contactCardMatchesSnapshot(snapshotName)` — Screenshot de `.contact-card`
- `socialSectionMatchesSnapshot(snapshotName)` — Screenshot de `.social-section`

## Selectores

- `route` → `/contacto`
- `heading` → `h1`
- `emailLink` → `.contact-card a[href^="mailto:"], .contact-item a[href^="mailto:"]` (first)
- `emailAddress` → `joseguillermomoreu@gmail.com` (constante)
- `githubLink` → `.social-section a[href*="github.com"]`
- `contactCard` → `.contact-card`
- `contactHeader` → `.contact-header`
- `socialSection` → `.social-section`
- `externalLinks` → `a[target="_blank"]`

---

*Specs*: `contact.desktop.spec.ts`, `contact.mobile.spec.ts`
