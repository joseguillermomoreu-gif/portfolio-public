# Tests E2E - Resultados de Ejecución

**Última ejecución:** 20 de febrero de 2026

**Leyenda de tiempos**:
- `~Xs` → Tiempo del test en la última ejecución limpia (sin retries)
- `*` → Test falla permanentemente (ambos intentos)

**Config global**: `retries: 1` · `workers: 4` (local) / `1` (CI) · `fullyParallel: true`

---

## Tests de Home

| # | Nombre del Test | Path | Tags | Mejor Tiempo | Paralelo | Dependencias | Retries |
|---|----------------|------|------|--------------|----------|--------------|---------|
| 1 | Home - Smoke > should serve homepage with correct title | playwright/tests/home/home.spec.ts | - | ~0.6s | Sí | No | 1 |
| 2 | Home - Hero Section > should display CV CTA button | playwright/tests/home/home.spec.ts | - | ~0.6s | Sí | No | 1 |
| 3 | Home - Hero Section > should display Contact CTA button | playwright/tests/home/home.spec.ts | - | ~0.6s | Sí | No | 1 |
| 4 | Home - Stats Cards > should display 4 stat cards | playwright/tests/home/home.spec.ts | - | ~0.6s | Sí | No | 1 |
| 5 | Home - Portfolio Context > should have portfolio-public repository link | playwright/tests/home/home.spec.ts | - | ~0.7s | Sí | No | 1 |
| 6 | Home - Hero Visual > Desktop | playwright/tests/home/home.spec.ts | - | ~1.5s | Sí | No | 1 |
| 7 | Home - Hero Visual > Mobile | playwright/tests/home/home.spec.ts | - | ~1.2s | Sí | No | 1 |
| 8 | Home - Hero Visual > Dark Mode Desktop | playwright/tests/home/home.spec.ts | - | ~2.1s | Sí | No | 1 |
| 9 | Home - Skills Visual > Desktop - Grid | playwright/tests/home/home.spec.ts | - | ~1.4s | Sí | No | 1 |
| 10 | Home - Quick Intro Visual > Desktop - Header | playwright/tests/home/home.spec.ts | - | ~1.4s | Sí | No | 1 |
| 11 | Home - Quick Intro Visual > Desktop - Stats | playwright/tests/home/home.spec.ts | - | ~1.3s | Sí | No | 1 |
| 12 | Home - Quick Intro Visual > Mobile - Header | playwright/tests/home/home.spec.ts | - | ~1.4s | Sí | No | 1 |
| 13 | Home - Quick Intro Visual > Mobile - Stats | playwright/tests/home/home.spec.ts | - | ~1.3s | Sí | No | 1 |
| 14 | Home - Context & Focus Visual > Desktop - Context | playwright/tests/home/home.spec.ts | - | ~1.2s | Sí | No | 1 |
| 15 | Home - Context & Focus Visual > Desktop - Focus | playwright/tests/home/home.spec.ts | - | ~1.2s | Sí | No | 1 |
| 16 | Home - Context & Focus Visual > Mobile - Context | playwright/tests/home/home.spec.ts | - | ~1.1s | Sí | No | 1 |
| 17 | Home - Context & Focus Visual > Mobile - Focus | playwright/tests/home/home.spec.ts | - | ~1.1s | Sí | No | 1 |

## Tests de Header - Navegación

| # | Nombre del Test | Path | Tags | Mejor Tiempo | Paralelo | Dependencias | Retries |
|---|----------------|------|------|--------------|----------|--------------|---------|
| 1 | Header - Structure > should display logo with owner name | playwright/tests/header/header.nav.spec.ts | - | ~0.8s | Sí | No | 1 |
| 2 | Header - Structure > should have 6 navigation links in correct order | playwright/tests/header/header.nav.spec.ts | - | ~0.8s | Sí | No | 1 |
| 3 | Header - Structure > should highlight the active Home link on homepage | playwright/tests/header/header.nav.spec.ts | - | ~0.7s | Sí | No | 1 |
| 4 | Header - Structure > should have accessible navigation element | playwright/tests/header/header.nav.spec.ts | - | ~1.1s | Sí | No | 1 |
| 5 | Header - Structure > should be present across all pages | playwright/tests/header/header.nav.spec.ts | - | ~1.3s | Sí | No | 1 |
| 6 | Header - Mobile Hamburger > should show hamburger and hide nav by default | playwright/tests/header/header.nav.spec.ts | - | ~0.9s | Sí | No | 1 |
| 7 | Header - Mobile Hamburger > clicking hamburger should open mobile menu | playwright/tests/header/header.nav.spec.ts | - | ~1.2s | Sí | No | 1 |
| 8 | Header - Mobile Hamburger > clicking overlay should close mobile menu | playwright/tests/header/header.nav.spec.ts | - | ~1.3s | Sí | No | 1 |
| 9 | Header - Mobile Hamburger > pressing ESC should close mobile menu | playwright/tests/header/header.nav.spec.ts | - | ~1.3s | Sí | No | 1 |
| 10 | Header - Mobile Hamburger > hamburger should have proper ARIA attributes | playwright/tests/header/header.nav.spec.ts | - | ~0.9s | Sí | No | 1 |

