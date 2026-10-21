import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const SITE_URL = "https://www.austcaic.com";
const SITE_NAME = "AUSTCAIC";
const FULL_NAME = "AUST Cybersecurity & AI Club";

// ~155-char meta description — leads with the exact search phrase
const DESCRIPTION =
  "AUST Cybersecurity & AI Club builds student skills in cybersecurity, AI/ML, and research through weekend classes, CTFs, bootcamps, and seminars.";

// Shorter copy for Open Graph / social link-preview cards
const OG_DESCRIPTION =
  "A student-led community at AUST, Dhaka growing cybersecurity and AI/ML skills through weekend classes, Friday\u2013Saturday sessions, bootcamps, and competitions.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | ${FULL_NAME}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  keywords: [
    "AUST Cybersecurity & AI Club",
    "AUSTCAIC",
    "cybersecurity club Bangladesh",
    "AI club Dhaka",
    "machine learning community Bangladesh",
    "Ahsanullah University of Science and Technology",
    "student tech club Dhaka",
    "cybersecurity bootcamp",
    "hackathon",
    "CTF",
    "Academic Research",
  ],
  authors: [{ name: FULL_NAME, url: SITE_URL }],
  creator: FULL_NAME,
  publisher: FULL_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_BD",
    url: SITE_URL,
    siteName: FULL_NAME,
    title: `${SITE_NAME} | ${FULL_NAME}`,
    description: OG_DESCRIPTION,
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "AUSTCAIC — AUST Cybersecurity & AI Club Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | ${FULL_NAME}`,
    description: OG_DESCRIPTION,
    images: ["/android-chrome-512x512.png"],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: FULL_NAME,
  alternateName: ["AUSTCAIC", "AUST Cybersecurity & AI Club", "AUST Cyber AI Club"],
  url: SITE_URL,
  logo: `${SITE_URL}/android-chrome-512x512.png`,
  description: "The AUST Cybersecurity & AI Club (AUSTCAIC) is a student club at Ahsanullah University of Science and Technology, Dhaka, dedicated to growing cybersecurity and AI skills among students. Every weekend, members attend hands-on classes on cybersecurity, machine learning, and academic research — running on both Friday and Saturday so students can learn alongside their studies. The club also organizes bootcamps, seminars, webinars, CTFs, and competitions to help students build real, practical skills in these fields.",
  foundingLocation: {
    "@type": "Place",
    name: "Ahsanullah University of Science and Technology",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dhaka",
      addressCountry: "BD",
    },
  },
  sameAs: [],
};

// Chrome (nav, footer) lives in the (site) group so /admin can opt out of it
// entirely, and skip the semester query the public nav needs.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <head>
        <Script
          id="org-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="bg-gray-50 font-sans text-gray-900 antialiased"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
