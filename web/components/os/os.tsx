'use client'

import { motion } from 'framer-motion'
import ArchDiagram from './Arch'

export function OpenSource () {
  return (
    <section className='relative w-full border border-border md:p-8'>
      <div>
        <div className='relative md:px-6 md:p-12'>
          {/* corner tags */}
          <div className='absolute left-3 top-3 font-mono text-[10px] tracking-[0.3em] text-muted-foreground'>
            MANIFEST / 003
          </div>
          <div className='absolute right-3 top-3 font-mono text-[10px] tracking-[0.3em] text-secondary'>
            OPEN SOURCE
          </div>

          <motion.h3
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='mt-6 font-display text-4xl md:text-7xl font uppercase leading-[0.95] text-foreground'
          >
            Built For The
            <br />
            Developers
          </motion.h3>

          <p className='mt-4 text-[11px] md:text-md tracking-[0.4em] text-secondary'>
            OPEN SOURCE. CUSTOMIZABLE. EXTENDABLE.
          </p>

          {/* Architecture diagram: CLI ↔ Server → Web */}
          <div className='mt-10 md:mt-14 flex justify-center'>
            <ArchDiagram />
          </div>

          {/* Three paragraphs */}
          <div className='mt-10 md:mt-14 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-10'>
            <p className='font-mono text-xsmd:text-[15px] leading-relaxed text-muted-foreground flex justify-center '>
              <div className='md:w-[70%]'>
                Written in TypeScript with a modular engine, clean APIs and easy
                configuration. Hack it. Extend it. Make it yours.
              </div>
            </p>
            <p className='font-mono text-xsmd:text-[15px] leading-relaxed text-muted-foreground flex justify-center '>
              <div className='md:w-[70%]'>
                Run locally. Compete globally. All from your terminal. No
                distractions. Just you, the game, and the leaderboard.
              </div>
            </p>
            <p className='font-mono text-xsmd:text-[15px] leading-relaxed text-muted-foreground flex justify-center '>
              <div className='md:w-[70%]'>
                Your data never leaves your machine. The CLI runs entirely on
                your PC, the server only ever sees the state of the games you
                choose to publish to the leaderboard{' '}
              </div>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
