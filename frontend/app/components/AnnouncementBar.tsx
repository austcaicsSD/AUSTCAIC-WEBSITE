"use client";

import Link from "next/link";
import { announcementData } from "../data/homepage";

export default function AnnouncementBar() {
  if (!announcementData || !announcementData.message) return null;

  return (
    <div
      className="w-full bg-gradient-to-r from-brandPurple to-brandBlue text-white text-xs font-bold py-3 px-4 text-center relative z-40 overflow-hidden flex items-center justify-center gap-2 group transition-all duration-300"
      role="status"
      aria-label="Latest announcement"
    >
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] uppercase tracking-wider font-extrabold shrink-0 select-none animate-pulse">
        {announcementData.label}
      </span>
      <span className="truncate max-w-[70vw] sm:max-w-[80vw] md:max-w-none text-white/95 font-medium tracking-wide">
        {announcementData.message}
      </span>
      {announcementData.href && (
        <Link
          href={announcementData.href}
          className="underline hover:text-white transition-colors inline-flex items-center gap-0.5 shrink-0 focus:outline-none focus:ring-1 focus:ring-white rounded"
        >
          View Details
          <svg
            className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      )}
    </div>
  );
}
