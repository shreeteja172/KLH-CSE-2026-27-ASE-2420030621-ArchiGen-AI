import Link from "next/link";
import type { ReactNode } from "react";

import Logo from "@/components/landing/Logo";

type Props = {
  children?: ReactNode;
  mode?: "workspace" | "auth";
};

export default function FloatingNav({ children, mode = "workspace" }: Props) {
  return (
    <header className="floating-nav-wrap">
      <nav className="floating-nav" aria-label="Primary navigation">
        <Link
          href="/"
          aria-label="ArchiGen AI home"
          className="floating-nav__brand"
        >
          <Logo />
        </Link>

        {mode === "workspace" ? (
          <>
            <Link href="/dashboard" className="floating-nav__context">
              <span className="floating-nav__divider" aria-hidden="true" />
              <span>Workspace</span>
            </Link>
            <Link
              href="/dashboard/diagrams"
              className="floating-nav__library-link"
            >
              All diagrams
            </Link>
          </>
        ) : (
          <div className="floating-nav__auth-link">{children}</div>
        )}

        {mode === "workspace" && children ? (
          <div className="floating-nav__account">{children}</div>
        ) : null}
      </nav>
    </header>
  );
}
