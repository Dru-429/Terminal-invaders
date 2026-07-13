'use client'

import { motion } from 'framer-motion'
import ReadmeTerminal from './Terminal'
import QuickLinks from './Links'

export function MeetDeveloper () {
  return (
    <section className='relative'>
      <div className='mx-auto max-w-screen px-4 md:px-8 py-16 md:py-24 border border-border flex flex-col md:flex-row gap-4'>
        <div className="w-[75%] border-r border-border">
          <div className='flex items-end justify-between mb-8'>
            <div>
              <div className='text-[10px] md:text-xs font-mono text-secondary tracking-[0.3em] uppercase'>
                // MANIFEST / 004
              </div>
              <h2 className='font-display text-3xl md:text-5xl uppercase tracking-wider text-foreground mt-2'>
                Meet the Developer
              </h2>
            </div>
            <div className='hidden md:block text-[10px] font-mono text-muted-foreground uppercase tracking-widest'>
              whoami → dru-429
            </div>
          </div>
          <ReadmeTerminal />
        </div>

        <div className='w-[25%]'>
          <QuickLinks />
        </div>
      </div>
    </section>
  )
}
