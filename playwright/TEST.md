# TEST.md — E2E Test Suite

> Última actualización: 2026-02-25

**Total tests: 77** | Proyectos: desktop · mobile · tablet-small · tablet-large

---

## Home

| # | Test Title | Path | Tags | Time | Gherkin |
|---|---|---|---|---|---|
| 1 | home: la página principal tiene el título correcto | `playwright/tests/home/home.desktop.spec.ts` | `@test` `@home` | 1.2s | When: el usuario navega a la página principal<br>Then: el título contiene el nombre del propietario<br>Then: la sección de foco actual coincide con el snapshot visual |
| 2 | home hero: aparecenlos botones de CV y de Contacto | `playwright/tests/home/home.desktop.spec.ts` | `@test` `@home` `@styles` | 1.2s | When: el usuario navega a la página principal<br>Then: el botón CTA de CV es visible<br>Then: el botón CTA de Contacto es visible<br>Then: el hero coincide con el snapshot visual |
| 3 | home visual quick intro: header | `playwright/tests/home/home.desktop.spec.ts` | `@test` `@home` `@styles` | 1.0s | When: el usuario navega a la página principal<br>Then: el header de quick intro coincide con el snapshot visual |
| 4 | home stats: se muestran 4 stat cards | `playwright/tests/home/home.desktop.spec.ts` | `@test` `@home` `@styles` | 1.0s | When: el usuario navega a la página principal<br>Then: se renderizan 4 stat cards<br>Then: las stats de quick intro coinciden con el snapshot visual |
| 5 | home contexto: existe el enlace al repositorio público del portfolio | `playwright/tests/home/home.desktop.spec.ts` | `@test` `@home` | 959ms | When: el usuario navega a la página principal<br>Then: el enlace al repositorio público es visible con href y target correctos |
| 6 | home contexto: el enlace a Akkodis y de El confidencial son validoses válido | `playwright/tests/home/home.desktop.spec.ts` | `@test` `@home` `@styles` | 806ms | When: el usuario navega a la página principal<br>Then: el enlace a Akkodis es visible con href y target correctos<br>Then: el enlace a El Confidencial es visible con href y target correctos<br>Then: la sección de contexto coincide con el snapshot visual |
| 7 | home visual hero: modo oscuro | `playwright/tests/home/home.desktop.spec.ts` | `@test` `@home` `@styles` `@dark_mode` | 1.7s | When: el usuario navega a la página principal y activa el modo oscuro<br>Then: el tema activo es oscuro<br>Then: el hero coincide con el snapshot en modo oscuro |
| 8 | home visual skills: grid | `playwright/tests/home/home.skills.desktop.spec.ts` | `@test` `@home` `@skills` `@styles` | 1.0s | When: el usuario navega a la página principal<br>When: oculta el header<br>Then: el grid de skills coincide con el snapshot visual |
| 9 | home visual skills: esquina superior izquierda expandida | `playwright/tests/home/home.skills.desktop.spec.ts` | `@test` `@home` `@skills` `@styles` | 1.9s | Given: el usuario navega a la página principal<br>When: oculta el header y expande la skill de la esquina superior izquierda (pos 1)<br>Then: el grid coincide con el snapshot visual |
| 10 | home visual skills: esquina superior derecha expandida | `playwright/tests/home/home.skills.desktop.spec.ts` | `@test` `@home` `@skills` `@styles` | 1.7s | Given: el usuario navega a la página principal<br>When: oculta el header y expande la skill de la esquina superior derecha (pos 3)<br>Then: el grid coincide con el snapshot visual |
| 11 | home visual skills: esquina inferior izquierda expandida | `playwright/tests/home/home.skills.desktop.spec.ts` | `@test` `@home` `@skills` `@styles` | 1.6s | Given: el usuario navega a la página principal<br>When: oculta el header y expande la skill de la esquina inferior izquierda (pos 7)<br>Then: el grid coincide con el snapshot visual |
| 12 | home visual skills: esquina inferior derecha expandida | `playwright/tests/home/home.skills.desktop.spec.ts` | `@test` `@home` `@skills` `@styles` | 2.3s | Given: el usuario navega a la página principal<br>When: oculta el header y expande la skill de la esquina inferior derecha (pos 9)<br>Then: el grid coincide con el snapshot visual |
| 13 | home visual hero | `playwright/tests/home/home.mobile.spec.ts` | `@test` `@home` `@styles` | 1.2s | When: el usuario navega a la página principal<br>Then: el hero coincide con el snapshot visual |
| 14 | home visual quick intro: header | `playwright/tests/home/home.mobile.spec.ts` | `@test` `@home` `@styles` | 1.1s | When: el usuario navega a la página principal<br>Then: el header de quick intro coincide con el snapshot visual |
| 15 | home visual quick intro: stats | `playwright/tests/home/home.mobile.spec.ts` | `@test` `@home` `@styles` | 1.0s | When: el usuario navega a la página principal<br>Then: las stats de quick intro coinciden con el snapshot visual |
| 16 | home visual contexto | `playwright/tests/home/home.mobile.spec.ts` | `@test` `@home` `@styles` | 898ms | When: el usuario navega a la página principal<br>Then: la sección de contexto coincide con el snapshot visual |
| 17 | home visual foco | `playwright/tests/home/home.mobile.spec.ts` | `@test` `@home` `@styles` | 682ms | When: el usuario navega a la página principal<br>Then: la sección de foco actual coincide con el snapshot visual |
| 18 | home visual skills: grid | `playwright/tests/home/home.skills.mobile.spec.ts` | `@test` `@home` `@skills` `@styles` | 629ms | When: el usuario navega a la página principal<br>When: oculta el header<br>Then: el grid de skills (6 items) coincide con el snapshot visual |
| 19 | home visual skills: esquina superior izquierda expandida | `playwright/tests/home/home.skills.mobile.spec.ts` | `@test` `@home` `@skills` `@styles` | 1.5s | Given: el usuario navega a la página principal<br>When: oculta el header y expande la skill de la esquina superior izquierda (pos 1)<br>Then: el grid coincide con el snapshot visual |
| 20 | home visual skills: esquina superior derecha expandida | `playwright/tests/home/home.skills.mobile.spec.ts` | `@test` `@home` `@skills` `@styles` | 1.5s | Given: el usuario navega a la página principal<br>When: oculta el header y expande la skill de la esquina superior derecha (pos 2)<br>Then: el grid coincide con el snapshot visual |
| 21 | home visual skills: esquina inferior izquierda expandida | `playwright/tests/home/home.skills.mobile.spec.ts` | `@test` `@home` `@skills` `@styles` | 1.5s | Given: el usuario navega a la página principal<br>When: oculta el header y expande la skill de la esquina inferior izquierda (pos 5)<br>Then: el grid coincide con el snapshot visual |
| 22 | home visual skills: esquina inferior derecha expandida | `playwright/tests/home/home.skills.mobile.spec.ts` | `@test` `@home` `@skills` `@styles` | 1.6s | Given: el usuario navega a la página principal<br>When: oculta el header y expande la skill de la esquina inferior derecha (pos 6)<br>Then: el grid coincide con el snapshot visual |

