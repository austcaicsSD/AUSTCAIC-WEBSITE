"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { ActivityData } from "../data/homepage";
import FadeIn from "./FadeIn";

type CategoryFilter = "All" | "Workshop" | "Seminar" | "Webinar" | "Hackathon" | "Competition";

export default function RecentActivities({
  activities,
}: {
  activities: ActivityData[];
}) {
  const [filter, setFilter] = useState<CategoryFilter>("All");
  const [selectedActivity, setSelectedActivity] = useState<ActivityData | null>(null);

  useEffect(() => {
    if (!selectedActivity) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedActivity(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedActivity]);

  if (activities.length === 0) return null;

  // Only offer filters that have something behind them.
  const present = new Set(activities.map((a) => a.category));
  const categories: CategoryFilter[] = [
    "All",
    ...(["Workshop", "Seminar", "Webinar", "Hackathon", "Competition"] as const).filter(
      (c) => present.has(c),
    ),
  ];

  const filteredActivities = activities.filter((activity) => {
    if (filter === "All") return true;
    return activity.category === filter;
  });

  const getIconForCategory = (category: string) => {
    switch (category) {
      case "Workshop":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      case "Seminar":
      case "Webinar":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
          </svg>
        );
      case "Competition":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5a2 2 0 10-2 2h2zm-5 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const getGradientStyles = (category: string) => {
    switch (category) {
      case "Workshop":
        return "from-blue-500/20 to-cyan-500/20 text-blue-800 border-blue-100";
      case "Seminar":
        return "from-purple-500/20 to-pink-500/20 text-purple-800 border-purple-100";
      case "Webinar":
        return "from-amber-500/20 to-orange-500/20 text-amber-800 border-amber-100";
      default:
        return "from-emerald-500/20 to-teal-500/20 text-emerald-800 border-emerald-100";
    }
  };

  return (
    <section className="py-28 px-6 relative z-20 bg-gray-50/30 border-y border-gray-100">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="px-4 py-1.5 rounded-full bg-brandBlue/10 border border-brandBlue/20 text-brandBlue text-xs font-black uppercase tracking-widest">
                Our Activities
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mt-4">
                Recent{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandBlue to-brandPurple">
                  Club Actions
                </span>
              </h2>
              <p className="mt-4 text-base text-gray-500 font-medium max-w-md">
                Reflecting on previous academic activities, workshops, and student training sessions.
              </p>
            </div>

            {/* Category Navigation Controls */}
            <div className="flex flex-wrap items-center gap-2 max-w-full overflow-x-auto no-scrollbar py-2">
              {categories.map((catName) => (
                <button
                  key={catName}
                  type="button"
                  onClick={() => setFilter(catName)}
                  className={`px-4 py-2 rounded-full text-xs font-black tracking-wider uppercase transition-all duration-300 border ${
                    filter === catName
                      ? "bg-gray-950 border-gray-950 text-white shadow-md shadow-gray-950/20"
                      : "bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-950"
                  }`}
                >
                  {catName}
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Filtered Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {filteredActivities.map((activity, index) => (
            <FadeIn key={activity.id} delay={index * 50} className="h-full flex flex-col">
              <div
                role="button"
                tabIndex={0}
                onClick={() => setSelectedActivity(activity)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedActivity(activity);
                  }
                }}
                aria-label={`View full details of ${activity.title}`}
                className="group cursor-pointer bg-white/70 backdrop-blur-md rounded-[2rem] border border-gray-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(109,40,217,0.1)] hover:border-brandPurple/30 hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-brandPurple"
              >
                {activity.image && (
                  <div className="relative h-44 w-full overflow-hidden bg-gray-100">
                    <Image
                      src={activity.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-[11px] font-bold text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                        <svg className="w-3.5 h-3.5 text-brandPurple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View Full Poster
                      </span>
                    </div>
                  </div>
                )}

                <div className="p-8 flex flex-col flex-1">
                  {/* Visual Placeholder (Top category icon badge) */}
                  {!activity.image && (
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${getGradientStyles(activity.category)} border flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-500`}>
                      {getIconForCategory(activity.category)}
                    </div>
                  )}

                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-brandPurple bg-brandPurple/5 border border-brandPurple/10 px-2 py-0.5 rounded-lg select-none">
                      {activity.category}
                    </span>
                    <span className="text-[10px] font-bold text-gray-400">
                      {activity.date}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-950 mb-3 leading-snug group-hover:text-brandBlue transition-colors duration-300">
                    {activity.title}
                  </h3>

                  {/* Clamped description so cards don't stretch unevenly */}
                  <p className="text-gray-500 text-sm leading-relaxed font-medium line-clamp-3 mb-4">
                    {activity.description}
                  </p>

                  {/* See more action */}
                  <div className="mt-auto pt-2 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brandPurple group-hover:text-brandBlue transition-colors">
                      See more
                      <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                    <span className="text-[10px] font-semibold text-gray-400 group-hover:text-gray-600 transition-colors">
                      Full view
                    </span>
                  </div>

                  <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-[11px] font-black uppercase tracking-wider text-gray-400 select-none">
                    <span>Past Activity Report</span>
                    <span className="text-brandPurple font-bold group-hover:underline">Read Info</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {filteredActivities.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-dashed border-gray-250 rounded-[2.5rem]">
            <p className="text-gray-500 font-bold text-base">No previous activities match this category.</p>
          </div>
        )}
      </div>

      {/* Event Details Overlay Modal */}
      {selectedActivity && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-gray-950/80 backdrop-blur-md animate-fade-in overflow-y-auto"
          onClick={() => setSelectedActivity(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="activity-modal-title"
        >
          <div
            className="relative w-full max-w-3xl max-h-[88vh] my-auto bg-white rounded-3xl sm:rounded-[2rem] overflow-hidden shadow-2xl border border-gray-200 flex flex-col animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button - Always visible, contrasting, not cut off */}
            <button
              type="button"
              onClick={() => setSelectedActivity(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-50 p-2 sm:p-2.5 bg-black/70 hover:bg-black text-white rounded-full shadow-xl backdrop-blur-md border border-white/25 transition-all hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-brandPurple"
              aria-label="Close activity details"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Scrollable Modal Container */}
            <div className="overflow-y-auto overscroll-contain flex flex-col flex-1">
              {/* Full Image Container - Displays full poster without any cutoff or server timeout */}
              {selectedActivity.image ? (
                <div className="relative w-full bg-slate-950 flex items-center justify-center p-4 sm:p-6 min-h-[220px] max-h-[48vh] shrink-0 overflow-hidden">
                  {/* Ambient background glow */}
                  <div
                    className="absolute inset-0 bg-cover bg-center blur-2xl opacity-25 scale-125 pointer-events-none"
                    style={{ backgroundImage: `url(${selectedActivity.image})` }}
                    aria-hidden="true"
                  />
                  {/* Foreground Complete Image: loads directly without server optimization timeout */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selectedActivity.image}
                    alt={selectedActivity.title}
                    className="relative z-10 max-h-[42vh] max-w-full w-auto h-auto object-contain rounded-xl shadow-2xl"
                    loading="eager"
                  />
                </div>
              ) : (
                <div className="p-8 sm:p-12 bg-gradient-to-br from-blue-950 to-purple-950 text-white flex flex-col items-center justify-center text-center shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-3 text-white">
                    {getIconForCategory(selectedActivity.category)}
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest text-brandBlue bg-white/90 px-3 py-1 rounded-full">
                    {selectedActivity.category}
                  </span>
                </div>
              )}

              {/* Text Description & Metadata */}
              <div className="p-6 sm:p-8 bg-white flex-1 flex flex-col">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="text-xs font-black uppercase tracking-widest text-brandPurple bg-brandPurple/10 border border-brandPurple/20 px-3 py-1 rounded-xl">
                    {selectedActivity.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-xl">
                    <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {selectedActivity.date}
                  </span>
                </div>

                <h2
                  id="activity-modal-title"
                  className="text-xl sm:text-2xl md:text-3xl font-black text-gray-950 tracking-tight leading-snug mb-5"
                >
                  {selectedActivity.title}
                </h2>

                <div className="border-t border-gray-100 pt-5 flex-1">
                  <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">
                    Event Details & Description
                  </h3>
                  <div className="text-gray-700 text-sm sm:text-base leading-relaxed font-normal whitespace-pre-line space-y-3">
                    {selectedActivity.description}
                  </div>
                </div>

                <div className="mt-8 pt-5 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>AUSTCAIC Activity Archive</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedActivity(null)}
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
