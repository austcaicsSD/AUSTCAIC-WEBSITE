"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// ================= 1. SYLLABUS DATA =================
const syllabusData = {
  cyber: [
    { week: "Class 01", date: "17/07/2026, Friday", title: "Introduction", icon: "dragon", topics: ["Introduction to Cyber and CTF platforms & challenge types", "Challenge Categories", "CTF lab setup", "CIA Triad & security domains", "OSI & TCP/IP models", "Linux CLI & permissions"], outcomes: ["Understand CTF workflow", "Navigate CTF platforms", "Solve beginner challenges", "Explain core security concepts", "Understand network fundamentals", "Use Linux for security tasks"], tools: ["Kali Linux", "PicoCTF", "OverTheWire", "Linux", "File permissions"] },
    { week: "Class 02", date: "24/07/2026, Friday", title: "OSINT", icon: "search", topics: ["Google Dorking", "WHOIS", "Username Enumeration", "Image Metadata", "Reverse Image Search", "Wayback Machine"], outcomes: ["Gather public information", "Investigate digital identities", "Analyze metadata", "Verify information sources", "Track digital footprints", "Solve OSINT challenges"], tools: ["Google Dorking", "whois", "Sherlock", "ExifTool", "Google Lens", "OSINT CTF"] },
    { week: "Class 03", date: "31/07/2026, Friday", title: "Recon and Enumeration", icon: "target", topics: ["Passive Recon", "Active Recon", "Host Discovery", "Service Enumeration", "NSE Scripts", "SMB Enumeration"], outcomes: ["Perform passive reconnaissance", "Scan target networks", "Identify running services", "Enumerate systems", "Map attack surface", "Document findings"], tools: ["Nmap", "dig", "whois", "enum4linux", "Metasploitable", "Enumeration Lab"] },
    { week: "Class 04", date: "21/08/2026, Friday", title: "Cryptography", icon: "lock", topics: ["Encoding techniques", "Classical ciphers", "Modern cryptography", "Hashing concepts", "Password cracking", "Crypto CTF challenges"], outcomes: ["Understand Encoding, Encryption & Hashing", "Differentiate Encoding vs Hashing", "Learn core cryptography concepts", "Understand cryptography basics", "Apply encoding & hashing techniques", "Solve Crypto CTF challenges"], tools: ["CyberChef", "dCode", "Hashcat", "John", "CrackStation", "Crypto CTF"] },
    { week: "Class 05", date: "04/09/2026, Friday", title: "Vulnerability Assessment", icon: "bug", topics: ["Vulnerability lifecycle", "CVE & CVSS", "Vulnerability scanning", "Risk assessment", "Exploit validation", "Security reporting"], outcomes: ["Understand vulnerabilities", "Run vulnerability scans", "Analyze scan results", "Prioritize risks", "Map known exploits", "Write assessment reports"], tools: ["OpenVAS", "Nessus", "Searchsploit", "Exploit-DB", "Nmap scripts"] },
    { week: "Class 06", date: "11/09/2026, Friday", title: "Steganography & Digital Forensics", icon: "fingerprint", topics: ["Steganography basics", "File metadata", "File carving", "Digital forensics", "PCAP analysis", "Forensic CTF challenges"], outcomes: ["Detect hidden data in files", "Extract embedded information", "Recover deleted files", "Analyze network captures", "Examine digital evidence", "Solve forensic CTF challenges"], tools: ["Steghide", "Binwalk", "zsteg", "Autopsy", "Wireshark", "CTF Labs"] },
    { week: "Class 07", date: "18/09/2026, Friday", title: "Web Exploitation", icon: "web", topics: ["SQL Injection", "Cross-Site Scripting (XSS)", "File Upload Exploitation", "HTTP protocol", "OWASP Top 10", "Burp Suite fundamentals"], outcomes: ["Analyze HTTP requests", "Find web vulnerabilities", "Assess web security", "Exploit web challenges", "Capture flags", "Chain vulnerabilities"], tools: ["sqlmap", "XSStrike", "Web CTF", "Burp Suite", "gobuster", "ffuf"] },
    { week: "Class 08", date: "25/09/2026, Friday", title: "System Hacking", icon: "hacker", topics: ["Exploitation fundamentals", "Metasploit Framework", "Password attacks", "Privilege escalation", "Persistence techniques", "Post-exploitation"], outcomes: ["Understand exploitation", "Run basic exploits", "Perform password attacks", "Find privilege escalation opportunities", "Understand persistence techniques", "Learn post-exploitation methods"], tools: ["Metasploit", "msfvenom", "Hydra", "linpeas"] },
    { week: "Class 09", date: "02/10/2026, Friday", title: "Grand Finale & Prize Giving", icon: "trophy", topics: ["Top Performers Announcement", "Certificate Distribution", "Career Guideline in Cybersecurity", "Networking & Future Roadmap"], outcomes: ["Receive Recognition & Exclusive Prizes", "Plan Next Career Steps", "Network with Industry Peers"], tools: ["Awards", "Certificates", "AUSTCAIC Swag"] }
  ],
  aiml: [
    { week: "Class 01", date: "18/07/2026, Saturday", title: "Python for Machine Learning", icon: "code", topics: ["Intro to AI & ML", "Intro to Python & Fundamentals", "Variables, Input/Output, Operators", "Data Structures: Lists, Tuples, Dicts, Sets", "Conditionals, Loops & Functions", "Exercise: Simple Calculator"], outcomes: ["Understand Python basics", "Write Python programs using core concepts", "Use data structures and control flow", "Build a simple calculator"], tools: ["Jupyter Notebook", "Calculator Exercise"] },
    { week: "Class 02", date: "25/07/2026, Saturday", title: "EDA & Preprocessing", icon: "chart", topics: ["Why Preprocessing is Important", "Understanding Datasets", "EDA & Data Visualization", "Handling Missing Values & Duplicates", "Feature Scaling & Encoding", "How Data Powers ML"], outcomes: ["Understand datasets and components", "Clean and prepare data", "Visualize and explore data", "Understand how data powers models"], tools: ["NumPy", "Pandas", "Matplotlib", "Seaborn", "Scikit-Learn"] },
    { week: "Class 03", date: "02/08/2026, Sunday", title: "Machine Learning Fundamentals", icon: "brain", topics: ["Supervised vs Unsupervised, Reg vs Class", "ML Pipeline (Train/Test, Evaluate)", "Algorithms: Linear Reg, Log Reg, Decision Tree, Random Forest, KNN", "Evaluation: MAE, RMSE, R² Score, Accuracy, Precision, Recall", "Overfitting vs Underfitting"], outcomes: ["Understand core machine learning concepts", "Train and evaluate basic ML models", "Compare algorithms for different tasks", "Understand model performance"], tools: ["Scikit-Learn", "Jupyter Notebook"] },
    { week: "Class 04", date: "22/08/2026, Saturday", title: "Advanced Machine Learning", icon: "nodes", topics: ["Ensemble Learning & XGBoost", "Hyperparameter Tuning", "Feature Importance & Selection", "PCA", "Unsupervised Learning (Clustering, K-Means)", "Intro to Reinforcement Learning"], outcomes: ["Improve model performance", "Tune models using hyperparameters", "Reduce dimensionality and select features", "Understand clustering and RL basics"], tools: ["XGBoost", "Scikit-Learn", "PCA", "K-Means"] },
    { week: "Class 05", date: "05/09/2026, Saturday", title: "Intro to Deep Learning", icon: "network", topics: ["Why Deep Learning? & ANN", "Perceptron, Neurons, Layers & Weights", "Forward Pass, Loss Function", "Gradient Descent & Backpropagation", "Epochs, Batch Size & Learning Rate"], outcomes: ["Understand how neural networks work", "Know the training process of an ANN", "Understand key DL hyperparameters"], tools: ["PyTorch", "Jupyter Notebook"] },
    { week: "Class 06", date: "12/09/2026, Saturday", title: "Deep Learning Fundamentals", icon: "chip", topics: ["Challenges in DL (Overfitting, Dropout)", "Improving Model Performance", "CNN & RNN Introduction", "Future Roadmap: LSTM, Transformers, Transfer Learning", "NLP, Computer Vision & Generative AI"], outcomes: ["Handle overfitting and improve models", "Gain an overview of CNN and RNN", "Explore future deep learning technologies"], tools: ["PyTorch", "Jupyter Notebook"] },
    { week: "Class 07", date: "19/09/2026, Saturday", title: "Grand Finale & Prize Giving", icon: "trophy", topics: ["Top Performers Announcement", "Certificate Distribution", "Career Guideline in AI & ML", "Networking & Future Roadmap"], outcomes: ["Receive Recognition & Exclusive Prizes", "Plan Next Career Steps", "Network with AI Researchers"], tools: ["Awards", "Certificates", "AUSTCAIC Swag"] }
  ],
  research: [
    { week: "Class 01", date: "17/07/2026, Friday", title: "Foundations of Research", icon: "search", topics: ["What is Research? & Why Research Matters", "Types of Research & Research Ethics", "Common Misconceptions", "Conference vs. Journal Papers", "Peer Review & Publication Lifecycle", "Identifying Predatory Venues"], outcomes: ["Understand what research is and why it matters", "Identify different types of research", "Uphold research ethics", "Differentiate journals from conferences", "Recognize predatory venues"], tools: ["Google Scholar", "IEEE", "Springer", "Elsevier"] },
    { week: "Class 02", date: "24/07/2026, Friday", title: "Literature Review & Tools", icon: "book", topics: ["Searching for papers efficiently", "Reading systematically & Paper structure", "Taking notes while reading", "Organizing literature", "Scholarcy, Consensus, Elicit, Connected Papers", "Zotero / Mendeley"], outcomes: ["Search and locate relevant literature efficiently", "Read and break down a paper's structure", "Take structured notes", "Use AI-assisted tools", "Manage references systematically"], tools: ["Google Scholar", "Zotero", "Mendeley", "Connected Papers"] },
    { week: "Class 03", date: "21/08/2026, Friday", title: "Data Extraction & Research Gaps", icon: "data", topics: ["Extracting key information from papers", "Comparing different studies & Tables", "Synthesizing findings", "What is a Literature Gap?", "How to identify & validate opportunities", "Real-world examples"], outcomes: ["Extract key data points from papers", "Build comparison tables", "Synthesize findings across literature", "Identify and validate genuine research gaps"], tools: ["Comparison Templates", "Google Sheets", "Zotero Annotations"] },
    { week: "Class 04", date: "28/08/2026, Friday", title: "Methodology, Workflow & ML", icon: "rocket", topics: ["Formulating a research question", "Choosing a methodology", "Qualitative vs. Quantitative research", "End-to-end research logs", "Reading ML papers & benchmarks", "Reproducing results & Mini Review"], outcomes: ["Formulate a clear research question", "Choose an appropriate methodology", "Manage an end-to-end workflow", "Apply skills to ML papers", "Present findings"], tools: ["Notion", "GitHub", "Kaggle"] },
    { week: "Class 05", date: "04/09/2026, Friday", title: "Grand Finale & Prize Giving", icon: "trophy", topics: ["Top Performers Announcement", "Certificate Distribution", "Publishing Guidance & Grants", "Networking & Future Roadmap"], outcomes: ["Receive Recognition & Exclusive Prizes", "Plan Your First Publication", "Network with Professors"], tools: ["Awards", "Certificates", "AUSTCAIC Swag"] }
  ]
};

