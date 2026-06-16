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
    <section className="bg-amber-950 min-h-screen flex items-center px-8 py-20">
      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center">

        {/* Left */}
        <div>
          <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-6">
            — Review Analytics for Homestays
          </p>

          <h1
            className="text-white font-bold leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.2rem, 4vw, 3.8rem)" }}
          >
            Your guests are talking.
            <br />
            <span className="text-amber-400 italic">Start listening.</span>
          </h1>

          <p className="text-amber-200/60 text-base leading-relaxed mb-10 max-w-md">
            Paste any guest review and get instant sentiment analysis, theme tags,
            and a professional response draft — built for homestay businesses
            across Uttarakhand.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link to="/reviews"
              className="bg-amber-500 text-white font-semibold px-8 py-3.5
                         rounded-xl hover:bg-amber-400 transition-colors">
              Start Analyzing
            </Link>
            <Link to="/dashboard"
              className="border border-amber-700 text-amber-300 font-semibold
                         px-8 py-3.5 rounded-xl hover:bg-amber-900 transition-colors">
              View Dashboard
            </Link>
          </div>
        </div>

        {/* Right — interactive mock card */}
        <div className="bg-amber-900/40 border border-amber-800/50 rounded-2xl p-6">

          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-amber-300 text-sm font-medium">Sample Review</span>
            <span className="bg-green-900/60 text-green-400 text-xs font-semibold
                             px-3 py-1 rounded-full border border-green-700/40">
              Positive
            </span>
          </div>

          {/* Review text */}
          <div className="bg-amber-950/60 rounded-xl p-4 mb-4 border border-amber-800/30">
            <p className="text-amber-100 text-sm leading-relaxed italic">
              "The host family was incredibly warm and the local breakfast was
              outstanding. The mountain view was breathtaking. WiFi could be
              more reliable though."
            </p>
          </div>

          {/* Interactive tags */}
          <p className="text-amber-500 text-xs mb-2 uppercase tracking-wider font-semibold">
            Tap a theme tag
          </p>
          <div className="flex gap-2 flex-wrap mb-5">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTag(activeTag === t ? null : t)}
                className={`text-xs px-3 py-1.5 rounded-full border font-medium
                            transition-all duration-200
                            ${activeTag === t
                              ? "bg-amber-500 text-white border-amber-400"
                              : "bg-amber-800/50 text-amber-300 border-amber-700/40 hover:border-amber-500"
                            }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Tag description */}
          <div className={`text-amber-200/60 text-xs mb-4 min-h-6 italic transition-all duration-200
                          ${activeTag ? "opacity-100" : "opacity-0"}`}>
            {activeTag && `Guests mentioned "${activeTag}" in this review.`}
          </div>

          {/* AI Response */}
          <div className="bg-amber-800/30 border border-amber-700/30 rounded-xl p-4">
            <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
              AI Suggested Response
            </p>
            <p className="text-amber-200/70 text-xs leading-relaxed mb-3">
              "Thank you for your kind words! We're actively improving WiFi
              connectivity for all our guests and hope to welcome you back soon."
            </p>
            <button
              onClick={handleCopy}
              className={`w-full text-xs font-semibold py-2 rounded-lg transition-all duration-200
                          ${copied
                            ? "bg-green-600 text-white"
                            : "bg-amber-500 text-white hover:bg-amber-400"
                          }`}
            >
              {copied ? "Copied!" : "Copy Response"}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
