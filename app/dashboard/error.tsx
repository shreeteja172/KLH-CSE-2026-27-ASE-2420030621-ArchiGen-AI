"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function DashboardError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="max-w-lg py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">
        Error
      </p>

      <h1 className="mt-4 text-2xl font-medium tracking-tight">
        We could not load your workspace
      </h1>

      <p className="mt-3 text-sm leading-relaxed text-zinc-400">
        The database may be waking up or temporarily unreachable. Your saved
        diagrams are safe.
      </p>

      {error.digest && (
        <p className="mt-4 font-mono text-[11px] text-zinc-600">
          ref: {error.digest}
        </p>
      )}

      <div className="mt-8 flex gap-3">
        <button
          onClick={() => retry()}
          className="rounded-lg bg-accent px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-500"
        >
          Try again
        </button>

        <Link
          href="/dashboard"
          className="rounded-lg border border-hairline px-6 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:border-hairline-bright hover:text-white"
        >
          Back to workspace
        </Link>
      </div>
    </div>
  );
}
