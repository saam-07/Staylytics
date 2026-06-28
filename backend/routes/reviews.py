from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from datetime import datetime
from models.review import ReviewCreate, ReviewUpdate, ReviewResponse

router = APIRouter()

# ── In-memory store (replace with Supabase/PostgreSQL later) ──
reviews_db = []
counter = {"id": 1}

def analyze_sentiment(text: str) -> str:
    """Simple keyword-based sentiment analysis (replace with Gemini API later)"""
    text_lower = text.lower()
    positive_words = ["great", "excellent", "amazing", "wonderful", "fantastic",
                      "loved", "outstanding", "warm", "beautiful", "perfect",
                      "incredible", "breathtaking", "outstanding", "enjoyed"]
    negative_words = ["bad", "terrible", "awful", "horrible", "worst",
                      "disappointing", "dirty", "rude", "slow", "broken",
                      "frustrating", "dropping", "unreliable", "noisy"]

    pos_count = sum(1 for word in positive_words if word in text_lower)
    neg_count = sum(1 for word in negative_words if word in text_lower)

    if pos_count > neg_count:
        return "positive"
    elif neg_count > pos_count:
        return "negative"
    return "neutral"

def detect_themes(text: str) -> List[str]:
    """Detect themes from review text"""
    text_lower = text.lower()
    theme_keywords = {
        "Food": ["food", "breakfast", "lunch", "dinner", "meal", "cuisine", "taste", "delicious"],
        "Host": ["host", "staff", "owner", "service", "hospitality", "helpful", "warm", "friendly"],
        "Cleanliness": ["clean", "dirty", "hygiene", "tidy", "spotless", "mess"],
        "Location": ["location", "view", "nearby", "distance", "mountain", "scenic", "area"],
        "WiFi": ["wifi", "internet", "connection", "network", "signal", "slow"],
        "Experience": ["experience", "stay", "overall", "recommend", "visit", "atmosphere"],
    }
    detected = []
    for theme, keywords in theme_keywords.items():
        if any(kw in text_lower for kw in keywords):
            detected.append(theme)
    return detected if detected else ["Experience"]

def generate_response(sentiment: str, themes: List[str]) -> str:
    """Generate a template AI response (replace with Gemini API later)"""
    if sentiment == "positive":
        base = "Thank you so much for your wonderful feedback! We're thrilled you had a great experience."
    elif sentiment == "negative":
        base = "We sincerely apologize for the experience you had. Your feedback is very important to us."
    else:
        base = "Thank you for sharing your experience with us. We value your feedback."

    if "WiFi" in themes:
        base += " We are actively working on improving our WiFi connectivity."
    if "Food" in themes:
        base += " We're glad our local cuisine made an impression."
    if "Host" in themes:
        base += " Our team works hard to make every guest feel welcome."

    base += " We hope to welcome you back soon!"
    return base


# ── ENDPOINTS ──

@router.get("/", response_model=List[ReviewResponse])
def get_all_reviews():
    """GET /reviews — Returns all reviews"""
    return reviews_db


@router.get("/search", response_model=List[ReviewResponse])
def search_reviews(
    sentiment: Optional[str] = Query(None, description="Filter by sentiment: positive, neutral, negative"),
    theme: Optional[str] = Query(None, description="Filter by theme: Food, Host, WiFi, etc."),
    keyword: Optional[str] = Query(None, description="Search keyword in review text")
):
    """GET /reviews/search — Search and filter reviews"""
    results = reviews_db

    if sentiment:
        results = [r for r in results if r["sentiment"] == sentiment.lower()]
    if theme:
        results = [r for r in results if theme in r["themes"]]
    if keyword:
        results = [r for r in results if keyword.lower() in r["review_text"].lower()]

    if not results:
        return []
    return results


@router.get("/{review_id}", response_model=ReviewResponse)
def get_single_review(review_id: int):
    """GET /reviews/{id} — Returns a single review by ID"""
    review = next((r for r in reviews_db if r["id"] == review_id), None)
    if not review:
        raise HTTPException(status_code=404, detail=f"Review with id {review_id} not found")
    return review


@router.post("/", response_model=ReviewResponse, status_code=201)
def create_review(review: ReviewCreate):
    """POST /reviews — Create and analyze a new review"""
    sentiment = analyze_sentiment(review.review_text)
    themes = detect_themes(review.review_text)
    ai_response = generate_response(sentiment, themes)

    new_review = {
        "id": counter["id"],
        "guest_name": review.guest_name,
        "review_text": review.review_text,
        "sentiment": sentiment,
        "themes": themes,
        "ai_response": ai_response,
        "rating": review.rating,
        "created_at": datetime.now().isoformat(),
    }

    reviews_db.append(new_review)
    counter["id"] += 1
    return new_review


@router.put("/{review_id}", response_model=ReviewResponse)
def update_review(review_id: int, update: ReviewUpdate):
    """PUT /reviews/{id} — Update an existing review"""
    review = next((r for r in reviews_db if r["id"] == review_id), None)
    if not review:
        raise HTTPException(status_code=404, detail=f"Review with id {review_id} not found")

    update_data = update.dict(exclude_unset=True)
    review.update(update_data)
    return review


@router.delete("/{review_id}")
def delete_review(review_id: int):
    """DELETE /reviews/{id} — Delete a review"""
    global reviews_db
    review = next((r for r in reviews_db if r["id"] == review_id), None)
    if not review:
        raise HTTPException(status_code=404, detail=f"Review with id {review_id} not found")

    reviews_db = [r for r in reviews_db if r["id"] != review_id]
    return {"message": f"Review {review_id} deleted successfully"}
