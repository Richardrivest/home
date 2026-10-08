import React from 'react';
import { useCitationText } from './Cite.jsx';

/** Short quotation (under 40 words) in English double quotes “…”, followed by its APA citation. */
export function Quote({ children, cite }) {
  const citeText = useCitationText(cite || {});
  return (
    <>
      <q className="du-quote">{children}</q>
      {cite ? <> <cite className="du-cite">{citeText}</cite></> : null}
    </>
  );
}

/** APA 7 block quotation (40 words or more): indented, no quotation marks, citation after the final period. */
export function BlockQuote({ children, cite }) {
  const citeText = useCitationText(cite || {});
  return (
    <blockquote className="du-blockquote blockquote">
      {children}
      {cite ? <> <cite className="du-cite">{citeText}</cite></> : null}
    </blockquote>
  );
}
