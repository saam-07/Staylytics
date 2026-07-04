## Database

**Choice: Supabase (PostgreSQL)**

We chose Supabase because:
- It provides a hosted PostgreSQL database with no setup required
- Has a simple Python client library
- Offers a built-in dashboard to view and manage data
- Free tier is sufficient for development
- Scales easily when needed

## Set up the Database

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project named `staylytics`
3. Go to SQL Editor and run the schema below
4. Copy your Project URL and anon key from Settings → API
5. Add them to your `.env` file

### Schema

```sql
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  guest_name VARCHAR(255) NOT NULL,
  review_text TEXT NOT NULL,
  sentiment VARCHAR(50) NOT NULL,
  themes TEXT[] NOT NULL DEFAULT '{}',
  ai_response TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP DEFAULT NOW()
);
```