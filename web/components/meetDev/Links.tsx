import { motion } from "framer-motion";
import {
  PERSONAL_GITHUB_URL,
  PERSONAL_X_URL,
  PERSONAL_PORTFOLIO_URL,
  PERSONAL_LINKEDIN_URL,
} from "@/lib/links";

const LINKS = [
  { label: "GitHub", href: PERSONAL_GITHUB_URL },
  { label: "X / Twitter", href: PERSONAL_X_URL },
  { label: "Portfolio", href: PERSONAL_PORTFOLIO_URL },
  { label: "LinkedIn", href: PERSONAL_LINKEDIN_URL },
];

export default function QuickLinks() {
  return (
    <div className="min-h-[400px] max-h-[460px ] w-full rounded-md border border-dashed border-border bg-card p-6 flex flex-col">
      <h3 className="font-display text-2xl text-foreground uppercase tracking-wider">
          Let's connect
      </h3>
      <div className="mt-1 text-xs text-muted-foreground font-mono">// SOCKET OPEN</div>

      <ul className="mt-6 md:mt-8 flex flex-col divide-y divide-border">
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