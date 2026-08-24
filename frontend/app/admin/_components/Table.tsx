import { cn } from "@/lib/cn";

export function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div className="overflow-x-auto">
      {/* Scrolls rather than squashing names onto three lines on a phone. */}
      <table
        {...props}
        className={cn("w-full min-w-[44rem] border-collapse text-sm", className)}
      />
    </div>
  );
}

export function Th({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      {...props}
      className={cn(
        "border-b border-gray-200/70 px-6 py-3.5 text-left text-[11px] font-black uppercase tracking-[0.18em] text-gray-500",
        className,
      )}
    />
  );
}

export function Td({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      {...props}
      className={cn(
        "border-b border-gray-100/80 px-6 py-4 align-middle font-medium text-gray-700",
        className,
      )}
    />
  );
}
