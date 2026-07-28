import { useEffect, useState } from "react";
import { reviewsApi } from "../services/reviewsApi";

export default function Reviews() {
  const [guestName, setGuestName] = useState("");
  const [reviewText, setReviewText] = useState("");

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [copiedResponse, setCopiedResponse] = useState(false);
  const [copiedSentiment, setCopiedSentiment] = useState(false);

  // New states
  const [ setReviews] = useState([]);
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

  const handleAnalyze = async () => {
    if (!guestName.trim() || !reviewText.trim()) {
      setError("Please fill in both fields.");
      return;
    }

    setError("");
    setResult(null);
    setLoading(true);

    try {
      const data = await reviewsApi.create(
        guestName,
        reviewText
      );

      setResult(data);
      setEditedResponse(data.ai_response);

      // refresh history page data
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

    await navigator.clipboard.writeText(
      editingResponse ? editedResponse : result.ai_response
    );

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
      bg: "#eef9f1",
      color: "#2e7d32",
      border: "#b7e4c7",
      icon: "🟢",
    },
    neutral: {
      bg: "#fff8e8",
      color: "#9a6700",
      border: "#f2d38d",
      icon: "🟡",
    },
    negative: {
      bg: "#fdf0f2",
      color: "#9b2335",
      border: "#f3c4cb",
      icon: "🔴",
    },
  };

  const currentSentiment =
    sentimentStyle[result?.sentiment] || sentimentStyle.neutral;
      return (
    <main className="flex-1 max-w-3xl mx-auto px-8 pt-32 pb-24">
      <h1
        className="text-3xl font-bold mb-2"
        style={{
          fontFamily: "'Playfair Display', serif",
          color: "var(--text-dark)",
        }}
      >
        Review Analyzer
      </h1>

      <p
        className="text-sm mb-8"
        style={{ color: "var(--text-muted)" }}
      >
        Paste a guest review below and let Staylytics analyze the sentiment,
        identify key themes, and generate a professional response.
      </p>

      {/* INPUT FORM */}

      <div className="flex flex-col gap-4 mb-6">
        <input
          type="text"
          placeholder="Guest Name"
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
          className="w-full px-4 py-3 text-sm rounded-xl outline-none"
          style={{
            border: "1px solid #f0e6e0",
            color: "#2d1515",
          }}
        />

        <textarea
          rows={5}
          placeholder="Paste guest review here..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          className="w-full px-4 py-3 text-sm rounded-xl outline-none resize-none"
          style={{
            border: "1px solid #f0e6e0",
            color: "#2d1515",
          }}
        />

        {error && (
          <p
            className="text-sm"
            style={{ color: "#9b2335" }}
          >
            {error}
          </p>
        )}

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="text-white font-semibold px-8 py-3.5 rounded-xl transition-opacity disabled:opacity-60"
            style={{
              backgroundColor: "#9b2335",
            }}
          >
            {loading ? "Analyzing Review..." : "Analyze Review →"}
          </button>

          {result && (
            <button
              onClick={handleAnalyzeAnother}
              className="px-6 py-3 rounded-xl transition"
              style={{
                border: "1px solid #f0c4c8",
                color: "#9b2335",
                background: "#fff",
              }}
            >
              Analyze Another
            </button>
          )}
        </div>
      </div>

      {/* LOADING */}

      {loading && (
        <div
          className="rounded-2xl p-6 mb-6 animate-pulse"
          style={{
            border: "1px solid #f0e6e0",
            backgroundColor: "#fff",
          }}
        >
          <div className="flex items-center gap-4 mb-5">
            <div
              className="w-8 h-8 rounded-full border-4 border-t-transparent animate-spin"
              style={{
                borderColor: "#9b2335",
                borderTopColor: "transparent",
              }}
            />

            <div>
              <h3
                className="font-semibold"
                style={{ color: "var(--text-dark)" }}
              >
                Staylytics AI is analyzing your review...
              </h3>

              <p
                className="text-sm"
                style={{ color: "var(--text-muted)" }}
              >
                Please wait a moment.
              </p>
            </div>
          </div>

          <div
            className="space-y-2 text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            <p>Reading guest review</p>
            <p>Detecting sentiment</p>
            <p>Identifying key themes</p>
            <p>Generating AI response</p>
          </div>
        </div>
      )}

      
      {/* RESULT */}
            {!loading && result && (
        <div
          className="rounded-2xl p-6"
          style={{
            backgroundColor: "var(--bg-card)",
            border: "1px solid #f0e6e0",
          }}
        >
          <div className="flex items-center justify-between mb-5">
            <h2
              className="text-lg font-semibold"
              style={{ color: "var(--text-dark)" }}
            >
              {result.guest_name}'s Review
            </h2>

            <div className="flex items-center gap-2">
              <span
                className="text-xs font-semibold px-3 py-1 rounded-full"
                style={{
                  background: currentSentiment.bg,
                  color: currentSentiment.color,
                  border: `1px solid ${currentSentiment.border}`,
                }}
              >
                {currentSentiment.icon}{" "}
                {result.sentiment.charAt(0).toUpperCase() +
                  result.sentiment.slice(1)}
              </span>

              <button
                onClick={copySentiment}
                className="text-xs px-3 py-1 rounded-lg transition hover:opacity-80"
                style={{
                  border: "1px solid #f0c4c8",
                  color: "#9b2335",
                }}
              >
                {copiedSentiment ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          <p
            className="text-sm italic leading-relaxed mb-4"
            style={{ color: "var(--text-muted)" }}
          >
            "{result.review_text}"
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {result.themes.map((theme) => (
              <span
                key={theme}
                className="text-xs px-3 py-1 rounded-full font-medium"
                style={{
                  backgroundColor: "#fdf0f2",
                  color: "#9b2335",
                  border: "1px solid #f0c4c8",
                }}
              >
                {theme}
              </span>
            ))}
          </div>

          {/* AI Response */}

          <div
            className="rounded-xl p-5"
            style={{
              background: "var(--bg-inner)",
              border: "1px solid #f0e6e0",
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <p
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: "#9b2335" }}
              >
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
                    border: "1px solid #f0c4c8",
                    color: "#9b2335",
                  }}
                >
                  Edit Response
                </button>

                <button
                  onClick={copyResponse}
                  className="text-xs px-3 py-1 rounded-lg transition hover:opacity-80"
                  style={{
                    border: "1px solid #f0c4c8",
                    color: "#9b2335",
                  }}
                >
                  {copiedResponse ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
                        {editingResponse ? (
              <>
                <textarea
                  rows={6}
                  value={editedResponse}
                  onChange={(e) => setEditedResponse(e.target.value)}
                  className="w-full px-4 py-3 text-sm rounded-xl resize-none outline-none"
                  style={{
                    border: "1px solid #f0e6e0",
                    color: "var(--text-dark)",
                    background: "#fff",
                  }}
                />

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={handleSaveEditedResponse}
                    className="text-white px-5 py-2 rounded-lg text-sm font-medium"
                    style={{
                      background: "#9b2335",
                    }}
                  >
                    Save
                  </button>

                  <button
                    onClick={() => {
                      setEditingResponse(false);
                      setEditedResponse(result.ai_response);
                    }}
                    className="px-5 py-2 rounded-lg text-sm"
                    style={{
                      border: "1px solid #f0c4c8",
                      color: "#9b2335",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <p
                className="text-sm leading-7"
                style={{ color: "var(--text-muted)" }}
              >
                {result.ai_response}
              </p>
            )}
          </div>

          {/* Review Information */}

          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <div
              className="rounded-xl p-4"
              style={{
                background: "#fffdfc",
                border: "1px solid #f0e6e0",
              }}
            >
              <p
                className="text-xs uppercase font-semibold mb-2"
                style={{ color: "#9b2335" }}
              >
                Guest
              </p>

              <p
                className="font-medium"
                style={{ color: "var(--text-dark)" }}
              >
                {result.guest_name}
              </p>
            </div>

            <div
              className="rounded-xl p-4"
              style={{
                background: "#fffdfc",
                border: "1px solid #f0e6e0",
              }}
            >
              <p
                className="text-xs uppercase font-semibold mb-2"
                style={{ color: "#9b2335" }}
              >
                Analysis Completed
              </p>

              <p
                className="font-medium"
                style={{ color: "var(--text-dark)" }}
              >
                Successfully analyzed by Staylytics AI
              </p>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleAnalyzeAnother}
              className="px-6 py-3 rounded-xl transition"
              style={{
                background: "#9b2335",
                color: "#fff",
              }}
            >
              Analyze Another Review
            </button>
          </div>
        </div>
      )}
    </main>
  );
}