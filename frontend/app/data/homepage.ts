export interface AnnouncementData {
  label: string;
  message: string;
  href: string;
}

export interface StatisticData {
  value: number;
  suffix: string;
  label: string;
}

export interface EventData {
  id: string;
  title: string;
  category: "Workshop" | "Seminar" | "Webinar" | "Hackathon";
  date: string;
  time: string;
  venue: string;
  speaker?: string;
  speakerRole?: string;
  description: string;
  image?: string;
  registrationUrl?: string;
  status: "Open" | "Upcoming" | "Closed";
}

export interface ActivityData {
  id: string;
  title: string;
  category: "Workshop" | "Seminar" | "Webinar" | "Competition";
  date: string;
  description: string;
}

export interface BeyondTechData {
  id: string;
  title: string;
  activityType: string;
  details: string;
  iconType: "music" | "camera" | "chat" | "trophy";
}

export interface GalleryItemData {
  id: string;
  title: string;
  date: string;
  image?: string;
}

export interface SponsorInfo {
  inquiryEmail: string;
  benefits: string[];
}

export const announcementData: AnnouncementData = {
  label: "Registration Open",
  message: "Demo Event: Register for the upcoming Advanced CTF & Cybersecurity Bootcamp.",
  href: "#upcoming-events",
};

export const statisticsData: StatisticData[] = [
  { value: 500, suffix: "+", label: "General Members" },
  { value: 30, suffix: "+", label: "Workshops & Seminars" },
  { value: 1500, suffix: "+", label: "Training Participants" },
  { value: 20, suffix: "+", label: "Industry Collaborations" },
];

export const upcomingEventsData: EventData[] = [
  {
    id: "evt-1",
    title: "Advanced CTF & Cybersecurity Bootcamp",
    category: "Workshop",
    date: "Friday, September 11, 2026",
    time: "03:00 PM - 06:00 PM",
    venue: "AUST Seminar Hall (Room 4A02)",
    speaker: "Guest Security Auditor",
    speakerRole: "Lead Security Analyst & AUST Alumnus",
    description: "A comprehensive hands-on laboratory session focusing on network reconnaissance, classical cryptography challenges, and web penetration testing mechanics. Designed as a demo/placeholder layout for upcoming training events.",
    registrationUrl: "https://forms.gle/WJj6SaaG4htKJfcH8",
    status: "Open",
  },
  {
    id: "evt-2",
    title: "Generative AI Foundations & LLM Fine-Tuning",
    category: "Seminar",
    date: "Saturday, September 26, 2026",
    time: "02:00 PM - 05:00 PM",
    venue: "Main Auditorium",
    speaker: "AI Research Consultant",
    speakerRole: "Machine Learning Engineer",
    description: "An educational overview of transformer architectures, prompt engineering best practices, and fine-tuning pipelines for custom enterprise datasets. Designed as a demo/placeholder layout.",
    registrationUrl: "#",
    status: "Upcoming",
  }
];

export const recentActivitiesData: ActivityData[] = [
  {
    id: "act-1",
    title: "Web Penetration Testing Workshop",
    category: "Workshop",
    date: "June 2026",
    description: "Hands-on session exploring OWASP Top 10 vulnerabilities, session manipulation, and practical cross-site scripting (XSS) remediation.",
  },
  {
    id: "act-2",
    title: "Introduction to Neural Networks",
    category: "Seminar",
    date: "May 2026",
    description: "A foundational seminar discussing mathematical principles of backpropagation, activation functions, and simple neural net designs.",
  },
  {
    id: "act-3",
    title: "National Cybersecurity & AI Summit",
    category: "Seminar",
    date: "April 2026",
    description: "Invited academic researchers and security experts shared perspectives on the role of machine learning in malware classification.",
  },
  {
    id: "act-4",
    title: "AI Hackathon: Intra-AUST 2026",
    category: "Competition",
    date: "March 2026",
    description: "Intense 24-hour challenge where student teams constructed machine learning pipelines to solve environmental dataset classifications.",
  }
];

export const beyondTechData: BeyondTechData[] = [
  {
    id: "bt-1",
    title: "Intra-University Debate Champions",
    activityType: "Debate & Public Speaking",
    details: "Club members represented and secured the top spot at the inter-department speech tournament, showcasing critical thinking under pressure.",
    iconType: "chat",
  },
  {
    id: "bt-2",
    title: "Traditional Music Performances",
    activityType: "Instrumental & Folk Music",
    details: "Highlighting tech students participating in traditional instrumental showcases during AUST annual cultural program sessions.",
    iconType: "music",
  },
  {
    id: "bt-3",
    title: "Campus Life Photography Exhibit",
    activityType: "Photography & Digital Arts",
    details: "Showcasing student visual framing highlights, capturing daily university motion, tech lab sessions, and annual student fests.",
    iconType: "camera",
  },
  {
    id: "bt-4",
    title: "Collegiate Table Tennis Tournament",
    activityType: "Sports & Athletics",
    details: "Recognizing our general members participating in collegiate athletic contests, fostering active peer relationship frameworks.",
    iconType: "trophy",
  }
];

export const galleryMomentsData: GalleryItemData[] = [
  {
    id: "gal-1",
    title: "Inauguration Ceremony & Committee Launch",
    date: "January 2026",
    image: "/logo2.jpg",
  },
  {
    id: "gal-2",
    title: "Cybersecurity Training Session Labs",
    date: "March 2026",
  },
  {
    id: "gal-3",
    title: "Core Team & Executive Committee Panel Meetup",
    date: "May 2026",
  }
];

export const sponsorInfoData: SponsorInfo = {
  inquiryEmail: "austcaic@aust.edu",
  benefits: [
    "Direct pipeline to AUST's top cybersecurity and AI/ML talent.",
    "Logo placement on site footer, event banners, and promotional merchandise.",
    "Opportunities to conduct collaborative technical workshops or recruitment talks.",
    "Recognition as a premier tech community partner supporting university innovation."
  ]
};