## Header

| # | Test Title | Path | Tags | Time | Gherkin |
|---|---|---|---|---|---|
| 23 | header nav: se renderiza con logo, 7 enlaces y aria-label correctos | `playwright/tests/header/header.desktop.spec.ts` | `@test` `@header` | 1.4s | When: el usuario navega a la página principal<br>Then: el logo es visible y muestra el nombre del propietario<br>Then: hay 7 enlaces de navegación en el orden esperado<br>Then: el enlace activo es "Home" y la nav tiene aria-label |
| 24 | header nav: el header está presente en todas las páginas | `playwright/tests/header/header.desktop.spec.ts` | `@test` `@header` | 1.7s | When: el usuario navega a /<br>Then: el header y el logo son visibles en /<br>When: el usuario navega a /cv<br>Then: el header y el logo son visibles en /cv<br>When: el usuario navega a /portfolio<br>Then: el header y el logo son visibles en /portfolio<br>When: el usuario navega a /contacto<br>Then: el header y el logo son visibles en /contacto<br>When: el usuario navega a /proyectos<br>Then: el header y el logo son visibles en /proyectos<br>When: el usuario navega a /code-ai<br>Then: el header y el logo son visibles en /code-ai<br>When: el usuario navega a /ppia<br>Then: el header y el logo son visibles en /ppia |
| 25 | header visual: aspecto en desktop (sin scroll y con scroll) | `playwright/tests/header/header.desktop.spec.ts` | `@test` `@header` `@styles` | 1.7s | Given: el usuario navega a la página principal<br>Given: el header sin scroll coincide con el snapshot<br>When: el usuario hace scroll hacia abajo<br>Then: el header con scroll coincide con el snapshot |
| 26 | header dark mode: en desktop el tema es light por defecto y el toggle es visible | `playwright/tests/header/header.desktop.spec.ts` | `@test` `@header` `@dark_mode` | 1.2s | When: el usuario navega a la página principal con localStorage limpio<br>Then: el tema por defecto es light y el toggle es visible con aria-label |
| 27 | header nav mobile: estado inicial — hamburger visible, cerrado y con ARIA correctos | `playwright/tests/header/header.mobile.spec.ts` | `@test` `@header` | 661ms | When: el usuario navega a la página principal<br>Then: el hamburger es visible y el menú está cerrado<br>Then: el hamburger tiene aria-label y aria-expanded es false |
| 28 | header nav mobile: abrir menú — aria-expanded y estado activo | `playwright/tests/header/header.mobile.spec.ts` | `@test` `@header` | 689ms | Given: el usuario navega a la página principal<br>When: el usuario hace click en el hamburger<br>Then: aria-expanded cambia a true y el menú está activo |
| 29 | header nav mobile: click en el overlay cierra el menú | `playwright/tests/header/header.mobile.spec.ts` | `@test` `@header` | 700ms | Given: el usuario navega y el menú está abierto<br>When: el usuario hace click en el overlay<br>Then: el menú está cerrado |
| 30 | header nav mobile: tecla Escape cierra el menú | `playwright/tests/header/header.mobile.spec.ts` | `@test` `@header` | 690ms | Given: el usuario navega y el menú está abierto<br>When: el usuario pulsa Escape<br>Then: el menú está cerrado |
| 31 | header visual: aspecto en mobile (menú cerrado y abierto) | `playwright/tests/header/header.mobile.spec.ts` | `@test` `@header` `@styles` | 727ms | Given: el usuario navega a la página principal<br>Given: el header con menú cerrado coincide con el snapshot<br>When: el usuario abre el menú de navegación<br>Then: la página completa con menú abierto coincide con el snapshot |
| 32 | header dark mode: dark mode se fuerza en mobile (375×667) | `playwright/tests/header/header.mobile.spec.ts` | `@test` `@header` `@dark_mode` | 780ms | When: el usuario navega a la página principal con localStorage limpio<br>Then: el tema es dark y el toggle está oculto |
| 33 | header dark mode: dark mode persiste en mobile tras recargar | `playwright/tests/header/header.mobile.spec.ts` | `@test` `@header` `@dark_mode` | 820ms | Given: localStorage limpio<br>When: el usuario recarga la página<br>Then: el tema sigue siendo dark |
| 34 | header dark mode: dark mode ignora localStorage light en mobile | `playwright/tests/header/header.mobile.spec.ts` | `@test` `@header` `@dark_mode` | 994ms | Given: localStorage tiene theme=light<br>When: el usuario recarga la página<br>Then: dark mode sigue forzado |
| 35 | header dark mode: dark mode se fuerza en tablets < 850px (844×390) | `playwright/tests/header/header.dark-mode.tablet-small.spec.ts` | `@test` `@header` `@dark_mode` | 821ms | When: el usuario navega a la página principal con localStorage limpio<br>Then: el tema es dark y el toggle está oculto |
| 36 | header dark mode: dark mode persiste tras recargar | `playwright/tests/header/header.dark-mode.tablet-small.spec.ts` | `@test` `@header` `@dark_mode` | 1.1s | Given: localStorage limpio<br>When: el usuario recarga la página<br>Then: el tema sigue siendo dark |
| 37 | header dark mode: dark mode ignora localStorage light | `playwright/tests/header/header.dark-mode.tablet-small.spec.ts` | `@test` `@header` `@dark_mode` | 1.1s | Given: localStorage tiene theme=light<br>When: el usuario recarga la página<br>Then: dark mode sigue forzado |
| 38 | header dark mode: en tablets >= 850px el toggle funciona (1024×768) | `playwright/tests/header/header.dark-mode.tablet-large.spec.ts` | `@test` `@header` `@dark_mode` | 1.5s | Given: el usuario navega con localStorage limpio<br>Given: el tema por defecto es light y el toggle es visible<br>When: el usuario hace click en el toggle de tema<br>Then: el tema cambia a dark |

