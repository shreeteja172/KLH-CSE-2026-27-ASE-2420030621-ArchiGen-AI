import Link from "next/link";
import { Show, SignUpButton } from "@clerk/nextjs";

import DiagramPreview from "@/components/landing/DiagramPreview";
import FloatingNav from "@/components/landing/FloatingNav";
import Logo from "@/components/landing/Logo";

const FEATURES = [
  {
    title: "Plain English in, UML out",
    body: "Describe the system the way you would explain it to a teammate. No modelling notation to learn first.",
  },
  {
    title: "Structured, not guessed",
    body: "Every response is validated against a strict schema, so classes, attributes, methods and relationships always come back well-formed.",
  },
  {
    title: "Real Mermaid diagrams",
    body: "Output renders as a live Mermaid class diagram you can read, screenshot, or paste straight into your report.",
  },
  {
    title: "Correct arrowheads",
    body: "Association, inheritance, aggregation and composition, drawn the way UML actually specifies.",
  },
  {
    title: "Saved to your workspace",
    body: "Every diagram is stored against your account, so you can come back and compare iterations.",
  },
  {
    title: "JSON you can build on",
    body: "The raw model sits next to the diagram, ready to feed into code generation, docs or your own tooling.",
  },
];

const STEPS = [
  {
    step: "01",
    title: "Describe the system",
    body: "Write a few lines about what your project does and who uses it. Bullet points work as well as prose.",
  },
  {
    step: "02",
    title: "Generate the model",
    body: "ArchiGen infers the classes, their attributes and methods, and how they relate to one another.",
  },
  {
    step: "03",
    title: "Review and iterate",
    body: "Read the diagram, tweak your description, and regenerate until the model matches your design.",
  },
];

const FAQS = [
  {
    q: "Do I need to know UML already?",
    a: "No. You describe the system in ordinary language and ArchiGen produces the notation. Reading the result will teach you more UML than a blank diagram tool ever will.",
  },
  {
    q: "How accurate is the generated model?",
    a: "It is a strong first draft, not a finished specification. The structure is always valid because the schema guarantees it, but read it critically and regenerate with a sharper description when something looks off.",
  },
  {
    q: "Can I edit the diagram afterwards?",
    a: "Not in place yet. Today you refine your description and regenerate, which is usually faster. Direct editing is on the roadmap.",
  },
  {
    q: "What happens to my diagrams?",
    a: "They are stored against your account and visible only to you. Every query is scoped to your user id, so nobody else can read them.",
  },
  {
    q: "Is there a usage limit?",
    a: "Ten generations an hour and forty a day per account. That sits well above normal use and keeps the service affordable to run.",
  },
];

function PrimaryAction({
  signedOutLabel,
  signedInLabel,
}: {
  signedOutLabel: string;
  signedInLabel: string;
}) {
  return (
    <Show
      when="signed-in"
      fallback={
        <SignUpButton mode="modal">
          <button className="w-full rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-500 sm:w-auto">
            {signedOutLabel}
          </button>
        </SignUpButton>
      }
    >
      <Link
        href="/dashboard"
        className="block w-full rounded-lg bg-accent px-6 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-indigo-500 sm:w-auto"
      >
        {signedInLabel}
      </Link>
    </Show>
  );
}

function Hero() {
  return (
    <section className="border-b border-hairline">
      <div className="mx-auto w-full max-w-5xl px-6 pb-24 pt-36 sm:pt-44">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">
            ArchiGen AI
          </p>

          <h1 className="mt-6 text-balance text-4xl font-medium leading-[1.15] tracking-tight sm:text-5xl">
            Turn a paragraph into a UML class diagram.
          </h1>

          <p className="mt-6 max-w-xl text-pretty leading-relaxed text-zinc-400">
            Describe your project in plain English. ArchiGen designs the class
            model — classes, attributes, methods and the relationships between
            them — and renders it in seconds.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <PrimaryAction
              signedOutLabel="Generate your first diagram"
              signedInLabel="Open your dashboard"
            />

            <a
              href="#example"
              className="w-full rounded-lg border border-hairline px-6 py-3 text-center text-sm font-medium text-zinc-300 transition-colors hover:border-hairline-bright hover:text-white sm:w-auto"
            >
              See an example
            </a>
          </div>

          <p className="mt-5 text-xs text-zinc-600">
            Free to use. No credit card required.
          </p>
        </div>

        <div className="mt-20">
          <DiagramPreview />
        </div>
      </div>
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight sm:text-3xl">
        {title}
      </h2>
      {body && (
        <p className="mt-4 leading-relaxed text-zinc-400">{body}</p>
      )}
    </div>
  );
}

