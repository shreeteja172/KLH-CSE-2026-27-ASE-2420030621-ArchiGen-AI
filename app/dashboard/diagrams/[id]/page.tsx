import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import CopyButton from "@/components/dashboard/CopyButton";
import DeleteDiagramButton from "@/components/dashboard/DeleteDiagramButton";
import MermaidDiagram from "@/components/MermaidDiagram";
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
    <div className="space-y-12">
      <div>
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

        <div className="mt-6 flex flex-wrap items-start justify-between gap-6">
          <div className="min-w-0">
            <h1 className="text-3xl font-medium tracking-tight">
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

      <section>
        <div className="panel overflow-hidden">
          <div className="flex items-center justify-between border-b border-hairline bg-surface-2 px-6 py-4">
            <h2 className="label-mono">Class diagram</h2>
            <CopyButton value={chart} label="Copy Mermaid" />
          </div>

          <div className="p-8">
            <MermaidDiagram chart={chart} />
          </div>
        </div>
      </section>

      <section>
        <div className="card p-7">
          <h2 className="label-mono">Your idea</h2>

          <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-zinc-300">
            {diagram.idea}
          </p>
        </div>
      </section>

      <section>
        <div className="panel overflow-hidden">
          <div className="flex items-center justify-between border-b border-hairline bg-surface-2 px-6 py-4">
            <h2 className="label-mono">Model · JSON</h2>
            <CopyButton value={json} label="Copy JSON" />
          </div>

          <pre className="max-h-[28rem] overflow-auto p-6 font-mono text-[12.5px] leading-relaxed text-zinc-400">
            {json}
          </pre>
        </div>
      </section>
    </div>
  );
}
