'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const bookingUrl = 'https://www.lldtek.org/salon/appt/VjBGZk1USTBNamc9';

const services = [
  { id: 'pedicure', label: 'Pedicure', eyebrow: 'Signature foot care', image: '/services/pedicure.jpg', position: 'center 62%', description: 'A restorative ritual for refreshed feet, meticulous grooming, and a beautifully polished finish.' },
  { id: 'manicure', label: 'Mani & Pedi', eyebrow: 'Essential nail care', image: '/services/manicure.jpg', position: 'center 52%', description: 'Classic color, detailed care, and thoughtfully paired manicure and pedicure experiences.' },
  { id: 'enhancements', label: 'Nail Enhancements', eyebrow: 'Length, strength & style', image: '/services/nail-enhancements.jpg', position: 'center 46%', description: 'Long-lasting structure and refined color with full sets, fills, ombre, and color powder.' },
  { id: 'waxing', label: 'Waxing', eyebrow: 'Smooth finishing', image: '/services/waxing.jpg', position: 'center 48%', description: 'Careful face and body waxing services created for a clean, smooth, and polished result.' },
  { id: 'facial', label: 'Facial', eyebrow: 'Skin renewal', image: '/services/facial.jpg', position: 'center 48%', description: 'A focused one-hour beauty ritual designed to cleanse, refresh, and revive the look of skin.' },
  { id: 'beauty', label: 'Lash · Brow · Lip', eyebrow: 'Lasting definition', image: '/services/lash-brow-lip.jpg', position: 'center 38%', description: 'Expressive lash, brow, eyeliner, and lip services tailored to frame your natural features.' },
  { id: 'lipstyles', label: 'Lip Styles', eyebrow: 'Permanent makeup', image: '/services/lip-styles.jpg', position: 'center 46%', description: 'Five distinctive finishes to personalize the color, shape, softness, and definition of your lips.' },
];

const pedicures = [
  { name: 'Classic Pedicure', regular: '$40', gel: '$50', details: ['10 minutes massage', 'Callus removal', 'Sugar scrub'] },
  { name: 'Spa Pedicure', regular: '$50', gel: '$60', details: ['10 minutes massage', 'Callus removal', 'Sugar scrub', 'Hot towel'] },
  { name: 'Deluxe Pedicure', regular: '$60', gel: '$70', details: ['10 minutes massage', 'Callus removal', 'Sugar scrub', 'Hot towel', 'Hot stones', 'Smoothing mask'] },
  { name: 'Angel’s Spa Pedicure', regular: '$80', gel: '$100', details: ['10 minutes massage', 'Callus removal', 'Orange or cucumber package', 'Sugar scrub', 'Smoothing mask', 'Hot towel', 'Hot stones', 'Paraffin wax'] },
];

const menus = {
  manicure: { title: 'Manicure & Pedicure', rows: [['Classic Manicure Color', '$25', 'Gel +$10'], ['Classic Pedicure Color', '$35', 'Gel +$10'], ['Deluxe Pedicure', '$50–$60', 'Gel +$10'], ['Angel’s Spa Mani / Pedicure', '$90', ''], ['Kid Spa Mani / Pedicure', '$40', 'Gel +$10']] },
  enhancements: { title: 'Nail Enhancements', rows: [['Full Set Color', '$40–$50', 'Gel +$10'], ['Fill Color', '$25–$30', 'Gel +$10'], ['Full Set Ombre or Color Powder', '$60–$70', ''], ['Fill Ombre or Color Powder', '$35–$40', '']] },
  waxing: { title: 'Waxing', rows: [['Eyebrows Wax', '$15–$20', ''], ['Lips Wax', '$15–$20', ''], ['Chins Wax', '$20–$30', ''], ['Sideburns Wax', '$25–$30', ''], ['Under Arms Wax', '$25–$30', ''], ['Back Wax', '$65–$70', ''], ['Chest Wax', '$65–$70', ''], ['Full Arms Wax', '$50–$60', ''], ['Half Arms Wax', '$40–$50', ''], ['Full Legs Wax', '$65–$70+', ''], ['Half Legs Wax', '$55–$60+', ''], ['Full Face Wax', '$60+', '']] },
  facial: { title: 'Facial', rows: [['Facial · 1 Hour', '$70', '']] },
  beauty: { title: 'Lash · Brow · Lip', rows: [['Eyelash', '$120', ''], ['Eyelash Fill', '$60', ''], ['Eyebrows Tint', '$35–$40', ''], ['Eyebrows Tattoo', '$300', ''], ['Eyeliner Tattoo · Upper', '$250', ''], ['Eyeliner Tattoo · Lower', '$200', ''], ['Lip Tattoos', '$400–$500', '']] },
};

