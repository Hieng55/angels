import Reviews from '@/components/Gallery';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Customer Reviews',
  description: 'Read guest stories about manicures, pedicures, nail art, and permanent makeup experiences at Angel Nail Spa in Yakima, WA.',
};

export default function ReviewsPage() {
  return <main id="top" className="min-h-screen bg-white pt-[84px] xl:pt-[96px]"><Reviews headingLevel="h1" /><Footer /></main>;
}