## Footer

| # | Test Title | Path | Tags | Time | Gherkin |
|---|---|---|---|---|---|
| 39 | footer: contenido, enlaces y metadatos son correctos | `playwright/tests/footer/footer.desktop.spec.ts` | `@test` `@footer` | 1.4s | When: el usuario navega a la página principal<br>Then: los enlaces sociales tienen target="_blank" y rel="noopener"<br>Then: el enlace al perfil de GitHub es visible y se abre en nueva pestaña<br>Then: el footer muestra el año actual y la versión en formato semver |
| 40 | footer visual: footer en desktop | `playwright/tests/footer/footer.desktop.spec.ts` | `@test` `@footer` `@styles` | 1.5s | Given: el usuario navega a la página principal<br>When: el usuario hace scroll al footer<br>Then: el footer coincide con el snapshot |
| 41 | footer visual: footer en mobile | `playwright/tests/footer/footer.mobile.spec.ts` | `@test` `@footer` `@styles` | 782ms | Given: el usuario navega a la página principal<br>When: el usuario hace scroll al footer<br>Then: el footer coincide con el snapshot |

## Contact

| # | Test Title | Path | Tags | Time | Gherkin |
|---|---|---|---|---|---|
| 42 | Contacto: título, enlaces y seguridad son correctos | `playwright/tests/contact/contact.desktop.spec.ts` | `@test` `@contact` | 1.2s | When: el usuario navega a la página de contacto<br>Then: el título de la página contiene Contacto y el nombre del autor<br>Then: el enlace de email y el de GitHub son válidos<br>Then: todos los enlaces externos tienen rel="noopener" |
| 43 | Contacto visual: cabecera, tarjeta y redes en desktop | `playwright/tests/contact/contact.desktop.spec.ts` | `@test` `@contact` `@styles` | 1.4s | When: el usuario navega a la página de contacto<br>Then: la cabecera coincide con el snapshot<br>Then: la tarjeta de contacto coincide con el snapshot<br>Then: la sección de redes sociales coincide con el snapshot |
| 44 | Contacto visual: cabecera, tarjeta y redes en mobile | `playwright/tests/contact/contact.mobile.spec.ts` | `@test` `@contact` `@styles` | 803ms | When: el usuario navega a la página de contacto<br>Then: la cabecera coincide con el snapshot<br>Then: la tarjeta de contacto coincide con el snapshot<br>Then: la sección de redes sociales coincide con el snapshot |

