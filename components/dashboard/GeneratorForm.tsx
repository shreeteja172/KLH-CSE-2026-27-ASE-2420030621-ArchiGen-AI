"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";

import { generateDiagram, type GenerateState } from "@/app/actions/diagrams";

const MAX_LENGTH = 4000;

const EXAMPLE = `A hospital management system.

Doctors manage patients.
Patients book appointments.
Bills belong to patients.`;

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-sm font-medium text-white shadow-panel transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending && (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="size-4 animate-spin"
          aria-hidden="true"
        >
          <circle
            cx="12"
            cy="12"
            r="9"
            stroke="currentColor"
            strokeWidth="2.5"
            className="opacity-25"
          />
          <path
            d="M21 12a9 9 0 0 0-9-9"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      )}
      {pending ? "Generating" : "Generate UML"}
    </button>
  );
}

export default function GeneratorForm() {
  const [state, formAction] = useActionState<GenerateState, FormData>(
    generateDiagram,
    {},
  );

  const [idea, setIdea] = useState("");

  return (
    <form action={formAction} className="panel overflow-hidden">
      <div className="flex items-center justify-between border-b border-hairline bg-surface-2 px-6 py-4">
        <label htmlFor="idea" className="label-mono">
          Describe your project
        </label>

        <span className="font-mono text-[11px] text-zinc-600 tabular-nums">
          {idea.length} / {MAX_LENGTH}
        </span>
      </div>

      <textarea
        id="idea"
        name="idea"
        rows={9}
        value={idea}
        onChange={(event) => setIdea(event.target.value)}
        required
        maxLength={MAX_LENGTH}
        placeholder={EXAMPLE}
        className="w-full resize-y border-0 bg-transparent px-6 py-5 text-sm leading-relaxed text-zinc-100 outline-none placeholder:text-zinc-600"
      />

      {state.error && (
        <p
          role="alert"
          className="mx-6 mb-5 rounded-lg border border-red-900/70 bg-red-950/30 px-4 py-3 text-sm text-red-300"
        >
          {state.error}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-hairline bg-surface-2 px-6 py-4">
        <p className="max-w-sm text-xs leading-relaxed text-zinc-600">
          A few sentences is plenty. Mention who uses the system and what they
          do with it.
        </p>

        <SubmitButton />
      </div>
    </form>
  );
}
