import { useState } from "react";
import { reviewsApi } from "../services/reviewsApi";

export default function Reviews() {
  const [guestName, setGuestName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!guestName || !reviewText) {
      setError("Please fill in both fields");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const data = await reviewsApi.create(guestName, reviewText);
      setResult(data);
    } catch (err) {
      setError("Failed to connect to backend. Make sure it's running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 max-w-3xl mx-auto px-8 pt-32 pb-24">
      <h1 className="text-3xl font-bold mb-2"
        style={{ fontFamily: "'Playfair Display', serif", color: "var(--text-dark)" }}>
        Review Analyzer
      </h1>
      <p className="text-sm mb-8" style={{ color: "var(--text-muted)" }}>
        Paste a guest review below to get instant AI analysis.
      </p>

      {/* Input form */}
      <div className="flex flex-col gap-4 mb-6">
        <input
          type="text"
          placeholder="Guest name"
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
          className="w-full px-4 py-3 text-sm rounded-xl outline-none"
          style={{ border: "1px solid #f0e6e0", color: "#2d1515" }}
        />
        <textarea
          placeholder="Paste guest review here..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          rows={5}
          className="w-full px-4 py-3 text-sm rounded-xl outline-none resize-none"
          style={{ border: "1px solid #f0e6e0", color: "#2d1515" }}
        />
        {error && <p className="text-xs" style={{ color: "#9b2335" }}>{error}</p>}
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="text-white font-semibold px-8 py-3.5 rounded-xl
                     hover:opacity-90 transition-opacity disabled:opacity-50"
          style={{ backgroundColor: "#9b2335" }}
        >
          {loading ? "Analyzing..." : "Analyze Review →"}
        </button>
      </div>

      {/* Result */}
      {result && (
        <div className="rounded-2xl p-6"
          style={{ backgroundColor: "var(--bg-card)", border: "1px solid #f0e6e0" }}>

          {/* Sentiment */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold" style={{ color: "var(--text-dark)" }}>
              {result.guest_name}'s Review
            </h2>
            <span className="text-xs font-semibold px-3 py-1 rounded-full capitalize"
              style={{
                backgroundColor: result.sentiment === "positive" ? "#f0faf0"
                  : result.sentiment === "negative" ? "#fdf0f2" : "#fdf8f0",
                color: result.sentiment === "positive" ? "#2d6a2d"
                  : result.sentiment === "negative" ? "#9b2335" : "#8a6a2a",
                border: `1px solid ${result.sentiment === "positive" ? "#c3e6c3"
                  : result.sentiment === "negative" ? "#f0c4c8" : "#f0e0b8"}`,
              }}>
              {result.sentiment}
            </span>
          </div>

          {/* Review text */}
          <p className="text-sm italic leading-relaxed mb-4"
            style={{ color: "var(--text-muted)" }}>
            "{result.review_text}"
          </p>

          {/* Themes */}
          <div className="flex flex-wrap gap-2 mb-4">
            {result.themes.map((t) => (
              <span key={t} className="text-xs px-3 py-1 rounded-full font-medium"
                style={{ backgroundColor: "#fdf0f2", color: "#9b2335", border: "1px solid #f0c4c8" }}>
                {t}
              </span>
            ))}
          </div>

          {/* AI Response */}
          <div className="rounded-xl p-4"
            style={{ backgroundColor: "var(--bg-inner)", border: "1px solid #f0e6e0" }}>
            <p className="text-xs font-semibold uppercase tracking-wider mb-2"
              style={{ color: "#9b2335" }}>
              AI Suggested Response
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              {result.ai_response}
            </p>
          </div>
        </div>
      )}
    </main>
  );
}