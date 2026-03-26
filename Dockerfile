# ─────────────────────────────────────────────────────────────
# josemoreupeso.es - Imagen de desarrollo y QA
# Playwright oficial (Chromium + fuentes + libs) + PHP 8.3
#
# Responsabilidades:
#   - Servidor PHP integrado (make up)
#   - PHPUnit, PHPStan, PHP CS Fixer (make test / make stan / make cs-check)
#   - ESLint TypeScript/Playwright (make lint)
#   - Tests E2E Playwright (make e2e)
# ─────────────────────────────────────────────────────────────
FROM mcr.microsoft.com/playwright:v1.58.1-jammy

ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=Europe/Madrid

# ── PHP 8.3 + extensiones necesarias ─────────────────────────
RUN apt-get update && apt-get install -y software-properties-common \
    && add-apt-repository ppa:ondrej/php -y \
    && apt-get update && apt-get install -y \
    php8.3-cli php8.3-xml php8.3-mbstring \
    php8.3-curl php8.3-zip php8.3-gd \
    && rm -rf /var/lib/apt/lists/*

ENV DEBIAN_FRONTEND=dialog

# ── Composer ─────────────────────────────────────────────────
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app

# ── Dependencias PHP (bakeadas en la imagen) ─────────────────
COPY composer.json composer.lock* ./
RUN composer install --optimize-autoloader --no-interaction

# ── Dependencias npm (Node.js ya incluido en la imagen base) ──
COPY package.json package-lock.json ./
RUN npm ci
# Chromium ya está en la imagen base, no hace falta playwright install

# ── Código fuente (sobrescrito por volumen en desarrollo) ─────
COPY . .

EXPOSE 8080

CMD ["php", "-S", "0.0.0.0:8080", "-t", "public", "public/index.php"]
