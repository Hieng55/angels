import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Contact & Hours',
  description: 'Contact Angel Nail Spa in Yakima, WA, view salon hours, get directions, call the team, or reserve your next appointment online.',
};

export default function ContactPage() {
  return <main id="top" className="min-h-screen bg-[#0a2857] pt-[84px] xl:pt-[96px]"><Contact headingLevel="h1" /><Footer /></main>;
}
