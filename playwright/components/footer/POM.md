# POM: Footer

Footer presente en todas las páginas. Incluye enlaces a redes sociales, versión dinámica y año actual. Provee helpers para visual regression con enmascaramiento del contenido dinámico.

---

## Acciones

- `scrollToFooter()` — Hace scroll hasta que el footer sea visible
- `footerDynamicMasks()` — Retorna `Locator[]` con `.footer-meta` para usar como `mask` en visual regression

## Visual Regression

- Usar `footerDynamicMasks()` como `mask` para enmascarar versión y año (contenido dinámico).
- Se enmascara `.footer-meta` (contenedor padre) para que el tamaño de la máscara sea estable aunque cambie el texto.

## Selectores

- `container` → `.site-footer`
- `socialLinks` → `.footer-social a`
- `version` → `.footer-version`
- `year` → `.footer-year`
- `footerMeta` → `.footer-meta`
- `footerText` → `.footer-text`

---

*Spec*: `footer.spec.ts`
