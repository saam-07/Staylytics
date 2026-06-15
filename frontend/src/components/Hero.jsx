import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="bg-amber-950 px-6 py-24">
      <div className="max-w-5xl mx-auto">

        {/* Tag line */}
        <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-6">
          — AI Review Analytics for Homestays
        </p>

        {/* Headline */}
        <h1
          className="text-white font-bold leading-tight mb-6"
          style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
        >
          Your guests are talking.
          <br />
          <span className="text-amber-400 italic">Start listening.</span>
        </h1>

        {/* Subtext */}
        <p className="text-amber-200/60 text-lg leading-relaxed mb-10 max-w-xl">
          Paste any guest review and get instant sentiment analysis, theme tags,
          and a professional response draft — all powered by Gemini AI.
        </p>

        {/* Buttons */}
        <div className="flex gap-4 flex-wrap mb-20">
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

        {/* Divider + stats */}
        <div className="border-t border-amber-800/50 pt-10 flex gap-12">
          {[
            { val: "3 sec", label: "Analysis time" },
            { val: "6", label: "Theme categories" },
            { val: "Gemini", label: "AI engine" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-amber-300 font-bold text-xl mb-1"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                {s.val}
              </div>
              <div className="text-amber-600 text-xs">{s.label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
