# POM: CV

Página de currículum vitae (`/cv`). Cubre descarga de PDF, información técnica y carrusel de skills.

---

## Acciones

- `navigateToCv()` — Navega a `/cv`, espera `domcontentloaded` y el `h1` visible

## Assertions

- `titleIsCorrect()` — El título de la página contiene "CV" y "José Moreu"
- `pdfLinkIsVisible()` — El enlace de descarga del PDF es visible
- `skillsCarouselHasTitle()` — La sección del carrusel es visible y contiene el texto "Stack Técnico"

## Visual Regression

- `cvHeaderMatchesSnapshot(snapshotName)` — Screenshot de `.cv-header`
- `cvPdfCardMatchesSnapshot(snapshotName)` — Screenshot de `.pdf-download-card`
- `cvTechInfoMatchesSnapshot(snapshotName)` — Screenshot de `.cv-tech-info`

## Selectores

- `route` → `/cv`
- `heading` → `h1`
- `pdfLink` → `a[href*=".pdf"]` (first)
- `cvHeader` → `.cv-header`
- `pdfDownloadCard` → `.pdf-download-card`
- `cvTechInfo` → `.cv-tech-info`
- `skillsCarouselSection` → `.skills-carousel-section`
- `skillsCarouselTitle` → `Stack Técnico` (constante)

---

*Specs*: `cv.desktop.spec.ts`, `cv.mobile.spec.ts`
