"use client";

import { useEffect, useState } from "react";

type Props = {
  value: string;
  label?: string;
};

export default function CopyButton({ value, label = "Copy" }: Props) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;

    const timer = setTimeout(() => setCopied(false), 2000);

    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
        } catch {
          setCopied(false);
        }
      }}
      className="rounded-lg border border-hairline bg-surface px-3 py-1.5 font-mono text-[11px] text-zinc-400 transition-colors hover:border-hairline-bright hover:text-white"
    >
      {copied ? "Copied" : label}
    </button>
  );
}
