import { Link } from "react-router-dom";
import { useState} from "react";

export default function Hero() {
  const [copied, setCopied] = useState(false);
  const [activeTag, setActiveTag] = useState(null);

  const tags = ["Food", "Host", "Experience", "WiFi", "Cleanliness", "Location"];

  const handleCopy = () => {
    navigator.clipboard.writeText(
      "Thank you for your kind words! We're actively improving WiFi connectivity for all our guests and hope to welcome you back soon."
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      className="min-h-screen flex items-center pt-32 py-24"
      style={{ backgroundColor: "#4a1428" }}
    >
      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center">

        {/* ── LEFT ── */}
        <div>
          {/* Eyebrow */}
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-6"
            style={{ color: "#e8a0a8" }}
          >
            — Review Analytics for Homestays
          </p>

          {/* Headline */}
          <h1
            className="font-bold leading-tight mb-6"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.4rem, 4vw, 4rem)",
              color: "#fdfaf6",
            }}
          >
            Your guests are talking.
            <br />
            <span className="italic" style={{ color: "#e8a0a8" }}>
              Start listening.
            </span>
          </h1>

          {/* Subtext — blush pink */}
          <p
            className="text-base leading-relaxed mb-10 max-w-md"
            style={{ color: "#e8c4c8" }}
          >
            Paste any guest review and get instant sentiment analysis, theme
            tags, and a professional response draft — built for homestay
            businesses across Uttarakhand.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <Link
              to="/reviews"
              className="text-white font-semibold px-8 py-3.5 rounded-xl
                         hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
              style={{ backgroundColor: "#9b2335" }}
            >
              Start Analyzing →
            </Link>
            <Link
              to="/dashboard"
              className="font-semibold px-8 py-3.5 rounded-xl
                         hover:opacity-80 transition-all duration-200"
              style={{ border: "1px solid rgba(232,160,168,0.4)", color: "#e8a0a8" }}
            >
              View Dashboard
            </Link>
          </div>
        </div>

        {/* ── RIGHT — interactive mock card ── */}
        <div
          className="rounded-2xl p-6"
          style={{
            backgroundColor: "#7a2040",
            border: "1px solid rgba(232,160,168,0.35)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.3)",
          }}
        >
          {/* Card header */}
          <div className="flex justify-between items-center mb-5">
            <span
              className="text-sm font-semibold"
              style={{ color: "#e8a0a8" }}
            >
              Sample Review
            </span>
            <span
              className="text-xs font-semibold px-3 py-1 rounded-full"
              style={{
                backgroundColor: "rgba(34,85,34,0.25)",
                color: "#6dbf6d",
                border: "1px solid rgba(109,191,109,0.25)",
              }}
            >
              Positive
            </span>
          </div>

          {/* Review text box */}
          <div
            className="rounded-xl p-4 mb-5"
            style={{
              backgroundColor: "#4d1428",
              border: "1px solid rgba(232,160,168,0.1)",
            }}
          >
            <p
              className="text-sm leading-relaxed italic"
              style={{ color: "#f0d0d4" }}
            >
              "The host family was incredibly warm and the local breakfast was
              outstanding. The mountain view was breathtaking. WiFi could be
              more reliable though."
            </p>
          </div>

          {/* Theme tags label */}
          <p
            className="text-xs mb-3 uppercase tracking-wider font-semibold"
            style={{ color: "rgba(232,160,168,0.7)" }}
          >
            Tap a theme tag
          </p>

          {/* Tags */}
          <div className="flex gap-2 flex-wrap mb-3">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTag(activeTag === t ? null : t)}
                className="text-xs px-3 py-1.5 rounded-full font-medium transition-all duration-200"
                style={
                  activeTag === t
                    ? {
                        backgroundColor: "#9b2335",
                        color: "#fdfaf6",
                        border: "1px solid #9b2335",
                      }
                    : {
                        backgroundColor: "rgba(155,35,53,0.2)",
                        color: "#e8a0a8",
                        border: "1px solid rgba(232,160,168,0.2)",
                      }
                }
              >
                {t}
              </button>
            ))}
          </div>

          {/* Tag hint */}
          <div
            className={`text-xs italic mb-4 min-h-6 transition-all duration-200 ${
              activeTag ? "opacity-100" : "opacity-0"
            }`}
            style={{ color: "rgba(232,160,168,0.6)" }}
          >
            {activeTag && `Guests mentioned "${activeTag}" in this review.`}
          </div>

          {/* AI Response box */}
          <div
            className="rounded-xl p-4"
            style={{
              backgroundColor: "rgba(155,35,53,0.2)",
              border: "1px solid rgba(232,160,168,0.15)",
            }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-wider mb-2"
              style={{ color: "#e8a0a8" }}
            >
              AI Suggested Response
            </p>
            <p
              className="text-xs leading-relaxed mb-3"
              style={{ color: "#f0d0d4" }}
            >
              "Thank you for your kind words! We're actively improving WiFi
              connectivity for all our guests and hope to welcome you back
              soon."
            </p>
            <button
              onClick={handleCopy}
              className="w-full text-xs font-semibold py-2.5 rounded-lg
                         transition-all duration-200 text-white
                         hover:-translate-y-0.5 hover:shadow-md"
              style={{ backgroundColor: copied ? "#2d6a2d" : "#9b2335" }}
            >
              {copied ? "Copied!" : "Copy Response"}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
