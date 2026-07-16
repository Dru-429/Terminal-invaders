import { Suspense } from "react";
import PlayerClient from "./PlayerClient";
import { PageShell } from "@/components/pageShell";

export default function PlayerPageWrapper() {
  return (
    <PageShell>
      <Suspense fallback={<p className="font-mono text-xs text-muted-foreground">Loading operator record…</p>}>
        <PlayerClient />
      </Suspense>
    </PageShell>
  );
}
