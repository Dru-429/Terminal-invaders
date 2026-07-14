'use client'


export default function FooterLogo() {
  return (
    <div className='relative pt-32 pb-6' aria-hidden>
      {/* Background Glow */}
      <div
        className='pointer-events-none absolute inset-x-0 bottom-0 h-[420px]'
        style={{
          background: `
            radial-gradient(
              ellipse at bottom,
              rgba(76,110,255,.45) 0%,
              rgba(90,70,255,.25) 40%,
              transparent 80%
            )
          `,
          filter: 'blur(80px)',
        }}
      />

      {/* Secondary Glow */}
      <div
        className='pointer-events-none absolute left-1/2 bottom-0 h-[260px] w-[900px] -translate-x-1/2 rounded-full'
        style={{
          background:
            'linear-gradient(90deg, rgba(59,130,246,.25), rgba(139,92,246,.35), rgba(59,130,246,.25))',
          filter: 'blur(100px)',
        }}
      />

      {/* Logo */}
      <h2
        className='relative text-center -bottom-10'
      >
        <span
          className='select-none font-display uppercase tracking-tight text-foreground/40 text-[20vw] md:text-[10vw]  '
          style={{
            lineHeight: 0.8,
            textShadow: `
              0 0 20px rgba(255,255,255,.15),
              0 0 60px rgba(99,102,241,.3)
            `
          }}
        >
          TERMINAL INVADERS
        </span>
      </h2>

      {/* Bottom Fade */}
      <div className='w-screen pointer-events-none absolute inset-x-0 bottom-0 -left-5 h-20 bg-gradient-to-t from-background to-transparent' />
    </div>
  )
}