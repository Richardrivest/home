import React from 'react';

/** Process flow: numbered steps joined by arrows; horizontal on wide screens, vertical on narrow ones. */
export function ProcessFlow({ steps, label }) {
  return (
    <ol className="du-flow" aria-label={label}>
      {steps.map((s, i) => (
        <li key={i} className="du-flow__step">
          <span className="du-flow__num diagram-title" aria-hidden="true">{i + 1}</span>
          <span className="du-flow__title diagram-title">{s.title}</span>
          {s.text ? <span className="du-flow__text diagram-label">{s.text}</span> : null}
        </li>
      ))}
    </ol>
  );
}
