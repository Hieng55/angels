'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export default function GalleryLightbox({ images, className = '', itemClassName = '', initialEager = 1 }) {
  const [active, setActive] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const closeButton = useRef(null);
  const lastTrigger = useRef(null);
  const closeTimer = useRef(null);
  const openFrame = useRef(null);
  const swipeStart = useRef(null);
  const open = active !== null;

  const show = (index) => setActive((index + images.length) % images.length);
  const openImage = (index) => {
    window.clearTimeout(closeTimer.current);
    window.cancelAnimationFrame(openFrame.current);
    setActive(index);
    setVisible(false);
    openFrame.current = window.requestAnimationFrame(() => {
      openFrame.current = window.requestAnimationFrame(() => setVisible(true));
    });
  };
  const close = () => {
    setVisible(false);
    window.clearTimeout(closeTimer.current);
    const delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 320;
    closeTimer.current = window.setTimeout(() => setActive(null), delay);
  };

  useEffect(() => {
    setMounted(true);
    return () => {
      window.clearTimeout(closeTimer.current);
      window.cancelAnimationFrame(openFrame.current);
    };
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButton.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowLeft') show(active - 1);
      if (event.key === 'ArrowRight') show(active + 1);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, active, images.length]);

  useEffect(() => {
    if (!open) lastTrigger.current?.focus();
  }, [open]);

  return (
    <>
      <div className={className}>
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            aria-label={`Open image ${index + 1} of ${images.length}`}
            aria-haspopup="dialog"
            onClick={(event) => {
              lastTrigger.current = event.currentTarget;
              openImage(index);
            }}
            className={`group relative aspect-square cursor-zoom-in overflow-hidden text-left ${itemClassName}`}
          >
            <img src={image.src} alt={image.alt} loading={index < initialEager ? 'eager' : 'lazy'} className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.035]" />
          </button>
        ))}
      </div>

      {mounted && open && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Gallery image ${active + 1} of ${images.length}`}
          className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#020817]/90 p-4 backdrop-blur-xl transition-opacity duration-300 ease-out motion-reduce:transition-none sm:p-8 ${visible ? 'opacity-100' : 'opacity-0'}`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <button ref={closeButton} type="button" onClick={close} aria-label="Close gallery" className={`absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-white/10 text-2xl font-light text-white backdrop-blur-md transition-all delay-75 duration-300 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8bc5f5] motion-reduce:transition-none sm:right-7 sm:top-7 ${visible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>&times;</button>

          <div className={`flex max-h-[94dvh] max-w-[1100px] flex-col items-center gap-4 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transform-none motion-reduce:transition-none ${visible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-4 scale-[.975] opacity-0'}`}>
            <div
              className="flex max-h-[calc(100dvh-130px)] items-center justify-center overflow-hidden rounded-[10px] bg-black/20 shadow-[0_30px_100px_rgba(0,0,0,.55)]"
              style={{ touchAction: 'pan-y' }}
              onPointerDown={(event) => {
                swipeStart.current = event.clientX;
                event.currentTarget.setPointerCapture?.(event.pointerId);
              }}
              onPointerUp={(event) => {
                if (swipeStart.current === null) return;
                const distance = event.clientX - swipeStart.current;
                swipeStart.current = null;
                if (Math.abs(distance) < 45) return;
                show(active + (distance < 0 ? 1 : -1));
              }}
              onPointerCancel={() => { swipeStart.current = null; }}
            >
              <img src={images[active].src} alt={images[active].alt} draggable="false" className="max-h-[calc(100dvh-130px)] max-w-[92vw] select-none object-contain sm:max-w-[82vw]" />
            </div>

            <div className="flex items-center justify-center gap-3">
              <button type="button" onClick={() => show(active - 1)} aria-label="Previous image" className="flex h-11 min-w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 px-4 text-xl text-white backdrop-blur-md transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8bc5f5] motion-reduce:transition-none">&lsaquo;</button>
              <div className="rounded-full border border-white/15 bg-black/25 px-4 py-2.5 text-[10px] font-semibold tracking-[.2em] text-white/75 backdrop-blur-md">{String(active + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</div>
              <button type="button" onClick={() => show(active + 1)} aria-label="Next image" className="flex h-11 min-w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 px-4 text-xl text-white backdrop-blur-md transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8bc5f5] motion-reduce:transition-none">&rsaquo;</button>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
