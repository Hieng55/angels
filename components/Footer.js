import { bookingUrl, mapsUrl } from '@/lib/site';

export default function Footer() {
  const pages = [['Home', '/'], ['About us', '/about'], ['Services', '/services'], ['Gallery', '/gallery'], ['Reviews', '/reviews'], ['Contact', '/contact']];

  return (
    <footer className="relative overflow-hidden border-t border-[#153b70]/10 bg-[#f7f4ef] pb-[calc(92px+env(safe-area-inset-bottom))] text-[#153b70] xl:pb-0">
      <div className="pointer-events-none absolute -left-40 top-0 h-80 w-80 rounded-full bg-[#7eb6e8]/15 blur-[120px]" />
      <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="relative grid gap-12 border-b border-[#153b70]/12 pb-14 sm:grid-cols-2 lg:grid-cols-[1.35fr_.7fr_.9fr_1.05fr]">
          <div className="max-w-[340px]">
            <a href="/" className="relative block h-[76px] w-[250px]">
              <img src="/angel-nail-logo.png" alt="Angel's Nail Spa & Permanent Makeup" width="742" height="183" loading="lazy" className="absolute left-1/2 top-1/2 w-[260px] max-w-none -translate-x-1/2 -translate-y-1/2" />
            </a>
            <p className="mt-5 text-[15px] leading-8 text-[#153b70]/65">Thoughtful nail care, spa pedicures, custom artistry, and permanent makeup in Yakima, Washington.</p>
            <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex text-[11px] font-semibold uppercase tracking-[.2em] text-[#2868ad] transition hover:text-[#0a2857]">Reserve an appointment ↗</a>
          </div>

          <div>
            <h2 className="text-[11px] font-semibold uppercase tracking-[.25em] text-[#2868ad]">Explore</h2>
            <nav aria-label="Footer navigation" className="mt-6 grid gap-3">
              {pages.map(([label, href]) => <a key={label} href={href} className="w-fit font-forum text-[21px] text-[#153b70]/78 transition hover:text-[#2868ad]">{label}</a>)}
            </nav>
          </div>

          <div>
            <h2 className="text-[11px] font-semibold uppercase tracking-[.25em] text-[#2868ad]">Visit</h2>
            <address className="not-italic"><a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-6 block font-forum text-[20px] leading-8 text-[#153b70]/78">1415 S 3rd Ave<br />Unit 400<br />Yakima, WA 98902</a></address>
            <a href="tel:+15093172391" className="mt-5 inline-block font-forum text-[23px] text-[#2868ad]">(509) 317-2391</a>
          </div>

          <div>
            <h2 className="text-[11px] font-semibold uppercase tracking-[.25em] text-[#2868ad]">Stay connected</h2>
            <div className="mt-6 flex flex-col items-start gap-3">
              <a href="https://www.instagram.com/angelnailspaandpermanentmakeup/" target="_blank" rel="noopener noreferrer" className="font-forum text-[20px] text-[#153b70]/78 transition hover:text-[#2868ad]">Instagram</a>
              <a href="https://www.facebook.com/angelsnailandpermanentmakeup/" target="_blank" rel="noopener noreferrer" className="font-forum text-[20px] text-[#153b70]/78 transition hover:text-[#2868ad]">Facebook</a>
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="font-forum text-[20px] text-[#153b70]/78 transition hover:text-[#2868ad]">Google Maps</a>
            </div>
            <div className="mt-7 border-t border-[#153b70]/12 pt-6 text-[13px] leading-7 text-[#153b70]/58"><p>Monday: Closed</p><p>Tue – Sun: 10 AM – 7 PM</p></div>
          </div>
        </div>

        <div className="relative flex flex-col items-center justify-between gap-5 pt-7 text-center sm:flex-row">
          <div className="space-y-2 text-[10px] uppercase tracking-[.18em] text-[#153b70]/45 sm:text-left">
            <p>&copy; {new Date().getFullYear()} Angel Nail Spa &amp; Permanent Makeup.</p>
            <p>Designed &amp; developed by TD Transactions LLC.</p>
          </div>
          <a href="#top" aria-label="Back to top" className="text-[10px] font-semibold uppercase tracking-[.2em] text-[#2868ad] transition hover:text-[#0a2857]">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