## Tests de Header - Dark Mode

| # | Nombre del Test | Path | Tags | Mejor Tiempo | Paralelo | Dependencias | Retries |
|---|----------------|------|------|--------------|----------|--------------|---------|
| 1 | Header - Dark Mode Mobile (forced < 850px) > should hide theme toggle on mobile | playwright/tests/header/header.dark-mode.spec.ts | - | ~1.2s | Sí | No | 1 |
| 2 | Header - Dark Mode Mobile (forced < 850px) > should force dark mode on mobile | playwright/tests/header/header.dark-mode.spec.ts | - | ~1.1s | Sí | No | 1 |
| 3 | Header - Dark Mode Mobile (forced < 850px) > should maintain dark mode on reload | playwright/tests/header/header.dark-mode.spec.ts | - | ~1.3s | Sí | No | 1 |
| 4 | Header - Dark Mode Mobile (forced < 850px) > should ignore localStorage light theme on mobile | playwright/tests/header/header.dark-mode.spec.ts | - | ~1.3s | Sí | No | 1 |
| 5 | Header - Dark Mode Tablet Breakpoint > should force dark mode on tablets < 850px | playwright/tests/header/header.dark-mode.spec.ts | - | ~0.6s | Sí | No | 1 |
| 6 | Header - Dark Mode Tablet Breakpoint > should allow theme toggle on tablets >= 850px | playwright/tests/header/header.dark-mode.spec.ts | - | ~1.1s | Sí | No | 1 |
| 7 | Header - Dark Mode Desktop > should start with light theme by default on desktop | playwright/tests/header/header.dark-mode.spec.ts | - | ~0.9s | Sí | No | 1 |
| 8 | Header - Dark Mode Desktop > should display theme toggle with aria-label on desktop | playwright/tests/header/header.dark-mode.spec.ts | - | ~1.0s | Sí | No | 1 |

## Tests de Header - Visual

| # | Nombre del Test | Path | Tags | Mejor Tiempo | Paralelo | Dependencias | Retries |
|---|----------------|------|------|--------------|----------|--------------|---------|
| 1 | Header - Visual > Desktop - Top (not scrolled) | playwright/tests/header/header.visual.spec.ts | - | ~1.3s | Sí | No | 1 |
| 2 | Header - Visual > Desktop - Scrolled | playwright/tests/header/header.visual.spec.ts | - | ~1.6s | Sí | No | 1 |
| 3 | Header - Visual > Mobile - Nav Closed | playwright/tests/header/header.visual.spec.ts | - | ~1.2s | Sí | No | 1 |
| 4 | Header - Visual > Mobile - Nav Open | playwright/tests/header/header.visual.spec.ts | - | ~1.6s | Sí | No | 1 |

## Tests de Footer

| # | Nombre del Test | Path | Tags | Mejor Tiempo | Paralelo | Dependencias | Retries |
|---|----------------|------|------|--------------|----------|--------------|---------|
| 1 | Footer - Structure > should display social links with security attributes | playwright/tests/footer/footer.spec.ts | - | ~0.7s | Sí | No | 1 |
| 2 | Footer - Structure > should have GitHub profile link | playwright/tests/footer/footer.spec.ts | - | ~0.7s | Sí | No | 1 |
| 3 | Footer - Dynamic Content > should display the current year | playwright/tests/footer/footer.spec.ts | - | ~0.7s | Sí | No | 1 |
| 4 | Footer - Dynamic Content > should display version with semver format | playwright/tests/footer/footer.spec.ts | - | ~0.6s | Sí | No | 1 |
| 5 | Footer - Visual > Desktop | playwright/tests/footer/footer.spec.ts | - | ~1.4s | Sí | No | 1 |
| 6 | Footer - Visual > Mobile | playwright/tests/footer/footer.spec.ts | - | ~1.2s | Sí | No | 1 |

## Tests de CV

