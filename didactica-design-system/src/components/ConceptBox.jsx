import React from 'react';

/** «Concepto clave»: a framed pale-blue box holding one definition to retain. */
export function ConceptBox({ term, label = 'Concepto clave', children }) {
  return (
    <aside className="du-concept" aria-label={`${label}: ${term}`}>
      <p className="du-concept__label concept-label">
        <span className="du-concept__prefix">{label}</span> — {term}
      </p>
      <p className="du-concept__body concept-body">{children}</p>
    </aside>
  );
}
