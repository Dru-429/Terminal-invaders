import { Navbar } from '@/components/hero/Navbar'
import { Hero } from '@/components/hero/Hero'
import Ctrl from '@/components/ctrl/ctrl'
import { OpenSource } from '@/components/os/os'
import { Comics } from '@/components/comic/Comic'
import { MeetDeveloper } from '@/components/meetDev/MeetDev'
import Downloads from '@/components/downloads/Downloads'
import { Roadmap } from '@/components/roadmap/roadmap'
import { Footer } from '@/components/footer/footer'

export default function Home () {
  return (
    <>
      <main className='relative min-h-screen w-100% p-10 z-20 bg-background'>
        <Navbar />
        <Hero />
        <Ctrl />
        <Roadmap />
        <Downloads />
        <OpenSource />
        <Comics />
        <MeetDeveloper />
        {/* <div className='md:min-h-screen bg-transparent'></div> */}
      </main>
      <div className='h-screen relative bg-transparent'>
        <div className='w-full fixed bottom-0 '>
          <Footer />
        </div>
      </div>
    </>
  )
}
