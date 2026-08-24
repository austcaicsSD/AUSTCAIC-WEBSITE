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
    <div className="px-5 py-14 text-center">
      <p className="text-sm font-bold text-gray-900">{title}</p>
      {description && (
        <p className="mx-auto mt-1 max-w-sm text-sm text-gray-500">
          {description}
        </p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