## CV

| # | Test Title | Path | Tags | Time | Gherkin |
|---|---|---|---|---|---|
| 45 | CV: título, botones Ver HTML y Descargar PDF son correctos | `playwright/tests/cv/cv.desktop.spec.ts` | `@test` `@cv` | 1.2s | When: el usuario navega a la página CV<br>Then: el título contiene CV y el nombre del autor<br>Then: el botón Ver HTML es visible<br>Then: el enlace Descargar PDF es visible con href y atributo download correctos<br>Then: el carrusel de skills tiene el título Stack Técnico |
| 46 | CV HTML: la página carga y muestra el contenido del CV | `playwright/tests/cv/cv.desktop.spec.ts` | `@test` `@cv` | 677ms | When: el usuario navega a /cv.html<br>Then: el título contiene CV y el nombre del autor<br>Then: el contenido del CV es visible |
| 47 | CV PDF: el endpoint /cv/pdf devuelve un PDF válido | `playwright/tests/cv/cv.desktop.spec.ts` | `@test` `@cv` | 1.4s | Then: GET /cv/pdf devuelve HTTP 200 y Content-Type application/pdf |
| 48 | CV visual: cabecera, tarjeta PDF y stack técnico en desktop | `playwright/tests/cv/cv.desktop.spec.ts` | `@test` `@cv` `@styles` | 4.0s | When: el usuario navega a la página CV<br>Then: la cabecera coincide con el snapshot<br>Then: la tarjeta de descarga PDF coincide con el snapshot<br>Then: la información técnica coincide con el snapshot |
| 49 | CV HTML visual: el CV en HTML coincide con el snapshot en desktop | `playwright/tests/cv/cv.desktop.spec.ts` | `@test` `@cv` `@styles` | 2.0s | When: el usuario navega a /cv.html<br>Then: el CV en HTML coincide con el snapshot |
| 50 | CV mobile: botones y carrusel de skills son visibles | `playwright/tests/cv/cv.mobile.spec.ts` | `@test` `@cv` | 1.0s | When: el usuario navega a la página CV<br>Then: el botón Ver HTML es visible<br>Then: el enlace Descargar PDF es visible<br>Then: el carrusel de skills tiene el título Stack Técnico |
| 51 | CV visual: cabecera, tarjeta PDF y técnica en mobile | `playwright/tests/cv/cv.mobile.spec.ts` | `@test` `@cv` `@styles` | 3.3s | When: el usuario navega a la página CV<br>Then: la cabecera coincide con el snapshot<br>Then: la tarjeta de descarga PDF coincide con el snapshot<br>Then: la información técnica coincide con el snapshot |

