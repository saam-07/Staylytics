import { Link } from "react-router-dom";

const stats = [
  { title: "Total Reviews", value: "124", subtitle: "All time" },
  { title: "Average Rating", value: "4.7", subtitle: "Across all guests" },
  { title: "Pending Replies", value: "5", subtitle: "Awaiting response" },
  { title: "Top Theme", value: "Food", subtitle: "Most discussed" },
];

function FeatureCard({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl transition-all duration-200 ${className}`}
      style={{
        backgroundColor: "var(--bg-card)",
        border: "1px solid var(--border-card)",
        boxShadow: "0 4px 20px rgba(155,35,53,0.08)",
      }}
    >
      {children}
    </div>
  );
}

export default function Dashboard() {
  return (
    <main
      className="min-h-screen px-8 pt-32 pb-16"
      style={{ backgroundColor: "var(--bg-hero)" }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <p
            className="uppercase tracking-widest text-xs font-semibold mb-4"
            style={{ color: "var(--text-accent)" }}
          >
            Dashboard
          </p>
          <h1
            className="font-bold leading-tight mb-4"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              color: "var(--text-primary)",
            }}
          >
            Monitor your property's performance.
          </h1>
          <p
            className="max-w-xl text-base leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Your property continues to receive positive feedback this week.
            Guests consistently appreciate your hospitality, while connectivity
            remains the most common area for improvement.
          </p>
        </div>

        {/* Property Score + Guest Mood — side by side */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">

          {/* Property Score */}
          <FeatureCard className="p-8">
            <p
              className="uppercase tracking-widest text-xs font-semibold mb-5"
              style={{ color: "var(--text-accent)" }}
            >
              Property Health Score
            </p>
            <div className="flex items-end justify-between">
              <div>
                <h2
                  className="font-bold mb-2"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(3rem, 6vw, 4.5rem)",
                    color: "var(--text-dark)",
                    lineHeight: 1,
                  }}
                >
                  89
                  <span
                    className="text-xl ml-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    /100
                  </span>
                </h2>
                <p className="text-sm mt-2" style={{ color: "var(--text-muted)" }}>
                  Excellent performance this week
                </p>
              </div>
              <div
                className="rounded-2xl px-6 py-5 text-center"
                style={{
                  backgroundColor: "rgba(155,35,53,0.06)",
                  border: "1px solid var(--border-card)",
                }}
              >
                <p
                  className="uppercase tracking-widest text-xs font-semibold mb-2"
                  style={{ color: "var(--text-accent)" }}
                >
                  Weekly Trend
                </p>
                <h3
                  className="text-4xl font-bold"
                  style={{ color: "var(--text-accent)", fontFamily: "'Playfair Display', serif" }}
                >
                  +4%
                </h3>
                <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                  vs last week
                </p>
              </div>
            </div>
          </FeatureCard>

          {/* Guest Mood */}
          <FeatureCard className="p-8">
            <p
              className="uppercase tracking-widest text-xs font-semibold mb-5"
              style={{ color: "var(--text-accent)" }}
            >
              Guest Mood
            </p>
            <div className="flex items-center justify-between h-full">
              <div>
                <h2
                  className="font-bold mb-2"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                    color: "var(--text-dark)",
                  }}
                >
                  Positive
                </h2>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  Based on the last 30 analyzed reviews
                </p>
              </div>
              <div className="text-center">
                <h2
                  className="font-bold"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(2.8rem, 5vw, 4rem)",
                    color: "var(--text-accent)",
                    lineHeight: 1,
                  }}
                >
                  82%
                </h2>
                <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                  Positive Reviews
                </p>
              </div>
            </div>
          </FeatureCard>

        </div>

        {/* Stat cards */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
          {stats.map((item) => (
            <FeatureCard key={item.title} className="p-6">
              <p
                className="uppercase text-xs tracking-widest mb-4 font-semibold"
                style={{ color: "var(--text-accent)" }}
              >
                {item.title}
              </p>
              <h2
                className="font-bold mb-1"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(2.2rem, 4vw, 3rem)",
                  color: "var(--text-dark)",
                  lineHeight: 1,
                }}
              >
                {item.value}
              </h2>
              <p className="text-sm mt-2" style={{ color: "var(--text-muted)" }}>
                {item.subtitle}
              </p>
            </FeatureCard>
          ))}
        </div>

        {/* AI Recommendation + Side card */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Recommendation */}
          <FeatureCard className="lg:col-span-2 p-8">
            <p
              className="uppercase tracking-widest text-xs font-semibold mb-4"
              style={{ color: "var(--text-accent)" }}
            >
              AI Recommendation
            </p>
            <h2
              className="font-bold mb-5"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)",
                color: "var(--text-dark)",
              }}
            >
              Focus on improving WiFi reliability.
            </h2>
            <p
              className="leading-7 text-sm mb-8 max-w-2xl"
              style={{ color: "var(--text-muted)" }}
            >
              Recent guest feedback shows that hospitality, food quality and
              scenic views continue to receive excellent appreciation.
              Connectivity, however, remains the most frequently mentioned
              concern. Addressing WiFi performance is likely to have the
              greatest impact on overall guest satisfaction this week.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/reviews"
                className="px-6 py-2.5 rounded-xl text-white text-sm font-semibold
                           transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                style={{ backgroundColor: "var(--btn-primary)" }}
              >
                View Reviews
              </Link>
              <Link
                to="/reviews"
                className="px-6 py-2.5 rounded-xl text-sm font-semibold
                           transition-all duration-200 hover:opacity-80"
                style={{
                  border: "1px solid var(--border-card)",
                  color: "var(--text-accent)",
                }}
              >
                Analyze New Review
              </Link>
            </div>
          </FeatureCard>

          {/* Side card */}
          <FeatureCard className="p-8 flex flex-col justify-between">
            <div>
              <p
                className="uppercase tracking-widest text-xs font-semibold mb-4"
                style={{ color: "var(--text-accent)" }}
              >
                This Week
              </p>
              <h3
                className="font-bold mb-4"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
                  color: "var(--text-dark)",
                }}
              >
                Your guests continue to enjoy the experience.
              </h3>
              <p className="text-sm leading-7" style={{ color: "var(--text-muted)" }}>
                Positive mentions increased this week while complaints remained
                low. Maintaining response consistency and addressing recurring
                WiFi concerns should further improve guest satisfaction.
              </p>
            </div>
            <div
              className="mt-8 pt-6"
              style={{ borderTop: "1px solid var(--border-card)" }}
            >
              <p className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>
                Reviews analyzed
              </p>
              <h2
                className="font-bold"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
                  color: "var(--text-accent)",
                  lineHeight: 1,
                }}
              >
                124
              </h2>
            </div>
          </FeatureCard>

        </div>

      </div>
    </main>
  );
}
