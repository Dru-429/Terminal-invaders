import { Navbar } from '@/components/hero/Navbar';
import { Hero } from '@/components/hero/Hero';

export default function Home() {
  return (
    <main className="min-h-screen w-100% p-10 ">
      <Navbar />
      <Hero />
    </main>
  );
}