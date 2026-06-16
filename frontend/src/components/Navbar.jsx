import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-stone-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-amber-900"
          style={{ fontFamily: "'Playfair Display', serif" }}>
          Staylytics
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-500">
          <Link to="/" className="hover:text-amber-800 transition-colors">Home</Link>
          <Link to="/dashboard" className="hover:text-amber-800 transition-colors">Dashboard</Link>
          <Link to="/reviews" className="hover:text-amber-800 transition-colors">Reviews</Link>
          <Link to="/about" className="hover:text-amber-800 transition-colors">About</Link>
          <Link to="/reviews"
            className="bg-amber-800 text-white px-5 py-2 rounded-lg
                       hover:bg-amber-700 transition-colors font-semibold">
            Analyze Reviews
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-stone-600 transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 bg-stone-600 transition-all ${open ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-stone-600 transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-stone-100 px-6 py-4 flex flex-col gap-3
                        text-sm font-medium text-stone-600 bg-white">
          <Link to="/" onClick={() => setOpen(false)} className="hover:text-amber-800">Home</Link>
          <Link to="/dashboard" onClick={() => setOpen(false)} className="hover:text-amber-800">Dashboard</Link>
          <Link to="/reviews" onClick={() => setOpen(false)} className="hover:text-amber-800">Reviews</Link>
          <Link to="/about" onClick={() => setOpen(false)} className="hover:text-amber-800">About</Link>
          <Link to="/reviews" onClick={() => setOpen(false)}
            className="bg-amber-800 text-white px-5 py-2.5 rounded-lg
                       text-center font-semibold hover:bg-amber-700 transition-colors mt-1">
            Analyze Reviews
          </Link>
        </div>
      )}
    </nav>
  );
}
