import React from 'react';
import { useNumber } from './Numbering.jsx';

/**
 * APA 7 figure: “Figura N” (bold) and the italic title above the image or diagram; “Nota.” below.
 * With an id inside <Numbering>, the number comes from the registry.
 */
export function Figure({ number, id, title, note, children }) {
  const auto = useNumber('figure', id);
  number = number ?? auto;
  return (
    <figure className="du-figure" id={id ? `fig-${id}` : undefined}>
      {number != null ? <p className="du-figure__number table-number">Figura {number}</p> : null}
      {title ? <p className="du-figure__title table-title">{title}</p> : null}
      <div className="du-figure__body">{children}</div>
      {note ? <p className="du-note note"><i>Nota.</i> {note}</p> : null}
    </figure>
  );
}
