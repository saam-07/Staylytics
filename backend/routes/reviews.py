from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from datetime import datetime
from models.review import ReviewCreate, ReviewUpdate, ReviewResponse
from database import supabase
from auth import verify_token
from fastapi import Depends
from gemini import analyze_review_with_ai

router = APIRouter()

@router.get("/", response_model=List[dict])
def get_all_reviews(payload: dict = Depends(verify_token)):
    response = supabase.table("reviews").select("*").order("created_at", desc=True).execute()
    return response.data

def analyze_sentiment(text: str) -> str:
    text_lower = text.lower()
    positive_words = ["great", "excellent", "amazing", "wonderful", "fantastic",
                      "loved", "outstanding", "warm", "beautiful", "perfect",
                      "incredible", "breathtaking", "enjoyed"]
    negative_words = ["bad", "terrible", "awful", "horrible", "worst",
                      "disappointing", "dirty", "rude", "slow", "broken",
                      "frustrating", "dropping", "unreliable", "noisy"]
    pos = sum(1 for w in positive_words if w in text_lower)
    neg = sum(1 for w in negative_words if w in text_lower)
    if pos > neg:
        return "positive"
    elif neg > pos:
        return "negative"
    return "neutral"

def detect_themes(text: str) -> List[str]:
    text_lower = text.lower()
    theme_keywords = {
        "Food": ["food", "breakfast", "lunch", "dinner", "meal", "cuisine", "taste", "delicious"],
        "Host": ["host", "staff", "owner", "service", "hospitality", "helpful", "warm", "friendly"],
        "Cleanliness": ["clean", "dirty", "hygiene", "tidy", "spotless", "mess"],
        "Location": ["location", "view", "nearby", "mountain", "scenic", "area"],
        "WiFi": ["wifi", "internet", "connection", "network", "signal", "slow"],
        "Experience": ["experience", "stay", "overall", "recommend", "visit", "atmosphere"],
    }
    detected = [theme for theme, keywords in theme_keywords.items()
                if any(kw in text_lower for kw in keywords)]
    return detected if detected else ["Experience"]

def generate_response(sentiment: str, themes: List[str]) -> str:
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

@router.get("/", response_model=List[dict])
def get_all_reviews():
    response = supabase.table("reviews").select("*").order("created_at", desc=True).execute()
    return response.data

@router.get("/search", response_model=List[dict])
def search_reviews(
    sentiment: Optional[str] = Query(None),
    theme: Optional[str] = Query(None),
    keyword: Optional[str] = Query(None)
):
    query = supabase.table("reviews").select("*")
    if sentiment:
        query = query.eq("sentiment", sentiment.lower())
    if keyword:
        query = query.ilike("review_text", f"%{keyword}%")
    response = query.execute()
    results = response.data
    if theme:
        results = [r for r in results if theme in r.get("themes", [])]
    return results

@router.get("/{review_id}", response_model=dict)
def get_single_review(review_id: int):
    response = supabase.table("reviews").select("*").eq("id", review_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail=f"Review {review_id} not found")
    return response.data[0]

@router.post("/", response_model=dict, status_code=201)
def create_review(review: ReviewCreate):
    # Use Gemini AI for analysis

    ai_result = analyze_review_with_ai(review.review_text, review.guest_name)

    new_review = {
        "guest_name": review.guest_name,
        "review_text": review.review_text,
        "sentiment": ai_result["sentiment"],
        "themes": ai_result["themes"],
        "ai_response": ai_result["ai_response"],
        "rating": review.rating if review.rating else None,
    }

    try:
        response = supabase.table("reviews").insert(new_review).execute()
        if not response.data:
            raise HTTPException(status_code=500, detail="Failed to create review")
        return response.data[0]
    except Exception as e:
        print(f"Supabase error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
@router.put("/{review_id}", response_model=dict)
def update_review(review_id: int, update: ReviewUpdate):
    existing = supabase.table("reviews").select("*").eq("id", review_id).execute()
    if not existing.data:
        raise HTTPException(status_code=404, detail=f"Review {review_id} not found")
    update_data = update.dict(exclude_unset=True)
    response = supabase.table("reviews").update(update_data).eq("id", review_id).execute()
    return response.data[0]

@router.delete("/{review_id}")
def delete_review(review_id: int):
    existing = supabase.table("reviews").select("*").eq("id", review_id).execute()
    if not existing.data:
        raise HTTPException(status_code=404, detail=f"Review {review_id} not found")
    supabase.table("reviews").delete().eq("id", review_id).execute()
    return {"message": f"Review {review_id} deleted successfully"}