// ================= 2. INTELLIGENT ICON & LOGO MAPPERS =================
type WingKey = keyof typeof syllabusData;

const IconSvg = ({ name, className }: { name: string; className?: string }) => {
  const icons: Record<string, React.ReactNode> = {
    dragon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 14a4 4 0 110-8 4 4 0 010 8z"
      />
    ),
    search: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    ),
    target: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M12 22a10 10 0 100-20 10 10 0 000 20zM12 16a4 4 0 100-8 4 4 0 000 8zM12 9v2m0 4v2m-3-3h2m4 0h2"
      />
    ),
    lock: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    ),
    bug: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M12 20a8 8 0 100-16 8 8 0 000 16zm0-10v4m0 4h.01M8 10l2 2m4 0l2-2"
      />
    ),
    fingerprint: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
      />
    ),
    web: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
      />
    ),
    hacker: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    ),
    code: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
      />
    ),
    chart: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    ),
    brain: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    ),
    nodes: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    ),
    network: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
      />
    ),
    chip: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
      />
    ),
    book: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477-4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      />
    ),
    data: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
      />
    ),
    rocket: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    ),
    calendar: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    ),
    star: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      />
    ),
    trophy: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
      />
    ),
    terminal: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    ),
    sparkles: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    ),
  };
  return (
    <svg
      className={className || "w-6 h-6"}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      {icons[name] || icons.target}
    </svg>
  );
};

