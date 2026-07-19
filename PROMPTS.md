# PROMPTS.md

# Staylytics - Prompt Engineering Documentation

## Project Overview

Staylytics is an AI-powered hospitality review analyzer that uses Google Gemini 1.5 Flash to:

- Analyze guest sentiment
- Identify important review themes
- Generate a professional response for the homestay owner

---

# Prompt Variation 1

## Input Review

**Guest:** Rahul Kumar

> The host was very warm but the WiFi kept dropping.

### Prompt Strategy

The model is instructed to:

- Detect overall sentiment.
- Identify all matching themes from a predefined list.
- Generate a warm, professional response.

### Expected Output

```json
{
  "sentiment": "neutral",
  "themes": [
    "Host",
    "WiFi"
  ],
  "ai_response": "Thank you for sharing your feedback. We're delighted that you appreciated our hospitality. We apologize for the WiFi connectivity issues and are working to improve the experience for all our guests. We hope to welcome you again soon."
}
```

### Observation

The review contains both praise and criticism, resulting in a neutral sentiment. The AI correctly identifies multiple themes and produces a personalized response.

---

# Prompt Variation 2

## Input Review

**Guest:** Aashima

> Breakfast was absolutely delicious and the mountain view was breathtaking!

### Prompt Strategy

The AI is instructed to classify all relevant aspects instead of assigning a generic category.

### Expected Output

```json
{
  "sentiment": "positive",
  "themes": [
    "Food",
    "Location"
  ],
  "ai_response": "Thank you for your wonderful review! We're thrilled that you enjoyed both our breakfast and the beautiful mountain views. We look forward to welcoming you back for another memorable stay."
}
```

### Observation

The AI recognizes multiple positive aspects and generates a response that specifically acknowledges them.

---

# Prompt Variation 3

## Input Review

**Guest:** Resha Jha

> The service was very slow and the room wasn't clean. However the food was great.

### Prompt Strategy

The AI is instructed to classify mixed reviews as neutral while extracting every relevant theme.

### Expected Output

```json
{
  "sentiment": "neutral",
  "themes": [
    "Service",
    "Cleanliness",
    "Food"
  ],
  "ai_response": "Thank you for taking the time to share your feedback. We're pleased to hear that you enjoyed our food, but we sincerely apologize for the delays in service and the cleanliness issues you experienced. Your feedback helps us improve, and we hope to provide you with a much better stay in the future."
}
```

### Observation

The model successfully identifies both positive and negative aspects, classifies the review as neutral, and generates a balanced, professional response.

---

# Best Prompt

The final prompt was selected because it provides clear instructions for:

- Sentiment classification using predefined rules.
- Theme extraction from a fixed list.
- Personalized response generation.
- Returning only valid JSON for seamless FastAPI integration.

This structured approach produced more accurate and consistent results than a generic prompt.

---

# System Prompt Summary

The model is instructed to:

- Act as Staylytics AI.
- Analyze hospitality reviews.
- Determine one sentiment value.
- Extract every applicable theme from a predefined list.
- Generate a warm and professional reply.
- Return only valid JSON without markdown or explanations.

---

# Model Used

**Google Gemini 1.5 Flash**

---

# Future Improvements

- Improve detection of subtle emotions such as disappointment or delight.
- Support multilingual guest reviews.
- Add confidence scores for sentiment predictions.
- Expand supported themes to include Value, Amenities, Room Quality, and Staff Experience.
- Recommend actionable improvements for the homestay owner based on guest feedback.