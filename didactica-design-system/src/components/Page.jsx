import React from 'react';

/** A manual page: paper ground, 1in margins, running header and «Página N» footer. */
export function Page({ header, page, children, className = '' }) {
  return (
    <section className={`du-page ${className}`.trim()}>
      {header ? <p className="du-running-header running">{header}</p> : null}
      {children}
      {page != null ? <p className="du-page-footer running">Página {page}</p> : null}
    </section>
  );
}
