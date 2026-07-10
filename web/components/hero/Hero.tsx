"use client"

import { useState } from "react";
import { motion } from "framer-motion";

const INSTALL_CMD = "npm install -g terminal-invaders";

export function Hero() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(INSTALL_CMD);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* noop */
    }
  };

  return (
    <section className="relative w-full border-b border-border">
      <div className="flex flex-col gap-8 px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-[0.02em] text-foreground leading-[0.95]">
            Defend The
            <br />
            Terminal
          </h2>
          <p className="mt-3 text-[11px] tracking-[0.4em] text-muted-foreground">
            INVASION HAS BEGUN
          </p>
        </motion.div>

        <motion.img
          src={"./assests/ufo2.png"}
          alt="Blueprint illustration of an invading flying saucer"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mx-auto w-full max-w-2xl object-contain"
          width={1200}
          height={912}
        />

        <div className="max-w-lg">
          <p className="font-mono text-xs leading-relaxed text-muted-foreground">
            The last outpost of Earth transmits a distress signal from a
            prioritized combat sector. Boot the CLI, hold the line, and push
            the invaders back into the void — one keystroke at a time.
          </p>

          <button
            type="button"
            onClick={copy}
            className="group mt-6 flex w-full items-center justify-between gap-4 border border-border bg-card/60 px-4 py-3 text-left transition-colors hover:border-secondary"
            aria-label="Copy install command"
          >
            <code className="truncate font-mono text-sm text-foreground">
              <span className="text-secondary">$</span> {INSTALL_CMD}
            </code>
            <span className="shrink-0 text-[10px] tracking-[0.3em] text-muted-foreground group-hover:text-secondary">
              {copied ? "COPIED" : "COPY"}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}