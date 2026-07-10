import { motion } from "framer-motion";

function Trophy({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={className} aria-hidden="true">
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
  );
}

function Section({ label }: { label: string }) {
  return (
    <div>
      <div className="border-y-2 border-[#0f1720] bg-[#0f1720] py-1.5 text-center">
        <span className="font-display text-[11px] tracking-[0.3em] text-[#efe2cf]">
          {label}
        </span>
      </div>
      <div className="flex items-center justify-center py-6">
        <motion.span
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="font-display text-sm tracking-[0.35em] text-[#0f1720]"
        >
          COMING SOON
        </motion.span>
      </div>
    </div>
  );
}

export function HighScores() {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
      id="high-scores"
      className="relative flex h-full flex-col bg-[#efe2cf] p-6 text-[#0f1720]"
      style={{
        backgroundImage:
          "radial-gradient(oklch(0.2 0.02 260 / 12%) 1px, transparent 1px)",
        backgroundSize: "3px 3px",
      }}
    >
      {/* Title */}
      <div className="text-center">
        <h3 className="font-display text-4xl md:text-5xl font-bold tracking-[0.04em] leading-none">
          HIGH
          <br />
          SCORES
        </h3>
      </div>

      {/* Trophy */}
      <div className="mt-6 flex flex-col items-center gap-3">
        <Trophy className="h-24 w-24 text-[#0f1720]" />
        <div className="border-2 border-[#0f1720] px-4 py-1">
          <span className="font-display text-[11px] tracking-[0.25em] text-[#0f1720]">
            HIGH SCORE
          </span>
        </div>
      </div>

      {/* Sections */}
      <div className="mt-8 flex flex-1 flex-col gap-6">
        <Section label="LOCAL (TOP PLAYER)" />
        <Section label="GLOBAL" />
      </div>

      <p className="mt-6 text-center text-[9px] tracking-[0.35em] text-[#0f1720]/60">
        LEADERBOARD SYNCING SOON
      </p>
    </motion.aside>
  );
}