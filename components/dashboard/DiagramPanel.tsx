"use client";

import { useRef } from "react";

import CopyButton from "@/components/dashboard/CopyButton";
import MermaidDiagram, {
  type MermaidDiagramControls,
} from "@/components/MermaidDiagram";
import type { UML } from "@/lib/ai/schema";

type Props = {
  chart: string;
  diagram: UML;
};

export default function DiagramPanel({ chart, diagram }: Props) {
  const controlsRef = useRef<MermaidDiagramControls>(null);

  return (
    <div className="panel overflow-hidden">
      <div className="diagram-panel-header flex flex-wrap items-center justify-between gap-3 border-b border-hairline bg-surface-2 px-6 py-4">
        <h2 className="label-mono">Class diagram</h2>
        <div className="diagram-panel-actions flex items-center gap-2">
          <button
            type="button"
            className="diagram-header-button"
            onClick={() => controlsRef.current?.fit()}
          >
            Fit
          </button>
          <button
            type="button"
            className="diagram-header-button"
            onClick={() => controlsRef.current?.full()}
          >
            Full
          </button>
        </div>
        <CopyButton value={chart} label="Copy Mermaid" />
      </div>

      <div className="p-8">
        <MermaidDiagram ref={controlsRef} diagram={diagram} />
      </div>
    </div>
  );
}
