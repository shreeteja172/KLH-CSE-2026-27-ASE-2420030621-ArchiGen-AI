import { UserButton } from "@clerk/nextjs";

import FloatingNav from "@/components/FloatingNav";

export default function DashboardLayout({
  children,
}: LayoutProps<"/dashboard">) {
  return (
    <>
      <FloatingNav>
        <UserButton appearance={{ elements: { avatarBox: "size-8" } }} />
      </FloatingNav>

      <main className="mx-auto w-full max-w-5xl flex-1 px-6 pb-12 pt-28">
        {children}
      </main>
    </>
  );
}
