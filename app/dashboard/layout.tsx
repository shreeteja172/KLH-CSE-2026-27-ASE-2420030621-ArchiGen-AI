import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

import Logo from "@/components/landing/Logo";

export default function DashboardLayout({
  children,
}: LayoutProps<"/dashboard">) {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-hairline bg-canvas/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              aria-label="ArchiGen AI home"
              className="transition-opacity hover:opacity-70"
            >
              <Logo />
            </Link>

            <span className="hidden text-zinc-700 sm:block">/</span>

            <Link
              href="/dashboard"
              className="hidden text-sm text-zinc-400 transition-colors hover:text-white sm:block"
            >
              Workspace
            </Link>
          </div>

          <UserButton appearance={{ elements: { avatarBox: "size-8" } }} />
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-12">
        {children}
      </main>
    </>
  );
}
