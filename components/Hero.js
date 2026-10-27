'use client';

import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { bookingUrl, mapsUrl, socialLinks } from '@/lib/site';
const slides = [
  { background: '/banner/floral-manicure.webp', inset: '/banner/inset-floral-hands.webp', eyebrow: 'Angel Nail Spa · Yakima', title: 'A little heaven,', accent: 'at your fingertips', description: 'A polished escape for beautiful nails, thoughtful care, and the confidence to feel like your best self.', services: 'Manicure · Pedicure · Nail Art', position: 'center center' },
  { background: '/banner/spring-manicure-neutral.webp', inset: '/banner/inset-bridal-nails.webp', eyebrow: 'Personal Nail Artistry', title: 'Refined detail,', accent: 'made uniquely yours', description: 'From timeless polish to expressive designs, each appointment is shaped around your style.', services: 'Gel · Acrylic · Custom Design', position: 'center center' },
  { background: '/banner/manicure-service.webp', inset: '/banner/inset-red-floral-nails.webp', eyebrow: 'Beauty Made Effortless', title: 'Lasting beauty,', accent: 'softly defined', description: 'Thoughtful permanent makeup enhancements designed to simplify your routine and complement your natural features.', services: 'Permanent Makeup · Beauty Care', position: 'center center' },
];

