export default function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-3xl transition-all duration-300 ${className}`}
      style={{
        backgroundColor: "var(--bg-card)",
        border: "1px solid var(--border-card)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
      }}
    >
      {children}
    </div>
  );
}