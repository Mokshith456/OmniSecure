from flask import Flask, jsonify
from flask_cors import CORS
import os
import re
import requests
from urllib.parse import urlparse
from twilio.rest import Client

app = Flask(__name__)
CORS(app)

# === Groq API ===
GROQ_API_KEY = "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"

# === Twilio Config ===
TWILIO_SID = "AC282c2dde6b9ec9f81cf3790fd3189d23"
TWILIO_AUTH_TOKEN = "40c9e24506fd03532c303994bfcad474"
TWILIO_FROM_NUMBER = "+16403564634"    # Your Twilio number
TWILIO_TO_NUMBER = "+917899374579"     # Receiver's phone number (your actual number)

# === Phishing Detection Logic ===
PHISHING_KEYWORDS = [
    "urgent", "verify", "suspended", "click here", "login", "limited time",
    "update your account", "password expired", "security alert", "reset"
]

SUSPICIOUS_DOMAINS = ["bit.ly", "tinyurl.com", "rb.gy", "ow.ly", "shorturl.at"]

def ask_groq(prompt, model="llama3-8b-8192"):
    url = "https://api.groq.com/openai/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }
    data = {
        "model": model,
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.7
    }
    try:
        response = requests.post(url, headers=headers, json=data)
        response_json = response.json()
        if "choices" in response_json:
            return response_json["choices"][0]["message"]["content"]
        else:
            print("Groq API Error:", response_json)
            return "Groq API error"
    except Exception as e:
        print("Groq Exception:", e)
        return "Groq API error"

def is_suspicious_url(url):
    domain = urlparse(url).netloc
    return any(bad in domain for bad in SUSPICIOUS_DOMAINS)

def detect_phishing(text):
    text_lower = text.lower()
    suspicious_parts = {
        "keywords_detected": [],
        "suspicious_links": []
    }
    score = 0

    for keyword in PHISHING_KEYWORDS:
        if keyword in text_lower:
            suspicious_parts["keywords_detected"].append(keyword)
            score += 1

    urls = re.findall(r'https?://[^\s]+', text)
    for url in urls:
        if is_suspicious_url(url):
            suspicious_parts["suspicious_links"].append(url)
            score += 2

    risk = "High" if score >= 3 else "Medium" if score >= 1 else "Low"

    return {
        "original_message": text,
        "phishing_score": score,
        "risk_level": risk,
        **suspicious_parts
    }

@app.route('/send_sms', methods=['POST'])
def send_sms():
    prompt = "Generate a random SMS message that can be phishing or legit. Keep it under 25 words."
    sms_text = ask_groq(prompt)

    result = detect_phishing(sms_text)

    explanation_prompt = f"""
This SMS was analyzed and marked as {'phishing' if result['risk_level'] != 'Low' else 'safe'}.

SMS:
\"{sms_text}\"

Keywords: {result['keywords_detected']}
Links: {result['suspicious_links']}

Explain briefly in human-friendly terms why this SMS {'is suspicious' if result['risk_level'] != 'Low' else 'seems safe'}.
"""
    explanation = ask_groq(explanation_prompt)

    response = {
        "sms": sms_text,
        "phishing_score": result["phishing_score"],
        "risk_level": result["risk_level"],
        "keywords_detected": result["keywords_detected"],
        "suspicious_links": result["suspicious_links"],
        "explanation": explanation
    }

    # === Send SMS via Twilio (Paragraph Style) ===
    try:
        client = Client(TWILIO_SID, TWILIO_AUTH_TOKEN)

        sms_summary = (
            f"Alert: Your ward has received a message. The risk level is {response['risk_level']} "
            f"with a phishing score of {response['phishing_score']}. "
            f"Detected keywords are {', '.join(response['keywords_detected']) or 'none'}, "
            f"and suspicious links found are {', '.join(response['suspicious_links']) or 'none'}. "
            "Please exercise caution and verify the message before taking any action."
        )

        client.messages.create(
            body=sms_summary,
            from_=TWILIO_FROM_NUMBER,
            to=TWILIO_TO_NUMBER
        )
        print("✅ SMS sent successfully.")
    except Exception as e:
        print("❌ Twilio SMS failed:", e)

    return jsonify(response)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
