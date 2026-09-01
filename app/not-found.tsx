import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center px-5 py-24">
      <div className="card w-full max-w-md p-8 text-center">
        <p className="font-mono text-sm text-accent-soft">404</p>

        <h1 className="mt-3 text-xl font-semibold">Page not found</h1>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          This page doesn&apos;t exist, or the diagram you&apos;re looking for
          isn&apos;t one of yours.
        </p>

        <div className="mt-6 flex justify-center gap-3">
          <Link
            href="/dashboard"
            className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
          >
            Go to dashboard
          </Link>

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
