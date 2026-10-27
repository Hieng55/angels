import Footer from '@/components/Footer';
import NailGallery from '@/components/NailGallery';

export const metadata = {
  title: 'Nail Art Gallery',
  description: 'Browse custom manicures, sculpted nails, seasonal designs, and detailed nail art created at Angel Nail Spa in Yakima, WA.',
};

export default function GalleryPage() {
  return (
    <main id="top" className="min-h-screen bg-[#071f46] pt-[84px] xl:pt-[96px]">
      <NailGallery fullGallery headingLevel="h1" />
      <Footer />
    </main>
  );
}
