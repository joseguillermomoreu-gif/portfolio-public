# POM: Footer

Footer presente en todas las páginas. Incluye enlaces a redes sociales, versión dinámica y año actual.

---

## Acciones

- `scrollToFooter()` — Hace scroll hasta que el footer sea visible

## Assertions

- `socialLinksAreSecure()` — El primer enlace social tiene `target="_blank"` y `rel="noopener"`
- `githubProfileLinkIsValid()` — El enlace al perfil de GitHub es visible y se abre en `_blank`
- `yearIsCurrentYear()` — El footer muestra el año en curso
- `versionMatchesSemver()` — El footer muestra la versión en formato `vX.Y.Z`

## Visual Regression

- `footerMatchesSnapshot(snapshotName)` — Screenshot de `.site-footer` con `.footer-meta` enmascarado (versión y año son contenido dinámico)

## Notas

- Se enmascara `.footer-meta` (contenedor padre de versión y año) para que el tamaño de la máscara sea estable aunque cambie el texto.

## Selectores

- `container` → `.site-footer`
- `socialLinks` → `.footer-social a`
- `version` → `.footer-version`
- `year` → `.footer-year`
- `footerMeta` → `.footer-meta`
- `githubProfileLink` → `a[href="https://github.com/joseguillermomoreu-gif"]`

---

*Specs*: `footer.desktop.spec.ts`, `footer.mobile.spec.ts`
