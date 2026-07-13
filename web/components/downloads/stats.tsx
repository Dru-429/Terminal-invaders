"use client"

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Manager = "NPM" | "YARN" | "PNPM" | "BUN";

const INSTALL: Record<Manager, string> = {
  NPM: "npm install -g terminal-invaders",
  YARN: "yarn global add terminal-invaders",
  PNPM: "pnpm add -g terminal-invaders",
  BUN: "bun add -g terminal-invaders",
};

const RUN = "terminal-invaders";

// Static package facts (from npm registry)
const PUBLISHED_START = "2026-03-24"; 
const PKG = "terminal-invaders";
const VERSION = "1.0.3";
const LICENSE = "ISC";
const DEPS = 0;
const INSTALL_SIZE = "27.1 MB";
const MAINTAINER = "dru429";

function fmt(n: number) {
  return n.toLocaleString("en-US");
}

function CopyRow({ cmd }: { cmd: string }) {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(cmd);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* noop */
    }
  };
  return (
    <button
      type="button"
      onClick={onCopy}
      className="group flex w-full items-center justify-between gap-4 border border-border bg-background/60 px-4 py-3 text-left transition-colors hover:border-secondary"
    >
      <code className="truncate font-mono text-sm text-foreground">
        <span className="text-secondary">$</span> {cmd}
      </code>
      <span className="shrink-0 text-[10px] tracking-[0.3em] text-muted-foreground group-hover:text-secondary">
        {copied ? "COPIED" : "COPY"}
      </span>
    </button>
  );
}

function Stat({
  label,
  value,
  loading = false,
}: {
  label: string;
  value: string | number;
  loading?: boolean;
}) {
  return (
    <div className="border border-border bg-card/40 p-4">
      <p className="text-[10px] tracking-[0.3em] text-muted-foreground">{label}</p>
      <p className="mt-2 font-display text-2xl md:text-3xl text-foreground">
        {loading ? <span className="text-muted-foreground">···</span> : value}
      </p>
    </div>
  );
}

export function Downloads() {
  const [tab, setTab] = useState<Manager>("NPM");
  const [total, setTotal] = useState<number | null>(null);
  const [lastWeek, setLastWeek] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const totalUrl = `https://api.npmjs.org/downloads/point/${PUBLISHED_START}:${today}/${PKG}`;
    const weekUrl = `https://api.npmjs.org/downloads/point/last-week/${PKG}`;

    Promise.all([
      fetch(totalUrl).then((r) => r.json()),
      fetch(weekUrl).then((r) => r.json()),
    ])
      .then(([t, w]) => {
        setTotal(typeof t?.downloads === "number" ? t.downloads : 0);
        setLastWeek(typeof w?.downloads === "number" ? w.downloads : 0);
      })
      .catch(() => setFailed(true));
  }, []);

  const loading = total === null && !failed;

  return (
    <section
      id="download"
      className="relative w-full border-b border-border px-8 py-16 md:py-24"
    >
      {/* Corner tags */}
      <div className="mb-10 flex items-center justify-between">
        <p className="text-[10px] tracking-[0.4em] text-muted-foreground">
          MANIFEST / 004
        </p>
        <p className="text-[10px] tracking-[0.4em] text-muted-foreground">
          v{VERSION} · LATEST
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-3xl"
      >
        <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-[0.02em] text-foreground leading-[0.95]">
          Download &<br />Install
        </h2>
        <p className="mt-3 text-[11px] tracking-[0.4em] text-muted-foreground">
          ONE COMMAND. ANY TERMINAL.
        </p>
      </motion.div>

      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
        {/* Installer card */}
        <div className="flex flex-col">
          {/* Tabs */}
          <div className="grid grid-cols-4 border border-border border-b-0">
            {(Object.keys(INSTALL) as Manager[]).map((m) => {
              const active = tab === m;
              return (
                <button
                  key={m}
                  type="button"
                  onClick={() => setTab(m)}
                  className={`border-r border-border last:border-r-0 py-3 font-display text-[11px] tracking-[0.35em] transition-colors ${
                    active
                      ? "bg-secondary/20 text-secondary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {m}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-3 border border-border bg-card/40 p-4">
            <CopyRow cmd={INSTALL[tab]} />
            <CopyRow cmd={RUN} />
          </div>

          <div className="mt-4 flex items-center justify-between text-[10px] tracking-[0.3em] text-muted-foreground">
            <span>◈ REQUIRES NODE.JS 18+</span>
            <a
              href={`https://www.npmjs.com/package/${PKG}`}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-secondary"
            >
              VIEW ON NPMJS.COM →
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 content-start">
          <Stat
            label="TOTAL DOWNLOADS"
            value={total !== null ? fmt(total) : failed ? "—" : "0"}
            loading={loading}
          />
          <Stat
            label="LAST 7 DAYS"
            value={lastWeek !== null ? fmt(lastWeek) : failed ? "—" : "0"}
            loading={loading}
          />
          <Stat label="VERSION" value={VERSION} />
          <Stat label="LICENSE" value={LICENSE} />
          <Stat label="DEPENDENCIES" value={DEPS} />
          <Stat label="INSTALL SIZE" value={INSTALL_SIZE} />
          <div className="col-span-2 border border-border bg-card/40 p-4">
            <p className="text-[10px] tracking-[0.3em] text-muted-foreground">
              PUBLISHED
            </p>
            <p className="mt-2 font-mono text-sm text-foreground">
              MAR 24, 2026 · by{" "}
              <span className="text-secondary">~{MAINTAINER}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}