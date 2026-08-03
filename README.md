# Staylytics

AI-powered guest review analytics platform for homestay businesses.

---

## What it does

Staylytics helps homestay owners analyze guest feedback instantly — classify sentiment, detect themes, and generate professional responses — without reading every review manually.

---
## Live Deployment

### Frontend
https://staylytics-seven.vercel.app/

### Backend
https://staylytics-a6i0.onrender.com/

API Documentation:
https://staylytics-a6i0.onrender.com/docs

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, Vite, Tailwind CSS |
| Backend | Python, FastAPI |
| Database | Supabase (PostgreSQL) |
| AI | Google Gemini API |
| Authentication | JWT Authentication, Google OAuth |
| Deployment | Vercel, Render |

---

## Project Structure

```
Staylytics/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── ui/
│   │   │       ├── Button.jsx
│   │   │       ├── Input.jsx
│   │   │       ├── Modal.jsx
│   │   │       ├── Toast.jsx
│   │   │       ├── Loader.jsx
│   │   │       └── index.js
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   └── Reviews.jsx
│   │   ├── context/
│   │   │   └── ThemeContext.jsx
│   │   └── services/
│   │       └── reviewsApi.js
└── backend/
    ├── main.py
    ├── database.py
    ├── requirements.txt
    ├── .env.example
    ├── models/
    │   └── review.py
    └── routes/
        └── reviews.py
```

---

## API Endpoints

| Method | Endpoint |
|---------|----------|
| POST | /api/auth/register |
| POST | /api/auth/login |
| POST | /api/auth/google |
| GET | /api/auth/me |
| POST | /api/auth/logout |
| GET | /reviews |
| POST | /reviews |
| PUT | /reviews/{id} |
| DELETE | /reviews/{id} |
| GET | /reviews/search |
| GET | /health |

---

## Database

**Choice: Supabase (PostgreSQL)**

We chose Supabase because:
- Hosted PostgreSQL with no infrastructure setup required
- Simple Python client library
- Built-in dashboard to view and manage data
- Free tier sufficient for development
- Easy to scale


### Schema

```sql
CREATE TABLE public.reviews (
    id SERIAL PRIMARY KEY,
    guest_name TEXT NOT NULL,
    review_text TEXT NOT NULL,
    sentiment TEXT,
    themes TEXT[],
    ai_response TEXT,
    rating INTEGER,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW()
);
```
Each review belongs to the authenticated user using the user_id foreign key

### Schema Diagram

![Staylytics Reviews Table Schema](./W5_SchemaDiagram_[TBI-26101328].png)

### Set up the database

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project named `staylytics`
3. Go to **SQL Editor** and run the schema above
4. Go to **Settings → API Keys** and copy your Project URL and anon key
5. Add them to your `.env` file

---

## How to Run Locally

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs at: `http://localhost:5173`

### Backend

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate (Windows)
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Fill in your Supabase credentials in .env

# Run server
uvicorn main:app --reload
```

Runs at: `http://localhost:8000`

API docs at: `http://localhost:8000/docs`

---

## Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_KEY=your_supabase_anon_key

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key

GOOGLE_CLIENT_ID=your_google_client_id

FRONTEND_URL=http://localhost:5173
```

---

## Features

- Secure user authentication using JWT
- Google OAuth Login
- AI-powered guest review analysis using Google Gemini
- Automatic sentiment detection
- Theme extraction from reviews
- AI-generated professional response suggestions
- User-specific review dashboard
- Full CRUD functionality
- Search reviews by keyword, sentiment, and themes
- Responsive UI
- Dark and Light mode
- Protected routes
- RESTful FastAPI backend
- Email/password authentication
- JWT-based authorization
- Google OAuth Sign-In

## Deployment

### Frontend

Hosted on Vercel.

Environment Variables

VITE_API_URL=https://staylytics-a6i0.onrender.com

VITE_GOOGLE_CLIENT_ID=<Google OAuth Client ID>

### Backend

Hosted on Render.

Environment Variables

SUPABASE_URL

SUPABASE_KEY

JWT_SECRET

GEMINI_API_KEY

GOOGLE_CLIENT_ID

FRONTEND_URL=https://staylytics-seven.vercel.app

## Known Limitations

- Render free tier spins down after inactivity.
- First request after inactivity may take 30–60 seconds.
- Gemini API usage depends on available free quota.

## Future Improvements

- Analytics dashboard with charts
- Export reports to PDF
- Email notifications
- Multi-property management
- AI trend analysis

## License

Developed as part of the TBI GEU AI Assisted Full Stack Internship Program.

## Author

**Saamya Narayan**

Developed as part of the TBI GEU AI Assisted Full Stack Internship Program.