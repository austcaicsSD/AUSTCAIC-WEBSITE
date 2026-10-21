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

export interface MemberAchievementData {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
  category?: string;
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

export const memberAchievementsData: MemberAchievementData[] = [
  {
    id: "red-shell-cse-carnival",
    title: "Team Red_Shell — CSE Carnival Runners-Up",
    date: "September 2026",
    description: "Celebrating our club's competitive team Red_Shell securing runner-up position at the university CSE Carnival.",
    image: "https://tqwdwdfxckgkkggwvzha.supabase.co/storage/v1/object/public/gallery-images/eee7f566-5ef4-49dc-b9e5-fe3bc2bfda30-0a9d7a9b0828.webp",
    category: "Competition Achievement",
  },
];

export const defaultGalleryMoments: GalleryItemData[] = [
  {
    id: "gm-img-1765",
    title: "",
    date: "September 2026",
    image: "https://tqwdwdfxckgkkggwvzha.supabase.co/storage/v1/object/public/gallery-images/IMG_1765.jpg",
  },
  {
    id: "gm-img-1843",
    title: "",
    date: "September 2026",
    image: "https://tqwdwdfxckgkkggwvzha.supabase.co/storage/v1/object/public/gallery-images/IMG_1843.jpg",
  },
  {
    id: "gm-img-1946",
    title: "",
    date: "September 2026",
    image: "https://tqwdwdfxckgkkggwvzha.supabase.co/storage/v1/object/public/gallery-images/IMG_1946.jpg",
  },
  {
    id: "gm-img-20260922-155919",
    title: "",
    date: "September 2026",
    image: "https://tqwdwdfxckgkkggwvzha.supabase.co/storage/v1/object/public/gallery-images/IMG_20260922_155919.jpg",
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
