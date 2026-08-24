"use client";
import React, { useState } from "react";
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
        d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
      />
    ),
    search: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
      />
    ),
    target: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
    ),
    lock: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
      />
    ),
    bug: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Zm0 13.036h.008v.008H12v-.008Z"
      />
    ),
    fingerprint: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 1-1.15 3.993m1.989 3.559A11.209 11.209 0 0 0 8.25 10.5a3.75 3.75 0 1 1 7.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 0 1-3.6 9.75m6.633-4.596a18.666 18.666 0 0 1-2.485 5.33"
      />
    ),
    web: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
      />
    ),
    hacker: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
      />
    ),
    code: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
      />
    ),
    chart: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
      />
    ),
    brain: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
      />
    ),
    nodes: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
      />
    ),
    network: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
      />
    ),
    chip: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z"
      />
    ),
    book: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
      />
    ),
    data: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
      />
    ),
    rocket: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
      />
    ),
    calendar: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
      />
    ),
    star: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
      />
    ),
    trophy: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0 1 16.27 9.728m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a7.03 7.03 0 0 1-3.042 0"
      />
    ),
    terminal: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z"
      />
    ),
    sparkles: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z"
      />
    ),
    checkCircle: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    ),
  };
  return (
    <svg
      className={className || "w-6 h-6"}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
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
    ? `https://cdn.simpleicons.org/${map[toolName]}/475569`
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

  // View 1: Track selection landing
  if (view === "landing") {
    return (
      <div
        className={`relative min-h-screen bg-[#fafafa] font-sans text-gray-900 selection:bg-brandPurple/30 transition-opacity duration-500 ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Ambient background — absolute, never fixed, so it cannot paint over the shared footer */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
          <div className="absolute top-[-15%] left-[-10%] w-[80vw] h-[80vw] md:w-[600px] md:h-[600px] bg-brandBlue/15 rounded-full blur-[120px] mix-blend-multiply animate-pulse"></div>
          <div
            className="absolute bottom-[-15%] right-[-10%] w-[80vw] h-[80vw] md:w-[600px] md:h-[600px] bg-brandPurple/15 rounded-full blur-[120px] mix-blend-multiply animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-16 flex flex-col items-center min-h-screen justify-center">
          {/* Logo & Launch Badge */}
          <div className="flex flex-col items-center mb-10 w-full animate-fade-in-up">
            <div className="w-20 h-20 md:w-28 md:h-28 relative mb-6 rounded-3xl overflow-hidden bg-white p-3 border border-gray-200 shadow-sm group hover:scale-105 hover:shadow-brandBlue/20 hover:shadow-xl transition-all duration-500">
              <Image
                src="/AUSTCAIC-logo.jpg"
                alt="AUSTCAIC Logo"
                fill
                sizes="(max-width: 768px) 80px, 112px"
                className="object-contain"
              />
            </div>
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/60 border border-brandPurple/20 shadow-[0_0_15px_rgba(139,92,246,0.15)] backdrop-blur-md mb-8">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brandPurple opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brandPurple"></span>
              </span>
              <span className="text-sm font-bold tracking-wide uppercase bg-clip-text text-transparent bg-gradient-to-r from-brandBlue to-brandPurple">
                We are launching a culture
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-center tracking-tighter mb-6 leading-[0.95] text-gray-900">
              <span className="block drop-shadow-sm">HANDS ON</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandBlue via-brandPurple to-brandBlue drop-shadow-sm">
                WEEKENDS
              </span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-600 text-center max-w-2xl font-medium leading-relaxed px-4">
              Explore the future techs with{" "}
              <span className="text-gray-900 font-bold">AUSTCAIC</span>. The most
              rigorous, hands-on, and industry-focused curriculum.
            </p>
          </div>
          {/* HIGHLIGHTS ROW: Schedule & Prizes */}
          <div
            className="flex flex-wrap justify-center gap-3 md:gap-5 w-full max-w-5xl mb-12 animate-fade-in-up"
            style={{ animationDelay: "100ms" }}
          >
            {/* Schedule: Cyber & Research */}
            <div className="flex items-center gap-3 bg-white/80 border border-gray-200/60 rounded-2xl px-5 py-3.5 backdrop-blur-xl shadow-sm hover:border-brandBlue/40 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100">
                <IconSvg name="calendar" className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 font-black uppercase tracking-widest">
                  Cyber & Research
                </span>
                <span className="text-sm font-bold text-gray-900">
                  Every <span className="text-blue-600">Friday</span>
                </span>
              </div>
            </div>
            {/* Schedule: AI/ML */}
            <div className="flex items-center gap-3 bg-white/80 border border-gray-200/60 rounded-2xl px-5 py-3.5 backdrop-blur-xl shadow-sm hover:border-brandPurple/40 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center border border-purple-100">
                <IconSvg name="calendar" className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 font-black uppercase tracking-widest">
                  AI & ML
                </span>
                <span className="text-sm font-bold text-gray-900">
                  Every <span className="text-purple-600">Saturday</span>
                </span>
              </div>
            </div>
            {/* Prizes Badge */}
            <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-3.5 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center border border-amber-200">
                <IconSvg name="trophy" className="w-5 h-5 text-amber-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-amber-700 font-black uppercase tracking-widest">
                  Rewards
                </span>
                <span className="text-sm font-black text-amber-900 tracking-wide">
                  Exclusive Prizes for Best Performers
                </span>
              </div>
            </div>
          </div>
          {/* EXCLUSIVE MEMBER BANNER */}
          <div
            className="w-full max-w-3xl rounded-[2rem] mb-16 animate-fade-in-up bg-amber-50 border border-amber-200 shadow-[0_15px_40px_rgba(0,0,0,0.04)]"
            style={{ animationDelay: "100ms" }}
          >
            <div className="w-full h-full p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-5">
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 text-center sm:text-left w-full sm:w-auto">
                <div className="w-14 h-14 bg-amber-100 border border-amber-200 rounded-2xl flex items-center justify-center shrink-0">
                  <svg
                    className="w-7 h-7 text-amber-600"
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
                  <h3 className="text-amber-900 font-black text-xl uppercase tracking-wide">
                    Exclusive Access
                  </h3>
                  <p className="text-amber-800 text-sm md:text-base font-medium mt-1">
                    This culture and syllabus is strictly reserved for verified
                    AUSTCAIC General Members.
                  </p>
                </div>
              </div>
              <Link
                href="/register"
                className="shrink-0 w-full sm:w-auto text-center px-8 py-3.5 bg-gray-950 hover:bg-gray-800 text-white font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all active:scale-95 hover:-translate-y-0.5"
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
            <button
              type="button"
              onClick={() => handleViewChange("cyber")}
              className="group h-full text-left bg-white/70 backdrop-blur-xl rounded-[2rem] p-8 flex flex-col border border-gray-200/60 shadow-[0_15px_40px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-2 hover:border-blue-300 hover:shadow-[0_20px_50px_-12px_rgba(37,99,235,0.2)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              <div className="w-14 h-14 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600 group-hover:scale-110 transition-transform duration-500">
                <IconSvg name="dragon" className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black mb-3 text-gray-900 tracking-tight">
                Cyber & CTF
              </h3>
              <p className="text-gray-600 text-base font-medium mb-8 leading-relaxed flex-grow">
                Train Like Attackers. Defend Like Professionals. Master OSINT,
                Cryptography, and System Hacking.
              </p>
              <span className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-widest group-hover:gap-4 transition-all">
                Explore Syllabus
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
              </span>
            </button>
            {/* AI/ML Card */}
            <button
              type="button"
              onClick={() => handleViewChange("aiml")}
              className="group h-full text-left bg-white/70 backdrop-blur-xl rounded-[2rem] p-8 flex flex-col border border-gray-200/60 shadow-[0_15px_40px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-2 hover:border-purple-300 hover:shadow-[0_20px_50px_-12px_rgba(139,92,246,0.2)] focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
            >
              <div className="w-14 h-14 bg-purple-50 border border-purple-100 rounded-2xl flex items-center justify-center mb-6 text-purple-600 group-hover:scale-110 transition-transform duration-500">
                <IconSvg name="brain" className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black mb-3 text-gray-900 tracking-tight">
                AI & ML Starter
              </h3>
              <p className="text-gray-600 text-base font-medium mb-8 leading-relaxed flex-grow">
                Learn. Build. Think Intelligently. Architect the future from
                Python fundamentals to Deep Neural Networks.
              </p>
              <span className="inline-flex items-center gap-2 text-purple-600 font-bold text-sm uppercase tracking-widest group-hover:gap-4 transition-all">
                Explore Syllabus
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
              </span>
            </button>
            {/* Research Card */}
            <button
              type="button"
              onClick={() => handleViewChange("research")}
              className="group h-full text-left bg-white/70 backdrop-blur-xl rounded-[2rem] p-8 flex flex-col border border-gray-200/60 shadow-[0_15px_40px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-2 hover:border-indigo-300 hover:shadow-[0_20px_50px_-12px_rgba(99,102,241,0.2)] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              <div className="w-14 h-14 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-center mb-6 text-indigo-600 group-hover:scale-110 transition-transform duration-500">
                <IconSvg name="book" className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black mb-3 text-gray-900 tracking-tight">
                Academic Research
              </h3>
              <p className="text-gray-600 text-base font-medium mb-8 leading-relaxed flex-grow">
                Read. Analyze. Discover. Extract critical gaps, formulate
                methodologies, and prepare for high-impact publishing.
              </p>
              <span className="inline-flex items-center gap-2 text-indigo-600 font-bold text-sm uppercase tracking-widest group-hover:gap-4 transition-all">
                Explore Syllabus
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
              </span>
            </button>
          </div>
        </div>

        {/* Global CSS for Animations */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
          @keyframes slideUpFade { from { opacity: 0; transform: translateY(30px); filter: blur(5px); } to { opacity: 1; transform: translateY(0); filter: blur(0); } }
          .animate-fade-in-up { animation: slideUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        `,
          }}
        />
      </div>
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
          color: "blue",
          hex: "text-blue-600",
          bg: "bg-blue-500",
          soft: "bg-blue-50",
          border: "border-blue-300",
          shadow: "shadow-[0_20px_50px_-12px_rgba(37,99,235,0.18)]",
          dot: "bg-blue-600",
          glow: "hover:border-blue-200",
          line: "from-blue-400",
          iconBorder: "border-blue-200",
          topicIcon: "terminal",
        }
      : view === "aiml"
      ? {
          color: "purple",
          hex: "text-purple-600",
          bg: "bg-purple-500",
          soft: "bg-purple-50",
          border: "border-purple-300",
          shadow: "shadow-[0_20px_50px_-12px_rgba(139,92,246,0.18)]",
          dot: "bg-purple-600",
          glow: "hover:border-purple-200",
          line: "from-purple-400",
          iconBorder: "border-purple-200",
          topicIcon: "sparkles",
        }
      : {
          color: "indigo",
          hex: "text-indigo-600",
          bg: "bg-indigo-500",
          soft: "bg-indigo-50",
          border: "border-indigo-300",
          shadow: "shadow-[0_20px_50px_-12px_rgba(99,102,241,0.18)]",
          dot: "bg-indigo-600",
          glow: "hover:border-indigo-200",
          line: "from-indigo-400",
          iconBorder: "border-indigo-200",
          topicIcon: "checkCircle",
        };

  return (
    <div
      className={`relative min-h-screen bg-[#fcfcfc] font-sans text-gray-900 pb-28 selection:bg-brandPurple/30 transition-opacity duration-500 ${
        isTransitioning ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Ambient background — absolute, never fixed, so it cannot paint over the shared footer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.6]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.035) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>
        <div className="absolute top-[-10%] right-[-10%] w-[80vw] h-[80vw] md:w-[600px] md:h-[600px] rounded-full blur-[120px] mix-blend-multiply bg-brandBlue/10"></div>
        <div className="absolute bottom-[15%] left-[-10%] w-[80vw] h-[80vw] md:w-[600px] md:h-[600px] rounded-full blur-[140px] mix-blend-multiply bg-brandPurple/10"></div>
      </div>

      {/* STICKY SUB-HEADER — offset below the site nav so the two never overlap */}
      <div className="sticky top-16 sm:top-20 z-30 w-full bg-white/70 backdrop-blur-xl border-y border-gray-200/60 shadow-sm px-4 md:px-8 py-3 md:py-4 mb-8 transition-all">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={() => handleViewChange("landing")}
            className="group inline-flex items-center justify-center w-10 h-10 md:w-auto md:h-auto md:px-4 md:py-2 bg-white hover:bg-gray-50 rounded-xl border border-gray-200 hover:border-gray-300 transition-all text-gray-600 hover:text-gray-900 active:scale-95 shrink-0 shadow-sm"
          >
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
              className={`w-9 h-9 md:w-12 md:h-12 ${theme.iconBorder} border ${theme.soft} rounded-lg md:rounded-xl flex items-center justify-center ${theme.hex}`}
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
              <h2 className="font-black text-lg md:text-xl text-gray-900 tracking-tighter leading-none truncate max-w-[150px] md:max-w-none">
                {view === "cyber"
                  ? "Cyber & CTF"
                  : view === "aiml"
                  ? "AI & ML Starter"
                  : "Research"}
              </h2>
              <p
                className={`text-[11px] font-black uppercase tracking-widest mt-1 ${theme.hex}`}
              >
                System Syllabus
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8">
        {/* Timeline rail */}
        <div className="relative border-l border-gray-200 ml-4 md:ml-8 pb-6">
          <div
            className={`absolute top-0 bottom-0 -left-[1.5px] w-[3px] bg-gradient-to-b ${theme.line} via-transparent to-transparent opacity-40 pointer-events-none`}
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
                {/* Node Indicator */}
                <div className="absolute -left-[6px] top-6 md:top-8 w-3 h-3 rounded-full bg-white flex items-center justify-center z-10 ring-4 ring-[#fcfcfc]">
                  <div
                    className={`w-full h-full rounded-full transition-all duration-500 ${
                      isActive
                        ? isFinale
                          ? "bg-amber-500"
                          : theme.dot
                        : "bg-gray-300"
                    }`}
                  ></div>
                </div>

                {/* Class Card */}
                <div
                  className={`group bg-white rounded-2xl md:rounded-3xl border transition-all duration-500 overflow-hidden ${
                    isActive
                      ? isFinale
                        ? `border-amber-300 shadow-[0_20px_50px_-12px_rgba(245,158,11,0.18)]`
                        : `${theme.border} ${theme.shadow}`
                      : `border-gray-200 shadow-sm ${theme.glow}`
                  }`}
                >
                  {/* Card Header */}
                  <button
                    onClick={() => setActiveWeek(isActive ? null : index)}
                    className="w-full px-4 md:px-6 py-4 md:py-5 flex items-start md:items-center justify-between text-left focus:outline-none relative overflow-hidden active:bg-gray-50"
                  >
                    {isActive && (
                      <div
                        className={`absolute bottom-0 left-0 w-full h-[2px] ${
                          isFinale ? "bg-amber-500" : theme.bg
                        }`}
                      ></div>
                    )}

                    <div className="flex flex-row items-center gap-4 w-full">
                      <div
                        className={`w-10 h-10 md:w-14 md:h-14 shrink-0 rounded-lg md:rounded-xl flex items-center justify-center transition-all duration-500 border ${
                          isActive
                            ? isFinale
                              ? `border-amber-200 bg-amber-50 text-amber-600`
                              : `${theme.iconBorder} ${theme.soft} ${theme.hex}`
                            : "border-gray-200 bg-gray-50 text-gray-400 group-hover:text-gray-600"
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
                            className={`text-[11px] md:text-xs font-black uppercase tracking-widest ${
                              isActive
                                ? isFinale
                                  ? "text-amber-600"
                                  : theme.hex
                                : "text-gray-500"
                            }`}
                          >
                            {data.week}
                          </span>
                          <span className="text-[11px] md:text-xs font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded border border-gray-200 tracking-wider">
                            {data.date}
                          </span>
                        </div>
                        <h3
                          className={`font-bold text-base md:text-xl transition-colors duration-300 tracking-tight leading-tight ${
                            isActive
                              ? "text-gray-900"
                              : "text-gray-700 group-hover:text-gray-900"
                          }`}
                        >
                          {data.title}
                        </h3>
                      </div>
                      <div
                        className={`shrink-0 transition-transform duration-500 p-2 bg-gray-50 rounded-lg border border-gray-200 ${
                          isActive
                            ? `rotate-180 ${
                                isFinale
                                  ? "text-amber-600 border-amber-200"
                                  : `${theme.hex} ${theme.iconBorder}`
                              }`
                            : "text-gray-400"
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
                      <div className="w-full h-px bg-gray-100 mb-4 md:mb-5"></div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-8">
                        {/* Topics Section */}
                        <div className="bg-gray-50 rounded-xl md:rounded-2xl p-4 md:p-5 border border-gray-100">
                          <h4 className="text-[11px] md:text-xs font-black text-gray-500 uppercase tracking-widest mb-3 md:mb-4 flex items-center gap-2">
                            <div
                              className={`w-6 h-6 rounded-md bg-white flex items-center justify-center border border-gray-200 ${
                                isFinale ? "text-amber-600" : theme.hex
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
                                  className="flex items-start gap-3 p-1.5 md:p-2 rounded-lg hover:bg-white border border-transparent hover:border-gray-200 transition-all duration-300"
                                >
                                  <div
                                    className={`mt-0.5 shrink-0 p-1.5 rounded-lg bg-white border border-gray-200 ${
                                      isFinale ? "text-amber-600" : theme.hex
                                    }`}
                                  >
                                    <IconSvg
                                      name={topicIcon}
                                      className="w-3.5 h-3.5"
                                    />
                                  </div>
                                  <span className="text-sm text-gray-700 font-medium leading-relaxed">
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
                            <div className="bg-gray-50 rounded-xl md:rounded-2xl p-4 md:p-5 border border-gray-100">
                              <h4 className="text-[11px] md:text-xs font-black text-gray-500 uppercase tracking-widest mb-3 md:mb-4 flex items-center gap-2">
                                <div
                                  className={`w-6 h-6 rounded-md bg-white flex items-center justify-center border border-gray-200 ${
                                    isFinale ? "text-amber-600" : theme.hex
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
                                        isFinale ? "text-amber-600" : theme.hex
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
                                    <span className="text-sm text-gray-700 font-medium">
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
                              className={`rounded-xl md:rounded-2xl p-4 md:p-5 border ${
                                isFinale
                                  ? "bg-amber-50 border-amber-200"
                                  : "bg-gray-50 border-gray-100"
                              }`}
                            >
                              <h4 className="text-[11px] md:text-xs font-black text-gray-500 uppercase tracking-widest mb-3 md:mb-4 flex items-center gap-2">
                                <div
                                  className={`w-6 h-6 rounded-md bg-white flex items-center justify-center border border-gray-200 ${
                                    isFinale ? "text-amber-600" : theme.hex
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
                                      className={`flex items-center gap-2 px-3 py-1.5 bg-white border ${
                                        isFinale
                                          ? "border-amber-200 text-amber-800 hover:border-amber-300"
                                          : `border-gray-200 text-gray-700 hover:border-gray-300`
                                      } text-xs font-bold rounded-lg shadow-sm hover:-translate-y-0.5 transition-all cursor-default`}
                                    >
                                      {logoUrl ? (
                                        // eslint-disable-next-line @next/next/no-img-element -- 14px third-party CDN icons; next/image would need a remotePattern for no benefit
                                        <img
                                          src={logoUrl}
                                          alt={tool}
                                          className="w-3.5 h-3.5"
                                          loading="lazy"
                                        />
                                      ) : (
                                        <IconSvg
                                          name={getToolFallbackIcon(tool)}
                                          className={`w-3.5 h-3.5 ${
                                            isFinale
                                              ? "text-amber-600"
                                              : theme.hex
                                          }`}
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
            className="px-10 py-4 bg-gradient-to-r from-brandBlue to-brandPurple text-white font-bold uppercase tracking-widest text-sm rounded-xl shadow-[0_8px_30px_rgba(29,78,216,0.3)] transition-all active:scale-95 hover:-translate-y-1 hover:shadow-brandBlue/50"
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
        <a
          href={getRegistrationLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full py-3.5 bg-gradient-to-r from-brandBlue to-brandPurple text-white font-bold uppercase tracking-widest text-sm rounded-xl shadow-[0_10px_30px_rgba(29,78,216,0.35)] active:scale-95 transition-transform"
        >
          Secure Access
        </a>
      </div>

      {/* Global CSS for Animations */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes slideUpFade { from { opacity: 0; transform: translateY(30px); filter: blur(5px); } to { opacity: 1; transform: translateY(0); filter: blur(0); } }
        .stagger-animate { animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        .animate-fade-in-up { animation: slideUpFade 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
      `,
        }}
      />
    </div>
  );
}
