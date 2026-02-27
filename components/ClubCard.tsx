"use client";

import { useRouter } from "next/navigation";

export interface Club {
  id: string;
  name: string;
  full_name: string;
  slug: string;
  category: string;
  description: string | null;
  instagram_url: string | null;
  hiring_status: "confirmed" | "estimated" | "none";
  is_urgent: boolean;
  march_hiring: boolean;
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
    text: "text-[var(--muted)]",
    label: "Not Hiring",
  },
} as const;

export default function ClubCard({ club }: { club: Club }) {
  const router = useRouter();
  const hiring = HIRING_CONFIG[club.hiring_status];

  return (
    <div
      onClick={() => router.push(`/clubs/${club.slug}`)}
      className="relative cursor-pointer rounded-[8px] border border-[var(--border)] bg-[var(--card)] p-5 transition-all duration-200 hover:scale-[1.02] hover:bg-[var(--card-hover)]"
    >
      <div className="mb-3 flex items-start justify-between">
        <span className="rounded-[4px] bg-[var(--badge-bg)] px-2 py-0.5 text-[10px] font-bold uppercase text-[var(--on-accent)]">
          {club.category}
        </span>
        {club.is_urgent && (
          <span className="rounded-[4px] bg-[#FF4444] px-2 py-0.5 text-[10px] font-bold uppercase text-white">
            URGENT
          </span>
        )}
      </div>

      <h3 className={`text-xl font-extrabold text-[var(--text)] ${club.full_name !== club.name ? "mb-1" : "mb-4"}`}>
        {club.name}
      </h3>
      {club.full_name !== club.name && (
        <p className="mb-4 text-sm font-medium text-[var(--muted)]">{club.full_name}</p>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${hiring.dot}`} />
          <span className={`text-xs font-medium ${hiring.text}`}>
            {hiring.label}
          </span>
        </div>

        {club.instagram_url && (
          <a
            href={
              club.instagram_url.startsWith("http")
                ? club.instagram_url
                : `https://${club.instagram_url}`
            }
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-[var(--muted)] transition-colors hover:text-[var(--text)]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
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
  );
}
