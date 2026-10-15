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
  category: string;
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
  category: string;
  date: string;
  description: string;
  image?: string;
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
  description?: string;
  image?: string;
}

export interface SponsorInfo {
  inquiryEmail: string;
  benefits: string[];
}

export interface SponsorData {
  id: string;
  name: string;
  typeLabel: string;
  imageUrl: string | null;
  websiteUrl: string | null;
}

export const announcementData: AnnouncementData = {
  label: "Registration Open",
  message: "Demo Event: Register for the upcoming Advanced CTF & Cybersecurity Bootcamp.",
  href: "#upcoming-events",
};

export const statisticsData: StatisticData[] = [
  { value: 500, suffix: "+", label: "General Members" },
  { value: 4, suffix: "+", label: "Seminars & Webinars" },
  { value: 500, suffix: "+", label: "Participants" },
  { value: 3, suffix: "+", label: "Industry Collaborations" },
];

// Events and recent activities now live in the `events` table and are managed
// from /admin/events. The shapes above are what the homepage components render.

export const beyondTechData: BeyondTechData[] = [];

export const defaultGalleryMoments: GalleryItemData[] = [
  {
    id: "gm-cse-carnival",
    title: "Team Red_Shell — CSE Carnival Runners-Up",
    date: "September 2026",
    description: "Celebrating our club competitive team Red_Shell securing runner-up position at the university CSE Carnival.",
    image: "https://tqwdwdfxckgkkggwvzha.supabase.co/storage/v1/object/public/gallery-images/eee7f566-5ef4-49dc-b9e5-fe3bc2bfda30-0a9d7a9b0828.webp",
  },
  {
    id: "gm-farewell-2025",
    title: "Farewell & Prize Giving Ceremony — Fall 2025",
    date: "October 2026",
    description: "Honoring our graduating executive members, acknowledging exceptional semester contributions, and welcoming future leaders.",
    image: "https://tqwdwdfxckgkkggwvzha.supabase.co/storage/v1/object/public/event-images/b50419a7-975e-4d12-9d00-27a9e505b730-4e40ececa82e.webp",
  },
  {
    id: "gm-bootcamp-2026",
    title: "Cybersecurity Bootcamp 2026 Hands-On Lab",
    date: "September 2026",
    description: "3-day intensive cyber attack simulation and defensive SOC training powered by HackToLive Academy.",
    image: "https://tqwdwdfxckgkkggwvzha.supabase.co/storage/v1/object/public/event-images/0be74251-de17-4f7c-8360-28be61c0591c-6b16641f05c8.webp",
  },
  {
    id: "gm-skillsprint-seminar",
    title: "SkillSprint 2026 Inaugural Seminar",
    date: "September 2026",
    description: "Lead-Forward Youth Foundation and AUSTCAIC collaboration on cyber safety, awareness, and digital identity defense.",
    image: "https://tqwdwdfxckgkkggwvzha.supabase.co/storage/v1/object/public/event-images/49130a81-16fa-4403-9f21-855efc81859a-fc59470110c3.webp",
  },
  {
    id: "gm-future-proof",
    title: "Future-Proof Your Cyber Career Workshop",
    date: "August 2026",
    description: "Exploring preparation for international cybersecurity roles, cloud certifications, and AI workflow integration.",
    image: "https://tqwdwdfxckgkkggwvzha.supabase.co/storage/v1/object/public/event-images/0fa9dae1-5d21-4665-a59d-ae79826d0618-fc8f0158d4f0.webp",
  },
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
