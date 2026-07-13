"use client"

import { motion } from "framer-motion";

type Milestone = {
  month: string;
  title: string;
  status: "done" | "current" | "upcoming";
};

const MILESTONES: Milestone[] = [
  { month: "APR 2026", title: "Local CLI Game", status: "done" },
  { month: "MAY 2026", title: "File-Based Storage", status: "done" },
  { month: "JUN 2026", title: "Global Server", status: "done" },
  { month: "JUL 2026", title: "Leaderboard & Profile", status: "current" },
  { month: "AUG 2026", title: "More UFO Types", status: "upcoming" },
  { month: "SEP 2026", title: "Levels System", status: "upcoming" },
  { month: "OCT 2026", title: "Badge System", status: "upcoming" },
  { month: "NOV 2026", title: "New Shooting Style", status: "upcoming" },
];

export function Roadmap() {
  const doneCount = MILESTONES.filter((m) => m.status !== "upcoming").length;
  // progress line fill = fraction from first to last dot that is completed/current
  const progressPct = ((doneCount - 1) / (MILESTONES.length - 1)) * 100;

  return (
    <section
      id="roadmap"
      className="relative w-full border border-border px-8 py-16 md:py-24"
      aria-label="Roadmap"
    >
      <div className="mb-10 flex items-center justify-between">
        <p className="text-[10px] tracking-[0.4em] text-muted-foreground">
          ROADMAP / 005
        </p>
        <p className="text-[10px] tracking-[0.4em] text-secondary">
          WHAT&#39;S NEXT
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-3xl"
      >
        <h2 className="font-display text-4xl md:text-6xl font-bold uppercase leading-[0.95] text-foreground">
          The Roadmap
        </h2>
        <p className="mt-3 font-mono text-sm text-muted-foreground">
          &gt; What&#39;s done and what&#39;s coming next.
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="mt-16 overflow-x-auto pb-4">
        <div className="relative min-w-[880px]">
          {/* Track line */}
          <div className="absolute left-0 right-0 top-4 h-px bg-border" />
          {/* Progress line (animates from 0 → progressPct) */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${progressPct}%` }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            className="absolute left-0 top-4 h-px bg-secondary"
          />

          <ol className="relative grid grid-cols-8 gap-2">
            {MILESTONES.map((m, i) => {
              const delay = 0.2 + i * 0.18;
              const filled = m.status !== "upcoming";
              return (
                <li
                  key={m.month}
                  className="flex flex-col items-center text-center"
                >
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{
                      duration: 0.4,
                      delay,
                      ease: "backOut",
                    }}
                    className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                      filled
                        ? "border-secondary bg-secondary text-background"
                        : "border-border bg-background text-muted-foreground"
                    }`}
                    aria-label={`${m.month} — ${m.title}`}
                  >
                    {m.status === "done" && (
                      <svg
                        viewBox="0 0 12 12"
                        className="h-3 w-3"
                        aria-hidden
                      >
                        <path
                          d="M2 6 L5 9 L10 3"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                    )}
                    {m.status === "current" && (
                      <span className="h-2 w-2 rounded-full bg-background" />
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.4, delay: delay + 0.15 }}
                    className="mt-4 flex flex-col items-center"
                  >
                    <span
                      className={`font-mono text-[10px] tracking-[0.2em] ${
                        filled ? "text-secondary" : "text-muted-foreground"
                      }`}
                    >
                      {m.month}
                    </span>
                    <span className="mt-2 max-w-[110px] font-mono text-xs leading-snug text-foreground">
                      {m.title}
                    </span>
                  </motion.div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}