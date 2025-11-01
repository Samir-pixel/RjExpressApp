"""
Helper script to get Telegram Chat ID.
1. Start a chat with your bot in Telegram
2. Send any message to your bot
3. Run this script: python get_chat_id.py
4. Copy the chat_id from the output
"""

import os
import httpx
from dotenv import load_dotenv

load_dotenv()

BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")

if not BOT_TOKEN:
    print("❌ Error: TELEGRAM_BOT_TOKEN not found in .env file")
    print("Please add TELEGRAM_BOT_TOKEN to your .env file")
    exit(1)

url = f"https://api.telegram.org/bot{BOT_TOKEN}/getUpdates"

try:
    response = httpx.get(url, timeout=10.0)
    response.raise_for_status()
    data = response.json()
    
    if not data.get("ok"):
        print(f"❌ Error: {data.get('description', 'Unknown error')}")
        exit(1)
    
    updates = data.get("result", [])
    
    if not updates:
        print("⚠️  No messages found. Please send a message to your bot first.")
        print(f"Your bot username: https://t.me/{BOT_TOKEN.split(':')[0]}")
        exit(1)
    
    # Get the latest update
    latest_update = updates[-1]
    chat = latest_update.get("message", {}).get("chat", {})
    
    chat_id = chat.get("id")
    chat_type = chat.get("type")
    chat_title = chat.get("title") or chat.get("first_name") or chat.get("username") or "Unknown"
    
    print("\n✅ Chat ID found!")
    print(f"Chat ID: {chat_id}")
    print(f"Chat Type: {chat_type}")
    print(f"Chat Name: {chat_title}")
    print(f"\n📝 Add this to your .env file:")
    print(f"TELEGRAM_CHAT_ID={chat_id}")
    
except Exception as e:
    print(f"❌ Error: {e}")

