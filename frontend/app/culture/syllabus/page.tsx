"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// ================= 1. SYLLABUS DATA (PRESERVED) =================
const syllabusData = {
  cyber: [
    { week: "Class 01", date: "17/07/2026", title: "Introduction", icon: "dragon", topics: ["Introduction to Cyber and CTF platforms & challenge types", "Challenge Categories", "CTF lab setup", "CIA Triad & security domains", "OSI & TCP/IP models", "Linux CLI & permissions"], outcomes: ["Understand CTF workflow", "Navigate CTF platforms", "Solve beginner challenges", "Explain core security concepts", "Understand network fundamentals", "Use Linux for security tasks"], tools: ["Kali Linux", "PicoCTF", "OverTheWire", "Linux", "File permissions"] },
    { week: "Class 02", date: "24/07/2026", title: "OSINT", icon: "search", topics: ["Google Dorking", "WHOIS", "Username Enumeration", "Image Metadata", "Reverse Image Search", "Wayback Machine"], outcomes: ["Gather public information", "Investigate digital identities", "Analyze metadata", "Verify information sources", "Track digital footprints", "Solve OSINT challenges"], tools: ["Google Dorking", "whois", "Sherlock", "ExifTool", "Google Lens", "OSINT CTF"] },
    { week: "Class 03", date: "31/07/2026", title: "Recon and Enumeration", icon: "target", topics: ["Passive Recon", "Active Recon", "Host Discovery", "Service Enumeration", "NSE Scripts", "SMB Enumeration"], outcomes: ["Perform passive reconnaissance", "Scan target networks", "Identify running services", "Enumerate systems", "Map attack surface", "Document findings"], tools: ["Nmap", "dig", "whois", "enum4linux", "Metasploitable", "Enumeration Lab"] },
    { week: "Class 04", date: "21/08/2026", title: "Cryptography", icon: "lock", topics: ["Encoding techniques", "Classical ciphers", "Modern cryptography", "Hashing concepts", "Password cracking", "Crypto CTF challenges"], outcomes: ["Understand Encoding, Encryption & Hashing", "Differentiate Encoding vs Hashing", "Learn core cryptography concepts", "Understand cryptography basics", "Apply encoding & hashing techniques", "Solve Crypto CTF challenges"], tools: ["CyberChef", "dCode", "Hashcat", "John", "CrackStation", "Crypto CTF"] },
    { week: "Class 05", date: "04/09/2026", title: "Vulnerability Assessment", icon: "bug", topics: ["Vulnerability lifecycle", "CVE & CVSS", "Vulnerability scanning", "Risk assessment", "Exploit validation", "Security reporting"], outcomes: ["Understand vulnerabilities", "Run vulnerability scans", "Analyze scan results", "Prioritize risks", "Map known exploits", "Write assessment reports"], tools: ["OpenVAS", "Nessus", "Searchsploit", "Exploit-DB", "Nmap scripts"] },
    { week: "Class 06", date: "11/09/2026", title: "Steganography & Digital Forensics", icon: "fingerprint", topics: ["Steganography basics", "File metadata", "File carving", "Digital forensics", "PCAP analysis", "Forensic CTF challenges"], outcomes: ["Detect hidden data in files", "Extract embedded information", "Recover deleted files", "Analyze network captures", "Examine digital evidence", "Solve forensic CTF challenges"], tools: ["Steghide", "Binwalk", "zsteg", "Autopsy", "Wireshark", "CTF Labs"] },
    { week: "Class 07", date: "18/09/2026", title: "Web Exploitation", icon: "web", topics: ["SQL Injection", "Cross-Site Scripting (XSS)", "File Upload Exploitation", "HTTP protocol", "OWASP Top 10", "Burp Suite fundamentals"], outcomes: ["Analyze HTTP requests", "Find web vulnerabilities", "Assess web security", "Exploit web challenges", "Capture flags", "Chain vulnerabilities"], tools: ["sqlmap", "XSStrike", "Web CTF", "Burp Suite", "gobuster", "ffuf"] },
    { week: "Class 08", date: "25/09/2026", title: "System Hacking", icon: "hacker", topics: ["Exploitation fundamentals", "Metasploit Framework", "Password attacks", "Privilege escalation", "Persistence techniques", "Post-exploitation"], outcomes: ["Understand exploitation", "Run basic exploits", "Perform password attacks", "Find privilege escalation opportunities", "Understand persistence techniques", "Learn post-exploitation methods"], tools: ["Metasploit", "msfvenom", "Hydra", "linpeas"] }
  ],
  aiml: [
    { week: "Class 01", date: "18/07/2026", title: "Python for Machine Learning", icon: "code", topics: ["Intro to AI & ML", "Intro to Python & Fundamentals", "Variables, Input/Output, Operators", "Data Structures: Lists, Tuples, Dicts, Sets", "Conditionals, Loops & Functions", "Exercise: Simple Calculator"], outcomes: ["Understand Python basics", "Write Python programs using core concepts", "Use data structures and control flow", "Build a simple calculator"], tools: ["Jupyter Notebook", "Calculator Exercise"] },
    { week: "Class 02", date: "25/07/2026", title: "EDA & Preprocessing", icon: "chart", topics: ["Why Preprocessing is Important", "Understanding Datasets", "EDA & Data Visualization", "Handling Missing Values & Duplicates", "Feature Scaling & Encoding", "How Data Powers ML"], outcomes: ["Understand datasets and components", "Clean and prepare data", "Visualize and explore data", "Understand how data powers models"], tools: ["NumPy", "Pandas", "Matplotlib", "Seaborn", "Scikit-Learn"] },
    { week: "Class 03", date: "02/08/2026", title: "Machine Learning Fundamentals", icon: "brain", topics: ["Supervised vs Unsupervised, Reg vs Class", "ML Pipeline (Train/Test, Evaluate)", "Algorithms: Linear Reg, Log Reg, Decision Tree, Random Forest, KNN", "Evaluation: MAE, RMSE, R² Score, Accuracy, Precision, Recall", "Overfitting vs Underfitting"], outcomes: ["Understand core machine learning concepts", "Train and evaluate basic ML models", "Compare algorithms for different tasks", "Understand model performance"], tools: ["Scikit-Learn (ML Models)", "Jupyter Notebook"] },
    { week: "Class 04", date: "22/08/2026", title: "Advanced Machine Learning", icon: "nodes", topics: ["Ensemble Learning & XGBoost", "Hyperparameter Tuning", "Feature Importance & Selection", "PCA", "Unsupervised Learning (Clustering, K-Means)", "Intro to Reinforcement Learning"], outcomes: ["Improve model performance", "Tune models using hyperparameters", "Reduce dimensionality and select features", "Understand clustering and RL basics"], tools: ["XGBoost", "Scikit-Learn", "PCA", "K-Means"] },
    { week: "Class 05", date: "05/09/2026", title: "Intro to Deep Learning", icon: "network", topics: ["Why Deep Learning? & ANN", "Perceptron, Neurons, Layers & Weights", "Forward Pass, Loss Function", "Gradient Descent & Backpropagation", "Epochs, Batch Size & Learning Rate"], outcomes: ["Understand how neural networks work", "Know the training process of an ANN", "Understand key DL hyperparameters"], tools: ["PyTorch", "Jupyter Notebook"] },
    { week: "Class 06", date: "12/09/2026", title: "Deep Learning Fundamentals", icon: "chip", topics: ["Challenges in DL (Overfitting, Dropout)", "Improving Model Performance", "CNN & RNN Introduction", "Future Roadmap: LSTM, Transformers, Transfer Learning", "NLP, Computer Vision & Generative AI"], outcomes: ["Handle overfitting and improve models", "Gain an overview of CNN and RNN", "Explore future deep learning technologies"], tools: ["PyTorch", "Jupyter Notebook"] }
  ],
  research: [
    { week: "Class 01", date: "17/07/2026", title: "Foundations of Research", icon: "search", topics: ["What is Research? & Why Research Matters", "Types of Research & Research Ethics", "Common Misconceptions", "Conference vs. Journal Papers", "Peer Review & Publication Lifecycle", "Identifying Predatory Venues"], outcomes: ["Understand what research is and why it matters", "Identify different types of research", "Uphold research ethics", "Differentiate journals from conferences", "Recognize predatory venues"], tools: ["Google Scholar", "Predatory Checklists", "IEEE", "Springer", "Elsevier"] },
    { week: "Class 02", date: "24/07/2026", title: "Literature Review & Tools", icon: "book", topics: ["Searching for papers efficiently", "Reading systematically & Paper structure", "Taking notes while reading", "Organizing literature", "Scholarcy, Consensus, Elicit, Connected Papers", "Zotero / Mendeley"], outcomes: ["Search and locate relevant literature efficiently", "Read and break down a paper's structure", "Take structured notes", "Use AI-assisted tools", "Manage references systematically"], tools: ["Google Scholar", "Zotero / Mendeley", "Scholarcy / Consensus", "Connected Papers"] },
    { week: "Class 03", date: "21/08/2026", title: "Data Extraction & Research Gaps", icon: "data", topics: ["Extracting key information from papers", "Comparing different studies & Tables", "Synthesizing findings", "What is a Literature Gap?", "How to identify & validate opportunities", "Real-world examples"], outcomes: ["Extract key data points from papers", "Build comparison tables", "Synthesize findings across literature", "Identify and validate genuine research gaps"], tools: ["Comparison Templates", "Google Sheets", "Zotero Annotations"] },
    { week: "Class 04", date: "28/08/2026", title: "Methodology, Workflow & ML", icon: "rocket", topics: ["Formulating a research question", "Choosing a methodology", "Qualitative vs. Quantitative research", "End-to-end research logs", "Reading ML papers & benchmarks", "Reproducing results & Mini Review"], outcomes: ["Formulate a clear research question", "Choose an appropriate methodology", "Manage an end-to-end workflow", "Apply skills to ML papers", "Present findings"], tools: ["Notion / Docs", "GitHub", "Kaggle / ML Docs"] }
  ]
};

