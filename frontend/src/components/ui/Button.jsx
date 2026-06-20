/**
 * Button component
 * @param {string} label - Button text
 * @param {function} onClick - Click handler
 * @param {"primary" | "secondary" | "ghost"} variant - Button style variant
 * @param {"sm" | "md" | "lg"} size - Button size
 * @param {boolean} disabled - Disabled state
 * @param {boolean} loading - Loading state
 * @param {string} type - HTML button type
 */
export default function Button({
  label,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  type = "button",
}) {
  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-3.5 text-base",
  };

  const variants = {
    primary: {
      backgroundColor: "#9b2335",
      color: "#ffffff",
      border: "1px solid #9b2335",
    },
    secondary: {
      backgroundColor: "transparent",
      color: "#9b2335",
      border: "1px solid #9b2335",
    },
    ghost: {
      backgroundColor: "transparent",
      color: "#7a5c5c",
      border: "1px solid #f0e6e0",
    },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${sizes[size]}
        font-semibold rounded-xl
        hover:-translate-y-0.5 hover:shadow-md
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0
        flex items-center justify-center gap-2
      `}
      style={variants[variant]}
    >
      {loading && (
        <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent
                         rounded-full animate-spin" />
      )}
      {label}
    </button>
  );
}
