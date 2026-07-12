"use client"

import { motion } from "framer-motion";
import ReadmeTerminal from "./Terminal";
import QuickLinks from "./Links";

export function MeetDeveloper() {
  return (
    <section className="relative border-t border-border">
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-16 md:py-24">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-[10px] md:text-xs font-mono text-secondary tracking-[0.3em] uppercase">
              // MANIFEST / 004
            </div>
            <h2 className="font-display text-3xl md:text-5xl uppercase tracking-wider text-foreground mt-2">
              Meet the Developer
            </h2>
          </div>
          <div className="hidden md:block text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
            whoami → dru_429
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-6">
          <ReadmeTerminal />
          <QuickLinks />
        </div>
      </div>
    </section>
  );
}