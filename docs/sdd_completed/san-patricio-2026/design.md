# Design — San Patricio Theme & Article

## Contexto
**Aventura**: Nueva feature en proyecto existente
**Stack**: Symfony 6.4 · PHP 8.1 · Twig 3.x · Hexagonal DDD
**Generado con**: TLOTP v4.0.0 — Gandalf SDD

---

## Arquitectura General

La feature sigue la arquitectura hexagonal existente del proyecto.
El tema es **puramente client-side** (localStorage + JS/CSS dinámico),
con un único endpoint server-side responsable de la verificación de fecha
y el renderizado de la página festiva.

### Flujo principal

```
Usuario visita /san_patricio
        │
        ▼
SanPatricioController
  · Verifica fecha PHP (Europe/Madrid)
  · Si expirado → renderiza mensaje neutro (sin tema)
  · Si activo → renderiza san_patricio.html.twig
        │
        ▼
san_patricio.html.twig
  · Incluye san_patricio.js (activa tema + guarda localStorage)
        │
        ▼
san_patricio.js (en TODAS las páginas vía base.html.twig)
  · Lee localStorage al cargar
  · Si flag activo + fecha válida → inyecta san_patricio.css
                                  → sustituye botón darkmode por 🍀
  · Click en 🍀 (fuera de /san_patricio) → limpia localStorage
                                          → restaura darkmode
                                          → elimina CSS del tema
```

---

## Componentes

### 1. SanPatricioController
- **Capa**: Infrastructure/Http
- **Ruta**: `GET /san_patricio`
- **Responsabilidad**: Verificar expiración del tema (PHP DateTimeZone 'Europe/Madrid'). Si activo → renderiza página festiva. Si expirado → renderiza mensaje neutro sin activar el tema.
- **Dependencias**: Twig, DateTimeImmutable, DateTimeZone

### 2. san_patricio.html.twig
- **Capa**: Infrastructure/UI (Templates)
- **Responsabilidad**: Plantilla de la página festiva `/san_patricio`. Muestra mensaje irlandés temático (invitación al pub más cercano a tomar una Guinness), decoración con tréboles, y activa el tema via `san_patricio.js` al cargar.
- **Dependencias**: `base.html.twig` (extends), `san_patricio.css`, `san_patricio.js`

### 3. san_patricio.js
- **Capa**: Infrastructure/UI (Client-side JS)
- **Responsabilidad**: Gestión del tema en el cliente.
  - Al cargar `/san_patricio`: guarda flag `san_patricio_theme: 'active'` en localStorage.
  - En **todas las páginas**: lee localStorage al cargar; si flag activo → inyecta `san_patricio.css` dinámicamente e intercambia el botón darkmode por el trébol 🍀.
  - Al hacer clic en el trébol (fuera de `/san_patricio`): elimina el flag de localStorage, restaura el botón darkmode y elimina el stylesheet del tema.
  - También verifica la fecha de expiración client-side; si expirada, auto-limpia localStorage.
- **Dependencias**: localStorage API (nativa), `san_patricio.css` (cargado dinámicamente)
- **Inclusión**: Script tag en `base.html.twig` para que corra en todas las páginas.

### 4. san_patricio.css
- **Capa**: Infrastructure/UI (Client-side CSS)
- **Responsabilidad**: Estilos aislados del tema San Patricio. Acentos verdes sutiles en header, links y bordes. Sin tocar ficheros CSS core. Se carga **solo cuando el tema está activo** (inyectado dinámicamente por `san_patricio.js`). ID único (`san-patricio-stylesheet`) para poder eliminarlo al desactivar.
- **Dependencias**: Ninguna (standalone)

### 5. Artículo — TLOTP + SDD + IA
- **Capa**: Domain/Infrastructure (Article module)
- **Responsabilidad**: Nuevo artículo en la sección Code & AI describiendo cómo TLOTP + SDD + IA fue usado para especificar y desarrollar esta feature. Incluye mención al próximo experimento: SDD full-project desde cero hasta producción en una sesión con métricas.
- **Dependencias**: Article module existente (JSON repository), ArticleRepository, plantilla Twig de artículo.

---

## Architecture Decision Records (ADR)

### ADR-01 — Persistencia del tema: localStorage

**Contexto**: Necesitamos persistir el estado del tema entre páginas sin servidor.

**Opciones consideradas**:
- A) `localStorage` — Solo client-side, sin envío al server, simple API
- B) Cookie — Enviada en cada request, accesible desde PHP

**Decisión**: `localStorage`

**Justificación**: El tema es puramente visual/client-side. El servidor no necesita conocer el estado del tema. `localStorage` cumple RNF-01 (sin overhead de red) y RNF-02 (lógica aislada en JS).

---

### ADR-02 — Aplicación de estilos: Stylesheet dinámico

**Contexto**: Aplicar estilos verdes a todas las páginas sin tocar los CSS core.

**Opciones consideradas**:
- A) Class toggle en `<body>` — Requiere reglas condicionales en CSS core. Viola RNF-02.
- B) Stylesheet dinámico — `san_patricio.js` inyecta `<link>` solo cuando tema activo.

**Decisión**: Stylesheet dinámico (opción B)

**Justificación**: Cumple RNF-02 (aislamiento total) y RNF-01 (0ms overhead cuando inactivo). El CSS solo se descarga cuando se necesita.

---

### ADR-03 — Verificación de expiración: Dual (server + client)

**Contexto**: RF-02 exige que el tema no se active después del 2026-03-17T23:59:59 Europe/Madrid.

**Opciones consideradas**:
- A) Solo server-side — Fiable, pero un localStorage previo podría seguir mostrando el trébol.
- B) Solo client-side — El reloj del cliente puede ser incorrecto o manipulado.
- C) Dual — Controller PHP verifica (fiable) + JS verifica y auto-limpia localStorage expirado.

**Decisión**: Dual (opción C)

**Justificación**: El servidor es la fuente fiable (timezone correcta, reloj no manipulable). El cliente añade auto-limpieza del localStorage sin necesitar visitar `/san_patricio`. Cobertura máxima con coste marginal mínimo.

---

## Seguridad

| Superficie         | Riesgo | Análisis                                                                 |
|--------------------|--------|--------------------------------------------------------------------------|
| localStorage       | Bajo   | Solo client-side, efecto puramente visual. No afecta datos del servidor. |
| `/san_patricio`    | Bajo   | Ruta GET pública, sin inputs de usuario, sin formularios. XSS: 0.        |
| `san_patricio.js`  | Bajo   | No procesa input externo. Solo lee/escribe localStorage y DOM conocido.  |
| Fecha expiración   | N/A    | Verificada en PHP server-side; cliente no tiene control sobre la lógica de negocio crítica. |

**Valoración global**: Riesgo de seguridad BAJO. Feature puramente presentacional sin datos sensibles ni inputs de usuario.

---

## Riesgos

| Riesgo                                        | Prob  | Impacto | Mitigación                                             |
|-----------------------------------------------|-------|---------|--------------------------------------------------------|
| E2E existentes se rompen (trébol en header)   | Media | Alto    | RF-05: tests limpian localStorage en `beforeEach`      |
| Timezone mismatch en expiración               | Baja  | Medio   | PHP con `DateTimeZone('Europe/Madrid')` explícito      |
| CSS verde rompe layout responsive             | Baja  | Medio   | Estilos solo additivos, sin override de propiedades de layout |
| localStorage no disponible (private browsing) | Baja  | Bajo    | Graceful degradation: tema no persiste entre páginas pero funciona en /san_patricio |
