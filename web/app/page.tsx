import { Navbar } from '@/components/hero/Navbar';
import { Hero } from '@/components/hero/Hero';

export default function Home() {
  return (
    <main className="min-h-screen max-w-7xl mx-auto border-x border-[#4A8DB7]">
      <Navbar />
      
      <Hero />
    </main>
  );
}