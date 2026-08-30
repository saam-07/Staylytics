import Hero from "../components/Hero";
import FeatureCard from "../components/FeatureCard";

const features = [
  {
    number: "01",
    title: "Sentiment Classification",
    description:
      "Each review is classified as positive, neutral, or negative — instantly, without manual effort.",
  },
  {
    number: "02",
    title: "Theme Detection",
    description:
      "Surfaces what guests are actually talking about — food, cleanliness, host, location, and more.",
  },
  {
    number: "03",
    title: "Response Drafting",
    description:
      "Generates a ready-to-send professional reply for each review. Edit the tone, then save it.",
  },
  {
    number: "04",
    title: "Review History",
    description:
      "A searchable log of all analyzed reviews, filterable by sentiment and theme.",
  },
  {
    number: "05",
    title: "Insights Dashboard",
    description:
      "A clear visual summary of sentiment trends, top complaints, and recurring guest praise.",
  },
  {
    number: "06",
    title: "Improvement Suggestions",
    description:
      "Concrete, AI-generated actions based on your review patterns — not generic advice.",
  },
];

export default function Home() {
  return (
    <main>
      <Hero />

      {/* Sample Reviews */}
      <section
        className="px-8 py-8 transition-colors duration-300"
        style={{
          backgroundColor: "var(--bg-strip)",
          borderTop: "1px solid var(--border-strip)",
          borderBottom: "1px solid var(--border-strip)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <p
            className="text-xs uppercase tracking-widest font-semibold mb-5"
            style={{ color: "var(--text-accent)" }}
          >
            Sample analyzed reviews
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                text: "Breakfast was incredible — felt like home.",
                badge: "Positive",
                bg: "#f0faf0",
                color: "#2d6a2d",
                border: "#c3e6c3",
              },
              {
                text: "WiFi keeps dropping, very frustrating.",
                badge: "Negative",
                bg: "#fdf0f0",
                color: "#9b2335",
                border: "#f0c4c8",
              },
              {
                text: "Good stay overall but room was average.",
                badge: "Neutral",
                bg: "#fdf8f0",
                color: "#8a6a2a",
                border: "#f0e0b8",
              },
              {
                text: "Host was warm, local food outstanding.",
                badge: "Positive",
                bg: "#f0faf0",
                color: "#2d6a2d",
                border: "#c3e6c3",
              },
            ].map((review, index) => (
              <div
                key={index}
                className="rounded-xl px-4 py-4 flex flex-col gap-3 theme-card-hover cursor-default"
                style={{
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border-card)",
                }}
              >
                <p
                  className="text-xs italic leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  "{review.text}"
                </p>

                <span
                  className="text-xs font-semibold px-3 py-1 rounded-full self-start"
                  style={{
                    backgroundColor: review.bg,
                    color: review.color,
                    border: `1px solid ${review.border}`,
                  }}
                >
                  {review.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}

      <section
        className="py-24 px-8 transition-colors duration-300"
        style={{ backgroundColor: "var(--bg-section)" }}
      >
        <div className="max-w-7xl mx-auto">

          <div className="mb-16">

            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "var(--text-accent)" }}
            >
              — What Staylytics Does
            </p>

            <h2
              className="font-bold"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.8rem,3vw,2.4rem)",
                color: "var(--text-primary)",
              }}
            >
              Six capabilities, one platform.
            </h2>

          </div>

          <div className="grid md:grid-cols-2 gap-x-16">

            {features.map((feature) => (
              <FeatureCard
                key={feature.number}
                {...feature}
              />
            ))}

          </div>

        </div>
      </section>

      <div className="max-w-7xl mx-auto px-8">
        <div
          className="h-px"
          style={{
            backgroundColor: "var(--border-main)",
          }}
        />
      </div>

      {/* How it Works */}

      <section
        className="py-24 px-8"
        style={{
          backgroundColor: "var(--bg-howitworks)",
        }}
      >
        <div className="max-w-7xl mx-auto">

          <p
            className="text-xs font-semibold uppercase tracking-widest mb-16"
            style={{ color: "var(--text-accent)" }}
          >
            How it works
          </p>

          <div className="grid md:grid-cols-3 gap-12">

            {[
              {
                n: "01",
                title: "Paste the review",
                desc: "Copy any guest review from your booking platform and paste it in.",
              },
              {
                n: "02",
                title: "AI analyzes it",
                desc: "Sentiment, themes, and a suggested response are generated in seconds.",
              },
              {
                n: "03",
                title: "Act on it",
                desc: "Edit the response, save it, and track patterns over time.",
              },
            ].map((step) => (
              <div
                key={step.n}
                className="pt-8"
                style={{
                  borderTop: "1px solid var(--border-main)",
                }}
              >
                <div
                  className="font-bold text-4xl mb-6"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: "var(--text-accent)",
                  }}
                >
                  {step.n}
                </div>

                <h3
                  className="font-semibold text-base mb-3"
                  style={{ color: "var(--text-primary)" }}
                >
                  {step.title}
                </h3>

                <p
                  className="text-base leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  {step.desc}
                </p>

              </div>
            ))}

          </div>

        </div>
      </section>

    </main>
  );
}