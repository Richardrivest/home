import React from 'react';

/** Glossary entry: the term in bold navy, a colon, then the definition. */
export function GlossaryEntry({ term, children }) {
  return (
    <p className="du-glossary glossary">
      <dfn className="du-glossary__term">{term}:</dfn> {children}
    </p>
  );
}
