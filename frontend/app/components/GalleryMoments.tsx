"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { galleryMomentsData, GalleryItemData } from "../data/homepage";
import FadeIn from "./FadeIn";

export default function GalleryMoments() {
  const [activeItem, setActiveItem] = useState<GalleryItemData | null>(null);

  useEffect(() => {
    if (!activeItem) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveItem(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeItem]);

  if (!galleryMomentsData || galleryMomentsData.length === 0) return null;

  return (
    <section className="py-28 px-6 relative z-20 bg-gray-50/50 border-b border-gray-100">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="px-4 py-1.5 rounded-full bg-brandBlue/10 border border-brandBlue/20 text-brandBlue text-xs font-black uppercase tracking-widest">
              Moments
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mt-4">
              Club{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandBlue to-brandPurple">
                Gallery & Moments
              </span>
            </h2>
            <p className="mt-4 text-lg text-gray-500 font-medium max-w-xl mx-auto">
              Visual records of our workshops, launch ceremonies, and student sessions. Structured as placeholder slots.
            </p>
          </div>
        </FadeIn>

        {/* Visually Interesting Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {galleryMomentsData.map((item, index) => {
            const isFeatured = index === 0;

            return (
              <FadeIn
                key={item.id}
                delay={index * 100}
                className={`${isFeatured ? "md:col-span-2 md:row-span-2" : "col-span-1"}`}
              >
                <button
                  type="button"
                  onClick={() => setActiveItem(item)}
                  aria-label={`View full details for ${item.title}`}
                  className={`group relative w-full overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blue-950 to-purple-950 border border-gray-200 text-left transition-all duration-500 hover:scale-[1.01] hover:border-brandPurple/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-brandPurple ${
                    isFeatured ? "h-[320px] md:h-[500px]" : "h-[240px]"
                  }`}
                >
                  {item.image ? (
                    // Reuses actual public image asset
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes={isFeatured ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                      className="object-cover transition-transform duration-700 group-hover:scale-105 group-hover:rotate-1"
                    />
                  ) : (
                    // Polished, clean geometric template placeholder instead of stock photography
                    <div className="absolute inset-0 flex flex-col justify-center items-center p-6 bg-gradient-to-br from-blue-900/40 to-purple-900/40 group-hover:from-blue-900/50 group-hover:to-purple-900/50 transition-colors">
                      <div className="w-12 h-12 rounded-2xl bg-white/10 text-white/70 border border-white/15 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-1">AUSTCAIC Gallery Placeholder</span>
                      <span className="text-white/80 font-bold text-sm text-center px-4 leading-snug truncate max-w-full">
                        {item.title}
                      </span>
                    </div>
                  )}

                  {/* Dark text overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent opacity-80 z-10"></div>

                  {/* Details Overlay */}
                  <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 z-20 flex flex-col justify-end">
                    <span className="text-[9px] font-black text-brandBlue bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-lg w-max uppercase tracking-wider mb-2 select-none">
                      {item.date}
                    </span>
                    <h3 className="text-white font-extrabold text-base sm:text-lg leading-tight line-clamp-2">
                      {item.title}
                    </h3>
                  </div>
                </button>
              </FadeIn>
            );
          })}
        </div>
      </div>

      {/* Lightbox / Modal Modal Presentation */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setActiveItem(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image preview"
        >
          <div
            className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-150 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 z-50 p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brandPurple"
              aria-label="Close modal dialog"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Content Container */}
            <div className="relative w-full h-[280px] sm:h-[450px] bg-gradient-to-br from-blue-950 to-purple-950 flex items-center justify-center">
              {activeItem.image ? (
                <Image
                  src={activeItem.image}
                  alt={activeItem.title}
                  fill
                  className="object-contain"
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center text-white/80">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center mb-4 text-white/60">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-xs font-black uppercase tracking-widest text-white/40 mb-1">AUSTCAIC Demo Gallery Slot</p>
                  <h4 className="text-lg font-bold max-w-lg px-6 leading-tight">{activeItem.title}</h4>
                </div>
              )}
            </div>

            {/* Details Footer */}
            <div className="p-8 border-t border-gray-100 bg-white">
              <span className="text-[10px] font-black text-brandPurple uppercase tracking-widest block mb-1">
                {activeItem.date}
              </span>
              <h2 className="text-2xl font-black text-gray-950 tracking-tight leading-snug">
                {activeItem.title}
              </h2>
              <p className="text-sm font-medium text-gray-500 mt-2">
                This is a placeholder gallery item for student review. Real event and workshop session imagery will be uploaded here.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
