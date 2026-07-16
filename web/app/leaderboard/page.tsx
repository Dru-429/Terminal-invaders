import { Suspense } from "react";
import { PageShell } from "@/components/pageShell";
import LeaderboardClient from "./LeaderboardClient";

export default function LeaderboardPage() {
  return (
    <PageShell
      crumb="TRANSMISSION / LEADERBOARD"
      title="High Scores"
      subtitle="Top defenders ranked by peak run. Streaming live from the game server."
    >
      <Suspense fallback={<div className="p-8 text-center font-mono text-xs text-muted-foreground">Loading transmission…</div>}>
        {/* Client-only interactive leaderboard */}
        <LeaderboardClient />
      </Suspense>
    </PageShell>
  );
}
