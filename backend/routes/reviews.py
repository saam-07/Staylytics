from fastapi import APIRouter, HTTPException, Query, Depends
from typing import List, Optional
from pydantic import BaseModel
from models.review import ReviewCreate, ReviewUpdate
from database import supabase
from auth import verify_token
from gemini import analyze_review_with_ai, fetch_online_hotel_reviews

router = APIRouter()

class FetchReviewsRequest(BaseModel):
    hotel_name: str
    location: Optional[str] = ""


# -----------------------------
# Helper Functions
# -----------------------------

def analyze_sentiment(text: str) -> str:
    text_lower = text.lower()

    positive_words = [
        "great", "excellent", "amazing", "wonderful", "fantastic",
        "loved", "outstanding", "warm", "beautiful", "perfect",
        "incredible", "breathtaking", "enjoyed"
    ]

    negative_words = [
        "bad", "terrible", "awful", "horrible", "worst",
        "disappointing", "dirty", "rude", "slow",
        "broken", "frustrating", "dropping",
        "unreliable", "noisy"
    ]

    pos = sum(1 for w in positive_words if w in text_lower)
    neg = sum(1 for w in negative_words if w in text_lower)

    if pos > neg:
        return "positive"
    elif neg > pos:
        return "negative"
    else:
        return "neutral"


def detect_themes(text: str) -> List[str]:
    text_lower = text.lower()

    theme_keywords = {
        "Food": [
            "food", "breakfast", "lunch", "dinner",
            "meal", "cuisine", "taste", "delicious"
        ],
        "Host": [
            "host", "staff", "owner", "hospitality",
            "friendly", "warm", "helpful"
        ],
        "Cleanliness": [
            "clean", "dirty", "spotless",
            "mess", "hygiene", "tidy"
        ],
        "Location": [
            "location", "view", "mountain",
            "scenic", "nearby", "area"
        ],
        "WiFi": [
            "wifi", "internet", "connection",
            "network", "signal"
        ],
        "Service": [
            "service", "slow", "quick", "staff"
        ],
        "Experience": [
            "experience", "stay", "overall",
            "recommend", "visit", "atmosphere"
        ],
    }

    detected = [
        theme
        for theme, keywords in theme_keywords.items()
        if any(keyword in text_lower for keyword in keywords)
    ]

    return detected if detected else ["Experience"]


def generate_response(sentiment: str, themes: List[str]) -> str:
    if sentiment == "positive":
        response = (
            "Thank you so much for your wonderful feedback! "
            "We're thrilled you had a great experience."
        )

    elif sentiment == "negative":
        response = (
            "We're sincerely sorry that your experience did not meet expectations. "
            "Your feedback is extremely valuable to us."
        )

    else:
        response = (
            "Thank you for sharing your experience with us. "
            "We truly appreciate your feedback."
        )

    if "WiFi" in themes:
        response += " We'll work on improving our WiFi."

    if "Food" in themes:
        response += " We're glad you enjoyed our food."

    if "Host" in themes:
        response += " Our team always strives to provide warm hospitality."

    response += " We hope to welcome you again soon."

    return response


# -----------------------------
# GET ALL REVIEWS
# -----------------------------

@router.get("/", response_model=List[dict])
def get_all_reviews(user: dict = Depends(verify_token)):

    response = (
        supabase.table("reviews")
        .select("*")
        .eq("user_id", int(user["sub"]))
        .order("created_at", desc=True)
        .execute()
    )

    return response.data


# -----------------------------
# SEARCH REVIEWS
# -----------------------------

@router.get("/search", response_model=List[dict])
def search_reviews(
    sentiment: Optional[str] = Query(None),
    theme: Optional[str] = Query(None),
    keyword: Optional[str] = Query(None),
    user: dict = Depends(verify_token),
):

    query = (
        supabase.table("reviews")
        .select("*")
        .eq("user_id", int(user["sub"]))
    )

    if sentiment:
        query = query.eq("sentiment", sentiment.lower())

    if keyword:
        query = query.ilike("review_text", f"%{keyword}%")

    response = query.execute()

    results = response.data

    if theme:
        results = [
            review
            for review in results
            if theme in review.get("themes", [])
        ]

    return results
# -----------------------------
# GET SINGLE REVIEW
# -----------------------------

