import ServiceMenu from '@/components/ServiceMenu';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Services & Pricing',
  description: 'View manicure, pedicure, nail enhancement, waxing, facial, lash, brow, lip, and permanent makeup services and pricing at Angel Nail Spa in Yakima.',
};

export default function ServicesPage() {
  return <main id="top" className="bg-[#0a2857] pt-[84px] xl:pt-[96px]"><ServiceMenu /><Footer /></main>;
}
