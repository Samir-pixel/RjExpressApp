# RJ Express Landing

Monorepo: Next.js frontend + FastAPI backend.

## Structure

frontend/
- Next.js (App Router), TypeScript, Tailwind CSS, i18next, framer-motion, react-hook-form, zod, mapbox-gl

backend/
- FastAPI, Pydantic v2, Uvicorn, python-dotenv

## Dev

Frontend:
```bash
cd frontend
npm run dev
```

Backend:
```bash
cd backend
python -m venv .venv && .\.venv\Scripts\activate
pip install -r requirements.txt
./run.ps1
```

Docker Compose:
```bash
# Сборка и запуск
docker compose up --build

# Запуск в фоновом режиме
docker compose up -d --build

# Просмотр логов
docker compose logs -f

# Остановка
docker compose down
```

📚 Подробная инструкция по Docker: см. [DOCKER_SETUP.md](DOCKER_SETUP.md)

## 🚀 Деплой на Production

📖 Полная инструкция по деплою: см. [DEPLOYMENT_RAILWAY_VERCEL.md](DEPLOYMENT_RAILWAY_VERCEL.md)

### Быстрый старт (Railway + Vercel):
1. **Backend на Railway**: Импортируйте репозиторий, укажите Root Directory: `backend`, добавьте переменные из [RAILWAY_ENV_VARS.md](RAILWAY_ENV_VARS.md)
2. **Frontend на Vercel**: Импортируйте репозиторий, укажите Root Directory: `frontend`, добавьте переменные из [VERCEL_ENV_VARS.md](VERCEL_ENV_VARS.md) с Railway URL
3. **Домен**: Подключите `rjexpressinc.io` в Vercel и настройте DNS

Детали: см. [DEPLOYMENT_RAILWAY_VERCEL.md](DEPLOYMENT_RAILWAY_VERCEL.md)

## Env

### Backend Environment Variables

Create `backend/.env` file:

```env
TELEGRAM_BOT_TOKEN=8122687393:AAEY6jIPIojjPGHSQb9HS89zS1tXOW1klXs
TELEGRAM_CHAT_ID=YOUR_CHAT_ID_HERE
WHATSAPP_API_KEY=
```

### Getting Telegram Chat ID

1. Start a conversation with your bot in Telegram
2. Send any message to your bot
3. Run the helper script:
   ```bash
   cd backend
   python get_chat_id.py
   ```
4. Copy the `Chat ID` from the output and add it to `backend/.env` as `TELEGRAM_CHAT_ID`

Alternatively, you can get your chat ID manually:
- For personal chats: Start a chat with @userinfobot
- For group chats: Add @RawDataBot to your group, it will show the chat ID

### Testing Telegram Integration

After setting up the `.env` file:
1. Start the backend server
2. Submit a form from the "Join Our Team" section
3. Check your Telegram chat - you should receive a formatted message with the lead details


