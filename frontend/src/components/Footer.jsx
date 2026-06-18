import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="px-8 py-12" style={{ backgroundColor: "#4a1428" }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start
                        md:items-center gap-6 pb-8"
          style={{ borderBottom: "1px solid rgba(155,35,53,0.3)" }}>
          <div>
            <h3 className="font-bold text-lg mb-1"
              style={{ fontFamily: "'Playfair Display', serif", color: "#fdfaf6" }}>
              Staylytics
            </h3>
            <p className="text-sm" style={{ color: "#c4736a" }}>
              AI review analytics for homestays.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-sm" style={{ color: "rgba(196,115,106,0.8)" }}>
            <Link to="/" className="hover:opacity-70 transition-opacity">Home</Link>
            <Link to="/dashboard" className="hover:opacity-70 transition-opacity">Dashboard</Link>
            <Link to="/reviews" className="hover:opacity-70 transition-opacity">Reviews</Link>
            <Link to="/about" className="hover:opacity-70 transition-opacity">About</Link>
          </div>
        </div>

        <div className="pt-6 flex justify-between items-center">
          <p className="text-xs" style={{ color: "rgba(155,35,53,0.6)" }}>
            © 2026 Staylytics · TBI GEU Summer Internship
          </p>
        </div>
      </div>
    </footer>
  );
}
