"use client";

import type { UML } from "@/lib/ai/schema";

type Props = {
  diagram: UML;
};

export default function MermaidDiagram({ diagram }: Props) {
  return (
    <div className="uml-board">
      <div className="uml-board__classes">
        {diagram.classes.map((cls, index) => {
          return (
            <article className="uml-class" key={cls.name}>
              <h3>{cls.name}</h3>
              <div className="uml-class__section">
                {cls.attributes.map((attribute) => (
                  <div key={attribute}>+{attribute}</div>
                ))}
              </div>
              <div className="uml-class__section">
                {cls.methods.map((method) => (
                  <div key={method}>+{method}</div>
                ))}
              </div>
            </article>
          );
        })}
      </div>

      <div className="uml-board__relationships" aria-label="Relationships">
        {diagram.relationships.map((relationship, index) => (
          <div
            className="uml-relationship"
            key={`${relationship.from}-${relationship.to}-${index}`}
          >
            <span>{relationship.from}</span>
            <strong aria-hidden="true">
              {relationship.type === "inheritance"
                ? "<|--"
                : relationship.type === "composition"
                  ? "*--"
                  : relationship.type === "aggregation"
                    ? "o--"
                    : "-->"}
            </strong>
            <span>{relationship.to}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