export default function Hero() {
  const root = useRef(null);
  const card = useRef(null);
  const arch = useRef(null);
  const backgrounds = useRef([]);
  const insets = useRef([]);
  const busy = useRef(false);
  const touch = useRef(null);
  const [active, setActive] = useState(0);

  useGSAP(() => {
    gsap.set(backgrounds.current, { zIndex: 0 });
    gsap.set(insets.current, { zIndex: 0 });
    gsap.set(backgrounds.current[0], { zIndex: 1, clipPath: 'circle(150% at 50% 50%)' });
    gsap.set(insets.current[0], { zIndex: 1 });
    gsap.timeline({ defaults: { ease: 'power3.out' } }).from(card.current, { x: -35, opacity: 0, duration: 1, delay: .2 }).from(arch.current, { x: 40, opacity: 0, duration: 1 }, '-=.75');
  }, { scope: root });

  const goTo = target => {
    if (target === active || busy.current) return;
    busy.current = true;
    const nextBg = backgrounds.current[target];
    const currentBg = backgrounds.current[active];
    gsap.set(nextBg, { zIndex: 2, clipPath: 'circle(0% at 50% 50%)' });
    gsap.timeline({ onComplete: () => { busy.current = false; } })
      .to([card.current, arch.current], { y: 5, opacity: 0, duration: .22 })
      .to(nextBg, { clipPath: 'circle(150% at 50% 50%)', duration: .9, ease: 'power3.inOut' }, '-=.08')
      .call(() => { gsap.set(insets.current[active], { zIndex: 0 }); gsap.set(insets.current[target], { zIndex: 1 }); setActive(target); }, null, '-=.55')
      .to([card.current, arch.current], { y: 0, opacity: 1, duration: .5, stagger: .04, ease: 'power2.out' })
      .call(() => { gsap.set(currentBg, { zIndex: 0 }); gsap.set(nextBg, { zIndex: 1 }); });
  };

  const move = direction => goTo((active + direction + slides.length) % slides.length);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => { if (!busy.current) move(1); }, 6500);
    return () => window.clearInterval(timer);
  }, [active]);

  const slide = slides[active];
  return (
    <section id="home" ref={root} onTouchStart={e => { touch.current = e.touches[0].clientX; }} onTouchEnd={e => { const d = e.changedTouches[0].clientX - touch.current; if (Math.abs(d) > 50) move(d < 0 ? 1 : -1); }} className="relative min-h-[820px] touch-pan-y overflow-hidden bg-[#0a2857] text-[#f2e9d9] sm:min-h-[880px] lg:min-h-screen">
      <div className="absolute inset-0 bg-[#0a2857]">{slides.map((s, i) => <div key={s.title} ref={el => { backgrounds.current[i] = el; }} className="absolute inset-0 will-change-[clip-path]" style={{ clipPath: i === 0 ? 'circle(150% at 50% 50%)' : 'circle(0% at 50% 50%)' }}><img src={s.background} alt="" width="1920" height="1280" fetchPriority={i === 0 ? 'high' : 'auto'} className="h-full w-full scale-[1.04] object-cover" style={{ objectPosition: s.position }} /></div>)}</div>
      <div className="pointer-events-none absolute inset-0 z-[3] bg-black/40" />
      <div className="relative z-10 mx-auto grid min-h-[820px] max-w-[1240px] grid-cols-1 items-center gap-10 px-5 pb-40 pt-28 sm:min-h-[880px] sm:px-8 sm:pb-44 sm:pt-32 lg:min-h-screen lg:grid-cols-[1.06fr_.94fr] lg:gap-16 lg:px-10 lg:pb-32 lg:pt-36">
        <div ref={card} className="relative max-w-[620px] overflow-hidden rounded-[28px] border border-white/35 bg-[#0e213f]/35 px-6 py-9 shadow-[0_30px_90px_rgba(5,12,24,.4)] backdrop-blur-[28px] sm:rounded-[32px] sm:px-10 sm:py-11 lg:px-12 lg:py-14">
          <span className="absolute inset-0 bg-gradient-to-br from-white/[.18] via-white/[.04] to-[#0e213f]/20" />
          <div className="relative mb-6 flex items-center gap-5 text-[11px] font-semibold uppercase tracking-[.3em] text-white/90"><span className="luxury-line luxury-line-left" /> <span className="shrink-0">{slide.eyebrow}</span><span className="luxury-line luxury-line-right" /></div>
          <h1 className="relative font-forum text-[49px] leading-[.94] text-white sm:text-[66px] lg:text-[78px]">{slide.title}<span className="mt-2 block italic text-[#b8c6d8]">{slide.accent}</span></h1>
          <p className="relative mt-7 max-w-[510px] text-[14px] leading-7 text-white/80 sm:text-[15px]">{slide.description}</p>
          <div className="relative mt-8 grid gap-3 sm:flex sm:flex-wrap"><a href="tel:+15093172391" className="luxury-button hero-button hero-button-primary group w-full sm:w-auto"><span className="relative z-10">Call now</span><span className="luxury-button-icon relative z-10">→</span></a><a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="luxury-button hero-button hero-button-secondary group w-full sm:w-auto"><span className="relative z-10">Book now</span><span className="luxury-button-icon relative z-10">↗</span></a></div>
          <p className="relative mt-6 text-[12px] font-semibold tracking-[.13em] text-white/75">{slide.services}</p>
        </div>

        <div ref={arch} className="relative mx-auto hidden h-[540px] w-full max-w-[430px] lg:block">
          <span className="absolute right-[-35px] top-[-68px] font-forum text-[170px] leading-none text-[#f2e9d9]/10">0{active + 1}</span>
          <div className="absolute inset-x-3 bottom-0 top-4 overflow-hidden rounded-t-[215px] rounded-b-[28px] border border-white/45 bg-white/[.12] p-3 shadow-[0_28px_75px_rgba(6,26,58,.34)] backdrop-blur-[18px]">
            <div className="relative h-full overflow-hidden rounded-t-[200px] rounded-b-[20px]">{slides.map((s, i) => <div key={s.inset} ref={el => { insets.current[i] = el; }} className="absolute inset-0"><img src={s.inset} alt="" width="1200" height="1800" loading="lazy" className="h-full w-full object-cover" /></div>)}<div className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-t from-[#0a2857]/28 via-transparent to-white/[.08]" /></div>
          </div>
          <div className="absolute -bottom-2 -right-4 z-10 flex h-28 w-28 rotate-6 items-center justify-center rounded-full border border-[#7eb6e8] bg-[#f2e9d9] text-center text-[#0a2857] shadow-xl"><span className="font-forum text-[18px] leading-5">Beauty in<br />every detail</span></div>
        </div>
      </div>

      <aside aria-label="Social links" className="absolute right-5 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-4 xl:flex"><span className="mb-2 text-[10px] uppercase tracking-[.3em] [writing-mode:vertical-rl]">Follow</span>{socialLinks.map(([icon,label,href]) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#f2e9d9]/35 bg-[#f2e9d9]/90 transition hover:-translate-y-1 hover:bg-white"><img src={icon} alt="" width="20" height="20" className="h-5 w-5 object-contain" /></a>)}</aside>

      <div className="absolute inset-x-0 bottom-24 z-20 px-5 sm:px-8 lg:bottom-8 lg:px-10"><div className="mx-auto flex max-w-[1240px] items-end justify-between gap-6">
        <a href={mapsUrl} target="_blank" rel="noopener noreferrer" data-hero-bottom className="liquid-glass liquid-glass-light hidden max-w-[440px] items-center rounded-[28px] px-7 py-3.5 text-[#0e213f] sm:flex"><div className="relative z-[1]"><p className="font-forum text-[23px] leading-none">Angel Nail Spa</p><p className="mt-1.5 text-[12px] leading-4 text-[#2868ad]">1415 S 3rd Ave, Unit 400 · Yakima, WA</p></div></a>
        <div data-hero-bottom className="liquid-glass liquid-glass-dark ml-auto flex w-full items-center justify-between gap-2 rounded-full p-2 pl-4 sm:w-auto sm:gap-4 sm:pl-5"><button onClick={() => move(-1)} className="liquid-control relative z-[1] text-[11px] font-semibold uppercase tracking-[.16em] text-[#9acbf5]">← Prev</button><span className="relative z-[1] h-6 w-px bg-white/20" />{slides.map((_,i) => <button key={i} onClick={() => goTo(i)} aria-label={`Go to slide ${i + 1}`} aria-current={active === i ? 'true' : undefined} className={`liquid-dot relative z-[1] pb-1 text-[11px] ${active === i ? 'liquid-dot-active text-[#b8ddff]' : 'text-white/50'}`}>0{i + 1}</button>)}<button onClick={() => move(1)} className="luxury-control-next relative z-[1]">Next <span>→</span></button></div>
      </div></div>
    </section>
  );
}
