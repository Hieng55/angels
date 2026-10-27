import Footer from '@/components/Footer';
import GalleryLightbox from '@/components/GalleryLightbox';

export const metadata = { title: 'Gallery | Angel Nail Spa Yakima' };

const gallery = [
  { src: '/gallery/41.webp', alt: 'Black and nude sculpted nails with gold details' },
  { src: '/gallery/42.webp', alt: 'Custom nail art by Angel Nail Spa' },
  { src: '/gallery/43.webp', alt: 'Detailed manicure design' },
  { src: '/gallery/44.webp', alt: 'Deep burgundy celestial nail art' },
  { src: '/gallery/45.webp', alt: 'Creative custom nail set' },
  { src: '/gallery/46.webp', alt: 'Elegant salon manicure' },
  { src: '/gallery/47.webp', alt: 'Statement nail art design' },
  { src: '/gallery/48.webp', alt: 'Colorful checkerboard and floral nail art' },
  { src: '/gallery/49.webp', alt: 'Polished custom nail set' },
  { src: '/gallery/50.webp', alt: 'Detailed custom manicure by Angel Nail Spa' },
  { src: '/gallery/51.webp', alt: 'Fresh seasonal nail art' },
  { src: '/gallery/52.webp', alt: 'Pink and yellow patterned nail design' },
];

export default function GalleryPage() {
  return (
    <main id="top" className="min-h-screen bg-[#f7f4ef] pt-[84px] text-[#14384b] xl:pt-[96px]">
      <section className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
        <div className="pointer-events-none absolute -left-48 top-32 h-[480px] w-[480px] rounded-full bg-[#7eb6e8]/10 blur-[130px]" />
        <div className="relative mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-[760px] text-center">
            <div className="flex items-center justify-center gap-5 text-[11px] font-semibold uppercase tracking-[.3em] text-[#2f6f91]"><span className="h-px w-14 bg-[#2f6f91]/35" />Our gallery<span className="h-px w-14 bg-[#2f6f91]/35" /></div>
            <h1 className="mt-6 font-forum text-[48px] leading-[.98] sm:text-[62px] lg:text-[74px]">Beauty in every <span className="italic text-[#2f6f91]">detail.</span></h1>
            <p className="mx-auto mt-6 max-w-[560px] text-[15px] leading-7 text-[#14384b]/62">Recent nail artistry created for our guests at Angel Nail Spa.</p>
          </div>

          <GalleryLightbox
            images={gallery}
            className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
            itemClassName="rounded-[10px] border border-[#2868ad]/12 bg-white shadow-[0_18px_50px_rgba(10,40,87,.1)]"
            initialEager={3}
          />

          <div className="mt-12 text-center"><a href="https://www.instagram.com/angelnailspaandpermanentmakeup/" target="_blank" rel="noopener noreferrer" className="inline-flex rounded-full bg-[#0a2857] px-8 py-4 text-[11px] font-semibold uppercase tracking-[.18em] text-white transition hover:bg-[#2868ad]">Follow on Instagram ↗</a></div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