const lipStyles = [
  ['Full Lip Color', 'Bold full coverage', 'Even, saturated color throughout the entire lip for a bold, lipstick-like finish.'],
  ['Shaded Lip Liner', 'Defined border · Soft blend', 'A softly defined lip border blended inward for extra shape and structure.'],
  ['Ombre Lips', 'Outer darker · Blend inward', 'A gradient effect with deeper color along the edges that softly blends toward the center.'],
  ['Lip Blush', 'Soft natural tint', 'A sheer wash of color that enhances the natural lip tone with a subtle, fresh look.'],
  ['Aquarelle Lips', 'Color center · Diffused outward', 'A soft watercolor-style effect with more color in the center that diffuses outward.'],
];

function PriceTable({ menu }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {menu.rows.map(([name, price, note], index) => (
        <a key={name} href={bookingUrl} target="_blank" rel="noopener noreferrer" className="group relative flex flex-col overflow-hidden rounded-[30px] border border-[#14384b]/10 bg-[linear-gradient(145deg,#ffffff_0%,#fbfaf8_100%)] p-5 shadow-[0_12px_34px_rgba(14,33,63,.06)] transition duration-300 hover:-translate-y-1 hover:border-[#2868ad]/30 hover:shadow-[0_22px_48px_rgba(14,33,63,.12)] sm:p-7">
          <span className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#e8eef6]/70 blur-2xl" />
          <div className="relative flex items-center justify-between"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eef3f8] text-[10px] font-bold text-[#2868ad]">{String(index + 1).padStart(2, '0')}</span><span className="text-[9px] font-semibold uppercase tracking-[.18em] text-[#14384b]/40">Service option</span></div>
          <h4 className="relative mt-5 font-forum text-[24px] leading-tight text-[#0e213f] sm:text-[28px]">{name}</h4>
          <div className={`relative mt-5 grid overflow-hidden rounded-[18px] border border-[#14384b]/8 bg-[#f4f7fa] ${note ? 'grid-cols-2' : 'grid-cols-1'}`}>
            <span className="p-4"><small className="block text-[9px] font-semibold uppercase tracking-[.1em] text-[#14384b]/45">Price</small><strong className="mt-1.5 block text-[20px] text-[#c4473f]">{price}</strong></span>
            {note && <span className="border-l border-[#14384b]/8 p-4"><small className="block text-[9px] font-semibold uppercase tracking-[.1em] text-[#14384b]/45">Option</small><strong className="mt-1.5 block text-[14px] text-[#2868ad]">{note}</strong></span>}
          </div>
          <span className="relative mt-6 inline-flex w-full items-center justify-between rounded-full bg-[#0e213f] py-3 pl-5 pr-3 text-[10px] font-semibold uppercase tracking-[.16em] text-white transition group-hover:bg-[#2868ad]">Book service <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/12 text-[13px]">↗</span></span>
        </a>
      ))}
    </div>
  );
}

