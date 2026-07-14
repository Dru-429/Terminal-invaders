import { Navbar } from '@/components/hero/Navbar';
import { Hero } from '@/components/hero/Hero';
import Ctrl from '@/components/ctrl/ctrl';
import { OpenSource } from '@/components/os/os';
import { Comics } from '@/components/comic/Comic';
import { MeetDeveloper } from '@/components/meetDev/MeetDev';
import Downloads from '@/components/downloads/Downloads';
import { Roadmap } from '@/components/roadmap/roadmap';
import { Footer } from '@/components/footer/footer';

export default function Home() {
  return (
    <main className="min-h-screen w-100% p-10 ">
      <Navbar />
      <Hero />
      <Ctrl />
      <Roadmap />
      <Downloads />
      <OpenSource />
      <Comics />
      <MeetDeveloper />
      <Footer />
    </main>
  );
}