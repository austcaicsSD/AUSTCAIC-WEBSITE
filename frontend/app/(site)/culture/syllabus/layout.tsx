import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hands-On Weekends Syllabus | AUST Cybersecurity & AI Club",
  description:
    "Explore AUSTCAIC's Hands-On Weekends curriculum — a rigorous, industry-focused bootcamp covering Cybersecurity & CTF, AI & Machine Learning, and Academic Research tracks. Open to AUST members in Dhaka.",
  alternates: {
    canonical: "https://www.austcaic.com/culture/syllabus",
  },
};

export default function SyllabusLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
