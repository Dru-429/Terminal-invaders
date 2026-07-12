import { motion } from "framer-motion";

const LINKS = [
  { label: "GitHub", href: "https://github.com" },
  { label: "X / Twitter", href: "https://x.com" },
  { label: "Portfolio", href: "#" },
];

export default function QuickLinks() {
  return (
    <div className="h-full rounded-md border border-border bg-card p-6 flex flex-col">
      <h3 className="font-display text-2xl text-foreground uppercase tracking-wider">
        Let's Connect:
      </h3>
      <div className="mt-1 text-xs text-muted-foreground font-mono">// SOCKET OPEN</div>

      <ul className="mt-6 flex flex-col divide-y divide-border">
        {LINKS.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              target="_blank"
              rel="noreferrer noopener"
              className="group flex items-center justify-between py-3 text-sm font-mono text-foreground/85 hover:text-secondary transition-colors"
            >
              <span>{l.label}</span>
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 6 }}
                className="inline-block text-secondary transition-transform duration-300 group-hover:translate-x-2"
                aria-hidden
              >
                →
              </motion.span>
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
        [ end of transmission ]
      </div>
    </div>
  );
}