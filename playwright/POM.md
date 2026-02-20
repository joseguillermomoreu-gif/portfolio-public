# Page Object Model - Components Index

Índice de componentes Page Object Model del proyecto josemoreupeso.es.

---

## 📁 Estructura de Componentes

```
playwright/
├── components/
│   ├── index.ts                → Barrel export de todos los componentes (export *)
│   ├── home/                   ✅ Documentado
│   │   ├── POM.md              → Documentación completa
│   │   ├── index.ts            → homeLocators, navigateHome, getStatCardsCount
│   │   └── selectors.ts        → Selectores de la home (.hero, .stat-card, .stack-visual...)
│   ├── header/                 ✅ Documentado
│   │   ├── POM.md              → Documentación completa
│   │   ├── index.ts            → headerLocators, toggleTheme, getCurrentTheme, openMobileMenu, closeMobileMenu, scrollToTriggerEffect, getNavLinkByHref
│   │   └── selectors.ts        → Selectores del header (.header, .logo, nav, .nav-links...)
│   ├── footer/                 ✅ Documentado
│   │   ├── POM.md              → Documentación completa
│   │   ├── index.ts            → footerLocators, scrollToFooter, footerDynamicMasks
│   │   └── selectors.ts        → Selectores del footer (.site-footer, .footer-social, .footer-meta...)
│   ├── cv/                     ✅ Documentado
│   │   ├── POM.md              → Documentación completa
│   │   ├── index.ts            → cvLocators, navigateToCv
│   │   └── selectors.ts        → Selectores del CV (.cv-page, .cv-header, .pdf-download-card...)
│   ├── contact/                ✅ Documentado
│   │   ├── POM.md              → Documentación completa
│   │   ├── index.ts            → contactLocators, navigateToContact
│   │   └── selectors.ts        → Selectores de contacto (.contact-page, .contact-card, .social-section...)
│   ├── projects/               ✅ Documentado
│   │   ├── POM.md              → Documentación completa
│   │   ├── index.ts            → projectsLocators, navigateToProjects, getProjectCardByName, getProjectStatus, getProjectDescription, getProjectStack, getProjectTags, getProjectHighlights, getProjectGithubLink, getProjectWebsiteLink
│   │   └── selectors.ts        → Selectores de proyectos (.projects-grid, [data-testid="project-card"]...)
│   ├── code-ai/                ✅ Documentado
│   │   ├── POM.md              → Documentación completa
│   │   ├── index.ts            → codeAiLocators, navigateToCodeAi, getArticleCount
│   │   └── selectors.ts        → Selectores de Code & AI (.code-ai-header, .articles-grid, .article-card...)
│   └── ppia/                   ✅ Documentado
│       ├── POM.md              → Documentación completa
│       ├── index.ts            → ppiaLocators, navigateToPpia
│       └── selectors.ts        → Selectores de PPiA (.ppia-page, .ppia-header, .wip-card...)
└── tests/
    ├── home/
    ├── header/
    ├── footer/
    ├── cv/
    ├── contact/
    ├── projects/
    ├── code-ai/
    └── ppia/
```

---

## 📚 Componentes Documentados

### Home - Página Principal
**Ubicación**: [`components/home/`](components/home/POM.md)

Página home (`/`). Cubre hero, quick intro, stats cards, portfolio context, current focus y skills section.

**Funciones principales**:
- `homeLocators(page)` — retorna locators: hero, heroContent, heroCvButton, heroContactButton, quickIntro, quickIntroHeader, introStats, statCards, portfolioContext, currentFocus, skillsSection, stackVisual, stackItems, akkodisLink, elConfidencialLink, githubProfileLink
- `navigateHome(page)` — navega a `/` y espera `domcontentloaded`
- `getStatCardsCount(page)` — retorna el número de stat cards visibles

### Header - Cabecera del Sitio
**Ubicación**: [`components/header/`](components/header/POM.md)

Header presente en todas las páginas. Gestiona navegación principal, theme toggle (light/dark) y menú hamburguesa en mobile.

**Funciones principales**:
- `headerLocators(page)` — retorna locators: container, logo, navigation, navLinksContainer, navLinks, themeToggle, mobileMenuToggle, mobileOverlay
- `toggleTheme(page)` — hace click en el toggle; espera transición CSS (~400ms)
- `getCurrentTheme(page)` — retorna el valor de `data-theme` en `<html>`
- `openMobileMenu(page)` — click en hamburguesa; espera `navLinksContainer` visible
- `closeMobileMenu(page)` — click en overlay; espera `mobileOverlay` hidden
- `scrollToTriggerEffect(page, scrollY?)` — scroll programático; espera transición CSS (~300ms)
- `getNavLinkByHref(page, href)` — retorna locator del link de nav por href exacto

