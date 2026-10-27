import Reviews from '@/components/Gallery';
import Footer from '@/components/Footer';

export const metadata = { title: 'Customer Reviews | Angel Nail Spa Yakima' };

export default function ReviewsPage() {
  return <main id="top" className="min-h-screen bg-white pt-[84px] xl:pt-[96px]"><Reviews /><Footer /></main>;
}
