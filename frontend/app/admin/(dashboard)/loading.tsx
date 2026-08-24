import { Card } from "../_components/Card";

function Bar({ className }: { className: string }) {
  return <div className={`animate-pulse rounded-lg bg-gray-200/70 ${className}`} />;
}

export default function AdminLoading() {
  return (
    <div aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading</span>

      <div className="mb-8">
        <Bar className="h-9 w-64" />
        <Bar className="mt-3 h-4 w-80" />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <Card key={i} className="p-6">
            <Bar className="h-3 w-24" />
            <Bar className="mt-4 h-10 w-20" />
          </Card>
        ))}
      </div>

      <Card className="mt-6 p-6">
        <Bar className="h-3 w-40" />
        <div className="mt-6 space-y-3">
          {[0, 1, 2, 3, 4].map((i) => (
            <Bar key={i} className="h-6 w-full" />
          ))}
        </div>
      </Card>
    </div>
  );
}
