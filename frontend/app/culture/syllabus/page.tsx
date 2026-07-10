"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// ================= SYLLABUS DATA =================
const syllabusData = {
  cyber: [
    {
      week: "Class 01",
      date: "17/07/2026",
      title: "Introduction to Cyber & CTF",
      topics: [
        "Introduction to Cyber and CTF platforms",
        "Challenge Categories & CTF lab setup",
        "CIA Triad & security domains",
        "OSI & TCP/IP models",
        "Linux CLI & permissions"
      ]
    },
    {
      week: "Class 02",
      date: "24/07/2026",
      title: "OSINT (Open Source Intelligence)",
      topics: [
        "Google Dorking & WHOIS",
        "Username Enumeration & Image Metadata",
        "Reverse Image Search & Wayback Machine",
        "Investigate digital identities & footprints",
        "Verify information sources"
      ]
    },
    {
      week: "Class 03",
      date: "31/07/2026",
      title: "Reconnaissance & Enumeration",
      topics: [
        "Passive vs. Active Reconnaissance",
        "Host Discovery & Service Enumeration",
        "Nmap NSE Scripts & SMB Enumeration",
        "Scan target networks and identify running services",
        "Map attack surface and document findings"
      ]
    },
    {
      week: "Class 04",
      date: "21/08/2026",
      title: "Cryptography",
      topics: [
        "Encoding vs. Encryption vs. Hashing",
        "Classical ciphers & Modern cryptography",
        "Password cracking techniques",
        "Crypto CTF challenges (CyberChef, Hashcat, John)"
      ]
    },
    {
      week: "Class 05",
      date: "04/09/2026",
      title: "Vulnerability Assessment",
      topics: [
        "Vulnerability lifecycle, CVE & CVSS",
        "Vulnerability scanning & Risk assessment",
        "Exploit validation & Security reporting",
        "Analyze scan results and prioritize risks"
      ]
    },
    {
      week: "Class 06",
      date: "18/09/2026",
      title: "Steganography & Digital Forensics",
      topics: [
        "Steganography basics & File metadata",
        "File carving & Digital forensics",
        "PCAP analysis (Network captures)",
        "Detect hidden data and extract embedded info"
      ]
    },
    {
      week: "Class 07",
      date: "09/10/2026",
      title: "Web Exploitation",
      topics: [
        "SQL Injection & Cross-Site Scripting (XSS)",
        "File Upload Exploitation & HTTP protocol",
        "OWASP Top 10 Vulnerabilities",
        "Burp Suite fundamentals & finding web vulns"
      ]
    },
    {
      week: "Class 08",
      date: "25/10/2026",
      title: "System Hacking",
      topics: [
        "Exploitation fundamentals & Metasploit Framework",
        "Password attacks & Privilege escalation",
        "Persistence techniques & Post-exploitation",
        "Run basic exploits and perform attacks"
      ]
    }
  ],
  aiml: [
    {
      week: "Class 01",
      date: "18/07/2026",
      title: "Python for Machine Learning",
      topics: [
        "Intro to AI, ML & Python",
        "Variables, Data Types, Input/Output",
        "Data Structures (Lists, Tuples, Dictionaries, Sets)",
        "Conditionals, Loops & Functions",
        "Exercise: Building a Simple Calculator"
      ]
    },
    {
      week: "Class 02",
      date: "25/07/2026",
      title: "Exploratory Data Analysis & Preprocessing",
      topics: [
        "Understanding Datasets (Features vs Target)",
        "Exploratory Data Analysis (EDA) & Visualization",
        "Handling Missing Values & Duplicates",
        "Feature Scaling & Encoding",
        "How Data Powers ML"
      ]
    },
    {
      week: "Class 03",
      date: "02/08/2026",
      title: "Machine Learning Fundamentals",
      topics: [
        "Supervised vs Unsupervised Learning",
        "Regression vs Classification & The ML Pipeline",
        "Common Algorithms: Linear Reg, Logistic Reg, Decision Tree, Random Forest, KNN",
        "Model Evaluation: MAE, RMSE, Accuracy, Precision, Recall",
        "Overfitting vs Underfitting"
      ]
    },
    {
      week: "Class 04",
      date: "22/08/2026",
      title: "Advanced Machine Learning",
      topics: [
        "Ensemble Learning & Intro to XGBoost",
        "Hyperparameter Tuning",
        "Feature Importance, Selection & PCA",
        "Intro to Unsupervised Learning (Clustering, K-Means)",
        "Introduction to Reinforcement Learning"
      ]
    },
    {
      week: "Class 05",
      date: "05/09/2026",
      title: "Introduction to Deep Learning",
      topics: [
        "Artificial Neural Networks (ANN) & Perceptron",
        "Neurons, Layers, Weights & Activation Functions",
        "Forward Pass & Loss Function",
        "Gradient Descent & Backpropagation",
        "Epochs, Batch Size & Learning Rate"
      ]
    },
    {
      week: "Class 06",
      date: "12/09/2026",
      title: "Deep Learning Fundamentals",
      topics: [
        "Challenges in Deep Learning (Overfitting)",
        "Dropout & Regularization",
        "Intro to CNN (Computer Vision) & RNN",
        "Future Roadmap: LSTM, Transformers, Transfer Learning, NLP"
      ]
    }
  ],
  research: [
    {
      week: "Class 01",
      date: "17/07/2026",
      title: "Foundations of Research",
      topics: [
        "What is Research? & Why it matters",
        "Types of Research & Research Ethics",
        "Conference vs. Journal Papers",
        "Identifying Predatory / Fake Publication Venues"
      ]
    },
    {
      week: "Class 02",
      date: "24/07/2026",
      title: "Literature Review & Research Tools",
      topics: [
        "Searching for Papers Efficiently",
        "Reading a Paper Systematically & Paper Structure",
        "Taking Notes & Organizing Literature",
        "Tools: Google Scholar, Zotero, Mendeley, Scholarcy"
      ]
    },
    {
      week: "Class 03",
      date: "21/08/2026",
      title: "Data Extraction & Research Gaps",
      topics: [
        "Extracting Key Info (Variables, Datasets, Methodologies)",
        "Comparing Studies & Creating Comparison Tables",
        "What is a Literature Gap? & Types of Gaps",
        "Identifying & Validating Research Opportunities"
      ]
    },
    {
      week: "Class 04",
      date: "28/08/2026",
      title: "Methodology, Workflow & ML Integration",
      topics: [
        "Formulating a Research Question & Problem Statement",
        "Choosing a Methodology (Objectives & Scope)",
        "Reading ML Papers, Datasets & Benchmarks",
        "End-to-End Research Process & Reproducing Results"
      ]
    }
  ]
};

