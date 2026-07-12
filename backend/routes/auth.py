from multiprocessing import get_context
import os
from fastapi import APIRouter, HTTPException, Depends
from database import supabase
from auth import hash_password, verify_password, create_token, verify_token
from models.user import UserRegister, UserLogin
from slowapi import Limiter
from slowapi.util import get_remote_address
from fastapi import Request
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")

limiter = Limiter(key_func=get_remote_address)
router = APIRouter()

@router.post("/google")
def google_login(payload: dict):
    """Verify Google token and log user in"""
    credential = payload.get("credential")
    if not credential:
        raise HTTPException(status_code=400, detail="No credential provided")

    try:
        # Verify the Google token
        idinfo = id_token.verify_oauth2_token(
            credential,
            google_requests.Request(),
            GOOGLE_CLIENT_ID
        )

        email = idinfo.get("email")
        name = idinfo.get("name")

        # Check if user exists
        existing = supabase.table("users").select("*").eq("email", email).execute()

        if existing.data:
            db_user = existing.data[0]
        else:
            # Create new user from Google
            new_user = {
                "email": email,
                "name": name,
                "password_hash": hash_password("google_oauth_no_password"),
            }
            response = supabase.table("users").insert(new_user).execute()
            db_user = response.data[0]

        token = create_token({"sub": str(db_user["id"]), "email": db_user["email"]})
        return {
            "message": "Google login successful",
            "token": token,
            "user": {
                "id": db_user["id"],
                "email": db_user["email"],
                "name": db_user["name"],
            }
        }
    except ValueError:
        raise HTTPException(status_code=401, detail="Invalid Google token")
@router.post("/register", status_code=201)
@limiter.limit("3/minute")
def register(request: Request,user: UserRegister):
    
    # Check duplicate email
    existing = supabase.table("users").select("id").eq("email", user.email).execute()
    if existing.data:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Validate password length
    if len(user.password) < 6:
        raise HTTPException(status_code=400, detail="Password must be at least 6 characters")

    if len(user.password) > 72:
        raise HTTPException(status_code=400, detail="Password must be less than 72 characters")
    # Hash password — never store plain text
    hashed = hash_password(user.password[:72])

    new_user = {
        "email": user.email,
        "password_hash": hashed,
        "name": user.name,
    }

    try:
        response = supabase.table("users").insert(new_user).execute()
        created = response.data[0]
        token = create_token({"sub": str(created["id"]), "email": created["email"]})
        return {
            "message": "Registration successful",
            "token": token,
            "user": {
                "id": created["id"],
                "email": created["email"],
                "name": created["name"],
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/login")
@limiter.limit("5/minute")
def login(request: Request,user: UserLogin):
    # Find user
    response = supabase.table("users").select("*").eq("email", user.email).execute()
    if not response.data:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    db_user = response.data[0]

    # Verify password
    if not verify_password(user.password, db_user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_token({"sub": str(db_user["id"]), "email": db_user["email"]})
    return {
        "message": "Login successful",
        "token": token,
        "user": {
            "id": db_user["id"],
            "email": db_user["email"],
            "name": db_user["name"],
        }
    }


@router.get("/me")
def get_me(payload: dict = Depends(verify_token)):
    """Protected route — returns current user info"""
    user_id = payload.get("sub")
    response = supabase.table("users").select("id, email, name, created_at").eq("id", user_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="User not found")
    return response.data[0]


@router.post("/logout")
def logout():
    """Logout — client should delete the token"""
    return {"message": "Logged out successfully"}