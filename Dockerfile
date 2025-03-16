FROM thecodingmachine/php:8.3-v4-fpm-node20

ENV PHP_EXTENSION_INTL=1 \
    APACHE_DOCUMENT_ROOT=/var/www/html/public

WORKDIR /var/www/html

USER root

COPY composer.* .

RUN composer install --no-dev --no-scripts --no-autoloader

COPY . .

# Yetkiyi docker kullanıcısına ver
RUN chown -R docker:docker /var/www/html
# Yeniden docker kullanıcısına geç
USER docker

RUN composer dump-autoload --optimize

EXPOSE 9000

ENV APACHE_RUN_USER=www-data \
    APACHE_RUN_GROUP=www-data

CMD ["php-fpm"]
