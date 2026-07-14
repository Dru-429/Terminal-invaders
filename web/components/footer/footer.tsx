"use client"

import { motion } from "framer-motion";

function TransmissionTower({ className = "" }: { className?: string }) {
  // Pixel-art transmission tower with radiating signal waves
  const pixels: string[] = [];
  // Antenna tip
  pixels.push("11,1", "11,2", "11,3");
  // Tower body (triangular truss) rows 4-14
  for (let y = 4; y <= 14; y++) {
    const spread = Math.floor((y - 3) / 2);
    pixels.push(`${11 - spread},${y}`);
    pixels.push(`${11 + spread},${y}`);
  }
  // Cross bars
  [5, 8, 11, 14].forEach((y) => {
    const spread = Math.floor((y - 3) / 2);
    for (let x = 11 - spread; x <= 11 + spread; x++) pixels.push(`${x},${y}`);
  });
  // Diagonal bracing
  pixels.push("10,6", "12,6", "10,7", "12,7", "9,9", "13,9", "9,10", "13,10", "8,12", "14,12", "8,13", "14,13");
  // Base line
  for (let x = 5; x <= 17; x++) pixels.push(`${x},15`);

  // Signal waves (left + right)
  const waves = [
    // left waves
    "8,3","7,4","6,5","6,6","5,6","5,7",
    "4,3","3,4","2,5","2,6","1,6","1,7","1,8",
    // right waves
    "14,3","15,4","16,5","16,6","17,6","17,7",
    "18,3","19,4","20,5","20,6","21,6","21,7","21,8",
  ];

  return (
    <svg viewBox="0 0 23 17" className={className} aria-hidden="true" shapeRendering="crispEdges">
      {pixels.map((p) => {
        const [x, y] = p.split(",");
        return <rect key={`t-${p}`} x={x} y={y} width="1" height="1" fill="currentColor" />;
      })}
      {waves.map((p) => {
        const [x, y] = p.split(",");
        return <rect key={`w-${p}`} x={x} y={y} width="1" height="1" fill="currentColor" opacity="0.6" />;
      })}
    </svg>
  );
}

const NAV = [
  { label: "ABOUT", href: "#about" },
  { label: "DOWNLOAD", href: "#download" },
  { label: "LEADERBOARD", href: "#leaderboard" },
  { label: "PROFILE", href: "#profile" },
];
const COMMUNITY = [
  { label: "GITHUB", href: "https://github.com" },
  { label: "TWITTER / X", href: "https://x.com" },
  { label: "NPM PACKAGE", href: "https://www.npmjs.com/package/terminal-invaders" },
  { label: "DISCUSSIONS", href: "#" },
];
const RESOURCES = [
  { label: "DOCUMENTATION", href: "#" },
  { label: "CHANGELOG", href: "#" },
  { label: "CONTRIBUTING", href: "#" },
  { label: "REPORT A BUG", href: "#" },
];

function Column({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div>
      <div className="text-[10px] font-mono tracking-[0.35em] text-secondary uppercase mb-6">
        {title}
      </div>
      <ul className="flex flex-col gap-4">
        {items.map((it) => (
          <li key={it.label}>
            <a
              href={it.href}
              target={it.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer noopener"
              className="group flex items-center justify-between font-mono text-[12px] tracking-[0.15em] text-foreground/85 hover:text-secondary transition-colors"
            >
              <span>{it.label}</span>
              <span className="text-foreground/40 group-hover:text-secondary transition-all duration-300 group-hover:translate-x-1">
                &gt;
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-border bg-background">
      {/* faint scanline overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{ background: "var(--scanline)" }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10 pt-20 md:pt-28 pb-10">
        {/* Terminal bar */}
        <div className="flex items-center gap-2 mb-16 md:mb-20 font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-secondary animate-pulse" />
          <span className="text-secondary">◉ connection stable</span>
          <span className="text-foreground/25 mx-2">|</span>
          <span>~/terminal-invaders/footer.log</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr_1fr] gap-12 md:gap-16">
          {/* Transmission log + tower */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <TransmissionTower className="w-24 h-auto text-secondary" />
            <div className="text-[10px] font-mono tracking-[0.35em] text-secondary uppercase">
              Transmission Log / 008
            </div>
            <div className="font-mono text-[12px] leading-[1.9] text-foreground/85 tracking-wide">
              <p>Earth Outpost 07 signing off.</p>
              <p>Stay sharp, Commander.</p>
              <p className="text-muted-foreground">The invasion never sleeps.</p>
            </div>
            <div className="pt-4 font-mono text-[12px] text-secondary tracking-[0.2em]">
              &gt; JOIN THE DEFENSE
              <span className="inline-block ml-1 animate-pulse">_</span>
            </div>
          </motion.div>

          <Column title="Navigation" items={NAV} />
          <Column title="Community" items={COMMUNITY} />
          <Column title="Resources" items={RESOURCES} />
        </div>

        {/* Divider */}
        <div className="my-16 md:my-20 border-t border-dashed border-border/70" />

        {/* Bottom bar */}
        <
          div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="font-display text-2xl tracking-[0.08em] text-foreground">
              TERMINAL INVADERS
            </div>
            <span className="font-mono text-[10px] text-muted-foreground tracking-widest">
              v0.2.0
            </span>
          </div>
          <div className="font-mono text-[11px] text-muted-foreground tracking-[0.2em]">
            © {year} DRU. ALL RIGHTS RESERVED.
          </div>
        </div>

        {/* Big ambient wordmark */}
        <div
          className="pointer-events-none select-none mt-16 font-display text-[18vw] md:text-[12vw] leading-none tracking-[0.02em] text-foreground/[0.04] text-center overflow-hidden"
          aria-hidden
        >
          INVADERS
        </div>
      </div>
    </footer>
  );
}