import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Card from "./components/Card";

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

      {/* Mock review strip — unique element */}
      <div className="bg-white border-y border-stone-200 px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-stone-400 text-xs uppercase tracking-widest font-semibold mb-4">
            Sample analyzed reviews
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { text: "Breakfast was incredible — felt like home.", badge: "Positive", color: "text-green-700 bg-green-50 border-green-100" },
              { text: "WiFi keeps dropping, very frustrating.", badge: "Negative", color: "text-red-600 bg-red-50 border-red-100" },
              { text: "Good stay overall but room was average.", badge: "Neutral", color: "text-amber-700 bg-amber-50 border-amber-100" },
              { text: "Host was warm, local food outstanding.", badge: "Positive", color: "text-green-700 bg-green-50 border-green-100" },
            ].map((r, i) => (
              <div key={i} className="bg-stone-50 border border-stone-200 rounded-xl px-4 py-3
                                      flex flex-col gap-2">
                <p className="text-stone-600 text-xs italic leading-relaxed">"{r.text}"</p>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border
                                 self-start ${r.color}`}>
                  {r.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <section className="bg-stone-50 py-20 px-8">
        <div className="max-w-7xl mx-auto">

          <div className="mb-12">
            <p className="text-amber-600 text-xs font-semibold uppercase tracking-widest mb-3">
              — What Staylytics does
            </p>
            <h2 className="text-amber-950 font-bold"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)" }}>
              Six capabilities, one platform.
            </h2>
          </div>

          {/* Two column list */}
          <div className="grid md:grid-cols-2 gap-x-16">
            {features.map((f) => <Card key={f.number} {...f} />)}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-amber-950 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-10">
            How it works
          </p>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { n: "01", title: "Paste the review", desc: "Copy any guest review from your booking platform and paste it in." },
              { n: "02", title: "AI analyzes it", desc: "Sentiment, themes, and a suggested response are generated in seconds." },
              { n: "03", title: "Act on it", desc: "Edit the response, save it, and track patterns over time." },
            ].map((s) => (
              <div key={s.n} className="border-t border-amber-800 pt-6">
                <div className="text-amber-700 font-bold text-3xl mb-4"
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                  {s.n}
                </div>
                <h3 className="text-white font-semibold text-base mb-2">{s.title}</h3>
                <p className="text-amber-400/70 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function Placeholder({ title }) {
  return (
    <main className="max-w-7xl mx-auto px-8 py-24 text-center">
      <h1 className="text-2xl font-bold text-amber-900 mb-3"
        style={{ fontFamily: "'Playfair Display', serif" }}>
        {title}
      </h1>
      <p className="text-stone-400 text-sm">Coming soon — in development.</p>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-stone-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Placeholder title="Dashboard" />} />
          <Route path="/reviews" element={<Placeholder title="Review Analyzer" />} />
          <Route path="/about" element={<Placeholder title="About Staylytics" />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
