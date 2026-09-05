"use client";

import { useFormStatus } from "react-dom";

import { deleteDiagram } from "@/app/actions/diagrams";

function Submit() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg border border-hairline px-4 py-2 text-sm font-medium text-zinc-400 transition-colors hover:border-red-900 hover:text-red-300 disabled:opacity-50"
    >
      {pending ? "Deleting…" : "Delete"}
    </button>
  );
}

export default function DeleteDiagramButton({ id }: { id: string }) {
  return (
    <form
      action={deleteDiagram}
      onSubmit={(event) => {
        if (!confirm("Delete this diagram? This can't be undone.")) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <Submit />
    </form>
  );
}
