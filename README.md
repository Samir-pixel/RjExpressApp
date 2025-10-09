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
docker compose up --build
```

## Env

backend/.env
```
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
WHATSAPP_API_KEY=
```


