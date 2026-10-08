import React from 'react';

/** «Índice»: Word TOC levels 1–3 with dotted leaders to the page number. */
export function TableOfContents({ title = 'Índice', entries }) {
  return (
    <nav aria-label={title}>
      <h2 className="du-toc-title toc-title">{title}</h2>
      <ol className="du-toc">
        {entries.map((e, i) => (
          <li key={i} className={`du-toc__entry du-toc__entry--${e.level || 1} body`}>
            <span className="du-toc__title">{e.title}</span>
            <span className="du-toc__leader" aria-hidden="true" />
            <span className="du-toc__page">{e.page}</span>
          </li>
        ))}
      </ol>
    </nav>
  );
}
