"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import FadeIn from "@/app/components/FadeIn";

// ================= TYPES & DATA =================
type OfferingData = {
  id: string;
  title: string;
  shortDesc: string;
  icon: React.ReactNode;
  color: string;
  bg: string;
  facilities: string[];
  prerequisites: string[];
};

// ================= CONVERSION / REGISTER PAGE =================
export default function RegisterConversion() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [selectedOffering, setSelectedOffering] = useState<OfferingData | null>(
    null
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedOffering) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedOffering]);

  // The 6 Original Offerings from the Poster with specific facilities
  const offeringsData: OfferingData[] = [
    {
      id: "cyber",
      title: "Cybersecurity Training",
      shortDesc:
        "Master the art of digital defense. Gain hands-on experience with threat analysis, ethical hacking, and secure system design.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          ></path>
        </svg>
      ),
      color: "text-brandBlue",
      bg: "bg-brandBlue/10",
      facilities: [
        "Hands-on ethical hacking and penetration testing labs",
        "Workshops on advanced threat analysis and mitigation",
        "Secure system design and architecture tutorials",
        "Access to premium cybersecurity tools and practice environments",
        "Guidance from experienced Red and Blue team practitioners",
      ],
      prerequisites: [
        "Strong interest and passion for cybersecurity",
        "Willingness to learn and practice consistently",
        "Basic computer knowledge (No prior hacking experience required)",
      ],
    },
    {
      id: "aiml",
      title: "AI & ML Training",
      shortDesc:
        "Dive into the future. Learn to build intelligent applications, understand machine learning algorithms, and train complex models.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          ></path>
        </svg>
      ),
      color: "text-brandPurple",
      bg: "bg-brandPurple/10",
      facilities: [
        "Structured learning path for Artificial Intelligence and Machine Learning",
        "Guided hands-on projects in NLP and Computer Vision",
        "Deep dive into Neural Networks and modern AI frameworks",
        "Access to necessary datasets and model training resources",
        "Preparation for AI/ML industry careers and hackathons",
      ],
      prerequisites: [
        "Basic understanding of Python programming (OOP)",
        "Logical thinking and problem-solving mindset",
        "Eagerness to complete assigned learning tasks",
      ],
    },
    {
      id: "ctf",
      title: "CTF & Hackathon Training",
      shortDesc:
        "Compete and conquer. Sharpen your practical problem-solving skills to dominate national and international tech competitions.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          ></path>
        </svg>
      ),
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      facilities: [
        "Weekly competitive programming and CTF (Capture The Flag) practice sessions",
        "Live problem-solving workshops and strategy discussions",
        "Team building and mentoring for international competitions",
        "Mock hackathons to simulate real-world competitive environments",
      ],
      prerequisites: [
        "Competitive mindset and dedication to improve",
        "Basic knowledge of programming or Linux basics",
        "Ability to work effectively under pressure in a team",
      ],
    },
    {
      id: "projects",
      title: "Industry Projects & Collaboration",
      shortDesc:
        "Bridge the gap between academia and industry. Work alongside experts on real-world tech problems and build your portfolio.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          ></path>
        </svg>
      ),
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      facilities: [
        "Opportunities to collaborate on real-world industry problems",
        "Build a strong, professional portfolio before graduation",
        "Networking opportunities with tech companies and alumni",
        "Experience in Agile development practices and version control",
      ],
      prerequisites: [
        "Foundational knowledge in software development, web development, or AI",
        "Strong team collaboration and communication skills",
        "Commitment to seeing a project through from start to finish",
      ],
    },
    {
      id: "entrepreneurship",
      title: "Technical Entrepreneurship",
      shortDesc:
        "Turn ideas into reality. Discover opportunities and guidance to transform your innovative tech concepts into viable startups.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          ></path>
        </svg>
      ),
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      facilities: [
        "Startup incubation guidance and idea validation workshops",
        "Mentorship on creating effective pitch decks and business models",
        "Networking events with successful founders and potential investors",
        "Guidance on product development and market scaling",
      ],
      prerequisites: [
        "An innovative mindset and problem-solving attitude",
        "Dedication to building a product or service",
        "Willingness to learn the business side of technology",
      ],
    },
    {
      id: "research",
      title: "Academic Research in Cyber & AI",
      shortDesc:
        "Push the boundaries of technology. Engage in dedicated research initiatives and publish findings in respected academic journals.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          ></path>
        </svg>
      ),
      color: "text-indigo-500",
      bg: "bg-indigo-500/10",
      facilities: [
        "Mentorship on research methodology and academic writing",
        "Guidance on literature reviews and identifying research gaps",
        "Support for publishing findings in top-tier conferences and journals",
        "A collaborative and dedicated research environment",
      ],
      prerequisites: [
        "Strong analytical and critical thinking skills",
        "Patience and commitment for extensive reading",
        "Basic knowledge of the chosen research domain",
      ],
    },
  ];

  return (
    <main
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full overflow-hidden bg-[#fafafa] text-gray-900 font-sans flex flex-col"
    >
      <style href="caic-reg" precedence="default">{`
        /* A single lit arc travels the card edge, like a trace on a board. */
        @keyframes caic-reg-beam { to { transform: rotate(360deg); } }

        /* Nodes on the grid waking and settling, offset from each other. */
        @keyframes caic-reg-node {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1); }
        }

        /* The icon redraws its own outline. */
        @keyframes caic-reg-draw {
          0% { stroke-dashoffset: 1; }
          45%, 100% { stroke-dashoffset: 0; }
        }

        @keyframes caic-reg-orb {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(5%, -6%, 0); }
        }
        @keyframes caic-reg-lift {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes caic-reg-pan { to { background-position: 200% center; } }
        @keyframes caic-reg-pop {
          from { opacity: 0; transform: scale(0.97) translateY(8px); }
          to { opacity: 1; transform: none; }
        }
        @keyframes caic-reg-veil { from { opacity: 0; } to { opacity: 1; } }

        .caic-reg-orb {
          will-change: transform;
          animation: caic-reg-orb 28s cubic-bezier(0.37, 0, 0.63, 1) infinite;
        }
        .caic-reg-lift {
          will-change: transform;
          animation: caic-reg-lift 7s cubic-bezier(0.37, 0, 0.63, 1) infinite;
        }
        .caic-reg-node {
          will-change: transform, opacity;
          animation: caic-reg-node 6s cubic-bezier(0.37, 0, 0.63, 1) infinite;
        }
        .caic-reg-pop { animation: caic-reg-pop 0.35s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .caic-reg-veil { animation: caic-reg-veil 0.3s ease-out both; }
        .caic-reg-draw {
          stroke-dasharray: 1;
          animation: caic-reg-draw 8s ease-in-out infinite;
        }
        .caic-reg-pan {
          background-size: 200% auto;
          animation: caic-reg-pan 10s linear infinite;
        }
        .caic-reg-beam {
          background: conic-gradient(
            from 0deg,
            transparent 0deg,
            transparent 316deg,
            rgba(30, 58, 138, 0.55) 338deg,
            rgba(109, 40, 217, 0.9) 352deg,
            transparent 360deg
          );
          will-change: transform;
          animation: caic-reg-beam 8s linear infinite;
        }

        /* The modal body scrolls; give it a brand-tinted bar instead of the OS default. */
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(109, 40, 217, 0.25);
          border-radius: 9999px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(109, 40, 217, 0.45);
        }
      `}</style>

      {/* Background Elements */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 opacity-70 fixed"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.05), transparent 80%)`,
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0 fixed"></div>

      {/* Floating Ambient Orbs */}
      <div className="caic-reg-orb fixed top-1/4 left-1/4 w-[400px] h-[400px] bg-brandBlue/10 rounded-full mix-blend-multiply filter blur-[100px] pointer-events-none z-0"></div>
      <div
        className="caic-reg-orb fixed bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brandPurple/10 rounded-full mix-blend-multiply filter blur-[100px] pointer-events-none z-0"
        style={{ animationDelay: "5s", animationDirection: "reverse" }}
      ></div>

      {/* Nodes waking on the grid - the network this club is about */}
      {[
        { pos: "left-[16%] top-[22%]", delay: "0s" },
        { pos: "left-[31%] top-[64%]", delay: "2.1s" },
        { pos: "right-[22%] top-[34%]", delay: "4.2s" },
        { pos: "right-[13%] top-[72%]", delay: "1.4s" },
        { pos: "left-[9%] top-[48%]", delay: "3.3s" },
      ].map((node) => (
        <span
          key={node.pos}
          className={`caic-reg-node pointer-events-none fixed ${node.pos} z-0 h-1.5 w-1.5 rounded-full bg-brandPurple/50 ring-4 ring-brandPurple/10`}
          style={{ animationDelay: node.delay }}
          aria-hidden="true"
        ></span>
      ))}

      {/* Header Section */}
      <div className="relative z-10 pt-20 pb-12 px-6 text-center max-w-4xl mx-auto">
        <FadeIn>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brandPurple/10 border border-brandPurple/20 text-brandPurple text-xs font-bold rounded-full uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-brandPurple animate-ping"></span>
            Membership Open
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
            What We{" "}
            <span className="caic-reg-pan text-transparent bg-clip-text bg-gradient-to-r from-brandBlue via-brandPurple to-brandBlue">
              Offer?
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-medium leading-relaxed max-w-2xl mx-auto">
            Protecting and leading the future with Cybersecurity and AI.
            Discover the exclusive benefits of becoming a part of AUST&apos;s premier
            tech community.
          </p>
        </FadeIn>
      </div>

      {/* Interactive Offerings Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offeringsData.map((item, index) => (
            <FadeIn key={item.id} delay={index * 90}>
              <button
                onClick={() => setSelectedOffering(item)}
                className="w-full text-left h-full bg-white/70 backdrop-blur-xl border border-white/80 p-8 rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(29,78,216,0.12)] hover:-translate-y-2 transition-[transform,box-shadow] duration-300 ease-out group relative overflow-hidden flex flex-col cursor-pointer ring-1 ring-gray-100 hover:ring-brandBlue/30 focus:outline-none"
              >
                <span
                  className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -translate-x-full skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-[900ms] ease-out group-hover:translate-x-[420%]"
                  aria-hidden="true"
                ></span>
                <div
                  className={`relative w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${item.bg} ${item.color} group-hover:scale-105 group-hover:-rotate-3 transition-transform duration-500`}
                >
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight pr-8">
                  {item.title}
                </h3>
                <p className="text-gray-500 font-medium leading-relaxed text-sm flex-1">
                  {item.shortDesc}
                </p>

                {/* Arrow Icon Indicator */}
                <div className="absolute top-8 right-8 text-gray-300 group-hover:text-brandBlue transition-colors duration-300">
                  <svg
                    className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </div>

                {/* Decorative background shape */}
                <div
                  className={`absolute -bottom-8 -right-8 w-32 h-32 rounded-full blur-[40px] opacity-0 group-hover:opacity-50 transition-opacity duration-500 ${item.bg}`}
                ></div>
              </button>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* ================= DETAILS MODAL ================= */}
      {selectedOffering && (
        <div className="caic-reg-veil fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 bg-gray-950/40 backdrop-blur-md">
          {/* Modal Backdrop Click to Close */}
          <div
            className="absolute inset-0"
            onClick={() => setSelectedOffering(null)}
          ></div>

          {/* Modal Content Window */}
          <div className="caic-reg-pop relative w-full max-w-4xl max-h-[85vh] bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col border border-gray-100">
            {/* Modal Header */}
            <div
              className={`shrink-0 px-8 py-6 flex items-start justify-between border-b border-gray-100 bg-gradient-to-r ${selectedOffering.bg.replace(
                "/10",
                "/5"
              )} to-transparent`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedOffering.bg} ${selectedOffering.color}`}
                >
                  {selectedOffering.icon}
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                    {selectedOffering.title}
                  </h2>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">
                    Program Details
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedOffering(null)}
                className="p-2 bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-900 rounded-full transition-colors focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="overflow-y-auto p-8 space-y-10 custom-scrollbar">
              {/* Facilities Section */}
              <section>
                <div className="inline-flex items-center gap-2 mb-5">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${selectedOffering.bg} ${selectedOffering.color}`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Key Facilities & Benefits
                  </h3>
                </div>
                <ul className="space-y-3">
                  {selectedOffering.facilities.map((facility, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-gray-600 font-medium"
                    >
                      <span
                        className={`mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full ${selectedOffering.bg.replace(
                          "/10",
                          ""
                        )}`}
                      ></span>
                      <span className="leading-relaxed">{facility}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Prerequisites Section */}
              <section>
                <div className="inline-flex items-center gap-2 mb-5">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${selectedOffering.bg} ${selectedOffering.color}`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Prerequisites
                  </h3>
                </div>
                <ul className="space-y-3">
                  {selectedOffering.prerequisites.map((req, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-gray-600 font-medium"
                    >
                      <span
                        className={`mt-1 w-5 h-5 shrink-0 flex items-center justify-center rounded-full ${selectedOffering.bg} ${selectedOffering.color}`}
                      >
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      </span>
                      <span className="leading-relaxed">{req}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Bottom Gradient Fade for scrolling indicator */}
            <div className="shrink-0 h-6 bg-gradient-to-t from-white to-transparent -mt-6 pointer-events-none relative z-10"></div>
          </div>
        </div>
      )}

      {/* Call To Action Box */}
      <div className="relative py-28 px-6 flex items-center justify-center overflow-hidden">
        {/* Dynamic Background Orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brandBlue/10 rounded-full blur-[128px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-brandPurple/10 rounded-full blur-[128px] pointer-events-none"></div>

        {/* Main Card */}
        <div className="group relative z-10 w-full max-w-2xl">
          <div
            className="caic-reg-beam pointer-events-none absolute -inset-px rounded-[2.6rem] opacity-70 blur-[1px] transition-opacity duration-500 ease-out group-hover:opacity-100"
            aria-hidden="true"
          ></div>
          <div className="relative overflow-hidden bg-white/70 backdrop-blur-2xl p-8 sm:p-12 rounded-[2.5rem] border border-white/50 shadow-2xl transition-[transform,box-shadow,border-color] duration-500 ease-out group-hover:-translate-y-1 group-hover:border-white group-hover:shadow-[0_30px_70px_rgba(109,40,217,0.14)]">
          {/* Content Section */}
          <div className="relative text-center space-y-6">
            <div className="caic-reg-lift relative mx-auto w-20 h-20">
              <div className="relative w-full h-full bg-gradient-to-br from-brandBlue to-brandPurple rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform duration-500 group-hover:scale-105">
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  className="caic-reg-draw"
                  pathLength={1}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                ></path>
              </svg>
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-950 tracking-tight">
                Ready to{" "}
                <span className="caic-reg-pan text-transparent bg-clip-text bg-gradient-to-r from-brandBlue via-brandPurple to-brandBlue">
                  Join?
                </span>
              </h1>
              <p className="text-gray-600 text-lg max-w-md mx-auto">
                Complete your official registration via our secure portal to
                become a part of the AUSTCAIC community.
              </p>
            </div>

            {/* Registration Trigger */}
            <div
              className="pt-6"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <span className="relative inline-flex w-full sm:w-auto">
              <a
                href="https://forms.gle/WJj6SaaG4htKJfcH8"
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-brandBlue via-brandPurple to-brandBlue bg-size-[200%_auto] bg-left text-white font-bold text-lg rounded-2xl shadow-xl hover:bg-right hover:shadow-[0_18px_45px_rgba(109,40,217,0.45)] hover:-translate-y-1 active:translate-y-0 active:scale-[0.97] active:duration-100 transition-[transform,box-shadow,background-position] duration-500 ease-out w-full sm:w-auto justify-center"
              >
                <span className="relative z-10">Start Registration</span>
                <svg
                  className={`relative z-10 w-5 h-5 transition-transform duration-300 ${
                    isHovered ? "translate-x-2" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </a>
              </span>
            </div>

            {/* Footer Navigation */}
            <div className="pt-8 border-t border-gray-200/50">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-brandBlue transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  ></path>
                </svg>
                Return to Homepage
              </Link>
            </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
