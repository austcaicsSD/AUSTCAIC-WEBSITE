"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// ================= ANIMATION COMPONENT =================
const FadeIn = ({ children, delay = 0, direction = "up" }: { children: React.ReactNode, delay?: number, direction?: "up" | "left" | "right" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  const getDirectionClasses = () => {
    if (direction === "up") return "translate-y-12";
    if (direction === "left") return "-translate-x-12";
    if (direction === "right") return "translate-x-12";
    return "";
  };

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0 translate-x-0" : `opacity-0 ${getDirectionClasses()}`
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// ================= MAIN PAGE COMPONENT =================
export default function Home() {
  // Mouse tracking state for the spotlight effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <main 
      onMouseMove={handleMouseMove}
      className="relative w-full overflow-hidden bg-gray-50 selection:bg-brandPurple/30"
    >
      
      {/* ================= HERO SECTION (Interactive CSS Edition) ================= */}
      <section className="relative min-h-screen flex items-center justify-center pt-10 overflow-hidden">
        
        {/* 1. Interactive Mouse Spotlight Effect */}
        <div 
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 opacity-70"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.08), transparent 80%)`
          }}
        />

        {/* 2. Cyber/AI Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0"></div>

        {/* 3. Floating Background Tech Icons (CSS Animated) */}
        <div className="absolute top-1/4 left-[10%] opacity-20 animate-[bounce_6s_infinite] pointer-events-none z-0">
          <svg className="w-24 h-24 text-brandBlue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
        </div>
        <div className="absolute bottom-1/4 right-[10%] opacity-20 animate-[bounce_8s_infinite] pointer-events-none z-0" style={{ animationDelay: "1s" }}>
          <svg className="w-32 h-32 text-brandPurple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"></path></svg>
        </div>

        {/* Ambient Glowing Orbs */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-brandBlue/20 rounded-full mix-blend-multiply filter blur-[100px] animate-pulse pointer-events-none z-0"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-brandPurple/20 rounded-full mix-blend-multiply filter blur-[100px] animate-pulse pointer-events-none z-0" style={{ animationDelay: "2s" }}></div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center w-full max-w-5xl">
          <FadeIn delay={100}>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/60 border border-brandPurple/20 shadow-[0_0_15px_rgba(139,92,246,0.15)] backdrop-blur-md mb-8 cursor-default hover:scale-105 transition-transform">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brandPurple opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brandPurple"></span>
              </span>
              <span className="text-sm font-bold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-brandBlue to-brandPurple uppercase">
                AUST's Premier Tech Community
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={300}>
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tighter mb-6 text-gray-900 leading-[1.1]">
              <span className="block drop-shadow-sm">AUST Cybersecurity</span> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandBlue via-brandPurple to-brandBlue animate-gradient-x drop-shadow-sm">
                & AI Club
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={500}>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
              Secure. Innovate. Lead. Join the community shaping the future of security and artificial intelligence.
            </p>
          </FadeIn>

          <FadeIn delay={700}>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full sm:w-auto">
              <Link href="#join-us" className="group relative px-8 py-4 bg-gradient-to-r from-brandBlue to-brandPurple text-white rounded-xl font-bold text-lg overflow-hidden w-full sm:w-auto shadow-[0_8px_30px_rgba(29,78,216,0.3)] hover:shadow-brandBlue/50 hover:-translate-y-1 transition-all duration-300">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                <span className="relative z-10">Become a Member</span>
              </Link>
              <Link href="/lab-free" className="group flex items-center justify-center gap-2 px-8 py-4 bg-white/80 backdrop-blur-md text-gray-900 border-2 border-gray-200 rounded-xl font-bold text-lg hover:border-brandPurple hover:text-brandPurple hover:-translate-y-1 transition-all duration-300 shadow-sm w-full sm:w-auto">
                Explore Resources
                <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
              </Link>
            </div>
          </FadeIn>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-brandBlue z-10">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
        </div>
      </section>

      {/* ================= OUR JOURNEY ================= */}
      <section className="py-24 px-6 bg-white border-t border-gray-100 relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brandBlue/5 rounded-full blur-3xl -z-10"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">Our <span className="text-brandBlue">Journey</span></h2>
              <div className="h-1.5 w-24 bg-brandBlue mx-auto mt-6 rounded-full"></div>
            </div>
          </FadeIn>
          
          <div className="relative border-l-4 border-brandBlue/20 ml-4 md:ml-1/2 space-y-16">
            <FadeIn direction="left" delay={100}>
              <div className="relative pl-8 md:pl-0 group">
                <div className="md:w-1/2 md:pr-12 md:text-right">
                  <div className="absolute left-[-11px] md:left-auto md:right-[-11px] top-1 w-5 h-5 rounded-full bg-brandBlue border-4 border-white shadow transition-transform duration-300 group-hover:scale-150"></div>
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-brandBlue transition-colors">The Inception</h3>
                  <span className="inline-block px-3 py-1 bg-brandPurple/10 text-brandPurple font-semibold rounded-full mt-2 mb-3"></span>
                  <p className="text-gray-600">Started with a core group of tech enthusiasts aiming to create a dedicated hub for cybersecurity awareness and AI exploration at AUST.</p>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={200}>
              <div className="relative pl-8 md:pl-0 group">
                <div className="md:w-1/2 md:ml-auto md:pl-12">
                  <div className="absolute left-[-11px] top-1 w-5 h-5 rounded-full bg-brandPurple border-4 border-white shadow transition-transform duration-300 group-hover:scale-150"></div>
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-brandPurple transition-colors">Growth & Execution</h3>
                  <span className="inline-block px-3 py-1 bg-brandBlue/10 text-brandBlue font-semibold rounded-full mt-2 mb-3"></span>
                  <p className="text-gray-600">Expanded our resource base, hosted university-wide tech seminars, and launched collaborative open-source projects.</p>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="left" delay={300}>
              <div className="relative pl-8 md:pl-0 group">
                <div className="md:w-1/2 md:pr-12 md:text-right">
                  <div className="absolute left-[-11px] md:left-auto md:right-[-11px] top-1 w-5 h-5 rounded-full bg-gradient-to-r from-brandBlue to-brandPurple border-4 border-white shadow animate-pulse"></div>
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brandBlue group-hover:to-brandPurple transition-all">Leading the Future</h3>
                  <span className="inline-block px-3 py-1 bg-gradient-to-r from-brandBlue/10 to-brandPurple/10 text-brandPurple font-semibold rounded-full mt-2 mb-3">2026 & Beyond</span>
                  <p className="text-gray-600">Integrating deep learning research and advanced network security labs, building a legacy of innovators.</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ================= VISION & MISSION ================= */}
      <section className="py-24 px-6 bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <FadeIn delay={100} direction="up">
            <div className="group bg-white p-10 rounded-[2rem] border border-gray-100 shadow-lg hover:shadow-2xl hover:shadow-brandBlue/20 hover:-translate-y-3 transition-all duration-500 h-full">
              <div className="w-16 h-16 bg-brandBlue/10 text-brandBlue rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brandBlue group-hover:text-white transition-colors duration-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
              </div>
              <h3 className="text-3xl font-bold mb-4 text-gray-900 group-hover:text-brandBlue transition-colors">Our Vision</h3>
              <p className="text-gray-600 text-lg leading-relaxed">To emerge as the premier center of excellence in Cybersecurity and Artificial Intelligence in Bangladesh, fostering a generation of ethical innovators equipped to tackle global technological challenges and secure the digital frontier.</p>
            </div>
          </FadeIn>

          <FadeIn delay={300} direction="up">
            <div className="group bg-white p-10 rounded-[2rem] border border-gray-100 shadow-lg hover:shadow-2xl hover:shadow-brandPurple/20 hover:-translate-y-3 transition-all duration-500 h-full">
              <div className="w-16 h-16 bg-brandPurple/10 text-brandPurple rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brandPurple group-hover:text-white transition-colors duration-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <h3 className="text-3xl font-bold mb-4 text-gray-900 group-hover:text-brandPurple transition-colors">Our Mission</h3>
              <p className="text-gray-600 text-lg leading-relaxed">To bridge the gap between theoretical knowledge and practical application by providing hands-on training, conducting cutting-edge research, and cultivating a collaborative community of ethical hackers and AI enthusiasts.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ================= WHAT WE PROVIDE ================= */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">What We <span className="text-brandPurple">Provide</span></h2>
              <div className="h-1.5 w-24 bg-brandPurple mx-auto mt-6 rounded-full"></div>
              <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">Committed to equipping our members with industry-standard skills and resources.</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeIn delay={100}>
              <div className="p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl hover:-translate-y-2 transition-all border border-gray-100 h-full cursor-default">
                <div className="w-12 h-12 text-brandPurple mb-4">
                   <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">AI & Deep Learning</h3>
                <p className="text-gray-600">Guided mentorship and research opportunities focusing on NLP, Swarm Intelligence, and building scalable neural networks.</p>
              </div>
            </FadeIn>
            
            <FadeIn delay={300}>
              <div className="p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl hover:-translate-y-2 transition-all border border-gray-100 h-full cursor-default">
                <div className="w-12 h-12 text-brandBlue mb-4">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Full-Stack Engineering</h3>
                <p className="text-gray-600">Hands-on development sessions bridging modern frontend frameworks with robust backend ecosystems and containerized databases.</p>
              </div>
            </FadeIn>
            
            <FadeIn delay={500}>
              <div className="p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl hover:-translate-y-2 transition-all border border-gray-100 h-full cursor-default">
                <div className="w-12 h-12 text-gray-800 mb-4">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Core CS & Networking</h3>
                <p className="text-gray-600">Practical labs covering advanced OS algorithms, time-complexity optimizations, and extensive network simulation configurations.</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ================= PROJECTS GALLERY ================= */}
      <section className="py-24 px-6 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(29,78,216,0.1)_0,transparent_100%)]"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold">Featured <span className="text-brandBlue">Projects</span></h2>
              <div className="h-1.5 w-24 bg-brandBlue mx-auto mt-6 rounded-full"></div>
              <p className="mt-6 text-xl text-gray-400">Innovations crafted by our brilliant members.</p>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="flex justify-center">
              <a href="https://flare-sphere-real-time-hand-trackin.vercel.app" target="_blank" rel="noopener noreferrer" className="group w-full max-w-sm block bg-gray-800/80 backdrop-blur-sm rounded-2xl overflow-hidden hover:-translate-y-3 hover:scale-105 transition-all duration-500 border border-gray-700 hover:border-brandBlue shadow-2xl hover:shadow-brandBlue/30">
                <div className="h-56 bg-gray-700 relative flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-brandBlue/0 group-hover:bg-brandBlue/20 transition-colors duration-500 z-10"></div>
                  <div className="absolute w-32 h-32 bg-brandBlue/30 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 z-0"></div>
                  
                  <svg className="w-16 h-16 text-gray-400 group-hover:text-brandBlue relative z-10 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-brandBlue transition-colors">Flare Sphere</h3>
                  <p className="text-gray-400 mb-6">Real-time Hand Tracking Application built with modern web technologies.</p>
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 rounded-lg text-brandBlue text-sm font-semibold group-hover:bg-brandBlue group-hover:text-white transition-colors">
                    View Live Project
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                  </span>
                </div>
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ================= CALL TO ACTION ================= */}
      <section id="join-us" className="py-24 px-6 relative overflow-hidden bg-gradient-to-br from-brandBlue to-brandPurple text-white">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <FadeIn>
            <h2 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">Ready to Make an Impact?</h2>
            <p className="text-xl text-white/90 mb-10 font-medium">Be a part of a community that builds, secures, and innovates.</p>
          </FadeIn>
          
          <FadeIn delay={200}>
            <Link href="/register" className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-gray-900 rounded-full font-bold text-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 ring-4 ring-white/30 hover:ring-white/50">
              Join as a General Member
              <svg className="w-6 h-6 text-brandPurple group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </Link>
          </FadeIn>
        </div>
      </section>

    </main>
  );
}