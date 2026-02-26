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

const STOP_WORDS = new Set([
  "i'm", "im", "i", "a", "an", "the", "in", "and", "or", "of",
  "to", "for", "is", "it", "my", "me", "we", "do", "so",
  "interested", "looking", "want", "like", "about", "into",
]);

// Strip common separators so "uiux" matches "ui/ux", "cochair" matches "co-chair", etc.
function normalize(s: string): string {
  return s.replace(/[\/\-&.'']/g, "");
}

interface TeamMemberWithClub {
  id: string;
  club_id: string;
  name: string;
  role: string | null;
  role_type: string | null;
  year: string | null;
  is_incoming: boolean;
  clubs: { name: string; full_name: string; slug: string };
}

export default function Home() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [people, setPeople] = useState<TeamMemberWithClub[]>([]);
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
    async function fetchData() {
      const [clubsRes, peopleRes] = await Promise.all([
        supabase
          .from("clubs")
          .select("id, name, full_name, slug, category, description, instagram_url, hiring_status, is_urgent, march_hiring")
          .order("name"),
        supabase
          .from("team_members")
          .select("id, club_id, name, role, role_type, year, is_incoming, clubs(name, full_name, slug)")
          .order("name"),
      ]);

      if (clubsRes.data) setClubs(clubsRes.data as Club[]);
      if (peopleRes.data) {
        // Supabase returns joined relation as array; unwrap to single object
        const normalized = (peopleRes.data as Record<string, unknown>[]).map((row) => ({
          ...row,
          clubs: Array.isArray(row.clubs) ? row.clubs[0] : row.clubs,
        })) as TeamMemberWithClub[];
        setPeople(normalized);
      }
      setLoading(false);
    }
    fetchData();
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
      const raw = [
        club.name,
        club.full_name,
        club.category,
        club.description || "",
      ]
        .join(" ")
        .toLowerCase();
      const haystack = raw + " " + normalize(raw);

      // Match if the full query is found, OR if every meaningful word matches
      if (haystack.includes(q)) return true;

      const words = q.split(/\s+/).filter((w) => !STOP_WORDS.has(w) && w.length > 1);
      if (words.length === 0) return true;
      return words.some((word) => haystack.includes(word) || haystack.includes(normalize(word)));
    }

    return true;
  });

  const filteredPeople = (() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];

    const words = q.split(/\s+/).filter((w) => !STOP_WORDS.has(w) && w.length > 1);
    if (words.length === 0) return [];

    return people.filter((person) => {
      const raw = [
        person.name,
        person.role || "",
        person.role_type || "",
        person.clubs?.name || "",
        person.clubs?.full_name || "",
      ]
        .join(" ")
        .toLowerCase();
      const haystack = raw + " " + normalize(raw);

      if (haystack.includes(q)) return true;
      return words.every((word) => haystack.includes(word) || haystack.includes(normalize(word)));
    });
  })();

  const hasQuery = searchQuery.trim().length > 0;
  const hasClubResults = filteredClubs.length > 0;
  const hasPeopleResults = filteredPeople.length > 0;
  const noResults = hasQuery && !hasClubResults && !hasPeopleResults;

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

      {/* Results */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        {noResults && !loading && (
          <p className="py-20 text-center text-[#8A8A8A]">
            No results found for &ldquo;{searchQuery.trim()}&rdquo;
          </p>
        )}

        {/* Clubs Section */}
        {(!hasQuery || hasClubResults || loading) && !noResults && (
          <>
            <div className="mb-6 flex items-center gap-3">
              <h2 className="text-2xl font-extrabold text-white">
                {hasQuery ? "Clubs" : "All Clubs"}
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
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {filteredClubs.map((club) => (
                  <ClubCard key={club.id} club={club} />
                ))}
              </div>
            )}
          </>
        )}

        {/* People & Roles Section */}
        {hasPeopleResults && (
          <>
            <div className="mb-6 mt-12 flex items-center gap-3">
              <h2 className="text-2xl font-extrabold text-white">
                People &amp; Roles
              </h2>
              <span className="rounded-[4px] bg-[#FF9000] px-2.5 py-0.5 text-sm font-bold text-black">
                {filteredPeople.length}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPeople.map((person) => (
                <div
                  key={person.id}
                  className="rounded-[8px] border border-[#3B3B3B] bg-[#2B2B2B] p-4"
                >
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-white">
                      {person.name}
                    </p>
                    {person.is_incoming && (
                      <span className="rounded-[4px] bg-[#FF9000] px-1.5 py-0.5 text-[10px] font-bold text-black">
                        Incoming
                      </span>
                    )}
                  </div>

                  {person.role && (
                    <p className="mt-1 text-xs font-medium text-[#8A8A8A]">
                      {person.role}
                    </p>
                  )}

                  <div className="mt-2 flex items-center gap-2">
                    {person.role_type && (
                      <span className="rounded-[4px] bg-[#FF9000]/15 px-2 py-0.5 text-[10px] font-bold text-[#FF9000]">
                        {person.role_type}
                      </span>
                    )}
                    {person.year && (
                      <span className="text-xs font-medium text-[#FF9000]">
                        {person.year}
                      </span>
                    )}
                  </div>

                  {person.clubs && (
                    <a
                      href={`/clubs/${person.clubs.slug}`}
                      className="mt-3 inline-block rounded-full border border-[#3B3B3B] px-3 py-1 text-[11px] font-medium text-[#8A8A8A] transition-colors hover:border-[#FF9000] hover:text-white"
                    >
                      {person.clubs.name}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