function Features() {
  return (
    <section id="features" className="scroll-mt-28 border-b border-hairline">
      <div className="mx-auto w-full max-w-5xl px-6 py-24">
        <SectionHeading
          eyebrow="Features"
          title="Everything you need to get from idea to design"
        />

        <div className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="border-t border-hairline pt-5">
              <h3 className="text-sm font-medium">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {feature.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-28 border-b border-hairline">
      <div className="mx-auto w-full max-w-5xl px-6 py-24">
        <SectionHeading
          eyebrow="How it works"
          title="Three steps, about a minute"
        />

        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {STEPS.map((item) => (
            <div key={item.step} className="border-t border-hairline pt-5">
              <span className="font-mono text-xs text-zinc-600">
                {item.step}
              </span>
              <h3 className="mt-3 text-sm font-medium">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Example() {
  return (
    <section id="example" className="scroll-mt-28 border-b border-hairline">
      <div className="mx-auto w-full max-w-5xl px-6 py-24">
        <SectionHeading
          eyebrow="Example"
          title="From a four-line brief to a working class model"
          body="You do not need to name every field. ArchiGen infers sensible attributes and methods from the domain, then wires the classes together with the relationship type that fits. A bill that cannot exist without its patient becomes a composition, not a plain association."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <ul className="space-y-4">
            {[
              ["Association", "one class uses another"],
              ["Inheritance", "a class specialises another"],
              ["Aggregation", "a whole made of parts that outlive it"],
              ["Composition", "parts that die with the whole"],
            ].map(([name, meaning]) => (
              <li
                key={name}
                className="flex flex-col border-t border-hairline pt-4 sm:flex-row sm:gap-4"
              >
                <span className="w-32 shrink-0 text-sm font-medium">
                  {name}
                </span>
                <span className="text-sm text-zinc-400">{meaning}</span>
              </li>
            ))}
          </ul>

          <div className="card overflow-hidden">
            <div className="border-b border-hairline px-4 py-2.5">
              <span className="font-mono text-[11px] text-zinc-500">
                generated model · JSON
              </span>
            </div>

            <pre className="overflow-x-auto p-5 font-mono text-[12px] leading-relaxed text-zinc-400">
              {`{
  "title": "Hospital Management System",
  "classes": [
    {
      "name": "Patient",
      "attributes": ["id: UUID", "name: String"],
      "methods": ["bookAppointment()"]
    },
    {
      "name": "Bill",
      "attributes": ["amount: Decimal", "paid: Boolean"],
      "methods": ["markPaid()"]
    }
  ],
  "relationships": [
    {
      "from": "Patient",
      "to": "Bill",
      "type": "composition"
    }
  ]
}`}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section id="faq" className="scroll-mt-28 border-b border-hairline">
      <div className="mx-auto w-full max-w-3xl px-6 py-24">
        <SectionHeading eyebrow="FAQ" title="Questions worth asking" />

        <div className="mt-12">
          {FAQS.map((item) => (
            <details
              key={item.q}
              className="group border-t border-hairline py-5 last:border-b"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium">
                {item.q}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="size-4 shrink-0 text-zinc-600 transition-transform group-open:rotate-45"
                  aria-hidden="true"
                >
                  <path
                    d="M12 5v14M5 12h14"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </summary>

              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function CallToAction() {
  return (
    <section className="border-b border-hairline">
      <div className="mx-auto w-full max-w-5xl px-6 py-24">
        <h2 className="text-balance text-2xl font-medium tracking-tight sm:text-3xl">
          Stop drawing boxes by hand.
        </h2>
        <p className="mt-4 max-w-xl text-zinc-400">
          Turn your next project brief into a class diagram before you write a
          line of code.
        </p>

        <div className="mt-8 flex sm:justify-start">
          <PrimaryAction
            signedOutLabel="Get started"
            signedInLabel="Go to dashboard"
          />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mx-auto w-full max-w-5xl px-6 py-12">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <Logo className="opacity-70" />

        <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-500">
          <a href="#features" className="transition-colors hover:text-white">
            Features
          </a>
          <a href="#how-it-works" className="transition-colors hover:text-white">
            How it works
          </a>
          <a href="#faq" className="transition-colors hover:text-white">
            FAQ
          </a>
          <a
            href="https://github.com/shreeteja172/ArchiGen-AI"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-white"
          >
            GitHub
          </a>
        </div>
      </div>

      <p className="mt-10 border-t border-hairline pt-6 text-sm text-zinc-600">
        © {new Date().getFullYear()} ArchiGen AI
      </p>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <>
      <FloatingNav />

      <main className="flex-1">
        <Hero />
        <Features />
        <HowItWorks />
        <Example />
        <Faq />
        <CallToAction />
      </main>

      <Footer />
    </>
  );
}
