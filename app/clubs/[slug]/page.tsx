"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import { type Club } from "@/components/ClubCard";

interface TimelineEvent {
  id: string;
  club_id: string;
  event_name: string;
  event_date: string | null;
  is_urgent: boolean;
  is_confirmed: boolean;
}

interface TeamMember {
  id: string;
  club_id: string;
  name: string;
  role: string | null;
  role_type: string | null;
  year: string | null;
  is_incoming: boolean;
}

const HIRING_CONFIG = {
  confirmed: {
    dot: "bg-[#22C55E]",
    text: "text-[#22C55E]",
    label: "Hiring Timeline Confirmed",
  },
  estimated: {
    dot: "bg-[#EAB308]",
    text: "text-[#EAB308]",
    label: "Estimated Hiring Timeline",
  },
  none: {
    dot: "bg-[#8A8A8A]",
    text: "text-[#8A8A8A]",
    label: "Not Hiring",
  },
} as const;

export default function ClubDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [club, setClub] = useState<Club | null>(null);
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const { data: clubData } = await supabase
        .from("clubs")
        .select("id, name, full_name, slug, category, description, instagram_url, hiring_status, is_urgent, march_hiring")
        .eq("slug", slug)
        .single();

      if (!clubData) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setClub(clubData as Club);

      const [timelineRes, teamRes] = await Promise.all([
        supabase
          .from("timeline_events")
          .select("id, club_id, event_name, event_date, is_urgent, is_confirmed")
          .eq("club_id", clubData.id)
          .order("id"),
        supabase
          .from("team_members")
          .select("id, club_id, name, role, role_type, year, is_incoming")
          .eq("club_id", clubData.id),
      ]);

      if (timelineRes.data) setTimeline(timelineRes.data as TimelineEvent[]);
      if (teamRes.data) setTeam(teamRes.data as TeamMember[]);
      setLoading(false);
    }

    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar activeCategory="" setActiveCategory={(cat) => router.push(`/?category=${encodeURIComponent(cat)}`)} />
        <div className="mx-auto max-w-7xl px-6 pt-8">
          {/* Back button skeleton */}
          <div className="mb-8 h-5 w-36 animate-pulse rounded bg-[#2B2B2B]" />

          {/* Header skeleton */}
          <div className="mb-2 h-10 w-48 animate-pulse rounded bg-[#2B2B2B]" />
          <div className="mb-4 h-5 w-72 animate-pulse rounded bg-[#2B2B2B]" />
          <div className="mb-8 flex gap-2">
            <div className="h-6 w-20 animate-pulse rounded bg-[#2B2B2B]" />
            <div className="h-6 w-44 animate-pulse rounded bg-[#2B2B2B]" />
          </div>

          {/* Timeline skeleton */}
          <div className="mt-12">
            <div className="mb-4 h-7 w-40 animate-pulse rounded bg-[#2B2B2B]" />
            <div className="space-y-0 rounded-[8px] border border-[#3B3B3B] bg-[#2B2B2B]">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b border-[#3B3B3B] px-5 py-4 last:border-b-0"
                >
                  <div className="h-4 w-32 animate-pulse rounded bg-[#3B3B3B]" />
                  <div className="h-4 w-40 animate-pulse rounded bg-[#3B3B3B]" />
                  <div className="h-4 w-24 animate-pulse rounded bg-[#3B3B3B]" />
                </div>
              ))}
            </div>
          </div>

          {/* Team skeleton */}
          <div className="mt-12 pb-20">
            <div className="mb-4 h-7 w-36 animate-pulse rounded bg-[#2B2B2B]" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="h-24 animate-pulse rounded-[8px] border border-[#3B3B3B] bg-[#2B2B2B]"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar activeCategory="" setActiveCategory={(cat) => router.push(`/?category=${encodeURIComponent(cat)}`)} />
        <div className="flex flex-col items-center justify-center px-6 pt-32">
          <p className="mb-6 text-xl font-medium text-[#8A8A8A]">
            Club not found
          </p>
          <button
            onClick={() => router.push("/")}
            className="rounded-[8px] bg-[#2B2B2B] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#333333]"
          >
            ← Back to Directory
          </button>
        </div>
      </div>
    );
  }

  if (!club) return null;

  const hiring = HIRING_CONFIG[club.hiring_status];

  // Team grouping
  const incomingMembers = team.filter((m) => m.is_incoming);
  const currentMembers = team.filter((m) => !m.is_incoming);

  const roleGroups = new Map<string, TeamMember[]>();
  for (const member of currentMembers) {
    const type = member.role_type || "Other";
    if (!roleGroups.has(type)) roleGroups.set(type, []);
    roleGroups.get(type)!.push(member);
  }

  function getRolePriority(roleType: string): number {
    const lower = roleType.toLowerCase();
    if (lower === "co-chair") return 0;
    if (lower.includes("advisor")) return 1;
    if (lower === "head of engagement") return 1.5;
    if (lower === "engagement director") return 1.7;
    if (lower === "director" || lower.startsWith("director of") || lower === "senior director" || lower === "membership director") return 2;
    if (lower === "operations") return 3;
    if (lower === "strategy") return 3;
    if (lower === "marketing coord") return 4;
    if (lower === "marketing coordinator") return 4;
    if (lower === "logistics coordinator") return 4;
    if (lower === "development") return 5;
    if (lower === "data") return 6;
    if (lower === "pm") return 7;
    if (lower === "senior portfolio manager") return 8;
    if (lower === "senior project manager") return 8;
    if (lower === "senior") return 9;
    if (lower === "senior ui/ux") return 9;
    if (lower === "senior developer") return 9;
    if (lower === "senior business analyst") return 9;
    if (lower === "portfolio manager") return 10;
    if (lower === "project manager") return 10;
    if (lower === "senior analyst") return 11;
    if (lower === "analyst") return 12;
    if (lower === "trader") return 13;
    if (lower === "research") return 14;
    if (lower === "ui/ux") return 15;
    if (lower === "developer") return 15;
    if (lower === "business analyst") return 15;
    if (lower === "member" || lower === "membership coord") return 15;
    if (lower === "business consultant") return 16;
    if (lower === "technical consultant") return 17;
    if (lower === "senior project director") return 51;
    if (lower === "project director") return 52;
    if (lower === "consultant") return 53;
    if (lower === "comm '26") return 20;
    if (lower === "comm '27") return 21;
    if (lower === "comm '28") return 22;
    if (lower.includes("first year")) return 100;
    return 50;
  }

  const ROLE_HEADINGS: Record<string, string> = {
    "Co-Chair": "Co-Chairs",
    "Advisor": "Advisors",
    "Senior Advisor": "Senior Advisors",
    "Director": "Directors",
    "Senior Director": "Senior Directors",
    "Director of PM": "Directors of PM",
    "Director of Dev": "Directors of Dev",
    "Director of BA": "Directors of BA",
    "Director of Operations": "Directors of Operations",
    "Membership Director": "Membership Directors",
    "Analyst": "Analysts",
    "Senior Analyst": "Senior Analysts",
    "PM": "PMs",
    "Senior Portfolio Manager": "Senior Portfolio Managers",
    "Senior Project Manager": "Senior Project Managers",
    "Senior": "Seniors",
    "Senior UI/UX": "Senior UI/UX",
    "Senior Developer": "Senior Developers",
    "Senior Business Analyst": "Senior Business Analysts",
    "Portfolio Manager": "Portfolio Managers",
    "Project Manager": "Project Managers",
    "UI/UX": "UI/UX",
    "Developer": "Developers",
    "Business Analyst": "Business Analysts",
    "Member": "Members",
    "Business Consultant": "Business Consultants",
    "Technical Consultant": "Technical Consultants",
    "Marketing Coord": "Marketing",
    "Marketing Coordinator": "Marketing Coordinators",
    "Logistics Coordinator": "Logistics Coordinators",
    "Trader": "Traders",
    "Membership Coord": "Membership Coords",
    "Senior Project Director": "Senior Project Directors",
    "Project Director": "Project Directors",
    "Consultant": "Consultants",
    "First Year Rep": "First Year Reps",
    "First Year Analyst": "First Year Analysts",
    "First Year Hire": "First Year Hires",
    "Head of Engagement": "Heads of Engagement",
    "Engagement Director": "Engagement Directors",
    "Comm '26": "Comm '26",
    "Comm '27": "Comm '27",
    "Comm '28": "Comm '28",
  };

  const sortedRoleTypes = Array.from(roleGroups.keys()).sort(
    (a, b) => getRolePriority(a) - getRolePriority(b)
  );

  return (
    <div className="min-h-screen bg-black">
      <Navbar activeCategory="" setActiveCategory={(cat) => router.push(`/?category=${encodeURIComponent(cat)}`)} />

      <div className="mx-auto max-w-7xl px-6 pt-8">
        {/* Back button */}
        <button
          onClick={() => router.push("/")}
          className="mb-8 flex items-center gap-2 text-sm font-medium text-[#8A8A8A] transition-colors hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5" />
            <path d="m12 19-7-7 7-7" />
          </svg>
          Back to Directory
        </button>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold text-white">{club.name}</h1>
          {club.full_name !== club.name && (
            <p className="mt-1 text-lg font-medium text-[#8A8A8A]">
              {club.full_name}
            </p>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="rounded-[4px] bg-[#FF9000] px-2 py-0.5 text-[10px] font-bold uppercase text-black">
              {club.category}
            </span>

            <div className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${hiring.dot}`} />
              <span className={`text-xs font-medium ${hiring.text}`}>
                {hiring.label}
              </span>
            </div>

            {club.is_urgent && (
              <span className="rounded-[4px] bg-[#FF4444] px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                URGENT
              </span>
            )}

            {club.instagram_url && (
              <a
                href={
                  club.instagram_url.startsWith("http")
                    ? club.instagram_url
                    : `https://${club.instagram_url}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8A8A8A] transition-colors hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Timeline Section */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-extrabold text-white">
            Hiring Timeline
          </h2>

          {club.hiring_status === "estimated" && (
            <div className="mb-4 rounded-[8px] border border-[#EAB308]/30 bg-[#EAB308]/10 px-5 py-3">
              <p className="text-sm font-medium text-[#EAB308]">
                These dates are estimated based on last year&apos;s timeline.
                Check their Instagram for confirmed dates.
              </p>
            </div>
          )}

          {timeline.length === 0 ? (
            <p className="py-8 text-sm font-medium text-[#8A8A8A]">
              No timeline events yet
            </p>
          ) : (
            <div className="overflow-hidden rounded-[8px] border border-[#3B3B3B] bg-[#2B2B2B]">
              {timeline.map((event, i) => (
                <div
                  key={event.id}
                  className={`flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between ${
                    i < timeline.length - 1 ? "border-b border-[#3B3B3B]" : ""
                  } ${event.is_urgent ? "border-l-2 border-l-[#FF9000]" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-white">
                      {event.event_name}
                    </span>
                    {event.is_urgent && (
                      <span className="rounded-[4px] bg-[#FF4444] px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                        URGENT
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    {event.event_date && (
                      <span className="text-sm font-medium text-[#8A8A8A]">
                        {event.event_date}
                      </span>
                    )}
                    {event.is_confirmed ? (
                      <span className="whitespace-nowrap text-xs font-medium text-[#22C55E]">
                        ✓ Confirmed
                      </span>
                    ) : (
                      <span className="whitespace-nowrap text-xs font-medium text-[#8A8A8A]">
                        ~ Estimated
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Team Section */}
        <section className="pb-20">
          {team.length === 0 ? (
            <p className="py-8 text-sm font-medium text-[#8A8A8A]">
              Team information coming soon
            </p>
          ) : (
            <>
              {/* Incoming Leadership */}
              {incomingMembers.length > 0 && (
                <div className="mb-8">
                  <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.08em] text-[#FF9000]">
                    Incoming Leadership
                  </h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {incomingMembers.map((member) => (
                      <div
                        key={member.id}
                        className="rounded-[8px] border border-[#3B3B3B] border-l-[#FF9000] border-l-2 bg-[#2B2B2B] p-4"
                      >
                        <p className="text-sm font-bold text-white">
                          {member.name}
                        </p>
                        {member.role && (
                          <p className="mt-1 text-xs font-medium text-[#8A8A8A]">
                            {member.role}
                          </p>
                        )}
                        {member.year && (
                          <p className="mt-1 text-xs font-medium text-[#FF9000]">
                            {member.year}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Current Team by Role Type */}
              {sortedRoleTypes.length > 0 && (
                <h2 className="mb-6 text-2xl font-extrabold text-white">
                  Current Executive Team
                </h2>
              )}
              {sortedRoleTypes.map((roleType) => (
                <div key={roleType} className="mb-8">
                  <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.08em] text-[#8A8A8A]">
                    {ROLE_HEADINGS[roleType] || roleType}
                  </h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {roleGroups.get(roleType)!.sort((a, b) => {
                      const aRole = (a.role || "").toLowerCase();
                      const bRole = (b.role || "").toLowerCase();
                      const aIsLead = aRole.includes("director") || aRole.includes("lead") || aRole.includes("head");
                      const bIsLead = bRole.includes("director") || bRole.includes("lead") || bRole.includes("head");
                      if (aIsLead && !bIsLead) return -1;
                      if (!aIsLead && bIsLead) return 1;
                      return 0;
                    }).map((member) => (
                      <div
                        key={member.id}
                        className="rounded-[8px] border border-[#3B3B3B] bg-[#2B2B2B] p-4"
                      >
                        <p className="text-sm font-bold text-white">
                          {member.name}
                        </p>
                        {member.role && (
                          <p className="mt-1 text-xs font-medium text-[#8A8A8A]">
                            {member.role}
                          </p>
                        )}
                        {member.year && (
                          <p className="mt-1 text-xs font-medium text-[#FF9000]">
                            {member.year}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}
        </section>
      </div>
    </div>
  );
}
