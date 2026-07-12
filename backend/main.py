from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from routes.reviews import router as reviews_router
from routes.auth import router as auth_router
import os
from dotenv import load_dotenv

load_dotenv()

limiter = Limiter(key_func=get_remote_address)

app = FastAPI(
    title="Staylytics API",
    description="AI-powered review analytics backend for homestay businesses",
    version="1.0.0",
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        os.getenv("FRONTEND_URL", "*"),
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error", "error": str(exc)},
    )

app.include_router(reviews_router, prefix="/reviews", tags=["Reviews"])
app.include_router(auth_router, prefix="/api/auth", tags=["Auth"])

@app.get("/")
def root():
    return {"message": "Staylytics API is running", "version": "1.0.0", "docs": "/docs"}

@app.get("/health")
def health_check():
    return {"status": "ok"}