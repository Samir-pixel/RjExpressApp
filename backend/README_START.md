# 🚀 Как правильно запустить Backend

## ❌ Проблема:
Если видите ошибку: `ERROR: Error loading ASGI app. Could not import module "main"`
Это значит, что uvicorn запущен из неправильной директории!

## ✅ Правильный способ запуска:

### Вариант 1: Использовать PowerShell скрипт (рекомендуется)
```powershell
cd backend
.\start_server.ps1
```
или
```powershell
cd backend
.\run.ps1
```

### Вариант 2: Вручную
```powershell
# ВАЖНО: сначала перейдите в папку backend!
cd backend

# Проверьте, что вы в правильной директории:
# Вы должны увидеть файлы: main.py, requirements.txt
dir main.py

# Теперь запустите:
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

## ✅ Правильный вывод должен быть:
```
INFO:     Will watch for changes in these directories: ['C:\\Users\\radzh\\RjExpressInc\\backend']
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

## ❌ Неправильный вывод (если запущено из корня):
```
ERROR: Error loading ASGI app. Could not import module "main".
```

## 🔍 Проверка:

1. **Проверьте текущую директорию:**
   ```powershell
   pwd
   # Должно быть: C:\Users\radzh\RjExpressInc\backend
   ```

2. **Проверьте наличие main.py:**
   ```powershell
   Test-Path main.py
   # Должно вернуть: True
   ```

3. **Проверьте работу сервера:**
   - Откройте: http://localhost:8000/health
   - Должен вернуться: `{"status":"ok"}`

4. **Проверьте логи:**
   После отправки формы вы должны увидеть в терминале backend запросы:
   ```
   INFO:     127.0.0.1:xxxxx - "POST /lead HTTP/1.1" 200 OK
   ```

## 🎯 Быстрый тест:
```powershell
cd backend
python test_lead_endpoint.py
```

Если видите `✅ Success! Telegram notification sent!` - все работает!


