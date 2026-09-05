function Bar({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-surface-2 ${className}`} />;
}

export default function DiagramLoading() {
  return (
    <div className="space-y-12">
      <div>
        <Bar className="h-3 w-28" />
        <Bar className="mt-6 h-9 w-80 max-w-full" />
        <Bar className="mt-4 h-3 w-64" />
      </div>

      <div>
        <Bar className="h-3 w-32" />
        <Bar className="mt-5 h-80 w-full" />
      </div>

      <div>
        <Bar className="h-3 w-24" />
        <Bar className="mt-5 h-20 w-full max-w-2xl" />
      </div>
    </div>
  );
}
