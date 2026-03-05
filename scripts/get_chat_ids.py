#!/usr/bin/env python3
"""
Get Telegram Chat IDs
Add this bot to your channels and run this to get the chat IDs
"""

import requests

BOT_TOKEN = "8761970442:AAE3U03SxIEtrfXXnQ-NyIoXJE1npeXVjIQ"

def get_updates():
    """Get bot updates to find chat IDs"""
    url = f"https://api.telegram.org/bot{BOT_TOKEN}/getUpdates"
    response = requests.get(url, timeout=10)
    data = response.json()
    
    if data.get("ok"):
        updates = data.get("result", [])
        if updates:
            print("📱 Chats the bot has been in:")
            print("=" * 50)
            for update in updates[-10:]:  # Last 10 updates
                if "my_chat_member" in update:
                    chat = update["my_chat_member"]["chat"]
                    chat_type = chat.get("type", "unknown")
                    chat_id = chat.get("id", "N/A")
                    title = chat.get("title", "N/A")
                    username = chat.get("username", "N/A")
                    print(f"Type: {chat_type}")
                    print(f"  ID: {chat_id}")
                    print(f"  Title: {title}")
                    print(f"  Username: {username}")
                    print()
        else:
            print("⚠️ No updates found.")
            print("Make sure to add the bot to your channels first!")
            print("Then send a message in each channel.")

if __name__ == "__main__":
    get_updates()
