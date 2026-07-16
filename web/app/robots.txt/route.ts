import { NextResponse } from "next/server";

const SITE_URL = process.env.NEXT_PUBLIC_WEBSITE_URL?.replace(/\/$/, "") ?? "https://www.dhruvsahoo.me";

const body = `User-agent: *
Allow: /
Sitemap: ${SITE_URL}/sitemap.xml
Host: ${SITE_URL}
`; 

export function GET() {
  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
