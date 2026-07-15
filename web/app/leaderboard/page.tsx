"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { api, LeaderboardPlayer, LeaderboardScope } from "@/lib/api";
import { Pager, PageShell } from "@/components/pageShell";

const LIMIT = 10;
const SCOPES: { key: LeaderboardScope; label: string }[] = [
  { key: "daily", label: "DAILY" },
  { key: "weekly", label: "WEEKLY" },
  { key: "global", label: "ALL-TIME" },
];

export default function LeaderboardPage() {
  const router = useRouter();
  const params = useSearchParams();
  const scope = (params.get("scope") as LeaderboardScope) || "global";
  const page = Math.max(1, Number(params.get("page")) || 1);

  const [players, setPlayers] = useState<LeaderboardPlayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    api
      .leaderboard(scope, page, LIMIT)
      .then((d) => !cancelled && setPlayers(d.players))
      .catch((e) => !cancelled && setError(e.message))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [scope, page]);

  const setQuery = (s: LeaderboardScope, p: number) =>
    router.push(`/leaderboard?scope=${s}&page=${p}`);

  const hasNext = players.length === LIMIT;

  return (
    <PageShell
      crumb="TRANSMISSION / LEADERBOARD"
      title="High Scores"
      subtitle="Top defenders ranked by peak run. Streaming live from the game server."
    >
      <div className="grid grid-cols-3 border border-border">
        {SCOPES.map((s) => {
          const active = s.key === scope;
          return (
            <button
              key={s.key}
              onClick={() => setQuery(s.key, 1)}
              className={`border-r border-border py-3 text-center font-display text-[11px] tracking-[0.35em] last:border-r-0 transition-colors ${
                active
                  ? "bg-secondary text-secondary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s.label}
            </button>
          );
        })}
      </div>

      <div className="mt-6 border border-border bg-card/40">
        <div className="grid grid-cols-[60px_1fr_120px_140px] gap-4 border-b border-border px-4 py-3 font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
          <span>Rank</span>
          <span>Player</span>
          <span className="text-right">Games</span>
          <span className="text-right">Score</span>
        </div>

        {loading ? (
          <div className="p-8 text-center font-mono text-xs text-muted-foreground">
            Loading transmission…
          </div>
        ) : error ? (
          <div className="p-8 text-center font-mono text-xs text-destructive">
            Signal lost — {error}
          </div>
        ) : players.length === 0 ? (
          <div className="p-8 text-center font-mono text-xs text-muted-foreground">
            No scores yet on this frequency.
          </div>
        ) : (
          <ul>
            {players.map((p, i) => {
              const rank = (page - 1) * LIMIT + i + 1;
              const score = p._max?.score ?? p.score ?? 0;
              const name = p.username || p.playerId.slice(0, 8);
              return (
                <motion.li
                  key={p.playerId + i}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.03 }}
                  className="grid grid-cols-[60px_1fr_120px_140px] items-center gap-4 border-b border-border/60 px-4 py-3 last:border-b-0 hover:bg-secondary/10"
                >
                  <span className="font-display text-sm text-secondary">
                    {String(rank).padStart(2, "0")}
                  </span>
                  <Link
                    href={`/player/${p.playerId}`}
                    className="font-mono text-sm text-foreground hover:text-secondary"
                  >
                    {name}
                    {p.tag && (
                      <span className="ml-2 text-muted-foreground">#{p.tag}</span>
                    )}
                  </Link>
                  <span className="text-right font-mono text-xs text-muted-foreground">
                    —
                  </span>
                  <span className="text-right font-mono text-sm">
                    {score.toLocaleString()}
                  </span>
                </motion.li>
              );
            })}
          </ul>
        )}
      </div>

      <Pager page={page} hasNext={hasNext} onChange={(n) => setQuery(scope, n)} />
    </PageShell>
  );
}