type WingKey = keyof typeof syllabusData;

export default function InteractiveSyllabus() {
  const [activeWing, setActiveWing] = useState<WingKey>("cyber");
  const [activeWeek, setActiveWeek] = useState<number | null>(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Trigger re-animation when switching wings
  const handleTabChange = (wing: WingKey) => {
    if (wing === activeWing) return;
    setIsAnimating(true);
    setActiveWing(wing);
    setActiveWeek(0);
    // Remove the animation class momentarily to re-trigger it
    setTimeout(() => setIsAnimating(false), 50);
  };

  const toggleWeek = (index: number) => {
    setActiveWeek(activeWeek === index ? null : index);
  };

  // Dynamic thematic colors
  const activeColor = 
    activeWing === "cyber" ? "bg-blue-600 text-white shadow-blue-500/30" : 
    activeWing === "aiml" ? "bg-purple-600 text-white shadow-purple-500/30" : 
    "bg-indigo-600 text-white shadow-indigo-500/30";

  const activeDotColor = 
    activeWing === "cyber" ? "bg-blue-600 border-blue-100" : 
    activeWing === "aiml" ? "bg-purple-600 border-purple-100" : 
    "bg-indigo-600 border-indigo-100";

  const hoverHighlight = 
    activeWing === "cyber" ? "group-hover:text-blue-600" : 
    activeWing === "aiml" ? "group-hover:text-purple-600" : 
    "group-hover:text-indigo-600";

  return (
    <main className="relative min-h-screen bg-[#fafafa] font-sans selection:bg-blue-100 selection:text-blue-900 pb-20 pt-10 overflow-hidden">
      
      {/* ================= AMBIENT ANIMATED BACKGROUND ================= */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        
        {/* Animated Orbs (CSS injected at bottom) */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-[100px] animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-purple-400/20 rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-indigo-400/20 rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-10 flex flex-col lg:flex-row gap-12 lg:gap-20">
        
        {/* ================= LEFT SIDEBAR (Sticky) ================= */}
        <div className="lg:w-1/3 lg:sticky lg:top-32 lg:h-max">
          
          {/* Hero Intro */}
          <div className="text-center lg:text-left mb-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm mb-6">
              <span className="relative flex h-2.5 w-2.5">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${activeWing === 'cyber' ? 'bg-blue-500' : activeWing === 'aiml' ? 'bg-purple-500' : 'bg-indigo-500'}`}></span>
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${activeWing === 'cyber' ? 'bg-blue-600' : activeWing === 'aiml' ? 'bg-purple-600' : 'bg-indigo-600'}`}></span>
              </span>
              <span className="text-xs font-bold tracking-wide uppercase text-gray-600">Curriculum Live</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-4 leading-tight">
              Roadmap to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Success.</span>
            </h1>
            <p className="text-base text-gray-500 font-medium max-w-xl mx-auto lg:mx-0">
              An interactive, week-by-week curriculum designed to transform beginners into industry-ready professionals.
            </p>
          </div>

          {/* Interactive Segmented Tabs */}
          <div className="flex lg:flex-col p-1.5 bg-gray-200/50 rounded-2xl w-full overflow-x-auto scrollbar-hide border border-gray-200/50 snap-x mb-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            
            <button 
              onClick={() => handleTabChange("cyber")}
              className={`relative overflow-hidden shrink-0 snap-start flex-1 lg:w-full min-w-[130px] py-3.5 px-5 rounded-xl text-sm font-bold transition-all duration-300 ease-out text-center lg:text-left group ${
                activeWing === "cyber" ? "text-gray-900 shadow-[0_2px_10px_rgba(0,0,0,0.06)] bg-white" : "text-gray-500 hover:text-gray-900 hover:bg-gray-100/80"
              }`}
            >
              <span className="relative z-10 flex items-center justify-center lg:justify-start gap-3">
                <svg className={`w-5 h-5 transition-colors ${activeWing === 'cyber' ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                Cyber & CTF
              </span>
            </button>

            <button 
              onClick={() => handleTabChange("aiml")}
              className={`relative overflow-hidden shrink-0 snap-start flex-1 lg:w-full min-w-[130px] py-3.5 px-5 rounded-xl text-sm font-bold transition-all duration-300 ease-out text-center lg:text-left group ${
                activeWing === "aiml" ? "text-gray-900 shadow-[0_2px_10px_rgba(0,0,0,0.06)] bg-white" : "text-gray-500 hover:text-gray-900 hover:bg-gray-100/80"
              }`}
            >
              <span className="relative z-10 flex items-center justify-center lg:justify-start gap-3">
                <svg className={`w-5 h-5 transition-colors ${activeWing === 'aiml' ? 'text-purple-600' : 'text-gray-400 group-hover:text-purple-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                AI & ML Starter
              </span>
            </button>

            <button 
              onClick={() => handleTabChange("research")}
              className={`relative overflow-hidden shrink-0 snap-start flex-1 lg:w-full min-w-[130px] py-3.5 px-5 rounded-xl text-sm font-bold transition-all duration-300 ease-out text-center lg:text-left group ${
                activeWing === "research" ? "text-gray-900 shadow-[0_2px_10px_rgba(0,0,0,0.06)] bg-white" : "text-gray-500 hover:text-gray-900 hover:bg-gray-100/80"
              }`}
            >
              <span className="relative z-10 flex items-center justify-center lg:justify-start gap-3">
                <svg className={`w-5 h-5 transition-colors ${activeWing === 'research' ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477-4.5 1.253"/></svg>
                Academic Research
              </span>
            </button>

          </div>

          <div className="hidden lg:block mt-12 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <Link href="/register" className="inline-flex items-center justify-between w-full px-6 py-4 bg-gray-900 text-white font-bold rounded-xl shadow-lg hover:shadow-[0_10px_25px_rgba(0,0,0,0.2)] hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 group">
              Start Registration
              <svg className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </Link>
          </div>

        </div>

        {/* ================= RIGHT CONTENT (Interactive Timeline) ================= */}
        <div className="lg:w-2/3">
          <div className="relative border-l-2 border-gray-200/80 ml-4 lg:ml-8 pb-4">
            
            {(syllabusData[activeWing] || syllabusData.cyber).map((data, index) => {
              const isActive = activeWeek === index;
              
              return (
                <div 
                  key={`${activeWing}-${index}`} // Forces React to remount & re-animate when wing changes
                  className={`relative pl-8 lg:pl-14 mb-8 ${!isAnimating ? 'stagger-animate' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  
                  {/* Glowing/Pulsing Timeline Dot */}
                  <div className={`absolute -left-[11px] top-7 w-5 h-5 rounded-full border-4 border-[#fafafa] transition-colors duration-500 z-10 ${
                    isActive ? activeDotColor : "bg-gray-300 group-hover:bg-gray-400"
                  }`}>
                    {isActive && (
                      <span className={`absolute inset-0 rounded-full animate-ping opacity-50 ${
                        activeWing === 'cyber' ? 'bg-blue-400' : activeWing === 'aiml' ? 'bg-purple-400' : 'bg-indigo-400'
                      }`}></span>
                    )}
                  </div>

                  {/* Interactive Card */}
                  <div 
                    className={`group bg-white rounded-[1.5rem] border transition-all duration-300 overflow-hidden ${
                      isActive 
                        ? `border-gray-200 shadow-[0_12px_40px_rgb(0,0,0,0.08)] ring-1 ${activeWing === 'cyber' ? 'ring-blue-50' : activeWing === 'aiml' ? 'ring-purple-50' : 'ring-indigo-50'}` 
                        : "border-gray-100 shadow-sm hover:border-gray-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                    }`}
                  >
                    {/* Card Header */}
                    <button 
                      onClick={() => toggleWeek(index)}
                      className="w-full px-6 lg:px-8 py-6 flex items-start lg:items-center justify-between text-left focus:outline-none"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-6">
                        <div className="flex items-center gap-3">
                          <span className={`inline-flex items-center justify-center w-14 h-10 rounded-xl text-sm font-black tracking-wider transition-all duration-300 shadow-sm ${
                            isActive ? activeColor : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
                          }`}>
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <span className="text-xs font-bold text-gray-400 tracking-widest bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                            {data.date}
                          </span>
                        </div>
                        <h3 className={`font-bold text-lg lg:text-xl transition-colors duration-300 ${
                          isActive ? "text-gray-900" : `text-gray-700 ${hoverHighlight}`
                        }`}>
                          {data.title}
                        </h3>
                      </div>
                      
                      <div className={`mt-2 lg:mt-0 ml-4 shrink-0 transition-all duration-500 ${
                        isActive ? `rotate-180 ${activeWing === 'cyber' ? 'text-blue-600' : activeWing === 'aiml' ? 'text-purple-600' : 'text-indigo-600'}` : "text-gray-400 group-hover:text-gray-900 group-hover:-translate-y-1"
                      }`}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </button>

                    {/* Card Body (Topics List) */}
                    <div 
                      className={`transition-all duration-500 ease-in-out ${
                        isActive ? "max-h-[1000px] opacity-100 pb-8" : "max-h-0 opacity-0 pb-0"
                      }`}
                    >
                      <div className="px-6 lg:px-8 pt-1">
                        <div className="w-full h-px bg-gray-100 mb-6"></div>
                        
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
                          {data.topics.map((topic, tIndex) => (
                            <li key={tIndex} className="group/item flex items-start gap-3 bg-gray-50/50 hover:bg-gray-50 p-3.5 rounded-xl border border-transparent hover:border-gray-100 transition-all duration-300 hover:translate-x-1 cursor-default">
                              <div className={`mt-1.5 flex-shrink-0 w-2 h-2 rounded-full transition-transform duration-300 group-hover/item:scale-150 ${
                                activeWing === 'cyber' ? 'bg-blue-400' : 
                                activeWing === 'aiml' ? 'bg-purple-400' : 'bg-indigo-400'
                              }`}></div>
                              <span className="text-sm lg:text-base text-gray-700 font-medium leading-relaxed group-hover/item:text-gray-900 transition-colors">{topic}</span>
                            </li>
                          ))}
                        </ul>

                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          <div className="lg:hidden mt-10 text-center animate-fade-in-up" style={{ animationDelay: '400ms' }}>
             <Link href="/register" className="inline-flex items-center justify-center gap-2 w-full px-8 py-4 bg-gray-900 text-white font-bold text-base rounded-xl shadow-[0_4px_14px_0_rgb(0,0,0,0.2)] active:scale-[0.98] transition-all duration-200">
               Start Registration
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
             </Link>
          </div>

        </div>
      </div>

      {/* Global CSS for Animations & Utilities */}
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
        @keyframes slideUpFade {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .stagger-animate {
            animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            opacity: 0;
        }
        .animate-fade-in-up {
            animation: slideUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            opacity: 0;
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}} />
    </main>
  );
}