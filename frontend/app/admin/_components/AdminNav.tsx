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
    <nav className="flex flex-col gap-1">
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
              "rounded-lg px-3 py-2 text-sm font-bold transition-colors",
              active
                ? "bg-brandBlue text-white"
                : "text-gray-700 hover:bg-gray-100 hover:text-gray-950",
            )}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
