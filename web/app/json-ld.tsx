const WEBSITE_URL = process.env.NEXT_PUBLIC_WEBSITE_URL?.replace(/\/$/, "") ?? "https://www.dhruvsahoo.me";

export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: WEBSITE_URL,
    name: "Terminal Invaders",
    description:
      "Terminal Invaders is a retro-inspired arcade experience with a global leaderboard, player profiles, and modern terminal style.",
    publisher: {
      "@type": "Person",
      name: "Dhruv Sahoo",
      url: "https://www.dhruvsahoo.me",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${WEBSITE_URL}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
