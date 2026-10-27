import Hero from '@/components/Hero';
import AboutUs from '@/components/AboutUs';
import Services from '@/components/Services';
import NailGallery from '@/components/NailGallery';
import Gallery from '@/components/Gallery';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main id="top" className="min-h-screen bg-[#0a2857]">
      <Hero />
      <AboutUs />
      <Services />
      <NailGallery />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  );
}
