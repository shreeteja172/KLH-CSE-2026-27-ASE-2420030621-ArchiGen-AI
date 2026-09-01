function Shimmer({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-lg bg-surface-2 ${className}`} />
  );
}

export default function DiagramLoading() {
  return (
    <div className="space-y-8">
      <div>
        <Shimmer className="h-5 w-40" />
        <Shimmer className="mt-4 h-9 w-80 max-w-full" />
        <Shimmer className="mt-3 h-4 w-64" />
      </div>

      <div className="card p-5 sm:p-6">
        <Shimmer className="h-5 w-32" />
        <Shimmer className="mt-4 h-80 w-full" />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Shimmer className="h-48" />
        <Shimmer className="h-48" />
      </div>
    </div>
  );
}
