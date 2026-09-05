function Bar({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-surface-2 ${className}`} />;
}

export default function DashboardLoading() {
  return (
    <div className="space-y-16">
      <div>
        <Bar className="h-3 w-24" />
        <Bar className="mt-5 h-9 w-72 max-w-full" />
        <Bar className="mt-4 h-5 w-96 max-w-full" />
      </div>

      <div>
        <Bar className="h-3 w-40" />
        <Bar className="mt-4 h-56 w-full" />
        <div className="mt-5 flex justify-end">
          <Bar className="h-10 w-40" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3">
        <Bar className="h-16" />
        <Bar className="h-16" />
        <Bar className="h-16" />
      </div>

      <div>
        <Bar className="h-3 w-32" />
        <div className="mt-6 space-y-px">
          <Bar className="h-20" />
          <Bar className="h-20" />
          <Bar className="h-20" />
        </div>
      </div>
    </div>
  );
}
