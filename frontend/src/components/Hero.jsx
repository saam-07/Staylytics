import { Link } from "react-router-dom";
import { useState } from "react";

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
      className="min-h-screen flex items-center px-8 pt-32 pb-24 transition-colors duration-300"
      style={{ backgroundColor: "var(--bg-hero)" }}
    >
      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center">

        {/* Left */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest mb-6"
            style={{ color: "var(--text-accent)" }}>
            Review Analytics for Homestays
          </p>

          <h1 className="font-bold leading-tight mb-6"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.4rem, 4vw, 4rem)",
              color: "var(--text-primary)",
            }}>
            Your guests are talking.
            <br />
            <span className="italic" style={{ color: "var(--text-accent)" }}>
              Start listening.
            </span>
          </h1>

          <p className="text-base leading-relaxed mb-10 max-w-md"
            style={{ color: "var(--text-secondary)" }}>
            Paste any guest review and get instant sentiment analysis, theme
            tags, and a professional response draft — built for homestay
            businesses across Uttarakhand.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link to="/reviews"
              className="text-white font-semibold px-8 py-3.5 rounded-xl
                         hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
              style={{ backgroundColor: "var(--btn-primary)" }}>
              Start Analyzing →
            </Link>
            <Link to="/dashboard"
              className="font-semibold px-8 py-3.5 rounded-xl
                         hover:opacity-80 transition-all duration-200"
              style={{ border: "1px solid var(--border-card)", color: "var(--text-accent)" }}>
              View Dashboard
            </Link>
          </div>
        </div>

        {/* Right — mock card */}
        <div className="rounded-2xl p-6 transition-colors duration-300"
          style={{
            backgroundColor: "var(--bg-card)",
            border: "1px solid var(--border-card)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.15)",
          }}>

          <div className="flex justify-between items-center mb-5">
            <span className="text-sm font-semibold" style={{ color: "var(--text-accent)" }}>
              Sample Review
            </span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full"
              style={{ backgroundColor: "rgba(34,85,34,0.25)", color: "#6dbf6d", border: "1px solid rgba(109,191,109,0.25)" }}>
              Positive
            </span>
          </div>

          <div className="rounded-xl p-4 mb-5 transition-colors duration-300"
            style={{ backgroundColor: "var(--bg-inner)", border: "1px solid var(--border-card)" }}>
            <p className="text-sm leading-relaxed italic" style={{ color: "var(--text-secondary)" }}>
              "The host family was incredibly warm and the local breakfast was
              outstanding. The mountain view was breathtaking. WiFi could be
              more reliable though."
            </p>
          </div>

          <p className="text-xs mb-3 uppercase tracking-wider font-semibold"
            style={{ color: "var(--text-accent)", opacity: 0.7 }}>
            Tap a theme tag
          </p>

          <div className="flex gap-2 flex-wrap mb-3">
            {tags.map((t) => (
              <button key={t}
                onClick={() => setActiveTag(activeTag === t ? null : t)}
                className="text-xs px-3 py-1.5 rounded-full font-medium transition-all duration-200"
                style={activeTag === t
                  ? { backgroundColor: "#9b2335", color: "#fdfaf6", border: "1px solid #9b2335" }
                  : { backgroundColor: "rgba(155,35,53,0.1)", color: "var(--text-accent)", border: "1px solid var(--border-card)" }
                }>
                {t}
              </button>
            ))}
          </div>

          <div className={`text-xs italic mb-4 min-h-6 transition-all duration-200
                          ${activeTag ? "opacity-100" : "opacity-0"}`}
            style={{ color: "var(--text-accent)" }}>
            {activeTag && `Guests mentioned "${activeTag}" in this review.`}
          </div>

          <div className="rounded-xl p-4 transition-colors duration-300"
            style={{ backgroundColor: "rgba(155,35,53,0.1)", border: "1px solid var(--border-card)" }}>
            <p className="text-xs font-semibold uppercase tracking-wider mb-2"
              style={{ color: "var(--text-accent)" }}>
              AI Suggested Response
            </p>
            <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--text-secondary)" }}>
              "Thank you for your kind words! We're actively improving WiFi
              connectivity for all our guests and hope to welcome you back soon."
            </p>
            <button onClick={handleCopy}
              className="w-full text-xs font-semibold py-2.5 rounded-lg transition-all duration-200
                         text-white hover:-translate-y-0.5 hover:shadow-md"
              style={{ backgroundColor: copied ? "#2d6a2d" : "#9b2335" }}>
              {copied ? "Copied!" : "Copy Response"}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
