import React from 'react';

/** Comparison table: navy header row, hairline grid, zebra body rows and an italic «Tabla N.» caption. */
export function DataTable({ columns, rows, widths, number, caption }) {
  return (
    <figure className="du-table-figure">
      <table className="du-table">
        {widths ? (
          <colgroup>
            {widths.map((w, i) => <col key={i} style={{ width: w }} />)}
          </colgroup>
        ) : null}
        <thead>
          <tr>
            {columns.map((c, i) => <th key={i} scope="col" className="table-head">{c}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r}>
              {row.map((cell, c) => <td key={c} className="table-cell">{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
      {caption ? (
        <figcaption className="du-caption caption">
          {number != null ? `Tabla ${number}. ` : ''}{caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
