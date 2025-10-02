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

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copy composer files 
COPY composer.json composer.lock ./

# Install dependencies
RUN composer install --no-dev --optimize-autoloader

# Copy project Laravel
COPY . .

# Copy env file ke container
COPY .env.example .env

# Generate key, migrate, dan seeder
RUN php artisan key:generate \
    && php artisan storage:link \
    && php artisan migrate --seed --force

CMD ["php-fpm"]
