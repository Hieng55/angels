'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MorphIcon } from 'morphicons/react';
import { useEffect, useState } from 'react';

const bookingUrl = 'https://www.lldtek.org/salon/appt/VjBGZk1USTBNamc9';
const items = [
  { label: 'Home', href: '/', icon: 'M3 10.5 12 3l9 7.5M5.5 9.5V21h13V9.5', activeIcon: 'M3 10.5 12 3l9 7.5M5.5 9.5V21h13V9.5M9 21v-7h6v7' },
  { label: 'Services', href: '/services', icon: 'M4 6h2M9 6h11M4 12h2M9 12h11M4 18h2M9 18h11', activeIcon: 'M4 5h4v4H4zM11 7h9M4 13h4v4H4zM11 15h9' },
  { label: 'Book', href: bookingUrl, icon: 'M4 7h16v14H4zM8 3v6M16 3v6M4 11h16', activeIcon: 'M5 12.5 10 17l9-10' },
  { label: 'Reviews', href: '/reviews', icon: 'M12 3.5 14.6 8l5.1 1.1-3.5 3.9.5 5.2L12 16l-4.7 2.2.5-5.2-3.5-3.9L9.4 8 12 3.5Z', activeIcon: 'M4 5h16v12H8l-4 4V5ZM8 9h8M8 13h5' },
  { label: 'Contact', href: '/contact', icon: 'M21 11.5a8.3 8.3 0 0 1-8.5 8.2 9.5 9.5 0 0 1-4-.9L3 21l1.8-5a8.1 8.1 0 0 1-1.1-4.1 8.3 8.3 0 0 1 8.5-8.2A8.3 8.3 0 0 1 21 11.5Z', activeIcon: 'M7 4h3l1.5 4-2 1.5a14 14 0 0 0 5 5L16 12.5l4 1.5v3c0 1.1-.9 2-2 2C10.8 19 5 13.2 5 6c0-1.1.9-2 2-2Z' },
];

export default function MobileDock() {
  const pathname = usePathname();
  const currentPath = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
  const routeIndex = items.findIndex((item) => item.href === currentPath);
  const [activeIndex, setActiveIndex] = useState(routeIndex);

  useEffect(() => { setActiveIndex(routeIndex); }, [routeIndex]);

  return (
    <nav className="fixed inset-x-3 z-40 xl:hidden" style={{ bottom: 'max(12px, env(safe-area-inset-bottom))' }} aria-label="Quick navigation">
      <div className="mobile-dock-glass relative mx-auto grid max-w-[480px] grid-cols-5 items-center rounded-[30px] p-1.5">
        <span
          aria-hidden="true"
          className="mobile-dock-indicator pointer-events-none absolute bottom-1.5 left-1.5 top-1.5 rounded-[24px] transition-[transform,opacity] duration-500 ease-[cubic-bezier(.22,1,.36,1)]"
          style={{ width: 'calc((100% - 12px) / 5)', transform: `translateX(${Math.max(activeIndex, 0) * 100}%)`, opacity: activeIndex >= 0 ? 1 : 0 }}
        />
        {items.map((item, index) => {
          const active = activeIndex === index;
          const shared = `relative z-10 flex min-h-[54px] items-center justify-center rounded-[22px] px-1 transition duration-300 active:scale-90 ${index === 2 ? 'text-white' : active ? 'text-[#0e213f]' : 'text-[#0e213f]/48 hover:text-[#0e213f]'}`;
          const content = <>{index === 2 && <span className="mobile-dock-book absolute left-1/2 top-1/2 -z-10 h-[54px] w-[54px] -translate-x-1/2 -translate-y-1/2 rounded-full" />}<MorphIcon icon={active ? item.activeIcon : item.icon} size={22} strokeWidth={active ? 2 : 1.7} spring="smooth" reducedMotion="user" />{active && index !== 2 && <span className="mobile-dock-dot absolute bottom-1.5 h-1 w-1 rounded-full" />}</>;

          return index === 2
            ? <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" aria-label="Book appointment" className={shared}>{content}</a>
            : <Link key={item.label} href={item.href} prefetch={false} onClick={() => setActiveIndex(index)} aria-label={item.label} aria-current={active ? 'page' : undefined} className={shared}>{content}</Link>;
        })}
      </div>
    </nav>
  );
}
