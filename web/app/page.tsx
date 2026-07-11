import { Navbar } from '@/components/hero/Navbar';
import { Hero } from '@/components/hero/Hero';
import Ctrl from '@/components/ctrl/ctrl';
import { OpenSource } from '@/components/os/os';
import { Comics } from '@/components/comic/Comic';

export default function Home() {
  return (
    <main className="min-h-screen w-100% p-10 ">
      <Navbar />
      <Hero />
      <Ctrl />
      <OpenSource />
      <Comics />
    </main>
  );
}