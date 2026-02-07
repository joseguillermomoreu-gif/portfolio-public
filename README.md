# 🎯 Portfolio Profesional - José Moreu Peso

**🚀 Showcase público de arquitectura y testing**

Portfolio web profesional desarrollado con **Symfony 6.4**, implementando **Arquitectura Hexagonal**, **Domain-Driven Design** y **TDD estricto**.

---

## 🌐 Sitio Web

**URL:** https://josemoreupeso.es

---

## 🏗️ Arquitectura

**Patrón:** Hexagonal (Ports & Adapters)
**Principios:** SOLID, DDD, Clean Code

```
src/
├── Domain/          # Lógica de negocio pura
│   └── Model/      # Entidades y Value Objects
├── Application/    # Casos de uso
│   └── Service/    # Servicios de aplicación
└── Infrastructure/ # Adaptadores
    ├── Persistence/ # Repositorios
    └── Http/        # Controllers
```

---

## 🧪 Testing

**Cobertura objetivo:** 100% en lógica de negocio

**Stack de testing:**
- **PHPUnit** - Tests unitarios e integración
- **PHPStan Level 9** - Análisis estático
- **Playwright + TypeScript** - Tests E2E

**Ejecutar tests:**
```bash
make test      # PHPUnit
make phpstan   # Análisis estático
make e2e       # Tests E2E
```

---

## 🚀 Stack Tecnológico

**Backend:**
- PHP 8.1+
- Symfony 6.4
- Doctrine ORM
- Twig 3.x

**Frontend:**
- Vanilla JavaScript
- CSS moderno (Grid, Flexbox)
- Lucide Icons

**DevOps:**
- Docker + Docker Compose
- GitHub Actions (CI/CD)
- Nginx + PHP-FPM

---

## 📦 Instalación Local

```bash
# Clonar repositorio
git clone https://github.com/joseguillermomoreu-gif/portfolio-public.git
cd portfolio-public

# Levantar con Docker
make dev

# Acceder en navegador
http://localhost:8080
```

**Comandos disponibles:**
```bash
make dev       # Todo en uno: build + install + up
make test      # Ejecutar tests
make phpstan   # Análisis estático
make help      # Ver todos los comandos
```

---

## 🎯 Bounded Contexts

### Portfolio Context
- Información personal y profesional
- Skills y tecnologías
- Experiencia y CV

### VibeCoding Context
- Blog técnico con artículos
- Reflexiones sobre arquitectura
- Proyectos y experimentos

---

## 📊 Metodología TDD

Este proyecto se desarrolla siguiendo **TDD estricto**:

1. **RED** → Escribir test que falla
2. **GREEN** → Implementación mínima
3. **REFACTOR** → Mejorar código

---

## 📞 Contacto

**José Moreu Peso**
- 🌐 Web: https://josemoreupeso.es
- 💼 LinkedIn: [José Moreu Peso](https://www.linkedin.com/in/josemoreupeso)
- 🐙 GitHub: [@joseguillermomoreu-gif](https://github.com/joseguillermomoreu-gif)

---

## 📝 Licencia

Este proyecto es un portfolio profesional de código abierto.

---

**🎯 Desarrollado con TDD estricto + Arquitectura Hexagonal + SOLID** 🚀

*Nota: Este es el repositorio público del proyecto. La infraestructura de deployment y configuraciones sensibles se mantienen en repositorio privado.*
