# Настройка Telegram Бота

## Шаг 1: Получение правильного Chat ID

**Проблема**: Ваш текущий Chat ID (`8122687393`) - это ID бота, а не пользователя/группы.

### Вариант 1: Автоматический способ (рекомендуется)

1. Откройте Telegram
2. Найдите вашего бота: `@Rjexpresshrbot` (или используйте ссылку из BotFather)
3. **Нажмите "Start" или отправьте любое сообщение боту**
4. Запустите скрипт:
   ```bash
   cd backend
   python get_chat_id.py
   ```
5. Скопируйте Chat ID из вывода
6. Обновите `backend/.env`:
   ```env
   TELEGRAM_CHAT_ID=<ваш_правильный_chat_id>
   ```

### Вариант 2: Ручной способ

1. Откройте Telegram
2. Найдите бота `@userinfobot` и напишите ему
3. Он покажет ваш Chat ID
4. Или используйте бота `@RawDataBot` - добавьте его в группу или личный чат

### Вариант 3: Через веб-интерфейс

1. Откройте в браузере:
   ```
   https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates
   ```
2. Найдите `"chat":{"id":` в ответе
3. Используйте этот ID

## Шаг 2: Обновление .env файла

Убедитесь, что `backend/.env` содержит:

```env
TELEGRAM_BOT_TOKEN=8122687393:AAEY6jIPIojjPGHSQb9HS89zS1tXOW1klXs
TELEGRAM_CHAT_ID=<ВАШ_ПРАВИЛЬНЫЙ_CHAT_ID>
```

**Важно**: Chat ID должен быть числом (может быть отрицательным для групп), например: `123456789` или `-987654321`

## Шаг 3: Тестирование

1. Убедитесь, что backend сервер запущен:
   ```bash
   cd backend
   python -m uvicorn main:app --reload
   ```

2. Запустите тест:
   ```bash
   python test_telegram.py
   ```

3. Если все правильно, вы увидите:
   ```
   ✅ Bot found: @Rjexpresshrbot
   ✅ Test message sent successfully!
   ```

4. Проверьте Telegram - должно прийти тестовое сообщение

## Шаг 4: Проверка работы формы

1. Запустите frontend сервер:
   ```bash
   cd frontend
   npm run dev
   ```

2. Откройте http://localhost:3000
3. Заполните форму "Join Our Team"
4. Отправьте заявку
5. Проверьте Telegram - должно прийти сообщение с данными заявки

## Типичные ошибки

### "Forbidden: bots can't send messages to bots"
- **Причина**: Chat ID = ID бота
- **Решение**: Используйте Chat ID пользователя/группы

### "chat not found"
- **Причина**: Chat ID неправильный или бот заблокирован
- **Решение**: Убедитесь, что вы написали боту и используете правильный Chat ID

### Backend не отвечает
- **Причина**: Backend сервер не запущен
- **Решение**: Запустите `python -m uvicorn main:app --reload` в папке backend

