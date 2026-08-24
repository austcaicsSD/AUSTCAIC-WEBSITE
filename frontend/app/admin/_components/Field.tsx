import { cn } from "@/lib/cn";

const control =
  "w-full rounded-xl border border-gray-200 bg-white/60 backdrop-blur-sm px-4 py-3 text-sm font-medium text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-brandPurple focus:ring-2 focus:ring-brandPurple/20 disabled:bg-gray-100/60 disabled:text-gray-500 aria-[invalid=true]:border-red-400 aria-[invalid=true]:focus:ring-red-500/20";

export function Field({
  label,
  htmlFor,
  hint,
  error,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-sm font-bold text-gray-900"
      >
        {label}
        {required && <span className="ml-1 text-red-600">*</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
      {error && (
        <p id={`${htmlFor}-error`} className="mt-1 text-xs font-bold text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return <input {...props} className={cn(control, className)} />;
}

export function Select({
  className,
  ...props
}: React.ComponentProps<"select">) {
  return <select {...props} className={cn(control, className)} />;
}

export function Textarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return <textarea {...props} className={cn(control, className)} />;
}
