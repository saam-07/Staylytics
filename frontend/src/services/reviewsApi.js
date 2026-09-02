const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const getAuthHeader = () => {
  const token = localStorage.getItem("staylytics_token");
  // Don't send guest or empty token to backend
  if (!token || token === "guest" || token === "null" || token === "undefined") {
    return {};
  }
  return { "Authorization": `Bearer ${token}` };
};

const handleAuthError = (res) => {
  if (res.status === 401) {
    // Stale or expired token; clear it so subsequent requests don't fail
    localStorage.removeItem("staylytics_token");
    localStorage.removeItem("staylytics_user");
  }
};

export const reviewsApi = {
  // GET all reviews
  getAll: async () => {
    const headers = getAuthHeader();
    if (!headers || Object.keys(headers).length === 0) return [];

    try {
      const res = await fetch(`${BASE_URL}/reviews`, {
        headers: { ...headers },
      });
      if (res.status === 401) {
        handleAuthError(res);
        return [];
      }
      if (!res.ok) return [];
      return res.json();
    } catch {
      return [];
    }
  },

  // GET single review
  getById: async (id) => {
    const res = await fetch(`${BASE_URL}/reviews/${id}`, {
      headers: {
        ...getAuthHeader(),
      },
    });

    if (res.status === 401) {
      handleAuthError(res);
      throw new Error("Session expired. Please log in again.");
    }
    if (!res.ok) throw new Error(`Review ${id} not found`);
    return res.json();
  },

  // POST create + analyze review
  create: async (guestName, reviewText, rating = null) => {
    const headers = getAuthHeader();

    const res = await fetch(`${BASE_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify({
        guest_name: guestName,
        review_text: reviewText,
        rating,
      }),
    });

    if (!res.ok) {
      if (res.status === 401) {
        handleAuthError(res);
        // Retry as guest without expired token so user can still see AI analysis result
        const retryRes = await fetch(`${BASE_URL}/reviews`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            guest_name: guestName,
            review_text: reviewText,
            rating,
          }),
        });
        if (retryRes.ok) return retryRes.json();
        throw new Error("Your session expired. Please log in again.");
      }
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.detail || "Failed to analyze review");
    }
    return res.json();
  },

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

    if (res.status === 401) {
      handleAuthError(res);
      throw new Error("Session expired. Please log in again.");
    }
    if (!res.ok) throw new Error("Failed to update review");
    return res.json();
  },

  // DELETE review
  delete: async (id) => {
    const res = await fetch(`${BASE_URL}/reviews/${id}`, {
      method: "DELETE",
      headers: { ...getAuthHeader() },
    });
    if (res.status === 401) {
      handleAuthError(res);
      throw new Error("Session expired. Please log in again.");
    }
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
      headers: { ...getAuthHeader() },
    });
    if (res.status === 401) {
      handleAuthError(res);
      return [];
    }
    if (!res.ok) throw new Error("Search failed");
    return res.json();
  },

  // POST fetch online hotel reviews from Google, TripAdvisor, Booking.com, Airbnb
  fetchOnlineReviews: async (hotelName, location = "") => {
    const headers = getAuthHeader();
    const res = await fetch(`${BASE_URL}/reviews/fetch-online`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify({
        hotel_name: hotelName,
        location: location,
      }),
    });

    if (!res.ok) {
      if (res.status === 401) {
        handleAuthError(res);
        // Retry immediately without expired token header
        const retryRes = await fetch(`${BASE_URL}/reviews/fetch-online`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            hotel_name: hotelName,
            location: location,
          }),
        });
        if (retryRes.ok) return retryRes.json();
      }
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.detail || "Failed to fetch online reviews");
    }
    return res.json();
  },
};
