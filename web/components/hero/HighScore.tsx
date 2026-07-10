import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

function TrophyWithLaurel({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Laurel Wreath Left */}
      <svg className="h-16 w-8 text-secondary opacity-80" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21c-4.41 0-8-3.59-8-8 0-2.5 1.15-4.73 2.95-6.21l1.42 1.42C7.14 9.32 6.5 11.08 6.5 13c0 3.03 2.47 5.5 5.5 5.5v2.5zm7.05-14.21C20.85 8.27 22 10.5 22 13c0 4.41-3.59 8-8 8v-2.5c3.03 0 5.5-2.47 5.5-5.5 0-1.92-.64-3.68-1.87-4.79l1.42-1.42z" />
        <circle cx="6" cy="7" r="1.5" /><circle cx="4" cy="11" r="1.5" /><circle cx="5" cy="15" r="1.5" />
      </svg>

      {/* Center 12x12 Pixel Trophy */}
      <svg viewBox="0 0 12 12" className="h-16 w-16 text-secondary" aria-hidden="true">
        {[
          "2,1","3,1","4,1","5,1","6,1","7,1","8,1","9,1",
          "2,2","9,2",
          "1,3","2,3","9,3","10,3",
          "1,4","2,4","9,4","10,4",
          "2,5","3,5","8,5","9,5",
          "3,6","4,6","5,6","6,6","7,6","8,6",
          "5,7","6,7",
          "5,8","6,8",
          "3,9","4,9","5,9","6,9","7,9","8,9",
          "2,10","3,10","4,10","5,10","6,10","7,10","8,10","9,10",
        ].map((p) => {
          const [x, y] = p.split(",");
          return <rect key={p} x={x} y={y} width="1" height="1" fill="currentColor" />;
        })}
      </svg>

      {/* Laurel Wreath Right */}
      <svg className="h-16 w-8 text-secondary opacity-80 scale-x-[-1]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21c-4.41 0-8-3.59-8-8 0-2.5 1.15-4.73 2.95-6.21l1.42 1.42C7.14 9.32 6.5 11.08 6.5 13c0 3.03 2.47 5.5 5.5 5.5v2.5zm7.05-14.21C20.85 8.27 22 10.5 22 13c0 4.41-3.59 8-8 8v-2.5c3.03 0 5.5-2.47 5.5-5.5 0-1.92-.64-3.68-1.87-4.79l1.42-1.42z" />
        <circle cx="6" cy="7" r="1.5" /><circle cx="4" cy="11" r="1.5" /><circle cx="5" cy="15" r="1.5" />
      </svg>
    </div>
  );
}

export function HighScores() {
  const [activeTab, setActiveTab] = useState<"global" | "weekly">("global");

  return (
    <motion.aside
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
      id="high-scores"
      className="relative flex h-full w-full flex-col bg-background p-6 text-foreground"
    >
      <div className="absolute inset-2 border border-dashed border-foreground/60 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center mt-2">
        <h3 className="font-mono text-3xl font-bold tracking-[0.2em] text-foreground uppercase">
          Leaderboard
        </h3>
        <TrophyWithLaurel className="mt-4" />
      </div>

      <div className="mt-6 grid grid-cols-2 border border-secondary/30 font-mono text-xs text-center relative z-10">
        <button
          type="button"
          onClick={() => setActiveTab("global")}
          className={`py-2 tracking-[0.15em] uppercase transition-all duration-150 outline-none ${
            activeTab === "global"
              ? "bg-secondary/30 text-foreground font-bold"
              : "text-foreground/40 hover:text-foreground/70 hover:bg-secondary/5"
          }`}
        >
          GLOBAL
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("weekly")}
          className={`py-2 tracking-[0.15em] uppercase border-l border-secondary/30 transition-all duration-150 outline-none ${
            activeTab === "weekly"
              ? "bg-secondary/30 text-foreground font-bold"
              : "text-foreground/40 hover:text-foreground/70 hover:bg-secondary/5"
          }`}
        >
          WEEKLY
        </button>
      </div>

      <div className="mt-8 flex-1 flex flex-col items-center justify-center min-h-[260px] relative z-10">
        <motion.div
          key={activeTab} 
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-mono text-base tracking-[0.4em] text-foreground font-medium">
            COMING SOON
          </span>
          <span className="font-mono text-[9px] tracking-[0.2em] text-secondary uppercase">
            {activeTab} leaderboard syncing active
          </span>
        </motion.div>
      </div>

      <div className="mt-auto pt-4 text-center relative z-10">
        <Link  
          href={"/"}
          className="font-mono text-[10px] tracking-[0.2em] text-secondary hover:text-foreground transition-colors uppercase inline-flex items-center gap-1"
        >
          VIEW FULL LEADERBOARD →
        </Link>
      </div>
    </motion.aside>
  );
}