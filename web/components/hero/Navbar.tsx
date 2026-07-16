'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { WEBSITE_URL, PERSONAL_GITHUB_URL, PROJECT_NPM_URL, PERSONAL_X_URL } from '@/lib/links'
import Link from 'next/link';

const NAV = [
  { label: 'ABOUT', href: `${WEBSITE_URL}/#about` },
  { label: 'DOWNLOAD', href: `${WEBSITE_URL}/#download` },
  { label: 'LEADERBOARD', href: '/leaderboard' },
  { label: 'PROFILE', href: '/player' }
]

function formatToday () {
  return new Date()
    .toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    .toUpperCase()
}

// Pixel invader glyph
function Invader ({ className = '' }: { className?: string }) {
  return (
    <svg viewBox='0 0 11 8' className={className} aria-hidden='true'>
      {[
        '0,1',
        '10,1',
        '1,2',
        '2,2',
        '3,2',
        '4,2',
        '5,2',
        '6,2',
        '7,2',
        '8,2',
        '9,2',
        '0,3',
        '1,3',
        '3,3',
        '4,3',
        '6,3',
        '7,3',
        '9,3',
        '10,3',
        '0,4',
        '1,4',
        '2,4',
        '3,4',
        '4,4',
        '5,4',
        '6,4',
        '7,4',
        '8,4',
        '9,4',
        '10,4',
        '0,5',
        '2,5',
        '3,5',
        '5,5',
        '7,5',
        '8,5',
        '10,5',
        '1,6',
        '3,6',
        '7,6',
        '9,6'
      ].map(p => {
        const [x, y] = p.split(',')
        return (
          <rect key={p} x={x} y={y} width='1' height='1' fill='currentColor' />
        )
      })}
    </svg>
  )
}

export function Navbar () {
  const [today, setToday] = useState('')
  useEffect(() => setToday(formatToday()), [])
  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className='w-full border-b border-border'
    >
      {/* Top row */}
      <div className='grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] items-stretch border border-border bg-background'>

        <div className='hidden md:flex items-center justify-center p-5 border-b md:border-b-0 md:border-r border-border'>
          <div className='flex items-center gap-2 text-secondary'>
            <Invader className='h-20 w-auto' />
          </div>
        </div>

        <div className='flex flex-col items-center justify-center text-center p-5 relative'>
          {/* Date positioned right above the main title */}
          <p
            className='text-[9px] md:text-[15px] uppercase font-mono tracking-[0.2em] text-foreground mb-2'
            suppressHydrationWarning
          >
            {today || 'WEDBNESDAY, JULY 20, 2005'}
          </p>

          <Link 
            href={WEBSITE_URL}
          className='font-display text-3xl md:text-8xl lg:text-7xl font-bold tracking-[0.04em] text-foreground leading-none'>
            TERMINAL INVADERS
          </Link>

          <p className='mt-2 text-[10px] md:text-lg font-mono tracking-[0.3em] font-semibold text-foreground uppercase text-center'>
            RETRO GAME. MORDERN TERMINAL.
          </p>
        </div>

        {/* Right Column: Market text / Signals */}
        <div className='flex flex-row  md:flex-col items-center justify-between md:justify-center text-center p-5 border-t md:border-t-0 md:border-l border-border  text-[15px] tracking-[0.15em] text-foreground gap-3'>
            <a href={PROJECT_NPM_URL} target='_blank' rel='noreferrer noopener' className='font-bold hover:text-secondary hover:text cursor-pointer'>NPM</a>
            <a href={PERSONAL_GITHUB_URL} target='_blank' rel='noreferrer noopener' className='font-bold hover:text-secondary hover:text cursor-pointer'>GITHUB</a>
            <a href={PERSONAL_X_URL} target='_blank' rel='noreferrer noopener' className='font-bold hover:text-secondary hover:text cursor-pointer'>TWITTER</a>
        </div>
      </div>

      {/* Nav row */}
      <nav className='grid grid-cols-4 border border-border bg-border'>
        {NAV.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className='border-r-2 border-background last:border-r-0 py-3 text-center font-display font-semibold text-[8px] md:text-lg tracking-[0.35em] text-background transition-colors hover:text-foreground uppercase'
          >
            {item.label}
          </a>
        ))}
      </nav>
    </motion.header>
  )
}
