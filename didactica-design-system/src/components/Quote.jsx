import React from 'react';
import { formatCitation } from '../cite.js';

/** Short quotation (under 40 words) in English double quotes “…”, followed by its APA citation. */
export function Quote({ children, cite }) {
  return (
    <>
      <q className="du-quote">{children}</q>
      {cite ? <> <cite className="du-cite">{formatCitation(cite)}</cite></> : null}
    </>
  );
}

/** APA 7 block quotation (40 words or more): indented, no quotation marks, citation after the final period. */
export function BlockQuote({ children, cite }) {
  return (
    <blockquote className="du-blockquote blockquote">
      {children}
      {cite ? <> <cite className="du-cite">{formatCitation(cite)}</cite></> : null}
    </blockquote>
  );
}
