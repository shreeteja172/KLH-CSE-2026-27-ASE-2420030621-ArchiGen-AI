import { describe, expect, it } from "vitest";

import { toMermaid } from "@/lib/mermaid";
import type { UML } from "@/lib/ai/schema";

function uml(overrides: Partial<UML> = {}): UML {
  return {
    title: "Test System",
    classes: [],
    relationships: [],
    ...overrides,
  };
}

describe("toMermaid", () => {
  it("starts every diagram with a classDiagram header", () => {
    expect(toMermaid(uml())).toMatch(/^classDiagram\n/);
  });

  it("maps each relationship type to its UML arrow", () => {
    const output = toMermaid(
      uml({
        relationships: [
          { from: "A", to: "B", type: "association" },
          { from: "C", to: "D", type: "inheritance" },
          { from: "E", to: "F", type: "aggregation" },
          { from: "G", to: "H", type: "composition" },
        ],
      }),
    );

    expect(output).toContain("A --> B");
    expect(output).toContain("C <|-- D");
    expect(output).toContain("E o-- F");
    expect(output).toContain("G *-- H");
  });

  it("renders attributes and methods inside the class body", () => {
    const output = toMermaid(
      uml({
        classes: [
          {
            name: "Patient",
            attributes: ["id: UUID", "name: String"],
            methods: ["bookAppointment()"],
          },
        ],
      }),
    );

    expect(output).toContain("class Patient {");
    expect(output).toContain("+id: UUID");
    expect(output).toContain("+name: String");
    expect(output).toContain("+bookAppointment()");
  });

  it("handles a class with no attributes or methods", () => {
    const output = toMermaid(
      uml({ classes: [{ name: "Empty", attributes: [], methods: [] }] }),
    );

    expect(output).toContain("class Empty {");
    expect(output).toContain("}");
  });
});
