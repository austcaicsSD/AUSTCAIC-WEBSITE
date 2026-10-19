"use client";

import { useState, useEffect } from "react";
import { memberAchievementsData, type MemberAchievementData } from "../data/homepage";
import FadeIn from "./FadeIn";

export default function BeyondTech() {
  const [activePhoto, setActivePhoto] = useState<MemberAchievementData | null>(null);

  // Lightbox scroll lock
  useEffect(() => {
    if (!activePhoto) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [activePhoto]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activePhoto) {
        setActivePhoto(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePhoto]);

  return (
    <section className="py-28 px-6 relative z-20 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="px-4 py-1.5 rounded-full bg-brandPurple/10 border border-brandPurple/20 text-brandPurple text-xs font-black uppercase tracking-widest">
              Club Culture
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mt-4">
              Our Members,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandBlue to-brandPurple">
                Beyond Tech
              </span>
            </h2>
            <p className="mt-4 text-lg text-gray-500 font-medium max-w-xl mx-auto">
              Highlighting the cultural highlights, achievements, and creative activities of our cybersecurity and artificial intelligence general members.
            </p>
          </div>
        </FadeIn>

        {/* Member Achievements Showcase */}
        <div className="max-w-4xl mx-auto">
          {memberAchievementsData.map((item, index) => (
            <FadeIn key={item.id} delay={index * 100}>
              <div className="group relative w-full rounded-[2rem] sm:rounded-[2.5rem] bg-slate-950 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-gray-200/80 transition-all duration-500 hover:shadow-[0_25px_60px_rgba(109,40,217,0.15)] hover:border-brandPurple/30">
                {/* Ambient blurred glow backdrop */}
                {item.image && (
                  <div
                    className="absolute inset-0 bg-cover bg-center blur-3xl opacity-25 scale-110 pointer-events-none"
                    style={{ backgroundImage: `url(${item.image})` }}
                    aria-hidden="true"
                  />
                )}

                {/* Dark gradient overlay for text readability on larger screens */}
                <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent z-10 pointer-events-none" />

                {/* Main Image Stage: Centered, original aspect ratio preserved, never stretched or awkwardly cropped */}
                <div className="relative w-full h-[260px] sm:h-[440px] md:h-[500px] lg:h-[540px] flex items-center justify-center p-4 sm:p-8 md:p-10 z-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="max-h-full max-w-full w-auto h-auto object-contain drop-shadow-2xl rounded-xl sm:rounded-2xl transition-transform duration-700 group-hover:scale-[1.015]"
                    loading="lazy"
                  />
                </div>

                {/* Metadata Caption: In-flow on mobile, absolute overlay on tablet/desktop */}
                <div className="relative z-20 sm:absolute sm:bottom-0 sm:left-0 sm:right-0 p-6 sm:p-8 md:p-10 bg-slate-950/95 sm:bg-transparent flex flex-col sm:flex-row sm:items-end justify-between gap-5">
                  <div className="max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-3">
                      <span className="w-2 h-2 rounded-full bg-brandPurple animate-pulse" />
                      {item.date}
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight leading-snug drop-shadow-md">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed mt-2.5 max-w-xl font-medium drop-shadow">
                      {item.description}
                    </p>
                  </div>

                  {/* Full Photo View Button */}
                  <button
                    type="button"
                    onClick={() => setActivePhoto(item)}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white/90 hover:bg-white text-gray-900 text-xs font-bold backdrop-blur-md shadow-lg transition-all hover:scale-105 active:scale-95 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-brandPurple"
                  >
                    <svg className="w-4 h-4 text-brandPurple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                    Full Photo View
                  </button>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Full Photo Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-gray-950/85 backdrop-blur-md animate-fade-in overflow-y-auto"
          onClick={() => setActivePhoto(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="beyond-tech-modal-title"
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] my-auto bg-white rounded-3xl sm:rounded-[2rem] overflow-hidden shadow-2xl border border-gray-200 flex flex-col animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActivePhoto(null)}
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
              <div className="relative w-full bg-slate-950 flex items-center justify-center p-4 sm:p-8 min-h-[260px] max-h-[56vh] shrink-0 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center blur-3xl opacity-30 scale-125 pointer-events-none"
                  style={{ backgroundImage: `url(${activePhoto.image})` }}
                  aria-hidden="true"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activePhoto.image}
                  alt={activePhoto.title}
                  className="relative z-10 max-h-[50vh] max-w-full w-auto h-auto object-contain rounded-xl shadow-2xl"
                  loading="eager"
                />
              </div>

              {/* Photo Description & Metadata */}
              <div className="p-6 sm:p-8 bg-white flex-1 flex flex-col">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-brandPurple/10 border border-brandPurple/20 text-brandPurple text-xs font-bold uppercase tracking-wider mb-3 w-max">
                  {activePhoto.date}
                </div>

                <h2
                  id="beyond-tech-modal-title"
                  className="text-xl sm:text-2xl md:text-3xl font-black text-gray-950 tracking-tight leading-snug mb-3"
                >
                  {activePhoto.title}
                </h2>

                <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-normal whitespace-pre-line mb-6">
                  {activePhoto.description}
                </p>

                <div className="mt-auto pt-5 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-400">
                    AUSTCAIC Member Showcase
                  </span>
                  <button
                    type="button"
                    onClick={() => setActivePhoto(null)}
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
