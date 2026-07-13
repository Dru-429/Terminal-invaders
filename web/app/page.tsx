import { Navbar } from '@/components/hero/Navbar';
import { Hero } from '@/components/hero/Hero';
import Ctrl from '@/components/ctrl/ctrl';
import { OpenSource } from '@/components/os/os';
import { Comics } from '@/components/comic/Comic';
import { MeetDeveloper } from '@/components/meetDev/MeetDev';
import Downloads from '@/components/downloads/Downloads';

export default function Home() {
  return (
    <main className="min-h-screen w-100% p-10 ">
      <Navbar />
      <Hero />
      <Ctrl />
      <Downloads />
      <OpenSource />
      <Comics />
      <MeetDeveloper />
    </main>
  );
}