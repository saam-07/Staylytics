from fastapi import APIRouter, HTTPException, Query, Depends
from typing import List, Optional
from datetime import datetime
from models.review import ReviewCreate, ReviewUpdate, ReviewResponse
from database import supabase
from auth import verify_token
from fastapi import Request
from gemini import analyze_review_with_ai
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
router = APIRouter()
security = HTTPBearer(auto_error=False)
def get_optional_user(credentials: Optional[HTTPAuthorizationCredentials] = Depends(security)):
    """Returns user payload if token provided, None if not"""
    if not credentials:
        return None
    try:
        from auth import verify_token_payload
        return verify_token_payload(credentials.credentials)
    except:
        return None

@router.get("/", response_model=List[dict])
def get_all_reviews(user=Depends(get_optional_user)):
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

    response = supabase.table("reviews").select("*").order("created_at", desc=True).execute()
    return response.data

@router.get("/search", response_model=List[dict])
def search_reviews(
    sentiment: Optional[str] = Query(None),
    theme: Optional[str] = Query(None),
    keyword: Optional[str] = Query(None),
    user=Depends(get_optional_user)
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
def get_single_review(review_id: int, user=Depends(get_optional_user)):
    response = supabase.table("reviews").select("*").eq("id", review_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail=f"Review {review_id} not found")
    return response.data[0]

@router.post("/", response_model=dict, status_code=201)
def create_review(review: ReviewCreate, user=Depends(get_optional_user)):
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
        raise HTTPException(status_code=500, detail=str(e))

import time

time.sleep(12)
@router.post("/reanalyze-all")
def reanalyze_all_reviews(user=Depends(get_optional_user)):
    try:
        # Fetch all reviews
        response = supabase.table("reviews").select("*").execute()
        reviews = response.data

        updated = 0

        for review in reviews:
            # Run Gemini again using the updated prompt
            ai_result = analyze_review_with_ai(
                review["review_text"],
                review["guest_name"]
            )

            # Update only AI-generated fields
            supabase.table("reviews").update({
                "sentiment": ai_result["sentiment"],
                "themes": ai_result["themes"],
                "ai_response": ai_result["ai_response"]
            }).eq("id", review["id"]).execute()

            updated += 1

        return {
            "message": f"Successfully reanalyzed {updated} reviews."
        }

    except Exception as e:
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
def delete_review(review_id: int, user=Depends(get_optional_user)):
    existing = supabase.table("reviews").select("*").eq("id", review_id).execute()
    if not existing.data:
        raise HTTPException(status_code=404, detail=f"Review {review_id} not found")
    supabase.table("reviews").delete().eq("id", review_id).execute()
    return {"message": f"Review {review_id} deleted successfully"}