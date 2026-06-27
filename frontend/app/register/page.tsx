"use client";

import Link from "next/link";
import { useState } from "react";

export default function Register() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative min-h-screen py-24 px-6 flex items-center justify-center bg-gray-50 overflow-hidden">
      
      {/* Dynamic Background Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brandBlue/10 rounded-full blur-[128px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-brandPurple/10 rounded-full blur-[128px] pointer-events-none"></div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-2xl bg-white/70 backdrop-blur-2xl p-8 sm:p-12 rounded-[2.5rem] border border-white/50 shadow-2xl transition-all duration-500 hover:shadow-brandBlue/20">
        
        {/* Content Section */}
        <div className="text-center space-y-6">
          <div className="mx-auto w-20 h-20 bg-gray-950 rounded-2xl flex items-center justify-center text-white shadow-lg transform rotate-3">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-950 tracking-tight">
              Ready to Join?
            </h1>
            <p className="text-gray-600 text-lg max-w-md mx-auto">
              Complete your official registration via our secure portal to become a part of the AUSTCAIC community.
            </p>
          </div>

          {/* Registration Trigger */}
          <div 
            className="pt-6"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <a 
              href="https://forms.gle/WJj6SaaG4htKJfcH8" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 bg-gray-950 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-brandBlue/30 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto justify-center"
            >
              Start Registration
              <svg 
                className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'translate-x-2' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </a>
          </div>

          {/* Footer Navigation */}
          <div className="pt-8 border-t border-gray-200/50">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-brandBlue transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}