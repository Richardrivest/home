import React from 'react';
import { GlossaryEntry } from './GlossaryEntry.jsx';

/** Glossary built from entries, sorted alphabetically (Spanish collation); each entry is a link target. */
export function Glossary({ entries }) {
  const sorted = [...entries].sort((a, b) => a.term.localeCompare(b.term, 'es', { sensitivity: 'base' }));
  return (
    <div className="du-glossary-list">
      {sorted.map((e) => <GlossaryEntry key={e.id} id={e.id} term={e.term}>{e.definition}</GlossaryEntry>)}
    </div>
  );
}

/** A term in running text, linked to its glossary entry. Mark the first use in each unit. */
export function Term({ to, children }) {
  return <a className="du-term" href={`#gl-${to}`}>{children}</a>;
}
