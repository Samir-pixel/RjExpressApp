# Переменные окружения для Vercel

Скопируйте и вставьте в Vercel → Project Settings → Environment Variables:

```env
BACKEND_URL=https://your-railway-backend-url.railway.app
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://rjexpressinc.io
```

**Важно:**
1. Замените `your-railway-backend-url.railway.app` на реальный URL из Railway
2. URL можно найти в Railway → Settings → Networking → Public Domain
3. **Убедитесь, что значение - это строка (в кавычках не нужно, просто URL)**
4. После добавления переменных, пересоберите проект в Vercel

**Примечание:** `NEXT_PUBLIC_BACKEND_URL` не требуется, так как используется только `BACKEND_URL` в API route.

## Шаги:

1. Деплой backend на Railway (получите URL)
2. Добавьте переменные в Vercel с реальным Railway URL
3. Деплой frontend на Vercel
4. Подключите домен `rjexpressinc.io`

