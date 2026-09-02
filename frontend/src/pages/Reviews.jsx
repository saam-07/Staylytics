import { useEffect, useState } from "react";
import { reviewsApi } from "../services/reviewsApi";

export default function Reviews() {
  const [activeTab, setActiveTab] = useState("fetch"); // "fetch" | "manual"

  // Manual Review Form States
  const [guestName, setGuestName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Auto-Fetch Online States
  const [hotelSearch, setHotelSearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [fetchingOnline, setFetchingOnline] = useState(false);
  const [fetchedReviews, setFetchedReviews] = useState([]);
  const [fetchError, setFetchError] = useState("");
  const [analyzingIndex, setAnalyzingIndex] = useState(null);

  // Response Editing States
  const [copiedResponse, setCopiedResponse] = useState(false);
  const [copiedSentiment, setCopiedSentiment] = useState(false);
  const [, setReviews] = useState([]);
  const [editingResponse, setEditingResponse] = useState(false);
  const [editedResponse, setEditedResponse] = useState("");

  // Load existing reviews
  const fetchReviews = async () => {
    try {
      const data = await reviewsApi.getAll();
      setReviews(Array.isArray(data) ? data.reverse() : []);
    } catch (err) {
      console.error("Unable to fetch reviews", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Fetch online reviews for hotel/homestay
  const handleFetchOnline = async (e) => {
    if (e) e.preventDefault();
    if (!hotelSearch.trim()) {
      setFetchError("Please enter your hotel or homestay name.");
      return;
    }

    setFetchError("");
    setFetchingOnline(true);
    setFetchedReviews([]);

    try {
      const data = await reviewsApi.fetchOnlineReviews(hotelSearch.trim(), locationSearch.trim());
      setFetchedReviews(data.reviews || []);
      if (!data.reviews || data.reviews.length === 0) {
        setFetchError("No public reviews found for this property. Try specifying a city or area.");
      }
    } catch (err) {
      console.error("Fetch Online Error:", err);
      setFetchError(err.message || "Failed to search online reviews. Please try again.");
    } finally {
      setFetchingOnline(false);
    }
  };

  // Generate response for a specific fetched review
  const handleGenerateForFetched = async (rev, index) => {
    setAnalyzingIndex(index);
    setError("");
    setResult(null);
    setLoading(true);

    try {
      const data = await reviewsApi.create(rev.guest_name, rev.review_text, rev.rating);
      setResult(data);
      setEditedResponse(data.ai_response);
      await fetchReviews();

      // Smooth scroll to the result preview
      setTimeout(() => {
        document.getElementById("review-result-section")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err) {
      console.error(err);
      setError("Failed to generate response. Please ensure backend is running.");
    } finally {
      setLoading(false);
      setAnalyzingIndex(null);
    }
  };

  // Manual Review Analysis
  const handleAnalyze = async () => {
    if (!guestName.trim() || !reviewText.trim()) {
      setError("Please fill in both fields.");
      return;
    }

    setError("");
    setResult(null);
    setLoading(true);

    try {
      const data = await reviewsApi.create(guestName, reviewText);
      setResult(data);
      setEditedResponse(data.ai_response);
      await fetchReviews();
    } catch (err) {
      console.error(err);
      setError("Failed to connect to backend. Make sure it's running.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEditedResponse = async () => {
    if (!result) return;

    try {
      const updatedReview = await reviewsApi.update(result.id, {
        ai_response: editedResponse,
      });

      setResult(updatedReview);
      setEditingResponse(false);
      await fetchReviews();
    } catch (err) {
      console.error("Failed to update AI response", err);
      setError("Unable to save the edited response.");
    }
  };

  const handleAnalyzeAnother = () => {
    setGuestName("");
    setReviewText("");
    setResult(null);
    setEditedResponse("");
    setEditingResponse(false);
    setError("");
  };

  const copyResponse = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(editingResponse ? editedResponse : result.ai_response);
    setCopiedResponse(true);
    setTimeout(() => setCopiedResponse(false), 2000);
  };

  const copySentiment = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result.sentiment);
    setCopiedSentiment(true);
    setTimeout(() => setCopiedSentiment(false), 2000);
  };

  const sentimentStyle = {
    positive: {
      bg: "rgba(34, 197, 94, 0.15)",
      color: "#22c55e",
      border: "rgba(34, 197, 94, 0.35)",
    },
    neutral: {
      bg: "rgba(234, 179, 8, 0.15)",
      color: "#eab308",
      border: "rgba(234, 179, 8, 0.35)",
    },
    negative: {
      bg: "rgba(239, 68, 68, 0.15)",
      color: "#ef4444",
      border: "rgba(239, 68, 68, 0.35)",
    },
  };

  // Platform badges with clean professional styling
  const platformConfig = {
    "Google Reviews": {
      bg: "rgba(66, 133, 244, 0.16)",
      color: "#60a5fa",
      border: "rgba(96, 165, 250, 0.35)",
    },
    "TripAdvisor": {
      bg: "rgba(0, 175, 135, 0.16)",
      color: "#34d399",
      border: "rgba(52, 211, 153, 0.35)",
    },
    "Booking.com": {
      bg: "rgba(0, 53, 128, 0.22)",
      color: "#93c5fd",
      border: "rgba(147, 197, 253, 0.35)",
    },
    "Airbnb": {
      bg: "rgba(255, 90, 95, 0.18)",
      color: "#f87171",
      border: "rgba(248, 113, 113, 0.35)",
    },
    "MakeMyTrip": {
      bg: "rgba(235, 32, 38, 0.16)",
      color: "#fb7185",
      border: "rgba(251, 113, 133, 0.35)",
    },
  };

  const currentSentiment = sentimentStyle[result?.sentiment] || sentimentStyle.neutral;

  return (
    <main className="flex-1 max-w-4xl mx-auto px-6 md:px-8 pt-32 pb-24">
      {/* Header */}
      <div className="mb-8">
        <h1
          className="text-3xl md:text-4xl font-bold mb-3"
          style={{
            fontFamily: "'Playfair Display', serif",
            color: "var(--text-dark)",
          }}
        >
          Review Intelligence
        </h1>
        <p className="text-sm md:text-base max-w-2xl" style={{ color: "var(--text-muted)" }}>
          Search your property to automatically fetch authentic reviews from Google, TripAdvisor, Booking.com, and Airbnb, or paste reviews manually for sentiment analysis and response drafting.
        </p>
      </div>

      {/* Mode Switcher Tabs */}
      <div
        className="flex p-1.5 rounded-2xl mb-8 max-w-md backdrop-blur-md"
        style={{
          backgroundColor: "var(--bg-card)",
          border: "1px solid var(--border-card)",
        }}
      >
        <button
          onClick={() => setActiveTab("fetch")}
          className={`flex-1 py-2.5 px-4 text-xs md:text-sm font-semibold rounded-xl transition-all duration-200 flex items-center justify-center ${
            activeTab === "fetch"
              ? "text-white shadow-md"
              : "opacity-70 hover:opacity-100"
          }`}
          style={
            activeTab === "fetch"
              ? { background: "var(--btn-primary)" }
              : { color: "var(--text-dark)" }
          }
        >
          Auto-Fetch Reviews
        </button>

        <button
          onClick={() => setActiveTab("manual")}
          className={`flex-1 py-2.5 px-4 text-xs md:text-sm font-semibold rounded-xl transition-all duration-200 flex items-center justify-center ${
            activeTab === "manual"
              ? "text-white shadow-md"
              : "opacity-70 hover:opacity-100"
          }`}
          style={
            activeTab === "manual"
              ? { background: "var(--btn-primary)" }
              : { color: "var(--text-dark)" }
          }
        >
          Manual Input
        </button>
      </div>

      {/* ── TAB 1: AUTO-FETCH ONLINE REVIEWS ── */}
      {activeTab === "fetch" && (
        <div className="mb-10">
          <form
            onSubmit={handleFetchOnline}
            className="rounded-3xl p-6 md:p-8 mb-8 backdrop-blur-xl transition-all duration-300"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border-card)",
              boxShadow: "0 12px 36px -8px rgba(0,0,0,0.25)",
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-base font-semibold" style={{ color: "var(--text-dark)" }}>
                Search Your Property
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: "var(--text-accent)" }}>
                  Hotel / Homestay Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Zostel Rishikesh, The Pahadi Homestay, OYO 123"
                  value={hotelSearch}
                  onChange={(e) => setHotelSearch(e.target.value)}
                  className="w-full px-4 py-3 text-sm rounded-xl outline-none transition-colors"
                  style={{
                    backgroundColor: "var(--bg-inner)",
                    border: "1px solid var(--border-main)",
                    color: "var(--text-dark)",
                  }}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: "var(--text-accent)" }}>
                  Location / City
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rishikesh, Nainital"
                  value={locationSearch}
                  onChange={(e) => setLocationSearch(e.target.value)}
                  className="w-full px-4 py-3 text-sm rounded-xl outline-none transition-colors"
                  style={{
                    backgroundColor: "var(--bg-inner)",
                    border: "1px solid var(--border-main)",
                    color: "var(--text-dark)",
                  }}
                />
              </div>
            </div>

            {fetchError && (
              <p className="text-xs mb-4" style={{ color: "#ef4444" }}>
                {fetchError}
              </p>
            )}

            <div className="flex items-center justify-between flex-wrap gap-3">
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                Searches Google Reviews, TripAdvisor, Booking.com, Airbnb & MakeMyTrip
              </p>

              <button
                type="submit"
                disabled={fetchingOnline}
                className="text-white text-xs md:text-sm font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:shadow-lg disabled:opacity-60 flex items-center gap-2"
                style={{ background: "var(--btn-primary)" }}
              >
                {fetchingOnline ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Searching platforms...</span>
                  </>
                ) : (
                  <span>Fetch Top 5 Reviews</span>
                )}
              </button>
            </div>
          </form>

          {/* FETCHED REVIEWS LIST */}
          {fetchedReviews.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--text-accent)" }}>
                  Top Reviews Found for "{hotelSearch}" ({fetchedReviews.length})
                </h3>
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                  Click "Generate Response" to analyze any review
                </span>
              </div>

              <div className="grid gap-4">
                {fetchedReviews.map((rev, idx) => {
                  const plat = platformConfig[rev.platform] || {
                    bg: "rgba(142, 0, 79, 0.2)",
                    color: "var(--text-accent)",
                    border: "var(--border-main)",
                  };
                  const isAnalyzing = analyzingIndex === idx;

                  return (
                    <div
                      key={idx}
                      className="rounded-2xl p-5 transition-all duration-300 backdrop-blur-md relative"
                      style={{
                        backgroundColor: "var(--bg-card)",
                        border: "1px solid var(--border-card)",
                        boxShadow: "0 8px 24px -6px rgba(0,0,0,0.2)",
                      }}
                    >
                      {/* Top bar: Platform + Rating + Date */}
                      <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <span
                            className="text-xs font-semibold px-3 py-1 rounded-full flex items-center"
                            style={{
                              backgroundColor: plat.bg,
                              color: plat.color,
                              border: `1px solid ${plat.border}`,
                            }}
                          >
                            {rev.platform}
                          </span>

                          <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                            {rev.relative_date || "Recent"}
                          </span>
                        </div>

                        {/* Star Rating */}
                        <div className="flex items-center gap-1 text-xs">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} className={i < (rev.rating || 5) ? "text-amber-400" : "opacity-30"}>
                              ★
                            </span>
                          ))}
                          <span className="ml-1 font-semibold" style={{ color: "var(--text-dark)" }}>
                            {rev.rating ? `${rev.rating}.0` : "5.0"}
                          </span>
                        </div>
                      </div>

                      {/* Guest name & review text */}
                      <p className="text-xs font-semibold mb-1" style={{ color: "var(--text-dark)" }}>
                        {rev.guest_name}
                      </p>
                      <p className="text-sm italic leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
                        "{rev.review_text}"
                      </p>

                      {/* Action bar */}
                      <div className="flex items-center justify-between flex-wrap gap-3 pt-3 border-t" style={{ borderColor: "var(--border-main)" }}>
                        <span
                          className="text-xs font-medium px-2.5 py-0.5 rounded-md flex items-center gap-1.5"
                          style={{
                            backgroundColor:
                              rev.sentiment === "positive"
                                ? "rgba(34, 197, 94, 0.15)"
                                : rev.sentiment === "negative"
                                ? "rgba(239, 68, 68, 0.15)"
                                : "rgba(234, 179, 8, 0.15)",
                            color:
                              rev.sentiment === "positive"
                                ? "#22c55e"
                                : rev.sentiment === "negative"
                                ? "#ef4444"
                                : "#eab308",
                          }}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full inline-block"
                            style={{
                              backgroundColor:
                                rev.sentiment === "positive"
                                  ? "#22c55e"
                                  : rev.sentiment === "negative"
                                  ? "#ef4444"
                                  : "#eab308",
                            }}
                          />
                          {rev.sentiment ? rev.sentiment.toUpperCase() : "REVIEW"}
                        </span>

                        <button
                          onClick={() => handleGenerateForFetched(rev, idx)}
                          disabled={loading}
                          className="text-xs font-semibold px-4 py-2 rounded-xl text-white transition-all duration-200 hover:scale-105 hover:shadow-md disabled:opacity-50 flex items-center gap-1.5"
                          style={{ background: "var(--btn-primary)" }}
                        >
                          {isAnalyzing ? (
                            <>
                              <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              <span>Generating Response...</span>
                            </>
                          ) : (
                            <span>Generate AI Response</span>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── TAB 2: MANUAL REVIEW INPUT FORM ── */}
      {activeTab === "manual" && (
        <div
          className="rounded-3xl p-6 md:p-8 mb-8 backdrop-blur-xl"
          style={{
            backgroundColor: "var(--bg-card)",
            border: "1px solid var(--border-card)",
            boxShadow: "0 12px 36px -8px rgba(0,0,0,0.25)",
          }}
        >
          <h2 className="text-base font-semibold mb-4" style={{ color: "var(--text-dark)" }}>
            Paste Single Review
          </h2>

          <div className="flex flex-col gap-4 mb-4">
            <input
              type="text"
              placeholder="Guest Name (e.g. Rahul Sharma)"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full px-4 py-3 text-sm rounded-xl outline-none"
              style={{
                backgroundColor: "var(--bg-inner)",
                border: "1px solid var(--border-main)",
                color: "var(--text-dark)",
              }}
            />

            <textarea
              rows={5}
              placeholder="Paste guest review text here..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="w-full px-4 py-3 text-sm rounded-xl outline-none resize-none"
              style={{
                backgroundColor: "var(--bg-inner)",
                border: "1px solid var(--border-main)",
                color: "var(--text-dark)",
              }}
            />

            {error && (
              <p className="text-xs" style={{ color: "#ef4444" }}>
                {error}
              </p>
            )}

            <div className="flex flex-wrap gap-3 mt-2">
              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="text-white text-xs md:text-sm font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 hover:shadow-lg disabled:opacity-60 flex items-center gap-2"
                style={{ background: "var(--btn-primary)" }}
              >
                {loading ? "Analyzing Review..." : "Analyze & Generate Response →"}
              </button>

              {result && (
                <button
                  onClick={handleAnalyzeAnother}
                  className="px-6 py-3 rounded-xl text-xs md:text-sm font-medium transition"
                  style={{
                    border: "1px solid var(--border-card)",
                    color: "var(--text-accent)",
                    background: "var(--bg-inner)",
                  }}
                >
                  Clear & Analyze Another
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── LOADING SPINNER ── */}
      {loading && (
        <div
          className="rounded-3xl p-6 mb-8 backdrop-blur-md animate-pulse"
          style={{
            border: "1px solid var(--border-card)",
            backgroundColor: "var(--bg-card)",
          }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-8 h-8 rounded-full border-4 border-t-transparent animate-spin"
              style={{
                borderColor: "var(--text-accent)",
                borderTopColor: "transparent",
              }}
            />

            <div>
              <h3 className="font-semibold" style={{ color: "var(--text-dark)" }}>
                Staylytics AI is analyzing the review...
              </h3>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                Extracting sentiment, themes, and crafting response draft.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── RESULT & AI SUGGESTED RESPONSE PREVIEW ── */}
      {!loading && result && (
        <div
          id="review-result-section"
          className="rounded-3xl p-6 md:p-8 backdrop-blur-xl transition-all duration-300"
          style={{
            backgroundColor: "var(--bg-card)",
            border: "1.5px solid var(--border-card)",
            boxShadow: "0 20px 48px -10px rgba(0,0,0,0.3)",
          }}
        >
          <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
            <div>
              <p className="text-xs uppercase font-semibold tracking-wider mb-1" style={{ color: "var(--text-accent)" }}>
                Analysis Result
              </p>
              <h2 className="text-lg font-semibold" style={{ color: "var(--text-dark)" }}>
                {result.guest_name}'s Review
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span
                className="text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5"
                style={{
                  background: currentSentiment.bg,
                  color: currentSentiment.color,
                  border: `1px solid ${currentSentiment.border}`,
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: currentSentiment.color }} />
                {result.sentiment ? result.sentiment.charAt(0).toUpperCase() + result.sentiment.slice(1) : "Neutral"}
              </span>

              <button
                onClick={copySentiment}
                className="text-xs px-3 py-1 rounded-lg transition hover:opacity-80"
                style={{
                  border: "1px solid var(--border-main)",
                  color: "var(--text-accent)",
                  background: "var(--bg-inner)",
                }}
              >
                {copiedSentiment ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          <p className="text-sm italic leading-relaxed mb-5" style={{ color: "var(--text-secondary)" }}>
            "{result.review_text}"
          </p>

          {/* Theme tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {result.themes &&
              result.themes.map((theme) => (
                <span
                  key={theme}
                  className="text-xs px-3 py-1 rounded-full font-medium"
                  style={{
                    backgroundColor: "var(--bg-inner)",
                    color: "var(--text-accent)",
                    border: "1px solid var(--border-main)",
                  }}
                >
                  {theme}
                </span>
              ))}
          </div>

          {/* AI Response Card */}
          <div
            className="rounded-2xl p-5 mb-6"
            style={{
              background: "var(--bg-inner)",
              border: "1px solid var(--border-main)",
            }}
          >
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-accent)" }}>
                AI Suggested Response
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setEditingResponse(true);
                    setEditedResponse(result.ai_response);
                  }}
                  className="text-xs px-3 py-1 rounded-lg transition hover:opacity-80"
                  style={{
                    border: "1px solid var(--border-main)",
                    color: "var(--text-accent)",
                    background: "var(--bg-card)",
                  }}
                >
                  Edit Response
                </button>

                <button
                  onClick={copyResponse}
                  className="text-xs px-3 py-1 rounded-lg transition hover:opacity-80"
                  style={{
                    border: "1px solid var(--border-main)",
                    color: "var(--text-accent)",
                    background: "var(--bg-card)",
                  }}
                >
                  {copiedResponse ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>

            {editingResponse ? (
              <>
                <textarea
                  rows={5}
                  value={editedResponse}
                  onChange={(e) => setEditedResponse(e.target.value)}
                  className="w-full px-4 py-3 text-sm rounded-xl resize-none outline-none"
                  style={{
                    border: "1px solid var(--border-main)",
                    color: "var(--text-dark)",
                    background: "var(--bg-card)",
                  }}
                />

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={handleSaveEditedResponse}
                    className="text-white px-5 py-2 rounded-xl text-xs font-semibold"
                    style={{ background: "var(--btn-primary)" }}
                  >
                    Save Changes
                  </button>

                  <button
                    onClick={() => {
                      setEditingResponse(false);
                      setEditedResponse(result.ai_response);
                    }}
                    className="px-5 py-2 rounded-xl text-xs"
                    style={{
                      border: "1px solid var(--border-main)",
                      color: "var(--text-dark)",
                      background: "var(--bg-card)",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {result.ai_response}
              </p>
            )}
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleAnalyzeAnother}
              className="px-6 py-2.5 rounded-xl text-xs font-semibold text-white transition hover:shadow-md"
              style={{ background: "var(--btn-primary)" }}
            >
              Analyze Another Review
            </button>
          </div>
        </div>
      )}
    </main>
  );
}