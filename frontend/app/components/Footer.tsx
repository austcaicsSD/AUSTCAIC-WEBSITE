import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type SocialLinkProps = {
  href: string;
  label: string;
  children: ReactNode;
};

const exploreLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Executive Committee",
    href: "/panel",
  },
 {
  label: "Culture",
  href: "/culture/syllabus",
},
  {
    label: "Resources",
    href: "/lab-free",
  },
  {
    label: "Login",
    href: "/login",
  },
  {
    label: "Join as a General Member",
    href: "/register",
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white text-gray-900">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr] lg:gap-16">
          {/* Club information */}
          <div>
            <div className="relative mb-5 h-28 w-28 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <Image
                src="/AUSTCAIC-logo.jpg"
                alt="AUST Cybersecurity and AI Club logo"
                fill
                sizes="112px"
                className="object-contain"
              />
            </div>

            <h2 className="max-w-xs text-xl font-bold leading-7 text-gray-950">
              AUST Cybersecurity and AI Club
            </h2>

            <p className="mt-4 max-w-xs text-sm leading-6 text-gray-600">
              Building a community that secures, innovates, and leads through
              cybersecurity and artificial intelligence.
            </p>
          </div>

          {/* Explore links */}
           <div className="lg:justify-self-center">
            <h3 className="mb-5 text-lg font-semibold text-gray-950">
              Explore
            </h3>

            <ul className="space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 transition-colors hover:text-violet-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact information */}
         <div className="sm:col-span-2 lg:col-span-1 lg:justify-self-end">
            <h3 className="mb-5 text-lg font-semibold text-gray-950">
              Contact Us
            </h3>

            <div className="space-y-1 text-sm leading-6 text-gray-600">
              <p>
                Email:{" "}
                <a
                  href="mailto:austcaic@aust.edu"
                  className="break-all transition-colors hover:text-violet-600"
                >
                  austcaic@aust.edu
                </a>
              </p>

              <p>
                Ahsanullah University of Science and Technology
                <br />
                141 &amp; 142, Love Road
                <br />
                Tejgaon Industrial Area
                <br />
                Dhaka-1208, Bangladesh
              </p>
            </div>

            {/* Social media links */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              {/* Facebook */}
              <SocialLink
                href="https://www.facebook.com/Austcybersecurityandaiclub"
                label="Facebook"
              >
                <path d="M13.5 21v-8.02h2.69l.4-3.12h-3.09V7.85c0-.9.25-1.52 1.55-1.52h1.65V3.53C15.98 3.44 15.03 3.35 13.92 3.35c-2.31 0-3.9 1.41-3.9 4v2.51H7.32v3.12h2.7V21h3.48Z" />
              </SocialLink>

              {/* LinkedIn */}
              <SocialLink
                href="https://www.linkedin.com/company/aust-cybersecurity-and-ai-club/posts/?feedView=all"
                label="LinkedIn"
              >
                <path d="M20.45 20.45H16.9v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
              </SocialLink>

              {/* Instagram */}
              <SocialLink
                href="https://www.instagram.com/aust_caic/"
                label="Instagram"
              >
                <path d="M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.22.6 1.77 1.15.55.55.9 1.11 1.15 1.77.25.64.42 1.37.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 0 1-1.15 1.77 4.9 4.9 0 0 1-1.77 1.15c-.64.25-1.37.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.22 1.15-1.77.55-.55 1.11-.9 1.77-1.15.64-.25 1.37-.42 2.43-.47C8.94 2.01 9.28 2 12 2Zm0 4.86a5.14 5.14 0 1 0 0 10.28 5.14 5.14 0 0 0 0-10.28Zm0 1.8a3.34 3.34 0 1 1 0 6.68 3.34 3.34 0 0 1 0-6.68Zm5.34-1.99a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Z" />
              </SocialLink>

              {/* YouTube */}
              <SocialLink
                href="https://www.youtube.com/@austcybersecurityandaiclub-c2i"
                label="YouTube"
              >
                <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14C4.5 20.5 12 20.5 12 20.5s7.5 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.81ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
              </SocialLink>

              {/* Discord */}
              <SocialLink
                href="https://discord.com/invite/pxaqZWh3A"
                label="Discord"
              >
                <path d="M20.32 4.4A19.8 19.8 0 0 0 15.4 3c-.24.42-.5.99-.68 1.44a18.3 18.3 0 0 0-5.44 0A9.2 9.2 0 0 0 8.6 3a19.7 19.7 0 0 0-4.92 1.4C1.05 8.24.37 11.98.7 15.67a19.9 19.9 0 0 0 5.03 2.36c.41-.53.77-1.1 1.08-1.7-.6-.21-1.16-.48-1.7-.8.14-.1.28-.2.42-.32a14.2 14.2 0 0 0 11.66 0c.14.11.28.22.42.32-.54.32-1.1.59-1.7.8.31.6.67 1.17 1.08 1.7a19.9 19.9 0 0 0 5.03-2.36c.4-4.3-.68-8-2.7-11.27ZM9.68 13.66c-.87 0-1.58-.78-1.58-1.74s.7-1.75 1.58-1.75c.88 0 1.6.79 1.58 1.75 0 .96-.7 1.74-1.58 1.74Zm4.66 0c-.87 0-1.58-.78-1.58-1.74s.7-1.75 1.58-1.75c.88 0 1.6.79 1.58 1.75 0 .96-.7 1.74-1.58 1.74Z" />
              </SocialLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-gray-600 transition duration-200 hover:-translate-y-1 hover:border-violet-300 hover:bg-violet-50 hover:text-violet-600"
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="h-4 w-4"
      >
        {children}
      </svg>
    </a>
  );
}