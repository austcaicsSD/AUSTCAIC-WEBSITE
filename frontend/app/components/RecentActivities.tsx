"use client";

import { useState } from "react";
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((activity, index) => (
            <FadeIn key={activity.id} delay={index * 50}>
              <div className="group bg-white/70 backdrop-blur-md rounded-[2rem] border border-gray-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(109,40,217,0.06)] hover:border-brandPurple/20 hover:-translate-y-1.5 transition-all duration-500 flex flex-col h-full overflow-hidden">

                {activity.image && (
                  <div className="relative h-44 w-full overflow-hidden">
                    <Image
                      src={activity.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
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
                <p className="text-gray-500 text-sm leading-relaxed font-medium flex-1">
                  {activity.description}
                </p>
                <div className="mt-6 pt-5 border-t border-gray-100 flex items-center gap-1 text-[11px] font-black uppercase tracking-wider text-gray-400 select-none">
                  <span>Past Activity Report</span>
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
    </section>
  );
}
