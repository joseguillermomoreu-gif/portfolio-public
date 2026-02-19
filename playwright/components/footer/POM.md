# POM - Footer Component

Componente del footer, presente en todas las páginas.

**Archivos**: `index.ts`, `selectors.ts`
**Extiende**: — (no extiende BasePage)

---

## Locators

| Locator | Selector | Descripción |
|---------|----------|-------------|
| `container` | `.site-footer` | Contenedor del footer |
| `socialLinks` | `.footer-social a` | Links de RRSS (GitHub, LinkedIn, Email) |
| `version` | `.footer-version` | Versión de la app (`vX.Y.Z`) |
| `year` | `.footer-year` | Año con copyright (`© YYYY`), inline en el footer-text |
| `footerMeta` | `.footer-meta` | Contenedor de la versión (usado como máscara en visual regression) |
| `footerText` | `.footer-text` | Texto descriptivo completo del footer |

## Métodos

| Método | Retorno | Descripción |
|--------|---------|-------------|
| `isVisible()` | `Promise<boolean>` | Verifica si el footer es visible |
| `scrollToFooter()` | `Promise<void>` | Hace scroll hasta el footer |
| `getLocator()` | `Locator` | Locator del container |
| `getDynamicMasks()` | `Locator[]` | Devuelve `[footerMeta]` para enmascarar versión en visual regression |
| `getLocatorWithMasks()` | `{ locator, masks }` | Locator + máscaras listo para `toHaveScreenshot` |

## Notas Visual Regression

- `.footer-meta` (versión) se enmascara en todos los snapshots para evitar falsos positivos cuando cambia la versión
- `.footer-year` (año) está inline en el texto — no se enmascara ya que es estable durante todo el año
- Uso en tests: `const { locator, masks } = footer.getLocatorWithMasks()`

## Estructura HTML

```
footer.site-footer
  └── div.footer-container
       ├── div.footer-info
       │    └── p.footer-text
       │         └── span.footer-year  ← © YYYY (inline)
       ├── div.footer-social           ← GitHub · LinkedIn · Email
       └── div.footer-meta             ← p.footer-version (vX.Y.Z)
```

---

*Última actualización: 2026-02-19*
