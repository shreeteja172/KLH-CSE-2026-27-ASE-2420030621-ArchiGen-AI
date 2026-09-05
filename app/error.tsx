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
    <main className="mx-auto flex w-full max-w-5xl flex-1 items-center px-6 py-32">
      <div className="max-w-lg">
        <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">
          Error
        </p>

        <h1 className="mt-4 text-2xl font-medium tracking-tight">
          Something went wrong
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          An unexpected error stopped this page from loading. Trying again often
          clears it.
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
            href="/"
            className="rounded-lg border border-hairline px-6 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:border-hairline-bright hover:text-white"
          >
            Go home
          </Link>
        </div>
      </div>
    </main>
  );
}
