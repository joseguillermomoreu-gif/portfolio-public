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
│   │   ├── index.ts            → navigateHome, getStatCardsCount, expandSkillAtPosition,
│   │   │                          titleIsCorrect, cvCtaIsVisible, contactCtaIsVisible,
│   │   │                          hasFourStatCards, portfolioPublicRepoLinkIsValid,
│   │   │                          akkodisLinkIsValid, elConfidencialLinkIsValid,
│   │   │                          heroMatchesSnapshot, skillsGridMatchesSnapshot,
│   │   │                          skillsGridExpandedMatchesSnapshot, quickIntroHeaderMatchesSnapshot,
│   │   │                          quickIntroStatsMatchesSnapshot, portfolioContextMatchesSnapshot,
│   │   │                          currentFocusMatchesSnapshot
│   │   └── selectors.ts        → Selectores de la home (route, heroContent, stackVisual, akkodisLink...)
│   ├── header/                 ✅ Documentado
│   │   ├── POM.md              → Documentación completa
│   │   ├── index.ts            → toggleTheme, getCurrentTheme, openMobileMenu, closeMobileMenu,
│   │   │                          closeWithEsc, scrollToTriggerEffect, getNavLinkByHref,
│   │   │                          clearThemeFromLocalStorage, setLocalStorageThemeToLight,
│   │   │                          hideHeader, themeIsDark, themeIsLight, themeToggleIsVisible,
│   │   │                          themeToggleIsHidden, themeToggleHasAriaLabel, logoIsVisible,
│   │   │                          logoHasText, hasNavLinksCount, navLinksAreInOrder,
│   │   │                          activeNavLinkIs, navigationHasAriaLabel, headerIsPresent,
│   │   │                          mobileMenuToggleIsVisible, mobileMenuIsClosed, mobileMenuIsOpen,
│   │   │                          mobileMenuToggleAriaExpandedIs, mobileMenuToggleHasAriaLabel,
│   │   │                          headerMatchesSnapshot, headerFullPageMatchesSnapshot
│   │   └── selectors.ts        → Selectores del header (.header, .logo, .nav-links, #theme-toggle...)
│   ├── footer/                 ✅ Documentado
│   │   ├── POM.md              → Documentación completa
│   │   ├── index.ts            → scrollToFooter, socialLinksAreSecure, githubProfileLinkIsValid,
│   │   │                          yearIsCurrentYear, versionMatchesSemver, footerMatchesSnapshot
│   │   └── selectors.ts        → Selectores del footer (.site-footer, .footer-social, .footer-meta...)
│   ├── cv/                     ✅ Documentado
│   │   ├── POM.md              → Documentación completa
│   │   ├── index.ts            → navigateToCv, titleIsCorrect, pdfLinkIsVisible,
│   │   │                          skillsCarouselHasTitle, cvHeaderMatchesSnapshot,
│   │   │                          cvPdfCardMatchesSnapshot, cvTechInfoMatchesSnapshot
│   │   └── selectors.ts        → Selectores del CV (route, .cv-header, .pdf-download-card...)
│   ├── contact/                ✅ Documentado
│   │   ├── POM.md              → Documentación completa
│   │   ├── index.ts            → navigateToContact, titleIsCorrect, emailLinkIsValid,
│   │   │                          githubLinkIsValid, externalLinksAreSecure,
│   │   │                          contactHeaderMatchesSnapshot, contactCardMatchesSnapshot,
│   │   │                          socialSectionMatchesSnapshot
│   │   └── selectors.ts        → Selectores de contacto (route, .contact-card, .social-section...)
│   ├── projects/               ✅ Documentado
│   │   ├── POM.md              → Documentación completa
│   │   ├── index.ts            → navigateToProjects, hasProjectCount, projectGithubLinkIs,
│   │   │                          projectWebsiteLinkIs, ppiaProjectIsPrivate,
│   │   │                          projectsHeaderMatchesSnapshot, projectsGridMatchesSnapshot,
│   │   │                          projectsFooterMatchesSnapshot
│   │   └── selectors.ts        → Selectores de proyectos ([data-testid="project-card"], .projects-grid...)
│   ├── code-ai/                ✅ Documentado
│   │   ├── POM.md              → Documentación completa
│   │   ├── index.ts            → navigateToCodeAi, navigateToPortfolioArticle, navigateToPpiaArticle,
│   │   │                          clickPortfolioArticleLink, titleIsCorrect, hasAtLeastOneArticle,
│   │   │                          portfolioArticleLinkIsVisible, portfolioArticleIsLoaded,
│   │   │                          ppiaArticleIsLoaded, notFoundArticleReturns404,
│   │   │                          articleBodyContainsDateMetadata, articleHasParagraphs,
│   │   │                          codeAiHeaderMatchesSnapshot, articlesGridMatchesSnapshot
│   │   └── selectors.ts        → Selectores de Code & AI (route, routes de artículos, .articles-grid...)
│   ├── ppia/                   ✅ Documentado
│   │   ├── POM.md              → Documentación completa
│   │   ├── index.ts            → navigateToPpia, titleIsCorrect, ppiaHeaderMatchesSnapshot
│   │   └── selectors.ts        → Selectores de PPiA (route, .ppia-header)
│   └── portfolio/              ✅ Documentado
│       ├── POM.md              → Documentación completa
│       ├── index.ts            → navigateToPortfolio, titleIsCorrect, hasCategoryCount,
│       │                          hasKeywordCount, categoryHasKeywordCount, categoryLabelContains,
│       │                          openModal, closeModalByButton, closeModalByOverlay, closeModalByEsc,
│       │                          modalOverlayIsVisible, modalOverlayIsHidden,
│       │                          modalIsVisible, modalIsHidden, modalHasTitle, modalHasBody,
│       │                          modalBrandIconIsVisible, modalMonogramIsVisible,
│       │                          portfolioHeaderMatchesSnapshot, keywordsSectionMatchesSnapshot
│       └── selectors.ts        → Selectores de portfolio (.keyword-category, #modal-overlay, helpers dinámicos...)
└── tests/
    ├── home/           → home.desktop.spec.ts, home.mobile.spec.ts,
    │                      home.skills.desktop.spec.ts, home.skills.mobile.spec.ts
    ├── header/         → header.desktop.spec.ts, header.mobile.spec.ts,
    │                      header.dark-mode.tablet-small.spec.ts, header.dark-mode.tablet-large.spec.ts
    ├── footer/         → footer.desktop.spec.ts, footer.mobile.spec.ts
    ├── cv/             → cv.desktop.spec.ts, cv.mobile.spec.ts
    ├── contact/        → contact.desktop.spec.ts, contact.mobile.spec.ts
    ├── projects/       → projects.desktop.spec.ts, projects.mobile.spec.ts
    ├── code-ai/        → code-ai.desktop.spec.ts, code-ai.mobile.spec.ts
    ├── ppia/           → ppia.desktop.spec.ts, ppia.mobile.spec.ts
    └── portfolio/      → portfolio.desktop.spec.ts, portfolio.mobile.spec.ts
```

---

## 📚 Componentes Documentados

### Home - Página Principal
**Ubicación**: [`components/home/`](components/home/POM.md)

Página home (`/`). Cubre hero, quick intro, stats cards, portfolio context, current focus y skills section (expandable grid).

**Funciones principales**:
- `navigateHome(page)` — navega a `/`
- `expandSkillAtPosition(page, position)` — expande el skill en la posición indicada (1-based)
- `titleIsCorrect(page)`, `cvCtaIsVisible(page)`, `contactCtaIsVisible(page)`, `hasFourStatCards(page)`, `portfolioPublicRepoLinkIsValid(page)`, `akkodisLinkIsValid(page)`, `elConfidencialLinkIsValid(page)` — assertions
- `heroMatchesSnapshot`, `skillsGridMatchesSnapshot`, `skillsGridExpandedMatchesSnapshot`, `quickIntroHeaderMatchesSnapshot`, `quickIntroStatsMatchesSnapshot`, `portfolioContextMatchesSnapshot`, `currentFocusMatchesSnapshot` — visual regression

### Header - Cabecera del Sitio
**Ubicación**: [`components/header/`](components/header/POM.md)

Header presente en todas las páginas. Gestiona navegación principal, theme toggle (light/dark) y menú hamburguesa en mobile.

**Funciones principales**:
- `toggleTheme(page)`, `getCurrentTheme(page)`, `openMobileMenu(page)`, `closeMobileMenu(page)`, `closeWithEsc(page)`, `scrollToTriggerEffect(page, scrollY?)`, `getNavLinkByHref(page, href)`, `clearThemeFromLocalStorage(page)`, `setLocalStorageThemeToLight(page)` — acciones
- `hideHeader(page)` — oculta el header vía JS para screenshots sin interferencia
- Assertions de tema, nav, ARIA, menú mobile — ver POM.md completo
- `headerMatchesSnapshot(page, snapshotName)`, `headerFullPageMatchesSnapshot(page, snapshotName)` — visual regression

### Footer - Pie de Página
**Ubicación**: [`components/footer/`](components/footer/POM.md)

Footer presente en todas las páginas. Incluye enlaces a redes sociales, versión dinámica y año actual.

**Funciones principales**:
- `scrollToFooter(page)` — scroll al footer
- `socialLinksAreSecure(page)`, `githubProfileLinkIsValid(page)`, `yearIsCurrentYear(page)`, `versionMatchesSemver(page)` — assertions
- `footerMatchesSnapshot(page, snapshotName)` — visual regression con `.footer-meta` enmascarado

### CV - Currículum Vitae
**Ubicación**: [`components/cv/`](components/cv/POM.md)

Página CV (`/cv`). Cubre descarga de PDF, información técnica y carrusel de skills.

**Funciones principales**:
- `navigateToCv(page)` — navega a `/cv`
- `titleIsCorrect(page)`, `pdfLinkIsVisible(page)`, `skillsCarouselHasTitle(page)` — assertions
- `cvHeaderMatchesSnapshot`, `cvPdfCardMatchesSnapshot`, `cvTechInfoMatchesSnapshot` — visual regression

### Contact - Contacto
**Ubicación**: [`components/contact/`](components/contact/POM.md)

Página contacto (`/contacto`). Cubre email, links a GitHub, tarjeta de contacto y sección de redes sociales.

**Funciones principales**:
- `navigateToContact(page)` — navega a `/contacto`
- `titleIsCorrect(page)`, `emailLinkIsValid(page)`, `githubLinkIsValid(page)`, `externalLinksAreSecure(page)` — assertions
- `contactHeaderMatchesSnapshot`, `contactCardMatchesSnapshot`, `socialSectionMatchesSnapshot` — visual regression

### Projects - Proyectos
**Ubicación**: [`components/projects/`](components/projects/POM.md)

Página proyectos (`/proyectos`). Cubre grid de tarjetas de proyecto con assertions directas.

**Funciones principales**:
- `navigateToProjects(page)` — navega a `/proyectos`
- `hasProjectCount(page, count)`, `projectGithubLinkIs(page, name, href)`, `projectWebsiteLinkIs(page, name, href)`, `ppiaProjectIsPrivate(page)` — assertions
- `projectsHeaderMatchesSnapshot`, `projectsGridMatchesSnapshot`, `projectsFooterMatchesSnapshot` — visual regression

### Code & AI - Artículos
**Ubicación**: [`components/code-ai/`](components/code-ai/POM.md)

Sección Code & AI (`/code-ai`). Cubre el listado de artículos y la navegación a páginas de detalle.

**Funciones principales**:
- `navigateToCodeAi(page)`, `navigateToPortfolioArticle(page)`, `navigateToPpiaArticle(page)`, `clickPortfolioArticleLink(page)` — navegación
- `titleIsCorrect(page)`, `hasAtLeastOneArticle(page)`, `portfolioArticleLinkIsVisible(page)`, `portfolioArticleIsLoaded(page)`, `ppiaArticleIsLoaded(page)`, `notFoundArticleReturns404(page)`, `articleBodyContainsDateMetadata(page)`, `articleHasParagraphs(page)` — assertions
- `codeAiHeaderMatchesSnapshot`, `articlesGridMatchesSnapshot` — visual regression

### PPiA - Playwright Page Inspector
**Ubicación**: [`components/ppia/`](components/ppia/POM.md)

Página PPiA (`/ppia`). Cubre el header de la página (el resto tiene animaciones que lo excluyen de snapshots).

**Funciones principales**:
- `navigateToPpia(page)` — navega a `/ppia`
- `titleIsCorrect(page)` — assertion
- `ppiaHeaderMatchesSnapshot(page, snapshotName)` — visual regression

### Portfolio - Keywords y Modales
**Ubicación**: [`components/portfolio/`](components/portfolio/POM.md)

Página portfolio (`/portfolio`). Grid de 16 keywords en 4 categorías. Cada keyword abre un modal con descripción en markdown.

**Funciones principales**:
- `navigateToPortfolio(page)` — navega a `/portfolio`
- `openModal(page, id)`, `closeModalByButton(page)`, `closeModalByOverlay(page)`, `closeModalByEsc(page)` — interacción con modales
- `titleIsCorrect(page)`, `hasCategoryCount(page, count)`, `hasKeywordCount(page, count)`, `categoryHasKeywordCount(page, cat, count)`, `categoryLabelContains(page, cat, text)` — assertions de estructura
- `modalOverlayIsVisible/Hidden(page)`, `modalIsVisible/Hidden(page, id)`, `modalHasTitle(page, id, text)`, `modalHasBody(page, id, text)`, `modalBrandIconIsVisible(page, id, slug)`, `modalMonogramIsVisible(page, id)` — assertions de modal
- `portfolioHeaderMatchesSnapshot`, `keywordsSectionMatchesSnapshot` — visual regression

---

## 📊 Estado de Documentación

**Componentes documentados: 9 / 9**
- ✅ `components/home/` - Home (página principal `/`)
- ✅ `components/header/` - Header (todas las páginas)
- ✅ `components/footer/` - Footer (todas las páginas)
- ✅ `components/cv/` - CV (página `/cv`)
- ✅ `components/contact/` - Contact (página `/contacto`)
- ✅ `components/projects/` - Projects (página `/proyectos`)
- ✅ `components/code-ai/` - Code & AI (sección `/code-ai`)
- ✅ `components/ppia/` - PPiA (página `/ppia`)
- ✅ `components/portfolio/` - Portfolio (página `/portfolio`)

---

*Última actualización: 2026-02-23*
*Documentados: 9 | Pendientes: 0*
