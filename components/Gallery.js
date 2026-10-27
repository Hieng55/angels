'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const reviewsUrl = 'https://maps.google.com/?q=Angel+Nail+Spa+1415+S+3rd+Ave+Unit+400+Yakima+WA+98902';

const reviews = [
  {
    name: 'Jessica M.',
    service: 'Spa Pedicure',
    text: 'Such a relaxing experience from start to finish. The space felt beautiful and calm, and my pedicure looked flawless. I will definitely be coming back.',
    initials: 'JM',
  },
  {
    name: 'Samantha R.',
    service: 'Full Set & Nail Art',
    text: 'They listened to exactly what I wanted and made the design even prettier than my inspiration photo. Every detail was clean, delicate, and perfectly shaped.',
    initials: 'SR',
  },
  {
    name: 'Ashley T.',
    service: 'Manicure',
    text: 'Everyone was welcoming and professional. My nails still look fresh weeks later, and I received so many compliments. This is my new favorite nail salon.',
    initials: 'AT',
  },
  {
    name: 'Maria L.',
    service: 'Brow & Lip',
    text: 'I felt completely comfortable and cared for throughout my appointment. The result is soft, natural, and exactly what I hoped for. Absolutely beautiful work.',
    initials: 'ML',
  },
  {
    name: 'Emily C.',
    service: 'Deluxe Pedicure',
    text: 'The salon is peaceful, spotless, and so welcoming. My technician took her time and made the whole appointment feel like a true spa escape.',
    initials: 'EC',
  },
  {
    name: 'Nicole P.',
    service: 'Gel Manicure',
    text: 'Beautiful color selection and incredible attention to detail. My manicure came out smooth, elegant, and exactly the shape I asked for.',
    initials: 'NP',
  },
];

function GoogleMark() {
  return (
    <span aria-label="Google" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#14384b]/10 bg-white shadow-[0_8px_24px_rgba(11,42,58,.08)]">
      <span className="text-[23px] font-bold leading-none" style={{ background: 'conic-gradient(from -45deg, #4285f4 0 25%, #34a853 0 42%, #fbbc05 0 67%, #ea4335 0 82%, #4285f4 0)', WebkitBackgroundClip: 'text', color: 'transparent' }}>G</span>
    </span>
  );
}

