import Link from "next/link";
import type { Metadata } from "next";

import { listDiagrams, type DiagramSummary } from "@/lib/diagrams";

export const metadata: Metadata = {
  title: "All diagrams",
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function DiagramCard({ diagram }: { diagram: DiagramSummary }) {
  return (
    <Link
      href={`/dashboard/diagrams/${diagram.id}`}
      className="diagram-library-card group"
    >
      <div className="diagram-library-card__topline">
        <span className="diagram-library-card__type">
          UML / {diagram.classCount} nodes
        </span>
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M9 5l7 7-7 7"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h2>{diagram.title}</h2>
      <p>{diagram.idea}</p>
      <div className="diagram-library-card__meta">
        <span>{diagram.relationshipCount} relationships</span>
        <time dateTime={diagram.createdAt.toISOString()}>
          {formatDate(diagram.createdAt)}
        </time>
      </div>
    </Link>
  );
}

export default async function AllDiagramsPage() {
  const diagrams = await listDiagrams();

  return (
    <div className="diagram-library">
      <div className="diagram-library__heading">
        <div>
          <p className="document-eyebrow">Workspace library</p>
          <h1>All diagrams</h1>
          <p className="diagram-library__intro">
            Every generated system model, collected in one place.
          </p>
        </div>
        <Link href="/dashboard" className="diagram-library__new">
          + New diagram
        </Link>
      </div>

      <div className="diagram-library__toolbar">
        <span>Library</span>
        <span className="diagram-library__count">
          {diagrams.length} saved{" "}
          {diagrams.length === 1 ? "diagram" : "diagrams"}
        </span>
      </div>

      {diagrams.length === 0 ? (
        <div className="diagram-library__empty">
          <p className="document-eyebrow">Nothing here yet</p>
          <h2>Start with a system idea</h2>
          <p>Generate your first UML model from the workspace.</p>
          <Link href="/dashboard">Open workspace</Link>
        </div>
      ) : (
        <div className="diagram-library__grid">
          {diagrams.map((diagram) => (
            <DiagramCard key={diagram.id} diagram={diagram} />
          ))}
        </div>
      )}
    </div>
  );
}
