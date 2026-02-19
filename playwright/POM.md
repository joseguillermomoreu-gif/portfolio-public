# Page Object Model - Components Index

Índice de componentes Page Object Model del proyecto josemoreupeso.es.

---

## 📁 Estructura de Componentes

```
playwright/
├── components/
│   ├── index.ts
│   ├── home/                   ✅ Documentado
│   │   ├── POM.md              → Locators y métodos de la página home
│   │   ├── index.ts
│   │   └── selectors.ts
│   ├── header/                 ✅ Documentado
│   │   ├── POM.md              → Locators, métodos y comportamiento responsive
│   │   ├── index.ts
│   │   └── selectors.ts
│   └── footer/                 ✅ Documentado
│       ├── POM.md              → Locators, métodos y notas visual regression
│       ├── index.ts
│       └── selectors.ts
└── pages/                      ⏳ Pendiente migración a components/
    ├── BasePage.ts              → Clase base compartida
    ├── cv/
    ├── contact/
    ├── projects/
    ├── code-ai/
    └── ppia/
```

---

## 📚 Componentes Documentados

### Home - Página Principal
**Documentación**: [`components/home/POM.md`](components/home/POM.md)

Página home (`/`). Extiende `BasePage`. Cubre hero, quick intro, stats cards, portfolio context, current focus y skills section.

### Header - Cabecera del Sitio
**Documentación**: [`components/header/POM.md`](components/header/POM.md)

Header presente en todas las páginas. Gestiona navegación, theme toggle y menú hamburguesa móvil.

### Footer - Pie de Página
**Documentación**: [`components/footer/POM.md`](components/footer/POM.md)

Footer presente en todas las páginas. Incluye RRSS, versión dinámica y año. Provee helpers para visual regression.

---

## 📊 Estado de Documentación

**Componentes documentados: 3**
- ✅ `components/home/` - Home (página principal)
- ✅ `components/header/` - Header (todas las páginas)
- ✅ `components/footer/` - Footer (todas las páginas)

**Pendientes de migrar y documentar: 5**
- ⏳ `pages/cv/` → `components/cv/`
- ⏳ `pages/contact/` → `components/contact/`
- ⏳ `pages/projects/` → `components/projects/`
- ⏳ `pages/code-ai/` → `components/code-ai/`
- ⏳ `pages/ppia/` → `components/ppia/`

---

*Última actualización: 2026-02-19*
*Documentados: 3 | Pendientes: 5*
