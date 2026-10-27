import AboutUs from '@/components/AboutUs';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'About Us',
  description: 'Meet Angel Nail Spa & Permanent Makeup, a welcoming Yakima salon focused on thoughtful care, detailed nail artistry, and lasting beauty services.',
};

export default function AboutPage() {
  return <main id="top" className="min-h-screen bg-[#f7f4ef] pt-[84px] xl:pt-[96px]"><AboutUs headingLevel="h1" /><Footer /></main>;
}
