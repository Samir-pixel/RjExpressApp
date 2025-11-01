# Переменные окружения для Railway

Скопируйте и вставьте в Railway → Settings → Variables:

```env
TELEGRAM_BOT_TOKEN=8122687393:AAEY6jIPIojjPGHSQb9HS89zS1tXOW1klXs
TELEGRAM_CHAT_ID=1385241437
WHATSAPP_API_KEY=
ENVIRONMENT=production
ALLOWED_ORIGINS=https://rjexpressinc.io,https://www.rjexpressinc.io,https://rjexpressinc.vercel.app
PORT=8000
```

**Важно:**
1. После деплоя на Vercel, обновите `ALLOWED_ORIGINS` и добавьте временный Vercel URL
2. После подключения постоянного домена, обновите `ALLOWED_ORIGINS` на только ваш домен

