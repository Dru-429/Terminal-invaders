"use client"

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function formatToday() {
  return new Date()
    .toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    .toUpperCase();
}

// Pixel invader glyph
function Invader({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 11 8" className={className} aria-hidden="true">
      {[
        "0,1","10,1",
        "1,2","2,2","3,2","4,2","5,2","6,2","7,2","8,2","9,2",
        "0,3","1,3","3,3","4,3","6,3","7,3","9,3","10,3",
        "0,4","1,4","2,4","3,4","4,4","5,4","6,4","7,4","8,4","9,4","10,4",
        "0,5","2,5","3,5","5,5","7,5","8,5","10,5",
        "1,6","3,6","7,6","9,6",
      ].map((p) => {
        const [x, y] = p.split(",");
        return <rect key={p} x={x} y={y} width="1" height="1" fill="currentColor" />;
      })}
    </svg>
  );
}

function Rocket({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 8 11" className={className} aria-hidden="true">
      {[
        "3,0","4,0",
        "2,1","3,1","4,1","5,1",
        "2,2","3,2","4,2","5,2",
        "1,3","2,3","3,3","4,3","5,3","6,3",
        "1,4","2,4","5,4","6,4",
        "1,5","2,5","3,5","4,5","5,5","6,5",
        "3,6","4,6",
        "2,7","3,7","4,7","5,7",
        "3,8","4,8",
        "3,9","4,9",
      ].map((p) => {
        const [x, y] = p.split(",");
        return <rect key={p} x={x} y={y} width="1" height="1" fill="currentColor" />;
      })}
    </svg>
  );
}

export function Navbar() {
  const [today, setToday] = useState("");
  useEffect(() => setToday(formatToday()), []);
  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full border-b border-border"
    >
      {/* Top row */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-6 py-5">
        {/* Left: pixel icons + date */}
        <div className="flex items-center gap-4">
          <div className="flex gap-2 text-secondary">
            <Invader className="h-6 w-8" />
            <Rocket className="h-8 w-6" />
          </div>
          <p
            className="hidden md:block text-[10px] tracking-[0.25em] text-muted-foreground"
            suppressHydrationWarning
          >
            {today || "\u00A0"}
          </p>
        </div>

        {/* Center: brand */}
        <div className="text-center">
          <h1 className="font-display text-3xl md:text-5xl font-bold tracking-[0.06em] text-foreground leading-none">
            TERMINAL INVADERS
          </h1>
          <p className="mt-2 text-[10px] tracking-[0.4em] text-muted-foreground">
            A CLI ARCADE GAME
          </p>
        </div>

        {/* Right: signals */}
        <div className="text-right">
          <p className="text-[10px] tracking-[0.3em] text-foreground leading-relaxed">
            OPEN SOURCE
            <br />
            <span className="text-muted-foreground">MIT LICENSED</span>
          </p>
        </div>
      </div>

      {/* Nav row */}
      <nav className="grid grid-cols-4 border-t border-border bg-secondary/15">
        {["ABOUT", "MISSIONS", "ENEMY DATA", "COMMAND"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
            className="border-r border-border last:border-r-0 py-3 text-center font-display text-[11px] tracking-[0.35em] text-foreground transition-colors hover:text-secondary"
          >
            {item}
          </a>
        ))}
      </nav>
    </motion.header>
  );
}