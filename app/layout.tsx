import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-noto-sans",
});

export const metadata: Metadata = {
  title: "ClubHub — Queen's Commerce Club Directory",
  description:
    "Discover clubs, explore hiring timelines, and find people across 32 Queen's Commerce student organizations.",
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
      <body>{children}</body>
    </html>
  );
}
