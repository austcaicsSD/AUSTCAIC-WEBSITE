"use client";

import { sponsorInfoData } from "../data/homepage";
import FadeIn from "./FadeIn";

export default function SponsorsPartners() {
  if (!sponsorInfoData) return null;

  const tiers = [
    { name: "Gold Partner", desc: "Premium Placement & Event Hosting" },
    { name: "Silver Partner", desc: "Logo Branding & Talent Access" },
    { name: "Academic Partner", desc: "Collaborative Research & Labs" },
    { name: "Media Sponsor", desc: "Session Press & Reach Outlets" },
  ];

  return (
    <section className="py-28 px-6 relative z-20 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Call to Action Details */}
          <FadeIn>
            <div>
              <span className="px-4 py-1.5 rounded-full bg-brandBlue/10 border border-brandBlue/20 text-brandBlue text-xs font-black uppercase tracking-widest">
                Partnerships
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mt-4 mb-6 leading-tight">
                Sponsors &{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandBlue to-brandPurple">
                  Partners Program
                </span>
              </h2>
              <p className="text-gray-600 text-base leading-relaxed font-medium mb-8">
                AUSTCAIC collaborates with leading organizations to host hacking events, workshops, and AI research projects. Partner with us to engage with student developers and cybersecurity practitioners.
              </p>

              {/* Benefits list */}
              <div className="space-y-4 mb-10">
                <h4 className="text-xs font-black uppercase tracking-wider text-gray-400">Partner Benefits</h4>
                <ul className="space-y-3">
                  {sponsorInfoData.benefits.map((benefit, i) => (
                    <li key={`benefit-${i}`} className="flex items-start gap-3 text-sm text-gray-600 font-medium leading-relaxed">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brandPurple shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA link */}
              <a
                href={`mailto:${sponsorInfoData.inquiryEmail}`}
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-gray-950 text-white rounded-2xl font-bold text-sm hover:bg-gray-800 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brandPurple shadow-lg hover:shadow-gray-950/20"
              >
                Inquire via Email
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </FadeIn>

          {/* Right Column: Premium Placeholder Slots Grid */}
          <FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tiers.map((tier, idx) => (
                <div
                  key={`tier-${idx}`}
                  className="group bg-gray-50/40 border border-dashed border-gray-250 p-6 rounded-[2rem] flex flex-col justify-center items-center text-center min-h-[140px] hover:bg-white hover:border-brandPurple/20 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-150 shadow-sm flex items-center justify-center text-gray-400 group-hover:text-brandPurple mb-3 transition-colors duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-black text-gray-900 group-hover:text-brandPurple transition-colors">
                    {tier.name}
                  </h3>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mt-1">
                    {tier.desc}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
