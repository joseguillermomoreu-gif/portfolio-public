# josemoreupeso.es - Portfolio profesional con DDD
# Detecta Docker automáticamente y hace TODO

# Colores para output
RED = \033[0;31m
GREEN = \033[0;32m
YELLOW = \033[1;33m
BLUE = \033[0;34m
NC = \033[0m

# Detectar Docker y docker-compose
DOCKER := $(shell command -v docker 2> /dev/null)
DOCKER_COMPOSE := $(shell command -v docker-compose 2> /dev/null)
DOCKER_COMPOSE_CMD := $(if $(DOCKER_COMPOSE),docker-compose,docker compose)

# Configuración
PORT = 8080
CONTAINER_NAME = josemoreupeso-es

# Detectar si estamos en Docker o local
ifdef DOCKER
    COMPOSE_PREFIX = $(DOCKER_COMPOSE_CMD)
    EXEC_PREFIX = $(DOCKER_COMPOSE_CMD) run --rm web
else
    COMPOSE_PREFIX = 
    EXEC_PREFIX = 
endif

.DEFAULT_GOAL := help

help: ## Mostrar esta ayuda
	@echo "$(BLUE)🎯 josemoreupeso.es - Comandos disponibles:$(NC)"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "$(GREEN)  %-15s$(NC) %s\n", $$1, $$2}'
	@echo ""
	@echo "$(YELLOW)📁 Proyecto: josemoreupeso.es$(NC)"
	@echo "$(YELLOW)🌐 URL: http://localhost:$(PORT)$(NC)"

check-docker: ## Verificar que Docker esté instalado
ifdef DOCKER
	@echo "$(GREEN)✓ Docker encontrado$(NC)"
else
	@echo "$(RED)❌ Docker no encontrado. Instalando...$(NC)"
	@sudo apt update && sudo apt install -y docker.io docker-compose-plugin
	@sudo usermod -aG docker $$USER
	@echo "$(YELLOW)⚠️ Reinicia la sesión para usar Docker$(NC)"
endif

build: check-docker ## Construir imagen Docker
	@echo "$(YELLOW)🐳 Construyendo imagen Docker...$(NC)"
	@$(COMPOSE_PREFIX) build
	@echo "$(GREEN)✓ Imagen construida$(NC)"

install: ## Instalar dependencias PHP con Composer
	@echo "$(YELLOW)📦 Instalando dependencias...$(NC)"
ifdef DOCKER
	@$(EXEC_PREFIX) composer install --optimize-autoloader
else
	@composer install --optimize-autoloader
endif
	@echo "$(GREEN)✓ Dependencias instaladas$(NC)"

up: ## Levantar servidor
	@echo "$(YELLOW)🚀 Iniciando servidor en http://localhost:$(PORT)...$(NC)"
	@$(COMPOSE_PREFIX) up -d
	@echo "$(GREEN)✓ Servidor iniciado$(NC)"
	@echo "$(BLUE)🌐 Abre: http://localhost:$(PORT)$(NC)"

down: ## Detener servidor
	@echo "$(YELLOW)🛑 Deteniendo servidor...$(NC)"
	@$(COMPOSE_PREFIX) down
	@echo "$(GREEN)✓ Servidor detenido$(NC)"

logs: ## Ver logs del servidor
	@$(COMPOSE_PREFIX) logs -f

restart: down up ## Reiniciar servidor

status: ## Ver estado del contenedor
	@$(COMPOSE_PREFIX) ps

shell: ## Acceder al contenedor
	@$(COMPOSE_PREFIX) run --rm web bash

clean: down ## Limpiar contenedores y volúmenes
	@echo "$(YELLOW)🧹 Limpiando...$(NC)"
	@$(COMPOSE_PREFIX) down -v
	@docker system prune -f 2>/dev/null || true
	@echo "$(GREEN)✓ Limpieza completada$(NC)"

reset: clean ## Reset completo - borra vendor y reinstala todo
	@echo "$(YELLOW)🔄 Reset completo...$(NC)"
	@rm -rf vendor/ composer.lock var/cache/*
	@$(MAKE) build
	@$(MAKE) install
	@$(MAKE) up
	@echo "$(GREEN)✓ Reset completado$(NC)"

dev: build install up ## Comando completo: construir + instalar + levantar
	@echo ""
	@echo "$(GREEN)🎉 ¡josemoreupeso.es listo!$(NC)"
	@echo "$(BLUE)🌐 URL: http://localhost:$(PORT)$(NC)"
	@echo "$(YELLOW)🛑 Detener: make down$(NC)"

test-routes: ## Probar que las rutas responden
	@sleep 2
	@curl -s http://localhost:$(PORT) | head -10 || echo "$(RED)❌ No responde$(NC)"

# Comandos de mantenimiento
update: ## Actualizar dependencias
	@echo "$(YELLOW)📦 Actualizando dependencias...$(NC)"
	@$(EXEC_PREFIX) composer update
	@echo "$(GREEN)✓ Dependencias actualizadas$(NC)"

cache-clear: ## Limpiar caché de Symfony
	@echo "$(YELLOW)🧹 Limpiando caché...$(NC)"
	@$(EXEC_PREFIX) php bin/console cache:clear
	@echo "$(GREEN)✓ Caché limpiado$(NC)"

# Aliases para compatibilidad
serve: up ## Alias para 'up'
stop: down ## Alias para 'down'

# Si no hay Docker, usar PHP local
local-serve: ## Servidor PHP local (fallback)
	@echo "$(YELLOW)🐘 Iniciando servidor PHP local...$(NC)"
	@echo "$(BLUE)🌐 URL: http://localhost:$(PORT)$(NC)"
	@php -S localhost:$(PORT) -t public

local-install: ## Composer local (fallback)
	@composer install --optimize-autoloader

.PHONY: help build install up down logs restart status shell clean reset dev test-routes update cache-clear serve stop local-serve local-install check-docker
