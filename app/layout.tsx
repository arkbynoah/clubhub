import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-noto-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://clubhub.vercel.app"),
  title: "ClubHub — Queen's Commerce Club Directory",
  description:
    "Discover clubs, explore hiring timelines, and find people across 32 Queen's Commerce student organizations.",
  openGraph: {
    title: "ClubHub — Queen's Commerce Club Directory",
    description:
      "Queen's Commerce Club Recruiting, All in One Place.",
    siteName: "ClubHub",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClubHub — Queen's Commerce Club Directory",
    description:
      "Queen's Commerce Club Recruiting, All in One Place.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={notoSans.variable}>
      <head>
        <link rel="stylesheet" href="https://fonts.cdnfonts.com/css/coolvetica" />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