### Footer - Pie de Página
**Ubicación**: [`components/footer/`](components/footer/POM.md)

Footer presente en todas las páginas. Incluye enlaces a redes sociales, versión dinámica y año actual. Provee helpers para visual regression con enmascaramiento del contenido dinámico.

**Funciones principales**:
- `footerLocators(page)` — retorna locators: container, socialLinks, version, year, footerMeta, footerText
- `scrollToFooter(page)` — hace scroll hasta que el footer sea visible
- `footerDynamicMasks(page)` — retorna `Locator[]` con `.footer-meta` para usar como `mask` en visual regression

### CV - Currículum Vitae
**Ubicación**: [`components/cv/`](components/cv/POM.md)

Página CV (`/cv`). Cubre descarga de PDF, contador de años programando, sección de información técnica y nota informativa.

**Funciones principales**:
- `cvLocators(page)` — retorna locators: heading, pdfLink, programmingCounter, wipButton, cvPage, cvHeader, pdfDownloadCard, cvTechInfo, cvNote
- `navigateToCv(page)` — navega a `/cv` y espera `domcontentloaded`

### Contact - Contacto
**Ubicación**: [`components/contact/`](components/contact/POM.md)

Página contacto (`/contacto`). Cubre email, links a GitHub y LinkedIn, tarjeta de contacto y sección de redes sociales.

**Funciones principales**:
- `contactLocators(page)` — retorna locators: heading, emailLink, githubLink, linkedinLink, contactCard, contactPage, contactHeader, socialSection
- `navigateToContact(page)` — navega a `/contacto` y espera `domcontentloaded`

### Projects - Proyectos
**Ubicación**: [`components/projects/`](components/projects/POM.md)

Página proyectos (`/proyectos`). Cubre grid de tarjetas de proyecto con funciones helper para acceder a cada campo de la tarjeta.

**Funciones principales**:
- `projectsLocators(page)` — retorna locators: heading, projectCards, mainContent, projectsPage, projectsHeader, projectsGrid, projectsFooter
- `navigateToProjects(page)` — navega a `/proyectos` y espera `domcontentloaded`
- `getProjectCardByName(page, name)` — retorna el locator de la tarjeta filtrada por nombre
- `getProjectStatus(card)`, `getProjectGithubLink(card)`, `getProjectWebsiteLink(card)`, `getProjectHighlights(card)`, etc. — helpers que reciben `card: Locator`

### Code & AI - Artículos
**Ubicación**: [`components/code-ai/`](components/code-ai/POM.md)

Sección Code & AI (`/code-ai`). Cubre listado de artículos. Las páginas de detalle de artículo se testean directamente con `page.goto()`.

**Funciones principales**:
- `codeAiLocators(page)` — retorna locators: heading, articleCards, mainContent, codeAiHeader, articlesGrid
- `navigateToCodeAi(page)` — navega a `/code-ai` y espera `domcontentloaded`
- `getArticleCount(page)` — retorna el número de tarjetas de artículo visibles

### PPiA - Playwright Page Inspector
**Ubicación**: [`components/ppia/`](components/ppia/POM.md)

Página PPiA (`/ppia`). Cubre header y wipCard. El `wipCard` tiene animaciones CSS que causan inestabilidad en visual regression: solo se captura el `ppiaHeader`.

**Funciones principales**:
- `ppiaLocators(page)` — retorna locators: heading, mainContent, ppiaPage, ppiaHeader, wipCard
- `navigateToPpia(page)` — navega a `/ppia` y espera `domcontentloaded`

---

## 📊 Estado de Documentación

**Componentes documentados: 8 / 8**
- ✅ `components/home/` - Home (página principal `/`)
- ✅ `components/header/` - Header (todas las páginas)
- ✅ `components/footer/` - Footer (todas las páginas)
- ✅ `components/cv/` - CV (página `/cv`)
- ✅ `components/contact/` - Contact (página `/contacto`)
- ✅ `components/projects/` - Projects (página `/proyectos`)
- ✅ `components/code-ai/` - Code & AI (sección `/code-ai`)
- ✅ `components/ppia/` - PPiA (página `/ppia`)

---

*Última actualización: 2026-02-20*
*Documentados: 8 | Pendientes: 0*
