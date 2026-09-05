import Link from "next/link";
import type { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";

import GeneratorForm from "@/components/dashboard/GeneratorForm";
import {
  currentUserId,
  listDiagrams,
  type DiagramSummary,
} from "@/lib/diagrams";
import { generationQuota, type GenerationQuota } from "@/lib/rate-limit";

export const metadata: Metadata = {
  title: "Dashboard",
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="card p-5">
      <p className="label-mono">{label}</p>
      <p className="mt-3 text-3xl font-medium tracking-tight tabular-nums">
        {value}
      </p>
      {hint && <p className="mt-1.5 text-xs text-zinc-600">{hint}</p>}
    </div>
  );
}

function QuotaCard({ quota }: { quota: GenerationQuota }) {
  const used = quota.hourlyLimit - quota.hourlyRemaining;
  const percent = Math.round((used / quota.hourlyLimit) * 100);

  return (
    <div className="card p-5">
      <div className="flex items-baseline justify-between">
        <p className="label-mono">Hourly quota</p>
        <p className="font-mono text-xs text-zinc-500 tabular-nums">
          {quota.hourlyRemaining}/{quota.hourlyLimit}
        </p>
      </div>

      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-surface-3">
        <div
          className="h-full rounded-full bg-accent"
          style={{ width: `${percent}%` }}
        />
      </div>

      <p className="mt-3 text-xs text-zinc-600">
        {quota.dailyRemaining} of {quota.dailyLimit} left today
      </p>
    </div>
  );
}

function DiagramCard({ diagram }: { diagram: DiagramSummary }) {
  return (
    <Link
      href={`/dashboard/diagrams/${diagram.id}`}
      className="card raise group flex flex-col p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="line-clamp-2 text-base font-medium leading-snug">
          {diagram.title}
        </h3>

        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="mt-1 size-4 shrink-0 text-zinc-700 transition-all group-hover:translate-x-0.5 group-hover:text-accent-soft"
          aria-hidden="true"
        >
          <path
            d="M9 5l7 7-7 7"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-zinc-500">
        {diagram.idea}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <span className="pill font-mono">{diagram.classCount} classes</span>
        <span className="pill font-mono">
          {diagram.relationshipCount} relations
        </span>
        <span className="ml-auto font-mono text-[11px] text-zinc-600">
          {formatDate(diagram.createdAt)}
        </span>
      </div>
    </Link>
  );
}

function EmptyState() {
  return (
    <div className="card flex flex-col items-center px-6 py-20 text-center">
      <span className="grid size-14 place-items-center rounded-2xl border border-accent/25 bg-accent/10">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="size-7 text-accent-soft"
          aria-hidden="true"
        >
          <path
            d="M4 5h6v4H4zM14 15h6v4h-6zM4 15h6v4H4zM10 7h2a2 2 0 012 2v8"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      <h3 className="mt-6 text-base font-medium">No diagrams yet</h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-zinc-500">
        Describe a project above and your generated class diagrams will collect
        here.
      </p>
    </div>
  );
}

export default async function DashboardPage() {
  const userId = await currentUserId();

  const [user, diagrams, quota] = await Promise.all([
    currentUser(),
    listDiagrams(),
    userId ? generationQuota(userId) : null,
  ]);

  const firstName = user?.firstName ?? null;
  const totalClasses = diagrams.reduce((sum, d) => sum + d.classCount, 0);

  return (
    <div className="space-y-14">
      <div>
        <p className="label-mono">Workspace</p>
        <h1 className="mt-4 text-4xl font-medium tracking-tight">
          {firstName ? `Welcome back, ${firstName}` : "Welcome back"}
        </h1>
        <p className="mt-3 max-w-xl leading-relaxed text-zinc-400">
          Describe a system and ArchiGen will design the class model for it.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
        <GeneratorForm />

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 lg:sticky lg:top-24">
          <StatCard
            label="Diagrams"
            value={String(diagrams.length)}
            hint="saved to your workspace"
          />
          <StatCard
            label="Classes"
            value={String(totalClasses)}
            hint="modelled across all diagrams"
          />
          {quota && <QuotaCard quota={quota} />}
        </div>
      </div>

      <section>
        <div className="flex items-baseline justify-between border-b border-hairline pb-5">
          <h2 className="text-lg font-medium tracking-tight">Your diagrams</h2>

          {diagrams.length > 0 && (
            <span className="font-mono text-xs text-zinc-600">
              {diagrams.length} saved
            </span>
          )}
        </div>

        <div className="mt-8">
          {diagrams.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {diagrams.map((diagram) => (
                <DiagramCard key={diagram.id} diagram={diagram} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
