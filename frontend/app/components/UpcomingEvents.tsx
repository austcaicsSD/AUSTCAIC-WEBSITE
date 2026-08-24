"use client";

import { upcomingEventsData } from "../data/homepage";
import EventCard from "./EventCard";
import FadeIn from "./FadeIn";

export default function UpcomingEvents() {
  if (!upcomingEventsData || upcomingEventsData.length === 0) return null;

  return (
    <section id="upcoming-events" className="py-28 px-6 relative z-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="px-4 py-1.5 rounded-full bg-brandPurple/10 border border-brandPurple/20 text-brandPurple text-xs font-black uppercase tracking-widest">
              Join Our Sessions
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mt-4">
              Upcoming{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandBlue to-brandPurple">
                Events & Workshops
              </span>
            </h2>
            <p className="mt-4 text-lg text-gray-500 font-medium max-w-xl mx-auto">
              Participate in our structured learning tracks. Secure your spot in the interactive training sessions below.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
          {upcomingEventsData.map((event, index) => (
            <FadeIn key={event.id} delay={index * 150} className="w-full max-w-lg">
              <EventCard event={event} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
