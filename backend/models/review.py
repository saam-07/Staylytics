from pydantic import BaseModel, Field
from typing import Optional, List


class ReviewCreate(BaseModel):
    """Schema for creating a new review"""

    guest_name: str
    review_text: str
    rating: Optional[int] = Field(
        default=None,
        ge=1,
        le=5,
        description="Rating from 1 to 5"
    )


class ReviewUpdate(BaseModel):
    """Schema for updating an existing review"""

    guest_name: Optional[str] = None
    review_text: Optional[str] = None
    sentiment: Optional[str] = None
    themes: Optional[List[str]] = None
    ai_response: Optional[str] = None
    rating: Optional[int] = Field(
        default=None,
        ge=1,
        le=5,
        description="Rating from 1 to 5"
    )


class ReviewResponse(BaseModel):
    """Schema returned by the API"""

    id: int
    guest_name: str
    review_text: str
    sentiment: str
    themes: List[str]
    ai_response: str
    rating: Optional[int] = None
    created_at: str