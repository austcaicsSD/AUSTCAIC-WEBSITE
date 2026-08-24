export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="px-6 py-16 text-center">
      <p className="text-base font-black tracking-tight text-gray-950">
        {title}
      </p>
      {description && (
        <p className="mx-auto mt-2 max-w-sm text-sm font-medium text-gray-500">
          {description}
        </p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
