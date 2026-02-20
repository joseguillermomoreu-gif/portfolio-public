# POM: CV

Página de currículum vitae (`/cv`). Cubre descarga de PDF, contador de programación, información técnica y nota informativa.

---

## Acciones

- `navigateToCv()` — Navega a `/cv` y espera `domcontentloaded`

## Selectores

- `heading` → `h1`
- `pdfLink` → `a[href*=".pdf"]` (first)
- `programmingCounter` → `.programming-counter`
- `wipButton` → `.cv-generator-btn`
- `cvPage` → `.cv-page`
- `cvHeader` → `.cv-header`
- `pdfDownloadCard` → `.pdf-download-card`
- `cvTechInfo` → `.cv-tech-info`
- `cvNote` → `.cv-note`

---

*Spec*: `cv.spec.ts`
