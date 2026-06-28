from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from routes.reviews import router as reviews_router
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="Staylytics API",
    description="AI-powered review analytics backend for homestay businesses",
    version="1.0.0",
)

# ── CORS — allow frontend to call backend ──
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",   # Vite dev server
        "http://localhost:3000",
        os.getenv("FRONTEND_URL", "*"),
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Global error handler ──
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error", "error": str(exc)},
    )

# ── Routes ──
app.include_router(reviews_router, prefix="/reviews", tags=["Reviews"])

# ── Root ──
@app.get("/")
def root():
    return {
        "message": "Staylytics API is running",
        "version": "1.0.0",
        "docs": "/docs",
    }

# ── Health check ──
@app.get("/health")
def health_check():
    return {"status": "ok"}
