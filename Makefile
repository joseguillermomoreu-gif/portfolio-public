# josemoreupeso.es - Portfolio profesional con DDD
# Imagen única: PHP 8.1 + Node.js 20 + Playwright

# Colores para output
RED    = \033[0;31m
GREEN  = \033[0;32m
YELLOW = \033[1;33m
BLUE   = \033[0;34m
NC     = \033[0m

# docker compose v2 (prioridad) o v1
DOCKER_COMPOSE := $(shell docker compose version >/dev/null 2>&1 && echo "docker compose" || echo "docker-compose")

# Prefijo único para ejecutar comandos dentro del contenedor
EXEC = $(DOCKER_COMPOSE) exec -T web

PORT = 8080

.DEFAULT_GOAL := help

# ── Ayuda ────────────────────────────────────────────────────

help: ## Mostrar esta ayuda
	@echo "$(BLUE)🎯 josemoreupeso.es - Comandos disponibles:$(NC)"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "$(GREEN)  %-22s$(NC) %s\n", $$1, $$2}'
	@echo ""
	@echo "$(YELLOW)🌐 URL: http://localhost:$(PORT)$(NC)"

# ── Ciclo de vida del contenedor ─────────────────────────────

build: ## Construir imagen Docker (PHP + Node.js + Playwright)
	@echo "$(YELLOW)🐳 Construyendo imagen...$(NC)"
	@$(DOCKER_COMPOSE) build
	@echo "$(GREEN)✓ Imagen construida$(NC)"

up: ## Levantar servidor
	@echo "$(YELLOW)🚀 Iniciando servidor en http://localhost:$(PORT)...$(NC)"
	@$(DOCKER_COMPOSE) up -d
	@echo "$(GREEN)✓ Servidor iniciado → http://localhost:$(PORT)$(NC)"

down: ## Detener servidor
	@echo "$(YELLOW)🛑 Deteniendo servidor...$(NC)"
	@$(DOCKER_COMPOSE) down
	@echo "$(GREEN)✓ Servidor detenido$(NC)"

restart: down up ## Reiniciar servidor

logs: ## Ver logs del servidor
	@$(DOCKER_COMPOSE) logs -f

status: ## Ver estado del contenedor
	@$(DOCKER_COMPOSE) ps

shell: ## Abrir shell en el contenedor
	@$(DOCKER_COMPOSE) exec web bash

clean: ## Limpiar contenedores, volúmenes y caché Docker
	@echo "$(YELLOW)🧹 Limpiando...$(NC)"
	@$(DOCKER_COMPOSE) down -v
	@docker system prune -f 2>/dev/null || true
	@echo "$(GREEN)✓ Limpieza completada$(NC)"

dev: build up ## Construir imagen y levantar servidor

# ── QA: PHP ──────────────────────────────────────────────────

test: ## PHPUnit (dentro del contenedor)
	@echo "$(YELLOW)🧪 Ejecutando PHPUnit...$(NC)"
	@$(EXEC) vendor/bin/phpunit tests --testdox --no-coverage
	@echo "$(GREEN)✓ Tests completados$(NC)"

phpstan: ## PHPStan level 9 (dentro del contenedor)
	@echo "$(YELLOW)🔍 Ejecutando PHPStan...$(NC)"
	@$(EXEC) vendor/bin/phpstan analyse src tests --level 9 --no-progress --memory-limit=256M
	@echo "$(GREEN)✓ PHPStan completado$(NC)"

stan: phpstan ## Alias para phpstan

cs-fix: ## PHP CS Fixer - corregir estilo (dentro del contenedor)
	@echo "$(YELLOW)🎨 Corrigiendo estilo de código...$(NC)"
	@$(EXEC) vendor/bin/php-cs-fixer fix --config=.php-cs-fixer.php
	@echo "$(GREEN)✓ Estilo corregido$(NC)"

cs-check: ## PHP CS Fixer - verificar sin cambios (dentro del contenedor)
	@echo "$(YELLOW)🎨 Verificando estilo de código...$(NC)"
	@$(EXEC) vendor/bin/php-cs-fixer fix --dry-run --diff --config=.php-cs-fixer.php
	@echo "$(GREEN)✓ Estilo verificado$(NC)"

# ── QA: E2E / ESLint ─────────────────────────────────────────

lint: ## ESLint TypeScript/Playwright (dentro del contenedor)
	@echo "$(YELLOW)🔍 Ejecutando ESLint...$(NC)"
	@$(EXEC) npm run lint
	@echo "$(GREEN)✓ ESLint completado$(NC)"

lint-fix: ## ESLint - auto-corregir (dentro del contenedor)
	@echo "$(YELLOW)🔍 Corrigiendo ESLint...$(NC)"
	@$(EXEC) npm run lint:fix
	@echo "$(GREEN)✓ ESLint corregido$(NC)"

e2e: ## Tests E2E Playwright contra servidor local (dentro del contenedor)
	@echo "$(YELLOW)🎭 Ejecutando tests E2E...$(NC)"
	@$(DOCKER_COMPOSE) exec -T -e BASE_URL=http://localhost:$(PORT) web npm test
	@echo "$(GREEN)✓ Tests E2E completados$(NC)"

e2e-prod: ## Tests E2E Playwright contra producción (https://josemoreupeso.es)
	@echo "$(YELLOW)🎭 Ejecutando tests E2E contra producción...$(NC)"
	@$(DOCKER_COMPOSE) exec -T -e BASE_URL=https://josemoreupeso.es web npm test
	@echo "$(GREEN)✓ Tests E2E producción completados$(NC)"

e2e-update-snapshots: ## Actualizar baselines de visual regression
	@echo "$(YELLOW)📸 Actualizando snapshots de visual regression...$(NC)"
	@$(DOCKER_COMPOSE) exec -T -e BASE_URL=http://localhost:$(PORT) web npx playwright test -u
	@echo "$(GREEN)✓ Snapshots actualizados$(NC)"

e2e-report: ## Abrir reporte HTML de Playwright
	@$(EXEC) npm run test:report

# ── QA completo ───────────────────────────────────────────────

qa: test phpstan cs-check lint ## QA completo: PHPUnit + PHPStan + CS Fixer + ESLint
	@echo ""
	@echo "$(GREEN)✅ QA completo pasado$(NC)"

qa-full: qa e2e ## QA completo + E2E (requiere servidor activo)
	@echo ""
	@echo "$(GREEN)✅ QA completo + E2E pasado$(NC)"

# ── Mantenimiento ─────────────────────────────────────────────

cache-clear: ## Limpiar caché de Symfony
	@echo "$(YELLOW)🧹 Limpiando caché...$(NC)"
	@$(EXEC) php bin/console cache:clear
	@echo "$(GREEN)✓ Caché limpiado$(NC)"

update: ## Actualizar dependencias PHP
	@echo "$(YELLOW)📦 Actualizando dependencias...$(NC)"
	@$(EXEC) composer update
	@echo "$(GREEN)✓ Dependencias actualizadas$(NC)"

# ── Deploy Release ────────────────────────────────────────────

deploy-release: ## Release completa: PR + QA + version + deploy SSH + backmerge
	@.github/scripts/deploy-release.sh

deploy-release-fast: ## Release sin E2E (solo QA PHP + ESLint)
	@.github/scripts/deploy-release.sh --skip-e2e --skip-e2e-prod

# ── Aliases ───────────────────────────────────────────────────

serve: up    ## Alias para 'up'
stop: down   ## Alias para 'down'

.PHONY: help build up down restart logs status shell clean dev \
        test phpstan stan cs-fix cs-check \
        lint lint-fix e2e e2e-prod e2e-update-snapshots e2e-report \
        qa qa-full cache-clear update serve stop \
        deploy-release deploy-release-fast
