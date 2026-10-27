'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const bookingUrl = 'https://www.lldtek.org/salon/appt/VjBGZk1USTBNamc9';
const mapsUrl = 'https://maps.google.com/?q=1415+S+3rd+Ave+unit+400+Yakima+WA+98902';

export default function Contact() {
  const root = useRef(null);
  useEffect(() => { if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return; const o = new IntersectionObserver(([e]) => { if (!e.isIntersecting) return; gsap.from(root.current.querySelectorAll('[data-contact]'), { y: 20, opacity: 0, duration: .7, stagger: .08, ease: 'power3.out' }); o.disconnect(); }, { threshold: .12 }); o.observe(root.current); return () => o.disconnect(); }, []);
  return (
    <section id="contact" ref={root} className="relative overflow-hidden bg-[#f7f4ef] text-[#14384b]">
      <div className="relative mx-auto grid max-w-[1440px] lg:grid-cols-[.95fr_1.05fr]">
        <div className="flex items-center px-5 py-24 sm:px-8 sm:py-28 lg:px-16 lg:py-32 xl:pl-[100px] xl:pr-20"><div className="w-full max-w-[590px]">
          <div data-contact className="mb-7 flex items-center gap-5 text-[11px] font-semibold uppercase tracking-[.3em] text-[#2f6f91]"><span className="about-rule" />Visit the salon</div>
          <h2 data-contact className="font-forum text-[44px] leading-[.98] sm:text-[56px] lg:text-[68px]">Your appointment,<span className="mt-2 block italic text-[#2f6f91]">made personal.</span></h2>
          <p data-contact className="mt-7 max-w-[510px] text-[15px] leading-7 text-[#14384b]/68">Set aside a little time for yourself. Reserve your appointment or contact our team to plan your visit.</p>
          <div data-contact className="mt-10 grid gap-px overflow-hidden rounded-[22px] border border-[#2f6f91]/16 bg-[#2f6f91]/16 sm:grid-cols-2"><a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="group bg-white/70 p-6 hover:bg-white"><span className="text-[10px] font-semibold uppercase tracking-[.24em] text-[#2f6f91]">Find the salon</span><address className="mt-3 font-forum text-[20px] not-italic leading-7">1415 S 3rd Ave<br />Unit 400<br />Yakima, WA 98902</address><span className="mt-4 inline-flex text-[11px] font-semibold uppercase tracking-[.16em] text-[#2f6f91]">Get directions ↗</span></a><div className="bg-white/70 p-6"><span className="text-[10px] font-semibold uppercase tracking-[.24em] text-[#2f6f91]">Salon hours</span><div className="mt-3 space-y-3 font-forum text-[18px]"><p><span className="block">Monday</span><span className="text-[#2f6f91]">Closed</span></p><p><span className="block">Tuesday – Sunday</span><span className="text-[#2f6f91]">10:00 AM – 7:00 PM</span></p></div></div></div>
          <div data-contact className="mt-7 grid gap-3 sm:flex"><a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="luxury-button luxury-button-primary group w-full sm:w-auto"><span className="relative z-10">Book now</span><span className="relative z-10">↗</span></a><a href="tel:+15093172391" className="luxury-button luxury-button-contact group w-full sm:w-auto"><span className="relative z-10">Call us</span><span className="relative z-10">→</span></a></div>
          <a data-contact href="tel:+15093172391" className="mt-7 inline-block font-forum text-[25px] text-[#2f6f91]">(509) 317-2391</a>
        </div></div>
        <div data-contact className="relative min-h-[520px] overflow-hidden border-t border-[#2868ad]/16 lg:min-h-[790px] lg:border-l lg:border-t-0"><iframe title="Map to Angel Nail Spa" src="https://www.google.com/maps?q=1415%20S%203rd%20Ave%20Unit%20400%20Yakima%20WA%2098902&output=embed" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" className="absolute inset-0 h-full w-full border-0 grayscale-[.25]" /><div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#f7f4ef]/15 via-transparent to-transparent" /><a href="#home" className="absolute bottom-6 right-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#7eb6e8]/55 bg-[#0a2857]/92 text-white shadow-xl backdrop-blur-md">↑</a></div>
      </div>
    </section>
  );
}
