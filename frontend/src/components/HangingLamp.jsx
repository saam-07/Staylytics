import { useState } from "react";

export default function HangingLamp({ isDark, onToggle }) {
  const [swaying, setSwaying] = useState(false);

  const handleClick = () => {
    setSwaying(true);
    onToggle();
    setTimeout(() => setSwaying(false), 800);
  };

  return (
    <div
      onClick={handleClick}
      className={`relative cursor-pointer select-none group flex flex-col items-center -mt-3.5 mr-1.5 transition-transform duration-200 ${
        swaying ? "lamp-sway" : "hover:scale-105"
      }`}
      title={isDark ? "Touch lamp to switch to Sunrise Blush" : "Touch lamp to switch to Twilight Plum Night"}
      style={{ width: "36px", height: "50px" }}
      role="button"
      tabIndex={0}
      aria-label="Toggle theme lighting"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {/* Ceiling Cord */}
      <div
        className="w-[2px] h-3.5 transition-colors duration-300"
        style={{
          backgroundColor: isDark ? "rgba(248, 198, 118, 0.6)" : "rgba(196, 51, 82, 0.45)",
        }}
      />

      {/* Lamp Fixture & Shade */}
      <svg
        width="30"
        height="30"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-all duration-300 drop-shadow-md"
      >
        <defs>
          {/* Bulb Glow Gradient for Dark Mode (Golden Sunrise Glow) */}
          <radialGradient id="bulbGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="50%" stopColor="#f8c676" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#d98c4a" stopOpacity="0" />
          </radialGradient>

          {/* Shade Plum & Wine Gradient (Dark Mode) */}
          <linearGradient id="shadeDark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8c4d96" />
            <stop offset="50%" stopColor="#673c73" />
            <stop offset="100%" stopColor="#8e004f" />
          </linearGradient>

          {/* Shade Sunrise Blush-Yellow Gradient (Light Mode) */}
          <linearGradient id="shadeLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#fef3ea" />
            <stop offset="100%" stopColor="#fce0d2" />
          </linearGradient>
        </defs>

        {/* Top Socket Ring */}
        <rect
          x="14"
          y="1"
          width="4"
          height="3"
          rx="1"
          fill={isDark ? "#f8c676" : "#c43352"}
        />

        {/* Pendant Dome Shade (Pendant Bell silhouette) */}
        <path
          d="M8 20 C8 11, 11 5, 16 5 C21 5, 24 11, 24 20 Z"
          fill={isDark ? "url(#shadeDark)" : "url(#shadeLight)"}
          stroke={isDark ? "rgba(248, 198, 118, 0.5)" : "rgba(196, 51, 82, 0.3)"}
          strokeWidth="1"
        />

        {/* Bottom Rim of Shade */}
        <ellipse
          cx="16"
          cy="20"
          rx="8"
          ry="2"
          fill={isDark ? "#8e004f" : "#fae6da"}
          stroke={isDark ? "#f8c676" : "rgba(196, 51, 82, 0.4)"}
          strokeWidth="0.8"
        />

        {/* Bulb Glow */}
        {isDark ? (
          <>
            {/* Glowing Golden Bulb */}
            <ellipse cx="16" cy="20.5" rx="4.5" ry="1.8" fill="url(#bulbGlow)" className="lamp-glow" />
            <circle cx="16" cy="21" r="2.2" fill="#fffaeb" />
          </>
        ) : (
          /* Subtle Warm Bulb in Light Mode */
          <ellipse cx="16" cy="20.5" rx="3.5" ry="1.2" fill="#f8c676" opacity="0.85" />
        )}
      </svg>

      {/* Downward Golden Light Cone in Dark Mode */}
      {isDark && (
        <div
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-9 h-5 pointer-events-none transition-opacity duration-300"
          style={{
            background: "radial-gradient(ellipse at top, rgba(248, 198, 118, 0.45) 0%, rgba(248, 198, 118, 0) 70%)",
            filter: "blur(2px)",
          }}
        />
      )}
    </div>
  );
}

