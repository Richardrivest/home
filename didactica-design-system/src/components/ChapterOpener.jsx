import React from 'react';

/** Unit opener: “Unidad N” kicker, unit title (h1) and a lead paragraph. */
export function ChapterOpener({ number, title, lead, id }) {
  return (
    <header className="du-chapter">
      {number != null ? <p className="du-chapter__kicker chapter-kicker">Unidad {number}</p> : null}
      <h1 id={id} className="du-chapter__title h1">{title}</h1>
      {lead ? <p className="du-chapter__lead lead">{lead}</p> : null}
    </header>
  );
}
