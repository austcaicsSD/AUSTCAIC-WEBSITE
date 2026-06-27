import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <body className={`${inter.className} bg-lightBg text-gray-900`}>
        {/* Simple Navbar */}
        <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-brandBlue">
              AUST<span className="text-brandPurple">CAIC</span>
            </Link>
            <div className="space-x-6 font-semibold">
              <Link href="/" className="hover:text-brandPurple transition">
                Home
              </Link>
              <Link
                href="/register"
                className="hover:text-brandPurple transition"
              >
                Register
              </Link>
              <Link
                href="/lab-free"
                className="hover:text-brandPurple transition"
              >
                Lab Free
              </Link>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
