import { NextResponse } from "next/server";

const SITE_URL = process.env.NEXT_PUBLIC_WEBSITE_URL?.replace(/\/$/, "") ?? "https://www.dhruvsahoo.me";

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${SITE_URL}/leaderboard</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${SITE_URL}/player</loc>
    <priority>0.7</priority>
  </url>
</urlset>`;

export function GET() {
  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
