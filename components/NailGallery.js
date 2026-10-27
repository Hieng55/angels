import Link from 'next/link';
import GalleryLightbox from '@/components/GalleryLightbox';

const featuredWork = [
  { src: '/gallery/41.webp', alt: 'Black and nude sculpted nails with gold details' },
  { src: '/gallery/42.webp', alt: 'Custom nail art by Angel Nail Spa' },
  { src: '/gallery/43.webp', alt: 'Detailed manicure design' },
  { src: '/gallery/44.webp', alt: 'Deep burgundy celestial nail art' },
  { src: '/gallery/45.webp', alt: 'Creative custom nail set' },
  { src: '/gallery/46.webp', alt: 'Elegant salon manicure' },
  { src: '/gallery/47.webp', alt: 'Statement nail art design' },
  { src: '/gallery/48.webp', alt: 'Colorful checkerboard and floral nail art' },
];

export default function NailGallery() {
  return (
    <section id="gallery" className="relative overflow-hidden bg-[#071f46] py-20 text-[#f7f4ef] sm:py-24 lg:py-32">
      <div className="pointer-events-none absolute -left-32 top-1/3 h-[420px] w-[420px] rounded-full bg-[#438fd2]/15 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 -top-20 h-[380px] w-[380px] rounded-full bg-[#d9b8d7]/10 blur-[110px]" />

      <div className="relative mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[760px]">
            <div className="mb-6 flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[.3em] text-[#8bc5f5]">
              <span className="h-px w-12 bg-[#8bc5f5]/60" />
              Our gallery
            </div>
            <h2 className="font-forum text-[48px] leading-[.98] sm:text-[62px] lg:text-[74px]">
              Artistry made for
              <span className="ml-2 italic text-[#b8ddff]">your hands.</span>
            </h2>
            <p className="mt-6 max-w-[590px] text-[14px] leading-7 text-white/62 sm:text-[15px]">
              Explore recent sets created at Angel Nail Spa, from refined everyday color to detailed custom nail art.
            </p>
          </div>

          <Link href="/gallery" prefetch={false} className="group inline-flex w-fit items-center gap-4 rounded-full border border-white/25 bg-white/[.08] px-7 py-4 text-[11px] font-semibold uppercase tracking-[.2em] text-white backdrop-blur-md transition hover:border-[#8bc5f5]/70 hover:bg-white/[.14]">
            View full gallery
            <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
          </Link>
        </div>

        <GalleryLightbox
          images={featuredWork}
          className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
          itemClassName="rounded-[10px] border border-white/15 bg-[#0a2857] shadow-[0_24px_70px_rgba(0,0,0,.28)]"
        />
      </div>
    </section>
  );
}
