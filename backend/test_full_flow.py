"""
Полный тест работоспособности лендинга:
1. Проверка backend API
2. Тест отправки формы в Telegram
"""
import os
import httpx
import json
from dotenv import load_dotenv

load_dotenv()

BACKEND_URL = "http://localhost:8000"
TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID")

def test_backend_health():
    """Тест 1: Проверка доступности backend"""
    print("\n🔍 Тест 1: Проверка backend сервера...")
    try:
        response = httpx.get(f"{BACKEND_URL}/health", timeout=5.0)
        if response.status_code == 200:
            print("✅ Backend сервер работает!")
            print(f"   Ответ: {response.json()}")
            return True
        else:
            print(f"❌ Backend вернул код {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Не удалось подключиться к backend: {e}")
        print(f"   Убедитесь, что backend запущен на {BACKEND_URL}")
        return False

def test_telegram_config():
    """Тест 2: Проверка конфигурации Telegram"""
    print("\n🔍 Тест 2: Проверка конфигурации Telegram...")
    
    if not TELEGRAM_BOT_TOKEN:
        print("❌ TELEGRAM_BOT_TOKEN не найден в .env файле")
        return False
    
    if not TELEGRAM_CHAT_ID:
        print("❌ TELEGRAM_CHAT_ID не найден в .env файле")
        print("   Запустите: python get_chat_id.py")
        return False
    
    print(f"✅ TELEGRAM_BOT_TOKEN: {TELEGRAM_BOT_TOKEN[:10]}...")
    print(f"✅ TELEGRAM_CHAT_ID: {TELEGRAM_CHAT_ID}")
    return True

def test_lead_submission():
    """Тест 3: Отправка тестовой заявки через API"""
    print("\n🔍 Тест 3: Отправка тестовой заявки...")
    
    test_lead = {
        "name": "Тестовый пользователь",
        "phone": "+1234567890",
        "experience": "5 лет",
        "message": "Это тестовая заявка для проверки работы системы"
    }
    
    try:
        response = httpx.post(
            f"{BACKEND_URL}/lead",
            json=test_lead,
            timeout=15.0
        )
        
        if response.status_code == 200:
            result = response.json()
            print("✅ Заявка успешно отправлена!")
            print(f"   Ответ сервера: {json.dumps(result, indent=2, ensure_ascii=False)}")
            
            # Проверяем статус Telegram
            status = result.get("status", {})
            if isinstance(status, dict):
                telegram_status = status.get("telegram", False)
                if telegram_status:
                    print("✅ Сообщение успешно отправлено в Telegram!")
                else:
                    print("⚠️  Сообщение НЕ отправлено в Telegram")
                    print("   Проверьте:")
                    print("   1. Правильность TELEGRAM_BOT_TOKEN")
                    print("   2. Правильность TELEGRAM_CHAT_ID")
                    print("   3. Что вы начали диалог с ботом")
                    print("   4. Запустите: python get_chat_id.py для получения правильного Chat ID")
            
            return True
        else:
            print(f"❌ Ошибка отправки заявки: {response.status_code}")
            print(f"   Ответ: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Ошибка при отправке заявки: {e}")
        return False

def test_frontend_api_route():
    """Тест 4: Проверка через Next.js API route (если frontend запущен)"""
    print("\n🔍 Тест 4: Проверка через Next.js API route...")
    
    frontend_url = "http://localhost:3000/api/lead"
    test_lead = {
        "name": "Тест через Frontend API",
        "phone": "+1987654321",
        "experience": "3 года",
        "message": "Тест через Next.js API route"
    }
    
    try:
        response = httpx.post(
            frontend_url,
            json=test_lead,
            timeout=15.0
        )
        
        if response.status_code == 200:
            result = response.json()
            print("✅ Заявка через Frontend API успешно отправлена!")
            print(f"   Ответ: {json.dumps(result, indent=2, ensure_ascii=False)}")
            return True
        else:
            print(f"⚠️  Frontend не запущен или вернул ошибку: {response.status_code}")
            print(f"   Убедитесь, что frontend запущен на http://localhost:3000")
            return False
            
    except Exception as e:
        print(f"⚠️  Frontend API недоступен: {e}")
        print("   Это нормально, если frontend не запущен")
        return None  # Не критично

def main():
    print("=" * 60)
    print("🚀 ПОЛНОЕ ТЕСТИРОВАНИЕ ЛЕНДИНГА")
    print("=" * 60)
    
    results = []
    
    # Тест 1: Backend health
    results.append(("Backend Health", test_backend_health()))
    
    # Тест 2: Telegram config
    results.append(("Telegram Config", test_telegram_config()))
    
    # Тест 3: Lead submission
    if results[0][1] and results[1][1]:  # Если backend и Telegram настроены
        results.append(("Lead Submission", test_lead_submission()))
    
    # Тест 4: Frontend API (опционально)
    frontend_result = test_frontend_api_route()
    if frontend_result is not None:
        results.append(("Frontend API", frontend_result))
    
    # Итоги
    print("\n" + "=" * 60)
    print("📊 ИТОГИ ТЕСТИРОВАНИЯ")
    print("=" * 60)
    
    for test_name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status} - {test_name}")
    
    all_passed = all(result for _, result in results)
    
    if all_passed:
        print("\n🎉 Все тесты пройдены! Лендинг готов к работе!")
    else:
        print("\n⚠️  Некоторые тесты не прошли. Проверьте конфигурацию.")
    
    print("\n📝 Инструкция для проверки в браузере:")
    print("   1. Откройте http://localhost:3000")
    print("   2. Прокрутите до формы 'Join Our Team'")
    print("   3. Заполните форму и отправьте")
    print("   4. Проверьте Telegram - должно прийти сообщение!")

if __name__ == "__main__":
    main()

