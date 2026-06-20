/**
 * Loader / Spinner component
 * @param {"sm" | "md" | "lg"} size - Spinner size
 * @param {string} label - Optional loading text below spinner
 * @param {boolean} fullPage - Whether to center on full page
 */
export default function Loader({ size = "md", label, fullPage = false }) {
  const sizes = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-2",
    lg: "w-12 h-12 border-3",
  };

  const spinner = (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`${sizes[size]} rounded-full animate-spin`}
        style={{ borderColor: "#f0e6e0", borderTopColor: "#9b2335" }}
      />
      {label && (
        <p className="text-sm font-medium" style={{ color: "#7a5c5c" }}>
          {label}
        </p>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center"
        style={{ backgroundColor: "rgba(253,250,246,0.8)", backdropFilter: "blur(4px)" }}>
        {spinner}
      </div>
    );
  }

  return spinner;
}
