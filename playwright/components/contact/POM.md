# POM: Contact

Página de contacto (`/contacto`). Cubre email, links a GitHub y LinkedIn, tarjeta de contacto y sección de redes sociales.

---

## Acciones

- `navigateToContact()` — Navega a `/contacto` y espera `domcontentloaded`

## Selectores

- `heading` → `h1`
- `emailLink` → `.contact-card a[href^="mailto:"], .contact-item a[href^="mailto:"]` (first)
- `githubLink` → `a[href*="github.com"]` (first)
- `linkedinLink` → `a[href*="linkedin.com"]` (first)
- `contactCard` → `.contact-card`
- `contactPage` → `.contact-page`
- `contactHeader` → `.contact-header`
- `socialSection` → `.social-section`

---

*Spec*: `contact.spec.ts`
