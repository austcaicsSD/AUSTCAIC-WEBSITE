import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "danger" | "ghost";
type Size = "sm" | "md";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brandPurple/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-brandBlue to-brandPurple text-white shadow-[0_8px_30px_rgba(29,78,216,0.25)] hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(109,40,217,0.32)]",
  secondary:
    "border border-gray-200 bg-white/70 backdrop-blur-sm text-gray-900 hover:border-gray-300 hover:bg-white",
  danger:
    "bg-red-600 text-white shadow-[0_8px_30px_rgba(220,38,38,0.25)] hover:-translate-y-0.5 hover:bg-red-700",
  ghost: "text-gray-500 hover:bg-gray-900/5 hover:text-gray-900",
};

const sizes: Record<Size, string> = {
  sm: "px-3.5 py-2 text-xs",
  md: "px-5 py-2.5 text-sm",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md") {
  return cn(base, variants[variant], sizes[size]);
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: React.ComponentProps<"button"> & { variant?: Variant; size?: Size }) {
  return (
    <button {...props} className={cn(buttonClass(variant, size), className)} />
  );
}

export function LinkButton({
  variant = "primary",
  size = "md",
  className,
  ...props
}: React.ComponentProps<typeof Link> & { variant?: Variant; size?: Size }) {
  return (
    <Link {...props} className={cn(buttonClass(variant, size), className)} />
  );
}
