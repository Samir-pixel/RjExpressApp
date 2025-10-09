import os
from dotenv import load_dotenv

load_dotenv()

TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID")
WHATSAPP_API_KEY = os.getenv("WHATSAPP_API_KEY")


def forward_lead_to_channels(lead_data: dict) -> dict:
    """Stub: send lead to Telegram/WhatsApp and return status per channel."""
    results: dict[str, bool] = {}
    if TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID:
        # here you'd call Telegram Bot API
        results["telegram"] = True
    else:
        results["telegram"] = False

    if WHATSAPP_API_KEY:
        # here you'd call WhatsApp API
        results["whatsapp"] = True
    else:
        results["whatsapp"] = False

    return results
