'use client'

import FooterLogo from './footerLogo'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef } from 'react'

import {
  WEBSITE_URL,
  PROJECT_GITHUB_URL,
  PERSONAL_X_URL,
  PROJECT_NPM_URL
} from '@/lib/links'

function TransmissionTower ({ className = '' }: { className?: string }) {
  // Pixel-art transmission tower with radiating signal waves
  const pixels: string[] = []
  // Antenna tip
  pixels.push('11,1', '11,2', '11,3')
  // Tower body (triangular truss) rows 4-14
  for (let y = 4; y <= 14; y++) {
    const spread = Math.floor((y - 3) / 2)
    pixels.push(`${11 - spread},${y}`)
    pixels.push(`${11 + spread},${y}`)
  }
  // Cross bars
  ;[5, 8, 11, 14].forEach(y => {
    const spread = Math.floor((y - 3) / 2)
    for (let x = 11 - spread; x <= 11 + spread; x++) pixels.push(`${x},${y}`)
  })
  // Diagonal bracing
  pixels.push(
    '10,6',
    '12,6',
    '10,7',
    '12,7',
    '9,9',
    '13,9',
    '9,10',
    '13,10',
    '8,12',
    '14,12',
    '8,13',
    '14,13'
  )
  // Base line
  for (let x = 5; x <= 17; x++) pixels.push(`${x},15`)

  // Signal waves (left + right)
  const waves = [
    // left waves
    '8,3',
    '7,4',
    '6,5',
    '6,6',
    '5,6',
    '5,7',
    '4,3',
    '3,4',
    '2,5',
    '2,6',
    '1,6',
    '1,7',
    '1,8',
    // right waves
    '14,3',
    '15,4',
    '16,5',
    '16,6',
    '17,6',
    '17,7',
    '18,3',
    '19,4',
    '20,5',
    '20,6',
    '21,6',
    '21,7',
    '21,8'
  ]

  return (
    <svg
      viewBox='0 0 23 17'
      className={className}
      aria-hidden='true'
      shapeRendering='crispEdges'
    >
      {pixels.map(p => {
        const [x, y] = p.split(',')
        return (
          <rect
            key={`t-${p}`}
            x={x}
            y={y}
            width='1'
            height='1'
            fill='currentColor'
          />
        )
      })}
      {waves.map(p => {
        const [x, y] = p.split(',')
        return (
          <rect
            key={`w-${p}`}
            x={x}
            y={y}
            width='1'
            height='1'
            fill='currentColor'
            opacity='0.6'
          />
        )
      })}
    </svg>
  )
}

const NAV = [
  { label: 'ABOUT', href: `${WEBSITE_URL}/#about` },
  { label: 'DOWNLOAD', href: `${WEBSITE_URL}/#download` },
  { label: 'LEADERBOARD', href: '/leaderboard' },
  { label: 'PROFILE', href: '/player' }
]
const COMMUNITY = [
  { label: 'GITHUB', href: PROJECT_GITHUB_URL },
  { label: 'TWITTER / X', href: PERSONAL_X_URL },
  {
    label: 'NPM PACKAGE',
    href: PROJECT_NPM_URL
  },
  // { label: 'DISCUSSIONS', href: '' }
]
const RESOURCES = [
  { label: 'DOCUMENTATION', href: `https://github.com/Dru-429/Terminal-invaders#readme` },
  { label: 'CHANGELOG', href: 'https://npmx.dev/package/terminal-invaders' },
  { label: 'CONTRIBUTING', href: 'https://github.com/Dru-429/Terminal-invaders' },
  { label: 'REPORT A BUG', href: 'https://github.com/Dru-429/Terminal-invaders/issues' }
]

