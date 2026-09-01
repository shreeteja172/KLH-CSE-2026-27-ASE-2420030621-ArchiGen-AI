import { describe, expect, it } from "vitest";

import { umlSchema } from "@/lib/ai/schema";

const valid = {
  title: "Hospital System",
  classes: [
    { name: "Patient", attributes: ["id: UUID"], methods: ["book()"] },
  ],
  relationships: [{ from: "Patient", to: "Bill", type: "composition" }],
};

describe("umlSchema", () => {
  it("accepts a well-formed model", () => {
    expect(umlSchema.safeParse(valid).success).toBe(true);
  });

  it("rejects an unknown relationship type", () => {
    const result = umlSchema.safeParse({
      ...valid,
      relationships: [{ from: "A", to: "B", type: "friendship" }],
    });

    expect(result.success).toBe(false);
  });

  it("rejects a model missing its title", () => {
    const withoutTitle = {
      classes: valid.classes,
      relationships: valid.relationships,
    };

    expect(umlSchema.safeParse(withoutTitle).success).toBe(false);
  });

  it("rejects a class whose attributes are not strings", () => {
    const result = umlSchema.safeParse({
      ...valid,
      classes: [{ name: "Patient", attributes: [42], methods: [] }],
    });

    expect(result.success).toBe(false);
  });

  it("accepts an empty but structurally valid model", () => {
    expect(
      umlSchema.safeParse({ title: "Empty", classes: [], relationships: [] })
        .success,
    ).toBe(true);
  });
});
