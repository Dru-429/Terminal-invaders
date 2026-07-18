const ASCII_ART =                                                               
`                       ----...                             
 -       ---------------------                             
----.------------------+++++                               
-----------+++---++++++                                    
-..----------.------------++##  --++#++-                   
-..-----------------------++--++++++++###++++##+           
-..---------------------------------+###+++####++++        
---------+++++-------++------------...-++##++###++++       
----------+++-------+++-++--+++-+------++#++++##++---      
------------##++++---+###++++++++++--++++++--+##+--++++    
------++-----++++--+################++++###+-+##++-+#+##   
-------++---------+################++##+-+#+++++-+######   
---------++-------##########################+++++#######+  
------------++-+--+######################+##+###########   
-------------++-+--##############++###++##++++###+######   
+--++----------+---+#############+++++++++++++++++##+++    
+++++++-+-++++--..---+##########+######+#+++++++++++       
 ++++++++++++++---+--+###+++++--++++++++#+++++####++       
             +++---+--+#+-+++++++++-++++#+++###++##+       
              +++--+--+++---------++++++#+##++-++   +#     
              +++++++++++---------+++++#+-+#++-++  .-      
               +++++++#+++------+++++++----#++--  .-       
                      ++++++--------+----.--++++--         
                      +++++++++-----+--------++            
                      +++++++++++----++++++++              
                     ++##+++++++-++----+++++-              
            -------+#+++###+++++++++++++++++++--------     
     ------------++++++++###++++++++---+++##+++----------  
`
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
        <pre className='text-foreground/80 whitespace-pre overflow-hidden select-none'>
          {ASCII_ART}
        </pre>

        <div className='text-foreground/90 whitespace-pre-wrap h-full flex flex-col justify-center'>
          <div className='text-secondary'>
            dru@429{' '}
            <span className='text-foreground/40'>
              ─────────────────────────────────────────────────────────────
            </span>
          </div>
          
          <Row k='OS' v='Kali Linux, macOS, Windows (WSL)' />
          <Row k='Uptime' v='20 years, 11 months, 25 days' />
          <Row k='Host' v='Independent / Open Source' />
          <Row k='Kernel' v='TERMINAL INVADERS v0.1.0' />
          <Row k='IDE' v='Cursor, VS Code' />
          <div className='h-3' />
          <Row k='Languages.Programming' v='TypeScript, JavaSricpt, Python' />
          <Row k='Languages.Terminal' v='bash, zsh, fish' />
          <Row k='Languages.Real' v='English, Hindi' />
          <div className='h-3' />
          <Row k='Hobbies.Software' v='CLI tooling, Design Webs, Pixel art' />
          <Row k='Hobbies.Hardware' v='Mechanical keyboards, Retro consoles' />
          <div className='h-3' />
          <div className='text-secondary'>
            - Contact{' '}
            <span className='text-foreground/40'>
              ─────────────────────────────────────────────────────────────
            </span>
          </div>
          <Row k='Email' v='sahoo.dru@gmail.com' />
          <Row k='GitHub' v='dru-429' />
          <Row k='X / Twitter' v='@10xdhruv' />
          <div className='h-3' />
          <div className='text-secondary'>
            - GitHub Stats{'   265'}
            <span className='text-foreground/40'>
            ──────────────────────
            </span>
          </div>
          <Row k='Repos' v='63 {Contributed: 12} | Stars: 265' />
          <Row k='Commits' v='1,291 | Followers: 039' />
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
      <span className='text-foregroud'>. {k}</span>
      <span className='text-foreground/30 mx-1'>{dots}</span>
      <span className='text-secondary'>{v}</span>
    </div>
  )
}
