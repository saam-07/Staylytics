export default function Card({ number, title, description }) {
  return (
    <div className="flex gap-5 py-6 border-b last:border-none group hover:bg-red-50 px-4 rounded-xl transition-colors duration-200"
      style={{ borderColor: "#f0e6e0" }}>

      <span className="font-bold text-base shrink-0 w-8 pt-0.5"
        style={{ fontFamily: "'Playfair Display', serif", color: "#d4b0b0" }}>
        {number}
      </span>

      <div>
        <h3 className="font-semibold text-base mb-1.5" style={{ color: "#2d1515" }}>{title}</h3>
        <p className="text-sm leading-relaxed" style={{ color: "#7a5c5c" }}>{description}</p>
      </div>
    </div>
  );
}
