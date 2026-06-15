import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-stone-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-amber-900"
          style={{ fontFamily: "'Playfair Display', serif" }}>
          Staylytics
        </Link>

        <div className="flex items-center gap-8 text-sm font-medium text-stone-500">
          <Link to="/" className="hover:text-amber-800 transition-colors">Home</Link>
          <Link to="/dashboard" className="hover:text-amber-800 transition-colors">Dashboard</Link>
          <Link to="/reviews" className="hover:text-amber-800 transition-colors">Reviews</Link>
          <Link to="/about" className="hover:text-amber-800 transition-colors">About</Link>
          <Link to="/reviews"
            className="bg-amber-800 text-white px-5 py-2 rounded-lg
                       hover:bg-amber-700 transition-colors text-sm font-semibold">
            Analyze Reviews
          </Link>
        </div>
      </div>
    </nav>
  );
}
