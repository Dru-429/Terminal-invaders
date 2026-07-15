import type { ReactNode } from "react";
import { Navbar } from "@/components/hero/Navbar";
import { motion } from "framer-motion";
// import { Footer } from "@/components/footer/footer";


export function PageShell({
  crumb,
  title,
  subtitle,
  children,
}: {
  crumb: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <main className="relative min-h-screen w-full p-10 box-border bg-background text-foreground">
      <Navbar />
      <section className="border border-border px-6 py-10 md:py-14">
        <p className="font-mono text-[10px] tracking-[0.4em] text-muted-foreground">
          {"// "} {crumb}
        </p>
        <h1 className="mt-3 font-display text-4xl md:text-6xl font-bold tracking-[0.06em] text-foreground uppercase">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-3 max-w-2xl font-mono text-xs text-muted-foreground">{subtitle}</p>
        ) : null}
      </section>
      <section className="px-6 py-10 border border-border ">
        {/* {children} */}
              <div className='mt-8 flex-1 flex flex-col items-center justify-center min-h-[260px] relative z-10'>
        <motion.div
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className='flex flex-col items-center gap-2'
        >
          <span className='font-mono text-base tracking-[0.4em] text-foreground font-semibold'>
            REALISING SOON
          </span>
          <span className='font-mono text-[9px] md:text-xs tracking-[0.2em] text-secondary uppercase'>
            Prepared to be amazed (￣__,￣)
          </span>
        </motion.div>
      </div>

      </section>

    </main>
  );
}

export function Pager({
  page,
  hasNext,
  onChange,
}: {
  page: number;
  hasNext: boolean;
  onChange: (next: number) => void;
}) {
  return (
    <div className="mt-8 flex items-center justify-between border-t border-border pt-4 font-mono text-[11px] tracking-[0.25em] text-muted-foreground">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page <= 1}
        className="border border-border px-4 py-2 uppercase transition-colors hover:border-secondary hover:text-secondary disabled:cursor-not-allowed disabled:opacity-40"
      >
        ← Prev
      </button>
      <span className="text-foreground">PAGE {String(page).padStart(2, "0")}</span>
      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={!hasNext}
        className="border border-border px-4 py-2 uppercase transition-colors hover:border-secondary hover:text-secondary disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next →
      </button>
    </div>
  );
}