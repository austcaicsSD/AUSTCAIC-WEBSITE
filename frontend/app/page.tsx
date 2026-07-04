"use client";

import Link from "next/link";
import Image from "next/image";
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  // Upgraded to a Bento-Grid friendly array
  const offerings = [
    { num: "01", title: "Mentorship", desc: "Learn, grow and get guided by industry experts.", span: "md:col-span-2 md:row-span-2", bg: "bg-gradient-to-br from-brandBlue/5 to-transparent" },
    { num: "02", title: "Cybersecurity", desc: "Explore, defend and secure the digital world.", span: "md:col-span-1", bg: "bg-white" },
    { num: "03", title: "Projects & Practice", desc: "Build real-world projects. Innovate.", span: "md:col-span-1", bg: "bg-white" },
    { num: "04", title: "CTF & Hackathons", desc: "Compete. Solve. Conquer challenges.", span: "md:col-span-1", bg: "bg-white" },
    { num: "05", title: "Research Wing", desc: "Research. Discover. Make an impact.", span: "md:col-span-1", bg: "bg-white" },
    { num: "06", title: "AI & ML Wing", desc: "Learn AI. Build ML. Shape the future.", span: "md:col-span-2", bg: "bg-gradient-to-tl from-brandPurple/5 to-transparent" },
  ];
  
  return (
    <main 
      onMouseMove={handleMouseMove}
      className="relative w-full overflow-hidden bg-[#fafafa] text-gray-900 selection:bg-brandPurple/30 font-sans"
    >
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-screen flex items-center justify-center pt-10 overflow-hidden bg-white z-20 rounded-b-[3rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border-b border-gray-100">
        <div 
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 opacity-70"
          style={{ background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.08), transparent 80%)` }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0"></div>

        <div className="absolute top-1/4 left-[10%] opacity-20 animate-[bounce_6s_infinite] pointer-events-none z-0">
          <svg className="w-24 h-24 text-brandBlue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
        </div>
        <div className="absolute bottom-1/4 right-[10%] opacity-20 animate-[bounce_8s_infinite] pointer-events-none z-0" style={{ animationDelay: "1s" }}>
          <svg className="w-32 h-32 text-brandPurple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"></path></svg>
        </div>

        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-brandBlue/20 rounded-full mix-blend-multiply filter blur-[100px] animate-pulse pointer-events-none z-0"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-brandPurple/20 rounded-full mix-blend-multiply filter blur-[100px] animate-pulse pointer-events-none z-0" style={{ animationDelay: "2s" }}></div>

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
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter mb-6 text-gray-900 leading-[1.1]">
              <span className="block drop-shadow-sm">AUST Cybersecurity</span> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandBlue via-brandPurple to-brandBlue animate-gradient-x drop-shadow-sm">
                & AI Club
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={500}>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
              Secure. Innovate. Lead.
            </p>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
              Join the community shaping the future of security and artificial intelligence.
            </p>
          </FadeIn>

          <FadeIn delay={700}>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full sm:w-auto">
              <Link href="#join-us" className="group relative px-8 py-4 bg-gradient-to-r from-brandBlue to-brandPurple text-white rounded-xl font-bold text-lg overflow-hidden w-full sm:w-auto shadow-[0_8px_30px_rgba(29,78,216,0.3)] hover:shadow-brandBlue/50 hover:-translate-y-1 transition-all duration-300">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                <span className="relative z-10">Why you should become a Member</span>
              </Link>
              <Link href="/lab-free" className="group flex items-center justify-center gap-2 px-8 py-4 bg-white/80 backdrop-blur-md text-gray-900 border-2 border-gray-200 rounded-xl font-bold text-lg hover:border-brandPurple hover:text-brandPurple hover:-translate-y-1 transition-all duration-300 shadow-sm w-full sm:w-auto">
                Explore Resources
                <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
              </Link>
            </div>
          </FadeIn>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-brandBlue z-10">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
        </div>
      </section>

      {/* ================= OUR JOURNEY (Holographic Line Timeline) ================= */}
      <section className="py-32 px-6 relative z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brandBlue/10 rounded-full blur-[100px] -z-10 mix-blend-multiply"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brandPurple/10 rounded-full blur-[100px] -z-10 mix-blend-multiply"></div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <FadeIn>
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter">Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandBlue to-brandPurple">Journey</span></h2>
            </div>
          </FadeIn>
          
          <div className="relative">
            {/* Glowing Gradient Center Line */}
            <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-1 bg-gradient-to-b from-brandBlue/20 via-brandPurple/50 to-brandBlue/20 -translate-x-1/2 rounded-full hidden md:block"></div>

            <div className="space-y-16 md:space-y-24">
              {/* Node 1 */}
              <FadeIn direction="left" delay={100}>
                <div className="relative flex flex-col md:flex-row items-center justify-between group">
                  <div className="md:w-5/12 text-right hidden md:block pr-12">
                    <h3 className="text-3xl font-black text-gray-900 mb-2 group-hover:text-brandBlue transition-colors duration-300">The Inception</h3>
                    <p className="text-gray-500 text-lg">Foundation of the tech hub.</p>
                  </div>
                  <div className="absolute left-8 md:left-1/2 w-6 h-6 rounded-full bg-white border-4 border-gray-200 -translate-x-1/2 group-hover:border-brandBlue group-hover:shadow-[0_0_20px_rgba(29,78,216,0.4)] transition-all duration-500 z-10"></div>
                  <div className="md:w-5/12 pl-16 md:pl-12 w-full">
                    <div className="p-8 bg-white/70 backdrop-blur-xl border border-white rounded-[2rem] shadow-[0_15px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(29,78,216,0.1)] hover:-translate-y-1 transition-all duration-500">
                      <span className="inline-block px-4 py-1.5 bg-brandBlue/10 text-brandBlue font-bold rounded-full mb-4 text-sm tracking-widest"></span>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 md:hidden">The Inception</h3>
                      <p className="text-gray-600 leading-relaxed">Started with a core group of tech enthusiasts aiming to create a dedicated hub for cybersecurity awareness and AI exploration at AUST.</p>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Node 2 */}
              <FadeIn direction="right" delay={200}>
                <div className="relative flex flex-col md:flex-row-reverse items-center justify-between group">
                  <div className="md:w-5/12 text-left hidden md:block pl-12">
                    <h3 className="text-3xl font-black text-gray-900 mb-2 group-hover:text-brandPurple transition-colors duration-300">Growth & Execution</h3>
                    <p className="text-gray-500 text-lg">Expanding our horizons.</p>
                  </div>
                  <div className="absolute left-8 md:left-1/2 w-6 h-6 rounded-full bg-white border-4 border-gray-200 -translate-x-1/2 group-hover:border-brandPurple group-hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all duration-500 z-10"></div>
                  <div className="md:w-5/12 pl-16 md:pr-12 md:pl-0 w-full text-left md:text-right">
                    <div className="p-8 bg-white/70 backdrop-blur-xl border border-white rounded-[2rem] shadow-[0_15px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(139,92,246,0.1)] hover:-translate-y-1 transition-all duration-500">
                      <span className="inline-block px-4 py-1.5 bg-brandPurple/10 text-brandPurple font-bold rounded-full mb-4 text-sm tracking-widest"></span>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 md:hidden">Growth & Execution</h3>
                      <p className="text-gray-600 leading-relaxed">Expanded our resource base, hosted university-wide tech seminars, and launched collaborative open-source projects.</p>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Node 3 */}
              <FadeIn direction="left" delay={300}>
                <div className="relative flex flex-col md:flex-row items-center justify-between group">
                  <div className="md:w-5/12 text-right hidden md:block pr-12">
                    <h3 className="text-3xl font-black text-gray-900 mb-2 group-hover:text-blue-500 transition-colors duration-300">Leading the Future</h3>
                    <p className="text-gray-500 text-lg">Building a legacy.</p>
                  </div>
                  <div className="absolute left-8 md:left-1/2 w-6 h-6 rounded-full bg-white border-4 border-gray-200 -translate-x-1/2 group-hover:border-blue-500 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-500 z-10"></div>
                  <div className="md:w-5/12 pl-16 md:pl-12 w-full">
                    <div className="p-8 bg-white/70 backdrop-blur-xl border border-white rounded-[2rem] shadow-[0_15px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(59,130,246,0.1)] hover:-translate-y-1 transition-all duration-500">
                      <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 font-bold rounded-full mb-4 text-sm tracking-widest">2026+</span>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 md:hidden">Leading the Future</h3>
                      <p className="text-gray-600 leading-relaxed">Integrating deep learning research and advanced network security labs, building a legacy of innovators.</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHAT WE OFFER ================= */}
      <section className="py-32 px-6 relative z-10">
        <div className="max-w-6xl mx-auto relative">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-black text-center text-gray-900 mb-20 tracking-tighter">WHAT WE  <span className="text-brandBlue">OFFER</span></h2>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
            {offerings.map((item, index) => (
              <FadeIn key={item.num} delay={index * 100}>
                <div className={`relative h-full w-full p-10 rounded-[2.5rem] border border-white shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(29,78,216,0.1)] hover:-translate-y-2 transition-all duration-500 group overflow-hidden bg-white/60 backdrop-blur-lg ${item.bg}`}>
                  <div className="absolute -top-6 -right-4 text-8xl font-black text-gray-900/[0.03] group-hover:text-brandBlue/10 transition-colors duration-500 group-hover:scale-110 pointer-events-none">
                    {item.num}
                  </div>
                  <div className="relative z-10 h-full flex flex-col justify-end">
                    <h3 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">{item.title}</h3>
                    <p className="text-gray-600 max-w-sm font-medium">{item.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ================= VISION & MISSION (Floating Orbs & Glass panels) ================= */}
      <section className="py-40 px-6 relative z-10 overflow-hidden border-y border-gray-100 bg-white">
        {/* Dynamic Abstract Background inside this section */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-brandBlue/20 rounded-full blur-[120px] pointer-events-none mix-blend-multiply animate-pulse"></div>
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-brandPurple/20 rounded-full blur-[120px] pointer-events-none mix-blend-multiply animate-pulse" style={{ animationDelay: '2s' }}></div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
          <FadeIn delay={100} direction="up">
            <div className="group bg-white/40 backdrop-blur-3xl p-12 rounded-[3rem] border border-white shadow-[0_20px_60px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_80px_rgba(29,78,216,0.15)] hover:-translate-y-3 transition-all duration-500 h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brandBlue/10 rounded-bl-[100px] -z-10 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="w-20 h-20 bg-white shadow-md text-brandBlue rounded-2xl flex items-center justify-center mb-8 border border-gray-100 group-hover:rotate-12 transition-transform duration-500">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
              </div>
              <h3 className="text-4xl font-black mb-5 text-gray-900 group-hover:text-brandBlue transition-colors">Our Vision</h3>
              <p className="text-gray-600 text-lg leading-relaxed font-medium">To emerge as the premier center of excellence in Cybersecurity and Artificial Intelligence in Bangladesh, fostering a generation of ethical innovators equipped to tackle global technological challenges and secure the digital frontier.</p>
            </div>
          </FadeIn>

          <FadeIn delay={300} direction="up">
            <div className="group bg-white/40 backdrop-blur-3xl p-12 rounded-[3rem] border border-white shadow-[0_20px_60px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_80px_rgba(139,92,246,0.15)] hover:-translate-y-3 transition-all duration-500 h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brandPurple/10 rounded-bl-[100px] -z-10 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="w-20 h-20 bg-white shadow-md text-brandPurple rounded-2xl flex items-center justify-center mb-8 border border-gray-100 group-hover:-rotate-12 transition-transform duration-500">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <h3 className="text-4xl font-black mb-5 text-gray-900 group-hover:text-brandPurple transition-colors">Our Mission</h3>
              <p className="text-gray-600 text-lg leading-relaxed font-medium">To bridge the gap between theoretical knowledge and practical application by providing hands-on training, conducting cutting-edge research, and cultivating a collaborative community of ethical hackers and AI enthusiasts.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ================= PROJECTS GALLERY (Dark Contrast Pop-out) ================= */}
      <section className="py-32 px-6 relative z-20">
        <div className="max-w-6xl mx-auto relative">
          <FadeIn>
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter">Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandBlue to-brandPurple">Projects</span></h2>
              <p className="mt-6 text-xl text-gray-500 font-medium">Innovations crafted by our brilliant members.</p>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="flex justify-center">
              {/* Using a striking Dark card inside the Light theme for dramatic effect */}
              <a href="https://flare-sphere-real-time-hand-trackin.vercel.app" target="_blank" rel="noopener noreferrer" className="group w-full max-w-5xl block bg-gray-950 rounded-[3rem] overflow-hidden hover:-translate-y-4 transition-all duration-700 shadow-[0_30px_60px_rgba(0,0,0,0.15)] hover:shadow-[0_40px_80px_rgba(29,78,216,0.3)]">
                
                <div className="flex flex-col md:flex-row h-full">
                  {/* Left Side: Abstract 3D Canvas feel */}
                  <div className="md:w-1/2 min-h-[300px] md:min-h-full bg-[#050505] relative flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0,transparent_100%)]"></div>
                    <div className="absolute w-64 h-64 bg-brandBlue/30 rounded-full blur-[80px] group-hover:bg-brandPurple/40 group-hover:scale-150 transition-all duration-1000 z-0"></div>
                    
                    {/* Glowing Tech Icon */}
                    <div className="relative z-10 w-32 h-32 border border-white/10 bg-white/5 backdrop-blur-md rounded-[2rem] flex items-center justify-center group-hover:rotate-12 transition-transform duration-700 shadow-2xl">
                      <svg className="w-16 h-16 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                    </div>
                  </div>
                  
                  {/* Right Side: Typography */}
                  <div className="md:w-1/2 p-12 md:p-16 flex flex-col justify-center relative">
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-brandBlue/5 to-transparent pointer-events-none"></div>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 text-white text-xs font-bold tracking-widest rounded-full mb-8 w-max border border-white/10 uppercase">
                      <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_10px_#4ade80] animate-pulse"></span>
                      Live Project
                    </div>
                    <h3 className="text-4xl md:text-5xl font-black mb-4 text-white">Flare Sphere</h3>
                    <p className="text-gray-400 mb-10 text-lg md:text-xl leading-relaxed">Real-time Hand Tracking Application built with modern web technologies, pushing the boundaries of AI integration.</p>
                    
                    <span className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-950 rounded-2xl font-bold hover:bg-gray-100 transition-colors w-max">
                      Launch Application
                      <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </span>
                  </div>
                </div>

              </a>
            </div>
          </FadeIn>
        </div>
      </section>


      {/* ================= CALL TO ACTION ================= */}
      <section id="join-us" className="py-24 px-6 relative overflow-hidden bg-gradient-to-br from-brandBlue to-brandPurple text-white">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
          
          {/* ADDED: Logo Badge here in CTA */}
          <FadeIn>
            <div className="w-32 h-32 relative mb-8 rounded-[2rem] overflow-hidden shadow-2xl bg-white p-3 ring-4 ring-white/20 transform hover:scale-105 transition-transform duration-300">
              <Image 
                src="/AUSTCAIC-logo.jpg" 
                alt="AUSTCAIC Logo" 
                fill 
                className="object-contain"
              />
            </div>
          </FadeIn>

          <FadeIn delay={100}>
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