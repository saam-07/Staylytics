import { Link } from "react-router-dom";
import Card from "../components/Card";

const stats = [
  {
    title: "Total Reviews",
    value: "124",
    subtitle: "All time",
  },
  {
    title: "Average Rating",
    value: "4.7",
    subtitle: "Across all guests",
  },
  {
    title: "Pending Replies",
    value: "5",
    subtitle: "Awaiting response",
  },
  {
    title: "Top Theme",
    value: "Food",
    subtitle: "Most discussed",
  },
];

export default function Dashboard() {
  return (
    <main
      className="min-h-screen px-8 py-12"
      style={{ backgroundColor: "var(--bg-hero)" }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="mb-14">

          <p
            className="uppercase tracking-[0.35em] text-xs font-semibold mb-5"
            style={{ color: "var(--text-accent)" }}
          >
            Dashboard
          </p>

          <h1
            className="font-bold leading-tight"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.2rem,4vw,3.6rem)",
              color: "var(--text-primary)",
            }}
          >
            Dashboard

Monitor your property's performance through guest feedback.
          </h1>

          <p
            className="max-w-2xl mt-5 text-base leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Your property continues to receive positive feedback this week.
            Guests consistently appreciate your hospitality, while connectivity
            remains the most common area for improvement.
          </p>

        </div>

        {/* Property Score */}

        <Card className="p-10 mb-8">

          <div className="flex flex-col lg:flex-row justify-between gap-10 items-center">

            <div>

              <p
                className="uppercase tracking-[0.25em] text-xs font-semibold mb-4"
                style={{ color: "var(--text-accent)" }}
              >
                Property Health Score
              </p>

              <h2
                className="font-bold mb-3"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "4rem",
                  color: "var(--text-primary)",
                }}
              >
                89
                <span
                  className="text-2xl ml-2"
                  style={{ color: "var(--text-secondary)" }}
                >
                  /100
                </span>
              </h2>

              <p
                className="text-lg"
                style={{ color: "var(--text-secondary)" }}
              >
                Excellent performance this week
              </p>

            </div>

            <div
              className="rounded-3xl px-8 py-7 min-w-[260px]"
              style={{
                backgroundColor: "rgba(155,35,53,0.08)",
                border: "1px solid var(--border-card)",
              }}
            >

              <p
                className="uppercase tracking-[0.2em] text-xs font-semibold mb-4"
                style={{ color: "var(--text-accent)" }}
              >
                Weekly Trend
              </p>

              <h3
                className="text-5xl font-bold"
                style={{ color: "var(--text-accent)" }}
              >
                +4%
              </h3>

              <p
                className="mt-3 text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                compared to last week
              </p>

            </div>

          </div>

        </Card>

        {/* Guest Mood */}

        <Card className="p-8 mb-10">

          <div className="flex flex-col md:flex-row justify-between items-center gap-8">

            <div>

              <p
                className="uppercase tracking-[0.25em] text-xs font-semibold mb-4"
                style={{ color: "var(--text-accent)" }}
              >
                Guest Mood
              </p>

              <h2
                className="text-4xl font-bold"
                style={{
                  color: "var(--text-primary)",
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                😊 Guest Mood
                Positive
              </h2>

              <p
                className="mt-4"
                style={{ color: "var(--text-secondary)" }}
              >
              Based on the last 30 analyzed reviews.
              </p>

            </div>

            <div className="text-center">

              <h2
                className="text-6xl font-bold"
                style={{ color: "var(--text-accent)" }}
              >
                82%
              </h2>

              <p
                className="mt-2"
                style={{ color: "var(--text-secondary)" }}
              >
                Positive Reviews
              </p>

            </div>

          </div>

        </Card>

        {/* Statistics */}

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

          {stats.map((item) => (

            <Card
              key={item.title}
              className="p-7"
            >

              <p
                className="uppercase text-xs tracking-[0.18em] mb-4"
                style={{ color: "var(--text-accent)" }}
              >
                {item.title}
              </p>

              <h2
                className="text-5xl font-bold mb-2"
                style={{
                  color: "var(--text-primary)",
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                {item.value}
              </h2>

              <p
                className="text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                {item.subtitle}
              </p>

            </Card>

          ))}

        </div>
                {/* AI Recommendation & Continue Working */}

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Recommendation */}

          <Card className="lg:col-span-2 p-8">

            <p
              className="uppercase tracking-[0.25em] text-xs font-semibold mb-4"
              style={{ color: "var(--text-accent)" }}
            >
              AI Recommendation
            </p>

            <h2
              className="font-bold text-3xl mb-6"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "var(--text-primary)",
              }}
            >
              Focus on improving WiFi reliability.
            </h2>

            <p
              className="leading-8 text-base mb-8 max-w-3xl"
              style={{ color: "var(--text-secondary)" }}
            >
              Recent guest feedback shows that hospitality, food quality and
              scenic views continue to receive excellent appreciation.
              Connectivity, however, remains the most frequently mentioned
              concern. Addressing WiFi performance is likely to have the
              greatest impact on overall guest satisfaction this week.
            </p>

            <div className="flex flex-wrap gap-4">

              <Link
                to="/reviews"
                className="px-7 py-3 rounded-xl text-white font-semibold transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  backgroundColor: "var(--btn-primary)",
                }}
              >
                View Reviews
              </Link>

              <Link
                to="/reviews"
                className="px-7 py-3 rounded-xl font-semibold transition-all duration-300 hover:opacity-80"
                style={{
                  border: "1px solid var(--border-card)",
                  color: "var(--text-accent)",
                }}
              >
                Analyze New Review
              </Link>

            </div>

          </Card>

          {/* Side Card */}

          <Card className="p-8 flex flex-col justify-between">

            <div>

              <p
                className="uppercase tracking-[0.2em] text-xs font-semibold mb-4"
                style={{ color: "var(--text-accent)" }}
              >
                This Week
              </p>

              <h3
                className="font-bold text-2xl mb-5"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "var(--text-primary)",
                }}
              >
                Your guests continue to enjoy the experience.
              </h3>

              <p
                className="leading-7"
                style={{ color: "var(--text-secondary)" }}
              >
                Positive mentions increased this week while complaints remained
                low. Maintaining response consistency and addressing recurring
                WiFi concerns should further improve guest satisfaction.
              </p>

            </div>

            <div
              className="mt-10 pt-6"
              style={{
                borderTop: "1px solid var(--border-card)",
              }}
            >

              <p
                className="text-sm mb-2"
                style={{ color: "var(--text-secondary)" }}
              >
                Reviews analyzed
              </p>

              <h2
                className="text-5xl font-bold"
                style={{
                  color: "var(--text-accent)",
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                124
              </h2>

            </div>

          </Card>

        </div>

      </div>

    </main>
  );
}