'use client'

import { motion } from 'framer-motion'
// import Image from "next/image";

const panels = [
  {
    src: './assests/comic-p1.png',
    alt: 'Panel 1 — While I use AI agents in my code editor'
  },
  {
    src: './assests/comic-p2.png',
    alt: 'Panel 2 — While they work, I start scrolling reels on my phone'
  },
  {
    src: './assests/comic-p3.png',
    alt: 'Panel 3 — And end up scrolling reels for hours'
  },
  {
    src: './assests/comic-p4.png',
    alt: 'Panel 4 — So I built a terminal based game'
  }
]

export function Comics () {
  return (
    <section id="about" className='relative w-full border border-border px-6 md:px-10 py-16 pb-4 md:py-24'>
      {/* Masthead */}
      <div className='mb-8 grid grid-cols-1 gap-6 border-b-2 border-double border-foreground/40 pb-6 md:grid-cols-2 md:items-end'>
        <div>
          <p
            className='text-secondary italic'
            style={{
              fontFamily: '"DM Serif Display", serif',
              fontSize: 'clamp(18px, 2.2vw, 28px)'
            }}
          >
            The Terminal Times
          </p>
          <h2
            className='text-foreground text-4xl md:text-8xl leading-none'
            style={{
              fontFamily: '"DM Serif Display", serif',
              letterSpacing: '-0.02em'
            }}
          >
            Comics
          </h2>
        </div>
        <div className='md:text-right'>
          <p className='font-display text-[11px] uppercase tracking-[0.3em] text-muted-foreground md:text-sm'>
            The Story Behind
          </p>
          <p
            className='font-display uppercase text-secondary'
            style={{
              fontSize: 'clamp(22px, 3.5vw, 44px)',
              letterSpacing: '0.04em'
            }}
          >
            Terminal Invaders
          </p>
          <p
            className='mt-1 italic text-secondary'
            style={{
              fontFamily: '"DM Serif Display", serif',
              fontSize: 'clamp(12px, 1.2vw, 16px)'
            }}
          >
            By 10xdhruv
          </p>
        </div>
      </div>

      <div className='grid md:grid-cols-4 gap-3 md:gap-5'>
        {panels.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className='overflow-hidden border border-border bg-card p-1'
          >
            <motion.img
              src={p.src}
              alt={p.alt}
              className='block h-full w-full  '
              loading='lazy'
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                filter: 'grayscale(100%)' 
              }}
              whileHover={{
                filter: 'grayscale(0%)',
              }}
              transition={{
                duration: 0.2, 
              }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
