import google.generativeai as genai

import os
import json
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-1.5-flash")


def analyze_review_with_ai(review_text: str, guest_name: str) -> dict:
    """
    Uses Gemini AI to analyze a guest review.
    Returns sentiment, themes, and AI response.
    """

    prompt = f"""
You are an AI assistant for a homestay business in Uttarakhand, India.

Analyze the following guest review and return a JSON response with exactly these fields:
- sentiment: one of "positive", "neutral", or "negative"
- themes: a list of relevant themes from this list only: ["Food", "Host", "Cleanliness", "Location", "WiFi", "Experience"]
- ai_response: a warm, professional response from the homestay owner to this guest (2-3 sentences)

Guest name: {guest_name}
Review: "{review_text}"

Return ONLY valid JSON, no extra text, no markdown, no code blocks. Example format:
{{"sentiment": "positive", "themes": ["Food", "Host"], "ai_response": "Thank you..."}}
"""

    try:
        response = model.generate_content(prompt)
        text = response.text.strip()

        # Clean up in case Gemini adds markdown
        if text.startswith("```"):
            text = text.split("```")[1]
            if text.startswith("json"):
                text = text[4:]
        text = text.strip()

        result = json.loads(text)

        # Validate fields
        if "sentiment" not in result:
            result["sentiment"] = "neutral"
        if "themes" not in result or not result["themes"]:
            result["themes"] = ["Experience"]
        if "ai_response" not in result:
            result["ai_response"] = "Thank you for your feedback!"

        return result

    except Exception as e:
        print(f"Gemini error: {e}")
        # Fallback to basic analysis if Gemini fails
        return {
            "sentiment": "neutral",
            "themes": ["Experience"],
            "ai_response": "Thank you for sharing your experience with us. We value your feedback and hope to welcome you back soon!"
        }