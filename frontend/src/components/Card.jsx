export default function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-3xl transition-all duration-300 ${className}`}
      style={{
        backgroundColor: "var(--bg-card)",
        border: "1px solid var(--border-card)",
      }}
    >
      {children}
    </div>
  );
}