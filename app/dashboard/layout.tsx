import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

import Logo from "@/components/landing/Logo";

export default function DashboardLayout({ children }: LayoutProps<"/dashboard">) {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-hairline bg-canvas/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5">
          <div className="flex items-center gap-6">
            <Link href="/" aria-label="ArchiGen AI home">
              <Logo />
            </Link>

            <Link
              href="/dashboard"
              className="hidden rounded-lg px-3 py-1.5 text-sm text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-white sm:block"
            >
              Dashboard
            </Link>
          </div>

          <UserButton appearance={{ elements: { avatarBox: "size-8" } }} />
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-10">
        {children}
      </main>
    </>
  );
}
