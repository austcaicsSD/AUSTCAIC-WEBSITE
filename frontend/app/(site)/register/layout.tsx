import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join AUSTCAIC | AUST Cybersecurity & AI Club — Membership",
  description:
    "Become a member of AUSTCAIC, the AUST Cybersecurity & AI Club. Access ethical hacking labs, AI/ML training, CTF competitions, industry projects, and research mentorship at Ahsanullah University, Dhaka.",
  openGraph: {
    title: "Join AUSTCAIC | AUST Cybersecurity & AI Club",
    description:
      "A student-led cybersecurity and AI community at AUST, Dhaka. Seminars, bootcamps, and real projects for aspiring security and AI professionals.",
    url: "https://austcaic.com/register",
  },
  alternates: {
    canonical: "https://austcaic.com/register",
  },
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
