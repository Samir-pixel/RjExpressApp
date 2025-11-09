# Переменные окружения для Vercel

## ⚠️ КРИТИЧЕСКИ ВАЖНО: BACKEND_URL

**Без этой переменной форма не будет работать!** Вы получите ошибку `404. Not Found`.

Скопируйте и вставьте в Vercel → Project Settings → Environment Variables:

```env
BACKEND_URL=https://your-railway-backend-url.railway.app
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://rjexpressinc.io
```

**Важно:**
1. **BACKEND_URL** - ОБЯЗАТЕЛЬНАЯ переменная! Замените `your-railway-backend-url.railway.app` на реальный URL из Railway
2. URL можно найти в Railway → Settings → Networking → Public Domain
3. **Убедитесь, что значение - это строка (в кавычках не нужно, просто URL)**
4. URL должен начинаться с `https://` (не `http://`)
5. После добавления переменных, **ОБЯЗАТЕЛЬНО пересоберите проект** в Vercel (Redeploy)

**Пример правильного значения:**
```
BACKEND_URL=https://rj-express-backend-production.railway.app
```

**Неправильные примеры:**
```
BACKEND_URL=http://rj-express-backend-production.railway.app  ❌ (без https)
BACKEND_URL="https://rj-express-backend-production.railway.app"  ❌ (с кавычками)
BACKEND_URL=rj-express-backend-production.railway.app  ⚠️ (без https:// - будет автоматически добавлен, но лучше указать явно)
BACKEND_URL=https://rj-express-backend-production.railway.app/  ⚠️ (со слешем в конце - будет удален автоматически)
```

**Примечание:** Если вы забыли указать `https://`, код автоматически добавит его, но **рекомендуется указывать полный URL с протоколом** для избежания проблем.

**Примечание:** `NEXT_PUBLIC_BACKEND_URL` не требуется, так как используется только `BACKEND_URL` в API route.

## Шаги:

1. Деплой backend на Railway (получите URL)
2. Добавьте переменные в Vercel с реальным Railway URL
3. Деплой frontend на Vercel
4. Подключите домен `rjexpressinc.io`

