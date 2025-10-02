FROM php:8.2-fpm

# Install dependencies
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    unzip \
    git \
    curl \
    && docker-php-ext-install pdo_mysql gd

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY . .

# Install dependencies + optimize
RUN composer install --no-dev --optimize-autoloader \
    && php artisan key:generate \
    && php artisan storage:link

# Saat container jalan -> migrate & seed
CMD php artisan migrate --force && php artisan db:seed --force && php-fpm
