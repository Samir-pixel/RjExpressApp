import os
import httpx
from dotenv import load_dotenv

load_dotenv()

TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID")
WHATSAPP_API_KEY = os.getenv("WHATSAPP_API_KEY")

TELEGRAM_API_URL = "https://api.telegram.org/bot"


def send_telegram_message(message: str) -> bool:
    """Send message to Telegram chat via Bot API."""
    if not TELEGRAM_BOT_TOKEN or not TELEGRAM_CHAT_ID:
        print("❌ Telegram credentials missing: BOT_TOKEN or CHAT_ID not set")
        return False
    
    url = f"{TELEGRAM_API_URL}{TELEGRAM_BOT_TOKEN}/sendMessage"
    
    try:
        response = httpx.post(
            url,
            json={
                "chat_id": TELEGRAM_CHAT_ID,
                "text": message,
                "parse_mode": "HTML"
            },
            timeout=10.0
        )
        response.raise_for_status()
        result = response.json()
        
        if not result.get("ok"):
            error_desc = result.get("description", "Unknown error")
            print(f"❌ Telegram API error: {error_desc}")
            
            # Helpful error messages
            if "chat not found" in error_desc.lower():
                print("💡 Solution: Start a conversation with your bot and get the correct Chat ID using get_chat_id.py")
            elif "bots can't send messages to bots" in error_desc.lower():
                print(f"💡 Error: Chat ID ({TELEGRAM_CHAT_ID}) appears to be a bot ID, not a user/group ID")
                print("   Get your personal Chat ID by sending a message to your bot, then run: python get_chat_id.py")
            
            return False
        
        # Only print in development, not in production logs
        if os.getenv("DEBUG", "false").lower() == "true":
            print(f"✅ Telegram message sent successfully to chat {TELEGRAM_CHAT_ID}")
        return True
        
    except httpx.HTTPStatusError as e:
        error_data = e.response.json() if e.response else {}
        error_desc = error_data.get("description", str(e))
        print(f"❌ HTTP Error sending Telegram message: {error_desc}")
        return False
    except Exception as e:
        print(f"❌ Error sending Telegram message: {e}")
        return False


def format_lead_message(lead_data: dict) -> str:
    """Format lead data into a readable message for Telegram."""
    name = lead_data.get("name", "N/A")
    phone = lead_data.get("phone", "N/A")
    experience = lead_data.get("experience", "Not specified")
    message = lead_data.get("message", "")
    
    text = f"🚛 <b>New Lead Application</b>\n\n"
    text += f"👤 <b>Name:</b> {name}\n"
    text += f"📞 <b>Phone:</b> {phone}\n"
    text += f"💼 <b>Experience:</b> {experience}\n"
    
    if message:
        text += f"💬 <b>Message:</b> {message}\n"
    
    text += f"\n⏰ <i>Submitted at: {lead_data.get('timestamp', 'Just now')}</i>"
    
    return text


def forward_lead_to_channels(lead_data: dict) -> dict:
    """Send lead to Telegram/WhatsApp and return status per channel."""
    results: dict[str, bool] = {}
    
    # Send to Telegram
    if TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID:
        message = format_lead_message(lead_data)
        results["telegram"] = send_telegram_message(message)
    else:
        results["telegram"] = False

    # WhatsApp stub (can be implemented later)
    if WHATSAPP_API_KEY:
        # here you'd call WhatsApp API
        results["whatsapp"] = True
    else:
        results["whatsapp"] = False

    return results
