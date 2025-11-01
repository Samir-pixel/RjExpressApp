#!/bin/bash
# Скрипт для настройки деплоя на VPS
# Запустите на вашем сервере после клонирования репозитория

set -e

echo "🚀 Настройка production деплоя для RJ Express"

# Проверка что мы на сервере
if [ "$EUID" -ne 0 ]; then 
    echo "❌ Пожалуйста, запустите скрипт с sudo"
    exit 1
fi

# Установка необходимых пакетов
echo "📦 Установка зависимостей..."
apt update
apt install -y nginx certbot python3-certbot-nginx docker.io docker-compose-plugin git curl

# Создание директорий
echo "📁 Создание директорий..."
mkdir -p /opt/rjexpress
cd /opt/rjexpress

# Если репозиторий еще не клонирован
if [ ! -d "RjExpressApp" ]; then
    echo "📥 Клонирование репозитория..."
    git clone https://github.com/Samir-pixel/RjExpressApp.git
fi

cd RjExpressApp

# Копирование конфигурации Nginx
echo "⚙️  Настройка Nginx..."
cp nginx.conf /etc/nginx/sites-available/rjexpress

# Создание симлинка (после настройки домена)
# ln -s /etc/nginx/sites-available/rjexpress /etc/nginx/sites-enabled/
# nginx -t
# systemctl reload nginx

echo "✅ Базовая настройка завершена!"
echo ""
echo "📝 Следующие шаги:"
echo "1. Отредактируйте /etc/nginx/sites-available/rjexpress и замените 'yourdomain.com' на ваш домен"
echo "2. Создайте backend/.env.production с вашими переменными окружения"
echo "3. Настройте DNS записи для вашего домена (A record на IP сервера)"
echo "4. Запустите: sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com"
echo "5. Активируйте Nginx конфигурацию и перезапустите:"
echo "   sudo ln -s /etc/nginx/sites-available/rjexpress /etc/nginx/sites-enabled/"
echo "   sudo nginx -t"
echo "   sudo systemctl reload nginx"
echo "6. Запустите Docker контейнеры:"
echo "   docker compose -f docker-compose.prod.yml up -d --build"

