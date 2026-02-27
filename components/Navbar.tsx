"use client";

import { useState, useEffect } from "react";

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
  const [stealth, setStealth] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "stealth") {
      setStealth(true);
      document.documentElement.setAttribute("data-theme", "stealth");
    }
  }, []);

  function toggleTheme() {
    const next = !stealth;
    setStealth(next);
    if (next) {
      document.documentElement.setAttribute("data-theme", "stealth");
      localStorage.setItem("theme", "stealth");
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "default");
    }
  }

  return (
    <nav className="sticky top-0 z-50 w-full bg-[var(--bg)]">
      {/* Row 1 — Logo bar */}
      <div className="flex h-[80px] items-end pb-3">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6">
          <a
            href="/"
            className="flex shrink-0 items-stretch gap-[3px]"
            style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
          >
            <span className="flex items-center text-[34px] font-bold leading-none text-[var(--text)]">
              {stealth ? "Comm" : "Club"}
            </span>
            {stealth ? (
              <span className="flex items-center text-[34px] font-bold leading-none text-[var(--accent)]">
                stalk
              </span>
            ) : (
              <span className="flex items-center rounded-[6px] bg-[var(--logo-accent)] px-[8px] text-[34px] font-bold leading-none text-[var(--logo-on-accent)]">
                hub
              </span>
            )}
          </a>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 rounded-full border border-[var(--border)] px-3 py-1.5 text-xs font-semibold transition-colors hover:border-[var(--accent)]"
            title={stealth ? "Switch to ClubHub theme" : "Switch to stealth mode"}
          >
            <span className={stealth ? "text-[var(--muted)]" : "text-[var(--accent)]"}>CH</span>
            <div className="relative h-4 w-8 rounded-full bg-[var(--border)]">
              <div
                className={`absolute top-0.5 h-3 w-3 rounded-full bg-[var(--accent)] transition-all duration-200 ${
                  stealth ? "left-[18px]" : "left-0.5"
                }`}
              />
            </div>
            <span className={stealth ? "text-[var(--accent)]" : "text-[var(--muted)]"}>stealth</span>
          </button>
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
                  ? "border-[var(--accent)] text-[var(--text)]"
                  : "border-transparent text-[var(--muted)] hover:text-[var(--text)]"
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