| # | Nombre del Test | Path | Tags | Mejor Tiempo | Paralelo | Dependencias | Retries |
|---|----------------|------|------|--------------|----------|--------------|---------|
| 1 | CV - Smoke & Content > should load CV page with correct title | playwright/tests/cv/cv.spec.ts | - | ~0.7s | Sí | No | 1 |
| 2 | CV - Smoke & Content > should display PDF download link | playwright/tests/cv/cv.spec.ts | - | ~0.6s | Sí | No | 1 |
| 3 | CV - Visual > Desktop > Header | playwright/tests/cv/cv.spec.ts | - | ~1.5s | Sí | No | 1 |
| 4 | CV - Visual > Desktop > PDF Download Card | playwright/tests/cv/cv.spec.ts | - | ~1.8s | Sí | No | 1 |
| 5 | CV - Visual > Desktop > Tech Info | playwright/tests/cv/cv.spec.ts | - | ~1.8s | Sí | No | 1 |
| 6 | CV - Visual > Desktop > Note | playwright/tests/cv/cv.spec.ts | - | ~1.7s | Sí | No | 1 |
| 7 | CV - Visual > Mobile > Header | playwright/tests/cv/cv.spec.ts | - | ~1.3s | Sí | No | 1 |
| 8 | CV - Visual > Mobile > PDF Download Card | playwright/tests/cv/cv.spec.ts | - | ~1.2s | Sí | No | 1 |
| 9 | CV - Visual > Mobile > Tech Info | playwright/tests/cv/cv.spec.ts | - | ~1.2s | Sí | No | 1 |
| 10 | CV - Visual > Mobile > Note | playwright/tests/cv/cv.spec.ts | - | ~1.1s | Sí | No | 1 |

## Tests de Contacto

| # | Nombre del Test | Path | Tags | Mejor Tiempo | Paralelo | Dependencias | Retries |
|---|----------------|------|------|--------------|----------|--------------|---------|
| 1 | Contact - Content & Links > should load contact page with correct title | playwright/tests/contact/contact.spec.ts | - | ~0.7s | Sí | No | 1 |
| 2 | Contact - Content & Links > should display email link pointing to correct address | playwright/tests/contact/contact.spec.ts | - | ~0.7s | Sí | No | 1 |
| 3 | Contact - Content & Links > should display GitHub link pointing to user profile | playwright/tests/contact/contact.spec.ts | - | ~0.7s | Sí | No | 1 |
| 4 | Contact - Content & Links > external links should have security attributes | playwright/tests/contact/contact.spec.ts | - | ~0.5s | Sí | No | 1 |
| 5 | Contact - Visual > Desktop > Header | playwright/tests/contact/contact.spec.ts | - | ~1.1s | Sí | No | 1 |
| 6 | Contact - Visual > Desktop > Contact Card | playwright/tests/contact/contact.spec.ts | - | ~1.2s | Sí | No | 1 |
| 7 | Contact - Visual > Desktop > Social Section | playwright/tests/contact/contact.spec.ts | - | ~1.1s | Sí | No | 1 |
| 8 | Contact - Visual > Mobile > Header | playwright/tests/contact/contact.spec.ts | - | ~1.1s | Sí | No | 1 |
| 9 | Contact - Visual > Mobile > Contact Card | playwright/tests/contact/contact.spec.ts | - | ~1.1s | Sí | No | 1 |
| 10 | Contact - Visual > Mobile > Social Section | playwright/tests/contact/contact.spec.ts | - | ~1.1s | Sí | No | 1 |

## Tests de Proyectos

| # | Nombre del Test | Path | Tags | Mejor Tiempo | Paralelo | Dependencias | Retries |
|---|----------------|------|------|--------------|----------|--------------|---------|
| 1 | Projects - Content > should display 5 project cards | playwright/tests/projects/projects.spec.ts | - | ~0.5s | Sí | No | 1 |
| 2 | Projects - Content > should display POM-PPIA project with correct GitHub link | playwright/tests/projects/projects.spec.ts | - | ~0.6s | Sí | No | 1 |
| 3 | Projects - Content > should display Portfolio project with website link | playwright/tests/projects/projects.spec.ts | - | ~0.6s | Sí | No | 1 |
| 4 | Projects - Content > should display PPIA as Private without GitHub link | playwright/tests/projects/projects.spec.ts | - | ~0.6s | Sí | No | 1 |
| 5 | Projects - Visual > Desktop > Header | playwright/tests/projects/projects.spec.ts | - | ~1.2s | Sí | No | 1 |
| 6 | Projects - Visual > Desktop > Grid | playwright/tests/projects/projects.spec.ts | - | ~1.4s | Sí | No | 1 |
| 7 | Projects - Visual > Desktop > Footer | playwright/tests/projects/projects.spec.ts | - | ~1.2s | Sí | No | 1 |
| 8 | Projects - Visual > Mobile > Header | playwright/tests/projects/projects.spec.ts | - | ~1.1s | Sí | No | 1 |
| 9 | Projects - Visual > Mobile > Grid | playwright/tests/projects/projects.spec.ts | - | ~1.3s | Sí | No | 1 |
| 10 | Projects - Visual > Mobile > Footer | playwright/tests/projects/projects.spec.ts | - | ~1.1s | Sí | No | 1 |

