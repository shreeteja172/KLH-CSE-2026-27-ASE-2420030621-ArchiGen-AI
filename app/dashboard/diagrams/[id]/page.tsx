import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import CopyButton from "@/components/dashboard/CopyButton";
import DeleteDiagramButton from "@/components/dashboard/DeleteDiagramButton";
import DiagramPanel from "@/components/dashboard/DiagramPanel";
import { getDiagram } from "@/lib/diagrams";
import { toMermaid } from "@/lib/mermaid";

export async function generateMetadata(
  props: PageProps<"/dashboard/diagrams/[id]">,
): Promise<Metadata> {
  const { id } = await props.params;
  const diagram = await getDiagram(id);

  return { title: diagram?.title ?? "Diagram" };
}

export default async function DiagramPage(
  props: PageProps<"/dashboard/diagrams/[id]">,
) {
  const { id } = await props.params;
  const diagram = await getDiagram(id);

  if (!diagram) notFound();

  const chart = toMermaid(diagram.uml);
  const json = JSON.stringify(diagram.uml, null, 2);

  return (
    <div className="document-workspace">
      <div className="document-heading">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 label-mono transition-colors hover:text-white"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="size-3.5"
            aria-hidden="true"
          >
            <path
              d="M15 19l-7-7 7-7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Workspace
        </Link>

        <div className="mt-7 flex flex-wrap items-end justify-between gap-6">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <p className="document-eyebrow">Document workspace</p>
              <span className="document-live-status">
                <span />
                Saved
              </span>
            </div>
            <h1 className="mt-2 text-4xl font-medium tracking-tight">
              {diagram.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="pill font-mono">
                {diagram.classCount} classes
              </span>
              <span className="pill font-mono">
                {diagram.relationshipCount} relations
              </span>
              <span className="pill font-mono">
                {new Intl.DateTimeFormat("en-GB", {
                  dateStyle: "medium",
                  timeStyle: "short",
                }).format(diagram.createdAt)}
              </span>
            </div>
          </div>

          <DeleteDiagramButton id={diagram.id} />
        </div>
      </div>

      <nav className="document-nav" aria-label="Document sections">
        <a className="is-active" href="#diagram">
          Canvas
        </a>
        <a href="#brief">Brief</a>
        <a href="#model">Model</a>
        <span className="document-nav__hint">
          {diagram.classCount} nodes · {diagram.relationshipCount} links
        </span>
      </nav>

      <div className="document-layout">
        <main className="document-main" id="diagram">
          <section className="workspace-canvas-section">
            <div className="workspace-canvas-heading">
              <div>
                <p className="document-eyebrow">Interactive canvas</p>
                <h2>System architecture</h2>
              </div>
              <span className="workspace-canvas-meta">
                UML · {diagram.classCount} classes
              </span>
            </div>
            <DiagramPanel chart={chart} diagram={diagram.uml} />
          </section>

          <section className="workspace-note" id="brief">
            <div className="workspace-note__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 4.5h12M6 9h8M6 13.5h12M6 18h7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h2>Your idea</h2>
                <span className="document-section-mark">Brief</span>
              </div>
              <p>{diagram.idea}</p>
            </div>
          </section>
        </main>

        <aside className="document-sidebar">
          <section className="workspace-sidebar-card">
            <p className="document-eyebrow">Document index</p>
            <div className="workspace-index-list">
              <a className="is-active" href="#diagram">
                <span>01</span>
                <strong>System architecture</strong>
              </a>
              <a href="#brief">
                <span>02</span>
                <strong>Project brief</strong>
              </a>
              <a href="#model">
                <span>03</span>
                <strong>Structured model</strong>
              </a>
            </div>
          </section>

          <section className="workspace-sidebar-card workspace-stats">
            <p className="document-eyebrow">At a glance</p>
            <div className="workspace-stat-grid">
              <div>
                <strong>{diagram.classCount}</strong>
                <span>Classes</span>
              </div>
              <div>
                <strong>{diagram.relationshipCount}</strong>
                <span>Relations</span>
              </div>
            </div>
            <div className="workspace-sidebar-divider" />
            <p className="workspace-sidebar-label">Last generated</p>
            <p className="workspace-sidebar-value">
              {new Intl.DateTimeFormat("en-GB", {
                dateStyle: "medium",
                timeStyle: "short",
              }).format(diagram.createdAt)}
            </p>
          </section>

          <section className="workspace-sidebar-card workspace-tip">
            <span className="workspace-tip__mark">i</span>
            <div>
              <p className="workspace-sidebar-label">Working note</p>
              <p>
                Use the canvas controls to inspect the architecture. Your source
                model stays available below.
              </p>
            </div>
          </section>
        </aside>
      </div>

      <section className="workspace-model" id="model">
        <div className="workspace-model__header">
          <div>
            <p className="document-eyebrow">Structured output</p>
            <h2>Model source</h2>
          </div>
          <CopyButton value={json} label="Copy JSON" />
        </div>
        <pre>{json}</pre>
      </section>
    </div>
  );
}
