const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const getAuthHeader = () => {
  const token = localStorage.getItem("staylytics_token");
  // Don't send guest token to backend
  if (!token || token === "guest") return {};
  return { "Authorization": `Bearer ${token}` };
};
export const reviewsApi = {

  // GET all reviews
// GET all reviews — remove the mapping, return raw data
getAll: async () => {
  const headers = getAuthHeader();
  if (!headers || Object.keys(headers).length === 0) return []; // guest sees empty
  const res = await fetch(`${BASE_URL}/reviews`, {
    headers: { ...headers }
  });
  if (!res.ok) throw new Error("Failed to fetch reviews");
  return res.json(); // return raw — same as other functions
},



  // GET single review
  // GET single review
getById: async (id) => {
  const res = await fetch(`${BASE_URL}/reviews/${id}`, {
    headers: {
      ...getAuthHeader(),
    },
  });

  if (!res.ok) throw new Error(`Review ${id} not found`);
  return res.json();
},

  // POST create + analyze review
 create: async (guestName, reviewText, rating = null) => {
  const headers = getAuthHeader();
  if (!headers || Object.keys(headers).length === 0) {
    throw new Error("Please log in to analyze and save reviews.");
  }
  const res = await fetch(`${BASE_URL}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers
    },
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
  // PUT update review
update: async (id, data) => {
  const res = await fetch(`${BASE_URL}/reviews/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update review");
  return res.json();
},

  // DELETE review
delete: async (id) => {
  const res = await fetch(`${BASE_URL}/reviews/${id}`, {
    method: "DELETE",
    headers: { ...getAuthHeader() }
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
  const res = await fetch(`${BASE_URL}/reviews/search?${params}`, {
    headers: { ...getAuthHeader() }
  });
  if (!res.ok) throw new Error("Search failed");
  return res.json();
},
};
