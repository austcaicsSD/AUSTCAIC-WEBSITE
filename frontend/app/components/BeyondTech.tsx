"use client";

import { beyondTechData } from "../data/homepage";
import FadeIn from "./FadeIn";

export default function BeyondTech() {
  const getIcon = (type: string) => {
    switch (type) {
      case "music":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
        );
      case "camera":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      case "chat":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        );
      case "trophy":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
    }
  };

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

        {beyondTechData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {beyondTechData.map((item, index) => (
              <FadeIn key={item.id} delay={index * 80}>
                <div className="group bg-gray-50/50 p-8 rounded-[2rem] border border-gray-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.01)] hover:shadow-[0_15px_40px_rgba(109,40,217,0.06)] hover:border-brandPurple/15 transition-all duration-500 flex gap-5 items-start h-full">
                  {/* Visual Icon Box */}
                  <div className="w-12 h-12 rounded-2xl bg-white border border-gray-150 shadow-sm flex items-center justify-center text-brandPurple shrink-0 group-hover:rotate-6 group-hover:scale-105 transition-transform duration-500">
                    {getIcon(item.iconType)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-black text-brandBlue uppercase tracking-widest block mb-1">
                      {item.activityType}
                    </span>
                    <h3 className="text-xl font-bold text-gray-950 mb-2 leading-snug group-hover:text-brandBlue transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed font-medium">
                      {item.details}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        ) : (
          <FadeIn delay={100}>
            <div className="relative overflow-hidden rounded-[2.5rem] border border-dashed border-gray-200 bg-gradient-to-b from-gray-50/60 via-white to-gray-50/30 p-10 sm:p-14 text-center max-w-2xl mx-auto shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brandBlue/10 to-brandPurple/10 border border-brandPurple/20 flex items-center justify-center text-brandPurple mx-auto mb-5 shadow-sm">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brandPurple/5 border border-brandPurple/15 text-brandPurple text-xs font-bold uppercase tracking-wider mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brandPurple opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brandPurple"></span>
                </span>
                Coming Soon
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight mb-3">
                Cultural Spotlights in Preparation
              </h3>

              <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-lg mx-auto mb-6">
                We are curating cultural highlights, creative showcases, and extracurricular achievements from our club members. Check back soon for upcoming feature stories!
              </p>

              <a
                href="mailto:austcaic@aust.edu?subject=Club%20Culture%20Spotlight%20Submission"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-gray-200 text-xs font-bold text-gray-700 hover:text-brandPurple hover:border-brandPurple/30 hover:shadow-md transition-all duration-300"
              >
                <svg className="w-4 h-4 text-brandPurple" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Have a showcase to share? Contact Us
              </a>
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
