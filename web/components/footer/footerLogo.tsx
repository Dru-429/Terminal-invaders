'use client'

export default function FooterLogo () {
  return (
    <div className='relative pt-32 pb-6' aria-hidden>
      {/* Background Glow */}
      <div
        className='pointer-events-none absolute inset-x-0 bottom-0 h-[520px]'
        style={{
          background: `
      radial-gradient(
        ellipse 90% 55% at 50% 100%,
        rgba(86,140,255,0.45) 0%,
        rgba(72,115,230,0.32) 22%,
        rgba(60,88,185,0.18) 45%,
        rgba(35,30,90,0.12) 68%,
        transparent 100%
      )
    `,
          filter: 'blur(90px)'
        }}
      />
      {/* Blue Core */}
      <div
        className='pointer-events-none absolute left-1/2 bottom-[-60px] h-[300px] w-[1400px] -translate-x-1/2 rounded-full'
        style={{
          background: `
      radial-gradient(
        ellipse at center,
        rgba(94,164,255,0.42) 0%,
        rgba(74,138,235,0.28) 42%,
        rgba(63,103,214,0.15) 70%,
        transparent 100%
      )
    `,
          filter: 'blur(75px)'
        }}
      />{' '}
      {/* Logo */}
      <h2 className='relative text-center -bottom-10'>
        <span
          className='select-none font-pixel-line uppercase text-center tracking-tight text-zinc-100 text-[20vw] md:text-[10vw]  '
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
      <div className='pointer-events-none w-screen absolute inset-x-0 -bottom-2  md:bottom-0 h-20 bg-gradient-to-t from-background to-transparent' />
    </div>
  )
}