const getToolLogoUrl = (toolName: string) => {
  const map: Record<string, string> = {
    "Kali Linux": "kalilinux",
    Linux: "linux",
    Wireshark: "wireshark",
    GitHub: "github",
    Notion: "notion",
    "Jupyter Notebook": "jupyter",
    NumPy: "numpy",
    Pandas: "pandas",
    "Scikit-Learn": "scikitlearn",
    PyTorch: "pytorch",
    Kaggle: "kaggle",
    IEEE: "ieee",
    Zotero: "zotero",
    Mendeley: "mendeley",
    "Google Scholar": "googlescholar",
    Elsevier: "elsevier",
    "Burp Suite": "portswigger",
    Metasploit: "metasploit",
    Python: "python",
    Matplotlib: "python",
    Seaborn: "python",
    Excel: "microsoftexcel",
  };
  return map[toolName]
    ? `https://cdn.simpleicons.org/${map[toolName]}/white`
    : null;
};

const getTopicIcon = (topic: string, fallback: string) => {
  const lower = topic.toLowerCase();
  if (lower.includes("intro") || lower.includes("setup")) return "rocket";
  if (
    lower.includes("recon") ||
    lower.includes("osint") ||
    lower.includes("search") ||
    lower.includes("find")
  )
    return "search";
  if (
    lower.includes("network") ||
    lower.includes("tcp") ||
    lower.includes("osi") ||
    lower.includes("protocol")
  )
    return "network";
  if (
    lower.includes("linux") ||
    lower.includes("cli") ||
    lower.includes("terminal")
  )
    return "terminal";
  if (
    lower.includes("crypto") ||
    lower.includes("hash") ||
    lower.includes("password") ||
    lower.includes("cipher") ||
    lower.includes("security")
  )
    return "lock";
  if (
    lower.includes("vuln") ||
    lower.includes("exploit") ||
    lower.includes("xss") ||
    lower.includes("injection") ||
    lower.includes("bug") ||
    lower.includes("hack")
  )
    return "bug";
  if (
    lower.includes("forensic") ||
    lower.includes("steg") ||
    lower.includes("metadata") ||
    lower.includes("identity")
  )
    return "fingerprint";
  if (lower.includes("web") || lower.includes("http")) return "web";
  if (
    lower.includes("data") ||
    lower.includes("eda") ||
    lower.includes("visual") ||
    lower.includes("scale")
  )
    return "chart";
  if (
    lower.includes("machine learning") ||
    lower.includes("ml ") ||
    lower.includes("model") ||
    lower.includes("algorithm")
  )
    return "brain";
  if (
    lower.includes("deep learning") ||
    lower.includes("neural") ||
    lower.includes("cnn") ||
    lower.includes("rnn") ||
    lower.includes("ann")
  )
    return "nodes";
  if (
    lower.includes("python") ||
    lower.includes("variable") ||
    lower.includes("loop") ||
    lower.includes("function") ||
    lower.includes("code")
  )
    return "code";
  if (
    lower.includes("research") ||
    lower.includes("paper") ||
    lower.includes("literature") ||
    lower.includes("publish") ||
    lower.includes("ethics")
  )
    return "book";
  if (
    lower.includes("prize") ||
    lower.includes("perform") ||
    lower.includes("cert") ||
    lower.includes("award") ||
    lower.includes("career")
  )
    return "trophy";
  return fallback;
};

const getToolFallbackIcon = (tool: string) => {
  const t = tool.toLowerCase();
  if (t.includes("ctf") || t.includes("hack") || t.includes("exploit"))
    return "bug";
  if (t.includes("db") || t.includes("sql") || t.includes("sheet"))
    return "data";
  if (t.includes("cert") || t.includes("award") || t.includes("swag"))
    return "trophy";
  return "terminal";
};

