export default function Card({ number, title, description }) {
  return (
    <div className="flex gap-5 py-6 border-b border-stone-200 last:border-none
                    group hover:bg-amber-50 px-4 rounded-xl transition-colors duration-200">

      {/* Number */}
      <span className="text-amber-300 font-bold text-base shrink-0 w-8 pt-0.5"
        style={{ fontFamily: "'Playfair Display', serif" }}>
        {number}
      </span>

      {/* Content */}
      <div>
        <h3 className="text-amber-950 font-semibold text-base mb-1.5">{title}</h3>
        <p className="text-stone-500 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
