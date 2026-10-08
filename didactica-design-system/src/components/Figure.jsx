import React from 'react';

/** APA 7 figure: “Figura N” (bold) and the italic title above the image or diagram; “Nota.” below. */
export function Figure({ number, title, note, children }) {
  return (
    <figure className="du-figure">
      {number != null ? <p className="du-figure__number table-number">Figura {number}</p> : null}
      {title ? <p className="du-figure__title table-title">{title}</p> : null}
      <div className="du-figure__body">{children}</div>
      {note ? <p className="du-note note"><i>Nota.</i> {note}</p> : null}
    </figure>
  );
}
