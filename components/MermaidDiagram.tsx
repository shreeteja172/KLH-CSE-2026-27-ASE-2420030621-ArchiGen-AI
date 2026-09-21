"use client";

import { useLayoutEffect, useRef, useState } from "react";
import type { UML } from "@/lib/ai/schema";

type Props = {
  diagram: UML;
};

export default function MermaidDiagram({ diagram }: Props) {
  const boardRef = useRef<HTMLDivElement>(null);
  const classRefs = useRef(new Map<string, HTMLElement>());
  const surfaceRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ active: false, x: 0, y: 0, left: 0, top: 0 });
  const hasFittedRef = useRef(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [zoomPercent, setZoomPercent] = useState(100);
  const [fitPercent, setFitPercent] = useState(50);

  useLayoutEffect(() => {
    const board = boardRef.current;
    if (!board) return;

    const updateLines = () => {
      const surface = surfaceRef.current;
      if (!surface) return;
      const surfaceRect = surface.getBoundingClientRect();
      const nextLines = diagram.relationships.flatMap((relationship, index) => {
        const from = classRefs.current
          .get(relationship.from)
          ?.getBoundingClientRect();
        const to = classRefs.current
          .get(relationship.to)
          ?.getBoundingClientRect();
        if (!from || !to) return [];

        const zoom = zoomPercent / 100;
        const start = pointOnEdge(from, to, surfaceRect, zoom);
        const end = pointOnEdge(to, from, surfaceRect, zoom);
        return [
          {
            x1: start.x,
            y1: start.y,
            x2: end.x,
            y2: end.y,
            type: relationship.type,
            key: `${relationship.from}-${relationship.to}-${index}`,
          },
        ];
      });

      setLines(nextLines);
    };

    updateLines();
    const observer = new ResizeObserver(() => {
      updateLines();
      const surface = surfaceRef.current;
      if (!surface) return;

      const horizontalFit = (board.clientWidth - 64) / surface.offsetWidth;
      const verticalFit = (board.clientHeight - 64) / surface.offsetHeight;
      const nextFit = Math.min(1, horizontalFit, verticalFit);
      const boundedFit = Math.max(25, Math.min(100, Math.round(nextFit * 100)));
      setFitPercent(boundedFit);
      if (!hasFittedRef.current) {
        hasFittedRef.current = true;
        setZoomPercent(boundedFit);
      }
    });
    observer.observe(board);
    if (surfaceRef.current) observer.observe(surfaceRef.current);
    return () => observer.disconnect();
  }, [diagram.relationships, diagram.classes, zoomPercent]);

  function changeZoom(amount: number) {
    setZoomPercent((current) =>
      Math.min(200, Math.max(fitPercent, current + amount)),
    );
  }

  function fitDiagram() {
    setZoomPercent(fitPercent);
    boardRef.current?.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }

  function showFullDiagram() {
    setZoomPercent(100);
    boardRef.current?.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }

  function startDragging(event: React.PointerEvent<HTMLDivElement>) {
    if (
      (event.target as HTMLElement).closest(
        ".uml-class, .uml-board__controls, .uml-board__reset",
      )
    ) {
      return;
    }
    const board = boardRef.current;
    if (!board) return;

    dragRef.current = {
      active: true,
      x: event.clientX,
      y: event.clientY,
      left: board.scrollLeft,
      top: board.scrollTop,
    };
    board.setPointerCapture(event.pointerId);
    board.classList.add("is-dragging");
  }

  function dragBoard(event: React.PointerEvent<HTMLDivElement>) {
    const board = boardRef.current;
    if (!board || !dragRef.current.active) return;

    board.scrollLeft =
      dragRef.current.left - (event.clientX - dragRef.current.x);
    board.scrollTop = dragRef.current.top - (event.clientY - dragRef.current.y);
  }

  function stopDragging(event: React.PointerEvent<HTMLDivElement>) {
    const board = boardRef.current;
    if (!board) return;
    dragRef.current.active = false;
    board.releasePointerCapture?.(event.pointerId);
    board.classList.remove("is-dragging");
  }

  return (
    <div
      className="uml-board"
      ref={boardRef}
      onPointerDown={startDragging}
      onPointerMove={dragBoard}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
    >
      {/* <button
        type="button"
        className="uml-board__reset"
        onClick={() => {
          if (boardRef.current) {
            boardRef.current.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }
        }}
      >
        Reset view
      </button> */}
      <div className="uml-board__controls" aria-label="Diagram zoom controls">
        <button
          type="button"
          onClick={() => changeZoom(-10)}
          aria-label="Zoom out"
        >
          −
        </button>
        <span>{zoomPercent}%</span>
        <button
          type="button"
          onClick={() => changeZoom(10)}
          aria-label="Zoom in"
        >
          +
        </button>
        <button type="button" onClick={fitDiagram}>
          Fit
        </button>
        <button type="button" onClick={showFullDiagram}>
          Full
        </button>
      </div>
      <div
        className="uml-board__surface"
        ref={surfaceRef}
        style={{ zoom: zoomPercent / 100 }}
      >
        <svg className="uml-board__lines" aria-hidden="true">
          <defs>
            <marker
              id="uml-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="7"
              refY="4"
              orient="auto"
            >
              <path
                d="M0 0L8 4L0 8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </marker>
            <marker
              id="uml-inheritance"
              markerWidth="12"
              markerHeight="10"
              refX="10"
              refY="5"
              orient="auto"
            >
              <path
                d="M0 0L10 5L0 10Z"
                fill="#101014"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </marker>
            <marker
              id="uml-aggregation"
              markerWidth="12"
              markerHeight="10"
              refX="2"
              refY="5"
              orient="auto"
            >
              <path
                d="M2 5L6 1L10 5L6 9Z"
                fill="#101014"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </marker>
            <marker
              id="uml-composition"
              markerWidth="12"
              markerHeight="10"
              refX="2"
              refY="5"
              orient="auto"
            >
              <path
                d="M2 5L6 1L10 5L6 9Z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </marker>
          </defs>
          {lines.map((line) => (
            <line
              key={line.key}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              className="uml-board__line"
              markerEnd={`url(#uml-${line.type === "inheritance" ? "inheritance" : "arrow"})`}
              markerStart={
                line.type === "aggregation"
                  ? "url(#uml-aggregation)"
                  : line.type === "composition"
                    ? "url(#uml-composition)"
                    : undefined
              }
            />
          ))}
        </svg>
        <div className="uml-board__classes">
          {diagram.classes.map((cls) => {
            return (
              <article
                className="uml-class"
                key={cls.name}
                ref={(element) => {
                  if (element) classRefs.current.set(cls.name, element);
                  else classRefs.current.delete(cls.name);
                }}
              >
                <h3>{cls.name}</h3>
                <div className="uml-class__section">
                  {cls.attributes.map((attribute) => (
                    <div key={attribute}>+{attribute}</div>
                  ))}
                </div>
                <div className="uml-class__section">
                  {cls.methods.map((method) => (
                    <div key={method}>+{method}</div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

type Line = {
  key: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  type: UML["relationships"][number]["type"];
};

function pointOnEdge(
  from: DOMRect,
  toward: DOMRect,
  surface: DOMRect,
  zoom: number,
) {
  const centerX = from.left + from.width / 2;
  const centerY = from.top + from.height / 2;
  const targetX = toward.left + toward.width / 2;
  const targetY = toward.top + toward.height / 2;
  const dx = targetX - centerX;
  const dy = targetY - centerY;
  const scale =
    1 /
    Math.max(Math.abs(dx) / (from.width / 2), Math.abs(dy) / (from.height / 2));

  return {
    x: (centerX + dx * scale - surface.left) / zoom,
    y: (centerY + dy * scale - surface.top) / zoom,
  };
}
