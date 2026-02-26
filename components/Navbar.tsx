"use client";

interface NavbarProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const CATEGORIES = [
  "HOME",
  "FINANCE",
  "CONSULTING",
  "TECHNOLOGY",
  "ENTREPRENEURSHIP",
  "CASE COMPETITIONS",
  "MARKETING",
  "OTHER",
];

export default function Navbar({
  activeCategory,
  setActiveCategory,
}: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 w-full bg-black">
      {/* Row 1 — Logo bar */}
      <div className="flex h-[80px] items-end pb-3">
        <div className="mx-auto w-full max-w-7xl px-6">
          <a
            href="/"
            className="flex shrink-0 items-stretch gap-[3px]"
            style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
          >
            <span className="flex items-center text-[34px] font-bold leading-none text-white">
              Club
            </span>
            <span className="flex items-center rounded-[6px] bg-[#FF9000] px-[8px] text-[34px] font-bold leading-none text-black">
              hub
            </span>
          </a>
        </div>
      </div>

      {/* Row 2 — Category tabs */}
      <div className="scrollbar-hide overflow-x-auto">
        <div className="mx-auto flex h-[48px] w-full max-w-7xl items-stretch px-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center whitespace-nowrap border-b-[3px] px-5 text-[12px] font-semibold uppercase tracking-[0.08em] transition-colors ${
                activeCategory === cat
                  ? "border-[#FF9000] text-white"
                  : "border-transparent text-[#8A8A8A] hover:text-white"
              }`}
              style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
