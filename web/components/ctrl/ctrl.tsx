"use client"

import { Invasion } from './Invasion'
import KeyDiagram from './Keyboard';

const ctrl = () => {
  return (
    <section
      className='w-full max-h-screen max-w-screen flex flex-col md:flex-row md:gap-4 border border-border'
      aria-label='Invasion sequence'
    >
      <div className='md:w-[25%] text-center border-r border-border py-12 px-6'>
        <Invasion />
      </div>
      {/* RIGHT — placeholder for next content */}
      <div className='md:w-[75%] relative bg-card/40 p-6 md:p-10 min-h-[520px] flex flex-col'>
        <div className='flex items-start justify-between'>
          <p className='text-[11px] tracking-[0.4em] text-muted-foreground'>
            CONTROLS / 002
          </p>
          <p className='text-[11px] tracking-[0.4em] text-secondary'>
            KEEB CTRL
          </p>
        </div>

        <h3 className='mt-3 font-display text-4xl md:text-6xl font-bold uppercase leading-[0.95] text-foreground'>
          Keeb CTRL
        </h3>
        <p className='mt-3 max-w-md font-mono text-xs leading-relaxed text-muted-foreground'>
          Six keys stand between you and extinction. Scroll to map each binding.
        </p>

        <div className='relative -mt-4 flex-1'>
          <KeyDiagram />
        </div>
      </div>{' '}
    </section>
  )
}

export default ctrl
