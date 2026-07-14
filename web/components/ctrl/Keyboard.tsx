'use client'

import { motion } from 'framer-motion'

function KeyDiagram () {
  // viewBox 800x420. Keys clustered in center.
  // Key positions (top-left of each 60x60 cap):
  // Up:    x=370 y=150
  // Left:  x=300 y=220
  // Down:  x=370 y=220
  // Right: x=440 y=220
  // R:     x=180 y=150
  // Enter: x=520 y=150 (wider: 100x60)
  //
  // Pointer arrows connect an outer label to the corresponding key.
  const pointers = [
    // id, label, labelX, labelY, textAnchor, path (M start → line to key edge)
    // {
    //   id: "up",
    //   label: "UP · ASCEND",
    //   lx: 400,
    //   ly: 40,
    //   anchor: "middle" as const,
    //   d: "M 400 150 L 400 110 L 400 55",
    // },
    {
      id: 'left',
      label: '< . LEFT',
      lx: 60,
      ly: 255,
      anchor: 'start' as const,
      d: 'M 300 250 L 240 250 L 130 250'
    },
    // {
    //   id: "down",
    //   label: "DOWN · DUCK",
    //   lx: 400,
    //   ly: 400,
    //   anchor: "middle" as const,
    //   d: "M 400 280 L 400 310 L 400 385",
    // },
    {
      id: 'right',
      label: '> . RIGHT',
      lx: 740,
      ly: 255,
      anchor: 'end' as const,
      d: 'M 500 250 L 560 250 L 660 250'
    },
    {
      id: 'r',
      label: 'R · RESTART',
      lx: 60,
      ly: 100,
      anchor: 'start' as const,
      d: 'M 180 180 L 80 180 L 80 105'
    },
    {
      id: 'enter',
      label: 'ENTER · START',
      lx: 740,
      ly: 100,
      anchor: 'end' as const,
      d: 'M 620 180 L 690 180 L 690 105'
    }
  ]

  return (
    <svg
      viewBox='0 0 800 420'
      className='h-auto w-full'
      preserveAspectRatio='xMidYMid meet'
      aria-hidden
    >
      {/* Keys */}
      <KeyCap x={370} y={150} w={60} h={60} glyph='▲' />
      <KeyCap x={300} y={220} w={60} h={60} glyph='◀' />
      <KeyCap x={370} y={220} w={60} h={60} glyph='▼' />
      <KeyCap x={440} y={220} w={60} h={60} glyph='▶' />
      <KeyCap x={180} y={150} w={60} h={60} glyph='R' />
      <KeyCap x={520} y={150} w={100} h={60} glyph='ENTER' small />

      {/* Pointer paths + labels */}
      {pointers.map(p => (
        <g key={p.id}>
          <motion.path
            d={p.d}
            fill='none'
            stroke='var(--color-secondary)'
            strokeWidth={1.5}
            strokeDasharray='4 4'
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />
          <motion.g
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4, delay: 1.1 }}
          >
            <text
              x={p.lx}
              y={p.ly}
              textAnchor={p.anchor}
              fill='var(--color-foreground)'
              fontFamily='var(--font-mono)'
              fontSize='11'
              letterSpacing='2'
            >
              {p.label}
            </text>
          </motion.g>
        </g>
      ))}
    </svg>
  )
}

function KeyCap ({
  x,
  y,
  w,
  h,
  glyph,
  small
}: {
  x: number
  y: number
  w: number
  h: number
  glyph: string
  small?: boolean
}) {
  return (
    <g>
      {/* shadow */}
      <rect
        x={x + 3}
        y={y + 4}
        width={w}
        height={h}
        fill='var(--color-muted)'
      />
      {/* cap */}
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        fill='var(--color-background)'
        stroke='var(--color-foreground)'
        strokeWidth={1.5}
      />
      {/* inner bevel */}
      <rect
        x={x + 5}
        y={y + 5}
        width={w - 10}
        height={h - 14}
        fill='none'
        stroke='var(--color-foreground)'
        strokeOpacity={0.35}
        strokeWidth={1}
      />
      <text
        x={x + w / 2}
        y={y + h / 2 + (small ? 4 : 6)}
        textAnchor='middle'
        fill='var(--color-foreground)'
        fontFamily='var(--font-display)'
        fontSize={small ? 14 : 22}
        letterSpacing={small ? 2 : 0}
      >
        {glyph}
      </text>
    </g>
  )
}

export default KeyDiagram
