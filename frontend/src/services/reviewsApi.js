// src/services/reviewsApi.js
// Connect React frontend to FastAPI backend

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const reviewsApi = {

  // GET all reviews
  getAll: async () => {
    const res = await fetch(`${BASE_URL}/reviews`);
    if (!res.ok) throw new Error("Failed to fetch reviews");
    return res.json();
  },

  // GET single review
  getById: async (id) => {
    const res = await fetch(`${BASE_URL}/reviews/${id}`);
    if (!res.ok) throw new Error(`Review ${id} not found`);
    return res.json();
  },

  // POST create + analyze review
  create: async (guestName, reviewText, rating = null) => {
    const res = await fetch(`${BASE_URL}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        guest_name: guestName,
        review_text: reviewText,
        rating,
      }),
    });
    if (!res.ok) throw new Error("Failed to create review");
    return res.json();
  },

  // PUT update review
  update: async (id, data) => {
    const res = await fetch(`${BASE_URL}/reviews/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update review");
    return res.json();
  },

  // DELETE review
  delete: async (id) => {
    const res = await fetch(`${BASE_URL}/reviews/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete review");
    return res.json();
  },

  // GET search/filter
  search: async ({ sentiment, theme, keyword } = {}) => {
    const params = new URLSearchParams();
    if (sentiment) params.append("sentiment", sentiment);
    if (theme) params.append("theme", theme);
    if (keyword) params.append("keyword", keyword);
    const res = await fetch(`${BASE_URL}/reviews/search?${params}`);
    if (!res.ok) throw new Error("Search failed");
    return res.json();
  },
};
