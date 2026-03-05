#!/usr/bin/env python3
"""
SaudiSaaSHub Social Media Bot
Posts to Telegram channels for LinkedIn, Twitter, Instagram
"""

import os
import sys
import requests
from typing import List, Dict

# Configuration
SITE_URL = "https://saudisaashub.pages.dev"
TELEGRAM_BOT_TOKEN = "8761970442:AAE3U03SxIEtrfXXnQ-NyIoXJE1npeXVjIQ"

# Channel usernames (without @)
TELEGRAM_CHANNELS = {
    "twitter": "AeJIfACShsoxNTI0",      # @AeJIfACShsoxNTI0
    "linkedin": "iMstmKtBN05lNmY8",     # @iMstmKtBN05lNmY8
    "instagram": "4hbH56Uo9EdiYjI0",   # @4hbH56Uo9EdiYjI0
    "main": "7293624236"               # Your personal ID
}

# Saudi accent hooks
SAUDI_HOOKS = [
    "وش رايك؟ 🤔",
    "هل سمعت عن هذا؟ 🤨",
    "والله تستاهل تعرف! 🙌",
    "اقرى وأخبرني! 😱",
    "وش المثير في هذا؟ 🔥",
    "هل تعرف شنو يعني هذا؟ 🧐",
    "والله موضوع مهم! 💡",
    "شفت مثل هذا من قبل؟ 👀",
]

CATEGORY_HASHTAGS = {
    "SaaS": ["#SaaS", "#البرمجيات_السحابية", "#التحول_الرقمي"],
    "FinTech": ["#FinTech", "#التقنية_المالية", "#زاتكا"],
    "Cyber Security": ["#الأمن_السيبراني", "#CyberSecurity"],
    "Healthcare": ["#الصحة_الرقمية", "#Healthcare"],
    "E-Commerce": ["#تجارة_إلكترونية", "#سلامه", "#زد"],
    "EdTech": ["#التعليم_التقني", "#EdTech"],
    "IoT": ["#إنترنت_الأشياء", "#IoT"],
    "Logistics": ["#اللوجستيات", "#Logistics"],
}

def get_hashtags(categories: List[str]) -> str:
    tags = ["#SaudiSaaS", "#السعودية", "#التقنية", "#Startups"]
    for cat in categories:
        if cat in CATEGORY_HASHTAGS:
            tags.extend(CATEGORY_HASHTAGS[cat])
    return " ".join(list(set(tags))[:12])

def get_hook(title: str) -> str:
    import random
    random.seed(hash(title))
    return "🎯 " + random.choice(SAUDI_HOOKS)

def generate_linkedin_post(article: Dict) -> str:
    hook = get_hook(article["title"])
    url = f"{SITE_URL}/articles/{article['slug']}"
    hashtags = get_hashtags(article.get("categories", []))
    
    return f"""{hook}

{article['title']}

📝 {article['excerpt']}

👇 اقرأ المزيد:
{url}

{hashtags}

#SaudiSaaS #السعودية #ريادة_الأعمال #Tech"""

def generate_twitter_post(article: Dict) -> str:
    hook = get_hook(article["title"])
    url = f"{SITE_URL}/articles/{article['slug']}"
    hashtags = " ".join(get_hashtags(article.get("categories", [])).split()[:5])
    
    return f"""{hook}

{article['title'][:80]}...

🔗 {url}

{hashtags}"""

def generate_instagram_post(article: Dict) -> str:
    hook = "✨ " + get_hook(article["title"]).replace("🎯 ", "")
    url = f"{SITE_URL}/articles/{article['slug']}"
    hashtags = get_hashtags(article.get("categories", []))
    
    return f"""{hook}

{article['title']}

📖 {article['excerpt']}

👆 رابط الحلقة في البايو!

{hashtags}

#saudisaas #السعودية #technology #entrepreneur"""

def send_telegram_message(chat_id: str, text: str, parse_mode: str = "Markdown") -> bool:
    """Send message to Telegram"""
    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    data = {
        "chat_id": chat_id,
        "text": text,
        "parse_mode": parse_mode
    }
    
    try:
        response = requests.post(url, json=data, timeout=10)
        if response.status_code == 200:
            print(f"✅ Sent to {chat_id}")
            return True
        else:
            print(f"❌ Error: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Exception: {e}")
        return False

def post_to_channel(channel_key: str, article: Dict) -> bool:
    """Post article to specific channel"""
    if channel_key == "twitter":
        post = generate_twitter_post(article)
    elif channel_key == "linkedin":
        post = generate_linkedin_post(article)
    elif channel_key == "instagram":
        post = generate_instagram_post(article)
    else:
        return False
    
    chat_id = TELEGRAM_CHANNELS.get(channel_key)
    if chat_id:
        # Try as username first, then as numeric ID
        if not chat_id.isdigit():
            chat_id = f"@{chat_id}"
        return send_telegram_message(chat_id, post)
    return False

def main():
    print("🚀 SaudiSaaSHub Telegram Bot")
    print("=" * 50)
    
    # Sample article for testing
    article = {
        "title": "سوق البرمجيات السحابية في المملكة — وين وصل وإلى وين رايح؟",
        "slug": "saas-market-saudi-arabia-2026",
        "excerpt": "يُتوقع أن يصل حجم سوق SaaS في المملكة إلى 6.49 مليار دولار بحلول عام 2030.",
        "categories": ["SaaS", "تقارير السوق"]
    }
    
    print(f"📰 Posting: {article['title'][:50]}...")
    print()
    
    # Post to main chat first to test
    print("📤 Testing to personal chat...")
    send_telegram_message("7293624236", f"✅ Test from SaudiSaaSHub Bot!\n\n{article['title']}")
    
    print("\n✅ Done!")

if __name__ == "__main__":
    main()
