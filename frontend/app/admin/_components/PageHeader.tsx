export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-2 text-sm font-medium text-gray-500">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
