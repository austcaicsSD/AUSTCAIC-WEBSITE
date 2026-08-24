import type { Metadata } from "next";
import "./globals.css";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import ScrollProgress from "./components/ScrollProgress";
import BackToTop from "./components/BackToTop";

export const metadata: Metadata = {
  title: "AUST Cybersecurity and AI Club",
  description: "Official website of AUSTCAIC",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className="bg-gray-50 font-sans text-gray-900 antialiased flex flex-col min-h-screen">
        <header className="sticky top-0 z-50 w-full group/nav">
          <Navigation />
          <ScrollProgress />
        </header>

        {/* MAIN CONTENT AREA */}
        <main className="flex-grow z-10">{children}</main>

        {/* ================= FOOTER RESTORED ================= */}
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
