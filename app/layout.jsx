import { Forum, Jost } from 'next/font/google';
import Header from '@/components/Header';
import MobileDock from '@/components/MobileDock';
import AppShell from '@/components/AppShell';
import './globals.css';

const jost = Jost({ subsets: ['latin'], variable: '--font-jost', display: 'swap' });
const forum = Forum({ weight: '400', subsets: ['latin'], variable: '--font-forum', display: 'swap' });

export const metadata = {
  title: 'Angel Nail Spa & Permanent Makeup | Yakima, WA',
  description: 'Manicures, pedicures, nail enhancements, and permanent makeup at Angel Nail Spa in Yakima, Washington.',
  icons: { icon: '/angel-nail-logo.png' },
};

const businessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BeautySalon',
  name: 'Angel Nail Spa & Permanent Makeup',
  telephone: '+15093172391',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1415 S 3rd Ave, Unit 400',
    addressLocality: 'Yakima',
    addressRegion: 'WA',
    postalCode: '98902',
    addressCountry: 'US',
  },
  sameAs: [
    'https://www.facebook.com/angelsnailandpermanentmakeup/',
    'https://www.instagram.com/angelnailspaandpermanentmakeup/',
  ],
};

export const viewport = { width: 'device-width', initialScale: 1, themeColor: '#f7f4ef' };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${jost.variable} ${forum.variable}`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }} />
        <Header />
        <AppShell>{children}</AppShell>
        <MobileDock />
      </body>
    </html>
  );
}
