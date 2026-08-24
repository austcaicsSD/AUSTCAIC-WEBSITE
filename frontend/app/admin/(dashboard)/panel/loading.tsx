import { Card } from "../../_components/Card";

function Bar({ className }: { className: string }) {
  return <div className={`animate-pulse rounded-lg bg-gray-200/70 ${className}`} />;
}

export default function PanelLoading() {
  return (
    <div aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading panel members</span>

      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <Bar className="h-9 w-56" />
          <Bar className="mt-3 h-4 w-72" />
        </div>
        <Bar className="h-10 w-32" />
      </div>

      <Card className="mb-6 p-5">
        <Bar className="h-11 w-full" />
      </Card>

      <Card className="p-6">
        <Bar className="h-3 w-48" />
        <div className="mt-6 space-y-3">
          {Array.from({ length: 8 }, (_, i) => (
            <Bar key={i} className="h-10 w-full" />
          ))}
        </div>
      </Card>
    </div>
  );
}
