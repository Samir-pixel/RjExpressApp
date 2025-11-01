"""
Test script to verify Telegram bot integration.
This will help diagnose issues with message sending.
"""

import os
import httpx
from dotenv import load_dotenv

load_dotenv()

BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
CHAT_ID = os.getenv("TELEGRAM_CHAT_ID")

print("🔍 Testing Telegram Bot Configuration\n")
print(f"BOT_TOKEN: {BOT_TOKEN[:20]}..." if BOT_TOKEN else "❌ BOT_TOKEN: NOT SET")
print(f"CHAT_ID: {CHAT_ID}\n")

if not BOT_TOKEN:
    print("❌ Error: TELEGRAM_BOT_TOKEN not found in .env file")
    exit(1)

if not CHAT_ID:
    print("❌ Error: TELEGRAM_CHAT_ID not found in .env file")
    exit(1)

# Test 1: Check bot info
print("📋 Test 1: Checking bot info...")
try:
    url = f"https://api.telegram.org/bot{BOT_TOKEN}/getMe"
    response = httpx.get(url, timeout=10.0)
    response.raise_for_status()
    data = response.json()
    
    if data.get("ok"):
        bot_info = data.get("result", {})
        print(f"✅ Bot found: @{bot_info.get('username')} ({bot_info.get('first_name')})")
    else:
        print(f"❌ Error: {data.get('description', 'Unknown error')}")
        exit(1)
except Exception as e:
    print(f"❌ Error checking bot: {e}")
    exit(1)

# Test 2: Get recent updates to find correct chat ID
print("\n📋 Test 2: Finding recent chats...")
try:
    url = f"https://api.telegram.org/bot{BOT_TOKEN}/getUpdates"
    response = httpx.get(url, timeout=10.0)
    response.raise_for_status()
    data = response.json()
    
    if data.get("ok"):
        updates = data.get("result", [])
        if updates:
            print(f"✅ Found {len(updates)} recent message(s)")
            for i, update in enumerate(updates[-3:], 1):  # Show last 3
                chat = update.get("message", {}).get("chat", {})
                chat_id = chat.get("id")
                chat_type = chat.get("type")
                chat_name = chat.get("title") or chat.get("first_name") or chat.get("username") or "Unknown"
                print(f"   {i}. Chat ID: {chat_id}, Type: {chat_type}, Name: {chat_name}")
            
            # Get the most recent chat ID
            latest_chat_id = updates[-1].get("message", {}).get("chat", {}).get("id")
            if str(latest_chat_id) != str(CHAT_ID):
                print(f"\n⚠️  Warning: Your CHAT_ID ({CHAT_ID}) doesn't match the latest chat ({latest_chat_id})")
                print(f"   Consider updating your .env file to: TELEGRAM_CHAT_ID={latest_chat_id}")
        else:
            print("⚠️  No recent messages found. Send a message to your bot first.")
except Exception as e:
    print(f"⚠️  Warning checking updates: {e}")

# Test 3: Try sending a test message
print(f"\n📋 Test 3: Sending test message to chat ID {CHAT_ID}...")
try:
    url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
    test_message = "🧪 Test message from RJ Express backend"
    
    response = httpx.post(
        url,
        json={
            "chat_id": CHAT_ID,
            "text": test_message,
            "parse_mode": "HTML"
        },
        timeout=10.0
    )
    response.raise_for_status()
    data = response.json()
    
    if data.get("ok"):
        print("✅ Test message sent successfully!")
        print("   Check your Telegram chat to verify.")
    else:
        print(f"❌ Failed to send message: {data.get('description', 'Unknown error')}")
        if "chat not found" in str(data.get("description", "")).lower():
            print("\n💡 Possible issues:")
            print("   1. Chat ID is incorrect")
            print("   2. You haven't started a conversation with the bot")
            print("   3. The bot was blocked")
            print("\n   To fix: Start a chat with your bot and use get_chat_id.py to get the correct ID")
except httpx.HTTPStatusError as e:
    error_data = e.response.json() if e.response else {}
    error_desc = error_data.get("description", str(e))
    print(f"❌ HTTP Error: {error_desc}")
    
    if "chat not found" in error_desc.lower():
        print("\n💡 Solution:")
        print("   1. Open Telegram and start a conversation with your bot")
        print("   2. Send any message to the bot")
        print("   3. Run: python get_chat_id.py")
        print("   4. Update TELEGRAM_CHAT_ID in .env file")
except Exception as e:
    print(f"❌ Error sending test message: {e}")

print("\n" + "="*50)
print("Diagnostic complete!")

