"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function AppError({
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
    <main className="flex flex-1 items-center justify-center px-5 py-24">
      <div className="card w-full max-w-md p-8 text-center">
        <span className="grid size-12 place-items-center rounded-xl bg-red-500/10 ring-1 ring-red-500/25 mx-auto">
          <svg viewBox="0 0 24 24" fill="none" className="size-6 text-red-400">
            <path
              d="M12 8v5m0 3.5h.01M10.3 3.9 2.4 17.5A2 2 0 0 0 4.1 20.5h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>

        <h1 className="mt-5 text-xl font-semibold">Something went wrong</h1>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          An unexpected error stopped this page from loading. Trying again often
          clears it.
        </p>

        {error.digest && (
          <p className="mt-4 font-mono text-[11px] text-zinc-600">
            ref: {error.digest}
          </p>
        )}

        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => retry()}
            className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
          >
            Try again
          </button>

          <Link
            href="/"
            className="rounded-lg border border-hairline bg-surface px-5 py-2.5 text-sm font-semibold text-zinc-200 transition-colors hover:bg-surface-2"
          >
            Go home
          </Link>
        </div>
      </div>
    </main>
  );
}
