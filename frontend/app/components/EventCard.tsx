"use client";

import Image from "next/image";
import { EventData } from "../data/homepage";

export default function EventCard({ event }: { event: EventData }) {
  const isRegistrationOpen = event.status === "Open";

  // Category visual helper
  const getCategoryStyles = (category: string) => {
    switch (category) {
      case "Workshop":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Seminar":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Webinar":
        return "bg-amber-50 text-amber-700 border-amber-200";
      default:
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
    }
  };

  return (
    <div className="group flex flex-col bg-white border border-gray-200 rounded-[2.5rem] overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.03)] hover:shadow-[0_25px_60px_rgba(109,40,217,0.12)] hover:border-brandPurple/20 hover:-translate-y-1.5 transition-all duration-500 w-full">
      
      {/* Visual Header: cover photo when there is one, gradient backdrop otherwise */}
      <div className="relative h-48 bg-gradient-to-br from-blue-900 to-purple-900 flex flex-col justify-between p-6 overflow-hidden">
        {event.image ? (
          <>
            <Image
              src={event.image}
              alt=""
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Keeps the white overlay text readable over any photo. */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-950/30 to-gray-950/20 pointer-events-none" />
          </>
        ) : (
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
        )}

        {/* Top elements */}
        <div className="flex justify-between items-center z-10">
          <span className={`px-3 py-1 rounded-xl border text-xs font-black uppercase tracking-wider ${getCategoryStyles(event.category)}`}>
            {event.category}
          </span>
          <span className={`px-3 py-1 rounded-xl text-xs font-extrabold tracking-wide text-white border border-white/20 uppercase ${
            isRegistrationOpen ? "bg-emerald-600/70" : "bg-white/10 text-white/80"
          }`}>
            {event.status === "Open" ? "● Register Now" : event.status}
          </span>
        </div>

        {/* Bottom Elements (Event tag name overlay) */}
        <div className="z-10 mt-auto">
          <p className="text-white/60 text-[10px] font-black uppercase tracking-widest leading-none mb-1">AUSTCAIC Event</p>
          <h4 className="text-lg font-bold text-white leading-tight line-clamp-1 pr-6">{event.title}</h4>
        </div>

        {!event.image && (
          <>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-brandBlue/35 rounded-full blur-[40px] pointer-events-none group-hover:scale-125 transition-transform duration-700"></div>
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-brandPurple/35 rounded-full blur-[40px] pointer-events-none group-hover:scale-125 transition-transform duration-700"></div>
          </>
        )}
      </div>

      {/* Content Details */}
      <div className="p-8 flex-1 flex flex-col">
        {/* Date & Time */}
        <div className="flex items-center gap-3 text-xs text-gray-500 font-bold mb-4">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-brandPurple shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {event.date}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-brandBlue shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {event.time}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
          {event.description}
        </p>

        <div className="mt-auto space-y-5">
          {/* Speaker Info (If Available) */}
          {event.speaker && (
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brandBlue/10 to-brandPurple/10 text-brandPurple flex items-center justify-center font-bold text-sm shrink-0 border border-brandPurple/15 select-none">
                {event.speaker.split(" ").map(w => w[0]).join("")}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-black text-gray-900 truncate leading-tight mb-0.5">{event.speaker}</p>
                <p className="text-[10px] font-bold text-gray-500 truncate leading-none">{event.speakerRole}</p>
              </div>
            </div>
          )}

          {/* Venue */}
          <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate">{event.venue}</span>
          </div>

          {/* Registration Button */}
          {isRegistrationOpen && event.registrationUrl ? (
            <a
              href={event.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-brandBlue to-brandPurple text-white rounded-2xl font-bold text-sm shadow-[0_6px_20px_rgba(29,78,216,0.2)] hover:shadow-[0_10px_25px_rgba(29,78,216,0.35)] hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brandPurple focus:ring-offset-2"
            >
              Access Registration Link
              <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          ) : (
            <button
              disabled
              className="w-full py-4 bg-gray-100 text-gray-400 border border-gray-150 rounded-2xl font-bold text-sm cursor-not-allowed select-none"
            >
              {event.status === "Closed" ? "Registration Closed" : "Registration Opening Soon"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
