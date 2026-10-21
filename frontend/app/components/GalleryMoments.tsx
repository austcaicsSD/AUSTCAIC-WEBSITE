"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { GalleryItemData } from "../data/homepage";
import { defaultGalleryMoments } from "../data/homepage";
import FadeIn from "./FadeIn";

export default function GalleryMoments({ items }: { items: GalleryItemData[] }) {
  // Merge database items with curated fallback moments so the carousel is always vibrant
  // Note: Achievements are relocated to "Our Members, Beyond Tech",
  // and event flyers/posters are excluded from this photo gallery section.
  const isExcludedMoment = (item: GalleryItemData) =>
    item.id === "eee7f566-5ef4-49dc-b9e5-fe3bc2bfda30" ||
    item.id === "gm-cse-carnival" ||
    item.id === "red-shell-cse-carnival" ||
    item.id === "gm-farewell-2025" ||
    item.id === "gm-bootcamp-2026" ||
    item.id === "gm-skillsprint-seminar" ||
    item.id === "gm-future-proof" ||
    item.title.toLowerCase().includes("red_shell") ||
    item.title.toLowerCase().includes("red shell") ||
    (item.description && (
      item.description.toLowerCase().includes("red_shell") ||
      item.description.toLowerCase().includes("red shell")
    )) ||
    (item.image && (
      item.image.includes("eee7f566-5ef4-49dc-b9e5-fe3bc2bfda30") ||
      item.image.includes("b50419a7-975e-4d12-9d00-27a9e505b730") ||
      item.image.includes("0be74251-de17-4f7c-8360-28be61c0591c") ||
      item.image.includes("49130a81-16fa-4403-9f21-855efc81859a") ||
      item.image.includes("0fa9dae1-5d21-4665-a59d-ae79826d0618")
    ));

  const galleryList: GalleryItemData[] = (() => {
    const list = [...(items || [])].filter((i) => !isExcludedMoment(i));
    const existingTitles = new Set(
      list.map((i) => i.title.toLowerCase().trim()).filter(Boolean)
    );
    const existingImages = new Set(list.map((i) => i.image).filter(Boolean));
    for (const def of defaultGalleryMoments) {
      const titleKey = def.title.toLowerCase().trim();
      const hasDuplicateTitle = titleKey ? existingTitles.has(titleKey) : false;
      const hasDuplicateImage = def.image ? existingImages.has(def.image) : false;
      if (!isExcludedMoment(def) && !hasDuplicateTitle && !hasDuplicateImage) {
        list.push(def);
        if (titleKey) existingTitles.add(titleKey);
        if (def.image) existingImages.add(def.image);
      }
    }
    return list;
  })();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [activeItem, setActiveItem] = useState<GalleryItemData | null>(null);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const total = galleryList.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-play timer
  useEffect(() => {
    if (!isPlaying || isHovered || total <= 1) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5500);
    return () => clearInterval(interval);
  }, [isPlaying, isHovered, total, nextSlide]);

  // Keyboard navigation for carousel & modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeItem) {
        if (e.key === "Escape") setActiveItem(null);
        return;
      }
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeItem, nextSlide, prevSlide]);

  // Lightbox scroll lock
  useEffect(() => {
    if (!activeItem) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [activeItem]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) nextSlide();
    if (diff < -50) prevSlide();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (total === 0) return null;

  const current = galleryList[currentIndex];

  return (
    <section className="py-28 px-6 relative z-20 bg-gray-50/50 border-b border-gray-100 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="px-4 py-1.5 rounded-full bg-brandBlue/10 border border-brandBlue/20 text-brandBlue text-xs font-black uppercase tracking-widest">
                Moments
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mt-4">
                Club{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandBlue to-brandPurple">
                  Gallery & Moments
                </span>
              </h2>
              <p className="mt-4 text-base sm:text-lg text-gray-500 font-medium max-w-xl">
                Visual records of our workshops, ceremonies, team achievements, and student sessions.
              </p>
            </div>

            {/* Slide Navigation Controls */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-gray-400 select-none mr-2">
                <span className="text-gray-900 font-black">{String(currentIndex + 1).padStart(2, "0")}</span>
                <span className="mx-1">/</span>
                <span>{String(total).padStart(2, "0")}</span>
              </span>

              {/* Play/Pause Button */}
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-600 hover:text-brandPurple hover:border-brandPurple/30 flex items-center justify-center transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brandPurple"
                aria-label={isPlaying ? "Pause auto-play" : "Resume auto-play"}
                title={isPlaying ? "Pause auto-play" : "Play"}
              >
                {isPlaying ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              {/* Prev Button */}
              <button
                type="button"
                onClick={prevSlide}
                className="w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-700 hover:text-white hover:bg-brandBlue hover:border-brandBlue flex items-center justify-center transition-all shadow-sm hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-brandPurple"
                aria-label="Previous slide"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={nextSlide}
                className="w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-700 hover:text-white hover:bg-brandPurple hover:border-brandPurple flex items-center justify-center transition-all shadow-sm hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-brandPurple"
                aria-label="Next slide"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </FadeIn>

        {/* ================= MAIN CAROUSEL STAGE ================= */}
        <FadeIn delay={100}>
          <div
            className="group/carousel relative w-full rounded-[2.5rem] bg-slate-950 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-200/80"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Auto-play progress bar */}
            {isPlaying && !isHovered && (
              <div
                key={`progress-${currentIndex}`}
                className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brandBlue via-brandPurple to-brandBlue z-30 animate-[caic-shimmer_5.5s_linear_infinite]"
              />
            )}

            {/* Slides Viewport */}
            <div className="relative w-full h-[360px] sm:h-[460px] md:h-[520px] lg:h-[560px] flex items-center justify-center overflow-hidden">
              {galleryList.map((item, idx) => {
                const isActive = idx === currentIndex;

                return (
                  <div
                    key={item.id}
                    className={`absolute inset-0 transition-all duration-700 ease-out flex items-center justify-center ${
                      isActive
                        ? "opacity-100 scale-100 z-10 pointer-events-auto"
                        : "opacity-0 scale-95 -z-10 pointer-events-none"
                    }`}
                  >
                    {/* Ambient blurred glow backdrop */}
                    {item.image && (
                      <div
                        className="absolute inset-0 bg-cover bg-center blur-3xl opacity-30 scale-110 pointer-events-none"
                        style={{ backgroundImage: `url(${item.image})` }}
                        aria-hidden="true"
                      />
                    )}

                    {/* Dark gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950/95 via-gray-950/35 to-transparent z-10 pointer-events-none" />

                    {/* Main Image (Centered, Never cut off) */}
                    {item.image ? (
                      <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-10 z-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.image}
                          alt={item.title}
                          className="max-h-full max-w-full w-auto h-auto object-contain drop-shadow-2xl rounded-2xl transition-transform duration-700 group-hover/carousel:scale-[1.01]"
                          loading={isActive ? "eager" : "lazy"}
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center p-8 text-center text-white/80 z-0">
                        <div className="w-20 h-20 rounded-3xl bg-white/10 border border-white/20 flex items-center justify-center mb-4 text-white">
                          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <span className="text-xs font-black uppercase tracking-widest text-brandPurple bg-white/90 px-3 py-1 rounded-full mb-2">
                          Club Showcase
                        </span>
                        <h4 className="text-2xl font-bold max-w-lg">{item.title}</h4>
                      </div>
                    )}

                    {/* Bottom Caption Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                      <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold uppercase tracking-wider mb-3">
                          <span className="w-2 h-2 rounded-full bg-brandPurple"></span>
                          {item.date}
                        </div>
                        {item.title && !item.title.startsWith("IMG_") && (
                          <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight leading-snug drop-shadow-md">
                            {item.title}
                          </h3>
                        )}
                        {item.description && (
                          <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed mt-2 line-clamp-2 max-w-xl font-medium">
                            {item.description}
                          </p>
                        )}
                      </div>

                      {/* Enlarge / Fullview Button */}
                      <button
                        type="button"
                        onClick={() => setActiveItem(item)}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white/90 hover:bg-white text-gray-900 text-xs font-bold backdrop-blur-md shadow-lg transition-all hover:scale-105 active:scale-95 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-brandPurple"
                      >
                        <svg className="w-4 h-4 text-brandPurple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        </svg>
                        Full Photo View
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Left Floating Chevron */}
            <button
              type="button"
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/75 text-white backdrop-blur-md border border-white/20 flex items-center justify-center opacity-80 sm:opacity-0 group-hover/carousel:opacity-100 transition-all hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-brandPurple"
              aria-label="Previous slide"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Right Floating Chevron */}
            <button
              type="button"
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/75 text-white backdrop-blur-md border border-white/20 flex items-center justify-center opacity-80 sm:opacity-0 group-hover/carousel:opacity-100 transition-all hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-brandPurple"
              aria-label="Next slide"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </FadeIn>

        {/* ================= THUMBNAIL STRIP & PAGINATION ================= */}
        <FadeIn delay={150}>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Interactive Thumbnail Previews */}
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2 max-w-full">
              {galleryList.map((item, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={`thumb-${item.id}`}
                    type="button"
                    onClick={() => goToSlide(idx)}
                    className={`relative w-20 h-14 sm:w-24 sm:h-16 rounded-2xl overflow-hidden border-2 transition-all duration-300 shrink-0 focus:outline-none ${
                      isActive
                        ? "border-brandPurple ring-4 ring-brandPurple/25 scale-105 shadow-md shadow-brandPurple/20 opacity-100"
                        : "border-gray-200/80 opacity-50 hover:opacity-100 hover:scale-102"
                    }`}
                    aria-label={`Go to slide ${idx + 1}${item.title && !item.title.startsWith("IMG_") ? `: ${item.title}` : ""}`}
                  >
                    {item.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.image}
                        alt=""
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-950 to-purple-950 flex items-center justify-center text-white/50 text-[10px] font-bold">
                        {idx + 1}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Dots Indicator */}
            <div className="flex items-center gap-2">
              {galleryList.map((_, idx) => (
                <button
                  key={`dot-${idx}`}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none ${
                    idx === currentIndex
                      ? "w-8 bg-gradient-to-r from-brandBlue to-brandPurple"
                      : "w-2.5 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </FadeIn>
      </div>

      {/* ================= LIGHTBOX / FULLSCREEN MODAL ================= */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-gray-950/85 backdrop-blur-md animate-fade-in overflow-y-auto"
          onClick={() => setActiveItem(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="gallery-modal-title"
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] my-auto bg-white rounded-3xl sm:rounded-[2rem] overflow-hidden shadow-2xl border border-gray-200 flex flex-col animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveItem(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-50 p-2 sm:p-2.5 bg-black/75 hover:bg-black text-white rounded-full shadow-xl backdrop-blur-md border border-white/20 transition-all hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-brandPurple"
              aria-label="Close modal dialog"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Scrollable Lightbox Container */}
            <div className="overflow-y-auto overscroll-contain flex flex-col flex-1">
              {/* Full Image Canvas: never cropped, completely visible */}
              {activeItem.image ? (
                <div className="relative w-full bg-slate-950 flex items-center justify-center p-4 sm:p-8 min-h-[260px] max-h-[56vh] shrink-0 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center blur-3xl opacity-30 scale-125 pointer-events-none"
                    style={{ backgroundImage: `url(${activeItem.image})` }}
                    aria-hidden="true"
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={activeItem.image}
                    alt={activeItem.title}
                    className="relative z-10 max-h-[50vh] max-w-full w-auto h-auto object-contain rounded-xl shadow-2xl"
                    loading="eager"
                  />
                </div>
              ) : (
                <div className="p-10 bg-gradient-to-br from-blue-950 to-purple-950 text-white flex flex-col items-center justify-center text-center">
                  <h4 className="text-xl font-bold">{activeItem.title}</h4>
                </div>
              )}

              {/* Photo Description & Metadata */}
              <div className="p-6 sm:p-8 bg-white flex-1 flex flex-col">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-brandPurple/10 border border-brandPurple/20 text-brandPurple text-xs font-bold uppercase tracking-wider mb-3 w-max">
                  {activeItem.date}
                </div>

                {activeItem.title && !activeItem.title.startsWith("IMG_") && (
                  <h2
                    id="gallery-modal-title"
                    className="text-xl sm:text-2xl md:text-3xl font-black text-gray-950 tracking-tight leading-snug mb-3"
                  >
                    {activeItem.title}
                  </h2>
                )}

                {activeItem.description && (
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-normal whitespace-pre-line mb-6">
                    {activeItem.description}
                  </p>
                )}

                <div className="mt-auto pt-5 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-400">
                    AUSTCAIC Gallery Archive
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveItem(null)}
                    className="px-5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

