import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AUST Cybersecurity and AI Club",
  description: "Official website of AUSTCAIC",
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
      <body
        className="bg-gray-50 font-sans text-gray-900 antialiased"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
