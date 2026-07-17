import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

function TrophyWithLaurel ({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      {/* Trophy */}
      <svg
        viewBox='0 0 64 64'
        className='w-16 h-16 text-secondary'
        fill='currentColor'
      >
        {/* Cup */}
        <rect x='18' y='10' width='28' height='20' />

        {/* Handles */}
        <rect x='12' y='14' width='6' height='12' />
        <rect x='46' y='14' width='6' height='12' />

        <rect x='10' y='18' width='2' height='6' />
        <rect x='52' y='18' width='2' height='6' />

        {/* Stem */}
        <rect x='29' y='30' width='6' height='10' />

        {/* Base */}
        <rect x='22' y='40' width='20' height='5' />
        <rect x='18' y='45' width='28' height='5' />
      </svg>
    </div>
  )
}

export function HighScores () {
  const [activeTab, setActiveTab] = useState<'global' | 'weekly'>('global')

  return (
    <motion.aside
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
      id='high-scores'
      className='relative flex h-full w-full flex-col bg-background p-6 text-foreground'
    >
      <div className='absolute inset-2 border border-dashed border-foreground/60 pointer-events-none' />

      <div className='relative z-10 flex flex-col items-center text-center mt-2'>
        <div className='scale-200 mt-1'>
          <TrophyWithLaurel className='' />
        </div>
        <h3 className='font-mono text-3xl font tracking-[0.2em] text-foreground uppercase mt-4'>
          Leaderboard
        </h3>
      </div>

      <div className='mt-6 grid grid-cols-2 border border-secondary/30 font-mono text-xs text-center relative z-10'>
        <button
          type='button'
          onClick={() => setActiveTab('global')}
          className={`py-2 tracking-[0.15em] uppercase transition-all duration-150 outline-none ${
            activeTab === 'global'
              ? 'bg-secondary/30 text-foreground font'
              : 'text-foreground/40 hover:text-foreground/70 hover:bg-secondary/5'
          }`}
        >
          GLOBAL
        </button>
        <button
          type='button'
          onClick={() => setActiveTab('weekly')}
          className={`py-2 tracking-[0.15em] uppercase border-l border-secondary/30 transition-all duration-150 outline-none ${
            activeTab === 'weekly'
              ? 'bg-secondary/30 text-foreground font'
              : 'text-foreground/40 hover:text-foreground/70 hover:bg-secondary/5'
          }`}
        >
          WEEKLY
        </button>
      </div>

      <div className='mt-8 flex-1 flex flex-col items-center justify-center min-h-[260px] relative z-10'>
        <motion.div
          key={activeTab}
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className='flex flex-col items-center gap-2'
        >
          <span className='font-mono text-base tracking-[0.4em] text-foreground font-semibold'>
            REALISING SOON
          </span>
          <span className='font-mono text-[9px] md:text-xs tracking-[0.2em] text-secondary uppercase'>
            {activeTab} leaderboard syncing, Do ur best 
          </span>
        </motion.div>
      </div>

      <div className='mt-auto pt-4 text-center relative z-10'>
        <Link
          href={'/'}
          className='font-mono text-sm tracking-[0.2em] text-secondary hover:text-foreground hover:scale-105 transition-all ease-in uppercase inline-flex items-center'
        >
          VIEW FULL LEADERBOARD →
        </Link>
      </div>
    </motion.aside>
  )
}
