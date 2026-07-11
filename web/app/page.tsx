import { Navbar } from '@/components/hero/Navbar';
import { Hero } from '@/components/hero/Hero';
import { Invasion } from '@/components/ctrl/Invasion';
import Ctrl from '@/components/ctrl/ctrl';

export default function Home() {
  return (
    <main className="min-h-screen w-100% p-10 ">
      <Navbar />
      <Hero />
      <Ctrl />
    </main>
  );
}