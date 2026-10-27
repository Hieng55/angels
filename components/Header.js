'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { MorphIcon } from 'morphicons/react';

const menuIcon = 'M4 6h16M4 12h16M4 18h16';
const closeIcon = 'M6 6l12 12M18 6 6 18';

const leftNav = [['Home', '/'], ['About us', '/about'], ['Services', '/services']];
const rightNav = [['Gallery', '/gallery'], ['Reviews', '/reviews'], ['Contact', '/contact']];
const navItems = [...leftNav, ...rightNav];
const bookingUrl = 'https://www.lldtek.org/salon/appt/VjBGZk1USTBNamc9';

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const currentPath = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const link = ([label, href]) => (
    <Link key={label} href={href} prefetch={false} aria-current={currentPath === href ? 'page' : undefined} className={`nav-link relative whitespace-nowrap py-3 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors hover:text-[#2868ad] ${currentPath === href ? 'nav-link-active text-[#2868ad]' : 'text-[#153b70]'}`}>{label}</Link>
  );

  return (
    <header className="app-header fixed z-50 border border-[#2868ad]/14 bg-white/92 text-[#153b70] shadow-[0_14px_40px_rgba(10,40,87,.16)] backdrop-blur-2xl xl:border-x-0 xl:border-t-0 xl:bg-white/95 xl:shadow-[0_8px_30px_rgba(10,40,87,.08)]">
      <div className="mx-auto grid h-[70px] max-w-[1560px] grid-cols-[1fr_auto] items-center px-3 sm:h-[74px] sm:px-4 xl:h-[96px] xl:grid-cols-[1fr_245px_1fr] xl:px-8 2xl:px-10">
        <nav className="hidden items-center justify-end gap-7 pr-8 xl:flex 2xl:gap-10 2xl:pr-11" aria-label="Primary navigation">{leftNav.map(link)}</nav>
        <Link href="/" prefetch={false} className="relative z-[60] block h-[58px] w-[205px] justify-self-start sm:w-[220px] xl:h-[76px] xl:w-[245px] xl:justify-self-center" aria-label="Angel Nail Spa home">
          <img src="/angel-nail-logo.png" alt="Angel's Nail Spa & Permanent Makeup" className="absolute left-1/2 top-1/2 h-auto w-[205px] max-w-none -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_4px_12px_rgba(0,0,0,.14)] sm:w-[220px] xl:w-[250px]" />
        </Link>
        <div className="hidden items-center justify-start gap-7 pl-8 xl:flex 2xl:gap-9 2xl:pl-11">
          <nav className="flex items-center gap-7 2xl:gap-9" aria-label="Secondary navigation">{rightNav.map(link)}</nav>
          <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="header-book-cta inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-full bg-[#0a2857] px-6 text-[10px] font-semibold uppercase tracking-[0.15em] text-white shadow-[0_10px_26px_rgba(10,40,87,.18)] transition hover:-translate-y-0.5 hover:bg-[#2868ad]">Book now</a>
        </div>
        <button type="button" onClick={() => setOpen(v => !v)} aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'} className={`relative z-[60] flex h-11 w-11 items-center justify-center justify-self-end rounded-full border shadow-[0_8px_22px_rgba(10,40,87,.16)] transition-colors duration-300 xl:hidden ${open ? 'border-[#0e213f]/15 bg-white text-[#0e213f]' : 'border-[#0e213f] bg-[#0e213f] text-white'}`}>
          <MorphIcon icon={open ? closeIcon : menuIcon} size={23} strokeWidth={1.8} spring="smooth" reducedMotion="user" />
        </button>
      </div>
      <div className={`fixed inset-0 z-50 flex min-h-dvh flex-col bg-[linear-gradient(145deg,#ffffff_0%,#fbf7f4_55%,#edf3f8_100%)] px-6 pb-8 pt-[104px] text-[#0e213f] transition duration-500 xl:hidden ${open ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-3 opacity-0'}`}>
        <nav className="flex flex-1 flex-col justify-start pt-7" aria-label="Mobile navigation">
          {navItems.map(([label, href], index) => <Link key={label} href={href} onClick={() => setOpen(false)} className={`flex items-baseline justify-between border-b border-[#0e213f]/12 py-4 transition duration-300 ${open ? 'translate-x-0' : 'translate-x-5'} ${currentPath === href ? 'text-[#2868ad]' : 'text-[#0e213f] hover:text-[#2868ad]'}`} style={{ transitionDelay: `${index * 35}ms` }}><span className="font-forum text-[34px]">{label}</span><span className="text-[11px] tracking-[.16em] text-[#2868ad]">0{index + 1}</span></Link>)}
          <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="mt-8 flex items-center justify-center rounded-full bg-gradient-to-r from-[#0e213f] to-[#27466d] px-6 py-4 text-[12px] font-semibold uppercase tracking-[.2em] text-white shadow-[0_14px_30px_rgba(14,33,63,.2)]">Book appointment</a>
        </nav>
        <p className="text-center text-[11px] uppercase tracking-[.2em] text-[#0e213f]/45">Nails · Spa · Permanent Makeup</p>
      </div>
    </header>
  );
}
