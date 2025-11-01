# Как запустить Backend сервер

## Проблема
Backend сервер должен быть запущен для обработки заявок из формы.

## Решение

### Шаг 1: Откройте новый терминал

Не используйте тот же терминал, где запущен frontend.

### Шаг 2: Перейдите в папку backend

```bash
cd backend
```

### Шаг 3: Запустите сервер

```bash
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

Или используйте PowerShell скрипт:

```powershell
.\run.ps1
```

### Шаг 4: Проверьте, что сервер запущен

Вы должны увидеть:
```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

### Шаг 5: Проверьте работу

Откройте в браузере: http://localhost:8000/health

Должен вернуться ответ:
```json
{"status":"ok"}
```

### Шаг 6: Теперь форма будет работать

1. Убедитесь, что frontend запущен (в другом терминале)
2. Откройте http://localhost:3000
3. Заполните форму "Join Our Team"
4. Отправьте заявку
5. Проверьте Telegram - должно прийти сообщение!

## Проверка работы Telegram интеграции

В терминале backend вы увидите логи:
```
✅ Telegram message sent successfully to chat 1385241437
```

Если видите ошибки, проверьте:
1. Правильно ли указан TELEGRAM_CHAT_ID в .env
2. Запущен ли backend сервер
3. Открыт ли Telegram и доступен ли интернет

