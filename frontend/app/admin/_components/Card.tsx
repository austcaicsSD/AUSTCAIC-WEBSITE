import { cn } from "@/lib/cn";

export function Card({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn(
        "rounded-[1.75rem] border border-white/60 bg-white/70 backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,0,0,0.05)]",
        className,
      )}
    />
  );
}

export function CardHeader({
  title,
  action,
}: {
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between border-b border-gray-200/70 px-6 py-4">
      <h2 className="text-xs font-black uppercase tracking-[0.18em] text-gray-500">
        {title}
      </h2>
      {action}
    </div>
  );
}