@router.get("/{review_id}", response_model=dict)
def get_single_review(
    review_id: int,
    user: dict = Depends(verify_token),
):
    response = (
        supabase.table("reviews")
        .select("*")
        .eq("id", review_id)
        .eq("user_id", int(user["sub"]))
        .execute()
    )

    if not response.data:
        raise HTTPException(
            status_code=404,
            detail=f"Review {review_id} not found",
        )

    return response.data[0]


# -----------------------------
# CREATE REVIEW
# -----------------------------

@router.post("/", response_model=dict, status_code=201)
def create_review(
    review: ReviewCreate,
    user: dict = Depends(verify_token),
):
    ai_result = analyze_review_with_ai(
        review.review_text,
        review.guest_name,
    )

    new_review = {
        "guest_name": review.guest_name,
        "review_text": review.review_text,
        "sentiment": ai_result["sentiment"],
        "themes": ai_result["themes"],
        "ai_response": ai_result["ai_response"],
        "rating": review.rating if review.rating else None,
        "user_id": int(user["sub"]),
    }

    try:
        response = (
            supabase.table("reviews")
            .insert(new_review)
            .execute()
        )

        if not response.data:
            raise HTTPException(
                status_code=500,
                detail="Failed to create review",
            )

        return response.data[0]

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# -----------------------------
# UPDATE REVIEW
# -----------------------------

@router.put("/{review_id}", response_model=dict)
def update_review(
    review_id: int,
    update: ReviewUpdate,
    user: dict = Depends(verify_token),
):
    existing = (
        supabase.table("reviews")
        .select("*")
        .eq("id", review_id)
        .eq("user_id", int(user["sub"]))
        .execute()
    )

    if not existing.data:
        raise HTTPException(
            status_code=404,
            detail=f"Review {review_id} not found",
        )

    update_data = update.dict(exclude_unset=True)

    response = (
        supabase.table("reviews")
        .update(update_data)
        .eq("id", review_id)
        .eq("user_id", int(user["sub"]))
        .execute()
    )

    if not response.data:
        raise HTTPException(
            status_code=500,
            detail="Failed to update review",
        )

    return response.data[0]
# -----------------------------
# DELETE REVIEW
# -----------------------------

@router.delete("/{review_id}")
def delete_review(
    review_id: int,
    user: dict = Depends(verify_token),
):
    existing = (
        supabase.table("reviews")
        .select("*")
        .eq("id", review_id)
        .eq("user_id", int(user["sub"]))
        .execute()
    )

    if not existing.data:
        raise HTTPException(
            status_code=404,
            detail=f"Review {review_id} not found",
        )

    (
        supabase.table("reviews")
        .delete()
        .eq("id", review_id)
        .eq("user_id", int(user["sub"]))
        .execute()
    )

    return {
        "message": f"Review {review_id} deleted successfully"
    }


# -----------------------------
# REANALYZE ALL REVIEWS
# -----------------------------

@router.post("/reanalyze-all")
def reanalyze_all_reviews(
    user: dict = Depends(verify_token),
):
    try:

        response = (
            supabase.table("reviews")
            .select("*")
            .eq("user_id", int(user["sub"]))
            .execute()
        )

        reviews = response.data

        updated = 0

        for review in reviews:

            ai_result = analyze_review_with_ai(
                review["review_text"],
                review["guest_name"],
            )

            (
                supabase.table("reviews")
                .update(
                    {
                        "sentiment": ai_result["sentiment"],
                        "themes": ai_result["themes"],
                        "ai_response": ai_result["ai_response"],
                    }
                )
                .eq("id", review["id"])
                .eq("user_id", int(user["sub"]))
                .execute()
            )

            updated += 1

        return {
            "message": f"Successfully reanalyzed {updated} reviews."
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# -----------------------------
# FETCH ONLINE REVIEWS (GOOGLE, TRIPADVISOR, BOOKING.COM, AIRBNB)
# -----------------------------

@router.post("/fetch-online")
def fetch_online_reviews_endpoint(
    req: FetchReviewsRequest,
    user: dict = Depends(verify_token),
):
    if not req.hotel_name or not req.hotel_name.strip():
        raise HTTPException(status_code=400, detail="Hotel / Homestay name is required")

    try:
        reviews = fetch_online_hotel_reviews(req.hotel_name.strip(), req.location or "")
        return {
            "hotel_name": req.hotel_name.strip(),
            "location": req.location,
            "reviews": reviews,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch reviews: {str(e)}")