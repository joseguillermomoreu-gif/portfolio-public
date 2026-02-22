<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Infrastructure\Persistence\Json\JsonPortfolioRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class PortfolioController extends AbstractController
{
    public function __construct(
        private readonly JsonPortfolioRepository $portfolioRepository
    ) {
    }

    #[Route('/', name: 'home')]
    public function index(): Response
    {
        $portfolio = $this->portfolioRepository->find();

        return $this->render('pages/portfolio/index.html.twig', [
            'portfolio' => $portfolio,
        ]);
    }

    #[Route('/cv', name: 'cv')]
    public function cv(): Response
    {
        // Cargar datos CV desde JSON
        $content = file_get_contents(__DIR__ . '/../../data/cv.json');

        if (false === $content) {
            throw new \RuntimeException('Failed to read CV data');
        }

        $cvData = json_decode($content, true);

        if (!is_array($cvData)) {
            throw new \RuntimeException('Invalid CV JSON format');
        }

        $portfolio = $this->portfolioRepository->find();

        // Enlace al CV PDF real
        $cvPdfUrl = '/cv2025.pdf';

        return $this->render('pages/portfolio/cv.html.twig', [
            'portfolio' => $portfolio,
            'cv_data' => $cvData,
            'cv_pdf_url' => $cvPdfUrl,
        ]);
    }

    #[Route('/contacto', name: 'contact')]
    public function contact(): Response
    {
        $portfolio = $this->portfolioRepository->find();

        return $this->render('pages/portfolio/contact.html.twig', [
            'portfolio' => $portfolio,
        ]);
    }

    #[Route('/ppia', name: 'ppia')]
    public function ppia(): Response
    {
        return $this->render('pages/portfolio/ppia.html.twig');
    }

    #[Route('/portfolio', name: 'portfolio')]
    public function portfolioPage(): Response
    {
        $keywords = [
            // ── ARQUITECTURA ──────────────────────────────────────────────
            [
                'id' => 'ddd',
                'label' => 'DDD',
                'full_title' => 'Domain-Driven Design',
                'icon_type' => 'monogram',
                'icon_value' => 'D',
                'category' => 'arquitectura',
                'description' => <<<'MD'
## Domain-Driven Design

DDD es una aproximación al desarrollo de software que coloca el **dominio de negocio** en el centro de todas las decisiones técnicas. El modelo de dominio expresa las reglas y procesos del negocio en código, con un lenguaje ubicuo compartido entre desarrolladores y expertos de dominio.

### El dominio completo de este portfolio

Dos bounded contexts completamente separados, cada uno con sus entidades, Value Objects y puertos:

```
src/Domain/
│
├── Portfolio/                              ← Bounded Context 1
│   │
│   ├── Portfolio.php                       ← Aggregate Root
│   │     Agrupa: PersonalInfo, ContactInfo,
│   │             Skill[], SocialNetwork[]
│   │     Construido por JsonPortfolioRepository
│   │     desde data/portfolio.json
│   │
│   ├── PersonalInfo.php                    ← Value Object (readonly)
│   │     Campos: name, title, tagline, bio,
│   │             location, photo?, website?
│   │     Invariante: ningún campo obligatorio vacío
│   │     → InvalidArgumentException en constructor
│   │
│   ├── ContactInfo.php                     ← Value Object (readonly)
│   │     Campos: email, phone, github,
│   │             linkedin, website, instagram?
│   │     Invariante: email con formato válido,
│   │                 website como URL válida
│   │
│   ├── Skill.php                           ← Value Object
│   │     Campos: name, level
│   │     level: 'beginner'|'intermediate'|'expert'
│   │
│   ├── SocialNetwork.php                   ← Value Object
│   │     Campos: platform, url, icon
│   │
│   └── PortfolioRepositoryInterface.php    ← Puerto
│         Contrato: find(): Portfolio
│
└── Article/                                ← Bounded Context 2
    │
    ├── Article.php                         ← Aggregate Root
    │     Campos: id, title, slug, excerpt,
    │             content, publishedAt, updatedAt
    │     Colecciones: Tag[]
    │     Factory: Article::fromArray(array): self
    │
    ├── Tag.php                             ← Value Object
    │     name normalizado a minúsculas
    │     en el constructor
    │
    └── ArticleRepositoryInterface.php      ← Puerto
          findAll(): Article[]
          findBySlug(string $slug): ?Article
          findById(string $id): ?Article
          findByTags(string[] $tags): Article[]
```

### Lenguaje ubicuo en la práctica

El código usa los mismos términos que usaría alguien describiendo un portfolio:

- `PersonalInfo` (no `UserData` ni `ProfileRecord`)
- `Skill` con `level` (no `CompetencyEntity` con `score`)
- `Article` con `publishedAt` (no `Post` con `createdAt`)
- `ContactInfo` con `github` y `linkedin` (no `ExternalLinks`)

### Conceptos aplicados

- **Value Objects** inmutables: `PersonalInfo` y `ContactInfo` validan sus invariantes en el constructor. Si el nombre está vacío → `InvalidArgumentException` antes de que el objeto exista. Sin setters, sin estado mutable.
- **Aggregate Root**: `Portfolio` es la única puerta de entrada a `PersonalInfo` y `ContactInfo`. Nadie crea ni accede a `PersonalInfo` directamente, solo a través del Aggregate.
- **Repository interfaces en Domain**: `PortfolioRepositoryInterface` y `ArticleRepositoryInterface` viven en `src/Domain/`, nunca en `Infrastructure/`.
- **Sin dependencias de framework en el dominio**: ningún archivo de `src/Domain/` tiene `use Symfony\...` ni `use Doctrine\...`.

Puedes explorar la estructura completa en el [repositorio público →](https://github.com/joseguillermomoreu-gif/portfolio-public)
MD,
            ],
            [
                'id' => 'hexagonal',
                'label' => 'Hexagonal',
                'full_title' => 'Arquitectura Hexagonal',
                'icon_type' => 'monogram',
                'icon_value' => 'H',
                'category' => 'arquitectura',
                'description' => <<<'MD'
## Arquitectura Hexagonal

También conocida como **Ports & Adapters**, separa el núcleo de aplicación de los detalles de infraestructura mediante interfaces (ports) e implementaciones concretas (adapters).

### Los puertos y adaptadores de este portfolio

Este proyecto tiene **2 puertos** (contratos del dominio) y **4 adaptadores** (implementaciones concretas):

```
DOMINIO — Puertos (contratos puros, sin implementación)
──────────────────────────────────────────────────────

Domain/Portfolio/PortfolioRepositoryInterface.php
  └── find(): Portfolio

Domain/Article/ArticleRepositoryInterface.php
  ├── findAll(): Article[]
  ├── findBySlug(string $slug): ?Article
  ├── findById(string $id): ?Article
  └── findByTags(string[] $tags): Article[]


INFRAESTRUCTURA — Adaptadores de persistencia
──────────────────────────────────────────────

Infrastructure/Persistence/Json/
  │
  ├── JsonPortfolioRepository.php
  │     implementa: PortfolioRepositoryInterface
  │     Lee: data/portfolio.json
  │     Construye: Portfolio con PersonalInfo,
  │                ContactInfo, Skill[], SocialNetwork[]
  │     Lanza: RuntimeException si JSON inválido
  │
  └── JsonArticleRepository.php
        implementa: ArticleRepositoryInterface
        Lee: data/articles.json
        Construye: Article[] con Tag[]
        Cachea en memoria: múltiples llamadas
        = una sola lectura de disco


INFRAESTRUCTURA — Adaptadores de presentación
──────────────────────────────────────────────

Infrastructure/Twig/
  │
  ├── MarkdownExtension.php
  │     Expone: filtro |markdown a las plantillas Twig
  │     Usa internamente: league/commonmark
  │     Modos: safe (sanitiza HTML) / unsafe (HTML libre)
  │
  └── VersionExtension.php
        Expone: función version() en Twig
        Lee: fichero VERSION del sistema de archivos
        Muestra: versión semántica en el footer


ENTRY POINTS — Controladores (usan puertos, nunca adaptadores)
───────────────────────────────────────────────────────────────

Controllers/
  │
  ├── PortfolioController.php
  │     Inyecta: PortfolioRepositoryInterface
  │     Rutas: /  ·  /cv  ·  /contacto
  │            /ppia  ·  /portfolio  ·  /proyectos
  │
  └── ArticleController.php
        Inyecta: ArticleRepositoryInterface
        Rutas: /code-ai  ·  /code-ai/{slug}
```

### La regla clave: el controlador solo conoce el puerto

```php
// ✅ Correcto — inyecta la interfaz (el puerto)
public function __construct(
    private readonly PortfolioRepositoryInterface $portfolioRepository
) {}

// ❌ Incorrecto — acoplaría el controlador a la implementación
public function __construct(
    private readonly JsonPortfolioRepository $portfolioRepository
) {}
```

### Por qué hexagonal para un portfolio personal

Un portfolio personal podría ser un script PHP que carga un JSON. Elegí Hexagonal **deliberadamente** para mostrar cómo estructuro el código en proyectos reales.

Si mañana quisiera cambiar de JSON a MySQL: creo `DoctrinePortfolioRepository`, lo registro en `services.yaml`, y el controlador no cambia una sola línea. El dominio tampoco.

[Ver código fuente completo →](https://github.com/joseguillermomoreu-gif/portfolio-public)
MD,
            ],
            [
                'id' => 'solid',
                'label' => 'SOLID',
                'full_title' => 'Principios SOLID',
                'icon_type' => 'monogram',
                'icon_value' => 'S',
                'category' => 'arquitectura',
                'description' => <<<'MD'
## Principios SOLID

Cinco principios de diseño orientado a objetos que producen código mantenible, flexible y testeable. Aquí van aplicados concretamente a este proyecto.

### S — Single Responsibility

Una clase, una razón para cambiar.

- `JsonPortfolioRepository` → solo sabe cargar el portfolio desde JSON
- `MarkdownExtension` → solo convierte Markdown a HTML para Twig
- `VersionExtension` → solo lee el fichero `VERSION` del filesystem
- `PersonalInfo` → solo representa y valida la información personal
- `ArticleController` → solo resuelve las rutas de artículos y delega al repositorio

Ninguno de estos tiene dos responsabilidades mezcladas. Si la lógica de lectura de JSON cambia, solo toco `JsonPortfolioRepository`. Si el footer cambia cómo muestra la versión, solo toco `VersionExtension`.

### O — Open/Closed

Abierto a extensión, cerrado a modificación.

`PortfolioRepositoryInterface` está cerrada a modificación pero abierta a extensión: puedo crear `DoctrinePortfolioRepository`, `ApiPortfolioRepository` o `CachedPortfolioRepository` sin modificar ninguna clase existente. El controlador tampoco cambia.

### L — Liskov Substitution

Las subclases (o implementaciones) deben ser intercambiables con sus bases.

`JsonPortfolioRepository` puede sustituir a `PortfolioRepositoryInterface` en cualquier punto de uso sin que el comportamiento esperado cambie. Los tests de integración verifican esto directamente: testean la implementación concreta contra el contrato de la interfaz.

### I — Interface Segregation

Interfaces pequeñas y específicas mejor que una grande.

Los puertos de este proyecto son mínimos:

```php
// Solo un método: solo lo que el consumer necesita
interface PortfolioRepositoryInterface {
    public function find(): Portfolio;
}

// Cuatro métodos: cada uno cubre un caso de uso real
interface ArticleRepositoryInterface {
    public function findAll(): array;
    public function findBySlug(string $slug): ?Article;
    public function findById(string $id): ?Article;
    public function findByTags(array $tags): array;
}
```

Ninguna implementación se ve forzada a implementar operaciones que no necesita.

### D — Dependency Inversion

Depender de abstracciones, nunca de concreciones.

```php
// Los controladores declaran qué necesitan (abstracción):
final class PortfolioController extends AbstractController
{
    public function __construct(
        private readonly PortfolioRepositoryInterface $repo  // ← interfaz
    ) {}
}

// Symfony decide qué inyectar (services.yaml):
// App\Controllers\PortfolioController:
//   $repo: '@App\Infrastructure\Persistence\Json\JsonPortfolioRepository'
```

El código de negocio nunca importa `JsonPortfolioRepository`. La decisión de qué implementación usar vive en la configuración, no en el código.
MD,
            ],
            [
                'id' => 'clean-architecture',
                'label' => 'Clean Architecture',
                'full_title' => 'Clean Architecture',
                'icon_type' => 'monogram',
                'icon_value' => 'CA',
                'category' => 'arquitectura',
                'description' => <<<'MD'
## Clean Architecture

Propuesta por Robert C. Martin, establece que las dependencias siempre deben apuntar hacia el interior: el dominio no conoce la aplicación, la aplicación no conoce la infraestructura.

### Las capas de este portfolio

```
┌─────────────────────────────────────────────────────┐
│  INFRAESTRUCTURA                                     │
│                                                      │
│  Entry Points              Adaptadores               │
│  ────────────              ──────────────────────    │
│  PortfolioController       JsonPortfolioRepository   │
│  ArticleController         JsonArticleRepository     │
│                            MarkdownExtension         │
│                            VersionExtension          │
│                                                      │
│  ┌───────────────────────────────────────────────┐  │
│  │  DOMINIO                                       │  │
│  │                                                │  │
│  │  Bounded Context: Portfolio                    │  │
│  │  ─────────────────────────                    │  │
│  │  Portfolio.php        ← Aggregate Root         │  │
│  │  PersonalInfo.php     ← Value Object           │  │
│  │  ContactInfo.php      ← Value Object           │  │
│  │  Skill.php            ← Value Object           │  │
│  │  SocialNetwork.php    ← Value Object           │  │
│  │  PortfolioRepositoryInterface.php  ← Puerto    │  │
│  │                                                │  │
│  │  Bounded Context: Article                      │  │
│  │  ────────────────────                         │  │
│  │  Article.php          ← Aggregate Root         │  │
│  │  Tag.php              ← Value Object           │  │
│  │  ArticleRepositoryInterface.php    ← Puerto    │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘

Las flechas apuntan siempre hacia adentro.
Infrastructure conoce Domain. Domain no conoce Infrastructure.
```

### La regla de dependencia verificable

Estos comandos comprueban que la arquitectura es real, no decorativa:

```bash
# El dominio no tiene ninguna dependencia de Symfony:
grep -r "use Symfony" src/Domain/
# → (sin resultados) ✅

# El dominio no sabe nada de JSON ni de filesystem:
grep -r "file_get_contents\|json_decode" src/Domain/
# → (sin resultados) ✅

# Los controladores solo conocen interfaces, nunca implementaciones:
grep "JsonPortfolioRepository\|JsonArticleRepository" src/Controllers/
# → (sin resultados) ✅
```

Si alguno de estos devolviera resultados, habría una violación de dependencias. Este proyecto pasa las tres verificaciones.

### Por qué importa

Permite reemplazar cualquier detalle externo (base de datos, framework, API) sin afectar la lógica de negocio. Es la base sobre la que construyo sistemas que duran años sin deteriorarse.
MD,
            ],

            // ── TESTING ───────────────────────────────────────────────────
            [
                'id' => 'tdd',
                'label' => 'TDD',
                'full_title' => 'Test-Driven Development',
                'icon_type' => 'monogram',
                'icon_value' => 'T',
                'category' => 'testing',
                'description' => <<<'MD'
## Test-Driven Development

TDD es una técnica de diseño donde los tests se escriben **antes** que el código de producción, siguiendo el ciclo Red → Green → Refactor.

### El ciclo TDD

1. **Red**: Escribe un test que falla (el comportamiento aún no existe)
2. **Green**: Implementa el mínimo código para que pase
3. **Refactor**: Mejora el código manteniendo los tests en verde

### Por qué uso TDD

Los tests escritos primero actúan como especificación ejecutable. El resultado es código con mejor diseño, menor acoplamiento y cobertura del 100% de los casos que importan. Nunca escribo tests post-hoc para "completar coverage".
MD,
            ],
            [
                'id' => 'e2e',
                'label' => 'E2E',
                'full_title' => 'End-to-End Testing',
                'icon_type' => 'monogram',
                'icon_value' => 'E',
                'category' => 'testing',
                'description' => <<<'MD'
## End-to-End Testing

Los tests E2E verifican el sistema completo desde la perspectiva del usuario: desde el navegador hasta la base de datos y de vuelta.

### Mi enfoque como Tech Lead

Como Tech Lead de E2E en El Confidencial, lidero el equipo de testing E2E. En ese contexto construí **PPIA** (Playwright Page Inspector with AI): una herramienta para que mis compañeros puedan generar tests E2E completos a partir de especificaciones Gherkin usando Claude MCP y GPT-4.

El objetivo es que los nuevos tests de El Confidencial se generen con PPIA. Esa integración sigue siendo el siguiente paso.

### La filosofía E2E

La combinación de Page Object Model estricto + generación IA reduce el tiempo de creación de tests de horas a minutos.
MD,
            ],
            [
                'id' => 'playwright',
                'label' => 'Playwright',
                'full_title' => 'Playwright',
                'icon_type' => 'url',
                'icon_value' => 'https://playwright.dev/img/playwright-logo.svg',
                'category' => 'testing',
                'description' => <<<'MD'
## Playwright

Framework de testing E2E de Microsoft. Es mi herramienta principal para automatización de navegadores tanto en este portfolio como en producción en El Confidencial.

### En este portfolio

Más de **100 tests E2E** organizados con **POM estricto**: los selectores CSS solo están en archivos `selectors.ts`, nunca en los tests directamente. Los tests solo usan métodos del POM.

```
playwright/
├── components/     ← POM: selectors.ts + index.ts por página
│   ├── header/
│   ├── footer/
│   ├── cv/
│   ├── portfolio/   ← el de esta página
│   └── ...
└── tests/
    ├── header/     ← tests funcionales + visual regression
    ├── portfolio/  ← smoke + modal interaction + visual
    └── ...
```

### Visual Regression

Cada componente crítico tiene snapshot baseline. Si un deploy cambia el aspecto de la UI, el test falla. Los baselines se regeneran con `make e2e-update-snapshots`.

### Como Tech Lead en El Confidencial

Lidero el equipo de testing E2E en El Confidencial. En ese rol construí **PPIA** para mis compañeros: herramienta que genera tests Playwright completos a partir de especificaciones Gherkin usando Claude MCP y GPT-4. El siguiente paso es integrar PPIA en los nuevos tests.
MD,
            ],
            [
                'id' => 'phpunit',
                'label' => 'PHPUnit',
                'full_title' => 'PHPUnit',
                'icon_type' => 'monogram',
                'icon_value' => 'PU',
                'category' => 'testing',
                'description' => <<<'MD'
## PHPUnit

El framework de testing estándar del ecosistema PHP. Lo uso para tests unitarios de dominio y tests de integración de infraestructura.

### Tipos de tests que escribo

- **Unit tests**: Dominio puro, sin mocks de infraestructura gracias a la arquitectura hexagonal
- **Integration tests**: Repositorios contra base de datos real en memoria
- **Command tests**: Casos de uso completos con doubles de infraestructura

### PHPStan + PHPUnit

La combinación de PHPStan a nivel 9 con PHPUnit garantiza que los tests están correctamente tipados y que se testean los contratos correctos, no los detalles de implementación.
MD,
            ],

            // ── BACKEND ───────────────────────────────────────────────────
            [
                'id' => 'php',
                'label' => 'PHP 8.1+',
                'full_title' => 'PHP 8.1+',
                'icon_type' => 'simpleicons',
                'icon_value' => 'php',
                'category' => 'backend',
                'description' => <<<'MD'
## PHP 8.1+

Con más de 8 años de experiencia en PHP, he visto la evolución del lenguaje desde arrays asociativos sueltos hasta tipos de intersección y fibers. PHP moderno es un lenguaje serio y potente.

### Por qué PHP para este portfolio

PHP es mi stack de producción en El Confidencial y en proyectos propios. No elegí PHP "porque es lo que sé": lo elegí porque con **Symfony + DDD + PHPStan level 9** puedo demostrar exactamente las prácticas que aplico en producción real, con un stack que cualquier empresa puede evaluar directamente.

### Features modernas que uso en este proyecto

- **`declare(strict_types=1)`** en todos los archivos — sin coerciones de tipo silenciosas
- **Readonly properties**: `PersonalInfo` y `ContactInfo` son Value Objects inmutables
- **Constructor promotion**: reducción de boilerplate en entidades de dominio
- **Match expressions**: en la extensión de Markdown para evaluar el modo safe/unsafe

### PHPStan level 9

Todos los archivos PHP de este proyecto pasan PHPStan level 9. El análisis estático corre en cada PR como check requerido — no se puede mergear código con errores de tipo.

[Ver src/ completo →](https://github.com/joseguillermomoreu-gif/portfolio-public/tree/master/src)
MD,
            ],
            [
                'id' => 'symfony',
                'label' => 'Symfony',
                'full_title' => 'Symfony',
                'icon_type' => 'simpleicons',
                'icon_value' => 'symfony',
                'category' => 'backend',
                'description' => <<<'MD'
## Symfony

Los últimos 4 años ha sido mi framework de trabajo principal en El Confidencial. Lo conozco en profundidad: desde el ciclo de vida del kernel hasta la compilación del contenedor de servicios.

### Por qué Symfony para este portfolio

Podría haber usado cualquier cosa: un generador estático, WordPress, Laravel. Elegí **Symfony 6.4** porque es lo que uso a diario en producción y porque permite demostrar todas las prácticas que defiendo: inyección de dependencias limpia, arquitectura hexagonal, y una separación real entre capas.

Symfony no impone cómo organizar el código. Esa libertad es precisamente lo que permite aplicar DDD y Hexagonal sin restricciones.

### Lo que Symfony aporta en este proyecto

- **DependencyInjection**: `JsonPortfolioRepository` se inyecta por constructor, configurable sin tocar el controlador
- **Twig**: motor de plantillas con filtros personalizados (`|markdown`, `|version`)
- **Routing**: atributos PHP `#[Route]` + YAML para separar configuración de código
- **Cache**: `php bin/console cache:clear` en cada deploy garantiza código fresco en producción

### Componentes que domino en profundidad

- **EventDispatcher**: arquitecturas event-driven sin acoplamiento
- **Console**: CLIs con progress bars, tablas y comandos interactivos
- **Security**: Voters, firewalls, JWT y autenticación personalizada
- **Messenger**: procesamiento asíncrono con múltiples transportes
MD,
            ],
            [
                'id' => 'phpstan',
                'label' => 'PHPStan',
                'full_title' => 'PHPStan',
                'icon_type' => 'url',
                'icon_value' => 'https://raw.githubusercontent.com/phpstan/phpstan/master/website/src/images/logo.png',
                'category' => 'backend',
                'description' => <<<'MD'
## PHPStan

Analizador estático de PHP que detecta errores sin ejecutar el código. Trabajo siempre a **nivel 9**, el máximo.

### Por qué nivel 9

El nivel 9 requiere que todo esté completamente tipado: parámetros, retornos, propiedades, genéricos. El resultado es código donde los errores de tipo se detectan en CI, no en producción a las 3am.

### Lo que PHPStan detecta en mis proyectos

- Llamadas a métodos en valores posiblemente null
- Arrays sin tipo genérico (`array` vs `array<string, int>`)
- Condiciones siempre verdaderas o falsas
- Dead code
- Violaciones de contratos de interfaces

Integrado en el pipeline de CI: un PR no se puede mergear si PHPStan reporta errores.
MD,
            ],

            // ── TOOLING ───────────────────────────────────────────────────
            [
                'id' => 'docker',
                'label' => 'Docker',
                'full_title' => 'Docker',
                'icon_type' => 'simpleicons',
                'icon_value' => 'docker',
                'category' => 'tooling',
                'description' => <<<'MD'
## Docker

Uso Docker para garantizar que el entorno de desarrollo es idéntico al de CI y producción. Sin "en mi máquina funciona".

### La imagen de este portfolio

Una sola imagen que incluye:
- **PHP 8.1** + Symfony + PHPUnit + PHPStan + CS Fixer
- **Node.js 20** + TypeScript + ESLint
- **Playwright con Chromium** bakeado — los tests E2E no necesitan instalar navegadores

Las dependencias (`vendor/`, `node_modules/`, Chromium) están en la imagen. El código fuente se monta como volumen en desarrollo, para editar sin reconstruir.

### Workflow diario

```bash
make up              # levanta el servidor en localhost:8080
make qa-full         # PHPUnit + PHPStan + CS Fixer + ESLint + E2E
make e2e             # solo E2E contra localhost:8080
make e2e-update-snapshots  # regenerar baselines de visual regression
```

### Por qué una sola imagen

Simplicidad: un solo `make build` y tienes el entorno completo. CI usa la misma imagen. Sin matrices de versiones, sin surpresas de "funciona en CI pero no en local".
MD,
            ],
            [
                'id' => 'git',
                'label' => 'Git',
                'full_title' => 'Git',
                'icon_type' => 'simpleicons',
                'icon_value' => 'git',
                'category' => 'tooling',
                'description' => <<<'MD'
## Git

Más allá de los comandos básicos, domino los flujos de trabajo Git para equipos.

### Gitflow real de este portfolio

```
master (producción)
  ↑  ← Pull Request + QA obligatorio
develop (integración)
  ↑  ← Pull Request desde feature/*
feature/t{num}_{desc}   ← una por tarea/issue
hotfix/t{num}_{desc}    ← urgentes desde master
```

Cada feature nace de una issue de GitHub (`#159`, `#158`...), vive en su rama, pasa QA en PR y se mergea a `develop`. Cuando hay suficientes features listas, se abre una release PR `develop → master` que dispara el deploy automático.

### Convenciones que aplico en este repo

- **Conventional Commits**: `feat:`, `fix:`, `chore:`, `refactor:`, `test:`, `docs:`
- **Nomenclatura de ramas**: `feature/t{num}_{descripcion_snake_case}`
- **Branch protection**: `master` y `develop` no admiten push directo
- **No fast-forward merges**: historial explícito de cuándo entró cada feature
- **Back-merge automático**: tras cada deploy, `master → develop` con `[skip ci]`

### Automatización post-merge

Tras cada merge a `master`, el pipeline hace automáticamente:
1. Bump de versión semántica
2. Deploy SSH al VPS de producción
3. E2E contra producción
4. Back-merge a `develop`
5. Sync al repositorio público
MD,
            ],
            [
                'id' => 'claude',
                'label' => 'Claude',
                'full_title' => 'Claude AI',
                'icon_type' => 'simpleicons',
                'icon_value' => 'claude',
                'category' => 'tooling',
                'description' => <<<'MD'
## Claude AI

Claude AI (de Anthropic) es la herramienta de IA que he integrado en mi flujo de trabajo de desarrollo. No como atajo, sino como par de programación que ayuda a razonar sobre diseño y arquitectura.

### Claude Desktop — Diseño de dominio

La primera versión de este portfolio empezó en **Claude Desktop**: conversaciones largas sobre cómo modelar el dominio, qué debería ser un Value Object, cómo separar infraestructura de dominio en un proyecto tan sencillo. El modelo me ayudó a formalizar lo que tenía en la cabeza en una estructura DDD coherente antes de escribir una sola línea de código.

Ese proceso de "hablar sobre arquitectura" definió la estructura que ves en `src/Domain/` y la separación de capas que mantiene este portfolio.

### Claude Code — Implementación con buenas prácticas

La implementación posterior usó **Claude Code** para asegurar que las buenas prácticas se aplicaban consistentemente: PHPStan level 9, CS Fixer, arquitectura hexagonal sin concesiones, tests bien estructurados con POM estricto.

Claude Code actúa como senior engineer que revisa cada cambio, propone mejoras y ejecuta el ciclo completo: rama → PR → QA → merge → deploy.

[Ver el proyecto TLOTP que hace posible este workflow →](https://github.com/joseguillermomoreu-gif/tlotp)
MD,
            ],
            [
                'id' => 'github-actions',
                'label' => 'GitHub Actions',
                'full_title' => 'GitHub Actions',
                'icon_type' => 'simpleicons',
                'icon_value' => 'githubactions',
                'category' => 'tooling',
                'description' => <<<'MD'
## GitHub Actions

Diseño y mantengo pipelines de integración y despliegue continuo que garantizan calidad sin fricción para el desarrollador.

### El pipeline real de este portfolio

**En cada Pull Request** (check requerido para mergear):
```
PHPUnit (148 tests) → PHPStan level 9 → CS Fixer dry-run → ESLint
```

**En cada push a master** (deploy automático):
```
1. Bump versión semántica (feat: → MINOR, fix: → PATCH)
2. Deploy SSH → git pull en VPS OVH de producción
3. composer install --no-dev --optimize-autoloader
4. cache:clear + cache:warmup
5. E2E Playwright contra https://josemoreupeso.es
6. Back-merge automático master → develop [skip ci]
7. Sync al repositorio público open-source
```

### Principios de diseño del pipeline

- **Rápido**: QA completo en < 2 minutos
- **Ruidoso**: cualquier fallo bloquea el merge o alerta inmediatamente
- **Sin downtime**: `git pull` + cache warmup, el servidor sirve durante el proceso
- **Rollback en un comando**: `git reset --hard <commit>` en el VPS

[Ver workflows completos →](https://github.com/joseguillermomoreu-gif/portfolio-public/tree/master/.github/workflows)
MD,
            ],
            [
                'id' => 'cs-fixer',
                'label' => 'CS Fixer',
                'full_title' => 'PHP CS Fixer',
                'icon_type' => 'url',
                'icon_value' => 'https://raw.githubusercontent.com/PHP-CS-Fixer/logo/master/logo.png',
                'category' => 'backend',
                'description' => <<<'MD'
## PHP CS Fixer

Herramienta de formateo automático de código PHP. Garantiza consistencia de estilo en todo el proyecto sin debates sobre tabs vs espacios.

### Mi configuración

PSR-12 como base, con reglas adicionales: imports ordenados, trailing commas en listas multilínea, casting limpio.

### En el pipeline

- **Local**: `make cs-fix` antes de commitear
- **CI**: `make cs-check` (dry-run) es required en PRs
- **No bloquea**: Si alguien olvida formatear, CI lo detecta y el PR no se mergea

El resultado es un historial de git donde los diffs muestran solo cambios semánticos, nunca cambios de formato.
MD,
            ],
        ];

        return $this->render('pages/portfolio/portfolio.html.twig', [
            'keywords' => $keywords,
        ]);
    }

    #[Route('/proyectos', name: 'projects')]
    public function projects(): Response
    {
        $projects = [
            [
                'name' => 'TLOTP — The Lord of the Prompt',
                'description' => 'El super-prompt que auto-configura Claude Code: detecta tu proyecto, carga reglas de arquitectura, gitflow, testing y CI/CD, y convierte a Claude en un senior engineer especializado en tu stack',
                'status' => 'production',
                'stack' => ['Markdown', 'Claude Code', 'Bash', 'Prompt Engineering'],
                'tags' => ['Claude Code', 'IA', 'Prompt Engineering', 'Developer Tools', 'Automation', 'Open Source'],
                'github' => 'https://github.com/joseguillermomoreu-gif/tlotp',
                'url' => null,
                'featured' => true,
                'highlights' => 'Auto-configuración por proyecto, reglas modulares de arquitectura hexagonal, gitflow, testing E2E y CI/CD, compatible con cualquier stack',
            ],
            [
                'name' => 'POM-PPIA',
                'description' => 'Generador de POM y tests Cucumber/Playwright desde tests declarativos usando Python + OpenAI',
                'status' => 'production',
                'stack' => ['Python 3.12+', 'OpenAI GPT-4', 'Poetry', 'Arquitectura Hexagonal'],
                'tags' => ['Python', 'OpenAI', 'Playwright', 'POM', 'Testing', 'E2E', 'IA'],
                'github' => 'https://github.com/joseguillermomoreu-gif/pom-ppia',
                'url' => null,
                'featured' => true,
                'highlights' => 'Arquitectura Hexagonal + SOLID, CLI interactiva con Rich UI, Type-safe con mypy',
            ],
            [
                'name' => 'Claude Code Auto-Skills',
                'description' => 'Sistema inteligente de skills auto-cargables para Claude Code que detecta tu stack tecnológico y carga automáticamente el contexto relevante',
                'status' => 'production',
                'stack' => ['Shell scripts', 'Context7 MCP', 'Bash'],
                'tags' => ['Claude Code', 'IA', 'Automation', 'Skills', 'Developer Tools', 'Bash'],
                'github' => 'https://github.com/joseguillermomoreu-gif/claude-code-auto-skills',
                'url' => null,
                'featured' => true,
                'highlights' => 'Auto-detección de stack, Zero-config, Auto-actualizable con Context7',
            ],
            [
                'name' => 'Portfolio',
                'description' => 'Portfolio web profesional con Symfony 6.4, Arquitectura Hexagonal, DDD y TDD estricto',
                'status' => 'production',
                'stack' => ['PHP 8.1+', 'Symfony 6.4', 'TypeScript', 'Playwright', 'CSS'],
                'tags' => ['PHP', 'Symfony', 'Hexagonal', 'DDD', 'TDD', 'Portfolio', 'Open Source'],
                'github' => 'https://github.com/joseguillermomoreu-gif/portfolio-public',
                'url' => 'https://josemoreupeso.es',
                'featured' => true,
                'highlights' => '100% cobertura tests, PHPStan level 9, CI/CD automático, Markdown rendering',
            ],
            [
                'name' => 'End2EndGuru99',
                'description' => 'Proyecto showcase donde se demuestran las capacidades de PPIA y POM-PPIA. Tests E2E sobre Guru99 generados automáticamente con las herramientas del ecosistema PPIA',
                'status' => 'showcase',
                'stack' => ['TypeScript', 'Playwright', 'Gherkin', 'JavaScript', 'Docker'],
                'tags' => ['Playground', 'PPIA', 'POM-PPIA', 'Playwright', 'E2E', 'Testing', 'Showcase', 'Demo'],
                'github' => 'https://github.com/joseguillermomoreu-gif/end2endGuru99',
                'url' => null,
                'featured' => true,
                'highlights' => 'Testing ground donde se publica la efectividad real de PPIA y sus herramientas. Casos de uso reales generados automáticamente',
            ],
            [
                'name' => 'PPIA',
                'description' => 'Playwright Page Inspector with AI - Herramienta que traduce especificaciones Gherkin en tests Playwright ejecutables usando Claude MCP y GPT-4',
                'status' => 'private',
                'stack' => ['Python', 'TypeScript', 'Playwright', 'OpenAI', 'Claude MCP'],
                'tags' => ['PPIA', 'Playwright', 'IA', 'Testing', 'E2E', 'OpenAI', 'Claude MCP'],
                'github' => null,
                'url' => null,
                'featured' => false,
                'highlights' => 'Herramienta lista y funcional. Siguiente paso: integrar con los tests reales de El Confidencial. Open-source planeado para Q2 2026',
            ],
        ];

        return $this->render('pages/portfolio/projects.html.twig', [
            'projects' => $projects,
        ]);
    }
}
