"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/panel", label: "Panel members" },
] as const;

export function AdminNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-row gap-2 md:flex-col md:gap-1">
      {NAV.map(({ href, label }) => {
        // "/admin" would otherwise match every child route.
        const active =
          href === "/admin" ? pathname === href : pathname.startsWith(href);

        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-300",
              active
                ? "bg-gradient-to-r from-brandBlue to-brandPurple text-white shadow-[0_8px_24px_rgba(29,78,216,0.28)]"
                : "text-gray-600 hover:bg-gray-900/5 hover:text-gray-950",
            )}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
