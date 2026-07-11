'use client'

import { useRef, type ReactElement } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export function Invasion () {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const ufoY = useTransform(scrollYProgress, [0, 0.5], [-30, 0])
  const beamScale = useTransform(scrollYProgress, [0.15, 0.6], [0, 1])
  const beamOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1])
  const alienOpacity = useTransform(scrollYProgress, [0.30, 0.6], [0, 1])
  const alienY = useTransform(scrollYProgress, [0.30, 0.65], [12, 0])

  return (
    <section
      ref={ref}
      className='relative w-full'
    >
      <div className='relative min-h-[520px] w-full bg-card/40'>
        <div className='absolute inset-0 flex flex-col items-center justify-between py-8 top-8'>
          {/* UFO */}
          <motion.svg
            style={{ y: ufoY }}
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

          {/* Beam — pixel dots trapezoid */}
          <motion.div
            style={{ scaleY: beamScale, opacity: beamOpacity }}
            className='relative flex-1 w-full origin-top flex justify-center'
          >
            <BeamSVG />
          </motion.div>

          {/* Alien */}
          <motion.svg
            style={{ opacity: alienOpacity, y: alienY }}
            viewBox='0 0 44 32'
            className='w-[38%] max-w-[110px] relative -top-5'
            shapeRendering='crispEdges'
            aria-hidden
          >
            <g fill='var(--color-secondary)'>
              {/* classic space-invader */}
              <rect x='14' y='2' width='4' height='4' />
              <rect x='26' y='2' width='4' height='4' />
              <rect x='18' y='6' width='4' height='4' />
              <rect x='22' y='6' width='4' height='4' />
              <rect x='10' y='10' width='24' height='4' />
              <rect x='6' y='14' width='4' height='4' />
              <rect x='14' y='14' width='4' height='4' />
              <rect x='22' y='14' width='4' height='4' />
              <rect x='30' y='14' width='4' height='4' />
              <rect x='38' y='14' width='4' height='4' />
              <rect x='2' y='18' width='40' height='4' />
              <rect x='6' y='22' width='4' height='4' />
              <rect x='34' y='22' width='4' height='4' />
              <rect x='2' y='26' width='4' height='4' />
              <rect x='38' y='26' width='4' height='4' />
            </g>
          </motion.svg>
        </div>

        <div className='absolute left-3 top-3 font-mono text-[10px] tracking-[0.3em] text-muted-foreground'>
          PLANET EARTH / 07
        </div>
        <div className='absolute right-3 top-3 font-mono text-[10px] tracking-[0.3em] text-secondary'>
          LIVE
        </div>
      </div>
    </section>
  )
}

function BeamSVG () {
  // pixel-dot trapezoid beam
  const rows = 14
  const cells: ReactElement[] = []
  for (let r = 0; r < rows; r++) {
    const width = 6 + r * 2 // widens downward
    const start = 20 - width / 2
    for (let c = 0; c < width; c++) {
      // sparse dot pattern
      if ((c + r) % 2 === 0) {
        cells.push(
          <rect
            key={`${r}-${c}`}
            x={start + c}
            y={r * 2}
            width='0.9'
            height='0.9'
            fill='var(--color-secondary)'
            opacity={0.35 + (r / rows) * 0.5}
          />
        )
      }
    }
  }
  return (
    <svg
      viewBox='0 0 40 32'
      className='h-full w-[70%]'
      preserveAspectRatio='none'
      shapeRendering='crispEdges'
      aria-hidden
    >
      {cells}
    </svg>
  )
}
