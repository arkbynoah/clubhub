import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ClubHub — Queen's Commerce Club Directory";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const SAMPLE_CLUBS = [
  { name: "QUIC", category: "Finance", status: "Hiring Timeline Confirmed", dot: "#22C55E" },
  { name: "QSC", category: "Consulting", status: "Hiring Timeline Confirmed", dot: "#22C55E" },
  { name: "QTMA", category: "Technology", status: "Estimated Hiring Timeline", dot: "#EAB308" },
  { name: "QTC", category: "Finance", status: "Hiring Timeline Confirmed", dot: "#22C55E" },
  { name: "QPCG", category: "Consulting", status: "Hiring Timeline Confirmed", dot: "#22C55E" },
  { name: "HSL", category: "Marketing", status: "Estimated Hiring Timeline", dot: "#EAB308" },
  { name: "SMC", category: "Marketing", status: "Hiring Timeline Confirmed", dot: "#22C55E" },
  { name: "CREO", category: "Consulting", status: "Hiring Timeline Confirmed", dot: "#22C55E" },
];

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#000000",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Arial, sans-serif",
        }}
      >
        {/* Navbar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "16px 48px",
            borderBottom: "1px solid #2B2B2B",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "6px",
                background: "#1a1a1a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "26px",
                  height: "26px",
                  borderRadius: "13px",
                  background: "#FF9000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "13px",
                  fontWeight: 900,
                  color: "#1a1a1a",
                }}
              >
                CH
              </div>
            </div>
            <span style={{ color: "#ffffff", fontSize: "18px", fontWeight: 800 }}>
              ClubHub
            </span>
          </div>
          <div style={{ display: "flex", gap: "24px", marginLeft: "48px" }}>
            {["HOME", "FINANCE", "CONSULTING", "TECHNOLOGY"].map((cat) => (
              <span
                key={cat}
                style={{
                  color: cat === "HOME" ? "#FF9000" : "#8A8A8A",
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                }}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>

        {/* Hero */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "40px",
            paddingBottom: "28px",
          }}
        >
          <div
            style={{
              fontSize: "42px",
              fontWeight: 800,
              color: "#ffffff",
              marginBottom: "8px",
            }}
          >
            It&apos;s March Hiring Szn.
          </div>
          <div
            style={{
              fontSize: "16px",
              color: "#8A8A8A",
              marginBottom: "20px",
            }}
          >
            Queen&apos;s Commerce Club Recruiting, All in One Place.
          </div>
          {/* Search bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "#2B2B2B",
              borderRadius: "9999px",
              padding: "12px 24px",
              width: "480px",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#8A8A8A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <span style={{ color: "#8A8A8A", fontSize: "14px", marginLeft: "12px" }}>
              I&apos;m interested in finance and investing...
            </span>
          </div>
        </div>

        {/* Club heading */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "0 48px",
            marginBottom: "16px",
          }}
        >
          <span style={{ color: "#ffffff", fontSize: "20px", fontWeight: 800 }}>
            All Clubs
          </span>
          <span
            style={{
              background: "#FF9000",
              color: "#000000",
              fontSize: "12px",
              fontWeight: 700,
              padding: "2px 8px",
              borderRadius: "4px",
            }}
          >
            32
          </span>
        </div>

        {/* Club cards grid */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            padding: "0 48px",
            flexWrap: "wrap",
          }}
        >
          {SAMPLE_CLUBS.map((club) => (
            <div
              key={club.name}
              style={{
                width: "258px",
                background: "#2B2B2B",
                border: "1px solid #3B3B3B",
                borderRadius: "8px",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <span
                style={{
                  background: "#FF9000",
                  color: "#000000",
                  fontSize: "9px",
                  fontWeight: 700,
                  padding: "2px 6px",
                  borderRadius: "4px",
                  textTransform: "uppercase",
                  alignSelf: "flex-start",
                }}
              >
                {club.category}
              </span>
              <span style={{ color: "#ffffff", fontSize: "16px", fontWeight: 800 }}>
                {club.name}
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "3px",
                    background: club.dot,
                  }}
                />
                <span style={{ color: club.dot, fontSize: "10px", fontWeight: 500 }}>
                  {club.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
