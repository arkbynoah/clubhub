"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import ClubCard, { type Club } from "@/components/ClubCard";

const PLACEHOLDER_TEXT = "I'm interested in finance and investing...";

const CATEGORY_MAP: Record<string, string | null> = {
  HOME: null,
  FINANCE: "Finance",
  CONSULTING: "Consulting",
  TECHNOLOGY: "Technology",
  ENTREPRENEURSHIP: "Entrepreneurship",
  "CASE COMPETITIONS": "Case Competition",
  MARKETING: "Marketing",
  OTHER: "__other__",
};

const MAIN_CATEGORIES = new Set([
  "Finance",
  "Consulting",
  "Technology",
  "Entrepreneurship",
  "Case Competition",
  "Marketing",
]);

export default function Home() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("HOME");
  const [placeholder, setPlaceholder] = useState("");
  const charIdx = useRef(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("category");
    if (cat) setActiveCategory(cat);
  }, []);

  useEffect(() => {
    async function fetchClubs() {
      const { data } = await supabase
        .from("clubs")
        .select("*")
        .order("name");

      if (data) setClubs(data as Club[]);
      setLoading(false);
    }
    fetchClubs();
  }, []);

  // Typing animation for placeholder — type once then stay
  useEffect(() => {
    const tick = setInterval(() => {
      charIdx.current++;
      setPlaceholder(PLACEHOLDER_TEXT.slice(0, charIdx.current));
      if (charIdx.current >= PLACEHOLDER_TEXT.length) {
        clearInterval(tick);
      }
    }, 80);
    return () => clearInterval(tick);
  }, []);

  const filteredClubs = clubs.filter((club) => {
    const categoryValue = CATEGORY_MAP[activeCategory];
    if (categoryValue === "__other__") {
      if (MAIN_CATEGORIES.has(club.category)) return false;
    } else if (categoryValue) {
      if (club.category !== categoryValue) return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const haystack = [
        club.name,
        club.full_name,
        club.category,
        club.description || "",
      ]
        .join(" ")
        .toLowerCase();

      // Match if the full query is found, OR if every meaningful word matches
      if (haystack.includes(q)) return true;

      const stopWords = new Set([
        "i'm", "im", "i", "a", "an", "the", "in", "and", "or", "of",
        "to", "for", "is", "it", "my", "me", "we", "do", "so",
        "interested", "looking", "want", "like", "about", "into",
      ]);
      const words = q.split(/\s+/).filter((w) => !stopWords.has(w) && w.length > 1);
      if (words.length === 0) return true;
      return words.some((word) => haystack.includes(word));
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-black">
      <Navbar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* Hero */}
      <section className="flex flex-col items-center px-4 pt-20 pb-14">
        <h1 className="mb-4 text-center text-5xl font-extrabold text-white">
          It&apos;s March Hiring Szn.
        </h1>
        <p className="mb-8 text-center text-lg font-medium text-[#8A8A8A]">
          Queen&apos;s Commerce Club Recruiting, All in One Place.
        </p>

        <div className="relative w-full max-w-[600px]">
          <svg
            className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8A8A8A]"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full rounded-full bg-[#2B2B2B] py-4 pl-14 pr-6 text-base text-white placeholder-[#8A8A8A] outline-none focus:ring-2 focus:ring-[#FF9000]"
          />
        </div>


      </section>

      {/* Club Grid */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-6 flex items-center gap-3">
          <h2 className="text-2xl font-extrabold text-white">
            All Clubs
          </h2>
          <span className="rounded-[4px] bg-[#FF9000] px-2.5 py-0.5 text-sm font-bold text-black">
            {filteredClubs.length}
          </span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-44 animate-pulse rounded-[8px] border border-[#3B3B3B] bg-[#2B2B2B]"
              />
            ))}
          </div>
        ) : filteredClubs.length === 0 ? (
          <p className="py-20 text-center text-[#8A8A8A]">No clubs found</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {filteredClubs.map((club) => (
              <ClubCard key={club.id} club={club} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