export default function ServiceMenu() {
  const root = useRef(null);
  const [active, setActive] = useState('pedicure');
  const service = services.find((item) => item.id === active) || services[0];

  useEffect(() => {
    const selectFromHash = () => {
      const requested = window.location.hash.replace('#', '');
      if (services.some(({ id }) => id === requested)) setActive(requested);
    };
    selectFromHash();
    window.addEventListener('hashchange', selectFromHash);
    return () => window.removeEventListener('hashchange', selectFromHash);
  }, []);

  useEffect(() => {
    if (!root.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    gsap.from(root.current.querySelectorAll('[data-service-reveal]'), { y: 24, opacity: 0, duration: .75, stagger: .09, ease: 'power3.out' });
    return undefined;
  }, []);

  const selectService = (id) => {
    setActive(id);
    window.history.replaceState(null, '', `#${id}`);
  };

  return (
    <section id="services" ref={root} className="relative overflow-hidden bg-[#f3eee6] pb-24 text-[#14384b] sm:pb-28 lg:pb-36">
      <div className="hidden">
        <div className="mx-auto grid min-h-[560px] max-w-[1400px] items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[.92fr_1.08fr] lg:px-10 lg:py-20">
          <div data-service-reveal className="relative z-10 max-w-[620px]">
            <div className="mb-7 flex items-center gap-5 text-[10px] font-semibold uppercase tracking-[.32em] text-[#7eb6e8]"><span className="h-px w-14 bg-gradient-to-r from-[#7eb6e8] to-transparent" />Angel Nail Spa · Yakima</div>
            <h1 className="font-forum text-[54px] leading-[.94] sm:text-[70px] lg:text-[86px]">Our service <span className="block italic text-[#78b5d5]">collection.</span></h1>
            <p className="mt-7 max-w-[520px] text-[15px] leading-8 text-[#f7f4ef]/62">Explore thoughtful nail care, restorative spa rituals, and lasting beauty services—each presented with clear pricing and treatment details.</p>
            <div className="mt-9 flex items-center gap-5"><a href="#service-collection" className="inline-flex min-h-13 items-center rounded-full bg-[#f2e9d9] px-7 text-[10px] font-semibold uppercase tracking-[.18em] text-[#061a3a]">Explore services</a><span className="text-[10px] uppercase tracking-[.2em] text-[#f7f4ef]/40">7 collections</span></div>
          </div>
          <div data-service-reveal className="relative mx-auto h-[430px] w-full max-w-[590px] lg:mr-0">
            <div className="absolute inset-y-0 right-0 w-[78%] overflow-hidden rounded-t-[210px] rounded-b-[28px] border border-[#7eb6e8]/40 p-2">
              <div className="h-full overflow-hidden rounded-t-[202px] rounded-b-[22px]"><img src="/services/nail-enhancements.jpg" alt="Detailed floral nail art" className="h-full w-full object-cover object-center" /></div>
            </div>
            <div className="absolute bottom-5 left-0 h-[190px] w-[165px] overflow-hidden rounded-[24px] border-[7px] border-[#061a3a] bg-white shadow-2xl sm:h-[220px] sm:w-[190px]"><img src="/services/pedicure.jpg" alt="Polished spa pedicure" className="h-full w-full object-cover object-[center_60%]" /></div>
            <div className="absolute left-[25%] top-7 flex h-24 w-24 items-center justify-center rounded-full border border-[#7eb6e8]/45 bg-[#061a3a]/88 text-center text-[9px] uppercase leading-4 tracking-[.2em] text-[#7eb6e8] backdrop-blur">Beauty<br />rituals</div>
          </div>
        </div>
      </div>

      <div id="service-collection" className="relative mx-auto max-w-[1280px] px-5 pt-12 sm:px-8 sm:pt-14 lg:px-10 lg:pt-16">
        <div className="app-scrollbar -mx-5 flex gap-2 overflow-x-auto border-y border-[#14384b]/10 bg-white/90 px-5 py-3 shadow-[0_12px_38px_rgba(11,42,58,.08)] sm:-mx-8 sm:px-8 lg:mx-0 lg:flex-wrap lg:justify-center lg:rounded-[28px] lg:border lg:px-3">
          {services.map((item, index) => (
            <button key={item.id} type="button" onClick={() => selectService(item.id)} aria-pressed={active === item.id} className={`group shrink-0 rounded-full border px-5 py-3.5 text-[10px] font-bold uppercase tracking-[.13em] transition ${active === item.id ? 'border-[#0a2857] bg-[#0a2857] text-white shadow-[0_12px_28px_rgba(10,40,87,.24)]' : 'border-[#153b70]/20 bg-[#f7f4ef] text-[#153b70] hover:border-[#2868ad]/60 hover:bg-white hover:text-[#2868ad]'}`}><span className={`mr-2 ${active === item.id ? 'text-[#7eb6e8]' : 'text-[#2868ad]'}`}>0{index + 1}</span>{item.label}</button>
          ))}
        </div>

        <article key={active} className="service-panel-enter mt-7 overflow-hidden rounded-[32px] border border-[#14384b]/10 bg-[#fbfaf8] shadow-[0_30px_90px_rgba(11,42,58,.1)] sm:rounded-[42px]">
          <div className="grid lg:grid-cols-[.9fr_1.1fr]">
            <figure className="relative min-h-[310px] overflow-hidden sm:min-h-[380px] lg:min-h-[540px]">
              <img src={service.image} alt={`${service.label} service illustration`} style={{ objectPosition: service.position }} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061a3a]/82 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-9">
                <span className="text-[10px] font-semibold uppercase tracking-[.24em] text-white/75">Angel Nail Spa · Service 0{services.findIndex(({ id }) => id === active) + 1}</span>
                <div className="mt-3 lg:hidden"><span className="text-[10px] font-semibold uppercase tracking-[.22em] text-[#b8d4ec]">{service.eyebrow}</span><h2 className="mt-2 font-forum text-[42px] leading-none">{service.label}</h2></div>
              </div>
            </figure>
            <div className="hidden flex-col justify-center lg:flex lg:p-14">
              <span className="text-[10px] font-semibold uppercase tracking-[.26em] text-[#2f6f91]">{service.eyebrow}</span>
              <h2 className="mt-4 font-forum text-[46px] leading-[.98] sm:text-[58px]">{service.label}</h2>
              <div className="my-7 h-px bg-gradient-to-r from-[#7eb6e8] via-[#7eb6e8]/35 to-transparent" />
              <p className="max-w-[520px] text-[15px] leading-8 text-[#14384b]/64">{service.description}</p>
            </div>
          </div>

          <div className="border-t border-[#14384b]/8 bg-[#f6f2ec] p-5 sm:p-8 lg:p-12">
            <div className="mb-5 flex flex-col gap-3 sm:mb-7 sm:flex-row sm:items-end sm:justify-between">
              <div><span className="text-[9px] font-semibold uppercase tracking-[.24em] text-[#2f6f91]">Menu & pricing</span><h3 className="mt-2 font-forum text-[31px] leading-[1.05] sm:text-[42px]">Choose your experience</h3></div>
              <p className="max-w-[420px] text-[12px] leading-6 text-[#14384b]/52">Final pricing may vary by length, design, or additional service requests.</p>
            </div>

            {active === 'pedicure' && (
              <div className="grid gap-4 lg:grid-cols-2">
                {pedicures.map((item, index) => (
                  <a key={item.name} href={bookingUrl} target="_blank" rel="noopener noreferrer" className="group relative flex flex-col overflow-hidden rounded-[30px] border border-[#14384b]/10 bg-[linear-gradient(145deg,#ffffff_0%,#fbfaf8_100%)] p-5 shadow-[0_12px_34px_rgba(14,33,63,.06)] transition duration-300 hover:-translate-y-1 hover:border-[#2868ad]/30 hover:shadow-[0_22px_48px_rgba(14,33,63,.12)] sm:p-7">
                    <span className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#e8eef6]/70 blur-2xl" />
                    <div className="relative flex items-center justify-between">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eef3f8] text-[10px] font-bold text-[#2868ad]">0{index + 1}</span>
                      <span className="text-[9px] font-semibold uppercase tracking-[.18em] text-[#14384b]/40">Pedicure ritual</span>
                    </div>
                    <h4 className="relative mt-5 whitespace-nowrap font-forum text-[24px] leading-none text-[#0e213f] sm:text-[30px]">{item.name}</h4>
                    <div className="relative mt-5 grid grid-cols-2 overflow-hidden rounded-[18px] border border-[#14384b]/8 bg-[#f4f7fa]">
                      <span className="p-4"><small className="block whitespace-nowrap text-[9px] font-semibold uppercase tracking-[.1em] text-[#14384b]/45">Regular</small><strong className="mt-1.5 block text-[20px] text-[#c4473f]">{item.regular}</strong></span>
                      <span className="border-l border-[#14384b]/8 p-4"><small className="block whitespace-nowrap text-[9px] font-semibold uppercase tracking-[.1em] text-[#14384b]/45">With gel</small><strong className="mt-1.5 block text-[20px] text-[#c4473f]">{item.gel}</strong></span>
                    </div>
                    <ul className="relative mt-5 grid flex-1 gap-2.5 text-[13px] leading-5 text-[#14384b]/68 sm:grid-cols-2">{item.details.map((detail) => <li key={detail} className="flex items-start gap-2.5"><span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#e8eef6] text-[9px] text-[#2868ad]">✓</span>{detail}</li>)}</ul>
                    <span className="relative mt-6 inline-flex w-full items-center justify-between rounded-full bg-[#0e213f] py-3 pl-5 pr-3 text-[10px] font-semibold uppercase tracking-[.16em] text-white transition group-hover:bg-[#2868ad]">Book service <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/12 text-[13px]">↗</span></span>
                  </a>
                ))}
              </div>
            )}

            {active !== 'pedicure' && active !== 'lipstyles' && <PriceTable menu={menus[active]} />}

            {active === 'lipstyles' && (
              <div className="grid gap-4 md:grid-cols-2">
                {lipStyles.map(([name, accent, description], index) => (
                  <a key={name} href={bookingUrl} target="_blank" rel="noopener noreferrer" className={`group relative flex flex-col overflow-hidden rounded-[30px] border border-[#14384b]/10 bg-[linear-gradient(145deg,#ffffff_0%,#fbfaf8_100%)] p-5 shadow-[0_12px_34px_rgba(14,33,63,.06)] transition duration-300 hover:-translate-y-1 hover:border-[#2868ad]/30 hover:shadow-[0_22px_48px_rgba(14,33,63,.12)] sm:p-7 ${index === lipStyles.length - 1 ? 'md:col-span-2' : ''}`}>
                    <span className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#e8eef6]/70 blur-2xl" />
                    <div className="relative flex items-center justify-between"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eef3f8] text-[10px] font-bold text-[#2868ad]">0{index + 1}</span><span className="text-[9px] font-semibold uppercase tracking-[.18em] text-[#14384b]/40">Lip style</span></div>
                    <h4 className="relative mt-5 font-forum text-[26px] leading-none text-[#0e213f] sm:text-[30px]">{name}</h4>
                    <div className="relative mt-5 rounded-[18px] border border-[#14384b]/8 bg-[#f4f7fa] p-4"><p className="text-[11px] font-semibold uppercase tracking-[.1em] text-[#c4473f]">{accent}</p><p className="mt-3 text-[14px] leading-6 text-[#14384b]/65">{description}</p></div>
                    <span className="relative mt-6 inline-flex w-full items-center justify-between rounded-full bg-[#0e213f] py-3 pl-5 pr-3 text-[10px] font-semibold uppercase tracking-[.16em] text-white transition group-hover:bg-[#2868ad]">Book service <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/12 text-[13px]">↗</span></span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </article>

        <div className="mt-10 grid overflow-hidden rounded-[28px] border border-[#14384b]/10 bg-white sm:grid-cols-3">
          {[['Quality promise', 'Please tell us the same day if a service needs attention.'], ['Kindly note', 'Services are non-refundable and pricing may vary for additions.'], ['Before your visit', 'Please share allergies or medical conditions with your technician.']].map(([title, copy], index) => <div key={title} className={`p-6 sm:p-7 ${index ? 'border-t border-[#14384b]/8 sm:border-l sm:border-t-0' : ''}`}><span className="text-[9px] font-semibold uppercase tracking-[.22em] text-[#2f6f91]">0{index + 1}</span><h4 className="mt-3 font-forum text-[22px]">{title}</h4><p className="mt-2 text-[12px] leading-6 text-[#14384b]/55">{copy}</p></div>)}
        </div>
      </div>
    </section>
  );
}
