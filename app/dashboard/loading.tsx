function Shimmer({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-lg bg-surface-2 ${className}`} />
  );
}

export default function DashboardLoading() {
  return (
    <div className="space-y-10">
      <div>
        <Shimmer className="h-9 w-72" />
        <Shimmer className="mt-3 h-5 w-96 max-w-full" />
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_260px] lg:items-start">
        <div className="card p-5 sm:p-6">
          <Shimmer className="h-5 w-44" />
          <Shimmer className="mt-3 h-4 w-full max-w-md" />
          <Shimmer className="mt-4 h-48 w-full" />
          <div className="mt-4 flex justify-end">
            <Shimmer className="h-10 w-36" />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <Shimmer className="h-[86px]" />
          <Shimmer className="h-[86px]" />
        </div>
      </div>

      <section>
        <Shimmer className="mb-5 h-6 w-40" />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Shimmer className="h-40" />
          <Shimmer className="h-40" />
          <Shimmer className="h-40" />
        </div>
      </section>
    </div>
  );
}
