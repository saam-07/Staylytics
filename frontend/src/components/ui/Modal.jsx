/**
 * Modal component
 * @param {boolean} isOpen - Whether modal is visible
 * @param {function} onClose - Close handler
 * @param {string} title - Modal heading
 * @param {React.ReactNode} children - Modal body content
 * @param {string} confirmLabel - Confirm button label
 * @param {function} onConfirm - Confirm button handler
 * @param {"sm" | "md" | "lg"} size - Modal width size
 */
export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  confirmLabel = "Confirm",
  onConfirm,
  size = "md",
}) {
  if (!isOpen) return null;

  const sizes = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(18, 4, 10, 0.6)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className={`${sizes[size]} w-full rounded-2xl p-6 shadow-xl`}
        style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-card)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h2
            className="font-bold text-lg"
            style={{ fontFamily: "'Playfair Display', serif", color: "var(--text-primary)" }}
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center
                       hover:opacity-70 transition-opacity text-lg"
            style={{ color: "var(--text-muted)", backgroundColor: "var(--bg-inner)" }}
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="mb-6 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          {children}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-semibold rounded-xl
                       hover:opacity-70 transition-opacity"
            style={{ color: "var(--text-muted)", border: "1px solid var(--border-main)" }}
          >
            Cancel
          </button>
          {onConfirm && (
            <button
              onClick={onConfirm}
              className="px-5 py-2 text-sm font-semibold rounded-xl text-white
                         hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
              style={{ backgroundColor: "var(--btn-primary)" }}
            >
              {confirmLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