function Column (
  title,
  items
}: {
  title: string
  items: { label: string; href: string }[]
}) {
  return (
    <div className='mt-18'>
      <div className='text-[12px] font-mono tracking-[0.35em] text-secondary uppercase my-6'>
        {title}
      </div>
      <ul className='flex flex-col gap-4'>
        {items.map(it => (
          <li key={it.label}>
            <a
              href={it.href}
              target={it.href.startsWith('http') ? '_blank' : undefined}
              rel='noreferrer noopener'
              className='group flex items-center justify-between font-mono text-[12px] tracking-[0.15em] text-foreground  hover:text-zinc-100 hover:scale-105 transition-all'
            >
              <span>{it.label}</span>
              <span className='text-foreground/40 group-hover:text-secondary transition-all duration-300 group-hover:translate-x-1'>
                &gt;
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Footer () {
  const year = new Date().getFullYear()

  const wrapperRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(-500)
  const mouseY = useMotionValue(-500)

  const springX = useSpring(mouseX, {
    stiffness: 180,
    damping: 22
  })

  const springY = useSpring(mouseY, {
    stiffness: 180,
    damping: 22
  })

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const handleMove = (e: MouseEvent) => {
      const rect = wrapper.getBoundingClientRect()

      mouseX.set(e.clientX - rect.left)
      mouseY.set(e.clientY - rect.top)
    }

    const leave = () => {
      mouseX.set(-500)
      mouseY.set(-500)
    }

    wrapper.addEventListener('mousemove', handleMove)
    wrapper.addEventListener('mouseleave', leave)

    return () => {
      wrapper.removeEventListener('mousemove', handleMove)
      wrapper.removeEventListener('mouseleave', leave)
    }
  }, [])

  return (
    <footer className='relative ' ref={wrapperRef}>
      <motion.div
        style={{
          left: springX,
          top: springY
        }}
        className='pointer-events-none absolute h-32 w-32
        -translate-x-1/2
        -translate-y-1/2
        rounded-full
        bg-[#4AA8D7]/20
        blur-2xl'
      />

      {/* Pixel Distortion */}
      <motion.div
        style={{
          left: springX,
          top: springY
        }}
        className='pointer-events-none absolute
        h-44
        w-44
        -translate-x-1/2
        -translate-y-1/2'
      >
        <div
          className='h-full w-full'
          style={{
            backgroundImage: `
              linear-gradient(rgba(242,220,201,.35) 1px, transparent 1px),
              linear-gradient(90deg, rgba(242,220,201,.35) 1px, transparent 1px)
            `,
            backgroundSize: '15px 15px',
            opacity: 0.4,
            filter: 'blur(.4px)',
            maskImage:
              'radial-gradient(circle at center, black 30%, transparent 80%)',
            WebkitMaskImage:
              'radial-gradient(circle at center, black 30%, transparent 80%)'
          }}
        />
      </motion.div>

      <div className='relative mx-auto px-6 md:px-6 pt-20 md:pt-28'>
        {/* Terminal bar */}
        <div className='flex items-center justify-between gap-2 mb-16 md:mb-20 font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase border-b border-dashed border-border/70'>
          <div className='flex items-center gap-4 relative'>
            <div className='font-display text-3xl tracking-[0.08em] text-foreground'>
              TERMINAL INVADERS
            </div>
            <span className='font-mono text-[10px] text-muted-foreground tracking-widest relative -top-2'>
              v0.2.0
            </span>
          </div>
          <div className='flex gap-2'>
            <span className='text-secondary'>◉ connection stable</span>
            <span className='text-foreground/25 mx-2'>|</span>
            <span>~/terminal-invaders/footer.log</span>
          </div>
          <div className='absolute right-4 translate-y-8 font-mono text-[11px] text-muted-foreground tracking-[0.2em]'>
            © {year} DRU. ALL RIGHTS RESERVED.
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr_1fr] gap-12 md:gap-16 md:pr-10'>
          {/* Transmission log + tower */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className='flex flex-col gap-6'
          >
            <TransmissionTower className='w-24 h-auto text-secondary' />
            <div className='text-[12px] font-mono tracking-[0.35em] text-secondary uppercase'>
              Transmission Log / 008
            </div>
            <div className='font-mono text-[12px] leading-[1.9] text-foreground/85 tracking-wide'>
              <p>Earth Outpost 07 signing off.</p>
              <p>Stay sharp, Commander.</p>
              <p className='text-muted-foreground'>
                The invasion never sleeps.
              </p>
            </div>
            <div className='pt-4 font-mono text-[12px] text-secondary tracking-[0.2em]'>
              &gt; JOIN THE DEFENSE
              <span className='inline-block ml-1 animate-pulse'>_</span>
            </div>
          </motion.div>

          <Column title='Navigation' items={NAV} />
          <Column title='Community' items={COMMUNITY} />
          <Column title='Resources' items={RESOURCES} />
        </div>

        <div className='my-10'>...</div>
        {/* Big ambient wordmark */}
        <FooterLogo />
      </div>
    </footer>
  )
}
