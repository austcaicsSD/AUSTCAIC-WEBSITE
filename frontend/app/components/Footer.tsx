import Link from "next/link";

export default function Footer() {
  return (
  <footer className="border-t border-gray-200 bg-white ">
    <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-4 py-4 sm:flex-row sm:justify-between">
        <p className="text-sm text-gray-500">
          AUST Cybersecurity and AI Club
        </p>
        <div className="flex items-center gap-2">
          <Link href="https://www.facebook.com/Austcybersecurityandaiclub" target="_blank" aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-blue-50 hover:text-blue-600">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M13.5 21v-8.02h2.69l.4-3.12h-3.09V7.85c0-.9.25-1.52 1.55-1.52h1.65V3.53C15.98 3.44 15.03 3.35 13.92 3.35c-2.31 0-3.9 1.41-3.9 4v2.51H7.32v3.12h2.7V21h3.48Z"/></svg>
          </Link>
          <Link href="https://www.linkedin.com/company/aust-cybersecurity-and-ai-club/posts/?feedView=all" target="_blank" aria-label="LinkedIn" className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-sky-50 hover:text-sky-700">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z"/></svg>
          </Link>
          <Link href="https://www.instagram.com/aust_caic/" target="_blank" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-pink-50 hover:text-pink-600">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.22.6 1.77 1.15.55.55.9 1.11 1.15 1.77.25.64.42 1.37.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 0 1-1.15 1.77 4.9 4.9 0 0 1-1.77 1.15c-.64.25-1.37.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.22 1.15-1.77.55-.55 1.11-.9 1.77-1.15.64-.25 1.37-.42 2.43-.47C8.94 2.01 9.28 2 12 2Zm0 1.8c-2.67 0-2.99.01-4.04.06-.87.04-1.34.18-1.65.3-.42.16-.71.35-1.02.66-.31.31-.5.6-.66 1.02-.12.31-.26.78-.3 1.65-.05 1.05-.06 1.37-.06 4.04s.01 2.99.06 4.04c.04.87.18 1.34.3 1.65.16.42.35.71.66 1.02.31.31.6.5 1.02.66.31.12.78.26 1.65.3 1.05.05 1.37.06 4.04.06s2.99-.01 4.04-.06c.87-.04 1.34-.18 1.65-.3.42-.16.71-.35 1.02-.66.31-.31.5-.6.66-1.02.12-.31.26-.78.3-1.65.05-1.05.06-1.37.06-4.04s-.01-2.99-.06-4.04c-.04-.87-.18-1.34-.3-1.65a2.7 2.7 0 0 0-.66-1.02 2.7 2.7 0 0 0-1.02-.66c-.31-.12-.78-.26-1.65-.3-1.05-.05-1.37-.06-4.04-.06Zm0 3.06a5.14 5.14 0 1 1 0 10.28 5.14 5.14 0 0 1 0-10.28Zm0 1.8a3.34 3.34 0 1 0 0 6.68 3.34 3.34 0 0 0 0-6.68Zm5.34-1.99a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0Z"/></svg>
          </Link>
          <Link href="https://www.youtube.com/@austcybersecurityandaiclub-c2i" target="_blank" aria-label="YouTube" className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14C4.5 20.5 12 20.5 12 20.5s7.5 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.81ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z"/></svg>
          </Link>
          <Link href="https://discord.com/invite/pxaqZWh3A" target="_blank" aria-label="Discord" className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-indigo-50 hover:text-indigo-600">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M20.32 4.4A19.8 19.8 0 0 0 15.4 3c-.24.42-.5.99-.68 1.44a18.3 18.3 0 0 0-5.44 0A9.2 9.2 0 0 0 8.6 3a19.7 19.7 0 0 0-4.92 1.4C1.05 8.24.37 11.98.7 15.67a19.9 19.9 0 0 0 5.03 2.36c.41-.53.77-1.1 1.08-1.7-.6-.21-1.16-.48-1.7-.8.14-.1.28-.2.42-.32a14.2 14.2 0 0 0 11.66 0c.14.11.28.22.42.32-.54.32-1.1.59-1.7.8.31.6.67 1.17 1.08 1.7a19.9 19.9 0 0 0 5.03-2.36c.4-4.3-.68-8-2.7-11.27ZM9.68 13.66c-.87 0-1.58-.78-1.58-1.74s.7-1.75 1.58-1.75c.88 0 1.6.79 1.58 1.75 0 .96-.7 1.74-1.58 1.74Zm4.66 0c-.87 0-1.58-.78-1.58-1.74s.7-1.75 1.58-1.75c.88 0 1.6.79 1.58 1.75 0 .96-.7 1.74-1.58 1.74Z"/></svg>
          </Link>
        </div>
      </div>

    </footer>
  
  );
}
