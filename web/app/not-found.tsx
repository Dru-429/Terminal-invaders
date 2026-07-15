'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const UFO = `
      ▄████▄
   ▄████████▄
 ▄████████████▄
████████████████
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
`

export default function NotFound () {
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
      {Array.from({ length: 40 }).map((_, i) => (
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
            duration: 2 + Math.random() * 3,
            delay: Math.random() * 3
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
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
            {/* dome */}
            <rect x='80' y='10' width='40' height='6' />
            <rect x='72' y='16' width='56' height='6' />
            <rect x='66' y='22' width='68' height='6' />
            {/* body */}
            <rect x='40' y='30' width='120' height='8' />
            <rect x='24' y='38' width='152' height='10' />
            <rect x='16' y='48' width='168' height='6' />
            {/* lights */}
            <rect
              x='34'
              y='42'
              width='6'
              height='6'
              fill='var(--color-foreground)'
            />
            <rect
              x='54'
              y='42'
              width='6'
              height='6'
              fill='var(--color-foreground)'
            />
            <rect
              x='74'
              y='42'
              width='6'
              height='6'
              fill='var(--color-foreground)'
            />
            <rect
              x='94'
              y='42'
              width='6'
              height='6'
              fill='var(--color-foreground)'
            />
            <rect
              x='114'
              y='42'
              width='6'
              height='6'
              fill='var(--color-foreground)'
            />
            <rect
              x='134'
              y='42'
              width='6'
              height='6'
              fill='var(--color-foreground)'
            />
            <rect
              x='154'
              y='42'
              width='6'
              height='6'
              fill='var(--color-foreground)'
            />
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
          className='font-display text-[110px] md:text-[180px] leading-none tracking-tight'
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
          className='font-display uppercase tracking-[.4em] text-secondary text-xs md:text-sm'
        >
          SIGNAL LOST
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className='mt-8 max-w-xl text-center text-muted-foreground font-mono leading-7'
        >
          The invasion fleet couldn't locate this transmission.
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