## Tests de Code & AI

| # | Nombre del Test | Path | Tags | Mejor Tiempo | Paralelo | Dependencias | Retries |
|---|----------------|------|------|--------------|----------|--------------|---------|
| 1 | Code & AI - Article List > should load with correct title | playwright/tests/code-ai/code-ai.spec.ts | - | ~0.8s | Sí | No | 1 |
| 2 | Code & AI - Article List > should display at least one article card | playwright/tests/code-ai/code-ai.spec.ts | - | ~0.8s | Sí | No | 1 |
| 3 | Code & AI - Article List > should have links to article detail pages | playwright/tests/code-ai/code-ai.spec.ts | - | ~0.8s | Sí | No | 1 |
| 4 | Code & AI - Navigation > should navigate from list to article detail | playwright/tests/code-ai/code-ai.spec.ts | - | ~0.9s | Sí | No | 1 |
| 5 | Code & AI - 404 Error Handling > should return 404 for non-existent article | playwright/tests/code-ai/code-ai.spec.ts | - | ~0.2s | Sí | No | 1 |
| 6 | Code & AI - Article Detail > should load portfolio article with correct title | playwright/tests/code-ai/code-ai.spec.ts | - | ~0.8s | Sí | No | 1 |
| 7 | Code & AI - Article Detail > should display published/updated dates on detail page | playwright/tests/code-ai/code-ai.spec.ts | - | ~0.8s | Sí | No | 1 |
| 8 | Code & AI - Article Detail > should have paragraph structure in article content | playwright/tests/code-ai/code-ai.spec.ts | - | ~0.8s | Sí | No | 1 |
| 9 | Code & AI - Article Detail > should load automatizando-e2e-con-ia article | playwright/tests/code-ai/code-ai.spec.ts | - | ~0.9s | Sí | No | 1 |
| 10 | Code & AI - Visual > Desktop > Header | playwright/tests/code-ai/code-ai.spec.ts | - | ~1.5s | Sí | No | 1 |
| 11 | Code & AI - Visual > Desktop > Articles Grid | playwright/tests/code-ai/code-ai.spec.ts | - | ~1.8s | Sí | No | 1 |
| 12 | Code & AI - Visual > Mobile > Header | playwright/tests/code-ai/code-ai.spec.ts | - | ~1.3s | Sí | No | 1 |
| 13 | Code & AI - Visual > Mobile > Articles Grid | playwright/tests/code-ai/code-ai.spec.ts | - | ~1.3s | Sí | No | 1 |

## Tests de PPiA

| # | Nombre del Test | Path | Tags | Mejor Tiempo | Paralelo | Dependencias | Retries |
|---|----------------|------|------|--------------|----------|--------------|---------|
| 1 | PPiA - Smoke > should load PPiA page with correct title | playwright/tests/ppia/ppia.spec.ts | - | ~0.5s | Sí | No | 1 |
| 2 | PPiA - Visual > Desktop - Header | playwright/tests/ppia/ppia.spec.ts | - | ~1.1s | Sí | No | 1 |
| 3 | PPiA - Visual > Mobile - Header | playwright/tests/ppia/ppia.spec.ts | - | ~1.1s | Sí | No | 1 |

---

## 📊 Resumen

| Spec | Funcionales | Visuales | Total | Tiempo total estimado |
|------|-------------|----------|-------|-----------------------|
| `home/home.spec.ts` | 5 | 12 | 17 | ~19s |
| `header/header.nav.spec.ts` | 10 | 0 | 10 | ~10s |
| `header/header.dark-mode.spec.ts` | 8 | 0 | 8 | ~9s |
| `header/header.visual.spec.ts` | 0 | 4 | 4 | ~6s |
| `footer/footer.spec.ts` | 4 | 2 | 6 | ~5s |
| `cv/cv.spec.ts` | 2 | 8 | 10 | ~13s |
| `contact/contact.spec.ts` | 4 | 6 | 10 | ~10s |
| `projects/projects.spec.ts` | 4 | 6 | 10 | ~10s |
| `code-ai/code-ai.spec.ts` | 9 | 4 | 13 | ~12s |
| `ppia/ppia.spec.ts` | 1 | 2 | 3 | ~3s |
| **TOTAL** | **47** | **44** | **91** | **~26s (4 workers)** |

---

**Última actualización:** 20 de febrero de 2026
**Ejecución:** 91 passed · 0 failed · 28.0s (4 workers en paralelo)