// ================= 3. MAIN COMPONENT =================
export default function UltimateSyllabus() {
  const [view, setView] = useState<"landing" | WingKey>("landing");
  const [activeWeek, setActiveWeek] = useState<number | null>(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Smooth View Transitions
  const handleViewChange = (newView: "landing" | WingKey) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setView(newView);
      if (newView !== "landing") setActiveWeek(0);
      window.scrollTo({ top: 0, behavior: "smooth" });
      setIsTransitioning(false);
    }, 400);
  };

  // View 1: The Dark, Glowing Cyberpunk Landing Page
  if (view === "landing") {
    return (
      <main
        className={`min-h-screen bg-[#020202] font-sans text-white relative selection:bg-cyan-500/30 transition-opacity duration-400 ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Background Isolation Wrapper */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-grid opacity-[0.25] perspective-grid"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#020202_80%)]"></div>
          <div className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] md:w-[700px] md:h-[700px] bg-cyan-600/30 rounded-full blur-[150px] mix-blend-screen animate-blob"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[80vw] h-[80vw] md:w-[700px] md:h-[700px] bg-purple-600/20 rounded-full blur-[150px] mix-blend-screen animate-blob animation-delay-4000"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-16 flex flex-col items-center min-h-screen justify-center">
          {/* Logo & Terminal Badge */}
          <div className="flex flex-col items-center mb-10 w-full animate-fade-in-up">
            <div className="w-20 h-20 md:w-28 md:h-28 relative mb-6 rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(255,255,255,0.1)] bg-black p-3 border border-white/20 group cursor-pointer hover:scale-105 hover:shadow-[0_0_80px_rgba(6,182,212,0.4)] transition-all duration-700">
              <Image
                src="/AUSTCAIC-logo.jpg"
                alt="AUSTCAIC Logo"
                fill
                sizes="(max-width: 768px) 80px, 112px"
                className="object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-scanline pointer-events-none"></div>
            </div>
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-black/50 border border-white/10 backdrop-blur-xl mb-6 shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-hidden">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500 shadow-[0_0_10px_#06b6d4]"></span>
              </span>
              <span className="text-[10px] md:text-xs font-bold tracking-widest text-cyan-50 uppercase animate-typing overflow-hidden whitespace-nowrap border-r-2 border-cyan-400 pr-1">
                We are launching a culture
              </span>
            </div>
            <h1 className="text-[3.5rem] md:text-[6rem] lg:text-[7.5rem] font-black text-center tracking-tighter mb-4 leading-[0.9] drop-shadow-2xl relative">
              <span className="absolute -inset-1 blur-2xl bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 opacity-20 animate-pulse-slow pointer-events-none"></span>
              <span className="relative text-white">HANDS ON</span> <br />
              <span
                className="relative text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 animate-shimmer"
                style={{ backgroundSize: "200% auto" }}
              >
                WEEKENDS
              </span>
            </h1>
            <p className="text-sm md:text-lg lg:text-xl text-gray-400 text-center max-w-2xl font-medium leading-relaxed px-4 text-shadow-sm mt-2">
              Explore the future techs with{" "}
              <span className="text-white font-bold">AUSTCAIC</span>. The most
              rigorous, hands-on, and industry-focused curriculum.
            </p>
          </div>
          {/* HIGHLIGHTS ROW: Schedule & Prizes */}
          <div
            className="flex flex-wrap justify-center gap-3 md:gap-5 w-full max-w-5xl mb-12 animate-fade-in-up"
            style={{ animationDelay: "100ms" }}
          >
            {/* Schedule: Cyber & Research */}
            <div className="flex items-center gap-3 bg-[#0a0a0c]/80 border border-white/10 rounded-2xl px-5 py-3.5 backdrop-blur-xl shadow-lg hover:border-cyan-500/50 hover:bg-white/5 transition-all">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                <IconSvg name="calendar" className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] md:text-xs text-gray-400 font-black uppercase tracking-widest">
                  Cyber & Research
                </span>
                <span className="text-xs md:text-sm font-bold text-white">
                  Every <span className="text-cyan-400">Friday</span>
                </span>
              </div>
            </div>
            {/* Schedule: AI/ML */}
            <div className="flex items-center gap-3 bg-[#0a0a0c]/80 border border-white/10 rounded-2xl px-5 py-3.5 backdrop-blur-xl shadow-lg hover:border-purple-500/50 hover:bg-white/5 transition-all">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                <IconSvg name="calendar" className="w-5 h-5 text-purple-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] md:text-xs text-gray-400 font-black uppercase tracking-widest">
                  AI & ML
                </span>
                <span className="text-xs md:text-sm font-bold text-white">
                  Every <span className="text-purple-400">Saturday</span>
                </span>
              </div>
            </div>
            {/* Prizes Badge */}
            <div className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl px-5 py-3.5 backdrop-blur-xl shadow-[0_0_20px_rgba(245,158,11,0.15)] relative overflow-hidden group cursor-default">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center border border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.4)]">
                <IconSvg name="trophy" className="w-5 h-5 text-amber-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] md:text-xs text-amber-200/70 font-black uppercase tracking-widest">
                  Rewards
                </span>
                <span className="text-xs md:text-sm font-black text-amber-400 tracking-wide drop-shadow-md">
                  Exclusive Prizes for Best Performers
                </span>
              </div>
            </div>
          </div>
          {/* EXCLUSIVE MEMBER BANNER */}
          <div
            className="w-full max-w-3xl relative p-[1px] rounded-2xl md:rounded-3xl mb-16 animate-fade-in-up group"
            style={{ animationDelay: "100ms" }}
          >
            {/* Animated Conic Border Effect */}
            <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(245,158,11,1)_360deg)] rounded-2xl md:rounded-3xl animate-[spin_3s_linear_infinite] opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative w-full h-full bg-[#0a0a0a]/90 rounded-2xl md:rounded-3xl p-5 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-5 backdrop-blur-xl border border-white/5">
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 text-center sm:text-left w-full sm:w-auto">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-amber-500/10 border border-amber-500/30 rounded-full sm:rounded-xl flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(245,158,11,0.2)] animate-pulse-slow">
                  <svg
                    className="w-6 h-6 md:w-7 md:h-7 text-amber-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-amber-400 font-black text-lg md:text-xl uppercase tracking-wider drop-shadow-sm">
                    Exclusive Access
                  </h3>
                  <p className="text-amber-200/70 text-xs md:text-sm font-medium mt-1">
                    This culture and syllabus is strictly reserved for verified
                    AUSTCAIC General Members.
                  </p>
                </div>
              </div>
              <Link
                href="/register"
                className="shrink-0 w-full sm:w-auto text-center px-6 md:px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-black uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all active:scale-95 hover:scale-105"
              >
                Join Club
              </Link>
            </div>
          </div>
          {/* 3 DOMAINS CARDS */}
          <div
            className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6 w-full animate-fade-in-up pb-8"
            style={{ animationDelay: "300ms" }}
          >
            {/* Cyber Card */}
            <div
              className="relative group p-[2px] rounded-2xl overflow-hidden hover:-translate-y-1.5 transition-transform duration-500 cursor-pointer h-full"
              onClick={() => handleViewChange("cyber")}
            >
              <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(6,182,212,1)_360deg)] rounded-2xl animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative h-full bg-[#0a0a0c]/95 backdrop-blur-2xl rounded-[calc(1rem-2px)] p-6 md:p-8 flex flex-col border border-white/5 group-hover:border-transparent transition-colors">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400/50 shadow-[0_0_15px_#06b6d4] opacity-0 group-hover:opacity-100 group-hover:animate-scanline"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="w-12 h-12 bg-cyan-950/50 border border-cyan-500/30 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_15px_rgba(6,182,212,0.2)] text-cyan-400 relative z-10">
                  <IconSvg name="dragon" className="w-6 h-6" />
                </div>
                <h3 className="text-xl md:text-2xl font-black mb-2 text-white relative z-10 tracking-tight">
                  Cyber & CTF
                </h3>
                <p className="text-gray-400 text-xs md:text-sm font-medium mb-6 leading-relaxed flex-grow relative z-10">
                  Train Like Attackers. Defend Like Professionals. Master OSINT,
                  Cryptography, and System Hacking.
                </p>
                <div className="inline-flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-widest group-hover:gap-4 transition-all relative z-10">
                  Explore Syllabus{" "}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
            {/* AI/ML Card */}
            <div
              className="relative group p-[2px] rounded-2xl overflow-hidden hover:-translate-y-1.5 transition-transform duration-500 cursor-pointer h-full"
              onClick={() => handleViewChange("aiml")}
            >
              <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(168,85,247,1)_360deg)] rounded-2xl animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative h-full bg-[#0a0a0c]/95 backdrop-blur-2xl rounded-[calc(1rem-2px)] p-6 md:p-8 flex flex-col border border-white/5 group-hover:border-transparent transition-colors">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-purple-400/50 shadow-[0_0_15px_#a855f7] opacity-0 group-hover:opacity-100 group-hover:animate-scanline"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="w-12 h-12 bg-purple-950/50 border border-purple-500/30 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_15px_rgba(168,85,247,0.2)] text-purple-400 relative z-10">
                  <IconSvg name="brain" className="w-6 h-6" />
                </div>
                <h3 className="text-xl md:text-2xl font-black mb-2 text-white relative z-10 tracking-tight">
                  AI & ML Starter
                </h3>
                <p className="text-gray-400 text-xs md:text-sm font-medium mb-6 leading-relaxed flex-grow relative z-10">
                  Learn. Build. Think Intelligently. Architect the future from
                  Python fundamentals to Deep Neural Networks.
                </p>
                <div className="inline-flex items-center gap-2 text-purple-400 font-bold text-xs uppercase tracking-widest group-hover:gap-4 transition-all relative z-10">
                  Explore Syllabus{" "}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
            {/* Research Card */}
            <div
              className="relative group p-[2px] rounded-2xl overflow-hidden hover:-translate-y-1.5 transition-transform duration-500 cursor-pointer h-full"
              onClick={() => handleViewChange("research")}
            >
              <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(99,102,241,1)_360deg)] rounded-2xl animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative h-full bg-[#0a0a0c]/95 backdrop-blur-2xl rounded-[calc(1rem-2px)] p-6 md:p-8 flex flex-col border border-white/5 group-hover:border-transparent transition-colors">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-indigo-400/50 shadow-[0_0_15px_#6366f1] opacity-0 group-hover:opacity-100 group-hover:animate-scanline"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="w-12 h-12 bg-indigo-950/50 border border-indigo-500/30 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_15px_rgba(99,102,241,0.2)] text-indigo-400 relative z-10">
                  <IconSvg name="book" className="w-6 h-6" />
                </div>
                <h3 className="text-xl md:text-2xl font-black mb-2 text-white relative z-10 tracking-tight">
                  Academic Research
                </h3>
                <p className="text-gray-400 text-xs md:text-sm font-medium mb-6 leading-relaxed flex-grow relative z-10">
                  Read. Analyze. Discover. Extract critical gaps, formulate
                  methodologies, and prepare for high-impact publishing.
                </p>
                <div className="inline-flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-widest group-hover:gap-4 transition-all relative z-10">
                  Explore Syllabus{" "}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global CSS for Animations */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
          .bg-grid { background-size: 50px 50px; background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px); transform-origin: top; animation: pan 20s linear infinite; }
          .perspective-grid { transform: perspective(1000px) rotateX(60deg) translateY(-100px) scale(3); }
          @keyframes pan { 0% { background-position: 0% 0%; } 100% { background-position: 100% 100%; } }
          @keyframes slideUpFade { from { opacity: 0; transform: translateY(40px) scale(0.95); filter: blur(10px); } to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); } }
          .animate-fade-in-up { animation: slideUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
          @keyframes blob { 0%, 100% { transform: translate(0px, 0px) scale(1); } 50% { transform: translate(30px, -30px) scale(1.1); } }
          .animate-blob { animation: blob 15s infinite alternate; }
          .animation-delay-4000 { animation-delay: 4s; }
          @keyframes shimmer { 0% { background-position: 200% center; } 100% { background-position: -200% center; } }
          .animate-shimmer { animation: shimmer 4s linear infinite; }
          @keyframes scanline { 0% { transform: translateY(0); } 100% { transform: translateY(400px); opacity: 0; } }
          .animate-scanline { animation: scanline 2.5s ease-in-out infinite; }
          .animate-pulse-slow { animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
          @keyframes typing { from { width: 0; } to { width: 100%; } }
          .animate-typing { animation: typing 2.5s steps(30, end) forwards; }
        `,
          }}
        />
      </main>
    );
  }

  // ================= VIEW 2: THE DETAILED SYLLABUS COMMAND CENTER =================
  const activeData = syllabusData[view];

  // Registration Link Logic
  const getRegistrationLink = () => {
    if (view === "cyber")
      return "https://docs.google.com/forms/d/e/1FAIpQLSeMKatXguY8kL9XoQj9YqU_IG50gj2EQR1ZqjT_Qbozdq48lA/viewform";
    if (view === "aiml")
      return "https://docs.google.com/forms/d/e/1FAIpQLSezWstoLBbNEho_KTwsfhn-6aLpnmKAFQF8SuxbcieJXcBvuQ/viewform";
    return "https://docs.google.com/forms/d/e/1FAIpQLSelckBOoB7AyuBxNK6o4rXZl1440ljHaA__aLnMwCUqtQ0wKQ/viewform";
  };

  // Theme Configuration mapping for dynamic colors
  const theme =
    view === "cyber"
      ? {
          color: "cyan",
          hex: "text-cyan-400",
          bg: "bg-cyan-500",
          border: "border-cyan-500/50",
          shadow: "shadow-[0_0_40px_rgba(6,182,212,0.3)]",
          dot: "bg-cyan-400 shadow-[0_0_20px_#22d3ee]",
          glow: "group-hover:border-cyan-500/50",
          line: "from-cyan-500",
          iconBorder: "border-cyan-500/30",
          topicIcon: "terminal",
        }
      : view === "aiml"
      ? {
          color: "purple",
          hex: "text-purple-400",
          bg: "bg-purple-500",
          border: "border-purple-500/50",
          shadow: "shadow-[0_0_40px_rgba(168,85,247,0.3)]",
          dot: "bg-purple-400 shadow-[0_0_20px_#c084fc]",
          glow: "group-hover:border-purple-500/50",
          line: "from-purple-500",
          iconBorder: "border-purple-500/30",
          topicIcon: "sparkles",
        }
      : {
          color: "indigo",
          hex: "text-indigo-400",
          bg: "bg-indigo-500",
          border: "border-indigo-500/50",
          shadow: "shadow-[0_0_40px_rgba(99,102,241,0.3)]",
          dot: "bg-indigo-400 shadow-[0_0_20px_#818cf8]",
          glow: "group-hover:border-indigo-500/50",
          line: "from-indigo-500",
          iconBorder: "border-indigo-500/30",
          topicIcon: "checkCircle",
        };

  return (
    <main
      className={`relative min-h-screen bg-[#020202] font-sans text-gray-300 pb-28 pt-0 relative selection:bg-white/20 transition-opacity duration-400 ${
        isTransitioning ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Background Isolation Wrapper */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>
        <div
          className={`absolute top-[-20%] right-[-10%] w-[80vw] h-[80vw] md:w-[800px] md:h-[800px] rounded-full blur-[120px] md:blur-[200px] mix-blend-screen opacity-20 ${theme.bg}`}
        ></div>
      </div>

      {/* STICKY GLASS HEADER */}
      <div className="sticky top-0 z-50 w-full bg-[#020202]/70 backdrop-blur-2xl border-b border-white/10 shadow-2xl px-4 md:px-8 py-3 md:py-4 mb-6 md:mb-8 transition-all">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={() => handleViewChange("landing")}
            className="group inline-flex items-center justify-center w-10 h-10 md:w-auto md:h-auto md:px-4 md:py-2 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all text-gray-400 hover:text-white active:scale-95 shrink-0 overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
            <svg
              className="w-5 h-5 md:mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              ></path>
            </svg>
            <span className="hidden md:inline font-bold tracking-wider uppercase text-xs">
              Return
            </span>
          </button>

          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 md:w-12 md:h-12 ${theme.border} border bg-white/5 rounded-lg md:rounded-xl flex items-center justify-center ${theme.shadow} ${theme.hex}`}
            >
              <IconSvg
                name={
                  view === "cyber"
                    ? "dragon"
                    : view === "aiml"
                    ? "brain"
                    : "book"
                }
                className="w-5 h-5 md:w-6 md:h-6"
              />
            </div>
            <div className="flex flex-col">
              <h2 className="font-black text-lg md:text-xl text-white tracking-tighter leading-none truncate max-w-[150px] md:max-w-none">
                {view === "cyber"
                  ? "Cyber & CTF"
                  : view === "aiml"
                  ? "AI & ML Starter"
                  : "Research"}
              </h2>
              <p
                className={`text-[10px] font-black uppercase tracking-widest mt-1 ${theme.hex}`}
              >
                System Syllabus
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8">
        {/* Animated Energy Beam Timeline */}
        <div className="relative border-l border-white/10 ml-4 md:ml-8 pb-6">
          <div
            className={`absolute top-0 bottom-0 -left-[1.5px] w-[3px] bg-gradient-to-b ${theme.line} via-transparent to-transparent opacity-50 bg-[length:100%_200%] animate-flow pointer-events-none`}
          ></div>

          {activeData.map((data, index) => {
            const isActive = activeWeek === index;
            const isFinale = data.icon === "trophy";

            return (
              <div
                key={index}
                className="relative pl-6 md:pl-10 mb-4 md:mb-6 stagger-animate"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                {/* Glowing Node Indicator */}
                <div className="absolute -left-[6px] top-6 md:top-8 w-3 h-3 rounded-full bg-[#020202] flex items-center justify-center z-10 ring-4 ring-[#020202]">
                  <div
                    className={`w-full h-full rounded-full transition-all duration-500 ${
                      isActive
                        ? isFinale
                          ? "bg-amber-400 shadow-[0_0_15px_#fbbf24]"
                          : theme.dot
                        : "bg-gray-700"
                    }`}
                  ></div>
                </div>

                {/* Interactive Holographic Card */}
                <div
                  className={`group bg-[#0a0a0c]/80 rounded-[1rem] md:rounded-[1.5rem] border transition-all duration-500 overflow-hidden backdrop-blur-xl ${
                    isActive
                      ? isFinale
                        ? `border-amber-500/50 shadow-[0_0_40px_rgba(245,158,11,0.3)] bg-[#151005]`
                        : `${theme.border} ${theme.shadow} bg-[#111115]`
                      : `border-white/5 hover:border-white/20 ${theme.glow}`
                  }`}
                >
                  {/* Card Header */}
                  <button
                    onClick={() => setActiveWeek(isActive ? null : index)}
                    className="w-full px-4 md:px-6 py-4 md:py-5 flex items-start md:items-center justify-between text-left focus:outline-none relative overflow-hidden active:bg-white/5 md:active:bg-transparent"
                  >
                    {/* Active Scanline Highlight */}
                    {isActive && (
                      <div
                        className={`absolute bottom-0 left-0 w-full h-[2px] ${
                          isFinale
                            ? "bg-amber-500 shadow-[0_0_15px_#fbbf24]"
                            : `${theme.bg} shadow-[0_0_15px_currentColor] ${theme.hex}`
                        }`}
                      ></div>
                    )}
                    {isActive && (
                      <div
                        className={`absolute inset-0 opacity-[0.03] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white to-transparent pointer-events-none`}
                      ></div>
                    )}

                    <div className="flex flex-row items-center gap-4 w-full">
                      <div
                        className={`w-10 h-10 md:w-14 md:h-14 shrink-0 rounded-lg md:rounded-xl flex items-center justify-center transition-all duration-500 border ${
                          isActive
                            ? isFinale
                              ? `border-amber-500/50 bg-amber-500 bg-opacity-20 text-amber-400`
                              : `${theme.border} ${theme.bg} bg-opacity-20 ${theme.hex}`
                            : "border-white/5 bg-white/5 text-gray-500 group-hover:text-gray-300"
                        }`}
                      >
                        <IconSvg
                          name={data.icon}
                          className="w-5 h-5 md:w-7 md:h-7"
                        />
                      </div>

                      <div className="flex flex-col flex-grow">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span
                            className={`text-[10px] md:text-[11px] font-black uppercase tracking-widest ${
                              isActive
                                ? isFinale
                                  ? "text-amber-400"
                                  : theme.hex
                                : "text-gray-500"
                            }`}
                          >
                            {data.week}
                          </span>
                          <span className="text-[10px] md:text-[11px] font-bold text-gray-400 bg-white/5 px-2 py-0.5 rounded border border-white/5 tracking-wider">
                            {data.date}
                          </span>
                        </div>
                        <h3
                          className={`font-bold text-base md:text-xl transition-colors duration-300 tracking-tight leading-tight ${
                            isActive
                              ? "text-white drop-shadow-md"
                              : "text-gray-400 group-hover:text-white"
                          }`}
                        >
                          {data.title}
                        </h3>
                      </div>
                      <div
                        className={`shrink-0 transition-transform duration-500 p-2 bg-white/5 rounded-lg border border-white/5 ${
                          isActive
                            ? `rotate-180 ${
                                isFinale
                                  ? "text-amber-400 border-amber-500/30"
                                  : `${theme.hex} ${theme.iconBorder}`
                              }`
                            : "text-gray-600"
                        }`}
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
                            strokeWidth="2.5"
                            d="M19 9l-7 7-7-7"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </button>

                  {/* Card Body Content */}
                  <div
                    className={`transition-all duration-700 ease-in-out ${
                      isActive
                        ? "max-h-[2000px] opacity-100 pb-5 md:pb-6"
                        : "max-h-0 opacity-0 pb-0"
                    }`}
                  >
                    <div className="px-4 md:px-6 pt-0">
                      <div className="w-full h-px bg-white/10 mb-4 md:mb-5"></div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-8">
                        {/* Topics Section */}
                        <div className="bg-black/30 rounded-xl md:rounded-2xl p-4 md:p-5 border border-white/5 shadow-inner">
                          <h4 className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest mb-3 md:mb-4 flex items-center gap-2">
                            <div
                              className={`w-6 h-6 rounded-md bg-white/5 flex items-center justify-center border border-white/5 ${
                                isFinale ? "text-amber-400" : theme.hex
                              }`}
                            >
                              <IconSvg name="chart" className="w-3.5 h-3.5" />
                            </div>
                            Topics Covered
                          </h4>
                          <ul className="space-y-2">
                            {data.topics.map((topic, tIndex) => {
                              const topicIcon = getTopicIcon(
                                topic,
                                theme.topicIcon
                              );
                              return (
                                <li
                                  key={tIndex}
                                  className="flex items-start gap-3 p-1.5 md:p-2 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/5 transition-all duration-300"
                                >
                                  <div
                                    className={`mt-0.5 shrink-0 p-1.5 rounded-lg bg-black border border-white/5 ${
                                      isFinale
                                        ? "text-amber-400 shadow-[0_0_8px_#fbbf24]"
                                        : `${theme.hex} shadow-inner`
                                    }`}
                                  >
                                    <IconSvg
                                      name={topicIcon}
                                      className="w-3.5 h-3.5"
                                    />
                                  </div>
                                  <span className="text-sm md:text-sm text-gray-300 font-medium leading-relaxed">
                                    {topic}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                        <div className="space-y-4 md:space-y-5">
                          {/* Outcomes Section */}
                          {data.outcomes && (
                            <div className="bg-black/30 rounded-xl md:rounded-2xl p-4 md:p-5 border border-white/5 shadow-inner">
                              <h4 className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest mb-3 md:mb-4 flex items-center gap-2">
                                <div
                                  className={`w-6 h-6 rounded-md bg-white/5 flex items-center justify-center border border-white/5 ${
                                    isFinale ? "text-amber-400" : theme.hex
                                  }`}
                                >
                                  <IconSvg
                                    name="target"
                                    className="w-3.5 h-3.5"
                                  />
                                </div>
                                Learning Outcomes
                              </h4>
                              <ul className="space-y-2">
                                {data.outcomes.map((outcome, oIndex) => (
                                  <li
                                    key={oIndex}
                                    className="flex items-start gap-3 p-1"
                                  >
                                    <svg
                                      className={`mt-0.5 shrink-0 w-4 h-4 ${
                                        isFinale ? "text-amber-400" : theme.hex
                                      }`}
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
                                    <span className="text-sm text-gray-400 font-medium">
                                      {outcome}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {/* Tools Section */}
                          {data.tools && (
                            <div
                              className={`bg-gradient-to-br ${
                                isFinale ? "from-amber-500/10" : "from-white/5"
                              } to-transparent rounded-xl md:rounded-2xl p-4 md:p-5 border ${
                                isFinale
                                  ? "border-amber-500/20"
                                  : "border-white/10"
                              } shadow-lg`}
                            >
                              <h4 className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest mb-3 md:mb-4 flex items-center gap-2">
                                <div
                                  className={`w-6 h-6 rounded-md bg-white/5 flex items-center justify-center border border-white/5 ${
                                    isFinale ? "text-amber-400" : theme.hex
                                  }`}
                                >
                                  <IconSvg
                                    name="code"
                                    className="w-3.5 h-3.5"
                                  />
                                </div>
                                Tools & Resources
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {data.tools.map((tool, tlIndex) => {
                                  const logoUrl = getToolLogoUrl(tool);
                                  return (
                                    <span
                                      key={tlIndex}
                                      className={`flex items-center gap-2 px-3 py-1.5 bg-black border ${
                                        isFinale
                                          ? "border-amber-500/30 text-amber-400 hover:border-amber-400"
                                          : `border-white/10 ${theme.hex} hover:border-white/30`
                                      } text-[11px] md:text-xs font-bold rounded-lg shadow-sm hover:-translate-y-0.5 transition-all cursor-default`}
                                    >
                                      {logoUrl ? (
                                        <img
                                          src={logoUrl}
                                          alt={tool}
                                          className="w-3.5 h-3.5"
                                          loading="lazy"
                                        />
                                      ) : (
                                        <IconSvg
                                          name={getToolFallbackIcon(tool)}
                                          className="w-3.5 h-3.5"
                                        />
                                      )}
                                      {tool}
                                    </span>
                                  );
                                })}
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

        {/* Register Now Button */}
        <div className="mt-10 mb-20 flex justify-center w-full">
          <a
            href={getRegistrationLink()}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-black uppercase tracking-widest text-sm rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all active:scale-95 hover:scale-105 backdrop-blur-md`}
          >
            Register Now
          </a>
        </div>
      </div>

      {/* FLOATING MOBILE CTA */}
      <div
        className="fixed bottom-5 left-0 w-full px-5 z-50 md:hidden animate-fade-in-up"
        style={{ animationDelay: "500ms" }}
      >
        <Link
          href={getRegistrationLink()}
          className="flex items-center justify-center w-full py-3.5 bg-white text-black font-black uppercase tracking-widest text-sm rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.8)] active:scale-95 transition-transform backdrop-blur-md"
        >
          Secure Access
        </Link>
      </div>

      {/* Global CSS for Animations */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes slideUpFade { from { opacity: 0; transform: translateY(40px); filter: blur(5px); } to { opacity: 1; transform: translateY(0); filter: blur(0); } }
        .stagger-animate { animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        .animate-fade-in-up { animation: slideUpFade 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        @keyframes shimmer { 0% { background-position: 200% center; } 100% { background-position: -200% center; } }
        .animate-shimmer { animation: shimmer 4s linear infinite; }
        @keyframes flow { 0% { background-position: 0% 0%; } 100% { background-position: 0% 200%; } }
        .animate-flow { animation: flow 3s linear infinite; }
      `,
        }}
      />
    </main>
  );
}
