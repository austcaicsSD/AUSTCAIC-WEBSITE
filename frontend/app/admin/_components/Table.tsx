import { cn } from "@/lib/cn";

export function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div className="overflow-x-auto">
      <table
        {...props}
        className={cn("w-full border-collapse text-sm", className)}
      />
    </div>
  );
}

export function Th({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      {...props}
      className={cn(
        "border-b border-gray-200 px-5 py-3 text-left text-xs font-black uppercase tracking-widest text-gray-500",
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
        "border-b border-gray-100 px-5 py-3 align-middle text-gray-800",
        className,
      )}
    />
  );
}
