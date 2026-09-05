import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 items-center px-6 py-32">
      <div className="max-w-lg">
        <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">
          404
        </p>

        <h1 className="mt-4 text-2xl font-medium tracking-tight">
          Page not found
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          This page does not exist, or the diagram you are looking for is not
          one of yours.
        </p>

        <div className="mt-8 flex gap-3">
          <Link
            href="/dashboard"
            className="rounded-lg bg-accent px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-500"
          >
            Go to workspace
          </Link>

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
