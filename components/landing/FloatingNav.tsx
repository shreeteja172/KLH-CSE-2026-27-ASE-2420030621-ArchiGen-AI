"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

import Logo from "@/components/landing/Logo";

const LINKS = [
  { id: "features", label: "Features" },
  { id: "how-it-works", label: "How it works" },
  { id: "example", label: "Example" },
  { id: "faq", label: "FAQ" },
];

export default function FloatingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = LINKS.map((link) =>
      document.getElementById(link.id),
    ).filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-5">
      <div className="pointer-events-auto w-full max-w-5xl">
        <nav
          className={`flex items-center justify-between gap-3 rounded-2xl px-3 py-2.5 transition-all duration-300 sm:px-4 ${
            scrolled ? "glass" : "border border-transparent bg-transparent"
          }`}
        >
          <Link
            href="/"
            aria-label="ArchiGen AI home"
            className="shrink-0 rounded-lg px-1 py-0.5 transition-opacity hover:opacity-70"
            onClick={() => setOpen(false)}
          >
            <Logo />
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`rounded-lg px-3.5 py-2 text-sm transition-colors ${
                  active === link.id
                    ? "text-white"
                    : "text-zinc-500 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Show
              when="signed-in"
              fallback={
                <>
                  <SignInButton mode="modal">
                    <button className="hidden rounded-lg px-3.5 py-2 text-sm text-zinc-300 transition-colors hover:text-white sm:block">
                      Sign in
                    </button>
                  </SignInButton>

                  <SignUpButton mode="modal">
                    <button className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-canvas transition-colors hover:bg-zinc-200">
                      Get started
                    </button>
                  </SignUpButton>
                </>
              }
            >
              <Link
                href="/dashboard"
                className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-canvas transition-colors hover:bg-zinc-200"
              >
                Dashboard
              </Link>

              <UserButton appearance={{ elements: { avatarBox: "size-8" } }} />
            </Show>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
              className="grid size-9 place-items-center rounded-lg border border-hairline bg-surface-2/60 text-zinc-300 transition-colors hover:text-white md:hidden"
            >
              <svg viewBox="0 0 24 24" fill="none" className="size-5">
                {open ? (
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                ) : (
                  <path
                    d="M4 7h16M4 12h16M4 17h16"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {open && (
          <div className="glass mt-2 overflow-hidden p-2 md:hidden">
            {LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-4 py-3 text-sm text-zinc-300 transition-colors hover:bg-white/[0.06] hover:text-white"
              >
                {link.label}
              </a>
            ))}

            <Show when="signed-out">
              <div className="mt-1 border-t border-hairline pt-2">
                <SignInButton mode="modal">
                  <button className="w-full rounded-lg px-4 py-3 text-left text-sm text-zinc-300 transition-colors hover:bg-white/[0.06] hover:text-white">
                    Sign in
                  </button>
                </SignInButton>
              </div>
            </Show>
          </div>
        )}
      </div>
    </div>
  );
}