## Code & AI

| # | Test Title | Path | Tags | Time | Gherkin |
|---|---|---|---|---|---|
| 52 | Code & AI: título, artículos y enlace al portfolio son correctos | `playwright/tests/code-ai/code-ai.desktop.spec.ts` | `@test` `@code_ai` | 1.1s | When: el usuario navega a la página Code & AI<br>Then: el título de la página contiene Code & AI y el nombre del autor<br>Then: se renderiza al menos una tarjeta y el enlace al portfolio es visible |
| 53 | Code & AI: navega de la lista al detalle de artículo | `playwright/tests/code-ai/code-ai.desktop.spec.ts` | `@test` `@code_ai` | 1.0s | Given: estoy en la página de listado de Code & AI<br>When: hago click en el enlace al artículo portfolio<br>Then: llego a la página de detalle con el título correcto |
| 54 | Code & AI detalle: título, fechas y párrafos del artículo portfolio | `playwright/tests/code-ai/code-ai.desktop.spec.ts` | `@test` `@code_ai` | 1.1s | When: el usuario navega al detalle del artículo del portfolio<br>Then: el título de la página coincide con el artículo<br>Then: el artículo muestra fecha y contiene párrafos |
| 55 | Code & AI detalle: carga el artículo automatizando-e2e-con-ia | `playwright/tests/code-ai/code-ai.desktop.spec.ts` | `@test` `@code_ai` | 1.0s | When: el usuario navega al artículo de PPiA<br>Then: el título de la página coincide con el artículo de PPiA |
| 56 | Code & AI: devuelve 404 para un artículo inexistente | `playwright/tests/code-ai/code-ai.desktop.spec.ts` | `@test` `@code_ai` | 276ms | When: el usuario navega a un artículo inexistente |
| 57 | Code & AI visual: cabecera y grid en desktop | `playwright/tests/code-ai/code-ai.desktop.spec.ts` | `@test` `@code_ai` `@styles` | 1.7s | When: el usuario navega a la página Code & AI<br>Then: la cabecera coincide con el snapshot<br>Then: el grid de artículos coincide con el snapshot |
| 58 | Code & AI visual: cabecera y grid en mobile | `playwright/tests/code-ai/code-ai.mobile.spec.ts` | `@test` `@code_ai` `@styles` | 1.0s | When: el usuario navega a la página Code & AI<br>Then: la cabecera coincide con el snapshot<br>Then: el grid de artículos coincide con el snapshot |

## PPiA

| # | Test Title | Path | Tags | Time | Gherkin |
|---|---|---|---|---|---|
| 59 | PPiA: título correcto y cabecera coincide con snapshot | `playwright/tests/ppia/ppia.desktop.spec.ts` | `@test` `@ppia` `@styles` | 904ms | When: el usuario navega a la página PPiA<br>Then: el título de la página contiene PPiA<br>Then: la cabecera coincide con el snapshot |
| 60 | PPiA visual: cabecera en mobile | `playwright/tests/ppia/ppia.mobile.spec.ts` | `@test` `@ppia` `@styles` | 644ms | When: el usuario navega a la página PPiA<br>Then: la cabecera coincide con el snapshot |

## Proyectos

| # | Test Title | Path | Tags | Time | Gherkin |
|---|---|---|---|---|---|
| 61 | Proyectos: conteo, enlaces y visibilidad de tarjetas son correctos | `playwright/tests/projects/projects.desktop.spec.ts` | `@test` `@projects` | 765ms | When: el usuario navega a la página de proyectos<br>Then: se renderizan exactamente 6 tarjetas de proyecto<br>Then: POM-PPIA tiene enlace a GitHub y Portfolio tiene enlace a producción<br>Then: la tarjeta PPIA es privada y no tiene enlace de GitHub |
| 62 | Proyectos visual: cabecera, grid y footer en desktop | `playwright/tests/projects/projects.desktop.spec.ts` | `@test` `@projects` `@styles` | 1.2s | When: el usuario navega a la página de proyectos<br>Then: la cabecera coincide con el snapshot<br>Then: el grid coincide con el snapshot<br>Then: el footer coincide con el snapshot |
| 63 | Proyectos visual: cabecera, grid y footer en mobile | `playwright/tests/projects/projects.mobile.spec.ts` | `@test` `@projects` `@styles` | 980ms | When: el usuario navega a la página de proyectos<br>Then: la cabecera coincide con el snapshot<br>Then: el grid coincide con el snapshot<br>Then: el footer coincide con el snapshot |