export default function Gallery() {
  const root = useRef(null);
  const cards = useRef(null);
  const swipe = useRef(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const changeSlide = useCallback((index) => {
    const next = (index + reviews.length) % reviews.length;
    if (next === active) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setActive(next);
      return;
    }
    gsap.to(cards.current, {
      x: index > active ? -18 : 18,
      opacity: 0,
      duration: .25,
      ease: 'power2.in',
      onComplete: () => {
        setActive(next);
        gsap.fromTo(cards.current, { x: index > active ? 18 : -18, opacity: 0 }, { x: 0, opacity: 1, duration: .55, ease: 'power3.out' });
      },
    });
  }, [active]);

  useEffect(() => {
    if (paused) return undefined;
    const timer = window.setInterval(() => changeSlide(active + 1), 5200);
    return () => window.clearInterval(timer);
  }, [active, paused, changeSlide]);

  const visibleReviews = [0, 1, 2].map((offset) => reviews[(active + offset) % reviews.length]);

  return (
    <section id="reviews" ref={root} className="relative overflow-hidden bg-white py-20 text-[#14384b] sm:py-24 lg:py-32">
      <div className="pointer-events-none absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#2f6f91]/20 to-transparent" />
      <div className="pointer-events-none absolute -right-48 top-10 h-[420px] w-[420px] rounded-full bg-[#78b5d5]/[.07] blur-3xl" />
      <div className="pointer-events-none absolute -left-36 bottom-0 h-[360px] w-[360px] rounded-full bg-[#7eb6e8]/10 blur-3xl" />

      <div className="relative mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[760px] text-center">
          <div data-review className="mb-6 flex items-center justify-center gap-5 text-[11px] font-semibold uppercase tracking-[.3em] text-[#2f6f91]">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#2f6f91]" />
            Customer reviews
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#2f6f91]" />
          </div>
          <h2 data-review className="font-forum text-[46px] leading-[.98] sm:text-[58px] lg:text-[70px]">
            Kind words from
            <span className="ml-2 italic text-[#2f6f91]">our guests.</span>
          </h2>
          <p data-review className="mx-auto mt-6 max-w-[560px] text-[14px] leading-7 text-[#14384b]/58">
            A little love from the people who make our salon special.
          </p>
        </div>

        <div data-review className="mx-auto mt-12 max-w-[1180px] sm:mt-16" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
          <div
            ref={cards}
            className="grid touch-pan-y select-none gap-5 md:grid-cols-3"
            aria-live="polite"
            onTouchStart={(event) => {
              const touch = event.touches[0];
              swipe.current = { x: touch.clientX, y: touch.clientY };
              setPaused(true);
            }}
            onTouchEnd={(event) => {
              if (!swipe.current) return;
              const touch = event.changedTouches[0];
              const dx = touch.clientX - swipe.current.x;
              const dy = touch.clientY - swipe.current.y;
              swipe.current = null;
              setPaused(false);
              if (Math.abs(dx) >= 45 && Math.abs(dx) > Math.abs(dy) * 1.15) {
                changeSlide(active + (dx < 0 ? 1 : -1));
              }
            }}
            onTouchCancel={() => { swipe.current = null; setPaused(false); }}
          >
            {visibleReviews.map((review, index) => (
              <article key={`${review.name}-${active}`} className={`relative min-h-[350px] flex-col rounded-[26px] border bg-[#fbfaf8] p-7 shadow-[0_22px_55px_rgba(11,42,58,.08)] sm:p-8 ${index === 0 ? 'flex' : 'hidden md:flex'} ${index === 1 ? 'border-[#7eb6e8]/55 md:-translate-y-4' : 'border-[#2f6f91]/12'}`}>
                <span className="absolute right-6 top-1 font-forum text-[78px] leading-none text-[#7eb6e8]/25">&ldquo;</span>
                <div className="relative flex gap-1 text-[#7eb6e8]" aria-label="5 out of 5 stars">
                  {[0, 1, 2, 3, 4].map((star) => <span key={star} aria-hidden="true" className="text-[15px]">&#9733;</span>)}
                </div>
                <blockquote className="relative mt-7 flex-1 font-forum text-[24px] leading-[1.42] text-[#14384b]">
                  {review.text}
                </blockquote>
                <div className="relative mt-8 flex items-center gap-4 border-t border-[#14384b]/8 pt-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0a2857] text-[10px] font-semibold tracking-[.12em] text-white">{review.initials}</span>
                  <div>
                    <p className="text-[12px] font-semibold uppercase tracking-[.14em] text-[#14384b]">{review.name}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-[.15em] text-[#2f6f91]">{review.service}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => changeSlide(active - 1)} aria-label="Previous reviews" className="flex h-11 w-11 items-center justify-center rounded-full border border-[#14384b]/12 bg-white text-[#14384b] shadow-sm transition hover:border-[#2f6f91]/45 hover:text-[#2f6f91]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5"><path d="m15 18-6-6 6-6" /></svg>
              </button>
              <button type="button" onClick={() => changeSlide(active + 1)} aria-label="Next reviews" className="flex h-11 w-11 items-center justify-center rounded-full border border-[#14384b]/12 bg-white text-[#14384b] shadow-sm transition hover:border-[#2f6f91]/45 hover:text-[#2f6f91]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5"><path d="m9 18 6-6-6-6" /></svg>
              </button>
            </div>
            <div className="flex items-center gap-2" aria-label="Choose review">
              {reviews.map((item, index) => (
                <button key={item.name} type="button" onClick={() => changeSlide(index)} aria-label={`Show review ${index + 1}`} aria-current={active === index ? 'true' : undefined} className={`h-1.5 rounded-full transition-all duration-300 ${active === index ? 'w-9 bg-[#2f6f91]' : 'w-1.5 bg-[#14384b]/20 hover:bg-[#14384b]/40'}`} />
              ))}
            </div>
            <a href={reviewsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[.18em] text-[#14384b] transition hover:text-[#2f6f91]">
              <GoogleMark />
              View all reviews
              <span aria-hidden="true">↗</span>
            </a>
          </div>
          <p className="mt-5 text-center text-[10px] uppercase tracking-[.18em] text-[#14384b]/35 sm:text-left">Sample customer stories</p>
        </div>
      </div>
    </section>
  );
}
