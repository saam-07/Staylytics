/**
 * Input component
 * @param {string} label - Input label text
 * @param {string} type - Input type (text, email, password, etc.)
 * @param {string} placeholder - Placeholder text
 * @param {string} value - Controlled input value
 * @param {function} onChange - Change handler
 * @param {string} error - Error message to display
 * @param {boolean} disabled - Disabled state
 * @param {string} hint - Helper text below input
 */
export default function Input({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  error,
  disabled = false,
  hint,
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          className="text-sm font-semibold"
          style={{ color: "var(--text-primary)" }}
        >
          {label}
        </label>
      )}

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full px-4 py-3 text-sm rounded-xl outline-none
                   transition-all duration-200
                   disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          border: error ? "1px solid var(--btn-primary)" : "1px solid var(--border-main)",
          backgroundColor: disabled ? "var(--bg-page)" : "var(--bg-inner)",
          color: "var(--text-primary)",
          boxShadow: "none",
        }}
        onFocus={(e) => {
          e.target.style.border = `1px solid ${error ? "var(--btn-primary)" : "var(--text-accent)"}`;
          e.target.style.boxShadow = `0 0 0 3px ${error ? "rgba(155,35,53,0.15)" : "var(--border-card)"}`;
        }}
        onBlur={(e) => {
          e.target.style.border = `1px solid ${error ? "var(--btn-primary)" : "var(--border-main)"}`;
          e.target.style.boxShadow = "none";
        }}
      />

      {error && (
        <p className="text-xs font-medium" style={{ color: "var(--btn-primary)" }}>
          {error}
        </p>
      )}
      {hint && !error && (
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          {hint}
        </p>
      )}
    </div>
  );
}
