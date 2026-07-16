import { Suspense } from "react";
import PlayerClient from "./PlayerClient";
import { PageShell } from "@/components/pageShell";

export default function PlayerPageWrapper({ params }: { params: { id: string } }) {
  const playerId = params.id;
  const shortId = playerId.slice(0, 8);

  return (
    <PageShell
      crumb={`TRANSMISSION / PLAYER / ${shortId}`}
      title={`PLAYER ${shortId}`}
      subtitle="Operator record streaming from the mainframe."
    >
      <Suspense fallback={<p className="font-mono text-xs text-muted-foreground">Loading operator record…</p>}>
        <PlayerClient />
      </Suspense>
    </PageShell>
  );
}
