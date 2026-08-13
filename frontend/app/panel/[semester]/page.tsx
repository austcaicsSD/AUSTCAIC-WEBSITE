"use client";

import React, { useState, use } from "react";
import Image from "next/image";

// ================= OFFICIAL PANEL DATA =================
const officialPanelData = [
  // Top Management
  {
    id: 1,
    name: "Hemayet Hossain Soikat",
    role: "Advisor",
    wing: "",
    semester: "fall-2025",
    image: "/placeholder-user.png",
  },
  {
    id: 2,
    name: "MS Anika bintee Aftab",
    role: "Treasurer",
    wing: "",
    semester: "fall-2025",
    image: "/placeholder-user.png",
  },

  // Core Committee
  {
    id: 3,
    name: "Md. Abrar Jahin Sachcha",
    role: "President",
    wing: "",
    semester: "fall-2025",
    image: "/placeholder-user.png",
  },
  {
    id: 4,
    name: "Masiath Ibna Jamil",
    role: "General Secretary",
    wing: "",
    semester: "fall-2025",
    image: "/placeholder-user.png",
  },
  {
    id: 5,
    name: "Md. Iftaker hossain Rafi",
    role: "Vice President",
    wing: "",
    semester: "fall-2025",
    image: "/placeholder-user.png",
  },
  {
    id: 6,
    name: "Sayed Toshik",
    role: "Joint Secretary",
    wing: "",
    semester: "fall-2025",
    image: "/placeholder-user.png",
  },
  {
    id: 7,
    name: "Saobia Islam Tinni",
    role: "Joint Secretary",
    wing: "",
    semester: "fall-2025",
    image: "/placeholder-user.png",
  },
  {
    id: 8,
    name: "Iftekhar Salehin",
    role: "Organizing Secretary",
    wing: "",
    semester: "fall-2025",
    image: "/placeholder-user.png",
  },

  // Executive Directors
  {
    id: 9,
    name: "Partha Sharma Ratul",
    role: "Executive Director",
    wing: "Cybersecurity Wing",
    semester: "fall-2025",
    image: "/placeholder-user.png",
  },
  {
    id: 10,
    name: "Arhan",
    role: "Executive Director",
    wing: "AI & ML Wing",
    semester: "fall-2025",
    image: "/placeholder-user.png",
  },
  {
    id: 11,
    name: "Redowan Imran Sarkar",
    role: "Executive Director",
    wing: "CTF & AI Hackathon Wing",
    semester: "fall-2025",
    image: "/placeholder-user.png",
  },
  {
    id: 12,
    name: "Shanti",
    role: "Executive Director",
    wing: "Academic & Research Team",
    semester: "fall-2025",
    image: "/placeholder-user.png",
  },
  {
    id: 13,
    name: "Md Tariqul Islam Rafi",
    role: "Executive Director",
    wing: "Event & Operation",
    semester: "fall-2025",
    image: "/placeholder-user.png",
  },
  {
    id: 14,
    name: "Nuren Tasnin",
    role: "Executive Director",
    wing: "Office & Finance",
    semester: "fall-2025",
    image: "/placeholder-user.png",
  },
  {
    id: 15,
    name: "Shaila Islam",
    role: "Executive Director",
    wing: "Public Relation & Sponsorship",
    semester: "fall-2025",
    image: "/placeholder-user.png",
  },
  {
    id: 16,
    name: "Sumona Islam Zerin",
    role: "Executive Director",
    wing: "Technical Content & Media",
    semester: "fall-2025",
    image: "/placeholder-user.png",
  },
  {
    id: 17,
    name: "Prionty Saha",
    role: "Executive Director",
    wing: "Software Development",
    semester: "fall-2025",
    image: "/placeholder-user.png",
  },

  // Associate Directors
  {
    id: 18,
    name: "Fahim",
    role: "Associate Director",
    wing: "Cybersecurity Wing",
    semester: "fall-2025",
    image: "/placeholder-user.png",
  },
  {
    id: 19,
    name: "Maruf",
    role: "Associate Director",
    wing: "AI & ML Wing",
    semester: "fall-2025",
    image: "/placeholder-user.png",
  },
  {
    id: 20,
    name: "Shakhawat Hossain Shoaib",
    role: "Associate Director",
    wing: "CTF & AI Hackathon Wing",
    semester: "fall-2025",
    image: "/placeholder-user.png",
  },
  {
    id: 21,
    name: "Md. Shariful Haque",
    role: "Associate Director",
    wing: "Event & Operation",
    semester: "fall-2025",
    image: "/placeholder-user.png",
  },
  {
    id: 22,
    name: "Arowen Hossen Majumder",
    role: "Associate Director",
    wing: "Office & Finance",
    semester: "fall-2025",
    image: "/placeholder-user.png",
  },
  {
    id: 23,
    name: "Ahnaf Propat",
    role: "Associate Director",
    wing: "Public Relation & Sponsorship",
    semester: "fall-2025",
    image: "/placeholder-user.png",
  },
  {
    id: 24,
    name: "Maimoona",
    role: "Associate Director",
    wing: "Technical Content & Media",
    semester: "fall-2025",
    image: "/placeholder-user.png",
  },
  {
    id: 25,
    name: "Quazi Zarin Subah",
    role: "Associate Director",
    wing: "Software Development",
    semester: "fall-2025",
    image: "/placeholder-user.png",
  },
  {
    id: 26,
    name: "Samia Haque",
    role: "Associate Director",
    wing: "Creative design & Production",
    semester: "fall-2025",
    image: "/placeholder-user.png",
  },

  // ================= NEW OPTIONS =================
  
  {
    id: 27,
    name: "To Be Announced",
    role: "Associate Executive",
    wing: "TBA",
    semester: "fall-2025",
    image: "/placeholder-user.png",
  },
  {
    id: 28,
    name: "To Be Announced",
    role: "Sub Executive",
    wing: "TBA",
    semester: "fall-2025",
    image: "/placeholder-user.png",
  },
];

