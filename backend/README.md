# FastAPI Backend 
# Staylytics Backend API

AI-powered review analytics backend built with FastAPI.

## Tech Stack
- **Framework:** FastAPI
- **Language:** Python 3.10+
- **Validation:** Pydantic
- **Server:** Uvicorn

## How to Run Locally

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/staylytics.git
cd staylytics/backend
```

### 2. Create virtual environment
```bash
python -m venv venv

# Windows:
venv\Scripts\activate

# Mac/Linux:
source venv/bin/activate
```

### 3. Install dependencies
```bash
pip install -r requirements.txt
```

### 4. Set up environment variables
```bash
cp .env.example .env
# Edit .env and fill in your values
```

### 5. Run the server
```bash
uvicorn main:app --reload
```

Server runs at: **http://localhost:8000**

API docs at: **http://localhost:8000/docs**

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/reviews` | Get all reviews |
| GET | `/reviews/{id}` | Get single review |
| POST | `/reviews` | Create and analyze a review |
| PUT | `/reviews/{id}` | Update a review |
| DELETE | `/reviews/{id}` | Delete a review |
| GET | `/reviews/search` | Search/filter reviews |
| GET | `/health` | Health check |

---

## Example Request

```bash
curl -X POST http://localhost:8000/reviews \
  -H "Content-Type: application/json" \
  -d '{
    "guest_name": "Priya Sharma",
    "review_text": "The host family was incredibly warm and breakfast was outstanding!",
    "rating": 5
  }'
```

## Example Response

```json
{
  "id": 1,
  "guest_name": "Priya Sharma",
  "review_text": "The host family was incredibly warm and breakfast was outstanding!",
  "sentiment": "positive",
  "themes": ["Food", "Host"],
  "ai_response": "Thank you so much for your wonderful feedback! We are glad our local cuisine made an impression. Our team works hard to make every guest feel welcome. We hope to welcome you back soon!",
  "rating": 5,
  "created_at": "2026-06-28T10:30:00"
}
```
