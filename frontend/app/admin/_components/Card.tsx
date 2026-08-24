import { cn } from "@/lib/cn";

export function Card({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn(
        "rounded-xl border border-gray-200 bg-white shadow-sm",
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
    <div className="flex items-center justify-between border-b border-gray-200 px-5 py-3">
      <h2 className="text-sm font-black uppercase tracking-widest text-gray-500">
        {title}
      </h2>
      {action}
    </div>
  );
}
