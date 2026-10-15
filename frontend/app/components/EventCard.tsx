"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { EventData } from "../data/homepage";

export default function EventCard({ event }: { event: EventData }) {
  const [showModal, setShowModal] = useState(false);
  const isRegistrationOpen = event.status === "Open";

  useEffect(() => {
    if (!showModal) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowModal(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [showModal]);

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
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setShowModal(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setShowModal(true);
          }
        }}
        aria-label={`View details for ${event.title}`}
        className="group cursor-pointer flex flex-col bg-white border border-gray-200 rounded-[2.5rem] overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.03)] hover:shadow-[0_25px_60px_rgba(109,40,217,0.12)] hover:border-brandPurple/20 hover:-translate-y-1.5 transition-all duration-500 w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brandPurple"
      >
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
          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
            {event.description}
          </p>

          {/* See more text */}
          <div className="mb-6 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brandPurple group-hover:text-brandBlue transition-colors">
              See more details
              <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>

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
                onClick={(e) => e.stopPropagation()}
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
                onClick={(e) => e.stopPropagation()}
                className="w-full py-4 bg-gray-100 text-gray-400 border border-gray-150 rounded-2xl font-bold text-sm cursor-not-allowed select-none"
              >
                {event.status === "Closed" ? "Registration Closed" : "Registration Opening Soon"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Full Event Details Overlay Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-gray-950/80 backdrop-blur-md animate-fade-in overflow-y-auto"
          onClick={() => setShowModal(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`event-modal-title-${event.id}`}
        >
          <div
            className="relative w-full max-w-3xl max-h-[88vh] my-auto bg-white rounded-3xl sm:rounded-[2rem] overflow-hidden shadow-2xl border border-gray-200 flex flex-col animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-50 p-2 sm:p-2.5 bg-black/70 hover:bg-black text-white rounded-full shadow-xl backdrop-blur-md border border-white/25 transition-all hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-brandPurple"
              aria-label="Close event modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Scrollable Modal Content */}
            <div className="overflow-y-auto overscroll-contain flex flex-col flex-1">
              {/* Full Image Container - Shows complete poster without cutoff or timeout */}
              {event.image ? (
                <div className="relative w-full bg-slate-950 flex items-center justify-center p-4 sm:p-6 min-h-[220px] max-h-[48vh] shrink-0 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center blur-2xl opacity-25 scale-125 pointer-events-none"
                    style={{ backgroundImage: `url(${event.image})` }}
                    aria-hidden="true"
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={event.image}
                    alt={event.title}
                    className="relative z-10 max-h-[42vh] max-w-full w-auto h-auto object-contain rounded-xl shadow-2xl"
                    loading="eager"
                  />
                </div>
              ) : (
                <div className="p-8 sm:p-12 bg-gradient-to-br from-blue-950 to-purple-950 text-white flex flex-col items-center justify-center text-center shrink-0">
                  <span className="text-xs font-black uppercase tracking-widest text-brandBlue bg-white/90 px-3 py-1 rounded-full mb-2">
                    {event.category}
                  </span>
                  <h3 className="text-xl font-bold">{event.title}</h3>
                </div>
              )}

              {/* Text Description & Metadata */}
              <div className="p-6 sm:p-10 bg-white">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className={`px-3 py-1 rounded-xl border text-xs font-black uppercase tracking-wider ${getCategoryStyles(event.category)}`}>
                    {event.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-xl">
                    <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {event.date}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-xl">
                    <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {event.time}
                  </span>
                </div>

                <h2
                  id={`event-modal-title-${event.id}`}
                  className="text-2xl sm:text-3xl font-black text-gray-950 tracking-tight leading-snug mb-6"
                >
                  {event.title}
                </h2>

                {/* Speaker & Venue */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {event.speaker && (
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <div className="w-10 h-10 rounded-xl bg-brandPurple/10 text-brandPurple flex items-center justify-center font-bold text-sm shrink-0 border border-brandPurple/15 select-none">
                        {event.speaker.split(" ").map(w => w[0]).join("")}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-black text-gray-900 truncate">{event.speaker}</p>
                        <p className="text-[10px] font-bold text-gray-500 truncate">{event.speakerRole}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Venue</p>
                      <p className="text-xs font-bold text-gray-800 truncate">{event.venue}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">
                    Event Details & Description
                  </h3>
                  <div className="text-gray-700 text-sm sm:text-base leading-relaxed font-normal whitespace-pre-line space-y-4">
                    {event.description}
                  </div>
                </div>

                {/* Registration Action in Modal */}
                <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  {isRegistrationOpen && event.registrationUrl ? (
                    <a
                      href={event.registrationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-brandBlue to-brandPurple text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all w-full sm:w-auto"
                    >
                      Access Registration Link
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  ) : (
                    <span className="text-xs font-bold text-gray-400">
                      {event.status === "Closed" ? "Registration Closed" : "Registration Opening Soon"}
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition-colors w-full sm:w-auto"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
