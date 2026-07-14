'use client'

export default function FooterLogo () {
  return (
    <div className='relative pt-32 pb-6' aria-hidden>
      {/* Background Glow */}
      <div
        className='pointer-events-none absolute inset-x-0 bottom-0 h-[420px]'
        style={{
          background: `
          radial-gradient(
            ellipse at bottom,
            rgba(79,141,183,.42) 0%,
            rgba(106,137,160,.24) 42%,
            rgba(8,46,59,.10) 65%,
            transparent 85%
          )
        `,
          filter: 'blur(90px)'
        }}
      />

      {/* Secondary Glow */}
      <div
        className='pointer-events-none absolute left-1/2 bottom-0 h-[280px] w-[950px] -translate-x-1/2 rounded-full'
        style={{
          background: `
            linear-gradient(
              90deg,
              rgba(28,46,59,.12),
              rgba(74,141,183,.30),
              rgba(106,137,160,.26),
              rgba(74,141,183,.30),
              rgba(28,46,59,.12)
            )
          `,
          filter: 'blur(120px)'
        }}
      />

      {/* Logo */}
      <h2 className='relative text-center -bottom-10'>
        <span
          className='select-none font-display uppercase tracking-tight text-foreground/50 text-[20vw] md:text-[10vw]  '
          style={{
            lineHeight: 0.8,
            textShadow: `
            0 0 12px rgba(242,220,201,.08),
            0 0 32px rgba(74,141,183,.22),
            0 0 72px rgba(74,141,183,.14)
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
