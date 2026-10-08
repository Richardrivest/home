import React from 'react';
import { formatCitation, formatCitations } from '../cite.js';
import { useBibliography, resolveWork } from './Bibliography.jsx';

/** Citation text for a work given inline ({ authors, year, page }) or by id ({ id, page }) inside <Bibliography>. */
export function useCitationText({ narrative = false, works, ...work }) {
  const bib = useBibliography();
  if (works) return formatCitations(works.map((w) => resolveWork(bib, w)));
  return formatCitation(resolveWork(bib, work), { narrative });
}

/**
 * APA 7 in-text citation with page. Parenthetical by default: (Biggs & Tang, 2011, p. 45).
 * narrative → Biggs y Tang (2011, p. 45). works=[…] → several works in one parenthesis.
 * Inside <Bibliography>, pass id (and page) instead of authors and year.
 */
export function Cite(props) {
  return <cite className="du-cite">{useCitationText(props)}</cite>;
}
