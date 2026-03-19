# Requirements — Redirect /san-patricio fuera de fecha

## Contexto

La ruta `/san-patricio` alberga una temática temporal activa únicamente
el 17 de marzo. Fuera de esa fecha, la página muestra una pantalla en
blanco. Este documento especifica el comportamiento correcto cuando la
temática no está activa.

**Stack**: PHP 8.1 · Symfony 6.4 · Arquitectura Hexagonal

---

## Requisitos Funcionales

### RF-01 — Redirect 301 fuera de fecha [MUST]

WHEN el usuario accede a /san-patricio
AND la fecha actual NO es 17 de marzo
THE SYSTEM SHALL responder con HTTP 301 hacia
/articulos/tlotp-sdd-ia-san-patricio

### RF-02 — Comportamiento el 17 de marzo [MUST]

WHEN el usuario accede a /san-patricio
AND la fecha actual ES 17 de marzo
THE SYSTEM SHALL mostrar la página temática de San Patricio
con el comportamiento actual sin modificaciones

### RF-03 — Implementación en capa correcta [MUST]

THE SYSTEM SHALL implementar la lógica del redirect en el
controlador existente de San Patricio (SanPatricioController),
respetando la arquitectura hexagonal y sin introducir lógica
de negocio fuera de la capa de dominio

### RF-04 — Cobertura de tests [SHOULD]

THE SYSTEM SHALL cubrir el nuevo comportamiento del redirect
con un test de integración/funcional que verifique que
en fecha no-17/03 se devuelve 301 a la URL correcta

---

## Requisitos No Funcionales

### RNF-01 — Performance

THE SYSTEM SHALL resolver el redirect en menos de 50ms
sin consultas a repositorios JSON ni lógica de negocio costosa

### RNF-02 — Seguridad

THE SYSTEM SHALL no exponer información de configuración
interna en la cabecera Location del redirect

### RNF-03 — Mantenibilidad

THE SYSTEM SHALL centralizar la lógica de detección de fecha
de forma que el año de la condición no requiera modificación
anual (comparar solo día y mes, no el año)
