import Link from "next/link";
import { Show, SignUpButton } from "@clerk/nextjs";

import DiagramPreview from "@/components/landing/DiagramPreview";
import FloatingNav from "@/components/landing/FloatingNav";
import Logo from "@/components/landing/Logo";

const STATS = [
  { value: "4", label: "Relationship types" },
  { value: "~8s", label: "Typical generation" },
  { value: "100%", label: "Schema validated" },
  { value: "0", label: "Boxes dragged" },
];

const FEATURES = [
  {
    title: "Plain English in, UML out",
    body: "Describe the system the way you would explain it to a teammate. No modelling notation to learn before you start.",
    icon: "M4 6h16M4 12h10M4 18h7",
  },
  {
    title: "Structured, not guessed",
    body: "Every response is validated against a strict schema, so classes, attributes, methods and relationships always come back well-formed.",
    icon: "M9 12l2 2 4-4M12 3l7 4v5c0 4.4-3 8.3-7 9-4-0.7-7-4.6-7-9V7l7-4z",
  },
  {
    title: "Real Mermaid diagrams",
    body: "Output renders as a live Mermaid class diagram you can read, screenshot, or paste straight into your report.",
    icon: "M4 5h6v4H4zM14 15h6v4h-6zM4 15h6v4H4zM10 7h2a2 2 0 012 2v8",
  },
  {
    title: "Correct arrowheads",
    body: "Association, inheritance, aggregation and composition, drawn the way UML actually specifies them.",
    icon: "M7 7h10v10M7 17L17 7",
  },
  {
    title: "Saved to your workspace",
    body: "Every diagram is stored against your account, so you can return, compare iterations and pick up where you left off.",
    icon: "M4 7v10a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H6a2 2 0 00-2 2z",
  },
  {
    title: "JSON you can build on",
    body: "The raw model sits beside the diagram, ready to feed into code generation, documentation or your own tooling.",
    icon: "M8 4H6a2 2 0 00-2 2v3a2 2 0 01-2 2 2 2 0 012 2v3a2 2 0 002 2h2M16 4h2a2 2 0 012 2v3a2 2 0 002 2 2 2 0 00-2 2v3a2 2 0 01-2 2h-2",
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
    body: "ArchiGen infers the classes, their attributes and methods, and exactly how they relate to one another.",
  },
  {
    step: "03",
    title: "Review and iterate",
    body: "Read the rendered diagram, sharpen your description, and regenerate until the model matches your design.",
  },
];

