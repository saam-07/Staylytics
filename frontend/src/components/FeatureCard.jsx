export default function Card({ number, title, description }) {
  return (
    <div className="flex gap-5 py-6 border-b last:border-none group feature-card px-4 rounded-xl"
      style={{ borderColor: "var(--border-main)" }}>

      <span className="font-bold text-base shrink-0 w-8 pt-0.5"
        style={{ fontFamily: "'Playfair Display', serif", color: "var(--text-accent)" }}>
        {number}
      </span>

      <div>
        <h3 className="font-semibold text-base mb-1.5" style={{ color: "var(--text-dark)" }}>{title}</h3>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{description}</p>
      </div>
    </div>
  );
}