## Portfolio

| # | Test Title | Path | Tags | Time | Gherkin |
|---|---|---|---|---|---|
| 64 | Portfolio: título, categorías y keywords son correctos | `playwright/tests/portfolio/portfolio.desktop.spec.ts` | `@test` `@portfolio` | 1.1s | When: el usuario navega a la página de portfolio<br>Then: el título contiene Portfolio y el nombre del autor<br>Then: se renderizan 4 categorías y 16 keywords<br>Then: arquitectura y testing tienen 4 keywords y sus etiquetas son visibles |
| 65 | Portfolio: al hacer click en DDD se abre el modal con título y cuerpo | `playwright/tests/portfolio/portfolio.desktop.spec.ts` | `@test` `@portfolio` | 1.1s | Given: el usuario navega a la página de portfolio<br>When: hago click en la keyword DDD<br>Then: el modal DDD es visible con título, contenido y overlay |
| 66 | Portfolio: al hacer click en cerrar se oculta el modal | `playwright/tests/portfolio/portfolio.desktop.spec.ts` | `@test` `@portfolio` | 1.2s | Given: el modal DDD está abierto<br>When: hago click en el botón de cierre<br>Then: el modal y el overlay están ocultos |
| 67 | Portfolio: al hacer click en el overlay se cierra el modal | `playwright/tests/portfolio/portfolio.desktop.spec.ts` | `@test` `@portfolio` | 659ms | Given: el modal de Playwright está abierto<br>When: hago click en el overlay<br>Then: el modal está oculto |
| 68 | Portfolio: al pulsar ESC se cierra el modal | `playwright/tests/portfolio/portfolio.desktop.spec.ts` | `@test` `@portfolio` | 703ms | Given: el modal de Docker está abierto<br>When: pulso Escape<br>Then: el modal está oculto |
| 69 | Portfolio: el modal de simpleicons muestra la imagen de marca | `playwright/tests/portfolio/portfolio.desktop.spec.ts` | `@test` `@portfolio` | 772ms | Given: el usuario navega a la página de portfolio<br>When: abro el modal de Symfony<br>Then: la cabecera del modal muestra un icono de marca |
| 70 | Portfolio: el modal de monograma muestra el elemento de monograma | `playwright/tests/portfolio/portfolio.desktop.spec.ts` | `@test` `@portfolio` | 1.0s | Given: el usuario navega a la página de portfolio<br>When: abro el modal de DDD<br>Then: la cabecera del modal muestra un monograma |
| 71 | Portfolio visual: cabecera y keywords en desktop | `playwright/tests/portfolio/portfolio.desktop.spec.ts` | `@test` `@portfolio` `@styles` | 1.1s | When: el usuario navega a la página de portfolio<br>Then: la cabecera coincide con el snapshot<br>Then: la sección de keywords coincide con el snapshot |
| 72 | Portfolio mobile: las 4 categorías están presentes | `playwright/tests/portfolio/portfolio.mobile.spec.ts` | `@test` `@portfolio` | 527ms | When: el usuario navega a la página de portfolio<br>Then: se renderizan 4 secciones de categoría |
| 73 | Portfolio mobile: el modal TDD se abre correctamente | `playwright/tests/portfolio/portfolio.mobile.spec.ts` | `@test` `@portfolio` | 774ms | Given: el usuario navega a la página de portfolio<br>When: abro el modal de TDD<br>Then: el modal TDD es visible con el título correcto |
| 74 | Portfolio mobile: el modal TDD se cierra con el botón | `playwright/tests/portfolio/portfolio.mobile.spec.ts` | `@test` `@portfolio` | 1.1s | Given: el modal TDD está abierto<br>When: cierro el modal con el botón<br>Then: el modal está oculto |
| 75 | Portfolio visual: cabecera y keywords en mobile | `playwright/tests/portfolio/portfolio.mobile.spec.ts` | `@test` `@portfolio` `@styles` | 765ms | When: el usuario navega a la página de portfolio<br>Then: la cabecera coincide con el snapshot<br>Then: la sección de keywords coincide con el snapshot |
