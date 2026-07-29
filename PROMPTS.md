# Staylytics – Prompt Engineering Documentation

## Project Overview

Staylytics is an AI-powered hospitality review analyzer that uses **Google Gemini 1.5 Flash** to transform unstructured guest reviews into meaningful business insights.

The application automatically:

- Analyzes guest sentiment
- Extracts key hospitality themes
- Generates a professional owner response
- Returns structured JSON for FastAPI and PostgreSQL integration

Prompt engineering plays a vital role in ensuring the AI produces accurate, consistent, and machine-readable outputs for every review.

---

# Prompt Engineering Strategy

The prompt instructs Gemini to:

- Act as an expert hospitality review analyst.
- Determine the **overall sentiment** of the review.
- Extract themes **only** from a predefined list.
- Generate a warm and professional owner response.
- Return **only valid JSON** without explanations or markdown.

## Sentiment Rules

| Sentiment | Rule |
|-----------|------|
| Positive | Positive feedback outweighs any minor complaints. The guest is overall satisfied. |
| Neutral | Positive and negative feedback are balanced, or the review is mostly factual. |
| Negative | Complaints outweigh positive remarks or the overall experience is poor. |

## Allowed Themes

- Food
- Host
- Cleanliness
- Location
- WiFi
- Service
- Experience

---

# Prompt Variation 1

## Input Review

**Guest:** Rahul Kumar

> The host was very warm but the WiFi kept dropping.

### Prompt Objective

Analyze mixed feedback while identifying all relevant themes.

### Expected Output

```json
{
  "sentiment": "Neutral",
  "themes": [
    "Host",
    "WiFi"
  ],
  "ai_response": "Thank you for sharing your feedback. We're delighted that you appreciated our hospitality. We apologize for the WiFi connectivity issues and are working to improve the experience for all our guests. We hope to welcome you again soon."
}
```

### Observation

The review contains balanced praise and criticism, resulting in a neutral sentiment.

---

# Prompt Variation 2

## Input Review

**Guest:** Aashima

> Breakfast was absolutely delicious and the mountain view was breathtaking!

### Prompt Objective

Detect positive feedback and identify multiple themes.

### Expected Output

```json
{
  "sentiment": "Positive",
  "themes": [
    "Food",
    "Location"
  ],
  "ai_response": "Thank you for your wonderful review! We're thrilled that you enjoyed both our breakfast and the beautiful mountain views. We truly appreciate your kind words and look forward to welcoming you back."
}
```

### Observation

The model correctly recognizes multiple positive aspects and generates a personalized response.

---

# Prompt Variation 3

## Input Review

**Guest:** Resha Jha

> The service was very slow and the room wasn't clean. However, the food was great.

### Prompt Objective

Identify both positive and negative aspects while maintaining balanced sentiment.

### Expected Output

```json
{
  "sentiment": "Neutral",
  "themes": [
    "Service",
    "Cleanliness",
    "Food"
  ],
  "ai_response": "Thank you for taking the time to share your feedback. We're pleased to hear that you enjoyed our food. We sincerely apologize for the delays in service and the cleanliness issues you experienced. Your comments will help us improve, and we hope to welcome you again for a better stay."
}
```

### Observation

The model extracts all relevant themes and generates a balanced owner response.

---

# Prompt Variation 4

## Input Review

**Guest:** Aastha

> Spent a great weekend here, loved the vibe.

### Prompt Objective

Recognize clearly positive reviews without overclassifying them as neutral.

### Expected Output

```json
{
  "sentiment": "Positive",
  "themes": [
    "Experience"
  ],
  "ai_response": "Thank you for your wonderful review! We're delighted to hear that you had a great weekend and enjoyed the overall experience. We truly appreciate your kind words and look forward to welcoming you back soon."
}
```

### Observation

Strong positive expressions such as *"great"* and *"loved"* indicate an overall positive experience.

---

# Prompt Variation 5

## Input Review

**Guest:** Nikhil Sharma

> Okay stay.

### Prompt Objective

Handle short reviews while maintaining consistent output.

### Expected Output

```json
{
  "sentiment": "Neutral",
  "themes": [
    "Experience"
  ],
  "ai_response": "Thank you for staying with us and sharing your feedback. We appreciate your visit and hope to provide an even better experience during your next stay."
}
```

### Observation

The review lacks strong positive or negative emotion, making a neutral classification appropriate.

---

# Best Prompt

The final production prompt was selected because it:

- Uses role prompting for consistent behavior.
- Applies clear sentiment classification rules.
- Restricts themes to predefined hospitality categories.
- Produces structured JSON suitable for backend processing.
- Generates professional and personalized owner responses.
- Minimizes inconsistent outputs across different review styles.

---

# Why This Prompt Works

- Clearly defines the AI's role.
- Uses explicit sentiment classification rules.
- Restricts theme extraction to approved categories.
- Enforces JSON-only output.
- Produces consistent responses for API integration.
- Reduces hallucinations by limiting output scope.

---

# Prompt Engineering Techniques Used

- **Role Prompting** – Assigns Gemini the role of a hospitality review analyst.
- **Instruction Prompting** – Clearly defines each required task.
- **Constraint Prompting** – Restricts theme extraction to predefined categories.
- **Output Formatting** – Enforces a fixed JSON schema.
- **Few-Shot Prompting** – Uses representative examples to guide the model.
- **Chain-of-Thought Avoidance** – Requests only the final JSON output, improving consistency and simplifying backend parsing.

---

# Model Information

| Property | Value |
|----------|-------|
| Model | Google Gemini 1.5 Flash |
| Backend | FastAPI |
| Output Format | JSON |
| Temperature | 0.1 |
| Response MIME Type | application/json |

---

# Future Improvements

- Add confidence scores for sentiment predictions.
- Support multilingual guest reviews.
- Detect finer emotions such as delight, frustration, and disappointment.
- Expand supported themes to include Amenities, Value, Room Quality, and Staff.
- Implement aspect-based sentiment analysis.
- Generate actionable improvement suggestions for property owners.