// ================= 2. ICONS =================
type WingKey = keyof typeof syllabusData;

const IconSvg = ({ name, className }: { name: string, className?: string }) => {
  const icons: Record<string, JSX.Element> = {
    dragon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 14a4 4 0 110-8 4 4 0 010 8z" />,
    search: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />,
    target: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 22a10 10 0 100-20 10 10 0 000 20zM12 16a4 4 0 100-8 4 4 0 000 8zM12 9v2m0 4v2m-3-3h2m4 0h2" />,
    lock: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />,
    bug: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 20a8 8 0 100-16 8 8 0 000 16zm0-10v4m0 4h.01M8 10l2 2m4 0l2-2" />,
    fingerprint: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />,
    web: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />,
    hacker: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
    code: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />,
    chart: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />,
    brain: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
    nodes: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />,
    network: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />,
    chip: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />,
    book: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477-4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />,
    data: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />,
    rocket: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
  };

  return <svg className={className || "w-6 h-6"} fill="none" stroke="currentColor" viewBox="0 0 24 24">{icons[name] || icons.target}</svg>;
};

// ================= 3. MAIN COMPONENT =================
export default function UltimateSyllabus() {
  const [view, setView] = useState<'landing' | WingKey>('landing');
  const [activeWeek, setActiveWeek] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [view]);

  // View 1: The Dark, Glowing Launch Landing Page
  if (view === 'landing') {
    return (
      <main className="min-h-screen bg-[#050505] font-sans text-white overflow-hidden relative">
        
        {/* Animated Background Grid & Orbs */}
        <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[120px] mix-blend-screen animate-blob pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] mix-blend-screen animate-blob animation-delay-4000 pointer-events-none"></div>

        {/* Content Container */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 md:py-24 flex flex-col items-center">
          
          {/* Logo & Launch Badge */}
          <div className="flex flex-col items-center mb-10 animate-fade-in-up">
            <div className="w-24 h-24 relative mb-8 rounded-[1.5rem] overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.1)] bg-black p-2 border border-white/10 group cursor-pointer hover:scale-105 transition-transform duration-500">
              <Image src="/AUSTCAIC-logo.jpg" alt="AUSTCAIC Logo" fill sizes="96px" className="object-contain" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[1.5rem] pointer-events-none"></div>
            </div>
            
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-6 shadow-xl">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500 shadow-[0_0_10px_#3b82f6]"></span>
              </span>
              <span className="text-xs md:text-sm font-bold tracking-widest uppercase text-gray-200">We are launching a culture</span>
            </div>

            <h1 className="text-5xl md:text-[5.5rem] font-black text-center tracking-tighter mb-6 leading-none">
              HANDS ON <br className="md:hidden" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-shimmer" style={{ backgroundSize: '200% auto' }}>WEEKENDS.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 text-center max-w-2xl font-medium leading-relaxed">
              Explore the most rigorous, hands-on, and industry-focused curriculum. Choose your domain and start training.
            </p>
          </div>

          {/* EXCLUSIVE MEMBER BANNER (Premium Security Pass style) */}
          <div className="w-full max-w-3xl relative p-[1px] rounded-2xl mb-20 animate-fade-in-up group" style={{ animationDelay: '100ms' }}>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/50 via-red-500/50 to-amber-500/50 rounded-2xl blur-sm opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative w-full h-full bg-[#0a0a0a] border border-amber-500/30 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 backdrop-blur-xl">
              <div className="flex items-center gap-5 text-left">
                <div className="w-14 h-14 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                  <svg className="w-7 h-7 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                </div>
                <div>
                  <h3 className="text-amber-400 font-black text-lg md:text-xl uppercase tracking-wider drop-shadow-sm">Exclusive Access</h3>
                  <p className="text-amber-200/70 text-sm md:text-base font-medium mt-1">This culture and syllabus is strictly reserved for verified AUSTCAIC General Members.</p>
                </div>
              </div>
              <Link href="/register" className="shrink-0 w-full sm:w-auto text-center px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-black uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(245,158,11,0.6)]">
                Join Club Now
              </Link>
            </div>
          </div>

          {/* 3 DOMAINS CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            
            {/* Cyber Card */}
            <button onClick={() => { setView('cyber'); setActiveWeek(0); }} className="group relative text-left bg-[#0f0f11] border border-white/5 rounded-3xl p-8 overflow-hidden hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(6,182,212,0.15)] hover:border-cyan-500/30 flex flex-col h-full">
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-14 h-14 bg-cyan-950/50 border border-cyan-500/30 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_15px_rgba(6,182,212,0.2)] text-cyan-400">
                <IconSvg name="dragon" className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black mb-3 text-white">Cyber & CTF</h3>
              <p className="text-gray-400 text-sm font-medium mb-8 leading-relaxed flex-grow">Train Like Attackers. Defend Like Professionals. Dive into OSINT, Cryptography, and System Hacking.</p>
              <div className="inline-flex items-center gap-2 text-cyan-400 font-bold text-sm uppercase tracking-widest group-hover:gap-4 transition-all">
                Explore Syllabus <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </div>
            </button>

            {/* AI/ML Card */}
            <button onClick={() => { setView('aiml'); setActiveWeek(0); }} className="group relative text-left bg-[#0f0f11] border border-white/5 rounded-3xl p-8 overflow-hidden hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(168,85,247,0.15)] hover:border-purple-500/30 flex flex-col h-full">
              <div className="absolute inset-0 bg-gradient-to-b from-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-14 h-14 bg-purple-950/50 border border-purple-500/30 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_15px_rgba(168,85,247,0.2)] text-purple-400">
                <IconSvg name="brain" className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black mb-3 text-white">AI & ML Starter</h3>
              <p className="text-gray-400 text-sm font-medium mb-8 leading-relaxed flex-grow">Learn. Build. Think Intelligently. Master Python, EDA, and Neural Networks from scratch.</p>
              <div className="inline-flex items-center gap-2 text-purple-400 font-bold text-sm uppercase tracking-widest group-hover:gap-4 transition-all">
                Explore Syllabus <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </div>
            </button>

            {/* Research Card */}
            <button onClick={() => { setView('research'); setActiveWeek(0); }} className="group relative text-left bg-[#0f0f11] border border-white/5 rounded-3xl p-8 overflow-hidden hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(99,102,241,0.15)] hover:border-indigo-500/30 flex flex-col h-full">
              <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-14 h-14 bg-indigo-950/50 border border-indigo-500/30 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_15px_rgba(99,102,241,0.2)] text-indigo-400">
                <IconSvg name="book" className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black mb-3 text-white">Academic Research</h3>
              <p className="text-gray-400 text-sm font-medium mb-8 leading-relaxed flex-grow">Read. Analyze. Discover. Learn to extract gaps, formulate methodologies, and publish papers.</p>
              <div className="inline-flex items-center gap-2 text-indigo-400 font-bold text-sm uppercase tracking-widest group-hover:gap-4 transition-all">
                Explore Syllabus <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </div>
            </button>

          </div>
        </div>
        
        {/* Custom Keyframes */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes slideUpFade { from { opacity: 0; transform: translateY(40px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
          .animate-fade-in-up { animation: slideUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
          @keyframes blob { 0%, 100% { transform: translate(0px, 0px) scale(1); } 50% { transform: translate(20px, -20px) scale(1.05); } }
          .animate-blob { animation: blob 10s infinite alternate; }
          .animation-delay-4000 { animation-delay: 4s; }
          @keyframes shimmer { 0% { background-position: 200% center; } 100% { background-position: -200% center; } }
          .animate-shimmer { animation: shimmer 4s linear infinite; }
        `}} />
      </main>
    );
  }

  // ================= VIEW 2: THE DETAILED SYLLABUS (PREMIUM DARK THEME) =================
  const activeData = syllabusData[view];
  
  // Theme Configuration mapping for dynamic colors
  const theme = 
    view === "cyber" ? { hex: "text-cyan-400", bg: "bg-cyan-500", border: "border-cyan-500/40", shadow: "shadow-[0_0_30px_rgba(6,182,212,0.3)]", dot: "bg-cyan-400 shadow-[0_0_15px_#22d3ee]", glow: "group-hover:border-cyan-500/50" } : 
    view === "aiml" ? { hex: "text-purple-400", bg: "bg-purple-500", border: "border-purple-500/40", shadow: "shadow-[0_0_30px_rgba(168,85,247,0.3)]", dot: "bg-purple-400 shadow-[0_0_15px_#c084fc]", glow: "group-hover:border-purple-500/50" } : 
    { hex: "text-indigo-400", bg: "bg-indigo-500", border: "border-indigo-500/40", shadow: "shadow-[0_0_30px_rgba(99,102,241,0.3)]", dot: "bg-indigo-400 shadow-[0_0_15px_#818cf8]", glow: "group-hover:border-indigo-500/50" };

  return (
    <main className="relative min-h-screen bg-[#050505] font-sans text-gray-300 pb-20 pt-6 overflow-hidden">
      
      {/* Dark Ambient Background */}
      <div className="fixed inset-0 z-0 opacity-[0.1]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      <div className={`fixed top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full blur-[150px] mix-blend-screen pointer-events-none opacity-20 ${theme.bg}`}></div>

      <div className="relative z-10 max-w-5xl mx-auto px-5 lg:px-10 pt-10">
        
        {/* Detail Header & Back Button */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16 animate-fade-in-up">
          <button onClick={() => setView('landing')} className="inline-flex items-center gap-2 text-gray-400 hover:text-white font-bold px-5 py-2.5 bg-white/5 rounded-xl border border-white/10 transition-all hover:bg-white/10 w-max backdrop-blur-md">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back to Domains
          </button>
          
          <div className="flex items-center gap-5 bg-white/5 px-6 py-3.5 rounded-2xl border border-white/10 backdrop-blur-md">
             <div className={`w-12 h-12 ${theme.border} border bg-white/5 rounded-xl flex items-center justify-center ${theme.shadow} ${theme.hex}`}>
                <IconSvg name={view === 'cyber' ? 'dragon' : view === 'aiml' ? 'brain' : 'book'} className="w-6 h-6" />
             </div>
             <div>
               <h2 className="font-black text-xl md:text-2xl text-white tracking-tight leading-none">
                 {view === 'cyber' ? 'Cyber & CTF' : view === 'aiml' ? 'AI & ML Starter' : 'Academic Research'}
               </h2>
               <p className={`text-[10px] font-black uppercase tracking-widest mt-1.5 ${theme.hex}`}>Hands on Weekends</p>
             </div>
          </div>
        </div>

        {/* Detailed Timeline (Cyberpunk Style) */}
        <div className="relative border-l border-white/10 ml-6 lg:ml-12 pb-10">
          {activeData.map((data, index) => {
            const isActive = activeWeek === index;
            
            return (
              <div key={index} className="relative pl-10 lg:pl-16 mb-8 stagger-animate" style={{ animationDelay: `${index * 100}ms` }}>
                
                {/* Glowing Dot Line Indicator */}
                <div className="absolute -left-[5px] top-8 w-2.5 h-2.5 rounded-full bg-[#050505] flex items-center justify-center z-10 ring-4 ring-[#050505]">
                   <div className={`w-full h-full rounded-full transition-all duration-500 ${isActive ? theme.dot : 'bg-gray-600'}`}></div>
                </div>

                {/* Interactive Card */}
                <div className={`group bg-[#0a0a0a] rounded-3xl border transition-all duration-500 overflow-hidden backdrop-blur-sm ${isActive ? `${theme.border} ${theme.shadow}` : `border-white/5 hover:border-white/20 ${theme.glow}`}`}>
                  
                  {/* Card Header */}
                  <button onClick={() => setActiveWeek(isActive ? null : index)} className="w-full px-6 lg:px-10 py-7 flex items-start lg:items-center justify-between text-left focus:outline-none relative overflow-hidden">
                    
                    {/* Subtle Background Highlight when active */}
                    {isActive && <div className={`absolute inset-0 opacity-10 bg-gradient-to-r from-transparent via-${theme.bg} to-transparent animate-shimmer`} style={{ backgroundSize: '200% auto' }}></div>}

                    <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8 relative z-10">
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 border ${isActive ? `${theme.border} ${theme.bg} bg-opacity-20 ${theme.hex}` : 'border-white/5 bg-white/5 text-gray-500 group-hover:text-gray-300'}`}>
                           <IconSvg name={data.icon} className="w-7 h-7" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{data.week}</span>
                          <span className="text-xs font-bold text-gray-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/5 w-max tracking-wider">{data.date}</span>
                        </div>
                      </div>
                      <h3 className={`font-bold text-xl lg:text-2xl transition-colors duration-300 tracking-tight ${isActive ? "text-white" : "text-gray-300 group-hover:text-white"}`}>
                        {data.title}
                      </h3>
                    </div>
                    <div className={`mt-2 lg:mt-0 ml-4 shrink-0 transition-transform duration-500 relative z-10 ${isActive ? `rotate-180 ${theme.hex}` : "text-gray-600 group-hover:text-gray-300"}`}>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </button>

                  {/* Card Body Content */}
                  <div className={`transition-all duration-700 ease-in-out ${isActive ? "max-h-[1500px] opacity-100 pb-8" : "max-h-0 opacity-0 pb-0"}`}>
                    <div className="px-6 lg:px-10 pt-2">
                      <div className="w-full h-px bg-white/5 mb-8"></div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        {/* Topics */}
                        <div>
                          <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-5 flex items-center gap-2"><IconSvg name="chart" className="w-4 h-4"/> Topics Covered</h4>
                          <ul className="space-y-3">
                            {data.topics.map((topic, tIndex) => (
                              <li key={tIndex} className="flex items-start gap-4 p-2 rounded-lg hover:bg-white/5 transition-colors">
                                <div className={`mt-2 shrink-0 w-1.5 h-1.5 rounded-full ${theme.bg}`}></div>
                                <span className="text-sm md:text-base text-gray-300 font-medium leading-relaxed">{topic}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-10">
                          {/* Outcomes */}
                          {data.outcomes && (
                            <div>
                              <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-5 flex items-center gap-2"><IconSvg name="target" className="w-4 h-4"/> Learning Outcomes</h4>
                              <ul className="space-y-3">
                                {data.outcomes.map((outcome, oIndex) => (
                                  <li key={oIndex} className="flex items-start gap-3 p-2">
                                    <svg className={`mt-1 shrink-0 w-4 h-4 ${theme.hex}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                    <span className="text-sm md:text-base text-gray-400 font-medium">{outcome}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Tools */}
                          {data.tools && (
                            <div className="pt-6 border-t border-white/5">
                               <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2"><IconSvg name="code" className="w-4 h-4"/> Tools & Labs</h4>
                               <div className="flex flex-wrap gap-2.5">
                                 {data.tools.map((tool, tlIndex) => (
                                   <span key={tlIndex} className={`px-3 py-1.5 bg-[#121212] border border-white/10 ${theme.hex} text-xs font-bold rounded-lg shadow-sm hover:border-white/20 transition-colors`}>
                                     {tool}
                                   </span>
                                 ))}
                               </div>
                            </div>
                          )}
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Global CSS for Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideUpFade { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        .stagger-animate { animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        .animate-fade-in-up { animation: slideUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        @keyframes shimmer { 0% { background-position: 200% center; } 100% { background-position: -200% center; } }
        .animate-shimmer { animation: shimmer 4s linear infinite; }
      `}} />
    </main>
  );
}