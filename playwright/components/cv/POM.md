# POM: CV

Cubre tres rutas: página principal `/cv`, versión HTML estática `/cv.html` y endpoint de descarga `/cv/pdf`.

---

## Acciones

- `navigateToCv()` — Navega a `/cv`, espera `domcontentloaded` y el `h1` visible
- `navigateToCvHtml()` — Navega a `/cv.html`, espera `domcontentloaded` y `.cv-name` visible

## Assertions

- `titleIsCorrect()` — El título de la página contiene "CV" y "José Moreu"
- `cvHtmlTitleIsCorrect()` — El título de `/cv.html` contiene "CV" y "José Moreu"
- `cvHtmlHasContent()` — El elemento `.cv-name` es visible en `/cv.html`
- `viewHtmlButtonIsVisible()` — El botón "Ver HTML" (`.cv-btn--view`) es visible
- `pdfLinkIsVisible()` — El enlace de descarga del PDF es visible
- `downloadPdfLinkIsVisible()` — El enlace `a.cv-btn--download` es visible
- `downloadPdfLinkHasCorrectAttributes()` — El enlace tiene `href="/cv/pdf"` y atributo `download`
- `cvPdfResponseIsValid()` — GET `/cv/pdf` devuelve HTTP 200 y `Content-Type: application/pdf`
- `skillsCarouselHasTitle()` — La sección del carrusel es visible y contiene "Stack Técnico"

## Visual Regression

- `cvHeaderMatchesSnapshot(snapshotName)` — Screenshot de `.cv-header`
- `cvPdfCardMatchesSnapshot(snapshotName)` — Screenshot de `.pdf-download-card`
- `cvTechInfoMatchesSnapshot(snapshotName)` — Screenshot de `.cv-tech-info`
- `cvHtmlMatchesSnapshot(snapshotName)` — Screenshot de viewport completo de `/cv.html`

## Selectores

- `route` → `/cv`
- `routeHtml` → `/cv.html`
- `routePdf` → `/cv/pdf`
- `heading` → `h1`
- `pdfLink` → `a.cv-btn--download`
- `viewHtmlButton` → `.cv-btn--view`
- `cvHeader` → `.cv-header`
- `pdfDownloadCard` → `.pdf-download-card`
- `cvTechInfo` → `.cv-tech-info`
- `skillsCarouselSection` → `.skills-carousel-section`
- `skillsCarouselTitle` → `Stack Técnico` (constante)
- `cvHtmlName` → `.cv-name` (elemento en `/cv.html`)

---

*Specs*: `cv.desktop.spec.ts`, `cv.mobile.spec.ts`
