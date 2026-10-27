'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const categories = [
  { id: 'pedicure', title: 'Pedicure', copy: 'Four levels of spa pedicure care, from classic refresh to the complete Angel’s Spa ritual.', image: '/services/pedicure.jpg' },
  { id: 'manicure', title: 'Mani & Pedi', copy: 'Classic color, deluxe care, spa combinations, and services for younger guests.', image: '/services/manicure.jpg' },
  { id: 'enhancements', title: 'Nail Enhancements', copy: 'Full sets, fills, ombre, color powder, and gel options for lasting strength and style.', image: '/services/nail-enhancements.jpg' },
  { id: 'waxing', title: 'Waxing', copy: 'Face and body waxing services for a smooth, carefully finished result.', image: '/services/waxing.jpg' },
  { id: 'facial', title: 'Facial', copy: 'A focused one-hour beauty ritual designed to leave skin feeling refreshed.', image: '/services/facial.jpg' },
  { id: 'beauty', title: 'Lash · Brow · Lip', copy: 'Eyelash, brow tint, brow tattoo, eyeliner tattoo, and lip tattoo services.', image: '/services/lash-brow-lip.jpg' },
  { id: 'lipstyles', title: 'Lip Styles', copy: 'Explore full color, shaded liner, ombre, lip blush, and aquarelle finishes.', image: '/services/lip-styles.jpg' },
];

export default function Services() {
  const root = useRef(null);
  const track = useRef(null);
  useEffect(() => {
    const section = root.current;
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) return; gsap.from(section.querySelectorAll('[data-category]:not([data-service-card])'), { y: 24, opacity: 0, duration: .62, stagger: .07, ease: 'power3.out', clearProps: 'transform,opacity' }); observer.disconnect(); }, { threshold: .1 });
    observer.observe(section); return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const scroller = track.current;
    if (!scroller) return;
    let frame;
    const updateActiveCard = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const cards = [...scroller.querySelectorAll('[data-service-card]')];
        if (window.innerWidth >= 1024) {
          cards.forEach((card) => {
            card.style.removeProperty('transform');
            card.style.removeProperty('opacity');
            card.style.removeProperty('z-index');
          });
          return;
        }
        const center = scroller.scrollLeft + scroller.clientWidth / 2;
        const metrics = cards.map(card => ({ card, center: card.offsetLeft + card.offsetWidth / 2, width: card.offsetWidth }));
        metrics.forEach(({ card, center: cardCenter, width }) => {
          const delta = cardCenter - center;
          const offset = Math.max(-2, Math.min(2, delta / Math.max(width * 0.86, 1)));
          const arcDistance = Math.min(Math.abs(offset), 1.7);
          const y = -12 + arcDistance * 28;
          const scale = 1 - Math.min(Math.abs(offset), 1.5) * 0.075;
          card.style.transform = `translate3d(0, ${y}px, 0) rotateZ(${offset * 4.5}deg) scale(${scale})`;
          card.style.opacity = `${1 - Math.min(Math.abs(offset), 2) * 0.16}`;
          card.style.zIndex = `${10 - Math.round(Math.abs(offset) * 3)}`;
        });
      });
    };
    updateActiveCard();
    scroller.addEventListener('scroll', updateActiveCard, { passive: true });
    window.addEventListener('resize', updateActiveCard);
    return () => {
      cancelAnimationFrame(frame);
      scroller.removeEventListener('scroll', updateActiveCard);
      window.removeEventListener('resize', updateActiveCard);
    };
  }, []);

  return (
    <section id="services" ref={root} className="relative overflow-hidden bg-[#f7f4ef] py-20 text-[#153b70] sm:py-24 lg:py-32">
      <div className="pointer-events-none absolute -left-40 top-10 h-[430px] w-[430px] rounded-full bg-[#7eb6e8]/18 blur-[130px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[430px] w-[430px] rounded-full bg-white/55 blur-[130px]" />
      <div className="relative mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_.7fr]">
          <div><div data-category className="mb-7 flex items-center gap-5 text-[11px] font-semibold uppercase tracking-[.3em] text-[#2868ad]"><span className="service-ornament-line" />Our services</div><h2 data-category className="max-w-[700px] font-forum text-[44px] leading-[.98] sm:text-[56px] lg:text-[68px]">Choose your ritual,<span className="mt-2 block italic text-[#2868ad]">then explore the menu.</span></h2></div>
          <p data-category className="max-w-[470px] text-[15px] leading-7 text-[#153b70]/68 lg:justify-self-end">Select a category to open the complete service menu, pricing, and treatment details.</p>
        </div>

        <div ref={track} className="service-coverflow-track app-scrollbar relative -mx-5 mt-12 flex snap-x snap-proximity gap-1 overflow-x-auto px-[8vw] pb-7 pt-4 sm:-mx-8 sm:px-[24vw] lg:mx-0 lg:mt-16 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0 lg:pt-0">
          {categories.map((category, index) => (
            <a data-category data-service-card key={category.id} href={`/services/#${category.id}`} className="service-coverflow-card group relative h-[430px] w-[84vw] max-w-[380px] shrink-0 snap-center overflow-hidden rounded-[28px] border border-[#153b70]/10 bg-white shadow-[0_24px_60px_rgba(10,40,87,.16)] sm:w-[52vw] sm:max-w-none lg:w-auto">
              <img src={category.image} alt={category.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061a3a] via-[#0a2857]/42 to-transparent" />
              <span className="absolute right-5 top-5 font-forum text-[44px] text-white/35">0{index + 1}</span>
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7"><span className="text-[10px] font-semibold uppercase tracking-[.22em] text-[#7eb6e8]">View category</span><h3 className="mt-2 font-forum text-[35px] leading-none text-white">{category.title}</h3><p className="mt-3 max-w-[430px] text-[13px] leading-6 text-white/65">{category.copy}</p><span className="mt-5 inline-flex items-center gap-3 border-b border-[#7eb6e8]/50 pb-1.5 text-[11px] font-semibold uppercase tracking-[.18em] text-[#f2e9d9] transition-all group-hover:gap-4 group-hover:border-[#7eb6e8]">Open service menu <span>→</span></span></div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
