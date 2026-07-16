"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { api, PlayerSummary, ScoreEntry } from "@/lib/api";
import { PageShell, Pager } from "@/components/pageShell";

const LIMIT = 10;

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-border bg-card/40 p-4"
    >
      <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">{label}</p>
      <p className="mt-2 font-display text-2xl">{value}</p>
    </motion.div>
  );
}

function ScoreSparkline({ data }: { data: number[] }) {
  const w = 600, h = 120;
  if (!data.length)
    return <p className="mt-4 font-mono text-xs text-muted-foreground">No history yet.</p>;
  const max = Math.max(...data, 1);
  const step = data.length > 1 ? w / (data.length - 1) : w;
  const points = data.map((v, i) => `${i * step},${h - (v / max) * (h - 8) - 4}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="mt-4 h-32 w-full">
      <motion.polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        className="text-secondary"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1 }}
      />
      {data.map((v, i) => (
        <circle
          key={i}
          cx={i * step}
          cy={h - (v / max) * (h - 8) - 4}
          r={3}
          className="fill-secondary"
        />
      ))}
    </svg>
  );
}

export default function PlayerClient() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const params = useSearchParams();
  const page = Math.max(1, Number(params.get("page")) || 1);

  const [player, setPlayer] = useState<PlayerSummary | null>(null);
  const [scores, setScores] = useState<ScoreEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    Promise.all([api.player(id), api.scores(id, page, LIMIT)])
      .then(([p, s]) => {
        if (cancelled) return;
        setPlayer(p);
        setScores(s.scores);
      })
      .catch((e) => !cancelled && setError(e.message))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [id, page]);

  const setPage = (n: number) => router.push(`/player/${id}?page=${n}`);
  const hasNext = scores.length === LIMIT;
  const highest = player?.highestScore ?? 0;
  const gamesPlayed = player?.gamePlayed ?? 0;
  const estKills = Math.round(highest / 100) * (gamesPlayed || 1);

  return (
    <>
      {loading ? (
        <p className="font-mono text-xs text-muted-foreground">Loading operator record…</p>
      ) : error ? (
        <p className="font-mono text-xs text-destructive">Could not reach mainframe — {error}</p>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <StatCard label="Highest Score" value={highest.toLocaleString()} />
            <StatCard label="Games Played" value={String(gamesPlayed)} />
            <StatCard label="Estimated UFOs" value={estKills.toLocaleString()} />
            <StatCard label="Global Rank" value="—" />
          </div>

          <div className="mt-8 border border-border bg-card/40 p-6">
            <p className="font-display text-[11px] tracking-[0.35em] text-muted-foreground">SCORE HISTORY</p>
            <ScoreSparkline data={scores.map((r) => r.score).reverse()} />
          </div>

          <div className="mt-8 border border-border bg-card/40">
            <div className="grid grid-cols-[60px_1fr_140px] gap-4 border-b border-border px-4 py-3 font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
              <span>#</span>
              <span>Date</span>
              <span className="text-right">Score</span>
            </div>
            {scores.length === 0 ? (
              <div className="p-6 text-center font-mono text-xs text-muted-foreground">No runs on this page.</div>
            ) : (
              <ul>
                {scores.map((s, i) => (
                  <motion.li
                    key={s.id}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.03 }}
                    className="grid grid-cols-[60px_1fr_140px] items-center gap-4 border-b border-border/60 px-4 py-3 last:border-b-0"
                  >
                    <span className="font-display text-sm text-secondary">{String((page - 1) * LIMIT + i + 1).padStart(2, "0")}</span>
                    <span className="font-mono text-xs text-muted-foreground">{new Date(s.createdAt).toLocaleString()}</span>
                    <span className="text-right font-mono text-sm">{s.score.toLocaleString()}</span>
                  </motion.li>
                ))}
              </ul>
            )}
          </div>

          <Pager page={page} hasNext={hasNext} onChange={setPage} />
        </>
      )}
    </>
  );
}