export default function SemesterPanelPage({
  params,
}: {
  params: Promise<{ semester: string }>;
}) {
  
  const resolvedParams = use(params);
  const semesterSlug = resolvedParams.semester;

  // Modal State Control
  const [selectedMember, setSelectedMember] = useState<any | null>(null);

  const formattedTitle = semesterSlug
    ? semesterSlug.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())
    : "Governing Panel";

  const semesterExecutives = officialPanelData.filter(
    (member) => member.semester === semesterSlug
  );

  const groupedMembers = semesterExecutives.reduce(
    (groups: any, member: any) => {
      const role = member.role || "Executive Member";
      if (!groups[role]) {
        groups[role] = [];
      }
      groups[role].push(member);
      return groups;
    },
    {}
  );

  // ================= ROLE ORDER =================

  const roleOrder = [
    "Advisor",
    "Treasurer",
    "President",
    "Vice President",
    "General Secretary",
    "Joint Secretary",
    "Organizing Secretary",
    "Executive Director",
    "Associate Director",
    "Associate Executive",
    "Sub Executive",
  ];

  const sortedRoles = Object.keys(groupedMembers).sort((a, b) => {
    const indexA = roleOrder.indexOf(a);
    const indexB = roleOrder.indexOf(b);
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return 0;
  });

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-blue-500/30 overflow-hidden">
      {/* Background Glows */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-purple-400/10 rounded-full blur-[150px]"></div>
      </div>

      {/* HEADER SECTION */}
      <div className="relative z-10 pt-16 pb-12 px-4 md:px-8 max-w-7xl mx-auto flex flex-col items-center text-center animate-fade-in-up">
        <div className="px-5 py-2 rounded-full border border-blue-200 bg-blue-50 text-blue-600 text-xs md:text-sm font-bold tracking-widest uppercase mb-6 shadow-sm">
          AUSTCAIC Leadership
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4 tracking-tighter drop-shadow-sm">
          {formattedTitle}
        </h1>
        <p className="text-gray-500 text-base md:text-lg font-medium max-w-2xl">
          Discover the brilliant minds and dedicated leaders driving innovation,
          research, and technical excellence in our club.
        </p>
      </div>

      {/* STICKY ROLE NAVIGATION */}
      {sortedRoles.length > 0 && (
        <div
          className="sticky top-[64px] sm:top-[80px] z-30 w-full bg-white/70 backdrop-blur-xl border-y border-gray-200/60 shadow-sm mb-12 animate-fade-in-up"
          style={{ animationDelay: "200ms" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 overflow-x-auto py-4 no-scrollbar scroll-smooth">
              <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mr-2 whitespace-nowrap">
                Jump to:
              </span>
              {sortedRoles.map((roleName) => (
                <a
                  key={`nav-${roleName}`}
                  href={`#${roleName.replace(/\s+/g, "-").toLowerCase()}`}
                  className="whitespace-nowrap px-4 py-2 rounded-full bg-gray-100 hover:bg-blue-600 text-gray-600 hover:text-white text-sm font-bold transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  {roleName}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pb-28">
        {sortedRoles.length > 0 ? (
          sortedRoles.map((roleName, sectionIndex) => (
            <section
              key={roleName}
              id={roleName.replace(/\s+/g, "-").toLowerCase()}
              className="scroll-mt-36 mb-24 animate-fade-in-up"
              style={{ animationDelay: `${sectionIndex * 150}ms` }}
            >
              {/* SECTION HEADER */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b-2 border-gray-100 pb-4 mb-10 gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-10 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                  <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
                    {roleName}s
                  </h2>
                </div>
                <div className="px-4 py-1.5 bg-gray-100 text-gray-500 font-bold text-sm rounded-full w-fit">
                  {groupedMembers[roleName].length} Member
                  {groupedMembers[roleName].length > 1 ? "s" : ""}
                </div>
              </div>

              {/* PROFILE CARDS GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                {groupedMembers[roleName].map((member: any) => (
                  <div
                    key={member.id}
                    onClick={() => setSelectedMember(member)}
                    className="group relative w-full h-[420px] rounded-[2rem] overflow-hidden bg-white border border-gray-200 transition-all duration-500 hover:border-blue-300 hover:shadow-[0_20px_50px_-12px_rgba(37,99,235,0.2)] hover:-translate-y-2 cursor-pointer"
                  >
                    {/* View Details Hover Text/Icon */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 backdrop-blur rounded-full p-2 text-blue-600 shadow-sm z-30 flex items-center justify-center">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </div>

                    {/* Abstract Background Pattern */}
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white opacity-100"></div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-[80px] group-hover:bg-purple-100 transition-colors duration-700"></div>

                    {/* Top Badges */}
                    <div className="absolute top-5 left-5 right-5 z-20 flex justify-between items-start">
                      <div className="w-12 h-12 rounded-xl overflow-hidden border border-gray-100 bg-white/80 backdrop-blur-md shadow-sm p-1.5 transition-transform duration-300 group-hover:scale-110">
                        <Image
                          src="/AUSTCAIC-logo.jpg"
                          alt="Logo"
                          fill
                          className="object-contain"
                        />
                      </div>

                      {member.wing && (
                        <div className="max-w-[60%] px-3 py-1.5 bg-white/90 backdrop-blur-md border border-gray-100 rounded-xl shadow-sm">
                          <span className="block text-[9px] font-black text-blue-600 uppercase tracking-widest leading-tight text-right">
                            {member.wing}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Person Image */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[80%] z-10 flex items-end justify-center">
                      <div className="relative w-[90%] h-full">
                        <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent z-10 transition-all duration-500 group-hover:h-[60%]"></div>
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-contain object-bottom drop-shadow-2xl transition-transform duration-700 group-hover:scale-110 group-hover:-translate-y-2"
                        />
                      </div>
                    </div>

                    {/* Member Info */}
                    <div className="absolute bottom-0 left-0 w-full p-6 z-30 transition-transform duration-500">
                      <h3 className="text-2xl font-black text-white leading-tight mb-1 drop-shadow-md">
                        {member.name}
                      </h3>
                      <p className="text-blue-400 font-bold text-xs tracking-widest uppercase drop-shadow-sm">
                        {member.role}
                      </p>
                      <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mt-3 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                        View Details{" "}
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          ></path>
                        </svg>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-4 border border-dashed border-gray-200 rounded-3xl bg-white/50 animate-fade-in-up">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Panel Not Found
            </h3>
            <p className="text-gray-500 font-medium">
              The panel members are currently being updated.
            </p>
          </div>
        )}
      </div>

      {/* ================= LIGHT THEME MODAL ================= */}
      {selectedMember && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-fade-in-up"
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 z-50 p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition-all"
            >
              <svg
                className="w-5 h-5"
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

            {/* Left Side: Image */}
            <div className="relative w-full md:w-5/12 h-64 md:h-auto bg-gradient-to-br from-blue-50 to-purple-50 flex items-end justify-center overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-100/50 to-transparent"></div>
              <Image
                src={selectedMember.image}
                alt={selectedMember.name}
                fill
                className="relative z-10 object-contain object-bottom drop-shadow-xl"
              />
            </div>

            {/* Right Side: Details */}
            <div className="w-full md:w-7/12 p-8 md:p-10 flex flex-col justify-center">
              <div className="w-max px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest mb-6">
                AUSTCAIC Panel
              </div>

              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 leading-tight">
                {selectedMember.name}
              </h2>

              <p className="text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-bold mb-6">
                {selectedMember.role}
              </p>

              <div className="w-full h-[1px] bg-gray-100 mb-6"></div>

              <div className="space-y-4">
                {selectedMember.wing && (
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                    <p className="text-sm md:text-base">
                      <strong className="text-gray-900">Wing:</strong>{" "}
                      {selectedMember.wing}
                    </p>
                  </div>
                )}
                <div className="flex items-center gap-3 text-gray-600">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <p className="text-sm md:text-base">
                    <strong className="text-gray-900">Semester:</strong>{" "}
                    <span className="capitalize">
                      {selectedMember.semester.replace("-", " ")}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        @keyframes slideUpFade { from { opacity: 0; transform: translateY(30px); filter: blur(5px); } to { opacity: 1; transform: translateY(0); filter: blur(0); } }
        .animate-fade-in-up { animation: slideUpFade 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
      `,
        }}
      />
    </main>
  );
}
