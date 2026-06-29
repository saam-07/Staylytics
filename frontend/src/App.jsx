import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Card from "./components/Card";
import Login from "./pages/Login";
import Reviews from "./pages/Reviews";



const features = [
  { number: "01", title: "Sentiment Classification", description: "Each review is classified as positive, neutral, or negative — instantly, without manual effort." },
  { number: "02", title: "Theme Detection", description: "Surfaces what guests are actually talking about — food, cleanliness, host, location, and more." },
  { number: "03", title: "Response Drafting", description: "Generates a ready-to-send professional reply for each review. Edit the tone, then save it." },
  { number: "04", title: "Review History", description: "A searchable log of all analyzed reviews, filterable by sentiment and theme." },
  { number: "05", title: "Insights Dashboard", description: "A clear visual summary of sentiment trends, top complaints, and recurring guest praise." },
  { number: "06", title: "Improvement Suggestions", description: "Concrete, AI-generated actions based on your review patterns — not generic advice." },
];

function Home() {
  return (
    <main>
      <Hero />

      {/* Review strip — warm blush, not stark white */}
      <div
        className="px-8 py-8"
        style={{ backgroundColor: "#fdf0f2", borderTop: "1px solid #f0d8dc", borderBottom: "1px solid #f0d8dc" }}
      >
        <div className="max-w-7xl mx-auto">
          <p
            className="text-xs uppercase tracking-widest font-semibold mb-5"
            style={{ color: "#c4736a" }}
          >
            Sample analyzed reviews
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { text: "Breakfast was incredible — felt like home.", badge: "Positive", bg: "#f0faf0", color: "#2d6a2d", border: "#c3e6c3" },
              { text: "WiFi keeps dropping, very frustrating.", badge: "Negative", bg: "#fdf0f0", color: "#9b2335", border: "#f0c4c8" },
              { text: "Good stay overall but room was average.", badge: "Neutral", bg: "#fdf8f0", color: "#8a6a2a", border: "#f0e0b8" },
              { text: "Host was warm, local food outstanding.", badge: "Positive", bg: "#f0faf0", color: "#2d6a2d", border: "#c3e6c3" },
            ].map((r, i) => (
              <div
                key={i}
                className="rounded-xl px-4 py-4 flex flex-col gap-3"
                style={{ backgroundColor: "#fff", border: "1px solid #f0d8dc" }}
              >
                <p className="text-xs italic leading-relaxed" style={{ color: "#7a5c5c" }}>
                  "{r.text}"
                </p>
                <span
                  className="text-xs font-semibold px-3 py-1 rounded-full self-start"
                  style={{ backgroundColor: r.bg, color: r.color, border: `1px solid ${r.border}` }}
                >
                  {r.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <section className="py-24 px-8" style={{ backgroundColor: "#fdfaf6" }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "#9b2335" }}
            >
              — What Staylytics does
            </p>
            <h2
              className="font-bold"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                color: "#2d1515",
              }}
            >
              Six capabilities, one platform.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-x-16">
            {features.map((f) => <Card key={f.number} {...f} />)}
          </div>
        </div>
      </section>

      {/* Thin divider */}
      <div className="max-w-7xl mx-auto px-8">
        <div className="h-px" style={{ backgroundColor: "rgba(155,35,53,0.15)" }} />
      </div>

      {/* How it works */}
      <section className="py-24 px-8 transition-colors duration-300" style={{ backgroundColor: "var(--bg-howitworks)" }}>

        <div className="max-w-7xl mx-auto">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-16"
            style={{ color: "var(--text-accent)" }}
          >
            How it works
          </p>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { n: "01", title: "Paste the review", desc: "Copy any guest review from your booking platform and paste it in." },
              { n: "02", title: "AI analyzes it", desc: "Sentiment, themes, and a suggested response are generated in seconds." },
              { n: "03", title: "Act on it", desc: "Edit the response, save it, and track patterns over time." },
            ].map((s) => (
              <div
                key={s.n}
                className="pt-8"
                style={{ borderTop: "1px solid rgba(232,160,168,0.25)" }}
              >
                <div
                  className="font-bold text-4xl mb-6"
                  style={{ fontFamily: "'Playfair Display', serif", color: "var(--text-accent)" }}
                >
                  {s.n}
                </div>
                <h3 className="font-semibold text-base mb-3" style={{ color: "var(--text-primary)" }}>
                  {s.title}
                </h3>
                <p className="text-base font-medium leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function Placeholder({ title, description }) {
  return (
    <main className="flex-1 max-w-7xl mx-auto px-8 py-24 text-center">
      <h1
        className="text-3xl font-bold mb-4"
        style={{ fontFamily: "'Playfair Display', serif", color: "#2d1515" }}
      >
        {title}
      </h1>
      <p
        className="text-base max-w-md mx-auto leading-relaxed"
        style={{ color: "#7a5c5c" }}
      >
        {description}
      </p>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#fdfaf6" }}>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Placeholder title="Dashboard" description="Your review analytics and sentiment trends will appear here. Currently in development." />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/about" element={<Placeholder title="About Staylytics" description="Staylytics is an AI-powered review analytics platform built for homestay businesses across Uttarakhand, developed during the TBI GEU Summer Internship 2026." />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
