import { Forum, Jost } from 'next/font/google';
import Header from '@/components/Header';
import MobileDock from '@/components/MobileDock';
import AppShell from '@/components/AppShell';
import './globals.css';

const jost = Jost({ subsets: ['latin'], variable: '--font-jost', display: 'swap' });
const forum = Forum({ weight: '400', subsets: ['latin'], variable: '--font-forum', display: 'swap' });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');

export const metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: {
    default: 'Angel Nail Spa & Permanent Makeup | Yakima, WA',
    template: '%s | Angel Nail Spa Yakima',
  },
  description: 'Manicures, pedicures, nail enhancements, and permanent makeup at Angel Nail Spa in Yakima, Washington.',
  applicationName: 'Angel Nail Spa & Permanent Makeup',
  category: 'Beauty salon',
  keywords: ['nail salon Yakima', 'manicure Yakima', 'pedicure Yakima', 'nail art Yakima', 'permanent makeup Yakima'],
  creator: 'TD Transactions LLC',
  publisher: 'Angel Nail Spa & Permanent Makeup',
  formatDetection: { email: false, address: false, telephone: false },
  robots: { index: true, follow: true },
  icons: { icon: '/angel-nail-logo.png', shortcut: '/angel-nail-logo.png' },
  verification: {
    google: 'luWEqWsvC7fibTfXmLmcwNhG2Y1M2TxqmrWzIeYBBDg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Angel Nail Spa & Permanent Makeup',
    title: 'Angel Nail Spa & Permanent Makeup | Yakima, WA',
    description: 'Thoughtful nail care, spa pedicures, custom artistry, and permanent makeup in Yakima, Washington.',
    ...(siteUrl ? { url: siteUrl, images: [{ url: '/og-image.webp', width: 1200, height: 630, alt: 'Angel Nail Spa & Permanent Makeup in Yakima, Washington' }] } : {}),
  },
  twitter: {
    card: siteUrl ? 'summary_large_image' : 'summary',
    title: 'Angel Nail Spa & Permanent Makeup | Yakima, WA',
    description: 'Thoughtful nail care, spa pedicures, custom artistry, and permanent makeup in Yakima, Washington.',
    ...(siteUrl ? { images: ['/og-image.webp'] } : {}),
  },
};

const businessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BeautySalon',
  name: 'Angel Nail Spa & Permanent Makeup',
  telephone: '+15093172391',
  priceRange: '$$',
  hasMap: 'https://maps.google.com/?q=1415+S+3rd+Ave+unit+400+Yakima+WA+98902',
  areaServed: 'Yakima, Washington',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '10:00',
      closes: '19:00',
    },
  ],
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
  ...(siteUrl ? { url: siteUrl, image: `${siteUrl}/og-image.webp`, logo: `${siteUrl}/angel-nail-logo.png` } : {}),
};

export const viewport = { width: 'device-width', initialScale: 1, themeColor: '#f7f4ef' };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${jost.variable} ${forum.variable}`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }} />
        <a href="#top" className="skip-link">Skip to main content</a>
        <Header />
        <AppShell>{children}</AppShell>
        <MobileDock />
      </body>
    </html>
  );
}
