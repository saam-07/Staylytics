from pydantic import BaseModel, EmailStr
from typing import Optional

class UserRegister(BaseModel):
    """Schema for user registration"""
    email: EmailStr
    password: str
    name: Optional[str] = None

class UserLogin(BaseModel):
    """Schema for user login"""
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    """Schema for user response"""
    id: int
    email: str
    name: Optional[str]
    created_at: str