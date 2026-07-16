import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import JsonLd from "./json-ld";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_WEBSITE_URL?.replace(/\/$/, "") ?? "https://www.dhruvsahoo.me"
  ),
  title: "Terminal Invaders — Retro arcade leaderboard for coder commanders",
  description:
    "Terminal Invaders is a retro-inspired arcade experience with a global leaderboard, player profiles, and a sleek terminal-themed landing page.",
  applicationName: "Terminal Invaders",
  icons: {
    icon: [
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [{ rel: "icon", url: "/favicon/favicon.ico" }],
  },
  openGraph: {
    title: "Terminal Invaders — Retro arcade leaderboard",
    description:
      "Terminal Invaders is a retro-inspired arcade experience with a global leaderboard, player profiles, and modern terminal style.",
    type: "website",
    url: process.env.NEXT_PUBLIC_WEBSITE_URL?.replace(/\/$/, "") ?? "https://www.dhruvsahoo.me",
    siteName: "Terminal Invaders",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terminal Invaders — Retro arcade leaderboard",
    description:
      "Terminal Invaders is a retro-inspired arcade experience with a global leaderboard, player profiles, and modern terminal style.",
  },
  other: {
    canonical: process.env.NEXT_PUBLIC_WEBSITE_URL?.replace(/\/$/, "") ?? "https://www.dhruvsahoo.me",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
