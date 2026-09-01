"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#08080b",
          color: "#ededf2",
          fontFamily:
            "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
          padding: "1.25rem",
        }}
      >
        <title>Something went wrong · ArchiGen AI</title>

        <div
          style={{
            width: "100%",
            maxWidth: "26rem",
            border: "1px solid #26262e",
            borderRadius: "1rem",
            background: "#101014",
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <h1 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 600 }}>
            Something went wrong
          </h1>

          <p
            style={{
              marginTop: "0.75rem",
              marginBottom: 0,
              fontSize: "0.875rem",
              lineHeight: 1.6,
              color: "#8b8b9c",
            }}
          >
            ArchiGen hit an unexpected error and had to stop. Reloading usually
            fixes it.
          </p>

          {error.digest && (
            <p
              style={{
                marginTop: "1rem",
                marginBottom: 0,
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                fontSize: "0.6875rem",
                color: "#5b5b69",
              }}
            >
              ref: {error.digest}
            </p>
          )}

          <button
            onClick={() => retry()}
            style={{
              marginTop: "1.5rem",
              border: "none",
              borderRadius: "0.625rem",
              background: "#6366f1",
              color: "#ffffff",
              fontSize: "0.875rem",
              fontWeight: 600,
              padding: "0.625rem 1.25rem",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
