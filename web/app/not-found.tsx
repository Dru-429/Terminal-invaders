'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const STARS = Array.from({ length: 40 }, (_, i) => ({
  left: (i * 37) % 100,
  top: (i * 61) % 100,
  duration: 2 + (i % 4),
  delay: (i % 6) * 0.4
}))

export default function NotFound() {
  return (
    <main className='relative min-h-screen overflow-hidden bg-background text-foreground'>
      {/* Grid */}
      <div
        className='absolute inset-0 opacity-20'
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--secondary)/0.08) 1px, transparent 1px),
            linear-gradient(90deg,hsl(var(--secondary)/0.08) 1px, transparent 1px)
          `,
          backgroundSize: '42px 42px'
        }}
      />

      {/* Scanlines */}
      <div
        className='pointer-events-none absolute inset-0 opacity-20'
        style={{
          background:
            'repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(255,255,255,.03) 4px)'
        }}
      />

      {/* Floating Stars */}
      {STARS.map((star, i) => (
        <motion.div
          key={i}
          className='absolute h-[2px] w-[2px] rounded-full bg-secondary'
          initial={{
            opacity: 0,
            scale: 0
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.8, 1]
          }}
          transition={{
            repeat: Infinity,
            duration: star.duration,
            delay: star.delay
          }}
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`
          }}
        />
      ))}

      <div className='relative flex min-h-screen flex-col items-center justify-center px-6'>
        <motion.svg
          viewBox='0 0 200 90'
          className='w-[80%] max-w-[220px]'
          shapeRendering='crispEdges'
          aria-hidden
        >
          <g fill='var(--color-secondary)'>
            {/* Dome */}
            <rect x='80' y='10' width='40' height='6' />
            <rect x='72' y='16' width='56' height='6' />
            <rect x='66' y='22' width='68' height='6' />

            {/* Body */}
            <rect x='40' y='30' width='120' height='8' />
            <rect x='24' y='38' width='152' height='10' />
            <rect x='16' y='48' width='168' height='6' />

            {/* Lights */}
            {[34, 54, 74, 94, 114, 134, 154].map(x => (
              <rect
                key={x}
                x={x}
                y='42'
                width='6'
                height='6'
                fill='var(--color-foreground)'
              />
            ))}
          </g>
        </motion.svg>

        {/* 404 */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.6, 1, 0.4, 1],
            x: [0, 3, -2, 0]
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatDelay: 5
          }}
          className='font-display leading-none tracking-tight text-[110px] md:text-[180px]'
          style={{
            color: 'hsl(var(--foreground))',
            textShadow: `
              0 0 8px hsl(var(--secondary)/.4),
              0 0 35px hsl(var(--secondary)/.15)
            `
          }}
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className='font-display text-xs uppercase tracking-[.4em] text-secondary md:text-sm'
        >
          SIGNAL LOST
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className='mt-8 max-w-xl text-center font-mono leading-7 text-muted-foreground'
        >
          The invasion fleet could not locate this transmission.
          <br />
          Either the page never existed or it has been destroyed by the
          invaders.
        </motion.p>

        {/* Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className='mt-14 w-full max-w-3xl overflow-hidden border border-secondary/30 bg-black/40 backdrop-blur-sm'
        >
          <div className='border-b border-secondary/20 px-5 py-3 text-xs uppercase tracking-[0.35em] text-secondary'>
            terminal://error.log
          </div>

          <div className='space-y-4 p-6 font-mono text-sm'>
            <p>
              <span className='text-secondary'>$</span> locate page
            </p>

            <motion.p
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 2 }}
              className='overflow-hidden whitespace-nowrap'
            >
              ERROR 404 : Resource not found...
            </motion.p>

            <motion.p
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{
                delay: 1.8,
                duration: 2
              }}
              className='overflow-hidden whitespace-nowrap'
            >
              Hint: Return to headquarters and continue defending the terminal.
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className='mt-12'
        >
          <Link
            href='/'
            className='group inline-flex items-center gap-3 border border-secondary/40 px-8 py-4 font-display uppercase tracking-[0.25em] transition-all hover:border-secondary hover:bg-secondary/10'
          >
            <motion.span
              animate={{
                x: [-2, 2, -2]
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5
              }}
            >
              ←
            </motion.span>
            Return to Base
          </Link>
        </motion.div>

        <div className='mt-20 text-[10px] uppercase tracking-[0.45em] text-secondary/60'>
          Terminal Invaders • Transmission #404
        </div>
      </div>
    </main>
  )
}