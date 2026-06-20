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
          style={{ color: "#2d1515" }}
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
          border: error ? "1px solid #9b2335" : "1px solid #f0e6e0",
          backgroundColor: disabled ? "#fdf5f0" : "#ffffff",
          color: "#2d1515",
          boxShadow: "none",
        }}
        onFocus={(e) => {
          e.target.style.border = `1px solid ${error ? "#9b2335" : "#c4736a"}`;
          e.target.style.boxShadow = `0 0 0 3px ${error ? "rgba(155,35,53,0.1)" : "rgba(196,115,106,0.1)"}`;
        }}
        onBlur={(e) => {
          e.target.style.border = `1px solid ${error ? "#9b2335" : "#f0e6e0"}`;
          e.target.style.boxShadow = "none";
        }}
      />

      {error && (
        <p className="text-xs font-medium" style={{ color: "#9b2335" }}>
          {error}
        </p>
      )}
      {hint && !error && (
        <p className="text-xs" style={{ color: "#7a5c5c" }}>
          {hint}
        </p>
      )}
    </div>
  );
}