const RELATIONSHIPS = [
  {
    name: "Association",
    arrow: "-->",
    meaning: "One class uses another",
  },
  {
    name: "Inheritance",
    arrow: "<|--",
    meaning: "A class specialises another",
  },
  {
    name: "Aggregation",
    arrow: "o--",
    meaning: "A whole made of parts that outlive it",
  },
  {
    name: "Composition",
    arrow: "*--",
    meaning: "Parts that die with the whole",
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
  className = "",
}: {
  signedOutLabel: string;
  signedInLabel: string;
  className?: string;
}) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-7 py-3.5 text-sm font-medium text-white shadow-raised transition-colors hover:bg-indigo-500";

  return (
    <Show
      when="signed-in"
      fallback={
        <SignUpButton mode="modal">
          <button className={`${base} ${className}`}>
            {signedOutLabel}
            <span className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </button>
        </SignUpButton>
      }
    >
      <Link href="/dashboard" className={`${base} ${className}`}>
        {signedInLabel}
        <span className="transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </Link>
    </Show>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-hairline">
      <div className="mx-auto w-full max-w-6xl px-6 pb-28 pt-40 sm:pt-48">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-hairline bg-surface px-4 py-1.5 text-xs text-zinc-400 shadow-panel">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            Schema-validated output, every time
          </span>

          <h1 className="mt-8 text-balance text-5xl font-medium leading-[1.06] tracking-tight sm:text-6xl lg:text-7xl">
            Turn a paragraph into a{" "}
            <span className="text-accent-soft">UML class diagram</span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-zinc-400">
            ArchiGen AI reads your project description and designs the class
            model for you — classes, attributes, methods and the relationships
            between them — rendered as a diagram in seconds.
          </p>

          <div className="mt-11 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <PrimaryAction
              signedOutLabel="Generate your first diagram"
              signedInLabel="Open your workspace"
              className="w-full sm:w-auto"
            />

            <a
              href="#example"
              className="inline-flex w-full items-center justify-center rounded-xl border border-hairline bg-surface px-7 py-3.5 text-sm font-medium text-zinc-200 shadow-panel transition-colors hover:border-hairline-bright hover:bg-surface-2 sm:w-auto"
            >
              See an example
            </a>
          </div>

          <p className="mt-6 text-xs text-zinc-600">
            Free to use · No credit card required
          </p>
        </div>

        <div className="mx-auto mt-24 max-w-4xl">
          <DiagramPreview />
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="border-b border-hairline">
      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid grid-cols-2 divide-hairline sm:grid-cols-4 sm:divide-x">
          {STATS.map((stat) => (
            <div key={stat.label} className="px-6 py-5 text-center">
              <p className="text-4xl font-medium tracking-tight text-white tabular-nums">
                {stat.value}
              </p>
              <p className="label-mono mt-2.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
  body,
  centered = false,
}: {
  eyebrow: string;
  title: string;
  body?: string;
  centered?: boolean;
}) {
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="label-mono">{eyebrow}</p>
      <h2 className="mt-4 text-balance text-3xl font-medium tracking-tight sm:text-4xl">
        {title}
      </h2>
      {body && (
        <p className="mt-5 text-pretty leading-relaxed text-zinc-400">{body}</p>
      )}
    </div>
  );
}

function FeatureIcon({ path }: { path: string }) {
  return (
    <span className="grid size-11 place-items-center rounded-xl border border-accent/25 bg-accent/10">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="size-5 text-accent-soft"
        aria-hidden="true"
      >
        <path
          d={path}
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function Features() {
  return (
    <section id="features" className="scroll-mt-28 border-b border-hairline">
      <div className="mx-auto w-full max-w-6xl px-6 py-28">
        <SectionHeading
          eyebrow="Features"
          title="Everything you need to get from idea to design"
          body="Built for the part of a project where you know what you want to build but have not worked out the object model yet."
          centered
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <article key={feature.title} className="card raise p-7">
              <FeatureIcon path={feature.icon} />

              <h3 className="mt-6 text-base font-medium">{feature.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                {feature.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-28 border-b border-hairline">
      <div className="mx-auto w-full max-w-6xl px-6 py-28">
        <SectionHeading
          eyebrow="How it works"
          title="Three steps, about a minute"
          centered
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {STEPS.map((item) => (
            <article key={item.step} className="card raise p-7">
              <span className="grid size-11 place-items-center rounded-xl border border-hairline bg-surface-2 font-mono text-sm text-accent-soft">
                {item.step}
              </span>

              <h3 className="mt-6 text-base font-medium">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Example() {
  return (
    <section id="example" className="scroll-mt-28 border-b border-hairline">
      <div className="mx-auto w-full max-w-6xl px-6 py-28">
        <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Example"
              title="From a four-line brief to a working class model"
              body="You do not need to name every field. ArchiGen infers sensible attributes and methods from the domain, then wires the classes together with the relationship type that actually fits. A bill that cannot exist without its patient becomes a composition, not a plain association."
            />

            <div className="mt-10 space-y-3">
              {RELATIONSHIPS.map((item) => (
                <div
                  key={item.name}
                  className="card raise flex items-center gap-4 px-5 py-4"
                >
                  <code className="w-14 shrink-0 font-mono text-sm text-accent-soft">
                    {item.arrow}
                  </code>
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="mt-0.5 text-sm text-zinc-500">
                      {item.meaning}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel overflow-hidden lg:sticky lg:top-28">
            <div className="flex items-center justify-between border-b border-hairline bg-surface-2 px-5 py-3.5">
              <div className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-surface-3" />
                <span className="size-2.5 rounded-full bg-surface-3" />
                <span className="size-2.5 rounded-full bg-surface-3" />
              </div>
              <span className="font-mono text-[11px] text-zinc-500">
                model.json
              </span>
            </div>

            <pre className="overflow-x-auto p-6 font-mono text-[12.5px] leading-relaxed text-zinc-400">
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
      <div className="mx-auto w-full max-w-3xl px-6 py-28">
        <SectionHeading eyebrow="FAQ" title="Questions worth asking" centered />

        <div className="mt-14 space-y-3">
          {FAQS.map((item) => (
            <details key={item.q} className="card group px-6 py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-sm font-medium">
                {item.q}
                <span className="grid size-7 shrink-0 place-items-center rounded-lg border border-hairline bg-surface-2 transition-transform group-open:rotate-45">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="size-3.5 text-zinc-400"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 5v14M5 12h14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </summary>

              <p className="mt-4 text-sm leading-relaxed text-zinc-400">
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
      <div className="mx-auto w-full max-w-6xl px-6 py-28">
        <div className="panel px-8 py-20 text-center sm:px-16">
          <h2 className="mx-auto max-w-2xl text-balance text-3xl font-medium tracking-tight sm:text-5xl">
            Stop drawing boxes by hand
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-pretty leading-relaxed text-zinc-400">
            Sign up and turn your next project brief into a class diagram before
            you write a line of code.
          </p>

          <div className="mt-10 flex justify-center">
            <PrimaryAction
              signedOutLabel="Get started for free"
              signedInLabel="Go to your workspace"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-zinc-500">
              UML class diagrams generated from a plain-English description of
              your project.
            </p>
          </div>

          <div className="flex gap-16">
            <div>
              <p className="label-mono">Product</p>
              <div className="mt-4 flex flex-col gap-3 text-sm text-zinc-400">
                <a href="#features" className="transition-colors hover:text-white">
                  Features
                </a>
                <a
                  href="#how-it-works"
                  className="transition-colors hover:text-white"
                >
                  How it works
                </a>
                <a href="#example" className="transition-colors hover:text-white">
                  Example
                </a>
              </div>
            </div>

            <div>
              <p className="label-mono">More</p>
              <div className="mt-4 flex flex-col gap-3 text-sm text-zinc-400">
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
          </div>
        </div>

        <p className="mt-14 border-t border-hairline pt-8 text-sm text-zinc-600">
          © {new Date().getFullYear()} ArchiGen AI
        </p>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <>
      <FloatingNav />

      <main className="flex-1">
        <Hero />
        <Stats />
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
