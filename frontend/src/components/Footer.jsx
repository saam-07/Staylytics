import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-amber-950 px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start
                        md:items-center gap-6 pb-8 border-b border-amber-800/50">
          <div>
            <h3 className="text-white font-bold text-lg mb-1"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              Staylytics
            </h3>
            <p className="text-amber-500 text-sm">
              AI review analytics for homestays.
            </p>
          </div>

          <div className="flex gap-8 text-sm text-amber-400/80">
            <Link to="/" className="hover:text-amber-300 transition-colors">Home</Link>
            <Link to="/dashboard" className="hover:text-amber-300 transition-colors">Dashboard</Link>
            <Link to="/reviews" className="hover:text-amber-300 transition-colors">Reviews</Link>
            <Link to="/about" className="hover:text-amber-300 transition-colors">About</Link>
          </div>
        </div>

        <div className="pt-6 flex justify-between items-center">
          <p className="text-amber-700 text-xs">
            © 2026 Staylytics · TBI GEU Summer Internship
          </p>
          <p className="text-amber-700 text-xs">Powered by Gemini AI</p>
        </div>
      </div>
    </footer>
  );
}
