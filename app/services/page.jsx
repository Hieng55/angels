import ServiceMenu from '@/components/ServiceMenu';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Services & Pricing | Angel Nail Spa',
  description: 'Explore manicure, pedicure, nail enhancement, waxing, facial, lash, brow, and permanent makeup services at Angel Nail Spa.',
};

export default function ServicesPage() {
  return <main id="top" className="bg-[#0a2857] pt-[84px] xl:pt-[96px]"><ServiceMenu /><Footer /></main>;
}
