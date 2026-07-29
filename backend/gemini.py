import json
import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel(
    model_name="gemini-3.6-flash",
    generation_config={
        "response_mime_type": "application/json",
        "temperature": 0.1,
    },
)


def analyze_review_with_ai(review_text: str, guest_name: str) -> dict:
    """
    Analyze a hospitality review using Gemini AI.
    Returns:
    {
        sentiment,
        themes,
        ai_response
    }
    """

    prompt = f"""
You are Staylytics AI, an expert hospitality review analyst.

Analyze the following hospitality review.

Guest Name:
{guest_name}

Guest Review:
"{review_text}"

==================================================
TASK 1 - SENTIMENT CLASSIFICATION
==================================================

Determine the OVERALL sentiment.

Possible values:

positive
neutral
negative

Rules:

POSITIVE
- The guest is clearly satisfied.
- Positive comments outweigh any small complaints.
- Reviews containing words such as:
great, amazing, excellent, wonderful, fantastic,
loved, beautiful, perfect, delicious, enjoyable,
friendly, comfortable, clean, recommend,
awesome, pleasant, memorable

should normally be classified as POSITIVE.

Examples:

"Spent a great weekend here, loved the vibe."
→ Positive

"Amazing breakfast and beautiful location."
→ Positive

"Fantastic stay. WiFi was a little slow."
→ Positive

"Host was extremely friendly and food was delicious."
→ Positive

Minor complaints SHOULD NOT change an otherwise positive review to neutral.


NEUTRAL

Use Neutral ONLY when:

- Positive and negative opinions are balanced.
- The review is mostly factual.
- The overall opinion is unclear.

Examples:

"The host was warm but the WiFi kept disconnecting."

"The room was clean but breakfast was average."

"The location is near the market."


NEGATIVE

Use Negative when:

- Complaints outweigh compliments.
- Guest is dissatisfied.

Examples:

"The room was dirty and the staff were rude."

"Terrible food and slow service."

"Very disappointing stay."

Always determine the OVERALL opinion.

Never classify a clearly happy review as Neutral.

==================================================
TASK 2 - THEME EXTRACTION
==================================================

Extract ALL matching themes ONLY from this list.

Food
Host
Cleanliness
Location
WiFi
Service
Experience

Rules:

Breakfast -> Food

Dinner -> Food

Meal -> Food

Cuisine -> Food

Staff -> Service

Reception -> Service

Owner -> Host

Friendly Host -> Host

Mountain View -> Location

Scenic -> Location

Internet -> WiFi

Network -> WiFi

Stay -> Experience

Weekend -> Experience

Vibe -> Experience

Do NOT create any new themes.

If none match,
return:

["Experience"]

==================================================
TASK 3 - OWNER RESPONSE
==================================================

Generate a professional owner response.

Requirements:

- Address the guest by name.
- Thank them.
- Mention specific positives.
- If there is criticism,
acknowledge it politely.
- Keep between 2 and 3 sentences.
- Warm and welcoming tone.

==================================================
TASK 4 - OUTPUT
==================================================

Return ONLY valid JSON.

Format:

{{
    "sentiment":"positive",
    "themes":["Experience"],
    "ai_response":"..."
}}

No markdown.

No explanations.

No extra text.

==================================================
FEW SHOT EXAMPLES
==================================================

Review:
Spent a great weekend here, loved the vibe.

Output:
{{
"sentiment":"positive",
"themes":["Experience"],
"ai_response":"Thank you, {guest_name}, for your wonderful review! We're delighted you had a great weekend and enjoyed the overall experience. We look forward to welcoming you again soon."
}}

Review:
Amazing breakfast and beautiful mountain view.

Output:
{{
"sentiment":"positive",
"themes":["Food","Location"],
"ai_response":"Thank you, {guest_name}, for your wonderful feedback! We're thrilled you enjoyed our breakfast and the beautiful surroundings. We hope to welcome you back again soon."
}}

Review:
The host was very warm but the WiFi kept dropping.

Output:
{{
"sentiment":"neutral",
"themes":["Host","WiFi"],
"ai_response":"Thank you, {guest_name}, for sharing your feedback. We're delighted you appreciated our hospitality and apologize for the WiFi issues. We hope to provide an even better stay next time."
}}

Review:
The room was dirty and the staff were rude.

Output:
{{
"sentiment":"negative",
"themes":["Cleanliness","Service"],
"ai_response":"Thank you, {guest_name}, for your feedback. We're sorry your experience did not meet expectations. Your comments have been shared with our team so we can improve."
}}

Review:
Breakfast was excellent although parking was limited.

Output:
{{
"sentiment":"positive",
"themes":["Food"],
"ai_response":"Thank you, {guest_name}, for your kind review! We're delighted you enjoyed the breakfast and appreciate your additional feedback. We hope to welcome you again soon."
}}
"""

    allowed_themes = {
        "Food",
        "Host",
        "Cleanliness",
        "Location",
        "WiFi",
        "Service",
        "Experience",
    }

    try:
        response = model.generate_content(
            prompt,
            generation_config=genai.GenerationConfig(
                temperature=0.1,
                response_mime_type="application/json",
            ),
        )

        print("Gemini Response:")
        print(response.text)

        data = json.loads(response.text)

        sentiment = str(data.get("sentiment", "neutral")).strip().lower()

        if sentiment not in ["positive", "neutral", "negative"]:
            sentiment = "neutral"

        raw_themes = data.get("themes", [])

        if not isinstance(raw_themes, list):
            raw_themes = []

        validated_themes = [
            theme
            for theme in raw_themes
            if theme in allowed_themes
        ]

        if not validated_themes:
            validated_themes = ["Experience"]

        ai_response = str(
            data.get(
                "ai_response",
                f"Thank you for sharing your experience with us, {guest_name}. We truly appreciate your feedback."
            )
        ).strip()

        return {
            "sentiment": sentiment,
            "themes": validated_themes,
            "ai_response": ai_response,
        }

    except Exception as e:
        print(f"Gemini Error: {e}")
