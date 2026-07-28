export default function About() {
  return (
    <main
      className="min-h-screen px-8 pt-32 pb-20"
      style={{ backgroundColor: "var(--bg-page)" }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Hero */}
        <section className="text-center mb-20">
          <p
            className="uppercase tracking-[0.3em] text-xs font-semibold mb-4"
            style={{ color: "var(--text-accent)" }}
          >
            About Staylytics
          </p>

          <h1
            className="text-5xl font-bold mb-6"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "var(--text-primary)",
            }}
          >
            Smarter Hospitality Through AI
          </h1>

          <p
            className="max-w-3xl mx-auto leading-8 text-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            Staylytics transforms guest reviews into meaningful insights
            using Artificial Intelligence. Instead of reading hundreds of
            reviews manually, property owners receive instant sentiment
            analysis, key themes, AI-generated responses, and actionable
            recommendations that improve guest satisfaction.
          </p>
        </section>

        {/* Mission */}
        <section className="grid md:grid-cols-2 gap-8 mb-16">

          <div
            className="rounded-2xl p-8"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border-card)",
            }}
          >
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Our Mission
            </h2>

            <p
              className="leading-8"
              style={{ color: "var(--text-secondary)" }}
            >
              To simplify guest feedback management by combining AI with
              intuitive analytics. Staylytics helps hotels, resorts, and
              homestays understand guest experiences faster and make
              data-driven improvements.
            </p>
          </div>

          <div
            className="rounded-2xl p-8"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border-card)",
            }}
          >
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Why Staylytics?
            </h2>

            <p
              className="leading-8"
              style={{ color: "var(--text-secondary)" }}
            >
              Guest reviews contain valuable information, but manually
              analyzing them is time-consuming. Staylytics automatically
              identifies customer sentiment, highlights recurring themes,
              generates professional responses, and provides insights that
              help improve service quality.
            </p>
          </div>

        </section>

        {/* Features */}

        <section className="mb-20">

          <h2
            className="text-3xl font-bold text-center mb-12"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "var(--text-primary)",
            }}
          >
            What Staylytics Offers
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {[
              {
                title: "AI Sentiment Analysis",
                text: "Automatically identifies whether guest feedback is positive, neutral, or negative.",
              },
              {
                title: "Theme Detection",
                text: "Extracts important topics like cleanliness, staff, food, Wi-Fi, and location.",
              },
              {
                title: "AI Response Generator",
                text: "Creates professional responses that property managers can use instantly.",
              },
              {
                title: "Review Archive",
                text: "Store, search, filter, edit, and manage every analyzed review.",
              },
              {
                title: "Interactive Dashboard",
                text: "Visualize guest satisfaction, property score, and recurring trends in one place.",
              },
              {
                title: "Actionable Insights",
                text: "Receive recommendations based on recurring guest feedback to improve service quality.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl p-6 transition hover:-translate-y-1"
                style={{
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border-card)",
                }}
              >
                <h3
                  className="text-xl font-semibold mb-3"
                  style={{ color: "var(--text-primary)" }}
                >
                  {feature.title}
                </h3>

                <p
                  className="leading-7 text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {feature.text}
                </p>
              </div>
            ))}

          </div>

        </section>

        {/* Technology */}

        <section
          className="rounded-3xl p-10 text-center"
          style={{
            backgroundColor: "var(--bg-card)",
            border: "1px solid var(--border-card)",
          }}
        >
          <h2
            className="text-3xl font-bold mb-6"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "var(--text-primary)",
            }}
          >
            Powered By
          </h2>

          <div className="flex flex-wrap justify-center gap-4">

            {[
              "React",
              "FastAPI",
              "Google Gemini AI",
              "Tailwind CSS",
              "SQLite",
            ].map((tech) => (
              <span
                key={tech}
                className="px-5 py-2 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: "var(--bg-page)",
                  border: "1px solid var(--border-card)",
                  color: "var(--text-primary)",
                }}
              >
                {tech}
              </span>
            ))}

          </div>

          <p
            className="mt-8 max-w-3xl mx-auto leading-8"
            style={{ color: "var(--text-secondary)" }}
          >
            Staylytics combines Artificial Intelligence with modern web
            technologies to help hospitality businesses understand guest
            experiences, improve service quality, and build stronger customer
            relationships through data-driven decisions.
          </p>

        </section>

      </div>
    </main>
  );
}