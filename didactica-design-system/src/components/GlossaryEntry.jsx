import React from 'react';

/** Glossary entry: the term in bold navy, a colon, then the definition. With id, a link target for <Term>. */
export function GlossaryEntry({ term, id, children }) {
  return (
    <p className="du-glossary glossary" id={id ? `gl-${id}` : undefined}>
      <dfn className="du-glossary__term">{term}:</dfn> {children}
    </p>
  );
}
