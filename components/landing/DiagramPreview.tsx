type MockClass = {
  name: string;
  attributes: string[];
  methods: string[];
};

const MOCK_CLASSES: MockClass[] = [
  {
    name: "Doctor",
    attributes: ["id: UUID", "name: String", "specialty: String"],
    methods: ["viewSchedule()", "diagnose(patient)"],
  },
  {
    name: "Patient",
    attributes: ["id: UUID", "name: String", "history: Record[]"],
    methods: ["bookAppointment()", "viewBills()"],
  },
  {
    name: "Appointment",
    attributes: ["id: UUID", "scheduledAt: DateTime", "status: Status"],
    methods: ["confirm()", "cancel()"],
  },
];

function ClassCard({ cls }: { cls: MockClass }) {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-hairline bg-surface-2 shadow-panel">
      <div className="border-b border-hairline bg-surface-3 px-3 py-2.5 text-center text-[13px] font-medium text-accent-soft">
        {cls.name}
      </div>

      <ul className="space-y-1 border-b border-hairline px-3 py-2 font-mono text-[11px] text-zinc-400">
        {cls.attributes.map((attribute) => (
          <li key={attribute} className="truncate">
            + {attribute}
          </li>
        ))}
      </ul>

      <ul className="space-y-1 px-3 py-2 font-mono text-[11px] text-zinc-500">
        {cls.methods.map((method) => (
          <li key={method} className="truncate">
            + {method}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function DiagramPreview() {
  return (
    <div className="panel overflow-hidden">
      <div className="flex items-center gap-2 border-b border-hairline bg-surface-2 px-4 py-3">
        <span className="size-2.5 rounded-full bg-zinc-700" />
        <span className="size-2.5 rounded-full bg-zinc-700" />
        <span className="size-2.5 rounded-full bg-zinc-700" />
        <span className="ml-2 font-mono text-[11px] text-zinc-500">
          hospital-management-system.uml
        </span>
      </div>

      <div className="space-y-5 p-5 sm:p-6">
        <div className="rounded-lg border border-hairline bg-canvas p-4">
          <p className="mb-1.5 text-[11px] font-medium uppercase tracking-wider text-zinc-600">
            Your idea
          </p>
          <p className="text-sm leading-relaxed text-zinc-300">
            &ldquo;A hospital management system. Doctors manage patients,
            patients book appointments, and bills belong to patients.&rdquo;
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-hairline" />
          <span className="flex items-center gap-1.5 text-[11px] font-medium text-accent-soft">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="size-3.5"
              aria-hidden="true"
            >
              <path
                d="M12 4v16m0 0-5-5m5 5 5-5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            generated
          </span>
          <div className="h-px flex-1 bg-hairline" />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {MOCK_CLASSES.map((cls) => (
            <ClassCard key={cls.name} cls={cls} />
          ))}
        </div>

        <div className="flex flex-wrap gap-2 font-mono text-[11px]">
          <span className="rounded-md border border-hairline bg-surface-2 px-2 py-1 text-zinc-400">
            Doctor --&gt; Patient
          </span>
          <span className="rounded-md border border-hairline bg-surface-2 px-2 py-1 text-zinc-400">
            Patient --&gt; Appointment
          </span>
          <span className="rounded-md border border-hairline bg-surface-2 px-2 py-1 text-zinc-400">
            Patient *-- Bill
          </span>
        </div>
      </div>
    </div>
  );
}
