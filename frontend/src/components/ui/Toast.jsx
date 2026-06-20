/**
 * Toast notification component
 * @param {string} message - Message to display
 * @param {"success" | "error" | "info" | "warning"} type - Toast type
 * @param {boolean} isVisible - Whether toast is shown
 * @param {function} onClose - Close handler
 */
export default function Toast({ message, type = "info", isVisible, onClose }) {
  if (!isVisible) return null;

  const styles = {
    success: { backgroundColor: "#f0faf0", color: "#2d6a2d", border: "1px solid #c3e6c3" },
    error:   { backgroundColor: "#fdf0f2", color: "#9b2335", border: "1px solid #f0c4c8" },
    info:    { backgroundColor: "#fdfaf6", color: "#4a1428", border: "1px solid #f0e6e0" },
    warning: { backgroundColor: "#fdf8f0", color: "#8a6a2a", border: "1px solid #f0e0b8" },
  };

  const icons = {
    success: "✓",
    error: "✕",
    info: "i",
    warning: "!",
  };

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3
                 px-5 py-3.5 rounded-xl shadow-lg text-sm font-medium
                 animate-in fade-in slide-in-from-bottom-2"
      style={styles[type]}
    >
      <span
        className="w-5 h-5 rounded-full flex items-center justify-center
                   text-xs font-bold shrink-0 text-white"
        style={{ backgroundColor: styles[type].color }}
      >
        {icons[type]}
      </span>
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-2 hover:opacity-60 transition-opacity font-bold text-base"
        style={{ color: styles[type].color }}
      >
        ×
      </button>
    </div>
  );
}
