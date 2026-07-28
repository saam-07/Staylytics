import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { isDark, toggle } = useTheme();
  const { isLoggedIn, logout, user } = useAuth();
const navigate = useNavigate();

const handleLogout = () => {
  logout();
  navigate("/login");
};

  return (
    <nav className="fixed top-0 left-0 w-full z-50 transition-colors duration-300"
      style={{
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #f0e6e0",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      }}>
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-xl font-bold transition-colors duration-300"
          style={{ fontFamily: "'Playfair Display', serif", color: "#2d1515" }}>
          Staylytics
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
  {[
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Reviews", path: "/reviews" },
    { name: "Review Archive", path: "/review-archive" },
    { name: "About", path: "/about" },
  ].map((item) => (
    <Link
      key={item.name}
      to={item.path}
      className="hover:opacity-70 transition-opacity"
      style={{ color: "#7a5c5c" }}
    >
      {item.name}
    </Link>
  ))}

  {/* Dark/Light toggle */}
  

          {/* Dark/Light toggle */}
          <button
            onClick={toggle}
            className="w-10 h-10 rounded-xl flex items-center justify-center
                       hover:opacity-80 transition-all duration-200"
            style={{ backgroundColor: "#fdf0f2", border: "1px solid #f0e6e0" }}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? (
              /* Sun icon */
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="#9b2335" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              /* Moon icon */
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="#9b2335" strokeWidth="2" strokeLinecap="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>

        {isLoggedIn ? (
  <div className="flex items-center gap-3">
    <span className="text-sm" style={{ color: "#7a5c5c" }}>
      {user?.name || "Guest"}
    </span>
    <button
      onClick={handleLogout}
      className="text-white text-sm font-semibold px-5 py-2 rounded-lg
                 hover:opacity-90 transition-opacity"
      style={{ backgroundColor: "#9b2335" }}
    >
      Logout
    </button>
  </div>
) : (
  <Link to="/login"
    className="text-white text-sm font-semibold px-5 py-2 rounded-lg
               hover:opacity-90 transition-opacity"
    style={{ backgroundColor: "#9b2335" }}>
    Login
  </Link>
)}
 </div>

        {/* Hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <button onClick={toggle}
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: "#fdf0f2", border: "1px solid #f0e6e0" }}>
            {isDark ? "☀️" : "🌙"}
          </button>
          <button onClick={() => setOpen(!open)}
            className="flex flex-col gap-1.5 p-2" aria-label="Toggle menu">
            {[
              open ? "rotate-45 translate-y-2" : "",
              open ? "opacity-0" : "",
              open ? "-rotate-45 -translate-y-2" : "",
            ].map((cls, i) => (
              <span key={i}
                className={`block w-5 h-0.5 transition-all duration-300 ${cls}`}
                style={{ backgroundColor: "#2d1515" }} />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden px-6 py-4 flex flex-col gap-3 text-sm font-medium bg-white"
          style={{ borderTop: "1px solid #f0e6e0", color: "#7a5c5c" }}>
          {[
  { name: "Home", path: "/" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "Reviews", path: "/reviews" },
  { name: "Review Archive", path: "/review-archive" },
  { name: "About", path: "/about" },
].map((item) => (
  <Link
    key={item.name}
    to={item.path}
    className="hover:opacity-70 transition-opacity"
    style={{ color: "#7a5c5c" }}
  >
    {item.name}
  </Link>
))}
          <Link to="/login" onClick={() => setOpen(false)}
            className="text-white font-semibold px-5 py-2.5 rounded-lg text-center
                       mt-1 hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#9b2335" }}>
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}
