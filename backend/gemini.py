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
    Returns sentiment, themes and AI response.
    """

    prompt = f"""
You are Staylytics AI, an intelligent hospitality review assistant for a homestay business in Uttarakhand, India.

Your task is to carefully analyze guest reviews.

Guest Name:
{guest_name}

Guest Review:
"{review_text}"

=========================
INSTRUCTIONS
=========================

1. Determine the overall sentiment.

Allowed values ONLY:
- positive
- neutral
- negative

Rules:
- Mostly positive feedback -> positive
- Mostly complaints -> negative
- Mixture of praise and complaints -> neutral

------------------------------------

2. Identify ALL relevant themes.

Choose ONLY from the following list:

- Food
- Host
- Cleanliness
- Location
- WiFi
- Service
- Experience

Examples:

Review:
"The host was very warm but the WiFi kept dropping."

Themes:
["Host","WiFi"]

----------------

Review:
"Breakfast was delicious and the mountain view was breathtaking."

Themes:
["Food","Location"]

----------------

Review:
"The room wasn't clean and service was slow."

Themes:
["Cleanliness","Service"]

----------------

Review:
"We enjoyed the stay."

Themes:
["Experience"]

IMPORTANT:
Return every matching theme.
Do NOT invent new themes.

------------------------------------

3. Write a professional response.

The response should:

- Thank the guest.
- Mention positive feedback if present.
- Apologize for any negative experience if present.
- Sound warm and natural.
- Be 2–3 sentences.

=========================
OUTPUT FORMAT
=========================

Return ONLY valid JSON.

Example:

{{
  "sentiment": "neutral",
  "themes": ["Host","WiFi"],
  "ai_response": "Thank you for sharing your feedback. We are delighted that you appreciated our hospitality. We apologize for the WiFi issues and are working to improve the experience for all our guests. We hope to welcome you again soon."
}}

Return ONLY JSON.

Do not use markdown.

Do not use code blocks.

Do not explain anything.
"""

    try:
        response = model.generate_content(prompt)

        text = response.text.strip()

        # Remove markdown if Gemini returns it
        if text.startswith("```"):
            text = text.replace("```json", "")
            text = text.replace("```", "")
            text = text.strip()

        print("\n===== GEMINI OUTPUT =====")
        print(text)
        print("=========================\n")

        result = json.loads(text)

        # Validation

        sentiment = result.get("sentiment", "neutral").lower()

        if sentiment not in ["positive", "neutral", "negative"]:
            sentiment = "neutral"

        themes = result.get("themes", [])

        if not isinstance(themes, list):
            themes = ["Experience"]

        allowed_themes = [
            "Food",
            "Host",
            "Cleanliness",
            "Location",
            "WiFi",
            "Service",
            "Experience",
        ]

        themes = [theme for theme in themes if theme in allowed_themes]

        if not themes:
            themes = ["Experience"]

        ai_response = result.get(
            "ai_response",
            "Thank you for sharing your experience with us. We value your feedback and hope to welcome you back soon!"
        )

        return {
            "sentiment": sentiment,
            "themes": themes,
            "ai_response": ai_response,
        }

    except Exception as e:
        print(f"Gemini error: {e}")

        return {
            "sentiment": "neutral",
            "themes": ["Experience"],
            "ai_response": (
                "Thank you for sharing your experience with us. "
                "We value your feedback and hope to welcome you back soon!"
            ),
        }