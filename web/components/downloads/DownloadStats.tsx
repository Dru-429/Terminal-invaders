'use client'

import { useEffect, useState } from 'react'

// Static package facts (from npm registry)
const PUBLISHED_START = '2026-03-24'
const PKG = 'terminal-invaders'
const VERSION = '1.0.3'
const LICENSE = 'ISC'
const DEPS = 0
const INSTALL_SIZE = '27.1 MB'
const MAINTAINER = 'dru429'

function fmt (n: number) {
  return n.toLocaleString('en-US')
}

function Stat ({
  label,
  value,
  loading = false
}: {
  label: string
  value: string | number
  loading?: boolean
}) {
  return (
    <div className='border border-border bg-card/40 p-4'>
      <p className='text-[10px] tracking-[0.3em] text-muted-foreground'>
        {label}
      </p>
      <p className='mt-2 font-display text-2xl md:text-3xl text-foreground'>
        {loading ? <span className='text-muted-foreground'>···</span> : value}
      </p>
    </div>
  )
}

export default function Stats () {
  const [total, setTotal] = useState<number | null>(null)
  const [lastWeek, setLastWeek] = useState<number | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10)
    const totalUrl = `https://api.npmjs.org/downloads/point/${PUBLISHED_START}:${today}/${PKG}`
    const weekUrl = `https://api.npmjs.org/downloads/point/last-week/${PKG}`

    Promise.all([
      fetch(totalUrl).then(r => r.json()),
      fetch(weekUrl).then(r => r.json())
    ])
      .then(([t, w]) => {
        setTotal(typeof t?.downloads === 'number' ? t.downloads : 0)
        setLastWeek(typeof w?.downloads === 'number' ? w.downloads : 0)
      })
      .catch(() => setFailed(true))
  }, [])

  const loading = total === null && !failed

  return (
    <div className="flex flex-col">
      {/* Stats */}
      <div className='flex justify-center  gap-4 px-2  mb-15'>
        <h3 className='mt-10 font-display text-2xl text-foreground uppercase tracking-wider'>
          Download Stats:
        </h3>
        <div className='flex items-end text-xs text-muted-foreground font-mono'>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-3 content-start'>
        <Stat
          label='TOTAL DOWNLOADS'
          value={total !== null ? fmt(total) : failed ? '—' : '0'}
          loading={loading}
        />
        <Stat
          label='LAST 7 DAYS'
          value={lastWeek !== null ? fmt(lastWeek) : failed ? '—' : '0'}
          loading={loading}
        />
        <Stat label='VERSION' value={VERSION} />
        <Stat label='LICENSE' value={LICENSE} />
        <Stat label='DEPENDENCIES' value={DEPS} />
        <Stat label='INSTALL SIZE' value={INSTALL_SIZE} />
        <div className='col-span-2 border border-border bg-card/40 p-4'>
          <p className='text-[10px] tracking-[0.3em] text-muted-foreground'>
            PUBLISHED
          </p>
          <p className='mt-2 font-mono text-sm text-foreground'>
            MAR 24, 2026 · by{' '}
            <span className='text-secondary'>~{MAINTAINER}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
