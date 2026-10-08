import React from 'react';

/**
 * APA 7 table: “Tabla N” (bold) and the italic title above; horizontal rules only;
 * navy header row; optional row-header column for conceptual tables; “Nota.” below.
 */
export function DataTable({ columns, rows, widths, number, title, note, rowHeader = false }) {
  return (
    <figure className="du-table-figure">
      {number != null ? <p className="du-table-figure__number table-number">Tabla {number}</p> : null}
      {title ? <p className="du-table-figure__title table-title">{title}</p> : null}
      <div className="du-table-scroll">
        <table className={`du-table${rowHeader ? ' du-table--concept' : ''}`}>
          {widths ? <colgroup>{widths.map((w, i) => <col key={i} style={{ width: w }} />)}</colgroup> : null}
          <thead>
            <tr>{columns.map((c, i) => <th key={i} scope="col" className="table-head">{c}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((row, r) => (
              <tr key={r}>
                {row.map((cell, c) =>
                  rowHeader && c === 0
                    ? <th key={c} scope="row" className="table-cell">{cell}</th>
                    : <td key={c} className="table-cell">{cell}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {note ? <p className="du-note note"><i>Nota.</i> {note}</p> : null}
    </figure>
  );
}
