const ASCII_ART = `        g@M%@%%@N%Nw,,
       ,M*|\`||*g@NM=]mM%g||%N,
      p!\`\`   '!  |''\`  '''|||jhlj%w
     ,@L\`     ,,        '''\`|j%M]%M
    ]j'\` .,wp@pw,   \`.    ''''|%Wg
   /{|||@@@@@@@@pp.           ||||
  '\`'  ]@@@@@@@@@@@@p       ,  ,'''
 , :]%%@@@%%%%%%k%h '*||mkr    *
 '  j%M\`     |jkk\`  ~nrn=|i  ;\`
  !  jrr*\`\`             \`"!  L''!
   j  lp;,.  ,/ @@   ,;\\nmy " ,~
   i r @@@mmHM @@@@ \`^****M*,p ;,
   | ]@@@HHH]g@M%%%%H,jmgpmb% j
   ;;%%%%k%@[,.n|;.;j%%k|%k%%',[
   H|%%%%%j%k||,;;j;!!'|%ij}]@
    "djjmkL,"]]|,,,,wwxw;|#kjk\`
     %;%km%%%M%M|%%jkkii||||[
       kjj%%kkkl|!||||||j|||"
        |jm%H@@@b%%kkmk%i|!,[
          @p|j%%%jkk|||j*\`\`;j[
           ]@@@g|''\`'\`'  ,;j%k
           @@@@mgmp;,,,,:;jj%k%
          @@@@@@@%%kgki!|jjjj%k%@
  .^['' %@@@HH%b%k{illljkj%%%\` ; \`,,.
 =[' \`   .%HH%%%%%H@gkillljjj%kk%".   \`i`

export default function ReadmeTerminal () {
  return (
    <div className='rounded-md overflow-hidden border border-border bg-[#0d1117] font-mono text-[11px] md:text-[12px] leading-[1.15] shadow-2xl '>
      {/* header */}
      <div className='px-4 py-2 border-b border-white/10 flex items-center gap-2 bg-[#0d1117]'>
        <span className='h-2.5 w-2.5 rounded-full bg-[#ff5f56]' />
        <span className='h-2.5 w-2.5 rounded-full bg-[#ffbd2e]' />
        <span className='h-2.5 w-2.5 rounded-full bg-[#27c93f]' />
        <span className='ml-3 text-[11px] text-white/60'>
          dru_429 / README.md
        </span>
      </div>

      {/* body */}
      <div className='p-5 md:p-7 grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6'>
        <pre className='text-secondary whitespace-pre overflow-hidden select-none'>
          {ASCII_ART}
        </pre>

        <div className='text-foreground/90 whitespace-pre-wrap'>
          <div className='text-secondary'>
            dru@429{' '}
            <span className='text-foreground/40'>
              ──────────────────────────────
            </span>
          </div>
          <Row k='OS' v='Arch Linux, macOS, Windows (WSL)' />
          <Row k='Uptime' v='24 years, 3 months, 12 days' />
          <Row k='Host' v='Independent / Open Source' />
          <Row k='Kernel' v='TERMINAL INVADERS v0.1.0' />
          <Row k='IDE' v='Neovim, VS Code' />
          <div className='h-3' />
          <Row k='Languages.Programming' v='TypeScript, Rust, Go, Python' />
          <Row k='Languages.Terminal' v='bash, zsh, fish' />
          <Row k='Languages.Real' v='English, Urdu' />
          <div className='h-3' />
          <Row k='Hobbies.Software' v='CLI tooling, Game engines, Pixel art' />
          <Row k='Hobbies.Hardware' v='Mechanical keyboards, Retro consoles' />
          <div className='h-3' />
          <div className='text-secondary'>
            - Contact{' '}
            <span className='text-foreground/40'>
              ─────────────────────────
            </span>
          </div>
          <Row k='Email' v='dru@terminalinvaders.dev' />
          <Row k='GitHub' v='dru_429' />
          <Row k='X / Twitter' v='@dru_429' />
          <div className='h-3' />
          <div className='text-secondary'>
            - GitHub Stats{' '}
            <span className='text-foreground/40'>──────────────────────</span>
          </div>
          <Row k='Repos' v='47 {Contributed: 82} | Stars: 1,204' />
          <Row k='Commits' v='3,891 | Followers: 312' />
          <Row k='Lines shipped' v='128,430 (+94,201 / -34,229)' />
        </div>
      </div>
    </div>
  )
}

function Row ({ k, v }: { k: string; v: string }) {
  const dots = '.'.repeat(Math.max(2, 26 - k.length))
  return (
    <div className='flex flex-wrap'>
      <span className='text-secondary'>. {k}</span>
      <span className='text-foreground/30 mx-1'>{dots}</span>
      <span className='text-foreground'>{v}</span>
    </div>
  )
}
