import { useState } from "react";
import { Link} from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
<Link to="/login">Login</Link>


  

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
      style={{
  backgroundColor: "#ffffff",
  borderBottom: "1px solid #f0e6e0",
  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
}}
    >
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold transition-colors duration-300"
          style={{
            fontFamily: "'Playfair Display', serif",
            color: "#2d1515",
          }}
        >
          Staylytics
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {["Home", "Dashboard", "Reviews", "About"].map((item) => (
            <Link
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="transition-colors duration-300 hover:opacity-70"
              style={{ color: "#7a5c5c" }}
            >
              {item}
            </Link>
          ))}
          <Link
            to="/login"
            className="text-white text-sm font-semibold px-5 py-2 rounded-lg
                      hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200"
            style={{ backgroundColor: "#9b2335" }}
            >
              Login
          </Link>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          {[
            open ? "rotate-45 translate-y-2" : "",
            open ? "opacity-0" : "",
            open ? "-rotate-45 -translate-y-2" : "",
          ].map((cls, i) => (
            <span
              key={i}
              className={`block w-5 h-0.5 transition-all duration-300 ${cls}`}
              style={{ backgroundColor: "#2d1515" }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden px-6 py-4 flex flex-col gap-3 text-sm font-medium"
          style={{
            backgroundColor: "#ffffff",
            borderTop: "1px solid #f0e6e0",
            color: "#7a5c5c",
          }}
        >
          {["Home", "Dashboard", "Reviews", "About"].map((item) => (
            <Link
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              onClick={() => setOpen(false)}
              style={{ color: "#7a5c5c" }}
            >
              {item}
            </Link>
          ))}
          <Link
            to="/login"
            onClick={() => setOpen(false)}
            className="text-white font-semibold px-5 py-2.5 rounded-lg text-center
                      mt-1 hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#9b2335" }}
            >
              Login
            </Link>
        </div>
      )}
    </nav>
  );
}
